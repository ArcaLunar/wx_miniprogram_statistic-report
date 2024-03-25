"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames5=_interopRequireDefault(require("../helpers/libs/classNames")),_eventsMixin=_interopRequireDefault(require("../helpers/mixins/eventsMixin")),_utils=_interopRequireDefault(require("./utils"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,t,i){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var i=e[Symbol.toPrimitive];if(void 0===i)return("string"===t?String:Number)(e);i=i.call(e,t||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}var MAX_SAFE_INTEGER=Number.MAX_SAFE_INTEGER||Math.pow(2,53)-1,toNumberWhenUserInput=function(e){return/\.\d*0$/.test(e)||16<e.length||isNaN(e)?e:Number(e)},getValidValue=function(e,t,i){var n=parseFloat(e);return isNaN(n)?e:i<(n=n<t?t:n)?i:n},defaultEvents={onChange:function(){},onFocus:function(){},onBlur:function(){}};(0,_baseComponent.default)({behaviors:[(0,_eventsMixin.default)({defaultEvents:defaultEvents})],externalClasses:["wux-sub-class","wux-input-class","wux-add-class"],relations:{"../field/index":{type:"ancestor"}},properties:{prefixCls:{type:String,value:"wux-input-number"},shape:{type:String,value:"square"},min:{type:Number,value:-MAX_SAFE_INTEGER},max:{type:Number,value:MAX_SAFE_INTEGER},step:{type:Number,value:1},defaultValue:{type:Number,value:0},value:{type:Number,value:0},disabled:{type:Boolean,value:!0},readOnly:{type:Boolean,value:!1},longpress:{type:Boolean,value:!1},color:{type:String,value:"balanced"},controlled:{type:Boolean,value:!1},digits:{type:Number,value:-1}},data:{inputValue:0,disabledMin:!1,disabledMax:!1},computed:{classes:["prefixCls, shape, color, disabled, readOnly, disabledMin, disabledMax",function(e,t,i,n,a,u,r){return{wrap:(0,_classNames5.default)(e,_defineProperty({},"".concat(e,"--").concat(t),t)),sub:(0,_classNames5.default)("".concat(e,"__selector"),_defineProperty(_defineProperty(_defineProperty({},"".concat(e,"__selector--sub"),!0),"".concat(e,"__selector--").concat(i),i),"".concat(e,"__selector--disabled"),u)),add:(0,_classNames5.default)("".concat(e,"__selector"),_defineProperty(_defineProperty(_defineProperty({},"".concat(e,"__selector--add"),!0),"".concat(e,"__selector--").concat(i),i),"".concat(e,"__selector--disabled"),r)),icon:"".concat(e,"__icon"),input:(0,_classNames5.default)("".concat(e,"__input"),_defineProperty(_defineProperty({},"".concat(e,"__input--disabled"),n),"".concat(e,"__input--readonly"),a))}}]},observers:{value:function(e){this.data.controlled&&this.setValue(e,!1)},"inputValue, min, max":function(e,t,i){this.setData({disabledMin:e<=t,disabledMax:i<=e})}},methods:{updated:function(e){this.hasFieldDecorator||this.data.inputValue!==e&&this.setData({inputValue:e})},setValue:function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],i=this.data,n=i.min,a=i.max,i=i.digits,e=_utils.default.strip(getValidValue(e,n,a));-1!==i&&(e=_utils.default.round(e,i)),this.updated(e),t&&this.triggerEvent("change",{value:e})},calculation:function(e,t){var i=this,n=this.data,a=n.disabledMax,u=n.disabledMin,r=n.inputValue,o=n.step,l=n.longpress;n.controlled;if("add"===e){if(a)return;this.setValue(_utils.default.plus(r,o))}if("sub"===e){if(u)return;this.setValue(_utils.default.minus(r,o))}l&&t&&(this.timeout=setTimeout(function(){return i.calculation(e,t)},100))},onInput:function(t){var i=this;this.clearInputTimer(),this.inputTime=setTimeout(function(){var e=toNumberWhenUserInput(t.detail.value);i.setValue(e)},300)},onFocus:function(e){this.triggerEvent("focus",e.detail)},onBlur:function(e){this.setData({inputValue:this.data.inputValue}),this.triggerEvent("blur",e.detail)},onLongpress:function(e){e=e.currentTarget.dataset.type;this.data.longpress&&this.calculation(e,!0)},onTap:function(e){var e=e.currentTarget.dataset.type,t=this.data.longpress;t&&this.timeout||this.calculation(e,!1)},onTouchEnd:function(){this.clearTimer()},onTouchCancel:function(){this.clearTimer()},clearTimer:function(){this.timeout&&(clearTimeout(this.timeout),this.timeout=null)},clearInputTimer:function(){this.inputTime&&(clearTimeout(this.inputTime),this.inputTime=null)}},attached:function(){var e=this.data,t=e.defaultValue,i=e.value,e=e.controlled;this.setValue(e?i:t,!1)},detached:function(){this.clearTimer(),this.clearInputTimer()}});