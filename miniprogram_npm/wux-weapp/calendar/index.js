"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames4=_interopRequireDefault(require("../helpers/libs/classNames")),_useDOM=require("../helpers/hooks/useDOM");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){var n;if(t)return"string"==typeof t?_arrayLikeToArray(t,e):"Map"===(n="Object"===(n=Object.prototype.toString.call(t).slice(8,-1))&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(t,e):void 0}function _iterableToArray(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function ownKeys(e,t){var n,a=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)),a}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach(function(t){_defineProperty(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _defineProperty(t,e,n){return(e=_toPropertyKey(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function _toPropertyKey(t){t=_toPrimitive(t,"string");return"symbol"==_typeof(t)?t:String(t)}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!=_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}var defaults={prefixCls:"wux-calendar",monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayNames:["周日","周一","周二","周三","周四","周五","周六"],dayNamesShort:["周日","周一","周二","周三","周四","周五","周六"],firstDay:1,weekendDays:[0,6],multiple:!1,dateFormat:"yyyy-mm-dd",direction:"horizontal",minDate:null,maxDate:null,touchMove:!0,animate:!0,closeOnSelect:!0,weekHeader:!0,toolbar:!0,value:[],onMonthAdd:function(){},onChange:function(){},onOpen:function(){},onClose:function(){},onDayClick:function(){},onMonthYearChangeStart:function(){},onMonthYearChangeEnd:function(){}},getTouchPosition=function(t){t=t.touches[0]||t.changedTouches[0];return{x:t.pageX,y:t.pageY}},getTransform=function(t,e){return"transform: translate3d(".concat(e?t:0,"%, ").concat(e?0:t,"%, 0)")},isSameDate=function(t,e){t=new Date(t),e=new Date(e);return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()};(0,_baseComponent.default)({useFunc:!0,data:defaults,computed:{classes:["prefixCls, direction",function(t,e){return{wrap:(0,_classNames4.default)(t,_defineProperty({},"".concat(t,"--").concat(e),e)),content:"".concat(t,"__content"),hd:"".concat(t,"__hd"),toolbar:"".concat(t,"__toolbar"),picker:"".concat(t,"__picker"),link:"".concat(t,"__link"),prev:(0,_classNames4.default)("".concat(t,"__icon"),_defineProperty({},"".concat(t,"__icon--prev"),!0)),next:(0,_classNames4.default)("".concat(t,"__icon"),_defineProperty({},"".concat(t,"__icon--next"),!0)),value:"".concat(t,"__value"),bd:"".concat(t,"__bd"),weekdays:"".concat(t,"__weekdays"),weekday:"".concat(t,"__weekday"),months:"".concat(t,"__months"),monthsContent:"".concat(t,"__months-content"),month:"".concat(t,"__month"),days:"".concat(t,"__days"),day:"".concat(t,"__day"),text:"".concat(t,"__text")}}]},methods:{open:function(){var t=this,e=this.$$mergeOptionsAndBindMethods(Object.assign({},defaults,0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}));this.monthsTranslate=0,this.isH="horizontal"===e.direction,this.$$setData(_objectSpread({in:!0},e)).then(function(){return t.init()}),this.setValue(e.value),"function"==typeof this.fns.onOpen&&this.fns.onOpen.call(this)},close:function(){this.$$setData({in:!1}),"function"==typeof this.fns.onClose&&this.fns.onClose.call(this)},init:function(){var e=this,t=this.setWeekHeader(),n=this.setMonthsHTML(),a=this.setMonthsTranslate();return"function"==typeof this.fns.onMonthAdd&&n.forEach(function(t){return e.fns.onMonthAdd.call(e,t)}),this.$$setData({weeks:t,months:n,monthsTranslate:a,wrapperTranslate:""}).then(function(){return e.$$setData(_objectSpread({},e.updateCurrentMonthYear()))})},setMonthsTranslate:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.monthsTranslate,e=100*-t,n=100*-(t-1);return[getTransform(100*-(t+1),this.isH),getTransform(e,this.isH),getTransform(n,this.isH)]},updateCurrentMonthYear:function(t){var e,n=this.data,a=n.months,n=n.monthNames;return void 0===t?{currentMonth:e=parseInt(a[1].month,10),currentYear:parseInt(a[1].year,10),currentMonthName:n[e]}:{currentMonth:e=parseInt(a["next"===t?a.length-1:0].month,10),currentYear:parseInt(a["next"===t?a.length-1:0].year,10),currentMonthName:n[e]}},onTouchStart:function(t){!this.data.touchMove||this.isMoved||this.isRendered||(this.start=getTouchPosition(t),this.move={},this.touchesDiff=0,this.allowItemClick=!0,this.isMoved=!1)},onTouchMove:function(n){var t,a=this;this.data.touchMove&&!this.isRendered&&(this.allowItemClick=!1,this.isMoved||(this.isMoved=!0),this.$$setData({swiping:!0}),t=this.data.prefixCls,(0,_useDOM.useRect)(".".concat(t,"__months-content"),this).then(function(t){var e;t&&a.isMoved&&(a.move=getTouchPosition(n),a.touchesDiff=a.isH?a.move.x-a.start.x:a.move.y-a.start.y,e=t.width,t=t.height,e=a.touchesDiff/(a.isH?e:t),t=100*(a.monthsTranslate+e),e=getTransform(t,a.isH),a.$$setData({wrapperTranslate:"transition-duration: 0s; ".concat(e)}))}))},onTouchEnd:function(){var t=this;this.data.touchMove&&this.isMoved&&!this.isRendered&&(this.isMoved=!1,this.$$setData({swiping:!1}),Math.abs(this.touchesDiff)<30?this.resetMonth():30<=this.touchesDiff?this.prevMonth():this.nextMonth(),setTimeout(function(){return t.allowItemClick=!0},100))},onDayClick:function(t){var e,n,a;this.allowItemClick&&(e=(t=t.currentTarget.dataset).year,n=t.month,a=t.day,(t=t.type).selected&&!this.data.multiple||t.disabled||(t.next&&this.nextMonth(),t.prev&&this.prevMonth(),"function"==typeof this.fns.onDayClick&&this.fns.onDayClick.call(this,e,n,a),this.addValue(new Date(e,n,a).getTime()),this.data.closeOnSelect&&!this.data.multiple&&this.close()))},resetMonth:function(){var t=100*this.monthsTranslate,t=getTransform(t,this.isH);this.$$setData({wrapperTranslate:"transition-duration: 0s; ".concat(t)})},setYearMonth:function(){var t,e=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.data.currentYear,a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.data.currentMonth,o=this.data,r=o.months,s=o.monthsTranslate,i=o.maxDate,h=o.minDate,c=o.currentYear,o=o.currentMonth,u=(n<c?new Date(n,a+1,-1):new Date(n,a)).getTime();i&&u>new Date(i).getTime()||h&&u<new Date(h).getTime()||(i=new Date(c,o).getTime(),t=i<u?"next":"prev",h=this.monthHTML(new Date(n,a)),c=this.monthsTranslate=this.monthsTranslate||0,i<u?(this.monthsTranslate=this.monthsTranslate-1,o=getTransform(100*-(c-1),this.isH),this.$$setData({months:[r[1],r[2],h],monthsTranslate:[s[1],s[2],o]})):(this.monthsTranslate=this.monthsTranslate+1,n=getTransform(100*-(c+1),this.isH),this.$$setData({months:[h,r[0],r[1]],monthsTranslate:[n,s[0],s[1]]})),this.onMonthChangeStart(t),a=getTransform(100*this.monthsTranslate,this.isH),i=this.data.animate?.3:0,u="transition-duration: ".concat(i,"s; ").concat(a),this.$$setData({wrapperTranslate:u}),setTimeout(function(){return e.onMonthChangeEnd(t,!0)},i))},nextYear:function(){this.setYearMonth(this.data.currentYear+1)},prevYear:function(){this.setYearMonth(this.data.currentYear-1)},nextMonth:function(){var t=this,e=this.data,n=e.months,a=e.monthsTranslate,o=e.maxDate,e=e.currentMonth,r=parseInt(n[n.length-1].month,10),n=parseInt(n[n.length-1].year,10),n=new Date(n,r).getTime();if(o&&n>new Date(o).getTime())return this.resetMonth();this.monthsTranslate=this.monthsTranslate-1,r===e&&(o=100*-this.monthsTranslate,r=this.monthHTML(n,"next"),e=getTransform(o,this.isH),n=[this.data.months[1],this.data.months[2],r],this.$$setData({months:n,monthsTranslate:[a[1],a[2],e]}),"function"==typeof this.fns.onMonthAdd)&&this.fns.onMonthAdd.call(this,n[n.length-1]),this.onMonthChangeStart("next");o=getTransform(100*this.monthsTranslate,this.isH),r=this.data.animate?.3:0,a="transition-duration: ".concat(r,"s; ").concat(o);this.$$setData({wrapperTranslate:a}),setTimeout(function(){return t.onMonthChangeEnd("next")},r)},prevMonth:function(){var t=this,e=this.data,n=e.months,a=e.monthsTranslate,o=e.minDate,e=e.currentMonth,r=parseInt(n[0].month,10),n=parseInt(n[0].year,10),n=new Date(n,r+1,-1).getTime();if(o&&n<new Date(o).getTime())return this.resetMonth();this.monthsTranslate=this.monthsTranslate+1,r===e&&(o=100*-this.monthsTranslate,r=this.monthHTML(n,"prev"),e=getTransform(o,this.isH),n=[r,this.data.months[0],this.data.months[1]],this.$$setData({months:n,monthsTranslate:[e,a[0],a[1]]}),"function"==typeof this.fns.onMonthAdd)&&this.fns.onMonthAdd.call(this,n[0]),this.onMonthChangeStart("prev");o=getTransform(100*this.monthsTranslate,this.isH),r=this.data.animate?.3:0,e="transition-duration: ".concat(r,"s; ").concat(o);this.$$setData({wrapperTranslate:e}),setTimeout(function(){return t.onMonthChangeEnd("prev")},r)},onMonthChangeStart:function(t){t=this.updateCurrentMonthYear(t);this.$$setData(t),"function"==typeof this.fns.onMonthYearChangeStart&&this.fns.onMonthYearChangeStart.call(this,t.currentYear,t.currentMonth)},onMonthChangeEnd:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"next",n=1<arguments.length&&void 0!==arguments[1]&&arguments[1],a=this.data,o=a.currentYear,a=a.currentMonth,r=_toConsumableArray(this.data.months),s=(n?(n=this.monthHTML(new Date(o,a),"prev"),s=this.monthHTML(new Date(o,a),"next"),r=[n,r["next"===e?r.length-1:0],s]):(n=this.monthHTML(new Date(o,a),e),"next"===e?r=[r[1],r[2],n]:"prev"===e&&(r=[n,r[0],r[1]])),this.setMonthsTranslate(this.monthsTranslate));this.isRendered=!0,this.$$setData({months:r,monthsTranslate:s}).then(function(){return t.isRendered=!1}),"function"==typeof this.fns.onMonthAdd&&this.fns.onMonthAdd.call(this,"next"===e?r[r.length-1]:r[0]),"function"==typeof this.fns.onMonthYearChangeEnd&&this.fns.onMonthYearChangeEnd.call(this,o,a)},setWeekHeader:function(){var t=this.data,e=t.weekHeader,n=t.firstDay,a=t.dayNamesShort,o=t.weekendDays,r=[];if(e)for(var s=0;s<7;s++){var i=6<s+n?s-7+n:s+n,h=a[i],i=0<=o.indexOf(i);r.push({weekend:i,dayName:h})}return r},daysInMonth:function(t){t=new Date(t);return new Date(t.getFullYear(),t.getMonth()+1,0).getDate()},monthHTML:function(t,e){var n=(t=new Date(t)).getFullYear(),a=t.getMonth(),o=t.getTime(),r={year:n,month:a,time:o,items:[]},s=("next"===e&&(t=11===a?new Date(n+1,0):new Date(n,a+1,1)),"prev"===e&&(t=0===a?new Date(n-1,11):new Date(n,a-1,1)),"next"!==e&&"prev"!==e||(a=t.getMonth(),n=t.getFullYear(),o=t.getTime()),this.daysInMonth(new Date(t.getFullYear(),t.getMonth()).getTime()-864e6)),i=this.daysInMonth(t),h=new Date(t.getFullYear(),t.getMonth()).getDay();0===h&&(h=7);var c=[],u=this.data.firstDay-1,l=(new Date).setHours(0,0,0,0),d=this.data.minDate?new Date(this.data.minDate).getTime():null,m=this.data.maxDate?new Date(this.data.maxDate).getTime():null;if(this.data.value&&this.data.value.length)for(var f=0;f<this.data.value.length;f++)c.push(new Date(this.data.value[f]).setHours(0,0,0,0));for(var p=1;p<=6;p++){for(var y=[],g=1;g<=7;g++){var v=g,D=++u-h,M={},v=((T=(D<0?(D=s+D+1,M.prev=!0,new Date(a-1<0?n-1:n,a-1<0?11:a-1,D)):i<(D+=1)?(D-=i,M.next=!0,new Date(11<a+1?n+1:n,11<a+1?0:a+1,D)):new Date(n,a,D)).getTime())===l&&(M.today=!0),0<=c.indexOf(T)&&(M.selected=!0),0<=this.data.weekendDays.indexOf(v-1)&&(M.weekend=!0),(d&&T<d||m&&m<T)&&(M.disabled=!0),(T=new Date(T)).getFullYear()),T=T.getMonth();y.push({type:M,year:v,month:T,day:D,date:"".concat(v,"-").concat(T+1,"-").concat(D)})}r.year=n,r.month=a,r.time=o,r.items.push(y)}return r},setMonthsHTML:function(){var t=this.data.value&&this.data.value.length?this.data.value[0]:(new Date).setHours(0,0,0,0);return[this.monthHTML(t,"prev"),this.monthHTML(t),this.monthHTML(t,"next")]},formatDate:function(t){var e=(t=new Date(t)).getFullYear(),n=t.getMonth(),a=n+1,o=t.getDate(),t=t.getDay();return this.data.dateFormat.replace(/yyyy/g,e).replace(/yy/g,(e+"").substring(2)).replace(/mm/g,a<10?"0"+a:a).replace(/m/g,a).replace(/MM/g,this.data.monthNames[n]).replace(/M/g,this.data.monthNamesShort[n]).replace(/dd/g,o<10?"0"+o:o).replace(/d/g,o).replace(/DD/g,this.data.dayNames[t]).replace(/D/g,this.data.dayNamesShort[t])},addValue:function(t){if(this.data.multiple){for(var e=this.data.value||[],n=-1,a=0;a<e.length;a++)isSameDate(t,e[a])&&(n=a);-1===n?e.push(t):e.splice(n,1),this.setValue(e)}else this.setValue([t])},setValue:function(t){var e=this;this.$$setData({value:t}).then(function(){return e.updateValue()})},updateValue:function(){for(var e=this,i={},n=(this.data.months.forEach(function(t,a){t.items.forEach(function(t,n){t.forEach(function(t,e){t.type.selected&&(i["months[".concat(a,"].items[").concat(n,"][").concat(e,"].type.selected")]=!1)})})}),0);n<this.data.value.length;n++)!function(){var t=new Date(e.data.value[n]),o=t.getFullYear(),r=t.getMonth(),s=t.getDate();e.data.months.forEach(function(t,a){t.year===o&&t.month===r&&t.items.forEach(function(t,n){t.forEach(function(t,e){t.year===o&&t.month===r&&t.day===s&&(i["months[".concat(a,"].items[").concat(n,"][").concat(e,"].type.selected")]=!0)})})})}();this.$$setData(i),"function"==typeof this.fns.onChange&&this.fns.onChange.call(this,this.data.value,this.data.value.map(function(t){return e.formatDate(t)}))},noop:function(){}}});