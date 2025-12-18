import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Key, Save, Trash2, Eye, EyeOff } from 'lucide-react';

interface GuideSectionProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({ apiKey, onApiKeyChange }) => {
  const [localKey, setLocalKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLocalKey(apiKey);
    if(apiKey) setIsSaved(true);
  }, [apiKey]);

  const handleSave = () => {
    onApiKeyChange(localKey);
    setIsSaved(true);
  };

  const handleDelete = () => {
    onApiKeyChange('');
    setLocalKey('');
    setIsSaved(false);
  };

  return (
    <div className="space-y-6 lg:sticky lg:top-8">
      
      {/* API Key Management Section */}
      <div className="bg-white dark:bg-dark-card border border-brand-200 dark:border-brand-900/30 rounded-2xl p-5 shadow-sm transition-colors ring-1 ring-brand-100 dark:ring-brand-900/20">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-brand-700 dark:text-brand-400">
          <Key size={16} />
          Gemini API 키 설정
        </h3>
        <p className="text-xs text-slate-500 dark:text-dark-sub mb-3 leading-relaxed">
          무료 Gemini API 키를 입력하면 바로 실행할 수 있어요. 키는 브라우저에만 저장됩니다.
        </p>
        
        <div className="space-y-2">
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={localKey}
              onChange={(e) => {
                setLocalKey(e.target.value);
                setIsSaved(false);
              }}
              placeholder="API 키를 입력하세요 (AI Studio)"
              className="w-full text-xs p-2.5 pr-8 rounded-lg bg-slate-50 dark:bg-dark-panel border border-slate-200 dark:border-dark-border focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!localKey}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                isSaved 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              {isSaved ? <><CheckCircle size={14} /> 저장됨</> : <><Save size={14} /> 저장</>}
            </button>
            {apiKey && (
              <button
                onClick={handleDelete}
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-dark-border text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="키 삭제"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          
          <div className="text-[10px] text-center text-slate-400 mt-2">
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline hover:text-brand-500">
              API 키 발급받기 (Google AI Studio) ↗
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 shadow-sm transition-colors">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-dark-border pb-3">
          <BookOpen size={20} className="text-brand-500" />
          이렇게 사용해보세요!
        </h3>
        
        <div className="space-y-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-dark-border" />

          {/* Step 1 */}
          <div className="relative pl-10">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 z-10 transition-colors">
              <span className="text-sm font-bold">1</span>
            </div>
            <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200 mb-1 pt-1">도구 선택하기</h4>
            <p className="text-xs text-slate-500 dark:text-dark-sub leading-relaxed">
              오른쪽에서 마음에 드는 카드를 콕 집어주세요. <br/>
              <span className="text-slate-400 dark:text-slate-500">(팁: 물음표 아이콘을 누르면 설명을 볼 수 있어요!)</span>
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative pl-10">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 z-10 transition-colors">
              <span className="text-sm font-bold">2</span>
            </div>
            <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200 mb-1 pt-1">주제 알려주기</h4>
            <p className="text-xs text-slate-500 dark:text-dark-sub leading-relaxed">
              "맛있는 커피 추천 글 써줘", "새로 나온 신발 홍보해줘" 처럼 친구에게 말하듯 주제를 적어주세요.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative pl-10">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 z-10 transition-colors">
              <span className="text-sm font-bold">3</span>
            </div>
            <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200 mb-1 pt-1">대화하며 완성하기</h4>
            <p className="text-xs text-slate-500 dark:text-dark-sub leading-relaxed">
              [Gemini로 실행]을 누르면 AI가 글을 써줍니다. 마음에 들 때까지 채팅으로 "조금 더 재미있게 고쳐줘!"라고 부탁해보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};