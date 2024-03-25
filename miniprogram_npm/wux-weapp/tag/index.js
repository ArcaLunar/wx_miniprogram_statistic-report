"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames=_interopRequireDefault(require("../helpers/libs/classNames"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var isPresetColor=function(e){return!!e&&/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(e)};(0,_baseComponent.default)({properties:{prefixCls:{type:String,value:"wux-tag"},hoverClass:{type:String,value:"default"},color:{type:String,value:"",observer:"updateStyle"},closable:{type:Boolean,value:!1},defaultVisible:{type:Boolean,value:!0},visible:{type:Boolean,value:!0,observer:function(e){this.data.controlled&&this.updated(e)}},controlled:{type:Boolean,value:!1}},data:{className:"",tagStyle:"",tagVisible:!0},computed:{classes:["prefixCls, hoverClass",function(e,t){return{wrap:(0,_classNames.default)(e),icon:"".concat(e,"__icon"),hover:t&&"default"!==t?t:"".concat(e,"--hover")}}]},methods:{updated:function(e){this.data.tagVisible!==e&&this.setData({tagVisible:e})},updateStyle:function(e){var t=this.data.prefixCls,a=isPresetColor(e),t=a?"".concat(t,"--").concat(e):"",a=a?"":"background-color: ".concat(e,"; color: #fff");this.setData({className:t,tagStyle:a})},onChange:function(e){this.data.controlled||this.updated(e),this.triggerEvent("change",{value:e})},onClick:function(){this.triggerEvent("click")},onClose:function(){this.data.closable&&(this.triggerEvent("close"),this.onChange(!1))}},attached:function(){var e=this.data,t=e.defaultVisible,a=e.visible,e=e.controlled;this.updated(e?a:t)}});