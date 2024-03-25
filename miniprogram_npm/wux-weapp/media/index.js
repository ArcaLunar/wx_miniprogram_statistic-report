"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/libs/classNames")),_styleToCssString=_interopRequireDefault(require("../helpers/libs/styleToCssString"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(0,_baseComponent.default)({properties:{prefixCls:{type:String,value:"wux-media"},thumb:{type:String,value:""},thumbStyle:{type:[String,Object],value:"",observer:function(e){this.setData({extStyle:(0,_styleToCssString.default)(e)})}},title:{type:String,value:""},label:{type:String,value:""},align:{type:String,value:"center"}},data:{extStyle:""},computed:{classes:["prefixCls, align",function(e,t){return{wrap:(0,_classNames2.default)(e,_defineProperty({},"".concat(e,"--align-").concat(t),t)),hd:"".concat(e,"__hd"),thumb:"".concat(e,"__thumb"),bd:"".concat(e,"__bd"),title:"".concat(e,"__title"),desc:"".concat(e,"__desc")}}]}});