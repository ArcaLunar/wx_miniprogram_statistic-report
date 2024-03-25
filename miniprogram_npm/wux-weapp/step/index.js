"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/libs/classNames"));function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _defineProperty(t,e,n){return(e=_toPropertyKey(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function _toPropertyKey(t){t=_toPrimitive(t,"string");return"symbol"==_typeof(t)?t:String(t)}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!=_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}var defaultStatus=["wait","process","finish","error"],defaultIcon="ios-checkmark";(0,_baseComponent.default)({relations:{"../steps/index":{type:"parent"}},properties:{prefixCls:{type:String,value:"wux-step"},status:{type:String,value:""},title:{type:String,value:""},content:{type:String,value:""},icon:{type:String,value:""}},data:{width:"100%",length:1,index:0,current:0,direction:"horizontal"},computed:{classes:["prefixCls, direction",function(t,e){return{wrap:(0,_classNames2.default)(t,_defineProperty({},"".concat(t,"--").concat(e),e)),hd:"".concat(t,"__hd"),icon:"".concat(t,"__icon"),thumb:"".concat(t,"__thumb"),bd:"".concat(t,"__bd"),title:"".concat(t,"__title"),content:"".concat(t,"__content"),ft:"".concat(t,"__ft")}}]},methods:{updateCurrent:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e="horizontal"===t.direction?100/t.length+"%":"100%",n=defaultStatus.indexOf(this.data.status),r=t.index<t.current||this.data.icon,i=this.data.icon||defaultIcon,n=-1!==n?defaultStatus[n]:t.index<t.current?"finish":t.index===t.current?"process":"",n="".concat(this.data.prefixCls,"--").concat(n),e=Object.assign({width:e,className:n,hasIcon:r,thumb:i},t);this.setData(e)}},attached:function(){this.updateCurrent(this.data)}});