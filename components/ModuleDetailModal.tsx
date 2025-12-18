import React from 'react';
import { X, ArrowRight, Sparkles, Check, Trash2, Pencil } from 'lucide-react';
import { ModuleDef } from '../types';
import * as LucideIcons from 'lucide-react';

interface ModuleDetailModalProps {
  module: ModuleDef;
  onClose: () => void;
  onSelect: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({ module, onClose, onSelect, onDelete, onEdit }) => {
  const IconComponent = (LucideIcons as any)[module.iconName] || LucideIcons.Circle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-dark-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-dark-border transform transition-all animate-scale-up max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-white dark:bg-dark-card p-6 border-b border-slate-100 dark:border-dark-border">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-4 pr-8">
            <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl text-brand-600 dark:text-brand-400 shrink-0">
              <IconComponent size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{module.label}</h2>
                {module.isCustom && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-800">
                    Custom
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{module.description}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Easy Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="text-lg">🤔</span> 이건 뭐하는 도구인가요?
            </h3>
            <div className="bg-slate-50 dark:bg-dark-panel p-4 rounded-xl border border-slate-100 dark:border-dark-border">
               <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {module.easyDescription}
              </p>
            </div>
          </div>

          {/* Usage Scenarios */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="text-lg">💡</span> 언제 쓰면 좋나요?
            </h3>
            <ul className="space-y-2">
              {module.usageScenarios.map((scenario, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>{scenario}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Example */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <span className="text-lg">👀</span> 이렇게 바뀝니다!
            </h3>
            <div className="grid gap-3">
              <div className="relative pl-4 border-l-2 border-slate-300 dark:border-slate-600">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-1">입력 (내가 쓴 글)</span>
                <p className="text-sm text-slate-600 dark:text-slate-400">{module.exampleUsage.input}</p>
              </div>
              <div className="flex justify-center -my-1">
                 <ArrowRight size={16} className="text-slate-300 dark:text-slate-600 rotate-90" />
              </div>
              <div className="relative pl-4 border-l-2 border-brand-500">
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 block mb-1">결과 (AI가 만든 글)</span>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{module.exampleUsage.output}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-dark-border bg-slate-50 dark:bg-dark-panel/50 flex items-center gap-3 sticky bottom-0">
          {/* Edit Button (Custom Modules Only) */}
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition-all"
              title="도구 수정"
            >
              <Pencil size={18} />
            </button>
          )}

          {/* Delete Button (Custom Modules Only) */}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="px-4 py-3.5 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold transition-all"
              title="도구 삭제"
            >
              <Trash2 size={18} />
            </button>
          )}

          <button
            onClick={onSelect}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles size={18} />
            이 모듈 사용하기
          </button>
        </div>
      </div>
    </div>
  );
};