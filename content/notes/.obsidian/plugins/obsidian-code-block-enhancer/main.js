'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const DEFAULT_LANG_ATTR = 'language-text';
const DEFAULT_LANG = '';
const LANG_REG = /^language-/;
const LINE_SPLIT_MARK = '\n';
const SVG_COPY = parseToSVG('<?xml version="1.0" encoding="utf-8"?> <svg height="16" width="16" viewBox="0 0 16 16" version="1.1" data-view-component="true" class="copy" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>');
const SVG_SUCCESS = parseToSVG('<?xml version="1.0" encoding="utf-8"?> <svg height="16" width="16" viewBox="0 0 16 16" version="1.1" data-view-component="true" class="copy-success" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>');
function enhanceCodeBlock(el, ctx, plugin) {
    const code = el.querySelector('pre > code');
    // only change pre>code
    if (!code) {
        return;
    }
    let lang = DEFAULT_LANG;
    // return when lang is in exclude list
    if (plugin.settings.excludeLangs.some(eLangName => code.classList.contains(`language-${eLangName}`))) {
        return;
    }
    code.classList.forEach((value, key, parent) => {
        if (LANG_REG.test(value)) {
            lang = value.replace('language-', '');
            return;
        }
    });
    const pre = code.parentElement;
    const div = pre.parentElement;
    // Add default language style when lang is empty
    if (!code.classList.toString().contains('language-')) {
        pre.classList.add(DEFAULT_LANG_ATTR);
    }
    // Ignore already has copy button 
    if (pre.querySelector('div.code-block-copy-button')) {
        return;
    }
    // let div position: relative;
    div.classList.add('code-block-wrap');
    /* const { lineStart, lineEnd } = ctx.getSectionInfo(el)
    const lineSize = lineEnd - lineStart - 1 */
    const contentList = code.textContent.split(LINE_SPLIT_MARK);
    const lineSize = contentList.length - 1;
    const cbMeta = { langName: lang, lineSize, pre, code, div, contentList };
    const { useContextMenu, showLangName, showLineNumber } = plugin.settings;
    // create copy button in right
    addCopyButton(plugin, cbMeta);
    // create lang name tip in left
    if (showLangName) {
        addLangName(plugin, cbMeta);
    }
    // add line number
    if (showLineNumber) {
        addLineNumber(plugin, cbMeta);
    }
    //context menu
    if (useContextMenu) {
        enhanceContextMenu(plugin, cbMeta);
    }
}
function createElement(tagName, defaultClassName) {
    const element = document.createElement(tagName);
    if (defaultClassName) {
        element.className = defaultClassName;
    }
    return element;
}
function enhanceContextMenu(plugin, cbMeta) {
    const { pre, code, lineSize } = cbMeta;
    plugin.registerDomEvent(pre, 'contextmenu', (event) => {
        event.preventDefault();
        const target = event.target;
        if (target.tagName !== 'BUTTON') {
            const contextMenu = new obsidian.Menu(plugin.app);
            const selection = window.getSelection().toString();
            const editView = document.querySelector('.markdown-preview-view');
            const blockHeight = parseFloat(window.getComputedStyle(pre).height);
            const viewHeight = editView.clientHeight;
            const { offsetY, pageY } = event;
            const toBottom = blockHeight - ((viewHeight - pageY) + offsetY);
            const toTop = offsetY - pageY + 100;
            const eventScrollTop = editView.scrollTop;
            let eRowNum = Math.ceil((offsetY - 16) / 24);
            if (eRowNum < 1) {
                eRowNum = 1;
            }
            else if (eRowNum > lineSize) {
                eRowNum = lineSize;
            }
            if (selection) {
                contextMenu.addItem((item) => {
                    item
                        .setTitle('Copy')
                        .setIcon('two-blank-pages', 16)
                        .onClick((e) => {
                        navigator.clipboard.writeText(selection);
                    });
                });
            }
            contextMenu.addItem((item) => {
                item
                    .setTitle('Copy Block')
                    .setIcon('two-blank-pages', 16)
                    .onClick(() => {
                    navigator.clipboard.writeText(code.textContent);
                });
            });
            contextMenu.addItem((item) => {
                item
                    .setTitle('Copy Row')
                    .setIcon('two-blank-pages', 16)
                    .onClick(() => {
                    navigator.clipboard.writeText(cbMeta.contentList[eRowNum - 1]);
                });
            });
            if (blockHeight > viewHeight) {
                if (toTop > 0) {
                    contextMenu.addItem((item) => {
                        item
                            .setTitle('To Top')
                            .onClick((e) => {
                            editView.scrollTop = eventScrollTop - toTop;
                        });
                    });
                }
                if (toBottom > 0) {
                    contextMenu.addItem((item) => {
                        item
                            .setTitle('To Bottom')
                            .onClick((e) => {
                            editView.scrollTop = eventScrollTop + toBottom;
                        });
                    });
                }
            }
            contextMenu.showAtPosition({ x: event.clientX, y: event.clientY });
        }
    });
}
function addLangName(plugin, cbMeta) {
    const { langName, pre } = cbMeta;
    const langNameTip = createElement('span', 'code-block-lang-name');
    langNameTip.innerText = langName;
    pre.appendChild(langNameTip);
}
function addCopyButton(plugin, cbMeta) {
    const { code, pre } = cbMeta;
    const copyButton = createElement('div', 'code-block-copy-button');
    copyButton.setAttribute('aria-label', 'Copy');
    replaceFirstChild(copyButton, SVG_COPY());
    const copyHandler = () => {
        navigator.clipboard.writeText(code.textContent).then(() => {
            replaceFirstChild(copyButton, SVG_SUCCESS());
            setTimeout(() => {
                replaceFirstChild(copyButton, SVG_COPY());
            }, 1500);
        }, () => {
            copyButton.innerText = 'Error';
        });
    };
    plugin.registerDomEvent(copyButton, 'click', copyHandler);
    pre.appendChild(copyButton);
    pre.classList.add('code-block-pre__has-copy-button');
}
function addLineNumber(plugin, cbMeta) {
    const { lineSize, pre } = cbMeta;
    // const { fontSize, lineHeight } = window.getComputedStyle(cbMeta.code)
    const lineNumber = createElement('span', 'code-block-linenum-wrap');
    Array.from({ length: lineSize }, (v, k) => k).forEach(i => {
        const singleLine = createElement('span', 'code-block-linenum');
        // singleLine.style.fontSize = fontSize
        // singleLine.style.lineHeight = lineHeight
        lineNumber.appendChild(singleLine);
    });
    pre.appendChild(lineNumber);
    pre.classList.add('code-block-pre__has-linenum');
}
function parseToSVG(svgString) {
    return function () {
        return new DOMParser().parseFromString(svgString, 'image/svg+xml').firstChild;
    };
}
function replaceFirstChild(target, child) {
    if (target.childNodes && target.childNodes.length > 0) {
        target.removeChild(target.childNodes[0]);
    }
    target.appendChild(child);
}

const DEFAULT_SETTINGS = {
    excludeLangs: ['todoist'],
    showLangName: true,
    showLineNumber: true,
    useContextMenu: true
};
class CodeBlockEnhancer extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.addSettingTab(new CbEnhancerSettingsTab(this.app, this));
            this.registerMarkdownPostProcessor((el, ctx) => {
                enhanceCodeBlock(el, ctx, this);
            });
        });
    }
    onunload() {
        console.log('Unloading Code Block Enhancer Plugin');
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}
class CbEnhancerSettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        const pluginSetting = this.plugin.settings;
        containerEl.empty();
        containerEl.createEl('h2', { text: `Code Block Enhancer Settings ${this.plugin.manifest.version}` });
        new obsidian.Setting(containerEl)
            .setName('Exclude language list')
            .setDesc("Will not be enhanced in these languages")
            .addTextArea(text => text
            .setPlaceholder('Separate by `,` (like `todoist,other,...`)')
            .setValue(pluginSetting.excludeLangs.join(','))
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            pluginSetting.excludeLangs = value.split(',');
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName('Show language name')
            .setDesc('Enable this options will show language name')
            .addToggle(cb => {
            cb
                .setValue(pluginSetting.showLangName)
                .onChange((isEnable) => __awaiter(this, void 0, void 0, function* () {
                pluginSetting.showLangName = isEnable;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Show line number')
            .setDesc('Enable this options will show line number')
            .addToggle(cb => {
            cb
                .setValue(pluginSetting.showLineNumber)
                .onChange((isEnable) => __awaiter(this, void 0, void 0, function* () {
                pluginSetting.showLineNumber = isEnable;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Use ContextMenu')
            .setDesc('Replace default contextmenu when right-click in code block')
            .addToggle(cb => {
            cb
                .setValue(pluginSetting.useContextMenu)
                .onChange((isEnable) => __awaiter(this, void 0, void 0, function* () {
                pluginSetting.useContextMenu = isEnable;
                yield this.plugin.saveSettings();
            }));
        });
    }
}

module.exports = CodeBlockEnhancer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9jb3JlLnRzIiwiLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbIk1lbnUiLCJQbHVnaW4iLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFD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
