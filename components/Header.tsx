import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
      <div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 flex items-center gap-2">
          <Sparkles className="text-brand-500" size={24} />
          콘텐츠 제작 워크스페이스
        </h1>
        <p className="text-sm text-slate-500 dark:text-dark-sub mt-1 ml-1">
          전문적인 프롬프트 생성부터 실행까지 한 번에
        </p>
      </div>
      
      <button
        onClick={toggleTheme}
        className="self-start sm:self-center flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-panel hover:bg-slate-50 dark:hover:bg-dark-card transition-all text-xs font-medium text-slate-600 dark:text-dark-sub shadow-sm"
        aria-label="테마 변경"
      >
        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        <span>{theme === 'dark' ? '라이트 모드' : '다크 모드'}</span>
      </button>
    </header>
  );
};