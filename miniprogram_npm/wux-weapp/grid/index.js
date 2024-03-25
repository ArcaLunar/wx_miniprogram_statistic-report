"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/libs/classNames"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(0,_baseComponent.default)({relations:{"../grids/index":{type:"parent"}},properties:{prefixCls:{type:String,value:"wux-grid"},hoverClass:{type:String,value:"default"},thumb:{type:String,value:""},label:{type:String,value:""}},data:{width:"100%",bordered:!0,square:!0,index:0},computed:{classes:["prefixCls, hoverClass, bordered, square",function(e,t,r,o){return{wrap:(0,_classNames2.default)(e,_defineProperty(_defineProperty({},"".concat(e,"--bordered"),r),"".concat(e,"--square"),o)),content:"".concat(e,"__content"),inner:"".concat(e,"__inner"),hd:"".concat(e,"__hd"),thumb:"".concat(e,"__thumb"),bd:"".concat(e,"__bd"),label:"".concat(e,"__label"),hover:t&&"default"!==t?t:"".concat(e,"--hover")}}]},methods:{changeCurrent:function(e,t,r,o){this.setData({width:e,bordered:t,square:r,index:o})},onTap:function(){this.triggerEvent("click",this.data)}}});