import * as vscode from 'vscode';
import * as MarkdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';
import markdownItEmoji from 'markdown-it-emoji';

type Token = {
    info: string;
    nesting: 1 | -1;
    content?: string;
};

export function activate(context: vscode.ExtensionContext) {
    return {
        extendMarkdownIt(md: MarkdownIt) {
            md.use(markdownItContainer, 'spoiler', {
                marker: '?',
                validate: (params: string) => {
                    return params.trim().startsWith('spoiler');
                },
                render: (tokens: Token[], idx: number) => {
                    const title = tokens[idx].info.replace('spoiler', '').trim();
                    if (tokens[idx].nesting === 1) {
                        return `<details class="spoiler"><summary>${title}</summary><div class="spoiler-content">`;
                    }
                    return '</div></details>';
                }
            });
            md.use(markdownItContainer, 'alert', {
                validate: (params: string) => {
                    return ['', 'info', 'warning', 'danger', 'success'].includes(params.trim());
                },
                render: (tokens: Token[], idx: number) => {
                    const type = tokens[idx].info.trim() || 'info';
                    if (tokens[idx].nesting === 1) {
                        return `<div class="alert alert-${type}">`;
                    }
                    return '</div>';
                }
            });
            md.use(markdownItEmoji);
            return md;
        }
    };
}