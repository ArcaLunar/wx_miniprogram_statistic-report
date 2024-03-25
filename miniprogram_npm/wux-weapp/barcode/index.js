"use strict";var _barcode=_interopRequireDefault(require("./barcode")),_useNativeAPI=require("../helpers/hooks/useNativeAPI"),_useCanvasAPI=require("../helpers/hooks/useCanvasAPI");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var r,o=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,r)),o}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}var defalutOptions={number:!0,prefix:!0,color:"black",debug:!1,onValid:function(){},onInvalid:function(){},onSuccess:function(){},onError:function(){}};Component({properties:{width:{type:Number,value:200},height:{type:Number,value:100},number:{type:String,value:""},options:{type:Object,value:_objectSpread({},defalutOptions)},canvasId:{type:String,value:"wux-barcode"}},observers:_defineProperty({},"canvasId, number, width, height, options",function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var o=t[0],n=t[1],i=t[2],u=t[3],a=t[4];this.draw({canvasId:o,number:n,width:i,height:u,options:a})}),methods:{draw:function(){var o=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=_objectSpread(_objectSpread({},this.data),e),t=e.canvasId,n=e.number,i=e.width,u=e.height,a=e.options,e=_objectSpread(_objectSpread({},defalutOptions),a),c={number:e.number,prefix:e.prefix,color:e.color,debug:e.debug};(0,_useCanvasAPI.getCanvasRef)(t,this).then(function(r){["onValid","onInvalid","onSuccess","onError"].forEach(function(e){var t=a[e];c[e]=function(){t&&t(),"onSuccess"===e&&(0,_useCanvasAPI.toDataURL)({width:i,height:u},r).then(function(e){r.getContext("2d").restore(),o.triggerEvent("load",{base64Url:e})}),o.triggerEvent(e.replace(/^on/,"").toLocaleLowerCase())}}),new _barcode.default(r,(0,_useNativeAPI.getSystemInfoSync)(["window"]).pixelRatio,n,Object.assign({width:i,height:u},c))})}}});