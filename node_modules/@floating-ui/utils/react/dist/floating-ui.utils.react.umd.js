(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@floating-ui/utils/dom')) :
  typeof define === 'function' && define.amd ? define(['exports', '@floating-ui/utils/dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUIUtilsReact = {}, global.FloatingUIUtilsDOM));
})(this, (function (exports, dom) { 'use strict';

  function activeElement(doc) {
    let activeElement = doc.activeElement;
    while (((_activeElement = activeElement) == null ? void 0 : (_activeElement$shadow = _activeElement.shadowRoot) == null ? void 0 : _activeElement$shadow.activeElement) != null) {
      var _activeElement, _activeElement$shadow;
      activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
  }
  function contains(parent, child) {
    if (!parent || !child) {
      return false;
    }
    const rootNode = child.getRootNode && child.getRootNode();

    // First, attempt with faster native method
    if (parent.contains(child)) {
      return true;
    }

    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && dom.isShadowRoot(rootNode)) {
      let next = child;
      while (next) {
        if (parent === next) {
          return true;
        }
        // @ts-ignore
        next = next.parentNode || next.host;
      }
    }

    // Give up, the result is false
    return false;
  }
  // Avoid Chrome DevTools blue warning.
  function getPlatform() {
    const uaData = navigator.userAgentData;
    if (uaData != null && uaData.platform) {
      return uaData.platform;
    }
    return navigator.platform;
  }
  function getUserAgent() {
    const uaData = navigator.userAgentData;
    if (uaData && Array.isArray(uaData.brands)) {
      return uaData.brands.map(_ref => {
        let {
          brand,
          version
        } = _ref;
        return brand + "/" + version;
      }).join(' ');
    }
    return navigator.userAgent;
  }

  // License: https://github.com/adobe/react-spectrum/blob/b35d5c02fe900badccd0cf1a8f23bb593419f238/packages/@react-aria/utils/src/isVirtualEvent.ts
  function isVirtualClick(event) {
    if (event.mozInputSource === 0 && event.isTrusted) {
      return true;
    }
    const androidRe = /Android/i;
    if ((androidRe.test(getPlatform()) || androidRe.test(getUserAgent())) && event.pointerType) {
      return event.type === 'click' && event.buttons === 1;
    }
    return event.detail === 0 && !event.pointerType;
  }
  function isVirtualPointerEvent(event) {
    return event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType !== 'mouse' ||
    // iOS VoiceOver returns 0.333• for width/height.
    event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0;
  }
  function isSafari() {
    // Chrome DevTools does not complain about navigator.vendor
    return /apple/i.test(navigator.vendor);
  }
  function isMac() {
    return getPlatform().toLowerCase().startsWith('mac') && !navigator.maxTouchPoints;
  }
  function isMouseLikePointerType(pointerType, strict) {
    // On some Linux machines with Chromium, mouse inputs return a `pointerType`
    // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
    const values = ['mouse', 'pen'];
    if (!strict) {
      values.push('', undefined);
    }
    return values.includes(pointerType);
  }
  function isReactEvent(event) {
    return 'nativeEvent' in event;
  }
  function isRootElement(element) {
    return element.matches('html,body');
  }
  function getDocument(node) {
    return (node == null ? void 0 : node.ownerDocument) || document;
  }
  function isEventTargetWithin(event, node) {
    if (node == null) {
      return false;
    }
    if ('composedPath' in event) {
      return event.composedPath().includes(node);
    }

    // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
    const e = event;
    return e.target != null && node.contains(e.target);
  }
  function getTarget(event) {
    if ('composedPath' in event) {
      return event.composedPath()[0];
    }

    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return event.target;
  }
  const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
  function isTypeableElement(element) {
    return dom.isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
  }
  function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  exports.TYPEABLE_SELECTOR = TYPEABLE_SELECTOR;
  exports.activeElement = activeElement;
  exports.contains = contains;
  exports.getDocument = getDocument;
  exports.getPlatform = getPlatform;
  exports.getTarget = getTarget;
  exports.getUserAgent = getUserAgent;
  exports.isEventTargetWithin = isEventTargetWithin;
  exports.isMac = isMac;
  exports.isMouseLikePointerType = isMouseLikePointerType;
  exports.isReactEvent = isReactEvent;
  exports.isRootElement = isRootElement;
  exports.isSafari = isSafari;
  exports.isTypeableElement = isTypeableElement;
  exports.isVirtualClick = isVirtualClick;
  exports.isVirtualPointerEvent = isVirtualPointerEvent;
  exports.stopEvent = stopEvent;

}));
