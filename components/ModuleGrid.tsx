import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ModuleDef, ModuleId } from '../types';
import { HelpCircle, CheckCircle2, Trash2, Layers, CheckSquare } from 'lucide-react';

interface ModuleGridProps {
  modules: ModuleDef[];
  selectedIds: ModuleId[];
  onSelect: (id: ModuleId) => void;
  onInfoClick: (id: ModuleId) => void;
  onAddClick: () => void;
  onDelete?: (id: ModuleId) => void;
  isMultiSelectMode: boolean;
  onToggleMultiSelect: (enabled: boolean) => void;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ 
  modules, 
  selectedIds, 
  onSelect, 
  onInfoClick, 
  onAddClick, 
  onDelete,
  isMultiSelectMode,
  onToggleMultiSelect
}) => {
  return (
    <section className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-border bg-slate-50/50 dark:bg-dark-panel/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">1</span>
          도구(모듈) 선택
          {selectedIds.length > 0 && (
            <span className="text-xs font-normal text-slate-500 bg-white dark:bg-dark-card px-2 py-0.5 rounded-full border border-slate-200 dark:border-dark-border">
              {selectedIds.length}개 선택됨
            </span>
          )}
        </h2>

        {/* Multi Select Toggle */}
        <button
          onClick={() => onToggleMultiSelect(!isMultiSelectMode)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
            ${isMultiSelectMode 
              ? 'bg-brand-100 text-brand-700 border-brand-200 dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800' 
              : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 dark:bg-dark-card dark:text-slate-400 dark:border-dark-border dark:hover:bg-dark-panel'}
          `}
        >
          {isMultiSelectMode ? <CheckSquare size={14} /> : <Layers size={14} />}
          {isMultiSelectMode ? '다중 선택 모드 ON' : '다중 선택 모드 OFF'}
        </button>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => {
            const IconComponent = (LucideIcons as any)[module.iconName] || LucideIcons.Circle;
            const isSelected = selectedIds.includes(module.id);

            return (
              <div 
                key={module.id} 
                className="relative group h-full"
              >
                <button
                  onClick={() => onSelect(module.id)}
                  className={`
                    w-full h-full relative flex flex-col items-start text-left gap-3 p-5 rounded-2xl border-2 transition-all duration-200
                    ${isSelected 
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/10 shadow-sm' 
                      : 'border-slate-100 dark:border-dark-border bg-white dark:bg-dark-panel hover:border-brand-200 dark:hover:border-brand-800 hover:bg-slate-50 dark:hover:bg-dark-card'}
                  `}
                >
                  <div className="flex justify-between w-full">
                    <div className={`
                      p-2.5 rounded-xl transition-colors
                      ${isSelected ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' : 'bg-slate-100 dark:bg-dark-border text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-dark-panel shadow-sm'}
                    `}>
                      <IconComponent size={20} />
                    </div>
                    {isSelected && (
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white animate-in zoom-in duration-200 shadow-sm">
                        {isMultiSelectMode ? (
                           <span className="text-xs font-bold">{selectedIds.indexOf(module.id) + 1}</span>
                        ) : (
                           <CheckCircle2 size={14} />
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className={`font-bold text-sm mb-1 ${isSelected ? 'text-brand-700 dark:text-brand-300' : 'text-slate-700 dark:text-slate-200'} flex items-center gap-1.5`}>
                      {module.label}
                      {module.isCustom && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-normal">My</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                      {module.description}
                    </div>
                  </div>
                </button>
                
                {/* Delete Button (Custom Modules Only) */}
                {module.isCustom && onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(module.id);
                    }}
                    className="absolute top-4 right-12 p-1.5 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors z-10"
                    title="이 도구 삭제하기"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                
                {/* Info Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onInfoClick(module.id);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-brand-500 hover:bg-white dark:hover:bg-dark-card transition-colors z-10"
                  title="자세히 보기"
                >
                  <HelpCircle size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};