import React from 'react';
import { EXAMPLES } from '../constants';
import { Sparkles, Eraser, Layers } from 'lucide-react';

interface InputSectionProps {
  value: string;
  onChange: (val: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isReady: boolean;
  selectedCount?: number;
}

export const InputSection: React.FC<InputSectionProps> = ({ 
  value, 
  onChange, 
  onGenerate, 
  onClear,
  isReady,
  selectedCount = 0,
}) => {
  return (
    <section className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-border flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">2</span>
          주제 및 내용 입력
        </h2>
        {value && (
          <button 
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <Eraser size={14} /> 초기화
          </button>
        )}
      </div>
      
      <div className="p-6">
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="어떤 콘텐츠를 만들고 싶으신가요? (예: AI 자동화 전략에 대한 블로그 글 세트 만들어줘)"
            className="w-full min-h-[160px] p-4 rounded-xl bg-slate-50 dark:bg-dark-panel border border-slate-200 dark:border-dark-border text-slate-900 dark:text-dark-text placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-y transition-shadow text-base leading-relaxed"
          />
          <div className="absolute bottom-3 right-3 text-xs text-slate-400 pointer-events-none bg-slate-50 dark:bg-dark-panel px-2 py-1 rounded">
            {value.length}자
          </div>
        </div>
        
        {/* Quick Examples */}
        <div className="mt-4 mb-6">
          <div className="text-xs font-semibold text-slate-500 dark:text-dark-sub mb-2 ml-1">빠른 예시로 채우기:</div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => onChange(ex)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-dark-border/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-300 text-slate-600 dark:text-slate-400 border border-transparent hover:border-brand-200 dark:hover:border-brand-800 transition-all text-left"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-dark-border">
          <p className="text-xs text-slate-500 dark:text-dark-sub flex items-center gap-1">
            <span className="inline-block w-4 h-4 rounded-full bg-slate-100 dark:bg-dark-border text-center leading-4 text-[10px] font-bold">i</span>
            팁: 상세하게 적을수록 AI가 더 정확한 결과를 만듭니다.
          </p>
          
          <button
            onClick={onGenerate}
            disabled={!isReady}
            className={`
              w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg
              ${!isReady 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none dark:bg-dark-border dark:text-gray-600' 
                : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-brand-500/30'}
            `}
          >
            {selectedCount > 1 ? <Layers size={18} /> : <Sparkles size={18} />}
            {selectedCount > 1 ? `${selectedCount}개의 도구로 생성` : '프롬프트 생성'}
          </button>
        </div>
      </div>
    </section>
  );
};