import React, { useState, useEffect } from 'react';
import { X, Plus, Save, LayoutTemplate, Pencil } from 'lucide-react';
import { ModuleDef } from '../types';

interface CreateModuleModalProps {
  onClose: () => void;
  onSave: (module: ModuleDef) => void;
  initialData?: ModuleDef | null;
}

export const CreateModuleModal: React.FC<CreateModuleModalProps> = ({ onClose, onSave, initialData }) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('');

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label);
      setDescription(initialData.description);
      setInstruction(initialData.customInstruction || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !description || !instruction) return;

    const newModule: ModuleDef = {
      // Keep existing ID if editing, otherwise generate new one
      id: initialData ? initialData.id : `custom-${Date.now()}`,
      label,
      description,
      iconName: initialData ? initialData.iconName : 'Wand2', // Keep existing icon or default
      easyDescription: initialData ? initialData.easyDescription : '사용자가 직접 정의한 특별한 도구입니다.',
      exampleUsage: initialData ? initialData.exampleUsage : {
        input: '예시 내용을 입력하세요',
        output: '설정하신 지시사항에 맞춰 변환된 결과'
      },
      usageScenarios: initialData ? initialData.usageScenarios : ['사용자가 정의한 상황', '반복적인 업무 자동화'],
      isCustom: true,
      customInstruction: instruction
    };

    onSave(newModule);
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-dark-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-dark-border transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white dark:bg-dark-card p-6 border-b border-slate-100 dark:border-dark-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {isEditing ? <Pencil className="text-brand-500" size={24} /> : <LayoutTemplate className="text-brand-500" size={24} />}
            {isEditing ? '도구 수정하기' : '새로운 도구 만들기'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              도구 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="예: 이메일 정중하게 거절하기"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-dark-panel border border-slate-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              한 줄 설명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="예: 기분 나쁘지 않게 거절하는 답장 작성"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-dark-panel border border-slate-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              AI에게 시킬 일 (프롬프트 지시사항) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="예: 입력된 내용을 바탕으로 상대방에게 정중하게 거절하는 비즈니스 이메일을 작성해줘. 말투는 공손하게 하고, 대안을 제시해줘."
              className="w-full p-3 min-h-[120px] rounded-xl bg-slate-50 dark:bg-dark-panel border border-slate-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm resize-none"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              이 내용이 프롬프트에 자동으로 포함됩니다. 구체적일수록 좋습니다.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {isEditing ? <Save size={18} /> : <Plus size={18} />}
              {isEditing ? '변경사항 저장' : '도구 생성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};