"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.props=void 0;var _fieldNamesBehavior=require("../helpers/mixins/fieldNamesBehavior");function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var r,o=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,r)),o}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}var props=exports.props=_objectSpread({prefixCls:{type:String,value:"wux-picker-col"},defaultValue:{type:String,value:""},value:{type:String,value:""},controlled:{type:Boolean,value:!1},itemHeight:{type:Number,value:34},itemStyle:{type:[String,Object,Array],value:""},indicatorStyle:{type:[String,Object,Array],value:""},indicatorClass:{type:String,value:""},maskStyle:{type:[String,Object,Array],value:""},maskClass:{type:String,value:""},labelAlign:{type:String,value:"center"},loading:{type:Boolean,value:!1},options:{type:Array,value:[]}},_fieldNamesBehavior.fieldNamesProps);