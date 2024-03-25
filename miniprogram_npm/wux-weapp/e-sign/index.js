"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_useCanvasAPI=require("../helpers/hooks/useCanvasAPI"),_useNativeAPI=require("../helpers/hooks/useNativeAPI"),_useDOM=require("../helpers/hooks/useDOM"),_styleToCssString=_interopRequireDefault(require("../helpers/libs/styleToCssString")),_gestures=require("../helpers/shared/gestures");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function ownKeys(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)),r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach(function(t){_defineProperty(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _defineProperty(t,e,n){return(e=_toPropertyKey(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function _toPropertyKey(t){t=_toPrimitive(t,"string");return"symbol"==_typeof(t)?t:String(t)}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!=_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(0,_baseComponent.default)({properties:{prefixCls:{type:String,value:"wux-e-sign"},type:{type:String,value:"png"},width:{type:[String,Number],value:"auto"},height:{type:Number,value:200},bgColor:{type:String,value:"#ffffff"},lineWidth:{type:Number,value:3},lineColor:{type:String,value:"#000000"},hasFooter:{type:Boolean,value:!0},cancelText:{type:String,value:"重置"},confirmText:{type:String,value:"确定"}},data:{isCanvasEmpty:!0,bodyStyle:""},observers:_defineProperty({},"width, height, bgColor",function(t,e,n){this.setBodyStyle({width:t,height:e}),this.resize(_objectSpread(_objectSpread({},this.data),{},{width:t,height:e,bgColor:n}))}),computed:{classes:["prefixCls",function(t){return{wrap:t,bd:"".concat(t,"__bd"),ft:"".concat(t,"__ft"),button:"".concat(t,"__button")}}]},methods:_defineProperty({onTouchStart:function(t){var e=this;if(!this.canvasRef)return!1;var n=this.data;this.canvasRef.then(function(t){t=t.value;t.beginPath(),t.lineWidth=n.lineWidth||3,t.strokeStyle=n.lineColor||"#000000",e.triggerEvent("start")})},onTouchMove:function(t){var e=this;if(!this.canvasRef)return!1;this.data.isCanvasEmpty&&this.setData({isCanvasEmpty:!1});var n=(0,_gestures.getTouchPoints)(t),r=n.x-(t.currentTarget.offsetLeft||0),i=n.y-(t.currentTarget.offsetTop||0);this.canvasRef.then(function(t){t=t.value;t.lineCap="round",t.lineJoin="round",t.lineTo(r,i),t.stroke(),e.triggerEvent("signing",{mouseX:r,mouseY:i})})},onTouchEnd:function(t){this.data.isCanvasEmpty&&this.setData({isCanvasEmpty:!1}),this.triggerEvent("end")},createCanvasContext:function(u){var e=this,t=function(){return"auto"===u.width?(0,_useDOM.useRef)(".".concat(u.prefixCls,"__bd"),e):Promise.resolve({clientWidth:u.width,clientHeight:u.height})};return Promise.resolve().then(function(){return t().then(function(t){var a=t.clientWidth,s=t.clientHeight;return(0,_useCanvasAPI.getCanvasRef)(u.prefixCls,e).then(function(t){var n=t.getContext("2d"),e=(0,_useNativeAPI.getSystemInfoSync)(["window"]).pixelRatio,r=a*e,i=s*e,o=function(t){t&&u.bgColor&&(t.fillStyle=u.bgColor,t.fillRect(0,0,a,s))};t.width=r,t.height=i,n.scale(e,e),o(n);return{value:n,clear:function(){n.clearRect(0,0,a,s),n.closePath(),o(n)},draw:function(){return(0,_useCanvasAPI.toDataURL)({width:a,height:s,type:u.type},t)},resize:function(t){var e=n.getImageData(0,0,r,i);t().then(function(t){t.value.putImageData(e,0,0)})}}})})})},setBodyStyle:function(t){t=(0,_styleToCssString.default)({width:"auto"===t.width?"auto":"".concat(t.width,"px"),height:"".concat(t.height,"px")});this.data.bodyStyle!==t&&this.setData({bodyStyle:t})},clear:function(){var e=this;this.canvasRef&&this.canvasRef.then(function(t){(0,t.clear)(),e.setData({isCanvasEmpty:!0}),e.triggerEvent("clear")})},submit:function(){var e=this;this.data.isCanvasEmpty?this.triggerEvent("submit",{base64Url:""}):this.canvasRef&&this.canvasRef.then(function(t){(0,t.draw)().then(function(t){return e.triggerEvent("submit",{base64Url:t})})})},resize:function(){var e=this;this.canvasRef&&this.canvasRef.then(function(t){(0,t.resize)(function(){return e.canvasRef=e.createCanvasContext(e.data),e.canvasRef})})}},"export",function(){return{resize:this.resize.bind(this)}}),ready:function(){this.setBodyStyle(this.data),this.canvasRef=this.createCanvasContext(this.data)}});