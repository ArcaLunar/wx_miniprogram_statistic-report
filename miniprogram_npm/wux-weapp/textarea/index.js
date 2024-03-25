"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/libs/classNames")),_eventsMixin=_interopRequireDefault(require("../helpers/mixins/eventsMixin")),_styleToCssString=_interopRequireDefault(require("../helpers/libs/styleToCssString")),_useDOM=require("../helpers/hooks/useDOM"),_props=require("./props");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}var defaultEvents={onChange:function(){},onFocus:function(){},onBlur:function(){},onConfirm:function(){},onClear:function(){},onError:function(){},onLineChange:function(){}};(0,_baseComponent.default)({behaviors:[(0,_eventsMixin.default)({defaultEvents:defaultEvents})],relations:{"../field/index":{type:"ancestor"}},properties:_objectSpread(_objectSpread({},_props.nativeTextareaProps),{},{prefixCls:{type:String,value:"wux-textarea"},label:{type:String,value:""},extra:{type:String,value:""},defaultValue:{type:String,value:""},value:{type:String,value:"",observer:function(e){this.data.controlled&&this.updated(e)}},controlled:{type:Boolean,value:!1},disabled:{type:Boolean,value:!1},readOnly:{type:Boolean,value:!1},rows:{type:Number,value:1,observer:"updateHeight"},hasCount:{type:Boolean,value:!1},clear:{type:Boolean,value:!1},error:{type:Boolean,value:!1}}),data:{inputValue:"",inputFocus:!1,inputRows:1,inputHeight:"",internalPlaceholderStyle:""},observers:{placeholderStyle:function(e){this.setInternalPlaceholderStyle(e)}},computed:{classes:["prefixCls, disabled, readOnly, inputFocus, error, hasCount",function(e,t,r,n,o,i){return{wrap:(0,_classNames2.default)(e,_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({},"".concat(e,"--focus"),n),"".concat(e,"--disabled"),t),"".concat(e,"--readonly"),r),"".concat(e,"--error"),o),"".concat(e,"--has-count"),i)),label:"".concat(e,"__label"),control:"".concat(e,"__control"),item:"".concat(e,"__item"),clear:"".concat(e,"__clear"),error:"".concat(e,"__error"),extra:"".concat(e,"__extra"),count:"".concat(e,"__count"),current:"".concat(e,"__current"),keyboardAccessory:"".concat(e,"__keyboard-accessory")}}]},methods:{setInternalPlaceholderStyle:function(e){e=(0,_styleToCssString.default)(e);this.data.internalPlaceholderStyle!==e&&this.setData({internalPlaceholderStyle:e})},updateHeight:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.data.rows,r=Math.max(1,parseInt(e)),e=this.data,n=e.prefixCls,o=e.inputRows;o!==r&&(0,_useDOM.useRect)(".".concat(n,"__item"),this).then(function(e){e&&(e=1<o?e.height/o:e.height,t.setData({inputRows:r,inputHeight:e*r}))})},updated:function(e){this.hasFieldDecorator||this.data.inputValue!==e&&this.setData({inputValue:e})},onChange:function(e){var t=e.detail.value;this.data.controlled||this.updated(t),this.triggerEvent("change",e.detail)},onFocus:function(e){this.clearTimer(),this.setData({inputFocus:!0}),this.triggerEvent("focus",e.detail)},onBlur:function(e){this.setTimer(),this.triggerEvent("blur",e.detail)},onConfirm:function(e){this.triggerEvent("confirm",e.detail)},onKeyboardHeightChange:function(e){this.triggerEvent("keyboardheightchange",e.detail)},onClear:function(e){var t={value:""};this.data.controlled||this.updated(t.value),this.triggerEvent("change",t),this.triggerEvent("clear",t)},onError:function(){var e=this.data.inputValue;this.triggerEvent("error",{value:e})},onLineChange:function(e){this.triggerEvent("linechange",e.detail)},setTimer:function(){var e=this;this.clearTimer(),this.timeout=setTimeout(function(){e.setData({inputFocus:!1})},200)},clearTimer:function(){this.timeout&&(clearTimeout(this.timeout),this.timeout=null)}},attached:function(){var e=this.data,t=e.defaultValue,r=e.value,n=e.controlled,e=e.placeholderStyle;this.updated(n?r:t),this.setInternalPlaceholderStyle(e)},ready:function(){this.updateHeight()}});