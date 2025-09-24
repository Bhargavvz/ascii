// Theme utility functions for consistent styling across components

export interface ThemeColors {
  bg: string;
  border: string;
  text: string;
  accent: string;
  secondary: string;
}

export const getThemeColors = (theme: string): ThemeColors => {
  const themes: Record<string, ThemeColors> = {
    matrix: {
      bg: 'bg-black',
      border: 'border-green-500',
      text: 'text-green-400',
      accent: 'bg-green-600 hover:bg-green-700',
      secondary: 'bg-green-800 hover:bg-green-900'
    },
    amber: {
      bg: 'bg-amber-900',
      border: 'border-amber-400',
      text: 'text-amber-200',
      accent: 'bg-amber-600 hover:bg-amber-700',
      secondary: 'bg-amber-800 hover:bg-amber-900'
    },
    blue: {
      bg: 'bg-blue-900',
      border: 'border-blue-400',
      text: 'text-blue-200',
      accent: 'bg-blue-600 hover:bg-blue-700',
      secondary: 'bg-blue-800 hover:bg-blue-900'
    },
    classic: {
      bg: 'bg-gray-900',
      border: 'border-gray-500',
      text: 'text-gray-200',
      accent: 'bg-gray-600 hover:bg-gray-700',
      secondary: 'bg-gray-800 hover:bg-gray-900'
    }
  };

  return themes[theme] || themes.classic;
};

export const getButtonClass = (theme: string, variant: 'primary' | 'secondary' | 'close' = 'primary'): string => {
  const colors = getThemeColors(theme);
  
  const baseClasses = 'px-3 py-2 rounded text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  switch (variant) {
    case 'primary':
      return `${baseClasses} ${colors.accent} text-white`;
    case 'secondary':
      return `${baseClasses} ${colors.secondary} ${colors.text} border ${colors.border}`;
    case 'close':
      return `text-xl hover:opacity-75 ${colors.text} transition-opacity duration-200`;
    default:
      return `${baseClasses} ${colors.accent} text-white`;
  }
};

export const getInputClass = (theme: string): string => {
  const colors = getThemeColors(theme);
  return `w-full p-2 ${colors.bg} ${colors.text} border ${colors.border} rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-${colors.border.split('-')[1]}-400`;
};

export const getSelectClass = (theme: string): string => {
  const colors = getThemeColors(theme);
  return `${colors.bg} ${colors.text} border ${colors.border} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-opacity-50`;
};