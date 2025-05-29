import * as vscode from 'vscode';
import markdownItContainer from 'markdown-it-container';
import markdownItEmoji from 'markdown-it-emoji';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      md.use(markdownItContainer, 'alert', {
        validate: () => true,
        render: (tokens: any, idx: number) => {
          return tokens[idx].nesting === 1 ? '<div class="alert">' : '</div>';
        }
      });

      md.use(markdownItContainer, 'spoiler', {
        marker: '?',
        validate: () => true,
        render: (tokens: any, idx: number) => {
          return tokens[idx].nesting === 1 ? 
            '<div class="spoiler"><details><summary>' : 
            '</summary></details></div>';
        }
      });

      md.use(markdownItEmoji, {
        defs: {
          'fire': '🔥',
          'rocket': '🚀',
          'warning': '⚠️',
          'check': '✅',
        },
        shortcuts: {
          ':fire:': '🔥',
          ':rocket:': '🚀',
          ':warning:': '⚠️',
          ':check:': '✅',
        }
      });

      return md;
    }
  };
}