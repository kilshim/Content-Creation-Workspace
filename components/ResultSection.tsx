import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Sparkles, AlertCircle, Loader2, Send, Download, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

interface ResultSectionProps {
  prompt: string;
  messages: ChatMessage[];
  isGeminiLoading: boolean;
  geminiError: string;
  onRunGemini: () => void;
  onSendFollowUp: (msg: string) => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ 
  prompt, 
  messages, 
  isGeminiLoading,
  geminiError,
  onRunGemini,
  onSendFollowUp
}) => {
  const [promptCopied, setPromptCopied] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGeminiLoading]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyMessage = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Add a temporary toast or indicator if needed per message
    } catch (err) {
      console.error('Failed to copy message', err);
    }
  };

  const handleDownloadChat = () => {
    if (messages.length === 0) return;
    
    // Create text content friendly for .txt files
    const content = messages.map(m => {
      const role = m.role === 'user' ? '👤 사용자' : '🤖 Gemini (AI)';
      const time = new Date(m.timestamp).toLocaleTimeString();
      return `[${role}] - ${time}\n\n${m.text}\n\n========================================\n`;
    }).join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gpt-workspace-chat-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGeminiLoading) return;
    onSendFollowUp(inputText);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Initial State: Show Prompt and "Run Gemini" button if no chat yet
  if (messages.length === 0 && !isGeminiLoading && !geminiError) {
    return (
      <section className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden transition-colors animate-fade-in-up">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-border flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">3</span>
            결과 및 실행
          </h2>
        </div>
        <div className="p-6">
          <div className="bg-slate-50 dark:bg-dark-panel border border-dashed border-slate-300 dark:border-dark-border rounded-xl p-5 mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs font-bold text-slate-400 dark:text-dark-sub uppercase tracking-wider">생성된 프롬프트 코드</div>
              <button 
                onClick={handleCopyPrompt} 
                className="text-xs flex items-center gap-1 text-slate-400 hover:text-brand-500 transition-colors"
              >
                {promptCopied ? <Check size={14} /> : <Copy size={14} />}
                {promptCopied ? '복사됨' : '복사'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 dark:text-slate-200 break-words max-h-60 overflow-y-auto custom-scrollbar">
              {prompt}
            </pre>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onRunGemini}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg hover:shadow-brand-500/25 transition-all transform hover:scale-105"
            >
              <Sparkles size={20} />
              Gemini로 실행하기 (채팅 시작)
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">
            버튼을 누르면 AI가 프롬프트를 분석하고 결과를 생성합니다.
          </p>
        </div>
      </section>
    );
  }

  // Chat Interface State
  return (
    <section className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden transition-colors animate-fade-in-up flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-border flex items-center justify-between shrink-0">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="text-brand-500" size={20} />
          Gemini 채팅 워크스페이스
        </h2>
        <div className="flex gap-2">
           <button
             onClick={handleDownloadChat}
             className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-dark-panel transition-colors text-slate-600 dark:text-slate-300"
             title="전체 대화 다운로드 (.txt)"
           >
             <Download size={14} />
             다운로드
           </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50 dark:bg-black/10 custom-scrollbar">
        {/* Helper text if chat just started */}
        {messages.length === 0 && isGeminiLoading && (
           <div className="text-center py-10 text-slate-400 animate-pulse">
             AI가 프롬프트를 분석하고 있습니다...
           </div>
        )}

        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          
          return (
            <div key={msg.id} className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1
                ${isUser ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}
              `}>
                {isUser ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Message Bubble */}
              <div className={`
                relative group max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm
                ${isUser 
                  ? 'bg-brand-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-dark-panel border border-slate-200 dark:border-dark-border text-slate-800 dark:text-slate-200 rounded-tl-none'}
              `}>
                {isUser ? (
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                ) : (
                  <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}

                {/* Copy Button (visible on hover) */}
                <button
                  onClick={() => handleCopyMessage(msg.text, msg.id)}
                  className={`
                    absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-medium py-1 px-2 rounded
                    ${isUser ? 'right-0 text-slate-400' : 'left-0 text-slate-400 hover:text-brand-500'}
                  `}
                >
                  <Copy size={12} /> 복사
                </button>
              </div>
            </div>
          );
        })}

        {isGeminiLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-1">
              <Bot size={16} />
            </div>
            <div className="bg-white dark:bg-dark-panel border border-slate-200 dark:border-dark-border rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-500" />
              <span className="text-xs text-slate-500">작성 중입니다...</span>
            </div>
          </div>
        )}

        {geminiError && (
          <div className="flex justify-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {geminiError}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 dark:border-dark-border bg-white dark:bg-dark-card shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="결과에 대해 추가로 질문하거나 수정 요청을 해보세요... (Shift+Enter로 줄바꿈)"
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-dark-panel border border-slate-200 dark:border-dark-border focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none h-[60px] text-sm custom-scrollbar"
            disabled={isGeminiLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isGeminiLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-600 text-white disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-brand-700 transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
};