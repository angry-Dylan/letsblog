/*!
 * JRaiser 2 Javascript Library
 * validator-step - v1.0.0 (2013-10-06T10:41:35+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("validator/1.0.x/step",null,function(e){"use strict";function t(e,t){var i,s,n=[];r.isArray(e)&&(i=e,e={},e[t]=i);for(t in e)for(i=e[t],s=0;s<i.length;s++)null!=i[s]&&n.push({name:t,value:i[s]});return n}var r=e("base/1.0.x/"),i=e("dom/1.0.x/"),s=e("ajax/1.1.x/"),n=e("widget/1.0.x/"),o=0;return n.create(function(){},{_init:function(e){var t=this;if(t._id=++o,t._vOptions={},t._fields=e.fields||[],"string"==typeof t._fields&&(t._fields=t._fields.split(/\s+/)),t._rule=e.rule,"string"==typeof t._rule){var r=[];t._ruleNames=[];var i=t._rule.replace(/(\w+)(?::([^!&|()]+))?/g,function(e,i,s){t._ruleNames.push(i);var n="_helpers_."+i+"(_val_";return s&&(n+=",_refVars_["+(r.push(s)-1)+"]"),n+=")"}),s=new Function("_val_","_refVars_","_helpers_","return "+i+";");i=null,r.length||(r=null),t._rule=function(e,t){return s(e,r,t)}}e.stepDisabled?t.disableStep():t.enableStep()},_destroy:function(){delete this._id,delete this._vOptions,delete this._fields,delete this._rule,delete this._ruleNames,delete this._message,delete this._stepDisabled,delete this._remoteCache},id:function(){return this._id},fields:function(){return this._fields.slice()},isRemote:function(){return!!this._options.remoteURL},stepDisabled:function(){return this._stepDisabled},enableStep:function(){this._stepDisabled=!1},disableStep:function(){this._stepDisabled=!0},syncWithValidator:function(e){this._vOptions=r.extend({},e)},exec:function(e,i,n,o){var l=this;if(l.stepDisabled())return 0;var a=l._ruleNames;if(a)for(var _=a.length-1;_>=0;_--)if(!n[a[_]])throw new Error("not such rule("+a[_]+")");l.trigger("beforevalidate",{elements:e.slice()});var u=this._fields,c=u.length;1===c&&(i=i[u[0]]);var d,f=l._options,h=!0;if(1!==c||f.oneByOne===!1||f.remoteURL){if(1===c&&f.required!==!1&&(h=i.length>0&&""!==i.join("")),h&&l._rule)if(f.remoteURL){var v=function(t){return l._remoteCache=t,l._message=l._rule.call(window,t),l._message?l._error(e.slice(),!0):(l._correct(e.slice(),!0),void(v=null))};if(!o)return l._beforeSend(e.slice()),void s.send(f.remoteURL,r.mix({data:t(i,u[0]),onsuccess:v},f.ajaxSettings||l._vOptions.ajaxSettings,{overwrite:!1}));if("_remoteCache"in l)return v(l._remoteCache)}else{var p;switch(c){case 0:p=[];break;case 1:p=[i.slice()];break;default:p=u.map(function(e){return i[e]?i[e].slice():null})}p.push(n),h=l._rule.apply(window,p),"string"==typeof h&&(l._message=h,h=!1)}h||(d=e.slice())}else if(h=f.required===!1||i.length>0){var d=[];i.every(function(t,r){var i,s=""===t||null==t;if(f.required===!1){if(s)return!0;i=!0}else i=!s;return i&&null!=t&&l._rule&&(i=l._rule.call(window,t,n)),i||d.push(e[r]),h=h&&i,i||!l._vOptions.breakOnError})}else d=e.slice();return h?void l._correct(e.slice()):l._error(d,!0)},_makeEventArg:function(e){return e.stepId=this.id(),this._options.eventElements&&(e.elements=r.toArray(i(e.elements).filter(this._options.eventElements))),e},_beforeSend:function(e){var t=this._makeEventArg({elements:e});return 1==this._options.eventMode&&this._vOptions.beforeSend&&this._vOptions.beforeSend.call(window,t),this.trigger("beforesend",t),t},_error:function(e,t){var r=this._makeEventArg({elements:e,isRemote:!!t,message:this._message||this._options.message});return 1==this._options.eventMode&&this._vOptions.onError&&this._vOptions.onError.call(window,r),this.trigger("error",r),r},_correct:function(e,t){var r=this._makeEventArg({elements:e,isRemote:!!t});return 1==this._options.eventMode&&this._vOptions.onCorrect&&this._vOptions.onCorrect.call(window,r),this.trigger("correct",r),r}},{eventMode:1})});
/*!
 * JRaiser 2 Javascript Library
 * validator - v1.0.0 (2013-11-23T16:12:31+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("validator/1.0.x/",["ajax/1.1.x/","dom/1.0.x/","widget/1.0.x/",null],function(e){"use strict";var t=e("base/1.0.x/"),r=e("ajax/1.1.x/"),n=e("dom/1.0.x/"),i=e("widget/1.0.x/"),s=e("./step"),o={isNumber:function(e){return!isNaN(e)},min:function(e,t){return Number(e)>=t},max:function(e,t){return Number(e)<=t},minLength:function(e,t){return e.length>=t},maxLength:function(e,t){return e.length<=t},isEmail:function(e){var t=/^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}$/.test(e);if(!t)return!1;t=e.replace("@",".").split(".");for(var r=t.length-2;r>=0;r--)if(/^[-_]/.test(t[r])||/[_-]$/.test(t[r]))return!1;return!0},isQQ:function(e){return/^[1-9]\d{4,}$/.test(e)},isMobileNO:function(e){return/^1\d{10}$/.test(e)},isTelNO:function(e){return/^(?:0\d{2,3}-)?[2-9]\d{6,7}(?:-\d{1,4})?$/.test(e)}};return i.create(function(){},{_init:function(e){function i(e){f.trigger("beforesend",e)}function a(e){f._stepCorrect(e)}function u(e){f._stepError(e)}var f=this;if(!e.form||"FORM"!==e.form.prop("nodeName"))throw new Error("please specify a form to validate");if(!e.steps)throw new Error("please specify validation steps");f._form=e.form,f._helpers=t.extend({},o,e.helpers),f._steps=e.steps;for(var l=f._steps.length-1;l>=0;l--)f._steps[l]instanceof s||(f._steps[l]=new s(f._steps[l])),f._steps[l].syncWithValidator({ajaxSettings:e.ajaxSettings,breakOnError:e.breakOnError,beforeSend:i,onCorrect:a,onError:u});if(e.validateOnChange){f._onChange=function(){this.name&&f.validate(this.name)};var c=n(t.toArray(f._form.get(0).elements));c.filter("input[type=text],input[type=password],textarea").on("blur",f._onChange),c.filter("input[type=checkbox],input[type=radio]").on("click",f._onChange),c.filter("input[type=file],select").on("change",f._onChange)}f._onSubmit=function(t){var n=f.validateAll(!0);if(n&&n.length)t.preventDefault(),f.trigger("submiterror",{errorObjs:n,target:t.target});else{var i=f.trigger("beforesubmit",{target:t.target}).isDefaultPrevented();if(i)return void t.preventDefault();e.submitProxy&&(t.preventDefault(),e.submitProxy.call(window,r.serializeForm(this),f._form))}},f._form.on("submit",f._onSubmit)},_destroy:function(){var e=this;e._onChange&&(n(e._form.get(0).elements).off("change blur click",e._onChange),delete e._onChange),e._form.off("submit",e._onSubmit),delete e._onSubmit,delete e._form,delete e._helpers,delete e._steps,delete e._remoteErrors},validate:function(e,t){"string"==typeof e&&(e=e.split(/\s+/));var r=e?this._steps.filter(function(t){for(var r=e.length-1;r>=0;r--)if(-1!==t.fields().indexOf(e[r]))return!0}):this._steps;return this._execSteps(r,t)},validateAll:function(e){return this._execSteps(this._steps,e)},_execStep:function(e,t){var r=this._getFields(e.fields());return e.exec(r.elements,r.values,this._helpers,t)},_execSteps:function(e,t){if(e&&e.length){var r=this,n={},i=[];return e.every(function(e){if(e.stepDisabled())return!0;var s=e.fields(),o=s.some(function(e){return!!n[e]});if(o)return!0;var a=r._execStep(e,t);return a&&i.push(a),s.forEach(function(t){n[t]=a?1:e.isRemote()?2:0}),!a||!r._options.breakOnError}),i}},_stepError:function(e){e.isRemote&&(this._remoteErrors=this._remoteErrors||{},this._remoteErrors[e.stepId]=e),this.trigger("steperror",e)},_stepCorrect:function(e){e.isRemote&&this._remoteErrors&&delete this._remoteErrors[e.stepId],this.trigger("stepcorrect",e)},_getFields:function(e){var t=[],r={};if(e&&e.length)for(var n,i,s=this._form.get(0).elements,o=0;n=s[o];o++)!n.disabled&&n.name&&-1!==e.indexOf(n.name)&&(t.push(n),i="INPUT"!==n.nodeName||"radio"!==n.type&&"checkbox"!==n.type?n.value.trim():n.checked?n.value.trim():null,r[n.name]=r[n.name]||[],r[n.name].push(i));return{elements:t,values:r}}},{events:{submiterror:function(e){alert(e.errorObjs.map(function(e){return e.message}).join("\r\n")),n(e.errorObjs[0].elements).focus()}}})});