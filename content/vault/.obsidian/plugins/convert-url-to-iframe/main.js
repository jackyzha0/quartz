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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function updateUrlIfYoutube(url) {
    // Youtube url format: 
    // - youtube.com/.../?...&v=[Video Id]
    // - youtu.com/[Video Id]
    // - youtube.com/embed => don't do anything it's already an embed link
    var youtubeIdRegex = /(youtube(?<top_domain1>(\.\w{2,3}){1,2})\/([^\/]+\/.+\/|.*[?&]v=)|youtu(?<top_domain2>(\.\w{2,3}){1,2})\/)(?<id>[a-zA-Z0-9_-]{11})/gi;
    var id = youtubeIdRegex.exec(url);
    if (id) {
        var urlParameterMatches = url.match(/\?([^&]+)/);
        var urlParameters = new URLSearchParams(urlParameterMatches ? urlParameterMatches[0] : '');
        // We need to remove the `v` parameter which contains the video id since we put it in the url
        urlParameters.delete('v');
        if (urlParameters.has('t')) {
            urlParameters.set('start', urlParameters.get('t'));
            urlParameters.delete('t');
        }
        var parameters = urlParameters.toString().length > 0 ? "?" + urlParameters.toString() : '';
        var topDomain = id.groups['top_domain1'] || id.groups['top_domain2'] || ".com";
        return "https://www.youtube" + topDomain + "/embed/" + id.groups['id'] + parameters;
    }
    return url;
}
function isUrl(text) {
    var urlRegex = new RegExp("^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$");
    return urlRegex.test(text);
}

var defaultHeight = "300px";
var ConfigureIframeModal = /** @class */ (function (_super) {
    __extends(ConfigureIframeModal, _super);
    function ConfigureIframeModal(app, url, editor) {
        var _this = _super.call(this, app) || this;
        _this.url = url;
        _this.editor = editor;
        // Allow the modal to grow in width
        _this.containerEl.className += ' iframe__modal';
        return _this;
    }
    ConfigureIframeModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        var container = contentEl.createEl('div');
        container.className = 'iframe__modal__container';
        var title = contentEl.createEl('h2');
        title.innerText = "This is how the iframe is going to look";
        var subTitle = contentEl.createEl('div');
        subTitle.innerText = "To choose the size, drag the bottom right";
        var _a = createIframeContainerEl(contentEl, this.url), iframeContainer = _a.iframeContainer, iframeAspectRatioContainer = _a.iframeAspectRatioContainer;
        var widthCheckbox = createShouldUseDefaultWidthCheckbox(iframeContainer, iframeAspectRatioContainer);
        var aspectRatioInput = createAspectRatioInput(iframeAspectRatioContainer);
        var cancelButton = contentEl.createEl('button');
        cancelButton.setText('Cancel');
        cancelButton.onclick = function (e) {
            e.preventDefault();
            _this.close();
        };
        var okButton = contentEl.createEl('button');
        okButton.setText('OK');
        okButton.className = 'mod-warning';
        okButton.onclick = function (e) {
            e.preventDefault();
            iframeContainer.className = "";
            // Recompute the height to remove the possible empty space
            iframeContainer.style.height = iframeAspectRatioContainer.offsetHeight + 'px';
            var generatedIframe = iframeAspectRatioContainer.outerHTML;
            _this.editor.replaceSelection(generatedIframe);
            _this.close();
        };
        var buttonContainer = contentEl.createEl('div');
        buttonContainer.className = 'button__container space-x';
        buttonContainer.appendChild(okButton);
        buttonContainer.appendChild(cancelButton);
        container.appendChild(title);
        container.appendChild(subTitle);
        container.appendChild(aspectRatioInput);
        container.appendChild(widthCheckbox);
        container.appendChild(iframeContainer);
        container.appendChild(buttonContainer);
        contentEl.appendChild(container);
    };
    ConfigureIframeModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return ConfigureIframeModal;
}(obsidian.Modal));
function createIframeContainerEl(contentEl, url) {
    // Inline styling to make sure that the created iframe will keep the style even without the plugin
    // This container can be resized
    var iframeContainer = contentEl.createEl('div');
    iframeContainer.className = "iframe_container space-x";
    iframeContainer.style.overflow = 'auto';
    iframeContainer.style.resize = 'both';
    iframeContainer.style.height = defaultHeight;
    // This container enforce the aspect ratio. i.e. it's height is based on the width * ratio
    var ratioContainer = iframeContainer.createEl('div');
    ratioContainer.style.display = 'block';
    ratioContainer.style.position = 'relative';
    ratioContainer.style.width = '100%';
    // The height is determined by the padding which respect the ratio
    // See https://www.benmarshall.me/responsive-iframes/
    ratioContainer.style.height = "0px";
    ratioContainer.style.setProperty('--aspect-ratio', '9/16');
    ratioContainer.style.paddingBottom = 'calc(var(--aspect-ratio) * 100%)';
    var iframe = ratioContainer.createEl('iframe');
    iframe.src = url;
    iframe.allow = "fullscreen";
    iframe.style.position = 'absolute';
    iframe.style.top = '0px';
    iframe.style.left = '0px';
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    // Recompute the iframe height with the ratio to avoid any empty space
    iframeContainer.style.height = ratioContainer.offsetHeight + 'px';
    return {
        iframeContainer: iframeContainer,
        iframeAspectRatioContainer: ratioContainer
    };
}
function createShouldUseDefaultWidthCheckbox(iframeContainer, iframeAspectRatioContainer) {
    var name = "shouldUseDefaultWidth";
    var checkboxContainer = iframeContainer.createEl('div');
    checkboxContainer.className = 'space-x';
    var label = checkboxContainer.createEl('button');
    label.setAttribute('for', name);
    label.innerText = 'Match the note width';
    label.onclick = function (e) {
        iframeContainer.style.width = '100%';
        iframeContainer.style.height = iframeAspectRatioContainer.offsetHeight + 'px';
    };
    return checkboxContainer;
}
function createAspectRatioInput(iframeRatioContainer) {
    var aspectRatioInputContainer = iframeRatioContainer.createEl('div');
    var heightInputName = "heightValue";
    aspectRatioInputContainer.className = "space-x";
    var heightInputLabel = aspectRatioInputContainer.createEl('label');
    heightInputLabel.setAttribute('for', heightInputName);
    heightInputLabel.innerText = 'Aspect Ratio: ';
    var ratioInput = new obsidian.DropdownComponent(aspectRatioInputContainer);
    ratioInput.addOptions({
        '9/16': '16/9',
        '3/4': '4/3',
        'none': 'none'
    });
    ratioInput.onChange(function (value) {
        if (value === 'none') {
            iframeRatioContainer.style.paddingBottom = '0px';
            iframeRatioContainer.style.height = '100%';
        }
        else {
            iframeRatioContainer.style.paddingBottom = 'calc(var(--aspect-ratio) * 100%)';
            iframeRatioContainer.style.height = '0px';
        }
        iframeRatioContainer.style.setProperty('--aspect-ratio', value);
    });
    return aspectRatioInputContainer;
}

var FormatNotionPlugin = /** @class */ (function (_super) {
    __extends(FormatNotionPlugin, _super);
    function FormatNotionPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormatNotionPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('Loading obsidian-convert-url-to-iframe');
                this.addCommand({
                    id: "url-to-iframe",
                    name: "URL to iframe/preview",
                    callback: function () { return _this.urlToIframe(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "i",
                        },
                    ],
                });
                return [2 /*return*/];
            });
        });
    };
    FormatNotionPlugin.prototype.urlToIframe = function () {
        var activeLeaf = this.app.workspace.activeLeaf;
        var editor = activeLeaf.view.sourceMode.cmEditor;
        var selectedText = editor.somethingSelected()
            ? editor.getSelection()
            : false;
        if (selectedText && isUrl(selectedText)) {
            var url = updateUrlIfYoutube(selectedText);
            var modal = new ConfigureIframeModal(this.app, url, editor);
            modal.open();
        }
        else {
            new obsidian.Notice('Select a URL to convert to an iframe.');
        }
    };
    return FormatNotionPlugin;
}(obsidian.Plugin));

module.exports = FormatNotionPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImlmcmFtZV9jb252ZXJ0ZXIudHMiLCJjb25maWd1cmVfaWZyYW1lX21vZGFsLnRzIiwibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVVybElmWW91dHViZSh1cmw6IHN0cmluZykge1xuICAgIC8vIFlvdXR1YmUgdXJsIGZvcm1hdDogXG4gICAgLy8gLSB5b3V0dWJlLmNvbS8uLi4vPy4uLiZ2PVtWaWRlbyBJZF1cbiAgICAvLyAtIHlvdXR1LmNvbS9bVmlkZW8gSWRdXG4gICAgLy8gLSB5b3V0dWJlLmNvbS9lbWJlZCA9PiBkb24ndCBkbyBhbnl0aGluZyBpdCdzIGFscmVhZHkgYW4gZW1iZWQgbGlua1xuICAgIGNvbnN0IHlvdXR1YmVJZFJlZ2V4ID0gLyh5b3V0dWJlKD88dG9wX2RvbWFpbjE+KFxcLlxcd3syLDN9KXsxLDJ9KVxcLyhbXlxcL10rXFwvLitcXC98LipbPyZddj0pfHlvdXR1KD88dG9wX2RvbWFpbjI+KFxcLlxcd3syLDN9KXsxLDJ9KVxcLykoPzxpZD5bYS16QS1aMC05Xy1dezExfSkvZ2k7XG4gICAgY29uc3QgaWQgPSB5b3V0dWJlSWRSZWdleC5leGVjKHVybClcbiAgICBpZiAoaWQpIHtcbiAgICAgICAgY29uc3QgdXJsUGFyYW1ldGVyTWF0Y2hlcyA9IHVybC5tYXRjaCgvXFw/KFteJl0rKS8pO1xuICAgICAgICBjb25zdCB1cmxQYXJhbWV0ZXJzID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhcbiAgICAgICAgICAgIHVybFBhcmFtZXRlck1hdGNoZXMgPyB1cmxQYXJhbWV0ZXJNYXRjaGVzWzBdIDogJydcbiAgICAgICAgKVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gcmVtb3ZlIHRoZSBgdmAgcGFyYW1ldGVyIHdoaWNoIGNvbnRhaW5zIHRoZSB2aWRlbyBpZCBzaW5jZSB3ZSBwdXQgaXQgaW4gdGhlIHVybFxuICAgICAgICB1cmxQYXJhbWV0ZXJzLmRlbGV0ZSgndicpXG5cbiAgICAgICAgaWYgKHVybFBhcmFtZXRlcnMuaGFzKCd0JykpIHtcbiAgICAgICAgICAgIHVybFBhcmFtZXRlcnMuc2V0KCdzdGFydCcsIHVybFBhcmFtZXRlcnMuZ2V0KCd0JykpO1xuICAgICAgICAgICAgdXJsUGFyYW1ldGVycy5kZWxldGUoJ3QnKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IHVybFBhcmFtZXRlcnMudG9TdHJpbmcoKS5sZW5ndGggPiAwID8gYD8ke3VybFBhcmFtZXRlcnMudG9TdHJpbmcoKX1gIDogJyc7XG4gICAgICAgIGNvbnN0IHRvcERvbWFpbiA9IGlkLmdyb3Vwc1sndG9wX2RvbWFpbjEnXSB8fCBpZC5ncm91cHNbJ3RvcF9kb21haW4yJ10gfHwgXCIuY29tXCI7XG5cbiAgICAgICAgcmV0dXJuIGBodHRwczovL3d3dy55b3V0dWJlJHt0b3BEb21haW59L2VtYmVkLyR7aWQuZ3JvdXBzWydpZCddfSR7cGFyYW1ldGVyc31gO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVcmwodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdXJsUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgICBcIl4oaHR0cDpcXFxcL1xcXFwvd3d3XFxcXC58aHR0cHM6XFxcXC9cXFxcL3d3d1xcXFwufGh0dHA6XFxcXC9cXFxcL3xodHRwczpcXFxcL1xcXFwvKT9bYS16MC05XSsoW1xcXFwtLl17MX1bYS16MC05XSspKlxcXFwuW2Etel17Miw1fSg6WzAtOV17MSw1fSk/KFxcXFwvLiopPyRcIlxuICAgICk7XG4gICAgcmV0dXJuIHVybFJlZ2V4LnRlc3QodGV4dCk7XG59XG4iLCJpbXBvcnQgeyBBcHAsIERyb3Bkb3duQ29tcG9uZW50LCBNb2RhbCB9IGZyb20gJ29ic2lkaWFuJztcblxuXG5jb25zdCBkZWZhdWx0SGVpZ2h0ID0gXCIzMDBweFwiXG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmVJZnJhbWVNb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0dXJsOiBzdHJpbmc7XG5cdHN1Y2VzczogYm9vbGVhbjtcblx0Z2VuZXJhdGVkSWZyYW1lOiBzdHJpbmc7XG5cdGVkaXRvcjogYW55O1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCB1cmw6IHN0cmluZywgZWRpdG9yOiBhbnkpIHtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMudXJsID0gdXJsO1xuXHRcdHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuXG5cdFx0Ly8gQWxsb3cgdGhlIG1vZGFsIHRvIGdyb3cgaW4gd2lkdGhcblx0XHR0aGlzLmNvbnRhaW5lckVsLmNsYXNzTmFtZSArPSAnIGlmcmFtZV9fbW9kYWwnO1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGxldCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcblxuXHRcdGNvbnN0IGNvbnRhaW5lciA9IGNvbnRlbnRFbC5jcmVhdGVFbCgnZGl2Jyk7XG5cdFx0Y29udGFpbmVyLmNsYXNzTmFtZSA9ICdpZnJhbWVfX21vZGFsX19jb250YWluZXInO1xuXG5cdFx0Y29uc3QgdGl0bGUgPSBjb250ZW50RWwuY3JlYXRlRWwoJ2gyJyk7XG5cdFx0dGl0bGUuaW5uZXJUZXh0ID0gXCJUaGlzIGlzIGhvdyB0aGUgaWZyYW1lIGlzIGdvaW5nIHRvIGxvb2tcIjtcblxuXHRcdGNvbnN0IHN1YlRpdGxlID0gY29udGVudEVsLmNyZWF0ZUVsKCdkaXYnKTtcblx0XHRzdWJUaXRsZS5pbm5lclRleHQgPSBcIlRvIGNob29zZSB0aGUgc2l6ZSwgZHJhZyB0aGUgYm90dG9tIHJpZ2h0XCI7XG5cblx0XHRjb25zdCB7aWZyYW1lQ29udGFpbmVyLCBpZnJhbWVBc3BlY3RSYXRpb0NvbnRhaW5lciB9ID0gY3JlYXRlSWZyYW1lQ29udGFpbmVyRWwoY29udGVudEVsLCB0aGlzLnVybCk7XG5cdFx0Y29uc3Qgd2lkdGhDaGVja2JveCA9IGNyZWF0ZVNob3VsZFVzZURlZmF1bHRXaWR0aENoZWNrYm94KGlmcmFtZUNvbnRhaW5lciwgaWZyYW1lQXNwZWN0UmF0aW9Db250YWluZXIpO1xuXHRcdGNvbnN0IGFzcGVjdFJhdGlvSW5wdXQgPSBjcmVhdGVBc3BlY3RSYXRpb0lucHV0KGlmcmFtZUFzcGVjdFJhdGlvQ29udGFpbmVyKTtcblxuXHRcdGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGNvbnRlbnRFbC5jcmVhdGVFbCgnYnV0dG9uJyk7XG5cdFx0Y2FuY2VsQnV0dG9uLnNldFRleHQoJ0NhbmNlbCcpO1xuXHRcdGNhbmNlbEJ1dHRvbi5vbmNsaWNrID0gKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9O1xuXG5cdFx0Y29uc3Qgb2tCdXR0b24gPSBjb250ZW50RWwuY3JlYXRlRWwoJ2J1dHRvbicpO1xuXHRcdG9rQnV0dG9uLnNldFRleHQoJ09LJyk7XG5cdFx0b2tCdXR0b24uY2xhc3NOYW1lID0gJ21vZC13YXJuaW5nJztcblx0XHRva0J1dHRvbi5vbmNsaWNrID0gKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0aWZyYW1lQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiXCI7XG5cdFx0XHQvLyBSZWNvbXB1dGUgdGhlIGhlaWdodCB0byByZW1vdmUgdGhlIHBvc3NpYmxlIGVtcHR5IHNwYWNlXG5cdFx0XHRpZnJhbWVDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gaWZyYW1lQXNwZWN0UmF0aW9Db250YWluZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4Jztcblx0XHRcdGNvbnN0IGdlbmVyYXRlZElmcmFtZSA9IGlmcmFtZUFzcGVjdFJhdGlvQ29udGFpbmVyLm91dGVySFRNTDtcblx0XHRcdHRoaXMuZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oZ2VuZXJhdGVkSWZyYW1lKTtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9O1xuXG5cblx0XHRjb25zdCBidXR0b25Db250YWluZXIgPSBjb250ZW50RWwuY3JlYXRlRWwoJ2RpdicpO1xuXHRcdGJ1dHRvbkNvbnRhaW5lci5jbGFzc05hbWUgPSAnYnV0dG9uX19jb250YWluZXIgc3BhY2UteCc7XG5cdFx0YnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKG9rQnV0dG9uKTtcblx0XHRidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcblxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHN1YlRpdGxlKTtcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYXNwZWN0UmF0aW9JbnB1dCk7XG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHdpZHRoQ2hlY2tib3gpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChpZnJhbWVDb250YWluZXIpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xuXHRcdGNvbnRlbnRFbC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXHR9XG5cblx0b25DbG9zZSgpIHtcblx0XHRsZXQgeyBjb250ZW50RWwgfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUlmcmFtZUNvbnRhaW5lckVsKGNvbnRlbnRFbDogSFRNTEVsZW1lbnQsIHVybDogc3RyaW5nKTogeyBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50LCBpZnJhbWVBc3BlY3RSYXRpb0NvbnRhaW5lcjogSFRNTEVsZW1lbnQgfSB7XG5cdC8vIElubGluZSBzdHlsaW5nIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBjcmVhdGVkIGlmcmFtZSB3aWxsIGtlZXAgdGhlIHN0eWxlIGV2ZW4gd2l0aG91dCB0aGUgcGx1Z2luXG5cblx0Ly8gVGhpcyBjb250YWluZXIgY2FuIGJlIHJlc2l6ZWRcblx0Y29uc3QgaWZyYW1lQ29udGFpbmVyID0gY29udGVudEVsLmNyZWF0ZUVsKCdkaXYnKTtcblx0aWZyYW1lQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiaWZyYW1lX2NvbnRhaW5lciBzcGFjZS14XCJcblx0aWZyYW1lQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuXHRpZnJhbWVDb250YWluZXIuc3R5bGUucmVzaXplID0gJ2JvdGgnO1xuXHRpZnJhbWVDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gZGVmYXVsdEhlaWdodDtcblxuXHQvLyBUaGlzIGNvbnRhaW5lciBlbmZvcmNlIHRoZSBhc3BlY3QgcmF0aW8uIGkuZS4gaXQncyBoZWlnaHQgaXMgYmFzZWQgb24gdGhlIHdpZHRoICogcmF0aW9cblx0Y29uc3QgcmF0aW9Db250YWluZXIgPSBpZnJhbWVDb250YWluZXIuY3JlYXRlRWwoJ2RpdicpO1xuXHRyYXRpb0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuXHRyYXRpb0NvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG5cdHJhdGlvQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuXHQvLyBUaGUgaGVpZ2h0IGlzIGRldGVybWluZWQgYnkgdGhlIHBhZGRpbmcgd2hpY2ggcmVzcGVjdCB0aGUgcmF0aW9cblx0Ly8gU2VlIGh0dHBzOi8vd3d3LmJlbm1hcnNoYWxsLm1lL3Jlc3BvbnNpdmUtaWZyYW1lcy9cblx0cmF0aW9Db250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcblx0cmF0aW9Db250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoJy0tYXNwZWN0LXJhdGlvJywgJzkvMTYnKTtcblx0cmF0aW9Db250YWluZXIuc3R5bGUucGFkZGluZ0JvdHRvbSA9ICdjYWxjKHZhcigtLWFzcGVjdC1yYXRpbykgKiAxMDAlKSc7XG5cblx0Y29uc3QgaWZyYW1lID0gcmF0aW9Db250YWluZXIuY3JlYXRlRWwoJ2lmcmFtZScpO1xuXHRpZnJhbWUuc3JjID0gdXJsO1xuXHRpZnJhbWUuYWxsb3cgPSBcImZ1bGxzY3JlZW5cIlxuXHRpZnJhbWUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRpZnJhbWUuc3R5bGUudG9wID0gJzBweCc7XG5cdGlmcmFtZS5zdHlsZS5sZWZ0ID0gJzBweCc7XG5cdGlmcmFtZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG5cdGlmcmFtZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcblxuXHQvLyBSZWNvbXB1dGUgdGhlIGlmcmFtZSBoZWlnaHQgd2l0aCB0aGUgcmF0aW8gdG8gYXZvaWQgYW55IGVtcHR5IHNwYWNlXG5cdGlmcmFtZUNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSByYXRpb0NvbnRhaW5lci5vZmZzZXRIZWlnaHQgKyAncHgnO1xuXG5cdHJldHVybiB7XG5cdFx0aWZyYW1lQ29udGFpbmVyLFxuXHRcdGlmcmFtZUFzcGVjdFJhdGlvQ29udGFpbmVyOiByYXRpb0NvbnRhaW5lclxuXHR9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaG91bGRVc2VEZWZhdWx0V2lkdGhDaGVja2JveChpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50LCBpZnJhbWVBc3BlY3RSYXRpb0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBIVE1MRGl2RWxlbWVudCB7XG5cdGNvbnN0IG5hbWUgPSBcInNob3VsZFVzZURlZmF1bHRXaWR0aFwiO1xuXHRjb25zdCBjaGVja2JveENvbnRhaW5lciA9IGlmcmFtZUNvbnRhaW5lci5jcmVhdGVFbCgnZGl2Jyk7XG5cdGNoZWNrYm94Q29udGFpbmVyLmNsYXNzTmFtZSA9ICdzcGFjZS14J1xuXG5cdGNvbnN0IGxhYmVsID0gY2hlY2tib3hDb250YWluZXIuY3JlYXRlRWwoJ2J1dHRvbicpO1xuXHRsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIG5hbWUpO1xuXHRsYWJlbC5pbm5lclRleHQgPSAnTWF0Y2ggdGhlIG5vdGUgd2lkdGgnO1xuXG5cdGxhYmVsLm9uY2xpY2sgPSAoZSkgPT4ge1xuXHRcdGlmcmFtZUNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcblx0XHRpZnJhbWVDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gaWZyYW1lQXNwZWN0UmF0aW9Db250YWluZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4Jztcblx0fVxuXG5cdHJldHVybiBjaGVja2JveENvbnRhaW5lcjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXNwZWN0UmF0aW9JbnB1dChpZnJhbWVSYXRpb0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBIVE1MRGl2RWxlbWVudCB7XG5cdGNvbnN0IGFzcGVjdFJhdGlvSW5wdXRDb250YWluZXIgPSBpZnJhbWVSYXRpb0NvbnRhaW5lci5jcmVhdGVFbCgnZGl2Jyk7XG5cdGNvbnN0IGhlaWdodElucHV0TmFtZSA9IFwiaGVpZ2h0VmFsdWVcIjtcblx0YXNwZWN0UmF0aW9JbnB1dENvbnRhaW5lci5jbGFzc05hbWUgPSBcInNwYWNlLXhcIlxuXG5cdGNvbnN0IGhlaWdodElucHV0TGFiZWwgPSBhc3BlY3RSYXRpb0lucHV0Q29udGFpbmVyLmNyZWF0ZUVsKCdsYWJlbCcpO1xuXHRoZWlnaHRJbnB1dExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgaGVpZ2h0SW5wdXROYW1lKTtcblx0aGVpZ2h0SW5wdXRMYWJlbC5pbm5lclRleHQgPSAnQXNwZWN0IFJhdGlvOiAnO1xuXG5cdGNvbnN0IHJhdGlvSW5wdXQgPSBuZXcgRHJvcGRvd25Db21wb25lbnQoYXNwZWN0UmF0aW9JbnB1dENvbnRhaW5lcilcblx0cmF0aW9JbnB1dC5hZGRPcHRpb25zKHtcblx0XHQnOS8xNic6ICcxNi85JywgXG5cdFx0JzMvNCc6ICc0LzMnLCBcblx0XHQnbm9uZSc6ICdub25lJyBcblx0fSlcblx0cmF0aW9JbnB1dC5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRpZiAodmFsdWUgPT09ICdub25lJykge1xuXHRcdFx0aWZyYW1lUmF0aW9Db250YWluZXIuc3R5bGUucGFkZGluZ0JvdHRvbSA9ICcwcHgnO1xuXHRcdFx0aWZyYW1lUmF0aW9Db250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZnJhbWVSYXRpb0NvbnRhaW5lci5zdHlsZS5wYWRkaW5nQm90dG9tID0gJ2NhbGModmFyKC0tYXNwZWN0LXJhdGlvKSAqIDEwMCUpJztcblx0XHRcdGlmcmFtZVJhdGlvQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcwcHgnO1xuXHRcdH1cblx0XHRpZnJhbWVSYXRpb0NvbnRhaW5lci5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1hc3BlY3QtcmF0aW8nLCB2YWx1ZSk7XG5cdH0pXG5cblx0cmV0dXJuIGFzcGVjdFJhdGlvSW5wdXRDb250YWluZXI7XG59XG4iLCJcclxuaW1wb3J0IHsgTm90aWNlLCBQbHVnaW4gfSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5pbXBvcnQgeyBpc1VybCwgdXBkYXRlVXJsSWZZb3V0dWJlIH0gZnJvbSAnaWZyYW1lX2NvbnZlcnRlcic7XHJcbmltcG9ydCB7IENvbmZpZ3VyZUlmcmFtZU1vZGFsIH0gZnJvbSAnLi9jb25maWd1cmVfaWZyYW1lX21vZGFsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdE5vdGlvblBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ0xvYWRpbmcgb2JzaWRpYW4tY29udmVydC11cmwtdG8taWZyYW1lJyk7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJ1cmwtdG8taWZyYW1lXCIsXHJcblx0XHRcdG5hbWU6IFwiVVJMIHRvIGlmcmFtZS9wcmV2aWV3XCIsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLnVybFRvSWZyYW1lKCksXHJcblx0XHRcdGhvdGtleXM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiXSxcclxuXHRcdFx0XHRcdGtleTogXCJpXCIsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XSxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0dXJsVG9JZnJhbWUoKTogdm9pZCB7XHJcblx0XHRsZXQgYWN0aXZlTGVhZjogYW55ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XHJcblx0XHRsZXQgZWRpdG9yID0gYWN0aXZlTGVhZi52aWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHRsZXQgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLnNvbWV0aGluZ1NlbGVjdGVkKClcclxuXHRcdFx0PyBlZGl0b3IuZ2V0U2VsZWN0aW9uKClcclxuXHRcdFx0OiBmYWxzZTtcclxuXHJcblx0XHRpZiAoc2VsZWN0ZWRUZXh0ICYmIGlzVXJsKHNlbGVjdGVkVGV4dCkpIHtcclxuXHRcdFx0Y29uc3QgdXJsID0gdXBkYXRlVXJsSWZZb3V0dWJlKHNlbGVjdGVkVGV4dClcclxuXHRcdFx0Y29uc3QgbW9kYWwgPSBuZXcgQ29uZmlndXJlSWZyYW1lTW9kYWwodGhpcy5hcHAsIHVybCwgZWRpdG9yKVxyXG5cdFx0XHRtb2RhbC5vcGVuKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRuZXcgTm90aWNlKCdTZWxlY3QgYSBVUkwgdG8gY29udmVydCB0byBhbiBpZnJhbWUuJyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdLCJuYW1lcyI6WyJNb2RhbCIsIkRyb3Bkb3duQ29tcG9uZW50IiwiTm90aWNlIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFD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
