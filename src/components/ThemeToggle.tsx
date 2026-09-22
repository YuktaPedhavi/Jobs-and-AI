import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'full' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer backdrop-blur-md select-none ${
        isDark
          ? 'bg-[#0b1f3c]/90 border-[#163560] text-[#f7faeb] hover:border-[#d7e63b] hover:text-[#d7e63b] shadow-xs'
          : 'bg-[#ffffff]/90 border-[#d8dcce] text-[#061329] hover:border-[#1e5bb4] hover:text-[#1e5bb4] shadow-xs'
      } ${className}`}
      data-cursor-interactive="true"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-[#d7e63b] transition-transform duration-300 group-hover:-rotate-12" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#eab308] transition-transform duration-300 group-hover:rotate-45" />
        )}
      </div>

      {variant === 'full' && (
        <span className="font-semibold tracking-wider uppercase text-[11px]">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
};
