module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1711103528382, function(require, module, exports) {
/*********************************************************************
 * This is a fork from the CSS Style Declaration part of
 * https://github.com/NV/CSSOM
 ********************************************************************/

var CSSOM = require('cssom');
var allProperties = require('./allProperties');
var allExtraProperties = require('./allExtraProperties');
var implementedProperties = require('./implementedProperties');
var { dashedToCamelCase } = require('./parsers');
var getBasicPropertyDescriptor = require('./utils/getBasicPropertyDescriptor');

/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */
var CSSStyleDeclaration = function CSSStyleDeclaration(onChangeCallback) {
  this._values = {};
  this._importants = {};
  this._length = 0;
  this._onChange =
    onChangeCallback ||
    function() {
      return;
    };
};
CSSStyleDeclaration.prototype = {
  constructor: CSSStyleDeclaration,

  /**
   *
   * @param {string} name
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set.
   */
  getPropertyValue: function(name) {
    if (!this._values.hasOwnProperty(name)) {
      return '';
    }
    return this._values[name].toString();
  },

  /**
   *
   * @param {string} name
   * @param {string} value
   * @param {string} [priority=null] "important" or null
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
   */
  setProperty: function(name, value, priority) {
    if (value === undefined) {
      return;
    }
    if (value === null || value === '') {
      this.removeProperty(name);
      return;
    }
    var isCustomProperty = name.indexOf('--') === 0;
    if (isCustomProperty) {
      this._setProperty(name, value, priority);
      return;
    }
    var lowercaseName = name.toLowerCase();
    if (!allProperties.has(lowercaseName) && !allExtraProperties.has(lowercaseName)) {
      return;
    }

    this[lowercaseName] = value;
    this._importants[lowercaseName] = priority;
  },
  _setProperty: function(name, value, priority) {
    if (value === undefined) {
      return;
    }
    if (value === null || value === '') {
      this.removeProperty(name);
      return;
    }
    if (this._values[name]) {
      // Property already exist. Overwrite it.
      var index = Array.prototype.indexOf.call(this, name);
      if (index < 0) {
        this[this._length] = name;
        this._length++;
      }
    } else {
      // New property.
      this[this._length] = name;
      this._length++;
    }
    this._values[name] = value;
    this._importants[name] = priority;
    this._onChange(this.cssText);
  },

  /**
   *
   * @param {string} name
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
   */
  removeProperty: function(name) {
    if (!this._values.hasOwnProperty(name)) {
      return '';
    }

    var prevValue = this._values[name];
    delete this._values[name];
    delete this._importants[name];

    var index = Array.prototype.indexOf.call(this, name);
    if (index < 0) {
      return prevValue;
    }

    // That's what WebKit and Opera do
    Array.prototype.splice.call(this, index, 1);

    // That's what Firefox does
    //this[index] = ""

    this._onChange(this.cssText);
    return prevValue;
  },

  /**
   *
   * @param {String} name
   */
  getPropertyPriority: function(name) {
    return this._importants[name] || '';
  },

  getPropertyCSSValue: function() {
    //FIXME
    return;
  },

  /**
   *   element.style.overflow = "auto"
   *   element.style.getPropertyShorthand("overflow-x")
   *   -> "overflow"
   */
  getPropertyShorthand: function() {
    //FIXME
    return;
  },

  isPropertyImplicit: function() {
    //FIXME
    return;
  },

  /**
   *   http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-item
   */
  item: function(index) {
    index = parseInt(index, 10);
    if (index < 0 || index >= this._length) {
      return '';
    }
    return this[index];
  },
};

Object.defineProperties(CSSStyleDeclaration.prototype, {
  cssText: {
    get: function() {
      var properties = [];
      var i;
      var name;
      var value;
      var priority;
      for (i = 0; i < this._length; i++) {
        name = this[i];
        value = this.getPropertyValue(name);
        priority = this.getPropertyPriority(name);
        if (priority !== '') {
          priority = ' !' + priority;
        }
        properties.push([name, ': ', value, priority, ';'].join(''));
      }
      return properties.join(' ');
    },
    set: function(value) {
      var i;
      this._values = {};
      Array.prototype.splice.call(this, 0, this._length);
      this._importants = {};
      var dummyRule;
      try {
        dummyRule = CSSOM.parse('#bogus{' + value + '}').cssRules[0].style;
      } catch (err) {
        // malformed css, just return
        return;
      }
      var rule_length = dummyRule.length;
      var name;
      for (i = 0; i < rule_length; ++i) {
        name = dummyRule[i];
        this.setProperty(
          dummyRule[i],
          dummyRule.getPropertyValue(name),
          dummyRule.getPropertyPriority(name)
        );
      }
      this._onChange(this.cssText);
    },
    enumerable: true,
    configurable: true,
  },
  parentRule: {
    get: function() {
      return null;
    },
    enumerable: true,
    configurable: true,
  },
  length: {
    get: function() {
      return this._length;
    },
    /**
     * This deletes indices if the new length is less then the current
     * length. If the new length is more, it does nothing, the new indices
     * will be undefined until set.
     **/
    set: function(value) {
      var i;
      for (i = value; i < this._length; i++) {
        delete this[i];
      }
      this._length = value;
    },
    enumerable: true,
    configurable: true,
  },
});

require('./properties')(CSSStyleDeclaration.prototype);

allProperties.forEach(function(property) {
  if (!implementedProperties.has(property)) {
    var declaration = getBasicPropertyDescriptor(property);
    Object.defineProperty(CSSStyleDeclaration.prototype, property, declaration);
    Object.defineProperty(CSSStyleDeclaration.prototype, dashedToCamelCase(property), declaration);
  }
});

allExtraProperties.forEach(function(property) {
  if (!implementedProperties.has(property)) {
    var declaration = getBasicPropertyDescriptor(property);
    Object.defineProperty(CSSStyleDeclaration.prototype, property, declaration);
    Object.defineProperty(CSSStyleDeclaration.prototype, dashedToCamelCase(property), declaration);
  }
});

exports.CSSStyleDeclaration = CSSStyleDeclaration;

}, function(modId) {var map = {"./allProperties":1711103528383,"./allExtraProperties":1711103528384,"./implementedProperties":1711103528386,"./parsers":1711103528387,"./utils/getBasicPropertyDescriptor":1711103528390,"./properties":1711103528391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528383, function(require, module, exports) {


// autogenerated - 4/29/2020

/*
 *
 * https://www.w3.org/Style/CSS/all-properties.en.html
 */

module.exports = new Set([
  'align-content',
  'align-items',
  'align-self',
  'alignment-baseline',
  'all',
  'animation',
  'animation-delay',
  'animation-direction',
  'animation-duration',
  'animation-fill-mode',
  'animation-iteration-count',
  'animation-name',
  'animation-play-state',
  'animation-timing-function',
  'appearance',
  'azimuth',
  'background',
  'background-attachment',
  'background-blend-mode',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-repeat',
  'background-size',
  'baseline-shift',
  'block-overflow',
  'block-size',
  'bookmark-label',
  'bookmark-level',
  'bookmark-state',
  'border',
  'border-block',
  'border-block-color',
  'border-block-end',
  'border-block-end-color',
  'border-block-end-style',
  'border-block-end-width',
  'border-block-start',
  'border-block-start-color',
  'border-block-start-style',
  'border-block-start-width',
  'border-block-style',
  'border-block-width',
  'border-bottom',
  'border-bottom-color',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-style',
  'border-bottom-width',
  'border-boundary',
  'border-collapse',
  'border-color',
  'border-end-end-radius',
  'border-end-start-radius',
  'border-image',
  'border-image-outset',
  'border-image-repeat',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'border-inline',
  'border-inline-color',
  'border-inline-end',
  'border-inline-end-color',
  'border-inline-end-style',
  'border-inline-end-width',
  'border-inline-start',
  'border-inline-start-color',
  'border-inline-start-style',
  'border-inline-start-width',
  'border-inline-style',
  'border-inline-width',
  'border-left',
  'border-left-color',
  'border-left-style',
  'border-left-width',
  'border-radius',
  'border-right',
  'border-right-color',
  'border-right-style',
  'border-right-width',
  'border-spacing',
  'border-start-end-radius',
  'border-start-start-radius',
  'border-style',
  'border-top',
  'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-style',
  'border-top-width',
  'border-width',
  'bottom',
  'box-decoration-break',
  'box-shadow',
  'box-sizing',
  'box-snap',
  'break-after',
  'break-before',
  'break-inside',
  'caption-side',
  'caret',
  'caret-color',
  'caret-shape',
  'chains',
  'clear',
  'clip',
  'clip-path',
  'clip-rule',
  'color',
  'color-adjust',
  'color-interpolation-filters',
  'color-scheme',
  'column-count',
  'column-fill',
  'column-gap',
  'column-rule',
  'column-rule-color',
  'column-rule-style',
  'column-rule-width',
  'column-span',
  'column-width',
  'columns',
  'contain',
  'content',
  'continue',
  'counter-increment',
  'counter-reset',
  'counter-set',
  'cue',
  'cue-after',
  'cue-before',
  'cursor',
  'direction',
  'display',
  'dominant-baseline',
  'elevation',
  'empty-cells',
  'filter',
  'flex',
  'flex-basis',
  'flex-direction',
  'flex-flow',
  'flex-grow',
  'flex-shrink',
  'flex-wrap',
  'float',
  'flood-color',
  'flood-opacity',
  'flow',
  'flow-from',
  'flow-into',
  'font',
  'font-family',
  'font-feature-settings',
  'font-kerning',
  'font-language-override',
  'font-optical-sizing',
  'font-palette',
  'font-size',
  'font-size-adjust',
  'font-stretch',
  'font-style',
  'font-synthesis',
  'font-synthesis-small-caps',
  'font-synthesis-style',
  'font-synthesis-weight',
  'font-variant',
  'font-variant-alternates',
  'font-variant-caps',
  'font-variant-east-asian',
  'font-variant-emoji',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-variant-position',
  'font-variation-settings',
  'font-weight',
  'footnote-display',
  'footnote-policy',
  'forced-color-adjust',
  'gap',
  'glyph-orientation-vertical',
  'grid',
  'grid-area',
  'grid-auto-columns',
  'grid-auto-flow',
  'grid-auto-rows',
  'grid-column',
  'grid-column-end',
  'grid-column-start',
  'grid-row',
  'grid-row-end',
  'grid-row-start',
  'grid-template',
  'grid-template-areas',
  'grid-template-columns',
  'grid-template-rows',
  'hanging-punctuation',
  'height',
  'hyphenate-character',
  'hyphenate-limit-chars',
  'hyphenate-limit-last',
  'hyphenate-limit-lines',
  'hyphenate-limit-zone',
  'hyphens',
  'image-orientation',
  'image-rendering',
  'image-resolution',
  'initial-letters',
  'initial-letters-align',
  'initial-letters-wrap',
  'inline-size',
  'inline-sizing',
  'inset',
  'inset-block',
  'inset-block-end',
  'inset-block-start',
  'inset-inline',
  'inset-inline-end',
  'inset-inline-start',
  'isolation',
  'justify-content',
  'justify-items',
  'justify-self',
  'left',
  'letter-spacing',
  'lighting-color',
  'line-break',
  'line-clamp',
  'line-grid',
  'line-height',
  'line-padding',
  'line-snap',
  'list-style',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'margin',
  'margin-block',
  'margin-block-end',
  'margin-block-start',
  'margin-bottom',
  'margin-inline',
  'margin-inline-end',
  'margin-inline-start',
  'margin-left',
  'margin-right',
  'margin-top',
  'marker-side',
  'mask',
  'mask-border',
  'mask-border-mode',
  'mask-border-outset',
  'mask-border-repeat',
  'mask-border-slice',
  'mask-border-source',
  'mask-border-width',
  'mask-clip',
  'mask-composite',
  'mask-image',
  'mask-mode',
  'mask-origin',
  'mask-position',
  'mask-repeat',
  'mask-size',
  'mask-type',
  'max-block-size',
  'max-height',
  'max-inline-size',
  'max-lines',
  'max-width',
  'min-block-size',
  'min-height',
  'min-inline-size',
  'min-width',
  'mix-blend-mode',
  'nav-down',
  'nav-left',
  'nav-right',
  'nav-up',
  'object-fit',
  'object-position',
  'offset',
  'offset-after',
  'offset-anchor',
  'offset-before',
  'offset-distance',
  'offset-end',
  'offset-path',
  'offset-position',
  'offset-rotate',
  'offset-start',
  'opacity',
  'order',
  'orphans',
  'outline',
  'outline-color',
  'outline-offset',
  'outline-style',
  'outline-width',
  'overflow',
  'overflow-block',
  'overflow-inline',
  'overflow-wrap',
  'overflow-x',
  'overflow-y',
  'padding',
  'padding-block',
  'padding-block-end',
  'padding-block-start',
  'padding-bottom',
  'padding-inline',
  'padding-inline-end',
  'padding-inline-start',
  'padding-left',
  'padding-right',
  'padding-top',
  'page',
  'page-break-after',
  'page-break-before',
  'page-break-inside',
  'pause',
  'pause-after',
  'pause-before',
  'pitch',
  'pitch-range',
  'place-content',
  'place-items',
  'place-self',
  'play-during',
  'position',
  'quotes',
  'region-fragment',
  'resize',
  'rest',
  'rest-after',
  'rest-before',
  'richness',
  'right',
  'row-gap',
  'ruby-align',
  'ruby-merge',
  'ruby-position',
  'running',
  'scroll-behavior',
  'scroll-margin',
  'scroll-margin-block',
  'scroll-margin-block-end',
  'scroll-margin-block-start',
  'scroll-margin-bottom',
  'scroll-margin-inline',
  'scroll-margin-inline-end',
  'scroll-margin-inline-start',
  'scroll-margin-left',
  'scroll-margin-right',
  'scroll-margin-top',
  'scroll-padding',
  'scroll-padding-block',
  'scroll-padding-block-end',
  'scroll-padding-block-start',
  'scroll-padding-bottom',
  'scroll-padding-inline',
  'scroll-padding-inline-end',
  'scroll-padding-inline-start',
  'scroll-padding-left',
  'scroll-padding-right',
  'scroll-padding-top',
  'scroll-snap-align',
  'scroll-snap-stop',
  'scroll-snap-type',
  'shape-image-threshold',
  'shape-inside',
  'shape-margin',
  'shape-outside',
  'spatial-navigation-action',
  'spatial-navigation-contain',
  'spatial-navigation-function',
  'speak',
  'speak-as',
  'speak-header',
  'speak-numeral',
  'speak-punctuation',
  'speech-rate',
  'stress',
  'string-set',
  'tab-size',
  'table-layout',
  'text-align',
  'text-align-all',
  'text-align-last',
  'text-combine-upright',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-style',
  'text-emphasis',
  'text-emphasis-color',
  'text-emphasis-position',
  'text-emphasis-style',
  'text-group-align',
  'text-indent',
  'text-justify',
  'text-orientation',
  'text-overflow',
  'text-shadow',
  'text-space-collapse',
  'text-space-trim',
  'text-spacing',
  'text-transform',
  'text-underline-position',
  'text-wrap',
  'top',
  'transform',
  'transform-box',
  'transform-origin',
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-property',
  'transition-timing-function',
  'unicode-bidi',
  'user-select',
  'vertical-align',
  'visibility',
  'voice-balance',
  'voice-duration',
  'voice-family',
  'voice-pitch',
  'voice-range',
  'voice-rate',
  'voice-stress',
  'voice-volume',
  'volume',
  'white-space',
  'widows',
  'width',
  'will-change',
  'word-boundary-detection',
  'word-boundary-expansion',
  'word-break',
  'word-spacing',
  'word-wrap',
  'wrap-after',
  'wrap-before',
  'wrap-flow',
  'wrap-inside',
  'wrap-through',
  'writing-mode',
  'z-index',
]);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528384, function(require, module, exports) {


/**
 * This file contains all implemented properties that are not a part of any
 * current specifications or drafts, but are handled by browsers nevertheless.
 */

var allWebkitProperties = require('./allWebkitProperties');

module.exports = new Set(
  [
    'background-position-x',
    'background-position-y',
    'background-repeat-x',
    'background-repeat-y',
    'color-interpolation',
    'color-profile',
    'color-rendering',
    'css-float',
    'enable-background',
    'fill',
    'fill-opacity',
    'fill-rule',
    'glyph-orientation-horizontal',
    'image-rendering',
    'kerning',
    'marker',
    'marker-end',
    'marker-mid',
    'marker-offset',
    'marker-start',
    'marks',
    'pointer-events',
    'shape-rendering',
    'size',
    'src',
    'stop-color',
    'stop-opacity',
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'text-anchor',
    'text-line-through',
    'text-line-through-color',
    'text-line-through-mode',
    'text-line-through-style',
    'text-line-through-width',
    'text-overline',
    'text-overline-color',
    'text-overline-mode',
    'text-overline-style',
    'text-overline-width',
    'text-rendering',
    'text-underline',
    'text-underline-color',
    'text-underline-mode',
    'text-underline-style',
    'text-underline-width',
    'unicode-range',
    'vector-effect',
  ].concat(allWebkitProperties)
);

}, function(modId) { var map = {"./allWebkitProperties":1711103528385}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528385, function(require, module, exports) {


/**
 * This file contains all implemented properties that are not a part of any
 * current specifications or drafts, but are handled by browsers nevertheless.
 */

module.exports = [
  'animation',
  'animation-delay',
  'animation-direction',
  'animation-duration',
  'animation-fill-mode',
  'animation-iteration-count',
  'animation-name',
  'animation-play-state',
  'animation-timing-function',
  'appearance',
  'aspect-ratio',
  'backface-visibility',
  'background-clip',
  'background-composite',
  'background-origin',
  'background-size',
  'border-after',
  'border-after-color',
  'border-after-style',
  'border-after-width',
  'border-before',
  'border-before-color',
  'border-before-style',
  'border-before-width',
  'border-end',
  'border-end-color',
  'border-end-style',
  'border-end-width',
  'border-fit',
  'border-horizontal-spacing',
  'border-image',
  'border-radius',
  'border-start',
  'border-start-color',
  'border-start-style',
  'border-start-width',
  'border-vertical-spacing',
  'box-align',
  'box-direction',
  'box-flex',
  'box-flex-group',
  'box-lines',
  'box-ordinal-group',
  'box-orient',
  'box-pack',
  'box-reflect',
  'box-shadow',
  'color-correction',
  'column-axis',
  'column-break-after',
  'column-break-before',
  'column-break-inside',
  'column-count',
  'column-gap',
  'column-rule',
  'column-rule-color',
  'column-rule-style',
  'column-rule-width',
  'columns',
  'column-span',
  'column-width',
  'filter',
  'flex-align',
  'flex-direction',
  'flex-flow',
  'flex-item-align',
  'flex-line-pack',
  'flex-order',
  'flex-pack',
  'flex-wrap',
  'flow-from',
  'flow-into',
  'font-feature-settings',
  'font-kerning',
  'font-size-delta',
  'font-smoothing',
  'font-variant-ligatures',
  'highlight',
  'hyphenate-character',
  'hyphenate-limit-after',
  'hyphenate-limit-before',
  'hyphenate-limit-lines',
  'hyphens',
  'line-align',
  'line-box-contain',
  'line-break',
  'line-clamp',
  'line-grid',
  'line-snap',
  'locale',
  'logical-height',
  'logical-width',
  'margin-after',
  'margin-after-collapse',
  'margin-before',
  'margin-before-collapse',
  'margin-bottom-collapse',
  'margin-collapse',
  'margin-end',
  'margin-start',
  'margin-top-collapse',
  'marquee',
  'marquee-direction',
  'marquee-increment',
  'marquee-repetition',
  'marquee-speed',
  'marquee-style',
  'mask',
  'mask-attachment',
  'mask-box-image',
  'mask-box-image-outset',
  'mask-box-image-repeat',
  'mask-box-image-slice',
  'mask-box-image-source',
  'mask-box-image-width',
  'mask-clip',
  'mask-composite',
  'mask-image',
  'mask-origin',
  'mask-position',
  'mask-position-x',
  'mask-position-y',
  'mask-repeat',
  'mask-repeat-x',
  'mask-repeat-y',
  'mask-size',
  'match-nearest-mail-blockquote-color',
  'max-logical-height',
  'max-logical-width',
  'min-logical-height',
  'min-logical-width',
  'nbsp-mode',
  'overflow-scrolling',
  'padding-after',
  'padding-before',
  'padding-end',
  'padding-start',
  'perspective',
  'perspective-origin',
  'perspective-origin-x',
  'perspective-origin-y',
  'print-color-adjust',
  'region-break-after',
  'region-break-before',
  'region-break-inside',
  'region-overflow',
  'rtl-ordering',
  'svg-shadow',
  'tap-highlight-color',
  'text-combine',
  'text-decorations-in-effect',
  'text-emphasis',
  'text-emphasis-color',
  'text-emphasis-position',
  'text-emphasis-style',
  'text-fill-color',
  'text-orientation',
  'text-security',
  'text-size-adjust',
  'text-stroke',
  'text-stroke-color',
  'text-stroke-width',
  'transform',
  'transform-origin',
  'transform-origin-x',
  'transform-origin-y',
  'transform-origin-z',
  'transform-style',
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-property',
  'transition-timing-function',
  'user-drag',
  'user-modify',
  'user-select',
  'wrap',
  'wrap-flow',
  'wrap-margin',
  'wrap-padding',
  'wrap-shape-inside',
  'wrap-shape-outside',
  'wrap-through',
  'writing-mode',
  'zoom',
].map(prop => 'webkit-' + prop);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528386, function(require, module, exports) {


// autogenerated - 4/29/2020

/*
 *
 * https://www.w3.org/Style/CSS/all-properties.en.html
 */

var implementedProperties = new Set();
implementedProperties.add("azimuth");
implementedProperties.add("background");
implementedProperties.add("background-attachment");
implementedProperties.add("background-color");
implementedProperties.add("background-image");
implementedProperties.add("background-position");
implementedProperties.add("background-repeat");
implementedProperties.add("border");
implementedProperties.add("border-bottom");
implementedProperties.add("border-bottom-color");
implementedProperties.add("border-bottom-style");
implementedProperties.add("border-bottom-width");
implementedProperties.add("border-collapse");
implementedProperties.add("border-color");
implementedProperties.add("border-left");
implementedProperties.add("border-left-color");
implementedProperties.add("border-left-style");
implementedProperties.add("border-left-width");
implementedProperties.add("border-right");
implementedProperties.add("border-right-color");
implementedProperties.add("border-right-style");
implementedProperties.add("border-right-width");
implementedProperties.add("border-spacing");
implementedProperties.add("border-style");
implementedProperties.add("border-top");
implementedProperties.add("border-top-color");
implementedProperties.add("border-top-style");
implementedProperties.add("border-top-width");
implementedProperties.add("border-width");
implementedProperties.add("bottom");
implementedProperties.add("clear");
implementedProperties.add("clip");
implementedProperties.add("color");
implementedProperties.add("css-float");
implementedProperties.add("flex");
implementedProperties.add("flex-basis");
implementedProperties.add("flex-grow");
implementedProperties.add("flex-shrink");
implementedProperties.add("float");
implementedProperties.add("flood-color");
implementedProperties.add("font");
implementedProperties.add("font-family");
implementedProperties.add("font-size");
implementedProperties.add("font-style");
implementedProperties.add("font-variant");
implementedProperties.add("font-weight");
implementedProperties.add("height");
implementedProperties.add("left");
implementedProperties.add("lighting-color");
implementedProperties.add("line-height");
implementedProperties.add("margin");
implementedProperties.add("margin-bottom");
implementedProperties.add("margin-left");
implementedProperties.add("margin-right");
implementedProperties.add("margin-top");
implementedProperties.add("opacity");
implementedProperties.add("outline-color");
implementedProperties.add("padding");
implementedProperties.add("padding-bottom");
implementedProperties.add("padding-left");
implementedProperties.add("padding-right");
implementedProperties.add("padding-top");
implementedProperties.add("right");
implementedProperties.add("stop-color");
implementedProperties.add("text-line-through-color");
implementedProperties.add("text-overline-color");
implementedProperties.add("text-underline-color");
implementedProperties.add("top");
implementedProperties.add("webkit-border-after-color");
implementedProperties.add("webkit-border-before-color");
implementedProperties.add("webkit-border-end-color");
implementedProperties.add("webkit-border-start-color");
implementedProperties.add("webkit-column-rule-color");
implementedProperties.add("webkit-match-nearest-mail-blockquote-color");
implementedProperties.add("webkit-tap-highlight-color");
implementedProperties.add("webkit-text-emphasis-color");
implementedProperties.add("webkit-text-fill-color");
implementedProperties.add("webkit-text-stroke-color");
implementedProperties.add("width");
module.exports = implementedProperties;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528387, function(require, module, exports) {
/*********************************************************************
 * These are commonly used parsers for CSS Values they take a string *
 * to parse and return a string after it's been converted, if needed *
 ********************************************************************/


const namedColors = require('./named_colors.json');
const { hslToRgb } = require('./utils/colorSpace');

exports.TYPES = {
  INTEGER: 1,
  NUMBER: 2,
  LENGTH: 3,
  PERCENT: 4,
  URL: 5,
  COLOR: 6,
  STRING: 7,
  ANGLE: 8,
  KEYWORD: 9,
  NULL_OR_EMPTY_STR: 10,
  CALC: 11,
};

// rough regular expressions
var integerRegEx = /^[-+]?[0-9]+$/;
var numberRegEx = /^[-+]?[0-9]*\.?[0-9]+$/;
var lengthRegEx = /^(0|[-+]?[0-9]*\.?[0-9]+(in|cm|em|mm|pt|pc|px|ex|rem|vh|vw|ch))$/;
var percentRegEx = /^[-+]?[0-9]*\.?[0-9]+%$/;
var urlRegEx = /^url\(\s*([^)]*)\s*\)$/;
var stringRegEx = /^("[^"]*"|'[^']*')$/;
var colorRegEx1 = /^#([0-9a-fA-F]{3,4}){1,2}$/;
var colorRegEx2 = /^rgb\(([^)]*)\)$/;
var colorRegEx3 = /^rgba\(([^)]*)\)$/;
var calcRegEx = /^calc\(([^)]*)\)$/;
var colorRegEx4 = /^hsla?\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*(,\s*(-?\d+|-?\d*.\d+)\s*)?\)/;
var angleRegEx = /^([-+]?[0-9]*\.?[0-9]+)(deg|grad|rad)$/;

// This will return one of the above types based on the passed in string
exports.valueType = function valueType(val) {
  if (val === '' || val === null) {
    return exports.TYPES.NULL_OR_EMPTY_STR;
  }
  if (typeof val === 'number') {
    val = val.toString();
  }

  if (typeof val !== 'string') {
    return undefined;
  }

  if (integerRegEx.test(val)) {
    return exports.TYPES.INTEGER;
  }
  if (numberRegEx.test(val)) {
    return exports.TYPES.NUMBER;
  }
  if (lengthRegEx.test(val)) {
    return exports.TYPES.LENGTH;
  }
  if (percentRegEx.test(val)) {
    return exports.TYPES.PERCENT;
  }
  if (urlRegEx.test(val)) {
    return exports.TYPES.URL;
  }
  if (calcRegEx.test(val)) {
    return exports.TYPES.CALC;
  }
  if (stringRegEx.test(val)) {
    return exports.TYPES.STRING;
  }
  if (angleRegEx.test(val)) {
    return exports.TYPES.ANGLE;
  }
  if (colorRegEx1.test(val)) {
    return exports.TYPES.COLOR;
  }

  var res = colorRegEx2.exec(val);
  var parts;
  if (res !== null) {
    parts = res[1].split(/\s*,\s*/);
    if (parts.length !== 3) {
      return undefined;
    }
    if (
      parts.every(percentRegEx.test.bind(percentRegEx)) ||
      parts.every(integerRegEx.test.bind(integerRegEx))
    ) {
      return exports.TYPES.COLOR;
    }
    return undefined;
  }
  res = colorRegEx3.exec(val);
  if (res !== null) {
    parts = res[1].split(/\s*,\s*/);
    if (parts.length !== 4) {
      return undefined;
    }
    if (
      parts.slice(0, 3).every(percentRegEx.test.bind(percentRegEx)) ||
      parts.slice(0, 3).every(integerRegEx.test.bind(integerRegEx))
    ) {
      if (numberRegEx.test(parts[3])) {
        return exports.TYPES.COLOR;
      }
    }
    return undefined;
  }

  if (colorRegEx4.test(val)) {
    return exports.TYPES.COLOR;
  }

  // could still be a color, one of the standard keyword colors
  val = val.toLowerCase();

  if (namedColors.includes(val)) {
    return exports.TYPES.COLOR;
  }

  switch (val) {
    // the following are deprecated in CSS3
    case 'activeborder':
    case 'activecaption':
    case 'appworkspace':
    case 'background':
    case 'buttonface':
    case 'buttonhighlight':
    case 'buttonshadow':
    case 'buttontext':
    case 'captiontext':
    case 'graytext':
    case 'highlight':
    case 'highlighttext':
    case 'inactiveborder':
    case 'inactivecaption':
    case 'inactivecaptiontext':
    case 'infobackground':
    case 'infotext':
    case 'menu':
    case 'menutext':
    case 'scrollbar':
    case 'threeddarkshadow':
    case 'threedface':
    case 'threedhighlight':
    case 'threedlightshadow':
    case 'threedshadow':
    case 'window':
    case 'windowframe':
    case 'windowtext':
      return exports.TYPES.COLOR;
    default:
      return exports.TYPES.KEYWORD;
  }
};

exports.parseInteger = function parseInteger(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.INTEGER) {
    return undefined;
  }
  return String(parseInt(val, 10));
};

exports.parseNumber = function parseNumber(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.NUMBER && type !== exports.TYPES.INTEGER) {
    return undefined;
  }
  return String(parseFloat(val));
};

exports.parseLength = function parseLength(val) {
  if (val === 0 || val === '0') {
    return '0px';
  }
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.LENGTH) {
    return undefined;
  }
  return val;
};

exports.parsePercent = function parsePercent(val) {
  if (val === 0 || val === '0') {
    return '0%';
  }
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.PERCENT) {
    return undefined;
  }
  return val;
};

// either a length or a percent
exports.parseMeasurement = function parseMeasurement(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.CALC) {
    return val;
  }

  var length = exports.parseLength(val);
  if (length !== undefined) {
    return length;
  }
  return exports.parsePercent(val);
};

exports.parseUrl = function parseUrl(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  var res = urlRegEx.exec(val);
  // does it match the regex?
  if (!res) {
    return undefined;
  }
  var str = res[1];
  // if it starts with single or double quotes, does it end with the same?
  if ((str[0] === '"' || str[0] === "'") && str[0] !== str[str.length - 1]) {
    return undefined;
  }
  if (str[0] === '"' || str[0] === "'") {
    str = str.substr(1, str.length - 2);
  }

  var i;
  for (i = 0; i < str.length; i++) {
    switch (str[i]) {
      case '(':
      case ')':
      case ' ':
      case '\t':
      case '\n':
      case "'":
      case '"':
        return undefined;
      case '\\':
        i++;
        break;
    }
  }

  return 'url(' + str + ')';
};

exports.parseString = function parseString(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.STRING) {
    return undefined;
  }
  var i;
  for (i = 1; i < val.length - 1; i++) {
    switch (val[i]) {
      case val[0]:
        return undefined;
      case '\\':
        i++;
        while (i < val.length - 1 && /[0-9A-Fa-f]/.test(val[i])) {
          i++;
        }
        break;
    }
  }
  if (i >= val.length) {
    return undefined;
  }
  return val;
};

exports.parseColor = function parseColor(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  var red,
    green,
    blue,
    hue,
    saturation,
    lightness,
    alpha = 1;
  var parts;
  var res = colorRegEx1.exec(val);
  // is it #aaa, #ababab, #aaaa, #abababaa
  if (res) {
    var defaultHex = val.substr(1);
    var hex = val.substr(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

      if (defaultHex.length === 4) {
        hex = hex + defaultHex[3] + defaultHex[3];
      }
    }
    red = parseInt(hex.substr(0, 2), 16);
    green = parseInt(hex.substr(2, 2), 16);
    blue = parseInt(hex.substr(4, 2), 16);
    if (hex.length === 8) {
      var hexAlpha = hex.substr(6, 2);
      var hexAlphaToRgbaAlpha = Number((parseInt(hexAlpha, 16) / 255).toFixed(3));

      return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + hexAlphaToRgbaAlpha + ')';
    }
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  }

  res = colorRegEx2.exec(val);
  if (res) {
    parts = res[1].split(/\s*,\s*/);
    if (parts.length !== 3) {
      return undefined;
    }
    if (parts.every(percentRegEx.test.bind(percentRegEx))) {
      red = Math.floor((parseFloat(parts[0].slice(0, -1)) * 255) / 100);
      green = Math.floor((parseFloat(parts[1].slice(0, -1)) * 255) / 100);
      blue = Math.floor((parseFloat(parts[2].slice(0, -1)) * 255) / 100);
    } else if (parts.every(integerRegEx.test.bind(integerRegEx))) {
      red = parseInt(parts[0], 10);
      green = parseInt(parts[1], 10);
      blue = parseInt(parts[2], 10);
    } else {
      return undefined;
    }
    red = Math.min(255, Math.max(0, red));
    green = Math.min(255, Math.max(0, green));
    blue = Math.min(255, Math.max(0, blue));
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  }

  res = colorRegEx3.exec(val);
  if (res) {
    parts = res[1].split(/\s*,\s*/);
    if (parts.length !== 4) {
      return undefined;
    }
    if (parts.slice(0, 3).every(percentRegEx.test.bind(percentRegEx))) {
      red = Math.floor((parseFloat(parts[0].slice(0, -1)) * 255) / 100);
      green = Math.floor((parseFloat(parts[1].slice(0, -1)) * 255) / 100);
      blue = Math.floor((parseFloat(parts[2].slice(0, -1)) * 255) / 100);
      alpha = parseFloat(parts[3]);
    } else if (parts.slice(0, 3).every(integerRegEx.test.bind(integerRegEx))) {
      red = parseInt(parts[0], 10);
      green = parseInt(parts[1], 10);
      blue = parseInt(parts[2], 10);
      alpha = parseFloat(parts[3]);
    } else {
      return undefined;
    }
    if (isNaN(alpha)) {
      alpha = 1;
    }
    red = Math.min(255, Math.max(0, red));
    green = Math.min(255, Math.max(0, green));
    blue = Math.min(255, Math.max(0, blue));
    alpha = Math.min(1, Math.max(0, alpha));
    if (alpha === 1) {
      return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }
    return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
  }

  res = colorRegEx4.exec(val);
  if (res) {
    const [, _hue, _saturation, _lightness, _alphaString = ''] = res;
    const _alpha = parseFloat(_alphaString.replace(',', '').trim());
    if (!_hue || !_saturation || !_lightness) {
      return undefined;
    }
    hue = parseFloat(_hue);
    saturation = parseInt(_saturation, 10);
    lightness = parseInt(_lightness, 10);
    if (_alpha && numberRegEx.test(_alpha)) {
      alpha = parseFloat(_alpha);
    }

    const [r, g, b] = hslToRgb(hue, saturation / 100, lightness / 100);
    if (!_alphaString || alpha === 1) {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }

  if (type === exports.TYPES.COLOR) {
    return val;
  }
  return undefined;
};

exports.parseAngle = function parseAngle(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.ANGLE) {
    return undefined;
  }
  var res = angleRegEx.exec(val);
  var flt = parseFloat(res[1]);
  if (res[2] === 'rad') {
    flt *= 180 / Math.PI;
  } else if (res[2] === 'grad') {
    flt *= 360 / 400;
  }

  while (flt < 0) {
    flt += 360;
  }
  while (flt > 360) {
    flt -= 360;
  }
  return flt + 'deg';
};

exports.parseKeyword = function parseKeyword(val, valid_keywords) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.KEYWORD) {
    return undefined;
  }
  val = val.toString().toLowerCase();
  var i;
  for (i = 0; i < valid_keywords.length; i++) {
    if (valid_keywords[i].toLowerCase() === val) {
      return valid_keywords[i];
    }
  }
  return undefined;
};

// utility to translate from border-width to borderWidth
var dashedToCamelCase = function(dashed) {
  var i;
  var camel = '';
  var nextCap = false;
  for (i = 0; i < dashed.length; i++) {
    if (dashed[i] !== '-') {
      camel += nextCap ? dashed[i].toUpperCase() : dashed[i];
      nextCap = false;
    } else {
      nextCap = true;
    }
  }
  return camel;
};
exports.dashedToCamelCase = dashedToCamelCase;

var is_space = /\s/;
var opening_deliminators = ['"', "'", '('];
var closing_deliminators = ['"', "'", ')'];
// this splits on whitespace, but keeps quoted and parened parts together
var getParts = function(str) {
  var deliminator_stack = [];
  var length = str.length;
  var i;
  var parts = [];
  var current_part = '';
  var opening_index;
  var closing_index;
  for (i = 0; i < length; i++) {
    opening_index = opening_deliminators.indexOf(str[i]);
    closing_index = closing_deliminators.indexOf(str[i]);
    if (is_space.test(str[i])) {
      if (deliminator_stack.length === 0) {
        if (current_part !== '') {
          parts.push(current_part);
        }
        current_part = '';
      } else {
        current_part += str[i];
      }
    } else {
      if (str[i] === '\\') {
        i++;
        current_part += str[i];
      } else {
        current_part += str[i];
        if (
          closing_index !== -1 &&
          closing_index === deliminator_stack[deliminator_stack.length - 1]
        ) {
          deliminator_stack.pop();
        } else if (opening_index !== -1) {
          deliminator_stack.push(opening_index);
        }
      }
    }
  }
  if (current_part !== '') {
    parts.push(current_part);
  }
  return parts;
};

/*
 * this either returns undefined meaning that it isn't valid
 * or returns an object where the keys are dashed short
 * hand properties and the values are the values to set
 * on them
 */
exports.shorthandParser = function parse(v, shorthand_for) {
  var obj = {};
  var type = exports.valueType(v);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    Object.keys(shorthand_for).forEach(function(property) {
      obj[property] = '';
    });
    return obj;
  }

  if (typeof v === 'number') {
    v = v.toString();
  }

  if (typeof v !== 'string') {
    return undefined;
  }

  if (v.toLowerCase() === 'inherit') {
    return {};
  }
  var parts = getParts(v);
  var valid = true;
  parts.forEach(function(part, i) {
    var part_valid = false;
    Object.keys(shorthand_for).forEach(function(property) {
      if (shorthand_for[property].isValid(part, i)) {
        part_valid = true;
        obj[property] = part;
      }
    });
    valid = valid && part_valid;
  });
  if (!valid) {
    return undefined;
  }
  return obj;
};

exports.shorthandSetter = function(property, shorthand_for) {
  return function(v) {
    var obj = exports.shorthandParser(v, shorthand_for);
    if (obj === undefined) {
      return;
    }
    //console.log('shorthandSetter for:', property, 'obj:', obj);
    Object.keys(obj).forEach(function(subprop) {
      // in case subprop is an implicit property, this will clear
      // *its* subpropertiesX
      var camel = dashedToCamelCase(subprop);
      this[camel] = obj[subprop];
      // in case it gets translated into something else (0 -> 0px)
      obj[subprop] = this[camel];
      this.removeProperty(subprop);
      // don't add in empty properties
      if (obj[subprop] !== '') {
        this._values[subprop] = obj[subprop];
      }
    }, this);
    Object.keys(shorthand_for).forEach(function(subprop) {
      if (!obj.hasOwnProperty(subprop)) {
        this.removeProperty(subprop);
        delete this._values[subprop];
      }
    }, this);
    // in case the value is something like 'none' that removes all values,
    // check that the generated one is not empty, first remove the property
    // if it already exists, then call the shorthandGetter, if it's an empty
    // string, don't set the property
    this.removeProperty(property);
    var calculated = exports.shorthandGetter(property, shorthand_for).call(this);
    if (calculated !== '') {
      this._setProperty(property, calculated);
    }
  };
};

exports.shorthandGetter = function(property, shorthand_for) {
  return function() {
    if (this._values[property] !== undefined) {
      return this.getPropertyValue(property);
    }
    return Object.keys(shorthand_for)
      .map(function(subprop) {
        return this.getPropertyValue(subprop);
      }, this)
      .filter(function(value) {
        return value !== '';
      })
      .join(' ');
  };
};

// isValid(){1,4} | inherit
// if one, it applies to all
// if two, the first applies to the top and bottom, and the second to left and right
// if three, the first applies to the top, the second to left and right, the third bottom
// if four, top, right, bottom, left
exports.implicitSetter = function(property_before, property_after, isValid, parser) {
  property_after = property_after || '';
  if (property_after !== '') {
    property_after = '-' + property_after;
  }
  var part_names = ['top', 'right', 'bottom', 'left'];

  return function(v) {
    if (typeof v === 'number') {
      v = v.toString();
    }
    if (typeof v !== 'string') {
      return undefined;
    }
    var parts;
    if (v.toLowerCase() === 'inherit' || v === '') {
      parts = [v];
    } else {
      parts = getParts(v);
    }
    if (parts.length < 1 || parts.length > 4) {
      return undefined;
    }

    if (!parts.every(isValid)) {
      return undefined;
    }

    parts = parts.map(function(part) {
      return parser(part);
    });
    this._setProperty(property_before + property_after, parts.join(' '));
    if (parts.length === 1) {
      parts[1] = parts[0];
    }
    if (parts.length === 2) {
      parts[2] = parts[0];
    }
    if (parts.length === 3) {
      parts[3] = parts[1];
    }

    for (var i = 0; i < 4; i++) {
      var property = property_before + '-' + part_names[i] + property_after;
      this.removeProperty(property);
      if (parts[i] !== '') {
        this._values[property] = parts[i];
      }
    }
    return v;
  };
};

//
//  Companion to implicitSetter, but for the individual parts.
//  This sets the individual value, and checks to see if all four
//  sub-parts are set.  If so, it sets the shorthand version and removes
//  the individual parts from the cssText.
//
exports.subImplicitSetter = function(prefix, part, isValid, parser) {
  var property = prefix + '-' + part;
  var subparts = [prefix + '-top', prefix + '-right', prefix + '-bottom', prefix + '-left'];

  return function(v) {
    if (typeof v === 'number') {
      v = v.toString();
    }
    if (typeof v !== 'string') {
      return undefined;
    }
    if (!isValid(v)) {
      return undefined;
    }
    v = parser(v);
    this._setProperty(property, v);
    var parts = [];
    for (var i = 0; i < 4; i++) {
      if (this._values[subparts[i]] == null || this._values[subparts[i]] === '') {
        break;
      }
      parts.push(this._values[subparts[i]]);
    }
    if (parts.length === 4) {
      for (i = 0; i < 4; i++) {
        this.removeProperty(subparts[i]);
        this._values[subparts[i]] = parts[i];
      }
      this._setProperty(prefix, parts.join(' '));
    }
    return v;
  };
};

var camel_to_dashed = /[A-Z]/g;
var first_segment = /^\([^-]\)-/;
var vendor_prefixes = ['o', 'moz', 'ms', 'webkit'];
exports.camelToDashed = function(camel_case) {
  var match;
  var dashed = camel_case.replace(camel_to_dashed, '-$&').toLowerCase();
  match = dashed.match(first_segment);
  if (match && vendor_prefixes.indexOf(match[1]) !== -1) {
    dashed = '-' + dashed;
  }
  return dashed;
};

}, function(modId) { var map = {"./named_colors.json":1711103528388,"./utils/colorSpace":1711103528389}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528388, function(require, module, exports) {
module.exports = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
  "transparent",
  "currentcolor"
]

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528389, function(require, module, exports) {


const hueToRgb = (t1, t2, hue) => {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;

  if (hue < 1) return (t2 - t1) * hue + t1;
  else if (hue < 3) return t2;
  else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
};

// https://www.w3.org/TR/css-color-4/#hsl-to-rgb
exports.hslToRgb = (hue, sat, light) => {
  const t2 = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat;
  const t1 = light * 2 - t2;
  const r = hueToRgb(t1, t2, hue + 2);
  const g = hueToRgb(t1, t2, hue);
  const b = hueToRgb(t1, t2, hue - 2);
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528390, function(require, module, exports) {


module.exports = function getBasicPropertyDescriptor(name) {
  return {
    set: function(v) {
      this._setProperty(name, v);
    },
    get: function() {
      return this.getPropertyValue(name);
    },
    enumerable: true,
    configurable: true,
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528391, function(require, module, exports) {


// autogenerated - 4/29/2020

/*
 *
 * https://www.w3.org/Style/CSS/all-properties.en.html
 */

var external_dependency_parsers_0 = require("./parsers.js");

var external_dependency_constants_1 = require("./constants.js");

var azimuth_export_definition;
azimuth_export_definition = {
  set: function (v) {
    var valueType = external_dependency_parsers_0.valueType(v);

    if (valueType === external_dependency_parsers_0.TYPES.ANGLE) {
      return this._setProperty('azimuth', external_dependency_parsers_0.parseAngle(v));
    }

    if (valueType === external_dependency_parsers_0.TYPES.KEYWORD) {
      var keywords = v.toLowerCase().trim().split(/\s+/);
      var hasBehind = false;

      if (keywords.length > 2) {
        return;
      }

      var behindIndex = keywords.indexOf('behind');
      hasBehind = behindIndex !== -1;

      if (keywords.length === 2) {
        if (!hasBehind) {
          return;
        }

        keywords.splice(behindIndex, 1);
      }

      if (keywords[0] === 'leftwards' || keywords[0] === 'rightwards') {
        if (hasBehind) {
          return;
        }

        return this._setProperty('azimuth', keywords[0]);
      }

      if (keywords[0] === 'behind') {
        return this._setProperty('azimuth', '180deg');
      }

      switch (keywords[0]) {
        case 'left-side':
          return this._setProperty('azimuth', '270deg');

        case 'far-left':
          return this._setProperty('azimuth', (hasBehind ? 240 : 300) + 'deg');

        case 'left':
          return this._setProperty('azimuth', (hasBehind ? 220 : 320) + 'deg');

        case 'center-left':
          return this._setProperty('azimuth', (hasBehind ? 200 : 340) + 'deg');

        case 'center':
          return this._setProperty('azimuth', (hasBehind ? 180 : 0) + 'deg');

        case 'center-right':
          return this._setProperty('azimuth', (hasBehind ? 160 : 20) + 'deg');

        case 'right':
          return this._setProperty('azimuth', (hasBehind ? 140 : 40) + 'deg');

        case 'far-right':
          return this._setProperty('azimuth', (hasBehind ? 120 : 60) + 'deg');

        case 'right-side':
          return this._setProperty('azimuth', '90deg');

        default:
          return;
      }
    }
  },
  get: function () {
    return this.getPropertyValue('azimuth');
  },
  enumerable: true,
  configurable: true
};
var backgroundColor_export_isValid, backgroundColor_export_definition;

var backgroundColor_local_var_parse = function parse(v) {
  var parsed = external_dependency_parsers_0.parseColor(v);

  if (parsed !== undefined) {
    return parsed;
  }

  if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'transparent' || v.toLowerCase() === 'inherit')) {
    return v;
  }

  return undefined;
};

backgroundColor_export_isValid = function isValid(v) {
  return backgroundColor_local_var_parse(v) !== undefined;
};

backgroundColor_export_definition = {
  set: function (v) {
    var parsed = backgroundColor_local_var_parse(v);

    if (parsed === undefined) {
      return;
    }

    this._setProperty('background-color', parsed);
  },
  get: function () {
    return this.getPropertyValue('background-color');
  },
  enumerable: true,
  configurable: true
};
var backgroundImage_export_isValid, backgroundImage_export_definition;

var backgroundImage_local_var_parse = function parse(v) {
  var parsed = external_dependency_parsers_0.parseUrl(v);

  if (parsed !== undefined) {
    return parsed;
  }

  if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'none' || v.toLowerCase() === 'inherit')) {
    return v;
  }

  return undefined;
};

backgroundImage_export_isValid = function isValid(v) {
  return backgroundImage_local_var_parse(v) !== undefined;
};

backgroundImage_export_definition = {
  set: function (v) {
    this._setProperty('background-image', backgroundImage_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('background-image');
  },
  enumerable: true,
  configurable: true
};
var backgroundRepeat_export_isValid, backgroundRepeat_export_definition;

var backgroundRepeat_local_var_parse = function parse(v) {
  if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'repeat' || v.toLowerCase() === 'repeat-x' || v.toLowerCase() === 'repeat-y' || v.toLowerCase() === 'no-repeat' || v.toLowerCase() === 'inherit')) {
    return v;
  }

  return undefined;
};

backgroundRepeat_export_isValid = function isValid(v) {
  return backgroundRepeat_local_var_parse(v) !== undefined;
};

backgroundRepeat_export_definition = {
  set: function (v) {
    this._setProperty('background-repeat', backgroundRepeat_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('background-repeat');
  },
  enumerable: true,
  configurable: true
};
var backgroundAttachment_export_isValid, backgroundAttachment_export_definition;

var backgroundAttachment_local_var_isValid = backgroundAttachment_export_isValid = function isValid(v) {
  return external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'scroll' || v.toLowerCase() === 'fixed' || v.toLowerCase() === 'inherit');
};

backgroundAttachment_export_definition = {
  set: function (v) {
    if (!backgroundAttachment_local_var_isValid(v)) {
      return;
    }

    this._setProperty('background-attachment', v);
  },
  get: function () {
    return this.getPropertyValue('background-attachment');
  },
  enumerable: true,
  configurable: true
};
var backgroundPosition_export_isValid, backgroundPosition_export_definition;
var backgroundPosition_local_var_valid_keywords = ['top', 'center', 'bottom', 'left', 'right'];

var backgroundPosition_local_var_parse = function parse(v) {
  if (v === '' || v === null) {
    return undefined;
  }

  var parts = v.split(/\s+/);

  if (parts.length > 2 || parts.length < 1) {
    return undefined;
  }

  var types = [];
  parts.forEach(function (part, index) {
    types[index] = external_dependency_parsers_0.valueType(part);
  });

  if (parts.length === 1) {
    if (types[0] === external_dependency_parsers_0.TYPES.LENGTH || types[0] === external_dependency_parsers_0.TYPES.PERCENT) {
      return v;
    }

    if (types[0] === external_dependency_parsers_0.TYPES.KEYWORD) {
      if (backgroundPosition_local_var_valid_keywords.indexOf(v.toLowerCase()) !== -1 || v.toLowerCase() === 'inherit') {
        return v;
      }
    }

    return undefined;
  }

  if ((types[0] === external_dependency_parsers_0.TYPES.LENGTH || types[0] === external_dependency_parsers_0.TYPES.PERCENT) && (types[1] === external_dependency_parsers_0.TYPES.LENGTH || types[1] === external_dependency_parsers_0.TYPES.PERCENT)) {
    return v;
  }

  if (types[0] !== external_dependency_parsers_0.TYPES.KEYWORD || types[1] !== external_dependency_parsers_0.TYPES.KEYWORD) {
    return undefined;
  }

  if (backgroundPosition_local_var_valid_keywords.indexOf(parts[0]) !== -1 && backgroundPosition_local_var_valid_keywords.indexOf(parts[1]) !== -1) {
    return v;
  }

  return undefined;
};

backgroundPosition_export_isValid = function isValid(v) {
  return backgroundPosition_local_var_parse(v) !== undefined;
};

backgroundPosition_export_definition = {
  set: function (v) {
    this._setProperty('background-position', backgroundPosition_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('background-position');
  },
  enumerable: true,
  configurable: true
};
var background_export_definition;
var background_local_var_shorthand_for = {
  'background-color': {
    isValid: backgroundColor_export_isValid,
    definition: backgroundColor_export_definition
  },
  'background-image': {
    isValid: backgroundImage_export_isValid,
    definition: backgroundImage_export_definition
  },
  'background-repeat': {
    isValid: backgroundRepeat_export_isValid,
    definition: backgroundRepeat_export_definition
  },
  'background-attachment': {
    isValid: backgroundAttachment_export_isValid,
    definition: backgroundAttachment_export_definition
  },
  'background-position': {
    isValid: backgroundPosition_export_isValid,
    definition: backgroundPosition_export_definition
  }
};
background_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('background', background_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('background', background_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var borderWidth_export_isValid, borderWidth_export_definition;
// the valid border-widths:
var borderWidth_local_var_widths = ['thin', 'medium', 'thick'];

borderWidth_export_isValid = function parse(v) {
  var length = external_dependency_parsers_0.parseLength(v);

  if (length !== undefined) {
    return true;
  }

  if (typeof v !== 'string') {
    return false;
  }

  if (v === '') {
    return true;
  }

  v = v.toLowerCase();

  if (borderWidth_local_var_widths.indexOf(v) === -1) {
    return false;
  }

  return true;
};

var borderWidth_local_var_isValid = borderWidth_export_isValid;

var borderWidth_local_var_parser = function (v) {
  var length = external_dependency_parsers_0.parseLength(v);

  if (length !== undefined) {
    return length;
  }

  if (borderWidth_local_var_isValid(v)) {
    return v.toLowerCase();
  }

  return undefined;
};

borderWidth_export_definition = {
  set: external_dependency_parsers_0.implicitSetter('border', 'width', borderWidth_local_var_isValid, borderWidth_local_var_parser),
  get: function () {
    return this.getPropertyValue('border-width');
  },
  enumerable: true,
  configurable: true
};
var borderStyle_export_isValid, borderStyle_export_definition;
// the valid border-styles:
var borderStyle_local_var_styles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

borderStyle_export_isValid = function parse(v) {
  return typeof v === 'string' && (v === '' || borderStyle_local_var_styles.indexOf(v) !== -1);
};

var borderStyle_local_var_isValid = borderStyle_export_isValid;

var borderStyle_local_var_parser = function (v) {
  if (borderStyle_local_var_isValid(v)) {
    return v.toLowerCase();
  }

  return undefined;
};

borderStyle_export_definition = {
  set: external_dependency_parsers_0.implicitSetter('border', 'style', borderStyle_local_var_isValid, borderStyle_local_var_parser),
  get: function () {
    return this.getPropertyValue('border-style');
  },
  enumerable: true,
  configurable: true
};
var borderColor_export_isValid, borderColor_export_definition;

borderColor_export_isValid = function parse(v) {
  if (typeof v !== 'string') {
    return false;
  }

  return v === '' || v.toLowerCase() === 'transparent' || external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.COLOR;
};

var borderColor_local_var_isValid = borderColor_export_isValid;

var borderColor_local_var_parser = function (v) {
  if (borderColor_local_var_isValid(v)) {
    return v.toLowerCase();
  }

  return undefined;
};

borderColor_export_definition = {
  set: external_dependency_parsers_0.implicitSetter('border', 'color', borderColor_local_var_isValid, borderColor_local_var_parser),
  get: function () {
    return this.getPropertyValue('border-color');
  },
  enumerable: true,
  configurable: true
};
var border_export_definition;
var border_local_var_shorthand_for = {
  'border-width': {
    isValid: borderWidth_export_isValid,
    definition: borderWidth_export_definition
  },
  'border-style': {
    isValid: borderStyle_export_isValid,
    definition: borderStyle_export_definition
  },
  'border-color': {
    isValid: borderColor_export_isValid,
    definition: borderColor_export_definition
  }
};
var border_local_var_myShorthandSetter = external_dependency_parsers_0.shorthandSetter('border', border_local_var_shorthand_for);
var border_local_var_myShorthandGetter = external_dependency_parsers_0.shorthandGetter('border', border_local_var_shorthand_for);
border_export_definition = {
  set: function (v) {
    if (v.toString().toLowerCase() === 'none') {
      v = '';
    }

    border_local_var_myShorthandSetter.call(this, v);
    this.removeProperty('border-top');
    this.removeProperty('border-left');
    this.removeProperty('border-right');
    this.removeProperty('border-bottom');
    this._values['border-top'] = this._values.border;
    this._values['border-left'] = this._values.border;
    this._values['border-right'] = this._values.border;
    this._values['border-bottom'] = this._values.border;
  },
  get: border_local_var_myShorthandGetter,
  enumerable: true,
  configurable: true
};
var borderBottomWidth_export_isValid, borderBottomWidth_export_definition;
var borderBottomWidth_local_var_isValid = borderBottomWidth_export_isValid = borderWidth_export_isValid;
borderBottomWidth_export_definition = {
  set: function (v) {
    if (borderBottomWidth_local_var_isValid(v)) {
      this._setProperty('border-bottom-width', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-bottom-width');
  },
  enumerable: true,
  configurable: true
};
var borderBottomStyle_export_isValid, borderBottomStyle_export_definition;
borderBottomStyle_export_isValid = borderStyle_export_isValid;
borderBottomStyle_export_definition = {
  set: function (v) {
    if (borderStyle_export_isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-bottom-width');
      }

      this._setProperty('border-bottom-style', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-bottom-style');
  },
  enumerable: true,
  configurable: true
};
var borderBottomColor_export_isValid, borderBottomColor_export_definition;
var borderBottomColor_local_var_isValid = borderBottomColor_export_isValid = borderColor_export_isValid;
borderBottomColor_export_definition = {
  set: function (v) {
    if (borderBottomColor_local_var_isValid(v)) {
      this._setProperty('border-bottom-color', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-bottom-color');
  },
  enumerable: true,
  configurable: true
};
var borderBottom_export_definition;
var borderBottom_local_var_shorthand_for = {
  'border-bottom-width': {
    isValid: borderBottomWidth_export_isValid,
    definition: borderBottomWidth_export_definition
  },
  'border-bottom-style': {
    isValid: borderBottomStyle_export_isValid,
    definition: borderBottomStyle_export_definition
  },
  'border-bottom-color': {
    isValid: borderBottomColor_export_isValid,
    definition: borderBottomColor_export_definition
  }
};
borderBottom_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('border-bottom', borderBottom_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('border-bottom', borderBottom_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var borderCollapse_export_definition;

var borderCollapse_local_var_parse = function parse(v) {
  if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'collapse' || v.toLowerCase() === 'separate' || v.toLowerCase() === 'inherit')) {
    return v;
  }

  return undefined;
};

borderCollapse_export_definition = {
  set: function (v) {
    this._setProperty('border-collapse', borderCollapse_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('border-collapse');
  },
  enumerable: true,
  configurable: true
};
var borderLeftWidth_export_isValid, borderLeftWidth_export_definition;
var borderLeftWidth_local_var_isValid = borderLeftWidth_export_isValid = borderWidth_export_isValid;
borderLeftWidth_export_definition = {
  set: function (v) {
    if (borderLeftWidth_local_var_isValid(v)) {
      this._setProperty('border-left-width', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-left-width');
  },
  enumerable: true,
  configurable: true
};
var borderLeftStyle_export_isValid, borderLeftStyle_export_definition;
borderLeftStyle_export_isValid = borderStyle_export_isValid;
borderLeftStyle_export_definition = {
  set: function (v) {
    if (borderStyle_export_isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-left-width');
      }

      this._setProperty('border-left-style', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-left-style');
  },
  enumerable: true,
  configurable: true
};
var borderLeftColor_export_isValid, borderLeftColor_export_definition;
var borderLeftColor_local_var_isValid = borderLeftColor_export_isValid = borderColor_export_isValid;
borderLeftColor_export_definition = {
  set: function (v) {
    if (borderLeftColor_local_var_isValid(v)) {
      this._setProperty('border-left-color', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-left-color');
  },
  enumerable: true,
  configurable: true
};
var borderLeft_export_definition;
var borderLeft_local_var_shorthand_for = {
  'border-left-width': {
    isValid: borderLeftWidth_export_isValid,
    definition: borderLeftWidth_export_definition
  },
  'border-left-style': {
    isValid: borderLeftStyle_export_isValid,
    definition: borderLeftStyle_export_definition
  },
  'border-left-color': {
    isValid: borderLeftColor_export_isValid,
    definition: borderLeftColor_export_definition
  }
};
borderLeft_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('border-left', borderLeft_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('border-left', borderLeft_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var borderRightWidth_export_isValid, borderRightWidth_export_definition;
var borderRightWidth_local_var_isValid = borderRightWidth_export_isValid = borderWidth_export_isValid;
borderRightWidth_export_definition = {
  set: function (v) {
    if (borderRightWidth_local_var_isValid(v)) {
      this._setProperty('border-right-width', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-right-width');
  },
  enumerable: true,
  configurable: true
};
var borderRightStyle_export_isValid, borderRightStyle_export_definition;
borderRightStyle_export_isValid = borderStyle_export_isValid;
borderRightStyle_export_definition = {
  set: function (v) {
    if (borderStyle_export_isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-right-width');
      }

      this._setProperty('border-right-style', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-right-style');
  },
  enumerable: true,
  configurable: true
};
var borderRightColor_export_isValid, borderRightColor_export_definition;
var borderRightColor_local_var_isValid = borderRightColor_export_isValid = borderColor_export_isValid;
borderRightColor_export_definition = {
  set: function (v) {
    if (borderRightColor_local_var_isValid(v)) {
      this._setProperty('border-right-color', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-right-color');
  },
  enumerable: true,
  configurable: true
};
var borderRight_export_definition;
var borderRight_local_var_shorthand_for = {
  'border-right-width': {
    isValid: borderRightWidth_export_isValid,
    definition: borderRightWidth_export_definition
  },
  'border-right-style': {
    isValid: borderRightStyle_export_isValid,
    definition: borderRightStyle_export_definition
  },
  'border-right-color': {
    isValid: borderRightColor_export_isValid,
    definition: borderRightColor_export_definition
  }
};
borderRight_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('border-right', borderRight_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('border-right', borderRight_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var borderSpacing_export_definition;

// <length> <length>? | inherit
// if one, it applies to both horizontal and verical spacing
// if two, the first applies to the horizontal and the second applies to vertical spacing
var borderSpacing_local_var_parse = function parse(v) {
  if (v === '' || v === null) {
    return undefined;
  }

  if (v === 0) {
    return '0px';
  }

  if (v.toLowerCase() === 'inherit') {
    return v;
  }

  var parts = v.split(/\s+/);

  if (parts.length !== 1 && parts.length !== 2) {
    return undefined;
  }

  parts.forEach(function (part) {
    if (external_dependency_parsers_0.valueType(part) !== external_dependency_parsers_0.TYPES.LENGTH) {
      return undefined;
    }
  });
  return v;
};

borderSpacing_export_definition = {
  set: function (v) {
    this._setProperty('border-spacing', borderSpacing_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('border-spacing');
  },
  enumerable: true,
  configurable: true
};
var borderTopWidth_export_isValid, borderTopWidth_export_definition;
borderTopWidth_export_isValid = borderWidth_export_isValid;
borderTopWidth_export_definition = {
  set: function (v) {
    if (borderWidth_export_isValid(v)) {
      this._setProperty('border-top-width', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-top-width');
  },
  enumerable: true,
  configurable: true
};
var borderTopStyle_export_isValid, borderTopStyle_export_definition;
borderTopStyle_export_isValid = borderStyle_export_isValid;
borderTopStyle_export_definition = {
  set: function (v) {
    if (borderStyle_export_isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-top-width');
      }

      this._setProperty('border-top-style', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-top-style');
  },
  enumerable: true,
  configurable: true
};
var borderTopColor_export_isValid, borderTopColor_export_definition;
var borderTopColor_local_var_isValid = borderTopColor_export_isValid = borderColor_export_isValid;
borderTopColor_export_definition = {
  set: function (v) {
    if (borderTopColor_local_var_isValid(v)) {
      this._setProperty('border-top-color', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-top-color');
  },
  enumerable: true,
  configurable: true
};
var borderTop_export_definition;
var borderTop_local_var_shorthand_for = {
  'border-top-width': {
    isValid: borderTopWidth_export_isValid,
    definition: borderTopWidth_export_definition
  },
  'border-top-style': {
    isValid: borderTopStyle_export_isValid,
    definition: borderTopStyle_export_definition
  },
  'border-top-color': {
    isValid: borderTopColor_export_isValid,
    definition: borderTopColor_export_definition
  }
};
borderTop_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('border-top', borderTop_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('border-top', borderTop_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var bottom_export_definition;
bottom_export_definition = {
  set: function (v) {
    this._setProperty('bottom', external_dependency_parsers_0.parseMeasurement(v));
  },
  get: function () {
    return this.getPropertyValue('bottom');
  },
  enumerable: true,
  configurable: true
};
var clear_export_definition;
var clear_local_var_clear_keywords = ['none', 'left', 'right', 'both', 'inherit'];
clear_export_definition = {
  set: function (v) {
    this._setProperty('clear', external_dependency_parsers_0.parseKeyword(v, clear_local_var_clear_keywords));
  },
  get: function () {
    return this.getPropertyValue('clear');
  },
  enumerable: true,
  configurable: true
};
var clip_export_definition;
var clip_local_var_shape_regex = /^rect\((.*)\)$/i;

var clip_local_var_parse = function (val) {
  if (val === '' || val === null) {
    return val;
  }

  if (typeof val !== 'string') {
    return undefined;
  }

  val = val.toLowerCase();

  if (val === 'auto' || val === 'inherit') {
    return val;
  }

  var matches = val.match(clip_local_var_shape_regex);

  if (!matches) {
    return undefined;
  }

  var parts = matches[1].split(/\s*,\s*/);

  if (parts.length !== 4) {
    return undefined;
  }

  var valid = parts.every(function (part, index) {
    var measurement = external_dependency_parsers_0.parseMeasurement(part);
    parts[index] = measurement;
    return measurement !== undefined;
  });

  if (!valid) {
    return undefined;
  }

  parts = parts.join(', ');
  return val.replace(matches[1], parts);
};

clip_export_definition = {
  set: function (v) {
    this._setProperty('clip', clip_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('clip');
  },
  enumerable: true,
  configurable: true
};
var color_export_definition;
color_export_definition = {
  set: function (v) {
    this._setProperty('color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('color');
  },
  enumerable: true,
  configurable: true
};
var cssFloat_export_definition;
cssFloat_export_definition = {
  set: function (v) {
    this._setProperty('float', v);
  },
  get: function () {
    return this.getPropertyValue('float');
  },
  enumerable: true,
  configurable: true
};
var flexGrow_export_isValid, flexGrow_export_definition;

flexGrow_export_isValid = function isValid(v, positionAtFlexShorthand) {
  return external_dependency_parsers_0.parseNumber(v) !== undefined && positionAtFlexShorthand === external_dependency_constants_1.POSITION_AT_SHORTHAND.first;
};

flexGrow_export_definition = {
  set: function (v) {
    this._setProperty('flex-grow', external_dependency_parsers_0.parseNumber(v));
  },
  get: function () {
    return this.getPropertyValue('flex-grow');
  },
  enumerable: true,
  configurable: true
};
var flexShrink_export_isValid, flexShrink_export_definition;

flexShrink_export_isValid = function isValid(v, positionAtFlexShorthand) {
  return external_dependency_parsers_0.parseNumber(v) !== undefined && positionAtFlexShorthand === external_dependency_constants_1.POSITION_AT_SHORTHAND.second;
};

flexShrink_export_definition = {
  set: function (v) {
    this._setProperty('flex-shrink', external_dependency_parsers_0.parseNumber(v));
  },
  get: function () {
    return this.getPropertyValue('flex-shrink');
  },
  enumerable: true,
  configurable: true
};
var flexBasis_export_isValid, flexBasis_export_definition;

function flexBasis_local_fn_parse(v) {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }

  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }

  return external_dependency_parsers_0.parseMeasurement(v);
}

flexBasis_export_isValid = function isValid(v) {
  return flexBasis_local_fn_parse(v) !== undefined;
};

flexBasis_export_definition = {
  set: function (v) {
    this._setProperty('flex-basis', flexBasis_local_fn_parse(v));
  },
  get: function () {
    return this.getPropertyValue('flex-basis');
  },
  enumerable: true,
  configurable: true
};
var flex_export_isValid, flex_export_definition;
var flex_local_var_shorthand_for = {
  'flex-grow': {
    isValid: flexGrow_export_isValid,
    definition: flexGrow_export_definition
  },
  'flex-shrink': {
    isValid: flexShrink_export_isValid,
    definition: flexShrink_export_definition
  },
  'flex-basis': {
    isValid: flexBasis_export_isValid,
    definition: flexBasis_export_definition
  }
};
var flex_local_var_myShorthandSetter = external_dependency_parsers_0.shorthandSetter('flex', flex_local_var_shorthand_for);

flex_export_isValid = function isValid(v) {
  return external_dependency_parsers_0.shorthandParser(v, flex_local_var_shorthand_for) !== undefined;
};

flex_export_definition = {
  set: function (v) {
    var normalizedValue = String(v).trim().toLowerCase();

    if (normalizedValue === 'none') {
      flex_local_var_myShorthandSetter.call(this, '0 0 auto');
      return;
    }

    if (normalizedValue === 'initial') {
      flex_local_var_myShorthandSetter.call(this, '0 1 auto');
      return;
    }

    if (normalizedValue === 'auto') {
      this.removeProperty('flex-grow');
      this.removeProperty('flex-shrink');
      this.setProperty('flex-basis', normalizedValue);
      return;
    }

    flex_local_var_myShorthandSetter.call(this, v);
  },
  get: external_dependency_parsers_0.shorthandGetter('flex', flex_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var float_export_definition;
float_export_definition = {
  set: function (v) {
    this._setProperty('float', v);
  },
  get: function () {
    return this.getPropertyValue('float');
  },
  enumerable: true,
  configurable: true
};
var floodColor_export_definition;
floodColor_export_definition = {
  set: function (v) {
    this._setProperty('flood-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('flood-color');
  },
  enumerable: true,
  configurable: true
};
var fontFamily_export_isValid, fontFamily_export_definition;
var fontFamily_local_var_partsRegEx = /\s*,\s*/;

fontFamily_export_isValid = function isValid(v) {
  if (v === '' || v === null) {
    return true;
  }

  var parts = v.split(fontFamily_local_var_partsRegEx);
  var len = parts.length;
  var i;
  var type;

  for (i = 0; i < len; i++) {
    type = external_dependency_parsers_0.valueType(parts[i]);

    if (type === external_dependency_parsers_0.TYPES.STRING || type === external_dependency_parsers_0.TYPES.KEYWORD) {
      return true;
    }
  }

  return false;
};

fontFamily_export_definition = {
  set: function (v) {
    this._setProperty('font-family', v);
  },
  get: function () {
    return this.getPropertyValue('font-family');
  },
  enumerable: true,
  configurable: true
};
var fontSize_export_isValid, fontSize_export_definition;
var fontSize_local_var_absoluteSizes = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
var fontSize_local_var_relativeSizes = ['larger', 'smaller'];

fontSize_export_isValid = function (v) {
  var type = external_dependency_parsers_0.valueType(v.toLowerCase());
  return type === external_dependency_parsers_0.TYPES.LENGTH || type === external_dependency_parsers_0.TYPES.PERCENT || type === external_dependency_parsers_0.TYPES.KEYWORD && fontSize_local_var_absoluteSizes.indexOf(v.toLowerCase()) !== -1 || type === external_dependency_parsers_0.TYPES.KEYWORD && fontSize_local_var_relativeSizes.indexOf(v.toLowerCase()) !== -1;
};

function fontSize_local_fn_parse(v) {
  const valueAsString = String(v).toLowerCase();
  const optionalArguments = fontSize_local_var_absoluteSizes.concat(fontSize_local_var_relativeSizes);
  const isOptionalArgument = optionalArguments.some(stringValue => stringValue.toLowerCase() === valueAsString);
  return isOptionalArgument ? valueAsString : external_dependency_parsers_0.parseMeasurement(v);
}

fontSize_export_definition = {
  set: function (v) {
    this._setProperty('font-size', fontSize_local_fn_parse(v));
  },
  get: function () {
    return this.getPropertyValue('font-size');
  },
  enumerable: true,
  configurable: true
};
var fontStyle_export_isValid, fontStyle_export_definition;
var fontStyle_local_var_valid_styles = ['normal', 'italic', 'oblique', 'inherit'];

fontStyle_export_isValid = function (v) {
  return fontStyle_local_var_valid_styles.indexOf(v.toLowerCase()) !== -1;
};

fontStyle_export_definition = {
  set: function (v) {
    this._setProperty('font-style', v);
  },
  get: function () {
    return this.getPropertyValue('font-style');
  },
  enumerable: true,
  configurable: true
};
var fontVariant_export_isValid, fontVariant_export_definition;
var fontVariant_local_var_valid_variants = ['normal', 'small-caps', 'inherit'];

fontVariant_export_isValid = function isValid(v) {
  return fontVariant_local_var_valid_variants.indexOf(v.toLowerCase()) !== -1;
};

fontVariant_export_definition = {
  set: function (v) {
    this._setProperty('font-variant', v);
  },
  get: function () {
    return this.getPropertyValue('font-variant');
  },
  enumerable: true,
  configurable: true
};
var fontWeight_export_isValid, fontWeight_export_definition;
var fontWeight_local_var_valid_weights = ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'inherit'];

fontWeight_export_isValid = function isValid(v) {
  return fontWeight_local_var_valid_weights.indexOf(v.toLowerCase()) !== -1;
};

fontWeight_export_definition = {
  set: function (v) {
    this._setProperty('font-weight', v);
  },
  get: function () {
    return this.getPropertyValue('font-weight');
  },
  enumerable: true,
  configurable: true
};
var lineHeight_export_isValid, lineHeight_export_definition;

lineHeight_export_isValid = function isValid(v) {
  var type = external_dependency_parsers_0.valueType(v);
  return type === external_dependency_parsers_0.TYPES.KEYWORD && v.toLowerCase() === 'normal' || v.toLowerCase() === 'inherit' || type === external_dependency_parsers_0.TYPES.NUMBER || type === external_dependency_parsers_0.TYPES.LENGTH || type === external_dependency_parsers_0.TYPES.PERCENT;
};

lineHeight_export_definition = {
  set: function (v) {
    this._setProperty('line-height', v);
  },
  get: function () {
    return this.getPropertyValue('line-height');
  },
  enumerable: true,
  configurable: true
};
var font_export_definition;
var font_local_var_shorthand_for = {
  'font-family': {
    isValid: fontFamily_export_isValid,
    definition: fontFamily_export_definition
  },
  'font-size': {
    isValid: fontSize_export_isValid,
    definition: fontSize_export_definition
  },
  'font-style': {
    isValid: fontStyle_export_isValid,
    definition: fontStyle_export_definition
  },
  'font-variant': {
    isValid: fontVariant_export_isValid,
    definition: fontVariant_export_definition
  },
  'font-weight': {
    isValid: fontWeight_export_isValid,
    definition: fontWeight_export_definition
  },
  'line-height': {
    isValid: lineHeight_export_isValid,
    definition: lineHeight_export_definition
  }
};
var font_local_var_static_fonts = ['caption', 'icon', 'menu', 'message-box', 'small-caption', 'status-bar', 'inherit'];
var font_local_var_setter = external_dependency_parsers_0.shorthandSetter('font', font_local_var_shorthand_for);
font_export_definition = {
  set: function (v) {
    var short = external_dependency_parsers_0.shorthandParser(v, font_local_var_shorthand_for);

    if (short !== undefined) {
      return font_local_var_setter.call(this, v);
    }

    if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && font_local_var_static_fonts.indexOf(v.toLowerCase()) !== -1) {
      this._setProperty('font', v);
    }
  },
  get: external_dependency_parsers_0.shorthandGetter('font', font_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var height_export_definition;

function height_local_fn_parse(v) {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }

  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }

  return external_dependency_parsers_0.parseMeasurement(v);
}

height_export_definition = {
  set: function (v) {
    this._setProperty('height', height_local_fn_parse(v));
  },
  get: function () {
    return this.getPropertyValue('height');
  },
  enumerable: true,
  configurable: true
};
var left_export_definition;
left_export_definition = {
  set: function (v) {
    this._setProperty('left', external_dependency_parsers_0.parseMeasurement(v));
  },
  get: function () {
    return this.getPropertyValue('left');
  },
  enumerable: true,
  configurable: true
};
var lightingColor_export_definition;
lightingColor_export_definition = {
  set: function (v) {
    this._setProperty('lighting-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('lighting-color');
  },
  enumerable: true,
  configurable: true
};
var margin_export_definition, margin_export_isValid, margin_export_parser;
var margin_local_var_TYPES = external_dependency_parsers_0.TYPES;

var margin_local_var_isValid = function (v) {
  if (v.toLowerCase() === 'auto') {
    return true;
  }

  var type = external_dependency_parsers_0.valueType(v);
  return type === margin_local_var_TYPES.LENGTH || type === margin_local_var_TYPES.PERCENT || type === margin_local_var_TYPES.INTEGER && (v === '0' || v === 0);
};

var margin_local_var_parser = function (v) {
  var V = v.toLowerCase();

  if (V === 'auto') {
    return V;
  }

  return external_dependency_parsers_0.parseMeasurement(v);
};

var margin_local_var_mySetter = external_dependency_parsers_0.implicitSetter('margin', '', margin_local_var_isValid, margin_local_var_parser);
var margin_local_var_myGlobal = external_dependency_parsers_0.implicitSetter('margin', '', function () {
  return true;
}, function (v) {
  return v;
});
margin_export_definition = {
  set: function (v) {
    if (typeof v === 'number') {
      v = String(v);
    }

    if (typeof v !== 'string') {
      return;
    }

    var V = v.toLowerCase();

    switch (V) {
      case 'inherit':
      case 'initial':
      case 'unset':
      case '':
        margin_local_var_myGlobal.call(this, V);
        break;

      default:
        margin_local_var_mySetter.call(this, v);
        break;
    }
  },
  get: function () {
    return this.getPropertyValue('margin');
  },
  enumerable: true,
  configurable: true
};
margin_export_isValid = margin_local_var_isValid;
margin_export_parser = margin_local_var_parser;
var marginBottom_export_definition;
marginBottom_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('margin', 'bottom', {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.isValid, {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('margin-bottom');
  },
  enumerable: true,
  configurable: true
};
var marginLeft_export_definition;
marginLeft_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('margin', 'left', {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.isValid, {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('margin-left');
  },
  enumerable: true,
  configurable: true
};
var marginRight_export_definition;
marginRight_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('margin', 'right', {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.isValid, {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('margin-right');
  },
  enumerable: true,
  configurable: true
};
var marginTop_export_definition;
marginTop_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('margin', 'top', {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.isValid, {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('margin-top');
  },
  enumerable: true,
  configurable: true
};
var opacity_export_definition;
opacity_export_definition = {
  set: function (v) {
    this._setProperty('opacity', external_dependency_parsers_0.parseNumber(v));
  },
  get: function () {
    return this.getPropertyValue('opacity');
  },
  enumerable: true,
  configurable: true
};
var outlineColor_export_definition;
outlineColor_export_definition = {
  set: function (v) {
    this._setProperty('outline-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('outline-color');
  },
  enumerable: true,
  configurable: true
};
var padding_export_definition, padding_export_isValid, padding_export_parser;
var padding_local_var_TYPES = external_dependency_parsers_0.TYPES;

var padding_local_var_isValid = function (v) {
  var type = external_dependency_parsers_0.valueType(v);
  return type === padding_local_var_TYPES.LENGTH || type === padding_local_var_TYPES.PERCENT || type === padding_local_var_TYPES.INTEGER && (v === '0' || v === 0);
};

var padding_local_var_parser = function (v) {
  return external_dependency_parsers_0.parseMeasurement(v);
};

var padding_local_var_mySetter = external_dependency_parsers_0.implicitSetter('padding', '', padding_local_var_isValid, padding_local_var_parser);
var padding_local_var_myGlobal = external_dependency_parsers_0.implicitSetter('padding', '', function () {
  return true;
}, function (v) {
  return v;
});
padding_export_definition = {
  set: function (v) {
    if (typeof v === 'number') {
      v = String(v);
    }

    if (typeof v !== 'string') {
      return;
    }

    var V = v.toLowerCase();

    switch (V) {
      case 'inherit':
      case 'initial':
      case 'unset':
      case '':
        padding_local_var_myGlobal.call(this, V);
        break;

      default:
        padding_local_var_mySetter.call(this, v);
        break;
    }
  },
  get: function () {
    return this.getPropertyValue('padding');
  },
  enumerable: true,
  configurable: true
};
padding_export_isValid = padding_local_var_isValid;
padding_export_parser = padding_local_var_parser;
var paddingBottom_export_definition;
paddingBottom_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('padding', 'bottom', {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.isValid, {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('padding-bottom');
  },
  enumerable: true,
  configurable: true
};
var paddingLeft_export_definition;
paddingLeft_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('padding', 'left', {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.isValid, {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('padding-left');
  },
  enumerable: true,
  configurable: true
};
var paddingRight_export_definition;
paddingRight_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('padding', 'right', {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.isValid, {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('padding-right');
  },
  enumerable: true,
  configurable: true
};
var paddingTop_export_definition;
paddingTop_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('padding', 'top', {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.isValid, {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('padding-top');
  },
  enumerable: true,
  configurable: true
};
var right_export_definition;
right_export_definition = {
  set: function (v) {
    this._setProperty('right', external_dependency_parsers_0.parseMeasurement(v));
  },
  get: function () {
    return this.getPropertyValue('right');
  },
  enumerable: true,
  configurable: true
};
var stopColor_export_definition;
stopColor_export_definition = {
  set: function (v) {
    this._setProperty('stop-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('stop-color');
  },
  enumerable: true,
  configurable: true
};
var textLineThroughColor_export_definition;
textLineThroughColor_export_definition = {
  set: function (v) {
    this._setProperty('text-line-through-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('text-line-through-color');
  },
  enumerable: true,
  configurable: true
};
var textOverlineColor_export_definition;
textOverlineColor_export_definition = {
  set: function (v) {
    this._setProperty('text-overline-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('text-overline-color');
  },
  enumerable: true,
  configurable: true
};
var textUnderlineColor_export_definition;
textUnderlineColor_export_definition = {
  set: function (v) {
    this._setProperty('text-underline-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('text-underline-color');
  },
  enumerable: true,
  configurable: true
};
var top_export_definition;
top_export_definition = {
  set: function (v) {
    this._setProperty('top', external_dependency_parsers_0.parseMeasurement(v));
  },
  get: function () {
    return this.getPropertyValue('top');
  },
  enumerable: true,
  configurable: true
};
var webkitBorderAfterColor_export_definition;
webkitBorderAfterColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-border-after-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-border-after-color');
  },
  enumerable: true,
  configurable: true
};
var webkitBorderBeforeColor_export_definition;
webkitBorderBeforeColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-border-before-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-border-before-color');
  },
  enumerable: true,
  configurable: true
};
var webkitBorderEndColor_export_definition;
webkitBorderEndColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-border-end-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-border-end-color');
  },
  enumerable: true,
  configurable: true
};
var webkitBorderStartColor_export_definition;
webkitBorderStartColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-border-start-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-border-start-color');
  },
  enumerable: true,
  configurable: true
};
var webkitColumnRuleColor_export_definition;
webkitColumnRuleColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-column-rule-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-column-rule-color');
  },
  enumerable: true,
  configurable: true
};
var webkitMatchNearestMailBlockquoteColor_export_definition;
webkitMatchNearestMailBlockquoteColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-match-nearest-mail-blockquote-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-match-nearest-mail-blockquote-color');
  },
  enumerable: true,
  configurable: true
};
var webkitTapHighlightColor_export_definition;
webkitTapHighlightColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-tap-highlight-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-tap-highlight-color');
  },
  enumerable: true,
  configurable: true
};
var webkitTextEmphasisColor_export_definition;
webkitTextEmphasisColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-text-emphasis-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-text-emphasis-color');
  },
  enumerable: true,
  configurable: true
};
var webkitTextFillColor_export_definition;
webkitTextFillColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-text-fill-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-text-fill-color');
  },
  enumerable: true,
  configurable: true
};
var webkitTextStrokeColor_export_definition;
webkitTextStrokeColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-text-stroke-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-text-stroke-color');
  },
  enumerable: true,
  configurable: true
};
var width_export_definition;

function width_local_fn_parse(v) {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }

  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }

  return external_dependency_parsers_0.parseMeasurement(v);
}

width_export_definition = {
  set: function (v) {
    this._setProperty('width', width_local_fn_parse(v));
  },
  get: function () {
    return this.getPropertyValue('width');
  },
  enumerable: true,
  configurable: true
};

module.exports = function (prototype) {
  Object.defineProperties(prototype, {
    azimuth: azimuth_export_definition,
    backgroundColor: backgroundColor_export_definition,
    "background-color": backgroundColor_export_definition,
    backgroundImage: backgroundImage_export_definition,
    "background-image": backgroundImage_export_definition,
    backgroundRepeat: backgroundRepeat_export_definition,
    "background-repeat": backgroundRepeat_export_definition,
    backgroundAttachment: backgroundAttachment_export_definition,
    "background-attachment": backgroundAttachment_export_definition,
    backgroundPosition: backgroundPosition_export_definition,
    "background-position": backgroundPosition_export_definition,
    background: background_export_definition,
    borderWidth: borderWidth_export_definition,
    "border-width": borderWidth_export_definition,
    borderStyle: borderStyle_export_definition,
    "border-style": borderStyle_export_definition,
    borderColor: borderColor_export_definition,
    "border-color": borderColor_export_definition,
    border: border_export_definition,
    borderBottomWidth: borderBottomWidth_export_definition,
    "border-bottom-width": borderBottomWidth_export_definition,
    borderBottomStyle: borderBottomStyle_export_definition,
    "border-bottom-style": borderBottomStyle_export_definition,
    borderBottomColor: borderBottomColor_export_definition,
    "border-bottom-color": borderBottomColor_export_definition,
    borderBottom: borderBottom_export_definition,
    "border-bottom": borderBottom_export_definition,
    borderCollapse: borderCollapse_export_definition,
    "border-collapse": borderCollapse_export_definition,
    borderLeftWidth: borderLeftWidth_export_definition,
    "border-left-width": borderLeftWidth_export_definition,
    borderLeftStyle: borderLeftStyle_export_definition,
    "border-left-style": borderLeftStyle_export_definition,
    borderLeftColor: borderLeftColor_export_definition,
    "border-left-color": borderLeftColor_export_definition,
    borderLeft: borderLeft_export_definition,
    "border-left": borderLeft_export_definition,
    borderRightWidth: borderRightWidth_export_definition,
    "border-right-width": borderRightWidth_export_definition,
    borderRightStyle: borderRightStyle_export_definition,
    "border-right-style": borderRightStyle_export_definition,
    borderRightColor: borderRightColor_export_definition,
    "border-right-color": borderRightColor_export_definition,
    borderRight: borderRight_export_definition,
    "border-right": borderRight_export_definition,
    borderSpacing: borderSpacing_export_definition,
    "border-spacing": borderSpacing_export_definition,
    borderTopWidth: borderTopWidth_export_definition,
    "border-top-width": borderTopWidth_export_definition,
    borderTopStyle: borderTopStyle_export_definition,
    "border-top-style": borderTopStyle_export_definition,
    borderTopColor: borderTopColor_export_definition,
    "border-top-color": borderTopColor_export_definition,
    borderTop: borderTop_export_definition,
    "border-top": borderTop_export_definition,
    bottom: bottom_export_definition,
    clear: clear_export_definition,
    clip: clip_export_definition,
    color: color_export_definition,
    cssFloat: cssFloat_export_definition,
    "css-float": cssFloat_export_definition,
    flexGrow: flexGrow_export_definition,
    "flex-grow": flexGrow_export_definition,
    flexShrink: flexShrink_export_definition,
    "flex-shrink": flexShrink_export_definition,
    flexBasis: flexBasis_export_definition,
    "flex-basis": flexBasis_export_definition,
    flex: flex_export_definition,
    float: float_export_definition,
    floodColor: floodColor_export_definition,
    "flood-color": floodColor_export_definition,
    fontFamily: fontFamily_export_definition,
    "font-family": fontFamily_export_definition,
    fontSize: fontSize_export_definition,
    "font-size": fontSize_export_definition,
    fontStyle: fontStyle_export_definition,
    "font-style": fontStyle_export_definition,
    fontVariant: fontVariant_export_definition,
    "font-variant": fontVariant_export_definition,
    fontWeight: fontWeight_export_definition,
    "font-weight": fontWeight_export_definition,
    lineHeight: lineHeight_export_definition,
    "line-height": lineHeight_export_definition,
    font: font_export_definition,
    height: height_export_definition,
    left: left_export_definition,
    lightingColor: lightingColor_export_definition,
    "lighting-color": lightingColor_export_definition,
    margin: margin_export_definition,
    marginBottom: marginBottom_export_definition,
    "margin-bottom": marginBottom_export_definition,
    marginLeft: marginLeft_export_definition,
    "margin-left": marginLeft_export_definition,
    marginRight: marginRight_export_definition,
    "margin-right": marginRight_export_definition,
    marginTop: marginTop_export_definition,
    "margin-top": marginTop_export_definition,
    opacity: opacity_export_definition,
    outlineColor: outlineColor_export_definition,
    "outline-color": outlineColor_export_definition,
    padding: padding_export_definition,
    paddingBottom: paddingBottom_export_definition,
    "padding-bottom": paddingBottom_export_definition,
    paddingLeft: paddingLeft_export_definition,
    "padding-left": paddingLeft_export_definition,
    paddingRight: paddingRight_export_definition,
    "padding-right": paddingRight_export_definition,
    paddingTop: paddingTop_export_definition,
    "padding-top": paddingTop_export_definition,
    right: right_export_definition,
    stopColor: stopColor_export_definition,
    "stop-color": stopColor_export_definition,
    textLineThroughColor: textLineThroughColor_export_definition,
    "text-line-through-color": textLineThroughColor_export_definition,
    textOverlineColor: textOverlineColor_export_definition,
    "text-overline-color": textOverlineColor_export_definition,
    textUnderlineColor: textUnderlineColor_export_definition,
    "text-underline-color": textUnderlineColor_export_definition,
    top: top_export_definition,
    webkitBorderAfterColor: webkitBorderAfterColor_export_definition,
    "webkit-border-after-color": webkitBorderAfterColor_export_definition,
    webkitBorderBeforeColor: webkitBorderBeforeColor_export_definition,
    "webkit-border-before-color": webkitBorderBeforeColor_export_definition,
    webkitBorderEndColor: webkitBorderEndColor_export_definition,
    "webkit-border-end-color": webkitBorderEndColor_export_definition,
    webkitBorderStartColor: webkitBorderStartColor_export_definition,
    "webkit-border-start-color": webkitBorderStartColor_export_definition,
    webkitColumnRuleColor: webkitColumnRuleColor_export_definition,
    "webkit-column-rule-color": webkitColumnRuleColor_export_definition,
    webkitMatchNearestMailBlockquoteColor: webkitMatchNearestMailBlockquoteColor_export_definition,
    "webkit-match-nearest-mail-blockquote-color": webkitMatchNearestMailBlockquoteColor_export_definition,
    webkitTapHighlightColor: webkitTapHighlightColor_export_definition,
    "webkit-tap-highlight-color": webkitTapHighlightColor_export_definition,
    webkitTextEmphasisColor: webkitTextEmphasisColor_export_definition,
    "webkit-text-emphasis-color": webkitTextEmphasisColor_export_definition,
    webkitTextFillColor: webkitTextFillColor_export_definition,
    "webkit-text-fill-color": webkitTextFillColor_export_definition,
    webkitTextStrokeColor: webkitTextStrokeColor_export_definition,
    "webkit-text-stroke-color": webkitTextStrokeColor_export_definition,
    width: width_export_definition
  });
};

}, function(modId) { var map = {"./parsers.js":1711103528387,"./constants.js":1711103528392}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528392, function(require, module, exports) {


module.exports.POSITION_AT_SHORTHAND = {
  first: 0,
  second: 1,
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1711103528382);
})()
//miniprogram-npm-outsideDeps=["cssom"]
//# sourceMappingURL=index.js.map