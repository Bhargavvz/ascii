import figlet from 'figlet';

export interface ASCIIArtOptions {
  font?: string;
  horizontalLayout?: string;
  verticalLayout?: string;
  width?: number;
  whitespaceBreak?: boolean;
}

export const generateASCIIText = async (
  text: string,
  options: ASCIIArtOptions = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const opts = {
      font: options.font || 'ANSI Shadow',
      horizontalLayout: options.horizontalLayout || 'default',
      verticalLayout: options.verticalLayout || 'default',
      width: options.width || 80,
      whitespaceBreak: options.whitespaceBreak || true,
    };

    figlet.text(text, opts as any, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data || '');
      }
    });
  });
};

export const createSkillBar = (skill: string, percentage: number, maxWidth: number = 20): string => {
  const filledBlocks = Math.floor((percentage / 100) * maxWidth);
  const emptyBlocks = maxWidth - filledBlocks;
  const bar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  return `${skill.padEnd(15)} ${bar} ${percentage}%`;
};

export const createTreeStructure = (structure: any, prefix: string = '', isLast: boolean = true): string => {
  let result = '';
  const keys = Object.keys(structure);
  
  keys.forEach((key, index) => {
    const isLastItem = index === keys.length - 1;
    const connector = isLastItem ? '└── ' : '├── ';
    const nextPrefix = prefix + (isLastItem ? '    ' : '│   ');
    
    result += prefix + connector + key + '\n';
    
    if (typeof structure[key] === 'object' && structure[key] !== null) {
      result += createTreeStructure(structure[key], nextPrefix, isLastItem);
    }
  });
  
  return result;
};

export const createBorder = (content: string, char: string = '═'): string => {
  const lines = content.split('\n');
  const maxWidth = Math.max(...lines.map(line => line.length));
  const border = char.repeat(maxWidth + 4);
  
  let result = '╔' + border + '╗\n';
  lines.forEach(line => {
    result += '║ ' + line.padEnd(maxWidth) + ' ║\n';
  });
  result += '╚' + border + '╝';
  
  return result;
};

export const typewriterEffect = (text: string, speed: number = 50): Promise<void> => {
  return new Promise((resolve) => {
    let i = 0;
    const element = document.getElementById('typewriter-output');
    if (!element) {
      resolve();
      return;
    }
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
};

export const matrixEffect = (): string => {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const width = 80;
  const height = 20;
  let result = '';
  
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (Math.random() > 0.85) {
        result += chars[Math.floor(Math.random() * chars.length)];
      } else {
        result += ' ';
      }
    }
    result += '\n';
  }
  
  return result;
};

export const colorText = (text: string, color: string): string => {
  const colors: { [key: string]: string } = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
  };
  
  return `${colors[color] || ''}${text}${colors.reset}`;
};