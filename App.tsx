import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ModuleGrid } from './components/ModuleGrid';
import { InputSection } from './components/InputSection';
import { ResultSection } from './components/ResultSection';
import { GuideSection } from './components/GuideSection';
import { ModuleDetailModal } from './components/ModuleDetailModal';
import { CreateModuleModal } from './components/CreateModuleModal';
import { useTheme } from './hooks/useTheme';
import { ModuleId, ChatMessage, ModuleDef } from './types';
import { MODULES } from './constants';
import { createChatSession, sendMessageToChat } from './services/gemini';
import { Chat } from '@google/genai';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  
  // Selection State (Changed to Array for Multi-select)
  const [selectedModuleIds, setSelectedModuleIds] = useState<ModuleId[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  const [topic, setTopic] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  
  // Custom Modules State
  const [customModules, setCustomModules] = useState<ModuleDef[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<ModuleDef | null>(null);

  // API Key State
  const [apiKey, setApiKey] = useState('');

  // Modal State
  const [detailModuleId, setDetailModuleId] = useState<ModuleId | null>(null);
  
  // Chat State
  const chatSessionRef = useRef<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState('');

  // Load API Key & Custom Modules from local storage
  useEffect(() => {
    const savedKey = localStorage.getItem('gptcw-api-key');
    if (savedKey) setApiKey(savedKey);

    const savedModules = localStorage.getItem('gptcw-custom-modules');
    if (savedModules) {
      try {
        const parsed = JSON.parse(savedModules);
        const sanitized = parsed.map((m: ModuleDef) => ({ ...m, isCustom: true }));
        setCustomModules(sanitized);
      } catch (e) {
        console.error("Failed to parse custom modules", e);
      }
    }
  }, []);

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('gptcw-api-key', key);
    } else {
      localStorage.removeItem('gptcw-api-key');
    }
  };

  const handleCreateModule = (newModule: ModuleDef) => {
    const updated = [...customModules, newModule];
    setCustomModules(updated);
    localStorage.setItem('gptcw-custom-modules', JSON.stringify(updated));
    setIsCreateModalOpen(false);
  };

  const handleUpdateModule = (updatedModule: ModuleDef) => {
    const updated = customModules.map(m => m.id === updatedModule.id ? updatedModule : m);
    setCustomModules(updated);
    localStorage.setItem('gptcw-custom-modules', JSON.stringify(updated));
    setEditingModule(null);
  };

  const handleDeleteModule = (id: string) => {
    if (!window.confirm('정말 이 도구를 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.')) {
      return;
    }

    const isDefault = MODULES.some(m => m.id === id);
    if (isDefault) {
      alert("기본 제공 도구는 삭제할 수 없습니다.");
      return;
    }

    setCustomModules(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem('gptcw-custom-modules', JSON.stringify(updated));
      return updated;
    });
    
    setDetailModuleId(null);
    // Remove from selection if deleted
    setSelectedModuleIds(prev => prev.filter(selectedId => selectedId !== id));
  };

  const handleEditClick = (module: ModuleDef) => {
    setDetailModuleId(null);
    setEditingModule(module);
  };

  const handleToggleMultiSelect = (enabled: boolean) => {
    setIsMultiSelectMode(enabled);
    // If turning off multi-select, keep only the last selected item (or none)
    if (!enabled && selectedModuleIds.length > 1) {
      setSelectedModuleIds([selectedModuleIds[selectedModuleIds.length - 1]]);
    }
  };

  const handleModuleSelect = (id: ModuleId) => {
    if (isMultiSelectMode) {
      setSelectedModuleIds(prev => {
        if (prev.includes(id)) {
          return prev.filter(m => m !== id);
        } else {
          return [...prev, id];
        }
      });
    } else {
      setSelectedModuleIds([id]);
    }
  };

  // Merge default and custom modules
  const allModules = [...MODULES, ...customModules];

  // Helper to find currently viewed module (for modal)
  const activeDetailModule = detailModuleId ? allModules.find(m => m.id === detailModuleId) : null;
  const isActiveModuleDefault = activeDetailModule ? MODULES.some(m => m.id === activeDetailModule.id) : false;

  // Pure function to generate prompt text
  const generatePromptText = (modules: ModuleDef[], userTopic: string): string => {
    if (modules.length === 0) return '';

    // Logic for Single Module
    if (modules.length === 1) {
      const module = modules[0];
      const moduleLabel = module.label;

      if (module.isCustom && module.customInstruction) {
        return `
        다음 지시사항에 따라 작업을 수행해주세요.

        [도구 이름]: ${moduleLabel}
        [지시사항]:
        ${module.customInstruction}

        [입력 데이터/맥락]:
        """
        ${userTopic}
        """

        [출력 요구사항]:
        1. 위의 지시사항을 철저히 준수하세요.
        2. **가독성을 위해 반드시 마크다운(Markdown) 형식을 사용하여 출력하세요.**
           - 적절한 제목(#, ##)으로 구조를 나누세요.
           - 핵심 내용은 **굵게** 강조하세요.
        3. 문맥에 맞는 자연스러운 어조를 사용하세요.
        `;
      } else {
        return `
        다음 작업을 수행해주세요: "${moduleLabel}".
        
        주제/맥락:
        """
        ${userTopic}
        """
        
        요구사항:
        1. 주제를 깊이 있게 분석하세요.
        2. "${moduleLabel}"의 원칙을 콘텐츠에 적용하세요.
        3. **가독성을 위해 반드시 마크다운(Markdown) 형식을 사용하여 출력하세요.**
           - 적절한 제목(#, ##, ###)으로 구조를 나누세요.
           - 핵심 내용이나 키워드는 **굵게** 강조하세요.
           - 목록(불릿 포인트, 번호)을 사용하여 내용을 정리하세요.
           - 필요하다면 표(Table)나 인용문(>)을 사용하세요.
        4. 문맥에 맞는 전문적이고 매력적인 어조를 사용하세요.
        5. 사용자가 한눈에 이해하기 쉽도록 깔끔하게 정리해주세요.
        `;
      }
    } 
    // Logic for Multiple Modules (Module Set)
    else {
      return `
      다음 주제에 대해 여러 가지 도구(관점)를 사용하여 종합적으로 분석 및 생성해주세요.

      [주제/맥락]:
      """
      ${userTopic}
      """

      [수행해야 할 작업 목록]:
      다음 순서대로 각 도구의 관점에서 내용을 작성해주세요.

      ${modules.map((m, idx) => `
      ### ${idx + 1}. ${m.label}
      - **설명**: ${m.description}
      - **지시사항**: ${m.isCustom && m.customInstruction ? m.customInstruction : `${m.label}의 관점에서 주제를 분석하고 콘텐츠를 생성하세요.`}
      `).join('\n')}

      [전체 출력 요구사항]:
      1. **반드시 마크다운(Markdown) 형식을 사용하세요.**
      2. 각 도구의 결과물 사이에는 구분선(---)을 넣고, '## 1. 도구이름' 형식의 제목을 붙여주세요.
      3. 각 섹션의 내용은 해당 도구의 특성을 잘 살려서 작성해주세요.
      4. 전체적으로 내용이 유기적으로 연결되도록 구성해주세요.
      `;
    }
  };

  const handleGenerate = () => {
    if (selectedModuleIds.length > 0 && topic) {
      const selectedModules = allModules.filter(m => selectedModuleIds.includes(m.id));
      if (selectedModules.length === 0) return;

      const prompt = generatePromptText(selectedModules, topic);
      
      setGeneratedPrompt(prompt);
      setShowResult(true);
      // Reset Chat when regenerating prompt
      setMessages([]);
      setGeminiError('');
      chatSessionRef.current = null;
    }
  };

  const handleClear = () => {
    setTopic('');
    setSelectedModuleIds([]);
    setShowResult(false);
    setGeneratedPrompt('');
    setMessages([]);
    setGeminiError('');
    chatSessionRef.current = null;
  };

  const handleInitialRunGemini = async () => {
    if (!generatedPrompt) return;
    
    setIsGeminiLoading(true);
    setGeminiError('');
    setMessages([]); // Start fresh

    try {
      // 1. Create Session
      const chat = createChatSession(apiKey);
      chatSessionRef.current = chat;

      // 2. Add User Message (The Prompt)
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        text: generatedPrompt,
        timestamp: Date.now()
      };
      setMessages([userMsg]);

      // 3. Send Message
      const responseText = await sendMessageToChat(chat, generatedPrompt);

      // 4. Add Model Response
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, modelMsg]);

    } catch (error: any) {
      console.error("Gemini Error:", error);
      setGeminiError(error.message || "Gemini 실행 중 오류가 발생했습니다.");
    } finally {
      setIsGeminiLoading(false);
    }
  };

  const handleFollowUpChat = async (message: string) => {
    if (!chatSessionRef.current || !message.trim()) return;

    setIsGeminiLoading(true);
    
    // Add User Message immediately
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: message,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const responseText = await sendMessageToChat(chatSessionRef.current, message);
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, modelMsg]);

    } catch (error: any) {
      console.error("Chat Error:", error);
      setGeminiError(error.message || "답변을 생성하는 중 오류가 발생했습니다.");
    } finally {
      setIsGeminiLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 transition-colors duration-300 bg-slate-50 dark:bg-dark-bg font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-6 lg:gap-8">
        
        {/* Left Column: Guide & API Key (Desktop) */}
        <aside className="hidden lg:block h-fit sticky top-6 space-y-6">
          <GuideSection apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
        </aside>

        {/* Right Column: Main Content */}
        <main className="min-w-0 space-y-6">
          <Header theme={theme} toggleTheme={toggleTheme} />
          
          {/* Main Workflow Section */}
          <div className="space-y-6">
            <ModuleGrid 
              modules={allModules}
              selectedIds={selectedModuleIds} 
              onSelect={handleModuleSelect} 
              onInfoClick={setDetailModuleId}
              onAddClick={() => setIsCreateModalOpen(true)}
              onDelete={handleDeleteModule}
              isMultiSelectMode={isMultiSelectMode}
              onToggleMultiSelect={handleToggleMultiSelect}
            />
            
            <InputSection 
              value={topic} 
              onChange={setTopic} 
              onGenerate={handleGenerate}
              onClear={handleClear}
              isReady={selectedModuleIds.length > 0 && !!topic.trim()}
              selectedCount={selectedModuleIds.length}
            />

            {showResult && (
              <div className="animate-fade-in-up">
                <ResultSection 
                  prompt={generatedPrompt}
                  messages={messages}
                  isGeminiLoading={isGeminiLoading}
                  geminiError={geminiError}
                  onRunGemini={handleInitialRunGemini}
                  onSendFollowUp={handleFollowUpChat}
                />
              </div>
            )}
          </div>

          {/* Guide Section for Mobile (Stacks at bottom) */}
          <div className="lg:hidden mt-8 border-t border-slate-200 dark:border-dark-border pt-8">
            <GuideSection apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
          </div>

          <footer className="mt-12 text-center text-xs text-slate-400 dark:text-dark-sub pb-8">
            © 2025 Content Creation Workspace • React & Gemini
          </footer>
        </main>
      </div>

      {/* Module Detail Modal */}
      {activeDetailModule && (
        <ModuleDetailModal
          module={activeDetailModule}
          onClose={() => setDetailModuleId(null)}
          onSelect={() => {
            // In single mode, replace. In multi mode, add.
            if (isMultiSelectMode) {
               if (!selectedModuleIds.includes(activeDetailModule.id)) {
                 handleModuleSelect(activeDetailModule.id);
               }
            } else {
               setSelectedModuleIds([activeDetailModule.id]);
            }
            setDetailModuleId(null);
          }}
          onDelete={
            !isActiveModuleDefault
              ? () => handleDeleteModule(activeDetailModule.id) 
              : undefined
          }
          onEdit={
             !isActiveModuleDefault
              ? () => handleEditClick(activeDetailModule)
              : undefined
          }
        />
      )}

      {/* Create/Edit Module Modal */}
      {(isCreateModalOpen || editingModule) && (
        <CreateModuleModal
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingModule(null);
          }}
          onSave={editingModule ? handleUpdateModule : handleCreateModule}
          initialData={editingModule}
        />
      )}
    </div>
  );
}