(function(global) {"use strict";
global.__DEV__=true;

global.__BUNDLE_START_TIME__=Date.now();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';
var modules=Object.create(null);
var inGuard=false;

function define(id,factory){
modules[id]={
factory:factory,
module:{exports:{}},
isInitialized:false,
hasError:false};


if(__DEV__){
babelHelpers.extends(modules[id].module,{
hot:{
acceptCallback:null,
accept:function(callback){
modules[id].module.hot.acceptCallback=callback;}}});}}






function _require(id){
var mod=modules[id];
if(mod&&mod.isInitialized){
return mod.module.exports;}


return requireImpl(id);}


function requireImpl(id){
if(global.ErrorUtils&&!inGuard){
inGuard=true;
var returnValue;
try{
returnValue=requireImpl.apply(this,arguments);}
catch(e){
global.ErrorUtils.reportFatalError(e);}

inGuard=false;
return returnValue;}


var mod=modules[id];
if(!mod){
var msg='Requiring unknown module "'+id+'"';
if(__DEV__){
msg+='. If you are sure the module is there, try restarting the packager or running "npm install".';}

throw new Error(msg);}


if(mod.hasError){
throw new Error(
'Requiring module "'+id+'" which threw an exception');}



try{


mod.isInitialized=true;

__DEV__&&Systrace().beginEvent('JS_require_'+id);



mod.factory.call(global,global,_require,mod.module,mod.module.exports);

__DEV__&&Systrace().endEvent();}
catch(e){
mod.hasError=true;
mod.isInitialized=false;
throw e;}


return mod.module.exports;}


var Systrace=__DEV__&&function(){
var _Systrace;
try{
_Systrace=_require('Systrace');}
catch(e){}

return _Systrace&&_Systrace.beginEvent?
_Systrace:{beginEvent:function(){},endEvent:function(){}};};


global.__d=define;
global.require=_require;

if(__DEV__){(function(){
function accept(id,factory,inverseDependencies){
var mod=modules[id];

if(!mod){
define(id,factory);
return true;}


if(!mod.module.hot){
console.warn(
'Cannot accept module because Hot Module Replacement '+
'API was not installed.');

return false;}



if(factory){
mod.factory=factory;}

mod.isInitialized=false;
_require(id);

if(mod.module.hot.acceptCallback){
mod.module.hot.acceptCallback();
return true;}else 
{

if(!inverseDependencies){
throw new Error('Undefined `inverseDependencies`');}



return acceptAll(inverseDependencies[id],inverseDependencies);}}



function acceptAll(modules,inverseDependencies){
if(modules.length===0){
return true;}


var notAccepted=modules.filter(function(module){
return !accept(module,undefined,inverseDependencies);});


var parents=[];
for(var i=0;i<notAccepted.length;i++){

if(inverseDependencies[notAccepted[i]].length===0){
return false;}


parents.pushAll(inverseDependencies[notAccepted[i]]);}


return acceptAll(parents,inverseDependencies);}


global.__accept=accept;})();}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';

















Object.assign=function(target,sources){
if(__DEV__){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');}

if(typeof target!=='object'&&typeof target!=='function'){
throw new TypeError(
'In this environment the target of assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');}}




for(var nextIndex=1;nextIndex<arguments.length;nextIndex++){
var nextSource=arguments[nextIndex];
if(nextSource==null){
continue;}


if(__DEV__){
if(typeof nextSource!=='object'&&
typeof nextSource!=='function'){
throw new TypeError(
'In this environment the sources for assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');}}








for(var key in nextSource){
if(__DEV__){
var hasOwnProperty=Object.prototype.hasOwnProperty;
if(!hasOwnProperty.call(nextSource,key)){
throw new TypeError(
'One of the sources for assign has an enumerable key on the '+
'prototype chain. This is an edge case that we do not support. '+
'This error is a performance optimization and not spec compliant.');}}



target[key]=nextSource[key];}}



return target;};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';

















var inspect=function(){























function inspect(obj,opts){
var ctx={
seen:[],
stylize:stylizeNoColor};

return formatValue(ctx,obj,opts.depth);}


function stylizeNoColor(str,styleType){
return str;}


function arrayToHash(array){
var hash={};

array.forEach(function(val,idx){
hash[val]=true;});


return hash;}



function formatValue(ctx,value,recurseTimes){

var primitive=formatPrimitive(ctx,value);
if(primitive){
return primitive;}



var keys=Object.keys(value);
var visibleKeys=arrayToHash(keys);



if(isError(value)&&(
keys.indexOf('message')>=0||keys.indexOf('description')>=0)){
return formatError(value);}



if(keys.length===0){
if(isFunction(value)){
var name=value.name?': '+value.name:'';
return ctx.stylize('[Function'+name+']','special');}

if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}

if(isDate(value)){
return ctx.stylize(Date.prototype.toString.call(value),'date');}

if(isError(value)){
return formatError(value);}}



var base='',array=false,braces=['{','}'];


if(isArray(value)){
array=true;
braces=['[',']'];}



if(isFunction(value)){
var n=value.name?': '+value.name:'';
base=' [Function'+n+']';}



if(isRegExp(value)){
base=' '+RegExp.prototype.toString.call(value);}



if(isDate(value)){
base=' '+Date.prototype.toUTCString.call(value);}



if(isError(value)){
base=' '+formatError(value);}


if(keys.length===0&&(!array||value.length==0)){
return braces[0]+base+braces[1];}


if(recurseTimes<0){
if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}else 
{
return ctx.stylize('[Object]','special');}}



ctx.seen.push(value);

var output;
if(array){
output=formatArray(ctx,value,recurseTimes,visibleKeys,keys);}else 
{
output=keys.map(function(key){
return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array);});}



ctx.seen.pop();

return reduceToSingleString(output,base,braces);}



function formatPrimitive(ctx,value){
if(isUndefined(value))
return ctx.stylize('undefined','undefined');
if(isString(value)){
var simple='\''+JSON.stringify(value).replace(/^"|"$/g,'').
replace(/'/g,"\\'").
replace(/\\"/g,'"')+'\'';
return ctx.stylize(simple,'string');}

if(isNumber(value))
return ctx.stylize(''+value,'number');
if(isBoolean(value))
return ctx.stylize(''+value,'boolean');

if(isNull(value))
return ctx.stylize('null','null');}



function formatError(value){
return '['+Error.prototype.toString.call(value)+']';}



function formatArray(ctx,value,recurseTimes,visibleKeys,keys){
var output=[];
for(var i=0,l=value.length;i<l;++i){
if(hasOwnProperty(value,String(i))){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
String(i),true));}else 
{
output.push('');}}


keys.forEach(function(key){
if(!key.match(/^\d+$/)){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
key,true));}});


return output;}



function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){
var name,str,desc;
desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};
if(desc.get){
if(desc.set){
str=ctx.stylize('[Getter/Setter]','special');}else 
{
str=ctx.stylize('[Getter]','special');}}else 

{
if(desc.set){
str=ctx.stylize('[Setter]','special');}}


if(!hasOwnProperty(visibleKeys,key)){
name='['+key+']';}

if(!str){
if(ctx.seen.indexOf(desc.value)<0){
if(isNull(recurseTimes)){
str=formatValue(ctx,desc.value,null);}else 
{
str=formatValue(ctx,desc.value,recurseTimes-1);}

if(str.indexOf('\n')>-1){
if(array){
str=str.split('\n').map(function(line){
return '  '+line;}).
join('\n').substr(2);}else 
{
str='\n'+str.split('\n').map(function(line){
return '   '+line;}).
join('\n');}}}else 


{
str=ctx.stylize('[Circular]','special');}}


if(isUndefined(name)){
if(array&&key.match(/^\d+$/)){
return str;}

name=JSON.stringify(''+key);
if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){
name=name.substr(1,name.length-2);
name=ctx.stylize(name,'name');}else 
{
name=name.replace(/'/g,"\\'").
replace(/\\"/g,'"').
replace(/(^"|"$)/g,"'");
name=ctx.stylize(name,'string');}}



return name+': '+str;}



function reduceToSingleString(output,base,braces){
var numLinesEst=0;
var length=output.reduce(function(prev,cur){
numLinesEst++;
if(cur.indexOf('\n')>=0)numLinesEst++;
return prev+cur.replace(/\u001b\[\d\d?m/g,'').length+1;},
0);

if(length>60){
return braces[0]+(
base===''?'':base+'\n ')+
' '+
output.join(',\n  ')+
' '+
braces[1];}


return braces[0]+base+' '+output.join(', ')+' '+braces[1];}





function isArray(ar){
return Array.isArray(ar);}


function isBoolean(arg){
return typeof arg==='boolean';}


function isNull(arg){
return arg===null;}


function isNullOrUndefined(arg){
return arg==null;}


function isNumber(arg){
return typeof arg==='number';}


function isString(arg){
return typeof arg==='string';}


function isSymbol(arg){
return typeof arg==='symbol';}


function isUndefined(arg){
return arg===void 0;}


function isRegExp(re){
return isObject(re)&&objectToString(re)==='[object RegExp]';}


function isObject(arg){
return typeof arg==='object'&&arg!==null;}


function isDate(d){
return isObject(d)&&objectToString(d)==='[object Date]';}


function isError(e){
return isObject(e)&&(
objectToString(e)==='[object Error]'||e instanceof Error);}


function isFunction(arg){
return typeof arg==='function';}


function isPrimitive(arg){
return arg===null||
typeof arg==='boolean'||
typeof arg==='number'||
typeof arg==='string'||
typeof arg==='symbol'||
typeof arg==='undefined';}


function objectToString(o){
return Object.prototype.toString.call(o);}


function hasOwnProperty(obj,prop){
return Object.prototype.hasOwnProperty.call(obj,prop);}


return inspect;}();



var OBJECT_COLUMN_NAME='(index)';
var LOG_LEVELS={
trace:0,
info:1,
warn:2,
error:3};


function setupConsole(global){
if(!global.nativeLoggingHook){
return;}


function getNativeLogFunction(level){
return function(){
var str;
if(arguments.length===1&&typeof arguments[0]==='string'){
str=arguments[0];}else 
{
str=Array.prototype.map.call(arguments,function(arg){
return inspect(arg,{depth:10});}).
join(', ');}


var logLevel=level;
if(str.slice(0,9)==='Warning: '&&logLevel>=LOG_LEVELS.error){



logLevel=LOG_LEVELS.warn;}

global.nativeLoggingHook(str,logLevel);};}



var repeat=function(element,n){
return Array.apply(null,Array(n)).map(function(){return element;});};


function consoleTablePolyfill(rows){

if(!Array.isArray(rows)){
var data=rows;
rows=[];
for(var key in data){
if(data.hasOwnProperty(key)){
var row=data[key];
row[OBJECT_COLUMN_NAME]=key;
rows.push(row);}}}



if(rows.length===0){
global.nativeLoggingHook('',LOG_LEVELS.info);
return;}


var columns=Object.keys(rows[0]).sort();
var stringRows=[];
var columnWidths=[];



columns.forEach(function(k,i){
columnWidths[i]=k.length;
for(var j=0;j<rows.length;j++){
var cellStr=rows[j][k].toString();
stringRows[j]=stringRows[j]||[];
stringRows[j][i]=cellStr;
columnWidths[i]=Math.max(columnWidths[i],cellStr.length);}});





var joinRow=function(row,space){
var cells=row.map(function(cell,i){
var extraSpaces=repeat(' ',columnWidths[i]-cell.length).join('');
return cell+extraSpaces;});

space=space||' ';
return cells.join(space+'|'+space);};


var separators=columnWidths.map(function(columnWidth){
return repeat('-',columnWidth).join('');});

var separatorRow=joinRow(separators,'-');
var header=joinRow(columns);
var table=[header,separatorRow];

for(var i=0;i<rows.length;i++){
table.push(joinRow(stringRows[i]));}






global.nativeLoggingHook('\n'+table.join('\n'),LOG_LEVELS.info);}



var originalConsole=global.console;
var descriptor=Object.getOwnPropertyDescriptor(global,'console');
if(descriptor){
Object.defineProperty(global,'originalConsole',descriptor);}


var console={
error:getNativeLogFunction(LOG_LEVELS.error),
info:getNativeLogFunction(LOG_LEVELS.info),
log:getNativeLogFunction(LOG_LEVELS.info),
warn:getNativeLogFunction(LOG_LEVELS.warn),
trace:getNativeLogFunction(LOG_LEVELS.trace),
table:consoleTablePolyfill};



Object.defineProperty(global,'console',{
value:console,
configurable:descriptor?descriptor.configurable:true,
enumerable:descriptor?descriptor.enumerable:true,
writable:descriptor?descriptor.writable:true});





if(__DEV__&&originalConsole){
Object.keys(console).forEach(function(methodName){
var reactNativeMethod=console[methodName];
if(originalConsole[methodName]){
console[methodName]=function(){
originalConsole[methodName].apply(originalConsole,arguments);
reactNativeMethod.apply(console,arguments);};}});}}






if(typeof module!=='undefined'){
module.exports=setupConsole;}else 
{
setupConsole(global);}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';















var ErrorUtils={
_inGuard:0,
_globalHandler:null,
setGlobalHandler:function(fun){
ErrorUtils._globalHandler=fun;},

getGlobalHandler:function(){
return ErrorUtils._globalHandler;},

reportError:function(error){
ErrorUtils._globalHandler&&ErrorUtils._globalHandler(error);},

reportFatalError:function(error){
ErrorUtils._globalHandler&&ErrorUtils._globalHandler(error,true);},

applyWithGuard:function(fun,context,args){
try{
ErrorUtils._inGuard++;
return fun.apply(context,args);}
catch(e){
ErrorUtils.reportError(e);}finally 
{
ErrorUtils._inGuard--;}},


applyWithGuardIfNeeded:function(fun,context,args){
if(ErrorUtils.inGuard()){
return fun.apply(context,args);}else 
{
ErrorUtils.applyWithGuard(fun,context,args);}},


inGuard:function(){
return ErrorUtils._inGuard;},

guard:function(fun,name,context){
if(typeof fun!=='function'){
console.warn('A function must be passed to ErrorUtils.guard, got ',fun);
return null;}

name=name||fun.name||'<generated guard>';
function guarded(){
return (
ErrorUtils.applyWithGuard(
fun,
context||this,
arguments,
null,
name));}




return guarded;}};


global.ErrorUtils=ErrorUtils;






function setupErrorGuard(){
var onError=function(e){
global.console.error('Error: '+e.message+', stack:\n'+e.stack);};

global.ErrorUtils.setGlobalHandler(onError);}


setupErrorGuard();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';











if(!String.prototype.startsWith){
String.prototype.startsWith=function(search){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
var pos=arguments.length>1?
Number(arguments[1])||0:0;
var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos)===start;};}



if(!String.prototype.endsWith){
String.prototype.endsWith=function(search){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length>1?
Number(arguments[1])||0:stringLength;
var end=Math.min(Math.max(pos,0),stringLength);
var start=end-searchString.length;
if(start<0){
return false;}

return string.lastIndexOf(searchString,start)===start;};}



if(!String.prototype.repeat){
String.prototype.repeat=function(count){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
count=Number(count)||0;
if(count<0||count===Infinity){
throw RangeError();}

if(count===1){
return string;}

var result='';
while(count){
if(count&1){
result+=string;}

if(count>>=1){
string+=string;}}


return result;};}



if(!String.prototype.includes){
String.prototype.includes=function(search,start){
'use strict';
if(typeof start!=='number'){
start=0;}


if(start+search.length>this.length){
return false;}else 
{
return this.indexOf(search,start)!==-1;}};}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';









function findIndex(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');}


if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');}

var list=Object(this);
var length=list.length>>>0;
for(var i=0;i<length;i++){
if(predicate.call(context,list[i],i,list)){
return i;}}


return -1;}


if(!Array.prototype.findIndex){
Object.defineProperty(Array.prototype,'findIndex',{
enumerable:false,
writable:true,
configurable:true,
value:findIndex});}




if(!Array.prototype.find){
Object.defineProperty(Array.prototype,'find',{
enumerable:false,
writable:true,
configurable:true,
value:function(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.find called on null or undefined');}


var index=findIndex.call(this,predicate,context);
return index===-1?undefined:this[index];}});}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';












if(!Array.from){
Array.from=function(arrayLike){
if(arrayLike==null){
throw new TypeError('Object is null or undefined');}



var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';
var mapping=typeof mapFn==='function';
var usingIterator=typeof items[symbolIterator]==='function';
var key=0;
var ret;
var value;

if(usingIterator){
ret=typeof C==='function'?
new C():
[];
var it=items[symbolIterator]();
var next;

while(!(next=it.next()).done){
value=next.value;

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;
key+=1;}


ret.length=key;
return ret;}


var len=items.length;
if(isNaN(len)||len<0){
len=0;}


ret=typeof C==='function'?
new C(len):
new Array(len);

while(key<len){
value=items[key];

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;

key+=1;}


ret.length=key;
return ret;};}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';






(function(){

var hasOwnProperty=Object.prototype.hasOwnProperty;






if(typeof Object.entries!=='function'){
Object.entries=function(object){

if(object==null){
throw new TypeError('Object.entries called on non-object');}


var entries=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
entries.push([key,object[key]]);}}


return entries;};}








if(typeof Object.values!=='function'){
Object.values=function(object){

if(object==null){
throw new TypeError('Object.values called on non-object');}


var values=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
values.push(object[key]);}}


return values;};}})();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {"use strict";
















var babelHelpers=global.babelHelpers={};

babelHelpers.createRawReactElement=function(){
var REACT_ELEMENT_TYPE=typeof Symbol==="function"&&(typeof Symbol==="function"?Symbol.for:"@@for")&&(typeof Symbol==="function"?Symbol.for:"@@for")("react.element")||0xeac7;
return function createRawReactElement(type,key,props){
return {
$$typeof:REACT_ELEMENT_TYPE,
type:type,
key:key,
ref:null,
props:props,
_owner:null};};}();




babelHelpers.classCallCheck=function(instance,Constructor){
if(!(instance instanceof Constructor)){
throw new TypeError("Cannot call a class as a function");}};



babelHelpers.createClass=function(){
function defineProperties(target,props){
for(var i=0;i<props.length;i++){
var descriptor=props[i];
descriptor.enumerable=descriptor.enumerable||false;
descriptor.configurable=true;
if("value" in descriptor)descriptor.writable=true;
Object.defineProperty(target,descriptor.key,descriptor);}}



return function(Constructor,protoProps,staticProps){
if(protoProps)defineProperties(Constructor.prototype,protoProps);
if(staticProps)defineProperties(Constructor,staticProps);
return Constructor;};}();



babelHelpers.defineProperty=function(obj,key,value){
if(key in obj){
Object.defineProperty(obj,key,{
value:value,
enumerable:true,
configurable:true,
writable:true});}else 

{
obj[key]=value;}


return obj;};


babelHelpers._extends=babelHelpers.extends=Object.assign||function(target){
for(var i=1;i<arguments.length;i++){
var source=arguments[i];

for(var key in source){
if(Object.prototype.hasOwnProperty.call(source,key)){
target[key]=source[key];}}}




return target;};


babelHelpers.get=function get(object,property,receiver){
if(object===null)object=Function.prototype;
var desc=Object.getOwnPropertyDescriptor(object,property);

if(desc===undefined){
var parent=Object.getPrototypeOf(object);

if(parent===null){
return undefined;}else 
{
return get(parent,property,receiver);}}else 

if("value" in desc){
return desc.value;}else 
{
var getter=desc.get;

if(getter===undefined){
return undefined;}


return getter.call(receiver);}};



babelHelpers.inherits=function(subClass,superClass){
if(typeof superClass!=="function"&&superClass!==null){
throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}


subClass.prototype=Object.create(superClass&&superClass.prototype,{
constructor:{
value:subClass,
enumerable:false,
writable:true,
configurable:true}});


if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;};


babelHelpers.interopRequireDefault=function(obj){
return obj&&obj.__esModule?obj:{
default:obj};};



babelHelpers.interopRequireWildcard=function(obj){
if(obj&&obj.__esModule){
return obj;}else 
{
var newObj={};

if(obj!=null){
for(var key in obj){
if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}



newObj.default=obj;
return newObj;}};



babelHelpers.objectWithoutProperties=function(obj,keys){
var target={};

for(var i in obj){
if(keys.indexOf(i)>=0)continue;
if(!Object.prototype.hasOwnProperty.call(obj,i))continue;
target[i]=obj[i];}


return target;};


babelHelpers.possibleConstructorReturn=function(self,call){
if(!self){
throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}


return call&&(typeof call==="object"||typeof call==="function")?call:self;};


babelHelpers.slicedToArray=function(){
function sliceIterator(arr,i){
var _arr=[];
var _n=true;
var _d=false;
var _e=undefined;

try{
for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){
_arr.push(_s.value);

if(i&&_arr.length===i)break;}}

catch(err){
_d=true;
_e=err;}finally 
{
try{
if(!_n&&_i["return"])_i["return"]();}finally 
{
if(_d)throw _e;}}



return _arr;}


return function(arr,i){
if(Array.isArray(arr)){
return arr;}else 
if((typeof Symbol==="function"?Symbol.iterator:"@@iterator") in Object(arr)){
return sliceIterator(arr,i);}else 
{
throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();




babelHelpers.taggedTemplateLiteral=function(strings,raw){
return Object.freeze(Object.defineProperties(strings,{
raw:{
value:Object.freeze(raw)}}));};




babelHelpers.toArray=function(arr){
return Array.isArray(arr)?arr:Array.from(arr);};


babelHelpers.toConsumableArray=function(arr){
if(Array.isArray(arr)){
for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}

return arr2;}else 
{
return Array.from(arr);}};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
__d('react-redux/lib/utils/shallowEqual.js',function(global, require, module, exports) {  "use strict";

exports.__esModule=true;
exports["default"]=shallowEqual;
function shallowEqual(objA,objB){
if(objA===objB){
return true;}


var keysA=Object.keys(objA);
var keysB=Object.keys(objB);

if(keysA.length!==keysB.length){
return false;}



var hasOwn=Object.prototype.hasOwnProperty;
for(var i=0;i<keysA.length;i++){
if(!hasOwn.call(objB,keysA[i])||objA[keysA[i]]!==objB[keysA[i]]){
return false;}}



return true;}
});
__d('hoist-non-react-statics/index.js',function(global, require, module, exports) {  'use strict';





var REACT_STATICS={
childContextTypes:true,
contextTypes:true,
defaultProps:true,
displayName:true,
getDefaultProps:true,
mixins:true,
propTypes:true,
type:true};


var KNOWN_STATICS={
name:true,
length:true,
prototype:true,
caller:true,
arguments:true,
arity:true};


module.exports=function hoistNonReactStatics(targetComponent,sourceComponent){
var keys=Object.getOwnPropertyNames(sourceComponent);
for(var i=0;i<keys.length;++i){
if(!REACT_STATICS[keys[i]]&&!KNOWN_STATICS[keys[i]]){
try{
targetComponent[keys[i]]=sourceComponent[keys[i]];}
catch(error){}}}





return targetComponent;};
});
__d('invariant/browser.js',function(global, require, module, exports) {  'use strict';





















var invariant=function(condition,format,a,b,c,d,e,f){
if(process.env.NODE_ENV!=='production'){
if(format===undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format===undefined){
error=new Error(
'Minified exception occurred; use the non-minified dev environment '+
'for the full error message and additional helpful warnings.');}else 

{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(
format.replace(/%s/g,function(){return args[argIndex++];}));

error.name='Invariant Violation';}


error.framesToPop=1;
throw error;}};



module.exports=invariant;
});
__d('lodash/_isHostObject.js',function(global, require, module, exports) {  'use strict';






function isHostObject(value){


var result=false;
if(value!=null&&typeof value.toString!='function'){
try{
result=!!(value+'');}
catch(e){}}

return result;}


module.exports=isHostObject;
});
__d('lodash/isObjectLike.js',function(global, require, module, exports) {  'use strict';






















function isObjectLike(value){
return !!value&&typeof value=='object';}


module.exports=isObjectLike;
});
__d('HomyPiAndroid/js/config.js',function(global, require, module, exports) {  "use strict";module.exports={
server_url:"http://homypi.herokuapp.com"};
});
__d('punycode/punycode.js',function(global, require, module, exports) {  'use strict';
;(function(root){


var freeExports=typeof exports=='object'&&exports&&
!exports.nodeType&&exports;
var freeModule=typeof module=='object'&&module&&
!module.nodeType&&module;
var freeGlobal=typeof global=='object'&&global;
if(
freeGlobal.global===freeGlobal||
freeGlobal.window===freeGlobal||
freeGlobal.self===freeGlobal)
{
root=freeGlobal;}







var punycode,


maxInt=2147483647,


base=36,
tMin=1,
tMax=26,
skew=38,
damp=700,
initialBias=72,
initialN=128,
delimiter='-',


regexPunycode=/^xn--/,
regexNonASCII=/[^\x20-\x7E]/,
regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,


errors={
'overflow':'Overflow: input needs wider integers to process',
'not-basic':'Illegal input >= 0x80 (not a basic code point)',
'invalid-input':'Invalid input'},



baseMinusTMin=base-tMin,
floor=Math.floor,
stringFromCharCode=String.fromCharCode,


key;









function error(type){
throw RangeError(errors[type]);}










function map(array,fn){
var length=array.length;
var result=[];
while(length--){
result[length]=fn(array[length]);}

return result;}












function mapDomain(string,fn){
var parts=string.split('@');
var result='';
if(parts.length>1){


result=parts[0]+'@';
string=parts[1];}


string=string.replace(regexSeparators,'\x2E');
var labels=string.split('.');
var encoded=map(labels,fn).join('.');
return result+encoded;}















function ucs2decode(string){
var output=[],
counter=0,
length=string.length,
value,
extra;
while(counter<length){
value=string.charCodeAt(counter++);
if(value>=0xD800&&value<=0xDBFF&&counter<length){

extra=string.charCodeAt(counter++);
if((extra&0xFC00)==0xDC00){
output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else 
{


output.push(value);
counter--;}}else 

{
output.push(value);}}


return output;}










function ucs2encode(array){
return map(array,function(value){
var output='';
if(value>0xFFFF){
value-=0x10000;
output+=stringFromCharCode(value>>>10&0x3FF|0xD800);
value=0xDC00|value&0x3FF;}

output+=stringFromCharCode(value);
return output;}).
join('');}











function basicToDigit(codePoint){
if(codePoint-48<10){
return codePoint-22;}

if(codePoint-65<26){
return codePoint-65;}

if(codePoint-97<26){
return codePoint-97;}

return base;}













function digitToBasic(digit,flag){


return digit+22+75*(digit<26)-((flag!=0)<<5);}







function adapt(delta,numPoints,firstTime){
var k=0;
delta=firstTime?floor(delta/damp):delta>>1;
delta+=floor(delta/numPoints);
for(;delta>baseMinusTMin*tMax>>1;k+=base){
delta=floor(delta/baseMinusTMin);}

return floor(k+(baseMinusTMin+1)*delta/(delta+skew));}









function decode(input){

var output=[],
inputLength=input.length,
out,
i=0,
n=initialN,
bias=initialBias,
basic,
j,
index,
oldi,
w,
k,
digit,
t,

baseMinusT;





basic=input.lastIndexOf(delimiter);
if(basic<0){
basic=0;}


for(j=0;j<basic;++j){

if(input.charCodeAt(j)>=0x80){
error('not-basic');}

output.push(input.charCodeAt(j));}





for(index=basic>0?basic+1:0;index<inputLength;){






for(oldi=i,w=1,k=base;;k+=base){

if(index>=inputLength){
error('invalid-input');}


digit=basicToDigit(input.charCodeAt(index++));

if(digit>=base||digit>floor((maxInt-i)/w)){
error('overflow');}


i+=digit*w;
t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;

if(digit<t){
break;}


baseMinusT=base-t;
if(w>floor(maxInt/baseMinusT)){
error('overflow');}


w*=baseMinusT;}



out=output.length+1;
bias=adapt(i-oldi,out,oldi==0);



if(floor(i/out)>maxInt-n){
error('overflow');}


n+=floor(i/out);
i%=out;


output.splice(i++,0,n);}



return ucs2encode(output);}









function encode(input){
var n,
delta,
handledCPCount,
basicLength,
bias,
j,
m,
q,
k,
t,
currentValue,
output=[],

inputLength,

handledCPCountPlusOne,
baseMinusT,
qMinusT;


input=ucs2decode(input);


inputLength=input.length;


n=initialN;
delta=0;
bias=initialBias;


for(j=0;j<inputLength;++j){
currentValue=input[j];
if(currentValue<0x80){
output.push(stringFromCharCode(currentValue));}}



handledCPCount=basicLength=output.length;





if(basicLength){
output.push(delimiter);}



while(handledCPCount<inputLength){



for(m=maxInt,j=0;j<inputLength;++j){
currentValue=input[j];
if(currentValue>=n&&currentValue<m){
m=currentValue;}}





handledCPCountPlusOne=handledCPCount+1;
if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){
error('overflow');}


delta+=(m-n)*handledCPCountPlusOne;
n=m;

for(j=0;j<inputLength;++j){
currentValue=input[j];

if(currentValue<n&&++delta>maxInt){
error('overflow');}


if(currentValue==n){

for(q=delta,k=base;;k+=base){
t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;
if(q<t){
break;}

qMinusT=q-t;
baseMinusT=base-t;
output.push(
stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));

q=floor(qMinusT/baseMinusT);}


output.push(stringFromCharCode(digitToBasic(q,0)));
bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);
delta=0;
++handledCPCount;}}



++delta;
++n;}


return output.join('');}













function toUnicode(input){
return mapDomain(input,function(string){
return regexPunycode.test(string)?
decode(string.slice(4).toLowerCase()):
string;});}














function toASCII(input){
return mapDomain(input,function(string){
return regexNonASCII.test(string)?
'xn--'+encode(string):
string;});}






punycode={





'version':'1.3.2',







'ucs2':{
'decode':ucs2decode,
'encode':ucs2encode},

'decode':decode,
'encode':encode,
'toASCII':toASCII,
'toUnicode':toUnicode};





if(
typeof define=='function'&&
typeof define.amd=='object'&&
define.amd)
{
define('punycode',function(){
return punycode;});}else 

if(freeExports&&freeModule){
if(module.exports==freeExports){
freeModule.exports=punycode;}else 
{
for(key in punycode){
punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);}}}else 


{
root.punycode=punycode;}})(


this);
});
__d('url/util.js',function(global, require, module, exports) {  'use strict';

module.exports={
isString:function(arg){
return typeof arg==='string';},

isObject:function(arg){
return typeof arg==='object'&&arg!==null;},

isNull:function(arg){
return arg===null;},

isNullOrUndefined:function(arg){
return arg==null;}};
});
__d('querystring/decode.js',function(global, require, module, exports) {  'use strict';

























function hasOwnProperty(obj,prop){
return Object.prototype.hasOwnProperty.call(obj,prop);}


module.exports=function(qs,sep,eq,options){
sep=sep||'&';
eq=eq||'=';
var obj={};

if(typeof qs!=='string'||qs.length===0){
return obj;}


var regexp=/\+/g;
qs=qs.split(sep);

var maxKeys=1000;
if(options&&typeof options.maxKeys==='number'){
maxKeys=options.maxKeys;}


var len=qs.length;

if(maxKeys>0&&len>maxKeys){
len=maxKeys;}


for(var i=0;i<len;++i){
var x=qs[i].replace(regexp,'%20'),
idx=x.indexOf(eq),
kstr,vstr,k,v;

if(idx>=0){
kstr=x.substr(0,idx);
vstr=x.substr(idx+1);}else 
{
kstr=x;
vstr='';}


k=decodeURIComponent(kstr);
v=decodeURIComponent(vstr);

if(!hasOwnProperty(obj,k)){
obj[k]=v;}else 
if(Array.isArray(obj[k])){
obj[k].push(v);}else 
{
obj[k]=[obj[k],v];}}



return obj;};
});
__d('querystring/encode.js',function(global, require, module, exports) {  'use strict';






















var stringifyPrimitive=function(v){
switch(typeof v){
case 'string':
return v;

case 'boolean':
return v?'true':'false';

case 'number':
return isFinite(v)?v:'';

default:
return '';}};



module.exports=function(obj,sep,eq,name){
sep=sep||'&';
eq=eq||'=';
if(obj===null){
obj=undefined;}


if(typeof obj==='object'){
return Object.keys(obj).map(function(k){
var ks=encodeURIComponent(stringifyPrimitive(k))+eq;
if(Array.isArray(obj[k])){
return obj[k].map(function(v){
return ks+encodeURIComponent(stringifyPrimitive(v));}).
join(sep);}else 
{
return ks+encodeURIComponent(stringifyPrimitive(obj[k]));}}).

join(sep);}



if(!name)return '';
return encodeURIComponent(stringifyPrimitive(name))+eq+
encodeURIComponent(stringifyPrimitive(obj));};
});
__d('redux-thunk/lib/index.js',function(global, require, module, exports) {  'use strict';

function thunkMiddleware(_ref){
var dispatch=_ref.dispatch;
var getState=_ref.getState;

return function(next){
return function(action){
return typeof action==='function'?action(dispatch,getState):next(action);};};}




module.exports=thunkMiddleware;
});
__d('redux-logger/lib/index.js',function(global, require, module, exports) {  "use strict";

var repeat=function repeat(str,times){
return new Array(times+1).join(str);};

var pad=function pad(num,maxLength){
return repeat("0",maxLength-num.toString().length)+num;};

var formatTime=function formatTime(time){
return "@ "+pad(time.getHours(),2)+":"+pad(time.getMinutes(),2)+":"+pad(time.getSeconds(),2)+"."+pad(time.getMilliseconds(),3);};



var timer=typeof performance!=="undefined"&&typeof performance.now==="function"?performance:Date;



















function createLogger(){
var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];
var _options$level=options.level;
var level=_options$level===undefined?"log":_options$level;
var _options$logger=options.logger;
var logger=_options$logger===undefined?console:_options$logger;
var _options$logErrors=options.logErrors;
var logErrors=_options$logErrors===undefined?true:_options$logErrors;
var collapsed=options.collapsed;
var predicate=options.predicate;
var _options$duration=options.duration;
var duration=_options$duration===undefined?false:_options$duration;
var _options$timestamp=options.timestamp;
var timestamp=_options$timestamp===undefined?true:_options$timestamp;
var transformer=options.transformer;
var _options$stateTransfo=options.stateTransformer;
var 
stateTransformer=_options$stateTransfo===undefined?function(state){
return state;}:
_options$stateTransfo;
var _options$actionTransf=options.actionTransformer;
var actionTransformer=_options$actionTransf===undefined?function(actn){
return actn;}:
_options$actionTransf;
var _options$errorTransfo=options.errorTransformer;
var errorTransformer=_options$errorTransfo===undefined?function(error){
return error;}:
_options$errorTransfo;
var _options$colors=options.colors;
var colors=_options$colors===undefined?{
title:function title(){
return "#000000";},

prevState:function prevState(){
return "#9E9E9E";},

action:function action(){
return "#03A9F4";},

nextState:function nextState(){
return "#4CAF50";},

error:function error(){
return "#F20404";}}:

_options$colors;



if(typeof logger==="undefined"){
return function(){
return function(next){
return function(action){
return next(action);};};};}





if(transformer){
console.error("Option 'transformer' is deprecated, use stateTransformer instead");}


var logBuffer=[];
function printBuffer(){
logBuffer.forEach(function(logEntry,key){
var started=logEntry.started;
var startedTime=logEntry.startedTime;
var action=logEntry.action;
var prevState=logEntry.prevState;
var error=logEntry.error;
var took=logEntry.took;
var nextState=logEntry.nextState;

var nextEntry=logBuffer[key+1];
if(nextEntry){
nextState=nextEntry.prevState;
took=nextEntry.started-started;}


var formattedAction=actionTransformer(action);
var isCollapsed=typeof collapsed==="function"?collapsed(function(){
return nextState;},
action):collapsed;

var formattedTime=formatTime(startedTime);
var titleCSS=colors.title?"color: "+colors.title(formattedAction)+";":null;
var title="action "+(timestamp?formattedTime:"")+" "+formattedAction.type+" "+(duration?"(in "+took.toFixed(2)+" ms)":"");


try{
if(isCollapsed){
if(colors.title)logger.groupCollapsed("%c "+title,titleCSS);else logger.groupCollapsed(title);}else 
{
if(colors.title)logger.group("%c "+title,titleCSS);else logger.group(title);}}

catch(e){
logger.log(title);}


if(colors.prevState)logger[level]("%c prev state","color: "+colors.prevState(prevState)+"; font-weight: bold",prevState);else logger[level]("prev state",prevState);

if(colors.action)logger[level]("%c action","color: "+colors.action(formattedAction)+"; font-weight: bold",formattedAction);else logger[level]("action",formattedAction);

if(error){
if(colors.error)logger[level]("%c error","color: "+colors.error(error,prevState)+"; font-weight: bold",error);else logger[level]("error",error);}


if(colors.nextState)logger[level]("%c next state","color: "+colors.nextState(nextState)+"; font-weight: bold",nextState);else logger[level]("next state",nextState);

try{
logger.groupEnd();}
catch(e){
logger.log("—— log end ——");}});


logBuffer.length=0;}


return function(_ref){
var getState=_ref.getState;
return function(next){
return function(action){

if(typeof predicate==="function"&&!predicate(getState,action)){
return next(action);}


var logEntry={};
logBuffer.push(logEntry);

logEntry.started=timer.now();
logEntry.startedTime=new Date();
logEntry.prevState=stateTransformer(getState());
logEntry.action=action;

var returnedValue=undefined;
if(logErrors){
try{
returnedValue=next(action);}
catch(e){
logEntry.error=errorTransformer(e);}}else 

{
returnedValue=next(action);}


logEntry.took=timer.now()-logEntry.started;
logEntry.nextState=stateTransformer(getState());

printBuffer();

if(logEntry.error)throw logEntry.error;
return returnedValue;};};};}





module.exports=createLogger;
});
__d('redux/lib/bindActionCreators.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;
exports["default"]=bindActionCreators;
function bindActionCreator(actionCreator,dispatch){
return function(){
return dispatch(actionCreator.apply(undefined,arguments));};}
























function bindActionCreators(actionCreators,dispatch){
if(typeof actionCreators==='function'){
return bindActionCreator(actionCreators,dispatch);}


if(typeof actionCreators!=='object'||actionCreators===null){
throw new Error('bindActionCreators expected an object or a function, instead received '+(actionCreators===null?'null':typeof actionCreators)+'. '+'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');}


var keys=Object.keys(actionCreators);
var boundActionCreators={};
for(var i=0;i<keys.length;i++){
var key=keys[i];
var actionCreator=actionCreators[key];
if(typeof actionCreator==='function'){
boundActionCreators[key]=bindActionCreator(actionCreator,dispatch);}}


return boundActionCreators;}
});
__d('redux/lib/compose.js',function(global, require, module, exports) {  "use strict";

exports.__esModule=true;
exports["default"]=compose;







function compose(){
for(var _len=arguments.length,funcs=Array(_len),_key=0;_key<_len;_key++){
funcs[_key]=arguments[_key];}


return function(){
if(funcs.length===0){
return arguments.length<=0?undefined:arguments[0];}


var last=funcs[funcs.length-1];
var rest=funcs.slice(0,-1);

return rest.reduceRight(function(composed,f){
return f(composed);},
last.apply(undefined,arguments));};}
});
__d('redux/lib/utils/warning.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;
exports["default"]=warning;






function warning(message){

if(typeof console!=='undefined'&&typeof console.error==='function'){
console.error(message);}


try{


throw new Error(message);}

catch(e){}}
});
__d('lodash/_isHostObject.js',function(global, require, module, exports) {  'use strict';






function isHostObject(value){


var result=false;
if(value!=null&&typeof value.toString!='function'){
try{
result=!!(value+'');}
catch(e){}}

return result;}


module.exports=isHostObject;
});
__d('lodash/isObjectLike.js',function(global, require, module, exports) {  'use strict';






















function isObjectLike(value){
return !!value&&typeof value=='object';}


module.exports=isObjectLike;
});
__d('react-native-material-kit/lib/MKColor.js',function(global, require, module, exports) {  'use strict';


module.exports={
Red:'#FF5252',
Pink:'#FF4081',
Purple:'#9C27B0',
DeepPurple:'#673AB7',
Indigo:'#3F51B5',
Blue:'#2196F3',
LightBlue:'#03A9F4',
Cyan:'#00BCD4',
Teal:'#009688',
Green:'#4CAF50',
LightGreen:'#8BC34A',
Lime:'#CDDC39',
Yellow:'#FFEB3B',
Amber:'#FFC107',
Orange:'#FF9800',
DeepOrange:'#FF5722',
Brown:'#795548',
Grey:'#9E9E9E',
BlueGrey:'#607D8B',

Transparent:'transparent',
Silver:'#EAEAEA',


RGBIndigo:'63,81,181',
RGBPink:'255,64,129',
RGBPurple:'156,39,176',
RGBTeal:'0,150,136',


palette_blue_400:'rgb(66,165,245)',
palette_red_500:'rgb(244,67,54)',
palette_yellow_600:'rgb(253,216,53)',
palette_green_500:'rgb(76,175,80)'};
});
__d('ramda/dist/ramda.js',function(global, require, module, exports) {  'use strict';




;(function(){

'use strict';



























var __={'@@functional/placeholder':true};


var _arity=function _arity(n,fn){

switch(n){
case 0:
return function(){
return fn.apply(this,arguments);};

case 1:
return function(a0){
return fn.apply(this,arguments);};

case 2:
return function(a0,a1){
return fn.apply(this,arguments);};

case 3:
return function(a0,a1,a2){
return fn.apply(this,arguments);};

case 4:
return function(a0,a1,a2,a3){
return fn.apply(this,arguments);};

case 5:
return function(a0,a1,a2,a3,a4){
return fn.apply(this,arguments);};

case 6:
return function(a0,a1,a2,a3,a4,a5){
return fn.apply(this,arguments);};

case 7:
return function(a0,a1,a2,a3,a4,a5,a6){
return fn.apply(this,arguments);};

case 8:
return function(a0,a1,a2,a3,a4,a5,a6,a7){
return fn.apply(this,arguments);};

case 9:
return function(a0,a1,a2,a3,a4,a5,a6,a7,a8){
return fn.apply(this,arguments);};

case 10:
return function(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9){
return fn.apply(this,arguments);};

default:
throw new Error('First argument to _arity must be a non-negative integer no greater than ten');}};



var _arrayFromIterator=function _arrayFromIterator(iter){
var list=[];
var next;
while(!(next=iter.next()).done){
list.push(next.value);}

return list;};


var _cloneRegExp=function _cloneRegExp(pattern){
return new RegExp(pattern.source,(pattern.global?'g':'')+(pattern.ignoreCase?'i':'')+(pattern.multiline?'m':'')+(pattern.sticky?'y':'')+(pattern.unicode?'u':''));};


var _complement=function _complement(f){
return function(){
return !f.apply(this,arguments);};};














var _concat=function _concat(set1,set2){
set1=set1||[];
set2=set2||[];
var idx;
var len1=set1.length;
var len2=set2.length;
var result=[];
idx=0;
while(idx<len1){
result[result.length]=set1[idx];
idx+=1;}

idx=0;
while(idx<len2){
result[result.length]=set2[idx];
idx+=1;}

return result;};


var _containsWith=function _containsWith(pred,x,list){
var idx=0;
var len=list.length;
while(idx<len){
if(pred(x,list[idx])){
return true;}

idx+=1;}

return false;};


var _filter=function _filter(fn,list){
var idx=0;
var len=list.length;
var result=[];
while(idx<len){
if(fn(list[idx])){
result[result.length]=list[idx];}

idx+=1;}

return result;};


var _forceReduced=function _forceReduced(x){
return {
'@@transducer/value':x,
'@@transducer/reduced':true};};



var _has=function _has(prop,obj){
return Object.prototype.hasOwnProperty.call(obj,prop);};


var _identity=function _identity(x){
return x;};


var _isArguments=function(){
var toString=Object.prototype.toString;
return toString.call(arguments)==='[object Arguments]'?function _isArguments(x){
return toString.call(x)==='[object Arguments]';}:
function _isArguments(x){
return _has('callee',x);};}();















var _isArray=Array.isArray||function _isArray(val){
return val!=null&&val.length>=0&&Object.prototype.toString.call(val)==='[object Array]';};










var _isInteger=Number.isInteger||function _isInteger(n){
return n<<0===n;};


var _isNumber=function _isNumber(x){
return Object.prototype.toString.call(x)==='[object Number]';};


var _isObject=function _isObject(x){
return Object.prototype.toString.call(x)==='[object Object]';};


var _isPlaceholder=function _isPlaceholder(a){
return a!=null&&typeof a==='object'&&a['@@functional/placeholder']===true;};


var _isRegExp=function _isRegExp(x){
return Object.prototype.toString.call(x)==='[object RegExp]';};


var _isString=function _isString(x){
return Object.prototype.toString.call(x)==='[object String]';};


var _isTransformer=function _isTransformer(obj){
return typeof obj['@@transducer/step']==='function';};


var _map=function _map(fn,functor){
var idx=0;
var len=functor.length;
var result=Array(len);
while(idx<len){
result[idx]=fn(functor[idx]);
idx+=1;}

return result;};


var _of=function _of(x){
return [x];};


var _pipe=function _pipe(f,g){
return function(){
return g.call(this,f.apply(this,arguments));};};



var _pipeP=function _pipeP(f,g){
return function(){
var ctx=this;
return f.apply(ctx,arguments).then(function(x){
return g.call(ctx,x);});};};





var _quote=function _quote(s){
var escaped=s.replace(/\\/g,'\\\\').replace(/[\b]/g,'\\b').
replace(/\f/g,'\\f').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/\0/g,'\\0');
return '"'+escaped.replace(/"/g,'\\"')+'"';};


var _reduced=function _reduced(x){
return x&&x['@@transducer/reduced']?x:{
'@@transducer/value':x,
'@@transducer/reduced':true};};




















var _slice=function _slice(args,from,to){
switch(arguments.length){
case 1:
return _slice(args,0,args.length);
case 2:
return _slice(args,from,args.length);
default:
var list=[];
var idx=0;
var len=Math.max(0,Math.min(args.length,to)-from);
while(idx<len){
list[idx]=args[from+idx];
idx+=1;}

return list;}};






var _toISOString=function(){
var pad=function pad(n){
return (n<10?'0':'')+n;};

return typeof Date.prototype.toISOString==='function'?function _toISOString(d){
return d.toISOString();}:
function _toISOString(d){
return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate())+'T'+pad(d.getUTCHours())+':'+pad(d.getUTCMinutes())+':'+pad(d.getUTCSeconds())+'.'+(d.getUTCMilliseconds()/1000).toFixed(3).slice(2,5)+'Z';};}();



var _xfBase={
init:function(){
return this.xf['@@transducer/init']();},

result:function(result){
return this.xf['@@transducer/result'](result);}};



var _xwrap=function(){
function XWrap(fn){
this.f=fn;}

XWrap.prototype['@@transducer/init']=function(){
throw new Error('init not implemented on XWrap');};

XWrap.prototype['@@transducer/result']=function(acc){
return acc;};

XWrap.prototype['@@transducer/step']=function(acc,x){
return this.f(acc,x);};

return function _xwrap(fn){
return new XWrap(fn);};}();



var _aperture=function _aperture(n,list){
var idx=0;
var limit=list.length-(n-1);
var acc=new Array(limit>=0?limit:0);
while(idx<limit){
acc[idx]=_slice(list,idx,idx+n);
idx+=1;}

return acc;};












var _checkForMethod=function _checkForMethod(methodname,fn){
return function(){
var length=arguments.length;
if(length===0){
return fn();}

var obj=arguments[length-1];
return _isArray(obj)||typeof obj[methodname]!=='function'?fn.apply(this,arguments):obj[methodname].apply(obj,_slice(arguments,0,length-1));};};











var _curry1=function _curry1(fn){
return function f1(a){
if(arguments.length===0||_isPlaceholder(a)){
return f1;}else 
{
return fn.apply(this,arguments);}};};












var _curry2=function _curry2(fn){
return function f2(a,b){
switch(arguments.length){
case 0:
return f2;
case 1:
return _isPlaceholder(a)?f2:_curry1(function(_b){
return fn(a,_b);});

default:
return _isPlaceholder(a)&&_isPlaceholder(b)?f2:_isPlaceholder(a)?_curry1(function(_a){
return fn(_a,b);}):
_isPlaceholder(b)?_curry1(function(_b){
return fn(a,_b);}):
fn(a,b);}};};












var _curry3=function _curry3(fn){
return function f3(a,b,c){
switch(arguments.length){
case 0:
return f3;
case 1:
return _isPlaceholder(a)?f3:_curry2(function(_b,_c){
return fn(a,_b,_c);});

case 2:
return _isPlaceholder(a)&&_isPlaceholder(b)?f3:_isPlaceholder(a)?_curry2(function(_a,_c){
return fn(_a,b,_c);}):
_isPlaceholder(b)?_curry2(function(_b,_c){
return fn(a,_b,_c);}):
_curry1(function(_c){
return fn(a,b,_c);});

default:
return _isPlaceholder(a)&&_isPlaceholder(b)&&_isPlaceholder(c)?f3:_isPlaceholder(a)&&_isPlaceholder(b)?_curry2(function(_a,_b){
return fn(_a,_b,c);}):
_isPlaceholder(a)&&_isPlaceholder(c)?_curry2(function(_a,_c){
return fn(_a,b,_c);}):
_isPlaceholder(b)&&_isPlaceholder(c)?_curry2(function(_b,_c){
return fn(a,_b,_c);}):
_isPlaceholder(a)?_curry1(function(_a){
return fn(_a,b,c);}):
_isPlaceholder(b)?_curry1(function(_b){
return fn(a,_b,c);}):
_isPlaceholder(c)?_curry1(function(_c){
return fn(a,b,_c);}):
fn(a,b,c);}};};














var _curryN=function _curryN(length,received,fn){
return function(){
var combined=[];
var argsIdx=0;
var left=length;
var combinedIdx=0;
while(combinedIdx<received.length||argsIdx<arguments.length){
var result;
if(combinedIdx<received.length&&(!_isPlaceholder(received[combinedIdx])||argsIdx>=arguments.length)){
result=received[combinedIdx];}else 
{
result=arguments[argsIdx];
argsIdx+=1;}

combined[combinedIdx]=result;
if(!_isPlaceholder(result)){
left-=1;}

combinedIdx+=1;}

return left<=0?fn.apply(this,combined):_arity(left,_curryN(length,combined,fn));};};

















var _dispatchable=function _dispatchable(methodname,xf,fn){
return function(){
var length=arguments.length;
if(length===0){
return fn();}

var obj=arguments[length-1];
if(!_isArray(obj)){
var args=_slice(arguments,0,length-1);
if(typeof obj[methodname]==='function'){
return obj[methodname].apply(obj,args);}

if(_isTransformer(obj)){
var transducer=xf.apply(null,args);
return transducer(obj);}}


return fn.apply(this,arguments);};};



var _dropLastWhile=function dropLastWhile(pred,list){
var idx=list.length-1;
while(idx>=0&&pred(list[idx])){
idx-=1;}

return _slice(list,0,idx+1);};


var _xall=function(){
function XAll(f,xf){
this.xf=xf;
this.f=f;
this.all=true;}

XAll.prototype['@@transducer/init']=_xfBase.init;
XAll.prototype['@@transducer/result']=function(result){
if(this.all){
result=this.xf['@@transducer/step'](result,true);}

return this.xf['@@transducer/result'](result);};

XAll.prototype['@@transducer/step']=function(result,input){
if(!this.f(input)){
this.all=false;
result=_reduced(this.xf['@@transducer/step'](result,false));}

return result;};

return _curry2(function _xall(f,xf){
return new XAll(f,xf);});}();



var _xany=function(){
function XAny(f,xf){
this.xf=xf;
this.f=f;
this.any=false;}

XAny.prototype['@@transducer/init']=_xfBase.init;
XAny.prototype['@@transducer/result']=function(result){
if(!this.any){
result=this.xf['@@transducer/step'](result,false);}

return this.xf['@@transducer/result'](result);};

XAny.prototype['@@transducer/step']=function(result,input){
if(this.f(input)){
this.any=true;
result=_reduced(this.xf['@@transducer/step'](result,true));}

return result;};

return _curry2(function _xany(f,xf){
return new XAny(f,xf);});}();



var _xaperture=function(){
function XAperture(n,xf){
this.xf=xf;
this.pos=0;
this.full=false;
this.acc=new Array(n);}

XAperture.prototype['@@transducer/init']=_xfBase.init;
XAperture.prototype['@@transducer/result']=function(result){
this.acc=null;
return this.xf['@@transducer/result'](result);};

XAperture.prototype['@@transducer/step']=function(result,input){
this.store(input);
return this.full?this.xf['@@transducer/step'](result,this.getCopy()):result;};

XAperture.prototype.store=function(input){
this.acc[this.pos]=input;
this.pos+=1;
if(this.pos===this.acc.length){
this.pos=0;
this.full=true;}};


XAperture.prototype.getCopy=function(){
return _concat(_slice(this.acc,this.pos),_slice(this.acc,0,this.pos));};

return _curry2(function _xaperture(n,xf){
return new XAperture(n,xf);});}();



var _xdrop=function(){
function XDrop(n,xf){
this.xf=xf;
this.n=n;}

XDrop.prototype['@@transducer/init']=_xfBase.init;
XDrop.prototype['@@transducer/result']=_xfBase.result;
XDrop.prototype['@@transducer/step']=function(result,input){
if(this.n>0){
this.n-=1;
return result;}

return this.xf['@@transducer/step'](result,input);};

return _curry2(function _xdrop(n,xf){
return new XDrop(n,xf);});}();



var _xdropLast=function(){
function XDropLast(n,xf){
this.xf=xf;
this.pos=0;
this.full=false;
this.acc=new Array(n);}

XDropLast.prototype['@@transducer/init']=_xfBase.init;
XDropLast.prototype['@@transducer/result']=function(result){
this.acc=null;
return this.xf['@@transducer/result'](result);};

XDropLast.prototype['@@transducer/step']=function(result,input){
if(this.full){
result=this.xf['@@transducer/step'](result,this.acc[this.pos]);}

this.store(input);
return result;};

XDropLast.prototype.store=function(input){
this.acc[this.pos]=input;
this.pos+=1;
if(this.pos===this.acc.length){
this.pos=0;
this.full=true;}};


return _curry2(function _xdropLast(n,xf){
return new XDropLast(n,xf);});}();



var _xdropRepeatsWith=function(){
function XDropRepeatsWith(pred,xf){
this.xf=xf;
this.pred=pred;
this.lastValue=undefined;
this.seenFirstValue=false;}

XDropRepeatsWith.prototype['@@transducer/init']=function(){
return this.xf['@@transducer/init']();};

XDropRepeatsWith.prototype['@@transducer/result']=function(result){
return this.xf['@@transducer/result'](result);};

XDropRepeatsWith.prototype['@@transducer/step']=function(result,input){
var sameAsLast=false;
if(!this.seenFirstValue){
this.seenFirstValue=true;}else 
if(this.pred(this.lastValue,input)){
sameAsLast=true;}

this.lastValue=input;
return sameAsLast?result:this.xf['@@transducer/step'](result,input);};

return _curry2(function _xdropRepeatsWith(pred,xf){
return new XDropRepeatsWith(pred,xf);});}();



var _xdropWhile=function(){
function XDropWhile(f,xf){
this.xf=xf;
this.f=f;}

XDropWhile.prototype['@@transducer/init']=_xfBase.init;
XDropWhile.prototype['@@transducer/result']=_xfBase.result;
XDropWhile.prototype['@@transducer/step']=function(result,input){
if(this.f){
if(this.f(input)){
return result;}

this.f=null;}

return this.xf['@@transducer/step'](result,input);};

return _curry2(function _xdropWhile(f,xf){
return new XDropWhile(f,xf);});}();



var _xfilter=function(){
function XFilter(f,xf){
this.xf=xf;
this.f=f;}

XFilter.prototype['@@transducer/init']=_xfBase.init;
XFilter.prototype['@@transducer/result']=_xfBase.result;
XFilter.prototype['@@transducer/step']=function(result,input){
return this.f(input)?this.xf['@@transducer/step'](result,input):result;};

return _curry2(function _xfilter(f,xf){
return new XFilter(f,xf);});}();



var _xfind=function(){
function XFind(f,xf){
this.xf=xf;
this.f=f;
this.found=false;}

XFind.prototype['@@transducer/init']=_xfBase.init;
XFind.prototype['@@transducer/result']=function(result){
if(!this.found){
result=this.xf['@@transducer/step'](result,void 0);}

return this.xf['@@transducer/result'](result);};

XFind.prototype['@@transducer/step']=function(result,input){
if(this.f(input)){
this.found=true;
result=_reduced(this.xf['@@transducer/step'](result,input));}

return result;};

return _curry2(function _xfind(f,xf){
return new XFind(f,xf);});}();



var _xfindIndex=function(){
function XFindIndex(f,xf){
this.xf=xf;
this.f=f;
this.idx=-1;
this.found=false;}

XFindIndex.prototype['@@transducer/init']=_xfBase.init;
XFindIndex.prototype['@@transducer/result']=function(result){
if(!this.found){
result=this.xf['@@transducer/step'](result,-1);}

return this.xf['@@transducer/result'](result);};

XFindIndex.prototype['@@transducer/step']=function(result,input){
this.idx+=1;
if(this.f(input)){
this.found=true;
result=_reduced(this.xf['@@transducer/step'](result,this.idx));}

return result;};

return _curry2(function _xfindIndex(f,xf){
return new XFindIndex(f,xf);});}();



var _xfindLast=function(){
function XFindLast(f,xf){
this.xf=xf;
this.f=f;}

XFindLast.prototype['@@transducer/init']=_xfBase.init;
XFindLast.prototype['@@transducer/result']=function(result){
return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result,this.last));};

XFindLast.prototype['@@transducer/step']=function(result,input){
if(this.f(input)){
this.last=input;}

return result;};

return _curry2(function _xfindLast(f,xf){
return new XFindLast(f,xf);});}();



var _xfindLastIndex=function(){
function XFindLastIndex(f,xf){
this.xf=xf;
this.f=f;
this.idx=-1;
this.lastIdx=-1;}

XFindLastIndex.prototype['@@transducer/init']=_xfBase.init;
XFindLastIndex.prototype['@@transducer/result']=function(result){
return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result,this.lastIdx));};

XFindLastIndex.prototype['@@transducer/step']=function(result,input){
this.idx+=1;
if(this.f(input)){
this.lastIdx=this.idx;}

return result;};

return _curry2(function _xfindLastIndex(f,xf){
return new XFindLastIndex(f,xf);});}();



var _xmap=function(){
function XMap(f,xf){
this.xf=xf;
this.f=f;}

XMap.prototype['@@transducer/init']=_xfBase.init;
XMap.prototype['@@transducer/result']=_xfBase.result;
XMap.prototype['@@transducer/step']=function(result,input){
return this.xf['@@transducer/step'](result,this.f(input));};

return _curry2(function _xmap(f,xf){
return new XMap(f,xf);});}();



var _xtake=function(){
function XTake(n,xf){
this.xf=xf;
this.n=n;}

XTake.prototype['@@transducer/init']=_xfBase.init;
XTake.prototype['@@transducer/result']=_xfBase.result;
XTake.prototype['@@transducer/step']=function(result,input){
if(this.n===0){
return _reduced(result);}else 
{
this.n-=1;
return this.xf['@@transducer/step'](result,input);}};


return _curry2(function _xtake(n,xf){
return new XTake(n,xf);});}();



var _xtakeWhile=function(){
function XTakeWhile(f,xf){
this.xf=xf;
this.f=f;}

XTakeWhile.prototype['@@transducer/init']=_xfBase.init;
XTakeWhile.prototype['@@transducer/result']=_xfBase.result;
XTakeWhile.prototype['@@transducer/step']=function(result,input){
return this.f(input)?this.xf['@@transducer/step'](result,input):_reduced(result);};

return _curry2(function _xtakeWhile(f,xf){
return new XTakeWhile(f,xf);});}();




















var add=_curry2(function add(a,b){
return a+b;});

























var adjust=_curry3(function adjust(fn,idx,list){
if(idx>=list.length||idx<-list.length){
return list;}

var start=idx<0?list.length:0;
var _idx=start+idx;
var _list=_concat(list);
_list[_idx]=fn(list[_idx]);
return _list;});



























var all=_curry2(_dispatchable('all',_xall,function all(fn,list){
var idx=0;
while(idx<list.length){
if(!fn(list[idx])){
return false;}

idx+=1;}

return true;}));





















var always=_curry1(function always(val){
return function(){
return val;};});






















var and=_curry2(function and(a,b){
return a&&b;});



























var any=_curry2(_dispatchable('any',_xany,function any(fn,list){
var idx=0;
while(idx<list.length){
if(fn(list[idx])){
return true;}

idx+=1;}

return false;}));

























var aperture=_curry2(_dispatchable('aperture',_xaperture,_aperture));





















var append=_curry2(function append(el,list){
return _concat(list,[el]);});





















var apply=_curry2(function apply(fn,args){
return fn.apply(this,args);});






















var assoc=_curry3(function assoc(prop,val,obj){
var result={};
for(var p in obj){
result[p]=obj[p];}

result[prop]=val;
return result;});






















var assocPath=_curry3(function assocPath(path,val,obj){
switch(path.length){
case 0:
return val;
case 1:
return assoc(path[0],val,obj);
default:
return assoc(path[0],assocPath(_slice(path,1),val,Object(obj[path[0]])),obj);}});



















var bind=_curry2(function bind(fn,thisObj){
return _arity(fn.length,function(){
return fn.apply(thisObj,arguments);});});



























var both=_curry2(function both(f,g){
return function _both(){
return f.apply(this,arguments)&&g.apply(this,arguments);};});






















var comparator=_curry1(function comparator(pred){
return function(a,b){
return pred(a,b)?-1:pred(b,a)?1:0;};});





























var cond=_curry1(function cond(pairs){
return function(){
var idx=0;
while(idx<pairs.length){
if(pairs[idx][0].apply(this,arguments)){
return pairs[idx][1].apply(this,arguments);}

idx+=1;}};});

























var countBy=_curry2(function countBy(fn,list){
var counts={};
var len=list.length;
var idx=0;
while(idx<len){
var key=fn(list[idx]);
counts[key]=(_has(key,counts)?counts[key]:0)+1;
idx+=1;}

return counts;});












































var curryN=_curry2(function curryN(length,fn){
if(length===1){
return _curry1(fn);}

return _arity(length,_curryN(length,[],fn));});

















var dec=add(-1);






















var defaultTo=_curry2(function defaultTo(d,v){
return v==null||v!==v?d:v;});
























var differenceWith=_curry3(function differenceWith(pred,first,second){
var out=[];
var idx=0;
var firstLen=first.length;
while(idx<firstLen){
if(!_containsWith(pred,first[idx],second)&&!_containsWith(pred,first[idx],out)){
out.push(first[idx]);}

idx+=1;}

return out;});


















var dissoc=_curry2(function dissoc(prop,obj){
var result={};
for(var p in obj){
if(p!==prop){
result[p]=obj[p];}}


return result;});




















var dissocPath=_curry2(function dissocPath(path,obj){
switch(path.length){
case 0:
return obj;
case 1:
return dissoc(path[0],obj);
default:
var head=path[0];
var tail=_slice(path,1);
return obj[head]==null?obj:assoc(head,dissocPath(tail,obj[head]),obj);}});

























var divide=_curry2(function divide(a,b){
return a/b;});



























var dropWhile=_curry2(_dispatchable('dropWhile',_xdropWhile,function dropWhile(pred,list){
var idx=0;
var len=list.length;
while(idx<len&&pred(list[idx])){
idx+=1;}

return _slice(list,idx);}));


























var either=_curry2(function either(f,g){
return function _either(){
return f.apply(this,arguments)||g.apply(this,arguments);};});


























var empty=_curry1(function empty(x){
return x!=null&&typeof x.empty==='function'?x.empty():x!=null&&x.constructor!=null&&typeof x.constructor.empty==='function'?x.constructor.empty():_isArray(x)?[]:_isString(x)?'':_isObject(x)?{}:_isArguments(x)?function(){
return arguments;}():

void 0;});





























var evolve=_curry2(function evolve(transformations,object){
var result={};
var transformation,key,type;
for(key in object){
transformation=transformations[key];
type=typeof transformation;
result[key]=type==='function'?transformation(object[key]):type==='object'?evolve(transformations[key],object[key]):object[key];}

return result;});


























var find=_curry2(_dispatchable('find',_xfind,function find(fn,list){
var idx=0;
var len=list.length;
while(idx<len){
if(fn(list[idx])){
return list[idx];}

idx+=1;}}));



























var findIndex=_curry2(_dispatchable('findIndex',_xfindIndex,function findIndex(fn,list){
var idx=0;
var len=list.length;
while(idx<len){
if(fn(list[idx])){
return idx;}

idx+=1;}

return -1;}));


























var findLast=_curry2(_dispatchable('findLast',_xfindLast,function findLast(fn,list){
var idx=list.length-1;
while(idx>=0){
if(fn(list[idx])){
return list[idx];}

idx-=1;}}));



























var findLastIndex=_curry2(_dispatchable('findLastIndex',_xfindLastIndex,function findLastIndex(fn,list){
var idx=list.length-1;
while(idx>=0){
if(fn(list[idx])){
return idx;}

idx-=1;}

return -1;}));



































var forEach=_curry2(_checkForMethod('forEach',function forEach(fn,list){
var len=list.length;
var idx=0;
while(idx<len){
fn(list[idx]);
idx+=1;}

return list;}));

















var fromPairs=_curry1(function fromPairs(pairs){
var idx=0;
var len=pairs.length;
var out={};
while(idx<len){
if(_isArray(pairs[idx])&&pairs[idx].length){
out[pairs[idx][0]]=pairs[idx][1];}

idx+=1;}

return out;});























var gt=_curry2(function gt(a,b){
return a>b;});























var gte=_curry2(function gte(a,b){
return a>=b;});


























var has=_curry2(_has);



























var hasIn=_curry2(function hasIn(prop,obj){
return prop in obj;});





























var identical=_curry2(function identical(a,b){

if(a===b){


return a!==0||1/a===1/b;}else 
{

return a!==a&&b!==b;}});





















var identity=_curry1(_identity);


























var ifElse=_curry3(function ifElse(condition,onTrue,onFalse){
return curryN(Math.max(condition.length,onTrue.length,onFalse.length),function _ifElse(){
return condition.apply(this,arguments)?onTrue.apply(this,arguments):onFalse.apply(this,arguments);});});


















var inc=add(1);



















var insert=_curry3(function insert(idx,elt,list){
idx=idx<list.length&&idx>=0?idx:list.length;
var result=_slice(list);
result.splice(idx,0,elt);
return result;});




















var insertAll=_curry3(function insertAll(idx,elts,list){
idx=idx<list.length&&idx>=0?idx:list.length;
return _concat(_concat(_slice(list,0,idx),elts),_slice(list,idx));});



















var intersperse=_curry2(_checkForMethod('intersperse',function intersperse(separator,list){
var out=[];
var idx=0;
var length=list.length;
while(idx<length){
if(idx===length-1){
out.push(list[idx]);}else 
{
out.push(list[idx],separator);}

idx+=1;}

return out;}));

























var is=_curry2(function is(Ctor,val){
return val!=null&&val.constructor===Ctor||val instanceof Ctor;});





















var isArrayLike=_curry1(function isArrayLike(x){
if(_isArray(x)){
return true;}

if(!x){
return false;}

if(typeof x!=='object'){
return false;}

if(x instanceof String){
return false;}

if(x.nodeType===1){
return !!x.length;}

if(x.length===0){
return true;}

if(x.length>0){
return x.hasOwnProperty(0)&&x.hasOwnProperty(x.length-1);}

return false;});



















var isNil=_curry1(function isNil(x){
return x==null;});





















var keys=function(){

var hasEnumBug=!{toString:null}.propertyIsEnumerable('toString');
var nonEnumerableProps=[
'constructor',
'valueOf',
'isPrototypeOf',
'toString',
'propertyIsEnumerable',
'hasOwnProperty',
'toLocaleString'];


var hasArgsEnumBug=function(){
'use strict';
return arguments.propertyIsEnumerable('length');}();

var contains=function contains(list,item){
var idx=0;
while(idx<list.length){
if(list[idx]===item){
return true;}

idx+=1;}

return false;};

return typeof Object.keys==='function'&&!hasArgsEnumBug?_curry1(function keys(obj){
return Object(obj)!==obj?[]:Object.keys(obj);}):
_curry1(function keys(obj){
if(Object(obj)!==obj){
return [];}

var prop,nIdx;
var ks=[];
var checkArgsLength=hasArgsEnumBug&&_isArguments(obj);
for(prop in obj){
if(_has(prop,obj)&&(!checkArgsLength||prop!=='length')){
ks[ks.length]=prop;}}


if(hasEnumBug){
nIdx=nonEnumerableProps.length-1;
while(nIdx>=0){
prop=nonEnumerableProps[nIdx];
if(_has(prop,obj)&&!contains(ks,prop)){
ks[ks.length]=prop;}

nIdx-=1;}}


return ks;});}();























var keysIn=_curry1(function keysIn(obj){
var prop;
var ks=[];
for(prop in obj){
ks[ks.length]=prop;}

return ks;});

















var length=_curry1(function length(list){
return list!=null&&is(Number,list.length)?list.length:NaN;});























var lt=_curry2(function lt(a,b){
return a<b;});























var lte=_curry2(function lte(a,b){
return a<=b;});




























var mapAccum=_curry3(function mapAccum(fn,acc,list){
var idx=0;
var len=list.length;
var result=[];
var tuple=[acc];
while(idx<len){
tuple=fn(tuple[0],list[idx]);
result[idx]=tuple[1];
idx+=1;}

return [
tuple[0],
result];});
































var mapAccumRight=_curry3(function mapAccumRight(fn,acc,list){
var idx=list.length-1;
var result=[];
var tuple=[acc];
while(idx>=0){
tuple=fn(tuple[0],list[idx]);
result[idx]=tuple[1];
idx-=1;}

return [
tuple[0],
result];});
























var match=_curry2(function match(rx,str){
return str.match(rx)||[];});


































var mathMod=_curry2(function mathMod(m,p){
if(!_isInteger(m)){
return NaN;}

if(!_isInteger(p)||p<1){
return NaN;}

return (m%p+p)%p;});



















var max=_curry2(function max(a,b){
return b>a?b:a;});


























var maxBy=_curry3(function maxBy(f,a,b){
return f(b)>f(a)?b:a;});





























var mergeWithKey=_curry3(function mergeWithKey(fn,l,r){
var result={};
var k;
for(k in l){
if(_has(k,l)){
result[k]=_has(k,r)?fn(k,l[k],r[k]):l[k];}}


for(k in r){
if(_has(k,r)&&!_has(k,result)){
result[k]=r[k];}}


return result;});



















var min=_curry2(function min(a,b){
return b<a?b:a;});


























var minBy=_curry3(function minBy(f,a,b){
return f(b)<f(a)?b:a;});



























var modulo=_curry2(function modulo(a,b){
return a%b;});






















var multiply=_curry2(function multiply(a,b){
return a*b;});




























var nAry=_curry2(function nAry(n,fn){
switch(n){
case 0:
return function(){
return fn.call(this);};

case 1:
return function(a0){
return fn.call(this,a0);};

case 2:
return function(a0,a1){
return fn.call(this,a0,a1);};

case 3:
return function(a0,a1,a2){
return fn.call(this,a0,a1,a2);};

case 4:
return function(a0,a1,a2,a3){
return fn.call(this,a0,a1,a2,a3);};

case 5:
return function(a0,a1,a2,a3,a4){
return fn.call(this,a0,a1,a2,a3,a4);};

case 6:
return function(a0,a1,a2,a3,a4,a5){
return fn.call(this,a0,a1,a2,a3,a4,a5);};

case 7:
return function(a0,a1,a2,a3,a4,a5,a6){
return fn.call(this,a0,a1,a2,a3,a4,a5,a6);};

case 8:
return function(a0,a1,a2,a3,a4,a5,a6,a7){
return fn.call(this,a0,a1,a2,a3,a4,a5,a6,a7);};

case 9:
return function(a0,a1,a2,a3,a4,a5,a6,a7,a8){
return fn.call(this,a0,a1,a2,a3,a4,a5,a6,a7,a8);};

case 10:
return function(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9){
return fn.call(this,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9);};

default:
throw new Error('First argument to nAry must be a non-negative integer no greater than ten');}});

















var negate=_curry1(function negate(n){
return -n;});
























var none=_curry2(_complement(_dispatchable('any',_xany,any)));




















var not=_curry1(function not(a){
return !a;});

























var nth=_curry2(function nth(offset,list){
var idx=offset<0?list.length+offset:offset;
return _isString(list)?list.charAt(idx):list[idx];});

















var nthArg=_curry1(function nthArg(n){
return function(){
return nth(n,arguments);};});























var objOf=_curry2(function objOf(key,val){
var obj={};
obj[key]=val;
return obj;});




















var of=_curry1(_of);




















var once=_curry1(function once(fn){
var called=false;
var result;
return _arity(fn.length,function(){
if(called){
return result;}

called=true;
result=fn.apply(this,arguments);
return result;});});























var or=_curry2(function or(a,b){
return a||b;});
























var over=function(){
var Identity=function(x){
return {
value:x,
map:function(f){
return Identity(f(x));}};};



return _curry3(function over(lens,f,x){
return lens(function(y){
return Identity(f(y));})(
x).value;});}();



















var pair=_curry2(function pair(fst,snd){
return [
fst,
snd];});



















var path=_curry2(function path(paths,obj){
var val=obj;
var idx=0;
while(idx<paths.length){
if(val==null){
return;}

val=val[paths[idx]];
idx+=1;}

return val;});




















var pathOr=_curry3(function pathOr(d,p,obj){
return defaultTo(d,path(p,obj));});





















var pathSatisfies=_curry3(function pathSatisfies(pred,propPath,obj){
return propPath.length>0&&pred(path(propPath,obj));});




















var pick=_curry2(function pick(names,obj){
var result={};
var idx=0;
while(idx<names.length){
if(names[idx] in obj){
result[names[idx]]=obj[names[idx]];}

idx+=1;}

return result;});




















var pickAll=_curry2(function pickAll(names,obj){
var result={};
var idx=0;
var len=names.length;
while(idx<len){
var name=names[idx];
result[name]=obj[name];
idx+=1;}

return result;});






















var pickBy=_curry2(function pickBy(test,obj){
var result={};
for(var prop in obj){
if(test(obj[prop],prop,obj)){
result[prop]=obj[prop];}}


return result;});



















var prepend=_curry2(function prepend(el,list){
return _concat([el],list);});



















var prop=_curry2(function prop(p,obj){
return obj[p];});




























var propOr=_curry3(function propOr(val,p,obj){
return obj!=null&&_has(p,obj)?obj[p]:val;});




















var propSatisfies=_curry3(function propSatisfies(pred,name,obj){
return pred(obj[name]);});






















var props=_curry2(function props(ps,obj){
var len=ps.length;
var out=[];
var idx=0;
while(idx<len){
out[idx]=obj[ps[idx]];
idx+=1;}

return out;});


















var range=_curry2(function range(from,to){
if(!(_isNumber(from)&&_isNumber(to))){
throw new TypeError('Both arguments to range must be numbers');}

var result=[];
var n=from;
while(n<to){
result.push(n);
n+=1;}

return result;});



































var reduceRight=_curry3(function reduceRight(fn,acc,list){
var idx=list.length-1;
while(idx>=0){
acc=fn(acc,list[idx]);
idx-=1;}

return acc;});

























var reduced=_curry1(_reduced);




















var remove=_curry3(function remove(start,count,list){
return _concat(_slice(list,0,Math.min(start,list.length)),_slice(list,Math.min(list.length,start+count)));});






















var replace=_curry3(function replace(regex,replacement,str){
return str.replace(regex,replacement);});


























var reverse=_curry1(function reverse(list){
return _isString(list)?list.split('').reverse().join(''):_slice(list).reverse();});





















var scan=_curry3(function scan(fn,acc,list){
var idx=0;
var len=list.length;
var result=[acc];
while(idx<len){
acc=fn(acc,list[idx]);
result[idx+1]=acc;
idx+=1;}

return result;});
























var set=_curry3(function set(lens,v,x){
return over(lens,always(v),x);});


























var slice=_curry3(_checkForMethod('slice',function slice(fromIndex,toIndex,list){
return Array.prototype.slice.call(list,fromIndex,toIndex);}));






















var sort=_curry2(function sort(comparator,list){
return _slice(list).sort(comparator);});


































var sortBy=_curry2(function sortBy(fn,list){
return _slice(list).sort(function(a,b){
var aa=fn(a);
var bb=fn(b);
return aa<bb?-1:aa>bb?1:0;});});






















var splitAt=_curry2(function splitAt(index,array){
return [
slice(0,index,array),
slice(index,length(array),array)];});




















var splitEvery=_curry2(function splitEvery(n,list){
if(n<=0){
throw new Error('First argument to splitEvery must be a positive integer');}

var result=[];
var idx=0;
while(idx<list.length){
result.push(slice(idx,idx+=n,list));}

return result;});






















var splitWhen=_curry2(function splitWhen(pred,list){
var idx=0;
var len=list.length;
var prefix=[];
while(idx<len&&!pred(list[idx])){
prefix.push(list[idx]);
idx+=1;}

return [
prefix,
_slice(list,idx)];});


























var subtract=_curry2(function subtract(a,b){
return a-b;});





























var tail=_checkForMethod('tail',slice(1,Infinity));








































var take=_curry2(_dispatchable('take',_xtake,function take(n,xs){
return slice(0,n<0?Infinity:n,xs);}));
























var takeLastWhile=_curry2(function takeLastWhile(fn,list){
var idx=list.length-1;
while(idx>=0&&fn(list[idx])){
idx-=1;}

return _slice(list,idx+1,Infinity);});




























var takeWhile=_curry2(_dispatchable('takeWhile',_xtakeWhile,function takeWhile(fn,list){
var idx=0;
var len=list.length;
while(idx<len&&fn(list[idx])){
idx+=1;}

return _slice(list,0,idx);}));



















var tap=_curry2(function tap(fn,x){
fn(x);
return x;});





















var times=_curry2(function times(fn,n){
var len=Number(n);
var idx=0;
var list;
if(len<0||isNaN(len)){
throw new RangeError('n must be a non-negative number');}

list=new Array(len);
while(idx<len){
list[idx]=fn(idx);
idx+=1;}

return list;});




















var toPairs=_curry1(function toPairs(obj){
var pairs=[];
for(var prop in obj){
if(_has(prop,obj)){
pairs[pairs.length]=[
prop,
obj[prop]];}}



return pairs;});























var toPairsIn=_curry1(function toPairsIn(obj){
var pairs=[];
for(var prop in obj){
pairs[pairs.length]=[
prop,
obj[prop]];}


return pairs;});

























var transpose=_curry1(function transpose(outerlist){
var i=0;
var result=[];
while(i<outerlist.length){
var innerlist=outerlist[i];
var j=0;
while(j<innerlist.length){
if(typeof result[j]==='undefined'){
result[j]=[];}

result[j].push(innerlist[j]);
j+=1;}

i+=1;}

return result;});

















var trim=function(){
var ws='\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003'+'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028'+'\u2029\uFEFF';
var zeroWidth='\u200B';
var hasProtoTrim=typeof String.prototype.trim==='function';
if(!hasProtoTrim||ws.trim()||!zeroWidth.trim()){
return _curry1(function trim(str){
var beginRx=new RegExp('^['+ws+']['+ws+']*');
var endRx=new RegExp('['+ws+']['+ws+']*$');
return str.replace(beginRx,'').replace(endRx,'');});}else 

{
return _curry1(function trim(str){
return str.trim();});}}();



























var type=_curry1(function type(val){
return val===null?'Null':val===undefined?'Undefined':Object.prototype.toString.call(val).slice(8,-1);});

























var unapply=_curry1(function unapply(fn){
return function(){
return fn(_slice(arguments));};});





























var unary=_curry1(function unary(fn){
return nAry(1,fn);});





















var uncurryN=_curry2(function uncurryN(depth,fn){
return curryN(depth,function(){
var currentDepth=1;
var value=fn;
var idx=0;
var endIdx;
while(currentDepth<=depth&&typeof value==='function'){
endIdx=currentDepth===depth?arguments.length:idx+value.length;
value=value.apply(this,_slice(arguments,idx,endIdx));
currentDepth+=1;
idx=endIdx;}

return value;});});



























var unfold=_curry2(function unfold(fn,seed){
var pair=fn(seed);
var result=[];
while(pair&&pair.length){
result[result.length]=pair[0];
pair=fn(pair[1]);}

return result;});
























var uniqWith=_curry2(function uniqWith(pred,list){
var idx=0;
var len=list.length;
var result=[];
var item;
while(idx<len){
item=list[idx];
if(!_containsWith(pred,item,result)){
result[result.length]=item;}

idx+=1;}

return result;});



























var unless=_curry3(function unless(pred,whenFalseFn,x){
return pred(x)?x:whenFalseFn(x);});





















var update=_curry3(function update(idx,x,list){
return adjust(always(x),idx,list);});





























var useWith=_curry2(function useWith(fn,transformers){
return curryN(transformers.length,function(){
var args=[];
var idx=0;
while(idx<transformers.length){
args.push(transformers[idx].call(this,arguments[idx]));
idx+=1;}

return fn.apply(this,args.concat(_slice(arguments,transformers.length)));});});



















var values=_curry1(function values(obj){
var props=keys(obj);
var len=props.length;
var vals=[];
var idx=0;
while(idx<len){
vals[idx]=obj[props[idx]];
idx+=1;}

return vals;});






















var valuesIn=_curry1(function valuesIn(obj){
var prop;
var vs=[];
for(prop in obj){
vs[vs.length]=obj[prop];}

return vs;});























var view=function(){
var Const=function(x){
return {
value:x,
map:function(){
return this;}};};



return _curry2(function view(lens,x){
return lens(Const)(x).value;});}();































var when=_curry3(function when(pred,whenTrueFn,x){
return pred(x)?whenTrueFn(x):x;});




































var where=_curry2(function where(spec,testObj){
for(var prop in spec){
if(_has(prop,spec)&&!spec[prop](testObj[prop])){
return false;}}


return true;});




























var wrap=_curry2(function wrap(fn,wrapper){
return curryN(fn.length,function(){
return wrapper.apply(this,_concat([fn],arguments));});});





















var xprod=_curry2(function xprod(a,b){

var idx=0;
var ilen=a.length;
var j;
var jlen=b.length;
var result=[];
while(idx<ilen){
j=0;
while(j<jlen){
result[result.length]=[
a[idx],
b[j]];

j+=1;}

idx+=1;}

return result;});




















var zip=_curry2(function zip(a,b){
var rv=[];
var idx=0;
var len=Math.min(a.length,b.length);
while(idx<len){
rv[idx]=[
a[idx],
b[idx]];

idx+=1;}

return rv;});

















var zipObj=_curry2(function zipObj(keys,values){
var idx=0;
var len=keys.length;
var out={};
while(idx<len){
out[keys[idx]]=values[idx];
idx+=1;}

return out;});

























var zipWith=_curry3(function zipWith(fn,a,b){
var rv=[];
var idx=0;
var len=Math.min(a.length,b.length);
while(idx<len){
rv[idx]=fn(a[idx],b[idx]);
idx+=1;}

return rv;});

















var F=always(false);
















var T=always(true);










var _clone=function _clone(value,refFrom,refTo){
var copy=function copy(copiedValue){
var len=refFrom.length;
var idx=0;
while(idx<len){
if(value===refFrom[idx]){
return refTo[idx];}

idx+=1;}

refFrom[idx+1]=value;
refTo[idx+1]=copiedValue;
for(var key in value){
copiedValue[key]=_clone(value[key],refFrom,refTo);}

return copiedValue;};

switch(type(value)){
case 'Object':
return copy({});
case 'Array':
return copy([]);
case 'Date':
return new Date(value.valueOf());
case 'RegExp':
return _cloneRegExp(value);
default:
return value;}};



var _createPartialApplicator=function _createPartialApplicator(concat){
return _curry2(function(fn,args){
return _arity(Math.max(0,fn.length-args.length),function(){
return fn.apply(this,concat(args,arguments));});});};




var _dropLast=function dropLast(n,xs){
return take(n<xs.length?xs.length-n:0,xs);};



var _equals=function _equals(a,b,stackA,stackB){
if(identical(a,b)){
return true;}

if(type(a)!==type(b)){
return false;}

if(a==null||b==null){
return false;}

if(typeof a.equals==='function'||typeof b.equals==='function'){
return typeof a.equals==='function'&&a.equals(b)&&typeof b.equals==='function'&&b.equals(a);}

switch(type(a)){
case 'Arguments':
case 'Array':
case 'Object':
break;
case 'Boolean':
case 'Number':
case 'String':
if(!(typeof a===typeof b&&identical(a.valueOf(),b.valueOf()))){
return false;}

break;
case 'Date':
if(!identical(a.valueOf(),b.valueOf())){
return false;}

break;
case 'Error':
return a.name===b.name&&a.message===b.message;
case 'RegExp':
if(!(a.source===b.source&&a.global===b.global&&a.ignoreCase===b.ignoreCase&&a.multiline===b.multiline&&a.sticky===b.sticky&&a.unicode===b.unicode)){
return false;}

break;
case 'Map':
case 'Set':
if(!_equals(_arrayFromIterator(a.entries()),_arrayFromIterator(b.entries()),stackA,stackB)){
return false;}

break;
case 'Int8Array':
case 'Uint8Array':
case 'Uint8ClampedArray':
case 'Int16Array':
case 'Uint16Array':
case 'Int32Array':
case 'Uint32Array':
case 'Float32Array':
case 'Float64Array':
break;
case 'ArrayBuffer':
break;
default:

return false;}

var keysA=keys(a);
if(keysA.length!==keys(b).length){
return false;}

var idx=stackA.length-1;
while(idx>=0){
if(stackA[idx]===a){
return stackB[idx]===b;}

idx-=1;}

stackA.push(a);
stackB.push(b);
idx=keysA.length-1;
while(idx>=0){
var key=keysA[idx];
if(!(_has(key,b)&&_equals(b[key],a[key],stackA,stackB))){
return false;}

idx-=1;}

stackA.pop();
stackB.pop();
return true;};








var _makeFlat=function _makeFlat(recursive){
return function flatt(list){
var value,jlen,j;
var result=[];
var idx=0;
var ilen=list.length;
while(idx<ilen){
if(isArrayLike(list[idx])){
value=recursive?flatt(list[idx]):list[idx];
j=0;
jlen=value.length;
while(j<jlen){
result[result.length]=value[j];
j+=1;}}else 

{
result[result.length]=list[idx];}

idx+=1;}

return result;};};



var _reduce=function(){
function _arrayReduce(xf,acc,list){
var idx=0;
var len=list.length;
while(idx<len){
acc=xf['@@transducer/step'](acc,list[idx]);
if(acc&&acc['@@transducer/reduced']){
acc=acc['@@transducer/value'];
break;}

idx+=1;}

return xf['@@transducer/result'](acc);}

function _iterableReduce(xf,acc,iter){
var step=iter.next();
while(!step.done){
acc=xf['@@transducer/step'](acc,step.value);
if(acc&&acc['@@transducer/reduced']){
acc=acc['@@transducer/value'];
break;}

step=iter.next();}

return xf['@@transducer/result'](acc);}

function _methodReduce(xf,acc,obj){
return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'],xf),acc));}

var symIterator=typeof Symbol!=='undefined'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator';
return function _reduce(fn,acc,list){
if(typeof fn==='function'){
fn=_xwrap(fn);}

if(isArrayLike(list)){
return _arrayReduce(fn,acc,list);}

if(typeof list.reduce==='function'){
return _methodReduce(fn,acc,list);}

if(list[symIterator]!=null){
return _iterableReduce(fn,acc,list[symIterator]());}

if(typeof list.next==='function'){
return _iterableReduce(fn,acc,list);}

throw new TypeError('reduce: list must be array or iterable');};}();



var _xdropLastWhile=function(){
function XDropLastWhile(fn,xf){
this.f=fn;
this.retained=[];
this.xf=xf;}

XDropLastWhile.prototype['@@transducer/init']=_xfBase.init;
XDropLastWhile.prototype['@@transducer/result']=function(result){
this.retained=null;
return this.xf['@@transducer/result'](result);};

XDropLastWhile.prototype['@@transducer/step']=function(result,input){
return this.f(input)?this.retain(result,input):this.flush(result,input);};

XDropLastWhile.prototype.flush=function(result,input){
result=_reduce(this.xf['@@transducer/step'],result,this.retained);
this.retained=[];
return this.xf['@@transducer/step'](result,input);};

XDropLastWhile.prototype.retain=function(result,input){
this.retained.push(input);
return result;};

return _curry2(function _xdropLastWhile(fn,xf){
return new XDropLastWhile(fn,xf);});}();



var _xgroupBy=function(){
function XGroupBy(f,xf){
this.xf=xf;
this.f=f;
this.inputs={};}

XGroupBy.prototype['@@transducer/init']=_xfBase.init;
XGroupBy.prototype['@@transducer/result']=function(result){
var key;
for(key in this.inputs){
if(_has(key,this.inputs)){
result=this.xf['@@transducer/step'](result,this.inputs[key]);
if(result['@@transducer/reduced']){
result=result['@@transducer/value'];
break;}}}



this.inputs=null;
return this.xf['@@transducer/result'](result);};

XGroupBy.prototype['@@transducer/step']=function(result,input){
var key=this.f(input);
this.inputs[key]=this.inputs[key]||[
key,
[]];

this.inputs[key][1]=append(input,this.inputs[key][1]);
return result;};

return _curry2(function _xgroupBy(f,xf){
return new XGroupBy(f,xf);});}();



























var addIndex=_curry1(function addIndex(fn){
return curryN(fn.length,function(){
var idx=0;
var origFn=arguments[0];
var list=arguments[arguments.length-1];
var args=_slice(arguments);
args[0]=function(){
var result=origFn.apply(this,_concat(arguments,[
idx,
list]));

idx+=1;
return result;};

return fn.apply(this,args);});});





























var binary=_curry1(function binary(fn){
return nAry(2,fn);});






















var clone=_curry1(function clone(value){
return value!=null&&typeof value.clone==='function'?value.clone():_clone(value,[],[]);});











































var curry=_curry1(function curry(fn){
return curryN(fn.length,fn);});


























var drop=_curry2(_dispatchable('drop',_xdrop,function drop(n,xs){
return slice(Math.max(0,n),Infinity,xs);}));























var dropLast=_curry2(_dispatchable('dropLast',_xdropLast,_dropLast));






















var dropLastWhile=_curry2(_dispatchable('dropLastWhile',_xdropLastWhile,_dropLastWhile));


























var equals=_curry2(function equals(a,b){
return _equals(a,b,[],[]);});





























var filter=_curry2(_dispatchable('filter',_xfilter,function(pred,filterable){
return _isObject(filterable)?_reduce(function(acc,key){
if(pred(filterable[key])){
acc[key]=filterable[key];}

return acc;},
{},keys(filterable)):
_filter(pred,filterable);}));



















var flatten=_curry1(_makeFlat(true));




















var flip=_curry1(function flip(fn){
return curry(function(a,b){
var args=_slice(arguments);
args[0]=b;
args[1]=a;
return fn.apply(this,args);});});











































var groupBy=_curry2(_dispatchable('groupBy',_xgroupBy,function groupBy(fn,list){
return _reduce(function(acc,elt){
var key=fn(elt);
acc[key]=append(elt,acc[key]||(acc[key]=[]));
return acc;},
{},list);}));























var head=nth(0);






















var indexBy=_curry2(function indexBy(fn,list){
return _reduce(function(acc,elem){
var key=fn(elem);
acc[key]=elem;
return acc;},
{},list);});


























var init=slice(0,-1);




































var intersectionWith=_curry3(function intersectionWith(pred,list1,list2){
var results=[];
var idx=0;
while(idx<list1.length){
if(_containsWith(pred,list1[idx],list2)){
results[results.length]=list1[idx];}

idx+=1;}

return uniqWith(pred,results);});
























var invert=_curry1(function invert(obj){
var props=keys(obj);
var len=props.length;
var idx=0;
var out={};
while(idx<len){
var key=props[idx];
var val=obj[key];
var list=_has(val,out)?out[val]:out[val]=[];
list[list.length]=key;
idx+=1;}

return out;});




























var invertObj=_curry1(function invertObj(obj){
var props=keys(obj);
var len=props.length;
var idx=0;
var out={};
while(idx<len){
var key=props[idx];
out[obj[key]]=key;
idx+=1;}

return out;});























var isEmpty=_curry1(function isEmpty(x){
return x!=null&&equals(x,empty(x));});






















var last=nth(-1);




















var lastIndexOf=_curry2(function lastIndexOf(target,xs){
if(typeof xs.lastIndexOf==='function'&&!_isArray(xs)){
return xs.lastIndexOf(target);}else 
{
var idx=xs.length-1;
while(idx>=0){
if(equals(xs[idx],target)){
return idx;}

idx-=1;}

return -1;}});



































var map=_curry2(_dispatchable('map',_xmap,function map(fn,functor){
switch(Object.prototype.toString.call(functor)){
case '[object Function]':
return curryN(functor.length,function(){
return fn.call(this,functor.apply(this,arguments));});

case '[object Object]':
return _reduce(function(acc,key){
acc[key]=fn(functor[key]);
return acc;},
{},keys(functor));
default:
return _map(fn,functor);}}));
























var mapObjIndexed=_curry2(function mapObjIndexed(fn,obj){
return _reduce(function(acc,key){
acc[key]=fn(obj[key],key,obj);
return acc;},
{},keys(obj));});



























var mergeWith=_curry3(function mergeWith(fn,l,r){
return mergeWithKey(function(_,_l,_r){
return fn(_l,_r);},
l,r);});





























var partial=_createPartialApplicator(_concat);
























var partialRight=_createPartialApplicator(flip(_concat));




















var partition=_curry2(function partition(pred,list){
return _reduce(function(acc,elt){
var xs=acc[pred(elt)?0:1];
xs[xs.length]=elt;
return acc;},
[
[],
[]],
list);});

























var pathEq=_curry3(function pathEq(_path,val,obj){
return equals(path(_path,obj),val);});




















var pluck=_curry2(function pluck(p,list){
return map(prop(p),list);});






















var project=useWith(_map,[
pickAll,
identity]);


























var propEq=_curry3(function propEq(name,val,obj){
return propSatisfies(equals(val),name,obj);});






















var propIs=_curry3(function propIs(type,name,obj){
return propSatisfies(is(type),name,obj);});



































var reduce=_curry3(_reduce);























var reject=_curry2(function reject(pred,filterable){
return filter(_complement(pred),filterable);});





















var repeat=_curry2(function repeat(value,n){
return times(always(value),n);});

















var sum=reduce(add,0);























var takeLast=_curry2(function takeLast(n,xs){
return drop(n>=0?xs.length-n:0,xs);});














































var transduce=curryN(4,function transduce(xf,fn,acc,list){
return _reduce(xf(typeof fn==='function'?_xwrap(fn):fn),acc,list);});
























var unionWith=_curry3(function unionWith(pred,list1,list2){
return uniqWith(pred,_concat(list1,list2));});





























var whereEq=_curry2(function whereEq(spec,testObj){
return where(map(equals,spec),testObj);});


var _flatCat=function(){
var preservingReduced=function(xf){
return {
'@@transducer/init':_xfBase.init,
'@@transducer/result':function(result){
return xf['@@transducer/result'](result);},

'@@transducer/step':function(result,input){
var ret=xf['@@transducer/step'](result,input);
return ret['@@transducer/reduced']?_forceReduced(ret):ret;}};};



return function _xcat(xf){
var rxf=preservingReduced(xf);
return {
'@@transducer/init':_xfBase.init,
'@@transducer/result':function(result){
return rxf['@@transducer/result'](result);},

'@@transducer/step':function(result,input){
return !isArrayLike(input)?_reduce(rxf,result,[input]):_reduce(rxf,result,input);}};};}();












var _indexOf=function _indexOf(list,a,idx){
var inf,item;

if(typeof list.indexOf==='function'){
switch(typeof a){
case 'number':
if(a===0){

inf=1/a;
while(idx<list.length){
item=list[idx];
if(item===0&&1/item===inf){
return idx;}

idx+=1;}

return -1;}else 
if(a!==a){

while(idx<list.length){
item=list[idx];
if(typeof item==='number'&&item!==item){
return idx;}

idx+=1;}

return -1;}


return list.indexOf(a,idx);

case 'string':
case 'boolean':
case 'function':
case 'undefined':
return list.indexOf(a,idx);
case 'object':
if(a===null){

return list.indexOf(a,idx);}}}




while(idx<list.length){
if(equals(list[idx],a)){
return idx;}

idx+=1;}

return -1;};


var _xchain=_curry2(function _xchain(f,xf){
return map(f,_flatCat(xf));});



























var allPass=_curry1(function allPass(preds){
return curryN(reduce(max,0,pluck('length',preds)),function(){
var idx=0;
var len=preds.length;
while(idx<len){
if(!preds[idx].apply(this,arguments)){
return false;}

idx+=1;}

return true;});});




















var allUniq=_curry1(function allUniq(list){
var len=list.length;
var idx=0;
while(idx<len){
if(_indexOf(list,list[idx],idx+1)>=0){
return false;}

idx+=1;}

return true;});


























var anyPass=_curry1(function anyPass(preds){
return curryN(reduce(max,0,pluck('length',preds)),function(){
var idx=0;
var len=preds.length;
while(idx<len){
if(preds[idx].apply(this,arguments)){
return true;}

idx+=1;}

return false;});});






















var ap=_curry2(function ap(applicative,fn){
return typeof applicative.ap==='function'?applicative.ap(fn):typeof applicative==='function'?curryN(Math.max(applicative.length,fn.length),function(){
return applicative.apply(this,arguments)(fn.apply(this,arguments));}):

_reduce(function(acc,f){
return _concat(acc,map(f,fn));},
[],applicative);});






























var call=curry(function call(fn){
return fn.apply(this,_slice(arguments,1));});





















var chain=_curry2(_dispatchable('chain',_xchain,function chain(fn,monad){
if(typeof monad==='function'){
return function(){
return monad.call(this,fn.apply(this,arguments)).apply(this,arguments);};}


return _makeFlat(false)(map(fn,monad));}));
































var commuteMap=_curry3(function commuteMap(fn,of,list){
function consF(acc,x){
return ap(map(prepend,fn(x)),acc);}

return reduceRight(consF,of([]),list);});






























var constructN=_curry2(function constructN(n,Fn){
if(n>10){
throw new Error('Constructor with greater than ten arguments');}

if(n===0){
return function(){
return new Fn();};}


return curry(nAry(n,function($0,$1,$2,$3,$4,$5,$6,$7,$8,$9){
switch(arguments.length){
case 1:
return new Fn($0);
case 2:
return new Fn($0,$1);
case 3:
return new Fn($0,$1,$2);
case 4:
return new Fn($0,$1,$2,$3);
case 5:
return new Fn($0,$1,$2,$3,$4);
case 6:
return new Fn($0,$1,$2,$3,$4,$5);
case 7:
return new Fn($0,$1,$2,$3,$4,$5,$6);
case 8:
return new Fn($0,$1,$2,$3,$4,$5,$6,$7);
case 9:
return new Fn($0,$1,$2,$3,$4,$5,$6,$7,$8);
case 10:
return new Fn($0,$1,$2,$3,$4,$5,$6,$7,$8,$9);}}));});
































var converge=_curry2(function converge(after,fns){
return curryN(Math.max.apply(Math,pluck('length',fns)),function(){
var args=arguments;
var context=this;
return after.apply(context,_map(function(fn){
return fn.apply(context,args);},
fns));});});



























var dropRepeatsWith=_curry2(_dispatchable('dropRepeatsWith',_xdropRepeatsWith,function dropRepeatsWith(pred,list){
var result=[];
var idx=1;
var len=list.length;
if(len!==0){
result[0]=list[0];
while(idx<len){
if(!pred(last(result),list[idx])){
result[result.length]=list[idx];}

idx+=1;}}


return result;}));



















var eqBy=_curry3(function eqBy(f,x,y){
return equals(f(x),f(y));});























var eqProps=_curry3(function eqProps(prop,obj1,obj2){
return equals(obj1[prop],obj2[prop]);});





















var indexOf=_curry2(function indexOf(target,xs){
return typeof xs.indexOf==='function'&&!_isArray(xs)?xs.indexOf(target):_indexOf(xs,target,0);});


















var juxt=_curry1(function juxt(fns){
return function(){
return map(apply(__,arguments),fns);};});


























var lens=_curry2(function lens(getter,setter){
return function(f){
return function(s){
return map(function(v){
return setter(v,s);},
f(getter(s)));};};});
























var lensIndex=_curry1(function lensIndex(n){
return lens(nth(n),update(n));});























var lensPath=_curry1(function lensPath(p){
return lens(path(p),assocPath(p));});






















var lensProp=_curry1(function lensProp(k){
return lens(prop(k),assoc(k));});



















var liftN=_curry2(function liftN(arity,fn){
var lifted=curryN(arity,fn);
return curryN(arity,function(){
return _reduce(ap,map(lifted,arguments[0]),_slice(arguments,1));});});


















var mean=_curry1(function mean(list){
return sum(list)/list.length;});


















var median=_curry1(function median(list){
var len=list.length;
if(len===0){
return NaN;}

var width=2-len%2;
var idx=(len-width)/2;
return mean(_slice(list).sort(function(a,b){
return a<b?-1:a>b?1:0;}).
slice(idx,idx+width));});
























var merge=mergeWith(function(l,r){
return r;});


















var mergeAll=_curry1(function mergeAll(list){
return reduce(merge,{},list);});






















var pipe=function pipe(){
if(arguments.length===0){
throw new Error('pipe requires at least one argument');}

return _arity(arguments[0].length,reduce(_pipe,arguments[0],tail(arguments)));};




















var pipeP=function pipeP(){
if(arguments.length===0){
throw new Error('pipeP requires at least one argument');}

return _arity(arguments[0].length,reduce(_pipeP,arguments[0],tail(arguments)));};

















var product=reduce(multiply,1);


























var sequence=_curry2(function sequence(of,traversable){
return typeof traversable.sequence==='function'?traversable.sequence(of):reduceRight(function(acc,x){
return ap(map(prepend,x),acc);},
of([]),traversable);});





























var traverse=_curry3(function traverse(of,f,traversable){
return sequence(of,map(f,traversable));});



















var unnest=chain(_identity);

var _contains=function _contains(a,list){
return _indexOf(list,a,0)>=0;};


var _stepCat=function(){
var _stepCatArray={
'@@transducer/init':Array,
'@@transducer/step':function(xs,x){
return _concat(xs,[x]);},

'@@transducer/result':_identity};

var _stepCatString={
'@@transducer/init':String,
'@@transducer/step':function(a,b){
return a+b;},

'@@transducer/result':_identity};

var _stepCatObject={
'@@transducer/init':Object,
'@@transducer/step':function(result,input){
return merge(result,isArrayLike(input)?objOf(input[0],input[1]):input);},

'@@transducer/result':_identity};

return function _stepCat(obj){
if(_isTransformer(obj)){
return obj;}

if(isArrayLike(obj)){
return _stepCatArray;}

if(typeof obj==='string'){
return _stepCatString;}

if(typeof obj==='object'){
return _stepCatObject;}

throw new Error('Cannot create transformer for '+obj);};}();




var _toString=function _toString(x,seen){
var recur=function recur(y){
var xs=seen.concat([x]);
return _contains(y,xs)?'<Circular>':_toString(y,xs);};


var mapPairs=function(obj,keys){
return _map(function(k){
return _quote(k)+': '+recur(obj[k]);},
keys.slice().sort());};

switch(Object.prototype.toString.call(x)){
case '[object Arguments]':
return '(function() { return arguments; }('+_map(recur,x).join(', ')+'))';
case '[object Array]':
return '['+_map(recur,x).concat(mapPairs(x,reject(function(k){
return (/^\d+$/.test(k));},
keys(x)))).join(', ')+']';
case '[object Boolean]':
return typeof x==='object'?'new Boolean('+recur(x.valueOf())+')':x.toString();
case '[object Date]':
return 'new Date('+(isNaN(x.valueOf())?recur(NaN):_quote(_toISOString(x)))+')';
case '[object Null]':
return 'null';
case '[object Number]':
return typeof x==='object'?'new Number('+recur(x.valueOf())+')':1/x===-Infinity?'-0':x.toString(10);
case '[object String]':
return typeof x==='object'?'new String('+recur(x.valueOf())+')':_quote(x);
case '[object Undefined]':
return 'undefined';
default:
if(typeof x.toString==='function'){
var repr=x.toString();
if(repr!=='[object Object]'){
return repr;}}


return '{'+mapPairs(x,keys(x)).join(', ')+'}';}};
























var commute=commuteMap(identity);



















var compose=function compose(){
if(arguments.length===0){
throw new Error('compose requires at least one argument');}

return pipe.apply(this,reverse(arguments));};



































var composeK=function composeK(){
return compose.apply(this,prepend(identity,map(chain,arguments)));};




















var composeP=function composeP(){
if(arguments.length===0){
throw new Error('composeP requires at least one argument');}

return pipeP.apply(this,reverse(arguments));};



























var construct=_curry1(function construct(Fn){
return constructN(Fn.length,Fn);});





















var contains=_curry2(_contains);



















var difference=_curry2(function difference(first,second){
var out=[];
var idx=0;
var firstLen=first.length;
while(idx<firstLen){
if(!_contains(first[idx],second)&&!_contains(first[idx],out)){
out[out.length]=first[idx];}

idx+=1;}

return out;});






















var dropRepeats=_curry1(_dispatchable('dropRepeats',_xdropRepeatsWith(equals),dropRepeatsWith(equals)));






































var into=_curry3(function into(acc,xf,list){
return _isTransformer(acc)?_reduce(xf(acc),acc['@@transducer/init'](),list):_reduce(xf(_stepCat(acc)),acc,list);});
























var lift=_curry1(function lift(fn){
return liftN(fn.length,fn);});


















var omit=_curry2(function omit(names,obj){
var result={};
for(var prop in obj){
if(!_contains(prop,names)){
result[prop]=obj[prop];}}


return result;});



































var pipeK=function pipeK(){
return composeK.apply(this,reverse(arguments));};






































var toString=_curry1(function toString(val){
return _toString(val,[]);});



























var uniqBy=_curry2(
typeof Set==='undefined'?function uniqBy(fn,list){
var idx=0;
var applied=[];
var result=[];
var appliedItem,item;
while(idx<list.length){
item=list[idx];
appliedItem=fn(item);
if(!_contains(appliedItem,applied)){
result.push(item);
applied.push(appliedItem);}

idx+=1;}

return result;}:
function uniqBySet(fn,list){
var set=new Set();
var applied=[];
var prevSetSize=0;
var result=[];
var nullExists=false;
var negZeroExists=false;
var idx=0;
var appliedItem,item,newSetSize;
while(idx<list.length){
item=list[idx];
appliedItem=fn(item);
switch(typeof appliedItem){
case 'number':

if(appliedItem===0&&!negZeroExists&&1/appliedItem===-Infinity){
negZeroExists=true;
result.push(item);
break;}


case 'string':
case 'boolean':
case 'function':
case 'undefined':

set.add(appliedItem);
newSetSize=set.size;
if(newSetSize>prevSetSize){
result.push(item);
prevSetSize=newSetSize;}

break;
case 'object':
if(appliedItem===null){
if(!nullExists){

nullExists=true;
result.push(null);}

break;}


default:

if(!_contains(appliedItem,applied)){
applied.push(appliedItem);
result.push(item);}}


idx+=1;}

return result;});






















var without=_curry2(function(xs,list){
return reject(flip(_contains)(xs),list);});




























var complement=lift(not);
























var invoker=_curry2(function invoker(arity,method){
return curryN(arity+1,function(){
var target=arguments[arity];
if(target!=null&&is(Function,target[method])){
return target[method].apply(target,_slice(arguments,0,arity));}

throw new TypeError(toString(target)+' does not have a method named "'+method+'"');});});






















var join=invoker(1,'join');



























var memoize=_curry1(function memoize(fn){
var cache={};
return _arity(fn.length,function(){
var key=toString(arguments);
if(!_has(key,cache)){
cache[key]=fn.apply(this,arguments);}

return cache[key];});});























var split=invoker(1,'split');


















var test=_curry2(function test(pattern,str){
if(!_isRegExp(pattern)){
throw new TypeError('\u2018test\u2019 requires a value of type RegExp as its first argument; received '+toString(pattern));}

return _cloneRegExp(pattern).test(str);});

















var toLower=invoker(0,'toLowerCase');
















var toUpper=invoker(0,'toUpperCase');


















var uniq=uniqBy(identity);






















var concat=flip(invoker(1,'concat'));


















var intersection=_curry2(function intersection(list1,list2){
return uniq(_filter(flip(_contains)(list1),list2));});





















var symmetricDifference=_curry2(function symmetricDifference(list1,list2){
return concat(difference(list1,list2),difference(list2,list1));});

























var symmetricDifferenceWith=_curry3(function symmetricDifferenceWith(pred,list1,list2){
return concat(differenceWith(pred,list1,list2),differenceWith(pred,list2,list1));});



















var union=_curry2(compose(uniq,_concat));

var R={
F:F,
T:T,
__:__,
add:add,
addIndex:addIndex,
adjust:adjust,
all:all,
allPass:allPass,
allUniq:allUniq,
always:always,
and:and,
any:any,
anyPass:anyPass,
ap:ap,
aperture:aperture,
append:append,
apply:apply,
assoc:assoc,
assocPath:assocPath,
binary:binary,
bind:bind,
both:both,
call:call,
chain:chain,
clone:clone,
commute:commute,
commuteMap:commuteMap,
comparator:comparator,
complement:complement,
compose:compose,
composeK:composeK,
composeP:composeP,
concat:concat,
cond:cond,
construct:construct,
constructN:constructN,
contains:contains,
converge:converge,
countBy:countBy,
curry:curry,
curryN:curryN,
dec:dec,
defaultTo:defaultTo,
difference:difference,
differenceWith:differenceWith,
dissoc:dissoc,
dissocPath:dissocPath,
divide:divide,
drop:drop,
dropLast:dropLast,
dropLastWhile:dropLastWhile,
dropRepeats:dropRepeats,
dropRepeatsWith:dropRepeatsWith,
dropWhile:dropWhile,
either:either,
empty:empty,
eqBy:eqBy,
eqProps:eqProps,
equals:equals,
evolve:evolve,
filter:filter,
find:find,
findIndex:findIndex,
findLast:findLast,
findLastIndex:findLastIndex,
flatten:flatten,
flip:flip,
forEach:forEach,
fromPairs:fromPairs,
groupBy:groupBy,
gt:gt,
gte:gte,
has:has,
hasIn:hasIn,
head:head,
identical:identical,
identity:identity,
ifElse:ifElse,
inc:inc,
indexBy:indexBy,
indexOf:indexOf,
init:init,
insert:insert,
insertAll:insertAll,
intersection:intersection,
intersectionWith:intersectionWith,
intersperse:intersperse,
into:into,
invert:invert,
invertObj:invertObj,
invoker:invoker,
is:is,
isArrayLike:isArrayLike,
isEmpty:isEmpty,
isNil:isNil,
join:join,
juxt:juxt,
keys:keys,
keysIn:keysIn,
last:last,
lastIndexOf:lastIndexOf,
length:length,
lens:lens,
lensIndex:lensIndex,
lensPath:lensPath,
lensProp:lensProp,
lift:lift,
liftN:liftN,
lt:lt,
lte:lte,
map:map,
mapAccum:mapAccum,
mapAccumRight:mapAccumRight,
mapObjIndexed:mapObjIndexed,
match:match,
mathMod:mathMod,
max:max,
maxBy:maxBy,
mean:mean,
median:median,
memoize:memoize,
merge:merge,
mergeAll:mergeAll,
mergeWith:mergeWith,
mergeWithKey:mergeWithKey,
min:min,
minBy:minBy,
modulo:modulo,
multiply:multiply,
nAry:nAry,
negate:negate,
none:none,
not:not,
nth:nth,
nthArg:nthArg,
objOf:objOf,
of:of,
omit:omit,
once:once,
or:or,
over:over,
pair:pair,
partial:partial,
partialRight:partialRight,
partition:partition,
path:path,
pathEq:pathEq,
pathOr:pathOr,
pathSatisfies:pathSatisfies,
pick:pick,
pickAll:pickAll,
pickBy:pickBy,
pipe:pipe,
pipeK:pipeK,
pipeP:pipeP,
pluck:pluck,
prepend:prepend,
product:product,
project:project,
prop:prop,
propEq:propEq,
propIs:propIs,
propOr:propOr,
propSatisfies:propSatisfies,
props:props,
range:range,
reduce:reduce,
reduceRight:reduceRight,
reduced:reduced,
reject:reject,
remove:remove,
repeat:repeat,
replace:replace,
reverse:reverse,
scan:scan,
sequence:sequence,
set:set,
slice:slice,
sort:sort,
sortBy:sortBy,
split:split,
splitAt:splitAt,
splitEvery:splitEvery,
splitWhen:splitWhen,
subtract:subtract,
sum:sum,
symmetricDifference:symmetricDifference,
symmetricDifferenceWith:symmetricDifferenceWith,
tail:tail,
take:take,
takeLast:takeLast,
takeLastWhile:takeLastWhile,
takeWhile:takeWhile,
tap:tap,
test:test,
times:times,
toLower:toLower,
toPairs:toPairs,
toPairsIn:toPairsIn,
toString:toString,
toUpper:toUpper,
transduce:transduce,
transpose:transpose,
traverse:traverse,
trim:trim,
type:type,
unapply:unapply,
unary:unary,
uncurryN:uncurryN,
unfold:unfold,
union:union,
unionWith:unionWith,
uniq:uniq,
uniqBy:uniqBy,
uniqWith:uniqWith,
unless:unless,
unnest:unnest,
update:update,
useWith:useWith,
values:values,
valuesIn:valuesIn,
view:view,
when:when,
where:where,
whereEq:whereEq,
without:without,
wrap:wrap,
xprod:xprod,
zip:zip,
zipObj:zipObj,
zipWith:zipWith};





if(typeof exports==='object'){
module.exports=R;}else 
if(typeof define==='function'&&define.amd){
define(function(){return R;});}else 
{
this.R=R;}}).


call(this);
});
__d('HomyPiAndroid/js/Constants.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var PLAYER_HEADER_HEIGHT=exports.PLAYER_HEADER_HEIGHT=50;
var TOP_BAR_HEIGHT=exports.TOP_BAR_HEIGHT=59;

var palette=exports.palette={
ACCENT_COLOR:"#536DFE",
DARK_PRIMARY_COLOR:"#D32F2F",
PRIMARY_COLOR:"#F44336",
LIGHT_PRIMARY_COLOR:"#F44336",
PRIMARY_TEXT_COLOR:"#212121",
SECONDARY_TEXT_COLOR:"#727272",

PLAYER_BACKGROUND:"white"};
});
__d('HomyPiAndroid/js/onSelectedRaspberryChange.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.




setStore=setStore;exports.












subscribe=subscribe;exports.





unsubscribe=unsubscribe;var store=void 0;var unsubscribe=void 0;var currentState=void 0;var listeners=[];function setStore(newStore){if(unsubscribe)unsubscribe();store=newStore;currentState=store.getState().raspberries;store.subscribe(function(){var nextState=store.getState().raspberries;if(currentState.selectedRaspberry!==nextState.selectedRaspberry){currentState=nextState;listeners.forEach(function(fn){return fn(nextState.selectedRaspberry);});}currentState=nextState;});}function subscribe(listener){if(typeof listener==="function"&&listeners.indexOf(listener)===-1)listeners.push(listener);}function unsubscribe(listener){
var pos=void 0;
if((pos=listeners.indexOf(listener))!==-1)
listeners.splice(pos,1);}
});
__d('component-emitter/index.js',function(global, require, module, exports) {  'use strict';




module.exports=Emitter;







function Emitter(obj){
if(obj)return mixin(obj);}
;









function mixin(obj){
for(var key in Emitter.prototype){
obj[key]=Emitter.prototype[key];}

return obj;}











Emitter.prototype.on=
Emitter.prototype.addEventListener=function(event,fn){
this._callbacks=this._callbacks||{};
(this._callbacks['$'+event]=this._callbacks['$'+event]||[]).
push(fn);
return this;};












Emitter.prototype.once=function(event,fn){
function on(){
this.off(event,on);
fn.apply(this,arguments);}


on.fn=fn;
this.on(event,on);
return this;};












Emitter.prototype.off=
Emitter.prototype.removeListener=
Emitter.prototype.removeAllListeners=
Emitter.prototype.removeEventListener=function(event,fn){
this._callbacks=this._callbacks||{};


if(0==arguments.length){
this._callbacks={};
return this;}



var callbacks=this._callbacks['$'+event];
if(!callbacks)return this;


if(1==arguments.length){
delete this._callbacks['$'+event];
return this;}



var cb;
for(var i=0;i<callbacks.length;i++){
cb=callbacks[i];
if(cb===fn||cb.fn===fn){
callbacks.splice(i,1);
break;}}


return this;};










Emitter.prototype.emit=function(event){
this._callbacks=this._callbacks||{};
var args=[].slice.call(arguments,1),
callbacks=this._callbacks['$'+event];

if(callbacks){
callbacks=callbacks.slice(0);
for(var i=0,len=callbacks.length;i<len;++i){
callbacks[i].apply(this,args);}}



return this;};










Emitter.prototype.listeners=function(event){
this._callbacks=this._callbacks||{};
return this._callbacks['$'+event]||[];};










Emitter.prototype.hasListeners=function(event){
return !!this.listeners(event).length;};
});
__d('reduce-component/index.js',function(global, require, module, exports) {  "use strict";










module.exports=function(arr,fn,initial){
var idx=0;
var len=arr.length;
var curr=arguments.length==3?
initial:
arr[idx++];

while(idx<len){
curr=fn.call(null,curr,arr[idx],++idx,arr);}


return curr;};
});
__d('is-promise/index.js',function(global, require, module, exports) {  'use strict';module.exports=isPromise;

function isPromise(obj){
return !!obj&&(typeof obj==='object'||typeof obj==='function')&&typeof obj.then==='function';}
});
__d('react-native-refreshable-listview/lib/delay.js',function(global, require, module, exports) {  "use strict";function delay(time){
return new Promise(function(resolve){return setTimeout(resolve,time);});}


module.exports=delay;
});
__d('tween-functions/index.js',function(global, require, module, exports) {  'use strict';


var tweenFunctions={
linear:function(t,b,_c,d){
var c=_c-b;
return c*t/d+b;},

easeInQuad:function(t,b,_c,d){
var c=_c-b;
return c*(t/=d)*t+b;},

easeOutQuad:function(t,b,_c,d){
var c=_c-b;
return -c*(t/=d)*(t-2)+b;},

easeInOutQuad:function(t,b,_c,d){
var c=_c-b;
if((t/=d/2)<1){
return c/2*t*t+b;}else 
{
return -c/2*(--t*(t-2)-1)+b;}},


easeInCubic:function(t,b,_c,d){
var c=_c-b;
return c*(t/=d)*t*t+b;},

easeOutCubic:function(t,b,_c,d){
var c=_c-b;
return c*((t=t/d-1)*t*t+1)+b;},

easeInOutCubic:function(t,b,_c,d){
var c=_c-b;
if((t/=d/2)<1){
return c/2*t*t*t+b;}else 
{
return c/2*((t-=2)*t*t+2)+b;}},


easeInQuart:function(t,b,_c,d){
var c=_c-b;
return c*(t/=d)*t*t*t+b;},

easeOutQuart:function(t,b,_c,d){
var c=_c-b;
return -c*((t=t/d-1)*t*t*t-1)+b;},

easeInOutQuart:function(t,b,_c,d){
var c=_c-b;
if((t/=d/2)<1){
return c/2*t*t*t*t+b;}else 
{
return -c/2*((t-=2)*t*t*t-2)+b;}},


easeInQuint:function(t,b,_c,d){
var c=_c-b;
return c*(t/=d)*t*t*t*t+b;},

easeOutQuint:function(t,b,_c,d){
var c=_c-b;
return c*((t=t/d-1)*t*t*t*t+1)+b;},

easeInOutQuint:function(t,b,_c,d){
var c=_c-b;
if((t/=d/2)<1){
return c/2*t*t*t*t*t+b;}else 
{
return c/2*((t-=2)*t*t*t*t+2)+b;}},


easeInSine:function(t,b,_c,d){
var c=_c-b;
return -c*Math.cos(t/d*(Math.PI/2))+c+b;},

easeOutSine:function(t,b,_c,d){
var c=_c-b;
return c*Math.sin(t/d*(Math.PI/2))+b;},

easeInOutSine:function(t,b,_c,d){
var c=_c-b;
return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},

easeInExpo:function(t,b,_c,d){
var c=_c-b;
return t==0?b:c*Math.pow(2,10*(t/d-1))+b;},

easeOutExpo:function(t,b,_c,d){
var c=_c-b;
return t==d?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},

easeInOutExpo:function(t,b,_c,d){
var c=_c-b;
if(t===0){
return b;}

if(t===d){
return b+c;}

if((t/=d/2)<1){
return c/2*Math.pow(2,10*(t-1))+b;}else 
{
return c/2*(-Math.pow(2,-10*--t)+2)+b;}},


easeInCirc:function(t,b,_c,d){
var c=_c-b;
return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},

easeOutCirc:function(t,b,_c,d){
var c=_c-b;
return c*Math.sqrt(1-(t=t/d-1)*t)+b;},

easeInOutCirc:function(t,b,_c,d){
var c=_c-b;
if((t/=d/2)<1){
return -c/2*(Math.sqrt(1-t*t)-1)+b;}else 
{
return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;}},


easeInElastic:function(t,b,_c,d){
var c=_c-b;
var a,p,s;
s=1.70158;
p=0;
a=c;
if(t===0){
return b;}else 
if((t/=d)===1){
return b+c;}

if(!p){
p=d*0.3;}

if(a<Math.abs(c)){
a=c;
s=p/4;}else 
{
s=p/(2*Math.PI)*Math.asin(c/a);}

return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},

easeOutElastic:function(t,b,_c,d){
var c=_c-b;
var a,p,s;
s=1.70158;
p=0;
a=c;
if(t===0){
return b;}else 
if((t/=d)===1){
return b+c;}

if(!p){
p=d*0.3;}

if(a<Math.abs(c)){
a=c;
s=p/4;}else 
{
s=p/(2*Math.PI)*Math.asin(c/a);}

return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},

easeInOutElastic:function(t,b,_c,d){
var c=_c-b;
var a,p,s;
s=1.70158;
p=0;
a=c;
if(t===0){
return b;}else 
if((t/=d/2)===2){
return b+c;}

if(!p){
p=d*(0.3*1.5);}

if(a<Math.abs(c)){
a=c;
s=p/4;}else 
{
s=p/(2*Math.PI)*Math.asin(c/a);}

if(t<1){
return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;}else 
{
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;}},


easeInBack:function(t,b,_c,d,s){
var c=_c-b;
if(s===void 0){
s=1.70158;}

return c*(t/=d)*t*((s+1)*t-s)+b;},

easeOutBack:function(t,b,_c,d,s){
var c=_c-b;
if(s===void 0){
s=1.70158;}

return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},

easeInOutBack:function(t,b,_c,d,s){
var c=_c-b;
if(s===void 0){
s=1.70158;}

if((t/=d/2)<1){
return c/2*(t*t*(((s*=1.525)+1)*t-s))+b;}else 
{
return c/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+b;}},


easeInBounce:function(t,b,_c,d){
var c=_c-b;
var v;
v=tweenFunctions.easeOutBounce(d-t,0,c,d);
return c-v+b;},

easeOutBounce:function(t,b,_c,d){
var c=_c-b;
if((t/=d)<1/2.75){
return c*(7.5625*t*t)+b;}else 
if(t<2/2.75){
return c*(7.5625*(t-=1.5/2.75)*t+0.75)+b;}else 
if(t<2.5/2.75){
return c*(7.5625*(t-=2.25/2.75)*t+0.9375)+b;}else 
{
return c*(7.5625*(t-=2.625/2.75)*t+0.984375)+b;}},


easeInOutBounce:function(t,b,_c,d){
var c=_c-b;
var v;
if(t<d/2){
v=tweenFunctions.easeInBounce(t*2,0,c,d);
return v*0.5+b;}else 
{
v=tweenFunctions.easeOutBounce(t*2-d,0,c,d);
return v*0.5+c*0.5+b;}}};




module.exports=tweenFunctions;
});
__d('react-native-router-flux/debug.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=debug;function debug(msg){}
});
__d('@exponent/react-native-navigator/ExNavigatorMixin.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default=

{



getCurrentRoutes:function(){
return this.__navigator.getCurrentRoutes();},


jumpBack:function(){
return this.__navigator.jumpBack();},


jumpForward:function(){
return this.__navigator.jumpForward();},


jumpTo:function(route){
return this.__navigator.jumpTo(route);},


push:function(route){
return this.__navigator.push(route);},


pop:function(){
return this.__navigator.pop();},


replace:function(route){
return this.__navigator.replace(route);},


replaceAtIndex:function(route,index){
return this.__navigator.replaceAtIndex(route,index);},


replacePrevious:function(route){
return this.__navigator.replacePrevious(route);},


resetTo:function(route){
return this.__navigator.resetTo(route);},


immediatelyResetRouteStack:function(routeStack){
return this.__navigator.immediatelyResetRouteStack(routeStack);},


popToRoute:function(route){
return this.__navigator.popToRoute(route);},


popToTop:function(){
return this.__navigator.popToTop();},








transitionToTop:function(route){
this.replaceAtIndex(route,0);
this.popToTop();},





popBack:function(n){
var routes=this.getCurrentRoutes();
this.popToRoute(routes[routes.length-n-1]);}};
});
__d('@exponent/react-native-navigator/vendor/buildStyleInterpolator.js',function(global, require, module, exports) {  'use strict';








var X_DIM='x';
var Y_DIM='y';
var Z_DIM='z';
var W_DIM='w';

var TRANSFORM_ROTATE_NAME='transformRotateRadians';

var ShouldAllocateReusableOperationVars={
transformRotateRadians:true,
transformScale:true,
transformTranslate:true};


var InitialOperationField={
transformRotateRadians:[0,0,0,1],
transformTranslate:[0,0,0],
transformScale:[1,1,1]};



























































var ARGUMENT_NAMES_RE=/([^\s,]+)/g;



















var inline=function(func,replaceWithArgs){
var fnStr=func.toString();
var parameterNames=fnStr.slice(fnStr.indexOf('(')+1,fnStr.indexOf(')')).
match(ARGUMENT_NAMES_RE)||
[];
var replaceRegexStr=parameterNames.map(function(paramName){
return '\\b'+paramName+'\\b';}).
join('|');
var replaceRegex=new RegExp(replaceRegexStr,'g');
var fnBody=fnStr.substring(fnStr.indexOf('{')+1,fnStr.lastIndexOf('}'));
var newFnBody=fnBody.replace(replaceRegex,function(parameterName){
var indexInParameterNames=parameterNames.indexOf(parameterName);
var replacementName=replaceWithArgs[indexInParameterNames];
return replacementName;});

return newFnBody.split('\n');};






var MatrixOps={
unroll:function(matVar,m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15){
m0=matVar[0];
m1=matVar[1];
m2=matVar[2];
m3=matVar[3];
m4=matVar[4];
m5=matVar[5];
m6=matVar[6];
m7=matVar[7];
m8=matVar[8];
m9=matVar[9];
m10=matVar[10];
m11=matVar[11];
m12=matVar[12];
m13=matVar[13];
m14=matVar[14];
m15=matVar[15];},


matrixDiffers:function(retVar,matVar,m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15){
retVar=retVar||
m0!==matVar[0]||
m1!==matVar[1]||
m2!==matVar[2]||
m3!==matVar[3]||
m4!==matVar[4]||
m5!==matVar[5]||
m6!==matVar[6]||
m7!==matVar[7]||
m8!==matVar[8]||
m9!==matVar[9]||
m10!==matVar[10]||
m11!==matVar[11]||
m12!==matVar[12]||
m13!==matVar[13]||
m14!==matVar[14]||
m15!==matVar[15];},


transformScale:function(matVar,opVar){

var x=opVar[0];
var y=opVar[1];
var z=opVar[2];
matVar[0]=matVar[0]*x;
matVar[1]=matVar[1]*x;
matVar[2]=matVar[2]*x;
matVar[3]=matVar[3]*x;
matVar[4]=matVar[4]*y;
matVar[5]=matVar[5]*y;
matVar[6]=matVar[6]*y;
matVar[7]=matVar[7]*y;
matVar[8]=matVar[8]*z;
matVar[9]=matVar[9]*z;
matVar[10]=matVar[10]*z;
matVar[11]=matVar[11]*z;
matVar[12]=matVar[12];
matVar[13]=matVar[13];
matVar[14]=matVar[14];
matVar[15]=matVar[15];},






transformTranslate:function(matVar,opVar){

var x=opVar[0];
var y=opVar[1];
var z=opVar[2];
matVar[12]=matVar[0]*x+matVar[4]*y+matVar[8]*z+matVar[12];
matVar[13]=matVar[1]*x+matVar[5]*y+matVar[9]*z+matVar[13];
matVar[14]=matVar[2]*x+matVar[6]*y+matVar[10]*z+matVar[14];
matVar[15]=matVar[3]*x+matVar[7]*y+matVar[11]*z+matVar[15];},






transformRotateRadians:function(matVar,q){

var xQuat=q[0],yQuat=q[1],zQuat=q[2],wQuat=q[3];
var x2Quat=xQuat+xQuat;
var y2Quat=yQuat+yQuat;
var z2Quat=zQuat+zQuat;
var xxQuat=xQuat*x2Quat;
var xyQuat=xQuat*y2Quat;
var xzQuat=xQuat*z2Quat;
var yyQuat=yQuat*y2Quat;
var yzQuat=yQuat*z2Quat;
var zzQuat=zQuat*z2Quat;
var wxQuat=wQuat*x2Quat;
var wyQuat=wQuat*y2Quat;
var wzQuat=wQuat*z2Quat;

var quatMat0=1-(yyQuat+zzQuat);
var quatMat1=xyQuat+wzQuat;
var quatMat2=xzQuat-wyQuat;
var quatMat4=xyQuat-wzQuat;
var quatMat5=1-(xxQuat+zzQuat);
var quatMat6=yzQuat+wxQuat;
var quatMat8=xzQuat+wyQuat;
var quatMat9=yzQuat-wxQuat;
var quatMat10=1-(xxQuat+yyQuat);



var a00=matVar[0];
var a01=matVar[1];
var a02=matVar[2];
var a03=matVar[3];
var a10=matVar[4];
var a11=matVar[5];
var a12=matVar[6];
var a13=matVar[7];
var a20=matVar[8];
var a21=matVar[9];
var a22=matVar[10];
var a23=matVar[11];

var b0=quatMat0,b1=quatMat1,b2=quatMat2;
matVar[0]=b0*a00+b1*a10+b2*a20;
matVar[1]=b0*a01+b1*a11+b2*a21;
matVar[2]=b0*a02+b1*a12+b2*a22;
matVar[3]=b0*a03+b1*a13+b2*a23;
b0=quatMat4;b1=quatMat5;b2=quatMat6;
matVar[4]=b0*a00+b1*a10+b2*a20;
matVar[5]=b0*a01+b1*a11+b2*a21;
matVar[6]=b0*a02+b1*a12+b2*a22;
matVar[7]=b0*a03+b1*a13+b2*a23;
b0=quatMat8;b1=quatMat9;b2=quatMat10;
matVar[8]=b0*a00+b1*a10+b2*a20;
matVar[9]=b0*a01+b1*a11+b2*a21;
matVar[10]=b0*a02+b1*a12+b2*a22;
matVar[11]=b0*a03+b1*a13+b2*a23;}};





var MatrixOpsInitial={
transformScale:function(matVar,opVar){

matVar[0]=opVar[0];
matVar[1]=0;
matVar[2]=0;
matVar[3]=0;
matVar[4]=0;
matVar[5]=opVar[1];
matVar[6]=0;
matVar[7]=0;
matVar[8]=0;
matVar[9]=0;
matVar[10]=opVar[2];
matVar[11]=0;
matVar[12]=0;
matVar[13]=0;
matVar[14]=0;
matVar[15]=1;},


transformTranslate:function(matVar,opVar){

matVar[0]=1;
matVar[1]=0;
matVar[2]=0;
matVar[3]=0;
matVar[4]=0;
matVar[5]=1;
matVar[6]=0;
matVar[7]=0;
matVar[8]=0;
matVar[9]=0;
matVar[10]=1;
matVar[11]=0;
matVar[12]=opVar[0];
matVar[13]=opVar[1];
matVar[14]=opVar[2];
matVar[15]=1;},







transformRotateRadians:function(matVar,q){


var xQuat=q[0],yQuat=q[1],zQuat=q[2],wQuat=q[3];
var x2Quat=xQuat+xQuat;
var y2Quat=yQuat+yQuat;
var z2Quat=zQuat+zQuat;
var xxQuat=xQuat*x2Quat;
var xyQuat=xQuat*y2Quat;
var xzQuat=xQuat*z2Quat;
var yyQuat=yQuat*y2Quat;
var yzQuat=yQuat*z2Quat;
var zzQuat=zQuat*z2Quat;
var wxQuat=wQuat*x2Quat;
var wyQuat=wQuat*y2Quat;
var wzQuat=wQuat*z2Quat;

var quatMat0=1-(yyQuat+zzQuat);
var quatMat1=xyQuat+wzQuat;
var quatMat2=xzQuat-wyQuat;
var quatMat4=xyQuat-wzQuat;
var quatMat5=1-(xxQuat+zzQuat);
var quatMat6=yzQuat+wxQuat;
var quatMat8=xzQuat+wyQuat;
var quatMat9=yzQuat-wxQuat;
var quatMat10=1-(xxQuat+yyQuat);



var b0=quatMat0,b1=quatMat1,b2=quatMat2;
matVar[0]=b0;
matVar[1]=b1;
matVar[2]=b2;
matVar[3]=0;
b0=quatMat4;b1=quatMat5;b2=quatMat6;
matVar[4]=b0;
matVar[5]=b1;
matVar[6]=b2;
matVar[7]=0;
b0=quatMat8;b1=quatMat9;b2=quatMat10;
matVar[8]=b0;
matVar[9]=b1;
matVar[10]=b2;
matVar[11]=0;
matVar[12]=0;
matVar[13]=0;
matVar[14]=0;
matVar[15]=1;}};




var setNextValAndDetectChange=function(name,tmpVarName){
return (
'  if (!didChange) {\n'+
'    var prevVal = result.'+name+';\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'    didChange = didChange  || ('+tmpVarName+' !== prevVal);\n'+
'  } else {\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'  }\n');};



var computeNextValLinear=function(anim,from,to,tmpVarName){
var hasRoundRatio='round' in anim;
var roundRatio=anim.round;
var fn='  ratio = (value - '+anim.min+') / '+(anim.max-anim.min)+';\n';
if(!anim.extrapolate){
fn+='  ratio = ratio > 1 ? 1 : (ratio < 0 ? 0 : ratio);\n';}


var roundOpen=hasRoundRatio?'Math.round('+roundRatio+' * ':'';
var roundClose=hasRoundRatio?') / '+roundRatio:'';
fn+=
'  '+tmpVarName+' = '+
roundOpen+
'('+from+' * (1 - ratio) + '+to+' * ratio)'+
roundClose+';\n';
return fn;};


var computeNextValLinearScalar=function(anim){
return computeNextValLinear(anim,anim.from,anim.to,'nextScalarVal');};


var computeNextValConstant=function(anim){
var constantExpression=JSON.stringify(anim.value);
return '  nextScalarVal = '+constantExpression+';\n';};


var computeNextValStep=function(anim){
return (
'  nextScalarVal = value >= '+(
anim.threshold+' ? '+anim.to+' : '+anim.from)+';\n');};



var computeNextValIdentity=function(anim){
return '  nextScalarVal = value;\n';};


var operationVar=function(name){
return name+'ReuseOp';};


var createReusableOperationVars=function(anims){
var ret='';
for(var name in anims){
if(ShouldAllocateReusableOperationVars[name]){
ret+='var '+operationVar(name)+' = [];\n';}}


return ret;};


var newlines=function(statements){
return '\n'+statements.join('\n')+'\n';};








var computeNextMatrixOperationField=function(anim,name,dimension,index){
var fieldAccess=operationVar(name)+'['+index+']';
if(anim.from[dimension]!==undefined&&anim.to[dimension]!==undefined){
return '  '+anim.from[dimension]!==anim.to[dimension]?
computeNextValLinear(anim,anim.from[dimension],anim.to[dimension],fieldAccess):
fieldAccess+' = '+anim.from[dimension]+';';}else 
{
return '  '+fieldAccess+' = '+InitialOperationField[name][index]+';';}};



var unrolledVars=[];
for(var varIndex=0;varIndex<16;varIndex++){
unrolledVars.push('m'+varIndex);}

var setNextMatrixAndDetectChange=function(orderedMatrixOperations){
var fn=[
'  var transformMatrix = result.transformMatrix !== undefined ? '+
'result.transformMatrix : (result.transformMatrix = []);'];

fn.push.apply(
fn,
inline(MatrixOps.unroll,['transformMatrix'].concat(unrolledVars)));

for(var i=0;i<orderedMatrixOperations.length;i++){
var opName=orderedMatrixOperations[i];
if(i===0){
fn.push.apply(
fn,
inline(MatrixOpsInitial[opName],['transformMatrix',operationVar(opName)]));}else 

{
fn.push.apply(
fn,
inline(MatrixOps[opName],['transformMatrix',operationVar(opName)]));}}



fn.push.apply(
fn,
inline(MatrixOps.matrixDiffers,['didChange','transformMatrix'].concat(unrolledVars)));

return fn;};


var InterpolateMatrix={
transformTranslate:true,
transformRotateRadians:true,
transformScale:true};


var createFunctionString=function(anims){


var orderedMatrixOperations=[];



var fn='return (function() {\n';
fn+=createReusableOperationVars(anims);
fn+='return function(result, value) {\n';
fn+='  var didChange = false;\n';
fn+='  var nextScalarVal;\n';
fn+='  var ratio;\n';

for(var name in anims){
var anim=anims[name];
if(anim.type==='linear'){
if(InterpolateMatrix[name]){
orderedMatrixOperations.push(name);
var setOperations=[
computeNextMatrixOperationField(anim,name,X_DIM,0),
computeNextMatrixOperationField(anim,name,Y_DIM,1),
computeNextMatrixOperationField(anim,name,Z_DIM,2)];

if(name===TRANSFORM_ROTATE_NAME){
setOperations.push(computeNextMatrixOperationField(anim,name,W_DIM,3));}

fn+=newlines(setOperations);}else 
{
fn+=computeNextValLinearScalar(anim,'nextScalarVal');
fn+=setNextValAndDetectChange(name,'nextScalarVal');}}else 

if(anim.type==='constant'){
fn+=computeNextValConstant(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}else 
if(anim.type==='step'){
fn+=computeNextValStep(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}else 
if(anim.type==='identity'){
fn+=computeNextValIdentity(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}}


if(orderedMatrixOperations.length){
fn+=newlines(setNextMatrixAndDetectChange(orderedMatrixOperations));}

fn+='  return didChange;\n';
fn+='};\n';
fn+='})()';
return fn;};







var buildStyleInterpolator=function(anims){
return Function(createFunctionString(anims))();};



module.exports=buildStyleInterpolator;
});
__d('@exponent/react-native-navigator/Colors.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var Colors={
tint:'rgb(0, 122, 255)'};exports.default=


Colors;
});
__d('fbjs/lib/keyOf.js',function(global, require, module, exports) {  "use strict";





















var keyOf=function(oneKeyObj){
var key;
for(key in oneKeyObj){
if(!oneKeyObj.hasOwnProperty(key)){
continue;}

return key;}

return null;};


module.exports=keyOf;
});
__d('Settings',function(global, require, module, exports) {  'use strict';












var Settings={
get:function(key){
console.warn('Settings is not yet supported on Android');
return null;},


set:function(settings){
console.warn('Settings is not yet supported on Android');},


watchKeys:function(keys,callback){
console.warn('Settings is not yet supported on Android');
return -1;},


clearWatch:function(watchId){
console.warn('Settings is not yet supported on Android');}};



module.exports=Settings;
});
__d('StatusBarIOS',function(global, require, module, exports) {  'use strict';












module.exports=null;
});
__d('art/core/color.js',function(global, require, module, exports) {  'use strict';var colors={
maroon:'#800000',red:'#ff0000',orange:'#ffA500',yellow:'#ffff00',olive:'#808000',
purple:'#800080',fuchsia:"#ff00ff",white:'#ffffff',lime:'#00ff00',green:'#008000',
navy:'#000080',blue:'#0000ff',aqua:'#00ffff',teal:'#008080',
black:'#000000',silver:'#c0c0c0',gray:'#808080'};


var map=function(array,fn){
var results=[];
for(var i=0,l=array.length;i<l;i++){
results[i]=fn(array[i],i);}
return results;};


var Color=function(color,type){

if(color.isColor){

this.red=color.red;
this.green=color.green;
this.blue=color.blue;
this.alpha=color.alpha;}else 

{

var namedColor=colors[color];
if(namedColor){
color=namedColor;
type='hex';}


switch(typeof color){
case 'string':if(!type)type=(type=color.match(/^rgb|^hsb|^hsl/))?type[0]:'hex';break;
case 'object':type=type||'rgb';color=color.toString();break;
case 'number':type='hex';color=color.toString(16);break;}


color=Color['parse'+type.toUpperCase()](color);
this.red=color[0];
this.green=color[1];
this.blue=color[2];
this.alpha=color[3];}


this.isColor=true;};



var limit=function(number,min,max){
return Math.min(max,Math.max(min,number));};


var listMatch=/([-.\d]+\%?)\s*,\s*([-.\d]+\%?)\s*,\s*([-.\d]+\%?)\s*,?\s*([-.\d]*\%?)/;
var hexMatch=/^#?([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{0,2})$/i;

Color.parseRGB=function(color){
return map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit)*(bit[bit.length-1]=='%'?2.55:1);
return i<3?Math.round((bit%=256)<0?bit+256:bit):limit(bit===''?1:Number(bit),0,1);});};



Color.parseHEX=function(color){
if(color.length==1)color=color+color+color;
return map(color.match(hexMatch).slice(1),function(bit,i){
if(i==3)return bit?parseInt(bit,16)/255:1;
return parseInt(bit.length==1?bit+bit:bit,16);});};



Color.parseHSB=function(color){
var hsb=map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit);
if(i===0)return Math.round((bit%=360)<0?bit+360:bit);else 
if(i<3)return limit(Math.round(bit),0,100);else 
return limit(bit===''?1:Number(bit),0,1);});


var a=hsb[3];
var br=Math.round(hsb[2]/100*255);
if(hsb[1]==0)return [br,br,br,a];

var hue=hsb[0];
var f=hue%60;
var p=Math.round(hsb[2]*(100-hsb[1])/10000*255);
var q=Math.round(hsb[2]*(6000-hsb[1]*f)/600000*255);
var t=Math.round(hsb[2]*(6000-hsb[1]*(60-f))/600000*255);

switch(Math.floor(hue/60)){
case 0:return [br,t,p,a];
case 1:return [q,br,p,a];
case 2:return [p,br,t,a];
case 3:return [p,q,br,a];
case 4:return [t,p,br,a];
default:return [br,p,q,a];}};



Color.parseHSL=function(color){
var hsb=map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit);
if(i===0)return Math.round((bit%=360)<0?bit+360:bit);else 
if(i<3)return limit(Math.round(bit),0,100);else 
return limit(bit===''?1:Number(bit),0,1);});


var h=hsb[0]/60;
var s=hsb[1]/100;
var l=hsb[2]/100;
var a=hsb[3];

var c=(1-Math.abs(2*l-1))*s;
var x=c*(1-Math.abs(h%2-1));
var m=l-c/2;

var p=Math.round((c+m)*255);
var q=Math.round((x+m)*255);
var t=Math.round(m*255);

switch(Math.floor(h)){
case 0:return [p,q,t,a];
case 1:return [q,p,t,a];
case 2:return [t,p,q,a];
case 3:return [t,q,p,a];
case 4:return [q,t,p,a];
default:return [p,t,q,a];}};



var toString=function(type,array){
if(array[3]!=1)type+='a';else 
array.pop();
return type+'('+array.join(', ')+')';};


Color.prototype={

toHSB:function(array){
var red=this.red,green=this.green,blue=this.blue,alpha=this.alpha;

var max=Math.max(red,green,blue),min=Math.min(red,green,blue),delta=max-min;
var hue=0,saturation=delta!=0?delta/max:0,brightness=max/255;
if(saturation){
var rr=(max-red)/delta,gr=(max-green)/delta,br=(max-blue)/delta;
hue=red==max?br-gr:green==max?2+rr-br:4+gr-rr;
if((hue/=6)<0)hue++;}


var hsb=[Math.round(hue*360),Math.round(saturation*100),Math.round(brightness*100),alpha];

return array?hsb:toString('hsb',hsb);},


toHSL:function(array){
var red=this.red,green=this.green,blue=this.blue,alpha=this.alpha;

var max=Math.max(red,green,blue),min=Math.min(red,green,blue),delta=max-min;
var hue=0,saturation=delta!=0?delta/(255-Math.abs(max+min-255)):0,lightness=(max+min)/512;
if(saturation){
var rr=(max-red)/delta,gr=(max-green)/delta,br=(max-blue)/delta;
hue=red==max?br-gr:green==max?2+rr-br:4+gr-rr;
if((hue/=6)<0)hue++;}


var hsl=[Math.round(hue*360),Math.round(saturation*100),Math.round(lightness*100),alpha];

return array?hsl:toString('hsl',hsl);},


toHEX:function(array){

var a=this.alpha;
var alpha=(a=Math.round(a*255).toString(16)).length==1?a+a:a;

var hex=map([this.red,this.green,this.blue],function(bit){
bit=bit.toString(16);
return bit.length==1?'0'+bit:bit;});


return array?hex.concat(alpha):'#'+hex.join('')+(alpha=='ff'?'':alpha);},


toRGB:function(array){
var rgb=[this.red,this.green,this.blue,this.alpha];
return array?rgb:toString('rgb',rgb);}};




Color.prototype.toString=Color.prototype.toRGB;

Color.hex=function(hex){
return new Color(hex,'hex');};


if(this.hex==null)this.hex=Color.hex;

Color.hsb=function(h,s,b,a){
return new Color([h||0,s||0,b||0,a==null?1:a],'hsb');};


if(this.hsb==null)this.hsb=Color.hsb;

Color.hsl=function(h,s,l,a){
return new Color([h||0,s||0,l||0,a==null?1:a],'hsl');};


if(this.hsl==null)this.hsl=Color.hsl;

Color.rgb=function(r,g,b,a){
return new Color([r||0,g||0,b||0,a==null?1:a],'rgb');};


if(this.rgb==null)this.rgb=Color.rgb;

Color.detach=function(color){
color=new Color(color);
return [Color.rgb(color.red,color.green,color.blue).toString(),color.alpha];};


module.exports=Color;
});
__d('art/core/class.js',function(global, require, module, exports) {  'use strict';module.exports=function(mixins){
var proto={};
for(var i=0,l=arguments.length;i<l;i++){
var mixin=arguments[i];
if(typeof mixin=='function')mixin=mixin.prototype;
for(var key in mixin){proto[key]=mixin[key];}}

if(!proto.initialize)proto.initialize=function(){};
proto.constructor=function(a,b,c,d,e,f,g,h){
return new proto.initialize(a,b,c,d,e,f,g,h);};

proto.constructor.prototype=proto.initialize.prototype=proto;
return proto.constructor;};
});
__d('fbjs/lib/invariant.js',function(global, require, module, exports) {  'use strict';






















function invariant(condition,format,a,b,c,d,e,f){
if(process.env.NODE_ENV!=='production'){
if(format===undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format===undefined){
error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else 
{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(format.replace(/%s/g,function(){
return args[argIndex++];}));

error.name='Invariant Violation';}


error.framesToPop=1;
throw error;}}



module.exports=invariant;
});
__d('deepDiffer',function(global, require, module, exports) {  'use strict';















var deepDiffer=function(one,two){
if(one===two){

return false;}

if(typeof one==='function'&&typeof two==='function'){

return false;}

if(typeof one!=='object'||one===null){

return one!==two;}

if(typeof two!=='object'||two===null){


return true;}

if(one.constructor!==two.constructor){
return true;}

if(Array.isArray(one)){

var len=one.length;
if(two.length!==len){
return true;}

for(var ii=0;ii<len;ii++){
if(deepDiffer(one[ii],two[ii])){
return true;}}}else 


{
for(var key in one){
if(deepDiffer(one[key],two[key])){
return true;}}


for(var twoKey in two){


if(one[twoKey]===undefined&&two[twoKey]!==undefined){
return true;}}}



return false;};


module.exports=deepDiffer;
});
__d('ReactPropTypeLocationNames',function(global, require, module, exports) {  'use strict';












var ReactPropTypeLocationNames={};

if(process.env.NODE_ENV!=='production'){
ReactPropTypeLocationNames={
prop:'prop',
context:'context',
childContext:'child context'};}



module.exports=ReactPropTypeLocationNames;
});
__d('fbjs/lib/emptyFunction.js',function(global, require, module, exports) {  "use strict";












function makeEmptyFunction(arg){
return function(){
return arg;};}








function emptyFunction(){}

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;};

emptyFunction.thatReturnsArgument=function(arg){
return arg;};


module.exports=emptyFunction;
});
__d('getIteratorFn',function(global, require, module, exports) {  'use strict';














var ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';















function getIteratorFn(maybeIterable){
var iteratorFn=maybeIterable&&(ITERATOR_SYMBOL&&maybeIterable[ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL]);
if(typeof iteratorFn==='function'){
return iteratorFn;}}



module.exports=getIteratorFn;
});
__d('react-timer-mixin/TimerMixin.js',function(global, require, module, exports) {  'use strict';










var GLOBAL=typeof window==='undefined'?global:window;

var setter=function(_setter,_clearer,array){
return function(callback,delta){
var id=_setter(function(){
_clearer.call(this,id);
callback.apply(this,arguments);}.
bind(this),delta);

if(!this[array]){
this[array]=[id];}else 
{
this[array].push(id);}

return id;};};



var clearer=function(_clearer,array){
return function(id){
if(this[array]){
var index=this[array].indexOf(id);
if(index!==-1){
this[array].splice(index,1);}}


_clearer(id);};};



var _timeouts='TimerMixin_timeouts';
var _clearTimeout=clearer(GLOBAL.clearTimeout,_timeouts);
var _setTimeout=setter(GLOBAL.setTimeout,_clearTimeout,_timeouts);

var _intervals='TimerMixin_intervals';
var _clearInterval=clearer(GLOBAL.clearInterval,_intervals);
var _setInterval=setter(GLOBAL.setInterval,function(){},_intervals);

var _immediates='TimerMixin_immediates';
var _clearImmediate=clearer(GLOBAL.clearImmediate,_immediates);
var _setImmediate=setter(GLOBAL.setImmediate,_clearImmediate,_immediates);

var _rafs='TimerMixin_rafs';
var _cancelAnimationFrame=clearer(GLOBAL.cancelAnimationFrame,_rafs);
var _requestAnimationFrame=setter(GLOBAL.requestAnimationFrame,_cancelAnimationFrame,_rafs);

var TimerMixin={
componentWillUnmount:function(){
this[_timeouts]&&this[_timeouts].forEach(function(id){
GLOBAL.clearTimeout(id);});

this[_timeouts]=null;
this[_intervals]&&this[_intervals].forEach(function(id){
GLOBAL.clearInterval(id);});

this[_intervals]=null;
this[_immediates]&&this[_immediates].forEach(function(id){
GLOBAL.clearImmediate(id);});

this[_immediates]=null;
this[_rafs]&&this[_rafs].forEach(function(id){
GLOBAL.cancelAnimationFrame(id);});

this[_rafs]=null;},


setTimeout:_setTimeout,
clearTimeout:_clearTimeout,

setInterval:_setInterval,
clearInterval:_clearInterval,

setImmediate:_setImmediate,
clearImmediate:_clearImmediate,

requestAnimationFrame:_requestAnimationFrame,
cancelAnimationFrame:_cancelAnimationFrame};


module.exports=TimerMixin;
});
__d('isEmpty',function(global, require, module, exports) {  'use strict';



















function isEmpty(obj){
if(Array.isArray(obj)){
return obj.length===0;}else 
if(typeof obj==='object'){
for(var i in obj){
return false;}

return true;}else 
{
return !obj;}}



module.exports=isEmpty;
});
__d('AssetRegistry',function(global, require, module, exports) {  'use strict';




















var assets=[];

function registerAsset(asset){


return assets.push(asset);}


function getAssetByID(assetId){
return assets[assetId-1];}


module.exports={registerAsset:registerAsset,getAssetByID:getAssetByID};
});
__d('react-native/local-cli/bundle/assetPathUtils.js',function(global, require, module, exports) {  'use strict';









function getAndroidAssetSuffix(scale){
switch(scale){
case 0.75:return 'ldpi';
case 1:return 'mdpi';
case 1.5:return 'hdpi';
case 2:return 'xhdpi';
case 3:return 'xxhdpi';
case 4:return 'xxxhdpi';}}



function getAndroidDrawableFolderName(asset,scale){
var suffix=getAndroidAssetSuffix(scale);
if(!suffix){
throw new Error(
'Don\'t know which android drawable suffix to use for asset: '+
JSON.stringify(asset));}


var androidFolder='drawable-'+suffix;
return androidFolder;}


function getAndroidResourceIdentifier(asset){
var folderPath=getBasePath(asset);
return (folderPath+'/'+asset.name).
toLowerCase().
replace(/\//g,'_').
replace(/([^a-z0-9_])/g,'').
replace(/^assets_/,'');}


function getBasePath(asset){
var basePath=asset.httpServerLocation;
if(basePath[0]==='/'){
basePath=basePath.substr(1);}

return basePath;}


module.exports={
getAndroidAssetSuffix:getAndroidAssetSuffix,
getAndroidDrawableFolderName:getAndroidDrawableFolderName,
getAndroidResourceIdentifier:getAndroidResourceIdentifier,
getBasePath:getBasePath};
});
__d('clamp',function(global, require, module, exports) {  "use strict";























function clamp(min,value,max){
if(value<min){
return min;}

if(value>max){
return max;}

return value;}


module.exports=clamp;
});
__d('rebound/rebound.js',function(global, require, module, exports) {  'use strict';


























































































































(function(){
var rebound={};
var util=rebound.util={};
var concat=Array.prototype.concat;
var slice=Array.prototype.slice;


util.bind=function bind(func,context){
var args=slice.call(arguments,2);
return function(){
func.apply(context,concat.call(args,slice.call(arguments)));};};




util.extend=function extend(target,source){
for(var key in source){
if(source.hasOwnProperty(key)){
target[key]=source[key];}}};









var SpringSystem=rebound.SpringSystem=function SpringSystem(looper){
this._springRegistry={};
this._activeSprings=[];
this.listeners=[];
this._idleSpringIndices=[];
this.looper=looper||new AnimationLooper();
this.looper.springSystem=this;};


util.extend(SpringSystem.prototype,{

_springRegistry:null,

_isIdle:true,

_lastTimeMillis:-1,

_activeSprings:null,

listeners:null,

_idleSpringIndices:null,






setLooper:function(looper){
this.looper=looper;
looper.springSystem=this;},






createSpring:function(tension,friction){
var springConfig;
if(tension===undefined||friction===undefined){
springConfig=SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;}else 
{
springConfig=
SpringConfig.fromOrigamiTensionAndFriction(tension,friction);}

return this.createSpringWithConfig(springConfig);},





createSpringWithBouncinessAndSpeed:function(bounciness,speed){
var springConfig;
if(bounciness===undefined||speed===undefined){
springConfig=SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;}else 
{
springConfig=
SpringConfig.fromBouncinessAndSpeed(bounciness,speed);}

return this.createSpringWithConfig(springConfig);},



createSpringWithConfig:function(springConfig){
var spring=new Spring(this);
this.registerSpring(spring);
spring.setSpringConfig(springConfig);
return spring;},






getIsIdle:function(){
return this._isIdle;},





getSpringById:function(id){
return this._springRegistry[id];},




getAllSprings:function(){
var vals=[];
for(var id in this._springRegistry){
if(this._springRegistry.hasOwnProperty(id)){
vals.push(this._springRegistry[id]);}}


return vals;},






registerSpring:function(spring){
this._springRegistry[spring.getId()]=spring;},






deregisterSpring:function(spring){
removeFirst(this._activeSprings,spring);
delete this._springRegistry[spring.getId()];},


advance:function(time,deltaTime){
while(this._idleSpringIndices.length>0){this._idleSpringIndices.pop();}
for(var i=0,len=this._activeSprings.length;i<len;i++){
var spring=this._activeSprings[i];
if(spring.systemShouldAdvance()){
spring.advance(time/1000.0,deltaTime/1000.0);}else 
{
this._idleSpringIndices.push(this._activeSprings.indexOf(spring));}}


while(this._idleSpringIndices.length>0){
var idx=this._idleSpringIndices.pop();
idx>=0&&this._activeSprings.splice(idx,1);}},
















loop:function(currentTimeMillis){
var listener;
if(this._lastTimeMillis===-1){
this._lastTimeMillis=currentTimeMillis-1;}

var ellapsedMillis=currentTimeMillis-this._lastTimeMillis;
this._lastTimeMillis=currentTimeMillis;

var i=0,len=this.listeners.length;
for(i=0;i<len;i++){
listener=this.listeners[i];
listener.onBeforeIntegrate&&listener.onBeforeIntegrate(this);}


this.advance(currentTimeMillis,ellapsedMillis);
if(this._activeSprings.length===0){
this._isIdle=true;
this._lastTimeMillis=-1;}


for(i=0;i<len;i++){
listener=this.listeners[i];
listener.onAfterIntegrate&&listener.onAfterIntegrate(this);}


if(!this._isIdle){
this.looper.run();}},






activateSpring:function(springId){
var spring=this._springRegistry[springId];
if(this._activeSprings.indexOf(spring)==-1){
this._activeSprings.push(spring);}

if(this.getIsIdle()){
this._isIdle=false;
this.looper.run();}},






addListener:function(listener){
this.listeners.push(listener);},



removeListener:function(listener){
removeFirst(this.listeners,listener);},



removeAllListeners:function(){
this.listeners=[];}});


















var Spring=rebound.Spring=function Spring(springSystem){
this._id='s'+Spring._ID++;
this._springSystem=springSystem;
this.listeners=[];
this._currentState=new PhysicsState();
this._previousState=new PhysicsState();
this._tempState=new PhysicsState();};


util.extend(Spring,{
_ID:0,

MAX_DELTA_TIME_SEC:0.064,

SOLVER_TIMESTEP_SEC:0.001});



util.extend(Spring.prototype,{

_id:0,

_springConfig:null,

_overshootClampingEnabled:false,

_currentState:null,

_previousState:null,

_tempState:null,

_startValue:0,

_endValue:0,

_wasAtRest:true,

_restSpeedThreshold:0.001,

_displacementFromRestThreshold:0.001,

listeners:null,

_timeAccumulator:0,

_springSystem:null,


destroy:function(){
this.listeners=[];
this.frames=[];
this._springSystem.deregisterSpring(this);},




getId:function(){
return this._id;},





setSpringConfig:function(springConfig){
this._springConfig=springConfig;
return this;},



getSpringConfig:function(){
return this._springConfig;},





























setCurrentValue:function(currentValue,skipSetAtRest){
this._startValue=currentValue;
this._currentState.position=currentValue;
if(!skipSetAtRest){
this.setAtRest();}

this.notifyPositionUpdated(false,false);
return this;},





getStartValue:function(){
return this._startValue;},



getCurrentValue:function(){
return this._currentState.position;},




getCurrentDisplacementDistance:function(){
return this.getDisplacementDistanceForState(this._currentState);},


getDisplacementDistanceForState:function(state){
return Math.abs(this._endValue-state.position);},








setEndValue:function(endValue){
if(this._endValue==endValue&&this.isAtRest()){
return this;}

this._startValue=this.getCurrentValue();
this._endValue=endValue;
this._springSystem.activateSpring(this.getId());
for(var i=0,len=this.listeners.length;i<len;i++){
var listener=this.listeners[i];
var onChange=listener.onSpringEndStateChange;
onChange&&onChange(this);}

return this;},



getEndValue:function(){
return this._endValue;},









setVelocity:function(velocity){
if(velocity===this._currentState.velocity){
return this;}

this._currentState.velocity=velocity;
this._springSystem.activateSpring(this.getId());
return this;},



getVelocity:function(){
return this._currentState.velocity;},




setRestSpeedThreshold:function(restSpeedThreshold){
this._restSpeedThreshold=restSpeedThreshold;
return this;},



getRestSpeedThreshold:function(){
return this._restSpeedThreshold;},





setRestDisplacementThreshold:function(displacementFromRestThreshold){
this._displacementFromRestThreshold=displacementFromRestThreshold;},



getRestDisplacementThreshold:function(){
return this._displacementFromRestThreshold;},







setOvershootClampingEnabled:function(enabled){
this._overshootClampingEnabled=enabled;
return this;},



isOvershootClampingEnabled:function(){
return this._overshootClampingEnabled;},





isOvershooting:function(){
var start=this._startValue;
var end=this._endValue;
return this._springConfig.tension>0&&(
start<end&&this.getCurrentValue()>end||
start>end&&this.getCurrentValue()<end);},







advance:function(time,realDeltaTime){
var isAtRest=this.isAtRest();

if(isAtRest&&this._wasAtRest){
return;}


var adjustedDeltaTime=realDeltaTime;
if(realDeltaTime>Spring.MAX_DELTA_TIME_SEC){
adjustedDeltaTime=Spring.MAX_DELTA_TIME_SEC;}


this._timeAccumulator+=adjustedDeltaTime;

var tension=this._springConfig.tension,
friction=this._springConfig.friction,

position=this._currentState.position,
velocity=this._currentState.velocity,
tempPosition=this._tempState.position,
tempVelocity=this._tempState.velocity,

aVelocity,aAcceleration,
bVelocity,bAcceleration,
cVelocity,cAcceleration,
dVelocity,dAcceleration,

dxdt,dvdt;

while(this._timeAccumulator>=Spring.SOLVER_TIMESTEP_SEC){

this._timeAccumulator-=Spring.SOLVER_TIMESTEP_SEC;

if(this._timeAccumulator<Spring.SOLVER_TIMESTEP_SEC){
this._previousState.position=position;
this._previousState.velocity=velocity;}


aVelocity=velocity;
aAcceleration=
tension*(this._endValue-tempPosition)-friction*velocity;

tempPosition=position+aVelocity*Spring.SOLVER_TIMESTEP_SEC*0.5;
tempVelocity=
velocity+aAcceleration*Spring.SOLVER_TIMESTEP_SEC*0.5;
bVelocity=tempVelocity;
bAcceleration=
tension*(this._endValue-tempPosition)-friction*tempVelocity;

tempPosition=position+bVelocity*Spring.SOLVER_TIMESTEP_SEC*0.5;
tempVelocity=
velocity+bAcceleration*Spring.SOLVER_TIMESTEP_SEC*0.5;
cVelocity=tempVelocity;
cAcceleration=
tension*(this._endValue-tempPosition)-friction*tempVelocity;

tempPosition=position+cVelocity*Spring.SOLVER_TIMESTEP_SEC*0.5;
tempVelocity=
velocity+cAcceleration*Spring.SOLVER_TIMESTEP_SEC*0.5;
dVelocity=tempVelocity;
dAcceleration=
tension*(this._endValue-tempPosition)-friction*tempVelocity;

dxdt=
1.0/6.0*(aVelocity+2.0*(bVelocity+cVelocity)+dVelocity);
dvdt=1.0/6.0*(
aAcceleration+2.0*(bAcceleration+cAcceleration)+dAcceleration);


position+=dxdt*Spring.SOLVER_TIMESTEP_SEC;
velocity+=dvdt*Spring.SOLVER_TIMESTEP_SEC;}


this._tempState.position=tempPosition;
this._tempState.velocity=tempVelocity;

this._currentState.position=position;
this._currentState.velocity=velocity;

if(this._timeAccumulator>0){
this._interpolate(this._timeAccumulator/Spring.SOLVER_TIMESTEP_SEC);}


if(this.isAtRest()||
this._overshootClampingEnabled&&this.isOvershooting()){

if(this._springConfig.tension>0){
this._startValue=this._endValue;
this._currentState.position=this._endValue;}else 
{
this._endValue=this._currentState.position;
this._startValue=this._endValue;}

this.setVelocity(0);
isAtRest=true;}


var notifyActivate=false;
if(this._wasAtRest){
this._wasAtRest=false;
notifyActivate=true;}


var notifyAtRest=false;
if(isAtRest){
this._wasAtRest=true;
notifyAtRest=true;}


this.notifyPositionUpdated(notifyActivate,notifyAtRest);},


notifyPositionUpdated:function(notifyActivate,notifyAtRest){
for(var i=0,len=this.listeners.length;i<len;i++){
var listener=this.listeners[i];
if(notifyActivate&&listener.onSpringActivate){
listener.onSpringActivate(this);}


if(listener.onSpringUpdate){
listener.onSpringUpdate(this);}


if(notifyAtRest&&listener.onSpringAtRest){
listener.onSpringAtRest(this);}}},









systemShouldAdvance:function(){
return !this.isAtRest()||!this.wasAtRest();},


wasAtRest:function(){
return this._wasAtRest;},








isAtRest:function(){
return Math.abs(this._currentState.velocity)<this._restSpeedThreshold&&(
this.getDisplacementDistanceForState(this._currentState)<=
this._displacementFromRestThreshold||
this._springConfig.tension===0);},






setAtRest:function(){
this._endValue=this._currentState.position;
this._tempState.position=this._currentState.position;
this._currentState.velocity=0;
return this;},


_interpolate:function(alpha){
this._currentState.position=this._currentState.position*
alpha+this._previousState.position*(1-alpha);
this._currentState.velocity=this._currentState.velocity*
alpha+this._previousState.velocity*(1-alpha);},


getListeners:function(){
return this.listeners;},


addListener:function(newListener){
this.listeners.push(newListener);
return this;},


removeListener:function(listenerToRemove){
removeFirst(this.listeners,listenerToRemove);
return this;},


removeAllListeners:function(){
this.listeners=[];
return this;},


currentValueIsApproximately:function(value){
return Math.abs(this.getCurrentValue()-value)<=
this.getRestDisplacementThreshold();}});









var PhysicsState=function PhysicsState(){};

util.extend(PhysicsState.prototype,{
position:0,
velocity:0});








var SpringConfig=rebound.SpringConfig=
function SpringConfig(tension,friction){
this.tension=tension;
this.friction=friction;};







var AnimationLooper=rebound.AnimationLooper=function AnimationLooper(){
this.springSystem=null;
var _this=this;
var _run=function(){
_this.springSystem.loop(Date.now());};


this.run=function(){
util.onFrame(_run);};};









rebound.SimulationLooper=function SimulationLooper(timestep){
this.springSystem=null;
var time=0;
var running=false;
timestep=timestep||16.667;

this.run=function(){
if(running){
return;}

running=true;
while(!this.springSystem.getIsIdle()){
this.springSystem.loop(time+=timestep);}

running=false;};};








rebound.SteppingSimulationLooper=function(timestep){
this.springSystem=null;
var time=0;



this.run=function(){};


this.step=function(timestep){
this.springSystem.loop(time+=timestep);};};








var OrigamiValueConverter=rebound.OrigamiValueConverter={
tensionFromOrigamiValue:function(oValue){
return (oValue-30.0)*3.62+194.0;},


origamiValueFromTension:function(tension){
return (tension-194.0)/3.62+30.0;},


frictionFromOrigamiValue:function(oValue){
return (oValue-8.0)*3.0+25.0;},


origamiFromFriction:function(friction){
return (friction-25.0)/3.0+8.0;}};










var BouncyConversion=rebound.BouncyConversion=function(bounciness,speed){
this.bounciness=bounciness;
this.speed=speed;
var b=this.normalize(bounciness/1.7,0,20.0);
b=this.projectNormal(b,0.0,0.8);
var s=this.normalize(speed/1.7,0,20.0);
this.bouncyTension=this.projectNormal(s,0.5,200);
this.bouncyFriction=this.quadraticOutInterpolation(
b,
this.b3Nobounce(this.bouncyTension),
0.01);};


util.extend(BouncyConversion.prototype,{

normalize:function(value,startValue,endValue){
return (value-startValue)/(endValue-startValue);},


projectNormal:function(n,start,end){
return start+n*(end-start);},


linearInterpolation:function(t,start,end){
return t*end+(1.0-t)*start;},


quadraticOutInterpolation:function(t,start,end){
return this.linearInterpolation(2*t-t*t,start,end);},


b3Friction1:function(x){
return 0.0007*Math.pow(x,3)-
0.031*Math.pow(x,2)+0.64*x+1.28;},


b3Friction2:function(x){
return 0.000044*Math.pow(x,3)-
0.006*Math.pow(x,2)+0.36*x+2.;},


b3Friction3:function(x){
return 0.00000045*Math.pow(x,3)-
0.000332*Math.pow(x,2)+0.1078*x+5.84;},


b3Nobounce:function(tension){
var friction=0;
if(tension<=18){
friction=this.b3Friction1(tension);}else 
if(tension>18&&tension<=44){
friction=this.b3Friction2(tension);}else 
{
friction=this.b3Friction3(tension);}

return friction;}});



util.extend(SpringConfig,{




fromOrigamiTensionAndFriction:function(tension,friction){
return new SpringConfig(
OrigamiValueConverter.tensionFromOrigamiValue(tension),
OrigamiValueConverter.frictionFromOrigamiValue(friction));},





fromBouncinessAndSpeed:function(bounciness,speed){
var bouncyConversion=new rebound.BouncyConversion(bounciness,speed);
return this.fromOrigamiTensionAndFriction(
bouncyConversion.bouncyTension,
bouncyConversion.bouncyFriction);},




coastingConfigWithOrigamiFriction:function(friction){
return new SpringConfig(
0,
OrigamiValueConverter.frictionFromOrigamiValue(friction));}});




SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG=
SpringConfig.fromOrigamiTensionAndFriction(40,7);

util.extend(SpringConfig.prototype,{friction:0,tension:0});




var colorCache={};
util.hexToRGB=function(color){
if(colorCache[color]){
return colorCache[color];}

color=color.replace('#','');
if(color.length===3){
color=color[0]+color[0]+color[1]+color[1]+color[2]+color[2];}

var parts=color.match(/.{2}/g);

var ret={
r:parseInt(parts[0],16),
g:parseInt(parts[1],16),
b:parseInt(parts[2],16)};


colorCache[color]=ret;
return ret;};


util.rgbToHex=function(r,g,b){
r=r.toString(16);
g=g.toString(16);
b=b.toString(16);
r=r.length<2?'0'+r:r;
g=g.length<2?'0'+g:g;
b=b.length<2?'0'+b:b;
return '#'+r+g+b;};


var MathUtil=rebound.MathUtil={








mapValueInRange:function(value,fromLow,fromHigh,toLow,toHigh){
var fromRangeSize=fromHigh-fromLow;
var toRangeSize=toHigh-toLow;
var valueScale=(value-fromLow)/fromRangeSize;
return toLow+valueScale*toRangeSize;},





interpolateColor:
function(val,startColor,endColor,fromLow,fromHigh,asRGB){
fromLow=fromLow===undefined?0:fromLow;
fromHigh=fromHigh===undefined?1:fromHigh;
startColor=util.hexToRGB(startColor);
endColor=util.hexToRGB(endColor);
var r=Math.floor(
util.mapValueInRange(val,fromLow,fromHigh,startColor.r,endColor.r));

var g=Math.floor(
util.mapValueInRange(val,fromLow,fromHigh,startColor.g,endColor.g));

var b=Math.floor(
util.mapValueInRange(val,fromLow,fromHigh,startColor.b,endColor.b));

if(asRGB){
return 'rgb('+r+','+g+','+b+')';}else 
{
return util.rgbToHex(r,g,b);}},



degreesToRadians:function(deg){
return deg*Math.PI/180;},


radiansToDegrees:function(rad){
return rad*180/Math.PI;}};




util.extend(util,MathUtil);







function removeFirst(array,item){
var idx=array.indexOf(item);
idx!=-1&&array.splice(idx,1);}


var _onFrame;
if(typeof window!=='undefined'){
_onFrame=window.requestAnimationFrame||
window.webkitRequestAnimationFrame||
window.mozRequestAnimationFrame||
window.msRequestAnimationFrame||
window.oRequestAnimationFrame||
function(callback){
window.setTimeout(callback,1000/60);};}


if(!_onFrame&&typeof process!=='undefined'&&process.title==='node'){
_onFrame=setImmediate;}



util.onFrame=function onFrame(func){
return _onFrame(func);};




if(typeof exports!='undefined'){
util.extend(exports,rebound);}else 
if(typeof window!='undefined'){
window.rebound=rebound;}})();
});
__d('EventSubscription',function(global, require, module, exports) {  'use strict';var 






















EventSubscription=function(){





function EventSubscription(subscriber){babelHelpers.classCallCheck(this,EventSubscription);
this.subscriber=subscriber;}babelHelpers.createClass(EventSubscription,[{key:'remove',value:function remove()





{
this.subscriber.removeSubscription(this);}}]);return EventSubscription;}();



module.exports=EventSubscription;
});
__d('fbjs/lib/emptyFunction.js',function(global, require, module, exports) {  "use strict";











function makeEmptyFunction(arg){
return function(){
return arg;};}








function emptyFunction(){}

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;};

emptyFunction.thatReturnsArgument=function(arg){
return arg;};


module.exports=emptyFunction;
});
__d('immutable/dist/immutable.js',function(global, require, module, exports) {  'use strict';








(function(global,factory){
typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory():
typeof define==='function'&&define.amd?define(factory):
global.Immutable=factory();})(
this,function(){'use strict';var SLICE$0=Array.prototype.slice;

function createClass(ctor,superClass){
if(superClass){
ctor.prototype=Object.create(superClass.prototype);}

ctor.prototype.constructor=ctor;}


function Iterable(value){
return isIterable(value)?value:Seq(value);}



createClass(KeyedIterable,Iterable);
function KeyedIterable(value){
return isKeyed(value)?value:KeyedSeq(value);}



createClass(IndexedIterable,Iterable);
function IndexedIterable(value){
return isIndexed(value)?value:IndexedSeq(value);}



createClass(SetIterable,Iterable);
function SetIterable(value){
return isIterable(value)&&!isAssociative(value)?value:SetSeq(value);}




function isIterable(maybeIterable){
return !!(maybeIterable&&maybeIterable[IS_ITERABLE_SENTINEL]);}


function isKeyed(maybeKeyed){
return !!(maybeKeyed&&maybeKeyed[IS_KEYED_SENTINEL]);}


function isIndexed(maybeIndexed){
return !!(maybeIndexed&&maybeIndexed[IS_INDEXED_SENTINEL]);}


function isAssociative(maybeAssociative){
return isKeyed(maybeAssociative)||isIndexed(maybeAssociative);}


function isOrdered(maybeOrdered){
return !!(maybeOrdered&&maybeOrdered[IS_ORDERED_SENTINEL]);}


Iterable.isIterable=isIterable;
Iterable.isKeyed=isKeyed;
Iterable.isIndexed=isIndexed;
Iterable.isAssociative=isAssociative;
Iterable.isOrdered=isOrdered;

Iterable.Keyed=KeyedIterable;
Iterable.Indexed=IndexedIterable;
Iterable.Set=SetIterable;


var IS_ITERABLE_SENTINEL='@@__IMMUTABLE_ITERABLE__@@';
var IS_KEYED_SENTINEL='@@__IMMUTABLE_KEYED__@@';
var IS_INDEXED_SENTINEL='@@__IMMUTABLE_INDEXED__@@';
var IS_ORDERED_SENTINEL='@@__IMMUTABLE_ORDERED__@@';


var DELETE='delete';


var SHIFT=5;
var SIZE=1<<SHIFT;
var MASK=SIZE-1;



var NOT_SET={};


var CHANGE_LENGTH={value:false};
var DID_ALTER={value:false};

function MakeRef(ref){
ref.value=false;
return ref;}


function SetRef(ref){
ref&&(ref.value=true);}





function OwnerID(){}


function arrCopy(arr,offset){
offset=offset||0;
var len=Math.max(0,arr.length-offset);
var newArr=new Array(len);
for(var ii=0;ii<len;ii++){
newArr[ii]=arr[ii+offset];}

return newArr;}


function ensureSize(iter){
if(iter.size===undefined){
iter.size=iter.__iterate(returnTrue);}

return iter.size;}


function wrapIndex(iter,index){







if(typeof index!=='number'){
var uint32Index=index>>>0;
if(''+uint32Index!==index||uint32Index===4294967295){
return NaN;}

index=uint32Index;}

return index<0?ensureSize(iter)+index:index;}


function returnTrue(){
return true;}


function wholeSlice(begin,end,size){
return (begin===0||size!==undefined&&begin<=-size)&&(
end===undefined||size!==undefined&&end>=size);}


function resolveBegin(begin,size){
return resolveIndex(begin,size,0);}


function resolveEnd(end,size){
return resolveIndex(end,size,size);}


function resolveIndex(index,size,defaultIndex){
return index===undefined?
defaultIndex:
index<0?
Math.max(0,size+index):
size===undefined?
index:
Math.min(size,index);}




var ITERATE_KEYS=0;
var ITERATE_VALUES=1;
var ITERATE_ENTRIES=2;

var REAL_ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';

var ITERATOR_SYMBOL=REAL_ITERATOR_SYMBOL||FAUX_ITERATOR_SYMBOL;


function Iterator(next){
this.next=next;}


Iterator.prototype.toString=function(){
return '[Iterator]';};



Iterator.KEYS=ITERATE_KEYS;
Iterator.VALUES=ITERATE_VALUES;
Iterator.ENTRIES=ITERATE_ENTRIES;

Iterator.prototype.inspect=
Iterator.prototype.toSource=function(){return this.toString();};
Iterator.prototype[ITERATOR_SYMBOL]=function(){
return this;};



function iteratorValue(type,k,v,iteratorResult){
var value=type===0?k:type===1?v:[k,v];
iteratorResult?iteratorResult.value=value:iteratorResult={
value:value,done:false};

return iteratorResult;}


function iteratorDone(){
return {value:undefined,done:true};}


function hasIterator(maybeIterable){
return !!getIteratorFn(maybeIterable);}


function isIterator(maybeIterator){
return maybeIterator&&typeof maybeIterator.next==='function';}


function getIterator(iterable){
var iteratorFn=getIteratorFn(iterable);
return iteratorFn&&iteratorFn.call(iterable);}


function getIteratorFn(iterable){
var iteratorFn=iterable&&(
REAL_ITERATOR_SYMBOL&&iterable[REAL_ITERATOR_SYMBOL]||
iterable[FAUX_ITERATOR_SYMBOL]);

if(typeof iteratorFn==='function'){
return iteratorFn;}}



function isArrayLike(value){
return value&&typeof value.length==='number';}


createClass(Seq,Iterable);
function Seq(value){
return value===null||value===undefined?emptySequence():
isIterable(value)?value.toSeq():seqFromValue(value);}


Seq.of=function(){
return Seq(arguments);};


Seq.prototype.toSeq=function(){
return this;};


Seq.prototype.toString=function(){
return this.__toString('Seq {','}');};


Seq.prototype.cacheResult=function(){
if(!this._cache&&this.__iterateUncached){
this._cache=this.entrySeq().toArray();
this.size=this._cache.length;}

return this;};




Seq.prototype.__iterate=function(fn,reverse){
return seqIterate(this,fn,reverse,true);};




Seq.prototype.__iterator=function(type,reverse){
return seqIterator(this,type,reverse,true);};




createClass(KeyedSeq,Seq);
function KeyedSeq(value){
return value===null||value===undefined?
emptySequence().toKeyedSeq():
isIterable(value)?
isKeyed(value)?value.toSeq():value.fromEntrySeq():
keyedSeqFromValue(value);}


KeyedSeq.prototype.toKeyedSeq=function(){
return this;};




createClass(IndexedSeq,Seq);
function IndexedSeq(value){
return value===null||value===undefined?emptySequence():
!isIterable(value)?indexedSeqFromValue(value):
isKeyed(value)?value.entrySeq():value.toIndexedSeq();}


IndexedSeq.of=function(){
return IndexedSeq(arguments);};


IndexedSeq.prototype.toIndexedSeq=function(){
return this;};


IndexedSeq.prototype.toString=function(){
return this.__toString('Seq [',']');};


IndexedSeq.prototype.__iterate=function(fn,reverse){
return seqIterate(this,fn,reverse,false);};


IndexedSeq.prototype.__iterator=function(type,reverse){
return seqIterator(this,type,reverse,false);};




createClass(SetSeq,Seq);
function SetSeq(value){
return (
value===null||value===undefined?emptySequence():
!isIterable(value)?indexedSeqFromValue(value):
isKeyed(value)?value.entrySeq():value).
toSetSeq();}


SetSeq.of=function(){
return SetSeq(arguments);};


SetSeq.prototype.toSetSeq=function(){
return this;};




Seq.isSeq=isSeq;
Seq.Keyed=KeyedSeq;
Seq.Set=SetSeq;
Seq.Indexed=IndexedSeq;

var IS_SEQ_SENTINEL='@@__IMMUTABLE_SEQ__@@';

Seq.prototype[IS_SEQ_SENTINEL]=true;



createClass(ArraySeq,IndexedSeq);
function ArraySeq(array){
this._array=array;
this.size=array.length;}


ArraySeq.prototype.get=function(index,notSetValue){
return this.has(index)?this._array[wrapIndex(this,index)]:notSetValue;};


ArraySeq.prototype.__iterate=function(fn,reverse){
var array=this._array;
var maxIndex=array.length-1;
for(var ii=0;ii<=maxIndex;ii++){
if(fn(array[reverse?maxIndex-ii:ii],ii,this)===false){
return ii+1;}}


return ii;};


ArraySeq.prototype.__iterator=function(type,reverse){
var array=this._array;
var maxIndex=array.length-1;
var ii=0;
return new Iterator(function()
{return ii>maxIndex?
iteratorDone():
iteratorValue(type,ii,array[reverse?maxIndex-ii++:ii++]);});};





createClass(ObjectSeq,KeyedSeq);
function ObjectSeq(object){
var keys=Object.keys(object);
this._object=object;
this._keys=keys;
this.size=keys.length;}


ObjectSeq.prototype.get=function(key,notSetValue){
if(notSetValue!==undefined&&!this.has(key)){
return notSetValue;}

return this._object[key];};


ObjectSeq.prototype.has=function(key){
return this._object.hasOwnProperty(key);};


ObjectSeq.prototype.__iterate=function(fn,reverse){
var object=this._object;
var keys=this._keys;
var maxIndex=keys.length-1;
for(var ii=0;ii<=maxIndex;ii++){
var key=keys[reverse?maxIndex-ii:ii];
if(fn(object[key],key,this)===false){
return ii+1;}}


return ii;};


ObjectSeq.prototype.__iterator=function(type,reverse){
var object=this._object;
var keys=this._keys;
var maxIndex=keys.length-1;
var ii=0;
return new Iterator(function(){
var key=keys[reverse?maxIndex-ii:ii];
return ii++>maxIndex?
iteratorDone():
iteratorValue(type,key,object[key]);});};



ObjectSeq.prototype[IS_ORDERED_SENTINEL]=true;


createClass(IterableSeq,IndexedSeq);
function IterableSeq(iterable){
this._iterable=iterable;
this.size=iterable.length||iterable.size;}


IterableSeq.prototype.__iterateUncached=function(fn,reverse){
if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var iterable=this._iterable;
var iterator=getIterator(iterable);
var iterations=0;
if(isIterator(iterator)){
var step;
while(!(step=iterator.next()).done){
if(fn(step.value,iterations++,this)===false){
break;}}}



return iterations;};


IterableSeq.prototype.__iteratorUncached=function(type,reverse){
if(reverse){
return this.cacheResult().__iterator(type,reverse);}

var iterable=this._iterable;
var iterator=getIterator(iterable);
if(!isIterator(iterator)){
return new Iterator(iteratorDone);}

var iterations=0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:iteratorValue(type,iterations++,step.value);});};





createClass(IteratorSeq,IndexedSeq);
function IteratorSeq(iterator){
this._iterator=iterator;
this._iteratorCache=[];}


IteratorSeq.prototype.__iterateUncached=function(fn,reverse){
if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var iterator=this._iterator;
var cache=this._iteratorCache;
var iterations=0;
while(iterations<cache.length){
if(fn(cache[iterations],iterations++,this)===false){
return iterations;}}


var step;
while(!(step=iterator.next()).done){
var val=step.value;
cache[iterations]=val;
if(fn(val,iterations++,this)===false){
break;}}


return iterations;};


IteratorSeq.prototype.__iteratorUncached=function(type,reverse){
if(reverse){
return this.cacheResult().__iterator(type,reverse);}

var iterator=this._iterator;
var cache=this._iteratorCache;
var iterations=0;
return new Iterator(function(){
if(iterations>=cache.length){
var step=iterator.next();
if(step.done){
return step;}

cache[iterations]=step.value;}

return iteratorValue(type,iterations,cache[iterations++]);});};








function isSeq(maybeSeq){
return !!(maybeSeq&&maybeSeq[IS_SEQ_SENTINEL]);}


var EMPTY_SEQ;

function emptySequence(){
return EMPTY_SEQ||(EMPTY_SEQ=new ArraySeq([]));}


function keyedSeqFromValue(value){
var seq=
Array.isArray(value)?new ArraySeq(value).fromEntrySeq():
isIterator(value)?new IteratorSeq(value).fromEntrySeq():
hasIterator(value)?new IterableSeq(value).fromEntrySeq():
typeof value==='object'?new ObjectSeq(value):
undefined;
if(!seq){
throw new TypeError(
'Expected Array or iterable object of [k, v] entries, '+
'or keyed object: '+value);}


return seq;}


function indexedSeqFromValue(value){
var seq=maybeIndexedSeqFromValue(value);
if(!seq){
throw new TypeError(
'Expected Array or iterable object of values: '+value);}


return seq;}


function seqFromValue(value){
var seq=maybeIndexedSeqFromValue(value)||
typeof value==='object'&&new ObjectSeq(value);
if(!seq){
throw new TypeError(
'Expected Array or iterable object of values, or keyed object: '+value);}


return seq;}


function maybeIndexedSeqFromValue(value){
return (
isArrayLike(value)?new ArraySeq(value):
isIterator(value)?new IteratorSeq(value):
hasIterator(value)?new IterableSeq(value):
undefined);}



function seqIterate(seq,fn,reverse,useKeys){
var cache=seq._cache;
if(cache){
var maxIndex=cache.length-1;
for(var ii=0;ii<=maxIndex;ii++){
var entry=cache[reverse?maxIndex-ii:ii];
if(fn(entry[1],useKeys?entry[0]:ii,seq)===false){
return ii+1;}}


return ii;}

return seq.__iterateUncached(fn,reverse);}


function seqIterator(seq,type,reverse,useKeys){
var cache=seq._cache;
if(cache){
var maxIndex=cache.length-1;
var ii=0;
return new Iterator(function(){
var entry=cache[reverse?maxIndex-ii:ii];
return ii++>maxIndex?
iteratorDone():
iteratorValue(type,useKeys?entry[0]:ii-1,entry[1]);});}


return seq.__iteratorUncached(type,reverse);}


function fromJS(json,converter){
return converter?
fromJSWith(converter,json,'',{'':json}):
fromJSDefault(json);}


function fromJSWith(converter,json,key,parentJSON){
if(Array.isArray(json)){
return converter.call(parentJSON,key,IndexedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}

if(isPlainObj(json)){
return converter.call(parentJSON,key,KeyedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}

return json;}


function fromJSDefault(json){
if(Array.isArray(json)){
return IndexedSeq(json).map(fromJSDefault).toList();}

if(isPlainObj(json)){
return KeyedSeq(json).map(fromJSDefault).toMap();}

return json;}


function isPlainObj(value){
return value&&(value.constructor===Object||value.constructor===undefined);}
























































function is(valueA,valueB){
if(valueA===valueB||valueA!==valueA&&valueB!==valueB){
return true;}

if(!valueA||!valueB){
return false;}

if(typeof valueA.valueOf==='function'&&
typeof valueB.valueOf==='function'){
valueA=valueA.valueOf();
valueB=valueB.valueOf();
if(valueA===valueB||valueA!==valueA&&valueB!==valueB){
return true;}

if(!valueA||!valueB){
return false;}}


if(typeof valueA.equals==='function'&&
typeof valueB.equals==='function'&&
valueA.equals(valueB)){
return true;}

return false;}


function deepEqual(a,b){
if(a===b){
return true;}


if(
!isIterable(b)||
a.size!==undefined&&b.size!==undefined&&a.size!==b.size||
a.__hash!==undefined&&b.__hash!==undefined&&a.__hash!==b.__hash||
isKeyed(a)!==isKeyed(b)||
isIndexed(a)!==isIndexed(b)||
isOrdered(a)!==isOrdered(b))
{
return false;}


if(a.size===0&&b.size===0){
return true;}


var notAssociative=!isAssociative(a);

if(isOrdered(a)){
var entries=a.entries();
return b.every(function(v,k){
var entry=entries.next().value;
return entry&&is(entry[1],v)&&(notAssociative||is(entry[0],k));})&&
entries.next().done;}


var flipped=false;

if(a.size===undefined){
if(b.size===undefined){
if(typeof a.cacheResult==='function'){
a.cacheResult();}}else 

{
flipped=true;
var _=a;
a=b;
b=_;}}



var allEqual=true;
var bSize=b.__iterate(function(v,k){
if(notAssociative?!a.has(v):
flipped?!is(v,a.get(k,NOT_SET)):!is(a.get(k,NOT_SET),v)){
allEqual=false;
return false;}});



return allEqual&&a.size===bSize;}


createClass(Repeat,IndexedSeq);

function Repeat(value,times){
if(!(this instanceof Repeat)){
return new Repeat(value,times);}

this._value=value;
this.size=times===undefined?Infinity:Math.max(0,times);
if(this.size===0){
if(EMPTY_REPEAT){
return EMPTY_REPEAT;}

EMPTY_REPEAT=this;}}



Repeat.prototype.toString=function(){
if(this.size===0){
return 'Repeat []';}

return 'Repeat [ '+this._value+' '+this.size+' times ]';};


Repeat.prototype.get=function(index,notSetValue){
return this.has(index)?this._value:notSetValue;};


Repeat.prototype.includes=function(searchValue){
return is(this._value,searchValue);};


Repeat.prototype.slice=function(begin,end){
var size=this.size;
return wholeSlice(begin,end,size)?this:
new Repeat(this._value,resolveEnd(end,size)-resolveBegin(begin,size));};


Repeat.prototype.reverse=function(){
return this;};


Repeat.prototype.indexOf=function(searchValue){
if(is(this._value,searchValue)){
return 0;}

return -1;};


Repeat.prototype.lastIndexOf=function(searchValue){
if(is(this._value,searchValue)){
return this.size;}

return -1;};


Repeat.prototype.__iterate=function(fn,reverse){
for(var ii=0;ii<this.size;ii++){
if(fn(this._value,ii,this)===false){
return ii+1;}}


return ii;};


Repeat.prototype.__iterator=function(type,reverse){var this$0=this;
var ii=0;
return new Iterator(function()
{return ii<this$0.size?iteratorValue(type,ii++,this$0._value):iteratorDone();});};



Repeat.prototype.equals=function(other){
return other instanceof Repeat?
is(this._value,other._value):
deepEqual(other);};



var EMPTY_REPEAT;

function invariant(condition,error){
if(!condition)throw new Error(error);}


createClass(Range,IndexedSeq);

function Range(start,end,step){
if(!(this instanceof Range)){
return new Range(start,end,step);}

invariant(step!==0,'Cannot step a Range by 0');
start=start||0;
if(end===undefined){
end=Infinity;}

step=step===undefined?1:Math.abs(step);
if(end<start){
step=-step;}

this._start=start;
this._end=end;
this._step=step;
this.size=Math.max(0,Math.ceil((end-start)/step-1)+1);
if(this.size===0){
if(EMPTY_RANGE){
return EMPTY_RANGE;}

EMPTY_RANGE=this;}}



Range.prototype.toString=function(){
if(this.size===0){
return 'Range []';}

return 'Range [ '+
this._start+'...'+this._end+(
this._step>1?' by '+this._step:'')+
' ]';};


Range.prototype.get=function(index,notSetValue){
return this.has(index)?
this._start+wrapIndex(this,index)*this._step:
notSetValue;};


Range.prototype.includes=function(searchValue){
var possibleIndex=(searchValue-this._start)/this._step;
return possibleIndex>=0&&
possibleIndex<this.size&&
possibleIndex===Math.floor(possibleIndex);};


Range.prototype.slice=function(begin,end){
if(wholeSlice(begin,end,this.size)){
return this;}

begin=resolveBegin(begin,this.size);
end=resolveEnd(end,this.size);
if(end<=begin){
return new Range(0,0);}

return new Range(this.get(begin,this._end),this.get(end,this._end),this._step);};


Range.prototype.indexOf=function(searchValue){
var offsetValue=searchValue-this._start;
if(offsetValue%this._step===0){
var index=offsetValue/this._step;
if(index>=0&&index<this.size){
return index;}}


return -1;};


Range.prototype.lastIndexOf=function(searchValue){
return this.indexOf(searchValue);};


Range.prototype.__iterate=function(fn,reverse){
var maxIndex=this.size-1;
var step=this._step;
var value=reverse?this._start+maxIndex*step:this._start;
for(var ii=0;ii<=maxIndex;ii++){
if(fn(value,ii,this)===false){
return ii+1;}

value+=reverse?-step:step;}

return ii;};


Range.prototype.__iterator=function(type,reverse){
var maxIndex=this.size-1;
var step=this._step;
var value=reverse?this._start+maxIndex*step:this._start;
var ii=0;
return new Iterator(function(){
var v=value;
value+=reverse?-step:step;
return ii>maxIndex?iteratorDone():iteratorValue(type,ii++,v);});};



Range.prototype.equals=function(other){
return other instanceof Range?
this._start===other._start&&
this._end===other._end&&
this._step===other._step:
deepEqual(this,other);};



var EMPTY_RANGE;

createClass(Collection,Iterable);
function Collection(){
throw TypeError('Abstract');}



createClass(KeyedCollection,Collection);function KeyedCollection(){}

createClass(IndexedCollection,Collection);function IndexedCollection(){}

createClass(SetCollection,Collection);function SetCollection(){}


Collection.Keyed=KeyedCollection;
Collection.Indexed=IndexedCollection;
Collection.Set=SetCollection;

var imul=
typeof Math.imul==='function'&&Math.imul(0xffffffff,2)===-2?
Math.imul:
function imul(a,b){
a=a|0;
b=b|0;
var c=a&0xffff;
var d=b&0xffff;

return c*d+((a>>>16)*d+c*(b>>>16)<<16>>>0)|0;};






function smi(i32){
return i32>>>1&0x40000000|i32&0xBFFFFFFF;}


function hash(o){
if(o===false||o===null||o===undefined){
return 0;}

if(typeof o.valueOf==='function'){
o=o.valueOf();
if(o===false||o===null||o===undefined){
return 0;}}


if(o===true){
return 1;}

var type=typeof o;
if(type==='number'){
var h=o|0;
if(h!==o){
h^=o*0xFFFFFFFF;}

while(o>0xFFFFFFFF){
o/=0xFFFFFFFF;
h^=o;}

return smi(h);}

if(type==='string'){
return o.length>STRING_HASH_CACHE_MIN_STRLEN?cachedHashString(o):hashString(o);}

if(typeof o.hashCode==='function'){
return o.hashCode();}

if(type==='object'){
return hashJSObj(o);}

if(typeof o.toString==='function'){
return hashString(o.toString());}

throw new Error('Value type '+type+' cannot be hashed.');}


function cachedHashString(string){
var hash=stringHashCache[string];
if(hash===undefined){
hash=hashString(string);
if(STRING_HASH_CACHE_SIZE===STRING_HASH_CACHE_MAX_SIZE){
STRING_HASH_CACHE_SIZE=0;
stringHashCache={};}

STRING_HASH_CACHE_SIZE++;
stringHashCache[string]=hash;}

return hash;}



function hashString(string){






var hash=0;
for(var ii=0;ii<string.length;ii++){
hash=31*hash+string.charCodeAt(ii)|0;}

return smi(hash);}


function hashJSObj(obj){
var hash;
if(usingWeakMap){
hash=weakMap.get(obj);
if(hash!==undefined){
return hash;}}



hash=obj[UID_HASH_KEY];
if(hash!==undefined){
return hash;}


if(!canDefineProperty){
hash=obj.propertyIsEnumerable&&obj.propertyIsEnumerable[UID_HASH_KEY];
if(hash!==undefined){
return hash;}


hash=getIENodeHash(obj);
if(hash!==undefined){
return hash;}}



hash=++objHashUID;
if(objHashUID&0x40000000){
objHashUID=0;}


if(usingWeakMap){
weakMap.set(obj,hash);}else 
if(isExtensible!==undefined&&isExtensible(obj)===false){
throw new Error('Non-extensible objects are not allowed as keys.');}else 
if(canDefineProperty){
Object.defineProperty(obj,UID_HASH_KEY,{
'enumerable':false,
'configurable':false,
'writable':false,
'value':hash});}else 

if(obj.propertyIsEnumerable!==undefined&&
obj.propertyIsEnumerable===obj.constructor.prototype.propertyIsEnumerable){




obj.propertyIsEnumerable=function(){
return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments);};

obj.propertyIsEnumerable[UID_HASH_KEY]=hash;}else 
if(obj.nodeType!==undefined){




obj[UID_HASH_KEY]=hash;}else 
{
throw new Error('Unable to set a non-enumerable property on object.');}


return hash;}



var isExtensible=Object.isExtensible;


var canDefineProperty=function(){
try{
Object.defineProperty({},'@',{});
return true;}
catch(e){
return false;}}();





function getIENodeHash(node){
if(node&&node.nodeType>0){
switch(node.nodeType){
case 1:
return node.uniqueID;
case 9:
return node.documentElement&&node.documentElement.uniqueID;}}}





var usingWeakMap=typeof WeakMap==='function';
var weakMap;
if(usingWeakMap){
weakMap=new WeakMap();}


var objHashUID=0;

var UID_HASH_KEY='__immutablehash__';
if(typeof Symbol==='function'){
UID_HASH_KEY=Symbol(UID_HASH_KEY);}


var STRING_HASH_CACHE_MIN_STRLEN=16;
var STRING_HASH_CACHE_MAX_SIZE=255;
var STRING_HASH_CACHE_SIZE=0;
var stringHashCache={};

function assertNotInfinite(size){
invariant(
size!==Infinity,
'Cannot perform this action with an infinite size.');}



createClass(Map,KeyedCollection);



function Map(value){
return value===null||value===undefined?emptyMap():
isMap(value)&&!isOrdered(value)?value:
emptyMap().withMutations(function(map){
var iter=KeyedIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v,k){return map.set(k,v);});});}



Map.prototype.toString=function(){
return this.__toString('Map {','}');};




Map.prototype.get=function(k,notSetValue){
return this._root?
this._root.get(0,undefined,k,notSetValue):
notSetValue;};




Map.prototype.set=function(k,v){
return updateMap(this,k,v);};


Map.prototype.setIn=function(keyPath,v){
return this.updateIn(keyPath,NOT_SET,function(){return v;});};


Map.prototype.remove=function(k){
return updateMap(this,k,NOT_SET);};


Map.prototype.deleteIn=function(keyPath){
return this.updateIn(keyPath,function(){return NOT_SET;});};


Map.prototype.update=function(k,notSetValue,updater){
return arguments.length===1?
k(this):
this.updateIn([k],notSetValue,updater);};


Map.prototype.updateIn=function(keyPath,notSetValue,updater){
if(!updater){
updater=notSetValue;
notSetValue=undefined;}

var updatedValue=updateInDeepMap(
this,
forceIterator(keyPath),
notSetValue,
updater);

return updatedValue===NOT_SET?undefined:updatedValue;};


Map.prototype.clear=function(){
if(this.size===0){
return this;}

if(this.__ownerID){
this.size=0;
this._root=null;
this.__hash=undefined;
this.__altered=true;
return this;}

return emptyMap();};




Map.prototype.merge=function(){
return mergeIntoMapWith(this,undefined,arguments);};


Map.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoMapWith(this,merger,iters);};


Map.prototype.mergeIn=function(keyPath){var iters=SLICE$0.call(arguments,1);
return this.updateIn(
keyPath,
emptyMap(),
function(m){return typeof m.merge==='function'?
m.merge.apply(m,iters):
iters[iters.length-1];});};



Map.prototype.mergeDeep=function(){
return mergeIntoMapWith(this,deepMerger,arguments);};


Map.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoMapWith(this,deepMergerWith(merger),iters);};


Map.prototype.mergeDeepIn=function(keyPath){var iters=SLICE$0.call(arguments,1);
return this.updateIn(
keyPath,
emptyMap(),
function(m){return typeof m.mergeDeep==='function'?
m.mergeDeep.apply(m,iters):
iters[iters.length-1];});};



Map.prototype.sort=function(comparator){

return OrderedMap(sortFactory(this,comparator));};


Map.prototype.sortBy=function(mapper,comparator){

return OrderedMap(sortFactory(this,comparator,mapper));};




Map.prototype.withMutations=function(fn){
var mutable=this.asMutable();
fn(mutable);
return mutable.wasAltered()?mutable.__ensureOwner(this.__ownerID):this;};


Map.prototype.asMutable=function(){
return this.__ownerID?this:this.__ensureOwner(new OwnerID());};


Map.prototype.asImmutable=function(){
return this.__ensureOwner();};


Map.prototype.wasAltered=function(){
return this.__altered;};


Map.prototype.__iterator=function(type,reverse){
return new MapIterator(this,type,reverse);};


Map.prototype.__iterate=function(fn,reverse){var this$0=this;
var iterations=0;
this._root&&this._root.iterate(function(entry){
iterations++;
return fn(entry[1],entry[0],this$0);},
reverse);
return iterations;};


Map.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

if(!ownerID){
this.__ownerID=ownerID;
this.__altered=false;
return this;}

return makeMap(this.size,this._root,ownerID,this.__hash);};



function isMap(maybeMap){
return !!(maybeMap&&maybeMap[IS_MAP_SENTINEL]);}


Map.isMap=isMap;

var IS_MAP_SENTINEL='@@__IMMUTABLE_MAP__@@';

var MapPrototype=Map.prototype;
MapPrototype[IS_MAP_SENTINEL]=true;
MapPrototype[DELETE]=MapPrototype.remove;
MapPrototype.removeIn=MapPrototype.deleteIn;






function ArrayMapNode(ownerID,entries){
this.ownerID=ownerID;
this.entries=entries;}


ArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){
var entries=this.entries;
for(var ii=0,len=entries.length;ii<len;ii++){
if(is(key,entries[ii][0])){
return entries[ii][1];}}


return notSetValue;};


ArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
var removed=value===NOT_SET;

var entries=this.entries;
var idx=0;
for(var len=entries.length;idx<len;idx++){
if(is(key,entries[idx][0])){
break;}}


var exists=idx<len;

if(exists?entries[idx][1]===value:removed){
return this;}


SetRef(didAlter);
(removed||!exists)&&SetRef(didChangeSize);

if(removed&&entries.length===1){
return;}


if(!exists&&!removed&&entries.length>=MAX_ARRAY_MAP_SIZE){
return createNodes(ownerID,entries,key,value);}


var isEditable=ownerID&&ownerID===this.ownerID;
var newEntries=isEditable?entries:arrCopy(entries);

if(exists){
if(removed){
idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();}else 
{
newEntries[idx]=[key,value];}}else 

{
newEntries.push([key,value]);}


if(isEditable){
this.entries=newEntries;
return this;}


return new ArrayMapNode(ownerID,newEntries);};





function BitmapIndexedNode(ownerID,bitmap,nodes){
this.ownerID=ownerID;
this.bitmap=bitmap;
this.nodes=nodes;}


BitmapIndexedNode.prototype.get=function(shift,keyHash,key,notSetValue){
if(keyHash===undefined){
keyHash=hash(key);}

var bit=1<<((shift===0?keyHash:keyHash>>>shift)&MASK);
var bitmap=this.bitmap;
return (bitmap&bit)===0?notSetValue:
this.nodes[popCount(bitmap&bit-1)].get(shift+SHIFT,keyHash,key,notSetValue);};


BitmapIndexedNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);}

var keyHashFrag=(shift===0?keyHash:keyHash>>>shift)&MASK;
var bit=1<<keyHashFrag;
var bitmap=this.bitmap;
var exists=(bitmap&bit)!==0;

if(!exists&&value===NOT_SET){
return this;}


var idx=popCount(bitmap&bit-1);
var nodes=this.nodes;
var node=exists?nodes[idx]:undefined;
var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);

if(newNode===node){
return this;}


if(!exists&&newNode&&nodes.length>=MAX_BITMAP_INDEXED_SIZE){
return expandNodes(ownerID,nodes,bitmap,keyHashFrag,newNode);}


if(exists&&!newNode&&nodes.length===2&&isLeafNode(nodes[idx^1])){
return nodes[idx^1];}


if(exists&&newNode&&nodes.length===1&&isLeafNode(newNode)){
return newNode;}


var isEditable=ownerID&&ownerID===this.ownerID;
var newBitmap=exists?newNode?bitmap:bitmap^bit:bitmap|bit;
var newNodes=exists?newNode?
setIn(nodes,idx,newNode,isEditable):
spliceOut(nodes,idx,isEditable):
spliceIn(nodes,idx,newNode,isEditable);

if(isEditable){
this.bitmap=newBitmap;
this.nodes=newNodes;
return this;}


return new BitmapIndexedNode(ownerID,newBitmap,newNodes);};





function HashArrayMapNode(ownerID,count,nodes){
this.ownerID=ownerID;
this.count=count;
this.nodes=nodes;}


HashArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){
if(keyHash===undefined){
keyHash=hash(key);}

var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;
var node=this.nodes[idx];
return node?node.get(shift+SHIFT,keyHash,key,notSetValue):notSetValue;};


HashArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);}

var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;
var removed=value===NOT_SET;
var nodes=this.nodes;
var node=nodes[idx];

if(removed&&!node){
return this;}


var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);
if(newNode===node){
return this;}


var newCount=this.count;
if(!node){
newCount++;}else 
if(!newNode){
newCount--;
if(newCount<MIN_HASH_ARRAY_MAP_SIZE){
return packNodes(ownerID,nodes,newCount,idx);}}



var isEditable=ownerID&&ownerID===this.ownerID;
var newNodes=setIn(nodes,idx,newNode,isEditable);

if(isEditable){
this.count=newCount;
this.nodes=newNodes;
return this;}


return new HashArrayMapNode(ownerID,newCount,newNodes);};





function HashCollisionNode(ownerID,keyHash,entries){
this.ownerID=ownerID;
this.keyHash=keyHash;
this.entries=entries;}


HashCollisionNode.prototype.get=function(shift,keyHash,key,notSetValue){
var entries=this.entries;
for(var ii=0,len=entries.length;ii<len;ii++){
if(is(key,entries[ii][0])){
return entries[ii][1];}}


return notSetValue;};


HashCollisionNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);}


var removed=value===NOT_SET;

if(keyHash!==this.keyHash){
if(removed){
return this;}

SetRef(didAlter);
SetRef(didChangeSize);
return mergeIntoNode(this,ownerID,shift,keyHash,[key,value]);}


var entries=this.entries;
var idx=0;
for(var len=entries.length;idx<len;idx++){
if(is(key,entries[idx][0])){
break;}}


var exists=idx<len;

if(exists?entries[idx][1]===value:removed){
return this;}


SetRef(didAlter);
(removed||!exists)&&SetRef(didChangeSize);

if(removed&&len===2){
return new ValueNode(ownerID,this.keyHash,entries[idx^1]);}


var isEditable=ownerID&&ownerID===this.ownerID;
var newEntries=isEditable?entries:arrCopy(entries);

if(exists){
if(removed){
idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();}else 
{
newEntries[idx]=[key,value];}}else 

{
newEntries.push([key,value]);}


if(isEditable){
this.entries=newEntries;
return this;}


return new HashCollisionNode(ownerID,this.keyHash,newEntries);};





function ValueNode(ownerID,keyHash,entry){
this.ownerID=ownerID;
this.keyHash=keyHash;
this.entry=entry;}


ValueNode.prototype.get=function(shift,keyHash,key,notSetValue){
return is(key,this.entry[0])?this.entry[1]:notSetValue;};


ValueNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
var removed=value===NOT_SET;
var keyMatch=is(key,this.entry[0]);
if(keyMatch?value===this.entry[1]:removed){
return this;}


SetRef(didAlter);

if(removed){
SetRef(didChangeSize);
return;}


if(keyMatch){
if(ownerID&&ownerID===this.ownerID){
this.entry[1]=value;
return this;}

return new ValueNode(ownerID,this.keyHash,[key,value]);}


SetRef(didChangeSize);
return mergeIntoNode(this,ownerID,shift,hash(key),[key,value]);};






ArrayMapNode.prototype.iterate=
HashCollisionNode.prototype.iterate=function(fn,reverse){
var entries=this.entries;
for(var ii=0,maxIndex=entries.length-1;ii<=maxIndex;ii++){
if(fn(entries[reverse?maxIndex-ii:ii])===false){
return false;}}};




BitmapIndexedNode.prototype.iterate=
HashArrayMapNode.prototype.iterate=function(fn,reverse){
var nodes=this.nodes;
for(var ii=0,maxIndex=nodes.length-1;ii<=maxIndex;ii++){
var node=nodes[reverse?maxIndex-ii:ii];
if(node&&node.iterate(fn,reverse)===false){
return false;}}};




ValueNode.prototype.iterate=function(fn,reverse){
return fn(this.entry);};


createClass(MapIterator,Iterator);

function MapIterator(map,type,reverse){
this._type=type;
this._reverse=reverse;
this._stack=map._root&&mapIteratorFrame(map._root);}


MapIterator.prototype.next=function(){
var type=this._type;
var stack=this._stack;
while(stack){
var node=stack.node;
var index=stack.index++;
var maxIndex;
if(node.entry){
if(index===0){
return mapIteratorValue(type,node.entry);}}else 

if(node.entries){
maxIndex=node.entries.length-1;
if(index<=maxIndex){
return mapIteratorValue(type,node.entries[this._reverse?maxIndex-index:index]);}}else 

{
maxIndex=node.nodes.length-1;
if(index<=maxIndex){
var subNode=node.nodes[this._reverse?maxIndex-index:index];
if(subNode){
if(subNode.entry){
return mapIteratorValue(type,subNode.entry);}

stack=this._stack=mapIteratorFrame(subNode,stack);}

continue;}}


stack=this._stack=this._stack.__prev;}

return iteratorDone();};



function mapIteratorValue(type,entry){
return iteratorValue(type,entry[0],entry[1]);}


function mapIteratorFrame(node,prev){
return {
node:node,
index:0,
__prev:prev};}



function makeMap(size,root,ownerID,hash){
var map=Object.create(MapPrototype);
map.size=size;
map._root=root;
map.__ownerID=ownerID;
map.__hash=hash;
map.__altered=false;
return map;}


var EMPTY_MAP;
function emptyMap(){
return EMPTY_MAP||(EMPTY_MAP=makeMap(0));}


function updateMap(map,k,v){
var newRoot;
var newSize;
if(!map._root){
if(v===NOT_SET){
return map;}

newSize=1;
newRoot=new ArrayMapNode(map.__ownerID,[[k,v]]);}else 
{
var didChangeSize=MakeRef(CHANGE_LENGTH);
var didAlter=MakeRef(DID_ALTER);
newRoot=updateNode(map._root,map.__ownerID,0,undefined,k,v,didChangeSize,didAlter);
if(!didAlter.value){
return map;}

newSize=map.size+(didChangeSize.value?v===NOT_SET?-1:1:0);}

if(map.__ownerID){
map.size=newSize;
map._root=newRoot;
map.__hash=undefined;
map.__altered=true;
return map;}

return newRoot?makeMap(newSize,newRoot):emptyMap();}


function updateNode(node,ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(!node){
if(value===NOT_SET){
return node;}

SetRef(didAlter);
SetRef(didChangeSize);
return new ValueNode(ownerID,keyHash,[key,value]);}

return node.update(ownerID,shift,keyHash,key,value,didChangeSize,didAlter);}


function isLeafNode(node){
return node.constructor===ValueNode||node.constructor===HashCollisionNode;}


function mergeIntoNode(node,ownerID,shift,keyHash,entry){
if(node.keyHash===keyHash){
return new HashCollisionNode(ownerID,keyHash,[node.entry,entry]);}


var idx1=(shift===0?node.keyHash:node.keyHash>>>shift)&MASK;
var idx2=(shift===0?keyHash:keyHash>>>shift)&MASK;

var newNode;
var nodes=idx1===idx2?
[mergeIntoNode(node,ownerID,shift+SHIFT,keyHash,entry)]:(
newNode=new ValueNode(ownerID,keyHash,entry),idx1<idx2?[node,newNode]:[newNode,node]);

return new BitmapIndexedNode(ownerID,1<<idx1|1<<idx2,nodes);}


function createNodes(ownerID,entries,key,value){
if(!ownerID){
ownerID=new OwnerID();}

var node=new ValueNode(ownerID,hash(key),[key,value]);
for(var ii=0;ii<entries.length;ii++){
var entry=entries[ii];
node=node.update(ownerID,0,undefined,entry[0],entry[1]);}

return node;}


function packNodes(ownerID,nodes,count,excluding){
var bitmap=0;
var packedII=0;
var packedNodes=new Array(count);
for(var ii=0,bit=1,len=nodes.length;ii<len;ii++,bit<<=1){
var node=nodes[ii];
if(node!==undefined&&ii!==excluding){
bitmap|=bit;
packedNodes[packedII++]=node;}}


return new BitmapIndexedNode(ownerID,bitmap,packedNodes);}


function expandNodes(ownerID,nodes,bitmap,including,node){
var count=0;
var expandedNodes=new Array(SIZE);
for(var ii=0;bitmap!==0;ii++,bitmap>>>=1){
expandedNodes[ii]=bitmap&1?nodes[count++]:undefined;}

expandedNodes[including]=node;
return new HashArrayMapNode(ownerID,count+1,expandedNodes);}


function mergeIntoMapWith(map,merger,iterables){
var iters=[];
for(var ii=0;ii<iterables.length;ii++){
var value=iterables[ii];
var iter=KeyedIterable(value);
if(!isIterable(value)){
iter=iter.map(function(v){return fromJS(v);});}

iters.push(iter);}

return mergeIntoCollectionWith(map,merger,iters);}


function deepMerger(existing,value,key){
return existing&&existing.mergeDeep&&isIterable(value)?
existing.mergeDeep(value):
is(existing,value)?existing:value;}


function deepMergerWith(merger){
return function(existing,value,key){
if(existing&&existing.mergeDeepWith&&isIterable(value)){
return existing.mergeDeepWith(merger,value);}

var nextValue=merger(existing,value,key);
return is(existing,nextValue)?existing:nextValue;};}



function mergeIntoCollectionWith(collection,merger,iters){
iters=iters.filter(function(x){return x.size!==0;});
if(iters.length===0){
return collection;}

if(collection.size===0&&!collection.__ownerID&&iters.length===1){
return collection.constructor(iters[0]);}

return collection.withMutations(function(collection){
var mergeIntoMap=merger?
function(value,key){
collection.update(key,NOT_SET,function(existing)
{return existing===NOT_SET?value:merger(existing,value,key);});}:


function(value,key){
collection.set(key,value);};

for(var ii=0;ii<iters.length;ii++){
iters[ii].forEach(mergeIntoMap);}});}




function updateInDeepMap(existing,keyPathIter,notSetValue,updater){
var isNotSet=existing===NOT_SET;
var step=keyPathIter.next();
if(step.done){
var existingValue=isNotSet?notSetValue:existing;
var newValue=updater(existingValue);
return newValue===existingValue?existing:newValue;}

invariant(
isNotSet||existing&&existing.set,
'invalid keyPath');

var key=step.value;
var nextExisting=isNotSet?NOT_SET:existing.get(key,NOT_SET);
var nextUpdated=updateInDeepMap(
nextExisting,
keyPathIter,
notSetValue,
updater);

return nextUpdated===nextExisting?existing:
nextUpdated===NOT_SET?existing.remove(key):
(isNotSet?emptyMap():existing).set(key,nextUpdated);}


function popCount(x){
x=x-(x>>1&0x55555555);
x=(x&0x33333333)+(x>>2&0x33333333);
x=x+(x>>4)&0x0f0f0f0f;
x=x+(x>>8);
x=x+(x>>16);
return x&0x7f;}


function setIn(array,idx,val,canEdit){
var newArray=canEdit?array:arrCopy(array);
newArray[idx]=val;
return newArray;}


function spliceIn(array,idx,val,canEdit){
var newLen=array.length+1;
if(canEdit&&idx+1===newLen){
array[idx]=val;
return array;}

var newArray=new Array(newLen);
var after=0;
for(var ii=0;ii<newLen;ii++){
if(ii===idx){
newArray[ii]=val;
after=-1;}else 
{
newArray[ii]=array[ii+after];}}


return newArray;}


function spliceOut(array,idx,canEdit){
var newLen=array.length-1;
if(canEdit&&idx===newLen){
array.pop();
return array;}

var newArray=new Array(newLen);
var after=0;
for(var ii=0;ii<newLen;ii++){
if(ii===idx){
after=1;}

newArray[ii]=array[ii+after];}

return newArray;}


var MAX_ARRAY_MAP_SIZE=SIZE/4;
var MAX_BITMAP_INDEXED_SIZE=SIZE/2;
var MIN_HASH_ARRAY_MAP_SIZE=SIZE/4;

createClass(List,IndexedCollection);



function List(value){
var empty=emptyList();
if(value===null||value===undefined){
return empty;}

if(isList(value)){
return value;}

var iter=IndexedIterable(value);
var size=iter.size;
if(size===0){
return empty;}

assertNotInfinite(size);
if(size>0&&size<SIZE){
return makeList(0,size,SHIFT,null,new VNode(iter.toArray()));}

return empty.withMutations(function(list){
list.setSize(size);
iter.forEach(function(v,i){return list.set(i,v);});});}



List.of=function(){
return this(arguments);};


List.prototype.toString=function(){
return this.__toString('List [',']');};




List.prototype.get=function(index,notSetValue){
index=wrapIndex(this,index);
if(index>=0&&index<this.size){
index+=this._origin;
var node=listNodeFor(this,index);
return node&&node.array[index&MASK];}

return notSetValue;};




List.prototype.set=function(index,value){
return updateList(this,index,value);};


List.prototype.remove=function(index){
return !this.has(index)?this:
index===0?this.shift():
index===this.size-1?this.pop():
this.splice(index,1);};


List.prototype.insert=function(index,value){
return this.splice(index,0,value);};


List.prototype.clear=function(){
if(this.size===0){
return this;}

if(this.__ownerID){
this.size=this._origin=this._capacity=0;
this._level=SHIFT;
this._root=this._tail=null;
this.__hash=undefined;
this.__altered=true;
return this;}

return emptyList();};


List.prototype.push=function(){
var values=arguments;
var oldSize=this.size;
return this.withMutations(function(list){
setListBounds(list,0,oldSize+values.length);
for(var ii=0;ii<values.length;ii++){
list.set(oldSize+ii,values[ii]);}});};




List.prototype.pop=function(){
return setListBounds(this,0,-1);};


List.prototype.unshift=function(){
var values=arguments;
return this.withMutations(function(list){
setListBounds(list,-values.length);
for(var ii=0;ii<values.length;ii++){
list.set(ii,values[ii]);}});};




List.prototype.shift=function(){
return setListBounds(this,1);};




List.prototype.merge=function(){
return mergeIntoListWith(this,undefined,arguments);};


List.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoListWith(this,merger,iters);};


List.prototype.mergeDeep=function(){
return mergeIntoListWith(this,deepMerger,arguments);};


List.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoListWith(this,deepMergerWith(merger),iters);};


List.prototype.setSize=function(size){
return setListBounds(this,0,size);};




List.prototype.slice=function(begin,end){
var size=this.size;
if(wholeSlice(begin,end,size)){
return this;}

return setListBounds(
this,
resolveBegin(begin,size),
resolveEnd(end,size));};



List.prototype.__iterator=function(type,reverse){
var index=0;
var values=iterateList(this,reverse);
return new Iterator(function(){
var value=values();
return value===DONE?
iteratorDone():
iteratorValue(type,index++,value);});};



List.prototype.__iterate=function(fn,reverse){
var index=0;
var values=iterateList(this,reverse);
var value;
while((value=values())!==DONE){
if(fn(value,index++,this)===false){
break;}}


return index;};


List.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

if(!ownerID){
this.__ownerID=ownerID;
return this;}

return makeList(this._origin,this._capacity,this._level,this._root,this._tail,ownerID,this.__hash);};



function isList(maybeList){
return !!(maybeList&&maybeList[IS_LIST_SENTINEL]);}


List.isList=isList;

var IS_LIST_SENTINEL='@@__IMMUTABLE_LIST__@@';

var ListPrototype=List.prototype;
ListPrototype[IS_LIST_SENTINEL]=true;
ListPrototype[DELETE]=ListPrototype.remove;
ListPrototype.setIn=MapPrototype.setIn;
ListPrototype.deleteIn=
ListPrototype.removeIn=MapPrototype.removeIn;
ListPrototype.update=MapPrototype.update;
ListPrototype.updateIn=MapPrototype.updateIn;
ListPrototype.mergeIn=MapPrototype.mergeIn;
ListPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;
ListPrototype.withMutations=MapPrototype.withMutations;
ListPrototype.asMutable=MapPrototype.asMutable;
ListPrototype.asImmutable=MapPrototype.asImmutable;
ListPrototype.wasAltered=MapPrototype.wasAltered;



function VNode(array,ownerID){
this.array=array;
this.ownerID=ownerID;}




VNode.prototype.removeBefore=function(ownerID,level,index){
if(index===level?1<<level:0||this.array.length===0){
return this;}

var originIndex=index>>>level&MASK;
if(originIndex>=this.array.length){
return new VNode([],ownerID);}

var removingFirst=originIndex===0;
var newChild;
if(level>0){
var oldChild=this.array[originIndex];
newChild=oldChild&&oldChild.removeBefore(ownerID,level-SHIFT,index);
if(newChild===oldChild&&removingFirst){
return this;}}


if(removingFirst&&!newChild){
return this;}

var editable=editableVNode(this,ownerID);
if(!removingFirst){
for(var ii=0;ii<originIndex;ii++){
editable.array[ii]=undefined;}}


if(newChild){
editable.array[originIndex]=newChild;}

return editable;};


VNode.prototype.removeAfter=function(ownerID,level,index){
if(index===(level?1<<level:0)||this.array.length===0){
return this;}

var sizeIndex=index-1>>>level&MASK;
if(sizeIndex>=this.array.length){
return this;}


var newChild;
if(level>0){
var oldChild=this.array[sizeIndex];
newChild=oldChild&&oldChild.removeAfter(ownerID,level-SHIFT,index);
if(newChild===oldChild&&sizeIndex===this.array.length-1){
return this;}}



var editable=editableVNode(this,ownerID);
editable.array.splice(sizeIndex+1);
if(newChild){
editable.array[sizeIndex]=newChild;}

return editable;};




var DONE={};

function iterateList(list,reverse){
var left=list._origin;
var right=list._capacity;
var tailPos=getTailOffset(right);
var tail=list._tail;

return iterateNodeOrLeaf(list._root,list._level,0);

function iterateNodeOrLeaf(node,level,offset){
return level===0?
iterateLeaf(node,offset):
iterateNode(node,level,offset);}


function iterateLeaf(node,offset){
var array=offset===tailPos?tail&&tail.array:node&&node.array;
var from=offset>left?0:left-offset;
var to=right-offset;
if(to>SIZE){
to=SIZE;}

return function(){
if(from===to){
return DONE;}

var idx=reverse?--to:from++;
return array&&array[idx];};}



function iterateNode(node,level,offset){
var values;
var array=node&&node.array;
var from=offset>left?0:left-offset>>level;
var to=(right-offset>>level)+1;
if(to>SIZE){
to=SIZE;}

return function(){
do {
if(values){
var value=values();
if(value!==DONE){
return value;}

values=null;}

if(from===to){
return DONE;}

var idx=reverse?--to:from++;
values=iterateNodeOrLeaf(
array&&array[idx],level-SHIFT,offset+(idx<<level));}while(

true);};}}




function makeList(origin,capacity,level,root,tail,ownerID,hash){
var list=Object.create(ListPrototype);
list.size=capacity-origin;
list._origin=origin;
list._capacity=capacity;
list._level=level;
list._root=root;
list._tail=tail;
list.__ownerID=ownerID;
list.__hash=hash;
list.__altered=false;
return list;}


var EMPTY_LIST;
function emptyList(){
return EMPTY_LIST||(EMPTY_LIST=makeList(0,0,SHIFT));}


function updateList(list,index,value){
index=wrapIndex(list,index);

if(index!==index){
return list;}


if(index>=list.size||index<0){
return list.withMutations(function(list){
index<0?
setListBounds(list,index).set(0,value):
setListBounds(list,0,index+1).set(index,value);});}



index+=list._origin;

var newTail=list._tail;
var newRoot=list._root;
var didAlter=MakeRef(DID_ALTER);
if(index>=getTailOffset(list._capacity)){
newTail=updateVNode(newTail,list.__ownerID,0,index,value,didAlter);}else 
{
newRoot=updateVNode(newRoot,list.__ownerID,list._level,index,value,didAlter);}


if(!didAlter.value){
return list;}


if(list.__ownerID){
list._root=newRoot;
list._tail=newTail;
list.__hash=undefined;
list.__altered=true;
return list;}

return makeList(list._origin,list._capacity,list._level,newRoot,newTail);}


function updateVNode(node,ownerID,level,index,value,didAlter){
var idx=index>>>level&MASK;
var nodeHas=node&&idx<node.array.length;
if(!nodeHas&&value===undefined){
return node;}


var newNode;

if(level>0){
var lowerNode=node&&node.array[idx];
var newLowerNode=updateVNode(lowerNode,ownerID,level-SHIFT,index,value,didAlter);
if(newLowerNode===lowerNode){
return node;}

newNode=editableVNode(node,ownerID);
newNode.array[idx]=newLowerNode;
return newNode;}


if(nodeHas&&node.array[idx]===value){
return node;}


SetRef(didAlter);

newNode=editableVNode(node,ownerID);
if(value===undefined&&idx===newNode.array.length-1){
newNode.array.pop();}else 
{
newNode.array[idx]=value;}

return newNode;}


function editableVNode(node,ownerID){
if(ownerID&&node&&ownerID===node.ownerID){
return node;}

return new VNode(node?node.array.slice():[],ownerID);}


function listNodeFor(list,rawIndex){
if(rawIndex>=getTailOffset(list._capacity)){
return list._tail;}

if(rawIndex<1<<list._level+SHIFT){
var node=list._root;
var level=list._level;
while(node&&level>0){
node=node.array[rawIndex>>>level&MASK];
level-=SHIFT;}

return node;}}



function setListBounds(list,begin,end){


if(begin!==undefined){
begin=begin|0;}

if(end!==undefined){
end=end|0;}

var owner=list.__ownerID||new OwnerID();
var oldOrigin=list._origin;
var oldCapacity=list._capacity;
var newOrigin=oldOrigin+begin;
var newCapacity=end===undefined?oldCapacity:end<0?oldCapacity+end:oldOrigin+end;
if(newOrigin===oldOrigin&&newCapacity===oldCapacity){
return list;}



if(newOrigin>=newCapacity){
return list.clear();}


var newLevel=list._level;
var newRoot=list._root;


var offsetShift=0;
while(newOrigin+offsetShift<0){
newRoot=new VNode(newRoot&&newRoot.array.length?[undefined,newRoot]:[],owner);
newLevel+=SHIFT;
offsetShift+=1<<newLevel;}

if(offsetShift){
newOrigin+=offsetShift;
oldOrigin+=offsetShift;
newCapacity+=offsetShift;
oldCapacity+=offsetShift;}


var oldTailOffset=getTailOffset(oldCapacity);
var newTailOffset=getTailOffset(newCapacity);


while(newTailOffset>=1<<newLevel+SHIFT){
newRoot=new VNode(newRoot&&newRoot.array.length?[newRoot]:[],owner);
newLevel+=SHIFT;}



var oldTail=list._tail;
var newTail=newTailOffset<oldTailOffset?
listNodeFor(list,newCapacity-1):
newTailOffset>oldTailOffset?new VNode([],owner):oldTail;


if(oldTail&&newTailOffset>oldTailOffset&&newOrigin<oldCapacity&&oldTail.array.length){
newRoot=editableVNode(newRoot,owner);
var node=newRoot;
for(var level=newLevel;level>SHIFT;level-=SHIFT){
var idx=oldTailOffset>>>level&MASK;
node=node.array[idx]=editableVNode(node.array[idx],owner);}

node.array[oldTailOffset>>>SHIFT&MASK]=oldTail;}



if(newCapacity<oldCapacity){
newTail=newTail&&newTail.removeAfter(owner,0,newCapacity);}



if(newOrigin>=newTailOffset){
newOrigin-=newTailOffset;
newCapacity-=newTailOffset;
newLevel=SHIFT;
newRoot=null;
newTail=newTail&&newTail.removeBefore(owner,0,newOrigin);}else 


if(newOrigin>oldOrigin||newTailOffset<oldTailOffset){
offsetShift=0;


while(newRoot){
var beginIndex=newOrigin>>>newLevel&MASK;
if(beginIndex!==newTailOffset>>>newLevel&MASK){
break;}

if(beginIndex){
offsetShift+=(1<<newLevel)*beginIndex;}

newLevel-=SHIFT;
newRoot=newRoot.array[beginIndex];}



if(newRoot&&newOrigin>oldOrigin){
newRoot=newRoot.removeBefore(owner,newLevel,newOrigin-offsetShift);}

if(newRoot&&newTailOffset<oldTailOffset){
newRoot=newRoot.removeAfter(owner,newLevel,newTailOffset-offsetShift);}

if(offsetShift){
newOrigin-=offsetShift;
newCapacity-=offsetShift;}}



if(list.__ownerID){
list.size=newCapacity-newOrigin;
list._origin=newOrigin;
list._capacity=newCapacity;
list._level=newLevel;
list._root=newRoot;
list._tail=newTail;
list.__hash=undefined;
list.__altered=true;
return list;}

return makeList(newOrigin,newCapacity,newLevel,newRoot,newTail);}


function mergeIntoListWith(list,merger,iterables){
var iters=[];
var maxSize=0;
for(var ii=0;ii<iterables.length;ii++){
var value=iterables[ii];
var iter=IndexedIterable(value);
if(iter.size>maxSize){
maxSize=iter.size;}

if(!isIterable(value)){
iter=iter.map(function(v){return fromJS(v);});}

iters.push(iter);}

if(maxSize>list.size){
list=list.setSize(maxSize);}

return mergeIntoCollectionWith(list,merger,iters);}


function getTailOffset(size){
return size<SIZE?0:size-1>>>SHIFT<<SHIFT;}


createClass(OrderedMap,Map);



function OrderedMap(value){
return value===null||value===undefined?emptyOrderedMap():
isOrderedMap(value)?value:
emptyOrderedMap().withMutations(function(map){
var iter=KeyedIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v,k){return map.set(k,v);});});}



OrderedMap.of=function(){
return this(arguments);};


OrderedMap.prototype.toString=function(){
return this.__toString('OrderedMap {','}');};




OrderedMap.prototype.get=function(k,notSetValue){
var index=this._map.get(k);
return index!==undefined?this._list.get(index)[1]:notSetValue;};




OrderedMap.prototype.clear=function(){
if(this.size===0){
return this;}

if(this.__ownerID){
this.size=0;
this._map.clear();
this._list.clear();
return this;}

return emptyOrderedMap();};


OrderedMap.prototype.set=function(k,v){
return updateOrderedMap(this,k,v);};


OrderedMap.prototype.remove=function(k){
return updateOrderedMap(this,k,NOT_SET);};


OrderedMap.prototype.wasAltered=function(){
return this._map.wasAltered()||this._list.wasAltered();};


OrderedMap.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._list.__iterate(
function(entry){return entry&&fn(entry[1],entry[0],this$0);},
reverse);};



OrderedMap.prototype.__iterator=function(type,reverse){
return this._list.fromEntrySeq().__iterator(type,reverse);};


OrderedMap.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

var newMap=this._map.__ensureOwner(ownerID);
var newList=this._list.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
this._list=newList;
return this;}

return makeOrderedMap(newMap,newList,ownerID,this.__hash);};



function isOrderedMap(maybeOrderedMap){
return isMap(maybeOrderedMap)&&isOrdered(maybeOrderedMap);}


OrderedMap.isOrderedMap=isOrderedMap;

OrderedMap.prototype[IS_ORDERED_SENTINEL]=true;
OrderedMap.prototype[DELETE]=OrderedMap.prototype.remove;



function makeOrderedMap(map,list,ownerID,hash){
var omap=Object.create(OrderedMap.prototype);
omap.size=map?map.size:0;
omap._map=map;
omap._list=list;
omap.__ownerID=ownerID;
omap.__hash=hash;
return omap;}


var EMPTY_ORDERED_MAP;
function emptyOrderedMap(){
return EMPTY_ORDERED_MAP||(EMPTY_ORDERED_MAP=makeOrderedMap(emptyMap(),emptyList()));}


function updateOrderedMap(omap,k,v){
var map=omap._map;
var list=omap._list;
var i=map.get(k);
var has=i!==undefined;
var newMap;
var newList;
if(v===NOT_SET){
if(!has){
return omap;}

if(list.size>=SIZE&&list.size>=map.size*2){
newList=list.filter(function(entry,idx){return entry!==undefined&&i!==idx;});
newMap=newList.toKeyedSeq().map(function(entry){return entry[0];}).flip().toMap();
if(omap.__ownerID){
newMap.__ownerID=newList.__ownerID=omap.__ownerID;}}else 

{
newMap=map.remove(k);
newList=i===list.size-1?list.pop():list.set(i,undefined);}}else 

{
if(has){
if(v===list.get(i)[1]){
return omap;}

newMap=map;
newList=list.set(i,[k,v]);}else 
{
newMap=map.set(k,list.size);
newList=list.set(list.size,[k,v]);}}


if(omap.__ownerID){
omap.size=newMap.size;
omap._map=newMap;
omap._list=newList;
omap.__hash=undefined;
return omap;}

return makeOrderedMap(newMap,newList);}


createClass(ToKeyedSequence,KeyedSeq);
function ToKeyedSequence(indexed,useKeys){
this._iter=indexed;
this._useKeys=useKeys;
this.size=indexed.size;}


ToKeyedSequence.prototype.get=function(key,notSetValue){
return this._iter.get(key,notSetValue);};


ToKeyedSequence.prototype.has=function(key){
return this._iter.has(key);};


ToKeyedSequence.prototype.valueSeq=function(){
return this._iter.valueSeq();};


ToKeyedSequence.prototype.reverse=function(){var this$0=this;
var reversedSequence=reverseFactory(this,true);
if(!this._useKeys){
reversedSequence.valueSeq=function(){return this$0._iter.toSeq().reverse();};}

return reversedSequence;};


ToKeyedSequence.prototype.map=function(mapper,context){var this$0=this;
var mappedSequence=mapFactory(this,mapper,context);
if(!this._useKeys){
mappedSequence.valueSeq=function(){return this$0._iter.toSeq().map(mapper,context);};}

return mappedSequence;};


ToKeyedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
var ii;
return this._iter.__iterate(
this._useKeys?
function(v,k){return fn(v,k,this$0);}:(
ii=reverse?resolveSize(this):0,
function(v){return fn(v,reverse?--ii:ii++,this$0);}),
reverse);};



ToKeyedSequence.prototype.__iterator=function(type,reverse){
if(this._useKeys){
return this._iter.__iterator(type,reverse);}

var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
var ii=reverse?resolveSize(this):0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,reverse?--ii:ii++,step.value,step);});};



ToKeyedSequence.prototype[IS_ORDERED_SENTINEL]=true;


createClass(ToIndexedSequence,IndexedSeq);
function ToIndexedSequence(iter){
this._iter=iter;
this.size=iter.size;}


ToIndexedSequence.prototype.includes=function(value){
return this._iter.includes(value);};


ToIndexedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
var iterations=0;
return this._iter.__iterate(function(v){return fn(v,iterations++,this$0);},reverse);};


ToIndexedSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
var iterations=0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,iterations++,step.value,step);});};





createClass(ToSetSequence,SetSeq);
function ToSetSequence(iter){
this._iter=iter;
this.size=iter.size;}


ToSetSequence.prototype.has=function(key){
return this._iter.includes(key);};


ToSetSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._iter.__iterate(function(v){return fn(v,v,this$0);},reverse);};


ToSetSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,step.value,step.value,step);});};





createClass(FromEntriesSequence,KeyedSeq);
function FromEntriesSequence(entries){
this._iter=entries;
this.size=entries.size;}


FromEntriesSequence.prototype.entrySeq=function(){
return this._iter.toSeq();};


FromEntriesSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._iter.__iterate(function(entry){


if(entry){
validateEntry(entry);
var indexedIterable=isIterable(entry);
return fn(
indexedIterable?entry.get(1):entry[1],
indexedIterable?entry.get(0):entry[0],
this$0);}},


reverse);};


FromEntriesSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
return new Iterator(function(){
while(true){
var step=iterator.next();
if(step.done){
return step;}

var entry=step.value;


if(entry){
validateEntry(entry);
var indexedIterable=isIterable(entry);
return iteratorValue(
type,
indexedIterable?entry.get(0):entry[0],
indexedIterable?entry.get(1):entry[1],
step);}}});};







ToIndexedSequence.prototype.cacheResult=
ToKeyedSequence.prototype.cacheResult=
ToSetSequence.prototype.cacheResult=
FromEntriesSequence.prototype.cacheResult=
cacheResultThrough;


function flipFactory(iterable){
var flipSequence=makeSequence(iterable);
flipSequence._iter=iterable;
flipSequence.size=iterable.size;
flipSequence.flip=function(){return iterable;};
flipSequence.reverse=function(){
var reversedSequence=iterable.reverse.apply(this);
reversedSequence.flip=function(){return iterable.reverse();};
return reversedSequence;};

flipSequence.has=function(key){return iterable.includes(key);};
flipSequence.includes=function(key){return iterable.has(key);};
flipSequence.cacheResult=cacheResultThrough;
flipSequence.__iterateUncached=function(fn,reverse){var this$0=this;
return iterable.__iterate(function(v,k){return fn(k,v,this$0)!==false;},reverse);};

flipSequence.__iteratorUncached=function(type,reverse){
if(type===ITERATE_ENTRIES){
var iterator=iterable.__iterator(type,reverse);
return new Iterator(function(){
var step=iterator.next();
if(!step.done){
var k=step.value[0];
step.value[0]=step.value[1];
step.value[1]=k;}

return step;});}


return iterable.__iterator(
type===ITERATE_VALUES?ITERATE_KEYS:ITERATE_VALUES,
reverse);};


return flipSequence;}



function mapFactory(iterable,mapper,context){
var mappedSequence=makeSequence(iterable);
mappedSequence.size=iterable.size;
mappedSequence.has=function(key){return iterable.has(key);};
mappedSequence.get=function(key,notSetValue){
var v=iterable.get(key,NOT_SET);
return v===NOT_SET?
notSetValue:
mapper.call(context,v,key,iterable);};

mappedSequence.__iterateUncached=function(fn,reverse){var this$0=this;
return iterable.__iterate(
function(v,k,c){return fn(mapper.call(context,v,k,c),k,this$0)!==false;},
reverse);};


mappedSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
return new Iterator(function(){
var step=iterator.next();
if(step.done){
return step;}

var entry=step.value;
var key=entry[0];
return iteratorValue(
type,
key,
mapper.call(context,entry[1],key,iterable),
step);});};



return mappedSequence;}



function reverseFactory(iterable,useKeys){
var reversedSequence=makeSequence(iterable);
reversedSequence._iter=iterable;
reversedSequence.size=iterable.size;
reversedSequence.reverse=function(){return iterable;};
if(iterable.flip){
reversedSequence.flip=function(){
var flipSequence=flipFactory(iterable);
flipSequence.reverse=function(){return iterable.flip();};
return flipSequence;};}


reversedSequence.get=function(key,notSetValue)
{return iterable.get(useKeys?key:-1-key,notSetValue);};
reversedSequence.has=function(key)
{return iterable.has(useKeys?key:-1-key);};
reversedSequence.includes=function(value){return iterable.includes(value);};
reversedSequence.cacheResult=cacheResultThrough;
reversedSequence.__iterate=function(fn,reverse){var this$0=this;
return iterable.__iterate(function(v,k){return fn(v,k,this$0);},!reverse);};

reversedSequence.__iterator=
function(type,reverse){return iterable.__iterator(type,!reverse);};
return reversedSequence;}



function filterFactory(iterable,predicate,context,useKeys){
var filterSequence=makeSequence(iterable);
if(useKeys){
filterSequence.has=function(key){
var v=iterable.get(key,NOT_SET);
return v!==NOT_SET&&!!predicate.call(context,v,key,iterable);};

filterSequence.get=function(key,notSetValue){
var v=iterable.get(key,NOT_SET);
return v!==NOT_SET&&predicate.call(context,v,key,iterable)?
v:notSetValue;};}


filterSequence.__iterateUncached=function(fn,reverse){var this$0=this;
var iterations=0;
iterable.__iterate(function(v,k,c){
if(predicate.call(context,v,k,c)){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0);}},

reverse);
return iterations;};

filterSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var iterations=0;
return new Iterator(function(){
while(true){
var step=iterator.next();
if(step.done){
return step;}

var entry=step.value;
var key=entry[0];
var value=entry[1];
if(predicate.call(context,value,key,iterable)){
return iteratorValue(type,useKeys?key:iterations++,value,step);}}});};




return filterSequence;}



function countByFactory(iterable,grouper,context){
var groups=Map().asMutable();
iterable.__iterate(function(v,k){
groups.update(
grouper.call(context,v,k,iterable),
0,
function(a){return a+1;});});


return groups.asImmutable();}



function groupByFactory(iterable,grouper,context){
var isKeyedIter=isKeyed(iterable);
var groups=(isOrdered(iterable)?OrderedMap():Map()).asMutable();
iterable.__iterate(function(v,k){
groups.update(
grouper.call(context,v,k,iterable),
function(a){return a=a||[],a.push(isKeyedIter?[k,v]:v),a;});});


var coerce=iterableClass(iterable);
return groups.map(function(arr){return reify(iterable,coerce(arr));});}



function sliceFactory(iterable,begin,end,useKeys){
var originalSize=iterable.size;



if(begin!==undefined){
begin=begin|0;}

if(end!==undefined){
end=end|0;}


if(wholeSlice(begin,end,originalSize)){
return iterable;}


var resolvedBegin=resolveBegin(begin,originalSize);
var resolvedEnd=resolveEnd(end,originalSize);




if(resolvedBegin!==resolvedBegin||resolvedEnd!==resolvedEnd){
return sliceFactory(iterable.toSeq().cacheResult(),begin,end,useKeys);}






var resolvedSize=resolvedEnd-resolvedBegin;
var sliceSize;
if(resolvedSize===resolvedSize){
sliceSize=resolvedSize<0?0:resolvedSize;}


var sliceSeq=makeSequence(iterable);



sliceSeq.size=sliceSize===0?sliceSize:iterable.size&&sliceSize||undefined;

if(!useKeys&&isSeq(iterable)&&sliceSize>=0){
sliceSeq.get=function(index,notSetValue){
index=wrapIndex(this,index);
return index>=0&&index<sliceSize?
iterable.get(index+resolvedBegin,notSetValue):
notSetValue;};}



sliceSeq.__iterateUncached=function(fn,reverse){var this$0=this;
if(sliceSize===0){
return 0;}

if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var skipped=0;
var isSkipping=true;
var iterations=0;
iterable.__iterate(function(v,k){
if(!(isSkipping&&(isSkipping=skipped++<resolvedBegin))){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0)!==false&&
iterations!==sliceSize;}});


return iterations;};


sliceSeq.__iteratorUncached=function(type,reverse){
if(sliceSize!==0&&reverse){
return this.cacheResult().__iterator(type,reverse);}


var iterator=sliceSize!==0&&iterable.__iterator(type,reverse);
var skipped=0;
var iterations=0;
return new Iterator(function(){
while(skipped++<resolvedBegin){
iterator.next();}

if(++iterations>sliceSize){
return iteratorDone();}

var step=iterator.next();
if(useKeys||type===ITERATE_VALUES){
return step;}else 
if(type===ITERATE_KEYS){
return iteratorValue(type,iterations-1,undefined,step);}else 
{
return iteratorValue(type,iterations-1,step.value[1],step);}});};




return sliceSeq;}



function takeWhileFactory(iterable,predicate,context){
var takeSequence=makeSequence(iterable);
takeSequence.__iterateUncached=function(fn,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var iterations=0;
iterable.__iterate(function(v,k,c)
{return predicate.call(context,v,k,c)&&++iterations&&fn(v,k,this$0);});

return iterations;};

takeSequence.__iteratorUncached=function(type,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterator(type,reverse);}

var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var iterating=true;
return new Iterator(function(){
if(!iterating){
return iteratorDone();}

var step=iterator.next();
if(step.done){
return step;}

var entry=step.value;
var k=entry[0];
var v=entry[1];
if(!predicate.call(context,v,k,this$0)){
iterating=false;
return iteratorDone();}

return type===ITERATE_ENTRIES?step:
iteratorValue(type,k,v,step);});};


return takeSequence;}



function skipWhileFactory(iterable,predicate,context,useKeys){
var skipSequence=makeSequence(iterable);
skipSequence.__iterateUncached=function(fn,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var isSkipping=true;
var iterations=0;
iterable.__iterate(function(v,k,c){
if(!(isSkipping&&(isSkipping=predicate.call(context,v,k,c)))){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0);}});


return iterations;};

skipSequence.__iteratorUncached=function(type,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterator(type,reverse);}

var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var skipping=true;
var iterations=0;
return new Iterator(function(){
var step,k,v;
do {
step=iterator.next();
if(step.done){
if(useKeys||type===ITERATE_VALUES){
return step;}else 
if(type===ITERATE_KEYS){
return iteratorValue(type,iterations++,undefined,step);}else 
{
return iteratorValue(type,iterations++,step.value[1],step);}}


var entry=step.value;
k=entry[0];
v=entry[1];
skipping&&(skipping=predicate.call(context,v,k,this$0));}while(
skipping);
return type===ITERATE_ENTRIES?step:
iteratorValue(type,k,v,step);});};


return skipSequence;}



function concatFactory(iterable,values){
var isKeyedIterable=isKeyed(iterable);
var iters=[iterable].concat(values).map(function(v){
if(!isIterable(v)){
v=isKeyedIterable?
keyedSeqFromValue(v):
indexedSeqFromValue(Array.isArray(v)?v:[v]);}else 
if(isKeyedIterable){
v=KeyedIterable(v);}

return v;}).
filter(function(v){return v.size!==0;});

if(iters.length===0){
return iterable;}


if(iters.length===1){
var singleton=iters[0];
if(singleton===iterable||
isKeyedIterable&&isKeyed(singleton)||
isIndexed(iterable)&&isIndexed(singleton)){
return singleton;}}



var concatSeq=new ArraySeq(iters);
if(isKeyedIterable){
concatSeq=concatSeq.toKeyedSeq();}else 
if(!isIndexed(iterable)){
concatSeq=concatSeq.toSetSeq();}

concatSeq=concatSeq.flatten(true);
concatSeq.size=iters.reduce(
function(sum,seq){
if(sum!==undefined){
var size=seq.size;
if(size!==undefined){
return sum+size;}}},



0);

return concatSeq;}



function flattenFactory(iterable,depth,useKeys){
var flatSequence=makeSequence(iterable);
flatSequence.__iterateUncached=function(fn,reverse){
var iterations=0;
var stopped=false;
function flatDeep(iter,currentDepth){var this$0=this;
iter.__iterate(function(v,k){
if((!depth||currentDepth<depth)&&isIterable(v)){
flatDeep(v,currentDepth+1);}else 
if(fn(v,useKeys?k:iterations++,this$0)===false){
stopped=true;}

return !stopped;},
reverse);}

flatDeep(iterable,0);
return iterations;};

flatSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(type,reverse);
var stack=[];
var iterations=0;
return new Iterator(function(){
while(iterator){
var step=iterator.next();
if(step.done!==false){
iterator=stack.pop();
continue;}

var v=step.value;
if(type===ITERATE_ENTRIES){
v=v[1];}

if((!depth||stack.length<depth)&&isIterable(v)){
stack.push(iterator);
iterator=v.__iterator(type,reverse);}else 
{
return useKeys?step:iteratorValue(type,iterations++,v,step);}}


return iteratorDone();});};


return flatSequence;}



function flatMapFactory(iterable,mapper,context){
var coerce=iterableClass(iterable);
return iterable.toSeq().map(
function(v,k){return coerce(mapper.call(context,v,k,iterable));}).
flatten(true);}



function interposeFactory(iterable,separator){
var interposedSequence=makeSequence(iterable);
interposedSequence.size=iterable.size&&iterable.size*2-1;
interposedSequence.__iterateUncached=function(fn,reverse){var this$0=this;
var iterations=0;
iterable.__iterate(function(v,k)
{return (!iterations||fn(separator,iterations++,this$0)!==false)&&
fn(v,iterations++,this$0)!==false;},
reverse);

return iterations;};

interposedSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_VALUES,reverse);
var iterations=0;
var step;
return new Iterator(function(){
if(!step||iterations%2){
step=iterator.next();
if(step.done){
return step;}}


return iterations%2?
iteratorValue(type,iterations++,separator):
iteratorValue(type,iterations++,step.value,step);});};


return interposedSequence;}



function sortFactory(iterable,comparator,mapper){
if(!comparator){
comparator=defaultComparator;}

var isKeyedIterable=isKeyed(iterable);
var index=0;
var entries=iterable.toSeq().map(
function(v,k){return [k,v,index++,mapper?mapper(v,k,iterable):v];}).
toArray();
entries.sort(function(a,b){return comparator(a[3],b[3])||a[2]-b[2];}).forEach(
isKeyedIterable?
function(v,i){entries[i].length=2;}:
function(v,i){entries[i]=v[1];});

return isKeyedIterable?KeyedSeq(entries):
isIndexed(iterable)?IndexedSeq(entries):
SetSeq(entries);}



function maxFactory(iterable,comparator,mapper){
if(!comparator){
comparator=defaultComparator;}

if(mapper){
var entry=iterable.toSeq().
map(function(v,k){return [v,mapper(v,k,iterable)];}).
reduce(function(a,b){return maxCompare(comparator,a[1],b[1])?b:a;});
return entry&&entry[0];}else 
{
return iterable.reduce(function(a,b){return maxCompare(comparator,a,b)?b:a;});}}



function maxCompare(comparator,a,b){
var comp=comparator(b,a);


return comp===0&&b!==a&&(b===undefined||b===null||b!==b)||comp>0;}



function zipWithFactory(keyIter,zipper,iters){
var zipSequence=makeSequence(keyIter);
zipSequence.size=new ArraySeq(iters).map(function(i){return i.size;}).min();


zipSequence.__iterate=function(fn,reverse){













var iterator=this.__iterator(ITERATE_VALUES,reverse);
var step;
var iterations=0;
while(!(step=iterator.next()).done){
if(fn(step.value,iterations++,this)===false){
break;}}


return iterations;};

zipSequence.__iteratorUncached=function(type,reverse){
var iterators=iters.map(function(i)
{return i=Iterable(i),getIterator(reverse?i.reverse():i);});

var iterations=0;
var isDone=false;
return new Iterator(function(){
var steps;
if(!isDone){
steps=iterators.map(function(i){return i.next();});
isDone=steps.some(function(s){return s.done;});}

if(isDone){
return iteratorDone();}

return iteratorValue(
type,
iterations++,
zipper.apply(null,steps.map(function(s){return s.value;})));});};



return zipSequence;}





function reify(iter,seq){
return isSeq(iter)?seq:iter.constructor(seq);}


function validateEntry(entry){
if(entry!==Object(entry)){
throw new TypeError('Expected [K, V] tuple: '+entry);}}



function resolveSize(iter){
assertNotInfinite(iter.size);
return ensureSize(iter);}


function iterableClass(iterable){
return isKeyed(iterable)?KeyedIterable:
isIndexed(iterable)?IndexedIterable:
SetIterable;}


function makeSequence(iterable){
return Object.create(
(
isKeyed(iterable)?KeyedSeq:
isIndexed(iterable)?IndexedSeq:
SetSeq).
prototype);}



function cacheResultThrough(){
if(this._iter.cacheResult){
this._iter.cacheResult();
this.size=this._iter.size;
return this;}else 
{
return Seq.prototype.cacheResult.call(this);}}



function defaultComparator(a,b){
return a>b?1:a<b?-1:0;}


function forceIterator(keyPath){
var iter=getIterator(keyPath);
if(!iter){


if(!isArrayLike(keyPath)){
throw new TypeError('Expected iterable or array-like: '+keyPath);}

iter=getIterator(Iterable(keyPath));}

return iter;}


createClass(Record,KeyedCollection);

function Record(defaultValues,name){
var hasInitialized;

var RecordType=function Record(values){
if(values instanceof RecordType){
return values;}

if(!(this instanceof RecordType)){
return new RecordType(values);}

if(!hasInitialized){
hasInitialized=true;
var keys=Object.keys(defaultValues);
setProps(RecordTypePrototype,keys);
RecordTypePrototype.size=keys.length;
RecordTypePrototype._name=name;
RecordTypePrototype._keys=keys;
RecordTypePrototype._defaultValues=defaultValues;}

this._map=Map(values);};


var RecordTypePrototype=RecordType.prototype=Object.create(RecordPrototype);
RecordTypePrototype.constructor=RecordType;

return RecordType;}


Record.prototype.toString=function(){
return this.__toString(recordName(this)+' {','}');};




Record.prototype.has=function(k){
return this._defaultValues.hasOwnProperty(k);};


Record.prototype.get=function(k,notSetValue){
if(!this.has(k)){
return notSetValue;}

var defaultVal=this._defaultValues[k];
return this._map?this._map.get(k,defaultVal):defaultVal;};




Record.prototype.clear=function(){
if(this.__ownerID){
this._map&&this._map.clear();
return this;}

var RecordType=this.constructor;
return RecordType._empty||(RecordType._empty=makeRecord(this,emptyMap()));};


Record.prototype.set=function(k,v){
if(!this.has(k)){
throw new Error('Cannot set unknown key "'+k+'" on '+recordName(this));}

var newMap=this._map&&this._map.set(k,v);
if(this.__ownerID||newMap===this._map){
return this;}

return makeRecord(this,newMap);};


Record.prototype.remove=function(k){
if(!this.has(k)){
return this;}

var newMap=this._map&&this._map.remove(k);
if(this.__ownerID||newMap===this._map){
return this;}

return makeRecord(this,newMap);};


Record.prototype.wasAltered=function(){
return this._map.wasAltered();};


Record.prototype.__iterator=function(type,reverse){var this$0=this;
return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterator(type,reverse);};


Record.prototype.__iterate=function(fn,reverse){var this$0=this;
return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterate(fn,reverse);};


Record.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

var newMap=this._map&&this._map.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
return this;}

return makeRecord(this,newMap,ownerID);};



var RecordPrototype=Record.prototype;
RecordPrototype[DELETE]=RecordPrototype.remove;
RecordPrototype.deleteIn=
RecordPrototype.removeIn=MapPrototype.removeIn;
RecordPrototype.merge=MapPrototype.merge;
RecordPrototype.mergeWith=MapPrototype.mergeWith;
RecordPrototype.mergeIn=MapPrototype.mergeIn;
RecordPrototype.mergeDeep=MapPrototype.mergeDeep;
RecordPrototype.mergeDeepWith=MapPrototype.mergeDeepWith;
RecordPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;
RecordPrototype.setIn=MapPrototype.setIn;
RecordPrototype.update=MapPrototype.update;
RecordPrototype.updateIn=MapPrototype.updateIn;
RecordPrototype.withMutations=MapPrototype.withMutations;
RecordPrototype.asMutable=MapPrototype.asMutable;
RecordPrototype.asImmutable=MapPrototype.asImmutable;


function makeRecord(likeRecord,map,ownerID){
var record=Object.create(Object.getPrototypeOf(likeRecord));
record._map=map;
record.__ownerID=ownerID;
return record;}


function recordName(record){
return record._name||record.constructor.name||'Record';}


function setProps(prototype,names){
try{
names.forEach(setProp.bind(undefined,prototype));}
catch(error){}}




function setProp(prototype,name){
Object.defineProperty(prototype,name,{
get:function(){
return this.get(name);},

set:function(value){
invariant(this.__ownerID,'Cannot set on an immutable record.');
this.set(name,value);}});}




createClass(Set,SetCollection);



function Set(value){
return value===null||value===undefined?emptySet():
isSet(value)&&!isOrdered(value)?value:
emptySet().withMutations(function(set){
var iter=SetIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v){return set.add(v);});});}



Set.of=function(){
return this(arguments);};


Set.fromKeys=function(value){
return this(KeyedIterable(value).keySeq());};


Set.prototype.toString=function(){
return this.__toString('Set {','}');};




Set.prototype.has=function(value){
return this._map.has(value);};




Set.prototype.add=function(value){
return updateSet(this,this._map.set(value,true));};


Set.prototype.remove=function(value){
return updateSet(this,this._map.remove(value));};


Set.prototype.clear=function(){
return updateSet(this,this._map.clear());};




Set.prototype.union=function(){var iters=SLICE$0.call(arguments,0);
iters=iters.filter(function(x){return x.size!==0;});
if(iters.length===0){
return this;}

if(this.size===0&&!this.__ownerID&&iters.length===1){
return this.constructor(iters[0]);}

return this.withMutations(function(set){
for(var ii=0;ii<iters.length;ii++){
SetIterable(iters[ii]).forEach(function(value){return set.add(value);});}});};




Set.prototype.intersect=function(){var iters=SLICE$0.call(arguments,0);
if(iters.length===0){
return this;}

iters=iters.map(function(iter){return SetIterable(iter);});
var originalSet=this;
return this.withMutations(function(set){
originalSet.forEach(function(value){
if(!iters.every(function(iter){return iter.includes(value);})){
set.remove(value);}});});};





Set.prototype.subtract=function(){var iters=SLICE$0.call(arguments,0);
if(iters.length===0){
return this;}

iters=iters.map(function(iter){return SetIterable(iter);});
var originalSet=this;
return this.withMutations(function(set){
originalSet.forEach(function(value){
if(iters.some(function(iter){return iter.includes(value);})){
set.remove(value);}});});};





Set.prototype.merge=function(){
return this.union.apply(this,arguments);};


Set.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return this.union.apply(this,iters);};


Set.prototype.sort=function(comparator){

return OrderedSet(sortFactory(this,comparator));};


Set.prototype.sortBy=function(mapper,comparator){

return OrderedSet(sortFactory(this,comparator,mapper));};


Set.prototype.wasAltered=function(){
return this._map.wasAltered();};


Set.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._map.__iterate(function(_,k){return fn(k,k,this$0);},reverse);};


Set.prototype.__iterator=function(type,reverse){
return this._map.map(function(_,k){return k;}).__iterator(type,reverse);};


Set.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

var newMap=this._map.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
return this;}

return this.__make(newMap,ownerID);};



function isSet(maybeSet){
return !!(maybeSet&&maybeSet[IS_SET_SENTINEL]);}


Set.isSet=isSet;

var IS_SET_SENTINEL='@@__IMMUTABLE_SET__@@';

var SetPrototype=Set.prototype;
SetPrototype[IS_SET_SENTINEL]=true;
SetPrototype[DELETE]=SetPrototype.remove;
SetPrototype.mergeDeep=SetPrototype.merge;
SetPrototype.mergeDeepWith=SetPrototype.mergeWith;
SetPrototype.withMutations=MapPrototype.withMutations;
SetPrototype.asMutable=MapPrototype.asMutable;
SetPrototype.asImmutable=MapPrototype.asImmutable;

SetPrototype.__empty=emptySet;
SetPrototype.__make=makeSet;

function updateSet(set,newMap){
if(set.__ownerID){
set.size=newMap.size;
set._map=newMap;
return set;}

return newMap===set._map?set:
newMap.size===0?set.__empty():
set.__make(newMap);}


function makeSet(map,ownerID){
var set=Object.create(SetPrototype);
set.size=map?map.size:0;
set._map=map;
set.__ownerID=ownerID;
return set;}


var EMPTY_SET;
function emptySet(){
return EMPTY_SET||(EMPTY_SET=makeSet(emptyMap()));}


createClass(OrderedSet,Set);



function OrderedSet(value){
return value===null||value===undefined?emptyOrderedSet():
isOrderedSet(value)?value:
emptyOrderedSet().withMutations(function(set){
var iter=SetIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v){return set.add(v);});});}



OrderedSet.of=function(){
return this(arguments);};


OrderedSet.fromKeys=function(value){
return this(KeyedIterable(value).keySeq());};


OrderedSet.prototype.toString=function(){
return this.__toString('OrderedSet {','}');};



function isOrderedSet(maybeOrderedSet){
return isSet(maybeOrderedSet)&&isOrdered(maybeOrderedSet);}


OrderedSet.isOrderedSet=isOrderedSet;

var OrderedSetPrototype=OrderedSet.prototype;
OrderedSetPrototype[IS_ORDERED_SENTINEL]=true;

OrderedSetPrototype.__empty=emptyOrderedSet;
OrderedSetPrototype.__make=makeOrderedSet;

function makeOrderedSet(map,ownerID){
var set=Object.create(OrderedSetPrototype);
set.size=map?map.size:0;
set._map=map;
set.__ownerID=ownerID;
return set;}


var EMPTY_ORDERED_SET;
function emptyOrderedSet(){
return EMPTY_ORDERED_SET||(EMPTY_ORDERED_SET=makeOrderedSet(emptyOrderedMap()));}


createClass(Stack,IndexedCollection);



function Stack(value){
return value===null||value===undefined?emptyStack():
isStack(value)?value:
emptyStack().unshiftAll(value);}


Stack.of=function(){
return this(arguments);};


Stack.prototype.toString=function(){
return this.__toString('Stack [',']');};




Stack.prototype.get=function(index,notSetValue){
var head=this._head;
index=wrapIndex(this,index);
while(head&&index--){
head=head.next;}

return head?head.value:notSetValue;};


Stack.prototype.peek=function(){
return this._head&&this._head.value;};




Stack.prototype.push=function(){
if(arguments.length===0){
return this;}

var newSize=this.size+arguments.length;
var head=this._head;
for(var ii=arguments.length-1;ii>=0;ii--){
head={
value:arguments[ii],
next:head};}


if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;}

return makeStack(newSize,head);};


Stack.prototype.pushAll=function(iter){
iter=IndexedIterable(iter);
if(iter.size===0){
return this;}

assertNotInfinite(iter.size);
var newSize=this.size;
var head=this._head;
iter.reverse().forEach(function(value){
newSize++;
head={
value:value,
next:head};});


if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;}

return makeStack(newSize,head);};


Stack.prototype.pop=function(){
return this.slice(1);};


Stack.prototype.unshift=function(){
return this.push.apply(this,arguments);};


Stack.prototype.unshiftAll=function(iter){
return this.pushAll(iter);};


Stack.prototype.shift=function(){
return this.pop.apply(this,arguments);};


Stack.prototype.clear=function(){
if(this.size===0){
return this;}

if(this.__ownerID){
this.size=0;
this._head=undefined;
this.__hash=undefined;
this.__altered=true;
return this;}

return emptyStack();};


Stack.prototype.slice=function(begin,end){
if(wholeSlice(begin,end,this.size)){
return this;}

var resolvedBegin=resolveBegin(begin,this.size);
var resolvedEnd=resolveEnd(end,this.size);
if(resolvedEnd!==this.size){

return IndexedCollection.prototype.slice.call(this,begin,end);}

var newSize=this.size-resolvedBegin;
var head=this._head;
while(resolvedBegin--){
head=head.next;}

if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;}

return makeStack(newSize,head);};




Stack.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

if(!ownerID){
this.__ownerID=ownerID;
this.__altered=false;
return this;}

return makeStack(this.size,this._head,ownerID,this.__hash);};




Stack.prototype.__iterate=function(fn,reverse){
if(reverse){
return this.reverse().__iterate(fn);}

var iterations=0;
var node=this._head;
while(node){
if(fn(node.value,iterations++,this)===false){
break;}

node=node.next;}

return iterations;};


Stack.prototype.__iterator=function(type,reverse){
if(reverse){
return this.reverse().__iterator(type);}

var iterations=0;
var node=this._head;
return new Iterator(function(){
if(node){
var value=node.value;
node=node.next;
return iteratorValue(type,iterations++,value);}

return iteratorDone();});};




function isStack(maybeStack){
return !!(maybeStack&&maybeStack[IS_STACK_SENTINEL]);}


Stack.isStack=isStack;

var IS_STACK_SENTINEL='@@__IMMUTABLE_STACK__@@';

var StackPrototype=Stack.prototype;
StackPrototype[IS_STACK_SENTINEL]=true;
StackPrototype.withMutations=MapPrototype.withMutations;
StackPrototype.asMutable=MapPrototype.asMutable;
StackPrototype.asImmutable=MapPrototype.asImmutable;
StackPrototype.wasAltered=MapPrototype.wasAltered;


function makeStack(size,head,ownerID,hash){
var map=Object.create(StackPrototype);
map.size=size;
map._head=head;
map.__ownerID=ownerID;
map.__hash=hash;
map.__altered=false;
return map;}


var EMPTY_STACK;
function emptyStack(){
return EMPTY_STACK||(EMPTY_STACK=makeStack(0));}





function mixin(ctor,methods){
var keyCopier=function(key){ctor.prototype[key]=methods[key];};
Object.keys(methods).forEach(keyCopier);
Object.getOwnPropertySymbols&&
Object.getOwnPropertySymbols(methods).forEach(keyCopier);
return ctor;}


Iterable.Iterator=Iterator;

mixin(Iterable,{



toArray:function(){
assertNotInfinite(this.size);
var array=new Array(this.size||0);
this.valueSeq().__iterate(function(v,i){array[i]=v;});
return array;},


toIndexedSeq:function(){
return new ToIndexedSequence(this);},


toJS:function(){
return this.toSeq().map(
function(value){return value&&typeof value.toJS==='function'?value.toJS():value;}).
__toJS();},


toJSON:function(){
return this.toSeq().map(
function(value){return value&&typeof value.toJSON==='function'?value.toJSON():value;}).
__toJS();},


toKeyedSeq:function(){
return new ToKeyedSequence(this,true);},


toMap:function(){

return Map(this.toKeyedSeq());},


toObject:function(){
assertNotInfinite(this.size);
var object={};
this.__iterate(function(v,k){object[k]=v;});
return object;},


toOrderedMap:function(){

return OrderedMap(this.toKeyedSeq());},


toOrderedSet:function(){

return OrderedSet(isKeyed(this)?this.valueSeq():this);},


toSet:function(){

return Set(isKeyed(this)?this.valueSeq():this);},


toSetSeq:function(){
return new ToSetSequence(this);},


toSeq:function(){
return isIndexed(this)?this.toIndexedSeq():
isKeyed(this)?this.toKeyedSeq():
this.toSetSeq();},


toStack:function(){

return Stack(isKeyed(this)?this.valueSeq():this);},


toList:function(){

return List(isKeyed(this)?this.valueSeq():this);},





toString:function(){
return '[Iterable]';},


__toString:function(head,tail){
if(this.size===0){
return head+tail;}

return head+' '+this.toSeq().map(this.__toStringMapper).join(', ')+' '+tail;},





concat:function(){var values=SLICE$0.call(arguments,0);
return reify(this,concatFactory(this,values));},


includes:function(searchValue){
return this.some(function(value){return is(value,searchValue);});},


entries:function(){
return this.__iterator(ITERATE_ENTRIES);},


every:function(predicate,context){
assertNotInfinite(this.size);
var returnValue=true;
this.__iterate(function(v,k,c){
if(!predicate.call(context,v,k,c)){
returnValue=false;
return false;}});


return returnValue;},


filter:function(predicate,context){
return reify(this,filterFactory(this,predicate,context,true));},


find:function(predicate,context,notSetValue){
var entry=this.findEntry(predicate,context);
return entry?entry[1]:notSetValue;},


findEntry:function(predicate,context){
var found;
this.__iterate(function(v,k,c){
if(predicate.call(context,v,k,c)){
found=[k,v];
return false;}});


return found;},


findLastEntry:function(predicate,context){
return this.toSeq().reverse().findEntry(predicate,context);},


forEach:function(sideEffect,context){
assertNotInfinite(this.size);
return this.__iterate(context?sideEffect.bind(context):sideEffect);},


join:function(separator){
assertNotInfinite(this.size);
separator=separator!==undefined?''+separator:',';
var joined='';
var isFirst=true;
this.__iterate(function(v){
isFirst?isFirst=false:joined+=separator;
joined+=v!==null&&v!==undefined?v.toString():'';});

return joined;},


keys:function(){
return this.__iterator(ITERATE_KEYS);},


map:function(mapper,context){
return reify(this,mapFactory(this,mapper,context));},


reduce:function(reducer,initialReduction,context){
assertNotInfinite(this.size);
var reduction;
var useFirst;
if(arguments.length<2){
useFirst=true;}else 
{
reduction=initialReduction;}

this.__iterate(function(v,k,c){
if(useFirst){
useFirst=false;
reduction=v;}else 
{
reduction=reducer.call(context,reduction,v,k,c);}});


return reduction;},


reduceRight:function(reducer,initialReduction,context){
var reversed=this.toKeyedSeq().reverse();
return reversed.reduce.apply(reversed,arguments);},


reverse:function(){
return reify(this,reverseFactory(this,true));},


slice:function(begin,end){
return reify(this,sliceFactory(this,begin,end,true));},


some:function(predicate,context){
return !this.every(not(predicate),context);},


sort:function(comparator){
return reify(this,sortFactory(this,comparator));},


values:function(){
return this.__iterator(ITERATE_VALUES);},





butLast:function(){
return this.slice(0,-1);},


isEmpty:function(){
return this.size!==undefined?this.size===0:!this.some(function(){return true;});},


count:function(predicate,context){
return ensureSize(
predicate?this.toSeq().filter(predicate,context):this);},



countBy:function(grouper,context){
return countByFactory(this,grouper,context);},


equals:function(other){
return deepEqual(this,other);},


entrySeq:function(){
var iterable=this;
if(iterable._cache){

return new ArraySeq(iterable._cache);}

var entriesSequence=iterable.toSeq().map(entryMapper).toIndexedSeq();
entriesSequence.fromEntrySeq=function(){return iterable.toSeq();};
return entriesSequence;},


filterNot:function(predicate,context){
return this.filter(not(predicate),context);},


findLast:function(predicate,context,notSetValue){
return this.toKeyedSeq().reverse().find(predicate,context,notSetValue);},


first:function(){
return this.find(returnTrue);},


flatMap:function(mapper,context){
return reify(this,flatMapFactory(this,mapper,context));},


flatten:function(depth){
return reify(this,flattenFactory(this,depth,true));},


fromEntrySeq:function(){
return new FromEntriesSequence(this);},


get:function(searchKey,notSetValue){
return this.find(function(_,key){return is(key,searchKey);},undefined,notSetValue);},


getIn:function(searchKeyPath,notSetValue){
var nested=this;


var iter=forceIterator(searchKeyPath);
var step;
while(!(step=iter.next()).done){
var key=step.value;
nested=nested&&nested.get?nested.get(key,NOT_SET):NOT_SET;
if(nested===NOT_SET){
return notSetValue;}}


return nested;},


groupBy:function(grouper,context){
return groupByFactory(this,grouper,context);},


has:function(searchKey){
return this.get(searchKey,NOT_SET)!==NOT_SET;},


hasIn:function(searchKeyPath){
return this.getIn(searchKeyPath,NOT_SET)!==NOT_SET;},


isSubset:function(iter){
iter=typeof iter.includes==='function'?iter:Iterable(iter);
return this.every(function(value){return iter.includes(value);});},


isSuperset:function(iter){
iter=typeof iter.isSubset==='function'?iter:Iterable(iter);
return iter.isSubset(this);},


keySeq:function(){
return this.toSeq().map(keyMapper).toIndexedSeq();},


last:function(){
return this.toSeq().reverse().first();},


max:function(comparator){
return maxFactory(this,comparator);},


maxBy:function(mapper,comparator){
return maxFactory(this,comparator,mapper);},


min:function(comparator){
return maxFactory(this,comparator?neg(comparator):defaultNegComparator);},


minBy:function(mapper,comparator){
return maxFactory(this,comparator?neg(comparator):defaultNegComparator,mapper);},


rest:function(){
return this.slice(1);},


skip:function(amount){
return this.slice(Math.max(0,amount));},


skipLast:function(amount){
return reify(this,this.toSeq().reverse().skip(amount).reverse());},


skipWhile:function(predicate,context){
return reify(this,skipWhileFactory(this,predicate,context,true));},


skipUntil:function(predicate,context){
return this.skipWhile(not(predicate),context);},


sortBy:function(mapper,comparator){
return reify(this,sortFactory(this,comparator,mapper));},


take:function(amount){
return this.slice(0,Math.max(0,amount));},


takeLast:function(amount){
return reify(this,this.toSeq().reverse().take(amount).reverse());},


takeWhile:function(predicate,context){
return reify(this,takeWhileFactory(this,predicate,context));},


takeUntil:function(predicate,context){
return this.takeWhile(not(predicate),context);},


valueSeq:function(){
return this.toIndexedSeq();},





hashCode:function(){
return this.__hash||(this.__hash=hashIterable(this));}});















var IterablePrototype=Iterable.prototype;
IterablePrototype[IS_ITERABLE_SENTINEL]=true;
IterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.values;
IterablePrototype.__toJS=IterablePrototype.toArray;
IterablePrototype.__toStringMapper=quoteString;
IterablePrototype.inspect=
IterablePrototype.toSource=function(){return this.toString();};
IterablePrototype.chain=IterablePrototype.flatMap;
IterablePrototype.contains=IterablePrototype.includes;


(function(){
try{
Object.defineProperty(IterablePrototype,'length',{
get:function(){
if(!Iterable.noLengthWarning){
var stack;
try{
throw new Error();}
catch(error){
stack=error.stack;}

if(stack.indexOf('_wrapObject')===-1){
console&&console.warn&&console.warn(
'iterable.length has been deprecated, '+
'use iterable.size or iterable.count(). '+
'This warning will become a silent error in a future version. '+
stack);

return this.size;}}}});}




catch(e){}})();




mixin(KeyedIterable,{



flip:function(){
return reify(this,flipFactory(this));},


findKey:function(predicate,context){
var entry=this.findEntry(predicate,context);
return entry&&entry[0];},


findLastKey:function(predicate,context){
return this.toSeq().reverse().findKey(predicate,context);},


keyOf:function(searchValue){
return this.findKey(function(value){return is(value,searchValue);});},


lastKeyOf:function(searchValue){
return this.findLastKey(function(value){return is(value,searchValue);});},


mapEntries:function(mapper,context){var this$0=this;
var iterations=0;
return reify(this,
this.toSeq().map(
function(v,k){return mapper.call(context,[k,v],iterations++,this$0);}).
fromEntrySeq());},



mapKeys:function(mapper,context){var this$0=this;
return reify(this,
this.toSeq().flip().map(
function(k,v){return mapper.call(context,k,v,this$0);}).
flip());}});





var KeyedIterablePrototype=KeyedIterable.prototype;
KeyedIterablePrototype[IS_KEYED_SENTINEL]=true;
KeyedIterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.entries;
KeyedIterablePrototype.__toJS=IterablePrototype.toObject;
KeyedIterablePrototype.__toStringMapper=function(v,k){return JSON.stringify(k)+': '+quoteString(v);};



mixin(IndexedIterable,{



toKeyedSeq:function(){
return new ToKeyedSequence(this,false);},





filter:function(predicate,context){
return reify(this,filterFactory(this,predicate,context,false));},


findIndex:function(predicate,context){
var entry=this.findEntry(predicate,context);
return entry?entry[0]:-1;},


indexOf:function(searchValue){
var key=this.toKeyedSeq().keyOf(searchValue);
return key===undefined?-1:key;},


lastIndexOf:function(searchValue){
var key=this.toKeyedSeq().reverse().keyOf(searchValue);
return key===undefined?-1:key;},





reverse:function(){
return reify(this,reverseFactory(this,false));},


slice:function(begin,end){
return reify(this,sliceFactory(this,begin,end,false));},


splice:function(index,removeNum){
var numArgs=arguments.length;
removeNum=Math.max(removeNum|0,0);
if(numArgs===0||numArgs===2&&!removeNum){
return this;}




index=resolveBegin(index,index<0?this.count():this.size);
var spliced=this.slice(0,index);
return reify(
this,
numArgs===1?
spliced:
spliced.concat(arrCopy(arguments,2),this.slice(index+removeNum)));},






findLastIndex:function(predicate,context){
var key=this.toKeyedSeq().findLastKey(predicate,context);
return key===undefined?-1:key;},


first:function(){
return this.get(0);},


flatten:function(depth){
return reify(this,flattenFactory(this,depth,false));},


get:function(index,notSetValue){
index=wrapIndex(this,index);
return index<0||this.size===Infinity||
this.size!==undefined&&index>this.size?
notSetValue:
this.find(function(_,key){return key===index;},undefined,notSetValue);},


has:function(index){
index=wrapIndex(this,index);
return index>=0&&(this.size!==undefined?
this.size===Infinity||index<this.size:
this.indexOf(index)!==-1);},



interpose:function(separator){
return reify(this,interposeFactory(this,separator));},


interleave:function(){
var iterables=[this].concat(arrCopy(arguments));
var zipped=zipWithFactory(this.toSeq(),IndexedSeq.of,iterables);
var interleaved=zipped.flatten(true);
if(zipped.size){
interleaved.size=zipped.size*iterables.length;}

return reify(this,interleaved);},


last:function(){
return this.get(-1);},


skipWhile:function(predicate,context){
return reify(this,skipWhileFactory(this,predicate,context,false));},


zip:function(){
var iterables=[this].concat(arrCopy(arguments));
return reify(this,zipWithFactory(this,defaultZipper,iterables));},


zipWith:function(zipper){
var iterables=arrCopy(arguments);
iterables[0]=this;
return reify(this,zipWithFactory(this,zipper,iterables));}});




IndexedIterable.prototype[IS_INDEXED_SENTINEL]=true;
IndexedIterable.prototype[IS_ORDERED_SENTINEL]=true;



mixin(SetIterable,{



get:function(value,notSetValue){
return this.has(value)?value:notSetValue;},


includes:function(value){
return this.has(value);},





keySeq:function(){
return this.valueSeq();}});




SetIterable.prototype.has=IterablePrototype.includes;




mixin(KeyedSeq,KeyedIterable.prototype);
mixin(IndexedSeq,IndexedIterable.prototype);
mixin(SetSeq,SetIterable.prototype);

mixin(KeyedCollection,KeyedIterable.prototype);
mixin(IndexedCollection,IndexedIterable.prototype);
mixin(SetCollection,SetIterable.prototype);




function keyMapper(v,k){
return k;}


function entryMapper(v,k){
return [k,v];}


function not(predicate){
return function(){
return !predicate.apply(this,arguments);};}



function neg(predicate){
return function(){
return -predicate.apply(this,arguments);};}



function quoteString(value){
return typeof value==='string'?JSON.stringify(value):value;}


function defaultZipper(){
return arrCopy(arguments);}


function defaultNegComparator(a,b){
return a<b?1:a>b?-1:0;}


function hashIterable(iterable){
if(iterable.size===Infinity){
return 0;}

var ordered=isOrdered(iterable);
var keyed=isKeyed(iterable);
var h=ordered?1:0;
var size=iterable.__iterate(
keyed?
ordered?
function(v,k){h=31*h+hashMerge(hash(v),hash(k))|0;}:
function(v,k){h=h+hashMerge(hash(v),hash(k))|0;}:
ordered?
function(v){h=31*h+hash(v)|0;}:
function(v){h=h+hash(v)|0;});

return murmurHashOfSize(size,h);}


function murmurHashOfSize(size,h){
h=imul(h,0xCC9E2D51);
h=imul(h<<15|h>>>-15,0x1B873593);
h=imul(h<<13|h>>>-13,5);
h=(h+0xE6546B64|0)^size;
h=imul(h^h>>>16,0x85EBCA6B);
h=imul(h^h>>>13,0xC2B2AE35);
h=smi(h^h>>>16);
return h;}


function hashMerge(a,b){
return a^b+0x9E3779B9+(a<<6)+(a>>2)|0;}


var Immutable={

Iterable:Iterable,

Seq:Seq,
Collection:Collection,
Map:Map,
OrderedMap:OrderedMap,
List:List,
Stack:Stack,
Set:Set,
OrderedSet:OrderedSet,

Record:Record,
Range:Range,
Repeat:Repeat,

is:is,
fromJS:fromJS};



return Immutable;});
});
__d('guid',function(global, require, module, exports) {  'use strict';

























function guid(){
return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}


module.exports=guid;
});
__d('ReactCurrentOwner',function(global, require, module, exports) {  'use strict';


















var ReactCurrentOwner={





current:null};



module.exports=ReactCurrentOwner;
});
__d('fbjs/lib/invariant.js',function(global, require, module, exports) {  'use strict';























function invariant(condition,format,a,b,c,d,e,f){
if(process.env.NODE_ENV!=='production'){
if(format===undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format===undefined){
error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else 
{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(format.replace(/%s/g,function(){
return args[argIndex++];}));

error.name='Invariant Violation';}


error.framesToPop=1;
throw error;}}



module.exports=invariant;
});
__d('insetsDiffer',function(global, require, module, exports) {  'use strict';



















var dummyInsets={
top:undefined,
left:undefined,
right:undefined,
bottom:undefined};


var insetsDiffer=function(
one,
two)
{
one=one||dummyInsets;
two=two||dummyInsets;
return one!==two&&(
one.top!==two.top||
one.left!==two.left||
one.right!==two.right||
one.bottom!==two.bottom);};



module.exports=insetsDiffer;
});
__d('pointsDiffer',function(global, require, module, exports) {  'use strict';

















var dummyPoint={x:undefined,y:undefined};

var pointsDiffer=function(one,two){
one=one||dummyPoint;
two=two||dummyPoint;
return one!==two&&(
one.x!==two.x||
one.y!==two.y);};



module.exports=pointsDiffer;
});
__d('canDefineProperty',function(global, require, module, exports) {  'use strict';












var canDefineProperty=false;
if(process.env.NODE_ENV!=='production'){
try{
Object.defineProperty({},'x',{get:function(){}});
canDefineProperty=true;}
catch(x){}}




module.exports=canDefineProperty;
});
__d('fbjs/lib/emptyObject.js',function(global, require, module, exports) {  'use strict';












var emptyObject={};

if(process.env.NODE_ENV!=='production'){
Object.freeze(emptyObject);}


module.exports=emptyObject;
});
__d('ReactInstanceMap',function(global, require, module, exports) {  'use strict';




















var ReactInstanceMap={






remove:function(key){
key._reactInternalInstance=undefined;},


get:function(key){
return key._reactInternalInstance;},


has:function(key){
return key._reactInternalInstance!==undefined;},


set:function(key,value){
key._reactInternalInstance=value;}};




module.exports=ReactInstanceMap;
});
__d('deepFreezeAndThrowOnMutationInDev',function(global, require, module, exports) {  'use strict';






























function deepFreezeAndThrowOnMutationInDev(object){
if(__DEV__){
if(typeof object!=='object'||
object===null||
Object.isFrozen(object)||
Object.isSealed(object)){
return;}


for(var key in object){
if(object.hasOwnProperty(key)){
object.__defineGetter__(key,identity.bind(null,object[key]));
object.__defineSetter__(key,throwOnImmutableMutation.bind(null,key));}}



Object.freeze(object);
Object.seal(object);

for(var key in object){
if(object.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(object[key]);}}}}





function throwOnImmutableMutation(key,value){
throw Error(
'You attempted to set the key `'+key+'` with the value `'+
JSON.stringify(value)+'` on an object that is meant to be immutable '+
'and has been frozen.');}



function identity(value){
return value;}


module.exports=deepFreezeAndThrowOnMutationInDev;
});
__d('NodeHandle',function(global, require, module, exports) {  "use strict";




























































var NodeHandle={



injection:{
injectImplementation:function(Impl){
NodeHandle._Implementation=Impl;}},



_Implementation:null,





getRootNodeID:function(nodeHandle){
return NodeHandle._Implementation.getRootNodeID(nodeHandle);}};



module.exports=NodeHandle;
});
__d('shouldUpdateReactComponent',function(global, require, module, exports) {  'use strict';
























function shouldUpdateReactComponent(prevElement,nextElement){
var prevEmpty=prevElement===null||prevElement===false;
var nextEmpty=nextElement===null||nextElement===false;
if(prevEmpty||nextEmpty){
return prevEmpty===nextEmpty;}


var prevType=typeof prevElement;
var nextType=typeof nextElement;
if(prevType==='string'||prevType==='number'){
return nextType==='string'||nextType==='number';}else 
{
return nextType==='object'&&prevElement.type===nextElement.type&&prevElement.key===nextElement.key;}

return false;}


module.exports=shouldUpdateReactComponent;
});
__d('EventEmitterWithHolding',function(global, require, module, exports) {  'use strict';var 






























EventEmitterWithHolding=function(){







function EventEmitterWithHolding(emitter,holder){babelHelpers.classCallCheck(this,EventEmitterWithHolding);
this._emitter=emitter;
this._eventHolder=holder;
this._currentEventToken=null;
this._emittingHeldEvents=false;}babelHelpers.createClass(EventEmitterWithHolding,[{key:'addListener',value:function addListener(





eventType,listener,context){
return this._emitter.addListener(eventType,listener,context);}},{key:'once',value:function once(





eventType,listener,context){
return this._emitter.once(eventType,listener,context);}},{key:'addRetroactiveListener',value:function addRetroactiveListener(























eventType,listener,context){
var subscription=this._emitter.addListener(eventType,listener,context);

this._emittingHeldEvents=true;
this._eventHolder.emitToListener(eventType,listener,context);
this._emittingHeldEvents=false;

return subscription;}},{key:'removeAllListeners',value:function removeAllListeners(





eventType){
this._emitter.removeAllListeners(eventType);}},{key:'removeCurrentListener',value:function removeCurrentListener()





{
this._emitter.removeCurrentListener();}},{key:'listeners',value:function listeners(





eventType){
return this._emitter.listeners(eventType);}},{key:'emit',value:function emit(





eventType,a,b,c,d,e,_){
this._emitter.emit(eventType,a,b,c,d,e,_);}},{key:'emitAndHold',value:function emitAndHold(

















eventType,a,b,c,d,e,_){
this._currentEventToken=this._eventHolder.holdEvent(
eventType,
a,b,c,d,e,_);

this._emitter.emit(eventType,a,b,c,d,e,_);
this._currentEventToken=null;}},{key:'releaseCurrentEvent',value:function releaseCurrentEvent()





{
if(this._currentEventToken!==null){
this._eventHolder.releaseEvent(this._currentEventToken);}else 
if(this._emittingHeldEvents){
this._eventHolder.releaseCurrentEvent();}}},{key:'releaseHeldEventType',value:function releaseHeldEventType(







eventType){
this._eventHolder.releaseEventType(eventType);}}]);return EventEmitterWithHolding;}();



module.exports=EventEmitterWithHolding;
});
__d('copyProperties',function(global, require, module, exports) {  'use strict';























function copyProperties(obj,a,b,c,d,e,f){
obj=obj||{};

if(__DEV__){
if(f){
throw new Error('Too many arguments passed to copyProperties');}}



var args=[a,b,c,d,e];
var ii=0,v;
while(args[ii]){
v=args[ii++];
for(var k in v){
obj[k]=v[k];}




if(v.hasOwnProperty&&v.hasOwnProperty('toString')&&
typeof v.toString!='undefined'&&obj.toString!==v.toString){
obj.toString=v.toString;}}



return obj;}


module.exports=copyProperties;
});
__d('fbjs/lib/TouchEventUtils.js',function(global, require, module, exports) {  "use strict";











var TouchEventUtils={










extractSingleTouch:function(nativeEvent){
var touches=nativeEvent.touches;
var changedTouches=nativeEvent.changedTouches;
var hasTouches=touches&&touches.length>0;
var hasChangedTouches=changedTouches&&changedTouches.length>0;

return !hasTouches&&hasChangedTouches?changedTouches[0]:hasTouches?touches[0]:nativeEvent;}};



module.exports=TouchEventUtils;
});
__d('matricesDiffer',function(global, require, module, exports) {  'use strict';




















var matricesDiffer=function(one,two){
if(one===two){
return false;}

return !one||!two||
one[12]!==two[12]||
one[13]!==two[13]||
one[14]!==two[14]||
one[5]!==two[5]||
one[10]!==two[10]||
one[1]!==two[1]||
one[2]!==two[2]||
one[3]!==two[3]||
one[4]!==two[4]||
one[6]!==two[6]||
one[7]!==two[7]||
one[8]!==two[8]||
one[9]!==two[9]||
one[11]!==two[11]||
one[15]!==two[15];};


module.exports=matricesDiffer;
});
__d('sizesDiffer',function(global, require, module, exports) {  'use strict';






var dummySize={width:undefined,height:undefined};

var sizesDiffer=function(one,two){
one=one||dummySize;
two=two||dummySize;
return one!==two&&(
one.width!==two.width||
one.height!==two.height);};



module.exports=sizesDiffer;
});
__d('stringifySafe',function(global, require, module, exports) {  'use strict';
















function stringifySafe(arg){
var ret;
var type=typeof arg;
if(arg===undefined){
ret='undefined';}else 
if(arg===null){
ret='null';}else 
if(type==='string'){
ret='"'+arg+'"';}else 
if(type==='function'){
try{
ret=arg.toString();}
catch(e){
ret='[function unknown]';}}else 

{


try{
ret=JSON.stringify(arg);}
catch(e){
if(typeof arg.toString==='function'){
try{
ret=arg.toString();}
catch(E){}}}}



return ret||'["'+type+'" failed to stringify]';}


module.exports=stringifySafe;
});
__d('Object.assign',function(global, require, module, exports) {  'use strict';














function assign(target,sources){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');}


var to=Object(target);
var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var nextIndex=1;nextIndex<arguments.length;nextIndex++){
var nextSource=arguments[nextIndex];
if(nextSource==null){
continue;}


var from=Object(nextSource);






for(var key in from){
if(hasOwnProperty.call(from,key)){
to[key]=from[key];}}}




return to;}


module.exports=assign;
});
__d('SpringConfig',function(global, require, module, exports) {  'use strict';


















function tensionFromOrigamiValue(oValue){
return (oValue-30)*3.62+194;}


function frictionFromOrigamiValue(oValue){
return (oValue-8)*3+25;}


function fromOrigamiTensionAndFriction(
tension,
friction)
{
return {
tension:tensionFromOrigamiValue(tension),
friction:frictionFromOrigamiValue(friction)};}



function fromBouncinessAndSpeed(
bounciness,
speed)
{
function normalize(value,startValue,endValue){
return (value-startValue)/(endValue-startValue);}


function projectNormal(n,start,end){
return start+n*(end-start);}


function linearInterpolation(t,start,end){
return t*end+(1-t)*start;}


function quadraticOutInterpolation(t,start,end){
return linearInterpolation(2*t-t*t,start,end);}


function b3Friction1(x){
return 0.0007*Math.pow(x,3)-
0.031*Math.pow(x,2)+0.64*x+1.28;}


function b3Friction2(x){
return 0.000044*Math.pow(x,3)-
0.006*Math.pow(x,2)+0.36*x+2;}


function b3Friction3(x){
return 0.00000045*Math.pow(x,3)-
0.000332*Math.pow(x,2)+0.1078*x+5.84;}


function b3Nobounce(tension){
if(tension<=18){
return b3Friction1(tension);}else 
if(tension>18&&tension<=44){
return b3Friction2(tension);}else 
{
return b3Friction3(tension);}}



var b=normalize(bounciness/1.7,0,20);
b=projectNormal(b,0,0.8);
var s=normalize(speed/1.7,0,20);
var bouncyTension=projectNormal(s,0.5,200);
var bouncyFriction=quadraticOutInterpolation(
b,
b3Nobounce(bouncyTension),
0.01);


return {
tension:tensionFromOrigamiValue(bouncyTension),
friction:frictionFromOrigamiValue(bouncyFriction)};}



module.exports={
fromOrigamiTensionAndFriction:fromOrigamiTensionAndFriction,
fromBouncinessAndSpeed:fromBouncinessAndSpeed};
});
__d('normalizeColor',function(global, require, module, exports) {  'use strict';













function normalizeColor(color){
var match;

if(typeof color==='number'){
if(color>>>0===color&&color>=0&&color<=0xffffffff){
return color;}

return null;}



if(match=matchers.hex6.exec(color)){
return parseInt(match[1]+'ff',16)>>>0;}


if(names.hasOwnProperty(color)){
return names[color];}


if(match=matchers.rgb.exec(color)){
return (
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
0x000000ff)>>>
0;}


if(match=matchers.rgba.exec(color)){
return (
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
parse1(match[4]))>>>
0;}


if(match=matchers.hex3.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
'ff',
16)>>>
0;}



if(match=matchers.hex8.exec(color)){
return parseInt(match[1],16)>>>0;}


if(match=matchers.hex4.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
match[4]+match[4],
16)>>>
0;}


if(match=matchers.hsl.exec(color)){
return (
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

0x000000ff)>>>
0;}


if(match=matchers.hsla.exec(color)){
return (
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

parse1(match[4]))>>>
0;}


return null;}


function hue2rgb(p,q,t){
if(t<0){
t+=1;}

if(t>1){
t-=1;}

if(t<1/6){
return p+(q-p)*6*t;}

if(t<1/2){
return q;}

if(t<2/3){
return p+(q-p)*(2/3-t)*6;}

return p;}


function hslToRgb(h,s,l){
var q=l<0.5?l*(1+s):l+s-l*s;
var p=2*l-q;
var r=hue2rgb(p,q,h+1/3);
var g=hue2rgb(p,q,h);
var b=hue2rgb(p,q,h-1/3);

return (
Math.round(r*255)<<24|
Math.round(g*255)<<16|
Math.round(b*255)<<8);}




var NUMBER='[-+]?\\d*\\.?\\d+';
var PERCENTAGE=NUMBER+'%';

function call(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return '\\(\\s*('+args.join(')\\s*,\\s*(')+')\\s*\\)';}


var matchers={
rgb:new RegExp('rgb'+call(NUMBER,NUMBER,NUMBER)),
rgba:new RegExp('rgba'+call(NUMBER,NUMBER,NUMBER,NUMBER)),
hsl:new RegExp('hsl'+call(NUMBER,PERCENTAGE,PERCENTAGE)),
hsla:new RegExp('hsla'+call(NUMBER,PERCENTAGE,PERCENTAGE,NUMBER)),
hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex4:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex6:/^#([0-9a-fA-F]{6})$/,
hex8:/^#([0-9a-fA-F]{8})$/};


function parse255(str){
var int=parseInt(str,10);
if(int<0){
return 0;}

if(int>255){
return 255;}

return int;}


function parse360(str){
var int=parseFloat(str);
return (int%360+360)%360/360;}


function parse1(str){
var num=parseFloat(str);
if(num<0){
return 0;}

if(num>1){
return 255;}

return Math.round(num*255);}


function parsePercentage(str){

var int=parseFloat(str,10);
if(int<0){
return 0;}

if(int>100){
return 1;}

return int/100;}


var names={
transparent:0x00000000,


aliceblue:0xf0f8ffff,
antiquewhite:0xfaebd7ff,
aqua:0x00ffffff,
aquamarine:0x7fffd4ff,
azure:0xf0ffffff,
beige:0xf5f5dcff,
bisque:0xffe4c4ff,
black:0x000000ff,
blanchedalmond:0xffebcdff,
blue:0x0000ffff,
blueviolet:0x8a2be2ff,
brown:0xa52a2aff,
burlywood:0xdeb887ff,
burntsienna:0xea7e5dff,
cadetblue:0x5f9ea0ff,
chartreuse:0x7fff00ff,
chocolate:0xd2691eff,
coral:0xff7f50ff,
cornflowerblue:0x6495edff,
cornsilk:0xfff8dcff,
crimson:0xdc143cff,
cyan:0x00ffffff,
darkblue:0x00008bff,
darkcyan:0x008b8bff,
darkgoldenrod:0xb8860bff,
darkgray:0xa9a9a9ff,
darkgreen:0x006400ff,
darkgrey:0xa9a9a9ff,
darkkhaki:0xbdb76bff,
darkmagenta:0x8b008bff,
darkolivegreen:0x556b2fff,
darkorange:0xff8c00ff,
darkorchid:0x9932ccff,
darkred:0x8b0000ff,
darksalmon:0xe9967aff,
darkseagreen:0x8fbc8fff,
darkslateblue:0x483d8bff,
darkslategray:0x2f4f4fff,
darkslategrey:0x2f4f4fff,
darkturquoise:0x00ced1ff,
darkviolet:0x9400d3ff,
deeppink:0xff1493ff,
deepskyblue:0x00bfffff,
dimgray:0x696969ff,
dimgrey:0x696969ff,
dodgerblue:0x1e90ffff,
firebrick:0xb22222ff,
floralwhite:0xfffaf0ff,
forestgreen:0x228b22ff,
fuchsia:0xff00ffff,
gainsboro:0xdcdcdcff,
ghostwhite:0xf8f8ffff,
gold:0xffd700ff,
goldenrod:0xdaa520ff,
gray:0x808080ff,
green:0x008000ff,
greenyellow:0xadff2fff,
grey:0x808080ff,
honeydew:0xf0fff0ff,
hotpink:0xff69b4ff,
indianred:0xcd5c5cff,
indigo:0x4b0082ff,
ivory:0xfffff0ff,
khaki:0xf0e68cff,
lavender:0xe6e6faff,
lavenderblush:0xfff0f5ff,
lawngreen:0x7cfc00ff,
lemonchiffon:0xfffacdff,
lightblue:0xadd8e6ff,
lightcoral:0xf08080ff,
lightcyan:0xe0ffffff,
lightgoldenrodyellow:0xfafad2ff,
lightgray:0xd3d3d3ff,
lightgreen:0x90ee90ff,
lightgrey:0xd3d3d3ff,
lightpink:0xffb6c1ff,
lightsalmon:0xffa07aff,
lightseagreen:0x20b2aaff,
lightskyblue:0x87cefaff,
lightslategray:0x778899ff,
lightslategrey:0x778899ff,
lightsteelblue:0xb0c4deff,
lightyellow:0xffffe0ff,
lime:0x00ff00ff,
limegreen:0x32cd32ff,
linen:0xfaf0e6ff,
magenta:0xff00ffff,
maroon:0x800000ff,
mediumaquamarine:0x66cdaaff,
mediumblue:0x0000cdff,
mediumorchid:0xba55d3ff,
mediumpurple:0x9370dbff,
mediumseagreen:0x3cb371ff,
mediumslateblue:0x7b68eeff,
mediumspringgreen:0x00fa9aff,
mediumturquoise:0x48d1ccff,
mediumvioletred:0xc71585ff,
midnightblue:0x191970ff,
mintcream:0xf5fffaff,
mistyrose:0xffe4e1ff,
moccasin:0xffe4b5ff,
navajowhite:0xffdeadff,
navy:0x000080ff,
oldlace:0xfdf5e6ff,
olive:0x808000ff,
olivedrab:0x6b8e23ff,
orange:0xffa500ff,
orangered:0xff4500ff,
orchid:0xda70d6ff,
palegoldenrod:0xeee8aaff,
palegreen:0x98fb98ff,
paleturquoise:0xafeeeeff,
palevioletred:0xdb7093ff,
papayawhip:0xffefd5ff,
peachpuff:0xffdab9ff,
peru:0xcd853fff,
pink:0xffc0cbff,
plum:0xdda0ddff,
powderblue:0xb0e0e6ff,
purple:0x800080ff,
rebeccapurple:0x663399ff,
red:0xff0000ff,
rosybrown:0xbc8f8fff,
royalblue:0x4169e1ff,
saddlebrown:0x8b4513ff,
salmon:0xfa8072ff,
sandybrown:0xf4a460ff,
seagreen:0x2e8b57ff,
seashell:0xfff5eeff,
sienna:0xa0522dff,
silver:0xc0c0c0ff,
skyblue:0x87ceebff,
slateblue:0x6a5acdff,
slategray:0x708090ff,
slategrey:0x708090ff,
snow:0xfffafaff,
springgreen:0x00ff7fff,
steelblue:0x4682b4ff,
tan:0xd2b48cff,
teal:0x008080ff,
thistle:0xd8bfd8ff,
tomato:0xff6347ff,
turquoise:0x40e0d0ff,
violet:0xee82eeff,
wheat:0xf5deb3ff,
white:0xffffffff,
whitesmoke:0xf5f5f5ff,
yellow:0xffff00ff,
yellowgreen:0x9acd32ff};


module.exports=normalizeColor;
});
__d('fbjs/lib/nativeRequestAnimationFrame.js',function(global, require, module, exports) {  "use strict";











var nativeRequestAnimationFrame=global.requestAnimationFrame||global.webkitRequestAnimationFrame||global.mozRequestAnimationFrame||global.oRequestAnimationFrame||global.msRequestAnimationFrame;

module.exports=nativeRequestAnimationFrame;
});
__d('resolveBoxStyle',function(global, require, module, exports) {  'use strict';





















function resolveBoxStyle(prefix,style){
var res={};
var subs=['top','left','bottom','right'];
var set=false;
subs.forEach(function(sub){
res[sub]=style[prefix]||0;});

if(style[prefix]){
set=true;}

if(style[prefix+'Vertical']){
res.top=res.bottom=style[prefix+'Vertical'];
set=true;}

if(style[prefix+'Horizontal']){
res.left=res.right=style[prefix+'Horizontal'];
set=true;}

subs.forEach(function(sub){
var val=style[prefix+capFirst(sub)];
if(val){
res[sub]=val;
set=true;}});


if(!set){
return;}

return res;}


function capFirst(text){
return text[0].toUpperCase()+text.slice(1);}


module.exports=resolveBoxStyle;
});
__d('mapWithSeparator',function(global, require, module, exports) {  'use strict';






function mapWithSeparator(array,valueFunction,separatorFunction){
var results=[];
for(var i=0;i<array.length;i++){
results.push(valueFunction(array[i],i,array));
if(i!==array.length-1){
results.push(separatorFunction(i));}}


return results;}


module.exports=mapWithSeparator;
});
__d('logError',function(global, require, module, exports) {  'use strict';

















var logError=function(){
if(arguments.length===1&&arguments[0] instanceof Error){
var err=arguments[0];
console.error('Error: "'+err.message+'".  Stack:\n'+err.stack);}else 
{
console.error.apply(console,arguments);}};



module.exports=logError;
});
__d('deprecatedCallback',function(global, require, module, exports) {  'use strict';















module.exports=function(promise,callbacks,type,warning){
if(callbacks.length===0){
return promise;}


var success=void 0,error=void 0,callback=void 0;

console.warn(warning);

switch(type){
case 'success-first':var _callbacks=babelHelpers.slicedToArray(
callbacks,2);success=_callbacks[0];error=_callbacks[1];
return promise.then(
function(res){return success(res);},
function(err){return error&&error(err);});

case 'error-first':var _callbacks2=babelHelpers.slicedToArray(
callbacks,2);error=_callbacks2[0];success=_callbacks2[1];
return promise.then(
function(res){return success(res);},
function(err){return error(err);});

case 'single-callback-value-first':var _callbacks3=babelHelpers.slicedToArray(
callbacks,1);callback=_callbacks3[0];
return promise.then(
function(res){return callback(res);},
function(err){return callback(null,err);});

case 'node':var _callbacks4=babelHelpers.slicedToArray(
callbacks,1);callback=_callbacks4[0];
return promise.then(
function(res){return callback(null,res);},
function(err){return callback(err);});

default:
throw new Error('Type of callbacks not specified. Must be one of \'success-first\', \'error-first\', \'single-callback-value-first\', or \'node\'');}};
});
__d('bezier',function(global, require, module, exports) {  "use strict";





























module.exports=function(x1,y1,x2,y2,epsilon){

var curveX=function(t){
var v=1-t;
return 3*v*v*t*x1+3*v*t*t*x2+t*t*t;};


var curveY=function(t){
var v=1-t;
return 3*v*v*t*y1+3*v*t*t*y2+t*t*t;};


var derivativeCurveX=function(t){
var v=1-t;
return 3*(2*(t-1)*t+v*v)*x1+3*(-t*t*t+2*v*t)*x2;};


return function(t){

var x=t,t0,t1,t2,x2,d2,i;


for(t2=x,i=0;i<8;i++){
x2=curveX(t2)-x;
if(Math.abs(x2)<epsilon){return curveY(t2);}
d2=derivativeCurveX(t2);
if(Math.abs(d2)<1e-6){break;}
t2=t2-x2/d2;}


t0=0;
t1=1;
t2=x;

if(t2<t0){return curveY(t0);}
if(t2>t1){return curveY(t1);}


while(t0<t1){
x2=curveX(t2);
if(Math.abs(x2-x)<epsilon){return curveY(t2);}
if(x>x2){t0=t2;}else 
{t1=t2;}
t2=(t1-t0)*0.5+t0;}



return curveY(t2);};};
});
__d('ErrorUtils',function(global, require, module, exports) {  "use strict";











var GLOBAL=this;













module.exports=GLOBAL.ErrorUtils;
});
__d('toIterator',function(global, require, module, exports) {  'use strict';






























var KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VAL='key+value';

var ITERATOR_SYMBOL=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';

var toIterator=function(){
if(!(Array.prototype[ITERATOR_SYMBOL]&&
String.prototype[ITERATOR_SYMBOL])){

return function(){var 
ArrayIterator=function(){

function ArrayIterator(array,kind){babelHelpers.classCallCheck(this,ArrayIterator);
if(!Array.isArray(array)){
throw new TypeError('Object is not an Array');}

this._iteratedObject=array;
this._kind=kind;
this._nextIndex=0;}babelHelpers.createClass(ArrayIterator,[{key:'next',value:function next()



{
if(!this instanceof ArrayIterator){
throw new TypeError('Object is not an ArrayIterator');}


if(this._iteratedObject==null){
return createIterResultObject(undefined,true);}


var array=this._iteratedObject;
var len=this._iteratedObject.length;
var index=this._nextIndex;
var kind=this._kind;

if(index>=len){
this._iteratedObject=undefined;
return createIterResultObject(undefined,true);}


this._nextIndex=index+1;

if(kind===KIND_KEY){
return createIterResultObject(index,false);}else 
if(kind===KIND_VALUE){
return createIterResultObject(array[index],false);}else 
if(kind===KIND_KEY_VAL){
return createIterResultObject([index,array[index]],false);}}},{key:




'@@iterator',value:function iterator(){
return this;}}]);return ArrayIterator;}();var 



StringIterator=function(){

function StringIterator(string){babelHelpers.classCallCheck(this,StringIterator);
if(typeof string!=='string'){
throw new TypeError('Object is not a string');}

this._iteratedString=string;
this._nextIndex=0;}babelHelpers.createClass(StringIterator,[{key:'next',value:function next()



{
if(!this instanceof StringIterator){
throw new TypeError('Object is not a StringIterator');}


if(this._iteratedString==null){
return createIterResultObject(undefined,true);}


var index=this._nextIndex;
var s=this._iteratedString;
var len=s.length;

if(index>=len){
this._iteratedString=undefined;
return createIterResultObject(undefined,true);}


var ret;
var first=s.charCodeAt(index);

if(first<0xD800||first>0xDBFF||index+1===len){
ret=s[index];}else 
{
var second=s.charCodeAt(index+1);
if(second<0xDC00||second>0xDFFF){
ret=s[index];}else 
{
ret=s[index]+s[index+1];}}



this._nextIndex=index+ret.length;

return createIterResultObject(ret,false);}},{key:



'@@iterator',value:function iterator(){
return this;}}]);return StringIterator;}();




function createIterResultObject(value,done){
return {value:value,done:done};}


return function(object,kind){
if(typeof object==='string'){
return new StringIterator(object);}else 
if(Array.isArray(object)){
return new ArrayIterator(object,kind||KIND_VALUE);}else 
{
return object[ITERATOR_SYMBOL]();}};}();}else 



{
return function(object){
return object[ITERATOR_SYMBOL]();};}}();








babelHelpers.extends(toIterator,{
KIND_KEY:KIND_KEY,
KIND_VALUE:KIND_VALUE,
KIND_KEY_VAL:KIND_KEY_VAL,
ITERATOR_SYMBOL:ITERATOR_SYMBOL});


module.exports=toIterator;
});
__d('_shouldPolyfillES6Collection',function(global, require, module, exports) {  'use strict';
























function shouldPolyfillES6Collection(collectionName){
var Collection=global[collectionName];
if(Collection==null){
return true;}






if(typeof global.Symbol!=='function'){
return true;}


var proto=Collection.prototype;




return Collection==null||
typeof Collection!=='function'||
typeof proto.clear!=='function'||
new Collection().size!==0||
typeof proto.keys!=='function'||
typeof proto.forEach!=='function';}


module.exports=shouldPolyfillES6Collection;
});
__d('ImmediateImplementation',function(global, require, module, exports) {  "use strict"; /**
 * @generated SignedSource<<57d0446bbd1186485d372efe6b323dca>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic
 * Denicola
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @preserve-header
 * @providesModule ImmediateImplementation
 */

(function(global,undefined){
"use strict";

var nextHandle=1;
var tasksByHandle={};
var queueHead={};
var queueTail=queueHead;
var currentlyRunningATask=false;
var doc=global.document;
var setImmediate;

function addFromSetImmediateArguments(args){
var handler=args[0];
args=Array.prototype.slice.call(args,1);
tasksByHandle[nextHandle]=function(){
handler.apply(undefined,args);};

queueTail=queueTail.next={handle:nextHandle++};
return queueTail.handle;}


function flushQueue(){
var next,task;
while(!currentlyRunningATask&&(next=queueHead.next)){
queueHead=next;
if(task=tasksByHandle[next.handle]){
currentlyRunningATask=true;
try{
task();
currentlyRunningATask=false;}finally 
{
clearImmediate(next.handle);
if(currentlyRunningATask){
currentlyRunningATask=false;






if(queueHead.next){
setImmediate(flushQueue);}}}}}}







function clearImmediate(handle){
delete tasksByHandle[handle];}


function canUsePostMessage(){


if(global.postMessage&&!global.importScripts){
var postMessageIsAsynchronous=true;

var onMessage=function(){
postMessageIsAsynchronous=false;
if(global.removeEventListener){
global.removeEventListener("message",onMessage,false);}else 
{
global.detachEvent("onmessage",onMessage);}};



if(global.addEventListener){
global.addEventListener("message",onMessage,false);}else 
if(global.attachEvent){
global.attachEvent("onmessage",onMessage);}else 
{
return false;}


global.postMessage("","*");
return postMessageIsAsynchronous;}}



function installPostMessageImplementation(){


var messagePrefix="setImmediate$"+Math.random()+"$";
var onGlobalMessage=function(event){
if(event.source===global&&
typeof event.data==="string"&&
event.data.indexOf(messagePrefix)===0){
flushQueue();}};



if(global.addEventListener){
global.addEventListener("message",onGlobalMessage,false);}else 
{
global.attachEvent("onmessage",onGlobalMessage);}


setImmediate=function(){
var handle=addFromSetImmediateArguments(arguments);
global.postMessage(messagePrefix+handle,"*");
return handle;};}



function installMessageChannelImplementation(){
var channel=new MessageChannel();
channel.port1.onmessage=flushQueue;
setImmediate=function(){
var handle=addFromSetImmediateArguments(arguments);
channel.port2.postMessage(handle);
return handle;};}



function installReadyStateChangeImplementation(){
var html=doc.documentElement;
setImmediate=function(){
var handle=addFromSetImmediateArguments(arguments);


var script=doc.createElement("script");
script.onreadystatechange=function(){
script.onreadystatechange=null;
html.removeChild(script);
script=null;
flushQueue();};

html.appendChild(script);
return handle;};}



function installSetTimeoutImplementation(){
setImmediate=function(){
setTimeout(flushQueue,0);
return addFromSetImmediateArguments(arguments);};}



if(canUsePostMessage()){

installPostMessageImplementation();}else 

if(global.MessageChannel){

installMessageChannelImplementation();}else 

if(doc&&"onreadystatechange" in doc.createElement("script")){

installReadyStateChangeImplementation();}else 

{

installSetTimeoutImplementation();}


exports.setImmediate=setImmediate;
exports.clearImmediate=clearImmediate;})(
Function("return this")());
});
__d('fbjs/lib/isNode.js',function(global, require, module, exports) {  'use strict';
















function isNode(object){
return !!(object&&(typeof Node==='function'?object instanceof Node:typeof object==='object'&&typeof object.nodeType==='number'&&typeof object.nodeName==='string'));}


module.exports=isNode;
});
__d('TouchHistoryMath',function(global, require, module, exports) {  "use strict";





var TouchHistoryMath={
















centroidDimension:function(touchHistory,touchesChangedAfter,isXAxis,ofCurrent){
var touchBank=touchHistory.touchBank;
var total=0;
var count=0;

var oneTouchData=touchHistory.numberActiveTouches===1?
touchHistory.touchBank[touchHistory.indexOfSingleActiveTouch]:null;

if(oneTouchData!==null){
if(oneTouchData.touchActive&&oneTouchData.currentTimeStamp>touchesChangedAfter){
total+=ofCurrent&&isXAxis?oneTouchData.currentPageX:
ofCurrent&&!isXAxis?oneTouchData.currentPageY:
!ofCurrent&&isXAxis?oneTouchData.previousPageX:
oneTouchData.previousPageY;
count=1;}}else 

{
for(var i=0;i<touchBank.length;i++){
var touchTrack=touchBank[i];
if(touchTrack!==null&&
touchTrack!==undefined&&
touchTrack.touchActive&&
touchTrack.currentTimeStamp>=touchesChangedAfter){
var toAdd;
if(ofCurrent&&isXAxis){
toAdd=touchTrack.currentPageX;}else 
if(ofCurrent&&!isXAxis){
toAdd=touchTrack.currentPageY;}else 
if(!ofCurrent&&isXAxis){
toAdd=touchTrack.previousPageX;}else 
{
toAdd=touchTrack.previousPageY;}

total+=toAdd;
count++;}}}



return count>0?total/count:TouchHistoryMath.noCentroid;},


currentCentroidXOfTouchesChangedAfter:function(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
true,
true);},



currentCentroidYOfTouchesChangedAfter:function(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
false,
true);},



previousCentroidXOfTouchesChangedAfter:function(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
true,
false);},



previousCentroidYOfTouchesChangedAfter:function(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
false,
false);},



currentCentroidX:function(touchHistory){
return TouchHistoryMath.centroidDimension(
touchHistory,
0,
true,
true);},



currentCentroidY:function(touchHistory){
return TouchHistoryMath.centroidDimension(
touchHistory,
0,
false,
true);},



noCentroid:-1};


module.exports=TouchHistoryMath;
});
__d('StyleSheetRegistry',function(global, require, module, exports) {  'use strict';












var styles={};
var uniqueID=1;
var emptyStyle={};var 

StyleSheetRegistry=function(){function StyleSheetRegistry(){babelHelpers.classCallCheck(this,StyleSheetRegistry);}babelHelpers.createClass(StyleSheetRegistry,null,[{key:'registerStyle',value:function registerStyle(
style){
var id=++uniqueID;
if(__DEV__){
Object.freeze(style);}

styles[id]=style;
return id;}},{key:'getStyleByID',value:function getStyleByID(


id){
if(!id){


return emptyStyle;}


var style=styles[id];
if(!style){
console.warn('Invalid style with id `'+id+'`. Skipping ...');
return emptyStyle;}

return style;}}]);return StyleSheetRegistry;}();



module.exports=StyleSheetRegistry;
});
__d('StyleSheetTypes',function(global, require, module, exports) {  'use strict';
});
__d('ReactPerf',function(global, require, module, exports) {  'use strict';

















var ReactPerf={




enableMeasure:false,





storedMeasure:_noMeasure,






measureMethods:function(object,objectName,methodNames){
if(process.env.NODE_ENV!=='production'){
for(var key in methodNames){
if(!methodNames.hasOwnProperty(key)){
continue;}

object[key]=ReactPerf.measure(objectName,methodNames[key],object[key]);}}},












measure:function(objName,fnName,func){
if(process.env.NODE_ENV!=='production'){
var measuredFunc=null;
var wrapper=function(){
if(ReactPerf.enableMeasure){
if(!measuredFunc){
measuredFunc=ReactPerf.storedMeasure(objName,fnName,func);}

return measuredFunc.apply(this,arguments);}

return func.apply(this,arguments);};

wrapper.displayName=objName+'_'+fnName;
return wrapper;}

return func;},


injection:{



injectMeasure:function(measure){
ReactPerf.storedMeasure=measure;}}};












function _noMeasure(objName,fnName,func){
return func;}


module.exports=ReactPerf;
});
__d('fbjs/lib/ExecutionEnvironment.js',function(global, require, module, exports) {  'use strict';











var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement);







var ExecutionEnvironment={

canUseDOM:canUseDOM,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:canUseDOM&&!!(window.addEventListener||window.attachEvent),

canUseViewport:canUseDOM&&!!window.screen,

isInWorker:!canUseDOM};



module.exports=ExecutionEnvironment;
});
__d('WebSocketEvent',function(global, require, module, exports) {  'use strict';var 




















WebSocketEvent=
function WebSocketEvent(type,eventInitDict){babelHelpers.classCallCheck(this,WebSocketEvent);
this.type=type.toString();
babelHelpers.extends(this,eventInitDict);};



module.exports=WebSocketEvent;
});
__d('base64-js/lib/b64.js',function(global, require, module, exports) {  'use strict';var lookup='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function(exports){
'use strict';

var Arr=typeof Uint8Array!=='undefined'?
Uint8Array:
Array;

var PLUS='+'.charCodeAt(0);
var SLASH='/'.charCodeAt(0);
var NUMBER='0'.charCodeAt(0);
var LOWER='a'.charCodeAt(0);
var UPPER='A'.charCodeAt(0);
var PLUS_URL_SAFE='-'.charCodeAt(0);
var SLASH_URL_SAFE='_'.charCodeAt(0);

function decode(elt){
var code=elt.charCodeAt(0);
if(code===PLUS||
code===PLUS_URL_SAFE)
return 62;
if(code===SLASH||
code===SLASH_URL_SAFE)
return 63;
if(code<NUMBER)
return -1;
if(code<NUMBER+10)
return code-NUMBER+26+26;
if(code<UPPER+26)
return code-UPPER;
if(code<LOWER+26)
return code-LOWER+26;}


function b64ToByteArray(b64){
var i,j,l,tmp,placeHolders,arr;

if(b64.length%4>0){
throw new Error('Invalid string. Length must be a multiple of 4');}







var len=b64.length;
placeHolders='='===b64.charAt(len-2)?2:'='===b64.charAt(len-1)?1:0;


arr=new Arr(b64.length*3/4-placeHolders);


l=placeHolders>0?b64.length-4:b64.length;

var L=0;

function push(v){
arr[L++]=v;}


for(i=0,j=0;i<l;i+=4,j+=3){
tmp=decode(b64.charAt(i))<<18|decode(b64.charAt(i+1))<<12|decode(b64.charAt(i+2))<<6|decode(b64.charAt(i+3));
push((tmp&0xFF0000)>>16);
push((tmp&0xFF00)>>8);
push(tmp&0xFF);}


if(placeHolders===2){
tmp=decode(b64.charAt(i))<<2|decode(b64.charAt(i+1))>>4;
push(tmp&0xFF);}else 
if(placeHolders===1){
tmp=decode(b64.charAt(i))<<10|decode(b64.charAt(i+1))<<4|decode(b64.charAt(i+2))>>2;
push(tmp>>8&0xFF);
push(tmp&0xFF);}


return arr;}


function uint8ToBase64(uint8){
var i,
extraBytes=uint8.length%3,
output="",
temp,length;

function encode(num){
return lookup.charAt(num);}


function tripletToBase64(num){
return encode(num>>18&0x3F)+encode(num>>12&0x3F)+encode(num>>6&0x3F)+encode(num&0x3F);}



for(i=0,length=uint8.length-extraBytes;i<length;i+=3){
temp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];
output+=tripletToBase64(temp);}



switch(extraBytes){
case 1:
temp=uint8[uint8.length-1];
output+=encode(temp>>2);
output+=encode(temp<<4&0x3F);
output+='==';
break;
case 2:
temp=(uint8[uint8.length-2]<<8)+uint8[uint8.length-1];
output+=encode(temp>>10);
output+=encode(temp>>4&0x3F);
output+=encode(temp<<2&0x3F);
output+='=';
break;}


return output;}


exports.toByteArray=b64ToByteArray;
exports.fromByteArray=uint8ToBase64;})(
typeof exports==='undefined'?this.base64js={}:exports);
});
__d('event-target-shim/lib/commons.js',function(global, require, module, exports) {  "use strict";














var createUniqueKey=exports.createUniqueKey=typeof Symbol!=="undefined"?
Symbol:
function createUniqueKey(name){
return "[["+name+"_"+Math.random().toFixed(8).slice(2)+"]]";};








exports.LISTENERS=createUniqueKey("listeners");







exports.CAPTURE=1;







exports.BUBBLE=2;







exports.ATTRIBUTE=3;
















exports.newNode=function newNode(listener,kind){
return {listener:listener,kind:kind,next:null};};
});
__d('getObjectValues',function(global, require, module, exports) {  "use strict";


























function getObjectValues(obj){
var values=[];
for(var key in obj){
values.push(obj[key]);}

return values;}


module.exports=getObjectValues;
});
__d('SourceMap',function(global, require, module, exports) {  "use strict";























var scope={};
wrapper.call(scope);

module.exports=scope.sourceMap;

function wrapper(){














function define(moduleName,deps,payload){
if(typeof moduleName!="string"){
throw new TypeError('Expected string, got: '+moduleName);}


if(arguments.length==2){
payload=deps;}


if(moduleName in define.modules){
throw new Error("Module already defined: "+moduleName);}

define.modules[moduleName]=payload;}
;




define.modules={};










function Domain(){
this.modules={};
this._currentModule=null;}


(function(){
















Domain.prototype.require=function(deps,callback){
if(Array.isArray(deps)){
var params=deps.map(function(dep){
return this.lookup(dep);},
this);
if(callback){
callback.apply(null,params);}

return undefined;}else 

{
return this.lookup(deps);}};



function normalize(path){
var bits=path.split('/');
var i=1;
while(i<bits.length){
if(bits[i]==='..'){
bits.splice(i-1,1);}else 
if(bits[i]==='.'){
bits.splice(i,1);}else 
{
i++;}}


return bits.join('/');}


function join(a,b){
a=a.trim();
b=b.trim();
if(/^\//.test(b)){
return b;}else 
{
return a.replace(/\/*$/,'/')+b;}}



function dirname(path){
var bits=path.split('/');
bits.pop();
return bits.join('/');}








Domain.prototype.lookup=function(moduleName){
if(/^\./.test(moduleName)){
moduleName=normalize(join(dirname(this._currentModule),moduleName));}


if(moduleName in this.modules){
var module=this.modules[moduleName];
return module;}


if(!(moduleName in define.modules)){
throw new Error("Module not defined: "+moduleName);}


var module=define.modules[moduleName];

if(typeof module=="function"){
var exports={};
var previousModule=this._currentModule;
this._currentModule=moduleName;
module(this.require.bind(this),exports,{id:moduleName,uri:""});
this._currentModule=previousModule;
module=exports;}



this.modules[moduleName]=module;

return module;};})();




define.Domain=Domain;
define.globalDomain=new Domain();
var require=define.globalDomain.require.bind(define.globalDomain);






define('source-map/source-map-generator',['require','exports','module','source-map/base64-vlq','source-map/util','source-map/array-set'],function(require,exports,module){

var base64VLQ=require('./base64-vlq');
var util=require('./util');
var ArraySet=require('./array-set').ArraySet;









function SourceMapGenerator(aArgs){
this._file=util.getArg(aArgs,'file');
this._sourceRoot=util.getArg(aArgs,'sourceRoot',null);
this._sources=new ArraySet();
this._names=new ArraySet();
this._mappings=[];
this._sourcesContents=null;}


SourceMapGenerator.prototype._version=3;






SourceMapGenerator.fromSourceMap=
function SourceMapGenerator_fromSourceMap(aSourceMapConsumer){
var sourceRoot=aSourceMapConsumer.sourceRoot;
var generator=new SourceMapGenerator({
file:aSourceMapConsumer.file,
sourceRoot:sourceRoot});

aSourceMapConsumer.eachMapping(function(mapping){
var newMapping={
generated:{
line:mapping.generatedLine,
column:mapping.generatedColumn}};



if(mapping.source){
newMapping.source=mapping.source;
if(sourceRoot){
newMapping.source=util.relative(sourceRoot,newMapping.source);}


newMapping.original={
line:mapping.originalLine,
column:mapping.originalColumn};


if(mapping.name){
newMapping.name=mapping.name;}}



generator.addMapping(newMapping);});

aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
generator.setSourceContent(sourceFile,content);}});


return generator;};












SourceMapGenerator.prototype.addMapping=
function SourceMapGenerator_addMapping(aArgs){
var generated=util.getArg(aArgs,'generated');
var original=util.getArg(aArgs,'original',null);
var source=util.getArg(aArgs,'source',null);
var name=util.getArg(aArgs,'name',null);

this._validateMapping(generated,original,source,name);

if(source&&!this._sources.has(source)){
this._sources.add(source);}


if(name&&!this._names.has(name)){
this._names.add(name);}


this._mappings.push({
generatedLine:generated.line,
generatedColumn:generated.column,
originalLine:original!=null&&original.line,
originalColumn:original!=null&&original.column,
source:source,
name:name});};






SourceMapGenerator.prototype.setSourceContent=
function SourceMapGenerator_setSourceContent(aSourceFile,aSourceContent){
var source=aSourceFile;
if(this._sourceRoot){
source=util.relative(this._sourceRoot,source);}


if(aSourceContent!==null){


if(!this._sourcesContents){
this._sourcesContents={};}

this._sourcesContents[util.toSetString(source)]=aSourceContent;}else 
{


delete this._sourcesContents[util.toSetString(source)];
if(Object.keys(this._sourcesContents).length===0){
this._sourcesContents=null;}}};














SourceMapGenerator.prototype.applySourceMap=
function SourceMapGenerator_applySourceMap(aSourceMapConsumer,aSourceFile){

if(!aSourceFile){
aSourceFile=aSourceMapConsumer.file;}

var sourceRoot=this._sourceRoot;

if(sourceRoot){
aSourceFile=util.relative(sourceRoot,aSourceFile);}



var newSources=new ArraySet();
var newNames=new ArraySet();


this._mappings.forEach(function(mapping){
if(mapping.source===aSourceFile&&mapping.originalLine){

var original=aSourceMapConsumer.originalPositionFor({
line:mapping.originalLine,
column:mapping.originalColumn});

if(original.source!==null){

if(sourceRoot){
mapping.source=util.relative(sourceRoot,original.source);}else 
{
mapping.source=original.source;}

mapping.originalLine=original.line;
mapping.originalColumn=original.column;
if(original.name!==null&&mapping.name!==null){


mapping.name=original.name;}}}




var source=mapping.source;
if(source&&!newSources.has(source)){
newSources.add(source);}


var name=mapping.name;
if(name&&!newNames.has(name)){
newNames.add(name);}},


this);
this._sources=newSources;
this._names=newNames;


aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
if(sourceRoot){
sourceFile=util.relative(sourceRoot,sourceFile);}

this.setSourceContent(sourceFile,content);}},

this);};













SourceMapGenerator.prototype._validateMapping=
function SourceMapGenerator_validateMapping(aGenerated,aOriginal,aSource,
aName){
if(aGenerated&&'line' in aGenerated&&'column' in aGenerated&&
aGenerated.line>0&&aGenerated.column>=0&&
!aOriginal&&!aSource&&!aName){

return;}else 

if(aGenerated&&'line' in aGenerated&&'column' in aGenerated&&
aOriginal&&'line' in aOriginal&&'column' in aOriginal&&
aGenerated.line>0&&aGenerated.column>=0&&
aOriginal.line>0&&aOriginal.column>=0&&
aSource){

return;}else 

{
throw new Error('Invalid mapping: '+JSON.stringify({
generated:aGenerated,
source:aSource,
orginal:aOriginal,
name:aName}));}};








SourceMapGenerator.prototype._serializeMappings=
function SourceMapGenerator_serializeMappings(){
var previousGeneratedColumn=0;
var previousGeneratedLine=1;
var previousOriginalColumn=0;
var previousOriginalLine=0;
var previousName=0;
var previousSource=0;
var result='';
var mapping;






this._mappings.sort(util.compareByGeneratedPositions);

for(var i=0,len=this._mappings.length;i<len;i++){
mapping=this._mappings[i];

if(mapping.generatedLine!==previousGeneratedLine){
previousGeneratedColumn=0;
while(mapping.generatedLine!==previousGeneratedLine){
result+=';';
previousGeneratedLine++;}}else 


{
if(i>0){
if(!util.compareByGeneratedPositions(mapping,this._mappings[i-1])){
continue;}

result+=',';}}



result+=base64VLQ.encode(mapping.generatedColumn-
previousGeneratedColumn);
previousGeneratedColumn=mapping.generatedColumn;

if(mapping.source){
result+=base64VLQ.encode(this._sources.indexOf(mapping.source)-
previousSource);
previousSource=this._sources.indexOf(mapping.source);


result+=base64VLQ.encode(mapping.originalLine-1-
previousOriginalLine);
previousOriginalLine=mapping.originalLine-1;

result+=base64VLQ.encode(mapping.originalColumn-
previousOriginalColumn);
previousOriginalColumn=mapping.originalColumn;

if(mapping.name){
result+=base64VLQ.encode(this._names.indexOf(mapping.name)-
previousName);
previousName=this._names.indexOf(mapping.name);}}}




return result;};


SourceMapGenerator.prototype._generateSourcesContent=
function SourceMapGenerator_generateSourcesContent(aSources,aSourceRoot){
return aSources.map(function(source){
if(!this._sourcesContents){
return null;}

if(aSourceRoot){
source=util.relative(aSourceRoot,source);}

var key=util.toSetString(source);
return Object.prototype.hasOwnProperty.call(this._sourcesContents,
key)?
this._sourcesContents[key]:
null;},
this);};





SourceMapGenerator.prototype.toJSON=
function SourceMapGenerator_toJSON(){
var map={
version:this._version,
file:this._file,
sources:this._sources.toArray(),
names:this._names.toArray(),
mappings:this._serializeMappings()};

if(this._sourceRoot){
map.sourceRoot=this._sourceRoot;}

if(this._sourcesContents){
map.sourcesContent=this._generateSourcesContent(map.sources,map.sourceRoot);}


return map;};





SourceMapGenerator.prototype.toString=
function SourceMapGenerator_toString(){
return JSON.stringify(this);};


exports.SourceMapGenerator=SourceMapGenerator;});






































define('source-map/base64-vlq',['require','exports','module','source-map/base64'],function(require,exports,module){

var base64=require('./base64');













var VLQ_BASE_SHIFT=5;


var VLQ_BASE=1<<VLQ_BASE_SHIFT;


var VLQ_BASE_MASK=VLQ_BASE-1;


var VLQ_CONTINUATION_BIT=VLQ_BASE;







function toVLQSigned(aValue){
return aValue<0?
(-aValue<<1)+1:
(aValue<<1)+0;}








function fromVLQSigned(aValue){
var isNegative=(aValue&1)===1;
var shifted=aValue>>1;
return isNegative?
-shifted:
shifted;}





exports.encode=function base64VLQ_encode(aValue){
var encoded="";
var digit;

var vlq=toVLQSigned(aValue);

do {
digit=vlq&VLQ_BASE_MASK;
vlq>>>=VLQ_BASE_SHIFT;
if(vlq>0){


digit|=VLQ_CONTINUATION_BIT;}

encoded+=base64.encode(digit);}while(
vlq>0);

return encoded;};






exports.decode=function base64VLQ_decode(aStr){
var i=0;
var strLen=aStr.length;
var result=0;
var shift=0;
var continuation,digit;

do {
if(i>=strLen){
throw new Error("Expected more digits in base 64 VLQ value.");}

digit=base64.decode(aStr.charAt(i++));
continuation=!!(digit&VLQ_CONTINUATION_BIT);
digit&=VLQ_BASE_MASK;
result=result+(digit<<shift);
shift+=VLQ_BASE_SHIFT;}while(
continuation);

return {
value:fromVLQSigned(result),
rest:aStr.slice(i)};};});










define('source-map/base64',['require','exports','module'],function(require,exports,module){

var charToIntMap={};
var intToCharMap={};

'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.
split('').
forEach(function(ch,index){
charToIntMap[ch]=index;
intToCharMap[index]=ch;});





exports.encode=function base64_encode(aNumber){
if(aNumber in intToCharMap){
return intToCharMap[aNumber];}

throw new TypeError("Must be between 0 and 63: "+aNumber);};





exports.decode=function base64_decode(aChar){
if(aChar in charToIntMap){
return charToIntMap[aChar];}

throw new TypeError("Not a valid base 64 digit: "+aChar);};});









define('source-map/util',['require','exports','module'],function(require,exports,module){











function getArg(aArgs,aName,aDefaultValue){
if(aName in aArgs){
return aArgs[aName];}else 
if(arguments.length===3){
return aDefaultValue;}else 
{
throw new Error('"'+aName+'" is a required argument.');}}


exports.getArg=getArg;

var urlRegexp=/([\w+\-.]+):\/\/((\w+:\w+)@)?([\w.]+)?(:(\d+))?(\S+)?/;
var dataUrlRegexp=/^data:.+\,.+/;

function urlParse(aUrl){
var match=aUrl.match(urlRegexp);
if(!match){
return null;}

return {
scheme:match[1],
auth:match[3],
host:match[4],
port:match[6],
path:match[7]};}


exports.urlParse=urlParse;

function urlGenerate(aParsedUrl){
var url=aParsedUrl.scheme+"://";
if(aParsedUrl.auth){
url+=aParsedUrl.auth+"@";}

if(aParsedUrl.host){
url+=aParsedUrl.host;}

if(aParsedUrl.port){
url+=":"+aParsedUrl.port;}

if(aParsedUrl.path){
url+=aParsedUrl.path;}

return url;}

exports.urlGenerate=urlGenerate;

function join(aRoot,aPath){
var url;

if(aPath.match(urlRegexp)||aPath.match(dataUrlRegexp)){
return aPath;}


if(aPath.charAt(0)==='/'&&(url=urlParse(aRoot))){
url.path=aPath;
return urlGenerate(url);}


return aRoot.replace(/\/$/,'')+'/'+aPath;}

exports.join=join;










function toSetString(aStr){
return '$'+aStr;}

exports.toSetString=toSetString;

function fromSetString(aStr){
return aStr.substr(1);}

exports.fromSetString=fromSetString;

function relative(aRoot,aPath){
aRoot=aRoot.replace(/\/$/,'');

var url=urlParse(aRoot);
if(aPath.charAt(0)=="/"&&url&&url.path=="/"){
return aPath.slice(1);}


return aPath.indexOf(aRoot+'/')===0?
aPath.substr(aRoot.length+1):
aPath;}

exports.relative=relative;

function strcmp(aStr1,aStr2){
var s1=aStr1||"";
var s2=aStr2||"";
return (s1>s2)-(s1<s2);}










function compareByOriginalPositions(mappingA,mappingB,onlyCompareOriginal){
var cmp;

cmp=strcmp(mappingA.source,mappingB.source);
if(cmp){
return cmp;}


cmp=mappingA.originalLine-mappingB.originalLine;
if(cmp){
return cmp;}


cmp=mappingA.originalColumn-mappingB.originalColumn;
if(cmp||onlyCompareOriginal){
return cmp;}


cmp=strcmp(mappingA.name,mappingB.name);
if(cmp){
return cmp;}


cmp=mappingA.generatedLine-mappingB.generatedLine;
if(cmp){
return cmp;}


return mappingA.generatedColumn-mappingB.generatedColumn;}
;
exports.compareByOriginalPositions=compareByOriginalPositions;










function compareByGeneratedPositions(mappingA,mappingB,onlyCompareGenerated){
var cmp;

cmp=mappingA.generatedLine-mappingB.generatedLine;
if(cmp){
return cmp;}


cmp=mappingA.generatedColumn-mappingB.generatedColumn;
if(cmp||onlyCompareGenerated){
return cmp;}


cmp=strcmp(mappingA.source,mappingB.source);
if(cmp){
return cmp;}


cmp=mappingA.originalLine-mappingB.originalLine;
if(cmp){
return cmp;}


cmp=mappingA.originalColumn-mappingB.originalColumn;
if(cmp){
return cmp;}


return strcmp(mappingA.name,mappingB.name);}
;
exports.compareByGeneratedPositions=compareByGeneratedPositions;});








define('source-map/array-set',['require','exports','module','source-map/util'],function(require,exports,module){

var util=require('./util');







function ArraySet(){
this._array=[];
this._set={};}





ArraySet.fromArray=function ArraySet_fromArray(aArray,aAllowDuplicates){
var set=new ArraySet();
for(var i=0,len=aArray.length;i<len;i++){
set.add(aArray[i],aAllowDuplicates);}

return set;};







ArraySet.prototype.add=function ArraySet_add(aStr,aAllowDuplicates){
var isDuplicate=this.has(aStr);
var idx=this._array.length;
if(!isDuplicate||aAllowDuplicates){
this._array.push(aStr);}

if(!isDuplicate){
this._set[util.toSetString(aStr)]=idx;}};








ArraySet.prototype.has=function ArraySet_has(aStr){
return Object.prototype.hasOwnProperty.call(this._set,
util.toSetString(aStr));};







ArraySet.prototype.indexOf=function ArraySet_indexOf(aStr){
if(this.has(aStr)){
return this._set[util.toSetString(aStr)];}

throw new Error('"'+aStr+'" is not in the set.');};







ArraySet.prototype.at=function ArraySet_at(aIdx){
if(aIdx>=0&&aIdx<this._array.length){
return this._array[aIdx];}

throw new Error('No element indexed by '+aIdx);};







ArraySet.prototype.toArray=function ArraySet_toArray(){
return this._array.slice();};


exports.ArraySet=ArraySet;});








define('source-map/source-map-consumer',['require','exports','module','source-map/util','source-map/binary-search','source-map/array-set','source-map/base64-vlq'],function(require,exports,module){

var util=require('./util');
var binarySearch=require('./binary-search');
var ArraySet=require('./array-set').ArraySet;
var base64VLQ=require('./base64-vlq');































function SourceMapConsumer(aSourceMap){
var sourceMap=aSourceMap;
if(typeof aSourceMap==='string'){
sourceMap=JSON.parse(aSourceMap.replace(/^\)\]\}'/,''));}


var version=util.getArg(sourceMap,'version');
var sources=util.getArg(sourceMap,'sources');


var names=util.getArg(sourceMap,'names',[]);
var sourceRoot=util.getArg(sourceMap,'sourceRoot',null);
var sourcesContent=util.getArg(sourceMap,'sourcesContent',null);
var mappings=util.getArg(sourceMap,'mappings');
var file=util.getArg(sourceMap,'file',null);



if(version!=this._version){
throw new Error('Unsupported version: '+version);}






this._names=ArraySet.fromArray(names,true);
this._sources=ArraySet.fromArray(sources,true);

this.sourceRoot=sourceRoot;
this.sourcesContent=sourcesContent;
this._mappings=mappings;
this.file=file;}









SourceMapConsumer.fromSourceMap=
function SourceMapConsumer_fromSourceMap(aSourceMap){
var smc=Object.create(SourceMapConsumer.prototype);

smc._names=ArraySet.fromArray(aSourceMap._names.toArray(),true);
smc._sources=ArraySet.fromArray(aSourceMap._sources.toArray(),true);
smc.sourceRoot=aSourceMap._sourceRoot;
smc.sourcesContent=aSourceMap._generateSourcesContent(smc._sources.toArray(),
smc.sourceRoot);
smc.file=aSourceMap._file;

smc.__generatedMappings=aSourceMap._mappings.slice().
sort(util.compareByGeneratedPositions);
smc.__originalMappings=aSourceMap._mappings.slice().
sort(util.compareByOriginalPositions);

return smc;};





SourceMapConsumer.prototype._version=3;




Object.defineProperty(SourceMapConsumer.prototype,'sources',{
get:function(){
return this._sources.toArray().map(function(s){
return this.sourceRoot?util.join(this.sourceRoot,s):s;},
this);}});

































SourceMapConsumer.prototype.__generatedMappings=null;
Object.defineProperty(SourceMapConsumer.prototype,'_generatedMappings',{
get:function(){
if(!this.__generatedMappings){
this.__generatedMappings=[];
this.__originalMappings=[];
this._parseMappings(this._mappings,this.sourceRoot);}


return this.__generatedMappings;}});



SourceMapConsumer.prototype.__originalMappings=null;
Object.defineProperty(SourceMapConsumer.prototype,'_originalMappings',{
get:function(){
if(!this.__originalMappings){
this.__generatedMappings=[];
this.__originalMappings=[];
this._parseMappings(this._mappings,this.sourceRoot);}


return this.__originalMappings;}});








SourceMapConsumer.prototype._parseMappings=
function SourceMapConsumer_parseMappings(aStr,aSourceRoot){
var generatedLine=1;
var previousGeneratedColumn=0;
var previousOriginalLine=0;
var previousOriginalColumn=0;
var previousSource=0;
var previousName=0;
var mappingSeparator=/^[,;]/;
var str=aStr;
var mapping;
var temp;

while(str.length>0){
if(str.charAt(0)===';'){
generatedLine++;
str=str.slice(1);
previousGeneratedColumn=0;}else 

if(str.charAt(0)===','){
str=str.slice(1);}else 

{
mapping={};
mapping.generatedLine=generatedLine;


temp=base64VLQ.decode(str);
mapping.generatedColumn=previousGeneratedColumn+temp.value;
previousGeneratedColumn=mapping.generatedColumn;
str=temp.rest;

if(str.length>0&&!mappingSeparator.test(str.charAt(0))){

temp=base64VLQ.decode(str);
mapping.source=this._sources.at(previousSource+temp.value);
previousSource+=temp.value;
str=temp.rest;
if(str.length===0||mappingSeparator.test(str.charAt(0))){
throw new Error('Found a source, but no line and column');}



temp=base64VLQ.decode(str);
mapping.originalLine=previousOriginalLine+temp.value;
previousOriginalLine=mapping.originalLine;

mapping.originalLine+=1;
str=temp.rest;
if(str.length===0||mappingSeparator.test(str.charAt(0))){
throw new Error('Found a source and line, but no column');}



temp=base64VLQ.decode(str);
mapping.originalColumn=previousOriginalColumn+temp.value;
previousOriginalColumn=mapping.originalColumn;
str=temp.rest;

if(str.length>0&&!mappingSeparator.test(str.charAt(0))){

temp=base64VLQ.decode(str);
mapping.name=this._names.at(previousName+temp.value);
previousName+=temp.value;
str=temp.rest;}}



this.__generatedMappings.push(mapping);
if(typeof mapping.originalLine==='number'){
this.__originalMappings.push(mapping);}}}




this.__originalMappings.sort(util.compareByOriginalPositions);};






SourceMapConsumer.prototype._findMapping=
function SourceMapConsumer_findMapping(aNeedle,aMappings,aLineName,
aColumnName,aComparator){





if(aNeedle[aLineName]<=0){
throw new TypeError('Line must be greater than or equal to 1, got '+
aNeedle[aLineName]);}

if(aNeedle[aColumnName]<0){
throw new TypeError('Column must be greater than or equal to 0, got '+
aNeedle[aColumnName]);}


return binarySearch.search(aNeedle,aMappings,aComparator);};

















SourceMapConsumer.prototype.originalPositionFor=
function SourceMapConsumer_originalPositionFor(aArgs){
var needle={
generatedLine:util.getArg(aArgs,'line'),
generatedColumn:util.getArg(aArgs,'column')};


var mapping=this._findMapping(needle,
this._generatedMappings,
"generatedLine",
"generatedColumn",
util.compareByGeneratedPositions);

if(mapping){
var source=util.getArg(mapping,'source',null);
if(source&&this.sourceRoot){
source=util.join(this.sourceRoot,source);}

return {
source:source,
line:util.getArg(mapping,'originalLine',null),
column:util.getArg(mapping,'originalColumn',null),
name:util.getArg(mapping,'name',null)};}



return {
source:null,
line:null,
column:null,
name:null};};








SourceMapConsumer.prototype.sourceContentFor=
function SourceMapConsumer_sourceContentFor(aSource){
if(!this.sourcesContent){
return null;}


if(this.sourceRoot){
aSource=util.relative(this.sourceRoot,aSource);}


if(this._sources.has(aSource)){
return this.sourcesContent[this._sources.indexOf(aSource)];}


var url;
if(this.sourceRoot&&(
url=util.urlParse(this.sourceRoot))){




var fileUriAbsPath=aSource.replace(/^file:\/\//,"");
if(url.scheme=="file"&&
this._sources.has(fileUriAbsPath)){
return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];}


if((!url.path||url.path=="/")&&
this._sources.has("/"+aSource)){
return this.sourcesContent[this._sources.indexOf("/"+aSource)];}}



throw new Error('"'+aSource+'" is not in the SourceMap.');};
















SourceMapConsumer.prototype.generatedPositionFor=
function SourceMapConsumer_generatedPositionFor(aArgs){
var needle={
source:util.getArg(aArgs,'source'),
originalLine:util.getArg(aArgs,'line'),
originalColumn:util.getArg(aArgs,'column')};


if(this.sourceRoot){
needle.source=util.relative(this.sourceRoot,needle.source);}


var mapping=this._findMapping(needle,
this._originalMappings,
"originalLine",
"originalColumn",
util.compareByOriginalPositions);

if(mapping){
return {
line:util.getArg(mapping,'generatedLine',null),
column:util.getArg(mapping,'generatedColumn',null)};}



return {
line:null,
column:null};};



SourceMapConsumer.GENERATED_ORDER=1;
SourceMapConsumer.ORIGINAL_ORDER=2;

















SourceMapConsumer.prototype.eachMapping=
function SourceMapConsumer_eachMapping(aCallback,aContext,aOrder){
var context=aContext||null;
var order=aOrder||SourceMapConsumer.GENERATED_ORDER;

var mappings;
switch(order){
case SourceMapConsumer.GENERATED_ORDER:
mappings=this._generatedMappings;
break;
case SourceMapConsumer.ORIGINAL_ORDER:
mappings=this._originalMappings;
break;
default:
throw new Error("Unknown order of iteration.");}


var sourceRoot=this.sourceRoot;
mappings.map(function(mapping){
var source=mapping.source;
if(source&&sourceRoot){
source=util.join(sourceRoot,source);}

return {
source:source,
generatedLine:mapping.generatedLine,
generatedColumn:mapping.generatedColumn,
originalLine:mapping.originalLine,
originalColumn:mapping.originalColumn,
name:mapping.name};}).

forEach(aCallback,context);};


exports.SourceMapConsumer=SourceMapConsumer;});








define('source-map/binary-search',['require','exports','module'],function(require,exports,module){










function recursiveSearch(aLow,aHigh,aNeedle,aHaystack,aCompare){










var mid=Math.floor((aHigh-aLow)/2)+aLow;
var cmp=aCompare(aNeedle,aHaystack[mid],true);
if(cmp===0){

return aHaystack[mid];}else 

if(cmp>0){

if(aHigh-mid>1){

return recursiveSearch(mid,aHigh,aNeedle,aHaystack,aCompare);}



return aHaystack[mid];}else 

{

if(mid-aLow>1){

return recursiveSearch(aLow,mid,aNeedle,aHaystack,aCompare);}



return aLow<0?
null:
aHaystack[aLow];}}
















exports.search=function search(aNeedle,aHaystack,aCompare){
return aHaystack.length>0?
recursiveSearch(-1,aHaystack.length,aNeedle,aHaystack,aCompare):
null;};});









define('source-map/source-node',['require','exports','module','source-map/source-map-generator','source-map/util'],function(require,exports,module){

var SourceMapGenerator=require('./source-map-generator').SourceMapGenerator;
var util=require('./util');













function SourceNode(aLine,aColumn,aSource,aChunks,aName){
this.children=[];
this.sourceContents={};
this.line=aLine===undefined?null:aLine;
this.column=aColumn===undefined?null:aColumn;
this.source=aSource===undefined?null:aSource;
this.name=aName===undefined?null:aName;
if(aChunks!=null)this.add(aChunks);}








SourceNode.fromStringWithSourceMap=
function SourceNode_fromStringWithSourceMap(aGeneratedCode,aSourceMapConsumer){


var node=new SourceNode();



var remainingLines=aGeneratedCode.split('\n');


var lastGeneratedLine=1,lastGeneratedColumn=0;




var lastMapping=null;

aSourceMapConsumer.eachMapping(function(mapping){
if(lastMapping===null){



while(lastGeneratedLine<mapping.generatedLine){
node.add(remainingLines.shift()+"\n");
lastGeneratedLine++;}

if(lastGeneratedColumn<mapping.generatedColumn){
var nextLine=remainingLines[0];
node.add(nextLine.substr(0,mapping.generatedColumn));
remainingLines[0]=nextLine.substr(mapping.generatedColumn);
lastGeneratedColumn=mapping.generatedColumn;}}else 

{


if(lastGeneratedLine<mapping.generatedLine){
var code="";

do {
code+=remainingLines.shift()+"\n";
lastGeneratedLine++;
lastGeneratedColumn=0;}while(
lastGeneratedLine<mapping.generatedLine);


if(lastGeneratedColumn<mapping.generatedColumn){
var nextLine=remainingLines[0];
code+=nextLine.substr(0,mapping.generatedColumn);
remainingLines[0]=nextLine.substr(mapping.generatedColumn);
lastGeneratedColumn=mapping.generatedColumn;}


addMappingWithCode(lastMapping,code);}else 
{



var nextLine=remainingLines[0];
var code=nextLine.substr(0,mapping.generatedColumn-
lastGeneratedColumn);
remainingLines[0]=nextLine.substr(mapping.generatedColumn-
lastGeneratedColumn);
lastGeneratedColumn=mapping.generatedColumn;
addMappingWithCode(lastMapping,code);}}


lastMapping=mapping;},
this);



addMappingWithCode(lastMapping,remainingLines.join("\n"));


aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
node.setSourceContent(sourceFile,content);}});



return node;

function addMappingWithCode(mapping,code){
if(mapping===null||mapping.source===undefined){
node.add(code);}else 
{
node.add(new SourceNode(mapping.originalLine,
mapping.originalColumn,
mapping.source,
code,
mapping.name));}}};










SourceNode.prototype.add=function SourceNode_add(aChunk){
if(Array.isArray(aChunk)){
aChunk.forEach(function(chunk){
this.add(chunk);},
this);}else 

if(aChunk instanceof SourceNode||typeof aChunk==="string"){
if(aChunk){
this.children.push(aChunk);}}else 


{
throw new TypeError(
"Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+aChunk);}


return this;};








SourceNode.prototype.prepend=function SourceNode_prepend(aChunk){
if(Array.isArray(aChunk)){
for(var i=aChunk.length-1;i>=0;i--){
this.prepend(aChunk[i]);}}else 


if(aChunk instanceof SourceNode||typeof aChunk==="string"){
this.children.unshift(aChunk);}else 

{
throw new TypeError(
"Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+aChunk);}


return this;};









SourceNode.prototype.walk=function SourceNode_walk(aFn){
var chunk;
for(var i=0,len=this.children.length;i<len;i++){
chunk=this.children[i];
if(chunk instanceof SourceNode){
chunk.walk(aFn);}else 

{
if(chunk!==''){
aFn(chunk,{source:this.source,
line:this.line,
column:this.column,
name:this.name});}}}};











SourceNode.prototype.join=function SourceNode_join(aSep){
var newChildren;
var i;
var len=this.children.length;
if(len>0){
newChildren=[];
for(i=0;i<len-1;i++){
newChildren.push(this.children[i]);
newChildren.push(aSep);}

newChildren.push(this.children[i]);
this.children=newChildren;}

return this;};









SourceNode.prototype.replaceRight=function SourceNode_replaceRight(aPattern,aReplacement){
var lastChild=this.children[this.children.length-1];
if(lastChild instanceof SourceNode){
lastChild.replaceRight(aPattern,aReplacement);}else 

if(typeof lastChild==='string'){
this.children[this.children.length-1]=lastChild.replace(aPattern,aReplacement);}else 

{
this.children.push(''.replace(aPattern,aReplacement));}

return this;};









SourceNode.prototype.setSourceContent=
function SourceNode_setSourceContent(aSourceFile,aSourceContent){
this.sourceContents[util.toSetString(aSourceFile)]=aSourceContent;};








SourceNode.prototype.walkSourceContents=
function SourceNode_walkSourceContents(aFn){
for(var i=0,len=this.children.length;i<len;i++){
if(this.children[i] instanceof SourceNode){
this.children[i].walkSourceContents(aFn);}}



var sources=Object.keys(this.sourceContents);
for(var i=0,len=sources.length;i<len;i++){
aFn(util.fromSetString(sources[i]),this.sourceContents[sources[i]]);}};







SourceNode.prototype.toString=function SourceNode_toString(){
var str="";
this.walk(function(chunk){
str+=chunk;});

return str;};






SourceNode.prototype.toStringWithSourceMap=function SourceNode_toStringWithSourceMap(aArgs){
var generated={
code:"",
line:1,
column:0};

var map=new SourceMapGenerator(aArgs);
var sourceMappingActive=false;
var lastOriginalSource=null;
var lastOriginalLine=null;
var lastOriginalColumn=null;
var lastOriginalName=null;
this.walk(function(chunk,original){
generated.code+=chunk;
if(original.source!==null&&
original.line!==null&&
original.column!==null){
if(lastOriginalSource!==original.source||
lastOriginalLine!==original.line||
lastOriginalColumn!==original.column||
lastOriginalName!==original.name){
map.addMapping({
source:original.source,
original:{
line:original.line,
column:original.column},

generated:{
line:generated.line,
column:generated.column},

name:original.name});}


lastOriginalSource=original.source;
lastOriginalLine=original.line;
lastOriginalColumn=original.column;
lastOriginalName=original.name;
sourceMappingActive=true;}else 
if(sourceMappingActive){
map.addMapping({
generated:{
line:generated.line,
column:generated.column}});


lastOriginalSource=null;
sourceMappingActive=false;}

chunk.split('').forEach(function(ch){
if(ch==='\n'){
generated.line++;
generated.column=0;}else 
{
generated.column++;}});});



this.walkSourceContents(function(sourceFile,sourceContent){
map.setSourceContent(sourceFile,sourceContent);});


return {code:generated.code,map:map};};


exports.SourceNode=SourceNode;});





this.sourceMap={
SourceMapConsumer:require('source-map/source-map-consumer').SourceMapConsumer,
SourceMapGenerator:require('source-map/source-map-generator').SourceMapGenerator,
SourceNode:require('source-map/source-node').SourceNode};}
});
__d('react-native/Libraries/JavaScriptAppEngine/Initialization/source-map-url.js',function(global, require, module, exports) {  "use strict";














(function(){
var define=null;




void function(root,factory){
if(typeof define==="function"&&define.amd){
define(factory);}else 
if(typeof exports==="object"){
module.exports=factory();}else 
{
root.sourceMappingURL=factory();}}(

this,function(){

var innerRegex=/[#@] source(?:Mapping)?URL=([^\s'"]*)/;

var regex=RegExp(
"(?:"+
"/\\*"+
"(?:\\s*\r?\n(?://)?)?"+
"(?:"+innerRegex.source+")"+
"\\s*"+
"\\*/"+
"|"+
"//(?:"+innerRegex.source+")"+
")"+
"\\s*$");


return {

regex:regex,
_innerRegex:innerRegex,

getFrom:function(code){
var match=code.match(regex);
return match?match[1]||match[2]||"":null;},


existsIn:function(code){
return regex.test(code);},


removeFrom:function(code){
return code.replace(regex,"");},


insertBefore:function(code,string){
var match=code.match(regex);
if(match){
return code.slice(0,match.index)+string+code.slice(match.index);}else 
{
return code+string;}}};});})();
});
__d('promise/setimmediate/core.js',function(global, require, module, exports) {  'use strict';



function noop(){}


















var LAST_ERROR=null;
var IS_ERROR={};
function getThen(obj){
try{
return obj.then;}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}



function tryCallOne(fn,a){
try{
return fn(a);}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}


function tryCallTwo(fn,a,b){
try{
fn(a,b);}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}



module.exports=Promise;

function Promise(fn){
if(typeof this!=='object'){
throw new TypeError('Promises must be constructed via new');}

if(typeof fn!=='function'){
throw new TypeError('not a function');}

this._45=0;
this._81=0;
this._65=null;
this._54=null;
if(fn===noop)return;
doResolve(fn,this);}

Promise._10=null;
Promise._97=null;
Promise._61=noop;

Promise.prototype.then=function(onFulfilled,onRejected){
if(this.constructor!==Promise){
return safeThen(this,onFulfilled,onRejected);}

var res=new Promise(noop);
handle(this,new Handler(onFulfilled,onRejected,res));
return res;};


function safeThen(self,onFulfilled,onRejected){
return new self.constructor(function(resolve,reject){
var res=new Promise(noop);
res.then(resolve,reject);
handle(self,new Handler(onFulfilled,onRejected,res));});}

;
function handle(self,deferred){
while(self._81===3){
self=self._65;}

if(Promise._10){
Promise._10(self);}

if(self._81===0){
if(self._45===0){
self._45=1;
self._54=deferred;
return;}

if(self._45===1){
self._45=2;
self._54=[self._54,deferred];
return;}

self._54.push(deferred);
return;}

handleResolved(self,deferred);}


function handleResolved(self,deferred){
setImmediate(function(){
var cb=self._81===1?deferred.onFulfilled:deferred.onRejected;
if(cb===null){
if(self._81===1){
resolve(deferred.promise,self._65);}else 
{
reject(deferred.promise,self._65);}

return;}

var ret=tryCallOne(cb,self._65);
if(ret===IS_ERROR){
reject(deferred.promise,LAST_ERROR);}else 
{
resolve(deferred.promise,ret);}});}



function resolve(self,newValue){

if(newValue===self){
return reject(
self,
new TypeError('A promise cannot be resolved with itself.'));}


if(
newValue&&(
typeof newValue==='object'||typeof newValue==='function'))
{
var then=getThen(newValue);
if(then===IS_ERROR){
return reject(self,LAST_ERROR);}

if(
then===self.then&&
newValue instanceof Promise)
{
self._81=3;
self._65=newValue;
finale(self);
return;}else 
if(typeof then==='function'){
doResolve(then.bind(newValue),self);
return;}}


self._81=1;
self._65=newValue;
finale(self);}


function reject(self,newValue){
self._81=2;
self._65=newValue;
if(Promise._97){
Promise._97(self,newValue);}

finale(self);}

function finale(self){
if(self._45===1){
handle(self,self._54);
self._54=null;}

if(self._45===2){
for(var i=0;i<self._54.length;i++){
handle(self,self._54[i]);}

self._54=null;}}



function Handler(onFulfilled,onRejected,promise){
this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;
this.onRejected=typeof onRejected==='function'?onRejected:null;
this.promise=promise;}








function doResolve(fn,promise){
var done=false;
var res=tryCallTwo(fn,function(value){
if(done)return;
done=true;
resolve(promise,value);},
function(reason){
if(done)return;
done=true;
reject(promise,reason);});

if(!done&&res===IS_ERROR){
done=true;
reject(promise,LAST_ERROR);}}
});
__d('ReactStateSetters',function(global, require, module, exports) {  'use strict';












var ReactStateSetters={










createStateSetter:function(component,funcReturningState){
return function(a,b,c,d,e,f){
var partialState=funcReturningState.call(component,a,b,c,d,e,f);
if(partialState){
component.setState(partialState);}};},















createStateKeySetter:function(component,key){

var cache=component.__keySetters||(component.__keySetters={});
return cache[key]||(cache[key]=createStateKeySetter(component,key));}};



function createStateKeySetter(component,key){



var partialState={};
return function stateKeySetter(value){
partialState[key]=value;
component.setState(partialState);};}



ReactStateSetters.Mixin={
















createStateSetter:function(funcReturningState){
return ReactStateSetters.createStateSetter(this,funcReturningState);},

















createStateKeySetter:function(key){
return ReactStateSetters.createStateKeySetter(this,key);}};



module.exports=ReactStateSetters;
});
__d('ReactVersion',function(global, require, module, exports) {  'use strict';












module.exports='0.14.7';
});
__d('fbjs/lib/mapObject.js',function(global, require, module, exports) {  'use strict';












var hasOwnProperty=Object.prototype.hasOwnProperty;























function mapObject(object,callback,context){
if(!object){
return null;}

var result={};
for(var name in object){
if(hasOwnProperty.call(object,name)){
result[name]=callback.call(context,object[name],name,object);}}


return result;}


module.exports=mapObject;
});
__d('fbjs/lib/shallowEqual.js',function(global, require, module, exports) {  'use strict';














var hasOwnProperty=Object.prototype.hasOwnProperty;






function shallowEqual(objA,objB){
if(objA===objB){
return true;}


if(typeof objA!=='object'||objA===null||typeof objB!=='object'||objB===null){
return false;}


var keysA=Object.keys(objA);
var keysB=Object.keys(objB);

if(keysA.length!==keysB.length){
return false;}



var bHasOwnProperty=hasOwnProperty.bind(objB);
for(var i=0;i<keysA.length;i++){
if(!bHasOwnProperty(keysA[i])||objA[keysA[i]]!==objB[keysA[i]]){
return false;}}



return true;}


module.exports=shallowEqual;
});
__d('fbjs/lib/keyOf.js',function(global, require, module, exports) {  "use strict";






















var keyOf=function(oneKeyObj){
var key;
for(key in oneKeyObj){
if(!oneKeyObj.hasOwnProperty(key)){
continue;}

return key;}

return null;};


module.exports=keyOf;
});
__d('fbjs/lib/joinClasses.js',function(global, require, module, exports) {  'use strict';




















function joinClasses(className){
if(!className){
className='';}

var nextClass;
var argLength=arguments.length;
if(argLength>1){
for(var ii=1;ii<argLength;ii++){
nextClass=arguments[ii];
if(nextClass){
className=(className?className+' ':'')+nextClass;}}}



return className;}


module.exports=joinClasses;
});
__d('IOSDefaultEventPluginOrder',function(global, require, module, exports) {  'use strict';












var IOSDefaultEventPluginOrder=[
'ResponderEventPlugin',
'IOSNativeBridgeEventPlugin'];


module.exports=IOSDefaultEventPluginOrder;
});
__d('regenerator/runtime.js',function(global, require, module, exports) {  "use strict";









!function(global){
"use strict";

var hasOwn=Object.prototype.hasOwnProperty;
var undefined;
var $Symbol=typeof Symbol==="function"?Symbol:{};
var iteratorSymbol=$Symbol.iterator||"@@iterator";
var toStringTagSymbol=$Symbol.toStringTag||"@@toStringTag";

var inModule=typeof module==="object";
var runtime=global.regeneratorRuntime;
if(runtime){
if(inModule){


module.exports=runtime;}



return;}




runtime=global.regeneratorRuntime=inModule?module.exports:{};

function wrap(innerFn,outerFn,self,tryLocsList){

var generator=Object.create((outerFn||Generator).prototype);
var context=new Context(tryLocsList||[]);



generator._invoke=makeInvokeMethod(innerFn,self,context);

return generator;}

runtime.wrap=wrap;











function tryCatch(fn,obj,arg){
try{
return {type:"normal",arg:fn.call(obj,arg)};}
catch(err){
return {type:"throw",arg:err};}}



var GenStateSuspendedStart="suspendedStart";
var GenStateSuspendedYield="suspendedYield";
var GenStateExecuting="executing";
var GenStateCompleted="completed";



var ContinueSentinel={};





function Generator(){}
function GeneratorFunction(){}
function GeneratorFunctionPrototype(){}

var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;
GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor=GeneratorFunction;
GeneratorFunctionPrototype[toStringTagSymbol]=GeneratorFunction.displayName="GeneratorFunction";



function defineIteratorMethods(prototype){
["next","throw","return"].forEach(function(method){
prototype[method]=function(arg){
return this._invoke(method,arg);};});}




runtime.isGeneratorFunction=function(genFun){
var ctor=typeof genFun==="function"&&genFun.constructor;
return ctor?
ctor===GeneratorFunction||


(ctor.displayName||ctor.name)==="GeneratorFunction":
false;};


runtime.mark=function(genFun){
if(Object.setPrototypeOf){
Object.setPrototypeOf(genFun,GeneratorFunctionPrototype);}else 
{
genFun.__proto__=GeneratorFunctionPrototype;
if(!(toStringTagSymbol in genFun)){
genFun[toStringTagSymbol]="GeneratorFunction";}}


genFun.prototype=Object.create(Gp);
return genFun;};







runtime.awrap=function(arg){
return new AwaitArgument(arg);};


function AwaitArgument(arg){
this.arg=arg;}


function AsyncIterator(generator){
function invoke(method,arg,resolve,reject){
var record=tryCatch(generator[method],generator,arg);
if(record.type==="throw"){
reject(record.arg);}else 
{
var result=record.arg;
var value=result.value;
if(value instanceof AwaitArgument){
return Promise.resolve(value.arg).then(function(value){
invoke("next",value,resolve,reject);},
function(err){
invoke("throw",err,resolve,reject);});}



return Promise.resolve(value).then(function(unwrapped){















result.value=unwrapped;
resolve(result);},
reject);}}



if(typeof process==="object"&&process.domain){
invoke=process.domain.bind(invoke);}


var previousPromise;

function enqueue(method,arg){
function callInvokeWithMethodAndArg(){
return new Promise(function(resolve,reject){
invoke(method,arg,resolve,reject);});}



return previousPromise=












previousPromise?previousPromise.then(
callInvokeWithMethodAndArg,


callInvokeWithMethodAndArg):
callInvokeWithMethodAndArg();}




this._invoke=enqueue;}


defineIteratorMethods(AsyncIterator.prototype);




runtime.async=function(innerFn,outerFn,self,tryLocsList){
var iter=new AsyncIterator(
wrap(innerFn,outerFn,self,tryLocsList));


return runtime.isGeneratorFunction(outerFn)?
iter:
iter.next().then(function(result){
return result.done?result.value:iter.next();});};



function makeInvokeMethod(innerFn,self,context){
var state=GenStateSuspendedStart;

return function invoke(method,arg){
if(state===GenStateExecuting){
throw new Error("Generator is already running");}


if(state===GenStateCompleted){
if(method==="throw"){
throw arg;}




return doneResult();}


while(true){
var delegate=context.delegate;
if(delegate){
if(method==="return"||
method==="throw"&&delegate.iterator[method]===undefined){


context.delegate=null;



var returnMethod=delegate.iterator["return"];
if(returnMethod){
var record=tryCatch(returnMethod,delegate.iterator,arg);
if(record.type==="throw"){


method="throw";
arg=record.arg;
continue;}}



if(method==="return"){


continue;}}



var record=tryCatch(
delegate.iterator[method],
delegate.iterator,
arg);


if(record.type==="throw"){
context.delegate=null;



method="throw";
arg=record.arg;
continue;}





method="next";
arg=undefined;

var info=record.arg;
if(info.done){
context[delegate.resultName]=info.value;
context.next=delegate.nextLoc;}else 
{
state=GenStateSuspendedYield;
return info;}


context.delegate=null;}


if(method==="next"){
if(state===GenStateSuspendedYield){
context.sent=arg;}else 
{
context.sent=undefined;}}else 


if(method==="throw"){
if(state===GenStateSuspendedStart){
state=GenStateCompleted;
throw arg;}


if(context.dispatchException(arg)){


method="next";
arg=undefined;}}else 


if(method==="return"){
context.abrupt("return",arg);}


state=GenStateExecuting;

var record=tryCatch(innerFn,self,context);
if(record.type==="normal"){


state=context.done?
GenStateCompleted:
GenStateSuspendedYield;

var info={
value:record.arg,
done:context.done};


if(record.arg===ContinueSentinel){
if(context.delegate&&method==="next"){


arg=undefined;}}else 

{
return info;}}else 


if(record.type==="throw"){
state=GenStateCompleted;


method="throw";
arg=record.arg;}}};}







defineIteratorMethods(Gp);

Gp[iteratorSymbol]=function(){
return this;};


Gp[toStringTagSymbol]="Generator";

Gp.toString=function(){
return "[object Generator]";};


function pushTryEntry(locs){
var entry={tryLoc:locs[0]};

if(1 in locs){
entry.catchLoc=locs[1];}


if(2 in locs){
entry.finallyLoc=locs[2];
entry.afterLoc=locs[3];}


this.tryEntries.push(entry);}


function resetTryEntry(entry){
var record=entry.completion||{};
record.type="normal";
delete record.arg;
entry.completion=record;}


function Context(tryLocsList){



this.tryEntries=[{tryLoc:"root"}];
tryLocsList.forEach(pushTryEntry,this);
this.reset(true);}


runtime.keys=function(object){
var keys=[];
for(var key in object){
keys.push(key);}

keys.reverse();



return function next(){
while(keys.length){
var key=keys.pop();
if(key in object){
next.value=key;
next.done=false;
return next;}}






next.done=true;
return next;};};



function values(iterable){
if(iterable){
var iteratorMethod=iterable[iteratorSymbol];
if(iteratorMethod){
return iteratorMethod.call(iterable);}


if(typeof iterable.next==="function"){
return iterable;}


if(!isNaN(iterable.length)){
var i=-1,next=function next(){
while(++i<iterable.length){
if(hasOwn.call(iterable,i)){
next.value=iterable[i];
next.done=false;
return next;}}



next.value=undefined;
next.done=true;

return next;};


return next.next=next;}}




return {next:doneResult};}

runtime.values=values;

function doneResult(){
return {value:undefined,done:true};}


Context.prototype={
constructor:Context,

reset:function(skipTempReset){
this.prev=0;
this.next=0;
this.sent=undefined;
this.done=false;
this.delegate=null;

this.tryEntries.forEach(resetTryEntry);

if(!skipTempReset){
for(var name in this){

if(name.charAt(0)==="t"&&
hasOwn.call(this,name)&&
!isNaN(+name.slice(1))){
this[name]=undefined;}}}},





stop:function(){
this.done=true;

var rootEntry=this.tryEntries[0];
var rootRecord=rootEntry.completion;
if(rootRecord.type==="throw"){
throw rootRecord.arg;}


return this.rval;},


dispatchException:function(exception){
if(this.done){
throw exception;}


var context=this;
function handle(loc,caught){
record.type="throw";
record.arg=exception;
context.next=loc;
return !!caught;}


for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
var record=entry.completion;

if(entry.tryLoc==="root"){



return handle("end");}


if(entry.tryLoc<=this.prev){
var hasCatch=hasOwn.call(entry,"catchLoc");
var hasFinally=hasOwn.call(entry,"finallyLoc");

if(hasCatch&&hasFinally){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);}else 
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);}}else 


if(hasCatch){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);}}else 


if(hasFinally){
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);}}else 


{
throw new Error("try statement without catch or finally");}}}},





abrupt:function(type,arg){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc<=this.prev&&
hasOwn.call(entry,"finallyLoc")&&
this.prev<entry.finallyLoc){
var finallyEntry=entry;
break;}}



if(finallyEntry&&(
type==="break"||
type==="continue")&&
finallyEntry.tryLoc<=arg&&
arg<=finallyEntry.finallyLoc){


finallyEntry=null;}


var record=finallyEntry?finallyEntry.completion:{};
record.type=type;
record.arg=arg;

if(finallyEntry){
this.next=finallyEntry.finallyLoc;}else 
{
this.complete(record);}


return ContinueSentinel;},


complete:function(record,afterLoc){
if(record.type==="throw"){
throw record.arg;}


if(record.type==="break"||
record.type==="continue"){
this.next=record.arg;}else 
if(record.type==="return"){
this.rval=record.arg;
this.next="end";}else 
if(record.type==="normal"&&afterLoc){
this.next=afterLoc;}},



finish:function(finallyLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.finallyLoc===finallyLoc){
this.complete(entry.completion,entry.afterLoc);
resetTryEntry(entry);
return ContinueSentinel;}}},




"catch":function(tryLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc===tryLoc){
var record=entry.completion;
if(record.type==="throw"){
var thrown=record.arg;
resetTryEntry(entry);}

return thrown;}}





throw new Error("illegal catch attempt");},


delegateYield:function(iterable,resultName,nextLoc){
this.delegate={
iterator:values(iterable),
resultName:resultName,
nextLoc:nextLoc};


return ContinueSentinel;}};}(






typeof global==="object"?global:
typeof window==="object"?window:
typeof self==="object"?self:this);
});
__d('FormData',function(global, require, module, exports) {  'use strict';var 














































FormData=function(){


function FormData(){babelHelpers.classCallCheck(this,FormData);
this._parts=[];}babelHelpers.createClass(FormData,[{key:'append',value:function append(


key,value){





this._parts.push([key,value]);}},{key:'getParts',value:function getParts()


{
return this._parts.map(function(_ref){var _ref2=babelHelpers.slicedToArray(_ref,2);var name=_ref2[0];var value=_ref2[1];
var contentDisposition='form-data; name="'+name+'"';

if(typeof value!=='object'){
value=''+value;}



var headers={'content-disposition':contentDisposition};





if(typeof value==='object'){
if(typeof value.name==='string'){
headers['content-disposition']+='; filename="'+value.name+'"';}

if(typeof value.type==='string'){
headers['content-type']=value.type;}

return babelHelpers.extends({},value,{headers:headers,fieldName:name});}


return {string:String(value),headers:headers,fieldName:name};});}}]);return FormData;}();




module.exports=FormData;
});
__d('fetch',function(global, require, module, exports) {  'use strict';
















var self={};

/**
 * Copyright (c) 2014 GitHub, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @preserve-header
 */
(function(){
'use strict';

if(self.fetch){
return;}


function normalizeName(name){
if(typeof name!=='string'){
name=String(name);}

if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){
throw new TypeError('Invalid character in header field name');}

return name.toLowerCase();}


function normalizeValue(value){
if(typeof value!=='string'){
value=String(value);}

return value;}


function Headers(headers){
this.map={};

if(headers instanceof Headers){
headers.forEach(function(value,name){
this.append(name,value);},
this);}else 

if(headers){
Object.getOwnPropertyNames(headers).forEach(function(name){
this.append(name,headers[name]);},
this);}}



Headers.prototype.append=function(name,value){
name=normalizeName(name);
value=normalizeValue(value);
var list=this.map[name];
if(!list){
list=[];
this.map[name]=list;}

list.push(value);};


Headers.prototype['delete']=function(name){
delete this.map[normalizeName(name)];};


Headers.prototype.get=function(name){
var values=this.map[normalizeName(name)];
return values?values[0]:null;};


Headers.prototype.getAll=function(name){
return this.map[normalizeName(name)]||[];};


Headers.prototype.has=function(name){
return this.map.hasOwnProperty(normalizeName(name));};


Headers.prototype.set=function(name,value){
this.map[normalizeName(name)]=[normalizeValue(value)];};


Headers.prototype.forEach=function(callback,thisArg){
Object.getOwnPropertyNames(this.map).forEach(function(name){
this.map[name].forEach(function(value){
callback.call(thisArg,value,name,this);},
this);},
this);};


function consumed(body){
if(body.bodyUsed){
return Promise.reject(new TypeError('Already read'));}

body.bodyUsed=true;}


function fileReaderReady(reader){
return new Promise(function(resolve,reject){
reader.onload=function(){
resolve(reader.result);};

reader.onerror=function(){
reject(reader.error);};});}




function readBlobAsArrayBuffer(blob){
var reader=new FileReader();
reader.readAsArrayBuffer(blob);
return fileReaderReady(reader);}


function readBlobAsText(blob){
var reader=new FileReader();
reader.readAsText(blob);
return fileReaderReady(reader);}


var support={
blob:typeof FileReader==='function'&&typeof Blob==='function'&&function(){
try{
new Blob();
return true;}
catch(e){
return false;}}(),


formData:typeof FormData==='function'};


function Body(){
this.bodyUsed=false;


this._initBody=function(body){
this._bodyInit=body;
if(typeof body==='string'){
this._bodyText=body;}else 
if(support.blob&&Blob.prototype.isPrototypeOf(body)){
this._bodyBlob=body;}else 
if(support.formData&&FormData.prototype.isPrototypeOf(body)){
this._bodyFormData=body;}else 
if(!body){
this._bodyText='';}else 
{
throw new Error('unsupported BodyInit type');}};



if(support.blob){
this.blob=function(){
var rejected=consumed(this);
if(rejected){
return rejected;}


if(this._bodyBlob){
return Promise.resolve(this._bodyBlob);}else 
if(this._bodyFormData){
throw new Error('could not read FormData body as blob');}else 
{
return Promise.resolve(new Blob([this._bodyText]));}};



this.arrayBuffer=function(){
return this.blob().then(readBlobAsArrayBuffer);};


this.text=function(){
var rejected=consumed(this);
if(rejected){
return rejected;}


if(this._bodyBlob){
return readBlobAsText(this._bodyBlob);}else 
if(this._bodyFormData){
throw new Error('could not read FormData body as text');}else 
{
return Promise.resolve(this._bodyText);}};}else 


{
this.text=function(){
var rejected=consumed(this);
return rejected?rejected:Promise.resolve(this._bodyText);};}



if(support.formData){
this.formData=function(){
return this.text().then(decode);};}



this.json=function(){
return this.text().then(JSON.parse);};


return this;}



var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];

function normalizeMethod(method){
var upcased=method.toUpperCase();
return methods.indexOf(upcased)>-1?upcased:method;}


function Request(input,options){
options=options||{};
var body=options.body;
if(Request.prototype.isPrototypeOf(input)){
if(input.bodyUsed){
throw new TypeError('Already read');}

this.url=input.url;
this.credentials=input.credentials;
if(!options.headers){
this.headers=new Headers(input.headers);}

this.method=input.method;
this.mode=input.mode;
if(!body){
body=input._bodyInit;
input.bodyUsed=true;}}else 

{
this.url=input;}


this.credentials=options.credentials||this.credentials||'omit';
if(options.headers||!this.headers){
this.headers=new Headers(options.headers);}

this.method=normalizeMethod(options.method||this.method||'GET');
this.mode=options.mode||this.mode||null;
this.referrer=null;

if((this.method==='GET'||this.method==='HEAD')&&body){
throw new TypeError('Body not allowed for GET or HEAD requests');}

this._initBody(body);}


Request.prototype.clone=function(){
return new Request(this);};


function decode(body){
var form=new FormData();
body.trim().split('&').forEach(function(bytes){
if(bytes){
var split=bytes.split('=');
var name=split.shift().replace(/\+/g,' ');
var value=split.join('=').replace(/\+/g,' ');
form.append(decodeURIComponent(name),decodeURIComponent(value));}});


return form;}


function headers(xhr){
var head=new Headers();
var pairs=xhr.getAllResponseHeaders().trim().split('\n');
pairs.forEach(function(header){
var split=header.trim().split(':');
var key=split.shift().trim();
var value=split.join(':').trim();
head.append(key,value);});

return head;}


Body.call(Request.prototype);

function Response(bodyInit,options){
if(!options){
options={};}


this._initBody(bodyInit);
this.type='default';
this.url=null;
this.status=options.status;
this.ok=this.status>=200&&this.status<300;
this.statusText=options.statusText;
this.headers=options.headers instanceof Headers?options.headers:new Headers(options.headers);
this.url=options.url||'';}


Response.prototype.clone=function(){
return new Response(this._bodyInit,{
status:this.status,
statusText:this.statusText,
headers:new Headers(this.headers),
url:this.url});};



Body.call(Response.prototype);

self.Headers=Headers;
self.Request=Request;
self.Response=Response;

self.fetch=function(input,init){
var request;
if(Request.prototype.isPrototypeOf(input)&&!init){
request=input;}else 
{
request=new Request(input,init);}


return new Promise(function(resolve,reject){
var xhr=new XMLHttpRequest();

function responseURL(){
if('responseURL' in xhr){
return xhr.responseURL;}



if(/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())){
return xhr.getResponseHeader('X-Request-URL');}


return;}


xhr.onload=function(){
var status=xhr.status===1223?204:xhr.status;
if(status<100||status>599){
reject(new TypeError('Network request failed'));
return;}

var options={
status:status,
statusText:xhr.statusText,
headers:headers(xhr),
url:responseURL()};

var body='response' in xhr?xhr.response:xhr.responseText;
resolve(new Response(body,options));};


xhr.onerror=function(){
reject(new TypeError('Network request failed'));};


xhr.open(request.method,request.url,true);

if(request.credentials==='include'){
xhr.withCredentials=true;}


if('responseType' in xhr&&support.blob){
xhr.responseType='blob';}


request.headers.forEach(function(value,name){
xhr.setRequestHeader(name,value);});


xhr.send(typeof request._bodyInit==='undefined'?null:request._bodyInit);});};


self.fetch.polyfill=true;})();




module.exports=self;
});
__d('stacktrace-parser/lib/stacktrace-parser.js',function(global, require, module, exports) {  'use strict';

var UNKNOWN_FUNCTION='<unknown>';

var StackTraceParser={




parse:function(stackString){
var chrome=/^\s*at (?:(?:(?:Anonymous function)?|((?:\[object object\])?\S+(?: \[as \S+\])?)) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
gecko=/^(?:\s*(\S*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i,
node=/^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i,
lines=stackString.split('\n'),
stack=[],
parts,
element;

for(var i=0,j=lines.length;i<j;++i){
if(parts=gecko.exec(lines[i])){
element={
'file':parts[3],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[4],
'column':parts[5]?+parts[5]:null};}else 

if(parts=chrome.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};}else 

if(parts=node.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};}else 

{
continue;}


stack.push(element);}


return stack;}};




module.exports=StackTraceParser;
});
__d('global/window.js',function(global, require, module, exports) {  "use strict";if(typeof window!=="undefined"){
module.exports=window;}else 
if(typeof global!=="undefined"){
module.exports=global;}else 
if(typeof self!=="undefined"){
module.exports=self;}else 
{
module.exports={};}
});
__d('react-proxy/modules/supportsProtoAssignment.js',function(global, require, module, exports) {  "use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=supportsProtoAssignment;
var x={};
var y={supports:true};
try{
x.__proto__=y;}
catch(err){}

function supportsProtoAssignment(){
return x.supports||false;}
;
});
__d('react-deep-force-update/lib/index.js',function(global, require, module, exports) {  "use strict";

exports.__esModule=true;
exports["default"]=getForceUpdate;
function traverseRenderedChildren(internalInstance,callback,argument){
callback(internalInstance,argument);

if(internalInstance._renderedComponent){
traverseRenderedChildren(internalInstance._renderedComponent,callback,argument);}else 
{
for(var key in internalInstance._renderedChildren){
if(internalInstance._renderedChildren.hasOwnProperty(key)){
traverseRenderedChildren(internalInstance._renderedChildren[key],callback,argument);}}}}





function setPendingForceUpdate(internalInstance){
if(internalInstance._pendingForceUpdate===false){
internalInstance._pendingForceUpdate=true;}}



function forceUpdateIfPending(internalInstance,React){
if(internalInstance._pendingForceUpdate===true){
var publicInstance=internalInstance._instance;
React.Component.prototype.forceUpdate.call(publicInstance);}}



function getForceUpdate(React){
return function(instance){
var internalInstance=instance._reactInternalInstance;
traverseRenderedChildren(internalInstance,setPendingForceUpdate);
traverseRenderedChildren(internalInstance,forceUpdateIfPending,React);};}



module.exports=exports["default"];
});
__d('react-proxy/modules/bindAutoBindMethods.js',function(global, require, module, exports) {  'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=bindAutoBindMethods;












function bindAutoBindMethod(component,method){
var boundMethod=method.bind(component);

boundMethod.__reactBoundContext=component;
boundMethod.__reactBoundMethod=method;
boundMethod.__reactBoundArguments=null;

var componentName=component.constructor.displayName,
_bind=boundMethod.bind;

boundMethod.bind=function(newThis){
var args=Array.prototype.slice.call(arguments,1);
if(newThis!==component&&newThis!==null){
console.warn('bind(): React component methods may only be bound to the '+'component instance. See '+componentName);}else 
if(!args.length){
console.warn('bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See '+componentName);
return boundMethod;}


var reboundMethod=_bind.apply(boundMethod,arguments);
reboundMethod.__reactBoundContext=component;
reboundMethod.__reactBoundMethod=method;
reboundMethod.__reactBoundArguments=args;

return reboundMethod;};


return boundMethod;}


function bindAutoBindMethodsFromMap(component){
for(var autoBindKey in component.__reactAutoBindMap){
if(!component.__reactAutoBindMap.hasOwnProperty(autoBindKey)){
return;}





if(component.hasOwnProperty(autoBindKey)&&component[autoBindKey].__reactBoundContext===component){
continue;}


var method=component.__reactAutoBindMap[autoBindKey];
component[autoBindKey]=bindAutoBindMethod(component,method);}}



function bindAutoBindMethods(component){
if(component.__reactAutoBindPairs){
bindAutoBindMethodsFromArray(component);}else 
if(component.__reactAutoBindMap){
bindAutoBindMethodsFromMap(component);}}



function bindAutoBindMethodsFromArray(component){
var pairs=component.__reactAutoBindPairs;

if(!pairs){
return;}


for(var i=0;i<pairs.length;i+=2){
var autoBindKey=pairs[i];

if(component.hasOwnProperty(autoBindKey)&&component[autoBindKey].__reactBoundContext===component){
continue;}


var method=pairs[i+1];

component[autoBindKey]=bindAutoBindMethod(component,method);}}
});
__d('react-proxy/modules/deleteUnknownAutoBindMethods.js',function(global, require, module, exports) {  'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=deleteUnknownAutoBindMethods;
function shouldDeleteClassicInstanceMethod(component,name){
if(component.__reactAutoBindMap&&component.__reactAutoBindMap.hasOwnProperty(name)){

return false;}


if(component.__reactAutoBindPairs&&component.__reactAutoBindPairs.indexOf(name)>=0){

return false;}


if(component[name].__reactBoundArguments!==null){

return false;}




return true;}


function shouldDeleteModernInstanceMethod(component,name){
var prototype=component.constructor.prototype;

var prototypeDescriptor=Object.getOwnPropertyDescriptor(prototype,name);

if(!prototypeDescriptor||!prototypeDescriptor.get){

return false;}


if(prototypeDescriptor.get().length!==component[name].length){

return false;}




return true;}


function shouldDeleteInstanceMethod(component,name){
var descriptor=Object.getOwnPropertyDescriptor(component,name);
if(typeof descriptor.value!=='function'){

return;}


if(component.__reactAutoBindMap||component.__reactAutoBindPairs){

return shouldDeleteClassicInstanceMethod(component,name);}else 
{

return shouldDeleteModernInstanceMethod(component,name);}}














function deleteUnknownAutoBindMethods(component){
var names=Object.getOwnPropertyNames(component);

names.forEach(function(name){
if(shouldDeleteInstanceMethod(component,name)){
delete component[name];}});}
});
__d('lodash/_baseFind.js',function(global, require, module, exports) {  "use strict";











function baseFind(collection,predicate,eachFunc,retKey){
var result;
eachFunc(collection,function(value,key,collection){
if(predicate(value,key,collection)){
result=retKey?key:value;
return false;}});


return result;}


module.exports=baseFind;
});
__d('lodash/_baseFindIndex.js',function(global, require, module, exports) {  "use strict";









function baseFindIndex(array,predicate,fromRight){
var length=array.length,
index=fromRight?length:-1;

while(fromRight?index--:++index<length){
if(predicate(array[index],index,array)){
return index;}}


return -1;}


module.exports=baseFindIndex;
});
__d('lodash/isArray.js',function(global, require, module, exports) {  "use strict";






















var isArray=Array.isArray;

module.exports=isArray;
});
__d('lodash/_createBaseFor.js',function(global, require, module, exports) {  "use strict";






function createBaseFor(fromRight){
return function(object,iteratee,keysFunc){
var index=-1,
iterable=Object(object),
props=keysFunc(object),
length=props.length;

while(length--){
var key=props[fromRight?length:++index];
if(iteratee(iterable[key],key,iterable)===false){
break;}}


return object;};}



module.exports=createBaseFor;
});
__d('lodash/_baseHas.js',function(global, require, module, exports) {  'use strict';
var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;


var getPrototypeOf=Object.getPrototypeOf;









function baseHas(object,key){



return hasOwnProperty.call(object,key)||
typeof object=='object'&&key in object&&getPrototypeOf(object)===null;}


module.exports=baseHas;
});
__d('lodash/_baseKeys.js',function(global, require, module, exports) {  "use strict";
var nativeKeys=Object.keys;









function baseKeys(object){
return nativeKeys(Object(object));}


module.exports=baseKeys;
});
__d('lodash/_isIndex.js',function(global, require, module, exports) {  'use strict';
var MAX_SAFE_INTEGER=9007199254740991;


var reIsUint=/^(?:0|[1-9]\d*)$/;









function isIndex(value,length){
value=typeof value=='number'||reIsUint.test(value)?+value:-1;
length=length==null?MAX_SAFE_INTEGER:length;
return value>-1&&value%1==0&&value<length;}


module.exports=isIndex;
});
__d('lodash/_isPrototype.js',function(global, require, module, exports) {  'use strict';
var objectProto=Object.prototype;








function isPrototype(value){
var Ctor=value&&value.constructor,
proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;

return value===proto;}


module.exports=isPrototype;
});
__d('lodash/_baseTimes.js',function(global, require, module, exports) {  "use strict";








function baseTimes(n,iteratee){
var index=-1,
result=Array(n);

while(++index<n){
result[index]=iteratee(index);}

return result;}


module.exports=baseTimes;
});
__d('lodash/isLength.js',function(global, require, module, exports) {  'use strict';
var MAX_SAFE_INTEGER=9007199254740991;

























function isLength(value){
return typeof value=='number'&&
value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}


module.exports=isLength;
});
__d('lodash/isObjectLike.js',function(global, require, module, exports) {  'use strict';






















function isObjectLike(value){
return !!value&&typeof value=='object';}


module.exports=isObjectLike;
});
__d('lodash/_baseProperty.js',function(global, require, module, exports) {  "use strict";






function baseProperty(key){
return function(object){
return object==null?undefined:object[key];};}



module.exports=baseProperty;
});
__d('lodash/isObject.js',function(global, require, module, exports) {  'use strict';






















function isObject(value){
var type=typeof value;
return !!value&&(type=='object'||type=='function');}


module.exports=isObject;
});
__d('lodash/identity.js',function(global, require, module, exports) {  "use strict";














function identity(value){
return value;}


module.exports=identity;
});
__d('lodash/_stackClear.js',function(global, require, module, exports) {  'use strict';






function stackClear(){
this.__data__={'array':[],'map':null};}


module.exports=stackClear;
});
__d('lodash/eq.js',function(global, require, module, exports) {  "use strict";





























function eq(value,other){
return value===other||value!==value&&other!==other;}


module.exports=eq;
});
__d('lodash/_arrayMap.js',function(global, require, module, exports) {  "use strict";








function arrayMap(array,iteratee){
var index=-1,
length=array.length,
result=Array(length);

while(++index<length){
result[index]=iteratee(array[index],index,array);}

return result;}


module.exports=arrayMap;
});
__d('lodash/_isHostObject.js',function(global, require, module, exports) {  'use strict';






function isHostObject(value){


var result=false;
if(value!=null&&typeof value.toString!='function'){
try{
result=!!(value+'');}
catch(e){}}

return result;}


module.exports=isHostObject;
});
__d('lodash/_arraySome.js',function(global, require, module, exports) {  "use strict";








function arraySome(array,predicate){
var index=-1,
length=array.length;

while(++index<length){
if(predicate(array[index],index,array)){
return true;}}


return false;}


module.exports=arraySome;
});
__d('lodash/_mapToArray.js',function(global, require, module, exports) {  "use strict";






function mapToArray(map){
var index=-1,
result=Array(map.size);

map.forEach(function(value,key){
result[++index]=[key,value];});

return result;}


module.exports=mapToArray;
});
__d('lodash/_setToArray.js',function(global, require, module, exports) {  "use strict";






function setToArray(set){
var index=-1,
result=Array(set.size);

set.forEach(function(value){
result[++index]=value;});

return result;}


module.exports=setToArray;
});
__d('lodash/_checkGlobal.js',function(global, require, module, exports) {  "use strict";






function checkGlobal(value){
return value&&value.Object===Object?value:null;}


module.exports=checkGlobal;
});
__d('lodash/_baseHasIn.js',function(global, require, module, exports) {  "use strict";







function baseHasIn(object,key){
return key in Object(object);}


module.exports=baseHasIn;
});
__d('lodash/last.js',function(global, require, module, exports) {  "use strict";












function last(array){
var length=array?array.length:0;
return length?array[length-1]:undefined;}


module.exports=last;
});
__d('lodash/_baseSlice.js',function(global, require, module, exports) {  "use strict";








function baseSlice(array,start,end){
var index=-1,
length=array.length;

if(start<0){
start=-start>length?0:length+start;}

end=end>length?length:end;
if(end<0){
end+=length;}

length=start>end?0:end-start>>>0;
start>>>=0;

var result=Array(length);
while(++index<length){
result[index]=array[index+start];}

return result;}


module.exports=baseSlice;
});
__d('lodash/_arrayIncludesWith.js',function(global, require, module, exports) {  "use strict";








function arrayIncludesWith(array,value,comparator){
var index=-1,
length=array.length;

while(++index<length){
if(comparator(value,array[index])){
return true;}}


return false;}


module.exports=arrayIncludesWith;
});
__d('lodash/_baseUnary.js',function(global, require, module, exports) {  "use strict";






function baseUnary(func){
return function(value){
return func(value);};}



module.exports=baseUnary;
});
__d('lodash/_isKeyable.js',function(global, require, module, exports) {  'use strict';






function isKeyable(value){
var type=typeof value;
return type=='number'||type=='boolean'||
type=='string'&&value!='__proto__'||value==null;}


module.exports=isKeyable;
});
__d('lodash/_indexOfNaN.js',function(global, require, module, exports) {  "use strict";








function indexOfNaN(array,fromIndex,fromRight){
var length=array.length,
index=fromIndex+(fromRight?0:-1);

while(fromRight?index--:++index<length){
var other=array[index];
if(other!==other){
return index;}}


return -1;}


module.exports=indexOfNaN;
});
__d('lodash/_arrayPush.js',function(global, require, module, exports) {  "use strict";







function arrayPush(array,values){
var index=-1,
length=values.length,
offset=array.length;

while(++index<length){
array[offset+index]=values[index];}

return array;}


module.exports=arrayPush;
});
__d('lodash/_apply.js',function(global, require, module, exports) {  "use strict";









function apply(func,thisArg,args){
var length=args.length;
switch(length){
case 0:return func.call(thisArg);
case 1:return func.call(thisArg,args[0]);
case 2:return func.call(thisArg,args[0],args[1]);
case 3:return func.call(thisArg,args[0],args[1],args[2]);}

return func.apply(thisArg,args);}


module.exports=apply;
});
__d('ReactEmptyComponentRegistry',function(global, require, module, exports) {  'use strict';














var nullComponentIDsRegistry={};





function isNullComponentID(id){
return !!nullComponentIDsRegistry[id];}






function registerNullComponentID(id){
nullComponentIDsRegistry[id]=true;}






function deregisterNullComponentID(id){
delete nullComponentIDsRegistry[id];}


var ReactEmptyComponentRegistry={
isNullComponentID:isNullComponentID,
registerNullComponentID:registerNullComponentID,
deregisterNullComponentID:deregisterNullComponentID};


module.exports=ReactEmptyComponentRegistry;
});
__d('fbjs/lib/emptyObject.js',function(global, require, module, exports) {  'use strict';











var emptyObject={};

if(process.env.NODE_ENV!=='production'){
Object.freeze(emptyObject);}


module.exports=emptyObject;
});
__d('ReactDOMFeatureFlags',function(global, require, module, exports) {  'use strict';












var ReactDOMFeatureFlags={
useCreateElement:false};


module.exports=ReactDOMFeatureFlags;
});
__d('adler32',function(global, require, module, exports) {  'use strict';












var MOD=65521;






function adler32(data){
var a=1;
var b=0;
var i=0;
var l=data.length;
var m=l&~0x3;
while(i<m){
for(;i<Math.min(i+4096,m);i+=4){
b+=(a+=data.charCodeAt(i))+(a+=data.charCodeAt(i+1))+(a+=data.charCodeAt(i+2))+(a+=data.charCodeAt(i+3));}

a%=MOD;
b%=MOD;}

for(;i<l;i++){
b+=a+=data.charCodeAt(i);}

a%=MOD;
b%=MOD;
return a|b<<16;}


module.exports=adler32;
});
__d('fbjs/lib/isNode.js',function(global, require, module, exports) {  'use strict';

















function isNode(object){
return !!(object&&(typeof Node==='function'?object instanceof Node:typeof object==='object'&&typeof object.nodeType==='number'&&typeof object.nodeName==='string'));}


module.exports=isNode;
});
__d('fbjs/lib/ExecutionEnvironment.js',function(global, require, module, exports) {  'use strict';












var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement);







var ExecutionEnvironment={

canUseDOM:canUseDOM,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:canUseDOM&&!!(window.addEventListener||window.attachEvent),

canUseViewport:canUseDOM&&!!window.screen,

isInWorker:!canUseDOM};



module.exports=ExecutionEnvironment;
});
__d('ReactErrorUtils',function(global, require, module, exports) {  'use strict';













var caughtError=null;









function invokeGuardedCallback(name,func,a,b){
try{
return func(a,b);}
catch(x){
if(caughtError===null){
caughtError=x;}

return undefined;}}



var ReactErrorUtils={
invokeGuardedCallback:invokeGuardedCallback,





invokeGuardedCallbackWithCatch:invokeGuardedCallback,





rethrowCaughtError:function(){
if(caughtError){
var error=caughtError;
caughtError=null;
throw error;}}};




if(process.env.NODE_ENV!=='production'){




if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){
var fakeNode=document.createElement('react');
ReactErrorUtils.invokeGuardedCallback=function(name,func,a,b){
var boundFunc=func.bind(null,a,b);
var evtType='react-'+name;
fakeNode.addEventListener(evtType,boundFunc,false);
var evt=document.createEvent('Event');
evt.initEvent(evtType,false,false);
fakeNode.dispatchEvent(evt);
fakeNode.removeEventListener(evtType,boundFunc,false);};}}




module.exports=ReactErrorUtils;
});
__d('forEachAccumulated',function(global, require, module, exports) {  'use strict';



















var forEachAccumulated=function(arr,cb,scope){
if(Array.isArray(arr)){
arr.forEach(cb,scope);}else 
if(arr){
cb.call(scope,arr);}};



module.exports=forEachAccumulated;
});
__d('ViewportMetrics',function(global, require, module, exports) {  'use strict';












var ViewportMetrics={

currentScrollLeft:0,

currentScrollTop:0,

refreshScrollValues:function(scrollPosition){
ViewportMetrics.currentScrollLeft=scrollPosition.x;
ViewportMetrics.currentScrollTop=scrollPosition.y;}};




module.exports=ViewportMetrics;
});
__d('ReactRootIndex',function(global, require, module, exports) {  'use strict';













var ReactRootIndexInjection={



injectCreateReactRootIndex:function(_createReactRootIndex){
ReactRootIndex.createReactRootIndex=_createReactRootIndex;}};



var ReactRootIndex={
createReactRootIndex:null,
injection:ReactRootIndexInjection};


module.exports=ReactRootIndex;
});
__d('image!ic_search',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/release/drawable-xxhdpi/ic_search.png","uri":"ic_search","width":92,"height":92,"deprecated":true};
});
__d('image!default_cover',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/debug/drawable-hdpi/default_cover.png","uri":"default_cover","width":512,"height":512,"deprecated":true};
});
__d('image!ic_play_circle_outline_black_36dp',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/release/drawable-xxxhdpi/ic_play_circle_outline_black_36dp.png","uri":"ic_play_circle_outline_black_36dp","width":144,"height":144,"deprecated":true};
});
__d('image!menu_background',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/debug/drawable-hdpi/menu_background.png","uri":"menu_background","width":480,"height":272,"deprecated":true};
});
__d('image!ic_action',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/release/drawable-xxhdpi/ic_action.png","uri":"ic_action","width":92,"height":92,"deprecated":true};
});
__d('image!ic_pause_black_48dp',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/release/drawable-xxxhdpi/ic_pause_black_48dp.png","uri":"ic_pause_black_48dp","width":192,"height":192,"deprecated":true};
});
__d('image!ic_play_circle_outline_black_48dp',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/release/drawable-xxxhdpi/ic_play_circle_outline_black_48dp.png","uri":"ic_play_circle_outline_black_48dp","width":192,"height":192,"deprecated":true};
});
__d('image!ic_close_black_48dp',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/release/drawable-xxxhdpi/ic_close_black_48dp.png","uri":"ic_close_black_48dp","width":192,"height":192,"deprecated":true};
});
__d('image!ic_skip_previous_black_48dp',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/release/drawable-xxxhdpi/ic_skip_previous_black_48dp.png","uri":"ic_skip_previous_black_48dp","width":192,"height":192,"deprecated":true};
});
__d('image!ic_skip_next_black_48dp',function(global, require, module, exports) {  module.exports = {"__packager_asset":true,"path":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/android/app/build/intermediates/res/merged/release/drawable-xxxhdpi/ic_skip_next_black_48dp.png","uri":"ic_skip_next_black_48dp","width":192,"height":192,"deprecated":true};
});
__d('react-native/Libraries/CustomComponents/NavigationExperimental/back_chevron.png',function(global, require, module, exports) {  module.exports = require("AssetRegistry").registerAsset({"__packager_asset":true,"fileSystemLocation":"/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/node_modules/react-native/Libraries/CustomComponents/NavigationExperimental","httpServerLocation":"/assets/node_modules/react-native/Libraries/CustomComponents/NavigationExperimental","width":26,"height":42,"scales":[1],"files":["/home/nolitsou/Documents/dev/homyPi/HomyPiAndroid/node_modules/react-native/Libraries/CustomComponents/NavigationExperimental/back_chevron.png"],"hash":"ff62a71400a6f2c153edd030a2479ca7","name":"back_chevron","type":"png"});
});
__d('HomyPiAndroid/js/reducers/userReducers.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _UserActions=require("HomyPiAndroid/js/actions/UserActions.js");



function user()




{var state=arguments.length<=0||arguments[0]===undefined?{isFetching:false,hasFailed:false,token:null,username:""}:arguments[0];var action=arguments[1];
switch(action.type){
case _UserActions.REQUEST:
return babelHelpers.extends({},state,{hasFailed:false,error:"",isFetching:true,token:null});
case _UserActions.FAIL:
return babelHelpers.extends({},state,{hasFailed:true,error:action.error,isFetching:false,token:null});
case _UserActions.NOT_LOGGED_IN:
return babelHelpers.extends({},state,{hasFailed:!!action.error,error:action.error,isFetching:false,token:null});
case _UserActions.SUCCESS:
return babelHelpers.extends({},state,{hasFailed:false,error:"",isFetching:false,token:action.token});
case _UserActions.LOGOUT:
return babelHelpers.extends({},state,{username:"",token:null});
default:
return babelHelpers.extends({},state);}}exports.default=



{
user:user};
});
__d('HomyPiAndroid/js/reducers/routerReducers.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNativeRouterFlux=require("react-native-router-flux/index.js");

function router(){var state=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var action=arguments[1];
switch(action.type){
case _reactNativeRouterFlux.Actions.BEFORE_ROUTE:
return babelHelpers.extends({},state,{ready:false});
case _reactNativeRouterFlux.Actions.AFTER_FOCUS:
return babelHelpers.extends({},state,{ready:true});
default:
return state;}}exports.default=



{
router:router};
});
__d('HomyPiAndroid/index.android.js',function(global, require, module, exports) {  "use strict";












var _reactRedux=require("react-redux/lib/index.js");
var _io=require("HomyPiAndroid/js/io.js");var _io2=babelHelpers.interopRequireDefault(_io);
var _configureStore=require("HomyPiAndroid/js/configureStore.js");var _configureStore2=babelHelpers.interopRequireDefault(_configureStore);



var _UserActions=require("HomyPiAndroid/js/actions/UserActions.js");

var _PlayerNotification=require("HomyPiAndroid/js/natives/PlayerNotification.js");


var _Routes=require("HomyPiAndroid/js/components/Routes.js");var _Routes2=babelHelpers.interopRequireDefault(_Routes);

var _login=require("HomyPiAndroid/js/components/login.js");var _login2=babelHelpers.interopRequireDefault(_login);
var _app=require("HomyPiAndroid/js/components/app.js");var _app2=babelHelpers.interopRequireDefault(_app);
var _splash=require("HomyPiAndroid/js/components/splash.js");var _splash2=babelHelpers.interopRequireDefault(_splash);


var _playerFull=require("HomyPiAndroid/js/components/music/playerFull.js");var _playerFull2=babelHelpers.interopRequireDefault(_playerFull);

var _reactNativeRouterFlux=require("react-native-router-flux/index.js");var React=require("react-native/Libraries/react-native/react-native.js");var AppRegistry=React.AppRegistry;var StyleSheet=React.StyleSheet;var Text=React.Text;var View=React.View;var BackAndroid=React.BackAndroid;var store=(0,_configureStore2.default)();_io2.default.setStore(store);(0,_PlayerNotification.subscribe)(store);

BackAndroid.addEventListener("hardwareBackPress",function(){
try{
if(_reactNativeRouterFlux.Actions.currentRouter.stack.length>1){
_reactNativeRouterFlux.Actions.currentRouter.pop();}else 
{
_reactNativeRouterFlux.Actions.currentRouter.routes.app.childRouter.pop();}

return true;}

catch(err){
console.log("Cannot pop. Exiting the app...");
return false;}});



var HomyPiAndroid=React.createClass({displayName:"HomyPiAndroid",
render:function(){var _this=this;
var initialRoute={name:"splash",onLoggedIn:this.onLoggedIn};
return (
React.createElement(_reactRedux.Provider,{store:store},
React.createElement(_Routes2.default,{logout:function(){return _this._logout();}})));},



_logout:function(){
store.dispatch((0,_UserActions.logout)());
_reactNativeRouterFlux.Actions.login();},

styles:StyleSheet.create({
container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"#FAFAFA"},

welcome:{
fontSize:20,
textAlign:"center",
margin:10},

instructions:{
textAlign:"center",
color:"#333333",
marginBottom:5}})});




AppRegistry.registerComponent("HomyPiAndroid",function(){return HomyPiAndroid;});
});
__d('HomyPiAndroid/js/settings.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var AsyncStorage=require("react-native/Libraries/react-native/react-native.js").AsyncStorage;

var serverUrl=null;

var isValidUrl=function(url){
var urlregex=/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
if(!url)return false;
if(!url.endsWith("/")){
url=url+"/";}

return urlregex.test(url);};


var setServerUrl=function(newServerUrl){
if(!isValidUrl(newServerUrl)){
newServerUrl=null;}

serverUrl=newServerUrl;
AsyncStorage.setItem("homyServerUrl",serverUrl);};


var getServerUrl=function(){
return serverUrl;};


var loadStoredServerUrl=function(callback){
AsyncStorage.getItem("homyServerUrl",function(err,saved){
setServerUrl(saved);
callback(err,serverUrl);});};exports.default=



{
isValidUrl:isValidUrl,
getServerUrl:getServerUrl,
setServerUrl:setServerUrl,
loadStoredServerUrl:loadStoredServerUrl};
});
__d('HomyPiAndroid/js/components/Routes.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);
var _reactNativeRouterFlux=require("react-native-router-flux/index.js");


var _login=require("HomyPiAndroid/js/components/login.js");var _login2=babelHelpers.interopRequireDefault(_login);
var _app=require("HomyPiAndroid/js/components/app.js");var _app2=babelHelpers.interopRequireDefault(_app);
var _splash=require("HomyPiAndroid/js/components/splash.js");var _splash2=babelHelpers.interopRequireDefault(_splash);
var _playerFull=require("HomyPiAndroid/js/components/music/playerFull.js");var _playerFull2=babelHelpers.interopRequireDefault(_playerFull);var 


Routes=function(_Component){babelHelpers.inherits(Routes,_Component);function Routes(){babelHelpers.classCallCheck(this,Routes);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Routes).apply(this,arguments));}babelHelpers.createClass(Routes,[{key:"render",value:function render()
{
return (
_reactNative2.default.createElement(_reactNativeRouterFlux.Router,{hideNavBar:true},
_reactNative2.default.createElement(_reactNativeRouterFlux.Schema,{name:"modal",sceneConfig:_reactNative.Navigator.SceneConfigs.FloatFromBottom}),

_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"splash",schema:"modal",component:_splash2.default,title:"Splash"}),
_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"login",type:"replace",schema:"modal",component:_login2.default,title:"Login"}),
_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"app",type:"replace",schema:"modal",component:_app2.default,logout:this.props.logout,title:"App"}),
_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"player",schema:"modal",component:_playerFull2.default,title:"Player"})));}}]);return Routes;}(_reactNative.Component);exports.default=






Routes;
});
__d('react-native-material-kit/lib/MKPropTypes.js',function(global, require, module, exports) {  'use strict';var _require=




require('react-native/Libraries/react-native/react-native.js');var PropTypes=_require.PropTypes;var Text=_require.Text;





var dimen=PropTypes.shape({
width:PropTypes.number,
height:PropTypes.number});



var font=PropTypes.shape({
color:PropTypes.string,
fontSize:PropTypes.number,
fontWeight:Text.propTypes.style.fontWeight,
fontStyle:Text.propTypes.style.fontStyle,
fontFamily:PropTypes.string});



var rippleLocation=PropTypes.oneOf([
'tapLocation',
'center']);






exports.dimen=dimen;
exports.font=font;
exports.rippleLocation=rippleLocation;
});
__d('HomyPiAndroid/js/components/home.js',function(global, require, module, exports) {  "use strict";var React=require("react-native/Libraries/react-native/react-native.js");var 

AppRegistry=





React.AppRegistry;var StyleSheet=React.StyleSheet;var Text=React.Text;var View=React.View;var TextInput=React.TextInput;var TouchableHighlight=React.TouchableHighlight;
var Home=React.createClass({displayName:"Home",
render:function(){
return (
React.createElement(View,{style:this.styles.container},
React.createElement(View,{style:this.styles.status},
React.createElement(Text,{style:this.styles.status},"Raspberry status: "),React.createElement(Text,{style:[this.styles.statusOk,this.styles.status]},"GREEN"))));},




goToMusic:function(){},

styles:StyleSheet.create({
container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"#FAFAFA"},

status:{
flexDirection:"row"},

statusOk:{
color:"green"},

button:{
alignItems:"center",
marginBottom:7,
backgroundColor:"blue",
borderRadius:2},

buttonText:{
fontSize:24}})});




module.exports=Home;
});
__d('HomyPiAndroid/js/components/FrontComponent.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);var 

FrontComponent=function(_Component){babelHelpers.inherits(FrontComponent,_Component);
function FrontComponent(props){babelHelpers.classCallCheck(this,FrontComponent);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(FrontComponent).call(this,
props));}babelHelpers.createClass(FrontComponent,[{key:"componentDidMount",value:function componentDidMount()




















{}},{key:"render",value:function render()


{
return (
_reactNative2.default.createElement(_reactNative.View,null,
this.props.component));}}]);return FrontComponent;}(_reactNative.Component);exports.default=





FrontComponent;
});
__d('react-native-refreshable-listview/lib/ListView.js',function(global, require, module, exports) {  'use strict';var _require=require('react-native/Libraries/react-native/react-native.js');var ListView=_require.ListView;

module.exports=ListView;
});
__d('react-native-refreshable-listview/lib/RefreshingIndicator.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');var 

View=






React.View;var Text=React.Text;var ActivityIndicatorIOS=React.ActivityIndicatorIOS;var PropTypes=React.PropTypes;var StyleSheet=React.StyleSheet;var isValidElement=React.isValidElement;var createElement=React.createElement;

var RefreshingIndicator=React.createClass({displayName:'RefreshingIndicator',
propTypes:{
activityIndicatorComponent:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),
stylesheet:PropTypes.object,
description:PropTypes.oneOfType([PropTypes.string,PropTypes.element])},

getDefaultProps:function(){
return {
activityIndicatorComponent:ActivityIndicatorIOS};},


renderActivityIndicator:function(style){
var activityIndicator=this.props.activityIndicatorComponent;

if(isValidElement(activityIndicator)){
return activityIndicator;}else 
{
return createElement(activityIndicator,{style:style});}},


render:function(){
var styles=babelHelpers.extends({},stylesheet,this.props.stylesheet);

return (
React.createElement(View,{style:[styles.container,styles.wrapper]},
React.createElement(View,{style:[styles.container,styles.loading,styles.content]},
React.createElement(Text,{style:styles.description},
this.props.description),

this.renderActivityIndicator(styles.activityIndicator))));}});






var stylesheet=StyleSheet.create({
container:{
flex:1,
justifyContent:'space-around',
alignItems:'center'},

wrapper:{
height:60,
marginTop:10},

content:{
marginTop:10,
height:60}});



module.exports=RefreshingIndicator;
});
__d('react-native-refreshable-listview/lib/createElementFrom.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');var 

cloneElement=


React.cloneElement;var createElement=React.createElement;var isValidElement=React.isValidElement;

function createElementFrom(elementOrClass,props){
if(isValidElement(elementOrClass)){
return cloneElement(elementOrClass,props);}else 
{
return createElement(elementOrClass,props);}}



module.exports=createElementFrom;
});
__d('react-native-grid-view/index.js',function(global, require, module, exports) {  'use strict';

var React=require('react-native/Libraries/react-native/react-native.js');var 


AppRegistry=



React.AppRegistry;var View=React.View;var StyleSheet=React.StyleSheet;var ListView=React.ListView;

var CollectionView=React.createClass({displayName:'CollectionView',
groupItems:function(items,itemsPerRow){
var itemsGroups=[];
var group=[];
items.forEach(function(item){
if(group.length===itemsPerRow){
itemsGroups.push(group);
group=[item];}else 
{
group.push(item);}});



if(group.length>0){
itemsGroups.push(group);}


return itemsGroups;},

getInitialState:function(){
return {items:[],renderItem:null,style:undefined,itemsPerRow:1,onEndReached:undefined};},

renderGroup:function(group){
var that=this;
var items=group.map(function(item){
return that.props.renderItem(item);});

return (
React.createElement(View,{style:styles.group},
items));},



render:function(){
var groups=this.groupItems(this.props.items,this.props.itemsPerRow);
var ds=new ListView.DataSource({rowHasChanged:function(r1,r2){return r1!==r2;}});
return React.createElement(ListView,{
dataSource:ds.cloneWithRows(groups),
renderRow:this.renderGroup,
style:this.props.style,
onEndReached:this.props.onEndReached,
scrollEnabled:this.props.scrollEnabled});}});





var styles=StyleSheet.create({
group:{
flexDirection:'row',
alignItems:'center',
justifyContent:'center'}});



module.exports=CollectionView;
});
__d('react-native-dropdown/lib/option.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');var 


StyleSheet=



React.StyleSheet;var Component=React.Component;var View=React.View;var Text=React.Text;

var styles=StyleSheet.create({
container:{
padding:10}});var 



Option=function(_Component){babelHelpers.inherits(Option,_Component);
function Option(props){babelHelpers.classCallCheck(this,Option);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Option).call(this,
props));}babelHelpers.createClass(Option,[{key:'render',value:function render()


{var _props=
this.props;var style=_props.style;var styleText=_props.styleText;

return (
React.createElement(View,{style:[styles.container,style]},
React.createElement(Text,{style:styleText},this.props.children)));}}]);return Option;}(Component);





Option.propTypes={
children:React.PropTypes.string.isRequired};


module.exports=Option;
});
__d('react-native-dropdown/lib/overlay.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');var 


Dimensions=




React.Dimensions;var StyleSheet=React.StyleSheet;var Component=React.Component;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;var View=React.View;

var window=Dimensions.get('window');

var styles=StyleSheet.create({
container:{
position:'absolute',
top:0,
left:0,
right:0,
bottom:0},

overlay:{
position:'absolute',
backgroundColor:'transparent',
width:window.width,
height:window.height}});var 



Overlay=function(_Component){babelHelpers.inherits(Overlay,_Component);
function Overlay(props){babelHelpers.classCallCheck(this,Overlay);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Overlay).call(this,
props));}babelHelpers.createClass(Overlay,[{key:'render',value:function render()


{var _props=
this.props;var pageX=_props.pageX;var pageY=_props.pageY;var show=_props.show;var onPress=_props.onPress;

if(!show){
return null;}


return (
React.createElement(TouchableWithoutFeedback,{style:styles.container,onPress:onPress},
React.createElement(View,{style:[styles.overlay,{top:-pageY,left:-pageX}]})));}}]);return Overlay;}(Component);





Overlay.propTypes={
pageX:React.PropTypes.number,
pageY:React.PropTypes.number,
show:React.PropTypes.bool};


Overlay.defaultProps={
pageX:0,
pageY:0,
show:false};


module.exports=Overlay;
});
__d('react-native-dropdown/lib/items.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');var 


Dimensions=






React.Dimensions;var StyleSheet=React.StyleSheet;var Component=React.Component;var View=React.View;var ScrollView=React.ScrollView;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;var Text=React.Text;

var window=Dimensions.get('window');

var styles=StyleSheet.create({
scrollView:{
height:120,
width:198},

container:{
position:'absolute',
borderColor:'#BDBDC1',
borderWidth:2/window.scale,
borderTopColor:'transparent'}});var 



Items=function(_Component){babelHelpers.inherits(Items,_Component);
function Items(props){babelHelpers.classCallCheck(this,Items);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Items).call(this,
props));}babelHelpers.createClass(Items,[{key:'render',value:function render()


{var _props=
this.props;var items=_props.items;var positionX=_props.positionX;var positionY=_props.positionY;var show=_props.show;var onPress=_props.onPress;var width=_props.width;var height=_props.height;

if(!show){
return null;}


var renderedItems=React.Children.map(items,function(item){

return (
React.createElement(TouchableWithoutFeedback,{onPress:function(){return onPress(item.props.children,item.props.value);}},
React.createElement(View,{style:{padding:10}},
React.createElement(Text,null,item.props.children))));});





return (
React.createElement(View,{style:[styles.container,{top:positionY,left:positionX}]},
React.createElement(ScrollView,{
style:{width:width-2,height:height*3},
automaticallyAdjustContentInsets:false,
bounces:false},
renderedItems)));}}]);return Items;}(Component);






Items.propTypes={
positionX:React.PropTypes.number,
positionY:React.PropTypes.number,
show:React.PropTypes.bool,
onPress:React.PropTypes.func};


Items.defaultProps={
width:0,
height:0,
positionX:0,
positionY:0,
show:false,
onPress:function(){}};


module.exports=Items;
});
__d('react-native-dropdown/lib/updatePosition.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');var 



UIManager=

React.NativeModules.UIManager;

module.exports=function(ref,debug){
var handle=React.findNodeHandle(ref);
setTimeout(function(){
UIManager.measure(handle,function(x,y,width,height,pageX,pageY){
if(debug){
console.log(x,y,width,height,pageX,pageY);}

ref._currentPosition(pageX,pageY);});},

0);};
});
__d('HomyPiAndroid/js/components/music/Volume.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);var 

View=_reactNative2.default.View;var Text=_reactNative2.default.Text;var TouchableHighlight=_reactNative2.default.TouchableHighlight;var 

Volume=function(_React$Component){babelHelpers.inherits(Volume,_React$Component);
function Volume(props){babelHelpers.classCallCheck(this,Volume);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Volume).call(this,
props));
_this.percentage=100;return _this;}babelHelpers.createClass(Volume,[{key:"setTouch",value:function setTouch(


e){
return true;}},{key:"handleSetVolume",value:function handleSetVolume(

e){var _this2=this;
e.stopPropagation();var 
setVolume=this.props.setVolume;
var eventPageY=e.nativeEvent.pageY;
this.refs.volumeContainer.measure(function(ox,oy,width,height,px,py){
var yPos=height-(eventPageY-py);
var value=Math.round(yPos*_this2.props.max/height);
setVolume&&setVolume(value);});}},{key:"componentDidMount",value:function componentDidMount()


{}},{key:"render",value:function render()

{var _this3=this;var _props=
this.props;var value=_props.value;var min=_props.min;var max=_props.max;var showVolumeBar=_props.showVolumeBar;var bottom=_props.bottom;
if(value<min){
value=min;}


if(value>max){
value=max;}






this.percentage=value/max;




containerHeight=200;
var containerStyle={
"position":"absolute",
top:bottom.y-(containerHeight+50),
"left":bottom.x,
"height":containerHeight,
"width":30,
"backgroundColor":"#667278"};

var bar={
"position":"absolute",
bottom:0,
"backgroundColor":"#FC561E",
"height":containerHeight*value/max,
"marginLeft":5,
"marginRight":5,
"width":20};


return (
_reactNative2.default.createElement(View,null,
showVolumeBar?
_reactNative2.default.createElement(View,{style:containerStyle,
ref:"volumeContainer",
onStartShouldSetResponder:this.setTouch,
onMoveShouldSetResponder:this.setTouch,
onResponderRelease:function(evt){return _this3.handleSetVolume(evt);}},
_reactNative2.default.createElement(View,{style:bar})):
null));}}]);return Volume;}(_reactNative2.default.Component);






Volume.defaultProps={
value:0,
min:0,
max:100};exports.default=


Volume;
});
__d('react-native-router-flux/Common.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Route=exports.Schema=undefined;var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);var 


Schema=exports.Schema=function(_React$Component){babelHelpers.inherits(Schema,_React$Component);function Schema(){babelHelpers.classCallCheck(this,Schema);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Schema).apply(this,arguments));}babelHelpers.createClass(Schema,[{key:"className",value:function className()
{
return "Schema";}},{key:"render",value:function render()

{
return null;}}]);return Schema;}(_reactNative2.default.Component);var 




Route=exports.Route=function(_React$Component2){babelHelpers.inherits(Route,_React$Component2);function Route(){babelHelpers.classCallCheck(this,Route);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Route).apply(this,arguments));}babelHelpers.createClass(Route,[{key:"className",value:function className()
{
return "Route";}},{key:"render",value:function render()

{
return null;}}]);return Route;}(_reactNative2.default.Component);
});
__d('react-native-tabs/index.js',function(global, require, module, exports) {  'use strict';

var React=require('react-native/Libraries/react-native/react-native.js');var 

Component=




React.Component;var StyleSheet=React.StyleSheet;var View=React.View;var Text=React.Text;var TouchableOpacity=React.TouchableOpacity;var 

Tabs=function(_Component){babelHelpers.inherits(Tabs,_Component);function Tabs(){babelHelpers.classCallCheck(this,Tabs);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Tabs).apply(this,arguments));}babelHelpers.createClass(Tabs,[{key:'onSelect',value:function onSelect(
el){
if(el.props.onSelect){
el.props.onSelect(el);}else 
if(this.props.onSelect){
this.props.onSelect(el);}}},{key:'render',value:function render()



{var _this2=this;
var self=this;
var selected=this.props.selected;
if(!selected){
React.Children.forEach(this.props.children,function(el){
if(!selected||el.props.initial){
selected=el.props.name;}});}



return (
React.createElement(View,{style:[styles.tabbarView,this.props.style]},
React.Children.map(this.props.children,function(el){return (
React.createElement(TouchableOpacity,{key:el.props.name+"touch",
style:[styles.iconView,_this2.props.iconStyle,el.props.name==selected?_this2.props.selectedIconStyle||el.props.selectedIconStyle||{}:{}],
onPress:function(){return !self.props.locked&&self.onSelect(el);},
onLongPress:function(){return self.props.locked&&self.onSelect(el);}},
selected==el.props.name?React.cloneElement(el,{selected:true,style:[el.props.style,_this2.props.selectedStyle,el.props.selectedStyle]}):el));})));}}]);return Tabs;}(Component);






var styles=StyleSheet.create({
container:{
flex:1},

tabbarView:{
position:'absolute',
bottom:0,
right:0,
left:0,
height:50,
opacity:1,
backgroundColor:'transparent',
flexDirection:'row',
justifyContent:'center',
alignItems:'center'},

iconView:{
flex:1,
height:50,
justifyContent:'center',
alignItems:'center'},

contentView:{
flex:1}});



module.exports=Tabs;
});
__d('react-native-clone-referenced-element/cloneReferencedElement.js',function(global, require, module, exports) {  'use strict';

var React=require('react-native/Libraries/react-native/react-native.js');

function cloneReferencedElement(element,config){
var cloneRef=config.ref;
var originalRef=element.ref;for(var _len=arguments.length,children=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){children[_key-2]=arguments[_key];}
if(originalRef==null||cloneRef==null){
return React.cloneElement.apply(React,[element,config].concat(children));}


if(typeof originalRef!=='function'){
if(__DEV__){
console.warn(
'Cloning an element with a ref that will be overwritten because it '+
'is not a function. Use a composable callback-style ref instead. '+
'Ignoring ref: '+originalRef);}


return React.cloneElement.apply(React,[element,config].concat(children));}


return React.cloneElement.apply(React,[element,babelHelpers.extends({},
config,{
ref:function(component){
cloneRef(component);
originalRef(component);}})].concat(

children));}


module.exports=cloneReferencedElement;
});
__d('@exponent/react-native-navigator/Layout.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _reactNative=require('react-native/Libraries/react-native/react-native.js');exports.default=



{
pixel:1/_reactNative.PixelRatio.get()};
});
__d('@exponent/react-native-responsive-image/ResponsiveImage.js',function(global, require, module, exports) {  'use strict';

var React=require('react-native/Libraries/react-native/react-native.js');var 

Image=


React.Image;var PixelRatio=React.PixelRatio;var PropTypes=React.PropTypes;var 

ResponsiveImage=function(_React$Component){babelHelpers.inherits(ResponsiveImage,_React$Component);function ResponsiveImage(){babelHelpers.classCallCheck(this,ResponsiveImage);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ResponsiveImage).apply(this,arguments));}babelHelpers.createClass(ResponsiveImage,[{key:'setNativeProps',value:function setNativeProps(

nativeProps){
this.refs.image.setNativeProps(nativeProps);}},{key:'render',value:function render()


{var 
source=this.props.source;
var optimalSource=this._getClosestHighQualitySource();
if(optimalSource){
source=optimalSource;}

if(!source){
throw new Error('Couldn\'t find an appropriate image source');}


return React.createElement(Image,babelHelpers.extends({},this.props,{ref:'image',source:source}));}},{key:'_getClosestHighQualitySource',value:function _getClosestHighQualitySource()


{var 
sources=this.props.sources;
var pixelRatios=Object.keys(sources);
if(!pixelRatios.length){
return null;}


pixelRatios.sort(function(ratioA,ratioB){return (
parseFloat(ratioA)-parseFloat(ratioB));});

for(var ii=0;ii<pixelRatios.length;ii++){
if(pixelRatios[ii]>=PixelRatio.get()){
return sources[pixelRatios[ii]];}}



var largestPixelRatio=pixelRatios[pixelRatios.length-1];
return sources[largestPixelRatio];}}]);return ResponsiveImage;}(React.Component);



ResponsiveImage.propTypes=babelHelpers.extends({},
Image.propTypes,{
source:PropTypes.shape({
uri:PropTypes.string}),

sources:PropTypes.objectOf(Image.propTypes.source)});


module.exports=ResponsiveImage;
});
__d('@exponent/react-native-action-sheet/ActionSheet.android.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);












var OPACITY_ANIMATION_TIME=250;
var Y_ANIMATION_TIME=250;
var OFFSCREEN_HEIGHT=9999;
var PIXEL=1/_reactNative.PixelRatio.get();var 

ActionGroup=function(_React$Component){babelHelpers.inherits(ActionGroup,_React$Component);function ActionGroup(){babelHelpers.classCallCheck(this,ActionGroup);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ActionGroup).apply(this,arguments));}babelHelpers.createClass(ActionGroup,[{key:'render',value:function render()








{var _props=






this.props;var options=_props.options;var destructiveButtonIndex=_props.destructiveButtonIndex;var onSelect=_props.onSelect;var startIndex=_props.startIndex;var length=_props.length;

var optionViews=[];var _loop=function(
i){
var color='#007aff';
if(i===destructiveButtonIndex){
color='#ff3b30';}


optionViews.push(
_reactNative2.default.createElement(_reactNative.TouchableOpacity,{
key:i,
onPress:function(){return onSelect(i);},
style:styles.button},
_reactNative2.default.createElement(_reactNative.Text,{style:[styles.text,{color:color}]},
options[i])));




if(i<startIndex+length-1){
optionViews.push(
_reactNative2.default.createElement(_reactNative.View,{key:'separator-'+i,style:styles.rowSeparator}));}};for(var i=startIndex;i<startIndex+length;i++){_loop(i);}




return (
_reactNative2.default.createElement(_reactNative.View,{style:styles.groupContainer},
optionViews));}}]);return ActionGroup;}(_reactNative2.default.Component);ActionGroup.propTypes={options:_reactNative.PropTypes.array.isRequired,destructiveButtonIndex:_reactNative.PropTypes.number,onSelect:_reactNative.PropTypes.func.isRequired,startIndex:_reactNative.PropTypes.number.isRequired,length:_reactNative.PropTypes.number.isRequired};var 






ActionSheet=function(_React$Component2){babelHelpers.inherits(ActionSheet,_React$Component2);
function ActionSheet(props,context){babelHelpers.classCallCheck(this,ActionSheet);var _this2=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ActionSheet).call(this,
props,context));

_this2._onSelect=_this2._onSelect.bind(_this2);
_this2._animateOut=_this2._animateOut.bind(_this2);
_this2._onLayout=_this2._onLayout.bind(_this2);

_this2.state={
isVisible:false,
isAnimating:false,
options:null,
onSelect:null,
sheetHeight:OFFSCREEN_HEIGHT,
overlayOpacity:new _reactNative.Animated.Value(0),
sheetY:new _reactNative.Animated.Value(-OFFSCREEN_HEIGHT),
isWaitingForSheetHeight:false};return _this2;}babelHelpers.createClass(ActionSheet,[{key:'render',value:function render()



{var 
isVisible=this.state.isVisible;
var overlay=isVisible?
_reactNative2.default.createElement(_reactNative.TouchableWithoutFeedback,{onPress:this._animateOut},
_reactNative2.default.createElement(_reactNative.Animated.View,{style:[styles.overlay,{
opacity:this.state.overlayOpacity}]})):


null;

var sheet=isVisible?this._renderSheet():null;

return (
_reactNative2.default.createElement(_reactNative.View,{style:{flex:1}},
_reactNative2.default.Children.only(this.props.children),
overlay,
sheet));}},{key:'_renderSheet',value:function _renderSheet()




{
var numOptions=this.state.options.options.length;

return (
_reactNative2.default.createElement(_reactNative.Animated.View,{style:[styles.sheetContainer,{
bottom:this.state.sheetY}]},

_reactNative2.default.createElement(_reactNative.View,{onLayout:this._onLayout,style:styles.sheet},
_reactNative2.default.createElement(ActionGroup,{
options:this.state.options.options,
destructiveButtonIndex:this.state.options.destructiveButtonIndex,
onSelect:this._onSelect,
startIndex:0,
length:numOptions-1}),

_reactNative2.default.createElement(ActionGroup,{
options:this.state.options.options,
destructiveButtonIndex:this.state.options.destructiveButtonIndex,
onSelect:this._onSelect,
startIndex:numOptions-1,
length:1}))));}},{key:'showActionSheetWithOptions',value:function showActionSheetWithOptions(






options,onSelect){
if(this.state.isVisible){
return;}


this.setState({
options:options,
onSelect:onSelect,
isVisible:true,
isAnimating:true,
isWaitingForSheetHeight:true});


this.state.overlayOpacity.setValue(0);
this.state.sheetY.setValue(-this.state.sheetHeight);

_reactNative.Animated.timing(this.state.overlayOpacity,{
toValue:0.3,
easing:_reactNative.Easing.in(_reactNative.Easing.linear),
duration:OPACITY_ANIMATION_TIME}).
start();

_reactNative.BackAndroid.addEventListener('actionSheetHardwareBackPress',this._animateOut);}},{key:'_onSelect',value:function _onSelect(


index){
if(this.state.isAnimating){
return;}


if(index!==this.state.options.cancelButtonIndex){
this.state.onSelect(index);}


this._animateOut();}},{key:'_animateOut',value:function _animateOut()


{var _this3=this;
if(this.state.isAnimating){
return false;}


_reactNative.BackAndroid.removeEventListener('actionSheetHardwareBackPress',this._animateOut);

this.setState({
isAnimating:true});


_reactNative.Animated.timing(this.state.overlayOpacity,{
toValue:0,
easing:_reactNative.Easing.in(_reactNative.Easing.linear),
duration:OPACITY_ANIMATION_TIME}).
start(function(result){
if(result.finished){
_this3.setState({
isVisible:false,
isAnimating:false});}});




_reactNative.Animated.timing(this.state.sheetY,{
toValue:-this.state.sheetHeight,
easing:_reactNative.Easing.inOut(_reactNative.Easing.ease),
duration:Y_ANIMATION_TIME}).
start();

return true;}},{key:'_onLayout',value:function _onLayout(


event){var _this4=this;
if(!this.state.isWaitingForSheetHeight){
return;}


var height=event.nativeEvent.layout.height;
this.setState({
isWaitingForSheetHeight:false,
sheetHeight:height});


this.state.sheetY.setValue(-height);
_reactNative.Animated.timing(this.state.sheetY,{
toValue:0,
easing:_reactNative.Easing.inOut(_reactNative.Easing.ease),
duration:Y_ANIMATION_TIME}).
start(function(result){
if(result.finished){
_this4.setState({
isAnimating:false});}});}}]);return ActionSheet;}(_reactNative2.default.Component);exports.default=ActionSheet;






var styles=_reactNative.StyleSheet.create({
groupContainer:{
backgroundColor:'#fefefe',
borderRadius:4,
borderColor:'#cbcbcb',
borderWidth:PIXEL,
overflow:'hidden',
marginHorizontal:8,
marginBottom:8},

button:{
justifyContent:'center',
alignItems:'center',
height:50},

text:{
fontSize:17,
fontWeight:'400'},

rowSeparator:{
backgroundColor:'#cbcbcb',
height:PIXEL,
flex:1},

overlay:{
position:'absolute',
top:0,
right:0,
bottom:0,
left:0,
backgroundColor:'black'},

sheetContainer:{
position:'absolute',
left:0,
right:0,
backgroundColor:'transparent'},

sheet:{
backgroundColor:'transparent'}});
});
__d('react-redux/lib/index.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;
exports.connect=exports.Provider=undefined;

var _Provider=require('react-redux/lib/components/Provider.js');

var _Provider2=_interopRequireDefault(_Provider);

var _connect=require('react-redux/lib/components/connect.js');

var _connect2=_interopRequireDefault(_connect);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}

exports.Provider=_Provider2["default"];
exports.connect=_connect2["default"];
});
__d('react-redux/lib/utils/storeShape.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;

var _react=require('react/react.js');

exports["default"]=_react.PropTypes.shape({
subscribe:_react.PropTypes.func.isRequired,
dispatch:_react.PropTypes.func.isRequired,
getState:_react.PropTypes.func.isRequired});
});
__d('react-redux/lib/components/Provider.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;
exports["default"]=undefined;

var _react=require('react/react.js');

var _storeShape=require('react-redux/lib/utils/storeShape.js');

var _storeShape2=_interopRequireDefault(_storeShape);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var didWarnAboutReceivingStore=false;
function warnAboutReceivingStore(){
if(didWarnAboutReceivingStore){
return;}

didWarnAboutReceivingStore=true;


if(typeof console!=='undefined'&&typeof console.error==='function'){
console.error('<Provider> does not support changing `store` on the fly. '+'It is most likely that you see this error because you updated to '+'Redux 2.x and React Redux 2.x which no longer hot reload reducers '+'automatically. See https://github.com/rackt/react-redux/releases/'+'tag/v2.0.0 for the migration instructions.');}}




var Provider=function(_Component){
_inherits(Provider,_Component);

Provider.prototype.getChildContext=function getChildContext(){
return {store:this.store};};


function Provider(props,context){
_classCallCheck(this,Provider);

var _this=_possibleConstructorReturn(this,_Component.call(this,props,context));

_this.store=props.store;
return _this;}


Provider.prototype.render=function render(){
var children=this.props.children;

return _react.Children.only(children);};


return Provider;}(
_react.Component);

exports["default"]=Provider;

if(process.env.NODE_ENV!=='production'){
Provider.prototype.componentWillReceiveProps=function(nextProps){
var store=this.store;
var nextStore=nextProps.store;

if(store!==nextStore){
warnAboutReceivingStore();}};}




Provider.propTypes={
store:_storeShape2["default"].isRequired,
children:_react.PropTypes.element.isRequired};

Provider.childContextTypes={
store:_storeShape2["default"].isRequired};
});
__d('react/react.js',function(global, require, module, exports) {  'use strict';

module.exports=require('react/lib/React.native.js');
});
__d('ReactLink',function(global, require, module, exports) {  'use strict';




































var React=require('react/lib/React.native.js');





function ReactLink(value,requestChange){
this.value=value;
this.requestChange=requestChange;}










function createLinkTypeChecker(linkType){
var shapes={
value:typeof linkType==='undefined'?React.PropTypes.any.isRequired:linkType.isRequired,
requestChange:React.PropTypes.func.isRequired};

return React.PropTypes.shape(shapes);}


ReactLink.PropTypes={
link:createLinkTypeChecker};


module.exports=ReactLink;
});
__d('react-redux/lib/components/connect.js',function(global, require, module, exports) {  'use strict';

var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

exports.__esModule=true;
exports["default"]=connect;

var _react=require('react/react.js');

var _storeShape=require('react-redux/lib/utils/storeShape.js');

var _storeShape2=_interopRequireDefault(_storeShape);

var _shallowEqual=require('react-redux/lib/utils/shallowEqual.js');

var _shallowEqual2=_interopRequireDefault(_shallowEqual);

var _wrapActionCreators=require('react-redux/lib/utils/wrapActionCreators.js');

var _wrapActionCreators2=_interopRequireDefault(_wrapActionCreators);

var _isPlainObject=require('lodash/isPlainObject.js');

var _isPlainObject2=_interopRequireDefault(_isPlainObject);

var _hoistNonReactStatics=require('hoist-non-react-statics/index.js');

var _hoistNonReactStatics2=_interopRequireDefault(_hoistNonReactStatics);

var _invariant=require('invariant/browser.js');

var _invariant2=_interopRequireDefault(_invariant);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var defaultMapStateToProps=function defaultMapStateToProps(state){
return {};};

var defaultMapDispatchToProps=function defaultMapDispatchToProps(dispatch){
return {dispatch:dispatch};};

var defaultMergeProps=function defaultMergeProps(stateProps,dispatchProps,parentProps){
return _extends({},parentProps,stateProps,dispatchProps);};


function getDisplayName(WrappedComponent){
return WrappedComponent.displayName||WrappedComponent.name||'Component';}


function checkStateShape(stateProps,dispatch){
(0,_invariant2["default"])((0,_isPlainObject2["default"])(stateProps),'`%sToProps` must return an object. Instead received %s.',dispatch?'mapDispatch':'mapState',stateProps);
return stateProps;}



var nextVersion=0;

function connect(mapStateToProps,mapDispatchToProps,mergeProps){
var options=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];

var shouldSubscribe=Boolean(mapStateToProps);
var mapState=mapStateToProps||defaultMapStateToProps;
var mapDispatch=(0,_isPlainObject2["default"])(mapDispatchToProps)?(0,_wrapActionCreators2["default"])(mapDispatchToProps):mapDispatchToProps||defaultMapDispatchToProps;

var finalMergeProps=mergeProps||defaultMergeProps;
var checkMergedEquals=finalMergeProps!==defaultMergeProps;
var _options$pure=options.pure;
var pure=_options$pure===undefined?true:_options$pure;
var _options$withRef=options.withRef;
var withRef=_options$withRef===undefined?false:_options$withRef;



var version=nextVersion++;

function computeMergedProps(stateProps,dispatchProps,parentProps){
var mergedProps=finalMergeProps(stateProps,dispatchProps,parentProps);
(0,_invariant2["default"])((0,_isPlainObject2["default"])(mergedProps),'`mergeProps` must return an object. Instead received %s.',mergedProps);
return mergedProps;}


return function wrapWithConnect(WrappedComponent){
var Connect=function(_Component){
_inherits(Connect,_Component);

Connect.prototype.shouldComponentUpdate=function shouldComponentUpdate(){
return !pure||this.haveOwnPropsChanged||this.hasStoreStateChanged;};


function Connect(props,context){
_classCallCheck(this,Connect);

var _this=_possibleConstructorReturn(this,_Component.call(this,props,context));

_this.version=version;
_this.store=props.store||context.store;

(0,_invariant2["default"])(_this.store,'Could not find "store" in either the context or '+('props of "'+_this.constructor.displayName+'". ')+'Either wrap the root component in a <Provider>, '+('or explicitly pass "store" as a prop to "'+_this.constructor.displayName+'".'));

var storeState=_this.store.getState();
_this.state={storeState:storeState};
_this.clearCache();
return _this;}


Connect.prototype.computeStateProps=function computeStateProps(store,props){
if(!this.finalMapStateToProps){
return this.configureFinalMapState(store,props);}


var state=store.getState();
var stateProps=this.doStatePropsDependOnOwnProps?this.finalMapStateToProps(state,props):this.finalMapStateToProps(state);

return checkStateShape(stateProps);};


Connect.prototype.configureFinalMapState=function configureFinalMapState(store,props){
var mappedState=mapState(store.getState(),props);
var isFactory=typeof mappedState==='function';

this.finalMapStateToProps=isFactory?mappedState:mapState;
this.doStatePropsDependOnOwnProps=this.finalMapStateToProps.length!==1;

return isFactory?this.computeStateProps(store,props):checkStateShape(mappedState);};


Connect.prototype.computeDispatchProps=function computeDispatchProps(store,props){
if(!this.finalMapDispatchToProps){
return this.configureFinalMapDispatch(store,props);}


var dispatch=store.dispatch;

var dispatchProps=this.doDispatchPropsDependOnOwnProps?this.finalMapDispatchToProps(dispatch,props):this.finalMapDispatchToProps(dispatch);

return checkStateShape(dispatchProps,true);};


Connect.prototype.configureFinalMapDispatch=function configureFinalMapDispatch(store,props){
var mappedDispatch=mapDispatch(store.dispatch,props);
var isFactory=typeof mappedDispatch==='function';

this.finalMapDispatchToProps=isFactory?mappedDispatch:mapDispatch;
this.doDispatchPropsDependOnOwnProps=this.finalMapDispatchToProps.length!==1;

return isFactory?this.computeDispatchProps(store,props):checkStateShape(mappedDispatch,true);};


Connect.prototype.updateStatePropsIfNeeded=function updateStatePropsIfNeeded(){
var nextStateProps=this.computeStateProps(this.store,this.props);
if(this.stateProps&&(0,_shallowEqual2["default"])(nextStateProps,this.stateProps)){
return false;}


this.stateProps=nextStateProps;
return true;};


Connect.prototype.updateDispatchPropsIfNeeded=function updateDispatchPropsIfNeeded(){
var nextDispatchProps=this.computeDispatchProps(this.store,this.props);
if(this.dispatchProps&&(0,_shallowEqual2["default"])(nextDispatchProps,this.dispatchProps)){
return false;}


this.dispatchProps=nextDispatchProps;
return true;};


Connect.prototype.updateMergedPropsIfNeeded=function updateMergedPropsIfNeeded(){
var nextMergedProps=computeMergedProps(this.stateProps,this.dispatchProps,this.props);
if(this.mergedProps&&checkMergedEquals&&(0,_shallowEqual2["default"])(nextMergedProps,this.mergedProps)){
return false;}


this.mergedProps=nextMergedProps;
return true;};


Connect.prototype.isSubscribed=function isSubscribed(){
return typeof this.unsubscribe==='function';};


Connect.prototype.trySubscribe=function trySubscribe(){
if(shouldSubscribe&&!this.unsubscribe){
this.unsubscribe=this.store.subscribe(this.handleChange.bind(this));
this.handleChange();}};



Connect.prototype.tryUnsubscribe=function tryUnsubscribe(){
if(this.unsubscribe){
this.unsubscribe();
this.unsubscribe=null;}};



Connect.prototype.componentDidMount=function componentDidMount(){
this.trySubscribe();};


Connect.prototype.componentWillReceiveProps=function componentWillReceiveProps(nextProps){
if(!pure||!(0,_shallowEqual2["default"])(nextProps,this.props)){
this.haveOwnPropsChanged=true;}};



Connect.prototype.componentWillUnmount=function componentWillUnmount(){
this.tryUnsubscribe();
this.clearCache();};


Connect.prototype.clearCache=function clearCache(){
this.dispatchProps=null;
this.stateProps=null;
this.mergedProps=null;
this.haveOwnPropsChanged=true;
this.hasStoreStateChanged=true;
this.renderedElement=null;
this.finalMapDispatchToProps=null;
this.finalMapStateToProps=null;};


Connect.prototype.handleChange=function handleChange(){
if(!this.unsubscribe){
return;}


var prevStoreState=this.state.storeState;
var storeState=this.store.getState();

if(!pure||prevStoreState!==storeState){
this.hasStoreStateChanged=true;
this.setState({storeState:storeState});}};



Connect.prototype.getWrappedInstance=function getWrappedInstance(){
(0,_invariant2["default"])(withRef,'To access the wrapped instance, you need to specify '+'{ withRef: true } as the fourth argument of the connect() call.');

return this.refs.wrappedInstance;};


Connect.prototype.render=function render(){
var haveOwnPropsChanged=this.haveOwnPropsChanged;
var hasStoreStateChanged=this.hasStoreStateChanged;
var renderedElement=this.renderedElement;

this.haveOwnPropsChanged=false;
this.hasStoreStateChanged=false;

var shouldUpdateStateProps=true;
var shouldUpdateDispatchProps=true;
if(pure&&renderedElement){
shouldUpdateStateProps=hasStoreStateChanged||haveOwnPropsChanged&&this.doStatePropsDependOnOwnProps;
shouldUpdateDispatchProps=haveOwnPropsChanged&&this.doDispatchPropsDependOnOwnProps;}


var haveStatePropsChanged=false;
var haveDispatchPropsChanged=false;
if(shouldUpdateStateProps){
haveStatePropsChanged=this.updateStatePropsIfNeeded();}

if(shouldUpdateDispatchProps){
haveDispatchPropsChanged=this.updateDispatchPropsIfNeeded();}


var haveMergedPropsChanged=true;
if(haveStatePropsChanged||haveDispatchPropsChanged||haveOwnPropsChanged){
haveMergedPropsChanged=this.updateMergedPropsIfNeeded();}else 
{
haveMergedPropsChanged=false;}


if(!haveMergedPropsChanged&&renderedElement){
return renderedElement;}


if(withRef){
this.renderedElement=(0,_react.createElement)(WrappedComponent,_extends({},this.mergedProps,{
ref:'wrappedInstance'}));}else 

{
this.renderedElement=(0,_react.createElement)(WrappedComponent,this.mergedProps);}


return this.renderedElement;};


return Connect;}(
_react.Component);

Connect.displayName='Connect('+getDisplayName(WrappedComponent)+')';
Connect.WrappedComponent=WrappedComponent;
Connect.contextTypes={
store:_storeShape2["default"]};

Connect.propTypes={
store:_storeShape2["default"]};


if(process.env.NODE_ENV!=='production'){
Connect.prototype.componentWillUpdate=function componentWillUpdate(){
if(this.version===version){
return;}



this.version=version;
this.trySubscribe();
this.clearCache();};}



return (0,_hoistNonReactStatics2["default"])(Connect,WrappedComponent);};}
});
__d('react-redux/lib/utils/wrapActionCreators.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;
exports["default"]=wrapActionCreators;

var _redux=require('redux/lib/index.js');

function wrapActionCreators(actionCreators){
return function(dispatch){
return (0,_redux.bindActionCreators)(actionCreators,dispatch);};}
});
__d('lodash/isPlainObject.js',function(global, require, module, exports) {  'use strict';var isHostObject=require('lodash/_isHostObject.js'),
isObjectLike=require('lodash/isObjectLike.js');


var objectTag='[object Object]';


var objectProto=Object.prototype;


var funcToString=Function.prototype.toString;


var objectCtorString=funcToString.call(Object);





var objectToString=objectProto.toString;


var getPrototypeOf=Object.getPrototypeOf;




























function isPlainObject(value){
if(!isObjectLike(value)||objectToString.call(value)!=objectTag||isHostObject(value)){
return false;}

var proto=objectProto;
if(typeof value.constructor=='function'){
proto=getPrototypeOf(value);}

if(proto===null){
return true;}

var Ctor=proto.constructor;
return typeof Ctor=='function'&&
Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;}


module.exports=isPlainObject;
});
__d('HomyPiAndroid/js/actions/UserActions.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.NOT_LOGGED_IN=exports.LOGOUT=exports.FAIL=exports.SUCCESS=exports.REQUEST=undefined;exports.











connection_requested=connection_requested;exports.




connection_success=connection_success;exports.





connection_failed=connection_failed;exports.






not_logged_in=not_logged_in;exports.






loadToken=loadToken;exports.









logout=logout;exports.









login=login;var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);var _reactNative=require("react-native/Libraries/react-native/react-native.js");var REQUEST=exports.REQUEST="CONNECTION_REQUESTED";var SUCCESS=exports.SUCCESS="CONNECTION_SUCCESS";var FAIL=exports.FAIL="CONNECTION_FAILED";var LOGOUT=exports.LOGOUT="LOGOUT";var NOT_LOGGED_IN=exports.NOT_LOGGED_IN="NOT_LOGGED_IN";function connection_requested(){return {type:REQUEST};}function connection_success(token){return {type:SUCCESS,token:token};}function connection_failed(error){return {type:FAIL,error:error};}function not_logged_in(error){return {type:NOT_LOGGED_IN,error:error};}function loadToken(){return function(dispatch){_reactNative.AsyncStorage.getItem("homyToken",function(err,savedToken){if(err||!savedToken)return dispatch(not_logged_in(err));else return dispatch(connection_success(savedToken));});};}function logout(){return function(dispatch){_reactNative.AsyncStorage.setItem("homyToken","");dispatch({type:LOGOUT});};}function login(username,password){

return function(dispatch){
dispatch(connection_requested());
return fetch(_settings2.default.getServerUrl()+"/api/users/login",{
headers:{
"Accept":"application/json",
"Content-Type":"application/json"},

method:"post",
body:JSON.stringify({
username:username,password:password})}).


then(function(response){return response.json();}).
then(function(json){

if(json.status==="error"||!json.token){
dispatch(connection_failed(json.data));}else 
{
dispatch(connection_success(json.token));}});};}
});
__d('HomyPiAndroid/js/components/splash.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});








var _reactRedux=require("react-redux/lib/index.js");
var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);
var _UserActions=require("HomyPiAndroid/js/actions/UserActions.js");

var _reactNativeRouterFlux=require("react-native-router-flux/index.js");var React=require("react-native/Libraries/react-native/react-native.js");var AppRegistry=React.AppRegistry;var StyleSheet=React.StyleSheet;var Text=React.Text;var View=React.View;var TextInput=React.TextInput;var TouchableHighlight=React.TouchableHighlight;

var SplashScreen=React.createClass({displayName:"SplashScreen",
componentWillMount:function(){var _this=this;
_settings2.default.loadStoredServerUrl(function(err,url){
if(url){
_this.props.dispatch(
(0,_UserActions.loadToken)());}else 

{
_reactNativeRouterFlux.Actions.login();}});},



render:function(){
return (
React.createElement(View,{style:this.styles.container},
React.createElement(Text,null,"Hello"),
React.createElement(Text,null,"Loading")));},



styles:StyleSheet.create({
container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"#F5FCFF"},

button:{
alignItems:"center",
marginBottom:7,
backgroundColor:"blue",
borderRadius:2},

buttonText:{
fontSize:24}})});



function map(state){var 
user=state.user;
return {
user:user};}exports.default=


(0,_reactRedux.connect)(map)(SplashScreen);
});
__d('HomyPiAndroid/js/io.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});


var _playlistSocket=require("HomyPiAndroid/js/sockets/playlistSocket.js");var _playlistSocket2=babelHelpers.interopRequireDefault(_playlistSocket);
var _raspberrySocket=require("HomyPiAndroid/js/sockets/raspberrySocket.js");var _raspberrySocket2=babelHelpers.interopRequireDefault(_raspberrySocket);
var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);
var _url=require("url/url.js");var _url2=babelHelpers.interopRequireDefault(_url);


var _PlayerNotification=require("HomyPiAndroid/js/natives/PlayerNotification.js");
var _SocketConnection=require("HomyPiAndroid/js/natives/SocketConnection.js");var _SocketConnection2=babelHelpers.interopRequireDefault(_SocketConnection);var React=require("react-native/Libraries/react-native/react-native.js");var socket;var config=require("HomyPiAndroid/js/config.js");

var store=null;

function getMQTTUrl(serverUrl,token){
return new Promise(function(resolve,reject){

fetch(serverUrl+"api/config",{
headers:{
"Accept":"application/json",
"Content-Type":"application/json",
"Authorization":"Bearer "+token}}).


then(function(response){return response.json();}).
then(function(json){

if(json.status==="success"){
resolve(json.config.mqtt.url);}});});}exports.default=





{
setStore:function(s){store=s;},
connect:function(token,connectedCallback,disconnectedCallback){


var objUrl=_url2.default.parse(_settings2.default.getServerUrl()+"/");
var url="tcp://"+objUrl.hostname+":3005";
_SocketConnection2.default.createSocket(url,token);
_SocketConnection2.default.clearEvents();
if(connectedCallback&&typeof connectedCallback==="function"){
_SocketConnection2.default.on("connect",connectedCallback);
_SocketConnection2.default.on("reconnect",connectedCallback);}

if(disconnectedCallback&&typeof disconnectedCallback==="function"){
_SocketConnection2.default.on("disconnect",disconnectedCallback);}

(0,_playlistSocket2.default)(_SocketConnection2.default,store);
(0,_raspberrySocket2.default)(_SocketConnection2.default,store);

(0,_PlayerNotification.setSocketListeners)();

_SocketConnection2.default.connect();},

socket:_SocketConnection2.default};
});
__d('HomyPiAndroid/js/apis/UserAPI.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});
var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);var Io=require("HomyPiAndroid/js/io.js");

var config=require("HomyPiAndroid/js/config.js");
var AsyncStorage=require("react-native/Libraries/react-native/react-native.js").AsyncStorage;


var token=null;



var setToken=function(newToken){
token=newToken;
AsyncStorage.setItem("homyToken",token);};



var getToken=function(){
return token;};


var loadStoredToken=function(callback){
gggg=fez;
AsyncStorage.getItem("homyToken",function(err,savedToken){
setToken(savedToken);
callback(err,token);});};exports.default=




{
loadStoredToken:loadStoredToken,
getToken:getToken,
login:function(username,password){

return new Promise(function(resolve,reject){
fetch(_settings2.default.getServerUrl()+"/api/users/login",
{
method:"POST",
body:JSON.stringify({username:username,password:password}),
headers:{
"Accept":"application/json",
"Content-Type":"application/json"}}).

then(function(response){

return response.json();}).
then(function(json){
setToken(json.token);
return resolve(json.token);}).
catch(function(err){


return reject(err);}).
done();});},


logout:function(){
setToken("");}};
});
__d('HomyPiAndroid/js/sockets/playlistSocket.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=




function(socket,store){
socket.on("player:status",function(data){
store.dispatch((0,_PlayerActions.status)(data.status,data.playingId));});

socket.on("playlist:playing:id",function(data){
if(data.raspberry===store.getState().player.name)
store.dispatch((0,_PlayerActions.playing)(data.track));});


socket.on("playlist:track:clear",function(data){
if(data.raspberry===store.getState().player.name)
store.dispatch((0,_PlayerActions.clear)(data));});

socket.on("playlist:set",function(data){
store.dispatch((0,_PlayerActions.setPlaylist)(data.playlist));});

socket.on("playlist:track:added",function(data){
store.dispatch((0,_PlayerActions.add)(data));});

socket.on("playlist:playing:id",function(data){

store.dispatch((0,_PlayerActions.playing)(data._id));});};var _PlayerActions=require("HomyPiAndroid/js/actions/PlayerActions.js");
});
__d('HomyPiAndroid/js/reducers/playerReducers.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _PlayerActions=require("HomyPiAndroid/js/actions/PlayerActions.js");






var defaultTrack={
album:{images:[{}]},
images:[],
artists:[]};


var defaultPlaylistState={
tracks:[],
playing:defaultTrack};


function getPlaying(idPlaying,trackset){

if(!idPlaying||!trackset||!trackset.length)return defaultTrack;

for(var i=0;i<trackset.length;i++){

if(trackset[i]._id===idPlaying){

return trackset[i];}}


return defaultTrack;}


function playlist(){var state=arguments.length<=0||arguments[0]===undefined?defaultPlaylistState:arguments[0];var action=arguments[1];
switch(action.type){
case _PlayerActions.SET_PLAYLIST:
return babelHelpers.extends({},
state,{
tracks:action.playlist.tracks,
playing:action.playing||getPlaying(action.playlist.idPlaying,action.playlist.tracks)});


case _PlayerActions.SET_PLAYING:{
return babelHelpers.extends({},
state,{
playing:getPlaying(action.idPlaying,state.tracks)});}


case _PlayerActions.SET_STATUS:{
if(action.idPlaying===undefined)return state;
return babelHelpers.extends({},
state,{
playing:getPlaying(action.idPlaying,state.tracks)});}


case _PlayerActions.ADD_TRACK:{
var tracks=[].concat(babelHelpers.toConsumableArray(
state.tracks),[
action.track]);

return babelHelpers.extends({},
state,{
tracks:tracks,
playing:getPlaying(state.idPlaying,tracks)});}


case _PlayerActions.ADD_TRACKSET:{
var tracks=[].concat(babelHelpers.toConsumableArray(
state.tracks),babelHelpers.toConsumableArray(
action.trackset));

return babelHelpers.extends({},
state,{
tracks:tracks,
playing:getPlaying(state.idPlaying,tracks)});}



case _PlayerActions.CLEAR:
return babelHelpers.extends({},
state,{
tracks:[],
playing:babelHelpers.extends({},defaultTrack)});

default:
return state;}}



function player(){var state=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var action=arguments[1];
switch(action.type){
case _PlayerActions.SET_PLAYER:

return babelHelpers.extends({},state,action.player);
case _PlayerActions.SET_STATUS:

return babelHelpers.extends({},state,{status:action.status});
case _PlayerActions.REMOVE_PLAYER:
return {};
default:
return state;}}exports.default=



{
player:player,
playlist:playlist};
});
__d('HomyPiAndroid/js/sockets/raspberrySocket.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=

function(socket,store){
socket.on("raspberry:state:up",function(data){
if(!data.raspberry)return;
store.dispatch((0,_RaspberryActions.stateChanged)(data.raspberry.name,"UP"));var _store$getState=
store.getState();var selectedRaspberry=_store$getState.selectedRaspberry;
if(!selectedRaspberry)
store.dispatch((0,_RaspberryActions.selectedDefaultRaspberry)());});


socket.on("raspberry:state:down",function(data){var _store$getState2=
store.getState();var selectedRaspberry=_store$getState2.selectedRaspberry;
store.dispatch((0,_RaspberryActions.stateChanged)(data.name,"DOWN"));
if(selectedRaspberry&&selectedRaspberry.name===data.name){
store.dispatch((0,_RaspberryActions.selectedDefaultRaspberry)());
store.dispatch((0,_PlayerActions.removePlayer)());
store.dispatch((0,_PlayerActions.clear)());}});


socket.on("modules:new:player",function(data){var _store$getState3=
store.getState();var selectedRaspberry=_store$getState3.selectedRaspberry;var user=_store$getState3.user;
if(selectedRaspberry&&selectedRaspberry.name){
store.dispatch((0,_PlayerActions.getPlayer)(user,selectedRaspberry));}});};var _RaspberryActions=require("HomyPiAndroid/js/actions/RaspberryActions.js");var _PlayerActions=require("HomyPiAndroid/js/actions/PlayerActions.js");


;
});
__d('HomyPiAndroid/js/reducers/raspberriesReducer.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _RaspberryActions=require("HomyPiAndroid/js/actions/RaspberryActions.js");




var defaultRaspberry={
_id:null,
ip:null,
modules:[],
name:null,
socketId:null,
state:"DOWN"};




function selectedRaspberry(){var state=arguments.length<=0||arguments[0]===undefined?defaultRaspberry:arguments[0];var action=arguments[1];
switch(action.type){
case _RaspberryActions.SELECTED_RASPBERRY:
return babelHelpers.extends({},state,action.raspberry);
default:
return state;}}



function raspberry(){var state=arguments.length<=0||arguments[0]===undefined?defaultRaspberry:arguments[0];var action=arguments[1];}



function raspberries()



{var state=arguments.length<=0||arguments[0]===undefined?{isFetching:false,didInvalidate:false,items:[]}:arguments[0];var action=arguments[1];
switch(action.type){
case _RaspberryActions.REQUEST_ALL:
return babelHelpers.extends({},state,{isFetching:true});
case _RaspberryActions.RECEIVE_ALL:
return babelHelpers.extends({},state,{
isFetching:false,
didInvalidate:false,
items:action.items,
lastUpdated:action.receivedAt});

case _RaspberryActions.STATE_CHANGED:
var items;
var index=0;
var item=state.items.find(function(rasp,i){
if(rasp.name===action.name){
index=i;
return true;}

return false;});

if(item){
item=babelHelpers.extends({},item,{state:action.state});
items=[].concat(babelHelpers.toConsumableArray(
state.items.slice(0,index)),[
item],babelHelpers.toConsumableArray(
state.items.slice(++index)));}


return babelHelpers.extends({},
state,{
items:items||state.items});

case _RaspberryActions.SELECTED_RASPBERRY:
return babelHelpers.extends({},state,action.raspberry);
default:
return babelHelpers.extends({},state);}}exports.default=



{
selectedRaspberry:selectedRaspberry,
raspberries:raspberries};
});
__d('HomyPiAndroid/js/middlewares/index.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _UserActions=require("HomyPiAndroid/js/actions/UserActions.js");
var _RaspberryActions=require("HomyPiAndroid/js/actions/RaspberryActions.js");
var _PlayerActions=require("HomyPiAndroid/js/actions/PlayerActions.js");
var _reactNative=require("react-native/Libraries/react-native/react-native.js");
var _io=require("HomyPiAndroid/js/io.js");var _io2=babelHelpers.interopRequireDefault(_io);

var _reactNativeRouterFlux=require("react-native-router-flux/index.js");

var authMiddleware=function(store){return function(next){return function(action){
if(action.type===_UserActions.SUCCESS){

_reactNative.AsyncStorage.setItem("homyToken",action.token);

_io2.default.connect(action.token);
next(action);
_reactNativeRouterFlux.Actions.app();}else 
if(action.type===_UserActions.NOT_LOGGED_IN){
_reactNativeRouterFlux.Actions.login();}

return next(action);};};};


var getPlayerOnRaspberryChange=function(store){return function(next){return function(action){
if(action.type===_RaspberryActions.RECEIVE_ALL){
next(action);
store.dispatch((0,_RaspberryActions.selectedDefaultRaspberry)(store.getState().raspberries.items));}else 
if(action.type===_RaspberryActions.STATE_CHANGED){
next(action);var _store$getState=
store.getState();var user=_store$getState.user;var selectedRaspberry=_store$getState.selectedRaspberry;var raspberries=_store$getState.raspberries;
switch(action.state){
case "UP":
if(!selectedRaspberry||!selectedRaspberry.name){
store.dispatch((0,_RaspberryActions.selectedDefaultRaspberry)(raspberries.items));}

case "DOWN":
if(selectedRaspberry&&selectedRaspberry.name===action.name){
store.dispatch((0,_RaspberryActions.selectedDefaultRaspberry)(raspberries.items));}

default:
break;}}else 


if(action.type===_RaspberryActions.SELECTED_RASPBERRY){
next(action);var _store$getState2=
store.getState();var _user=_store$getState2.user;var _selectedRaspberry=_store$getState2.selectedRaspberry;

if(_selectedRaspberry&&_selectedRaspberry.name){
for(var i=0;i<_selectedRaspberry.modules.length;i++){
if(_selectedRaspberry.modules[i].name=="music"&&_selectedRaspberry.modules[i].state==="UP"){

store.dispatch((0,_PlayerActions.getPlayer)(_user,_selectedRaspberry));}}}}else 



{
return next(action);}};};};exports.default=




{
authMiddleware:authMiddleware,
getPlayerOnRaspberryChange:getPlayerOnRaspberryChange};
});
__d('HomyPiAndroid/js/actions/RaspberryActions.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.STATE_CHANGED=exports.SELECTED_DEFAULT=exports.SELECTED_RASPBERRY=exports.RECEIVE_ALL=exports.REQUEST_ALL=undefined;exports.














requestAll=requestAll;exports.





receiveAll=receiveAll;exports.






fetchAll=fetchAll;exports.






















stateChanged=stateChanged;exports.







selectedRaspberry=selectedRaspberry;exports.







selectedDefaultRaspberry=selectedDefaultRaspberry;var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);var _UserAPI=require("HomyPiAndroid/js/apis/UserAPI.js");var _UserAPI2=babelHelpers.interopRequireDefault(_UserAPI);var _SocketConnection=require("HomyPiAndroid/js/natives/SocketConnection.js");var _SocketConnection2=babelHelpers.interopRequireDefault(_SocketConnection);var switchRaspberryTopic=_SocketConnection2.default.switchRaspberryTopic;var API="/api/raspberries";var REQUEST_ALL=exports.REQUEST_ALL="RASPBERRY_REQUEST_ALL";var RECEIVE_ALL=exports.RECEIVE_ALL="RASPBERRY_RECEIVE_ALL";var SELECTED_RASPBERRY=exports.SELECTED_RASPBERRY="SELECTED_RASPBERRY";var SELECTED_DEFAULT=exports.SELECTED_DEFAULT="SELECTED_DEFAULT";var STATE_CHANGED=exports.STATE_CHANGED="RASPBERRY_STATE_CHANGED";function requestAll(raspberries){return {type:REQUEST_ALL,raspberries:raspberries};}function receiveAll(data){return babelHelpers.extends({type:RECEIVE_ALL},data);}function fetchAll(user){return function(dispatch){dispatch(requestAll());return fetch(_settings2.default.getServerUrl()+API+"/",{headers:{"Accept":"application/json","Content-Type":"application/json","Authorization":"Bearer "+user.token}}).then(function(response){return response.json();}).then(function(json){if(json.status==="error"){}else {dispatch(receiveAll(json.data));}});};}function stateChanged(name,state){return {type:STATE_CHANGED,name:name,state:state};}function selectedRaspberry(raspberry){if(raspberry&&raspberry.name)switchRaspberryTopic(raspberry.name);return {type:SELECTED_RASPBERRY,raspberry:raspberry};}function selectedDefaultRaspberry(raspberries){
return selectedRaspberry(selectRaspberry(raspberries));}


function selectRaspberry(raspberries,current){
var found=null;
if(!current&&raspberries&&raspberries.length){
raspberries.every(function(rasp){
if(rasp.state==="UP"){
found=rasp;
return false;}

return true;});

return found;}}
});
__d('HomyPiAndroid/js/actions/MusicSearchActions.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.RECEIVED_MORE=exports.RECEIVED=exports.REQUEST=undefined;exports.









requestAll=requestAll;exports.





received=received;exports.





receivedMore=receivedMore;exports.







search=search;var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);var _UserAPI=require("HomyPiAndroid/js/apis/UserAPI.js");var _UserAPI2=babelHelpers.interopRequireDefault(_UserAPI);var API="/api/modules/music";var REQUEST=exports.REQUEST="SEARCH_MUSIC_REQUEST_ALL";var RECEIVED=exports.RECEIVED="SEARCH_MUSIC_RECEIVED";var RECEIVED_MORE=exports.RECEIVED_MORE="SEARCH_MUSIC_RECEIVED_MORE";function requestAll(query){return {type:REQUEST,query:query};}function received(data){return babelHelpers.extends({type:RECEIVED},data);}function receivedMore(data){return babelHelpers.extends({type:RECEIVED_MORE},data);}function search(user,query,type,nb,offset){var source=arguments.length<=5||arguments[5]===undefined?"spotify":arguments[5];
var request="q="+query+"&source="+source;
request+=type?"&type="+type:"";
request+=nb?"&limit="+nb:"";
request+=offset?"&offset="+offset:"";

return function(dispatch){
dispatch(requestAll(query));
return fetch(_settings2.default.getServerUrl()+API+"/search?"+request,{
headers:{
"Accept":"application/json",
"Content-Type":"application/json",
"Authorization":"Bearer "+user.token}}).


then(function(response){return response.json();}).
then(function(json){

if(json.status==="error"){}else 

{
if(!offset)
dispatch(received(json));else 

dispatch(receivedMore(json));}});};}
});
__d('HomyPiAndroid/js/actions/PlayerActions.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.REMOVE=exports.ADD_TRACKSET=exports.ADD_TRACK=exports.CLEAR=exports.SET_PLAYING=exports.SET_PLAYLIST=exports.REMOVE_PLAYER=exports.SET_STATUS=exports.SET_PLAYER=undefined;exports.

















setPlayer=setPlayer;exports.





removePlayer=removePlayer;exports.




setPlaylist=setPlaylist;exports.





clear=clear;exports.




playing=playing;exports.





status=status;exports.






add=add;exports.















getPlaylist=getPlaylist;exports.




















getPlayer=getPlayer;var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);var _UserAPI=require("HomyPiAndroid/js/apis/UserAPI.js");var _UserAPI2=babelHelpers.interopRequireDefault(_UserAPI);var PLAYER_API="/api/modules/music/players";var PLAYLIST_API="/api/modules/music/playlists";var SET_PLAYER=exports.SET_PLAYER="SET_PLAYER";var SET_STATUS=exports.SET_STATUS="SET_STATUS";var REMOVE_PLAYER=exports.REMOVE_PLAYER="REMOVE_PLAYER";var SET_PLAYLIST=exports.SET_PLAYLIST="SET_PLAYLIST";var SET_PLAYING=exports.SET_PLAYING="SET_PLAYING_IN_PLAYLIST";var CLEAR=exports.CLEAR="CLEAR_PLAYLIST";var ADD_TRACK=exports.ADD_TRACK="ADD_TRACK";var ADD_TRACKSET=exports.ADD_TRACKSET="ADD_TRACKSET";var REMOVE=exports.REMOVE="REMOVE_FROM_PLAYLIST";function setPlayer(player){return {type:SET_PLAYER,player:player};}function removePlayer(){return {type:REMOVE_PLAYER};}function setPlaylist(playlist){return {type:SET_PLAYLIST,playlist:playlist};}function clear(){return {type:CLEAR};}function playing(idPlaying){return {type:SET_PLAYING,idPlaying:idPlaying};}function status(status,idPlaying){return {type:SET_STATUS,status:status,idPlaying:idPlaying};}function add(data){if(data.track){return {type:ADD_TRACK,track:data.track};}if(data.trackset){return {type:ADD_TRACKSET,track:data.trackset};}}function getPlaylist(user,player){if(!user||!user.token)throw new Error("missing user or token in getPlaylist");return function(dispatch){return fetch(_settings2.default.getServerUrl()+PLAYLIST_API+"/"+player.name,{headers:{"Accept":"application/json","Content-Type":"application/json","Authorization":"Bearer "+user.token}}).then(function(response){return response.json();}).then(function(json){if(json.status==="error"){}else {dispatch(setPlaylist(json.playlist));}});};}function getPlayer(user,raspberry){
return function(dispatch){
if(!user||!user.token||!raspberry||!raspberry.name)return;

return fetch(_settings2.default.getServerUrl()+PLAYER_API+"/"+raspberry.name,{
headers:{
"Accept":"application/json",
"Content-Type":"application/json",
"Authorization":"Bearer "+user.token}}).


then(function(response){return response.json();}).
then(function(json){
if(json.status==="error"){}else 

{

if(json.data&&json.data.name){
dispatch(setPlayer(json.data));
dispatch(getPlaylist(user,json.data));}}});};}
});
__d('url/url.js',function(global, require, module, exports) {  'use strict';






















var punycode=require('punycode/punycode.js');
var util=require('url/util.js');

exports.parse=urlParse;
exports.resolve=urlResolve;
exports.resolveObject=urlResolveObject;
exports.format=urlFormat;

exports.Url=Url;

function Url(){
this.protocol=null;
this.slashes=null;
this.auth=null;
this.host=null;
this.port=null;
this.hostname=null;
this.hash=null;
this.search=null;
this.query=null;
this.pathname=null;
this.path=null;
this.href=null;}






var protocolPattern=/^([a-z0-9.+-]+:)/i,
portPattern=/:[0-9]*$/,


simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,



delims=['<','>','"','`',' ','\r','\n','\t'],


unwise=['{','}','|','\\','^','`'].concat(delims),


autoEscape=['\''].concat(unwise),




nonHostChars=['%','/','?',';','#'].concat(autoEscape),
hostEndingChars=['/','?','#'],
hostnameMaxLen=255,
hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,
hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,

unsafeProtocol={
'javascript':true,
'javascript:':true},


hostlessProtocol={
'javascript':true,
'javascript:':true},


slashedProtocol={
'http':true,
'https':true,
'ftp':true,
'gopher':true,
'file':true,
'http:':true,
'https:':true,
'ftp:':true,
'gopher:':true,
'file:':true},

querystring=require('querystring/index.js');

function urlParse(url,parseQueryString,slashesDenoteHost){
if(url&&util.isObject(url)&&url instanceof Url)return url;

var u=new Url();
u.parse(url,parseQueryString,slashesDenoteHost);
return u;}


Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){
if(!util.isString(url)){
throw new TypeError("Parameter 'url' must be a string, not "+typeof url);}





var queryIndex=url.indexOf('?'),
splitter=
queryIndex!==-1&&queryIndex<url.indexOf('#')?'?':'#',
uSplit=url.split(splitter),
slashRegex=/\\/g;
uSplit[0]=uSplit[0].replace(slashRegex,'/');
url=uSplit.join(splitter);

var rest=url;



rest=rest.trim();

if(!slashesDenoteHost&&url.split('#').length===1){

var simplePath=simplePathPattern.exec(rest);
if(simplePath){
this.path=rest;
this.href=rest;
this.pathname=simplePath[1];
if(simplePath[2]){
this.search=simplePath[2];
if(parseQueryString){
this.query=querystring.parse(this.search.substr(1));}else 
{
this.query=this.search.substr(1);}}else 

if(parseQueryString){
this.search='';
this.query={};}

return this;}}



var proto=protocolPattern.exec(rest);
if(proto){
proto=proto[0];
var lowerProto=proto.toLowerCase();
this.protocol=lowerProto;
rest=rest.substr(proto.length);}






if(slashesDenoteHost||proto||rest.match(/^\/\/[^@\/]+@[^@\/]+/)){
var slashes=rest.substr(0,2)==='//';
if(slashes&&!(proto&&hostlessProtocol[proto])){
rest=rest.substr(2);
this.slashes=true;}}



if(!hostlessProtocol[proto]&&(
slashes||proto&&!slashedProtocol[proto])){

















var hostEnd=-1;
for(var i=0;i<hostEndingChars.length;i++){
var hec=rest.indexOf(hostEndingChars[i]);
if(hec!==-1&&(hostEnd===-1||hec<hostEnd))
hostEnd=hec;}




var auth,atSign;
if(hostEnd===-1){

atSign=rest.lastIndexOf('@');}else 
{


atSign=rest.lastIndexOf('@',hostEnd);}




if(atSign!==-1){
auth=rest.slice(0,atSign);
rest=rest.slice(atSign+1);
this.auth=decodeURIComponent(auth);}



hostEnd=-1;
for(var i=0;i<nonHostChars.length;i++){
var hec=rest.indexOf(nonHostChars[i]);
if(hec!==-1&&(hostEnd===-1||hec<hostEnd))
hostEnd=hec;}


if(hostEnd===-1)
hostEnd=rest.length;

this.host=rest.slice(0,hostEnd);
rest=rest.slice(hostEnd);


this.parseHost();



this.hostname=this.hostname||'';



var ipv6Hostname=this.hostname[0]==='['&&
this.hostname[this.hostname.length-1]===']';


if(!ipv6Hostname){
var hostparts=this.hostname.split(/\./);
for(var i=0,l=hostparts.length;i<l;i++){
var part=hostparts[i];
if(!part)continue;
if(!part.match(hostnamePartPattern)){
var newpart='';
for(var j=0,k=part.length;j<k;j++){
if(part.charCodeAt(j)>127){



newpart+='x';}else 
{
newpart+=part[j];}}



if(!newpart.match(hostnamePartPattern)){
var validParts=hostparts.slice(0,i);
var notHost=hostparts.slice(i+1);
var bit=part.match(hostnamePartStart);
if(bit){
validParts.push(bit[1]);
notHost.unshift(bit[2]);}

if(notHost.length){
rest='/'+notHost.join('.')+rest;}

this.hostname=validParts.join('.');
break;}}}}





if(this.hostname.length>hostnameMaxLen){
this.hostname='';}else 
{

this.hostname=this.hostname.toLowerCase();}


if(!ipv6Hostname){




this.hostname=punycode.toASCII(this.hostname);}


var p=this.port?':'+this.port:'';
var h=this.hostname||'';
this.host=h+p;
this.href+=this.host;



if(ipv6Hostname){
this.hostname=this.hostname.substr(1,this.hostname.length-2);
if(rest[0]!=='/'){
rest='/'+rest;}}}






if(!unsafeProtocol[lowerProto]){




for(var i=0,l=autoEscape.length;i<l;i++){
var ae=autoEscape[i];
if(rest.indexOf(ae)===-1)
continue;
var esc=encodeURIComponent(ae);
if(esc===ae){
esc=escape(ae);}

rest=rest.split(ae).join(esc);}}





var hash=rest.indexOf('#');
if(hash!==-1){

this.hash=rest.substr(hash);
rest=rest.slice(0,hash);}

var qm=rest.indexOf('?');
if(qm!==-1){
this.search=rest.substr(qm);
this.query=rest.substr(qm+1);
if(parseQueryString){
this.query=querystring.parse(this.query);}

rest=rest.slice(0,qm);}else 
if(parseQueryString){

this.search='';
this.query={};}

if(rest)this.pathname=rest;
if(slashedProtocol[lowerProto]&&
this.hostname&&!this.pathname){
this.pathname='/';}



if(this.pathname||this.search){
var p=this.pathname||'';
var s=this.search||'';
this.path=p+s;}



this.href=this.format();
return this;};



function urlFormat(obj){




if(util.isString(obj))obj=urlParse(obj);
if(!(obj instanceof Url))return Url.prototype.format.call(obj);
return obj.format();}


Url.prototype.format=function(){
var auth=this.auth||'';
if(auth){
auth=encodeURIComponent(auth);
auth=auth.replace(/%3A/i,':');
auth+='@';}


var protocol=this.protocol||'',
pathname=this.pathname||'',
hash=this.hash||'',
host=false,
query='';

if(this.host){
host=auth+this.host;}else 
if(this.hostname){
host=auth+(this.hostname.indexOf(':')===-1?
this.hostname:
'['+this.hostname+']');
if(this.port){
host+=':'+this.port;}}



if(this.query&&
util.isObject(this.query)&&
Object.keys(this.query).length){
query=querystring.stringify(this.query);}


var search=this.search||query&&'?'+query||'';

if(protocol&&protocol.substr(-1)!==':')protocol+=':';



if(this.slashes||
(!protocol||slashedProtocol[protocol])&&host!==false){
host='//'+(host||'');
if(pathname&&pathname.charAt(0)!=='/')pathname='/'+pathname;}else 
if(!host){
host='';}


if(hash&&hash.charAt(0)!=='#')hash='#'+hash;
if(search&&search.charAt(0)!=='?')search='?'+search;

pathname=pathname.replace(/[?#]/g,function(match){
return encodeURIComponent(match);});

search=search.replace('#','%23');

return protocol+host+pathname+search+hash;};


function urlResolve(source,relative){
return urlParse(source,false,true).resolve(relative);}


Url.prototype.resolve=function(relative){
return this.resolveObject(urlParse(relative,false,true)).format();};


function urlResolveObject(source,relative){
if(!source)return relative;
return urlParse(source,false,true).resolveObject(relative);}


Url.prototype.resolveObject=function(relative){
if(util.isString(relative)){
var rel=new Url();
rel.parse(relative,false,true);
relative=rel;}


var result=new Url();
var tkeys=Object.keys(this);
for(var tk=0;tk<tkeys.length;tk++){
var tkey=tkeys[tk];
result[tkey]=this[tkey];}




result.hash=relative.hash;


if(relative.href===''){
result.href=result.format();
return result;}



if(relative.slashes&&!relative.protocol){

var rkeys=Object.keys(relative);
for(var rk=0;rk<rkeys.length;rk++){
var rkey=rkeys[rk];
if(rkey!=='protocol')
result[rkey]=relative[rkey];}



if(slashedProtocol[result.protocol]&&
result.hostname&&!result.pathname){
result.path=result.pathname='/';}


result.href=result.format();
return result;}


if(relative.protocol&&relative.protocol!==result.protocol){








if(!slashedProtocol[relative.protocol]){
var keys=Object.keys(relative);
for(var v=0;v<keys.length;v++){
var k=keys[v];
result[k]=relative[k];}

result.href=result.format();
return result;}


result.protocol=relative.protocol;
if(!relative.host&&!hostlessProtocol[relative.protocol]){
var relPath=(relative.pathname||'').split('/');
while(relPath.length&&!(relative.host=relPath.shift())){}
if(!relative.host)relative.host='';
if(!relative.hostname)relative.hostname='';
if(relPath[0]!=='')relPath.unshift('');
if(relPath.length<2)relPath.unshift('');
result.pathname=relPath.join('/');}else 
{
result.pathname=relative.pathname;}

result.search=relative.search;
result.query=relative.query;
result.host=relative.host||'';
result.auth=relative.auth;
result.hostname=relative.hostname||relative.host;
result.port=relative.port;

if(result.pathname||result.search){
var p=result.pathname||'';
var s=result.search||'';
result.path=p+s;}

result.slashes=result.slashes||relative.slashes;
result.href=result.format();
return result;}


var isSourceAbs=result.pathname&&result.pathname.charAt(0)==='/',
isRelAbs=
relative.host||
relative.pathname&&relative.pathname.charAt(0)==='/',

mustEndAbs=isRelAbs||isSourceAbs||
result.host&&relative.pathname,
removeAllDots=mustEndAbs,
srcPath=result.pathname&&result.pathname.split('/')||[],
relPath=relative.pathname&&relative.pathname.split('/')||[],
psychotic=result.protocol&&!slashedProtocol[result.protocol];






if(psychotic){
result.hostname='';
result.port=null;
if(result.host){
if(srcPath[0]==='')srcPath[0]=result.host;else 
srcPath.unshift(result.host);}

result.host='';
if(relative.protocol){
relative.hostname=null;
relative.port=null;
if(relative.host){
if(relPath[0]==='')relPath[0]=relative.host;else 
relPath.unshift(relative.host);}

relative.host=null;}

mustEndAbs=mustEndAbs&&(relPath[0]===''||srcPath[0]==='');}


if(isRelAbs){

result.host=relative.host||relative.host===''?
relative.host:result.host;
result.hostname=relative.hostname||relative.hostname===''?
relative.hostname:result.hostname;
result.search=relative.search;
result.query=relative.query;
srcPath=relPath;}else 

if(relPath.length){


if(!srcPath)srcPath=[];
srcPath.pop();
srcPath=srcPath.concat(relPath);
result.search=relative.search;
result.query=relative.query;}else 
if(!util.isNullOrUndefined(relative.search)){



if(psychotic){
result.hostname=result.host=srcPath.shift();



var authInHost=result.host&&result.host.indexOf('@')>0?
result.host.split('@'):false;
if(authInHost){
result.auth=authInHost.shift();
result.host=result.hostname=authInHost.shift();}}


result.search=relative.search;
result.query=relative.query;

if(!util.isNull(result.pathname)||!util.isNull(result.search)){
result.path=(result.pathname?result.pathname:'')+(
result.search?result.search:'');}

result.href=result.format();
return result;}


if(!srcPath.length){


result.pathname=null;

if(result.search){
result.path='/'+result.search;}else 
{
result.path=null;}

result.href=result.format();
return result;}





var last=srcPath.slice(-1)[0];
var hasTrailingSlash=
(result.host||relative.host||srcPath.length>1)&&(
last==='.'||last==='..')||last==='';



var up=0;
for(var i=srcPath.length;i>=0;i--){
last=srcPath[i];
if(last==='.'){
srcPath.splice(i,1);}else 
if(last==='..'){
srcPath.splice(i,1);
up++;}else 
if(up){
srcPath.splice(i,1);
up--;}}




if(!mustEndAbs&&!removeAllDots){
for(;up--;up){
srcPath.unshift('..');}}



if(mustEndAbs&&srcPath[0]!==''&&(
!srcPath[0]||srcPath[0].charAt(0)!=='/')){
srcPath.unshift('');}


if(hasTrailingSlash&&srcPath.join('/').substr(-1)!=='/'){
srcPath.push('');}


var isAbsolute=srcPath[0]===''||
srcPath[0]&&srcPath[0].charAt(0)==='/';


if(psychotic){
result.hostname=result.host=isAbsolute?'':
srcPath.length?srcPath.shift():'';



var authInHost=result.host&&result.host.indexOf('@')>0?
result.host.split('@'):false;
if(authInHost){
result.auth=authInHost.shift();
result.host=result.hostname=authInHost.shift();}}



mustEndAbs=mustEndAbs||result.host&&srcPath.length;

if(mustEndAbs&&!isAbsolute){
srcPath.unshift('');}


if(!srcPath.length){
result.pathname=null;
result.path=null;}else 
{
result.pathname=srcPath.join('/');}



if(!util.isNull(result.pathname)||!util.isNull(result.search)){
result.path=(result.pathname?result.pathname:'')+(
result.search?result.search:'');}

result.auth=relative.auth||result.auth;
result.slashes=result.slashes||relative.slashes;
result.href=result.format();
return result;};


Url.prototype.parseHost=function(){
var host=this.host;
var port=portPattern.exec(host);
if(port){
port=port[0];
if(port!==':'){
this.port=port.substr(1);}

host=host.substr(0,host.length-port.length);}

if(host)this.hostname=host;};
});
__d('querystring/index.js',function(global, require, module, exports) {  'use strict';

exports.decode=exports.parse=require('querystring/decode.js');
exports.encode=exports.stringify=require('querystring/encode.js');
});
__d('HomyPiAndroid/js/natives/SocketConnection.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");
var _RCTDeviceEventEmitter=require("RCTDeviceEventEmitter");var _RCTDeviceEventEmitter2=babelHelpers.interopRequireDefault(_RCTDeviceEventEmitter);
var _PlayerNotification=require("HomyPiAndroid/js/natives/PlayerNotification.js");var _PlayerNotification2=babelHelpers.interopRequireDefault(_PlayerNotification);

var socket=_reactNative.NativeModules.SocketConnection;
var listeners={};

var subscribedTo=[];

function addListener(id,event,callback){
if(!listeners[event]){
listeners[event]=[];}

listeners[event].push({id:id,callback:callback});}

function exist(event,callback){
if(!listeners[event])return false;
for(var i=0;i<listeners[event].length;i++){
if(listeners[event][i].callback===callback){
return true;}}


return false;}

function off(event,callback){
if(!listeners[event])return;
i=listeners[event].length;
while(i--){
if(listeners[event][i].callback===callback){
socket.off(listeners[event][i].id);
listeners[event].splice(i,1);}}}exports.default=




{
createSocket:function(serverUrl,token){
socket.createSocket(serverUrl,token);

setTimeout(function(){
socket.subscribe("default");});},



subscribe:function(topic){
socket.subscribe(topic);
subscribedTo.push(topic);},

unsubscribe:function(topic){
socket.unsubscribe(topic);
var i=subscribedTo.indexOf(topic);
if(i!=-1)
subscribedTo.slice(i,1);},

switchRaspberryTopic:socket.switchRaspberryTopic,
subscribedTo:subscribedTo,
connect:socket.connect,
clearEvents:socket.clearEvents,
publishToPi:function(event,data){
if(!data){
return socket.publishToPi(event);}

return socket.publishToPi(event,JSON.stringify(data));},

on:function(event,callback){
if(exist(event,callback))return;
socket.on(event,function(listenerId){

addListener(listenerId,event,callback);});


_reactNative.DeviceEventEmitter.addListener(event,function(data){

var json;
if(data){
try{
json=JSON.parse(data);}
catch(e){

return;}}


callback(json);});},



off:off,
publish:function(){var topic=arguments.length<=0||arguments[0]===undefined?"default":arguments[0];var event=arguments[1];var data=arguments[2];
if(!data){
return socket.publish(topic,event,null);}

return socket.publish(topic,event,JSON.stringify(data));}};
});
__d('HomyPiAndroid/js/natives/PlayerNotification.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.

























subscribe=subscribe;exports.












setSocketListeners=setSocketListeners;var _reactNative=require("react-native/Libraries/react-native/react-native.js");var RCTDeviceEventEmitter=require("RCTDeviceEventEmitter");var PlayerNotification=_reactNative.NativeModules.PlayerNotification;var unsubscribe=void 0;var setPlaying=function(player,track){if(track&&track.name){PlayerNotification.setPlayerName(player.name);PlayerNotification.setTrackName(track.name);if(track.artists){var artistsStr="";track.artists.forEach(function(artist){artistsStr+=artist.name+"; ";});PlayerNotification.setArtists(artistsStr);}if(track.album&&track.album.images&&track.album.images.length){PlayerNotification.setCover(track.album.images[0].url);}PlayerNotification.show();}};function subscribe(newStore){if(unsubscribe)unsubscribe();store=newStore;currentState=store.getState().playlist;store.subscribe(function(){var nextState=store.getState().playlist;if(currentState.playing!==nextState.playing){setPlaying(store.getState().player,nextState.playing);}currentState=nextState;});}function setSocketListeners(){
PlayerNotification.setSocketListeners();}exports.default=


PlayerNotification;
});
__d('HomyPiAndroid/js/configureStore.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=












configureStore;var _redux=require("redux/lib/index.js");var _reduxThunk=require("redux-thunk/lib/index.js");var _reduxThunk2=babelHelpers.interopRequireDefault(_reduxThunk);var _reduxLogger=require("redux-logger/lib/index.js");var _reduxLogger2=babelHelpers.interopRequireDefault(_reduxLogger);var _reducers=require("HomyPiAndroid/js/reducers/index.js");var _reducers2=babelHelpers.interopRequireDefault(_reducers);var _middlewares=require("HomyPiAndroid/js/middlewares/index.js");var _middlewares2=babelHelpers.interopRequireDefault(_middlewares);var loggerMiddleware=(0,_reduxLogger2.default)();var middlewares=[_reduxThunk2.default,loggerMiddleware,_middlewares2.default.authMiddleware,_middlewares2.default.getPlayerOnRaspberryChange];function configureStore(initialState){
var finalCreateStore=(0,_redux.compose)(
_redux.applyMiddleware.apply(undefined,middlewares))(_redux.createStore);


var store=finalCreateStore(_reducers2.default,initialState);

return store;}
});
__d('redux/lib/applyMiddleware.js',function(global, require, module, exports) {  'use strict';

var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

exports.__esModule=true;
exports["default"]=applyMiddleware;

var _compose=require('redux/lib/compose.js');

var _compose2=_interopRequireDefault(_compose);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}

















function applyMiddleware(){
for(var _len=arguments.length,middlewares=Array(_len),_key=0;_key<_len;_key++){
middlewares[_key]=arguments[_key];}


return function(createStore){
return function(reducer,initialState,enhancer){
var store=createStore(reducer,initialState,enhancer);
var _dispatch=store.dispatch;
var chain=[];

var middlewareAPI={
getState:store.getState,
dispatch:function dispatch(action){
return _dispatch(action);}};


chain=middlewares.map(function(middleware){
return middleware(middlewareAPI);});

_dispatch=_compose2["default"].apply(undefined,chain)(store.dispatch);

return _extends({},store,{
dispatch:_dispatch});};};}
});
__d('redux/lib/index.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;
exports.compose=exports.applyMiddleware=exports.bindActionCreators=exports.combineReducers=exports.createStore=undefined;

var _createStore=require('redux/lib/createStore.js');

var _createStore2=_interopRequireDefault(_createStore);

var _combineReducers=require('redux/lib/combineReducers.js');

var _combineReducers2=_interopRequireDefault(_combineReducers);

var _bindActionCreators=require('redux/lib/bindActionCreators.js');

var _bindActionCreators2=_interopRequireDefault(_bindActionCreators);

var _applyMiddleware=require('redux/lib/applyMiddleware.js');

var _applyMiddleware2=_interopRequireDefault(_applyMiddleware);

var _compose=require('redux/lib/compose.js');

var _compose2=_interopRequireDefault(_compose);

var _warning=require('redux/lib/utils/warning.js');

var _warning2=_interopRequireDefault(_warning);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}





function isCrushed(){}

if(process.env.NODE_ENV!=='production'&&typeof isCrushed.name==='string'&&isCrushed.name!=='isCrushed'){
(0,_warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. '+'This means that you are running a slower development build of Redux. '+'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify '+'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) '+'to ensure you have the correct code for your production build.');}


exports.createStore=_createStore2["default"];
exports.combineReducers=_combineReducers2["default"];
exports.bindActionCreators=_bindActionCreators2["default"];
exports.applyMiddleware=_applyMiddleware2["default"];
exports.compose=_compose2["default"];
});
__d('redux/lib/createStore.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;
exports.ActionTypes=undefined;
exports["default"]=createStore;

var _isPlainObject=require('lodash/isPlainObject.js');

var _isPlainObject2=_interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}







var ActionTypes=exports.ActionTypes={
INIT:'@@redux/INIT'};



























function createStore(reducer,initialState,enhancer){
if(typeof initialState==='function'&&typeof enhancer==='undefined'){
enhancer=initialState;
initialState=undefined;}


if(typeof enhancer!=='undefined'){
if(typeof enhancer!=='function'){
throw new Error('Expected the enhancer to be a function.');}


return enhancer(createStore)(reducer,initialState);}


if(typeof reducer!=='function'){
throw new Error('Expected the reducer to be a function.');}


var currentReducer=reducer;
var currentState=initialState;
var currentListeners=[];
var nextListeners=currentListeners;
var isDispatching=false;

function ensureCanMutateNextListeners(){
if(nextListeners===currentListeners){
nextListeners=currentListeners.slice();}}








function getState(){
return currentState;}

























function subscribe(listener){
if(typeof listener!=='function'){
throw new Error('Expected listener to be a function.');}


var isSubscribed=true;

ensureCanMutateNextListeners();
nextListeners.push(listener);

return function unsubscribe(){
if(!isSubscribed){
return;}


isSubscribed=false;

ensureCanMutateNextListeners();
var index=nextListeners.indexOf(listener);
nextListeners.splice(index,1);};}




























function dispatch(action){
if(!(0,_isPlainObject2["default"])(action)){
throw new Error('Actions must be plain objects. '+'Use custom middleware for async actions.');}


if(typeof action.type==='undefined'){
throw new Error('Actions may not have an undefined "type" property. '+'Have you misspelled a constant?');}


if(isDispatching){
throw new Error('Reducers may not dispatch actions.');}


try{
isDispatching=true;
currentState=currentReducer(currentState,action);}finally 
{
isDispatching=false;}


var listeners=currentListeners=nextListeners;
for(var i=0;i<listeners.length;i++){
listeners[i]();}


return action;}












function replaceReducer(nextReducer){
if(typeof nextReducer!=='function'){
throw new Error('Expected the nextReducer to be a function.');}


currentReducer=nextReducer;
dispatch({type:ActionTypes.INIT});}





dispatch({type:ActionTypes.INIT});

return {
dispatch:dispatch,
subscribe:subscribe,
getState:getState,
replaceReducer:replaceReducer};}
});
__d('redux/lib/combineReducers.js',function(global, require, module, exports) {  'use strict';

exports.__esModule=true;
exports["default"]=combineReducers;

var _createStore=require('redux/lib/createStore.js');

var _isPlainObject=require('lodash/isPlainObject.js');

var _isPlainObject2=_interopRequireDefault(_isPlainObject);

var _warning=require('redux/lib/utils/warning.js');

var _warning2=_interopRequireDefault(_warning);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}

function getUndefinedStateErrorMessage(key,action){
var actionType=action&&action.type;
var actionName=actionType&&'"'+actionType.toString()+'"'||'an action';

return 'Reducer "'+key+'" returned undefined handling '+actionName+'. '+'To ignore an action, you must explicitly return the previous state.';}


function getUnexpectedStateShapeWarningMessage(inputState,reducers,action){
var reducerKeys=Object.keys(reducers);
var argumentName=action&&action.type===_createStore.ActionTypes.INIT?'initialState argument passed to createStore':'previous state received by the reducer';

if(reducerKeys.length===0){
return 'Store does not have a valid reducer. Make sure the argument passed '+'to combineReducers is an object whose values are reducers.';}


if(!(0,_isPlainObject2["default"])(inputState)){
return 'The '+argumentName+' has unexpected type of "'+{}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following '+('keys: "'+reducerKeys.join('", "')+'"');}


var unexpectedKeys=Object.keys(inputState).filter(function(key){
return !reducers.hasOwnProperty(key);});


if(unexpectedKeys.length>0){
return 'Unexpected '+(unexpectedKeys.length>1?'keys':'key')+' '+('"'+unexpectedKeys.join('", "')+'" found in '+argumentName+'. ')+'Expected to find one of the known reducer keys instead: '+('"'+reducerKeys.join('", "')+'". Unexpected keys will be ignored.');}}



function assertReducerSanity(reducers){
Object.keys(reducers).forEach(function(key){
var reducer=reducers[key];
var initialState=reducer(undefined,{type:_createStore.ActionTypes.INIT});

if(typeof initialState==='undefined'){
throw new Error('Reducer "'+key+'" returned undefined during initialization. '+'If the state passed to the reducer is undefined, you must '+'explicitly return the initial state. The initial state may '+'not be undefined.');}


var type='@@redux/PROBE_UNKNOWN_ACTION_'+Math.random().toString(36).substring(7).split('').join('.');
if(typeof reducer(undefined,{type:type})==='undefined'){
throw new Error('Reducer "'+key+'" returned undefined when probed with a random type. '+('Don\'t try to handle '+_createStore.ActionTypes.INIT+' or other actions in "redux/*" ')+'namespace. They are considered private. Instead, you must return the '+'current state for any unknown actions, unless it is undefined, '+'in which case you must return the initial state, regardless of the '+'action type. The initial state may not be undefined.');}});}




















function combineReducers(reducers){
var reducerKeys=Object.keys(reducers);
var finalReducers={};
for(var i=0;i<reducerKeys.length;i++){
var key=reducerKeys[i];
if(typeof reducers[key]==='function'){
finalReducers[key]=reducers[key];}}


var finalReducerKeys=Object.keys(finalReducers);

var sanityError;
try{
assertReducerSanity(finalReducers);}
catch(e){
sanityError=e;}


return function combination(){
var state=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];
var action=arguments[1];

if(sanityError){
throw sanityError;}


if(process.env.NODE_ENV!=='production'){
var warningMessage=getUnexpectedStateShapeWarningMessage(state,finalReducers,action);
if(warningMessage){
(0,_warning2["default"])(warningMessage);}}



var hasChanged=false;
var nextState={};
for(var i=0;i<finalReducerKeys.length;i++){
var key=finalReducerKeys[i];
var reducer=finalReducers[key];
var previousStateForKey=state[key];
var nextStateForKey=reducer(previousStateForKey,action);
if(typeof nextStateForKey==='undefined'){
var errorMessage=getUndefinedStateErrorMessage(key,action);
throw new Error(errorMessage);}

nextState[key]=nextStateForKey;
hasChanged=hasChanged||nextStateForKey!==previousStateForKey;}

return hasChanged?nextState:state;};}
});
__d('lodash/isPlainObject.js',function(global, require, module, exports) {  'use strict';var isHostObject=require('lodash/_isHostObject.js'),
isObjectLike=require('lodash/isObjectLike.js');


var objectTag='[object Object]';


var objectProto=Object.prototype;


var funcToString=Function.prototype.toString;


var objectCtorString=funcToString.call(Object);





var objectToString=objectProto.toString;


var getPrototypeOf=Object.getPrototypeOf;




























function isPlainObject(value){
if(!isObjectLike(value)||objectToString.call(value)!=objectTag||isHostObject(value)){
return false;}

var proto=objectProto;
if(typeof value.constructor=='function'){
proto=getPrototypeOf(value);}

if(proto===null){
return true;}

var Ctor=proto.constructor;
return typeof Ctor=='function'&&
Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;}


module.exports=isPlainObject;
});
__d('HomyPiAndroid/js/reducers/index.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _redux=require("redux/lib/index.js");

var _raspberriesReducer=require("HomyPiAndroid/js/reducers/raspberriesReducer.js");var _raspberriesReducer2=babelHelpers.interopRequireDefault(_raspberriesReducer);
var _alarmsReducers=require("HomyPiAndroid/js/reducers/alarmsReducers.js");var _alarmsReducers2=babelHelpers.interopRequireDefault(_alarmsReducers);
var _playerReducers=require("HomyPiAndroid/js/reducers/playerReducers.js");var _playerReducers2=babelHelpers.interopRequireDefault(_playerReducers);
var _searchMusicReducers=require("HomyPiAndroid/js/reducers/searchMusicReducers.js");var _searchMusicReducers2=babelHelpers.interopRequireDefault(_searchMusicReducers);
var _userReducers=require("HomyPiAndroid/js/reducers/userReducers.js");var _userReducers2=babelHelpers.interopRequireDefault(_userReducers);
var _routerReducers=require("HomyPiAndroid/js/reducers/routerReducers.js");var _routerReducers2=babelHelpers.interopRequireDefault(_routerReducers);

var reducer=(0,_redux.combineReducers)(babelHelpers.extends({},_raspberriesReducer2.default,_alarmsReducers2.default,_playerReducers2.default,_searchMusicReducers2.default,_userReducers2.default,_routerReducers2.default));exports.default=








reducer;
});
__d('HomyPiAndroid/js/reducers/alarmsReducers.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _AlarmActions=require("HomyPiAndroid/js/actions/AlarmActions.js");





function alarm(){var state=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var action=arguments[1];
switch(action.type){
case _AlarmActions.NEW:
return babelHelpers.extends({},
state,
action.alarm);

case _AlarmActions.UPDATED:
if(action.alarm._id===state._id){
return babelHelpers.extends({},
state,
action.alarm);}else 

{
return state;}

default:
return state;}}



function alarms()



{var state=arguments.length<=0||arguments[0]===undefined?{isFetching:false,didInvalidate:false,items:[]}:arguments[0];var action=arguments[1];
switch(action.type){
case _AlarmActions.REQUEST_ALL:
return babelHelpers.extends({},
state,{
isFetching:true});

case _AlarmActions.RECEIVE_ALL:
return babelHelpers.extends({},
state,{
isFetching:false,
didInvalidate:false,
items:action.items.map(function(a){return alarm(undefined,{type:_AlarmActions.NEW,alarm:a});}),
lastUpdated:action.receivedAt});

case _AlarmActions.UPDATED:
return babelHelpers.extends({},
state,{
items:state.items.map(function(a){return alarm(a,action);})});

case _AlarmActions.NEW:
return babelHelpers.extends({},
state,{
items:state.items.concat([alarm(undefined,action)])});

case _AlarmActions.DELETED:
var newItems=[];
state.items.forEach(function(alarm){
if(action.alarm._id!==alarm._id)
newItems.push(alarm);});

return babelHelpers.extends({},
state,{
items:newItems});

default:
return state;}}exports.default=




{
alarms:alarms};
});
__d('HomyPiAndroid/js/reducers/searchMusicReducers.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _MusicSearchActions=require("HomyPiAndroid/js/actions/MusicSearchActions.js");



var defaultStates={
isFetching:false,
query:"",
items:[],
limit:0,
offset:0,
total:0};


function searchAlbums(){var state=arguments.length<=0||arguments[0]===undefined?defaultStates:arguments[0];var action=arguments[1];
switch(action.type){
case _MusicSearchActions.REQUEST:
return babelHelpers.extends({},
state,{
query:action.query,
isFetching:true});

case _MusicSearchActions.RECEIVED:
if(!action.albums||!Array.isArray(action.albums.items))return state;
return babelHelpers.extends({},
state,{
isFetching:false},
action.albums);

case _MusicSearchActions.RECEIVED_MORE:
if(!action.albums||!Array.isArray(action.albums.items))return state;
return babelHelpers.extends({},
state,{
isFetching:false},
action.albums,{
items:state.items.concat(action.albums.items)});

default:
return state;}}


function searchArtists(){var state=arguments.length<=0||arguments[0]===undefined?defaultStates:arguments[0];var action=arguments[1];
switch(action.type){
case _MusicSearchActions.REQUEST:
return babelHelpers.extends({},
state,{
query:action.query,
isFetching:true});

case _MusicSearchActions.RECEIVED:
if(!action.artists||!Array.isArray(action.artists.items))return state;
return babelHelpers.extends({},
state,{
isFetching:false},
action.artists);

case _MusicSearchActions.RECEIVED_MORE:
if(!action.artists||!Array.isArray(action.artists.items))return state;
return babelHelpers.extends({},
state,{
isFetching:false},
action.artists,{
items:state.items.concat(action.artists.items)});

default:
return state;}}


function searchTracks(){var state=arguments.length<=0||arguments[0]===undefined?defaultStates:arguments[0];var action=arguments[1];
switch(action.type){
case _MusicSearchActions.REQUEST:
return babelHelpers.extends({},
state,{
query:action.query,
isFetching:true});

case _MusicSearchActions.RECEIVED:
if(!action.tracks||!Array.isArray(action.tracks.items))return state;
return babelHelpers.extends({},
state,{
isFetching:false},
action.tracks);

case _MusicSearchActions.RECEIVED_MORE:
if(!action.tracks||!Array.isArray(action.tracks.items))return state;
return babelHelpers.extends({},
state,{
isFetching:false},
action.tracks,{
items:state.items.concat(action.tracks.items)});

default:
return state;}}


var DEBUG_ARTISTS=["gorillaz","pogo","supertramp","kate tempest"];
var DEBUG_SEARCH=DEBUG_ARTISTS[Math.floor(Math.random()*DEBUG_ARTISTS.length)];
function searchMusic()






{var state=arguments.length<=0||arguments[0]===undefined?{isFetching:false,didInvalidate:false,query:DEBUG_SEARCH,albums:defaultStates,artists:defaultStates,tracks:defaultStates}:arguments[0];var action=arguments[1];
switch(action.type){
case _MusicSearchActions.REQUEST:
return babelHelpers.extends({},
state,{
isFetching:true,
query:action.query,
albums:searchAlbums(state.albums,action),
artists:searchArtists(state.artists,action),
tracks:searchTracks(state.tracks,action)});

case _MusicSearchActions.RECEIVED:
return babelHelpers.extends({},
state,{
isFetching:false,
albums:searchAlbums(state.albums,action),
artists:searchArtists(state.artists,action),
tracks:searchTracks(state.tracks,action)});

case _MusicSearchActions.RECEIVED_MORE:
return babelHelpers.extends({},
state,{
isFetching:false,
albums:searchAlbums(state.albums,action),
artists:searchArtists(state.artists,action),
tracks:searchTracks(state.tracks,action)});

default:
return state;}}exports.default=



{
searchMusic:searchMusic,
searchAlbums:searchAlbums,
searchArtists:searchArtists,
searchTracks:searchTracks};
});
__d('HomyPiAndroid/js/components/login.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});








var _reactRedux=require("react-redux/lib/index.js");
var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);
var _reactNativeMaterialKit=require("react-native-material-kit/lib/index.js");
var _UserActions=require("HomyPiAndroid/js/actions/UserActions.js");

var _home=require("HomyPiAndroid/js/components/home.js");var _home2=babelHelpers.interopRequireDefault(_home);var React=require("react-native/Libraries/react-native/react-native.js");var AppRegistry=React.AppRegistry;var StyleSheet=React.StyleSheet;var Text=React.Text;var View=React.View;var TextInput=React.TextInput;var TouchableHighlight=React.TouchableHighlight;

var styles={
textfieldWithFloatingLabel:{
height:38,
marginTop:10}};



var Textfield=_reactNativeMaterialKit.MKTextField.textfieldWithFloatingLabel().
withPlaceholder("Server Url").
withStyle(styles.textfieldWithFloatingLabel).
withFloatingLabelFont({
fontSize:10,
fontStyle:"italic",
fontWeight:"200"}).

build();

var LoginButton=_reactNativeMaterialKit.MKButton.coloredButton().
withText("Login").
build();

var Login=React.createClass({displayName:"Login",
getInitialState:function(){
var serverurl=_settings2.default.getServerUrl();
return {
urlValid:_settings2.default.isValidUrl(serverurl),
url:serverurl};},


componentDidMount:function(){var _this=this;
_settings2.default.loadStoredServerUrl(function(err,serverurl){
_this.setState({
urlValid:_settings2.default.isValidUrl(serverurl),
url:serverurl});});},



render:function(){var _this2=this;var 
user=this.props.user;
var status="Idle";
if(user.isFetching){
status="Fetching";}else 
if(user.hasFailed){
status=user.error;}else 
if(user.token){
status="got token: for "+" with"+user.token;}

return (
React.createElement(View,{style:this.styles.container},
React.createElement(Textfield,{
value:this.state.url,
onChangeText:
function(text){

_this2.setState({url:text,urlValid:_settings2.default.isValidUrl(text)});}}),


React.createElement(TextInput,{
onChangeText:function(text){return _this2.setState({username:text});},
value:this.state.username}),

React.createElement(TextInput,{
onChangeText:function(text){return _this2.setState({password:text});},
value:this.state.password,
secureTextEntry:true}),





React.createElement(LoginButton,{
enabled:this.state.urlValid&&this.state.username!=""&&this.state.password!="",
onPress:this._login}),
React.createElement(Text,null,"Status = ",status)));},



_login:function(){
_settings2.default.setServerUrl(this.state.url);var _state=
this.state;var username=_state.username;var password=_state.password;
this.props.dispatch((0,_UserActions.login)(username,password,this.props.onLoggedIn));},

styles:StyleSheet.create({
container:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"#F5FCFF"},

button:{
alignItems:"center",
marginBottom:7,
backgroundColor:"blue",
borderRadius:2},

buttonText:{
fontSize:24}})});



function mapStateToProps(state){var 
user=state.user;
return {
user:user};}exports.default=



(0,_reactRedux.connect)(mapStateToProps)(Login);
});
__d('react-native-material-kit/lib/internal/Thumb.js',function(global, require, module, exports) {  'use strict';









var React=require('react-native/Libraries/react-native/react-native.js');
var MKColor=require('react-native-material-kit/lib/MKColor.js');var 


Component=




React.Component;var Animated=React.Animated;var View=React.View;var PanResponder=React.PanResponder;var PropTypes=React.PropTypes;



var DEFAULT_UPPER_TRACK_COLOR='#cccccc';


var LOWEST_VALUE_THUMB_COLOR='white';


var THUMB_SCALE_RATIO=1.3;


var THUMB_BORDER_WIDTH=2;


var TRACK_EXTRA_MARGIN_H=5;var 



Thumb=function(_Component){babelHelpers.inherits(Thumb,_Component);
function Thumb(props){babelHelpers.classCallCheck(this,Thumb);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Thumb).call(this,
props));
_this.x=0;

_this._trackMarginH=(props.radius+THUMB_BORDER_WIDTH)*THUMB_SCALE_RATIO+
TRACK_EXTRA_MARGIN_H;
_this._panResponder={};
_this._animatedLeft=new Animated.Value(0);
_this._animatedScale=new Animated.Value(1);
_this.state={
color:LOWEST_VALUE_THUMB_COLOR,
borderColor:DEFAULT_UPPER_TRACK_COLOR};return _this;}babelHelpers.createClass(Thumb,[{key:'componentWillMount',value:function componentWillMount()



{var _this2=this;
this._panResponder=PanResponder.create({
onStartShouldSetPanResponder:function(){return true;},
onStartShouldSetPanResponderCapture:function(){return true;},
onMoveShouldSetPanResponder:function(){return true;},
onMoveShouldSetPanResponderCapture:function(){return true;},
onPanResponderTerminationRequest:function(){return true;},
onShouldBlockNativeResponder:function(){return true;},

onPanResponderGrant:function(evt){_this2.props.onGrant(_this2,evt);},
onPanResponderMove:function(evt){_this2.props.onMove(_this2,evt);},
onPanResponderRelease:function(evt){_this2.props.onEnd(_this2,evt);},
onPanResponderTerminate:function(evt){_this2.props.onEnd(_this2,evt);}});


this._onRadiiUpdate(this.props);
this.setState({
borderColor:this.props.disabledColor});}},{key:'componentDidMount',value:function componentDidMount()



{
this._animatedLeft.addListener(this._getOnSliding());}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this._onRadiiUpdate(nextProps);}},{key:'componentWillUnmount',value:function componentWillUnmount()


{
this._animatedLeft.removeAllListeners();}},{key:'_onRadiiUpdate',value:function _onRadiiUpdate(



props){
this._radii=props.radius;
this._dia=this._radii*2;
this._containerRadii=this._radii+THUMB_BORDER_WIDTH;
this._containerDia=this._containerRadii*2;}},{key:'_getOnSliding',value:function _getOnSliding()



{var _this3=this;
var prevX=this.x;



return function(_ref){var value=_ref.value;

var x=value+_this3._containerRadii-_this3._trackMarginH;

if(prevX<=0&&x>0){

_this3._onExplode();}else 
if(prevX>0&&x<=0){

_this3._onCollapse();}


prevX=x;};}},{key:'moveTo',value:function moveTo(





x){
this.x=x;
var x0=this.x+this._trackMarginH;

Animated.parallel([
Animated.timing(this._animatedScale,{
toValue:THUMB_SCALE_RATIO,
duration:100}),

Animated.timing(this._animatedLeft,{
toValue:x0-this._containerRadii,
duration:0})]).

start();}},{key:'confirmMoveTo',value:function confirmMoveTo()



{
Animated.timing(this._animatedScale,{
toValue:1,
duration:100}).
start();}},{key:'_onExplode',value:function _onExplode()



{
this.setState({
borderColor:this.props.enabledColor,
color:this.props.enabledColor});}},{key:'_onCollapse',value:function _onCollapse()




{
this.setState({
borderColor:this.props.disabledColor,
color:LOWEST_VALUE_THUMB_COLOR});}},{key:'render',value:function render()




{
return (
React.createElement(Animated.View,babelHelpers.extends({
style:[
this.props.style,
{
width:this._containerDia,
height:this._containerDia,
backgroundColor:this.state.borderColor,
borderRadius:this._containerRadii,
position:'absolute',
left:this._animatedLeft,
transform:[
{scale:this._animatedScale}]}]},



this._panResponder.panHandlers),

React.createElement(View,{
style:{
width:this._dia,
height:this._dia,
backgroundColor:this.state.color,
borderRadius:this._radii,
top:THUMB_BORDER_WIDTH,
left:THUMB_BORDER_WIDTH}})));}}]);return Thumb;}(Component);







Thumb.propTypes=babelHelpers.extends({},

View.propTypes,{


onGrant:PropTypes.func,


onMove:PropTypes.func,


onEnd:PropTypes.func,


disabledColor:PropTypes.string,


enabledColor:PropTypes.string,


radius:PropTypes.number});



Thumb.defaultProps={
radius:6,
disabledColor:DEFAULT_UPPER_TRACK_COLOR};



module.exports=Thumb;
});
__d('react-native-material-kit/lib/theme.js',function(global, require, module, exports) {  'use strict';



var MKColor=require('react-native-material-kit/lib/MKColor.js');

var theme=void 0;var 

AttrReference=function(){
function AttrReference(attr){babelHelpers.classCallCheck(this,AttrReference);
this.attr=attr;}babelHelpers.createClass(AttrReference,[{key:'value',get:function()


{
return theme[this.attr];}}]);return AttrReference;}();var 



RGBAttrReference=function(_AttrReference){babelHelpers.inherits(RGBAttrReference,_AttrReference);
function RGBAttrReference(attr,alpha){babelHelpers.classCallCheck(this,RGBAttrReference);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(RGBAttrReference).call(this,
attr));
_this.alpha=alpha;return _this;}babelHelpers.createClass(RGBAttrReference,[{key:'value',get:function()


{
var v=babelHelpers.get(Object.getPrototypeOf(RGBAttrReference.prototype),'value',this);
return this.alpha>0?'rgba('+v+','+this.alpha+')':'rgb('+v+')';}}]);return RGBAttrReference;}(AttrReference);



var primaryColorRef=new AttrReference('primaryColor');
var accentColorRef=new AttrReference('accentColor');




theme={
primaryColor:MKColor.Indigo,
primaryColorRGB:MKColor.RGBIndigo,
accentColor:MKColor.Pink,
accentColorRGB:MKColor.RGBPink,
bgPlain:'rgba(158,158,158,.2)',
bgDisabled:'rgba(0,0,0,.12)',
fontColor:'rgb(117, 117, 117)',
fontSize:14,
rippleColor:'rgba(255,255,255,.125)',
textfieldStyle:{
tintColor:'rgba(0,0,0,.12)',
highlightColor:primaryColorRef,
textInputStyle:{
color:new AttrReference('fontColor'),
fontSize:16,
paddingLeft:0,
paddingRight:0},

floatingLabelFont:{
fontSize:12,
color:'red'}},


progressStyle:{
backgroundColor:new RGBAttrReference('primaryColorRGB',.3),
progressColor:primaryColorRef,
bufferColor:new RGBAttrReference('primaryColorRGB',.3)},

spinnerStyle:{
strokeColor:[
MKColor.palette_blue_400,
MKColor.palette_red_500,
MKColor.palette_yellow_600,
MKColor.palette_green_500]},


sliderStyle:{
lowerTrackColor:primaryColorRef,
upperTrackColor:'#cccccc'},

iconToggleStyle:{
onColor:new RGBAttrReference('primaryColorRGB',.4),
offColor:'rgba(0,0,0,.25)',
rippleColor:new AttrReference('bgPlain')},

switchStyle:{
onColor:new RGBAttrReference('primaryColorRGB',.4),
offColor:'rgba(0,0,0,.25)',
thumbOnColor:primaryColorRef,
thumbOffColor:MKColor.Silver,
rippleColor:new RGBAttrReference('primaryColorRGB',.2)},

radioStyle:{
borderOnColor:primaryColorRef,
borderOffColor:primaryColorRef,
fillColor:primaryColorRef,
rippleColor:new RGBAttrReference('primaryColorRGB',.2)},

checkboxStyle:{
borderOnColor:primaryColorRef,
borderOffColor:'rgba(0,0,0,.56)',
fillColor:primaryColorRef,
rippleColor:new RGBAttrReference('primaryColorRGB',.2),
inset:0},

cardStyle:{
flex:1,
backgroundColor:'#ffffff',
borderRadius:2,
borderColor:'#ffffff',
borderWidth:1,
shadowColor:'rgba(0,0,0,.12)',
shadowOpacity:0.8,
shadowRadius:2,
shadowOffset:{
height:1,
width:2}},


cardImageStyle:{
flex:1,
height:170,
resizeMode:'cover'},

cardTitleStyle:{
position:'absolute',
top:120,
left:26,
backgroundColor:'transparent',
padding:16,
fontSize:24,
color:'#000000',
fontWeight:'bold'},

cardContentStyle:{
padding:15,
color:'rgba(0,0,0,.54)'},

cardActionStyle:{
borderStyle:'solid',
borderTopColor:'rgba(0,0,0,.1)',
borderTopWidth:1,
padding:15},

cardMenuStyle:{
position:'absolute',
top:16,
right:16,
backgroundColor:'transparent'}};



function isPlainObject(o){
return typeof o==='object'&&!Array.isArray(o)&&o!==null&&
!(o instanceof String)&&!(o instanceof Function);}





function wrapAttrRef(style,attr,attrValue){
Object.defineProperty(style,attr,{
enumerable:true,
get:function(){
return attrValue.value;}});}







function wrapStyle(style){
Object.getOwnPropertyNames(style).forEach(function(attr){
var v=style[attr];
if(v instanceof AttrReference){
wrapAttrRef(style,attr,v);}else 
if(isPlainObject(v)){
wrapStyle(v);}});



return style;}



wrapStyle(theme);







function setTheme(aTheme){
babelHelpers.extends(theme,aTheme);}






function getTheme(){
return babelHelpers.extends({},theme);}


exports.setTheme=setTheme;
exports.getTheme=getTheme;
exports.theme={
AttrReference:AttrReference,
RGBAttrReference:RGBAttrReference,
primaryColorRef:primaryColorRef,
accentColorRef:accentColorRef};
});
__d('react-native-material-kit/lib/index.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.MKCheckbox=exports.MKRadioButton=exports.MKSpinner=exports.MKRangeSlider=exports.MKSlider=exports.MKProgress=exports.MKRipple=exports.MKIconToggle=exports.MKSwitch=exports.MKTextField=exports.MKButton=exports.MKColor=exports.mdl=exports.theme=exports.getTheme=exports.setTheme=undefined;var _theme=require('react-native-material-kit/lib/theme.js');Object.defineProperty(exports,'setTheme',{enumerable:true,get:function(){return _theme.



setTheme;}});Object.defineProperty(exports,'getTheme',{enumerable:true,get:function(){return _theme.
getTheme;}});Object.defineProperty(exports,'theme',{enumerable:true,get:function(){return _theme.
theme;}});


var _mdl=require('react-native-material-kit/lib/mdl/index.js');Object.defineProperty(exports,'MKButton',{enumerable:true,get:function(){return _mdl.





Button;}});Object.defineProperty(exports,'MKTextField',{enumerable:true,get:function(){return _mdl.
Textfield;}});Object.defineProperty(exports,'MKSwitch',{enumerable:true,get:function(){return _mdl.
Switch;}});Object.defineProperty(exports,'MKIconToggle',{enumerable:true,get:function(){return _mdl.
IconToggle;}});Object.defineProperty(exports,'MKRipple',{enumerable:true,get:function(){return _mdl.

Ripple;}});Object.defineProperty(exports,'MKProgress',{enumerable:true,get:function(){return _mdl.
Progress;}});Object.defineProperty(exports,'MKSlider',{enumerable:true,get:function(){return _mdl.
Slider;}});Object.defineProperty(exports,'MKRangeSlider',{enumerable:true,get:function(){return _mdl.
RangeSlider;}});Object.defineProperty(exports,'MKSpinner',{enumerable:true,get:function(){return _mdl.
Spinner;}});Object.defineProperty(exports,'MKRadioButton',{enumerable:true,get:function(){return _mdl.
RadioButton;}});Object.defineProperty(exports,'MKCheckbox',{enumerable:true,get:function(){return _mdl.
Checkbox;}});var mdl=babelHelpers.interopRequireWildcard(_mdl);var _MKColor=require('react-native-material-kit/lib/MKColor.js');var MKColor=babelHelpers.interopRequireWildcard(_MKColor);exports.mdl=mdl;exports.MKColor=MKColor;
});
__d('react-native-material-kit/lib/builder.js',function(global, require, module, exports) {  'use strict';var _require=






require('react-native-material-kit/lib/theme.js');var _getTheme=_require.getTheme;

function capitalize(str){
return str.substring(0,1).toUpperCase()+str.substring(1);}var 







Builder=function(){function Builder(){babelHelpers.classCallCheck(this,Builder);}babelHelpers.createClass(Builder,[{key:'getTheme',value:function getTheme()





























{
return _getTheme();}},{key:'withAccent',value:function withAccent(


v){
this.accent=v;
return this;}},{key:'withBackgroundColor',value:function withBackgroundColor(


color){
this.backgroundColor=color;
return this;}},{key:'withStyle',value:function withStyle(


v){
this.style=this.style?[this.style,v]:v;
return this;}},{key:'build',value:function build()


{}},{key:'toProps',value:function toProps()


{
this.mergeStyle();
return babelHelpers.extends({},this);}},{key:'getThemeColor',value:function getThemeColor()


{
return this.accent?_getTheme().accentColor:_getTheme().primaryColor;}},{key:'mergeStyle',value:function mergeStyle()


{
this.mergeStyleWith({
backgroundColor:this.backgroundColor});}},{key:'choseBackgroundColor',value:function choseBackgroundColor()



{
this.backgroundColor=this.backgroundColor||this.getThemeColor();}},{key:'mergeStyleWith',value:function mergeStyleWith(


base){
this.style=[].concat(base,this.style);}}],[{key:'defineProp',value:function defineProp(name){var methodName='with'+capitalize(name);if(this.prototype[methodName]){return;}Object.defineProperty(this.prototype,methodName,{enumerable:false,value:function(v){this[name]=v;return this;}});}},{key:'defineProps',value:function defineProps(propTypes){var filter=arguments.length<=1||arguments[1]===undefined?function(){return true;}:arguments[1];var self=this;Object.getOwnPropertyNames(propTypes).forEach(function(prop){if(!self.hasOwnProperty(prop)&&filter(prop)){Builder.defineProp.call(self,prop);}});}}]);return Builder;}();var 








TextViewBuilder=function(_Builder){babelHelpers.inherits(TextViewBuilder,_Builder);function TextViewBuilder(){babelHelpers.classCallCheck(this,TextViewBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TextViewBuilder).apply(this,arguments));}babelHelpers.createClass(TextViewBuilder,[{key:'withText',value:function withText(
text){
this.text=text;
return this;}},{key:'withTextStyle',value:function withTextStyle(


style){
this.textStyle=style;
return this;}},{key:'mergeTextStyleWith',value:function mergeTextStyleWith(


base){
this.textStyle=[].concat(base,this.textStyle);}},{key:'mergeStyle',value:function mergeStyle()


{
babelHelpers.get(Object.getPrototypeOf(TextViewBuilder.prototype),'mergeStyle',this).call(this);
this.mergeStyleWith({
padding:8,
justifyContent:'center',
alignItems:'center'});

this.mergeTextStyleWith({
fontSize:_getTheme().fontSize});}}]);return TextViewBuilder;}(Builder);






exports.Builder=Builder;
exports.TextViewBuilder=TextViewBuilder;
});
__d('react-native-material-kit/lib/mdl/index.js',function(global, require, module, exports) {  'use strict';


exports.Switch=require('react-native-material-kit/lib/mdl/Switch.js');
exports.IconToggle=require('react-native-material-kit/lib/mdl/IconToggle.js');
exports.Textfield=require('react-native-material-kit/lib/mdl/Textfield.js');
exports.Progress=require('react-native-material-kit/lib/mdl/Progress.js');
exports.Spinner=require('react-native-material-kit/lib/mdl/Spinner.android.js');
exports.Slider=require('react-native-material-kit/lib/mdl/Slider.js');
exports.RangeSlider=require('react-native-material-kit/lib/mdl/RangeSlider.js');
exports.Button=require('react-native-material-kit/lib/mdl/Button.js');
exports.Ripple=require('react-native-material-kit/lib/mdl/Ripple.js');
exports.RadioButton=require('react-native-material-kit/lib/mdl/RadioButton.js');
exports.Checkbox=require('react-native-material-kit/lib/mdl/Checkbox.js');
});
__d('react-native-material-kit/lib/mdl/Switch.js',function(global, require, module, exports) {  'use strict';











var React=require('react-native/Libraries/react-native/react-native.js');
var MKColor=require('react-native-material-kit/lib/MKColor.js');
var utils=require('react-native-material-kit/lib/utils.js');var _require=
require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;var 


Component=



React.Component;var Animated=React.Animated;var View=React.View;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;var 




Thumb=function(_Component){babelHelpers.inherits(Thumb,_Component);
function Thumb(props){babelHelpers.classCallCheck(this,Thumb);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Thumb).call(this,
props));
_this._animatedRippleScale=new Animated.Value(0);
_this._animatedRippleAlpha=new Animated.Value(0);
_this.state={
checked:false};return _this;}babelHelpers.createClass(Thumb,[{key:'componentWillMount',value:function componentWillMount()



{
this.setState({checked:this.props.checked});}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
if(nextProps.checked!==this.props.checked){
this.setState({checked:nextProps.checked});}}},{key:'startToggle',value:function startToggle()




{
this.showRipple();}},{key:'confirmToggle',value:function confirmToggle(




fromState){
this.state.checked=!fromState;}},{key:'endToggle',value:function endToggle()



{
this.hideRipple();}},{key:'showRipple',value:function showRipple()



{var _this2=this;

this._rippleAni=Animated.parallel([
Animated.timing(this._animatedRippleAlpha,{
toValue:1,
duration:this.props.rippleAniDuration||250}),

Animated.timing(this._animatedRippleScale,{
toValue:1,
duration:this.props.rippleAniDuration||250})]);



this._rippleAni.start(function(){
_this2._rippleAni=undefined;


if(_this2._pendingRippleAni){
_this2._pendingRippleAni();}});}},{key:'hideRipple',value:function hideRipple()





{var _this3=this;
this._pendingRippleAni=function(){
Animated.parallel([
Animated.timing(_this3._animatedRippleScale,{
toValue:0,
duration:_this3.props.rippleAniDuration||250}),

Animated.timing(_this3._animatedRippleAlpha,{
toValue:0,
duration:_this3.props.rippleAniDuration||250})]).

start();

_this3._pendingRippleAni=undefined;};


if(!this._rippleAni){

this._pendingRippleAni();}}},{key:'_getBgColor',value:function _getBgColor()



{
return this.state.checked?this.props.onColor:this.props.offColor;}},{key:'render',value:function render()



{
var rippleSize=this.props.rippleRadius*2;

return (
React.createElement(View,{ref:'container',
style:[this.props.style,{
position:'absolute',
width:rippleSize,
height:rippleSize,
backgroundColor:MKColor.Transparent}]},


React.createElement(View,{
style:[
Thumb.defaultProps.style,
this.props.thumbStyle,{
backgroundColor:this._getBgColor()}]}),


React.createElement(Animated.View,{
style:{
position:'absolute',
opacity:this._animatedRippleAlpha,
backgroundColor:this.props.rippleColor,
width:rippleSize,
height:rippleSize,
borderRadius:this.props.rippleRadius,
top:0,
left:0,
transform:[
{scale:this._animatedRippleScale}]}})));}}]);return Thumb;}(Component);








Thumb.propTypes=babelHelpers.extends({},

View.propTypes,{
onColor:React.PropTypes.string,
offColor:React.PropTypes.string,
rippleColor:React.PropTypes.string});



Thumb.defaultProps={
pointerEvents:'none',
onColor:MKColor.Indigo,
offColor:MKColor.Silver,
rippleColor:'rgba(63,81,181,0.2)',
style:{
shadowColor:'black',
shadowRadius:1,
shadowOpacity:0.7,
shadowOffset:{width:0,height:1}}};




var AnimatedThumb=Animated.createAnimatedComponent(Thumb);var 




Switch=function(_Component2){babelHelpers.inherits(Switch,_Component2);
function Switch(props){babelHelpers.classCallCheck(this,Switch);var _this4=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Switch).call(this,
props));
_this4.theme=getTheme();
_this4._animatedThumbLeft=new Animated.Value(0);
_this4.state={
trackSize:0,
trackLength:0,
trackRadii:0,
trackMargin:0,
thumbFrame:{x:0,padding:0,r:0,rippleRadii:0}};return _this4;}babelHelpers.createClass(Switch,[{key:'componentWillMount',value:function componentWillMount()



{
this.setState({checked:this.props.checked});
this._layoutThumb(this.props);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
if(nextProps.checked!==this.props.checked){
this.setState({checked:nextProps.checked});}

this._layoutThumb(nextProps);}},{key:'_layoutThumb',value:function _layoutThumb(_ref)



{var checked=_ref.checked;var trackLength=_ref.trackLength;var trackSize=_ref.trackSize;
var trackRadii=trackSize/2;
var thumbRadii=this.props.thumbRadius;
var rippleRadii=trackLength-trackSize;
var trackMargin=rippleRadii-trackRadii;
var thumbLeft=checked?trackMargin+trackRadii:0;
this._animatedThumbLeft.setValue(thumbLeft);
this.setState({
trackSize:trackSize,
trackLength:trackLength,
trackRadii:trackRadii,
trackMargin:trackMargin,
thumbFrame:{
rippleRadii:rippleRadii,
x:thumbLeft,
r:thumbRadii,
padding:rippleRadii-thumbRadii}});}},{key:'_translateThumb',value:function _translateThumb()





{var _this5=this;
this._animatedThumbLeft.setValue(this.state.thumbFrame.x);
var newX=this._computeThumbX(this.state.checked);
Animated.timing(this._animatedThumbLeft,{
toValue:newX,
duration:this.props.thumbAniDuration||300}).
start(function(){
_this5.state.thumbFrame.x=newX;});}},{key:'_computeThumbX',value:function _computeThumbX(




toChecked){
if(!this.state.thumbFrame.r){
return 0;}var _state=


this.state;var trackLength=_state.trackLength;var trackSize=_state.trackSize;
var dx=(toChecked?1:-1)*(trackLength-trackSize);
return this.state.thumbFrame.x+dx;}},{key:'startToggle',value:function startToggle()



{
this.getThumb().startToggle();}},{key:'confirmToggle',value:function confirmToggle()



{var _this6=this;
var prevState=this.state.checked;
this.setState({checked:!prevState},function(){
_this6.getThumb().confirmToggle(prevState);
_this6._translateThumb();

if(_this6.props.onCheckedChange){
_this6.props.onCheckedChange({checked:_this6.state.checked});}});}},{key:'endToggle',value:function endToggle()





{
this.getThumb().endToggle();}},{key:'getThumb',value:function getThumb()




{
return this.refs.thumb.refs.node;}},{key:'_getBgColor',value:function _getBgColor(


theme){
var onColor=this.props.onColor||theme.onColor;
var offColor=this.props.offColor||theme.offColor;
return this.state.checked?onColor:offColor;}},{key:'_onPress',value:function _onPress()


{
this.confirmToggle();
if(this.props.onPress){
this.props.onPress();}}},{key:'_onPressIn',value:function _onPressIn()



{
this.startToggle();
if(this.props.onPressIn){
this.props.onPressIn();}}},{key:'_onPressOut',value:function _onPressOut()



{
this.endToggle();
if(this.props.onPressOut){
this.props.onPressOut();}}},{key:'render',value:function render()




{
var touchProps={
delayPressIn:this.props.delayPressIn,
delayPressOut:this.props.delayPressOut,
delayLongPress:this.props.delayLongPress,
onLongPress:this.props.onLongPress};


var mergedStyle=babelHelpers.extends({},this.theme.switchStyle,utils.compact({
onColor:this.props.onColor,
offColor:this.props.offColor,
thumbOnColor:this.props.thumbOnColor,
thumbOffColor:this.props.thumbOffColor,
rippleColor:this.props.rippleColor}));


var thumbFrame=this.state.thumbFrame;
var thumbProps={
checked:this.state.checked,
onColor:mergedStyle.thumbOnColor,
offColor:mergedStyle.thumbOffColor,
rippleColor:mergedStyle.rippleColor,
rippleRadius:thumbFrame.rippleRadii,
rippleAniDuration:this.props.rippleAniDuration,
radius:this.props.thumbRadius,
style:{
left:this._animatedThumbLeft,
top:0},

thumbStyle:{
width:this.props.thumbRadius*2,
height:this.props.thumbRadius*2,
borderRadius:this.props.thumbRadius,
top:thumbFrame.padding,
left:thumbFrame.padding}};



return (
React.createElement(TouchableWithoutFeedback,babelHelpers.extends({},
touchProps,{
onPress:this._onPress.bind(this),
onPressIn:this._onPressIn.bind(this),
onPressOut:this._onPressOut.bind(this)}),

React.createElement(View,{ref:'container',
pointerEvents:'box-only',
style:this.props.style},

React.createElement(View,{ref:'track',
style:{
width:this.props.trackLength,
height:this.props.trackSize,
backgroundColor:this._getBgColor(mergedStyle),
borderRadius:this.state.trackRadii,
margin:this.state.trackMargin}}),


React.createElement(AnimatedThumb,babelHelpers.extends({ref:'thumb'},
thumbProps)))));}}]);return Switch;}(Component);








Switch.propTypes=babelHelpers.extends({},

TouchableWithoutFeedback.propTypes,{


checked:React.PropTypes.bool,


onCheckedChange:React.PropTypes.func,


onColor:React.PropTypes.string,


offColor:React.PropTypes.string,


trackSize:React.PropTypes.number,


trackLength:React.PropTypes.number,


thumbRadius:React.PropTypes.number,


thumbOnColor:React.PropTypes.string,


thumbOffColor:React.PropTypes.string,


thumbAniDuration:React.PropTypes.number,


rippleColor:React.PropTypes.string,


rippleAniDuration:React.PropTypes.number});



Switch.defaultProps={
checked:false,
trackLength:48,
trackSize:20,
thumbRadius:14};




module.exports=Switch;
});
__d('react-native-material-kit/lib/internal/MKTouchable.js',function(global, require, module, exports) {  'use strict';





var React=require('react-native/Libraries/react-native/react-native.js');var _require=
require('react-native-material-kit/lib/utils.js');var convertCoordinate=_require.convertCoordinate;var 


Component=



React.Component;var requireNativeComponent=React.requireNativeComponent;var View=React.View;var PropTypes=React.PropTypes;var 




MKTouchable=function(_Component){babelHelpers.inherits(MKTouchable,_Component);function MKTouchable(){babelHelpers.classCallCheck(this,MKTouchable);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(MKTouchable).apply(this,arguments));}babelHelpers.createClass(MKTouchable,[{key:'_onTouchEvent',value:function _onTouchEvent(

event){
if(this.props.onTouch){
var evt=event.nativeEvent;
evt.x=convertCoordinate(evt.x);
evt.y=convertCoordinate(evt.y);
this.props.onTouch(evt);}}},{key:'measure',value:function measure(



cb){
return this.refs.node.measure(cb);}},{key:'render',value:function render()


{var _this2=this;
return (
React.createElement(NativeTouchable,babelHelpers.extends({
ref:'node'},
this.props,{
style:this.props.style,
onChange:this._onTouchEvent.bind(this),
onLayout:function(evt){return _this2.props.onLayout&&_this2.props.onLayout(evt);}}),

this.props.children));}}]);return MKTouchable;}(Component);






MKTouchable.propTypes=babelHelpers.extends({},

View.propTypes,{


onTouch:React.PropTypes.func,


nativeBackgroundAndroid:PropTypes.object});


var NativeTouchable=requireNativeComponent('MKTouchable',{
name:'MKTouchable',
propTypes:MKTouchable.propTypes});



module.exports=MKTouchable;
});
__d('react-native-material-kit/lib/internal/Tick.js',function(global, require, module, exports) {  'use strict';





var React=require('react-native/Libraries/react-native/react-native.js');var 


Component=




React.Component;var View=React.View;var PropTypes=React.PropTypes;var requireNativeComponent=React.requireNativeComponent;var Animated=React.Animated;

var utils=require('react-native-material-kit/lib/utils.js');



var PROP_TYPES=babelHelpers.extends({},

View.propTypes,{


fillColor:PropTypes.any,


inset:PropTypes.number});


var NativeTick=requireNativeComponent('TickView',{
name:'TickView',
propTypes:PROP_TYPES});var 






Tick=function(_Component){babelHelpers.inherits(Tick,_Component);function Tick(){babelHelpers.classCallCheck(this,Tick);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Tick).apply(this,arguments));}babelHelpers.createClass(Tick,[{key:'render',value:function render()
{
return (
React.createElement(NativeTick,babelHelpers.extends({},
this.props,{
fillColor:utils.parseColor(this.props.fillColor)})));}}]);return Tick;}(Component);





Tick.propTypes=PROP_TYPES;



module.exports=Tick;
Tick.animated=Animated.createAnimatedComponent(Tick);
});
__d('react-native-material-kit/lib/utils.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.parseColor=exports.extractTouchableProps=exports.extractPropsBy=exports.extractProps=exports.getFontSize=exports.convertCoordinate=exports.toDips=exports.toPixels=exports.compact=exports.mergeIntoFast=undefined;




var _reactNative=require('react-native/Libraries/react-native/react-native.js');






var _ramda=require('ramda/dist/ramda.js');var R=babelHelpers.interopRequireWildcard(_ramda);



['Arguments','Function','String','Number','Date','RegExp','Error'].forEach(function(name){
exports['is'+name]=function(obj){
return toString.call(obj)==='[object '+name+']';};});






function mergeIntoFast(a,b){
for(var k in b){
a[k]=b[k];}}




var compact=R.reject(R.isNil);


var toPixels=_reactNative.PixelRatio.getPixelSizeForLayoutSize.bind(_reactNative.PixelRatio);


function toDips(px){
return px/_reactNative.PixelRatio.get();}



function convertCoordinate(value){
return _reactNative.Platform.OS==='android'?toDips(value):value;}



function getFontSize(sp){
return sp*_reactNative.PixelRatio.getFontScale();}


var isNotNil=R.compose(R.not,R.isNil);




function extractPropsBy(view,filter){
return R.pickBy(filter,view.props);}





function extractProps(view,propTypes){
var propNames=Array.isArray(propTypes)?propTypes:R.keys(propTypes);
var filter=function(v,k){return R.indexOf(k,propNames)>=0&&isNotNil(v);};
return R.pickBy(filter,view.props);}




function extractTouchableProps(view){
return extractProps(view,_reactNative.TouchableWithoutFeedback.propTypes);}exports.





mergeIntoFast=mergeIntoFast;exports.
compact=compact;exports.
toPixels=toPixels;exports.
toDips=toDips;exports.
convertCoordinate=convertCoordinate;exports.
getFontSize=getFontSize;exports.
extractProps=extractProps;exports.
extractPropsBy=extractPropsBy;exports.
extractTouchableProps=extractTouchableProps;exports.
parseColor=_reactNative.processColor;
});
__d('react-native-material-kit/lib/mdl/IconToggle.js',function(global, require, module, exports) {  'use strict';










var React=require('react-native/Libraries/react-native/react-native.js');var 


Component=

React.Component;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;

var MKColor=require('react-native-material-kit/lib/MKColor.js');
var Ripple=require('react-native-material-kit/lib/mdl/Ripple.js');
var utils=require('react-native-material-kit/lib/utils.js');var _require=
require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;


function isViewForState(view,state){
return view.props.state_checked&&state||
!(view.props.state_checked||state);}var 





IconToggle=function(_Component){babelHelpers.inherits(IconToggle,_Component);
function IconToggle(props){babelHelpers.classCallCheck(this,IconToggle);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(IconToggle).call(this,
props));
_this.theme=getTheme();
_this.state={checked:false};return _this;}babelHelpers.createClass(IconToggle,[{key:'componentWillMount',value:function componentWillMount()


{
this.setState({checked:this.props.checked});}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
if(nextProps.checked!==this.props.checked){
this.setState({checked:nextProps.checked});}}},{key:'_onTouch',value:function _onTouch(




evt){
switch(evt.type){
case 'TOUCH_UP':
this.confirmToggle();
break;}}},{key:'confirmToggle',value:function confirmToggle()




{var _this2=this;
var prevState=this.state.checked;
this.setState({checked:!prevState},function(){
if(_this2.props.onCheckedChange){
_this2.props.onCheckedChange({checked:_this2.state.checked});}});}},{key:'_renderChildren',value:function _renderChildren()







{var _this3=this;
return React.Children.map(this.props.children,
function(child){return isViewForState(child,_this3.state.checked)?child:null;});}},{key:'render',value:function render()


{
var mergedStyle=babelHelpers.extends({},this.theme.iconToggleStyle,utils.compact({
rippleColor:this.props.rippleColor}));


return (
React.createElement(TouchableWithoutFeedback,utils.extractTouchableProps(this),
React.createElement(Ripple,babelHelpers.extends({},
this.props,{
rippleColor:mergedStyle.rippleColor,
style:[IconToggle.defaultProps.style,this.props.style],
maskBorderRadiusInPercent:50,
rippleLocation:'center',
onTouch:this._onTouch.bind(this)}),

this._renderChildren())));}}]);return IconToggle;}(Component);







IconToggle.propTypes=babelHelpers.extends({},

Ripple.propTypes,


TouchableWithoutFeedback.propTypes,{


checked:React.PropTypes.bool,


onCheckedChange:React.PropTypes.func});



IconToggle.defaultProps={
pointerEvents:'box-only',
enabled:true,
maskColor:MKColor.Transparent,
style:{
justifyContent:'center',
alignItems:'center',
borderColor:'rgba(0,0,0,.54)',
width:56,
height:56}};var _require2=









require('react-native-material-kit/lib/builder.js');var Builder=_require2.Builder;var 




IconToggleBuilder=function(_Builder){babelHelpers.inherits(IconToggleBuilder,_Builder);function IconToggleBuilder(){babelHelpers.classCallCheck(this,IconToggleBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(IconToggleBuilder).apply(this,arguments));}babelHelpers.createClass(IconToggleBuilder,[{key:'build',value:function build()
{
var props=this.toProps();

return React.createClass({
render:function(){
return (
React.createElement(IconToggle,babelHelpers.extends({},props,this.props),
this.props.children));}});}}]);return IconToggleBuilder;}(Builder);








IconToggleBuilder.defineProps(IconToggle.propTypes);





function builder(){
return new IconToggleBuilder().withBackgroundColor(MKColor.Transparent);}




module.exports=IconToggle;
IconToggle.Builder=IconToggleBuilder;
IconToggle.builder=builder;
});
__d('react-native-material-kit/lib/mdl/Progress.js',function(global, require, module, exports) {  'use strict';


























var _theme=require('react-native-material-kit/lib/theme.js');var React=require('react-native/Libraries/react-native/react-native.js');var Component=React.Component;var View=React.View;var PropTypes=React.PropTypes;var Animated=React.Animated;var Easing=React.Easing;var MKColor=require('react-native-material-kit/lib/MKColor.js');var 





Progress=function(_Component){babelHelpers.inherits(Progress,_Component);
function Progress(props){babelHelpers.classCallCheck(this,Progress);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Progress).call(this,
props));
_this.theme=(0,_theme.getTheme)();
_this._progress=0;
_this._buffer=0;
_this._totalLength=0;
_this._height=new Animated.Value(0);
_this._animatedLength=new Animated.Value(0);
_this._animatedBufferLength=new Animated.Value(0);return _this;}babelHelpers.createClass(Progress,[{key:'componentWillMount',value:function componentWillMount()


{
this.progress=this.props.progress;
this.buffer=this.props.buffer;}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this.progress=nextProps.progress;
this.buffer=nextProps.buffer;}},{key:'_onLayout',value:function _onLayout(_ref)


{var _ref$nativeEvent$layo=_ref.nativeEvent.layout;var width=_ref$nativeEvent$layo.width;var height=_ref$nativeEvent$layo.height;
if(width>0&&this._totalLength!==width){
this._totalLength=width;
this._height.setValue(height);
this._aniUpdateProgress(this.progress);
this._aniUpdateBuffer(this.buffer);}}},{key:'_aniUpdateProgress',value:function _aniUpdateProgress(



theProgress){
if(!(this._totalLength>0&&theProgress>=0)){
return;}


Animated.timing(this._animatedLength,{
toValue:theProgress*this._totalLength,
duration:this.props.progressAniDuration||300,
easing:Easing.out(Easing.quad)}).
start();}},{key:'_aniUpdateBuffer',value:function _aniUpdateBuffer(


buffer){
if(!(this._totalLength>0&&buffer>=0)){
return;}


Animated.timing(this._animatedBufferLength,{
toValue:buffer*this._totalLength,
duration:this.props.bufferAniDuration||200}).
start();}},{key:'render',value:function render()


{
var progressTheme=this.theme.progressStyle;
var style={
backgroundColor:progressTheme.backgroundColor};

var bufferColor=this.props.bufferColor||progressTheme.bufferColor;
var progressColor=this.props.progressColor||progressTheme.progressColor;

return (
React.createElement(View,{
ref:'bg',
style:[Progress.defaultProps.style,style,this.props.style],
onLayout:this._onLayout.bind(this)},

React.createElement(Animated.View,{
ref:'bufferLayer',
style:{
position:'absolute',
backgroundColor:bufferColor,
width:this._animatedBufferLength,
height:this._height}}),


React.createElement(Animated.View,{
ref:'progressLayer',
style:{
position:'absolute',
backgroundColor:progressColor,
width:this._animatedLength,
height:this._height}})));}}]);return Progress;}(Component);







Object.defineProperty(Progress.prototype,'progress',{


set:function(progress){
if(progress>=0&&progress!==this._progress){
this._progress=progress;
this._aniUpdateProgress(progress);}},



get:function(){
return this._progress;},

enumerable:true});


Object.defineProperty(Progress.prototype,'buffer',{


set:function(buffer){
if(buffer>=0&&buffer!==this._buffer){
this._buffer=buffer;
this._aniUpdateBuffer(buffer);}},



get:function(){
return this._buffer;},

enumerable:true});



Progress.propTypes=babelHelpers.extends({},

View.propTypes,{


progress:PropTypes.number,


progressColor:PropTypes.string,


bufferColor:PropTypes.string,


progressAniDuration:PropTypes.number,


bufferAniDuration:PropTypes.number});



Progress.defaultProps={
style:{
height:4}};var 







IndeterminateProgress=function(_Component2){babelHelpers.inherits(IndeterminateProgress,_Component2);
function IndeterminateProgress(props){babelHelpers.classCallCheck(this,IndeterminateProgress);var _this2=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(IndeterminateProgress).call(this,
props));
_this2.theme=(0,_theme.getTheme)();
_this2._totalLength=0;
_this2._height=new Animated.Value(0);
_this2._animatedBlock1={
left:new Animated.Value(0),
right:new Animated.Value(0)};

_this2._animatedBlock2={
left:new Animated.Value(0),
right:new Animated.Value(0)};

_this2._aniUpdateProgress=_this2._aniUpdateProgress.bind(_this2);return _this2;}babelHelpers.createClass(IndeterminateProgress,[{key:'_onLayout',value:function _onLayout(_ref2)


{var _ref2$nativeEvent$lay=_ref2.nativeEvent.layout;var width=_ref2$nativeEvent$lay.width;var height=_ref2$nativeEvent$lay.height;
if(width>0&&this._totalLength!==width){
this._totalLength=width;
this._height.setValue(height);
this._aniUpdateProgress();}}},{key:'_aniUpdateProgress',value:function _aniUpdateProgress()



{var _this3=this;
if(!(this._totalLength>0)){
return;}


this._animatedBlock1.left.setValue(0);
this._animatedBlock1.right.setValue(this._totalLength);

Animated.sequence([
Animated.parallel([
Animated.timing(this._animatedBlock1.left,{
toValue:this._totalLength*0.25,
duration:this.props.progressAniDuration||1250}),

Animated.timing(this._animatedBlock1.right,{
toValue:0,
duration:this.props.progressAniDuration||1250})]),


Animated.parallel([
Animated.timing(this._animatedBlock1.left,{
toValue:this._totalLength,
duration:this.props.progressAniDuration||500,
easing:Easing.out(Easing.quad)}),

this._getBlock2Ani()])]).

start(function(_ref3){var finished=_ref3.finished;return finished&&setImmediate(_this3._aniUpdateProgress);});}},{key:'_getBlock2Ani',value:function _getBlock2Ani()


{
this._animatedBlock2.left.setValue(0);
this._animatedBlock2.right.setValue(this._totalLength);

return Animated.sequence([
Animated.timing(this._animatedBlock2.right,{
toValue:this._totalLength*0.75,
duration:this.props.progressAniDuration||500}),

Animated.parallel([
Animated.timing(this._animatedBlock2.left,{
toValue:this._totalLength,
duration:this.props.progressAniDuration||705,
easing:Easing.out(Easing.quad)}),

Animated.timing(this._animatedBlock2.right,{
toValue:0,
duration:this.props.progressAniDuration||700,
easing:Easing.out(Easing.quad)})])]);}},{key:'render',value:function render()





{
var progressTheme=this.theme.progressStyle;
var style={
backgroundColor:progressTheme.backgroundColor};

var progressColor=this.props.progressColor||progressTheme.progressColor;

return (
React.createElement(View,{
ref:'bg',
style:[Progress.defaultProps.style,style,this.props.style],
onLayout:this._onLayout.bind(this)},

React.createElement(Animated.View,{
style:{
backgroundColor:progressColor,
position:'absolute',
left:this._animatedBlock1.left,
right:this._animatedBlock1.right,
height:this._height}}),


React.createElement(Animated.View,{
style:{
backgroundColor:progressColor,
position:'absolute',
left:this._animatedBlock2.left,
right:this._animatedBlock2.right,
height:this._height}})));}}]);return IndeterminateProgress;}(Component);








IndeterminateProgress.propTypes=babelHelpers.extends({},

View.propTypes,{


progressColor:PropTypes.string});



IndeterminateProgress.defaultProps={
style:Progress.defaultProps.style};var _require=








require('react-native-material-kit/lib/builder.js');var Builder=_require.Builder;var 




ProgressBuilder=function(_Builder){babelHelpers.inherits(ProgressBuilder,_Builder);function ProgressBuilder(){babelHelpers.classCallCheck(this,ProgressBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ProgressBuilder).apply(this,arguments));}babelHelpers.createClass(ProgressBuilder,[{key:'withIndeterminate',value:function withIndeterminate(
isIndeterminate){
this.indeterminate=isIndeterminate;
return this;}},{key:'build',value:function build()


{
var BuiltProgress=this.indeterminate?function(_IndeterminateProgres){babelHelpers.inherits(_class,_IndeterminateProgres);function _class(){babelHelpers.classCallCheck(this,_class);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(_class).apply(this,arguments));}return _class;}(
IndeterminateProgress):function(_Progress){babelHelpers.inherits(_class2,_Progress);function _class2(){babelHelpers.classCallCheck(this,_class2);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(_class2).apply(this,arguments));}return _class2;}(Progress);
var defaults=(this.indeterminate?IndeterminateProgress:Progress).defaultProps;
BuiltProgress.defaultProps=babelHelpers.extends({},defaults,this.toProps());
return BuiltProgress;}}]);return ProgressBuilder;}(Builder);




ProgressBuilder.defineProps(Progress.propTypes);
ProgressBuilder.defineProps(IndeterminateProgress.propTypes);




function progress(){
return new ProgressBuilder().
withBackgroundColor((0,_theme.getTheme)().progressStyle.backgroundColor);}


function indeterminateProgress(){
return progress().withIndeterminate(true);}




module.exports=Progress;
Progress.Indeterminate=IndeterminateProgress;
Progress.Builder=ProgressBuilder;
Progress.progress=progress;
Progress.indeterminateProgress=indeterminateProgress;
});
__d('react-native-material-kit/lib/mdl/Spinner.android.js',function(global, require, module, exports) {  'use strict';










var React=require('react-native/Libraries/react-native/react-native.js');var 


Component=



React.Component;var View=React.View;var PropTypes=React.PropTypes;var requireNativeComponent=React.requireNativeComponent;

var MKColor=require('react-native-material-kit/lib/MKColor.js');var _require=
require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;
var utils=require('react-native-material-kit/lib/utils.js');


var PROP_TYPES=babelHelpers.extends({},

View.propTypes,{




strokeColor:PropTypes.any,


strokeWidth:PropTypes.number,


spinnerAniDuration:PropTypes.number,


scaleX:PropTypes.number,
scaleY:PropTypes.number,
translateX:PropTypes.number,
translateY:PropTypes.number,
rotation:PropTypes.number});


var NativeSpinner=requireNativeComponent('MKSpinner',{
name:'MKSpinner',
propTypes:babelHelpers.extends({},
PROP_TYPES,{
strokeColors:PropTypes.array})});var 







Spinner=function(_Component){babelHelpers.inherits(Spinner,_Component);
function Spinner(props){babelHelpers.classCallCheck(this,Spinner);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Spinner).call(this,
props));
_this.theme=getTheme();return _this;}babelHelpers.createClass(Spinner,[{key:'render',value:function render()


{
var strokeColors=utils.parseColor(this.props.strokeColor||this.theme.spinnerStyle.strokeColor);
var props=babelHelpers.extends({},this.props,{
strokeColors:Array.isArray(strokeColors)?strokeColors:[strokeColors]});


return (
React.createElement(NativeSpinner,babelHelpers.extends({},
props,{
style:[Spinner.defaultProps.style,props.style]})));}}]);return Spinner;}(Component);





Spinner.propTypes=PROP_TYPES;


Spinner.defaultProps={
strokeWidth:3,
spinnerAniDuration:1333,
style:{
width:28,
height:28}};var _require2=









require('react-native-material-kit/lib/builder.js');var Builder=_require2.Builder;var 




SpinnerBuilder=function(_Builder){babelHelpers.inherits(SpinnerBuilder,_Builder);function SpinnerBuilder(){babelHelpers.classCallCheck(this,SpinnerBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SpinnerBuilder).apply(this,arguments));}babelHelpers.createClass(SpinnerBuilder,[{key:'build',value:function build()
{
var BuiltSpinner=function(_Spinner){babelHelpers.inherits(BuiltSpinner,_Spinner);function BuiltSpinner(){babelHelpers.classCallCheck(this,BuiltSpinner);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BuiltSpinner).apply(this,arguments));}return BuiltSpinner;}(Spinner);
BuiltSpinner.defaultProps=babelHelpers.extends({},Spinner.defaultProps,this.toProps());
return BuiltSpinner;}}]);return SpinnerBuilder;}(Builder);




SpinnerBuilder.defineProps(Spinner.propTypes);





function spinner(){
return new SpinnerBuilder();}


function singleColorSpinner(){
return spinner().withStrokeColor(getTheme().primaryColor);}




module.exports=Spinner;
Spinner.Builder=SpinnerBuilder;
Spinner.spinner=spinner;
Spinner.singleColorSpinner=singleColorSpinner;
});
__d('react-native-material-kit/lib/mdl/Button.js',function(global, require, module, exports) {  'use strict';









var React=require('react-native/Libraries/react-native/react-native.js');
var MKColor=require('react-native-material-kit/lib/MKColor.js');
var Ripple=require('react-native-material-kit/lib/mdl/Ripple.js');
var utils=require('react-native-material-kit/lib/utils.js');var _require=
require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;var 


Component=


React.Component;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;var PropTypes=React.PropTypes;var 





Button=function(_Component){babelHelpers.inherits(Button,_Component);
function Button(props){babelHelpers.classCallCheck(this,Button);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Button).call(this,
props));
_this.theme=getTheme();
_this.state={
width:0,
height:0};return _this;}babelHelpers.createClass(Button,[{key:'_onLayout',value:function _onLayout(_ref)



{var _ref$nativeEvent$layo=_ref.nativeEvent.layout;var width=_ref$nativeEvent$layo.width;var height=_ref$nativeEvent$layo.height;
if(width!==this.state.width||height!==this.state.height){
this.setState({
width:width,
height:height});}}},{key:'_renderChildren',value:function _renderChildren()




{
return this.props.children;}},{key:'render',value:function render()


{
var touchableProps={};
if(this.props.enabled){
babelHelpers.extends(touchableProps,utils.extractTouchableProps(this));}



touchableProps.onLayout=this._onLayout.bind(this);

var fabStyle={},maskProps={};

if(this.props.fab){
maskProps.maskBorderRadiusInPercent=50;

if(this.state.width>0||this.state.height>0){
var size=Math.min(this.state.width,this.state.height);
if(!size||size<=0){
size=Math.max(this.state.width,this.state.height);}


fabStyle.width=size;
fabStyle.height=size;
fabStyle.borderRadius=size/2;}}



return (
React.createElement(TouchableWithoutFeedback,touchableProps,
React.createElement(Ripple,babelHelpers.extends({ref:'container'},
this.props,
maskProps,{
style:[
this.props.style,
fabStyle]}),


this._renderChildren())));}}]);return Button;}(Component);







Button.propTypes=babelHelpers.extends({},

Ripple.propTypes,


TouchableWithoutFeedback.propTypes,{


fab:PropTypes.bool,


enabled:PropTypes.bool});



Button.defaultProps=babelHelpers.extends({},

Ripple.defaultProps,{
pointerEvents:'box-only',
enabled:true});var _require2=







require('react-native-material-kit/lib/builder.js');var TextViewBuilder=_require2.TextViewBuilder;var 





ButtonBuilder=function(_TextViewBuilder){babelHelpers.inherits(ButtonBuilder,_TextViewBuilder);function ButtonBuilder(){babelHelpers.classCallCheck(this,ButtonBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ButtonBuilder).apply(this,arguments));}babelHelpers.createClass(ButtonBuilder,[{key:'mergeStyle',value:function mergeStyle()
{
this.choseBackgroundColor();
if(this.fab){
this.styleFab();}

babelHelpers.get(Object.getPrototypeOf(ButtonBuilder.prototype),'mergeStyle',this).call(this);}},{key:'styleFab',value:function styleFab()



{
this.mergeStyleWith({
width:48,
height:48,
borderRadius:24});}},{key:'build',value:function build()



{
var theBuilder=this;
var props=this.toProps();

var BuiltButton=function(_Button){babelHelpers.inherits(BuiltButton,_Button);function BuiltButton(){babelHelpers.classCallCheck(this,BuiltButton);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BuiltButton).apply(this,arguments));}babelHelpers.createClass(BuiltButton,[{key:'_renderChildren',value:function _renderChildren()
{

return theBuilder.text?
React.createElement(React.Text,{style:theBuilder.textStyle||{}},
theBuilder.text):

this.props.children;}}]);return BuiltButton;}(Button);


BuiltButton.defaultProps=babelHelpers.extends({},Button.defaultProps,props);
return BuiltButton;}}]);return ButtonBuilder;}(TextViewBuilder);




ButtonBuilder.defineProps(Button.propTypes);









function coloredRaisedButton(){
return new ButtonBuilder().
withStyle({
borderRadius:2,
shadowRadius:1,
shadowOffset:{width:0,height:.5},
shadowOpacity:.7,
shadowColor:'black',
elevation:4}).

withTextStyle({
color:'white',
fontWeight:'bold'});}





function accentColoredRaisedButton(){
return coloredRaisedButton().withAccent(true);}



function plainRaisedButton(){

return coloredRaisedButton().

withBackgroundColor(MKColor.Silver).
withMaskColor(getTheme().bgPlain).
withRippleColor(getTheme().bgPlain).



withTextStyle({
color:'black',
fontWeight:'bold'});}




function flatButton(){
return new ButtonBuilder().
withBackgroundColor(MKColor.Transparent).
withMaskColor(getTheme().bgPlain).
withRippleColor(getTheme().bgPlain).
withShadowAniEnabled(false).
withStyle({
borderRadius:2}).

withTextStyle({
color:'black',
fontWeight:'bold'});}




function coloredFlatButton(){
return flatButton().
withRippleColor('rgba(255,255,255,0.2)').
withTextStyle({
color:getTheme().primaryColor,
fontWeight:'bold'});}




function accentColoredFlatButton(){
return flatButton().
withRippleColor('rgba(255,255,255,0.2)').
withTextStyle({
color:getTheme().accentColor,
fontWeight:'bold'});}




function coloredFab(){
return new ButtonBuilder().
withStyle({
shadowRadius:1,
shadowOffset:{width:0,height:.5},
shadowOpacity:.4,
shadowColor:'black',
elevation:4}).

withFab(true).
withRippleLocation('center');}



function accentColoredFab(){
return coloredFab().withAccent(true);}



function plainFab(){

return coloredFab().
withMaskColor(getTheme().bgPlain).
withRippleColor(getTheme().bgPlain).
withBackgroundColor(MKColor.Silver);}




module.exports=Button;

Button.Builder=ButtonBuilder;
Button.button=plainRaisedButton;
Button.coloredButton=coloredRaisedButton;
Button.accentColoredButton=accentColoredRaisedButton;
Button.flatButton=flatButton;
Button.coloredFlatButton=coloredFlatButton;
Button.accentColoredFlatButton=accentColoredFlatButton;
Button.plainFab=plainFab;
Button.coloredFab=coloredFab;
Button.accentColoredFab=accentColoredFab;
});
__d('react-native-material-kit/lib/mdl/RadioButton.js',function(global, require, module, exports) {  'use strict';









var React=require('react-native/Libraries/react-native/react-native.js');var 


Component=




React.Component;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;var View=React.View;var Animated=React.Animated;var PropTypes=React.PropTypes;

var MKColor=require('react-native-material-kit/lib/MKColor.js');
var Ripple=require('react-native-material-kit/lib/mdl/Ripple.js');
var utils=require('react-native-material-kit/lib/utils.js');var _require=
require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;

var DEFAULT_EXTRA_RIPPLE_RADII=16;var 




RadioButton=function(_Component){babelHelpers.inherits(RadioButton,_Component);
function RadioButton(props){babelHelpers.classCallCheck(this,RadioButton);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(RadioButton).call(this,
props));
_this.theme=getTheme();
_this._animatedSize=new Animated.Value(0);
_this._animatedRadius=new Animated.Value(0);
_this._group=null;
_this.state={
checked:false,
width:0,
height:0};return _this;}babelHelpers.createClass(RadioButton,[{key:'componentWillMount',value:function componentWillMount()



{
this.group=this.props.group;
this._initView(this.props.checked);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this.group=nextProps.group;
if(nextProps.checked!==this.props.checked){
this._initView(nextProps.checked);}}},{key:'_initView',value:function _initView(



checked){
this.setState({checked:checked});
this._aniChecked(checked);}},{key:'_onLayout',value:function _onLayout(_ref)


{var _ref$nativeEvent$layo=_ref.nativeEvent.layout;var width=_ref$nativeEvent$layo.width;var height=_ref$nativeEvent$layo.height;
if(width===this.state.width&&height===this.state.height){
return;}


var padding=this.props.extraRippleRadius||DEFAULT_EXTRA_RIPPLE_RADII;
this.setState({
width:width+padding,
height:height+padding});}},{key:'_onTouch',value:function _onTouch(




evt){
switch(evt.type){
case 'TOUCH_UP':
if(!this.state.checked){
this.confirmToggle();}

break;}}},{key:'confirmToggle',value:function confirmToggle()




{var _this2=this;
var prevState=this.state.checked;
var newState=!prevState;

this.setState({checked:newState},function(){
_this2._emitCheckedChange(newState);});



if(this.group){
this.group.onChecked(this,newState);}


this._aniChecked(newState);}},{key:'confirmUncheck',value:function confirmUncheck()


{var _this3=this;
this.setState({checked:false},function(){
_this3._emitCheckedChange(false);});


this._aniChecked(false);}},{key:'_emitCheckedChange',value:function _emitCheckedChange(


checked){
if(this.props.onCheckedChange){
this.props.onCheckedChange({checked:checked});}}},{key:'_aniChecked',value:function _aniChecked(




checked){
Animated.parallel([
Animated.timing(this._animatedRadius,{
toValue:checked?5:0,
duration:220}),

Animated.timing(this._animatedSize,{
toValue:checked?10:0,
duration:220})]).

start();}},{key:'render',value:function render()


{
var defaultStyle=this.theme.radioStyle;
var mergedStyle=babelHelpers.extends({},defaultStyle,utils.extractProps(this,[
'borderOnColor',
'borderOffColor',
'fillColor',
'rippleColor']));

var borderColor=this.state.checked?mergedStyle.borderOnColor:mergedStyle.borderOffColor;

return (
React.createElement(TouchableWithoutFeedback,utils.extractTouchableProps(this),
React.createElement(Ripple,babelHelpers.extends({},
this.props,{
maskBorderRadiusInPercent:50,
rippleLocation:'center',
rippleColor:mergedStyle.rippleColor,
onTouch:this._onTouch.bind(this),
style:{
justifyContent:'center',
alignItems:'center',
width:this.state.width,
height:this.state.height}}),


React.createElement(View,{ref:'outerCircle',
style:[
RadioButton.defaultProps.style,
{borderColor:borderColor},
this.props.style],

onLayout:this._onLayout.bind(this)},

React.createElement(Animated.View,{
ref:'innerCircle',
style:{
backgroundColor:mergedStyle.fillColor,
width:this._animatedSize,
height:this._animatedSize,
borderRadius:this._animatedRadius}})))));}}]);return RadioButton;}(Component);









Object.defineProperty(RadioButton.prototype,'group',{

set:function(group){
this._group=group;
if(group){
group.add(this);}},



get:function(){
return this._group;},

enumerable:true});



RadioButton.propTypes=babelHelpers.extends({},

Ripple.propTypes,


TouchableWithoutFeedback.propTypes,{


borderOnColor:PropTypes.string,


borderOffColor:PropTypes.string,


fillColor:PropTypes.string,


checked:PropTypes.bool,


group:PropTypes.object,


onCheckedChange:PropTypes.func,



extraRippleRadius:PropTypes.number});



RadioButton.defaultProps={
pointerEvents:'box-only',
maskColor:MKColor.Transparent,
style:{
justifyContent:'center',
alignItems:'center',
width:20,
height:20,
borderWidth:2,
borderRadius:10}};var 







Group=function(){
function Group(){babelHelpers.classCallCheck(this,Group);
this.buttons=[];}babelHelpers.createClass(Group,[{key:'add',value:function add(


btn){
if(this.buttons.indexOf(btn)<0){
this.buttons.push(btn);}}},{key:'onChecked',value:function onChecked(



btn,checked){
if(checked){
this.buttons.forEach(function(it){return it!==btn&&it.confirmUncheck();});}}}]);return Group;}();var _require2=










require('react-native-material-kit/lib/builder.js');var Builder=_require2.Builder;var 




RadioButtonBuilder=function(_Builder){babelHelpers.inherits(RadioButtonBuilder,_Builder);function RadioButtonBuilder(){babelHelpers.classCallCheck(this,RadioButtonBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(RadioButtonBuilder).apply(this,arguments));}babelHelpers.createClass(RadioButtonBuilder,[{key:'build',value:function build()
{
var BuiltRadioButton=function(_RadioButton){babelHelpers.inherits(BuiltRadioButton,_RadioButton);function BuiltRadioButton(){babelHelpers.classCallCheck(this,BuiltRadioButton);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BuiltRadioButton).apply(this,arguments));}return BuiltRadioButton;}(RadioButton);
BuiltRadioButton.defaultProps=babelHelpers.extends({},RadioButton.defaultProps,this.toProps());
return BuiltRadioButton;}}]);return RadioButtonBuilder;}(Builder);




RadioButtonBuilder.defineProps(RadioButton.propTypes);




function builder(){
return new RadioButtonBuilder();}




module.exports=RadioButton;
RadioButton.Group=Group;
RadioButton.builder=builder;
RadioButton.Builder=RadioButtonBuilder;
});
__d('react-native-material-kit/lib/mdl/Textfield.js',function(global, require, module, exports) {  'use strict';
























var _ramda=require('ramda/dist/ramda.js');var React=require('react-native/Libraries/react-native/react-native.js');var Component=React.Component;var View=React.View;var TextInput=React.TextInput;var PropTypes=React.PropTypes;var Animated=React.Animated;var MKPropTypes=require('react-native-material-kit/lib/MKPropTypes.js');var MKColor=require('react-native-material-kit/lib/MKColor.js');var utils=require('react-native-material-kit/lib/utils.js');var _require=require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;var 







FloatingLabel=function(_Component){babelHelpers.inherits(FloatingLabel,_Component);
function FloatingLabel(props){babelHelpers.classCallCheck(this,FloatingLabel);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(FloatingLabel).call(this,
props));
_this.labelDim={};
_this.labelState={
opacity:new Animated.Value(0),
top:new Animated.Value(0)};

_this.state={
text:''};return _this;}babelHelpers.createClass(FloatingLabel,[{key:'componentWillMount',value:function componentWillMount()



{
this.updateText(this.props.text);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this.updateText(nextProps.text);}},{key:'updateText',value:function updateText(


text){
this.setState({text:text});}},{key:'measure',value:function measure(


cb){
if(this.refs.label){
return this.refs.label.refs.node.measure(cb);}}},{key:'_onLabelLayout',value:function _onLabelLayout(_ref)



{var _ref$nativeEvent$layo=_ref.nativeEvent.layout;var width=_ref$nativeEvent$layo.width;var height=_ref$nativeEvent$layo.height;
if(width!==this.labelDim.width||height!==this.labelDim.height){
this.labelDim={width:width,height:height};}}},{key:'setColor',value:function setColor(



color){

this.refs.label.setNativeProps({style:{color:utils.parseColor(color)}});}},{key:'aniFloatLabel',value:function aniFloatLabel()


{
if(!this.props.floatingLabelEnabled){
return [];}


this.setColor(this.props.highlightColor);
return [Animated.sequence([
Animated.timing(this.labelState.opacity,{
toValue:1,
duration:this.props.opacityAniDur}),

Animated.timing(this.labelState.top,{
toValue:0,
duration:this.props.floatingLabelAniDuration})])];}},{key:'aniSinkLabel',value:function aniSinkLabel()




{
if(!this.props.floatingLabelEnabled){
return [];}


this.setColor(this.props.tintColor);
return [Animated.sequence([
Animated.timing(this.labelState.top,{
toValue:this.labelDim.height+5,
duration:this.props.floatingLabelAniDuration}),

Animated.timing(this.labelState.opacity,{
toValue:0,
duration:this.props.opacityAniDur})])];}},{key:'render',value:function render()




{
return (
React.createElement(Animated.Text,{
ref:'label',
pointerEvents:'none',
style:[{
backgroundColor:MKColor.Transparent,
position:'absolute',
top:this.labelState.top,
opacity:this.labelState.opacity,
marginBottom:this.props.floatingLabelBottomMargin},

this.props.floatingLabelFont],

onLayout:this._onLabelLayout.bind(this)},

this.state.text));}}]);return FloatingLabel;}(Component);






FloatingLabel.publicPropTypes={

floatingLabelEnabled:PropTypes.bool,


floatingLabelAniDuration:PropTypes.number,


floatingLabelBottomMargin:PropTypes.number,



floatingLabelFont:MKPropTypes.font};


FloatingLabel.propTypes=babelHelpers.extends({},
FloatingLabel.publicPropTypes,{


tintColor:PropTypes.string,
highlightColor:PropTypes.string,
opacityAniDur:PropTypes.number});


FloatingLabel.defaultProps={
floatingLabelAniDuration:200,
opacityAniDur:30};var 







Underline=function(_Component2){babelHelpers.inherits(Underline,_Component2);
function Underline(props){babelHelpers.classCallCheck(this,Underline);var _this2=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Underline).call(this,
props));
_this2.animatedLeft=new Animated.Value(0);
_this2.animatedLineLength=new Animated.Value(0);
_this2.state={
lineLength:0};return _this2;}babelHelpers.createClass(Underline,[{key:'updateLineLength',value:function updateLineLength(




lineLength,cb){
this.setState({lineLength:lineLength},cb);}},{key:'aniStretchUnderline',value:function aniStretchUnderline(



focused){
if(!(this.props.underlineEnabled&&focused)){
return [];}


this.animatedLeft.setValue(this.state.lineLength/2);
return [
Animated.timing(this.animatedLeft,{
toValue:0,
duration:this.props.underlineAniDur}),

Animated.timing(this.animatedLineLength,{
toValue:this.state.lineLength,
duration:this.props.underlineAniDur})];}},{key:'aniShrinkUnderline',value:function aniShrinkUnderline()





{
if(!this.props.underlineEnabled){
return [];}


return [
Animated.timing(this.animatedLeft,{
toValue:this.state.lineLength/2,
duration:this.props.underlineAniDur}),

Animated.timing(this.animatedLineLength,{
toValue:0,
duration:this.props.underlineAniDur})];}},{key:'render',value:function render()




{var _this3=this;
return (
React.createElement(View,{pointerEvents:'none',
style:{

height:this.props.underlineSize}},


React.createElement(View,{
style:{
position:'absolute',
backgroundColor:this.props.tintColor,
height:this.props.underlineSize,
width:this.state.lineLength}}),


function(){

if(_this3.props.underlineEnabled){
return (
React.createElement(Animated.View,{
style:{
position:'absolute',
backgroundColor:_this3.props.highlightColor,
height:_this3.props.underlineSize,
left:_this3.animatedLeft,
width:_this3.animatedLineLength}}));}}()));}}]);return Underline;}(Component);










Underline.propTypes={

underlineEnabled:PropTypes.bool,
tintColor:PropTypes.string,
highlightColor:PropTypes.string,
underlineSize:PropTypes.number,
underlineAniDur:PropTypes.number};


Underline.defaultProps={
underlineEnabled:true,
underlineAniDur:FloatingLabel.defaultProps.floatingLabelAniDuration,
underlineSize:1};var 









Textfield=function(_Component3){babelHelpers.inherits(Textfield,_Component3);
function Textfield(props){babelHelpers.classCallCheck(this,Textfield);var _this4=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Textfield).call(this,
props));
_this4.theme=getTheme();
_this4.inputFrame={};
_this4.state={
inputMarginTop:0};return _this4;}babelHelpers.createClass(Textfield,[{key:'focus',value:function focus()














{
this.refs.input.focus();}},{key:'isFocused',value:function isFocused()


{
return this.refs.input.isFocused();}},{key:'componentWillMount',value:function componentWillMount()


{
this.bufferedValue=this.props.value||this.props.text||
this.props.defaultValue;
this._originPlaceholder=this.props.placeholder;}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
var newText=nextProps.value||nextProps.text||nextProps.defaultValue;
if(newText){
this.bufferedValue=newText;}

this._originPlaceholder=nextProps.placeholder;}},{key:'componentDidMount',value:function componentDidMount()


{
requestAnimationFrame(this._doMeasurement.bind(this));}},{key:'_doMeasurement',value:function _doMeasurement()


{
if(this.refs.input){
this.refs.input.measure(this._onInputMeasured.bind(this));
if(this.props.floatingLabelEnabled){
this.refs.floatingLabel.measure(this._onLabelMeasured.bind(this));}}}},{key:'_onLabelMeasured',value:function _onLabelMeasured(




left,top,width,height){
this.setState({inputMarginTop:height});}},{key:'_onInputMeasured',value:function _onInputMeasured(


left,top,width,height){var _this5=this;
babelHelpers.extends(this.inputFrame,{left:left,top:top,width:width,height:height});
this.refs.underline.updateLineLength(width,function(){
if(_this5.bufferedValue||_this5.isFocused()){
_this5._aniStartHighlight(_this5.isFocused());}});}},{key:'_aniFloatLabel',value:function _aniFloatLabel()




{
if(!(this.bufferedValue&&this.props.floatingLabelEnabled)){
return;}


if(this.refs.floatingLabel){
var animations=this.refs.floatingLabel.aniFloatLabel();
if(animations.length){
Animated.parallel(animations).start();}}}},{key:'_aniStartHighlight',value:function _aniStartHighlight(





focused){
if(this.props.floatingLabelEnabled){

this.setPlaceholder('');



this.refs.floatingLabel.updateText(this._originPlaceholder);}



var animations=this.refs.underline.aniStretchUnderline(focused);


if(this.props.floatingLabelEnabled){
animations.push.apply(animations,babelHelpers.toConsumableArray(this.refs.floatingLabel.aniFloatLabel()));}


if(animations.length){
Animated.parallel(animations).start();}}},{key:'_aniStopHighlight',value:function _aniStopHighlight()




{var _this6=this;

var animations=this.refs.underline.aniShrinkUnderline();


if(this.props.floatingLabelEnabled&&!this.bufferedValue){

animations.push.apply(animations,babelHelpers.toConsumableArray(this.refs.floatingLabel.aniSinkLabel()));}


if(animations.length){
Animated.parallel(animations).start(function(){
if(_this6.props.floatingLabelEnabled){

_this6.setPlaceholder(_this6._originPlaceholder);



if(!_this6.bufferedValue){
_this6.refs.floatingLabel.updateText('');}}});}}},{key:'setPlaceholder',value:function setPlaceholder(






placeholder){
this.refs.input.setNativeProps({placeholder:placeholder});}},{key:'_onTextChange',value:function _onTextChange(


text){
this.bufferedValue=text;
this._callback('onTextChange',text);
this._callback('onChangeText',text);}},{key:'_onFocus',value:function _onFocus(


e){
this._aniStartHighlight(true);
this._callback('onFocus',e);}},{key:'_onBlur',value:function _onBlur(


e){
this._aniStopHighlight();
this._callback('onBlur',e);}},{key:'_callback',value:function _callback(


name,e){
if(this.props[name]){
this.props[name](e);}}},{key:'render',value:function render()



{
var tfTheme=this.theme.textfieldStyle;
var floatingLabel=void 0;
if(this.props.floatingLabelEnabled){

var props=babelHelpers.extends(
(0,_ramda.pick)(['tintColor','highlightColor','floatingLabelFont'],tfTheme),
utils.extractProps(this,FloatingLabel.propTypes));

floatingLabel=
React.createElement(FloatingLabel,babelHelpers.extends({ref:'floatingLabel'},
props,{
text:this.props.placeholder}));}




var underlineProps=babelHelpers.extends(
(0,_ramda.pick)(['tintColor','highlightColor'],tfTheme),
utils.extractProps(this,['tintColor',
'highlightColor','underlineSize','underlineEnabled']));
var inputProps=utils.extractProps(this,babelHelpers.extends({},
TextInput.propTypes,{
password:1}));


return (
React.createElement(View,{style:this.props.style},
React.createElement(TextInput,babelHelpers.extends({
ref:'input'},
inputProps,{
style:[{
backgroundColor:MKColor.Transparent,
flex:1,
alignSelf:'stretch',
paddingTop:2,paddingBottom:2,
marginTop:this.state.inputMarginTop},

this.theme.textfieldStyle.textInputStyle,
this.props.textInputStyle],

onChangeText:this._onTextChange.bind(this),
onFocus:this._onFocus.bind(this),
onBlur:this._onBlur.bind(this)})),

floatingLabel,
React.createElement(Underline,babelHelpers.extends({ref:'underline'},
underlineProps,{
underlineAniDur:this.props.floatingLabelAniDuration}))));}},{key:'bufferedValue',set:function(v){this._bufferedValue=v;if(v){this._aniFloatLabel();}},get:function(){return (this._bufferedValue||'').trim();}}]);return Textfield;}(Component);







Textfield.propTypes=babelHelpers.extends({},

TextInput.propTypes,{


text:PropTypes.string,


onTextChange:PropTypes.func,


password:PropTypes.bool},


FloatingLabel.publicPropTypes,{


underlineEnabled:PropTypes.bool,


underlineSize:PropTypes.number,


highlightColor:PropTypes.string,




tintColor:PropTypes.string,


textInputStyle:PropTypes.any});



Textfield.defaultProps={





style:{
height:39},







underlineEnabled:true};var _require2=








require('react-native-material-kit/lib/builder.js');var Builder=_require2.Builder;var 




TextfieldBuilder=function(_Builder){babelHelpers.inherits(TextfieldBuilder,_Builder);
function TextfieldBuilder(){babelHelpers.classCallCheck(this,TextfieldBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TextfieldBuilder).call(this));}babelHelpers.createClass(TextfieldBuilder,[{key:'withDefaultValue',value:function withDefaultValue(







defaultValue){
var propName=Textfield.propTypes.defaultValue?'defaultValue':'value';
this[propName]=defaultValue;
return this;}},{key:'mergeStyle',value:function mergeStyle()


{
babelHelpers.get(Object.getPrototypeOf(TextfieldBuilder.prototype),'mergeStyle',this).call(this);

if(!this.highlightColor){
this.highlightColor=this.getThemeColor();}}},{key:'build',value:function build()



{
var BuiltTextfield=function(_Textfield){babelHelpers.inherits(BuiltTextfield,_Textfield);function BuiltTextfield(){babelHelpers.classCallCheck(this,BuiltTextfield);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BuiltTextfield).apply(this,arguments));}return BuiltTextfield;}(Textfield);
BuiltTextfield.defaultProps=babelHelpers.extends({},Textfield.defaultProps,this.toProps());
return BuiltTextfield;}}]);return TextfieldBuilder;}(Builder);




TextfieldBuilder.defineProps(Textfield.propTypes);





function textfield(){
return new TextfieldBuilder();}


function textfieldWithFloatingLabel(){
return textfield().withFloatingLabelEnabled(true);}




module.exports=Textfield;

Textfield.Builder=TextfieldBuilder;
Textfield.textfield=textfield;
Textfield.textfieldWithFloatingLabel=textfieldWithFloatingLabel;
});
__d('react-native-material-kit/lib/mdl/Slider.js',function(global, require, module, exports) {  'use strict';










var React=require('react-native/Libraries/react-native/react-native.js');
var MKColor=require('react-native-material-kit/lib/MKColor.js');var _require=
require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;
var Thumb=require('react-native-material-kit/lib/internal/Thumb.js');var 


Component=




React.Component;var Animated=React.Animated;var View=React.View;var PanResponder=React.PanResponder;var PropTypes=React.PropTypes;



var THUMB_SCALE_RATIO=1.3;


var THUMB_BORDER_WIDTH=2;


var TRACK_EXTRA_MARGIN_V=5;
var TRACK_EXTRA_MARGIN_H=5;var 



Slider=function(_Component){babelHelpers.inherits(Slider,_Component);
function Slider(props){babelHelpers.classCallCheck(this,Slider);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Slider).call(this,
props));
_this.theme=getTheme();
_this._value=0;
_this._trackTotalLength=0;
_this._prevPointerX=0;
_this._animatedTrackLength=new Animated.Value(0);
_this._panResponder=PanResponder.create({
onStartShouldSetPanResponder:function(){return true;},
onStartShouldSetPanResponderCapture:function(){return true;},
onMoveShouldSetPanResponder:function(){return true;},
onMoveShouldSetPanResponderCapture:function(){return true;},
onPanResponderGrant:function(evt){
_this._prevPointerX=evt.nativeEvent.locationX;
_this._onTouchEvent({
type:'TOUCH_DOWN',
x:_this._prevPointerX});},


onPanResponderMove:function(evt,gestureState){
_this._onTouchEvent({
type:'TOUCH_MOVE',
x:_this._prevPointerX+gestureState.dx});},


onPanResponderTerminationRequest:function(){return true;},
onPanResponderRelease:function(evt,gestureState){
_this._onPanResponderEnd(gestureState);},

onPanResponderTerminate:function(evt,gestureState){
_this._onPanResponderEnd(gestureState,true);},

onShouldBlockNativeResponder:function(){return true;}});return _this;}babelHelpers.createClass(Slider,[{key:'componentWillMount',value:function componentWillMount()



{
this._onThumbRadiiUpdate(this.props);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this._onThumbRadiiUpdate(nextProps);}},{key:'_onTrackLayout',value:function _onTrackLayout(_ref)


{var width=_ref.nativeEvent.layout.width;
if(this._trackTotalLength!==width){
this._trackTotalLength=width;
this._aniUpdateValue(this.value);}}},{key:'_internalSetValue',value:function _internalSetValue(



value){var fireChange=arguments.length<=1||arguments[1]===undefined?true:arguments[1];
this._value=value;
if(fireChange){
this._emitChange(value);}}},{key:'_emitChange',value:function _emitChange(



newValue){
if(this.props.onChange){
this.props.onChange(newValue);}}},{key:'_aniUpdateValue',value:function _aniUpdateValue(



value){
if(!this._trackTotalLength){
return;}


var ratio=(value-this.props.min)/(this.props.max-this.props.min);
var x=ratio*this._trackTotalLength;
this._moveThumb(x);
this._confirmMoveThumb(x);}},{key:'_onPanResponderEnd',value:function _onPanResponderEnd(


gestureState,cancelled){
if(!cancelled){
this._prevPointerX=this._prevPointerX+gestureState.dx;}


this._onTouchEvent({
type:cancelled?'TOUCH_CANCEL':'TOUCH_UP',
x:this._prevPointerX});}},{key:'_onTouchEvent',value:function _onTouchEvent(




evt){
switch(evt.type){
case 'TOUCH_DOWN':
case 'TOUCH_MOVE':
this._updateValueByTouch(evt);
break;
case 'TOUCH_UP':
this._confirmUpdateValueByTouch(evt);
break;
case 'TOUCH_CANCEL':

this._confirmUpdateValueByTouch();
break;}}},{key:'_getTouchOnTrack',value:function _getTouchOnTrack(




evt){

var x=Math.max(evt.x-this._trackMarginH,0);
x=Math.min(x,this._trackTotalLength);

var ratio=x/this._trackTotalLength;

return {x:x,ratio:ratio};}},{key:'_updateValueByTouch',value:function _updateValueByTouch(


evt){var _getTouchOnTrack2=
this._getTouchOnTrack(evt);var x=_getTouchOnTrack2.x;var ratio=_getTouchOnTrack2.ratio;
var _value=ratio*(this.props.max-this.props.min)+this.props.min;
this._internalSetValue(_value);
this._moveThumb(x);}},{key:'_confirmUpdateValueByTouch',value:function _confirmUpdateValueByTouch(


evt){
if(evt){var _getTouchOnTrack3=
this._getTouchOnTrack(evt);var x=_getTouchOnTrack3.x;
this._confirmMoveThumb(x);}else 
{
this._confirmMoveThumb();}}},{key:'_moveThumb',value:function _moveThumb(



x){
this.refs.thumb.moveTo(x);

Animated.timing(this._animatedTrackLength,{
toValue:x,
duration:0}).
start();}},{key:'_confirmMoveThumb',value:function _confirmMoveThumb(


x){
this.refs.thumb.confirmMoveTo(x);}},{key:'_onThumbRadiiUpdate',value:function _onThumbRadiiUpdate(



props){
this._thumbRadii=props.thumbRadius;
this._thumbRadiiWithBorder=this._thumbRadii+THUMB_BORDER_WIDTH;
this._trackMarginV=this._thumbRadiiWithBorder*THUMB_SCALE_RATIO+
TRACK_EXTRA_MARGIN_V-this.props.trackSize/2;
this._trackMarginH=this._thumbRadiiWithBorder*THUMB_SCALE_RATIO+
TRACK_EXTRA_MARGIN_H;}},{key:'render',value:function render()


{


var trackMargin={
marginLeft:this._trackMarginH,
marginRight:this._trackMarginH,
marginTop:this._trackMarginV,
marginBottom:this._trackMarginV};


var sliderStyle=this.theme.sliderStyle;
var lowerTrackColor=this.props.lowerTrackColor||sliderStyle.lowerTrackColor;
var upperTrackColor=this.props.upperTrackColor||sliderStyle.upperTrackColor;

return (
React.createElement(View,babelHelpers.extends({ref:'container',
style:[this.props.style,{
padding:0,
paddingTop:0,
paddingBottom:0,
paddingLeft:0,
paddingRight:0}],

pointerEvents:'box-only'},
this._panResponder.panHandlers),

React.createElement(View,{ref:'track',
style:babelHelpers.extends({
height:this.props.trackSize,
backgroundColor:upperTrackColor},
trackMargin),

onLayout:this._onTrackLayout.bind(this)},

React.createElement(Animated.View,{
ref:'lowerTrack',
style:{
position:'absolute',
width:this._animatedTrackLength,
height:this.props.trackSize,
backgroundColor:lowerTrackColor}})),



React.createElement(Thumb,{
ref:'thumb',
radius:this.props.thumbRadius,
trackSize:this.props.trackSize,
trackMarginH:this._trackMarginH,
enabledColor:lowerTrackColor,
disabledColor:upperTrackColor,
style:{
top:this._thumbRadiiWithBorder*(THUMB_SCALE_RATIO-1)+TRACK_EXTRA_MARGIN_V}})));}}]);return Slider;}(Component);








Object.defineProperty(Slider.prototype,'value',{
set:function(value){
this._internalSetValue(value);
this._aniUpdateValue(value);},

get:function(){
return this._value;},

enumerable:true});



Slider.propTypes=babelHelpers.extends({},

View.propTypes,{


min:PropTypes.number,


max:PropTypes.number,


trackSize:PropTypes.number,


thumbRadius:PropTypes.number,


lowerTrackColor:PropTypes.string,


upperTrackColor:PropTypes.string,


onChange:PropTypes.func});



Slider.defaultProps={
thumbRadius:6,
trackSize:2,
min:0,
max:100};var _require2=








require('react-native-material-kit/lib/builder.js');var Builder=_require2.Builder;var 




SliderBuilder=function(_Builder){babelHelpers.inherits(SliderBuilder,_Builder);function SliderBuilder(){babelHelpers.classCallCheck(this,SliderBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SliderBuilder).apply(this,arguments));}babelHelpers.createClass(SliderBuilder,[{key:'build',value:function build()
{
var BuiltSlider=function(_Slider){babelHelpers.inherits(BuiltSlider,_Slider);function BuiltSlider(){babelHelpers.classCallCheck(this,BuiltSlider);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BuiltSlider).apply(this,arguments));}return BuiltSlider;}(Slider);
BuiltSlider.defaultProps=babelHelpers.extends({},Slider.defaultProps,this.toProps());
return BuiltSlider;}}]);return SliderBuilder;}(Builder);




SliderBuilder.defineProps(Slider.propTypes);




function slider(){
return new SliderBuilder();}




module.exports=Slider;
Slider.Builder=SliderBuilder;
Slider.slider=slider;
});
__d('react-native-material-kit/lib/mdl/RangeSlider.js',function(global, require, module, exports) {  'use strict';









var React=require('react-native/Libraries/react-native/react-native.js');
var MKColor=require('react-native-material-kit/lib/MKColor.js');var _require=
require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;
var Thumb=require('react-native-material-kit/lib/internal/Thumb.js');var 


Component=



React.Component;var Animated=React.Animated;var View=React.View;var PropTypes=React.PropTypes;



var THUMB_SCALE_RATIO=1.3;


var THUMB_BORDER_WIDTH=2;


var TRACK_EXTRA_MARGIN_V=5;
var TRACK_EXTRA_MARGIN_H=5;var 


RangeSlider=function(_Component){babelHelpers.inherits(RangeSlider,_Component);
function RangeSlider(props){babelHelpers.classCallCheck(this,RangeSlider);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(RangeSlider).call(this,
props));
_this.theme=getTheme();
_this._range={
min:0,
max:0};


_this._overriddenThumb=undefined;
_this._trackTotalLength=0;
_this._lowerTrackLength=new Animated.Value(_this._range.max-_this._range.min);
_this._lowerTrackMin=new Animated.Value(_this._range.min);return _this;}babelHelpers.createClass(RangeSlider,[{key:'componentWillMount',value:function componentWillMount()


{
this._onThumbRadiiUpdate(this.props);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this._onThumbRadiiUpdate(nextProps);}},{key:'_onTrackLayout',value:function _onTrackLayout(_ref)


{var width=_ref.nativeEvent.layout.width;
if(this._trackTotalLength!==width){
this._trackTotalLength=width;
this._setRange({min:this.props.minValue,max:this.props.maxValue});
this._updateValue(this._range);}}},{key:'_setRange',value:function _setRange(




range){
var min2Scale=this._toPixelScale(range.min);
var max2Scale=this._toPixelScale(range.max);

var minBounds=this._toPixelScale(this.props.min);
var maxBounds=this._toPixelScale(this.props.max);

if(min2Scale>max2Scale){
var msg='Minimum slider value: '+range.min+
' is greater than max value: '+range.max;
throw msg;}

if(min2Scale<minBounds||min2Scale>maxBounds){
var _msg='Minimum slider value: '+range.min+
' exceeds bounds: '+this.props.min+'-'+this.props.max;
throw _msg;}

if(max2Scale<minBounds||max2Scale>maxBounds){
var _msg2='Maximum slider value: '+range.max+
' exceeds bounds: '+this.props.min+'-'+this.props.max;
throw _msg2;}


this._range={
min:min2Scale?min2Scale:0,
max:max2Scale?max2Scale:0};


return this._range;}},{key:'_toSliderScale',value:function _toSliderScale(



value){
var trackToRange=(this.props.max-this.props.min)/this._trackTotalLength;
return value*trackToRange+this.props.min;}},{key:'_toPixelScale',value:function _toPixelScale(



value){
var rangeToTrack=this._trackTotalLength/(this.props.max-this.props.min);
return (value-this.props.min)*rangeToTrack;}},{key:'_internalSetValue',value:function _internalSetValue(



ref,value){
var target=ref===this.refs.minRange?'min':'max';
this._range[target]=value;
this._emitChange();}},{key:'_emitChange',value:function _emitChange()



{
if(this.props.onChange){
this.props.onChange({
min:this._toSliderScale(this._range.min),
max:this._toSliderScale(this._range.max)});}}},{key:'_updateValue',value:function _updateValue(





values){
if(!this._trackTotalLength){
return;}


var lthumb=this.refs.minRange;
var rthumb=this.refs.maxRange;

this._moveThumb(lthumb,values.min);
lthumb.confirmMoveTo(values.min);

this._moveThumb(rthumb,values.max);
rthumb.confirmMoveTo(values.max);}},{key:'_validateMove',value:function _validateMove(



dx,trackOriginX,trackWidth,ref){
var x=dx-trackOriginX;

var onTrack=function(relX){
var upperBound=relX>=trackWidth?trackWidth:relX;
return relX<=0?0:upperBound;};


if(ref){
var lthumb=this.refs.minRange;
var rthumb=this.refs.maxRange;

var oRef=ref;
if(lthumb.x===rthumb.x){
if(x>rthumb.x){
oRef=this._overriddenThumb=rthumb;
ref.confirmMoveTo(ref.x);}else 
if(x<lthumb.x){
oRef=this._overriddenThumb=lthumb;
ref.confirmMoveTo(ref.x);}}



var valX=void 0;
if(oRef===lthumb){
valX=x>=rthumb.x?rthumb.x:onTrack(x);}else 
if(oRef===rthumb){
valX=x<=lthumb.x?lthumb.x:onTrack(x);}


return {newRef:oRef,x:valX};}}},{key:'_updateValueByTouch',value:function _updateValueByTouch(




ref,evt){var _this2=this;
var ovrRef=this._overriddenThumb?this._overriddenThumb:ref;

var dx=evt.nativeEvent.pageX;
this.refs.track.measure(function(fx,fy,width,height,px){var _validateMove2=
_this2._validateMove(dx,px,width,ovrRef);var newRef=_validateMove2.newRef;var x=_validateMove2.x;
_this2._internalSetValue(newRef,x);
_this2._moveThumb(newRef,x);});}},{key:'_moveThumb',value:function _moveThumb(




ref,x){
ref.moveTo(x);

Animated.parallel([
Animated.timing(this._lowerTrackMin,{
toValue:this._range.min,
duration:0}),

Animated.timing(this._lowerTrackLength,{
toValue:this._range.max-this._range.min,
duration:0})]).

start();}},{key:'_endMove',value:function _endMove(



ref,evt){var _this3=this;
var ovrRef=this._overriddenThumb?this._overriddenThumb:ref;

var dx=evt.nativeEvent.pageX;
this.refs.track.measure(function(fx,fy,width,height,px){
ovrRef.confirmMoveTo(_this3._validateMove(dx,px,width));
_this3._overriddenThumb=null;});}},{key:'_onThumbRadiiUpdate',value:function _onThumbRadiiUpdate(




props){
this._thumbRadii=props.thumbRadius;
this._thumbRadiiWithBorder=this._thumbRadii+THUMB_BORDER_WIDTH;
this._trackMarginV=this._thumbRadiiWithBorder*THUMB_SCALE_RATIO+
TRACK_EXTRA_MARGIN_V-this.props.trackSize/2;
this._trackMarginH=this._thumbRadiiWithBorder*THUMB_SCALE_RATIO+
TRACK_EXTRA_MARGIN_H;}},{key:'render',value:function render()


{


var trackMargin={
marginLeft:this._trackMarginH,
marginRight:this._trackMarginH,
marginTop:this._trackMarginV,
marginBottom:this._trackMarginV};


var sliderStyle=this.theme.sliderStyle;
var lowerTrackColor=this.props.lowerTrackColor||sliderStyle.lowerTrackColor;
var upperTrackColor=this.props.upperTrackColor||sliderStyle.upperTrackColor;

return (
React.createElement(View,{ref:'container',
style:[this.props.style,{
padding:0,
paddingTop:0,
paddingBottom:0,
paddingLeft:0,
paddingRight:0}]},


React.createElement(View,{ref:'track',
style:babelHelpers.extends({
height:this.props.trackSize,
backgroundColor:upperTrackColor},
trackMargin),

onLayout:this._onTrackLayout.bind(this)},

React.createElement(Animated.View,{
ref:'lowerTrack',
style:{
position:'absolute',
left:this._lowerTrackMin,
width:this._lowerTrackLength,
height:this.props.trackSize,
backgroundColor:lowerTrackColor}})),



React.createElement(Thumb,{
ref:'minRange',
radius:this.props.thumbRadius,
trackMarginH:this._trackMarginH,
enabledColor:lowerTrackColor,
disabledColor:upperTrackColor,

onGrant:this._updateValueByTouch.bind(this),
onMove:this._updateValueByTouch.bind(this),
onEnd:this._endMove.bind(this),

style:{
top:this._thumbRadiiWithBorder*(THUMB_SCALE_RATIO-1)+TRACK_EXTRA_MARGIN_V}}),



React.createElement(Thumb,{
ref:'maxRange',
radius:this.props.thumbRadius,
trackMarginH:this._trackMarginH,
enabledColor:lowerTrackColor,
disabledColor:upperTrackColor,

onGrant:this._updateValueByTouch.bind(this),
onMove:this._updateValueByTouch.bind(this),
onEnd:this._endMove.bind(this),

style:{
top:this._thumbRadiiWithBorder*(THUMB_SCALE_RATIO-1)+TRACK_EXTRA_MARGIN_V}})));}}]);return RangeSlider;}(Component);








Object.defineProperty(RangeSlider.prototype,'minValue',{
set:function(minValue){
var range=this._setRange({
min:minValue,
max:this._toSliderScale(this._range.max)});

this._updateValue(range);
this._emitChange();},

get:function(){
return this._toSliderScale(this._range.min);},

enumerable:true});


Object.defineProperty(RangeSlider.prototype,'maxValue',{
set:function(maxValue){
var range=this._setRange({
min:this._toSliderScale(this._range.min),
max:maxValue});

this._updateValue(range);
this._emitChange();},

get:function(){
return this._toSliderScale(this._range.max);},

enumerable:true});



RangeSlider.propTypes=babelHelpers.extends({},

View.propTypes,{


min:PropTypes.number,


max:PropTypes.number,


minValue:PropTypes.number,


maxValue:PropTypes.number,


trackSize:PropTypes.number,


thumbRadius:PropTypes.number,


lowerTrackColor:PropTypes.string,


upperTrackColor:PropTypes.string,


onChange:PropTypes.func});



RangeSlider.defaultProps={
thumbRadius:6,
trackSize:2,
min:0,
max:100};var _require2=








require('react-native-material-kit/lib/builder.js');var Builder=_require2.Builder;var 




SliderBuilder=function(_Builder){babelHelpers.inherits(SliderBuilder,_Builder);function SliderBuilder(){babelHelpers.classCallCheck(this,SliderBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SliderBuilder).apply(this,arguments));}babelHelpers.createClass(SliderBuilder,[{key:'build',value:function build()
{
var BuiltSlider=function(_RangeSlider){babelHelpers.inherits(BuiltSlider,_RangeSlider);function BuiltSlider(){babelHelpers.classCallCheck(this,BuiltSlider);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BuiltSlider).apply(this,arguments));}return BuiltSlider;}(RangeSlider);
BuiltSlider.defaultProps=babelHelpers.extends({},RangeSlider.defaultProps,this.toProps());
return BuiltSlider;}}]);return SliderBuilder;}(Builder);




SliderBuilder.defineProps(RangeSlider.propTypes);




function slider(){
return new SliderBuilder().withBackgroundColor(MKColor.Transparent);}




module.exports=RangeSlider;
RangeSlider.Builder=SliderBuilder;
RangeSlider.slider=slider;
});
__d('react-native-material-kit/lib/mdl/Ripple.js',function(global, require, module, exports) {  'use strict';








var React=require('react-native/Libraries/react-native/react-native.js');
var MKPropTypes=require('react-native-material-kit/lib/MKPropTypes.js');
var MKTouchable=require('react-native-material-kit/lib/internal/MKTouchable.js');var 


Component=




React.Component;var Animated=React.Animated;var View=React.View;var PropTypes=React.PropTypes;var Platform=React.Platform;var 





Ripple=function(_Component){babelHelpers.inherits(Ripple,_Component);
function Ripple(props){babelHelpers.classCallCheck(this,Ripple);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Ripple).call(this,
props));
_this._animatedAlpha=new Animated.Value(0);
_this._animatedRippleScale=new Animated.Value(0);



_this.state={
width:1,
height:1,
maskBorderRadius:0,
shadowOffsetY:1,
ripple:{radii:0,dia:0,offset:{top:0,left:0}}};return _this;}babelHelpers.createClass(Ripple,[{key:'_onTouchEvent',value:function _onTouchEvent(




evt){
switch(evt.type){
case 'TOUCH_DOWN':
this._onPointerDown(evt);
break;
case 'TOUCH_UP':
case 'TOUCH_CANCEL':
this._onPointerUp();
break;}


if(this.props.onTouch){
this.props.onTouch(evt);}}},{key:'measure',value:function measure(



cb){
return this.refs.container.measure(cb);}},{key:'_onLayout',value:function _onLayout(


evt){
this._onLayoutChange(evt.nativeEvent.layout);

if(this.props.onLayout){
this.props.onLayout(evt);}}},{key:'_onLayoutChange',value:function _onLayoutChange(_ref)



{var width=_ref.width;var height=_ref.height;
if(width===this.state.width&&height===this.state.height){
return;}


this.setState(babelHelpers.extends({
width:width,
height:height},
this._calcMaskLayer(width,height)));}},{key:'_calcMaskLayer',value:function _calcMaskLayer(




width,height){
var maskRadiiPercent=this.props.maskBorderRadiusInPercent;
var maskBorderRadius=this.props.maskBorderRadius;

if(maskRadiiPercent){
maskBorderRadius=Math.min(width,height)*maskRadiiPercent/100;}


return {maskBorderRadius:maskBorderRadius};}},{key:'_calcRippleLayer',value:function _calcRippleLayer(



x0,y0){var _state=
this.state;var width=_state.width;var height=_state.height;var maskBorderRadius=_state.maskBorderRadius;var 
maskBorderRadiusInPercent=this.props.maskBorderRadiusInPercent;
var offsetX=void 0,offsetY=void 0,radii=void 0,hotSpotX=x0,hotSpotY=y0;

if(this.props.rippleLocation==='center'){
hotSpotX=width/2;
hotSpotY=height/2;}

offsetX=Math.max(hotSpotX,width-hotSpotX);
offsetY=Math.max(hotSpotY,height-hotSpotY);



if(Platform.OS==='android'&&
this.props.rippleLocation==='center'&&
this.props.maskEnabled&&maskBorderRadiusInPercent>0){

radii=maskBorderRadius;}else 
{
radii=Math.sqrt(offsetX*offsetX+offsetY*offsetY);}


return {
ripple:{
radii:radii,
dia:radii*2,
offset:{
top:hotSpotY-radii,
left:hotSpotX-radii}}};}},{key:'_onPointerDown',value:function _onPointerDown(





evt){
this.setState(babelHelpers.extends({},
this._calcRippleLayer(evt.x,evt.y)));

this.showRipple();}},{key:'_onPointerUp',value:function _onPointerUp()


{
this.hideRipple();}},{key:'showRipple',value:function showRipple()



{var _this2=this;
this._animatedAlpha.setValue(1);
this._animatedRippleScale.setValue(.3);


this._rippleAni=Animated.timing(this._animatedRippleScale,{
toValue:1,
duration:this.props.rippleDuration||200});



if(this.props.shadowAniEnabled){
this.setState({shadowOffsetY:1.5});}


this._rippleAni.start(function(){
_this2._rippleAni=undefined;


if(_this2._pendingRippleAni){
_this2._pendingRippleAni();}});}},{key:'hideRipple',value:function hideRipple()





{var _this3=this;
this._pendingRippleAni=function(){

Animated.timing(_this3._animatedAlpha,{
toValue:0,
duration:_this3.props.maskDuration||200}).
start();


if(_this3.props.shadowAniEnabled){
_this3.setState({shadowOffsetY:1});}


_this3._pendingRippleAni=undefined;};


if(!this._rippleAni){

this._pendingRippleAni();}}},{key:'render',value:function render()



{
var shadowStyle={};
if(this.props.shadowAniEnabled){
shadowStyle.shadowOffset={
width:0,
height:this.state.shadowOffsetY};}



return (
React.createElement(MKTouchable,babelHelpers.extends({ref:'container'},
this.props,{
style:[this.props.style,shadowStyle],
onTouch:this._onTouchEvent.bind(this),
onLayout:this._onLayout.bind(this)}),

this.props.children,
React.createElement(Animated.View,{
ref:'maskLayer',
style:{
position:'absolute',
backgroundColor:this.props.maskColor,
opacity:this._animatedAlpha,
top:0,
left:0,
width:this.state.width,
height:this.state.height,
borderRadius:this.state.maskBorderRadius,
overflow:this.props.maskEnabled?'hidden':'visible'}},


React.createElement(Animated.View,{
ref:'rippleLayer',
style:babelHelpers.extends({

backgroundColor:this.props.rippleColor,
width:this.state.ripple.dia,
height:this.state.ripple.dia},
this.state.ripple.offset,{
borderRadius:this.state.ripple.radii,
transform:[
{scale:this._animatedRippleScale}]})}))));}}]);return Ripple;}(Component);










Ripple.propTypes=babelHelpers.extends({},

View.propTypes,{


rippleColor:PropTypes.string,


rippleDuration:PropTypes.number,


rippleLocation:MKPropTypes.rippleLocation,



maskEnabled:PropTypes.bool,


maskColor:PropTypes.string,


maskBorderRadius:PropTypes.number,


maskBorderRadiusInPercent:PropTypes.number,


maskDuration:PropTypes.number,


shadowAniEnabled:PropTypes.bool,


onTouch:React.PropTypes.func,

onLayout:React.PropTypes.func});



Ripple.defaultProps={
rippleColor:'rgba(255,255,255,0.2)',
rippleDuration:200,
rippleLocation:'tapLocation',
maskEnabled:true,
maskColor:'rgba(255,255,255,0.15)',
maskBorderRadius:2,
maskDuration:200,
shadowAniEnabled:true};var _require=






require('react-native-material-kit/lib/builder.js');var Builder=_require.Builder;var 





RippleBuilder=function(_Builder){babelHelpers.inherits(RippleBuilder,_Builder);function RippleBuilder(){babelHelpers.classCallCheck(this,RippleBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(RippleBuilder).apply(this,arguments));}babelHelpers.createClass(RippleBuilder,[{key:'build',value:function build()
{
var BuiltRipple=function(_Ripple){babelHelpers.inherits(BuiltRipple,_Ripple);function BuiltRipple(){babelHelpers.classCallCheck(this,BuiltRipple);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BuiltRipple).apply(this,arguments));}return BuiltRipple;}(Ripple);
BuiltRipple.defaultProps=babelHelpers.extends({},Ripple.defaultProps,this.toProps());
return BuiltRipple;}}]);return RippleBuilder;}(Builder);




RippleBuilder.defineProps(Ripple.propTypes);





function ripple(){
return new RippleBuilder();}




module.exports=Ripple;
Ripple.Builder=RippleBuilder;
Ripple.ripple=ripple;
});
__d('react-native-material-kit/lib/mdl/Checkbox.js',function(global, require, module, exports) {  'use strict';









var React=require('react-native/Libraries/react-native/react-native.js');var 


Component=




React.Component;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;var View=React.View;var Animated=React.Animated;var PropTypes=React.PropTypes;

var MKColor=require('react-native-material-kit/lib/MKColor.js');
var Ripple=require('react-native-material-kit/lib/mdl/Ripple.js');
var Tick=require('react-native-material-kit/lib/internal/Tick.js');
var utils=require('react-native-material-kit/lib/utils.js');var _require=
require('react-native-material-kit/lib/theme.js');var getTheme=_require.getTheme;

var DEFAULT_EXTRA_RIPPLE_RADII=5;var 




Checkbox=function(_Component){babelHelpers.inherits(Checkbox,_Component);
function Checkbox(props){babelHelpers.classCallCheck(this,Checkbox);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Checkbox).call(this,
props));
_this.theme=getTheme();
_this._animatedTickAlpha=new Animated.Value(0);
_this._group=null;
_this.state={
checked:false,
width:0,
height:0,
rippleRadii:0};return _this;}babelHelpers.createClass(Checkbox,[{key:'componentWillMount',value:function componentWillMount()



{
this.group=this.props.group;
this._initView(this.props.checked);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this.group=nextProps.group;
if(nextProps.checked!==this.props.checked){
this._initView(nextProps.checked);}}},{key:'_initView',value:function _initView(



checked){
this.setState({checked:checked});
this._aniToggle(checked);}},{key:'_onLayout',value:function _onLayout(_ref)


{var _ref$nativeEvent$layo=_ref.nativeEvent.layout;var width=_ref$nativeEvent$layo.width;var height=_ref$nativeEvent$layo.height;
if(width===this.state.width&&height===this.state.height){
return;}


var size=Math.min(width,height);
var rippleRadii=size*Math.SQRT2/2+(this.props.extraRippleRadius||DEFAULT_EXTRA_RIPPLE_RADII);
this.setState({
rippleRadii:rippleRadii,
width:rippleRadii*2,
height:rippleRadii*2});}},{key:'_onTouch',value:function _onTouch(




evt){
switch(evt.type){
case 'TOUCH_UP':
this.confirmToggle();
break;}}},{key:'confirmToggle',value:function confirmToggle()




{var _this2=this;
var prevState=this.state.checked;
var newState=!prevState;

this.setState({checked:newState},function(){
if(_this2.props.onCheckedChange){
_this2.props.onCheckedChange({checked:_this2.state.checked});}});



this._aniToggle(newState);}},{key:'_aniToggle',value:function _aniToggle(



checked){
Animated.timing(this._animatedTickAlpha,{
toValue:checked?1:0,
duration:220}).
start();}},{key:'render',value:function render()


{
var defaultStyle=this.theme.checkboxStyle;
var mergedStyle=babelHelpers.extends({},defaultStyle,utils.extractProps(this,[
'borderOnColor',
'borderOffColor',
'fillColor',
'rippleColor',
'inset']));

var borderColor=this.state.checked?mergedStyle.borderOnColor:mergedStyle.borderOffColor;

return (
React.createElement(TouchableWithoutFeedback,utils.extractTouchableProps(this),
React.createElement(Ripple,babelHelpers.extends({},
this.props,{
maskBorderRadiusInPercent:50,
rippleLocation:'center',
rippleColor:mergedStyle.rippleColor,
onTouch:this._onTouch.bind(this),
style:{
justifyContent:'center',
alignItems:'center',
width:this.state.width,
height:this.state.height}}),


React.createElement(View,{ref:'container',
style:[
Checkbox.defaultProps.style,
this.props.style,{
borderColor:borderColor,
alignItems:'stretch'}],


onLayout:this._onLayout.bind(this)},

React.createElement(Tick.animated,{ref:'tick',
inset:mergedStyle.inset,
fillColor:mergedStyle.fillColor,
style:{
flex:1,
opacity:this._animatedTickAlpha}})))));}}]);return Checkbox;}(Component);










Checkbox.propTypes=babelHelpers.extends({},

Ripple.propTypes,


Tick.propTypes,


TouchableWithoutFeedback.propTypes,{


borderOnColor:PropTypes.string,


borderOffColor:PropTypes.string,


fillColor:PropTypes.string,


checked:PropTypes.bool,


onCheckedChange:PropTypes.func,



extraRippleRadius:PropTypes.number});



Checkbox.defaultProps={
pointerEvents:'box-only',
maskColor:MKColor.Transparent,
style:{
justifyContent:'center',
alignItems:'center',
width:20,
height:20,
borderWidth:2,
borderRadius:1}};var _require2=









require('react-native-material-kit/lib/builder.js');var Builder=_require2.Builder;var 




CheckboxBuilder=function(_Builder){babelHelpers.inherits(CheckboxBuilder,_Builder);function CheckboxBuilder(){babelHelpers.classCallCheck(this,CheckboxBuilder);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(CheckboxBuilder).apply(this,arguments));}babelHelpers.createClass(CheckboxBuilder,[{key:'build',value:function build()
{
var BuiltCheckbox=function(_Checkbox){babelHelpers.inherits(BuiltCheckbox,_Checkbox);function BuiltCheckbox(){babelHelpers.classCallCheck(this,BuiltCheckbox);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BuiltCheckbox).apply(this,arguments));}return BuiltCheckbox;}(Checkbox);
BuiltCheckbox.defaultProps=babelHelpers.extends({},Checkbox.defaultProps,this.toProps());
return BuiltCheckbox;}}]);return CheckboxBuilder;}(Builder);




CheckboxBuilder.defineProps(Checkbox.propTypes);




function builder(){
return new CheckboxBuilder();}




module.exports=Checkbox;
Checkbox.builder=builder;
Checkbox.Builder=CheckboxBuilder;
});
__d('HomyPiAndroid/js/components/AppRoutes.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);
var _reactNativeRouterFlux=require("react-native-router-flux/index.js");

var _reactRedux=require("react-redux/lib/index.js");


var _searchMusic=require("HomyPiAndroid/js/components/music/searchMusic.js");var _searchMusic2=babelHelpers.interopRequireDefault(_searchMusic);


var _TrackSearch=require("HomyPiAndroid/js/components/music/TrackSearch.js");var _TrackSearch2=babelHelpers.interopRequireDefault(_TrackSearch);
var _AlbumSearch=require("HomyPiAndroid/js/components/music/AlbumSearch.js");var _AlbumSearch2=babelHelpers.interopRequireDefault(_AlbumSearch);
var _AlbumDetails=require("HomyPiAndroid/js/components/music/AlbumDetails.js");var _AlbumDetails2=babelHelpers.interopRequireDefault(_AlbumDetails);

var _AlarmList=require("HomyPiAndroid/js/components/alarms/AlarmList.js");var _AlarmList2=babelHelpers.interopRequireDefault(_AlarmList);var Router=_reactNativeRouterFlux.Router;var 

AppRoutes=function(_Component){babelHelpers.inherits(AppRoutes,_Component);function AppRoutes(){babelHelpers.classCallCheck(this,AppRoutes);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AppRoutes).apply(this,arguments));}babelHelpers.createClass(AppRoutes,[{key:"render",value:function render()
{
return (
_reactNative2.default.createElement(Router,{name:"appRouter",route:this.props.route,hideNavBar:true,
removeFrontComponent:this.props.removeFrontComponent,
addFrontComponent:this.props.addFrontComponent},
_reactNative2.default.createElement(_reactNativeRouterFlux.Schema,{name:"app",sceneConfig:_reactNative.Navigator.SceneConfigs.FloatFromLeft}),
_reactNative2.default.createElement(_reactNativeRouterFlux.Schema,{name:"details",sceneConfig:_reactNative.Navigator.SceneConfigs.FloatFromBottom}),

_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"home",schema:"app",component:_searchMusic2.default,title:"Home"}),

_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"searchMusic",schema:"app",component:_searchMusic2.default,title:"Search music"}),
_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"searchTrack",schema:"app",component:_TrackSearch2.default,title:"Search track"}),
_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"searchAlbum",schema:"app",component:_AlbumSearch2.default,title:"Search album"}),
_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"albumDetails",schema:"details",component:_AlbumDetails2.default,title:"Album"}),

_reactNative2.default.createElement(_reactNativeRouterFlux.Route,{name:"alarms",schema:"app",component:_AlarmList2.default,title:"Alarms"})));}}]);return AppRoutes;}(_reactNative.Component);exports.default=






AppRoutes;
});
__d('HomyPiAndroid/js/components/app.js',function(global, require, module, exports) {  "use strict";
var _reactRedux=require("react-redux/lib/index.js");
var _reactNativeRouterFlux=require("react-native-router-flux/index.js");











var _Constants=require("HomyPiAndroid/js/Constants.js");

var _FrontComponent=require("HomyPiAndroid/js/components/FrontComponent.js");var _FrontComponent2=babelHelpers.interopRequireDefault(_FrontComponent);

var _AlarmList=require("HomyPiAndroid/js/components/alarms/AlarmList.js");var _AlarmList2=babelHelpers.interopRequireDefault(_AlarmList);
var _playerHeader=require("HomyPiAndroid/js/components/music/playerHeader.js");var _playerHeader2=babelHelpers.interopRequireDefault(_playerHeader);
var _TrackSearch=require("HomyPiAndroid/js/components/music/TrackSearch.js");var _TrackSearch2=babelHelpers.interopRequireDefault(_TrackSearch);
var _AlbumSearch=require("HomyPiAndroid/js/components/music/AlbumSearch.js");var _AlbumSearch2=babelHelpers.interopRequireDefault(_AlbumSearch);
var _AlbumDetails=require("HomyPiAndroid/js/components/music/AlbumDetails.js");var _AlbumDetails2=babelHelpers.interopRequireDefault(_AlbumDetails);



var _reactNativeDrawer=require("react-native-drawer/index.js");var _reactNativeDrawer2=babelHelpers.interopRequireDefault(_reactNativeDrawer);
var _menu=require("HomyPiAndroid/js/components/menu.js");var _menu2=babelHelpers.interopRequireDefault(_menu);
var _topMenu=require("HomyPiAndroid/js/components/topMenu.js");var _topMenu2=babelHelpers.interopRequireDefault(_topMenu);
var _RCTDeviceEventEmitter=require("RCTDeviceEventEmitter");var _RCTDeviceEventEmitter2=babelHelpers.interopRequireDefault(_RCTDeviceEventEmitter);
var _Subscribable=require("Subscribable");var _Subscribable2=babelHelpers.interopRequireDefault(_Subscribable);
var _UserAPI=require("HomyPiAndroid/js/apis/UserAPI.js");var _UserAPI2=babelHelpers.interopRequireDefault(_UserAPI);



var _myArtists=require("HomyPiAndroid/js/components/music/myArtists.js");var _myArtists2=babelHelpers.interopRequireDefault(_myArtists);
var _searchMusic=require("HomyPiAndroid/js/components/music/searchMusic.js");var _searchMusic2=babelHelpers.interopRequireDefault(_searchMusic);

var _AppRoutes=require("HomyPiAndroid/js/components/AppRoutes.js");var _AppRoutes2=babelHelpers.interopRequireDefault(_AppRoutes);var React=require("react-native/Libraries/react-native/react-native.js");var AppRegistry=React.AppRegistry;var StyleSheet=React.StyleSheet;var Text=React.Text;var View=React.View;var TextInput=React.TextInput;var TouchableHighlight=React.TouchableHighlight;var BackAndroid=React.BackAndroid;var Image=React.Image;var Animated=React.Animated;var SocketConnection=require("HomyPiAndroid/js/natives/SocketConnection.js");

var App=React.createClass({displayName:"App",
getInitialState:function(){
return {
frontComponents:[]};},


componentWillMount:function(){},

componentWillUnmount:function(){},



render:function(){var _this=this;
var initialRoute={name:"searchMusic"};

var nav=null;

var menu=React.createElement(_menu2.default,{pushRoute:this._push,closeMenu:this.closeMenu,logout:function(){return _this._logout();}});
return (
React.createElement(_reactNativeDrawer2.default,{
content:menu,
ref:"sideMenu",
openDrawerThreshold:0.35,
type:"overlay",
styles:{
drawer:{shadowColor:"#000000",elevation:16,shadowOpacity:0.8,shadowRadius:3}},

tweenHandler:function(ratio){return {
main:{opacity:(2-ratio)/2}};},

openDrawerOffset:100},
React.createElement(_topMenu2.default,{openMenu:this.openSideMenu}),
React.createElement(View,{style:this.styles.container},

React.createElement(_AppRoutes2.default,{route:this.props.route,
addFrontComponent:function(component,zIndex){return _this.addFrontComponent(component,zIndex);},
removeFrontComponent:function(component){return _this.removeFrontComponent(component);}}),

React.createElement(View,{style:{position:"absolute",top:0,left:0}},
this.state.frontComponents.map(function(component){return component;})),

React.createElement(View,{style:this.styles.player},
React.createElement(_playerHeader2.default,null)))));},





addFrontComponent:function(component,zIndex){
if(!component)return;
var key="xxxxxxxx-xxxx-4xxx".replace(/[xy]/g,function(c){
var r=Math.random()*16|0,v=c=="x"?r:r&0x3|0x8;
return v.toString(16);});

var frontComponents=this.state.frontComponents;
frontComponents.push(React.createElement(_FrontComponent2.default,{key:key,component:component,zIndex:zIndex||0}));
frontComponents.sort(function(a,b){
if(a.props.zIndex>b.props.zIndex)
return 1;
if(a.props.zIndex<b.props.zIndex)
return -1;
return 0;});

this.setState({frontComponents:frontComponents});},

removeFrontComponent:function(component){

var index=this.state.frontComponents.find(function(fc){
return fc.props.component==component;});

if(index===-1)return;
this.state.frontComponents.splice(index,1);
this.setState({frontComponents:this.state.frontComponents});},

_logout:function(){
this.props.logout();},

openSideMenu:function(){
this.refs.sideMenu.open();},

closeMenu:function(){
this.refs.sideMenu.close();},

styles:{
container:{
flex:1,
backgroundColor:"#FAFAFA"},

player:{
height:_Constants.PLAYER_HEADER_HEIGHT,
backgroundColor:"#263238",
marginLeft:0,
elevation:16}}});




module.exports=App;
});
__d('HomyPiAndroid/js/components/alarms/AlarmList.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);
var _reactRedux=require("react-redux/lib/index.js");
var _onSelectedRaspberryChange=require("HomyPiAndroid/js/onSelectedRaspberryChange.js");
var _AlarmActions=require("HomyPiAndroid/js/actions/AlarmActions.js");

var _reactNativeMaterialKit=require("react-native-material-kit/lib/index.js");





var _Constants=require("HomyPiAndroid/js/Constants.js");
var _Alarm=require("HomyPiAndroid/js/components/alarms/Alarm.js");var _Alarm2=babelHelpers.interopRequireDefault(_Alarm);var RefreshableListView=require("react-native-refreshable-listview/index.js");var window=require("Dimensions").get("window");var 



View=_reactNative2.default.View;var 
StyleSheet=_reactNative2.default.StyleSheet;var 
Text=_reactNative2.default.Text;var 
ListView=_reactNative2.default.ListView;var 
PullToRefreshViewAndroid=_reactNative2.default.PullToRefreshViewAndroid;var 
NativeModules=_reactNative2.default.NativeModules;

var styles={
container:{
flex:1}};




var ColoredFab=_reactNativeMaterialKit.MKButton.coloredFab().
withStyle({
position:"absolute",
right:5,

bottom:10}).

build();var 

AlarmList=function(_React$Component){babelHelpers.inherits(AlarmList,_React$Component);
function AlarmList(props){babelHelpers.classCallCheck(this,AlarmList);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AlarmList).call(this,
props));
_this.alarmsDs=new ListView.DataSource({
rowHasChanged:function(r1,r2){
return true;}});


_this.enableAlarm=function(alarm,value){var _this$props=
_this.props;var user=_this$props.user;var dispatch=_this$props.dispatch;
dispatch((0,_AlarmActions.setEnable)(user,alarm,value));};

_this.deleteAlarm=function(alarm){var _this$props2=
_this.props;var user=_this$props2.user;var dispatch=_this$props2.dispatch;
dispatch((0,_AlarmActions.removeAlarm)(user,alarm));};

_this._loadAlarms=function(raspberry){var _this$props3=
_this.props;var selectedRaspberry=_this$props3.selectedRaspberry;var dispatch=_this$props3.dispatch;var user=_this$props3.user;var isFetching=_this$props3.isFetching;
if((raspberry||selectedRaspberry)&&!isFetching){
dispatch((0,_AlarmActions.fetchAll)(user,raspberry||selectedRaspberry));}};return _this;}babelHelpers.createClass(AlarmList,[{key:"componentDidMount",value:function componentDidMount()



{
this._loadAlarms();}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(

nextProps){

if(nextProps.selectedRaspberry!=this.props.selectedRaspberry){
this._loadAlarms(nextProps.selectedRaspberry);}}},{key:"render",value:function render()


{var _this2=this;var _props=
this.props;var selectedRaspberry=_props.selectedRaspberry;var alarms=_props.alarms;var isFetching=_props.isFetching;
var alarmsDs=this.alarmsDs.cloneWithRows(alarms);
return (

_reactNative2.default.createElement(View,{style:styles.container},
_reactNative2.default.createElement(PullToRefreshViewAndroid,{
style:styles.container,
refreshing:isFetching,
onRefresh:this._loadAlarms},
_reactNative2.default.createElement(ListView,{
dataSource:alarmsDs,
renderRow:function(alarm){return _reactNative2.default.createElement(_Alarm2.default,{key:alarm._id,raspberry:selectedRaspberry,alarm:alarm,enableAlarm:_this2.enableAlarm,deleteAlarm:_this2.deleteAlarm});}})),

_reactNative2.default.createElement(ColoredFab,{
onPress:function(){_this2._addAlarm();}},
_reactNative2.default.createElement(Text,null," + "))));}},{key:"_addAlarm",value:function _addAlarm()




{var _props2=
this.props;var selectedRaspberry=_props2.selectedRaspberry;var dispatch=_props2.dispatch;var user=_props2.user;
NativeModules.DateAndroid.showTimepicker(function(){},function(hour,minute){
var alarm={hours:hour,minutes:minute,enable:true,repeat:false};
alarm.date=new Date();
alarm.date.setHours(hour);
alarm.date.setMinutes(minute);
dispatch((0,_AlarmActions.addAlarm)(user,selectedRaspberry,alarm));});}}]);return AlarmList;}(_reactNative2.default.Component);




function mapStateToProps(state){var 
alarms=state.alarms;var selectedRaspberry=state.selectedRaspberry;var user=state.user;var 
items=alarms.items;
return babelHelpers.extends({
user:user,
selectedRaspberry:selectedRaspberry},
alarms,{
alarms:items});}exports.default=



(0,_reactRedux.connect)(mapStateToProps)(AlarmList);
});
__d('HomyPiAndroid/js/components/music/Progress.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var React=require("react-native/Libraries/react-native/react-native.js");var 

StyleSheet=

React.StyleSheet;var View=React.View;
var Dimensions=require("Dimensions");
var window=Dimensions.get("window");var 


Progress=function(_React$Component){babelHelpers.inherits(Progress,_React$Component);
function Progress(props){babelHelpers.classCallCheck(this,Progress);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Progress).call(this,
props));
_this.percentage=100;return _this;}babelHelpers.createClass(Progress,[{key:"setTouch",value:function setTouch(

e){
return true;}},{key:"handleSeekTrack",value:function handleSeekTrack(

e){var 
onSeekTrack=this.props.onSeekTrack;
var xPos=(e.nativeEvent.locationX-10)/(window.width-20);
var value=Math.round(xPos*this.props.max);

onSeekTrack&&onSeekTrack.call(this,value,e);}},{key:"render",value:function render()


{var _this2=this;var _props=
this.props;var value=_props.value;var min=_props.min;var max=_props.max;

if(value<min){
value=min;}


if(value>max){
value=max;}

this.percentage=value*100/max;
this.styles=StyleSheet.create({
progress:{
marginLeft:10,
height:40,
width:window.width-20,
paddingTop:18},

backgroundBar:{
position:"absolute",
backgroundColor:"#616161",
height:2,
marginTop:2,
width:window.width-20},


progressBar:{
position:"absolute",
backgroundColor:"#8BC34A",
height:6,
width:(window.width-20)*(this.percentage/100)}});


return (
React.createElement(View,{style:this.styles.progress,
onStartShouldSetResponder:this.setTouch,
onMoveShouldSetResponder:this.setTouch,
onResponderRelease:function(evt){_this2.handleSeekTrack(evt);}},
React.createElement(View,{style:this.styles.backgroundBar}),
React.createElement(View,{style:this.styles.progressBar})));}}]);return Progress;}(React.Component);






Progress.defaultProps={
value:0,
min:0,
max:100};exports.default=


Progress;
});
__d('PixelRatio',function(global, require, module, exports) {  'use strict';












var Dimensions=require('Dimensions');var 


















PixelRatio=function(){function PixelRatio(){babelHelpers.classCallCheck(this,PixelRatio);}babelHelpers.createClass(PixelRatio,null,[{key:'get',value:function get()


















{
return Dimensions.get('window').scale;}},{key:'getFontScale',value:function getFontScale()













{
return Dimensions.get('window').fontScale||PixelRatio.get();}},{key:'getPixelSizeForLayoutSize',value:function getPixelSizeForLayoutSize(







layoutSize){
return Math.round(layoutSize*PixelRatio.get());}},{key:'roundToNearestPixel',value:function roundToNearestPixel(








layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;}},{key:'startDetecting',value:function startDetecting()



{}}]);return PixelRatio;}();


module.exports=PixelRatio;
});
__d('HomyPiAndroid/js/actions/AlarmActions.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.UPDATED=exports.DELETED=exports.NEW=exports.RECEIVE_ALL=exports.REQUEST_ALL=undefined;exports.











requestAll=requestAll;exports.





receiveAll=receiveAll;exports.





added=added;exports.





deleted=deleted;exports.





updated=updated;exports.






fetchAll=fetchAll;exports.























setEnable=setEnable;exports.



























addAlarm=addAlarm;exports.


























removeAlarm=removeAlarm;var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);var _UserAPI=require("HomyPiAndroid/js/apis/UserAPI.js");var _UserAPI2=babelHelpers.interopRequireDefault(_UserAPI);var _AlarmAPI=require("HomyPiAndroid/js/apis/AlarmAPI.js");var _AlarmAPI2=babelHelpers.interopRequireDefault(_AlarmAPI);var API="/api/modules/alarms";var REQUEST_ALL=exports.REQUEST_ALL="ALARM_REQUEST_ALL";var RECEIVE_ALL=exports.RECEIVE_ALL="ALARM_RECEIVE_ALL";var NEW=exports.NEW="ALARM_NEW";var DELETED=exports.DELETED="ALARM_DELETED";var UPDATED=exports.UPDATED="ALARM_UPDATED";function requestAll(alarms){return {type:REQUEST_ALL,alarms:alarms};}function receiveAll(data){return babelHelpers.extends({type:RECEIVE_ALL},data);}function added(data){return {type:NEW,alarm:data};}function deleted(alarm){return {type:DELETED,alarm:alarm};}function updated(data){return {type:UPDATED,alarm:data};}function fetchAll(user,raspberry){if(!user||!user.token)throw new Error("missing user or token");return function(dispatch){if(!raspberry||!raspberry.name)return new Error("missing raspberry name");dispatch(requestAll());return fetch(_settings2.default.getServerUrl()+API+"/raspberries/"+raspberry.name,{headers:{"Accept":"application/json","Content-Type":"application/json","Authorization":"Bearer "+user.token}}).then(function(response){return response.json();}).then(function(json){if(json.status==="error"){}else {dispatch(receiveAll(json.data));}});};}function setEnable(user,alarm,enable){if(!user||!user.token)throw new Error("missing user or token");return function(dispatch){return fetch(_settings2.default.getServerUrl()+API+"/"+alarm._id,{headers:{"Accept":"application/json","Content-Type":"application/json","Authorization":"Bearer "+user.token},method:"put",body:JSON.stringify({enable:enable})}).then(function(response){return response.json();}).then(function(json){if(json.status==="error"){}else {alarm.enable=enable;dispatch(updated(alarm));}});};}function addAlarm(user,raspberry,alarm){if(!user||!user.token)throw new Error("missing user or token");return function(dispatch){return fetch(_settings2.default.getServerUrl()+API+"/",{headers:{"Accept":"application/json","Content-Type":"application/json","Authorization":"Bearer "+user.token},method:"post",body:JSON.stringify({alarm:alarm,raspberry:raspberry})}).then(function(response){return response.json();}).then(function(json){if(json.status==="error"){}else {alarm._id=json.alarm._id;dispatch(added(alarm));}});};}function removeAlarm(user,alarm){
if(!user||!user.token)throw new Error("missing user or token");
return function(dispatch){
return fetch(_settings2.default.getServerUrl()+API+"/"+alarm._id,{
headers:{
"Accept":"application/json",
"Content-Type":"application/json",
"Authorization":"Bearer "+user.token},

method:"delete"}).

then(function(response){return response.json();}).
then(function(json){

if(json.status==="error"){}else 


{
dispatch(deleted(alarm));}});};}
});
__d('HomyPiAndroid/js/apis/AlarmAPI.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _UserAPI=require("HomyPiAndroid/js/apis/UserAPI.js");var _UserAPI2=babelHelpers.interopRequireDefault(_UserAPI);
var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);

var superagent=require("superagent/lib/client.js");
var serverUrl="/api/modules/alarms";exports.default=

{
getAlarms:function(raspberry){
return new Promise(function(resolve,reject){
var url=_settings2.default.getServerUrl()+serverUrl+"/raspberries/"+raspberry.name;
superagent.get(url).
set("Authorization","Bearer "+_UserAPI2.default.getToken()).
end(function(err,res){
if(err||!res.text){
return reject(err);}else 
{
var resp=JSON.parse(res.text);
if(resp.status==="success"){
return resolve(resp.data.items);}else 
{
return reject(resp.error);}}});});},





deleteAlarm:function(alarm){
return new Promise(function(resolve,reject){
var url=_settings2.default.getServerUrl()+serverUrl+"/"+alarm._id;
superagent.delete(url).
set("Authorization","Bearer "+_UserAPI2.default.getToken()).
end(function(err,res){
if(!err){
return resolve(alarm);}else 
{
return reject(err);}});});},




insertAlarm:function(raspberry,alarm){
var url=_settings2.default.getServerUrl()+serverUrl+"/";
return new Promise(function(resolve,reject){
superagent.post(url).
send({alarm:alarm,raspberry:raspberry}).
set("Authorization","Bearer "+_UserAPI2.default.getToken()).
end(function(err,res){

if(err){
reject(err);}else 
{
var resp=JSON.parse(res.text);
if(resp.error){
return reject(resp.error);}else 
{
alarm._id=resp.alarm._id;
return resolve(alarm);}}});});},





updateAlarm:function(alarm){
alarm.raspberry=raspberry;
return new Promise(function(resolve,reject){
var url=_settings2.default.getServerUrl()+serverUrl+"/"+alarm._id;
superagent.put(url).
send({
hours:alarm.hours,
minutes:alarm.minutes}).

set("Authorization","Bearer "+_UserAPI2.default.getToken()).
end(function(err,res){
if(err){
reject(err);}else 
{
resolve(alarm);}});});},




enableAlarm:function(alarm,enabled){
return new Promise(function(resolve,reject){
var url=_settings2.default.getServerUrl()+serverUrl+"/"+alarm._id;

superagent.put(url).
send({enable:enabled}).
set("Authorization","Bearer "+_UserAPI2.default.getToken()).
end(function(err,res){
if(err){
reject(err);}else 
{
alarm.enable=enabled;
resolve(alarm);}});});}};
});
__d('superagent/lib/client.js',function(global, require, module, exports) {  'use strict';



var Emitter=require('component-emitter/index.js');
var reduce=require('reduce-component/index.js');





var root;
if(typeof window!=='undefined'){
root=window;}else 
if(typeof self!=='undefined'){
root=self;}else 
{
root=this;}






function noop(){};












function isHost(obj){
var str={}.toString.call(obj);

switch(str){
case '[object File]':
case '[object Blob]':
case '[object FormData]':
return true;
default:
return false;}}







request.getXHR=function(){
if(root.XMLHttpRequest&&(
!root.location||'file:'!=root.location.protocol||
!root.ActiveXObject)){
return new XMLHttpRequest();}else 
{
try{return new ActiveXObject('Microsoft.XMLHTTP');}catch(e){}
try{return new ActiveXObject('Msxml2.XMLHTTP.6.0');}catch(e){}
try{return new ActiveXObject('Msxml2.XMLHTTP.3.0');}catch(e){}
try{return new ActiveXObject('Msxml2.XMLHTTP');}catch(e){}}

return false;};










var trim=''.trim?
function(s){return s.trim();}:
function(s){return s.replace(/(^\s*|\s*$)/g,'');};









function isObject(obj){
return obj===Object(obj);}










function serialize(obj){
if(!isObject(obj))return obj;
var pairs=[];
for(var key in obj){
if(null!=obj[key]){
pushEncodedKeyValuePair(pairs,key,obj[key]);}}


return pairs.join('&');}











function pushEncodedKeyValuePair(pairs,key,val){
if(Array.isArray(val)){
return val.forEach(function(v){
pushEncodedKeyValuePair(pairs,key,v);});}


pairs.push(encodeURIComponent(key)+
'='+encodeURIComponent(val));}






request.serializeObject=serialize;









function parseString(str){
var obj={};
var pairs=str.split('&');
var parts;
var pair;

for(var i=0,len=pairs.length;i<len;++i){
pair=pairs[i];
parts=pair.split('=');
obj[decodeURIComponent(parts[0])]=decodeURIComponent(parts[1]);}


return obj;}






request.parseString=parseString;








request.types={
html:'text/html',
json:'application/json',
xml:'application/xml',
urlencoded:'application/x-www-form-urlencoded',
'form':'application/x-www-form-urlencoded',
'form-data':'application/x-www-form-urlencoded'};











request.serialize={
'application/x-www-form-urlencoded':serialize,
'application/json':JSON.stringify};











request.parse={
'application/x-www-form-urlencoded':parseString,
'application/json':JSON.parse};











function parseHeader(str){
var lines=str.split(/\r?\n/);
var fields={};
var index;
var line;
var field;
var val;

lines.pop();

for(var i=0,len=lines.length;i<len;++i){
line=lines[i];
index=line.indexOf(':');
field=line.slice(0,index).toLowerCase();
val=trim(line.slice(index+1));
fields[field]=val;}


return fields;}










function isJSON(mime){
return (/[\/+]json\b/.test(mime));}










function type(str){
return str.split(/ *; */).shift();}
;









function params(str){
return reduce(str.split(/ *; */),function(obj,str){
var parts=str.split(/ *= */),
key=parts.shift(),
val=parts.shift();

if(key&&val)obj[key]=val;
return obj;},
{});}
;















































function Response(req,options){
options=options||{};
this.req=req;
this.xhr=this.req.xhr;

this.text=this.req.method!='HEAD'&&(this.xhr.responseType===''||this.xhr.responseType==='text')||typeof this.xhr.responseType==='undefined'?
this.xhr.responseText:
null;
this.statusText=this.req.xhr.statusText;
this.setStatusProperties(this.xhr.status);
this.header=this.headers=parseHeader(this.xhr.getAllResponseHeaders());



this.header['content-type']=this.xhr.getResponseHeader('content-type');
this.setHeaderProperties(this.header);
this.body=this.req.method!='HEAD'?
this.parseBody(this.text?this.text:this.xhr.response):
null;}










Response.prototype.get=function(field){
return this.header[field.toLowerCase()];};














Response.prototype.setHeaderProperties=function(header){

var ct=this.header['content-type']||'';
this.type=type(ct);


var obj=params(ct);
for(var key in obj){this[key]=obj[key];}};













Response.prototype.parseBody=function(str){
var parse=request.parse[this.type];
return parse&&str&&(str.length||str instanceof Object)?
parse(str):
null;};























Response.prototype.setStatusProperties=function(status){

if(status===1223){
status=204;}


var type=status/100|0;


this.status=this.statusCode=status;
this.statusType=type;


this.info=1==type;
this.ok=2==type;
this.clientError=4==type;
this.serverError=5==type;
this.error=4==type||5==type?
this.toError():
false;


this.accepted=202==status;
this.noContent=204==status;
this.badRequest=400==status;
this.unauthorized=401==status;
this.notAcceptable=406==status;
this.notFound=404==status;
this.forbidden=403==status;};









Response.prototype.toError=function(){
var req=this.req;
var method=req.method;
var url=req.url;

var msg='cannot '+method+' '+url+' ('+this.status+')';
var err=new Error(msg);
err.status=this.status;
err.method=method;
err.url=url;

return err;};






request.Response=Response;









function Request(method,url){
var self=this;
Emitter.call(this);
this._query=this._query||[];
this.method=method;
this.url=url;
this.header={};
this._header={};
this.on('end',function(){
var err=null;
var res=null;

try{
res=new Response(self);}
catch(e){
err=new Error('Parser is unable to parse the response');
err.parse=true;
err.original=e;

err.rawResponse=self.xhr&&self.xhr.responseText?self.xhr.responseText:null;
return self.callback(err);}


self.emit('response',res);

if(err){
return self.callback(err,res);}


if(res.status>=200&&res.status<300){
return self.callback(err,res);}


var new_err=new Error(res.statusText||'Unsuccessful HTTP response');
new_err.original=err;
new_err.response=res;
new_err.status=res.status;

self.callback(new_err,res);});}







Emitter(Request.prototype);





Request.prototype.use=function(fn){
fn(this);
return this;};










Request.prototype.timeout=function(ms){
this._timeout=ms;
return this;};









Request.prototype.clearTimeout=function(){
this._timeout=0;
clearTimeout(this._timer);
return this;};









Request.prototype.abort=function(){
if(this.aborted)return;
this.aborted=true;
this.xhr.abort();
this.clearTimeout();
this.emit('abort');
return this;};






















Request.prototype.set=function(field,val){
if(isObject(field)){
for(var key in field){
this.set(key,field[key]);}

return this;}

this._header[field.toLowerCase()]=val;
this.header[field]=val;
return this;};
















Request.prototype.unset=function(field){
delete this._header[field.toLowerCase()];
delete this.header[field];
return this;};










Request.prototype.getHeader=function(field){
return this._header[field.toLowerCase()];};
























Request.prototype.type=function(type){
this.set('Content-Type',request.types[type]||type);
return this;};











Request.prototype.parse=function(fn){
this._parser=fn;
return this;};






















Request.prototype.accept=function(type){
this.set('Accept',request.types[type]||type);
return this;};











Request.prototype.auth=function(user,pass){
var str=btoa(user+':'+pass);
this.set('Authorization','Basic '+str);
return this;};
















Request.prototype.query=function(val){
if('string'!=typeof val)val=serialize(val);
if(val)this._query.push(val);
return this;};


















Request.prototype.field=function(name,val){
if(!this._formData)this._formData=new root.FormData();
this._formData.append(name,val);
return this;};



















Request.prototype.attach=function(field,file,filename){
if(!this._formData)this._formData=new root.FormData();
this._formData.append(field,file,filename||file.name);
return this;};










































Request.prototype.send=function(data){
var obj=isObject(data);
var type=this.getHeader('Content-Type');


if(obj&&isObject(this._data)){
for(var key in data){
this._data[key]=data[key];}}else 

if('string'==typeof data){
if(!type)this.type('form');
type=this.getHeader('Content-Type');
if('application/x-www-form-urlencoded'==type){
this._data=this._data?
this._data+'&'+data:
data;}else 
{
this._data=(this._data||'')+data;}}else 

{
this._data=data;}


if(!obj||isHost(data))return this;
if(!type)this.type('json');
return this;};











Request.prototype.callback=function(err,res){
var fn=this._callback;
this.clearTimeout();
fn(err,res);};








Request.prototype.crossDomainError=function(){
var err=new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
err.crossDomain=true;

err.status=this.status;
err.method=this.method;
err.url=this.url;

this.callback(err);};








Request.prototype.timeoutError=function(){
var timeout=this._timeout;
var err=new Error('timeout of '+timeout+'ms exceeded');
err.timeout=timeout;
this.callback(err);};













Request.prototype.withCredentials=function(){
this._withCredentials=true;
return this;};











Request.prototype.end=function(fn){
var self=this;
var xhr=this.xhr=request.getXHR();
var query=this._query.join('&');
var timeout=this._timeout;
var data=this._formData||this._data;


this._callback=fn||noop;


xhr.onreadystatechange=function(){
if(4!=xhr.readyState)return;



var status;
try{status=xhr.status;}catch(e){status=0;}

if(0==status){
if(self.timedout)return self.timeoutError();
if(self.aborted)return;
return self.crossDomainError();}

self.emit('end');};



var handleProgress=function(e){
if(e.total>0){
e.percent=e.loaded/e.total*100;}

e.direction='download';
self.emit('progress',e);};

if(this.hasListeners('progress')){
xhr.onprogress=handleProgress;}

try{
if(xhr.upload&&this.hasListeners('progress')){
xhr.upload.onprogress=handleProgress;}}

catch(e){}






if(timeout&&!this._timer){
this._timer=setTimeout(function(){
self.timedout=true;
self.abort();},
timeout);}



if(query){
query=request.serializeObject(query);
this.url+=~this.url.indexOf('?')?
'&'+query:
'?'+query;}



xhr.open(this.method,this.url,true);


if(this._withCredentials)xhr.withCredentials=true;


if('GET'!=this.method&&'HEAD'!=this.method&&'string'!=typeof data&&!isHost(data)){

var contentType=this.getHeader('Content-Type');
var serialize=this._parser||request.serialize[contentType?contentType.split(';')[0]:''];
if(!serialize&&isJSON(contentType))serialize=request.serialize['application/json'];
if(serialize)data=serialize(data);}



for(var field in this.header){
if(null==this.header[field])continue;
xhr.setRequestHeader(field,this.header[field]);}



this.emit('request',this);



xhr.send(typeof data!=='undefined'?data:null);
return this;};










Request.prototype.then=function(fulfill,reject){
return this.end(function(err,res){
err?reject(err):fulfill(res);});};







request.Request=Request;
















function request(method,url){

if('function'==typeof url){
return new Request('GET',method).end(url);}



if(1==arguments.length){
return new Request('GET',method);}


return new Request(method,url);}












request.get=function(url,data,fn){
var req=request('GET',url);
if('function'==typeof data)fn=data,data=null;
if(data)req.query(data);
if(fn)req.end(fn);
return req;};












request.head=function(url,data,fn){
var req=request('HEAD',url);
if('function'==typeof data)fn=data,data=null;
if(data)req.send(data);
if(fn)req.end(fn);
return req;};











function del(url,fn){
var req=request('DELETE',url);
if(fn)req.end(fn);
return req;}
;

request['del']=del;
request['delete']=del;











request.patch=function(url,data,fn){
var req=request('PATCH',url);
if('function'==typeof data)fn=data,data=null;
if(data)req.send(data);
if(fn)req.end(fn);
return req;};












request.post=function(url,data,fn){
var req=request('POST',url);
if('function'==typeof data)fn=data,data=null;
if(data)req.send(data);
if(fn)req.end(fn);
return req;};












request.put=function(url,data,fn){
var req=request('PUT',url);
if('function'==typeof data)fn=data,data=null;
if(data)req.send(data);
if(fn)req.end(fn);
return req;};






module.exports=request;
});
__d('HomyPiAndroid/js/components/alarms/Alarm.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);

var _reactNativeMaterialKit=require("react-native-material-kit/lib/index.js");

var SwitchAndroid=require("SwitchAndroid");

var Dimensions=require("Dimensions");
var window=Dimensions.get("window");var 


View=_reactNative2.default.View;var 
Text=_reactNative2.default.Text;var 
StyleSheet=_reactNative2.default.StyleSheet;var 
TouchableOpacity=_reactNative2.default.TouchableOpacity;var 
NativeModules=_reactNative2.default.NativeModules;


var styles={
container:{
flex:1,
flexDirection:"column"},

header:{
flex:1,
flexDirection:"row"},


alarmBody:{
height:100},

deleteButton:{
width:50,
height:30},

leftContainer:{
flex:3},

date:{
fontSize:40},

rightContainer:{
flex:1,
"alignItems":"center",
"justifyContent":"center"},

separator:{
width:window.width,
height:1,
backgroundColor:"#e9e9e9"}};



var toString=function(hours,minutes){
if(hours<10){
hours="0"+hours;}

if(minutes<10){
minutes="0"+minutes;}

return hours+":"+minutes;};

var ColoredRaisedButton=_reactNativeMaterialKit.MKButton.coloredButton().
withText("Delete").
withOnPress(function(){}).
build();var 


Alarm=function(_React$Component){babelHelpers.inherits(Alarm,_React$Component);
function Alarm(props){babelHelpers.classCallCheck(this,Alarm);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Alarm).call(this,
props));
_this.state={
showBody:false};return _this;}babelHelpers.createClass(Alarm,[{key:"toogleBody",value:function toogleBody()


{
this.setState({showBody:!this.state.showBody});}},{key:"editAlarm",value:function editAlarm()

{var _props=
this.props;var raspberry=_props.raspberry;var alarm=_props.alarm;}},{key:"componentDidMount",value:function componentDidMount()


{
if(!this.props.alarm._id){
this.editAlarm();}}},{key:"enable",value:function enable(


value){var _props2=
this.props;var enableAlarm=_props2.enableAlarm;var alarm=_props2.alarm;
enableAlarm(alarm,value);
this.setState({enabled:value});}},{key:"getBody",value:function getBody()

{var _props3=
this.props;var alarm=_props3.alarm;var deleteAlarm=_props3.deleteAlarm;

return (
_reactNative2.default.createElement(View,{style:styles.alarmBody},
















_reactNative2.default.createElement(ColoredRaisedButton,{onPress:function(){
deleteAlarm(alarm);}})));}},{key:"render",value:function render()




{var _this2=this;var 
alarm=this.props.alarm;
return (
_reactNative2.default.createElement(View,{style:styles.container},
_reactNative2.default.createElement(TouchableOpacity,{
onPress:function(){_this2.toogleBody();}},
_reactNative2.default.createElement(View,{style:styles.header},
_reactNative2.default.createElement(View,{style:styles.leftContainer},
_reactNative2.default.createElement(Text,{style:styles.date},toString(alarm.hours,alarm.minutes))),

_reactNative2.default.createElement(View,{style:styles.rightContainer},
_reactNative2.default.createElement(SwitchAndroid,{
onValueChange:function(value){_this2.enable(value);},
value:alarm.enable})))),



_reactNative2.default.createElement(View,null,
this.state.showBody?this.getBody():null),

_reactNative2.default.createElement(View,{style:styles.separator})));}},{key:"setAlarmState",value:function setAlarmState(



enable){
this.setState({alarmEnabled:enable});}}]);return Alarm;}(_reactNative2.default.Component);exports.default=



Alarm;
});
__d('react-native-refreshable-listview/index.js',function(global, require, module, exports) {  'use strict';module.exports=require('react-native-refreshable-listview/lib/RefreshableListView.js');
});
__d('react-native-refreshable-listview/lib/RefreshableListView.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');var 

PropTypes=
React.PropTypes;
var isPromise=require('is-promise/index.js');
var delay=require('react-native-refreshable-listview/lib/delay.js');
var ListView=require('react-native-refreshable-listview/lib/ListView.js');
var RefreshingIndicator=require('react-native-refreshable-listview/lib/RefreshingIndicator.js');
var ControlledRefreshableListView=require('react-native-refreshable-listview/lib/ControlledRefreshableListView.js');

var LISTVIEW_REF='listview';

var RefreshableListView=React.createClass({displayName:'RefreshableListView',
propTypes:{
loadData:PropTypes.func.isRequired,
minDisplayTime:PropTypes.number,
minBetweenTime:PropTypes.number,

refreshDescription:PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
refreshingIndictatorComponent:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),
minPulldownDistance:PropTypes.number,
renderHeaderWrapper:PropTypes.func},

getDefaultProps:function(){
return {
minDisplayTime:300,
minBetweenTime:300,
minPulldownDistance:40,
refreshingIndictatorComponent:RefreshingIndicator};},


getInitialState:function(){
return {
isRefreshing:false};},


handleRefresh:function(){var _this=this;
if(this.willRefresh)return;

this.willRefresh=true;

var loadingDataPromise=new Promise(function(resolve){
var loadDataReturnValue=_this.props.loadData(resolve);

if(isPromise(loadDataReturnValue)){
loadingDataPromise=loadDataReturnValue;}


Promise.all([
loadingDataPromise,
new Promise(function(resolve){return _this.setState({isRefreshing:true},resolve);}),
delay(_this.props.minDisplayTime)]).

then(function(){return delay(_this.props.minBetweenTime);}).
then(function(){
_this.willRefresh=false;
_this.setState({isRefreshing:false});});});},



getScrollResponder:function(){
return this.refs[LISTVIEW_REF].getScrollResponder();},

setNativeProps:function(props){
this.refs[LISTVIEW_REF].setNativeProps(props);},

render:function(){
return (
React.createElement(ControlledRefreshableListView,babelHelpers.extends({},
this.props,{
ref:LISTVIEW_REF,
onRefresh:this.handleRefresh,
isRefreshing:this.state.isRefreshing})));}});





RefreshableListView.DataSource=ListView.DataSource;
RefreshableListView.RefreshingIndicator=RefreshingIndicator;

module.exports=RefreshableListView;
});
__d('react-native-refreshable-listview/lib/ControlledRefreshableListView.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');var 

PropTypes=
React.PropTypes;
var ListView=require('react-native-refreshable-listview/lib/ListView.js');
var createElementFrom=require('react-native-refreshable-listview/lib/createElementFrom.js');
var RefreshingIndicator=require('react-native-refreshable-listview/lib/RefreshingIndicator.js');

var SCROLL_EVENT_THROTTLE=32;
var MIN_PULLDOWN_DISTANCE=40;

var LISTVIEW_REF='listview';

var ControlledRefreshableListView=React.createClass({displayName:'ControlledRefreshableListView',
propTypes:{
onRefresh:PropTypes.func.isRequired,
isRefreshing:PropTypes.bool.isRequired,
refreshDescription:PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
refreshingIndictatorComponent:PropTypes.oneOfType([PropTypes.func,PropTypes.element]),
minPulldownDistance:PropTypes.number,
ignoreInertialScroll:PropTypes.bool,
scrollEventThrottle:PropTypes.number,
onScroll:PropTypes.func,
renderHeader:PropTypes.func,
renderHeaderWrapper:PropTypes.func,
onResponderGrant:PropTypes.func,
onResponderRelease:PropTypes.func},

getDefaultProps:function(){
return {
minPulldownDistance:MIN_PULLDOWN_DISTANCE,
scrollEventThrottle:SCROLL_EVENT_THROTTLE,
ignoreInertialScroll:true,
refreshingIndictatorComponent:RefreshingIndicator};},


handleScroll:function(e){
var scrollY=e.nativeEvent.contentInset.top+e.nativeEvent.contentOffset.y;

if(this.isTouching||!this.isTouching&&!this.props.ignoreInertialScroll){
if(scrollY<-this.props.minPulldownDistance){
if(!this.props.isRefreshing){
if(this.props.onRefresh){
this.props.onRefresh();}}}}





this.props.onScroll&&this.props.onScroll(e);},

handleResponderGrant:function(){
this.isTouching=true;
if(this.props.onResponderGrant){
this.props.onResponderGrant.apply(null,arguments);}},


handleResponderRelease:function(){
this.isTouching=false;
if(this.props.onResponderRelease){
this.props.onResponderRelease.apply(null,arguments);}},


getScrollResponder:function(){
return this.refs[LISTVIEW_REF].getScrollResponder();},

setNativeProps:function(props){
this.refs[LISTVIEW_REF].setNativeProps(props);},

renderHeader:function(){
var description=this.props.refreshDescription;

var refreshingIndictator;
if(this.props.isRefreshing){
refreshingIndictator=createElementFrom(this.props.refreshingIndictatorComponent,{description:description});}else 
{
refreshingIndictator=null;}


if(this.props.renderHeaderWrapper){
return this.props.renderHeaderWrapper(refreshingIndictator);}else 
if(this.props.renderHeader){
console.warn('renderHeader is deprecated. Use renderHeaderWrapper instead.');
return this.props.renderHeader(refreshingIndictator);}else 
{
return refreshingIndictator;}},


render:function(){
return (
React.createElement(ListView,babelHelpers.extends({},
this.props,{
ref:LISTVIEW_REF,
onScroll:this.handleScroll,
renderHeader:this.renderHeader,
scrollEventThrottle:this.props.scrollEventThrottle,
onResponderGrant:this.handleResponderGrant,
onResponderRelease:this.handleResponderRelease})));}});





ControlledRefreshableListView.DataSource=ListView.DataSource;
ControlledRefreshableListView.RefreshingIndicator=RefreshingIndicator;

module.exports=ControlledRefreshableListView;
});
__d('HomyPiAndroid/js/components/music/playerHeader.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});








var _reactNativeRouterFlux=require("react-native-router-flux/index.js");

var _reactRedux=require("react-redux/lib/index.js");
var _onSelectedRaspberryChange=require("HomyPiAndroid/js/onSelectedRaspberryChange.js");

var _Constants=require("HomyPiAndroid/js/Constants.js");

var _PlayPause=require("HomyPiAndroid/js/components/music/PlayPause.js");var _PlayPause2=babelHelpers.interopRequireDefault(_PlayPause);
var _io=require("HomyPiAndroid/js/io.js");var _io2=babelHelpers.interopRequireDefault(_io);var React=require("react-native/Libraries/react-native/react-native.js");var TouchableHighlight=React.TouchableHighlight;var StyleSheet=React.StyleSheet;var Text=React.Text;var Image=React.Image;var View=React.View;



var PlayerHeader=React.createClass({displayName:"PlayerHeader",
componentDidMount:function(){},


componentWillUnmount:function(){},

render:function(){var _props=



this.props;var player=_props.player;var playing=_props.playing;
return (
React.createElement(View,{style:this.styles.container},
React.createElement(TouchableHighlight,{
style:this.styles.coverContainer,
onPress:this._showPlayer},
playing.album&&playing.album.images&&playing.album.images.length?
React.createElement(Image,{
style:this.styles.cover,
resizeMode:Image.resizeMode.contain,
source:{uri:playing.album.images[0].url}}):
null),

React.createElement(TouchableHighlight,{
style:this.styles.trackInfoHighlight,
onPress:this._showPlayer},
React.createElement(View,{style:this.styles.trackInfo},
React.createElement(Text,{numberOfLines:1,style:this.styles.trackName},playing.name),
React.createElement(Text,{numberOfLines:1,style:this.styles.artists},playing.artists.map(function(artist){return artist.name+"; ";})))),


React.createElement(_PlayPause2.default,{dispatch:this.props.dispatch,player:player,style:{},styleImg:{width:35,height:35}})));},



_showPlayer:function(){
_reactNativeRouterFlux.Actions.player();},

styles:StyleSheet.create({
container:{
height:_Constants.PLAYER_HEADER_HEIGHT,
alignItems:"center",
flexDirection:"row",
backgroundColor:_Constants.palette.PLAYER_BACKGROUND,
paddingLeft:0},

coverContainer:{
flex:0.15},

cover:{
height:_Constants.PLAYER_HEADER_HEIGHT,
width:_Constants.PLAYER_HEADER_HEIGHT,
justifyContent:"flex-start"},

trackInfoHighlight:{
flex:0.5,
alignSelf:"center"},

trackInfo:{
flexDirection:"column"},

trackName:{
color:_Constants.palette.PRIMARY_TEXT_COLOR,
fontFamily:"RobotoCondensed-Bold",
fontSize:14,
flex:0.5},

artists:{
color:_Constants.palette.PRIMARY_TEXT_COLOR,
fontFamily:"Roboto-Thin",
fontSize:15,
flex:0.5}})});





function mapStateToProps(state){var 
player=state.player;var playlist=state.playlist;var user=state.user;
return {
user:user,
player:player,
playing:playlist.playing};}exports.default=



(0,_reactRedux.connect)(mapStateToProps)(PlayerHeader);
});
__d('HomyPiAndroid/js/components/music/TrackSearch.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);










var _reactRedux=require("react-redux/lib/index.js");
var _MusicSearchActions=require("HomyPiAndroid/js/actions/MusicSearchActions.js");

var _Constants=require("HomyPiAndroid/js/Constants.js");

var _reactNativeMaterialKit=require("react-native-material-kit/lib/index.js");

var _trackItem=require("HomyPiAndroid/js/components/music/trackItem.js");var _trackItem2=babelHelpers.interopRequireDefault(_trackItem);var Component=_reactNative2.default.Component;var ListView=_reactNative2.default.ListView;var Text=_reactNative2.default.Text;var View=_reactNative2.default.View;var TouchableOpacity=_reactNative2.default.TouchableOpacity;var Image=_reactNative2.default.Image;var InteractionManager=_reactNative2.default.InteractionManager;

var Dimensions=require("Dimensions");
var window=Dimensions.get("window");

var styles={
container:{
flex:1,
paddingLeft:5,
paddingRight:5},

searchButton:{
flex:0.15},

searchButtonImg:{
height:40,
width:40,
alignSelf:"center"},

form:{
height:50,
flexDirection:"row",
alignItems:"center"},

input:{
flex:1},

scrollView:{}};


var load=false;var 
TrackSearch=function(_Component){babelHelpers.inherits(TrackSearch,_Component);
function TrackSearch(props){babelHelpers.classCallCheck(this,TrackSearch);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TrackSearch).call(this,
props));
_this.state={
search:props.search||""};

_this.ds=new ListView.DataSource({rowHasChanged:function(r1,r2){return r1!==r2;}});

_this._handleSearch=function(){
if(_this.state.search){
_this.props.dispatch((0,_MusicSearchActions.search)(_this.props.user,_this.props.search,"track",30));}};return _this;}babelHelpers.createClass(TrackSearch,[{key:"componentWillMount",value:function componentWillMount()



{
this._handleSearch();}},{key:"componentDidMount",value:function componentDidMount()

{
InteractionManager.runAfterInteractions(function(){});}},{key:"componentDidUpdate",value:function componentDidUpdate(



prevProps){
return;
if(this.props.routeReady&&prevProps.routeReady!=this.props.routeReady){
if(this.state.search){
this._handleSearch();}}}},{key:"render",value:function render()



{var _this2=this;var 
search=this.state.search;var 
items=this.props.searchTracks.items;
this.ds=this.ds.cloneWithRows(items);
return (
_reactNative2.default.createElement(View,{style:styles.container},
_reactNative2.default.createElement(View,{style:styles.form},
_reactNative2.default.createElement(_reactNativeMaterialKit.MKTextField,{
style:styles.input,
tintColor:_reactNativeMaterialKit.MKColor.Blue,
textInputStyle:{color:_reactNativeMaterialKit.MKColor.BlueGrey},
placeholder:search||"Search",
onChangeText:function(search){return _this2.setState({search:search});}}),
_reactNative2.default.createElement(TouchableOpacity,{
style:styles.searchButton,
onPress:function(){return _this2._handleSearch();}},
_reactNative2.default.createElement(Image,{style:styles.searchButtonImg,resizeMode:Image.resizeMode.contain,source:require("image!ic_search")}))),


_reactNative2.default.createElement(ListView,{
style:styles.scrollView,
dataSource:this.ds,
horizontal:false,
onEndReachedThreshold:_Constants.PLAYER_HEADER_HEIGHT*2.5,
renderRow:function(track){return _reactNative2.default.createElement(_trackItem2.default,{key:track._id,track:track,showCover:true,key:track.id});},
onEndReached:function(){_this2._loadMore();}})));}},{key:"_loadMore",value:function _loadMore()




{var _props$searchTracks=

this.props.searchTracks;var isFetching=_props$searchTracks.isFetching;var items=_props$searchTracks.items;var _props=
this.props;var dispatch=_props.dispatch;var user=_props.user;
if(!isFetching){
dispatch((0,_MusicSearchActions.search)(user,this.props.search,"track",25,items.length));}}}]);return TrackSearch;}(Component);



TrackSearch.defaultProps={
search:""};

function mapStateToProps(state){var 
user=state.user;var searchTracks=state.searchTracks;
return {
searchTracks:searchTracks,
user:user};}exports.default=



(0,_reactRedux.connect)(mapStateToProps)(TrackSearch);
});
__d('HomyPiAndroid/js/components/music/AlbumSearch.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);







var _reactRedux=require("react-redux/lib/index.js");
var _MusicSearchActions=require("HomyPiAndroid/js/actions/MusicSearchActions.js");


var _albumItem=require("HomyPiAndroid/js/components/music/albumItem.js");var _albumItem2=babelHelpers.interopRequireDefault(_albumItem);var Component=_reactNative2.default.Component;var ListView=_reactNative2.default.ListView;var Text=_reactNative2.default.Text;var InteractionManager=_reactNative2.default.InteractionManager;
var GridView=require("react-native-grid-view/index.js");

var Dimensions=require("Dimensions");
var window=Dimensions.get("window");

var styles={
albumsGrid:{
flex:1,
height:window.height-500}};


var load=false;var 
AlbumSearch=function(_Component){babelHelpers.inherits(AlbumSearch,_Component);
function AlbumSearch(props){babelHelpers.classCallCheck(this,AlbumSearch);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AlbumSearch).call(this,
props));

_this._playAlbum=function(album){};return _this;}babelHelpers.createClass(AlbumSearch,[{key:"componentDidMount",value:function componentDidMount()



{var _this2=this;
InteractionManager.runAfterInteractions(function(){
if(_this2.props.search)
_this2.props.dispatch((0,_MusicSearchActions.search)(_this2.props.user,_this2.props.search,"album",30));});}},{key:"render",value:function render()


{var _this3=this;var 
items=this.props.searchAlbums.items;
return (
_reactNative2.default.createElement(GridView,{
style:styles.albumsGrid,
items:items,
itemsPerRow:2,
renderItem:this.renderAlbumItem,
onEndReached:function(){_this3._loadMore();}}));}},{key:"renderAlbumItem",value:function renderAlbumItem(




result){
return (
_reactNative2.default.createElement(_albumItem2.default,{key:result._id,album:result,playAlbum:this._playAlbum}));}},{key:"_loadMore",value:function _loadMore()


{var _props$searchAlbums=
this.props.searchAlbums;var isFetching=_props$searchAlbums.isFetching;var items=_props$searchAlbums.items;

if(!isFetching){
this.props.dispatch((0,_MusicSearchActions.search)(this.props.user,this.props.search,"album",15,items.length));}}}]);return AlbumSearch;}(Component);



AlbumSearch.defaultProps={
search:""};

function mapStateToProps(state){var 
user=state.user;var searchAlbums=state.searchAlbums;
return {
user:user,
searchAlbums:searchAlbums};}exports.default=



(0,_reactRedux.connect)(mapStateToProps)(AlbumSearch);
});
__d('HomyPiAndroid/js/components/music/albumItem.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);








var _SocketConnection=require("HomyPiAndroid/js/natives/SocketConnection.js");var _SocketConnection2=babelHelpers.interopRequireDefault(_SocketConnection);

var _io=require("HomyPiAndroid/js/io.js");var _io2=babelHelpers.interopRequireDefault(_io);var View=_reactNative2.default.View;var Image=_reactNative2.default.Image;var Text=_reactNative2.default.Text;var StyleSheet=_reactNative2.default.StyleSheet;var TouchableNativeFeedback=_reactNative2.default.TouchableNativeFeedback;var publish=_SocketConnection2.default.publish;

var window=require("Dimensions").get("window");

var CONTAINER_WIDTH=window.width/2-20;

var styles=StyleSheet.create({
container:{
alignItems:"center",
flexDirection:"column",
backgroundColor:"white",
elevation:2,
width:CONTAINER_WIDTH,
marginTop:5,
marginLeft:5,
marginRight:5,
marginBottom:5},


cover:{
height:125,
width:CONTAINER_WIDTH},

coverContainer:{
flex:1},


info:{
height:50,
alignItems:"flex-start",
alignSelf:"flex-start",
marginLeft:5,
marginRight:5},

albumName:{
flex:0.20,
fontFamily:"RobotoCondensed-Bold"},

artistName:{
flex:0.20}});var 



AlbumItem=function(_React$Component){babelHelpers.inherits(AlbumItem,_React$Component);
function AlbumItem(props){babelHelpers.classCallCheck(this,AlbumItem);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AlbumItem).call(this,
props));
_this.pressStart=0;
_this.coverDimensions={px:0,py:0,width:0,height:0};return _this;}babelHelpers.createClass(AlbumItem,[{key:"componentDidUpdate",value:function componentDidUpdate()


{var _this2=this;
this.refs.cover.measure(function(fx,fy,width,height,px,py){

_this2.coverDimensions={px:px,py:py,width:width,height:height};});}},{key:"getImageSource",value:function getImageSource(


album){
if(album.images.length&&album.images[0].url){
return {uri:album.images[0].url};}

return require("image!default_cover");}},{key:"render",value:function render()

{var _this3=this;var 
album=this.props.album;
return (
_reactNative2.default.createElement(TouchableNativeFeedback,{
delayLongPress:3000,
onPress:function(){_this3.handlePress();},
onLongPress:function(){_this3.handleLongPress();},
background:TouchableNativeFeedback.SelectableBackground()},
_reactNative2.default.createElement(View,{style:styles.container},
_reactNative2.default.createElement(View,{style:styles.coverContainer},
_reactNative2.default.createElement(Image,{ref:"cover",style:styles.cover,source:this.getImageSource(album)})),

_reactNative2.default.createElement(View,{style:styles.info},
_reactNative2.default.createElement(Text,{style:styles.albumName,numberOfLines:2},album.name)))));}},{key:"handlePress",value:function handlePress()






{
this.props.gotoDetails(this.props.album,this.coverDimensions);}},{key:"handleLongPress",value:function handleLongPress()

{

this.playAlbum();}},{key:"playAlbum",value:function playAlbum()

{var _props=

this.props;var album=_props.album;var player=_props.player;
if(!player)return;
publish("raspberry:"+player.name,"player:play:track",{
source:"spotify",
album:{
serviceId:album.serviceId,
uri:album.uri}});}}]);return AlbumItem;}(_reactNative2.default.Component);





AlbumItem.defaultProps={
album:{
images:[{url:""}],
name:"untitled"},

gotoDetails:function(){}};exports.default=

AlbumItem;
});
__d('HomyPiAndroid/js/components/music/AlbumDetails.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);











var _io=require("HomyPiAndroid/js/io.js");var _io2=babelHelpers.interopRequireDefault(_io);
var _trackItem=require("HomyPiAndroid/js/components/music/trackItem.js");var _trackItem2=babelHelpers.interopRequireDefault(_trackItem);

var _settings=require("HomyPiAndroid/js/settings.js");var _settings2=babelHelpers.interopRequireDefault(_settings);
var _reactRedux=require("react-redux/lib/index.js");

var _SocketConnection=require("HomyPiAndroid/js/natives/SocketConnection.js");var _SocketConnection2=babelHelpers.interopRequireDefault(_SocketConnection);


var _Constants=require("HomyPiAndroid/js/Constants.js");var View=_reactNative2.default.View;var ScrollView=_reactNative2.default.ScrollView;var Animated=_reactNative2.default.Animated;var Image=_reactNative2.default.Image;var Text=_reactNative2.default.Text;var StyleSheet=_reactNative2.default.StyleSheet;var TouchableNativeFeedback=_reactNative2.default.TouchableNativeFeedback;var InteractionManager=_reactNative2.default.InteractionManager;var publishToPi=_SocketConnection2.default.publishToPi;

var Dimensions=require("Dimensions");
var window=Dimensions.get("window");

var styles=StyleSheet.create({
container:{
flex:1,
flexDirection:"column"},

coverContainer:{
flex:1,
alignItems:"center",
marginBottom:40,
width:window.width,
height:3*window.height/5},

cover:{
width:window.width,
height:3*window.height/5},

playContainer:{
position:"absolute",
width:60,
height:60,
borderRadius:30,
backgroundColor:_Constants.palette.ACCENT_COLOR,
top:3*window.height/5-30,
left:window.width-75},

playbutton:{
width:65,
height:65},

playButtonImg:{
width:60,
height:60},

albumInfo:{
marginLeft:15,
marginRight:10,
marginBottom:25},

albumName:{
fontSize:30},

artistName:{
fontSize:20,
color:"grey"},

trackList:{
marginLeft:15,
marginRight:10}});



var NO_DATA_ALBUM={
album:{}};var 


AlbumDetails=function(_React$Component){babelHelpers.inherits(AlbumDetails,_React$Component);
function AlbumDetails(props){babelHelpers.classCallCheck(this,AlbumDetails);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AlbumDetails).call(this,
props));
_this.state={
album:babelHelpers.extends({
source:"spotify",
images:[],
artists:[],
tracks:{items:[]}},
_this.props.album),

showCover:false,
playButtonScale:new Animated.Value(0)};return _this;}babelHelpers.createClass(AlbumDetails,[{key:"componentWillMount",value:function componentWillMount()


{var _this2=this;var _props=
this.props;var annimatedCover=_props.annimatedCover;var removeFrontComponent=_props.removeFrontComponent;
console.log("get album data");
this.getAlbumData(function(albumData){
console.log("got data");
InteractionManager.runAfterInteractions(function(){
console.log("remove animated cover");
if(annimatedCover)
removeFrontComponent(annimatedCover);
_this2._animatePlayButton();
_this2.setState({showCover:true,"album":albumData});});});



if(annimatedCover){
requestAnimationFrame(function(){
console.log("add animated cover");
_this2.props.addFrontComponent(annimatedCover);});}}},{key:"componentDidMount",value:function componentDidMount()





{}},{key:"getAlbumData",value:function getAlbumData(


callback){var _state$album=
this.state.album;var serviceId=_state$album.serviceId;var source=_state$album.source;
fetch(_settings2.default.getServerUrl()+"/api/modules/music/"+source+"/albums/"+serviceId,{
headers:{
"Accept":"application/json",
"Content-Type":"application/json",
"Authorization":"Bearer "+this.props.user.token}}).


then(function(response){return response.json();}).
then(function(json){
if(json.status==="error"){}else 

{
callback(json.data);}});}},{key:"getImageSource",value:function getImageSource(



album){
console.log("get source");
if(album.images.length&&album.images[0].url){
return {uri:album.images[0].url};}

return require("image!default_cover");}},{key:"render",value:function render()

{var _this3=this;var 
album=this.state.album;
return (
_reactNative2.default.createElement(ScrollView,{showsVerticalScrollIndicator:this.state.showCover,style:styles.container},
_reactNative2.default.createElement(View,{style:styles.coverContainer},
this.state.showCover&&
_reactNative2.default.createElement(Animated.Image,{ref:"cover",style:styles.cover,
source:this.getImageSource(album)})),


_reactNative2.default.createElement(View,{style:styles.albumInfo},
_reactNative2.default.createElement(Text,{numberOfLines:1,style:styles.albumName},album.name),
_reactNative2.default.createElement(Text,{numberOfLines:1,style:styles.artistName},album.artists.map(function(artist){return artist.name+"; ";}))),

_reactNative2.default.createElement(View,{style:styles.trackList},

album.tracks.items.map(function(track,key){
return _reactNative2.default.createElement(_trackItem2.default,{key:key,track:track,playTrack:function(track){return _this3._playTrack(track);},addTrack:_this3._addTrackInPlaylist});})),



this.state.showCover&&
_reactNative2.default.createElement(Animated.View,{style:[
styles.playContainer,
{transform:[{scale:this.state.playButtonScale}]}]},

_reactNative2.default.createElement(TouchableNativeFeedback,{
onPress:function(){_this3.playAlbum();},
style:styles.playButton},
_reactNative2.default.createElement(View,{style:styles.playButton},
_reactNative2.default.createElement(Animated.Image,{style:[
styles.playButtonImg,
{transform:[{scale:this.state.playButtonScale}]}],

resizeMode:Image.resizeMode.stretch,
source:require("image!ic_play_circle_outline_black_36dp")}))))));}},{key:"_animatePlayButton",value:function _animatePlayButton()







{
Animated.timing(
this.state.playButtonScale,
{
toValue:1,
duration:750}).

start();}},{key:"playAlbum",value:function playAlbum()

{var _this4=this;
this.state.playButtonScale.setValue(1.1);
Animated.spring(
this.state.playButtonScale,
{
toValue:1,
friction:5}).

start(function(){var 
album=_this4.state.album;
publishToPi("player:play:track",{
source:"spotify",
album:{
serviceId:album.serviceId,
uri:album.uri}});});}},{key:"_playTrack",value:function _playTrack(




track){var 
album=this.state.album;
if(!album.serviceId||!album.uri||!track._id){

return;}

publishToPi("player:play:track",{
source:"spotify",
album:{
serviceId:album.serviceId,
uri:album.uri},

startAtTrack:track.serviceId});}}]);return AlbumDetails;}(_reactNative2.default.Component);




AlbumDetails.defaultProps={};

function mapStateToProps(state){
return {
user:state.user};}exports.default=



(0,_reactRedux.connect)(mapStateToProps)(AlbumDetails);
});
__d('HomyPiAndroid/js/components/music/trackItem.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);var 

View=_reactNative2.default.View;var 
Text=_reactNative2.default.Text;var 
StyleSheet=_reactNative2.default.StyleSheet;var 
Image=_reactNative2.default.Image;var 
TouchableOpacity=_reactNative2.default.TouchableOpacity;var 
Picker=_reactNative2.default.Picker;var _require=








require("react-native-dropdown/lib/index.js");var Select=_require.Select;var Option=_require.Option;var OptionList=_require.OptionList;var updatePosition=_require.updatePosition;

var parseMs=function(ms){
var min=ms/1000/60<<0;
var sec=Math.floor(ms/1000%60);
return min+":"+sec;};


var styles=StyleSheet.create({
container:{
flex:1,
paddingLeft:10,
paddingRight:10,
alignItems:"center",
flexDirection:"row",
justifyContent:"center",
backgroundColor:"white",
height:55},

trackInfo:{
flex:1,
flexDirection:"column"},

cover:{
width:50,
height:50,
marginRight:10},

title:{
flex:1,
fontSize:16},

trackData:{
flex:1,
flexDirection:"row"},

artistsNames:{
flex:1,
fontSize:12},

dropDown:{
position:"absolute",
right:0,
top:30,
width:100,
height:300,
backgroundColor:"#e9e9e9",
transform:[{"translate":[0,0,1]}]}});var 



TrackItem=function(_React$Component){babelHelpers.inherits(TrackItem,_React$Component);
function TrackItem(props){babelHelpers.classCallCheck(this,TrackItem);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TrackItem).call(this,
props));
_this.state={
showMenu:false};


_this.showMenu=function(){
_this.setState({showMenu:true});};


_this.menuCallback=function(){};return _this;}babelHelpers.createClass(TrackItem,[{key:"renderMenu",value:function renderMenu()



{var _this2=this;
return (
_reactNative2.default.createElement(Picker,{
selectedValue:"js",
onValueChange:function(lang){return _this2.setState({language:lang});},
style:{width:100,height:100}},
_reactNative2.default.createElement(Picker.Item,{label:"Javall",value:"java"}),
_reactNative2.default.createElement(Picker.Item,{label:"JavaScript",value:"js"})));}},{key:"render",value:function render()



{var _props=
this.props;var track=_props.track;var playTrack=_props.playTrack;var showCover=_props.showCover;
return (
_reactNative2.default.createElement(View,{style:styles.container},
showCover?_reactNative2.default.createElement(Image,{style:styles.cover,source:{uri:track.album.images[0].url}}):null,
_reactNative2.default.createElement(View,{style:styles.trackInfo},
_reactNative2.default.createElement(TouchableOpacity,{
style:styles.trackInfo,
onPress:function(){return playTrack(track);}},

_reactNative2.default.createElement(Text,{numberOfLines:1,style:styles.title},track.name),
_reactNative2.default.createElement(View,{style:styles.trackData},
_reactNative2.default.createElement(Text,{style:styles.artistsNames},
track.artists.map(function(artist){
return artist.name+";";}))))),





_reactNative2.default.createElement(Text,{style:styles.duration},parseMs(track.duration_ms))));}}]);return TrackItem;}(_reactNative2.default.Component);









;exports.default=

TrackItem;
});
__d('react-native-dropdown/lib/select.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');
var Option=require('react-native-dropdown/lib/option.js');var 


Dimensions=




React.Dimensions;var StyleSheet=React.StyleSheet;var Component=React.Component;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;var View=React.View;

var window=Dimensions.get('window');

var SELECT='SELECT';

var styles=StyleSheet.create({
container:{
borderColor:'#BDBDC1',
borderWidth:2/window.scale}});var 



Select=function(_Component){babelHelpers.inherits(Select,_Component);
function Select(props){babelHelpers.classCallCheck(this,Select);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Select).call(this,
props));

_this.pageX=0;
_this.pageY=0;

var defaultValue=props.defaultValue;

if(!defaultValue){
if(Array.isArray(props.children)){
defaultValue=props.children[0].props.children;}else 
{
defaultValue=props.children.props.children;}}



_this.state={
value:defaultValue};return _this;}babelHelpers.createClass(Select,[{key:'reset',value:function reset()



{var 
defaultValue=this.props.defaultValue;
this.setState({value:defaultValue});}},{key:'_currentPosition',value:function _currentPosition(


pageX,pageY){
this.pageX=pageX;
this.pageY=pageY+this.props.height;}},{key:'_onPress',value:function _onPress()


{var _this2=this;var _props=
this.props;var optionListRef=_props.optionListRef;var children=_props.children;var onSelect=_props.onSelect;var width=_props.width;var height=_props.height;

if(!children.length){
return false;}


optionListRef()._show(children,this.pageX,this.pageY,width,height,function(item){var value=arguments.length<=1||arguments[1]===undefined?item:arguments[1];
if(item){
onSelect(value);
_this2.setState({
value:item});}});}},{key:'render',value:function render()





{var _props2=
this.props;var width=_props2.width;var height=_props2.height;var children=_props2.children;var defaultValue=_props2.defaultValue;var style=_props2.style;var styleOption=_props2.styleOption;var styleText=_props2.styleText;
var dimensions={width:width,height:height};

return (
React.createElement(TouchableWithoutFeedback,{onPress:this._onPress.bind(this)},
React.createElement(View,{ref:SELECT,style:[styles.container,style,dimensions]},
React.createElement(Option,{style:styleOption,styleText:styleText},this.state.value))));}}]);return Select;}(Component);






Select.propTypes={
width:React.PropTypes.number,
height:React.PropTypes.number,
optionListRef:React.PropTypes.func.isRequired,
onSelect:React.PropTypes.func};


Select.defaultProps={
width:200,
height:40,
onSelect:function(){}};


module.exports=Select;
});
__d('react-native-dropdown/lib/index.js',function(global, require, module, exports) {  'use strict';var Option=require('react-native-dropdown/lib/option.js');
var OptionList=require('react-native-dropdown/lib/optionList.js');
var Select=require('react-native-dropdown/lib/select.js');
var updatePosition=require('react-native-dropdown/lib/updatePosition.js');


module.exports={
Option:Option,
OptionList:OptionList,
Select:Select,
updatePosition:updatePosition};
});
__d('react-native-dropdown/lib/optionList.js',function(global, require, module, exports) {  'use strict';var React=require('react-native/Libraries/react-native/react-native.js');
var Overlay=require('react-native-dropdown/lib/overlay.js');
var Items=require('react-native-dropdown/lib/items.js');var 


Dimensions=



React.Dimensions;var StyleSheet=React.StyleSheet;var Component=React.Component;var View=React.View;

var window=Dimensions.get('window');var 

OptionList=function(_Component){babelHelpers.inherits(OptionList,_Component);
function OptionList(props){babelHelpers.classCallCheck(this,OptionList);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(OptionList).call(this,
props));

_this.state={
show:false,

width:0,
height:0,

pageX:0,
pageY:0,

positionX:0,
positionY:0,

items:[],
onSelect:function(){}};return _this;}babelHelpers.createClass(OptionList,[{key:'_currentPosition',value:function _currentPosition(



pageX,pageY){
this.setState(babelHelpers.extends({},
this.state,{
pageX:pageX,
pageY:pageY}));}},{key:'_show',value:function _show(



items,positionX,positionY,width,height,onSelect){
positionX=positionX-this.state.pageX;
positionY=positionY-this.state.pageY;

this.setState(babelHelpers.extends({},
this.state,{
positionX:positionX,
positionY:positionY,
width:width,
height:height,
items:items,
onSelect:onSelect,
show:true}));}},{key:'_onOverlayPress',value:function _onOverlayPress()



{var 
onSelect=this.state.onSelect;
onSelect(null,null);

this.setState(babelHelpers.extends({},
this.state,{
show:false}));}},{key:'_onItemPress',value:function _onItemPress(



item,value){var 
onSelect=this.state.onSelect;
onSelect(item,value);

this.setState(babelHelpers.extends({},
this.state,{
show:false}));}},{key:'render',value:function render()



{var _state=









this.state;var items=_state.items;var pageX=_state.pageX;var pageY=_state.pageY;var positionX=_state.positionX;var positionY=_state.positionY;var width=_state.width;var height=_state.height;var show=_state.show;

return (
React.createElement(View,null,
React.createElement(Overlay,{
pageX:pageX,
pageY:pageY,
show:show,
onPress:this._onOverlayPress.bind(this)}),
React.createElement(Items,{
items:items,
positionX:positionX,
positionY:positionY,
width:width,
height:height,
show:show,
onPress:this._onItemPress.bind(this)})));}}]);return OptionList;}(Component);





OptionList.propTypes={};



OptionList.defaultProps={};



module.exports=OptionList;
});
__d('react-native-drawer/index.js',function(global, require, module, exports) {  'use strict';var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);







var _tweener=require('react-native-drawer/tweener.js');var _tweener2=babelHelpers.interopRequireDefault(_tweener);

var deviceScreen=_reactNative.Dimensions.get('window');var 

Drawer=function(_Component){babelHelpers.inherits(Drawer,_Component);














































































function Drawer(props){babelHelpers.classCallCheck(this,Drawer);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Drawer).call(this,
props));_this._left=0;_this._prevLeft=0;_this._offsetOpen=0;_this._offsetClosed=0;_this._open=false;_this._panning=false;_this._tweenPending=false;_this._activeTween=null;_this._lastPress=0;_this._panStartTime=0;_this._syncAfterUpdate=false;_this.






































































































processShouldSet=function(e,gestureState){
var inMask=_this.testPanResponderMask(e,gestureState);
if(inMask){
var toggled=_this.processTapGestures();
if(toggled)return false;
if(_this.props.captureGestures&&_this.props.acceptPan)return true;}

if(_this.props.negotiatePan)return false;
_this._panStartTime=Date.now();
if(!inMask)return false;
if(!_this.props.acceptPan)return false;
_this.terminateActiveTween();
return true;};_this.

























processTapGestures=function(){
if(_this._activeTween)return false;
var minLastPressInterval=500;
if(_this.props.acceptTap){
_this._open?_this.close():_this.open();
return true;}

if(_this.props.tapToClose&&_this._open){
_this.close();
return true;}

if(_this.props.acceptDoubleTap){
var now=new Date().getTime();
var timeDelta=now-_this._lastPress;
_this._lastPress=now;
if(timeDelta<minLastPressInterval){
_this._open?_this.close():_this.open();
return true;}}


return false;};_this.








































terminateActiveTween=function(){
if(_this._activeTween){
_this._activeTween.terminate();
_this._activeTween=null;}};_this.



open=function(){
_this.props.onOpenStart&&_this.props.onOpenStart();
if(_this._activeTween)return;
_this._activeTween=(0,_tweener2.default)({
start:_this._left,
end:_this.getOpenLeft(),
duration:_this.props.tweenDuration,
easingType:_this.props.tweenEasing,
onFrame:function(tweenValue){
_this._left=tweenValue;
_this.updatePosition();},

onEnd:function(){
_this._activeTween=null;
_this._open=true;
_this._prevLeft=_this._left;
if(_this.props.type==='overlay'){
_this.mainOverlay.setNativeProps({style:{width:_this.getMainWidth()}});}

_this.props.onOpen();}});};_this.




close=function(){
_this.props.onCloseStart&&_this.props.onCloseStart();
if(_this._activeTween)return;
_this._activeTween=(0,_tweener2.default)({
start:_this._left,
end:_this.getClosedLeft(),
easingType:_this.props.tweenEasing,
duration:_this.props.tweenDuration,
onFrame:function(tweenValue){
_this._left=tweenValue;
_this.updatePosition();},

onEnd:function(){
_this._activeTween=null;
_this._open=false;
_this._prevLeft=_this._left;
if(_this.props.type==='overlay')_this.mainOverlay.setNativeProps({style:{width:0}});
_this.props.onClose();}});};_this.




toggle=function(){
_this._open?_this.close():_this.open();};_this.handleStartShouldSetPanResponderCapture=_this.handleStartShouldSetPanResponderCapture.bind(_this);_this.handleStartShouldSetPanResponder=_this.handleStartShouldSetPanResponder.bind(_this);_this.handleMoveShouldSetPanResponderCapture=_this.handleMoveShouldSetPanResponderCapture.bind(_this);_this.handleMoveShouldSetPanResponder=_this.handleMoveShouldSetPanResponder.bind(_this);_this.handlePanResponderMove=_this.handlePanResponderMove.bind(_this);_this.handlePanResponderEnd=_this.handlePanResponderEnd.bind(_this);_this.componentWillMount=_this.componentWillMount.bind(_this);_this.componentWillReceiveProps=_this.componentWillReceiveProps.bind(_this);_this.componentDidUpdate=_this.componentDidUpdate.bind(_this);_this.updatePosition=_this.updatePosition.bind(_this);_this.shouldOpenDrawer=_this.shouldOpenDrawer.bind(_this);_this.testPanResponderMask=_this.testPanResponderMask.bind(_this);_this.getMainView=_this.getMainView.bind(_this);_this.getDrawerView=_this.getDrawerView.bind(_this);_this.getOpenLeft=_this.getOpenLeft.bind(_this);_this.getClosedLeft=_this.getClosedLeft.bind(_this);_this.getMainWidth=_this.getMainWidth.bind(_this);_this.getDrawerWidth=_this.getDrawerWidth.bind(_this);_this.initialize=_this.initialize.bind(_this);_this.handleSetViewport=_this.handleSetViewport.bind(_this);_this.resync=_this.resync.bind(_this);_this.requiresResync=_this.requiresResync.bind(_this);_this.propsWhomRequireUpdate=['closedDrawerOffset','openDrawerOffset','type'];_this.state={viewport:props.deviceScreen};return _this;}babelHelpers.createClass(Drawer,[{key:'getChildContext',value:function getChildContext(){return {drawer:this};}},{key:'componentWillMount',value:function componentWillMount(){this.initialize(this.props);}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){if(this.requiresResync(nextProps)){this.resync(null,nextProps);}}},{key:'componentDidUpdate',value:function componentDidUpdate(){if(this._syncAfterUpdate){this._syncAfterUpdate=false;this._open?this.open():this.close();}}},{key:'updatePosition',value:function updatePosition(){var mainProps={};var drawerProps={};var ratio=(this._left-this._offsetClosed)/(this.getOpenLeft()-this._offsetClosed);switch(this.props.type){case 'overlay':drawerProps[this.props.side]=-this.state.viewport.width+this._offsetOpen+this._left;mainProps[this.props.side]=this._offsetClosed;break;case 'static':mainProps[this.props.side]=this._left;drawerProps[this.props.side]=0;break;case 'displace':mainProps[this.props.side]=this._left;drawerProps[this.props.side]=-this.state.viewport.width+this._left+this._offsetOpen;break;}if(this.props.tweenHandler){var propsFrag=this.props.tweenHandler(ratio,this.props.side);mainProps=babelHelpers.extends(mainProps,propsFrag.main);drawerProps=babelHelpers.extends(drawerProps,propsFrag.drawer);}this.drawer.setNativeProps({style:drawerProps});this.main.setNativeProps({style:mainProps});}},{key:'shouldOpenDrawer',value:function shouldOpenDrawer(dx){if(this._open)return dx<this.state.viewport.width*this.props.openDrawerThreshold;return dx>this.state.viewport.width*this.props.openDrawerThreshold;}},{key:'handleStartShouldSetPanResponderCapture',value:function handleStartShouldSetPanResponderCapture(e,gestureState){if(this.props.captureGestures)return this.processShouldSet(e,gestureState);return false;}},{key:'handleStartShouldSetPanResponder',value:function handleStartShouldSetPanResponder(e,gestureState){if(!this.props.captureGestures)return this.processShouldSet(e,gestureState);return false;}},{key:'handleMoveShouldSetPanResponderCapture',value:function handleMoveShouldSetPanResponderCapture(e,gestureState){if(this.props.captureGestures&&this.props.negotiatePan)return this.handleMoveShouldSetPanResponder(e,gestureState);return false;}},{key:'handleMoveShouldSetPanResponder',value:function handleMoveShouldSetPanResponder(e,gestureState){var inMask=this.testPanResponderMask(e,gestureState);if(!inMask)return false;if(!this.props.acceptPan)return false;if(!this.props.negotiatePan||this.props.disabled||!this.props.acceptPan||this._panning)return false;var swipeToLeft=gestureState.dx<0?true:false;var swipeToRight=gestureState.dx>0?true:false;var swipeUpDown=Math.abs(gestureState.dy)>=Math.abs(gestureState.dx)?true:false;var swipeInCloseDirection=this.props.side==='left'?swipeToLeft:swipeToRight;if(swipeUpDown||this._open&&!swipeInCloseDirection||!this._open&&swipeInCloseDirection){return false;}this.terminateActiveTween();return true;}},{key:'testPanResponderMask',value:function testPanResponderMask(e,gestureState){if(this.props.disabled)return false;var x0=e.nativeEvent.pageX;var deltaOpen=this.props.side==='left'?deviceScreen.width-x0:x0;var deltaClose=this.props.side==='left'?x0:deviceScreen.width-x0;var whenClosedMask=this.props.panOpenMask%1===0&&this.props.panOpenMask>1?this.props.panOpenMask:deviceScreen.width*this.props.panOpenMask;var whenOpenMask=this.props.panCloseMask%1===0&&this.props.panCloseMask>1?this.props.panCloseMask:deviceScreen.width*this.props.panCloseMask;if(this._open&&deltaOpen>whenOpenMask)return false;if(!this._open&&deltaClose>whenClosedMask)return false;return true;}},{key:'handlePanResponderMove',value:function handlePanResponderMove(e,gestureState){if(!this.props.acceptPan)return false;var dx=gestureState.dx;if(this._open^dx<0^this.props.side==='right')return false;var absDx=Math.abs(dx);var moveX=gestureState.moveX;var relMoveX=this.props.side==='left'?this._open?-this.state.viewport.width+moveX:moveX:this._open?-moveX:this.state.viewport.width-moveX;var delta=relMoveX-dx;var factor=absDx/Math.abs(relMoveX);var adjustedDx=dx+delta*factor;var left=this.props.panStartCompensation?this._prevLeft+adjustedDx:this._prevLeft+dx;left=Math.min(left,this.getOpenLeft());left=Math.max(left,this.getClosedLeft());this._left=left;this.updatePosition();this._panning=true;}},{key:'handlePanResponderEnd',value:function handlePanResponderEnd(


e,gestureState){
if(Math.abs(gestureState.dx)<50&&this._activeTween)return;

var absRelMoveX=this.props.side==='left'?
this._open?this.state.viewport.width-gestureState.moveX:gestureState.moveX:
this._open?gestureState.moveX:this.state.viewport.width-gestureState.moveX;
var calcPos=this.props.relativeDrag?Math.abs(gestureState.dx):absRelMoveX;

this.shouldOpenDrawer(calcPos)?this.open():this.close();

this.updatePosition();
this._prevLeft=this._left;
this._panning=false;}},{key:'getMainView',value:function getMainView()


{var _this2=this;
return (
_reactNative2.default.createElement(_reactNative.View,babelHelpers.extends({},
this.responder.panHandlers,{
key:'main',
ref:function(c){return _this2.main=c;},
style:[this.stylesheet.main,{height:this.getHeight(),width:this.getMainWidth()}]}),

this.props.children,
this.props.type==='overlay'?
_reactNative2.default.createElement(_reactNative.View,{
ref:function(c){return _this2.mainOverlay=c;},
style:styles.mainOverlay}):

null));}},{key:'getDrawerView',value:function getDrawerView()




{var _this3=this;
return (
_reactNative2.default.createElement(_reactNative.View,babelHelpers.extends({},
this.responder.panHandlers,{
key:'drawer',
ref:function(c){return _this3.drawer=c;},
style:[this.stylesheet.drawer,{height:this.getHeight(),width:this.getDrawerWidth()}]}),

this.props.content));}},{key:'getOpenLeft',value:function getOpenLeft()




{
return this.state.viewport.width-this._offsetOpen;}},{key:'getClosedLeft',value:function getClosedLeft()


{
return this._offsetClosed;}},{key:'getHeight',value:function getHeight()


{
return this.state.viewport.height;}},{key:'getMainWidth',value:function getMainWidth()


{
return this.state.viewport.width-this._offsetClosed;}},{key:'getDrawerWidth',value:function getDrawerWidth()


{
return this.state.viewport.width-this._offsetOpen;}},{key:'initialize',value:function initialize(


props){
var fullWidth=this.state.viewport.width;
this._offsetClosed=props.closedDrawerOffset%1===0?props.closedDrawerOffset:props.closedDrawerOffset*fullWidth;
this._offsetOpen=props.openDrawerOffset%1===0?props.openDrawerOffset:props.openDrawerOffset*fullWidth;
this._prevLeft=this._left;

var styles={
container:{
flex:1,
justifyContent:'center',
alignItems:'center'}};



styles.main=babelHelpers.extends({
position:'absolute',
top:0},
{borderWidth:0},this.props.styles.main);

styles.drawer=babelHelpers.extends({
position:'absolute',
top:0},
{borderWidth:0},this.props.styles.drawer);

if(props.initializeOpen===true){
this._open=true;
this._left=fullWidth-this._offsetOpen;
styles.main[this.props.side]=0;
styles.drawer[this.props.side]=0;
if(props.type==='static')styles.main[this.props.side]=fullWidth-this._offsetOpen;
if(props.type==='displace')styles.main[this.props.side]=fullWidth-this._offsetOpen;}else 
{
this._open=false;
this._left=this._offsetClosed;
styles.main[this.props.side]=this._offsetClosed;
if(props.type==='static')styles.drawer[this.props.side]=0;
if(props.type==='overlay')styles.drawer[this.props.side]=this._offsetClosed+this._offsetOpen-fullWidth;
if(props.type==='displace')styles.drawer[this.props.side]=-fullWidth+this._offsetClosed+this._offsetOpen;}


if(this.main){
this.drawer.setNativeProps({style:{left:styles.drawer.left}});
this.main.setNativeProps({style:{left:styles.main.left}});}else 
{
this.stylesheet=_reactNative.StyleSheet.create(styles);
this.responder=_reactNative.PanResponder.create({
onStartShouldSetPanResponder:this.handleStartShouldSetPanResponder,
onStartShouldSetPanResponderCapture:this.handleStartShouldSetPanResponderCapture,
onMoveShouldSetPanResponder:this.handleMoveShouldSetPanResponder,
onMoveShouldSetPanResponderCapture:this.handleMoveShouldSetPanResponderCapture,
onPanResponderMove:this.handlePanResponderMove,
onPanResponderRelease:this.handlePanResponderEnd});}



this.resync(null,props);}},{key:'handleSetViewport',value:function handleSetViewport(


e){
var viewport=e.nativeEvent.layout;
var oldViewport=this.state.viewport;
if(viewport.width===oldViewport.width&&viewport.height===oldViewport.height)return;
var didRotationChange=viewport.width!==oldViewport.width;
this.resync(viewport,null,didRotationChange);}},{key:'resync',value:function resync(


viewport,props,didRotationChange){
if(didRotationChange)this._syncAfterUpdate=true;
viewport=viewport||this.state.viewport;
props=props||this.props;
this._offsetClosed=props.closedDrawerOffset%1===0?props.closedDrawerOffset:props.closedDrawerOffset*viewport.width;
this._offsetOpen=props.openDrawerOffset%1===0?props.openDrawerOffset:props.openDrawerOffset*viewport.width;
this.setState({viewport:viewport});}},{key:'requiresResync',value:function requiresResync(


nextProps){
for(var i=0;i<this.propsWhomRequireUpdate.length;i++){
var key=this.propsWhomRequireUpdate[i];
if(this.props[key]!==nextProps[key])return true;}}},{key:'render',value:function render()



{
var first=this.props.type==='overlay'?this.getMainView():this.getDrawerView();
var second=this.props.type==='overlay'?this.getDrawerView():this.getMainView();

return (
_reactNative2.default.createElement(_reactNative.View,{
key:'drawerContainer',
onLayout:this.handleSetViewport,
style:this.stylesheet.container},

first,
second));}}]);return Drawer;}(_reactNative.Component);Drawer.tweenPresets={parallax:function(ratio){var side=arguments.length<=1||arguments[1]===undefined?'left':arguments[1];var drawer=babelHelpers.defineProperty({},side,-150*(1-ratio));return {drawer:drawer};}};Drawer.propTypes={acceptDoubleTap:_reactNative2.default.PropTypes.bool,acceptPan:_reactNative2.default.PropTypes.bool,acceptTap:_reactNative2.default.PropTypes.bool,captureGestures:_reactNative2.default.PropTypes.bool,children:_reactNative2.default.PropTypes.node,closedDrawerOffset:_reactNative2.default.PropTypes.number,content:_reactNative2.default.PropTypes.node,deviceScreen:_reactNative2.default.PropTypes.object,disabled:_reactNative2.default.PropTypes.bool,initializeOpen:_reactNative2.default.PropTypes.bool,negotiatePan:_reactNative2.default.PropTypes.bool,onClose:_reactNative2.default.PropTypes.func,onCloseStart:_reactNative2.default.PropTypes.func,onOpen:_reactNative2.default.PropTypes.func,onOpenStart:_reactNative2.default.PropTypes.func,openDrawerOffset:_reactNative2.default.PropTypes.number,openDrawerThreshold:_reactNative2.default.PropTypes.number,panCloseMask:_reactNative2.default.PropTypes.number,panOpenMask:_reactNative2.default.PropTypes.number,panStartCompensation:_reactNative2.default.PropTypes.bool,relativeDrag:_reactNative2.default.PropTypes.bool,side:_reactNative2.default.PropTypes.oneOf(['left','right']),styles:_reactNative2.default.PropTypes.object,tapToClose:_reactNative2.default.PropTypes.bool,tweenDuration:_reactNative2.default.PropTypes.number,tweenEasing:_reactNative2.default.PropTypes.string,tweenHandler:_reactNative2.default.PropTypes.func,type:_reactNative2.default.PropTypes.oneOf(['overlay','static','displace'])};Drawer.defaultProps={type:'displace',closedDrawerOffset:0,deviceScreen:deviceScreen,openDrawerOffset:0,openDrawerThreshold:0.25,relativeDrag:true,panStartCompensation:true,panOpenMask:0.25,panCloseMask:0.25,captureGestures:false,negotiatePan:false,initializeOpen:false,tweenHandler:null,tweenDuration:250,tweenEasing:'linear',disabled:false,acceptDoubleTap:false,acceptTap:false,acceptPan:true,tapToClose:false,styles:{},onOpen:function(){},onClose:function(){},side:'left'};Drawer.childContextTypes={drawer:_reactNative.PropTypes.any};






var styles=_reactNative.StyleSheet.create({
mainOverlay:{
width:0,
left:0,
top:0,
bottom:0,
position:'absolute',
backgroundColor:'transparent'}});



module.exports=Drawer;
});
__d('react-native-drawer/tweener.js',function(global, require, module, exports) {  'use strict';var easingTypes=require('tween-functions/index.js');

module.exports=function(config){
return new Tween(config);};


function Tween(config){
this._rafLoop=this._rafLoop.bind(this);
this.terminate=this.terminate.bind(this);

this._t0=Date.now();
this._config=config;
this._rafLoop();}


Tween.prototype._rafLoop=function(){
if(this._break){return;}var _config=

this._config;var duration=_config.duration;var start=_config.start;var end=_config.end;var easingType=_config.easingType;
var now=Date.now();
var elapsed=now-this._t0;

if(elapsed>=duration){
this._config.onFrame(end);
this._config.onEnd();
return;}


var tweenVal=easingTypes[easingType](elapsed,start,end,duration);
this._config.onFrame(tweenVal);

requestAnimationFrame(this._rafLoop);};


Tween.prototype.terminate=function(){
this._break=true;};
});
__d('HomyPiAndroid/js/components/menu.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});
var _reactRedux=require("react-redux/lib/index.js");












var _reactNativeRouterFlux=require("react-native-router-flux/index.js");
var _Constants=require("HomyPiAndroid/js/Constants.js");
var _RaspberryActions=require("HomyPiAndroid/js/actions/RaspberryActions.js");var React=require("react-native/Libraries/react-native/react-native.js");var Dimensions=require("Dimensions");var StyleSheet=React.StyleSheet;var ScrollView=React.ScrollView;var View=React.View;var Image=React.Image;var Text=React.Text;var Component=React.Component;var TouchableOpacity=React.TouchableOpacity;

var window=Dimensions.get("window");
var uri="http://pickaface.net/includes/themes/clean/img/slide2.png";

var styles={
menu:{
flex:1,
width:window.width,
height:window.height,
backgroundColor:"white"},

raspSelector:{
height:125,
marginBottom:20},

background:{
position:"absolute",
top:0,
left:0,
height:125},

avatarContainer:{
marginLeft:10,
marginTop:70},

avatar:{
width:48,
height:48,
flex:1,
borderRadius:24,
backgroundColor:_Constants.palette.ACCENT_COLOR,
justifyContent:"center",
alignItems:"center"},

avatarIcon:{
fontSize:48,
color:"white"},

name:{
position:"absolute",
color:"black",
left:70,
top:10,
fontSize:20},

item:{
paddingTop:10,
paddingBottom:7,
fontSize:18,
fontWeight:"300",
fontFamily:"Roboto-Regular",
color:"black"},

raspberriesList:{
marginLeft:20,
paddingTop:10,
paddingBottom:10,
borderBottomWidth:1,
borderBottomColor:"#dddddd"},


raspItemContainer:{
height:30},

raspItem:{
fontSize:18},

raspItemDown:{
color:"#e9e9e9"},

menuList:{
marginLeft:20}};var 



Menu=function(_Component){babelHelpers.inherits(Menu,_Component);
function Menu(props){babelHelpers.classCallCheck(this,Menu);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Menu).call(this,
props));

_this.state={
showRaspberriesList:false};return _this;}babelHelpers.createClass(Menu,[{key:"componentDidMount",value:function componentDidMount()


{var _props=
this.props;var dispatch=_props.dispatch;var user=_props.user;
dispatch((0,_RaspberryActions.fetchAll)(user));}},{key:"renderRaspberriesList",value:function renderRaspberriesList()

{var _this2=this;var 
showRaspberriesList=this.state.showRaspberriesList;var 
raspberries=this.props.raspberries;
if(showRaspberriesList){
var raspItems=raspberries.map(function(rasp){
var style=babelHelpers.extends({},styles.raspItem);
if(rasp.state==="DOWN")
style=babelHelpers.extends({},style,styles.raspItemDown);
return (
React.createElement(TouchableOpacity,{
key:rasp.name,
onPress:function(){_this2._selectedPi(rasp);}},
React.createElement(View,{style:styles.raspItemContainer},React.createElement(Text,{style:style},rasp.name))));});



return (
React.createElement(View,{style:styles.raspberriesList},
raspItems));}else 


{
return;}}},{key:"render",value:function render()


{var _this3=this;var _props2=
this.props;var selectedRaspberry=_props2.selectedRaspberry;var raspberries=_props2.raspberries;

return (
React.createElement(ScrollView,{style:styles.menu},
React.createElement(View,{style:styles.raspSelector},
React.createElement(Image,{style:styles.background,source:require("image!menu_background")}),
React.createElement(TouchableOpacity,{
onPress:this.toogleRaspberriesList.bind(this)},
React.createElement(View,{style:styles.avatarContainer},
React.createElement(View,{
style:styles.avatar},
React.createElement(Text,{style:styles.avatarIcon},selectedRaspberry&&selectedRaspberry.name&&selectedRaspberry.name[0].toUpperCase())),

React.createElement(Text,{style:styles.name},selectedRaspberry?selectedRaspberry.name:"None")))),



this.renderRaspberriesList(),
React.createElement(View,{style:styles.menuList},
React.createElement(TouchableOpacity,{
style:styles.clickable,
onPress:this.gotoAlarms.bind(this)},
React.createElement(Text,{style:styles.item},"Alarms")),


React.createElement(TouchableOpacity,{
style:styles.clickable,
onPress:this.gotoSearchMusic.bind(this)},
React.createElement(Text,{style:styles.item},"Music")),


React.createElement(TouchableOpacity,{
onPress:function(){_this3.gotoMyArtists();}},
React.createElement(Text,{style:styles.item},"My artists")),

React.createElement(TouchableOpacity,{
onPress:this.props.logout},
React.createElement(Text,{style:styles.item},"Logout")))));}},{key:"gotoMyArtists",value:function gotoMyArtists()





{
return;
this.props.closeMenu();}},{key:"gotoSearchMusic",value:function gotoSearchMusic()

{
_reactNativeRouterFlux.Actions.searchMusic();
this.props.closeMenu();}},{key:"gotoAlarms",value:function gotoAlarms()

{
_reactNativeRouterFlux.Actions.alarms();
this.props.closeMenu();}},{key:"_selectedPi",value:function _selectedPi(

pi){
this.props.dispatch((0,_RaspberryActions.selectedRaspberry)(pi));}},{key:"toogleRaspberriesList",value:function toogleRaspberriesList()

{var 
showRaspberriesList=this.state.showRaspberriesList;
this.setState({showRaspberriesList:!showRaspberriesList});}}]);return Menu;}(Component);


Menu.defaultProps={pushRoute:function(){}};

function mapStateToProps(state){var 
raspberries=state.raspberries;var selectedRaspberry=state.selectedRaspberry;var user=state.user;var 
items=raspberries.items;
return {
selectedRaspberry:selectedRaspberry,
user:user,
raspberries:items};}exports.default=



(0,_reactRedux.connect)(mapStateToProps)(Menu);
});
__d('HomyPiAndroid/js/components/topMenu.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);


var _Constants=require("HomyPiAndroid/js/Constants.js");var Text=_reactNative2.default.Text;var View=_reactNative2.default.View;var Image=_reactNative2.default.Image;var StyleSheet=_reactNative2.default.StyleSheet;var TouchableOpacity=_reactNative2.default.TouchableOpacity;

var styles=StyleSheet.create({
container:{
height:_Constants.TOP_BAR_HEIGHT,
backgroundColor:_Constants.palette.PRIMARY_COLOR,
justifyContent:"center"},

menuButton:{
marginLeft:10,
height:20,
width:25}});var 



TopMenu=function(_React$Component){babelHelpers.inherits(TopMenu,_React$Component);function TopMenu(){babelHelpers.classCallCheck(this,TopMenu);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TopMenu).apply(this,arguments));}babelHelpers.createClass(TopMenu,[{key:"render",value:function render()
{
return (
_reactNative2.default.createElement(TouchableOpacity,{
style:styles.container,
onPress:this.props.openMenu},
_reactNative2.default.createElement(Image,{style:styles.menuButton,source:require("image!ic_action")})));}}]);return TopMenu;}(_reactNative2.default.Component);exports.default=





TopMenu;
});
__d('Subscribable',function(global, require, module, exports) {  'use strict';






















var Subscribable={};

Subscribable.Mixin={

componentWillMount:function(){
this._subscribableSubscriptions=[];},


componentWillUnmount:function(){
this._subscribableSubscriptions.forEach(
function(subscription){return subscription.remove();});

this._subscribableSubscriptions=null;},















addListenerOn:function(
eventEmitter,
eventType,
listener,
context)
{
this._subscribableSubscriptions.push(
eventEmitter.addListener(eventType,listener,context));}};




module.exports=Subscribable;
});
__d('HomyPiAndroid/js/components/music/myArtists.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);


var _artistItem=require("HomyPiAndroid/js/components/music/artistItem.js");var _artistItem2=babelHelpers.interopRequireDefault(_artistItem);var View=_reactNative2.default.View;var ListView=_reactNative2.default.ListView;var StyleSheet=_reactNative2.default.StyleSheet;var ScrollView=_reactNative2.default.ScrollView;var GridView=require("react-native-grid-view/index.js");

var Dimensions=require("Dimensions");
var window=Dimensions.get("window");

var styles=StyleSheet.create({
myArtistsList:{
flex:1},

artistsGrid:{
height:window.height-75}});var 



MyArtists=function(_React$Component){babelHelpers.inherits(MyArtists,_React$Component);
function MyArtists(props){babelHelpers.classCallCheck(this,MyArtists);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(MyArtists).call(this,
props));
_this.state={
artists:MyArtistsStore.getAll().artists};return _this;}babelHelpers.createClass(MyArtists,[{key:"_onChange",value:function _onChange(


artists){
this.setState({artists:MyArtistsStore.getAll().artists});}},{key:"componentDidMount",value:function componentDidMount()


{
MyArtistsStore.addChangeListener(this._onChange.bind(this));
MyArtistsActions.getAll();}},{key:"componentWillUnmount",value:function componentWillUnmount()


{
MyArtistsStore.removeChangeListener(this._onChange);}},{key:"render",value:function render()


{var 
artists=this.state.artists;
var ds=new ListView.DataSource({rowHasChanged:function(r1,r2){return r1!==r2;}});
var dataSource=ds.cloneWithRows(artists);

return (
_reactNative2.default.createElement(GridView,{
style:styles.artistsGrid,
items:artists,
itemsPerRow:2,
renderItem:this.renderArtistItem,
scrollEnabled:true,
onEndReached:this.onEndReached}));}},{key:"renderArtistItem",value:function renderArtistItem(



result){
return (
_reactNative2.default.createElement(_artistItem2.default,{key:result._id,artist:result,playAlbum:this._playAlbum}));}},{key:"onEndReached",value:function onEndReached()



{}}]);return MyArtists;}(_reactNative2.default.Component);




MyArtists.defaultProps={
artists:[]};exports.default=


MyArtists;
});
__d('HomyPiAndroid/js/components/music/artistItem.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);var 
View=_reactNative2.default.View;var Text=_reactNative2.default.Text;var StyleSheet=_reactNative2.default.StyleSheet;var Image=_reactNative2.default.Image;

var window=require("Dimensions").get("window");

var CONTAINER_WIDTH=window.width/2-20;

var styles=StyleSheet.create({
container:{
alignItems:"center",
flexDirection:"column",
backgroundColor:"white",
elevation:5,
width:CONTAINER_WIDTH,
marginTop:5,
marginLeft:5,
marginRight:5,
marginBottom:5},


cover:{
height:125,
width:CONTAINER_WIDTH},

coverContainer:{
flex:1},

artistName:{
flex:0.20,
width:125,
height:50}});



var ArtistItem=_reactNative2.default.createClass({displayName:"ArtistItem",
getImageSource:function(artist){
if(artist.images.length&&artist.images[0].url){
return {uri:artist.images[0].url};}

return require("image!default_cover");},

render:function(){var 
artist=this.props.artist;
return (
_reactNative2.default.createElement(View,{style:styles.container},
_reactNative2.default.createElement(View,{style:styles.coverContainer},
_reactNative2.default.createElement(Image,{style:styles.cover,source:this.getImageSource(artist),resizeMode:Image.resizeMode.stretch})),

_reactNative2.default.createElement(Text,{style:styles.artistName},artist.name)));}});exports.default=




ArtistItem;
});
__d('HomyPiAndroid/js/components/music/searchMusic.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);











var _reactNativeRouterFlux=require("react-native-router-flux/index.js");
var _reactNativeMaterialKit=require("react-native-material-kit/lib/index.js");
var _AlbumItemCover=require("HomyPiAndroid/js/components/music/AlbumItemCover.js");var _AlbumItemCover2=babelHelpers.interopRequireDefault(_AlbumItemCover);

var _reactRedux=require("react-redux/lib/index.js");
var _MusicSearchActions=require("HomyPiAndroid/js/actions/MusicSearchActions.js");

var _SocketConnection=require("HomyPiAndroid/js/natives/SocketConnection.js");var _SocketConnection2=babelHelpers.interopRequireDefault(_SocketConnection);




var _artistItem=require("HomyPiAndroid/js/components/music/artistItem.js");var _artistItem2=babelHelpers.interopRequireDefault(_artistItem);
var _albumItem=require("HomyPiAndroid/js/components/music/albumItem.js");var _albumItem2=babelHelpers.interopRequireDefault(_albumItem);

var _trackItem=require("HomyPiAndroid/js/components/music/trackItem.js");var _trackItem2=babelHelpers.interopRequireDefault(_trackItem);


var _Constants=require("HomyPiAndroid/js/Constants.js");var ScrollView=_reactNative2.default.ScrollView;var View=_reactNative2.default.View;var TextInput=_reactNative2.default.TextInput;var Text=_reactNative2.default.Text;var Image=_reactNative2.default.Image;var Animated=_reactNative2.default.Animated;var ListView=_reactNative2.default.ListView;var TouchableOpacity=_reactNative2.default.TouchableOpacity;var InteractionManager=_reactNative2.default.InteractionManager;var publish=_SocketConnection2.default.publish;var window=require("Dimensions").get("window");var GridView=require("react-native-grid-view/index.js");



var styles={
container:{},

searchButton:{
flex:0.15},

searchButtonImg:{
height:40,
alignSelf:"center"},

form:{
flexDirection:"row",
alignItems:"center",
marginLeft:10,
marginRight:10},

input:{
flex:1,
width:500},

titleBar:{
flexDirection:"row",
width:window.width-20,
marginLeft:10,
marginRight:10,
justifyContent:"space-between",
alignItems:"center"},

title:{
fontSize:24,
paddingBottom:15,
color:"#212121"},

moreButton:{
height:30,
width:55,
right:0,
backgroundColor:_Constants.palette.ACCENT_COLOR,
alignItems:"center",
justifyContent:"center",
borderRadius:2,
elevation:2},

tracks:{
marginTop:5,
marginLeft:5,
backgroundColor:"white"},

scrollView:{
height:window.height-(_Constants.PLAYER_HEADER_HEIGHT+_Constants.TOP_BAR_HEIGHT)}};


var SingleColorSpinner=_reactNativeMaterialKit.mdl.Spinner.singleColorSpinner().
withStyle({
alignSelf:"center",
marginTop:50}).

build();var 



SearchMusic=function(_React$Component){babelHelpers.inherits(SearchMusic,_React$Component);
function SearchMusic(props){babelHelpers.classCallCheck(this,SearchMusic);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SearchMusic).call(this,
props));
_this.initialized=false;
_this.state={
search:_this.props.searchMusic.query};

_this._handleSearch=function(){var init=arguments.length<=0||arguments[0]===undefined?false:arguments[0];
_this.initialized=true;
if(init&&_this.props.searchMusic.albums.items.length&&
_this.props.searchMusic.artists.items.length&&
_this.props.searchMusic.tracks.items.length)
return;
var query=_this.state.search;
_this.props.dispatch((0,_MusicSearchActions.search)(_this.props.user,query,null,4));};

_this._playTrack=function(track){var 
player=_this.props.player;
if(!player){}



publish("raspberry:"+player.name,"player:play:track",{"source":"spotify","track":{"uri":track.uri,"serviceId":track.serviceId}});};

_this.gotoDetails=function(album,event){
var annimatedCover=_reactNative2.default.createElement(_AlbumItemCover2.default,{
album:album,
initialState:{
x:event.px,
y:event.py,
width:event.width,
height:event.height},

finalState:{
x:0,
y:0,
width:window.width,
height:3*window.height/5}});


_reactNativeRouterFlux.Actions.albumDetails({
annimatedCover:annimatedCover,
album:album,
source:"spotify"});};return _this;}babelHelpers.createClass(SearchMusic,[{key:"componentDidMount",value:function componentDidMount()




{var _this2=this;
InteractionManager.runAfterInteractions(function(){
if(_this2.props.searchMusic.query!=""){
_this2._handleSearch(true);}});}},{key:"componentWillUnmount",value:function componentWillUnmount()




{}},{key:"render",value:function render()

{var 
isFetching=this.props.searchMusic.isFetching;
return (
_reactNative2.default.createElement(View,{style:styles.container},

isFetching?this.getLoadingView():this.getResultsView()));}},{key:"getResultsView",value:function getResultsView()



{var _this3=this;var _props$searchMusic=
this.props.searchMusic;var artists=_props$searchMusic.artists;var tracks=_props$searchMusic.tracks;var albums=_props$searchMusic.albums;var 
search=this.state.search;
if(!this.initialized)return null;
return (
_reactNative2.default.createElement(View,null,

_reactNative2.default.createElement(ScrollView,{
automaticallyAdjustContentInsets:true,
horizontal:false,
style:[styles.scrollView]},
_reactNative2.default.createElement(View,{style:styles.form},
_reactNative2.default.createElement(_reactNativeMaterialKit.MKTextField,{
style:styles.input,
tintColor:_reactNativeMaterialKit.MKColor.Blue,
textInputStyle:{color:_reactNativeMaterialKit.MKColor.BlueGrey},
placeholder:search||"Search",
onChangeText:function(search){return _this3.setState({search:search});}}),
_reactNative2.default.createElement(TouchableOpacity,{
style:styles.searchButton,
onPress:function(){return _this3._handleSearch();}},
_reactNative2.default.createElement(Image,{style:styles.searchButtonImg,resizeMode:Image.resizeMode.contain,source:require("image!ic_search")}))),


_reactNative2.default.createElement(View,{style:styles.titleBar},
_reactNative2.default.createElement(Text,{style:styles.title},"Tracks"),
_reactNative2.default.createElement(TouchableOpacity,{
style:styles.moreButton,
onPress:function(){_this3._showMore("tracks");}},
_reactNative2.default.createElement(Text,null,"More"))),


_reactNative2.default.createElement(View,{style:styles.tracks},

tracks.items.slice(0,4).map(function(track){
return _reactNative2.default.createElement(_trackItem2.default,{key:track._id,track:track,showCover:true,playTrack:_this3._playTrack,addTrack:_this3._addTrackInPlaylist});})),




_reactNative2.default.createElement(View,{style:styles.titleBar},
_reactNative2.default.createElement(Text,{style:styles.title},"Albums"),
_reactNative2.default.createElement(TouchableOpacity,{
style:styles.moreButton,
onPress:function(){_this3._showMore("albums");}},
_reactNative2.default.createElement(Text,null,"More"))),


_reactNative2.default.createElement(GridView,{
style:styles.albumsGrid,
items:albums.items.slice(0,4),
itemsPerRow:2,
renderItem:this.renderAlbumItem.bind(this),
scrollEnabled:false,
onEndReached:this.onEndReached}),
_reactNative2.default.createElement(View,{style:styles.titleBar},
_reactNative2.default.createElement(Text,{style:styles.title},"Artists"),
_reactNative2.default.createElement(TouchableOpacity,{
style:styles.moreButton,
onPress:function(){_this3._showMore("artists");}},
_reactNative2.default.createElement(Text,null,"More"))),


_reactNative2.default.createElement(GridView,{
style:styles.artistsGrid,
items:artists.items.slice(0,4),
itemsPerRow:2,
renderItem:this.renderArtistItem,
scrollEnabled:false,
onEndReached:this.onEndReached}),
_reactNative2.default.createElement(View,{style:{height:50}}))));}},{key:"getLoadingView",value:function getLoadingView()





{
return _reactNative2.default.createElement(SingleColorSpinner,null);}},{key:"renderArtistItem",value:function renderArtistItem(


result){
return (
_reactNative2.default.createElement(_artistItem2.default,{key:result.id,artist:result,playAlbum:this._playAlbum}));}},{key:"renderAlbumItem",value:function renderAlbumItem(



result){
return (
_reactNative2.default.createElement(_albumItem2.default,{key:result._id,album:result,gotoDetails:this.gotoDetails,player:this.props.player}));}},{key:"_showMore",value:function _showMore(


type){
var params={
search:this.state.search};

if(type=="tracks"){
_reactNativeRouterFlux.Actions.searchTrack(params);}else 
if(type=="albums"){
_reactNativeRouterFlux.Actions.searchAlbum(params);}else 
if(type=="artists"){
route.name="searchArtists";}}}]);return SearchMusic;}(_reactNative2.default.Component);




function mapStateToProps(state){var 
user=state.user;var searchMusic=state.searchMusic;var player=state.player;
return {
user:user,
searchMusic:searchMusic,
player:player};}exports.default=



(0,_reactRedux.connect)(mapStateToProps)(SearchMusic);
});
__d('HomyPiAndroid/js/components/music/AlbumItemCover.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);var 

AlbumItemCover=function(_Component){babelHelpers.inherits(AlbumItemCover,_Component);
function AlbumItemCover(props){babelHelpers.classCallCheck(this,AlbumItemCover);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AlbumItemCover).call(this,
props));var 
initialState=props.initialState;
_this.state={
style:{
width:new _reactNative.Animated.Value(initialState.width),
position:new _reactNative.Animated.ValueXY({x:initialState.x,y:initialState.y})}};return _this;}babelHelpers.createClass(AlbumItemCover,[{key:"componentDidMount",value:function componentDidMount()




{var 
finalState=this.props.finalState;
_reactNative.Animated.parallel([
_reactNative.Animated.timing(
this.state.style.width,{
toValue:finalState.width,
duration:750}),


_reactNative.Animated.timing(
this.state.style.position,{
toValue:{x:finalState.x,y:finalState.y},
duration:750})]).


start();}},{key:"getImageSource",value:function getImageSource(

album){
if(album.images.length&&album.images[0].url){
return {uri:album.images[0].url};}

return require("image!default_cover");}},{key:"render",value:function render()

{var _props=
this.props;var album=_props.album;var initialState=_props.initialState;var finalState=_props.finalState;var 
style=this.state.style;
return (
_reactNative2.default.createElement(_reactNative.Animated.Image,{
style:{
position:"absolute",
width:style.width,
height:style.width.interpolate({
inputRange:[initialState.width,finalState.width],
outputRange:[initialState.height,finalState.height]}),

transform:style.position.getTranslateTransform()},

source:this.getImageSource(album)}));}}]);return AlbumItemCover;}(_reactNative.Component);exports.default=




AlbumItemCover;
});
__d('HomyPiAndroid/js/components/music/playerFull.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});









var _reactNativeRouterFlux=require("react-native-router-flux/index.js");

var _Constants=require("HomyPiAndroid/js/Constants.js");

var _SocketConnection=require("HomyPiAndroid/js/natives/SocketConnection.js");var _SocketConnection2=babelHelpers.interopRequireDefault(_SocketConnection);


var _reactRedux=require("react-redux/lib/index.js");
var _PlayerActions=require("HomyPiAndroid/js/actions/PlayerActions.js");
























































































var _io=require("HomyPiAndroid/js/io.js");var _io2=babelHelpers.interopRequireDefault(_io);

var _Progress=require("HomyPiAndroid/js/components/music/Progress.js");var _Progress2=babelHelpers.interopRequireDefault(_Progress);
var _PlayPause=require("HomyPiAndroid/js/components/music/PlayPause.js");var _PlayPause2=babelHelpers.interopRequireDefault(_PlayPause);
var _Volume=require("HomyPiAndroid/js/components/music/Volume.js");var _Volume2=babelHelpers.interopRequireDefault(_Volume);var React=require("react-native/Libraries/react-native/react-native.js");var StyleSheet=React.StyleSheet;var Text=React.Text;var Image=React.Image;var View=React.View;var TouchableHighlight=React.TouchableHighlight;var TouchableWithoutFeedback=React.TouchableWithoutFeedback;var publish=_SocketConnection2.default.publish;var Dimensions=require("Dimensions");var window=Dimensions.get("window");var styles=StyleSheet.create({container:{flex:1,flexDirection:"column",backgroundColor:_Constants.palette.PLAYER_BACKGROUND},viewActions:{flexDirection:"row",alignItems:"flex-start"},viewActionsButtons:{flex:0.5,alignSelf:"flex-start",alignItems:"flex-start"},hidePlayer:{height:50,width:50,justifyContent:"flex-start"},cover:{position:"absolute",top:0,left:0,right:0,bottom:0,height:window.height,width:window.width},controls:{position:"absolute",bottom:0,backgroundColor:"white",width:window.width,opacity:0.8},trackInfo:{flex:0.10,flexDirection:"column",alignSelf:"center",alignItems:"center"},trackName:{color:_Constants.palette.PRIMARY_TEXT_COLOR,fontFamily:"RobotoCondensed-Bold",fontSize:19,flex:0.5},artists:{color:_Constants.palette.PRIMARY_TEXT_COLOR,fontFamily:"Roboto-Thin",fontSize:15,flex:0.5},playerActions:{marginLeft:45,marginRight:45,flex:0.2,flexDirection:"row",alignItems:"center",justifyContent:"center"},playPause:{flex:0.5,alignItems:"center",alignSelf:"center",justifyContent:"center"},playPauseImg:{width:90,height:90},skip:{flex:0.25,alignSelf:"center",justifyContent:"center"},skipImg:{width:50,height:50}});var 

PlayerFull=function(_React$Component){babelHelpers.inherits(PlayerFull,_React$Component);
function PlayerFull(props){babelHelpers.classCallCheck(this,PlayerFull);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(PlayerFull).call(this,
props));
_this.state={
showVolumeBar:false,
progress:0,
volumeBarBottom:{x:0,y:0}};

_this.getProgressInterval=null;
_this.autoUpdateProgress=null;

_this.onProgress=function(data){

_this.setState({progress:data.trackOffset_ms});};

_this.hidePlayer=function(){
props.onClosing();
_reactNativeRouterFlux.Actions.pop();};return _this;}babelHelpers.createClass(PlayerFull,[{key:"componentDidMount",value:function componentDidMount()


{
_io2.default.socket.on("playlist:track:progress",this.onProgress);
this.setGetTrackProgressInterval();}},{key:"componentWillUnmount",value:function componentWillUnmount()

{
_io2.default.socket.off("playlist:track:progress",this.onProgress);





if(this.autoUpdateProgress){
clearInterval(this.autoUpdateProgress);
this.autoUpdateProgress=null;}}},{key:"hideVolumeBar",value:function hideVolumeBar()


{
this.setState({showVolumeBar:false});}},{key:"render",value:function render()

{var _this2=this;var 
showVolumeBar=this.state.showVolumeBar;var _props=
this.props;var player=_props.player;var playing=_props.playing;
var statusAction=null;
return (
React.createElement(TouchableWithoutFeedback,{
onPress:function(){return _this2.hideVolumeBar();}},
React.createElement(View,{style:styles.container},
React.createElement(Image,{
style:styles.cover,
resizeMode:Image.resizeMode.cover,
source:{uri:playing.album.images[0].url}}),
React.createElement(View,{style:styles.viewActions},
React.createElement(TouchableHighlight,{
style:styles.viewActionsButtons,
onPress:_reactNativeRouterFlux.Actions.pop},
React.createElement(Image,{
style:styles.hidePlayer,
resizeMode:Image.resizeMode.contain,
source:require("image!ic_close_black_48dp")}))),



React.createElement(View,{style:styles.controls},
React.createElement(View,{style:styles.trackInfo},
React.createElement(Text,{style:styles.trackName},playing.name),
React.createElement(Text,{style:styles.artists},playing.artists.map(function(artist){return artist.name+"; ";}))),

React.createElement(_Progress2.default,{value:this.state.progress,min:0,max:playing.duration_ms,onSeekTrack:this._seek}),
React.createElement(View,{style:styles.playerActions},
React.createElement(TouchableHighlight,{
style:styles.skip,
onPress:function(){return _this2._previous();}},
React.createElement(Image,{
style:styles.skipImg,
resizeMode:Image.resizeMode.cover,
source:require("image!ic_skip_previous_black_48dp")})),

React.createElement(_PlayPause2.default,{dispatch:this.props.dispatch,player:player,style:styles.playPause,styleImg:styles.playPauseImg}),
React.createElement(TouchableHighlight,{
style:styles.skip,
onPress:function(){_this2._next();}},
React.createElement(Image,{
style:styles.skipImg,
resizeMode:Image.resizeMode.contain,
source:require("image!ic_skip_next_black_48dp")})),

React.createElement(TouchableHighlight,{style:{"height":25,"width":25},
ref:"volumeButton",
onPress:function(event){_this2.toogleVolumeBar(event);}},
React.createElement(Text,null,"vol")))),




React.createElement(_Volume2.default,{
bottom:this.state.volumeBarBottom,
value:player.volume||0,
setVolume:function(value){return _this2._setVolume(value);},
showVolumeBar:showVolumeBar}))));}},{key:"toogleVolumeBar",value:function toogleVolumeBar(





event){var _this3=this;
this.refs.volumeButton.measure(function(fx,fy,width,height,px,py){
_this3.setState({
showVolumeBar:!_this3.state.showVolumeBar,
volumeBarBottom:{x:px,y:py}});});}},{key:"_previous",value:function _previous()




{var 
player=this.props.player;
if(!player)return;
publish("raspberry:"+player.name,"player:previous");}},{key:"_next",value:function _next()

{var 
player=this.props.player;
if(!player)return;
publish("raspberry:"+player.name,"player:next");}},{key:"setProgressInterval",value:function setProgressInterval()


{
return;
if(!this.getProgressInterval){

this.getProgressInterval=setInterval(function(){},

5000);}}},{key:"setAutoUpdateProgress",value:function setAutoUpdateProgress()



{
return;
if(!this.autoUpdateProgress){
this.autoUpdateProgress=setInterval(function(){
var ms=this.state.progress+1000;
this.setState({progress:ms});}.
bind(this),1000);}}},{key:"setGetTrackProgressInterval",value:function setGetTrackProgressInterval()



{var 
player=this.props.player;
if(player&&player.status==="PLAYING"){

this.setProgressInterval();
this.setAutoUpdateProgress();}else 
{
if(this.getProgressInterval){
clearInterval(this.getProgressInterval);
this.getProgressInterval=null;}

if(this.autoUpdateProgress){
clearInterval(this.autoUpdateProgress);
this.autoUpdateProgress=null;}}}},{key:"_setVolume",value:function _setVolume(



value){
this.setState({volume:value});var 
player=this.props.player;

publish("raspberry:"+player.name,"player:volume:set",{volume:value});
this.props.dispatch((0,_PlayerActions.setPlayer)({volume:value}));}},{key:"_seek",value:function _seek(


value,event){var 
player=this.props.player;
_io2.default.socket.emit("player:seek",{player:{name:player.name},progress_ms:value});
PlaylistActionCreators.updateProgress(value);}}]);return PlayerFull;}(React.Component);


;

function mapStateToProps(state){var 
player=state.player;var playlist=state.playlist;var user=state.user;
return {
user:user,
player:player,
playing:playlist.playing};}exports.default=


(0,_reactRedux.connect)(mapStateToProps)(PlayerFull);
});
__d('HomyPiAndroid/js/components/music/PlayPause.js',function(global, require, module, exports) {  "use strict";var _reactNative=require("react-native/Libraries/react-native/react-native.js");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);





var _PlayerActions=require("HomyPiAndroid/js/actions/PlayerActions.js");
var _SocketConnection=require("HomyPiAndroid/js/natives/SocketConnection.js");var _SocketConnection2=babelHelpers.interopRequireDefault(_SocketConnection);var View=_reactNative2.default.View;var Image=_reactNative2.default.Image;var TouchableHighlight=_reactNative2.default.TouchableHighlight;var 
publish=_SocketConnection2.default.publish;var 


PlayPause=function(_React$Component){babelHelpers.inherits(PlayPause,_React$Component);
function PlayPause(props){babelHelpers.classCallCheck(this,PlayPause);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(PlayPause).call(this,
props));

_this._playPause=function(){var 
player=_this.props.player;
if(player&&player.status==="PAUSED"){

try{
publish("raspberry:"+player.name,"player:resume");}
catch(e){}}else 
if(player&&player.status==="PLAYING"){
publish("raspberry:"+player.name,"player:pause");}};return _this;}babelHelpers.createClass(PlayPause,[{key:"_pause",value:function _pause()




{}},{key:"render",value:function render()

{var _props=
this.props;var player=_props.player;var style=_props.style;var styleImg=_props.styleImg;
var img={url:"https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-512.png"};
if(player&&player.status==="PLAYING"){
img=require("image!ic_pause_black_48dp");}else 
if(player&&player.status==="PAUSED"){
img=require("image!ic_play_circle_outline_black_48dp");}

return (
_reactNative2.default.createElement(TouchableHighlight,{
style:style,
onPress:this._playPause},
_reactNative2.default.createElement(Image,{
style:styleImg,
resizeMode:Image.resizeMode.stretch,
source:img})));}}]);return PlayPause;}(_reactNative2.default.Component);




;
module.exports=PlayPause;
});
__d('react-native-router-flux/index.js',function(global, require, module, exports) {  'use strict';var _Common=require('react-native-router-flux/Common.js');
var _TabBar=require('react-native-router-flux/TabBar.js');var _TabBar2=babelHelpers.interopRequireDefault(_TabBar);
var _Actions=require('react-native-router-flux/Actions.js');var _Actions2=babelHelpers.interopRequireDefault(_Actions);
var _Router=require('react-native-router-flux/Router.js');var _Router2=babelHelpers.interopRequireDefault(_Router);
var _Animations=require('react-native-router-flux/Animations.js');var _Animations2=babelHelpers.interopRequireDefault(_Animations);

module.exports={Schema:_Common.Schema,Route:_Common.Route,TabBar:_TabBar2.default,Actions:_Actions2.default,Router:_Router2.default,Animations:_Animations2.default};
});
__d('react-native-router-flux/TabBar.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);

var _reactNativeTabs=require('react-native-tabs/index.js');var _reactNativeTabs2=babelHelpers.interopRequireDefault(_reactNativeTabs);

var _Actions=require('react-native-router-flux/Actions.js');var _Actions2=babelHelpers.interopRequireDefault(_Actions);var View=_reactNative2.default.View;var InteractionManager=_reactNative2.default.InteractionManager;var 
TabBar=function(_React$Component){babelHelpers.inherits(TabBar,_React$Component);function TabBar(){babelHelpers.classCallCheck(this,TabBar);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TabBar).apply(this,arguments));}babelHelpers.createClass(TabBar,[{key:'onSelect',value:function onSelect(
el){
if(!_Actions2.default[el.props.name]){
throw new Error("No action is defined for name="+el.props.name+" actions:"+JSON.stringify(Object.keys(_Actions2.default)));}

_Actions2.default[el.props.name]({hideTabBar:el.props.hideTabBar});}},{key:'render',value:function render()


{var _this2=this;
if(this.props.hideTabBar){
return _reactNative2.default.createElement(View,null);}


var selected=this.props.selected;
if(!selected){
_reactNative2.default.Children.forEach(this.props.children,function(el){
if(!selected||el.props.initial){
selected=el.props.name;}});}



return (
_reactNative2.default.createElement(_reactNativeTabs2.default,babelHelpers.extends({style:[{backgroundColor:'white'},this.props.tabBarStyle],onSelect:this.onSelect.bind(this)},this.props,{selected:selected}),
_reactNative2.default.Children.map(this.props.children,function(el){
var schema=_this2.props.router&&_this2.props.router.schemas[el.props.schema]?_this2.props.router.schemas[el.props.schema]:{};
var props=babelHelpers.extends({},schema,el.props);
if(!el.props.name)
console.error("No name is defined for element");

var Icon=props.icon||console.error("No icon class is defined for "+el.name);
return _reactNative2.default.createElement(Icon,babelHelpers.extends({key:el.props.name},props));})));}}]);return TabBar;}(_reactNative2.default.Component);exports.default=TabBar;
});
__d('react-native-router-flux/Route.js',function(global, require, module, exports) {  "use strict";Object.defineProperty(exports,"__esModule",{value:true});var 









Route=












function Route(){var _ref=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var name=_ref.name;var type=_ref.type;var component=_ref.component;var schema=_ref.schema;var children=_ref.children;var header=_ref.header;var footer=_ref.footer;var wrapRouter=_ref.wrapRouter;var props=babelHelpers.objectWithoutProperties(_ref,["name","type","component","schema","children","header","footer","wrapRouter"]);var parent=arguments.length<=1||arguments[1]===undefined?null:arguments[1];babelHelpers.classCallCheck(this,Route);
if(!name){
throw new Error("no name is defined for Route="+name);}

if(!props){
throw new Error("no props is defined for Route="+name);}

this.name=name;
this.type=type||'push';
this.component=component;
this.children=children;
if(!parent){
throw new Error("Parent router is not set!");}

this.title=props.title;
this.parent=parent;
this.header=header;
this.footer=footer;
this.props=props;
this.wrapRouter=wrapRouter||type=='switch';};exports.default=Route;
});
__d('react-native-router-flux/Actions.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _Route=require('react-native-router-flux/Route.js');var _Route2=babelHelpers.interopRequireDefault(_Route);
var _BaseRouter=require('react-native-router-flux/BaseRouter.js');var _BaseRouter2=babelHelpers.interopRequireDefault(_BaseRouter);
var _debug=require('react-native-router-flux/debug.js');var _debug2=babelHelpers.interopRequireDefault(_debug);

var BEFORE_ROUTE='BEFORE_ROUTER_ROUTE';
var AFTER_ROUTE='AFTER_ROUTER_ROUTE';
var BEFORE_POP='BEFORE_ROUTER_POP';
var AFTER_POP='AFTER_ROUTER_POP';
var BEFORE_DISMISS='BEFORE_ROUTER_DISMISS';
var AFTER_DISMISS='AFTER_ROUTER_DISMISS';
var AFTER_FOCUS='AFTER_ROUTER_FOCUS';
var BEFORE_FOCUS='BEFORE_ROUTER_FOCUS';
var AFTER_REFRESH='AFTER_ROUTER_REFRESH';
var BEFORE_REFRESH='BEFORE_ROUTER_REFRESH';

function isNumeric(n){
return !isNaN(parseFloat(n))&&isFinite(n);}


function filterParam(data){
if(data.toString()!='[object Object]')
return data;
if(!data){
return;}

var proto=(data||{}).constructor.name;

if(proto!='Object'){
data={};}

if(data.data){
data.data=filterParam(data.data);}

return data;}var 


Actions=function(){


function Actions(){babelHelpers.classCallCheck(this,Actions);
this.pop=this.pop.bind(this);
this.route=this.route.bind(this);
this.dismiss=this.dismiss.bind(this);}babelHelpers.createClass(Actions,[{key:'route',value:function route(


name){var props=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];
if(!this.currentRouter){
throw new Error("No current router is set");}

if(props.toString()!='[object Object]')
props={data:props};

props=filterParam(props);

var router=this.currentRouter;


while(router.currentRoute.childRouter){
router=router.currentRoute.childRouter;
(0,_debug2.default)("Switching to child router="+router.name);}


(0,_debug2.default)("Route to "+name+" current router="+this.currentRouter.name+" current route="+this.currentRouter.currentRoute.name);
while(!router.routes[name]){
var route=router.parentRoute;
if(!route||!route.parent){
throw new Error("Cannot find router for route="+name+" current router="+router.name);}

router=route.parent;
(0,_debug2.default)("Switching to router="+router.name);}

(0,_debug2.default)("ROUTER DELEGATE PROPS:"+router.delegate.props.dispatch);
var currentRoute=router.routes[name];
if(router.delegate.props&&router.delegate.props.dispatch){
router.delegate.props.dispatch(babelHelpers.extends({},props,{type:BEFORE_ROUTE,route:currentRoute,name:name}));}

if(router.route(name,props)){

while(router.currentRoute.childRouter){
router=router.currentRoute.childRouter;
(0,_debug2.default)("Switching to child router="+router.name);}


this.currentRouter=router;
if(router.delegate.props&&router.delegate.props.dispatch){
router.delegate.props.dispatch(babelHelpers.extends({},props,{type:AFTER_ROUTE,route:currentRoute,name:name}));}

return true;}

return false;}},{key:'dismiss',value:function dismiss()

{var props=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];
props=filterParam(props);
var router=this.currentRouter;

while(router.parentRoute){
router=router.parentRoute.parent;
(0,_debug2.default)("Switching to parent router="+router.name);}

if(router.delegate.props&&router.delegate.props.dispatch){
router.delegate.props.dispatch(babelHelpers.extends({},props,{type:BEFORE_DISMISS,route:router.currentRoute,name:router.currentRoute.name}));}

var res=router.dismiss();
if(router.delegate.props&&router.delegate.props.dispatch){
router.delegate.props.dispatch(babelHelpers.extends({},props,{type:AFTER_DISMISS,route:router.currentRoute,name:router.currentRoute.name}));}

return res;}},{key:'refresh',value:function refresh()

{var props=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];
props=filterParam(props);
var router=this.currentRouter;
if(router.delegate.props&&router.delegate.props.dispatch){
router.delegate.props.dispatch(babelHelpers.extends({},props,{type:BEFORE_REFRESH,route:router.currentRoute,name:router.currentRoute.name}));}

var res=router.refresh(props);
if(router.delegate.props&&router.delegate.props.dispatch){
router.delegate.props.dispatch(babelHelpers.extends({},props,{type:AFTER_REFRESH,route:router.currentRoute,name:router.currentRoute.name}));}

return res;}},{key:'pop',value:function pop()

{var num=arguments.length<=0||arguments[0]===undefined?1:arguments[0];var props=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];
props=filterParam(props);
if(!isNumeric(num)){
num=1;}

if(!this.currentRouter){
throw new Error("No current router is set");}

if(num>1){
for(var i=0;i<num;i++){
if(!this.pop()){
return false;}}


return true;}else 
{
var router=this.currentRouter;
(0,_debug2.default)("Pop, router="+router.name+" stack length:"+router.stack.length);
(0,_debug2.default)("Current route="+router.currentRoute.name+" type="+router.currentRoute.type);
while(router.stack.length<=1||router.currentRoute.type==='switch'){
if(router.parentRoute){
router=router.parentRoute.parent;
(0,_debug2.default)("Switching to parent router="+router.name);}else 
{
break;}}


if(router.delegate.props&&router.delegate.props.dispatch){
router.delegate.props.dispatch(babelHelpers.extends({},props,{type:BEFORE_POP,route:router.currentRoute,name:router.currentRoute.name}));}

if(router.pop(1,props)){
this.currentRouter=router;
if(router.delegate.props&&router.delegate.props.dispatch){
router.delegate.props.dispatch(babelHelpers.extends({},props,{type:AFTER_POP,route:router.currentRoute,name:router.currentRoute.name}));}

return true;}else 
{
return false;}}}}]);return Actions;}();





var actions=new Actions();
actions.BEFORE_ROUTE=BEFORE_ROUTE;
actions.AFTER_ROUTE=AFTER_ROUTE;
actions.BEFORE_POP=BEFORE_POP;
actions.AFTER_POP=AFTER_POP;
actions.BEFORE_DISMISS=BEFORE_DISMISS;
actions.AFTER_DISMISS=AFTER_DISMISS;
actions.BEFORE_FOCUS=BEFORE_FOCUS;
actions.AFTER_FOCUS=AFTER_FOCUS;exports.default=
actions;
});
__d('react-native-router-flux/BaseRouter.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.RouterDelegate=undefined;








var _Route=require('react-native-router-flux/Route.js');var _Route2=babelHelpers.interopRequireDefault(_Route);
var _Actions=require('react-native-router-flux/Actions.js');var _Actions2=babelHelpers.interopRequireDefault(_Actions);
var _debug=require('react-native-router-flux/debug.js');var _debug2=babelHelpers.interopRequireDefault(_debug);var 

RouterDelegate=exports.RouterDelegate=function(){function RouterDelegate(){babelHelpers.classCallCheck(this,RouterDelegate);}babelHelpers.createClass(RouterDelegate,[{key:'onPush',value:function onPush(
route,props){
return true;}},{key:'onPop',value:function onPop()

{var num=arguments.length<=0||arguments[0]===undefined?1:arguments[0];var route=arguments[1];var props=arguments[2];
return true;}},{key:'onReplace',value:function onReplace(

route,props){
return true;}},{key:'onReset',value:function onReset(

route,props){
return true;}},{key:'onSwitch',value:function onSwitch(

route,props){
return true;}}]);return RouterDelegate;}();var 



BaseRouter=function(){babelHelpers.createClass(BaseRouter,[{key:'stack',set:function(









stack){
if(!stack||!stack.length){
throw new Error("Cannot be set to empty stack");}

this._stack=stack;},get:function()


{
return this._stack;}},{key:'currentRoute',get:function()


{
return this.routes[this._stack[this._stack.length-1]];}},{key:'previousRoute',get:function()


{
if(this._stack.length>1){
return this.routes[this._stack[this._stack.length-2]];}else 
{
return null;}}}]);



function BaseRouter(routes)

{var schemas=arguments.length<=1||arguments[1]===undefined?[]:arguments[1];var _this=this;var stack=arguments.length<=2||arguments[2]===undefined?null:arguments[2];var props=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];babelHelpers.classCallCheck(this,BaseRouter);
this.schemas={};
this.routes={};
this.pop=this.pop.bind(this);
this.route=this.route.bind(this);
this.delegate=new RouterDelegate();
if(!routes||!routes.length){
throw new Error("routes is not defined");}

this.props=props;
this.name=props&&props.name;
this.parentRoute=props&&props.route;
if(this.parentRoute){
if(this.parentRoute.parent){

Object.keys(this.parentRoute.parent.schemas).forEach(function(el){return (
_this._addSchema(_this.parentRoute.parent.schemas[el].name,_this.parentRoute.parent.schemas[el]));});}

this.parentRoute.childRouter=this;}



schemas.forEach(function(el){return _this._addSchema(el.name,el);});
var selected=null;
routes.forEach(function(el){if(el.initial)selected=el.name;_this._addRoute(el.name,el);});


if(!stack||!stack.length){
stack=[selected||routes[0].name];}

this.stack=stack;

this._addActions();}babelHelpers.createClass(BaseRouter,[{key:'_addSchema',value:function _addSchema(


name,props){
if(!name){
throw new Error("Schema name is not defined");}

if(this.schemas[name]){
throw new Error("Schema="+name+" is not unique!");}

this.schemas[name]=props;}},{key:'_addRoute',value:function _addRoute(


routeName,props){
if(!routeName){
throw new Error("Route name is not defined");}

var schemaName=props.schema||'default';
var schema=this.schemas[schemaName]||{};var _props=

this.props;var children=_props.children;var name=_props.name;var header=_props.header;var footer=_props.footer;var showNavigationBar=_props.showNavigationBar;var route=_props.route;var component=_props.component;var hideNavBar=_props.hideNavBar;var sceneConfig=_props.sceneConfig;var type=_props.type;var routerProps=babelHelpers.objectWithoutProperties(_props,['children','name','header','footer','showNavigationBar','route','component','hideNavBar','sceneConfig','type']);
var routeProps=babelHelpers.extends({},schema,routerProps,props);

if(this.routes[routeName]){
throw new Error("Route="+routeName+" is not unique!");}


this.routes[routeName]=new _Route2.default(routeProps,this);}},{key:'_addActions',value:function _addActions()



{
if(!_Actions2.default.currentRouter){
_Actions2.default.currentRouter=this;
(0,_debug2.default)("Set current router:"+this.name);}

Object.keys(this.routes).forEach(function(name){
if(!_Actions2.default[name]){
_Actions2.default[name]=function(data){
return _Actions2.default.route(name,data);};}});}},{key:'route',value:function route(





name){var props=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];
if(!this.routes[name]){
throw new Error("No route is defined for name="+name);}

var type=props.type?props.type:this.routes[name].type;
var action=type==="switch"?"jump":type;
if(!action){
throw new Error("No type is defined for name="+name);}

this.nextRoute=this.routes[name];

var handler="on"+capitalizeFirstLetter(action);
if(this.delegate[handler]){
(0,_debug2.default)("Run handler "+handler);
var res=this.delegate[handler](this.routes[name],props);
if(!res){
console.log("Ignore "+action+", handler returns false");
return false;}}else 

{
throw new Error("No handler "+handler+" for route="+name);}

if(this["_"+action]){
this["_"+action](name,props);}

return true;}},{key:'_push',value:function _push(


name,props){
this._stack.push(name);}},{key:'_replace',value:function _replace(


name,props){
this._stack[this._stack.length-1]=name;}},{key:'_reset',value:function _reset(





name,props){
this._stack=[name];}},{key:'_jump',value:function _jump(


name,props){
if(this._stack.indexOf(name)!=-1){
var pos=this._stack.indexOf(name);

this._stack[pos]=this._stack[this._stack.length-1];
this._stack[this._stack.length-1]=name;}else 
{
this._stack.push(name);}}},{key:'pop',value:function pop()



{var num=arguments.length<=0||arguments[0]===undefined?1:arguments[0];var props=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];
if(this._stack.length<=num){
return false;}

this.nextRoute=null;
if(this.delegate.onPop&&this.delegate.onPop(num,this.currentRoute,props)){
var routes=this._stack.splice(-num,num);
return true;}

return false;}},{key:'dismiss',value:function dismiss()


{
return this.delegate.onDismiss&&this.delegate.onDismiss();}},{key:'refresh',value:function refresh()


{var props=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];
return this.delegate.onRefresh&&this.delegate.onRefresh(props);}}]);return BaseRouter;}();exports.default=BaseRouter;





function capitalizeFirstLetter(string){
return string.charAt(0).toUpperCase()+string.slice(1);}
});
__d('react-native-router-flux/Router.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});








var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);
var _BaseRouter=require('react-native-router-flux/BaseRouter.js');var _BaseRouter2=babelHelpers.interopRequireDefault(_BaseRouter);
var _ExRouter=require('react-native-router-flux/ExRouter.js');var _ExRouter2=babelHelpers.interopRequireDefault(_ExRouter);

var _debug=require('react-native-router-flux/debug.js');var _debug2=babelHelpers.interopRequireDefault(_debug);
var _Actions=require('react-native-router-flux/Actions.js');var _Actions2=babelHelpers.interopRequireDefault(_Actions);var StyleSheet=_reactNative2.default.StyleSheet;var View=_reactNative2.default.View;var 
Router=function(_React$Component){babelHelpers.inherits(Router,_React$Component);

function Router(props){babelHelpers.classCallCheck(this,Router);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Router).call(this,
props));
var createRouter=props.createRouter||_this.createRouter;
_this.router=createRouter(props);return _this;}babelHelpers.createClass(Router,[{key:'createRouter',value:function createRouter(


props){
var schemas=_reactNative2.default.Children.map(props.children,function(child){return child;}).filter(function(child){return child.type.prototype.className()==="Schema";}).map(function(child){return child.props;});
var routes=_reactNative2.default.Children.map(props.children,function(child){return child;}).filter(function(child){return child.type.prototype.className()==="Route";}).map(function(child){return child.props;});
return new _BaseRouter2.default(routes,schemas,props.initialRoutes||props.initial&&[props.initial],props);}},{key:'componentDidMount',value:function componentDidMount()


{
this.router.delegate=this.refs.router;

if(this.props.dispatch){
this.router.delegate.refs.nav.navigationContext.addListener('willfocus',function(ev){
var route=ev.data.route;
var name=route.name;
var title=route.title;
_Actions2.default.currentRouter=this.router;

this.props.dispatch({
type:_Actions2.default.BEFORE_FOCUS,
name:name,
title:title,
route:route});}.

bind(this));

this.router.delegate.refs.nav.navigationContext.addListener('didfocus',function(ev){
var route=ev.data.route;
var name=route.name;
var title=route.title;

this.props.dispatch({
type:_Actions2.default.AFTER_FOCUS,
name:name,
title:title,
route:route});}.

bind(this));}}},{key:'render',value:function render()



{
var Component=this.props.plugin||_ExRouter2.default;
return _reactNative2.default.createElement(Component,babelHelpers.extends({ref:'router'},this.props,{router:this.router,dispatch:this.props.dispatch}));}}]);return Router;}(_reactNative2.default.Component);exports.default=Router;
});
__d('@exponent/react-native-navigator/ExRoute.js',function(global, require, module, exports) {  'use strict';
});
__d('react-native-router-flux/ExRouter.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.ExRouteAdapter=undefined;var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);
var _BaseRouter=require('react-native-router-flux/BaseRouter.js');var _BaseRouter2=babelHelpers.interopRequireDefault(_BaseRouter);
var _Route=require('react-native-router-flux/Route.js');var _Route2=babelHelpers.interopRequireDefault(_Route);
var _Common=require('react-native-router-flux/Common.js');var Components=babelHelpers.interopRequireWildcard(_Common);
var _reactNativeNavigator=require('@exponent/react-native-navigator/ExNavigator.js');var _reactNativeNavigator2=babelHelpers.interopRequireDefault(_reactNativeNavigator);
var _ExNavigatorStyles=require('@exponent/react-native-navigator/ExNavigatorStyles.js');var _ExNavigatorStyles2=babelHelpers.interopRequireDefault(_ExNavigatorStyles);
var _ExNavigatorIcons=require('@exponent/react-native-navigator/ExNavigatorIcons.js');
var _Animations=require('react-native-router-flux/Animations.js');var _Animations2=babelHelpers.interopRequireDefault(_Animations);

var _Router=require('react-native-router-flux/Router.js');var _Router2=babelHelpers.interopRequireDefault(_Router);
var _Actions=require('react-native-router-flux/Actions.js');var _Actions2=babelHelpers.interopRequireDefault(_Actions);
var _debug=require('react-native-router-flux/debug.js');var _debug2=babelHelpers.interopRequireDefault(_debug);
var _reactNativeActionSheet=require('@exponent/react-native-action-sheet/index.js');var _reactNativeActionSheet2=babelHelpers.interopRequireDefault(_reactNativeActionSheet);var TouchableOpacity=_reactNative2.default.TouchableOpacity;var Navigator=_reactNative2.default.Navigator;var StyleSheet=_reactNative2.default.StyleSheet;var View=_reactNative2.default.View;var Text=_reactNative2.default.Text;

function parentProps(){var props=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var 
name=props.name;var sceneConfig=props.sceneConfig;var title=props.title;var children=props.children;var router=props.router;var initial=props.initial;var showNavigationBar=props.showNavigationBar;var hideNavBar=props.hideNavBar;var footer=props.footer;var header=props.header;var routerProps=babelHelpers.objectWithoutProperties(props,['name','sceneConfig','title','children','router','initial','showNavigationBar','hideNavBar','footer','header']);
return routerProps;}var 


ExRouteAdapter=exports.ExRouteAdapter=function(){





function ExRouteAdapter(route){var props=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];babelHelpers.classCallCheck(this,ExRouteAdapter);
(0,_debug2.default)("ExRouter constructor"+props.schema);
if(!route){
throw new Error("route is not defined ");}

this.route=route;
this.name=route.name;
this.title=props.title||route.title;
if(!this.name){
throw new Error("name is not defined for route");}

this.props=props||{};
this.renderScene=this.renderScene.bind(this);
if(this.route.props.renderRightButton){
this.renderRightButton=this.route.props.renderRightButton.bind(this.route);}

if(this.route.props.renderTitle){
this.renderTitle=this.route.props.renderTitle.bind(this.route);}

if(this.route.props.renderLeftButton){
this.renderLeftButton=this.route.props.renderLeftButton.bind(this.route);}}babelHelpers.createClass(ExRouteAdapter,[{key:'configureScene',value:function configureScene()



{
return this.route.props.sceneConfig||_Animations2.default.None;}},{key:'renderScene',value:function renderScene(


navigator){
var Component=this.route.component;var _route$props=
this.route.props;var initial=_route$props.initial;var routeProps=babelHelpers.objectWithoutProperties(_route$props,['initial']);
var child=Component?
!this.route.wrapRouter?_reactNative2.default.createElement(Component,babelHelpers.extends({key:this.route.name,name:this.route.name},routeProps,this.props,{route:this.route})):
_reactNative2.default.createElement(_Router2.default,babelHelpers.extends({name:this.route.name+"Router"},routeProps,this.props,{route:this.route,plugin:ExRouter,initial:"_"+this.route.name,footer:null,header:null}),
_reactNative2.default.createElement(Components.Route,babelHelpers.extends({},routeProps,this.props,{component:Component,name:"_"+this.route.name,type:'push',wrapRouter:false,initial:true}))):


_reactNative2.default.cloneElement(_reactNative2.default.Children.only(this.route.children),babelHelpers.extends({},routeProps,this.props,{route:this.route}));

var Header=this.route.header;
var header=Header?_reactNative2.default.createElement(Header,babelHelpers.extends({},routeProps,this.props)):null;

var Footer=this.route.footer;
var footer=Footer?_reactNative2.default.createElement(Footer,babelHelpers.extends({},routeProps,this.props)):null;

return (
_reactNative2.default.createElement(View,{style:styles.transparent},
header,
child,
footer));}},{key:'getName',value:function getName()




{
return this.route.name;}},{key:'getTitle',value:function getTitle()


{
(0,_debug2.default)("TITLE ="+this.route.title+" for route="+this.route.name);
return this.title||"";}},{key:'getBackButtonTitle',value:function getBackButtonTitle(


navigator,index,state){
var previousIndex=index-1;
var previousRoute=state.routeStack[previousIndex];
var title=previousRoute.getTitle(navigator,previousIndex,state);
var res=title.length>10?null:title;
return this.route.props.leftTitle||res;}},{key:'renderLeftButton',value:function renderLeftButton(


navigator,index,state){var _this=this;
if(this.route.props.onLeft&&this.route.props.leftTitle){
return _reactNative2.default.createElement(TouchableOpacity,{
touchRetentionOffset:_reactNativeNavigator2.default.Styles.barButtonTouchRetentionOffset,
onPress:function(){return _this.route.props.onLeft(babelHelpers.extends({},_this.route.props,_this.props));},
style:[_reactNativeNavigator2.default.Styles.barLeftButton,this.route.props.leftButtonStyle]},
_reactNative2.default.createElement(Text,{
style:[_reactNativeNavigator2.default.Styles.barLeftButtonText,this.route.props.leftButtonTextStyle]},this.route.props.leftTitle));}



if(index===0||index<navigator.getCurrentRoutes().length-1){
return null;}


var previousIndex=index-1;
var previousRoute=state.routeStack[previousIndex];
if(previousRoute.renderBackButton){
return previousRoute.renderBackButton(navigator,previousIndex,state);}


var title=this.getBackButtonTitle(navigator,index,state);

if(title){
var buttonText=
_reactNative2.default.createElement(Text,{
numberOfLines:1,
style:[
_ExNavigatorStyles2.default.barButtonText,
_ExNavigatorStyles2.default.barBackButtonText,
navigator.props.barButtonTextStyle]},


title);}



return (
_reactNative2.default.createElement(TouchableOpacity,{
pressRetentionOffset:_ExNavigatorStyles2.default.barButtonPressRetentionOffset,
onPress:function(){return _Actions2.default.pop();},
style:[_ExNavigatorStyles2.default.barBackButton,styles.backButtonStyle]},
_reactNative2.default.createElement(_ExNavigatorIcons.BackIcon,{
style:[
_ExNavigatorStyles2.default.barButtonIcon,
navigator.props.barButtonIconStyle]}),


buttonText));}},{key:'renderRightButton',value:function renderRightButton(




navigator,index,state){var _this2=this;
if(this.route.props.onRight&&this.route.props.rightTitle){
return _reactNative2.default.createElement(TouchableOpacity,{
touchRetentionOffset:_reactNativeNavigator2.default.Styles.barButtonTouchRetentionOffset,
onPress:function(){return _this2.route.props.onRight(babelHelpers.extends({},_this2.route.props,_this2.props));},
style:[_reactNativeNavigator2.default.Styles.barRightButton,this.route.props.rightButtonStyle]},
_reactNative2.default.createElement(Text,{style:[_reactNativeNavigator2.default.Styles.barRightButtonText,this.route.props.rightButtonTextStyle]},this.route.props.rightTitle));}else 

{
return null;}}}]);return ExRouteAdapter;}();var 




ExRouter=function(_React$Component){babelHelpers.inherits(ExRouter,_React$Component);


function ExRouter(props){babelHelpers.classCallCheck(this,ExRouter);var _this3=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ExRouter).call(this,
props));
_this3.onPop=_this3.onPop.bind(_this3);
_this3.onPush=_this3.onPush.bind(_this3);
_this3.onReset=_this3.onReset.bind(_this3);
_this3.onReplace=_this3.onReplace.bind(_this3);
_this3.onJump=_this3.onJump.bind(_this3);
_this3.onActionSheet=_this3.onActionSheet.bind(_this3);
_this3.state={};return _this3;}babelHelpers.createClass(ExRouter,[{key:'componentWillUnmount',value:function componentWillUnmount()


{
if(this===_Actions2.default.currentRouter.delegate){
_Actions2.default.currentRouter=null;}}},{key:'onPush',value:function onPush(



route,props){
if(this.props.onPush){
var res=this.props.onPush(route,props);
if(!res){
return false;}}


this.refs.nav.push(new ExRouteAdapter(route,props));
(0,_debug2.default)("PUSHED TO:"+route.name);
return true;}},{key:'onReplace',value:function onReplace(


route,props){
if(this.props.onReplace){
var res=this.props.onReplace(route,props);
if(!res){
return false;}}




this.refs.nav.replace(new ExRouteAdapter(route,props));
return true;}},{key:'onReset',value:function onReset(







route,props){
if(this.props.onReset){
var res=this.props.onReset(route,props);
if(!res){
return false;}}


this.refs.nav.immediatelyResetRouteStack([new ExRouteAdapter(route,props)]);
return true;}},{key:'onJump',value:function onJump(


route,props){
if(this.props.onJump){
var res=this.props.onJump(route,props);
if(!res){
return false;}}


var navigator=this.refs.nav;
var routes=navigator.getCurrentRoutes();
var exist=routes.filter(function(el){return el.getName()==route.name;});
if(exist.length){
navigator.jumpTo(exist[0]);}else 
{
navigator.push(new ExRouteAdapter(route,props));}


this.setState({selected:route.name});
return true;}},{key:'onPop',value:function onPop(


num){
if(this.props.onPop){
var res=this.props.onPop(num);
if(!res){
return false;}}


this.refs.nav.pop();
return true;}},{key:'onModal',value:function onModal(


route,props){
var element=_reactNative2.default.createElement(route.component,babelHelpers.extends({},route.props,props));
this.setState({modal:element});
return true;}},{key:'onDismiss',value:function onDismiss()


{
this.setState({modal:null});}},{key:'onRefresh',value:function onRefresh(


props){
this.setState(props);}},{key:'onActionSheet',value:function onActionSheet(


route,props){
this.refs.actionsheet.showActionSheetWithOptions(babelHelpers.extends({},route.props,props),props.callback);}},{key:'_renderNavigationBar',value:function _renderNavigationBar(


props){
var navBar=this.props.renderNavigationBar?this.props.renderNavigationBar(props):
_reactNative2.default.createElement(Navigator.NavigationBar,props);

var route=this.props.router.nextRoute||this.props.router.currentRoute;
if(route.props.hideNavBar===false){
return navBar;}

if(this.props.router.props.hideNavBar||route.props.hideNavBar){
return null;}

return navBar;}},{key:'render',value:function render()



{var _this4=this;
var router=this.props.router;
if(!router){
throw new Error("No router is defined");}

var Header=this.props.header;
var header=Header?_reactNative2.default.createElement(Header,babelHelpers.extends({},this.props,this.state)):null;

var Footer=this.props.footer;
var footer=Footer?_reactNative2.default.createElement(Footer,babelHelpers.extends({},this.props,this.state)):null;
(0,_debug2.default)("RENDER ROUTER:"+router.name);
return (
_reactNative2.default.createElement(_reactNativeActionSheet2.default,{ref:'actionsheet'},
_reactNative2.default.createElement(View,{style:styles.transparent},
header,
_reactNative2.default.createElement(_reactNativeNavigator2.default,babelHelpers.extends({ref:'nav',initialRouteStack:router.stack.map(function(route){
var oldProps=router.routes[route].props;
router.routes[route].props=babelHelpers.extends({},oldProps,parentProps(_this4.props),_this4.state);
return new ExRouteAdapter(router.routes[route]);}),

style:styles.transparent,
sceneStyle:{paddingTop:0,backgroundColor:'transparent'}},
this.props,{
renderNavigationBar:function(props){return _this4._renderNavigationBar(babelHelpers.extends({},props,_this4.state,{router:router}));}})),

footer,
this.state.modal)));}}]);return ExRouter;}(_reactNative2.default.Component);exports.default=ExRouter;









var styles=StyleSheet.create({
container:{
position:'absolute',
top:0,
bottom:0,
left:0,
right:0,
backgroundColor:'transparent',
justifyContent:'center',
alignItems:'center'},

transparent:{
flex:1,
backgroundColor:"transparent"},

barTitleText:{
fontFamily:'.HelveticaNeueInterface-MediumP4',
fontSize:17,
marginTop:11}});
});
__d('@exponent/react-native-navigator/ExNavigator.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _ExRoute=require('@exponent/react-native-navigator/ExRoute.js');






































































































































































Object.keys(_ExRoute).forEach(function(key){if(key==="default")return;Object.defineProperty(exports,key,{enumerable:true,get:function(){return _ExRoute[key];}});});var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);var _invariant=require('invariant/browser.js');var _invariant2=babelHelpers.interopRequireDefault(_invariant);var _reactNativeCloneReferencedElement=require('react-native-clone-referenced-element/cloneReferencedElement.js');var _reactNativeCloneReferencedElement2=babelHelpers.interopRequireDefault(_reactNativeCloneReferencedElement);var _ExNavigatorMixin=require('@exponent/react-native-navigator/ExNavigatorMixin.js');var _ExNavigatorMixin2=babelHelpers.interopRequireDefault(_ExNavigatorMixin);var _ExNavigatorStyles=require('@exponent/react-native-navigator/ExNavigatorStyles.js');var _ExNavigatorStyles2=babelHelpers.interopRequireDefault(_ExNavigatorStyles);var _ExRouteRenderer=require('@exponent/react-native-navigator/ExRouteRenderer.js');var _ExRouteRenderer2=babelHelpers.interopRequireDefault(_ExRouteRenderer);var _ExSceneConfigs=require('@exponent/react-native-navigator/ExSceneConfigs.js');var _ExSceneConfigs2=babelHelpers.interopRequireDefault(_ExSceneConfigs);var _ExNavigatorIcons=require('@exponent/react-native-navigator/ExNavigatorIcons.js');var ExNavigatorIcons=babelHelpers.interopRequireWildcard(_ExNavigatorIcons);var ExNavigator=function(_React$Component){babelHelpers.inherits(ExNavigator,_React$Component);function ExNavigator(props,context){babelHelpers.classCallCheck(this,ExNavigator);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ExNavigator).call(this,props,context));_this._routeRenderer=new _ExRouteRenderer2.default(_this,{titleStyle:props.titleStyle,barButtonTextStyle:props.barButtonTextStyle,barButtonIconStyle:props.barButtonIconStyle});_this._renderScene=_this._renderScene.bind(_this);_this._setNavigatorRef=_this._setNavigatorRef.bind(_this);return _this;}babelHelpers.createClass(ExNavigator,[{key:'render',value:function render(){var _this2=this;return _reactNative2.default.createElement(_reactNative.Navigator,babelHelpers.extends({},this.props,{ref:this._setNavigatorRef,configureScene:function(route){return _this2._routeRenderer.configureScene(route);},renderScene:this._renderScene,navigationBar:this._renderNavigationBar(),sceneStyle:[_ExNavigatorStyles2.default.scene,this.props.sceneStyle],style:[_ExNavigatorStyles2.default.navigator,this.props.style]}));}},{key:'_renderScene',value:function _renderScene(route,navigator){var _this3=this;if(!this._subscribedToFocusEvents){this._subscribeToFocusEvents(navigator);}this.__navigator=navigator;var scene=this._routeRenderer.renderScene(route,this);if(typeof this.props.augmentScene==='function'){scene=this.props.augmentScene(scene,route);}var firstRoute=navigator.getCurrentRoutes()[0];if(route===firstRoute){scene=(0,_reactNativeCloneReferencedElement2.default)(scene,{ref:function(component){_this3._firstScene=component;}});}return scene;}},{key:'_renderNavigationBar',value:function _renderNavigationBar(){if(!this.props.showNavigationBar){return null;}return this.props.renderNavigationBar({routeMapper:this._routeRenderer.navigationBarRouteMapper,style:[_ExNavigatorStyles2.default.bar,this.props.navigationBarStyle]});}},{key:'_setNavigatorRef',value:function _setNavigatorRef(navigator){this.__navigator=navigator;if(navigator){(0,_invariant2.default)(this._subscribedToFocusEvents,'Expected to have subscribed to the navigator before it was mounted.');}else {this._unsubscribeFromFocusEvents(navigator);}}},{key:'_subscribeToFocusEvents',value:function _subscribeToFocusEvents(navigator){var _this4=this;(0,_invariant2.default)(!this._subscribedToFocusEvents,'The navigator is already subscribed to focus events');var navigationContext=navigator.navigationContext;this._onWillFocusSubscription=navigationContext.addListener('willfocus',function(event){return _this4._routeRenderer.onWillFocus(event);});this._onDidFocusSubscription=navigationContext.addListener('didfocus',function(event){return _this4._routeRenderer.onDidFocus(event);});this._subscribedToFocusEvents=true;}},{key:'_unsubscribeFromFocusEvents',value:function _unsubscribeFromFocusEvents(){this._onWillFocusSubscription.remove();this._onDidFocusSubscription.remove();this._subscribedToFocusEvents=false;}},{key:'navigationContext',get:function(){return this.__navigator.navigationContext;}},{key:'parentNavigator',get:function(){return !this.__navigator?this.props.navigator:this.__navigator.parentNavigator;}}]);return ExNavigator;}(_reactNative2.default.Component);ExNavigator.Styles=_ExNavigatorStyles2.default;ExNavigator.SceneConfigs=_ExSceneConfigs2.default;ExNavigator.Icons=ExNavigatorIcons;ExNavigator.propTypes=babelHelpers.extends({},_reactNative.Navigator.props,{showNavigationBar:_reactNative.PropTypes.bool,navigationBarStyle:_reactNative.View.propTypes.style,titleStyle:_reactNative.Text.propTypes.style,barButtonTextStyle:_reactNative.Text.propTypes.style,barButtonIconStyle:_reactNative.Image.propTypes.style,renderNavigationBar:_reactNative.PropTypes.func,renderBackButton:_reactNative.PropTypes.func,augmentScene:_reactNative.PropTypes.func});ExNavigator.defaultProps=babelHelpers.extends({},_reactNative.Navigator.defaultProps,{showNavigationBar:true,renderNavigationBar:function(props){return _reactNative2.default.createElement(_reactNative.Navigator.NavigationBar,props);}});exports.default=ExNavigator;babelHelpers.extends(ExNavigator.prototype,_ExNavigatorMixin2.default);
});
__d('@exponent/react-native-navigator/ExRouteRenderer.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);








var _invariant=require('invariant/browser.js');var _invariant2=babelHelpers.interopRequireDefault(_invariant);
var _reactNativeCloneReferencedElement=require('react-native-clone-referenced-element/cloneReferencedElement.js');var _reactNativeCloneReferencedElement2=babelHelpers.interopRequireDefault(_reactNativeCloneReferencedElement);

var _ExNavigatorStyles=require('@exponent/react-native-navigator/ExNavigatorStyles.js');var _ExNavigatorStyles2=babelHelpers.interopRequireDefault(_ExNavigatorStyles);
var _ExSceneConfigs=require('@exponent/react-native-navigator/ExSceneConfigs.js');var _ExSceneConfigs2=babelHelpers.interopRequireDefault(_ExSceneConfigs);
var _Layout=require('@exponent/react-native-navigator/Layout.js');var _Layout2=babelHelpers.interopRequireDefault(_Layout);

var _ExNavigatorIcons=require('@exponent/react-native-navigator/ExNavigatorIcons.js');var 











NavigationBarRouteMapper=function(){
function NavigationBarRouteMapper(navigator,styles){babelHelpers.classCallCheck(this,NavigationBarRouteMapper);
this._navigator=navigator;
this._titleStyle=styles.titleStyle;
this._barButtonTextStyle=styles.barButtonTextStyle;
this._barButtonIconStyle=styles.barButtonIconStyle;}babelHelpers.createClass(NavigationBarRouteMapper,[{key:'Title',value:function Title(



route,
navigator,
index,
state)
{
if(route.renderTitle){
return route.renderTitle(this._navigator,index,state);}


if(!route.getTitle){
return null;}


return (
_reactNative2.default.createElement(_reactNative.Text,{style:[_ExNavigatorStyles2.default.barTitleText,this._titleStyle]},
shortenTitle(route.getTitle(this._navigator,index,state))));}},{key:'LeftButton',value:function LeftButton(





route,
navigator,
index,
state)
{

if(route.renderLeftButton){
return route.renderLeftButton(this._navigator,index,state);}


if(index===0){
return null;}


return this._renderBackButton(route,index,state);}},{key:'_renderBackButton',value:function _renderBackButton(



route,
index,
state)
{var _this=this;
var previousIndex=index-1;
var previousRoute=state.routeStack[previousIndex];
if(previousRoute.renderBackButton){
return previousRoute.renderBackButton(this._navigator,previousIndex,state);}


var defaultRenderBackButton=this._navigator.props.renderBackButton;
if(defaultRenderBackButton){
return defaultRenderBackButton(this._navigator,previousIndex,state);}


var title=void 0;
if(route.getBackButtonTitle){
title=route.getBackButtonTitle(this._navigator,index,state);}else 
if(previousRoute.getTitle){
title=previousRoute.getTitle(this._navigator,previousIndex,state);}


var buttonText=void 0;
if(title){
buttonText=
_reactNative2.default.createElement(_reactNative.Text,{
numberOfLines:1,
style:[
_ExNavigatorStyles2.default.barButtonText,
_ExNavigatorStyles2.default.barBackButtonText,
this._barButtonTextStyle]},

title);}



return (
_reactNative2.default.createElement(_reactNative.TouchableOpacity,{
pressRetentionOffset:_ExNavigatorStyles2.default.barButtonPressRetentionOffset,
onPress:function(){return _this._navigator.pop();},
style:[_ExNavigatorStyles2.default.barBackButton,styles.backButtonStyle]},
_reactNative2.default.createElement(_ExNavigatorIcons.BackIcon,{
style:[
_ExNavigatorStyles2.default.barButtonIcon,
this._barButtonIconStyle]}),


buttonText));}},{key:'RightButton',value:function RightButton(





route,
navigator,
index,
state)
{
if(route.renderRightButton){
return route.renderRightButton(this._navigator,index,state);}}}]);return NavigationBarRouteMapper;}();


;var 

ExRouteRenderer=function(){
function ExRouteRenderer(navigator,styles){babelHelpers.classCallCheck(this,ExRouteRenderer);
this._previousRoute=null;
this.navigationBarRouteMapper=new NavigationBarRouteMapper(
navigator,
styles);}babelHelpers.createClass(ExRouteRenderer,[{key:'configureScene',value:function configureScene(



route){
if(route.configureScene){
var sceneConfig=route.configureScene();
if(sceneConfig){
return sceneConfig;}}



if(_reactNative.Platform.OS==='android'){
return _ExSceneConfigs2.default.Fade;}else 
{
return _ExSceneConfigs2.default.PushFromRight;}}},{key:'renderScene',value:function renderScene(



route,navigator){
if(route.renderScene){
var scene=route.renderScene(navigator);
if(!scene){
return scene;}

return (0,_reactNativeCloneReferencedElement2.default)(scene,{
ref:function(component){route.scene=component;}});}



(0,_invariant2.default)(
route.getSceneClass,
'The route must implement renderScene or getSceneClass');

var Component=route.getSceneClass();
return (
_reactNative2.default.createElement(Component,{
ref:function(component){route.scene=component;},
navigator:navigator}));}},{key:'onWillFocus',value:function onWillFocus(




event){var 
route=event.data.route;
if(route.onWillFocus){
route.onWillFocus(event);}


if(route.scene&&route.scene.componentWillFocus){
route.scene.componentWillFocus(event);}


var previousRoute=this._previousRoute;
if(previousRoute){
if(previousRoute.onWillBlur){
previousRoute.onWillBlur(event);}

var previousScene=previousRoute.scene;
if(previousScene&&previousScene.componentWillBlur){
previousScene.componentWillBlur(event);}}}},{key:'onDidFocus',value:function onDidFocus(




event){var 
route=event.data.route;
if(route.onDidFocus){
route.onDidFocus(event);}

if(route.scene&&route.scene.componentDidFocus){
route.scene.componentDidFocus(event);}


var previousRoute=this._previousRoute;
if(previousRoute){
if(previousRoute.onDidBlur){
previousRoute.onDidBlur(event);}

var previousScene=previousRoute.scene;
if(previousScene&&previousScene.componentDidBlur){
previousScene.componentDidBlur(event);}}


this._previousRoute=route;}}]);return ExRouteRenderer;}();exports.default=ExRouteRenderer;

;









function shortenTitle(title){
if(title.length>18){
return title.substr(0,18)+'…';}else 
{
return title;}}



var styles=_reactNative.StyleSheet.create({
backButton:{
flexDirection:'row',
alignItems:'center'}});exports.default=



ExRouteRenderer;
});
__d('@exponent/react-native-navigator/ExSceneConfigs.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);





var _buildStyleInterpolator=require('@exponent/react-native-navigator/vendor/buildStyleInterpolator.js');var _buildStyleInterpolator2=babelHelpers.interopRequireDefault(_buildStyleInterpolator);

var ToTheLeft={


transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-Math.round(_reactNative.Dimensions.get('window').width*0.3),y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:_reactNative.PixelRatio.get()},

opacity:{
from:1,
to:0.97,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:1000},

translateX:{
from:0,
to:-Math.round(_reactNative.Dimensions.get('window').width*0.3),
min:0,
max:1,
type:'linear',
extrapolate:true,
round:_reactNative.PixelRatio.get()},

scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var FromTheRight={
transformTranslate:{
from:{x:_reactNative.Dimensions.get('window').width,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:_reactNative.PixelRatio.get()},

opacity:{
value:1.0,
type:'constant'},

shadowOpacity:{
from:0.1,
to:0.5,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

shadowRadius:{
from:2,
to:6,
min:0,
max:1,
type:'linear',
extrapolate:true},

translateX:{
from:_reactNative.Dimensions.get('window').width,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:_reactNative.PixelRatio.get()},

scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var Still={
opacity:{
value:1,
type:'constant'}};



var FromTheBottom={
opacity:{
value:1.0,
type:'constant'},

transformTranslate:{
from:{x:0,y:_reactNative.Dimensions.get('window').height,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:_reactNative.PixelRatio.get()},

translateY:{
from:_reactNative.Dimensions.get('window').height,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:_reactNative.PixelRatio.get()},

scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var ToTheBack={
opacity:{
value:1,
type:'constant'},

transformScale:{
from:{x:1,y:1,z:1},
to:{x:0.95,y:0.95,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleX:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleY:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true}};



var FromTheFront={
opacity:{
from:0,
to:1,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

transformScale:{
from:{x:1.05,y:1.05,z:1},
to:{x:1,y:1,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true}};



var ExSceneConfigs={
Fade:_reactNative.Navigator.SceneConfigs.FadeAndroid,
FloatFromRight:babelHelpers.extends({},
_reactNative.Navigator.SceneConfigs.FloatFromRight,{
animationInterpolators:{
into:(0,_buildStyleInterpolator2.default)(FromTheRight),
out:(0,_buildStyleInterpolator2.default)(ToTheLeft)}}),


FloatFromBottom:babelHelpers.extends({},
_reactNative.Navigator.SceneConfigs.FloatFromBottom,{
animationInterpolators:{
into:(0,_buildStyleInterpolator2.default)(FromTheBottom),
out:(0,_buildStyleInterpolator2.default)(Still)}}),


PushFromRight:babelHelpers.extends({},
_reactNative.Navigator.SceneConfigs.PushFromRight,{
animationInterpolators:{
into:(0,_buildStyleInterpolator2.default)(FromTheRight),
out:(0,_buildStyleInterpolator2.default)(ToTheLeft)}}),


ZoomFromFront:babelHelpers.extends({},
_reactNative.Navigator.SceneConfigs.FloatFromBottomAndroid,{
gestures:null,
springFriction:22,
defaultTransitionVelocity:3,
animationInterpolators:{
into:(0,_buildStyleInterpolator2.default)(FromTheFront),
out:(0,_buildStyleInterpolator2.default)(ToTheBack)}})};exports.default=




ExSceneConfigs;
});
__d('@exponent/react-native-navigator/ExNavigatorStyles.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);



var _Colors=require('@exponent/react-native-navigator/Colors.js');var _Colors2=babelHelpers.interopRequireDefault(_Colors);
var _Layout=require('@exponent/react-native-navigator/Layout.js');var _Layout2=babelHelpers.interopRequireDefault(_Layout);

var ExNavigatorStyles=_reactNative.StyleSheet.create({
navigator:{},
scene:{
backgroundColor:'#fff',
top:0,
left:0,
bottom:0,
right:0},

bar:{
backgroundColor:'#f8f8f8',
borderBottomColor:'#b2b2b2',
borderBottomWidth:_Layout2.default.pixel},

barTitleText:{
fontFamily:'.HelveticaNeueInterface-MediumP4',
fontSize:17,
marginTop:11+_Layout2.default.pixel},

barButtonIcon:{
tintColor:_Colors2.default.tint},

barButtonText:{
color:_Colors2.default.tint,
fontSize:17},

barLeftButton:{
paddingRight:40,
paddingBottom:6,
flexDirection:'row',
justifyContent:'flex-start'},

barLeftButtonText:{
color:_Colors2.default.tint,
fontSize:17,
marginTop:11+_Layout2.default.pixel,
marginLeft:8},

barLeftButtonIcon:{
tintColor:_Colors2.default.tint,
marginTop:11,
marginLeft:16},

barRightButton:{
paddingLeft:40,
paddingBottom:6,
flexDirection:'row',
justifyContent:'flex-end'},

barRightButtonText:{
color:_Colors2.default.tint,
fontSize:17,
marginTop:11+_Layout2.default.pixel,
marginRight:8},

barRightButtonIcon:{
tintColor:_Colors2.default.tint,
marginTop:12,
marginRight:16},

barBackButton:{
paddingRight:40,
paddingBottom:12,
flexDirection:'row',
justifyContent:'flex-end'},

barBackButtonText:{
marginTop:11,
marginLeft:6}});



ExNavigatorStyles.barButtonPressRetentionOffset={
top:40,
left:60,
right:60,
bottom:80};exports.default=


ExNavigatorStyles;
});
__d('@exponent/react-native-navigator/ExNavigatorIcons.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.BackIcon=undefined;

var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);



var _reactNativeResponsiveImage=require('@exponent/react-native-responsive-image/ResponsiveImage.js');var _reactNativeResponsiveImage2=babelHelpers.interopRequireDefault(_reactNativeResponsiveImage);

var _Layout=require('@exponent/react-native-navigator/Layout.js');var _Layout2=babelHelpers.interopRequireDefault(_Layout);var _ResponsiveImage$prop=

_reactNativeResponsiveImage2.default.propTypes;var sources=_ResponsiveImage$prop.sources;var iconPropTypes=babelHelpers.objectWithoutProperties(_ResponsiveImage$prop,['sources']);var 

BackIcon=exports.BackIcon=function(_React$Component){babelHelpers.inherits(BackIcon,_React$Component);function BackIcon(){babelHelpers.classCallCheck(this,BackIcon);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BackIcon).apply(this,arguments));}babelHelpers.createClass(BackIcon,[{key:'render',value:function render()


{
return (
_reactNative2.default.createElement(_reactNativeResponsiveImage2.default,babelHelpers.extends({},
this.props,{
sources:{
2:{
uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAqCAYAAACtMEtjAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABxpRE9UAAAAAgAAAAAAAAAVAAAAKAAAABUAAAAVAAABCxhsNeEAAADXSURBVFgJvJM9C8JQDEUrIiLiIA7iIDj4/xcnB3HQwcFvHARBEAQREVF01vPA0vAGM6TxQmjSkHteHm2S+KiP7djHOnMdkL6/Mcxe55uNBCSFhe1y1QS31Dx+9vIiTX9AAjT0zVriEG8gazOkAGCjQGbWNYoYbP8B2SmQuXWTEgZ7b0gZwEGBLOibVGH6SMivKc7NkCqAkzekBuCsQMJ/ZFKd6QsRX5GszZAGgKsCWdE3qcn0jZAnj3MzpAXg7g1pA3gokDV9kzpMP4n4imRthnQBvLwhHwAAAP//RYcLnAAAAMpJREFUvdYrC8JQAMXxKzLEIAYxGCwGP7wOH/P9Kq4oaJjBYBAMQxBBRLHquWGwIPeUoxcOg134/1ibMcbUsRf2dqyBO8mpofLE/oJVAT0I1sS95FRQuWOuL/MlEiJl7EawlgorIXQlWFuFFRG6EKyrwgoInQkWqLA8QjHBeiosh9CJYH0V5iF0JNhAhWUROhBspMIyCO0JNlZiO4JNVJjtbAg2VWIrgs2U2JJgCyU2d2ChErKt4RdsrUaSXieFbZOXv3raf4woHf8AvbFKeXDI5jkAAAAASUVORK5CYII=',
isStatic:true},

3:{
uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAA/CAYAAABjJtHDAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAhOAAAITgBRZYxYAAAABxpRE9UAAAAAgAAAAAAAAAgAAAAKAAAACAAAAAfAAABetwkrnwAAAFGSURBVGgFzNfPSwJREMBxK0IiCKSDeAg8dAi8eOjgxUuHLv6rnaJDHTwZ6KVDWvkDIZAghKSi3xbkd8AHohA7wfhmYHjwnN357OyyrKlU/DiBUI/PWBScsfU7zdriz/F2qjOwAJS96HGOIIDm19OYusYfsAA9jgG8SAALwKNlAVdodKmACVDqzUNg12SYSJK1aa6iwRrZUcJa1MsFmYbA+mSSSYWapcDWQd16hKVBDZSwK+rNb+UGTe48wjZB3XuEbYEaKmHyejG/lRmaPHiEbYMaKWE31JtPLEuTR4+wHKhnj7AdUC8eYXlQr0pYm3rzZ2yXJm8eYXug3pUw+Roxn1iBJh8eYUVQnx5h+6C+PMJKoMZKWJd682esTJNvj7CDf8B6HLNKmsYhZ/8hw/d8klVg8l/BNCqc3SVMrlz7HnviGPOJTQAAAP//IwzskAAAAUVJREFUzdixSwJhHMZxRUQaxEEQXBwaXBpanFxcXJz6C6MijQwtLVSyJnHIIQeHiAbBIRBBIhQzS+v5EQdCoPcsj77w45YXvh9Oebk7j+dvHeAyx/y4nAX2HWJkK4PSN4YBHsl0CKUxXyTwGPtlK4USCzyR6RBKYmYY5ic+VQITiH2SwKwSuI/YlATmlMA9xD5I4JkSGEdsQgDtv3quBO4iNiaBeSUwhtiIBF4ogVHE3klgQQmMIPZGAotKYBixIQm8VAJDiA1I4JUSGESsTwLLSuAOYq8k8FoJDCDWI4E3SqAfsS4JrCiBPsReSGBVCfQi9kQCa2pghwTeKoHWeiSBdTXwgQTeqYENEnivBlrQ7UtTU42znh0b64CtTcCcZmkFsO1s2uTVnpDtm8vyXbSjZ2uWvYg7QDu07fDeqmVfq54x/2C/yunX41hxMv0AAAAASUVORK5CYII=',
isStatic:true}},


style:[styles.backIcon,this.props.style]})));}}]);return BackIcon;}(_reactNative2.default.Component);BackIcon.propTypes=iconPropTypes;





var styles=_reactNative.StyleSheet.create({
backIcon:{
width:13,
height:21,
marginTop:11+_Layout2.default.pixel,
marginLeft:8}});
});
__d('@exponent/react-native-action-sheet/index.js',function(global, require, module, exports) {  'use strict';module.exports=require('@exponent/react-native-action-sheet/ActionSheet.android.js');
});
__d('react-native-router-flux/Animations.js',function(global, require, module, exports) {  'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require('react-native/Libraries/react-native/react-native.js');var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);

var _buildStyleInterpolator=require('buildStyleInterpolator');var _buildStyleInterpolator2=babelHelpers.interopRequireDefault(_buildStyleInterpolator);var PixelRatio=_reactNative2.default.PixelRatio;var Navigator=_reactNative2.default.Navigator;var Dimensions=_reactNative2.default.Dimensions;

var NoTransition={
opacity:{
from:1,
to:1,
min:1,
max:1,
type:'linear',
extrapolate:false,
round:100}};



var FadeToTheLeft={


transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-Math.round(Dimensions.get('window').width*0.3),y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},












transformScale:{
from:{x:1,y:1,z:1},
to:{x:0.95,y:1,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true},

opacity:{
from:1,
to:0.3,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

translateX:{
from:0,
to:-Math.round(Dimensions.get('window').width*0.3),
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

scaleX:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleY:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true}};





var FromTheRight={
opacity:{
value:1.0,
type:'constant'},


transformTranslate:{
from:{x:Dimensions.get('window').width,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},


translateX:{
from:Dimensions.get('window').width,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},


scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};





var Animations={
FlatFloatFromRight:babelHelpers.extends({},
Navigator.SceneConfigs.FloatFromRight,{
gestures:null,

animationInterpolators:{
into:(0,_buildStyleInterpolator2.default)(FromTheRight),
out:(0,_buildStyleInterpolator2.default)(FadeToTheLeft)}}),





None:babelHelpers.extends({},
Navigator.SceneConfigs.FloatFromRight,{
gestures:null,
defaultTransitionVelocity:100,
animationInterpolators:{
into:(0,_buildStyleInterpolator2.default)(NoTransition),
out:(0,_buildStyleInterpolator2.default)(NoTransition)}})};exports.default=




Animations;
});
__d('buildStyleInterpolator',function(global, require, module, exports) {  'use strict';










var keyOf=require('fbjs/lib/keyOf.js');

var X_DIM=keyOf({x:null});
var Y_DIM=keyOf({y:null});
var Z_DIM=keyOf({z:null});
var W_DIM=keyOf({w:null});

var TRANSFORM_ROTATE_NAME=keyOf({transformRotateRadians:null});

var ShouldAllocateReusableOperationVars={
transformRotateRadians:true,
transformScale:true,
transformTranslate:true};


var InitialOperationField={
transformRotateRadians:[0,0,0,1],
transformTranslate:[0,0,0],
transformScale:[1,1,1]};



























































var ARGUMENT_NAMES_RE=/([^\s,]+)/g;



















var inline=function(func,replaceWithArgs){
var fnStr=func.toString();
var parameterNames=fnStr.slice(fnStr.indexOf('(')+1,fnStr.indexOf(')')).
match(ARGUMENT_NAMES_RE)||
[];
var replaceRegexStr=parameterNames.map(function(paramName){
return '\\b'+paramName+'\\b';}).
join('|');
var replaceRegex=new RegExp(replaceRegexStr,'g');
var fnBody=fnStr.substring(fnStr.indexOf('{')+1,fnStr.lastIndexOf('}'));
var newFnBody=fnBody.replace(replaceRegex,function(parameterName){
var indexInParameterNames=parameterNames.indexOf(parameterName);
var replacementName=replaceWithArgs[indexInParameterNames];
return replacementName;});

return newFnBody.split('\n');};






var MatrixOps={
unroll:function(matVar,m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15){
m0=matVar[0];
m1=matVar[1];
m2=matVar[2];
m3=matVar[3];
m4=matVar[4];
m5=matVar[5];
m6=matVar[6];
m7=matVar[7];
m8=matVar[8];
m9=matVar[9];
m10=matVar[10];
m11=matVar[11];
m12=matVar[12];
m13=matVar[13];
m14=matVar[14];
m15=matVar[15];},


matrixDiffers:function(retVar,matVar,m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15){
retVar=retVar||
m0!==matVar[0]||
m1!==matVar[1]||
m2!==matVar[2]||
m3!==matVar[3]||
m4!==matVar[4]||
m5!==matVar[5]||
m6!==matVar[6]||
m7!==matVar[7]||
m8!==matVar[8]||
m9!==matVar[9]||
m10!==matVar[10]||
m11!==matVar[11]||
m12!==matVar[12]||
m13!==matVar[13]||
m14!==matVar[14]||
m15!==matVar[15];},


transformScale:function(matVar,opVar){

var x=opVar[0];
var y=opVar[1];
var z=opVar[2];
matVar[0]=matVar[0]*x;
matVar[1]=matVar[1]*x;
matVar[2]=matVar[2]*x;
matVar[3]=matVar[3]*x;
matVar[4]=matVar[4]*y;
matVar[5]=matVar[5]*y;
matVar[6]=matVar[6]*y;
matVar[7]=matVar[7]*y;
matVar[8]=matVar[8]*z;
matVar[9]=matVar[9]*z;
matVar[10]=matVar[10]*z;
matVar[11]=matVar[11]*z;
matVar[12]=matVar[12];
matVar[13]=matVar[13];
matVar[14]=matVar[14];
matVar[15]=matVar[15];},






transformTranslate:function(matVar,opVar){

var x=opVar[0];
var y=opVar[1];
var z=opVar[2];
matVar[12]=matVar[0]*x+matVar[4]*y+matVar[8]*z+matVar[12];
matVar[13]=matVar[1]*x+matVar[5]*y+matVar[9]*z+matVar[13];
matVar[14]=matVar[2]*x+matVar[6]*y+matVar[10]*z+matVar[14];
matVar[15]=matVar[3]*x+matVar[7]*y+matVar[11]*z+matVar[15];},






transformRotateRadians:function(matVar,q){

var xQuat=q[0],yQuat=q[1],zQuat=q[2],wQuat=q[3];
var x2Quat=xQuat+xQuat;
var y2Quat=yQuat+yQuat;
var z2Quat=zQuat+zQuat;
var xxQuat=xQuat*x2Quat;
var xyQuat=xQuat*y2Quat;
var xzQuat=xQuat*z2Quat;
var yyQuat=yQuat*y2Quat;
var yzQuat=yQuat*z2Quat;
var zzQuat=zQuat*z2Quat;
var wxQuat=wQuat*x2Quat;
var wyQuat=wQuat*y2Quat;
var wzQuat=wQuat*z2Quat;

var quatMat0=1-(yyQuat+zzQuat);
var quatMat1=xyQuat+wzQuat;
var quatMat2=xzQuat-wyQuat;
var quatMat4=xyQuat-wzQuat;
var quatMat5=1-(xxQuat+zzQuat);
var quatMat6=yzQuat+wxQuat;
var quatMat8=xzQuat+wyQuat;
var quatMat9=yzQuat-wxQuat;
var quatMat10=1-(xxQuat+yyQuat);



var a00=matVar[0];
var a01=matVar[1];
var a02=matVar[2];
var a03=matVar[3];
var a10=matVar[4];
var a11=matVar[5];
var a12=matVar[6];
var a13=matVar[7];
var a20=matVar[8];
var a21=matVar[9];
var a22=matVar[10];
var a23=matVar[11];

var b0=quatMat0,b1=quatMat1,b2=quatMat2;
matVar[0]=b0*a00+b1*a10+b2*a20;
matVar[1]=b0*a01+b1*a11+b2*a21;
matVar[2]=b0*a02+b1*a12+b2*a22;
matVar[3]=b0*a03+b1*a13+b2*a23;
b0=quatMat4;b1=quatMat5;b2=quatMat6;
matVar[4]=b0*a00+b1*a10+b2*a20;
matVar[5]=b0*a01+b1*a11+b2*a21;
matVar[6]=b0*a02+b1*a12+b2*a22;
matVar[7]=b0*a03+b1*a13+b2*a23;
b0=quatMat8;b1=quatMat9;b2=quatMat10;
matVar[8]=b0*a00+b1*a10+b2*a20;
matVar[9]=b0*a01+b1*a11+b2*a21;
matVar[10]=b0*a02+b1*a12+b2*a22;
matVar[11]=b0*a03+b1*a13+b2*a23;}};





var MatrixOpsInitial={
transformScale:function(matVar,opVar){

matVar[0]=opVar[0];
matVar[1]=0;
matVar[2]=0;
matVar[3]=0;
matVar[4]=0;
matVar[5]=opVar[1];
matVar[6]=0;
matVar[7]=0;
matVar[8]=0;
matVar[9]=0;
matVar[10]=opVar[2];
matVar[11]=0;
matVar[12]=0;
matVar[13]=0;
matVar[14]=0;
matVar[15]=1;},


transformTranslate:function(matVar,opVar){

matVar[0]=1;
matVar[1]=0;
matVar[2]=0;
matVar[3]=0;
matVar[4]=0;
matVar[5]=1;
matVar[6]=0;
matVar[7]=0;
matVar[8]=0;
matVar[9]=0;
matVar[10]=1;
matVar[11]=0;
matVar[12]=opVar[0];
matVar[13]=opVar[1];
matVar[14]=opVar[2];
matVar[15]=1;},







transformRotateRadians:function(matVar,q){


var xQuat=q[0],yQuat=q[1],zQuat=q[2],wQuat=q[3];
var x2Quat=xQuat+xQuat;
var y2Quat=yQuat+yQuat;
var z2Quat=zQuat+zQuat;
var xxQuat=xQuat*x2Quat;
var xyQuat=xQuat*y2Quat;
var xzQuat=xQuat*z2Quat;
var yyQuat=yQuat*y2Quat;
var yzQuat=yQuat*z2Quat;
var zzQuat=zQuat*z2Quat;
var wxQuat=wQuat*x2Quat;
var wyQuat=wQuat*y2Quat;
var wzQuat=wQuat*z2Quat;

var quatMat0=1-(yyQuat+zzQuat);
var quatMat1=xyQuat+wzQuat;
var quatMat2=xzQuat-wyQuat;
var quatMat4=xyQuat-wzQuat;
var quatMat5=1-(xxQuat+zzQuat);
var quatMat6=yzQuat+wxQuat;
var quatMat8=xzQuat+wyQuat;
var quatMat9=yzQuat-wxQuat;
var quatMat10=1-(xxQuat+yyQuat);



var b0=quatMat0,b1=quatMat1,b2=quatMat2;
matVar[0]=b0;
matVar[1]=b1;
matVar[2]=b2;
matVar[3]=0;
b0=quatMat4;b1=quatMat5;b2=quatMat6;
matVar[4]=b0;
matVar[5]=b1;
matVar[6]=b2;
matVar[7]=0;
b0=quatMat8;b1=quatMat9;b2=quatMat10;
matVar[8]=b0;
matVar[9]=b1;
matVar[10]=b2;
matVar[11]=0;
matVar[12]=0;
matVar[13]=0;
matVar[14]=0;
matVar[15]=1;}};




var setNextValAndDetectChange=function(name,tmpVarName){
return (
'  if (!didChange) {\n'+
'    var prevVal = result.'+name+';\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'    didChange = didChange  || ('+tmpVarName+' !== prevVal);\n'+
'  } else {\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'  }\n');};



var computeNextValLinear=function(anim,from,to,tmpVarName){
var hasRoundRatio='round' in anim;
var roundRatio=anim.round;
var fn='  ratio = (value - '+anim.min+') / '+(anim.max-anim.min)+';\n';
if(!anim.extrapolate){
fn+='  ratio = ratio > 1 ? 1 : (ratio < 0 ? 0 : ratio);\n';}


var roundOpen=hasRoundRatio?'Math.round('+roundRatio+' * ':'';
var roundClose=hasRoundRatio?') / '+roundRatio:'';
fn+=
'  '+tmpVarName+' = '+
roundOpen+
'('+from+' * (1 - ratio) + '+to+' * ratio)'+
roundClose+';\n';
return fn;};


var computeNextValLinearScalar=function(anim){
return computeNextValLinear(anim,anim.from,anim.to,'nextScalarVal');};


var computeNextValConstant=function(anim){
var constantExpression=JSON.stringify(anim.value);
return '  nextScalarVal = '+constantExpression+';\n';};


var computeNextValStep=function(anim){
return (
'  nextScalarVal = value >= '+(
anim.threshold+' ? '+anim.to+' : '+anim.from)+';\n');};



var computeNextValIdentity=function(anim){
return '  nextScalarVal = value;\n';};


var operationVar=function(name){
return name+'ReuseOp';};


var createReusableOperationVars=function(anims){
var ret='';
for(var name in anims){
if(ShouldAllocateReusableOperationVars[name]){
ret+='var '+operationVar(name)+' = [];\n';}}


return ret;};


var newlines=function(statements){
return '\n'+statements.join('\n')+'\n';};








var computeNextMatrixOperationField=function(anim,name,dimension,index){
var fieldAccess=operationVar(name)+'['+index+']';
if(anim.from[dimension]!==undefined&&anim.to[dimension]!==undefined){
return '  '+anim.from[dimension]!==anim.to[dimension]?
computeNextValLinear(anim,anim.from[dimension],anim.to[dimension],fieldAccess):
fieldAccess+' = '+anim.from[dimension]+';';}else 
{
return '  '+fieldAccess+' = '+InitialOperationField[name][index]+';';}};



var unrolledVars=[];
for(var varIndex=0;varIndex<16;varIndex++){
unrolledVars.push('m'+varIndex);}

var setNextMatrixAndDetectChange=function(orderedMatrixOperations){
var fn=[
'  var transformMatrix = result.transformMatrix !== undefined ? '+
'result.transformMatrix : (result.transformMatrix = []);'];

fn.push.apply(
fn,
inline(MatrixOps.unroll,['transformMatrix'].concat(unrolledVars)));

for(var i=0;i<orderedMatrixOperations.length;i++){
var opName=orderedMatrixOperations[i];
if(i===0){
fn.push.apply(
fn,
inline(MatrixOpsInitial[opName],['transformMatrix',operationVar(opName)]));}else 

{
fn.push.apply(
fn,
inline(MatrixOps[opName],['transformMatrix',operationVar(opName)]));}}



fn.push.apply(
fn,
inline(MatrixOps.matrixDiffers,['didChange','transformMatrix'].concat(unrolledVars)));

return fn;};


var InterpolateMatrix={
transformTranslate:true,
transformRotateRadians:true,
transformScale:true};


var createFunctionString=function(anims){


var orderedMatrixOperations=[];



var fn='return (function() {\n';
fn+=createReusableOperationVars(anims);
fn+='return function(result, value) {\n';
fn+='  var didChange = false;\n';
fn+='  var nextScalarVal;\n';
fn+='  var ratio;\n';

for(var name in anims){
var anim=anims[name];
if(anim.type==='linear'){
if(InterpolateMatrix[name]){
orderedMatrixOperations.push(name);
var setOperations=[
computeNextMatrixOperationField(anim,name,X_DIM,0),
computeNextMatrixOperationField(anim,name,Y_DIM,1),
computeNextMatrixOperationField(anim,name,Z_DIM,2)];

if(name===TRANSFORM_ROTATE_NAME){
setOperations.push(computeNextMatrixOperationField(anim,name,W_DIM,3));}

fn+=newlines(setOperations);}else 
{
fn+=computeNextValLinearScalar(anim,'nextScalarVal');
fn+=setNextValAndDetectChange(name,'nextScalarVal');}}else 

if(anim.type==='constant'){
fn+=computeNextValConstant(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}else 
if(anim.type==='step'){
fn+=computeNextValStep(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}else 
if(anim.type==='identity'){
fn+=computeNextValIdentity(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}}


if(orderedMatrixOperations.length){
fn+=newlines(setNextMatrixAndDetectChange(orderedMatrixOperations));}

fn+='  return didChange;\n';
fn+='};\n';
fn+='})()';
return fn;};







var buildStyleInterpolator=function(anims){

var interpolator=null;
function lazyStyleInterpolator(result,value){
if(interpolator===null){
interpolator=Function(createFunctionString(anims))();}

return interpolator(result,value);}

return lazyStyleInterpolator;};


module.exports=buildStyleInterpolator;
});
__d('NavigationLegacyNavigator',function(global, require, module, exports) {  'use strict';

































var NavigationLegacyNavigator=require('Navigator');

module.exports=NavigationLegacyNavigator;
});
__d('HMRLoadingView',function(global, require, module, exports) {  'use strict';













var ToastAndroid=require('ToastAndroid');

var TOAST_SHORT_DELAY=2000;var 

HMRLoadingView=function(){function HMRLoadingView(){babelHelpers.classCallCheck(this,HMRLoadingView);}babelHelpers.createClass(HMRLoadingView,null,[{key:'showMessage',value:function showMessage(


message){
if(HMRLoadingView._showing){
return;}

ToastAndroid.show(message,ToastAndroid.SHORT);
HMRLoadingView._showing=true;
setTimeout(function(){
HMRLoadingView._showing=false;},
TOAST_SHORT_DELAY);}},{key:'hide',value:function hide()


{}}]);return HMRLoadingView;}();




module.exports=HMRLoadingView;
});
__d('NavigationTypeDefinition',function(global, require, module, exports) {  'use strict';












var Animated=require('Animated');
});
__d('NavigationPropTypes',function(global, require, module, exports) {  'use strict';



















var Animated=require('Animated');
var React=require('react-native/Libraries/react-native/react-native.js');var 

PropTypes=React.PropTypes;


var action=PropTypes.shape({
type:PropTypes.string.isRequired});



var animatedValue=PropTypes.instanceOf(Animated.Value);


var navigationState=PropTypes.shape({
key:PropTypes.string.isRequired});



var navigationParentState=PropTypes.shape({
index:PropTypes.number.isRequired,
key:PropTypes.string.isRequired,
children:PropTypes.arrayOf(navigationState)});



var layout=PropTypes.shape({
height:animatedValue,
initHeight:PropTypes.number.isRequired,
initWidth:PropTypes.number.isRequired,
width:animatedValue});



var scene=PropTypes.shape({
index:PropTypes.number.isRequired,
isStale:PropTypes.bool.isRequired,
navigationState:navigationState});



var SceneRenderer={
layout:layout.isRequired,
navigationState:navigationParentState.isRequired,
onNavigate:PropTypes.func.isRequired,
position:animatedValue.isRequired,
scene:scene.isRequired,
scenes:PropTypes.arrayOf(scene).isRequired};


module.exports={
SceneRenderer:SceneRenderer,
action:action,
navigationParentState:navigationParentState,
navigationState:navigationState};
});
__d('InteractionMixin',function(global, require, module, exports) {  'use strict';







var InteractionManager=require('InteractionManager');






var InteractionMixin={
componentWillUnmount:function(){
while(this._interactionMixinHandles.length){
InteractionManager.clearInteractionHandle(
this._interactionMixinHandles.pop());}},




_interactionMixinHandles:[],

createInteractionHandle:function(){
var handle=InteractionManager.createInteractionHandle();
this._interactionMixinHandles.push(handle);
return handle;},


clearInteractionHandle:function(clearHandle){
InteractionManager.clearInteractionHandle(clearHandle);
this._interactionMixinHandles=this._interactionMixinHandles.filter(
function(handle){return handle!==clearHandle;});},








runAfterInteractions:function(callback){
InteractionManager.runAfterInteractions(callback);}};



module.exports=InteractionMixin;
});
__d('ReactNativeGlobalInteractionHandler',function(global, require, module, exports) {  'use strict';












var InteractionManager=require('InteractionManager');



var interactionHandle=null;

var ReactNativeGlobalInteractionHandler={
onChange:function(numberActiveTouches){
if(numberActiveTouches===0){
if(interactionHandle){
InteractionManager.clearInteractionHandle(interactionHandle);
interactionHandle=null;}}else 

if(!interactionHandle){
interactionHandle=InteractionManager.createInteractionHandle();}}};




module.exports=ReactNativeGlobalInteractionHandler;
});
__d('NavigatorSceneConfigs',function(global, require, module, exports) {  'use strict';



























var Dimensions=require('Dimensions');
var PixelRatio=require('PixelRatio');

var buildStyleInterpolator=require('buildStyleInterpolator');

var SCREEN_WIDTH=Dimensions.get('window').width;
var SCREEN_HEIGHT=Dimensions.get('window').height;

var FadeToTheLeft={


transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-Math.round(Dimensions.get('window').width*0.3),y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},












transformScale:{
from:{x:1,y:1,z:1},
to:{x:0.95,y:0.95,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true},

opacity:{
from:1,
to:0.3,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

translateX:{
from:0,
to:-Math.round(Dimensions.get('window').width*0.3),
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

scaleX:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleY:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true}};



var FadeToTheRight=babelHelpers.extends({},
FadeToTheLeft,{
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:Math.round(SCREEN_WIDTH*0.3),y:0,z:0}},

translateX:{
from:0,
to:Math.round(SCREEN_WIDTH*0.3)}});



var FadeIn={
opacity:{
from:0,
to:1,
min:0.5,
max:1,
type:'linear',
extrapolate:false,
round:100}};



var FadeOut={
opacity:{
from:1,
to:0,
min:0,
max:0.5,
type:'linear',
extrapolate:false,
round:100}};



var ToTheLeft={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-Dimensions.get('window').width,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

opacity:{
value:1.0,
type:'constant'},


translateX:{
from:0,
to:-Dimensions.get('window').width,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}};



var ToTheUp={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:-Dimensions.get('window').height,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

opacity:{
value:1.0,
type:'constant'},

translateY:{
from:0,
to:-Dimensions.get('window').height,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}};



var ToTheDown={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:Dimensions.get('window').height,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

opacity:{
value:1.0,
type:'constant'},

translateY:{
from:0,
to:Dimensions.get('window').height,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}};



var FromTheRight={
opacity:{
value:1.0,
type:'constant'},


transformTranslate:{
from:{x:Dimensions.get('window').width,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},


translateX:{
from:Dimensions.get('window').width,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},


scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var FromTheLeft=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{x:-SCREEN_WIDTH,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateX:{
from:-SCREEN_WIDTH,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}});



var FromTheDown=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{y:SCREEN_HEIGHT,x:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateY:{
from:SCREEN_HEIGHT,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}});



var FromTheTop=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{y:-SCREEN_HEIGHT,x:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateY:{
from:-SCREEN_HEIGHT,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}});



var ToTheBack={


transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

transformScale:{
from:{x:1,y:1,z:1},
to:{x:0.95,y:0.95,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true},

opacity:{
from:1,
to:0.3,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

scaleX:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleY:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true}};



var FromTheFront={
opacity:{
value:1.0,
type:'constant'},


transformTranslate:{
from:{x:0,y:Dimensions.get('window').height,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateY:{
from:Dimensions.get('window').height,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var ToTheBackAndroid={
opacity:{
value:1,
type:'constant'}};



var FromTheFrontAndroid={
opacity:{
from:0,
to:1,
min:0.5,
max:1,
type:'linear',
extrapolate:false,
round:100},

transformTranslate:{
from:{x:0,y:100,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateY:{
from:100,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}};



var BaseOverswipeConfig={
frictionConstant:1,
frictionByDistance:1.5};


var BaseLeftToRightGesture={


isDetachable:false,


gestureDetectMovement:2,


notMoving:0.3,


directionRatio:0.66,


snapVelocity:2,


edgeHitWidth:30,


stillCompletionRatio:3/5,

fullDistance:SCREEN_WIDTH,

direction:'left-to-right'};



var BaseRightToLeftGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
direction:'right-to-left'});


var BaseDownUpGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
fullDistance:SCREEN_HEIGHT,
direction:'down-to-up'});


var BaseUpDownGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
fullDistance:SCREEN_HEIGHT,
direction:'up-to-down'});


var BaseConfig={

gestures:{
pop:BaseLeftToRightGesture},



springFriction:26,
springTension:200,


defaultTransitionVelocity:1.5,


animationInterpolators:{
into:buildStyleInterpolator(FromTheRight),
out:buildStyleInterpolator(FadeToTheLeft)}};



var NavigatorSceneConfigs={
PushFromRight:babelHelpers.extends({},
BaseConfig),


FloatFromRight:babelHelpers.extends({},
BaseConfig),


FloatFromLeft:babelHelpers.extends({},
BaseConfig,{
gestures:{
pop:BaseRightToLeftGesture},

animationInterpolators:{
into:buildStyleInterpolator(FromTheLeft),
out:buildStyleInterpolator(FadeToTheRight)}}),


FloatFromBottom:babelHelpers.extends({},
BaseConfig,{
gestures:{
pop:babelHelpers.extends({},
BaseLeftToRightGesture,{
edgeHitWidth:150,
direction:'top-to-bottom',
fullDistance:SCREEN_HEIGHT})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheFront),
out:buildStyleInterpolator(ToTheBack)}}),


FloatFromBottomAndroid:babelHelpers.extends({},
BaseConfig,{
gestures:null,
defaultTransitionVelocity:3,
springFriction:20,
animationInterpolators:{
into:buildStyleInterpolator(FromTheFrontAndroid),
out:buildStyleInterpolator(ToTheBackAndroid)}}),


FadeAndroid:babelHelpers.extends({},
BaseConfig,{
gestures:null,
animationInterpolators:{
into:buildStyleInterpolator(FadeIn),
out:buildStyleInterpolator(FadeOut)}}),


HorizontalSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseLeftToRightGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseRightToLeftGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheRight),
out:buildStyleInterpolator(ToTheLeft)}}),


HorizontalSwipeJumpFromRight:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseRightToLeftGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseLeftToRightGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

pop:BaseRightToLeftGesture},

animationInterpolators:{
into:buildStyleInterpolator(FromTheLeft),
out:buildStyleInterpolator(FadeToTheRight)}}),


VerticalUpSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseDownUpGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseDownUpGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheDown),
out:buildStyleInterpolator(ToTheUp)}}),


VerticalDownSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseUpDownGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseUpDownGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheTop),
out:buildStyleInterpolator(ToTheDown)}})};




module.exports=NavigatorSceneConfigs;
});
__d('deprecatedPropType',function(global, require, module, exports) {  'use strict';












var UIManager=require('UIManager');




function deprecatedPropType(
propType,
explanation)
{
return function validate(props,propName,componentName){

if(!UIManager[componentName]&&props[propName]!==undefined){
console.warn('`'+propName+'` supplied to `'+componentName+'` has been deprecated. '+explanation);}


return propType(props,propName,componentName);};}



module.exports=deprecatedPropType;
});
__d('processDecelerationRate',function(global, require, module, exports) {  'use strict';











var ScrollViewConsts=require('UIManager').RCTScrollView.Constants;

function processDecelerationRate(decelerationRate){
var ScrollViewDecelerationRateNormal=ScrollViewConsts&&ScrollViewConsts.DecelerationRate.normal;
var ScrollViewDecelerationRateFast=ScrollViewConsts&&ScrollViewConsts.DecelerationRate.fast;

if(typeof decelerationRate==='string'){
if(decelerationRate==='fast'){
return ScrollViewDecelerationRateFast;}else 
if(decelerationRate==='normal'){
return ScrollViewDecelerationRateNormal;}}


return decelerationRate;}


module.exports=processDecelerationRate;
});
__d('ImageEditor',function(global, require, module, exports) {  'use strict';












var RCTImageEditingManager=require('NativeModules').ImageEditingManager;var 




































ImageEditor=function(){function ImageEditor(){babelHelpers.classCallCheck(this,ImageEditor);}babelHelpers.createClass(ImageEditor,null,[{key:'cropImage',value:function cropImage(











uri,
cropData,
success,
failure)
{
RCTImageEditingManager.cropImage(uri,cropData,success,failure);}}]);return ImageEditor;}();



module.exports=ImageEditor;
});
__d('ImageStore',function(global, require, module, exports) {  'use strict';












var RCTImageStoreManager=require('NativeModules').ImageStoreManager;var 

ImageStore=function(){function ImageStore(){babelHelpers.classCallCheck(this,ImageStore);}babelHelpers.createClass(ImageStore,null,[{key:'hasImageForTag',value:function hasImageForTag(




uri,callback){
if(RCTImageStoreManager.hasImageForTag){
RCTImageStoreManager.hasImageForTag(uri,callback);}else 
{
console.warn('hasImageForTag() not implemented');}}},{key:'removeImageForTag',value:function removeImageForTag(











uri){
if(RCTImageStoreManager.removeImageForTag){
RCTImageStoreManager.removeImageForTag(uri);}else 
{
console.warn('removeImageForTag() not implemented');}}},{key:'addImageFromBase64',value:function addImageFromBase64(















base64ImageData,
success,
failure)
{
RCTImageStoreManager.addImageFromBase64(base64ImageData,success,failure);}},{key:'getBase64ForTag',value:function getBase64ForTag(














uri,
success,
failure)
{
RCTImageStoreManager.getBase64ForTag(uri,success,failure);}}]);return ImageStore;}();



module.exports=ImageStore;
});
__d('ToastAndroid',function(global, require, module, exports) {  'use strict';












var RCTToastAndroid=require('NativeModules').ToastAndroid;









var ToastAndroid={

SHORT:RCTToastAndroid.SHORT,
LONG:RCTToastAndroid.LONG,

show:function(
message,
duration)
{
RCTToastAndroid.show(message,duration);}};




module.exports=ToastAndroid;
});
__d('AdSupportIOS',function(global, require, module, exports) {  'use strict';












var AdSupport=require('NativeModules').AdSupport;

module.exports={
getAdvertisingId:function(onSuccess,onFailure){
AdSupport.getAdvertisingId(onSuccess,onFailure);},


getAdvertisingTrackingEnabled:function(onSuccess,onFailure){
AdSupport.getAdvertisingTrackingEnabled(onSuccess,onFailure);}};
});
__d('AlertIOS',function(global, require, module, exports) {  'use strict';












var RCTAlertManager=require('NativeModules').AlertManager;var 






























AlertIOS=function(){function AlertIOS(){babelHelpers.classCallCheck(this,AlertIOS);}babelHelpers.createClass(AlertIOS,null,[{key:'alert',value:function alert(

























title,
message,
callbackOrButtons,
type)
{
if(typeof type!=='undefined'){
console.warn('AlertIOS.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
this.prompt(title,message,callbackOrButtons,type);
return;}

this.prompt(title,message,callbackOrButtons,'default');}},{key:'prompt',value:function prompt(











































title,
message,
callbackOrButtons)


{var type=arguments.length<=3||arguments[3]===undefined?'plain-text':arguments[3];var defaultValue=arguments[4];
if(typeof type==='function'){
console.warn(
'You passed a callback function as the "type" argument to AlertIOS.prompt(). React Native is '+
'assuming  you want to use the deprecated AlertIOS.prompt(title, defaultValue, buttons, callback) '+
'signature. The current signature is AlertIOS.prompt(title, message, callbackOrButtons, type, defaultValue) '+
'and the old syntax will be removed in a future version.');

var callback=type;
var defaultValue=message;
RCTAlertManager.alertWithArgs({
title:title||undefined,
type:'plain-text',
defaultValue:defaultValue},
function(id,value){
callback(value);});

return;}


var callbacks=[];
var buttons=[];
var cancelButtonKey;
var destructiveButtonKey;
if(typeof callbackOrButtons==='function'){
callbacks=[callbackOrButtons];}else 

if(callbackOrButtons instanceof Array){
callbackOrButtons.forEach(function(btn,index){
callbacks[index]=btn.onPress;
if(btn.style==='cancel'){
cancelButtonKey=String(index);}else 
if(btn.style==='destructive'){
destructiveButtonKey=String(index);}

if(btn.text||index<(callbackOrButtons||[]).length-1){
var btnDef={};
btnDef[index]=btn.text||'';
buttons.push(btnDef);}});}




RCTAlertManager.alertWithArgs({
title:title||undefined,
message:message||undefined,
buttons:buttons,
type:type||undefined,
defaultValue:defaultValue,
cancelButtonKey:cancelButtonKey,
destructiveButtonKey:destructiveButtonKey},
function(id,value){
var cb=callbacks[id];
cb&&cb(value);});}}]);return AlertIOS;}();




module.exports=AlertIOS;
});
__d('AsyncStorage',function(global, require, module, exports) {  'use strict';













var NativeModules=require('NativeModules');
var RCTAsyncSQLiteStorage=NativeModules.AsyncSQLiteDBStorage;
var RCTAsyncRocksDBStorage=NativeModules.AsyncRocksDBStorage;
var RCTAsyncFileStorage=NativeModules.AsyncLocalStorage;


var RCTAsyncStorage=RCTAsyncRocksDBStorage||RCTAsyncSQLiteStorage||RCTAsyncFileStorage;













var AsyncStorage={
_getRequests:[],
_getKeys:[],
_immediate:null,





getItem:function(
key,
callback)
{
return new Promise(function(resolve,reject){
RCTAsyncStorage.multiGet([key],function(errors,result){

var value=result&&result[0]&&result[0][1]?result[0][1]:null;
var errs=convertErrors(errors);
callback&&callback(errs&&errs[0],value);
if(errs){
reject(errs[0]);}else 
{
resolve(value);}});});},









setItem:function(
key,
value,
callback)
{
return new Promise(function(resolve,reject){
RCTAsyncStorage.multiSet([[key,value]],function(errors){
var errs=convertErrors(errors);
callback&&callback(errs&&errs[0]);
if(errs){
reject(errs[0]);}else 
{
resolve(null);}});});},








removeItem:function(
key,
callback)
{
return new Promise(function(resolve,reject){
RCTAsyncStorage.multiRemove([key],function(errors){
var errs=convertErrors(errors);
callback&&callback(errs&&errs[0]);
if(errs){
reject(errs[0]);}else 
{
resolve(null);}});});},









mergeItem:function(
key,
value,
callback)
{
return new Promise(function(resolve,reject){
RCTAsyncStorage.multiMerge([[key,value]],function(errors){
var errs=convertErrors(errors);
callback&&callback(errs&&errs[0]);
if(errs){
reject(errs[0]);}else 
{
resolve(null);}});});},










clear:function(callback){
return new Promise(function(resolve,reject){
RCTAsyncStorage.clear(function(error){
callback&&callback(convertError(error));
if(error&&convertError(error)){
reject(convertError(error));}else 
{
resolve(null);}});});},








getAllKeys:function(callback){
return new Promise(function(resolve,reject){
RCTAsyncStorage.getAllKeys(function(error,keys){
callback&&callback(convertError(error),keys);
if(error){
reject(convertError(error));}else 
{
resolve(keys);}});});},
















flushGetRequests:function(){
var getRequests=this._getRequests;
var getKeys=this._getKeys;

this._getRequests=[];
this._getKeys=[];

RCTAsyncStorage.multiGet(getKeys,function(errors,result){






var map={};
result.forEach(function(_ref){var _ref2=babelHelpers.slicedToArray(_ref,2);var key=_ref2[0];var value=_ref2[1];return map[key]=value;});
var reqLength=getRequests.length;
for(var i=0;i<reqLength;i++){
var request=getRequests[i];
var requestKeys=request.keys;
var requestResult=requestKeys.map(function(key){return [key,map[key]];});
request.callback&&request.callback(null,requestResult);
request.resolve&&request.resolve(requestResult);}});},










multiGet:function(
keys,
callback)
{var _this=this;
if(!this._immediate){
this._immediate=setImmediate(function(){
_this._immediate=null;
_this.flushGetRequests();});}



var getRequest={
keys:keys,
callback:callback,

keyIndex:this._getKeys.length,
resolve:null,
reject:null};


var promiseResult=new Promise(function(resolve,reject){
getRequest.resolve=resolve;
getRequest.reject=reject;});


this._getRequests.push(getRequest);

keys.forEach(function(key){
if(_this._getKeys.indexOf(key)===-1){
_this._getKeys.push(key);}});



return promiseResult;},








multiSet:function(
keyValuePairs,
callback)
{
return new Promise(function(resolve,reject){
RCTAsyncStorage.multiSet(keyValuePairs,function(errors){
var error=convertErrors(errors);
callback&&callback(error);
if(error){
reject(error);}else 
{
resolve(null);}});});},








multiRemove:function(
keys,
callback)
{
return new Promise(function(resolve,reject){
RCTAsyncStorage.multiRemove(keys,function(errors){
var error=convertErrors(errors);
callback&&callback(error);
if(error){
reject(error);}else 
{
resolve(null);}});});},











multiMerge:function(
keyValuePairs,
callback)
{
return new Promise(function(resolve,reject){
RCTAsyncStorage.multiMerge(keyValuePairs,function(errors){
var error=convertErrors(errors);
callback&&callback(error);
if(error){
reject(error);}else 
{
resolve(null);}});});}};







if(!RCTAsyncStorage.multiMerge){
delete AsyncStorage.mergeItem;
delete AsyncStorage.multiMerge;}


function convertErrors(errs){
if(!errs){
return null;}

return (Array.isArray(errs)?errs:[errs]).map(function(e){return convertError(e);});}


function convertError(error){
if(!error){
return null;}

var out=new Error(error.message);
out.key=error.key;
return out;}


module.exports=AsyncStorage;
});
__d('BackAndroid',function(global, require, module, exports) {  'use strict';












var DeviceEventManager=require('NativeModules').DeviceEventManager;
var RCTDeviceEventEmitter=require('RCTDeviceEventEmitter');

var DEVICE_BACK_EVENT='hardwareBackPress';





var _backPressSubscriptions=new Set();

RCTDeviceEventEmitter.addListener(DEVICE_BACK_EVENT,function(){
var backPressSubscriptions=new Set(_backPressSubscriptions);
var invokeDefault=true;
backPressSubscriptions.forEach(function(subscription){
if(subscription()){
invokeDefault=false;}});


if(invokeDefault){
BackAndroid.exitApp();}});



















var BackAndroid={

exitApp:function(){
DeviceEventManager.invokeDefaultBackPressHandler();},


addEventListener:function(
eventName,
handler)
{
_backPressSubscriptions.add(handler);
return {
remove:function(){return BackAndroid.removeEventListener(eventName,handler);}};},



removeEventListener:function(
eventName,
handler)
{
_backPressSubscriptions.delete(handler);}};




module.exports=BackAndroid;
});
__d('DatePickerAndroid',function(global, require, module, exports) {  'use strict';












var DatePickerModule=require('NativeModules').DatePickerAndroid;




function _toMillis(options,key){
var dateVal=options[key];

if(typeof dateVal==='object'&&typeof dateVal.getMonth==='function'){
options[key]=dateVal.getTime();}}var 























DatePickerAndroid=function(){function DatePickerAndroid(){babelHelpers.classCallCheck(this,DatePickerAndroid);}babelHelpers.createClass(DatePickerAndroid,null,[{key:'open',value:function open(
















options){var 
optionsMs;return regeneratorRuntime.async(function open$(_context){while(1){switch(_context.prev=_context.next){case 0:optionsMs=options;
if(optionsMs){
_toMillis(options,'date');
_toMillis(options,'minDate');
_toMillis(options,'maxDate');}return _context.abrupt('return',

DatePickerModule.open(options));case 3:case 'end':return _context.stop();}}},null,this);}},{key:'dateSetAction',get:function()





{return 'dateSetAction';}},{key:'dismissedAction',get:function()



{return 'dismissedAction';}}]);return DatePickerAndroid;}();


module.exports=DatePickerAndroid;
});
__d('ImagePickerIOS',function(global, require, module, exports) {  'use strict';












var RCTImagePicker=require('NativeModules').ImagePickerIOS;

var ImagePickerIOS={
canRecordVideos:function(callback){
return RCTImagePicker.canRecordVideos(callback);},

canUseCamera:function(callback){
return RCTImagePicker.canUseCamera(callback);},

openCameraDialog:function(config,successCallback,cancelCallback){
config=babelHelpers.extends({
videoMode:false},
config);

return RCTImagePicker.openCameraDialog(config,successCallback,cancelCallback);},

openSelectDialog:function(config,successCallback,cancelCallback){
config=babelHelpers.extends({
showImages:true,
showVideos:false},
config);

return RCTImagePicker.openSelectDialog(config,successCallback,cancelCallback);}};



module.exports=ImagePickerIOS;
});
__d('TimePickerAndroid',function(global, require, module, exports) {  'use strict';












var TimePickerModule=require('NativeModules').TimePickerAndroid;var 





















TimePickerAndroid=function(){function TimePickerAndroid(){babelHelpers.classCallCheck(this,TimePickerAndroid);}babelHelpers.createClass(TimePickerAndroid,null,[{key:'open',value:function open(
















options){return regeneratorRuntime.async(function open$(_context){while(1){switch(_context.prev=_context.next){case 0:return _context.abrupt('return',
TimePickerModule.open(options));case 1:case 'end':return _context.stop();}}},null,this);}},{key:'timeSetAction',get:function()





{return 'timeSetAction';}},{key:'dismissedAction',get:function()



{return 'dismissedAction';}}]);return TimePickerAndroid;}();


module.exports=TimePickerAndroid;
});
__d('Platform',function(global, require, module, exports) {  'use strict';













var Platform={
OS:'android',
get Version(){return require('NativeModules').AndroidConstants.Version;}};


module.exports=Platform;
});
__d('RCTNetworking',function(global, require, module, exports) {  'use strict';













var RCTNetworkingNative=require('NativeModules').Networking;

var _requestId=1;
var generateRequestId=function(){
return _requestId++;};var 






RCTNetworking=function(){function RCTNetworking(){babelHelpers.classCallCheck(this,RCTNetworking);}babelHelpers.createClass(RCTNetworking,null,[{key:'sendRequest',value:function sendRequest(

method,url,headers,data,useIncrementalUpdates,timeout){
var requestId=generateRequestId();
RCTNetworkingNative.sendRequest(
method,
url,
requestId,
headers,
data,
useIncrementalUpdates,
timeout);
return requestId;}},{key:'abortRequest',value:function abortRequest(


requestId){
RCTNetworkingNative.abortRequest(requestId);}},{key:'clearCookies',value:function clearCookies(


callback){
RCTNetworkingNative.clearCookies(callback);}}]);return RCTNetworking;}();



module.exports=RCTNetworking;
});
__d('TextInputState',function(global, require, module, exports) {  'use strict';
















var Platform=require('Platform');
var UIManager=require('UIManager');

var TextInputState={



_currentlyFocusedID:null,





currentlyFocusedField:function(){
return this._currentlyFocusedID;},







focusTextInput:function(textFieldID){
if(this._currentlyFocusedID!==textFieldID&&textFieldID!==null){
this._currentlyFocusedID=textFieldID;
if(Platform.OS==='ios'){
UIManager.focus(textFieldID);}else 
if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.focusTextInput,
null);}}},










blurTextInput:function(textFieldID){
if(this._currentlyFocusedID===textFieldID&&textFieldID!==null){
this._currentlyFocusedID=null;
if(Platform.OS==='ios'){
UIManager.blur(textFieldID);}else 
if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.blurTextInput,
null);}}}};






module.exports=TextInputState;
});
__d('Alert',function(global, require, module, exports) {  'use strict';












var AlertIOS=require('AlertIOS');
var Platform=require('Platform');
var DialogModuleAndroid=require('NativeModules').DialogManagerAndroid;var 















































Alert=function(){function Alert(){babelHelpers.classCallCheck(this,Alert);}babelHelpers.createClass(Alert,null,[{key:'alert',value:function alert(


title,
message,
buttons,
type)
{
if(Platform.OS==='ios'){
if(typeof type!=='undefined'){
console.warn('Alert.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
AlertIOS.alert(title,message,buttons,type);
return;}

AlertIOS.alert(title,message,buttons);}else 
if(Platform.OS==='android'){
AlertAndroid.alert(title,message,buttons);}}}]);return Alert;}();var 







AlertAndroid=function(){function AlertAndroid(){babelHelpers.classCallCheck(this,AlertAndroid);}babelHelpers.createClass(AlertAndroid,null,[{key:'alert',value:function alert(


title,
message,
buttons)
{
var config={
title:title||'',
message:message||''};



var validButtons=buttons?buttons.slice(0,3):[{text:'OK'}];
var buttonPositive=validButtons.pop();
var buttonNegative=validButtons.pop();
var buttonNeutral=validButtons.pop();
if(buttonNeutral){
config=babelHelpers.extends({},config,{buttonNeutral:buttonNeutral.text||''});}

if(buttonNegative){
config=babelHelpers.extends({},config,{buttonNegative:buttonNegative.text||''});}

if(buttonPositive){
config=babelHelpers.extends({},config,{buttonPositive:buttonPositive.text||''});}

DialogModuleAndroid.showAlert(
config,
function(errorMessage){return console.warn(message);},
function(action,buttonKey){
if(action!==DialogModuleAndroid.buttonClicked){
return;}

if(buttonKey===DialogModuleAndroid.buttonNeutral){
buttonNeutral.onPress&&buttonNeutral.onPress();}else 
if(buttonKey===DialogModuleAndroid.buttonNegative){
buttonNegative.onPress&&buttonNegative.onPress();}else 
if(buttonKey===DialogModuleAndroid.buttonPositive){
buttonPositive.onPress&&buttonPositive.onPress();}});}}]);return AlertAndroid;}();






module.exports=Alert;
});
__d('Vibration',function(global, require, module, exports) {  'use strict';












var RCTVibration=require('NativeModules').Vibration;
var Platform=require('Platform');













var Vibration={
vibrate:function(){var duration=arguments.length<=0||arguments[0]===undefined?400:arguments[0];
if(Platform.OS==='android'){
RCTVibration.vibrate(duration);}else 
{
RCTVibration.vibrate();}}};




module.exports=Vibration;
});
__d('react/lib/ReactDOM.native.js',function(global, require, module, exports) {  'use strict';

var ReactUpdates=require('ReactUpdates');






module.exports={
unstable_batchedUpdates:ReactUpdates.batchedUpdates};
});
__d('ActivityIndicatorIOS',function(global, require, module, exports) {  'use strict';











var React=require('React');
var View=require('View');

var ActivityIndicatorIOS=React.createClass({displayName:'ActivityIndicatorIOS',
render:function(){
return React.createElement(View,this.props);}});



module.exports=ActivityIndicatorIOS;
});
__d('DatePickerIOS',function(global, require, module, exports) {  'use strict';












var React=require('React');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var View=require('View');

var DummyDatePickerIOS=React.createClass({displayName:'DummyDatePickerIOS',
render:function(){
return (
React.createElement(View,{style:[styles.dummyDatePickerIOS,this.props.style]},
React.createElement(Text,{style:styles.datePickerText},'DatePickerIOS is not supported on this platform!')));}});





var styles=StyleSheet.create({
dummyDatePickerIOS:{
height:100,
width:300,
backgroundColor:'#ffbcbc',
borderWidth:1,
borderColor:'red',
alignItems:'center',
justifyContent:'center',
margin:10},

datePickerText:{
color:'#333333',
margin:20}});



module.exports=DummyDatePickerIOS;
});
__d('StaticRenderer',function(global, require, module, exports) {  'use strict';












var React=require('React');

var StaticRenderer=React.createClass({displayName:'StaticRenderer',
propTypes:{
shouldUpdate:React.PropTypes.bool.isRequired,
render:React.PropTypes.func.isRequired},


shouldComponentUpdate:function(nextProps){
return nextProps.shouldUpdate;},


render:function(){
return this.props.render();}});



module.exports=StaticRenderer;
});
__d('UnimplementedView',function(global, require, module, exports) {  'use strict';








var React=require('React');
var StyleSheet=require('StyleSheet');

var UnimplementedView=React.createClass({displayName:'UnimplementedView',
setNativeProps:function(){},




render:function(){

var View=require('View');
return (
React.createElement(View,{style:[styles.unimplementedView,this.props.style]},
this.props.children));}});





var styles=StyleSheet.create({
unimplementedView:{
borderWidth:1,
borderColor:'red',
alignSelf:'flex-start'}});



module.exports=UnimplementedView;
});
__d('ProgressViewIOS',function(global, require, module, exports) {  'use strict';













var React=require('React');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var View=require('View');

var DummyProgressViewIOS=React.createClass({displayName:'DummyProgressViewIOS',
render:function(){
return (
React.createElement(View,{style:[styles.dummy,this.props.style]},
React.createElement(Text,{style:styles.text},'ProgressViewIOS is not supported on this platform!')));}});







var styles=StyleSheet.create({
dummy:{
width:120,
height:20,
backgroundColor:'#ffbcbc',
borderWidth:1,
borderColor:'red',
alignItems:'center',
justifyContent:'center'},

text:{
color:'#333333',
margin:5,
fontSize:10}});



module.exports=DummyProgressViewIOS;
});
__d('SegmentedControlIOS',function(global, require, module, exports) {  'use strict';













var React=require('React');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var View=require('View');

var DummySegmentedControlIOS=React.createClass({displayName:'DummySegmentedControlIOS',
render:function(){
return (
React.createElement(View,{style:[styles.dummy,this.props.style]},
React.createElement(Text,{style:styles.text},'SegmentedControlIOS is not supported on this platform!')));}});







var styles=StyleSheet.create({
dummy:{
width:120,
height:50,
backgroundColor:'#ffbcbc',
borderWidth:1,
borderColor:'red',
alignItems:'center',
justifyContent:'center'},

text:{
color:'#333333',
margin:5,
fontSize:10}});



module.exports=DummySegmentedControlIOS;
});
__d('RefreshControl',function(global, require, module, exports) {  'use strict';












var React=require('React');
var Platform=require('Platform');
var ColorPropType=require('ColorPropType');
var View=require('View');

var requireNativeComponent=require('requireNativeComponent');

if(Platform.OS==='android'){
var RefreshLayoutConsts=require('NativeModules').UIManager.AndroidSwipeRefreshLayout.Constants;}else 
{
var RefreshLayoutConsts={SIZE:{}};}







var RefreshControl=React.createClass({displayName:'RefreshControl',
statics:{
SIZE:RefreshLayoutConsts.SIZE},


propTypes:babelHelpers.extends({},
View.propTypes,{



onRefresh:React.PropTypes.func,



refreshing:React.PropTypes.bool,




tintColor:ColorPropType,




title:React.PropTypes.string,




enabled:React.PropTypes.bool,




colors:React.PropTypes.arrayOf(ColorPropType),




progressBackgroundColor:ColorPropType,




size:React.PropTypes.oneOf(RefreshLayoutConsts.SIZE.DEFAULT,RefreshLayoutConsts.SIZE.LARGE)}),


render:function(){
return React.createElement(NativeRefreshControl,this.props);}});



if(Platform.OS==='ios'){
var NativeRefreshControl=requireNativeComponent(
'RCTRefreshControl',
RefreshControl);}else 

if(Platform.OS==='android'){
var NativeRefreshControl=requireNativeComponent(
'AndroidSwipeRefreshLayout',
RefreshControl);}



module.exports=RefreshControl;
});
__d('StatusBar',function(global, require, module, exports) {  'use strict';












var React=require('React');
var ColorPropType=require('ColorPropType');
var Platform=require('Platform');

var processColor=require('processColor');

var StatusBarManager=require('NativeModules').StatusBarManager;



















function mergePropsStack(propsStack,defaultValues){
return propsStack.reduce(function(prev,cur){
return babelHelpers.extends(prev,cur);},
defaultValues);}





































var StatusBar=React.createClass({displayName:'StatusBar',
statics:{
_propsStack:[],
_defaultProps:{
backgroundColor:'black',
barStyle:'default',
translucent:false,
hidden:false,
networkActivityIndicatorVisible:false},




setHidden:function(hidden,animation){
animation=animation||'none';
StatusBar._defaultProps.hidden=hidden;
if(Platform.OS==='ios'){
StatusBarManager.setHidden(hidden,animation);}else 
if(Platform.OS==='android'){
StatusBarManager.setHidden(hidden);}},



setBarStyle:function(style,animated){
if(Platform.OS!=='ios'){
console.warn('`setBarStyle` is only available on iOS');
return;}

animated=animated||false;
StatusBar._defaultProps.barStyle=style;
StatusBarManager.setStyle(style,animated);},


setNetworkActivityIndicatorVisible:function(visible){
if(Platform.OS!=='ios'){
console.warn('`setNetworkActivityIndicatorVisible` is only available on iOS');
return;}

StatusBar._defaultProps.networkActivityIndicatorVisible=visible;
StatusBarManager.setNetworkActivityIndicatorVisible(visible);},


setBackgroundColor:function(color,animated){
if(Platform.OS!=='android'){
console.warn('`setBackgroundColor` is only available on Android');
return;}

animated=animated||false;
StatusBar._defaultProps.backgroundColor=color;
StatusBarManager.setColor(processColor(color),animated);},


setTranslucent:function(translucent){
if(Platform.OS!=='android'){
console.warn('`setTranslucent` is only available on Android');
return;}

StatusBar._defaultProps.translucent=translucent;
StatusBarManager.setTranslucent(translucent);}},



propTypes:{



hidden:React.PropTypes.bool,




animated:React.PropTypes.bool,




backgroundColor:ColorPropType,







translucent:React.PropTypes.bool,





barStyle:React.PropTypes.oneOf([
'default',
'light-content']),






networkActivityIndicatorVisible:React.PropTypes.bool,






showHideTransition:React.PropTypes.oneOf([
'fade',
'slide'])},



getDefaultProps:function(){
return {
animated:false,
showHideTransition:'fade'};},



componentDidMount:function(){




StatusBar._propsStack.push(this.props);
this._updatePropsStack();},


componentWillUnmount:function(){


var index=StatusBar._propsStack.indexOf(this.props);
StatusBar._propsStack.splice(index,1);

this._updatePropsStack();},


componentDidUpdate:function(oldProps){
var index=StatusBar._propsStack.indexOf(oldProps);
StatusBar._propsStack[index]=this.props;

this._updatePropsStack();},





_updatePropsStack:function(){
var mergedProps=mergePropsStack(StatusBar._propsStack,StatusBar._defaultProps);

if(Platform.OS==='ios'){
if(mergedProps.barStyle!==undefined){
StatusBarManager.setStyle(mergedProps.barStyle,this.props.animated);}

if(mergedProps.hidden!==undefined){
StatusBarManager.setHidden(
mergedProps.hidden,
this.props.animated?this.props.showHideTransition:'none');}


if(mergedProps.networkActivityIndicatorVisible!==undefined){
StatusBarManager.setNetworkActivityIndicatorVisible(
mergedProps.networkActivityIndicatorVisible);}}else 


if(Platform.OS==='android'){
if(mergedProps.backgroundColor!==undefined){
StatusBarManager.setColor(processColor(mergedProps.backgroundColor),this.props.animated);}

if(mergedProps.hidden!==undefined){
StatusBarManager.setHidden(mergedProps.hidden);}

if(mergedProps.translucent!==undefined){
StatusBarManager.setTranslucent(mergedProps.translucent);}}},




render:function(){
return null;}});



module.exports=StatusBar;
});
__d('SwitchIOS',function(global, require, module, exports) {  'use strict';












var React=require('React');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var View=require('View');

var DummySwitchIOS=React.createClass({displayName:'DummySwitchIOS',
render:function(){
return (
React.createElement(View,{style:[styles.dummySwitchIOS,this.props.style]},
React.createElement(Text,{style:styles.text},'SwitchIOS is not supported on this platform!')));}});





var styles=StyleSheet.create({
dummySwitchIOS:{
width:120,
height:50,
backgroundColor:'#ffbcbc',
borderWidth:1,
borderColor:'red',
alignItems:'center',
justifyContent:'center'},

text:{
color:'#333333',
margin:5,
fontSize:10}});



module.exports=DummySwitchIOS;
});
__d('TabBarIOS',function(global, require, module, exports) {  'use strict';












var React=require('React');
var View=require('View');
var StyleSheet=require('StyleSheet');

var DummyTabBarIOS=React.createClass({displayName:'DummyTabBarIOS',
render:function(){
return (
React.createElement(View,{style:[this.props.style,styles.tabGroup]},
this.props.children));}});





var styles=StyleSheet.create({
tabGroup:{
flex:1}});



module.exports=DummyTabBarIOS;
});
__d('BorderBox',function(global, require, module, exports) {  'use strict';












var React=require('React');
var View=require('View');var 

BorderBox=function(_React$Component){babelHelpers.inherits(BorderBox,_React$Component);function BorderBox(){babelHelpers.classCallCheck(this,BorderBox);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BorderBox).apply(this,arguments));}babelHelpers.createClass(BorderBox,[{key:'render',value:function render()
{
var box=this.props.box;
if(!box){
return this.props.children;}

var style={
borderTopWidth:box.top,
borderBottomWidth:box.bottom,
borderLeftWidth:box.left,
borderRightWidth:box.right};

return (
React.createElement(View,{style:[style,this.props.style]},
this.props.children));}}]);return BorderBox;}(React.Component);





module.exports=BorderBox;
});
__d('StyleInspector',function(global, require, module, exports) {  'use strict';












var React=require('React');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var View=require('View');var 

StyleInspector=function(_React$Component){babelHelpers.inherits(StyleInspector,_React$Component);function StyleInspector(){babelHelpers.classCallCheck(this,StyleInspector);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(StyleInspector).apply(this,arguments));}babelHelpers.createClass(StyleInspector,[{key:'render',value:function render()
{var _this2=this;
if(!this.props.style){
return React.createElement(Text,{style:styles.noStyle},'No style');}

var names=Object.keys(this.props.style);
return (
React.createElement(View,{style:styles.container},
React.createElement(View,null,
names.map(function(name){return React.createElement(Text,{key:name,style:styles.attr},name,':');})),


React.createElement(View,null,
names.map(function(name){
var value=typeof _this2.props.style[name]==='object'?JSON.stringify(_this2.props.style[name]):_this2.props.style[name];
return React.createElement(Text,{key:name,style:styles.value},value);}))));}}]);return StyleInspector;}(React.Component);







var styles=StyleSheet.create({
container:{
flexDirection:'row'},

row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around'},

attr:{
fontSize:10,
color:'#ccc'},

value:{
fontSize:10,
color:'white',
marginLeft:10},

noStyle:{
color:'white',
fontSize:10}});



module.exports=StyleInspector;
});
__d('Portal',function(global, require, module, exports) {  'use strict';







var Platform=require('Platform');
var React=require('React');
var StyleSheet=require('StyleSheet');
var UIManager=require('UIManager');
var View=require('View');

var _portalRef;


var lastUsedTag=0;













var Portal=React.createClass({displayName:'Portal',
statics:{






allocateTag:function(){
return '__modal_'+ ++lastUsedTag;},








showModal:function(tag,component){
if(!_portalRef){
console.error('Calling showModal but no Portal has been rendered.');
return;}

_portalRef._showModal(tag,component);},







closeModal:function(tag){
if(!_portalRef){
console.error('Calling closeModal but no Portal has been rendered.');
return;}

_portalRef._closeModal(tag);},





getOpenModals:function(){
if(!_portalRef){
console.error('Calling getOpenModals but no Portal has been rendered.');
return [];}

return _portalRef._getOpenModals();},


notifyAccessibilityService:function(){
if(!_portalRef){
console.error('Calling closeModal but no Portal has been rendered.');
return;}

_portalRef._notifyAccessibilityService();}},



getInitialState:function(){
return {modals:{}};},


_showModal:function(tag,component){


if(this._getOpenModals().length===0){
this.props.onModalVisibilityChanged(true);}



this.setState(function(state){
var modals=state.modals;
modals[tag]=component;
return {modals:modals};});},



_closeModal:function(tag){
if(!this.state.modals.hasOwnProperty(tag)){
return;}



if(this._getOpenModals().length===1){
this.props.onModalVisibilityChanged(false);}



this.setState(function(state){
var modals=state.modals;
delete modals[tag];
return {modals:modals};});},



_getOpenModals:function(){
return Object.keys(this.state.modals);},


_notifyAccessibilityService:function(){var _this=this;
if(Platform.OS==='android'){


setTimeout(function(){
if(_this._getOpenModals().length>0){
UIManager.sendAccessibilityEvent(
React.findNodeHandle(_this),
UIManager.AccessibilityEventTypes.typeWindowStateChanged);}},

0);}},



render:function(){
_portalRef=this;
if(!this.state.modals){
return null;}

var modals=[];
for(var tag in this.state.modals){
modals.push(this.state.modals[tag]);}

if(modals.length===0){
return null;}

return (
React.createElement(View,{
style:styles.modalsContainer,
importantForAccessibility:'yes'},
modals));}});





var styles=StyleSheet.create({
modalsContainer:{
position:'absolute',
left:0,
top:0,
right:0,
bottom:0}});



module.exports=Portal;
});
__d('react-native/Libraries/react-native/react-native.js',function(global, require, module, exports) {  'use strict';












var ReactNative=babelHelpers.extends({

get ActivityIndicatorIOS(){return require('ActivityIndicatorIOS');},
get ART(){return require('ReactNativeART');},
get DatePickerIOS(){return require('DatePickerIOS');},
get DrawerLayoutAndroid(){return require('DrawerLayoutAndroid');},
get Image(){return require('Image');},
get ImageEditor(){return require('ImageEditor');},
get ImageStore(){return require('ImageStore');},
get ListView(){return require('ListView');},
get MapView(){return require('MapView');},
get Modal(){return require('Modal');},
get Navigator(){return require('Navigator');},
get NavigatorIOS(){return require('NavigatorIOS');},
get Picker(){return require('Picker');},
get PickerIOS(){return require('PickerIOS');},
get ProgressBarAndroid(){return require('ProgressBarAndroid');},
get ProgressViewIOS(){return require('ProgressViewIOS');},
get ScrollView(){return require('ScrollView');},
get SegmentedControlIOS(){return require('SegmentedControlIOS');},
get SliderIOS(){return require('SliderIOS');},
get SnapshotViewIOS(){return require('SnapshotViewIOS');},
get Switch(){return require('Switch');},
get PullToRefreshViewAndroid(){return require('PullToRefreshViewAndroid');},
get RecyclerViewBackedScrollView(){return require('RecyclerViewBackedScrollView');},
get RefreshControl(){return require('RefreshControl');},
get StatusBar(){return require('StatusBar');},
get SwitchAndroid(){return require('SwitchAndroid');},
get SwitchIOS(){return require('SwitchIOS');},
get TabBarIOS(){return require('TabBarIOS');},
get Text(){return require('Text');},
get TextInput(){return require('TextInput');},
get ToastAndroid(){return require('ToastAndroid');},
get ToolbarAndroid(){return require('ToolbarAndroid');},
get Touchable(){return require('Touchable');},
get TouchableHighlight(){return require('TouchableHighlight');},
get TouchableNativeFeedback(){return require('TouchableNativeFeedback');},
get TouchableOpacity(){return require('TouchableOpacity');},
get TouchableWithoutFeedback(){return require('TouchableWithoutFeedback');},
get View(){return require('View');},
get ViewPagerAndroid(){return require('ViewPagerAndroid');},
get WebView(){return require('WebView');},


get ActionSheetIOS(){return require('ActionSheetIOS');},
get AdSupportIOS(){return require('AdSupportIOS');},
get Alert(){return require('Alert');},
get AlertIOS(){return require('AlertIOS');},
get Animated(){return require('Animated');},
get AppRegistry(){return require('AppRegistry');},
get AppState(){return require('AppState');},
get AppStateIOS(){return require('AppStateIOS');},
get AsyncStorage(){return require('AsyncStorage');},
get BackAndroid(){return require('BackAndroid');},
get CameraRoll(){return require('CameraRoll');},
get Clipboard(){return require('Clipboard');},
get DatePickerAndroid(){return require('DatePickerAndroid');},
get Dimensions(){return require('Dimensions');},
get Easing(){return require('Easing');},
get ImagePickerIOS(){return require('ImagePickerIOS');},
get IntentAndroid(){return require('IntentAndroid');},
get InteractionManager(){return require('InteractionManager');},
get LayoutAnimation(){return require('LayoutAnimation');},
get Linking(){return require('Linking');},
get LinkingIOS(){return require('LinkingIOS');},
get NavigationExperimental(){return require('NavigationExperimental');},
get NetInfo(){return require('NetInfo');},
get PanResponder(){return require('PanResponder');},
get PixelRatio(){return require('PixelRatio');},
get PushNotificationIOS(){return require('PushNotificationIOS');},
get Settings(){return require('Settings');},
get StatusBarIOS(){return require('StatusBarIOS');},
get StyleSheet(){return require('StyleSheet');},
get TimePickerAndroid(){return require('TimePickerAndroid');},
get UIManager(){return require('UIManager');},
get Vibration(){return require('Vibration');},
get VibrationIOS(){return require('VibrationIOS');},


get DeviceEventEmitter(){return require('RCTDeviceEventEmitter');},
get NativeAppEventEmitter(){return require('RCTNativeAppEventEmitter');},
get NativeModules(){return require('NativeModules');},
get Platform(){return require('Platform');},
get processColor(){return require('processColor');},
get requireNativeComponent(){return require('requireNativeComponent');},


get ColorPropType(){return require('ColorPropType');},
get EdgeInsetsPropType(){return require('EdgeInsetsPropType');},
get PointPropType(){return require('PointPropType');},


addons:{
get LinkedStateMixin(){return require('LinkedStateMixin');},
Perf:undefined,
get PureRenderMixin(){return require('ReactComponentWithPureRenderMixin');},
get TestModule(){return require('NativeModules').TestModule;},
TestUtils:undefined,
get batchedUpdates(){return require('ReactUpdates').batchedUpdates;},
get cloneWithProps(){return require('cloneWithProps');},
get createFragment(){return require('ReactFragment').create;},
get update(){return require('update');}}},




require('React'));


if(__DEV__){
Object.defineProperty(ReactNative.addons,'Perf',{
enumerable:true,
get:function(){return require('ReactDefaultPerf');}});

Object.defineProperty(ReactNative.addons,'TestUtils',{
enumerable:true,
get:function(){return require('ReactTestUtils');}});}



module.exports=ReactNative;
});
__d('ReactNativeART',function(global, require, module, exports) {  'use strict';











var Color=require('art/core/color.js');
var Path=require('ARTSerializablePath');
var Transform=require('art/core/transform.js');

var React=require('React');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');

var createReactNativeComponentClass=require('createReactNativeComponentClass');
var merge=require('merge');



function arrayDiffer(a,b){
if(a==null){
return true;}

if(a.length!==b.length){
return true;}

for(var i=0;i<a.length;i++){
if(a[i]!==b[i]){
return true;}}


return false;}


function fontAndLinesDiffer(a,b){
if(a===b){
return false;}

if(a.font!==b.font){
if(a.font===null){
return true;}

if(b.font===null){
return true;}


if(
a.font.fontFamily!==b.font.fontFamily||
a.font.fontSize!==b.font.fontSize||
a.font.fontWeight!==b.font.fontWeight||
a.font.fontStyle!==b.font.fontStyle)
{
return true;}}


return arrayDiffer(a.lines,b.lines);}




var SurfaceViewAttributes=merge(ReactNativeViewAttributes.UIView,{});





var NodeAttributes={
transform:{diff:arrayDiffer},
opacity:true};


var GroupAttributes=merge(NodeAttributes,{
clipping:{diff:arrayDiffer}});


var RenderableAttributes=merge(NodeAttributes,{
fill:{diff:arrayDiffer},
stroke:{diff:arrayDiffer},
strokeWidth:true,
strokeCap:true,
strokeJoin:true,
strokeDash:{diff:arrayDiffer}});


var ShapeAttributes=merge(RenderableAttributes,{
d:{diff:arrayDiffer}});


var TextAttributes=merge(RenderableAttributes,{
alignment:true,
frame:{diff:fontAndLinesDiffer},
path:{diff:arrayDiffer}});




var NativeSurfaceView=createReactNativeComponentClass({
validAttributes:SurfaceViewAttributes,
uiViewClassName:'ARTSurfaceView'});


var NativeGroup=createReactNativeComponentClass({
validAttributes:GroupAttributes,
uiViewClassName:'ARTGroup'});


var NativeShape=createReactNativeComponentClass({
validAttributes:ShapeAttributes,
uiViewClassName:'ARTShape'});


var NativeText=createReactNativeComponentClass({
validAttributes:TextAttributes,
uiViewClassName:'ARTText'});




function childrenAsString(children){
if(!children){
return '';}

if(typeof children==='string'){
return children;}

if(children.length){
return children.join('\n');}

return '';}




var Surface=React.createClass({displayName:'Surface',

render:function(){
var props=this.props;
var w=extractNumber(props.width,0);
var h=extractNumber(props.height,0);
return (
React.createElement(NativeSurfaceView,{style:[props.style,{width:w,height:h}]},
this.props.children));}});











function extractNumber(value,defaultValue){
if(value==null){
return defaultValue;}

return +value;}


var pooledTransform=new Transform();

function extractTransform(props){
var scaleX=props.scaleX!=null?props.scaleX:
props.scale!=null?props.scale:1;
var scaleY=props.scaleY!=null?props.scaleY:
props.scale!=null?props.scale:1;

pooledTransform.
transformTo(1,0,0,1,0,0).
move(props.x||0,props.y||0).
rotate(props.rotation||0,props.originX,props.originY).
scale(scaleX,scaleY,props.originX,props.originY);

if(props.transform!=null){
pooledTransform.transform(props.transform);}


return [
pooledTransform.xx,pooledTransform.yx,
pooledTransform.xy,pooledTransform.yy,
pooledTransform.x,pooledTransform.y];}



function extractOpacity(props){

if(props.visible===false){
return 0;}

if(props.opacity==null){
return 1;}

return +props.opacity;}







var Group=React.createClass({displayName:'Group',

render:function(){
var props=this.props;
return (
React.createElement(NativeGroup,{
opacity:extractOpacity(props),
transform:extractTransform(props)},
this.props.children));}});






var ClippingRectangle=React.createClass({displayName:'ClippingRectangle',

render:function(){
var props=this.props;
var x=extractNumber(props.x,0);
var y=extractNumber(props.y,0);
var w=extractNumber(props.width,0);
var h=extractNumber(props.height,0);
var clipping=new Path().
moveTo(x,y).
line(w,0).
line(0,h).
line(w,0).
close().
toJSON();

var propsExcludingXAndY=merge(props);
delete propsExcludingXAndY.x;
delete propsExcludingXAndY.y;
return (
React.createElement(NativeGroup,{
clipping:clipping,
opacity:extractOpacity(props),
transform:extractTransform(propsExcludingXAndY)},
this.props.children));}});








var SOLID_COLOR=0;
var LINEAR_GRADIENT=1;
var RADIAL_GRADIENT=2;
var PATTERN=3;

function insertColorIntoArray(color,targetArray,atIndex){
var c=new Color(color);
targetArray[atIndex+0]=c.red/255;
targetArray[atIndex+1]=c.green/255;
targetArray[atIndex+2]=c.blue/255;
targetArray[atIndex+3]=c.alpha;}


function insertColorsIntoArray(stops,targetArray,atIndex){
var i=0;
if('length' in stops){
while(i<stops.length){
insertColorIntoArray(stops[i],targetArray,atIndex+i*4);
i++;}}else 

{
for(var offset in stops){
insertColorIntoArray(stops[offset],targetArray,atIndex+i*4);
i++;}}


return atIndex+i*4;}


function insertOffsetsIntoArray(stops,targetArray,atIndex,multi,reverse){
var offsetNumber;
var i=0;
if('length' in stops){
while(i<stops.length){
offsetNumber=i/(stops.length-1)*multi;
targetArray[atIndex+i]=reverse?1-offsetNumber:offsetNumber;
i++;}}else 

{
for(var offsetString in stops){
offsetNumber=+offsetString*multi;
targetArray[atIndex+i]=reverse?1-offsetNumber:offsetNumber;
i++;}}


return atIndex+i;}


function insertColorStopsIntoArray(stops,targetArray,atIndex){
var lastIndex=insertColorsIntoArray(stops,targetArray,atIndex);
insertOffsetsIntoArray(stops,targetArray,lastIndex,1,false);}


function insertDoubleColorStopsIntoArray(stops,targetArray,atIndex){
var lastIndex=insertColorsIntoArray(stops,targetArray,atIndex);
lastIndex=insertColorsIntoArray(stops,targetArray,lastIndex);
lastIndex=insertOffsetsIntoArray(stops,targetArray,lastIndex,0.5,false);
insertOffsetsIntoArray(stops,targetArray,lastIndex,0.5,true);}


function applyBoundingBoxToBrushData(brushData,props){
var type=brushData[0];
var width=+props.width;
var height=+props.height;
if(type===LINEAR_GRADIENT){
brushData[1]*=width;
brushData[2]*=height;
brushData[3]*=width;
brushData[4]*=height;}else 
if(type===RADIAL_GRADIENT){
brushData[1]*=width;
brushData[2]*=height;
brushData[3]*=width;
brushData[4]*=height;
brushData[5]*=width;
brushData[6]*=height;}else 
if(type===PATTERN){}}




function extractBrush(colorOrBrush,props){
if(colorOrBrush==null){
return null;}

if(colorOrBrush._brush){
if(colorOrBrush._bb){





applyBoundingBoxToBrushData(colorOrBrush._brush,props);
colorOrBrush._bb=false;}

return colorOrBrush._brush;}

var c=new Color(colorOrBrush);
return [SOLID_COLOR,c.red/255,c.green/255,c.blue/255,c.alpha];}


function extractColor(color){
if(color==null){
return null;}

var c=new Color(color);
return [c.red/255,c.green/255,c.blue/255,c.alpha];}


function extractStrokeCap(strokeCap){
switch(strokeCap){
case 'butt':return 0;
case 'square':return 2;
default:return 1;}}



function extractStrokeJoin(strokeJoin){
switch(strokeJoin){
case 'miter':return 0;
case 'bevel':return 2;
default:return 1;}}








var Shape=React.createClass({displayName:'Shape',

render:function(){
var props=this.props;
var path=props.d||childrenAsString(props.children);
var d=new Path(path).toJSON();
return (
React.createElement(NativeShape,{
fill:extractBrush(props.fill,props),
opacity:extractOpacity(props),
stroke:extractColor(props.stroke),
strokeCap:extractStrokeCap(props.strokeCap),
strokeDash:props.strokeDash||null,
strokeJoin:extractStrokeJoin(props.strokeJoin),
strokeWidth:extractNumber(props.strokeWidth,1),
transform:extractTransform(props),

d:d}));}});








var cachedFontObjectsFromString={};

var fontFamilyPrefix=/^[\s"']*/;
var fontFamilySuffix=/[\s"']*$/;

function extractSingleFontFamily(fontFamilyString){



return fontFamilyString.split(',')[0].
replace(fontFamilyPrefix,'').
replace(fontFamilySuffix,'');}


function parseFontString(font){
if(cachedFontObjectsFromString.hasOwnProperty(font)){
return cachedFontObjectsFromString[font];}

var regexp=/^\s*((?:(?:normal|bold|italic)\s+)*)(?:(\d+(?:\.\d+)?)[ptexm\%]*(?:\s*\/.*?)?\s+)?\s*\"?([^\"]*)/i;
var match=regexp.exec(font);
if(!match){
return null;}

var fontFamily=extractSingleFontFamily(match[3]);
var fontSize=+match[2]||12;
var isBold=/bold/.exec(match[1]);
var isItalic=/italic/.exec(match[1]);
cachedFontObjectsFromString[font]={
fontFamily:fontFamily,
fontSize:fontSize,
fontWeight:isBold?'bold':'normal',
fontStyle:isItalic?'italic':'normal'};

return cachedFontObjectsFromString[font];}


function extractFont(font){
if(font==null){
return null;}

if(typeof font==='string'){
return parseFontString(font);}

var fontFamily=extractSingleFontFamily(font.fontFamily);
var fontSize=+font.fontSize||12;
return {

fontFamily:fontFamily,
fontSize:fontSize,
fontWeight:font.fontWeight,
fontStyle:font.fontStyle};}



var newLine=/\n/g;
function extractFontAndLines(font,text){
return {font:extractFont(font),lines:text.split(newLine)};}


function extractAlignment(alignment){
switch(alignment){
case 'right':
return 1;
case 'center':
return 2;
default:
return 0;}}



var Text=React.createClass({displayName:'Text',

render:function(){
var props=this.props;
var textPath=props.path?new Path(props.path).toJSON():null;
var textFrame=extractFontAndLines(
props.font,
childrenAsString(props.children));

return (
React.createElement(NativeText,{
fill:extractBrush(props.fill,props),
opacity:extractOpacity(props),
stroke:extractColor(props.stroke),
strokeCap:extractStrokeCap(props.strokeCap),
strokeDash:props.strokeDash||null,
strokeJoin:extractStrokeJoin(props.strokeJoin),
strokeWidth:extractNumber(props.strokeWidth,1),
transform:extractTransform(props),

alignment:extractAlignment(props.alignment),
frame:textFrame,
path:textPath}));}});








function LinearGradient(stops,x1,y1,x2,y2){
var type=LINEAR_GRADIENT;

if(arguments.length<5){
var angle=(x1==null?270:x1)*Math.PI/180;

var x=Math.cos(angle);
var y=-Math.sin(angle);
var l=(Math.abs(x)+Math.abs(y))/2;

x*=l;y*=l;

x1=0.5-x;
x2=0.5+x;
y1=0.5-y;
y2=0.5+y;
this._bb=true;}else 
{
this._bb=false;}


var brushData=[type,+x1,+y1,+x2,+y2];
insertColorStopsIntoArray(stops,brushData,5);
this._brush=brushData;}


function RadialGradient(stops,fx,fy,rx,ry,cx,cy){
if(ry==null){
ry=rx;}

if(cx==null){
cx=fx;}

if(cy==null){
cy=fy;}

if(fx==null){


fx=fy=rx=ry=cx=cy=0.5;
this._bb=true;}else 
{
this._bb=false;}





var brushData=[RADIAL_GRADIENT,+fx,+fy,+rx*2,+ry*2,+cx,+cy];
insertDoubleColorStopsIntoArray(stops,brushData,7);
this._brush=brushData;}


function Pattern(url,width,height,left,top){
this._brush=[PATTERN,url,+left||0,+top||0,+width,+height];}





function CSSBackgroundPattern(){
return new Color('rgba(0,0,0,0)');}


var ReactART={
LinearGradient:LinearGradient,
RadialGradient:RadialGradient,
Pattern:Pattern,
Transform:Transform,
Path:Path,
Surface:Surface,
Group:Group,
ClippingRectangle:ClippingRectangle,
Shape:Shape,
Text:Text,
CSSBackgroundPattern:CSSBackgroundPattern};


module.exports=ReactART;
});
__d('NavigatorNavigationBarStylesAndroid',function(global, require, module, exports) {  'use strict';



























var buildStyleInterpolator=require('buildStyleInterpolator');
var merge=require('merge');


var NAV_BAR_HEIGHT=56;
var TITLE_LEFT=72;
var BUTTON_SIZE=24;
var TOUCH_TARGT_SIZE=48;
var BUTTON_HORIZONTAL_MARGIN=16;

var BUTTON_EFFECTIVE_MARGIN=BUTTON_HORIZONTAL_MARGIN-(TOUCH_TARGT_SIZE-BUTTON_SIZE)/2;
var NAV_ELEMENT_HEIGHT=NAV_BAR_HEIGHT;

var BASE_STYLES={
Title:{
position:'absolute',
bottom:0,
left:0,
right:0,
alignItems:'flex-start',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent',
marginLeft:TITLE_LEFT},

LeftButton:{
position:'absolute',
top:0,
left:BUTTON_EFFECTIVE_MARGIN,
overflow:'hidden',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent'},

RightButton:{
position:'absolute',
top:0,
right:BUTTON_EFFECTIVE_MARGIN,
overflow:'hidden',
alignItems:'flex-end',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent'}};










var Stages={
Left:{
Title:merge(BASE_STYLES.Title,{opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})},

Center:{
Title:merge(BASE_STYLES.Title,{opacity:1}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:1}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:1})},

Right:{
Title:merge(BASE_STYLES.Title,{opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})}};




var opacityRatio=100;

function buildSceneInterpolators(startStyles,endStyles){
return {
Title:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Title.opacity,
to:endStyles.Title.opacity,
min:0,
max:1},

left:{
type:'linear',
from:startStyles.Title.left,
to:endStyles.Title.left,
min:0,
max:1,
extrapolate:true}}),


LeftButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.LeftButton.opacity,
to:endStyles.LeftButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.LeftButton.left,
to:endStyles.LeftButton.left,
min:0,
max:1}}),


RightButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.RightButton.opacity,
to:endStyles.RightButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.RightButton.left,
to:endStyles.RightButton.left,
min:0,
max:1,
extrapolate:true}})};}





var Interpolators={

RightToCenter:buildSceneInterpolators(Stages.Right,Stages.Center),

CenterToLeft:buildSceneInterpolators(Stages.Center,Stages.Left),

RightToLeft:buildSceneInterpolators(Stages.Right,Stages.Left)};



module.exports={
General:{
NavBarHeight:NAV_BAR_HEIGHT,
StatusBarHeight:0,
TotalNavHeight:NAV_BAR_HEIGHT},

Interpolators:Interpolators,
Stages:Stages};
});
__d('NavigatorNavigationBarStylesIOS',function(global, require, module, exports) {  'use strict';



























var Dimensions=require('Dimensions');

var buildStyleInterpolator=require('buildStyleInterpolator');
var merge=require('merge');

var SCREEN_WIDTH=Dimensions.get('window').width;
var NAV_BAR_HEIGHT=44;
var STATUS_BAR_HEIGHT=20;
var NAV_HEIGHT=NAV_BAR_HEIGHT+STATUS_BAR_HEIGHT;

var BASE_STYLES={
Title:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
left:0,
right:0,
alignItems:'center',
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'},

LeftButton:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
left:0,
overflow:'hidden',
opacity:1,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'},

RightButton:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
right:0,
overflow:'hidden',
opacity:1,
alignItems:'flex-end',
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'}};










var Stages={
Left:{
Title:merge(BASE_STYLES.Title,{left:-SCREEN_WIDTH/2,opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:-SCREEN_WIDTH/3,opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})},

Center:{
Title:merge(BASE_STYLES.Title,{left:0,opacity:1}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:0,opacity:1}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:1})},

Right:{
Title:merge(BASE_STYLES.Title,{left:SCREEN_WIDTH/2,opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:0,opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})}};




var opacityRatio=100;

function buildSceneInterpolators(startStyles,endStyles){
return {
Title:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Title.opacity,
to:endStyles.Title.opacity,
min:0,
max:1},

left:{
type:'linear',
from:startStyles.Title.left,
to:endStyles.Title.left,
min:0,
max:1,
extrapolate:true}}),


LeftButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.LeftButton.opacity,
to:endStyles.LeftButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.LeftButton.left,
to:endStyles.LeftButton.left,
min:0,
max:1}}),


RightButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.RightButton.opacity,
to:endStyles.RightButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.RightButton.left,
to:endStyles.RightButton.left,
min:0,
max:1,
extrapolate:true}})};}





var Interpolators={

RightToCenter:buildSceneInterpolators(Stages.Right,Stages.Center),

CenterToLeft:buildSceneInterpolators(Stages.Center,Stages.Left),

RightToLeft:buildSceneInterpolators(Stages.Right,Stages.Left)};



module.exports={
General:{
NavBarHeight:NAV_BAR_HEIGHT,
StatusBarHeight:STATUS_BAR_HEIGHT,
TotalNavHeight:NAV_HEIGHT},

Interpolators:Interpolators,
Stages:Stages};
});
__d('art/core/path.js',function(global, require, module, exports) {  'use strict';var Class=require('art/core/class.js');

module.exports=Class({

initialize:function(path){
this.reset().push(path);},




push:function(){
var p=Array.prototype.join.call(arguments,' ').
match(/[a-df-z]|[\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+/ig);
if(!p)return this;

var last,cmd=p[0],i=1;
while(cmd){
switch(cmd){
case 'm':this.move(p[i++],p[i++]);break;
case 'l':this.line(p[i++],p[i++]);break;
case 'c':this.curve(p[i++],p[i++],p[i++],p[i++],p[i++],p[i++]);break;
case 's':this.curve(p[i++],p[i++],null,null,p[i++],p[i++]);break;
case 'q':this.curve(p[i++],p[i++],p[i++],p[i++]);break;
case 't':this.curve(p[i++],p[i++]);break;
case 'a':this.arc(p[i+5],p[i+6],p[i],p[i+1],p[i+3],! +p[i+4],p[i+2]);i+=7;break;
case 'h':this.line(p[i++],0);break;
case 'v':this.line(0,p[i++]);break;

case 'M':this.moveTo(p[i++],p[i++]);break;
case 'L':this.lineTo(p[i++],p[i++]);break;
case 'C':this.curveTo(p[i++],p[i++],p[i++],p[i++],p[i++],p[i++]);break;
case 'S':this.curveTo(p[i++],p[i++],null,null,p[i++],p[i++]);break;
case 'Q':this.curveTo(p[i++],p[i++],p[i++],p[i++]);break;
case 'T':this.curveTo(p[i++],p[i++]);break;
case 'A':this.arcTo(p[i+5],p[i+6],p[i],p[i+1],p[i+3],! +p[i+4],p[i+2]);i+=7;break;
case 'H':this.lineTo(p[i++],this.penY);break;
case 'V':this.lineTo(this.penX,p[i++]);break;

case 'Z':case 'z':this.close();break;
default:cmd=last;i--;continue;}


last=cmd;
if(last=='m')last='l';else 
if(last=='M')last='L';
cmd=p[i++];}

return this;},




reset:function(){
this.penX=this.penY=0;
this.penDownX=this.penDownY=null;
this._pivotX=this._pivotY=0;
this.onReset();
return this;},


move:function(x,y){
this.onMove(this.penX,this.penY,this._pivotX=this.penX+=+x,this._pivotY=this.penY+=+y);
return this;},

moveTo:function(x,y){
this.onMove(this.penX,this.penY,this._pivotX=this.penX=+x,this._pivotY=this.penY=+y);
return this;},


line:function(x,y){
return this.lineTo(this.penX+ +x,this.penY+ +y);},

lineTo:function(x,y){
if(this.penDownX==null){this.penDownX=this.penX;this.penDownY=this.penY;}
this.onLine(this.penX,this.penY,this._pivotX=this.penX=+x,this._pivotY=this.penY=+y);
return this;},


curve:function(c1x,c1y,c2x,c2y,ex,ey){
var x=this.penX,y=this.penY;
return this.curveTo(
x+ +c1x,y+ +c1y,
c2x==null?null:x+ +c2x,
c2y==null?null:y+ +c2y,
ex==null?null:x+ +ex,
ey==null?null:y+ +ey);},


curveTo:function(c1x,c1y,c2x,c2y,ex,ey){
var x=this.penX,y=this.penY;
if(c2x==null){
c2x=+c1x;c2y=+c1y;
c1x=x*2-(this._pivotX||0);c1y=y*2-(this._pivotY||0);}

if(ex==null){
this._pivotX=+c1x;this._pivotY=+c1y;
ex=+c2x;ey=+c2y;
c2x=(ex+ +c1x*2)/3;c2y=(ey+ +c1y*2)/3;
c1x=(x+ +c1x*2)/3;c1y=(y+ +c1y*2)/3;}else 
{
this._pivotX=+c2x;this._pivotY=+c2y;}

if(this.penDownX==null){this.penDownX=x;this.penDownY=y;}
this.onBezierCurve(x,y,+c1x,+c1y,+c2x,+c2y,this.penX=+ex,this.penY=+ey);
return this;},


arc:function(x,y,rx,ry,outer,counterClockwise,rotation){
return this.arcTo(this.penX+ +x,this.penY+ +y,rx,ry,outer,counterClockwise,rotation);},

arcTo:function(x,y,rx,ry,outer,counterClockwise,rotation){
ry=Math.abs(+ry||+rx||+y-this.penY);
rx=Math.abs(+rx||+x-this.penX);

if(!rx||!ry||x==this.penX&&y==this.penY)return this.lineTo(x,y);

var tX=this.penX,tY=this.penY,clockwise=! +counterClockwise,large=!! +outer;

var rad=rotation?rotation*Math.PI/180:0,cos=Math.cos(rad),sin=Math.sin(rad);
x-=tX;y-=tY;


var cx=cos*x/2+sin*y/2,
cy=-sin*x/2+cos*y/2,
rxry=rx*rx*ry*ry,
rycx=ry*ry*cx*cx,
rxcy=rx*rx*cy*cy,
a=rxry-rxcy-rycx;

if(a<0){
a=Math.sqrt(1-a/rxry);
rx*=a;ry*=a;
cx=x/2;cy=y/2;}else 
{
a=Math.sqrt(a/(rxcy+rycx));
if(large==clockwise)a=-a;
var cxd=-a*cy*rx/ry,
cyd=a*cx*ry/rx;
cx=cos*cxd-sin*cyd+x/2;
cy=sin*cxd+cos*cyd+y/2;}



var xx=cos/rx,yx=sin/rx,
xy=-sin/ry,yy=cos/ry;


var sa=Math.atan2(xy*-cx+yy*-cy,xx*-cx+yx*-cy),
ea=Math.atan2(xy*(x-cx)+yy*(y-cy),xx*(x-cx)+yx*(y-cy));

cx+=tX;cy+=tY;
x+=tX;y+=tY;


if(this.penDownX==null){this.penDownX=this.penX;this.penDownY=this.penY;}
this.onArc(
tX,tY,this._pivotX=this.penX=x,this._pivotY=this.penY=y,
cx,cy,rx,ry,sa,ea,!clockwise,rotation);

return this;},


counterArc:function(x,y,rx,ry,outer){
return this.arc(x,y,rx,ry,outer,true);},

counterArcTo:function(x,y,rx,ry,outer){
return this.arcTo(x,y,rx,ry,outer,true);},


close:function(){
if(this.penDownX!=null){
this.onClose(this.penX,this.penY,this.penX=this.penDownX,this.penY=this.penDownY);
this.penDownX=null;}

return this;},




onReset:function(){},


onMove:function(sx,sy,ex,ey){},


onLine:function(sx,sy,ex,ey){
this.onBezierCurve(sx,sy,sx,sy,ex,ey,ex,ey);},


onBezierCurve:function(sx,sy,c1x,c1y,c2x,c2y,ex,ey){
var gx=ex-sx,gy=ey-sy,
g=gx*gx+gy*gy,
v1,v2,cx,cy,u;

cx=c1x-sx;cy=c1y-sy;
u=cx*gx+cy*gy;

if(u>g){
cx-=gx;
cy-=gy;}else 
if(u>0&&g!=0){
cx-=u/g*gx;
cy-=u/g*gy;}


v1=cx*cx+cy*cy;

cx=c2x-sx;cy=c2y-sy;
u=cx*gx+cy*gy;

if(u>g){
cx-=gx;
cy-=gy;}else 
if(u>0&&g!=0){
cx-=u/g*gx;
cy-=u/g*gy;}


v2=cx*cx+cy*cy;

if(v1<0.01&&v2<0.01){
this.onLine(sx,sy,ex,ey);
return;}



if(isNaN(v1)||isNaN(v2)){
throw new Error('Bad input');}



var s1x=(c1x+c2x)*0.5,s1y=(c1y+c2y)*0.5,
l1x=(c1x+sx)*0.5,l1y=(c1y+sy)*0.5,
l2x=(l1x+s1x)*0.5,l2y=(l1y+s1y)*0.5,
r2x=(ex+c2x)*0.5,r2y=(ey+c2y)*0.5,
r1x=(r2x+s1x)*0.5,r1y=(r2y+s1y)*0.5,
l2r1x=(l2x+r1x)*0.5,l2r1y=(l2y+r1y)*0.5;


this.onBezierCurve(sx,sy,l1x,l1y,l2x,l2y,l2r1x,l2r1y);
this.onBezierCurve(l2r1x,l2r1y,r1x,r1y,r2x,r2y,ex,ey);},


onArc:function(sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation){

var rad=rotation?rotation*Math.PI/180:0,cos=Math.cos(rad),sin=Math.sin(rad),
xx=cos*rx,yx=-sin*ry,
xy=sin*rx,yy=cos*ry;


var arc=ea-sa;
if(arc<0&&!ccw)arc+=Math.PI*2;else 
if(arc>0&&ccw)arc-=Math.PI*2;

var n=Math.ceil(Math.abs(arc/(Math.PI/2))),
step=arc/n,
k=4/3*Math.tan(step/4);

var x=Math.cos(sa),y=Math.sin(sa);

for(var i=0;i<n;i++){
var cp1x=x-k*y,cp1y=y+k*x;

sa+=step;
x=Math.cos(sa);y=Math.sin(sa);

var cp2x=x+k*y,cp2y=y-k*x;

this.onBezierCurve(
sx,sy,
cx+xx*cp1x+yx*cp1y,cy+xy*cp1x+yy*cp1y,
cx+xx*cp2x+yx*cp2y,cy+xy*cp2x+yy*cp2y,
sx=cx+xx*x+yx*y,sy=cy+xy*x+yy*y);}},




onClose:function(sx,sy,ex,ey){
this.onLine(sx,sy,ex,ey);}});
});
__d('art/core/transform.js',function(global, require, module, exports) {  'use strict';var Class=require('art/core/class.js');

function Transform(xx,yx,xy,yy,x,y){
if(xx&&typeof xx=='object'){
yx=xx.yx;yy=xx.yy;y=xx.y;
xy=xx.xy;x=xx.x;xx=xx.xx;}

this.xx=xx==null?1:xx;
this.yx=yx||0;
this.xy=xy||0;
this.yy=yy==null?1:yy;
this.x=(x==null?this.x:x)||0;
this.y=(y==null?this.y:y)||0;
this._transform();
return this;}
;

module.exports=Class({

initialize:Transform,

_transform:function(){},

xx:1,yx:0,x:0,
xy:0,yy:1,y:0,

transform:function(xx,yx,xy,yy,x,y){
var m=this;
if(xx&&typeof xx=='object'){
yx=xx.yx;yy=xx.yy;y=xx.y;
xy=xx.xy;x=xx.x;xx=xx.xx;}

if(!x)x=0;
if(!y)y=0;
return this.transformTo(
m.xx*xx+m.xy*yx,
m.yx*xx+m.yy*yx,
m.xx*xy+m.xy*yy,
m.yx*xy+m.yy*yy,
m.xx*x+m.xy*y+m.x,
m.yx*x+m.yy*y+m.y);},



transformTo:Transform,

translate:function(x,y){
return this.transform(1,0,0,1,x,y);},


move:function(x,y){
this.x+=x||0;
this.y+=y||0;
this._transform();
return this;},


scale:function(x,y){
if(y==null)y=x;
return this.transform(x,0,0,y,0,0);},


rotate:function(deg,x,y){
if(x==null||y==null){
x=(this.left||0)+(this.width||0)/2;
y=(this.top||0)+(this.height||0)/2;}


var rad=deg*Math.PI/180,sin=Math.sin(rad),cos=Math.cos(rad);

this.transform(1,0,0,1,x,y);
var m=this;

return this.transformTo(
cos*m.xx-sin*m.yx,
sin*m.xx+cos*m.yx,
cos*m.xy-sin*m.yy,
sin*m.xy+cos*m.yy,
m.x,
m.y).
transform(1,0,0,1,-x,-y);},


moveTo:function(x,y){
var m=this;
return this.transformTo(m.xx,m.yx,m.xy,m.yy,x,y);},


rotateTo:function(deg,x,y){
var m=this;
var flip=m.yx/m.xx>m.yy/m.xy?-1:1;
if(m.xx<0?m.xy>=0:m.xy<0)flip=-flip;
return this.rotate(deg-Math.atan2(flip*m.yx,flip*m.xx)*180/Math.PI,x,y);},


scaleTo:function(x,y){

var m=this;

var h=Math.sqrt(m.xx*m.xx+m.yx*m.yx);
m.xx/=h;m.yx/=h;

h=Math.sqrt(m.yy*m.yy+m.xy*m.xy);
m.yy/=h;m.xy/=h;

return this.scale(x,y);},


resizeTo:function(width,height){
var w=this.width,h=this.height;
if(!w||!h)return this;
return this.scaleTo(width/w,height/h);},
















inversePoint:function(x,y){
var a=this.xx,b=this.yx,
c=this.xy,d=this.yy,
e=this.x,f=this.y;
var det=b*c-a*d;
if(det==0)return null;
return {
x:(d*(e-x)+c*(y-f))/det,
y:(a*(f-y)+b*(x-e))/det};},



point:function(x,y){
var m=this;
return {
x:m.xx*x+m.xy*y+m.x,
y:m.yx*x+m.yy*y+m.y};}});
});
__d('ARTSerializablePath',function(global, require, module, exports) {  'use strict';













var Class=require('art/core/class.js');
var Path=require('art/core/path.js');

var MOVE_TO=0;
var CLOSE=1;
var LINE_TO=2;
var CURVE_TO=3;
var ARC=4;

var SerializablePath=Class(Path,{

initialize:function(path){
this.reset();
if(path instanceof SerializablePath){
this.path=path.path.slice(0);}else 
if(path){
if(path.applyToPath){
path.applyToPath(this);}else 
{
this.push(path);}}},




onReset:function(){
this.path=[];},


onMove:function(sx,sy,x,y){
this.path.push(MOVE_TO,x,y);},


onLine:function(sx,sy,x,y){
this.path.push(LINE_TO,x,y);},


onBezierCurve:function(sx,sy,p1x,p1y,p2x,p2y,x,y){
this.path.push(CURVE_TO,p1x,p1y,p2x,p2y,x,y);},


_arcToBezier:Path.prototype.onArc,

onArc:function(sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation){
if(rx!==ry||rotation){
return this._arcToBezier(
sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation);}


this.path.push(ARC,cx,cy,rx,sa,ea,ccw?0:1);},


onClose:function(){
this.path.push(CLOSE);},


toJSON:function(){
return this.path;}});




module.exports=SerializablePath;
});
__d('Switch',function(global, require, module, exports) {  'use strict';







var ColorPropType=require('ColorPropType');
var NativeMethodsMixin=require('NativeMethodsMixin');
var Platform=require('Platform');
var React=require('React');
var StyleSheet=require('StyleSheet');
var View=require('View');

var requireNativeComponent=require('requireNativeComponent');









var Switch=React.createClass({displayName:'Switch',
propTypes:babelHelpers.extends({},
View.propTypes,{




value:React.PropTypes.bool,




disabled:React.PropTypes.bool,



onValueChange:React.PropTypes.func,



testID:React.PropTypes.string,





tintColor:ColorPropType,




onTintColor:ColorPropType,




thumbTintColor:ColorPropType}),


getDefaultProps:function(){
return {
value:false,
disabled:false};},



mixins:[NativeMethodsMixin],

_rctSwitch:{},
_onChange:function(event){
this.props.onChange&&this.props.onChange(event);
this.props.onValueChange&&this.props.onValueChange(event.nativeEvent.value);



if(Platform.OS==='android'){
this._rctSwitch.setNativeProps({on:this.props.value});}else 
{
this._rctSwitch.setNativeProps({value:this.props.value});}},



render:function(){var _this=this;
var props=babelHelpers.extends({},this.props);
props.onStartShouldSetResponder=function(){return true;};
props.onResponderTerminationRequest=function(){return false;};
if(Platform.OS==='android'){
props.enabled=!this.props.disabled;
props.on=this.props.value;
props.style=this.props.style;}else 
if(Platform.OS==='ios'){
props.style=[styles.rctSwitchIOS,this.props.style];}

return (
React.createElement(RCTSwitch,babelHelpers.extends({},
props,{
ref:function(ref){_this._rctSwitch=ref;},
onChange:this._onChange})));}});





var styles=StyleSheet.create({
rctSwitchIOS:{
height:31,
width:51}});



if(Platform.OS==='android'){
var RCTSwitch=requireNativeComponent('AndroidSwitch',Switch,{
nativeOnly:{onChange:true,on:true,enabled:true}});}else 

{
var RCTSwitch=requireNativeComponent('RCTSwitch',Switch,{
nativeOnly:{onChange:true}});}



module.exports=Switch;
});
__d('Modal',function(global, require, module, exports) {  'use strict';












var PropTypes=require('ReactPropTypes');
var React=require('React');
var StyleSheet=require('StyleSheet');
var View=require('View');

var requireNativeComponent=require('requireNativeComponent');
var RCTModalHostView=requireNativeComponent('RCTModalHostView',null);var 
















Modal=function(_React$Component){babelHelpers.inherits(Modal,_React$Component);function Modal(){babelHelpers.classCallCheck(this,Modal);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Modal).apply(this,arguments));}babelHelpers.createClass(Modal,[{key:'render',value:function render()
{
if(this.props.visible===false){
return null;}


if(this.props.transparent){
var containerBackgroundColor={backgroundColor:'transparent'};}


return (
React.createElement(RCTModalHostView,{
animated:this.props.animated,
transparent:this.props.transparent,
onDismiss:this.props.onDismiss,
onShow:this.props.onShow,
style:styles.modal},
React.createElement(View,{style:[styles.container,containerBackgroundColor]},
this.props.children)));}}]);return Modal;}(React.Component);






Modal.propTypes={
animated:PropTypes.bool,
transparent:PropTypes.bool,
visible:PropTypes.bool,
onDismiss:PropTypes.func,
onShow:PropTypes.func};


Modal.defaultProps={
visible:true};


var styles=StyleSheet.create({
modal:{
position:'absolute'},

container:{
left:0,
position:'absolute',
top:0}});



module.exports=Modal;
});
__d('LayoutPropTypes',function(global, require, module, exports) {  'use strict';












var ReactPropTypes=require('ReactPropTypes');













var LayoutPropTypes={
width:ReactPropTypes.number,
height:ReactPropTypes.number,
top:ReactPropTypes.number,
left:ReactPropTypes.number,
right:ReactPropTypes.number,
bottom:ReactPropTypes.number,
margin:ReactPropTypes.number,
marginVertical:ReactPropTypes.number,
marginHorizontal:ReactPropTypes.number,
marginTop:ReactPropTypes.number,
marginBottom:ReactPropTypes.number,
marginLeft:ReactPropTypes.number,
marginRight:ReactPropTypes.number,
padding:ReactPropTypes.number,
paddingVertical:ReactPropTypes.number,
paddingHorizontal:ReactPropTypes.number,
paddingTop:ReactPropTypes.number,
paddingBottom:ReactPropTypes.number,
paddingLeft:ReactPropTypes.number,
paddingRight:ReactPropTypes.number,
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,

position:ReactPropTypes.oneOf([
'absolute',
'relative']),



flexDirection:ReactPropTypes.oneOf([
'row',
'column']),



flexWrap:ReactPropTypes.oneOf([
'wrap',
'nowrap']),




justifyContent:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'space-between',
'space-around']),




alignItems:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'stretch']),




alignSelf:ReactPropTypes.oneOf([
'auto',
'flex-start',
'flex-end',
'center',
'stretch']),



flex:ReactPropTypes.number};


module.exports=LayoutPropTypes;
});
__d('ShadowPropTypesIOS',function(global, require, module, exports) {  'use strict';












var ColorPropType=require('ColorPropType');
var ReactPropTypes=require('ReactPropTypes');

var ShadowPropTypesIOS={




shadowColor:ColorPropType,




shadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),





shadowOpacity:ReactPropTypes.number,




shadowRadius:ReactPropTypes.number};


module.exports=ShadowPropTypesIOS;
});
__d('ProgressBarAndroid',function(global, require, module, exports) {  'use strict';











var NativeMethodsMixin=require('NativeMethodsMixin');
var React=require('React');
var ReactPropTypes=require('ReactPropTypes');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');
var View=require('View');
var ColorPropType=require('ColorPropType');

var requireNativeComponent=require('requireNativeComponent');

var STYLE_ATTRIBUTES=[
'Horizontal',
'Normal',
'Small',
'Large',
'Inverse',
'SmallInverse',
'LargeInverse'];


var indeterminateType=function(props,propName,componentName){
var checker=function(){
var indeterminate=props[propName];
var styleAttr=props.styleAttr;
if(!indeterminate&&styleAttr!=='Horizontal'){
return new Error('indeterminate=false is only valid for styleAttr=Horizontal');}};



return ReactPropTypes.bool(props,propName,componentName)||checker();};

























var ProgressBarAndroid=React.createClass({displayName:'ProgressBarAndroid',
propTypes:babelHelpers.extends({},
View.propTypes,{











styleAttr:ReactPropTypes.oneOf(STYLE_ATTRIBUTES),




indeterminate:indeterminateType,



progress:ReactPropTypes.number,



color:ColorPropType,



testID:ReactPropTypes.string}),


getDefaultProps:function(){
return {
styleAttr:'Normal',
indeterminate:true};},



mixins:[NativeMethodsMixin],

render:function(){
return React.createElement(AndroidProgressBar,this.props);}});



var AndroidProgressBar=requireNativeComponent('AndroidProgressBar',ProgressBarAndroid);

module.exports=ProgressBarAndroid;
});
__d('SwitchAndroid',function(global, require, module, exports) {  'use strict';











var NativeMethodsMixin=require('NativeMethodsMixin');
var PropTypes=require('ReactPropTypes');
var React=require('React');
var View=require('View');

var requireNativeComponent=require('requireNativeComponent');

var SWITCH='switch';




var SwitchAndroid=React.createClass({displayName:'SwitchAndroid',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



value:PropTypes.bool,



disabled:PropTypes.bool,



onValueChange:PropTypes.func,



testID:PropTypes.string}),


getDefaultProps:function(){
return {
value:false,
disabled:false};},



_onChange:function(event){


this.refs[SWITCH].setNativeProps({on:this.props.value});

if(this.props.value===event.nativeEvent.value||this.props.disabled){
return;}


this.props.onChange&&this.props.onChange(event);
this.props.onValueChange&&this.props.onValueChange(event.nativeEvent.value);},


render:function(){
return (
React.createElement(RKSwitch,{
ref:SWITCH,
style:this.props.style,
enabled:!this.props.disabled,
on:this.props.value,
onChange:this._onChange,
testID:this.props.testID,
onStartShouldSetResponder:function(){return true;},
onResponderTerminationRequest:function(){return false;}}));}});





var RKSwitch=requireNativeComponent('AndroidSwitch',SwitchAndroid,{
nativeOnly:{
on:true,
enabled:true}});



module.exports=SwitchAndroid;
});
__d('DrawerLayoutAndroid',function(global, require, module, exports) {  'use strict';











var NativeMethodsMixin=require('NativeMethodsMixin');
var React=require('React');
var ReactPropTypes=require('ReactPropTypes');
var StyleSheet=require('StyleSheet');
var UIManager=require('UIManager');
var View=require('View');

var DrawerConsts=UIManager.AndroidDrawerLayout.Constants;

var dismissKeyboard=require('dismissKeyboard');
var requireNativeComponent=require('requireNativeComponent');

var RK_DRAWER_REF='drawerlayout';
var INNERVIEW_REF='innerView';

var DrawerLayoutValidAttributes={
drawerWidth:true,
drawerPosition:true,
drawerLockMode:true};


var DRAWER_STATES=[
'Idle',
'Dragging',
'Settling'];

































var DrawerLayoutAndroid=React.createClass({displayName:'DrawerLayoutAndroid',
statics:{
positions:DrawerConsts.DrawerPosition},


propTypes:babelHelpers.extends({},
View.propTypes,{





keyboardDismissMode:ReactPropTypes.oneOf([
'none',
'on-drag']),




drawerPosition:ReactPropTypes.oneOf([
DrawerConsts.DrawerPosition.Left,
DrawerConsts.DrawerPosition.Right]),





drawerWidth:ReactPropTypes.number,







drawerLockMode:ReactPropTypes.oneOf([
'unlocked',
'locked-closed',
'locked-open']),




onDrawerSlide:ReactPropTypes.func,







onDrawerStateChanged:ReactPropTypes.func,



onDrawerOpen:ReactPropTypes.func,



onDrawerClose:ReactPropTypes.func,



renderNavigationView:ReactPropTypes.func.isRequired}),


mixins:[NativeMethodsMixin],

getInnerViewNode:function(){
return this.refs[INNERVIEW_REF].getInnerViewNode();},


render:function(){
var drawerViewWrapper=
React.createElement(View,{style:[styles.drawerSubview,{width:this.props.drawerWidth}],collapsable:false},
this.props.renderNavigationView());

var childrenWrapper=
React.createElement(View,{ref:INNERVIEW_REF,style:styles.mainSubview,collapsable:false},
this.props.children);

return (
React.createElement(AndroidDrawerLayout,babelHelpers.extends({},
this.props,{
ref:RK_DRAWER_REF,
drawerWidth:this.props.drawerWidth,
drawerPosition:this.props.drawerPosition,
drawerLockMode:this.props.drawerLockMode,
style:styles.base,
onDrawerSlide:this._onDrawerSlide,
onDrawerOpen:this._onDrawerOpen,
onDrawerClose:this._onDrawerClose,
onDrawerStateChanged:this._onDrawerStateChanged}),
childrenWrapper,
drawerViewWrapper));},




_onDrawerSlide:function(event){
if(this.props.onDrawerSlide){
this.props.onDrawerSlide(event);}

if(this.props.keyboardDismissMode==='on-drag'){
dismissKeyboard();}},



_onDrawerOpen:function(){
if(this.props.onDrawerOpen){
this.props.onDrawerOpen();}},



_onDrawerClose:function(){
if(this.props.onDrawerClose){
this.props.onDrawerClose();}},



_onDrawerStateChanged:function(event){
if(this.props.onDrawerStateChanged){
this.props.onDrawerStateChanged(DRAWER_STATES[event.nativeEvent.drawerState]);}},



openDrawer:function(){
UIManager.dispatchViewManagerCommand(
this._getDrawerLayoutHandle(),
UIManager.AndroidDrawerLayout.Commands.openDrawer,
null);},



closeDrawer:function(){
UIManager.dispatchViewManagerCommand(
this._getDrawerLayoutHandle(),
UIManager.AndroidDrawerLayout.Commands.closeDrawer,
null);},



_getDrawerLayoutHandle:function(){
return React.findNodeHandle(this.refs[RK_DRAWER_REF]);}});



var styles=StyleSheet.create({
base:{
flex:1},

mainSubview:{
position:'absolute',
top:0,
left:0,
right:0,
bottom:0},

drawerSubview:{
position:'absolute',
top:0,
bottom:0}});




var AndroidDrawerLayout=requireNativeComponent('AndroidDrawerLayout',DrawerLayoutAndroid);

module.exports=DrawerLayoutAndroid;
});
__d('dismissKeyboard',function(global, require, module, exports) {  'use strict';








var TextInputState=require('TextInputState');

function dismissKeyboard(){
TextInputState.blurTextInput(TextInputState.currentlyFocusedField());}


module.exports=dismissKeyboard;
});
__d('UIManager',function(global, require, module, exports) {  'use strict';












var UIManager=require('NativeModules').UIManager;
var findNodeHandle=require('findNodeHandle');

if(!UIManager.setChildren){




UIManager._cachedIndexArray=function(size){
var cachedResult=this._cachedIndexArray._cache[size];
if(!cachedResult){
var arr=[];
for(var i=0;i<size;i++){
arr[i]=i;}

this._cachedIndexArray._cache[size]=arr;
return arr;}else 
{
return cachedResult;}};


UIManager._cachedIndexArray._cache={};




UIManager.setChildren=function(containerTag,createdTags){
var indexes=this._cachedIndexArray(createdTags.length);
UIManager.manageChildren(containerTag,null,null,createdTags,indexes,null);};}



var _takeSnapshot=UIManager.takeSnapshot;


















UIManager.takeSnapshot=function _callee(
view,
options){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(






_takeSnapshot){_context.next=3;break;}
console.warn('UIManager.takeSnapshot is not available on this platform');return _context.abrupt('return');case 3:


if(typeof view!=='number'&&view!=='window'){
view=findNodeHandle(view)||'window';}return _context.abrupt('return',

_takeSnapshot(view,options));case 5:case 'end':return _context.stop();}}},null,this);};


module.exports=UIManager;
});
__d('NativeMethodsMixin',function(global, require, module, exports) {  'use strict';












var ReactNativeAttributePayload=require('ReactNativeAttributePayload');
var TextInputState=require('TextInputState');
var UIManager=require('UIManager');

var findNodeHandle=require('findNodeHandle');
var invariant=require('fbjs/lib/invariant.js');
























function warnForStyleProps(props,validAttributes){
for(var key in validAttributes.style){
if(!(validAttributes[key]||props[key]===undefined)){
console.error(
'You are setting the style `{ '+key+': ... }` as a prop. You '+
'should nest it in a style object. '+
'E.g. `{ style: { '+key+': ... } }`');}}}

















var NativeMethodsMixin={

















measure:function(callback){
UIManager.measure(
findNodeHandle(this),
mountSafeCallback(this,callback));},


















measureInWindow:function(callback){
UIManager.measureInWindow(
findNodeHandle(this),
mountSafeCallback(this,callback));},











measureLayout:function(
relativeToNativeNode,
onSuccess,
onFail)
{
UIManager.measureLayout(
findNodeHandle(this),
relativeToNativeNode,
mountSafeCallback(this,onFail),
mountSafeCallback(this,onSuccess));},









setNativeProps:function(nativeProps){
if(__DEV__){
warnForStyleProps(nativeProps,this.viewConfig.validAttributes);}


var updatePayload=ReactNativeAttributePayload.create(
nativeProps,
this.viewConfig.validAttributes);


UIManager.updateView(
findNodeHandle(this),
this.viewConfig.uiViewClassName,
updatePayload);},







focus:function(){
TextInputState.focusTextInput(findNodeHandle(this));},





blur:function(){
TextInputState.blurTextInput(findNodeHandle(this));}};



function throwOnStylesProp(component,props){
if(props.styles!==undefined){
var owner=component._owner||null;
var name=component.constructor.displayName;
var msg='`styles` is not a supported property of `'+name+'`, did '+
'you mean `style` (singular)?';
if(owner&&owner.constructor&&owner.constructor.displayName){
msg+='\n\nCheck the `'+owner.constructor.displayName+'` parent '+
' component.';}

throw new Error(msg);}}


if(__DEV__){



var NativeMethodsMixin_DEV=NativeMethodsMixin;
invariant(
!NativeMethodsMixin_DEV.componentWillMount&&
!NativeMethodsMixin_DEV.componentWillReceiveProps,
'Do not override existing functions.');

NativeMethodsMixin_DEV.componentWillMount=function(){
throwOnStylesProp(this,this.props);};

NativeMethodsMixin_DEV.componentWillReceiveProps=function(newProps){
throwOnStylesProp(this,newProps);};}







var mountSafeCallback=function(context,callback){
return function(){
if(!callback||context.isMounted&&!context.isMounted()){
return;}

return callback.apply(context,arguments);};};



module.exports=NativeMethodsMixin;
});
__d('NavigationEvent',function(global, require, module, exports) {  'use strict';




























var invariant=require('fbjs/lib/invariant.js');var 

NavigationEventPool=function(){


function NavigationEventPool(){babelHelpers.classCallCheck(this,NavigationEventPool);
this._list=[];}babelHelpers.createClass(NavigationEventPool,[{key:'get',value:function get(


type,currentTarget,data){
var event;
if(this._list.length>0){
event=this._list.pop();
event.constructor.call(event,type,currentTarget,data);}else 
{
event=new NavigationEvent(type,currentTarget,data);}

return event;}},{key:'put',value:function put(


event){
this._list.push(event);}}]);return NavigationEventPool;}();



var _navigationEventPool=new NavigationEventPool();var 























NavigationEvent=function(){babelHelpers.createClass(NavigationEvent,null,[{key:'pool',value:function pool(


















type,currentTarget,data){
return _navigationEventPool.get(type,currentTarget,data);}}]);


function NavigationEvent(type,currentTarget,data){babelHelpers.classCallCheck(this,NavigationEvent);
this.target=currentTarget;
this.eventPhase=NavigationEvent.NONE;

this._type=type;
this._currentTarget=currentTarget;
this._data=data;
this._defaultPrevented=false;
this._disposed=false;
this._propagationStopped=false;}babelHelpers.createClass(NavigationEvent,[{key:'preventDefault',value:function preventDefault()






















{
this._defaultPrevented=true;}},{key:'stopPropagation',value:function stopPropagation()


{
this._propagationStopped=true;}},{key:'stop',value:function stop()


{
this.preventDefault();
this.stopPropagation();}},{key:'isPropagationStopped',value:function isPropagationStopped()


{
return this._propagationStopped;}},{key:'dispose',value:function dispose()







{
invariant(!this._disposed,'NavigationEvent is already disposed');
this._disposed=true;


this.target=null;
this.eventPhase=NavigationEvent.NONE;
this._type=null;
this._currentTarget=null;
this._data=null;
this._defaultPrevented=false;


_navigationEventPool.put(this);}},{key:'type',get:function(){return this._type;}},{key:'currentTarget',get:function(){return this._currentTarget;}},{key:'data',get:function(){return this._data;}},{key:'defaultPrevented',get:function(){return this._defaultPrevented;}}]);return NavigationEvent;}();










NavigationEvent.NONE=0;


NavigationEvent.CAPTURING_PHASE=1;



NavigationEvent.AT_TARGET=2;





NavigationEvent.BUBBLING_PHASE=3;

module.exports=NavigationEvent;
});
__d('EventHolder',function(global, require, module, exports) {  'use strict';


















var invariant=require('fbjs/lib/invariant.js');var 

EventHolder=function(){
function EventHolder(){babelHelpers.classCallCheck(this,EventHolder);
this._heldEvents={};
this._currentEventKey=null;}babelHelpers.createClass(EventHolder,[{key:'holdEvent',value:function holdEvent(























eventType,a,b,c,d,e,_){
this._heldEvents[eventType]=this._heldEvents[eventType]||[];
var eventsOfType=this._heldEvents[eventType];
var key={
eventType:eventType,
index:eventsOfType.length};

eventsOfType.push([a,b,c,d,e,_]);
return key;}},{key:'emitToListener',value:function emitToListener(










eventType,listener,context){var _this=this;
var eventsOfType=this._heldEvents[eventType];
if(!eventsOfType){
return;}

var origEventKey=this._currentEventKey;
eventsOfType.forEach(function(eventHeld,index){
if(!eventHeld){
return;}

_this._currentEventKey={
eventType:eventType,
index:index};

listener.apply(context,eventHeld);});

this._currentEventKey=origEventKey;}},{key:'releaseCurrentEvent',value:function releaseCurrentEvent()










{
invariant(
this._currentEventKey!==null,
'Not in an emitting cycle; there is no current event');

this.releaseEvent(this._currentEventKey);}},{key:'releaseEvent',value:function releaseEvent(








token){
delete this._heldEvents[token.eventType][token.index];}},{key:'releaseEventType',value:function releaseEventType(







type){
this._heldEvents[type]=[];}}]);return EventHolder;}();



module.exports=EventHolder;
});
__d('ensureComponentIsNative',function(global, require, module, exports) {  'use strict';












var invariant=require('fbjs/lib/invariant.js');

var ensureComponentIsNative=function(component){
invariant(
component&&typeof component.setNativeProps==='function',
'Touchable child must either be native or forward setNativeProps to a '+
'native component');};



module.exports=ensureComponentIsNative;
});
__d('ensurePositiveDelayProps',function(global, require, module, exports) {  'use strict';












var invariant=require('fbjs/lib/invariant.js');

var ensurePositiveDelayProps=function(props){
invariant(
!(props.delayPressIn<0||props.delayPressOut<0||
props.delayLongPress<0),
'Touchable components cannot have negative delay properties');};



module.exports=ensurePositiveDelayProps;
});
__d('MatrixMath',function(global, require, module, exports) {  'use strict';








var invariant=require('fbjs/lib/invariant.js');





var MatrixMath={
createIdentityMatrix:function(){
return [
1,0,0,0,
0,1,0,0,
0,0,1,0,
0,0,0,1];},



createCopy:function(m){
return [
m[0],m[1],m[2],m[3],
m[4],m[5],m[6],m[7],
m[8],m[9],m[10],m[11],
m[12],m[13],m[14],m[15]];},



createOrthographic:function(left,right,bottom,top,near,far){
var a=2/(right-left);
var b=2/(top-bottom);
var c=-2/(far-near);

var tx=-(right+left)/(right-left);
var ty=-(top+bottom)/(top-bottom);
var tz=-(far+near)/(far-near);

return [
a,0,0,0,
0,b,0,0,
0,0,c,0,
tx,ty,tz,1];},



createFrustum:function(left,right,bottom,top,near,far){
var r_width=1/(right-left);
var r_height=1/(top-bottom);
var r_depth=1/(near-far);
var x=2*(near*r_width);
var y=2*(near*r_height);
var A=(right+left)*r_width;
var B=(top+bottom)*r_height;
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return [
x,0,0,0,
0,y,0,0,
A,B,C,-1,
0,0,D,0];},









createPerspective:function(fovInRadians,aspect,near,far){
var h=1/Math.tan(fovInRadians/2);
var r_depth=1/(near-far);
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return [
h/aspect,0,0,0,
0,h,0,0,
0,0,C,-1,
0,0,D,0];},



createTranslate2d:function(x,y){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseTranslate2dCommand(mat,x,y);
return mat;},


reuseTranslate2dCommand:function(matrixCommand,x,y){
matrixCommand[12]=x;
matrixCommand[13]=y;},


reuseTranslate3dCommand:function(matrixCommand,x,y,z){
matrixCommand[12]=x;
matrixCommand[13]=y;
matrixCommand[14]=z;},


createScale:function(factor){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseScaleCommand(mat,factor);
return mat;},


reuseScaleCommand:function(matrixCommand,factor){
matrixCommand[0]=factor;
matrixCommand[5]=factor;},


reuseScale3dCommand:function(matrixCommand,x,y,z){
matrixCommand[0]=x;
matrixCommand[5]=y;
matrixCommand[10]=z;},


reusePerspectiveCommand:function(matrixCommand,p){
matrixCommand[11]=-1/p;},


reuseScaleXCommand:function(matrixCommand,factor){
matrixCommand[0]=factor;},


reuseScaleYCommand:function(matrixCommand,factor){
matrixCommand[5]=factor;},


reuseScaleZCommand:function(matrixCommand,factor){
matrixCommand[10]=factor;},


reuseRotateXCommand:function(matrixCommand,radians){
matrixCommand[5]=Math.cos(radians);
matrixCommand[6]=Math.sin(radians);
matrixCommand[9]=-Math.sin(radians);
matrixCommand[10]=Math.cos(radians);},


reuseRotateYCommand:function(matrixCommand,amount){
matrixCommand[0]=Math.cos(amount);
matrixCommand[2]=-Math.sin(amount);
matrixCommand[8]=Math.sin(amount);
matrixCommand[10]=Math.cos(amount);},



reuseRotateZCommand:function(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);
matrixCommand[4]=-Math.sin(radians);
matrixCommand[5]=Math.cos(radians);},


createRotateZ:function(radians){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseRotateZCommand(mat,radians);
return mat;},


reuseSkewXCommand:function(matrixCommand,radians){
matrixCommand[4]=Math.sin(radians);
matrixCommand[5]=Math.cos(radians);},


reuseSkewYCommand:function(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);},


multiplyInto:function(out,a,b){
var a00=a[0],a01=a[1],a02=a[2],a03=a[3],
a10=a[4],a11=a[5],a12=a[6],a13=a[7],
a20=a[8],a21=a[9],a22=a[10],a23=a[11],
a30=a[12],a31=a[13],a32=a[14],a33=a[15];

var b0=b[0],b1=b[1],b2=b[2],b3=b[3];
out[0]=b0*a00+b1*a10+b2*a20+b3*a30;
out[1]=b0*a01+b1*a11+b2*a21+b3*a31;
out[2]=b0*a02+b1*a12+b2*a22+b3*a32;
out[3]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[4];b1=b[5];b2=b[6];b3=b[7];
out[4]=b0*a00+b1*a10+b2*a20+b3*a30;
out[5]=b0*a01+b1*a11+b2*a21+b3*a31;
out[6]=b0*a02+b1*a12+b2*a22+b3*a32;
out[7]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[8];b1=b[9];b2=b[10];b3=b[11];
out[8]=b0*a00+b1*a10+b2*a20+b3*a30;
out[9]=b0*a01+b1*a11+b2*a21+b3*a31;
out[10]=b0*a02+b1*a12+b2*a22+b3*a32;
out[11]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[12];b1=b[13];b2=b[14];b3=b[15];
out[12]=b0*a00+b1*a10+b2*a20+b3*a30;
out[13]=b0*a01+b1*a11+b2*a21+b3*a31;
out[14]=b0*a02+b1*a12+b2*a22+b3*a32;
out[15]=b0*a03+b1*a13+b2*a23+b3*a33;},


determinant:function(matrix){var _matrix=babelHelpers.slicedToArray(





matrix,16);var m00=_matrix[0];var m01=_matrix[1];var m02=_matrix[2];var m03=_matrix[3];var m10=_matrix[4];var m11=_matrix[5];var m12=_matrix[6];var m13=_matrix[7];var m20=_matrix[8];var m21=_matrix[9];var m22=_matrix[10];var m23=_matrix[11];var m30=_matrix[12];var m31=_matrix[13];var m32=_matrix[14];var m33=_matrix[15];
return (
m03*m12*m21*m30-m02*m13*m21*m30-
m03*m11*m22*m30+m01*m13*m22*m30+
m02*m11*m23*m30-m01*m12*m23*m30-
m03*m12*m20*m31+m02*m13*m20*m31+
m03*m10*m22*m31-m00*m13*m22*m31-
m02*m10*m23*m31+m00*m12*m23*m31+
m03*m11*m20*m32-m01*m13*m20*m32-
m03*m10*m21*m32+m00*m13*m21*m32+
m01*m10*m23*m32-m00*m11*m23*m32-
m02*m11*m20*m33+m01*m12*m20*m33+
m02*m10*m21*m33-m00*m12*m21*m33-
m01*m10*m22*m33+m00*m11*m22*m33);},










inverse:function(matrix){
var det=MatrixMath.determinant(matrix);
if(!det){
return matrix;}var _matrix2=babelHelpers.slicedToArray(






matrix,16);var m00=_matrix2[0];var m01=_matrix2[1];var m02=_matrix2[2];var m03=_matrix2[3];var m10=_matrix2[4];var m11=_matrix2[5];var m12=_matrix2[6];var m13=_matrix2[7];var m20=_matrix2[8];var m21=_matrix2[9];var m22=_matrix2[10];var m23=_matrix2[11];var m30=_matrix2[12];var m31=_matrix2[13];var m32=_matrix2[14];var m33=_matrix2[15];
return [
(m12*m23*m31-m13*m22*m31+m13*m21*m32-m11*m23*m32-m12*m21*m33+m11*m22*m33)/det,
(m03*m22*m31-m02*m23*m31-m03*m21*m32+m01*m23*m32+m02*m21*m33-m01*m22*m33)/det,
(m02*m13*m31-m03*m12*m31+m03*m11*m32-m01*m13*m32-m02*m11*m33+m01*m12*m33)/det,
(m03*m12*m21-m02*m13*m21-m03*m11*m22+m01*m13*m22+m02*m11*m23-m01*m12*m23)/det,
(m13*m22*m30-m12*m23*m30-m13*m20*m32+m10*m23*m32+m12*m20*m33-m10*m22*m33)/det,
(m02*m23*m30-m03*m22*m30+m03*m20*m32-m00*m23*m32-m02*m20*m33+m00*m22*m33)/det,
(m03*m12*m30-m02*m13*m30-m03*m10*m32+m00*m13*m32+m02*m10*m33-m00*m12*m33)/det,
(m02*m13*m20-m03*m12*m20+m03*m10*m22-m00*m13*m22-m02*m10*m23+m00*m12*m23)/det,
(m11*m23*m30-m13*m21*m30+m13*m20*m31-m10*m23*m31-m11*m20*m33+m10*m21*m33)/det,
(m03*m21*m30-m01*m23*m30-m03*m20*m31+m00*m23*m31+m01*m20*m33-m00*m21*m33)/det,
(m01*m13*m30-m03*m11*m30+m03*m10*m31-m00*m13*m31-m01*m10*m33+m00*m11*m33)/det,
(m03*m11*m20-m01*m13*m20-m03*m10*m21+m00*m13*m21+m01*m10*m23-m00*m11*m23)/det,
(m12*m21*m30-m11*m22*m30-m12*m20*m31+m10*m22*m31+m11*m20*m32-m10*m21*m32)/det,
(m01*m22*m30-m02*m21*m30+m02*m20*m31-m00*m22*m31-m01*m20*m32+m00*m21*m32)/det,
(m02*m11*m30-m01*m12*m30-m02*m10*m31+m00*m12*m31+m01*m10*m32-m00*m11*m32)/det,
(m01*m12*m20-m02*m11*m20+m02*m10*m21-m00*m12*m21-m01*m10*m22+m00*m11*m22)/det];},






transpose:function(m){
return [
m[0],m[4],m[8],m[12],
m[1],m[5],m[9],m[13],
m[2],m[6],m[10],m[14],
m[3],m[7],m[11],m[15]];},






multiplyVectorByMatrix:function(
v,
m)
{var _v=babelHelpers.slicedToArray(
v,4);var vx=_v[0];var vy=_v[1];var vz=_v[2];var vw=_v[3];
return [
vx*m[0]+vy*m[4]+vz*m[8]+vw*m[12],
vx*m[1]+vy*m[5]+vz*m[9]+vw*m[13],
vx*m[2]+vy*m[6]+vz*m[10]+vw*m[14],
vx*m[3]+vy*m[7]+vz*m[11]+vw*m[15]];},






v3Length:function(a){
return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);},





v3Normalize:function(
vector,
v3Length)
{
var im=1/(v3Length||MatrixMath.v3Length(vector));
return [
vector[0]*im,
vector[1]*im,
vector[2]*im];},







v3Dot:function(a,b){
return a[0]*b[0]+
a[1]*b[1]+
a[2]*b[2];},






v3Combine:function(
a,
b,
aScale,
bScale)
{
return [
aScale*a[0]+bScale*b[0],
aScale*a[1]+bScale*b[1],
aScale*a[2]+bScale*b[2]];},







v3Cross:function(a,b){
return [
a[1]*b[2]-a[2]*b[1],
a[2]*b[0]-a[0]*b[2],
a[0]*b[1]-a[1]*b[0]];},



















quaternionToDegreesXYZ:function(q,matrix,row){var _q=babelHelpers.slicedToArray(
q,4);var qx=_q[0];var qy=_q[1];var qz=_q[2];var qw=_q[3];
var qw2=qw*qw;
var qx2=qx*qx;
var qy2=qy*qy;
var qz2=qz*qz;
var test=qx*qy+qz*qw;
var unit=qw2+qx2+qy2+qz2;
var conv=180/Math.PI;

if(test>0.49999*unit){
return [0,2*Math.atan2(qx,qw)*conv,90];}

if(test<-0.49999*unit){
return [0,-2*Math.atan2(qx,qw)*conv,-90];}


return [
MatrixMath.roundTo3Places(
Math.atan2(2*qx*qw-2*qy*qz,1-2*qx2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.atan2(2*qy*qw-2*qx*qz,1-2*qy2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.asin(2*qx*qy+2*qz*qw)*conv)];},








roundTo3Places:function(n){
var arr=n.toString().split('e');
return Math.round(arr[0]+'e'+(arr[1]?+arr[1]-3:3))*0.001;},













decomposeMatrix:function(transformMatrix){

invariant(
transformMatrix.length===16,
'Matrix decomposition needs a list of 3d matrix values, received %s',
transformMatrix);



var perspective=[];
var quaternion=[];
var scale=[];
var skew=[];
var translation=[];



if(!transformMatrix[15]){
return;}

var matrix=[];
var perspectiveMatrix=[];
for(var i=0;i<4;i++){
matrix.push([]);
for(var j=0;j<4;j++){
var value=transformMatrix[i*4+j]/transformMatrix[15];
matrix[i].push(value);
perspectiveMatrix.push(j===3?0:value);}}


perspectiveMatrix[15]=1;


if(!MatrixMath.determinant(perspectiveMatrix)){
return;}



if(matrix[0][3]!==0||matrix[1][3]!==0||matrix[2][3]!==0){


var rightHandSide=[
matrix[0][3],
matrix[1][3],
matrix[2][3],
matrix[3][3]];




var inversePerspectiveMatrix=MatrixMath.inverse(
perspectiveMatrix);

var transposedInversePerspectiveMatrix=MatrixMath.transpose(
inversePerspectiveMatrix);

var perspective=MatrixMath.multiplyVectorByMatrix(
rightHandSide,
transposedInversePerspectiveMatrix);}else 

{

perspective[0]=perspective[1]=perspective[2]=0;
perspective[3]=1;}



for(var i=0;i<3;i++){
translation[i]=matrix[3][i];}




var row=[];
for(i=0;i<3;i++){
row[i]=[
matrix[i][0],
matrix[i][1],
matrix[i][2]];}




scale[0]=MatrixMath.v3Length(row[0]);
row[0]=MatrixMath.v3Normalize(row[0],scale[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


scale[1]=MatrixMath.v3Length(row[1]);
row[1]=MatrixMath.v3Normalize(row[1],scale[1]);
skew[0]/=scale[1];


skew[1]=MatrixMath.v3Dot(row[0],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[0],1.0,-skew[1]);
skew[2]=MatrixMath.v3Dot(row[1],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[1],1.0,-skew[2]);


scale[2]=MatrixMath.v3Length(row[2]);
row[2]=MatrixMath.v3Normalize(row[2],scale[2]);
skew[1]/=scale[2];
skew[2]/=scale[2];




var pdum3=MatrixMath.v3Cross(row[1],row[2]);
if(MatrixMath.v3Dot(row[0],pdum3)<0){
for(i=0;i<3;i++){
scale[i]*=-1;
row[i][0]*=-1;
row[i][1]*=-1;
row[i][2]*=-1;}}




quaternion[0]=
0.5*Math.sqrt(Math.max(1+row[0][0]-row[1][1]-row[2][2],0));
quaternion[1]=
0.5*Math.sqrt(Math.max(1-row[0][0]+row[1][1]-row[2][2],0));
quaternion[2]=
0.5*Math.sqrt(Math.max(1-row[0][0]-row[1][1]+row[2][2],0));
quaternion[3]=
0.5*Math.sqrt(Math.max(1+row[0][0]+row[1][1]+row[2][2],0));

if(row[2][1]>row[1][2]){
quaternion[0]=-quaternion[0];}

if(row[0][2]>row[2][0]){
quaternion[1]=-quaternion[1];}

if(row[1][0]>row[0][1]){
quaternion[2]=-quaternion[2];}



var rotationDegrees;
if(
quaternion[0]<0.001&&quaternion[0]>=0&&
quaternion[1]<0.001&&quaternion[1]>=0)
{

rotationDegrees=[0,0,MatrixMath.roundTo3Places(
Math.atan2(row[0][1],row[0][0])*180/Math.PI)];}else 

{
rotationDegrees=MatrixMath.quaternionToDegreesXYZ(quaternion,matrix,row);}



return {
rotationDegrees:rotationDegrees,
perspective:perspective,
quaternion:quaternion,
scale:scale,
skew:skew,
translation:translation,

rotate:rotationDegrees[2],
rotateX:rotationDegrees[0],
rotateY:rotationDegrees[1],
scaleX:scale[0],
scaleY:scale[1],
translateX:translation[0],
translateY:translation[1]};}};





module.exports=MatrixMath;
});
__d('ActionSheetIOS',function(global, require, module, exports) {  'use strict';












var RCTActionSheetManager=require('NativeModules').ActionSheetManager;

var invariant=require('fbjs/lib/invariant.js');
var processColor=require('processColor');

var ActionSheetIOS={
showActionSheetWithOptions:function(options,callback){
invariant(
typeof options==='object'&&options!==null,
'Options must a valid object');

invariant(
typeof callback==='function',
'Must provide a valid callback');

RCTActionSheetManager.showActionSheetWithOptions(babelHelpers.extends({},
options,{tintColor:processColor(options.tintColor)}),
callback);},














showShareActionSheetWithOptions:function(
options,
failureCallback,
successCallback)
{
invariant(
typeof options==='object'&&options!==null,
'Options must a valid object');

invariant(
typeof failureCallback==='function',
'Must provide a valid failureCallback');

invariant(
typeof successCallback==='function',
'Must provide a valid successCallback');

RCTActionSheetManager.showShareActionSheetWithOptions(babelHelpers.extends({},
options,{tintColor:processColor(options.tintColor)}),
failureCallback,
successCallback);}};




module.exports=ActionSheetIOS;
});
__d('RCTRenderingPerf',function(global, require, module, exports) {  'use strict';












var ReactDefaultPerf=require('ReactDefaultPerf');

var invariant=require('fbjs/lib/invariant.js');






var perfModules=[];
var enabled=false;

var RCTRenderingPerf={

toggle:function(){
console.log('Render perfomance measurements enabled');
enabled=true;},


start:function(){
if(!enabled){
return;}


ReactDefaultPerf.start();
perfModules.forEach(function(module){return module.start();});},


stop:function(){
if(!enabled){
return;}


ReactDefaultPerf.stop();
ReactDefaultPerf.printInclusive();
ReactDefaultPerf.printWasted();

var totalRender=0;
var totalTime=0;
var measurements=ReactDefaultPerf.getLastMeasurements();
for(var ii=0;ii<measurements.length;ii++){
var render=measurements[ii].render;
for(var nodeName in render){
totalRender+=render[nodeName];}

totalTime+=measurements[ii].totalTime;}

console.log('Total time spent in render(): '+totalRender+'ms');

perfModules.forEach(function(module){return module.stop();});},


register:function(module){
invariant(
typeof module.start==='function',
'Perf module should have start() function');

invariant(
typeof module.stop==='function',
'Perf module should have stop() function');

perfModules.push(module);}};



module.exports=RCTRenderingPerf;
});
__d('Dimensions',function(global, require, module, exports) {  'use strict';












var Platform=require('Platform');
var UIManager=require('UIManager');

var invariant=require('fbjs/lib/invariant.js');

var dimensions=UIManager.Dimensions;




if(dimensions&&dimensions.windowPhysicalPixels){

dimensions=JSON.parse(JSON.stringify(dimensions));

var windowPhysicalPixels=dimensions.windowPhysicalPixels;
dimensions.window={
width:windowPhysicalPixels.width/windowPhysicalPixels.scale,
height:windowPhysicalPixels.height/windowPhysicalPixels.scale,
scale:windowPhysicalPixels.scale,
fontScale:windowPhysicalPixels.fontScale};

if(Platform.OS==='android'){

var screenPhysicalPixels=dimensions.screenPhysicalPixels;
dimensions.screen={
width:screenPhysicalPixels.width/screenPhysicalPixels.scale,
height:screenPhysicalPixels.height/screenPhysicalPixels.scale,
scale:screenPhysicalPixels.scale,
fontScale:screenPhysicalPixels.fontScale};



delete dimensions.screenPhysicalPixels;}else 
{
dimensions.screen=dimensions.window;}


delete dimensions.windowPhysicalPixels;}var 


Dimensions=function(){function Dimensions(){babelHelpers.classCallCheck(this,Dimensions);}babelHelpers.createClass(Dimensions,null,[{key:'set',value:function set(





dims){
babelHelpers.extends(dimensions,dims);
return true;}},{key:'get',value:function get(

















dim){
invariant(dimensions[dim],'No dimension set for key '+dim);
return dimensions[dim];}}]);return Dimensions;}();



module.exports=Dimensions;
});
__d('IntentAndroid',function(global, require, module, exports) {  'use strict';












var Linking=require('Linking');
var invariant=require('fbjs/lib/invariant.js');var 
































































IntentAndroid=function(){function IntentAndroid(){babelHelpers.classCallCheck(this,IntentAndroid);}babelHelpers.createClass(IntentAndroid,null,[{key:'openURL',value:function openURL(

















url){
console.warn('"IntentAndroid.openURL" is deprecated. Use the promise based "Linking.openURL" instead.');
Linking.openURL(url);}},{key:'canOpenURL',value:function canOpenURL(














url,callback){
console.warn('"IntentAndroid.canOpenURL" is deprecated. Use the promise based "Linking.canOpenURL" instead.');
invariant(
typeof callback==='function',
'A valid callback function is required');

Linking.canOpenURL(url).then(callback);}},{key:'getInitialURL',value:function getInitialURL(










callback){
console.warn('"IntentAndroid.getInitialURL" is deprecated. Use the promise based "Linking.getInitialURL" instead.');
invariant(
typeof callback==='function',
'A valid callback function is required');

Linking.getInitialURL().then(callback);}}]);return IntentAndroid;}();



module.exports=IntentAndroid;
});
__d('fbjs/lib/keyMirror.js',function(global, require, module, exports) {  'use strict';












var invariant=require('fbjs/lib/invariant.js');



















var keyMirror=function(obj){
var ret={};
var key;
!(obj instanceof Object&&!Array.isArray(obj))?process.env.NODE_ENV!=='production'?invariant(false,'keyMirror(...): Argument must be an object.'):invariant(false):undefined;
for(key in obj){
if(!obj.hasOwnProperty(key)){
continue;}

ret[key]=key;}

return ret;};


module.exports=keyMirror;
});
__d('LinkingIOS',function(global, require, module, exports) {  'use strict';












var Linking=require('Linking');
var RCTLinkingManager=require('NativeModules').LinkingManager;
var invariant=require('fbjs/lib/invariant.js');

var _initialURL=RCTLinkingManager&&RCTLinkingManager.initialURL;var 












































































LinkingIOS=function(){function LinkingIOS(){babelHelpers.classCallCheck(this,LinkingIOS);}babelHelpers.createClass(LinkingIOS,null,[{key:'addEventListener',value:function addEventListener(






type,handler){
console.warn('"LinkingIOS.addEventListener" is deprecated. Use "Linking.addEventListener" instead.');
Linking.addEventListener(type,handler);}},{key:'removeEventListener',value:function removeEventListener(







type,handler){
console.warn('"LinkingIOS.removeEventListener" is deprecated. Use "Linking.removeEventListener" instead.');
Linking.removeEventListener(type,handler);}},{key:'openURL',value:function openURL(







url){
console.warn('"LinkingIOS.openURL" is deprecated. Use the promise based "Linking.openURL" instead.');
Linking.openURL(url);}},{key:'canOpenURL',value:function canOpenURL(











url,callback){
console.warn('"LinkingIOS.canOpenURL" is deprecated. Use the promise based "Linking.canOpenURL" instead.');
invariant(
typeof callback==='function',
'A valid callback function is required');

Linking.canOpenURL(url).then(callback);}},{key:'popInitialURL',value:function popInitialURL()








{
console.warn('"LinkingIOS.popInitialURL" is deprecated. Use the promise based "Linking.getInitialURL" instead.');
var initialURL=_initialURL;
_initialURL=null;
return initialURL;}}]);return LinkingIOS;}();



module.exports=LinkingIOS;
});
__d('NavigationAbstractPanResponder',function(global, require, module, exports) {  'use strict';







var PanResponder=require('PanResponder');

var invariant=require('fbjs/lib/invariant.js');

var EmptyPanHandlers={
onMoveShouldSetPanResponder:null,
onPanResponderGrant:null,
onPanResponderMove:null,
onPanResponderRelease:null,
onPanResponderTerminate:null};var 






NavigationAbstractPanResponder=



function NavigationAbstractPanResponder(){var _this=this;babelHelpers.classCallCheck(this,NavigationAbstractPanResponder);
var config={};
Object.keys(EmptyPanHandlers).forEach(function(name){
var fn=_this[name];

invariant(
typeof fn==='function',
'subclass of `NavigationAbstractPanResponder` must implement method %s',
name);


config[name]=fn.bind(_this);},
this);

this.panHandlers=PanResponder.create(config).panHandlers;};



module.exports=NavigationAbstractPanResponder;
});
__d('PushNotificationIOS',function(global, require, module, exports) {  'use strict';












var RCTDeviceEventEmitter=require('RCTDeviceEventEmitter');
var RCTPushNotificationManager=require('NativeModules').PushNotificationManager;
var invariant=require('fbjs/lib/invariant.js');

var _notifHandlers=new Map();
var _initialNotification=RCTPushNotificationManager&&
RCTPushNotificationManager.initialNotification;

var DEVICE_NOTIF_EVENT='remoteNotificationReceived';
var NOTIF_REGISTER_EVENT='remoteNotificationsRegistered';
var DEVICE_LOCAL_NOTIF_EVENT='localNotificationReceived';var 













































PushNotificationIOS=function(){babelHelpers.createClass(PushNotificationIOS,null,[{key:'presentLocalNotification',value:function presentLocalNotification(
















details){
RCTPushNotificationManager.presentLocalNotification(details);}},{key:'scheduleLocalNotification',value:function scheduleLocalNotification(














details){
RCTPushNotificationManager.scheduleLocalNotification(details);}},{key:'cancelAllLocalNotifications',value:function cancelAllLocalNotifications()





{
RCTPushNotificationManager.cancelAllLocalNotifications();}},{key:'setApplicationIconBadgeNumber',value:function setApplicationIconBadgeNumber(





number){
RCTPushNotificationManager.setApplicationIconBadgeNumber(number);}},{key:'getApplicationIconBadgeNumber',value:function getApplicationIconBadgeNumber(





callback){
RCTPushNotificationManager.getApplicationIconBadgeNumber(callback);}},{key:'cancelLocalNotifications',value:function cancelLocalNotifications(









userInfo){
RCTPushNotificationManager.cancelLocalNotifications(userInfo);}},{key:'addEventListener',value:function addEventListener(













type,handler){
invariant(
type==='notification'||type==='register'||type==='localNotification',
'PushNotificationIOS only supports `notification`, `register` and `localNotification` events');

var listener;
if(type==='notification'){
listener=RCTDeviceEventEmitter.addListener(
DEVICE_NOTIF_EVENT,
function(notifData){
handler(new PushNotificationIOS(notifData));});}else 


if(type==='localNotification'){
listener=RCTDeviceEventEmitter.addListener(
DEVICE_LOCAL_NOTIF_EVENT,
function(notifData){
handler(new PushNotificationIOS(notifData));});}else 


if(type==='register'){
listener=RCTDeviceEventEmitter.addListener(
NOTIF_REGISTER_EVENT,
function(registrationInfo){
handler(registrationInfo.deviceToken);});}



_notifHandlers.set(handler,listener);}},{key:'requestPermissions',value:function requestPermissions(
















permissions)



{
var requestedPermissions={};
if(permissions){
requestedPermissions={
alert:!!permissions.alert,
badge:!!permissions.badge,
sound:!!permissions.sound};}else 

{
requestedPermissions={
alert:true,
badge:true,
sound:true};}


RCTPushNotificationManager.requestPermissions(requestedPermissions);}},{key:'abandonPermissions',value:function abandonPermissions()










{
RCTPushNotificationManager.abandonPermissions();}},{key:'checkPermissions',value:function checkPermissions(










callback){
invariant(
typeof callback==='function',
'Must provide a valid callback');

RCTPushNotificationManager.checkPermissions(callback);}},{key:'removeEventListener',value:function removeEventListener(






type,handler){
invariant(
type==='notification'||type==='register'||type==='localNotification',
'PushNotificationIOS only supports `notification`, `register` and `localNotification` events');

var listener=_notifHandlers.get(handler);
if(!listener){
return;}

listener.remove();
_notifHandlers.delete(handler);}},{key:'popInitialNotification',value:function popInitialNotification()










{
var initialNotification=_initialNotification&&
new PushNotificationIOS(_initialNotification);
_initialNotification=null;
return initialNotification;}}]);







function PushNotificationIOS(nativeNotif){var _this=this;babelHelpers.classCallCheck(this,PushNotificationIOS);
this._data={};





Object.keys(nativeNotif).forEach(function(notifKey){
var notifVal=nativeNotif[notifKey];
if(notifKey==='aps'){
_this._alert=notifVal.alert;
_this._sound=notifVal.sound;
_this._badgeCount=notifVal.badge;}else 
{
_this._data[notifKey]=notifVal;}});}babelHelpers.createClass(PushNotificationIOS,[{key:'getMessage',value:function getMessage()







{

return this._alert;}},{key:'getSound',value:function getSound()





{
return this._sound;}},{key:'getAlert',value:function getAlert()





{
return this._alert;}},{key:'getBadgeCount',value:function getBadgeCount()





{
return this._badgeCount;}},{key:'getData',value:function getData()





{
return this._data;}}]);return PushNotificationIOS;}();



module.exports=PushNotificationIOS;
});
__d('EventSubscriptionVendor',function(global, require, module, exports) {  'use strict';


















var invariant=require('fbjs/lib/invariant.js');var 





EventSubscriptionVendor=function(){

function EventSubscriptionVendor(){babelHelpers.classCallCheck(this,EventSubscriptionVendor);
this._subscriptionsForType={};
this._currentSubscription=null;}babelHelpers.createClass(EventSubscriptionVendor,[{key:'addSubscription',value:function addSubscription(









eventType,subscription){
invariant(
subscription.subscriber===this,
'The subscriber of the subscription is incorrectly set.');
if(!this._subscriptionsForType[eventType]){
this._subscriptionsForType[eventType]=[];}

var key=this._subscriptionsForType[eventType].length;
this._subscriptionsForType[eventType].push(subscription);
subscription.eventType=eventType;
subscription.key=key;
return subscription;}},{key:'removeAllSubscriptions',value:function removeAllSubscriptions(








eventType){
if(eventType===undefined){
this._subscriptionsForType={};}else 
{
delete this._subscriptionsForType[eventType];}}},{key:'removeSubscription',value:function removeSubscription(









subscription){
var eventType=subscription.eventType;
var key=subscription.key;

var subscriptionsForType=this._subscriptionsForType[eventType];
if(subscriptionsForType){
delete subscriptionsForType[key];}}},{key:'getSubscriptionsForType',value:function getSubscriptionsForType(















eventType){
return this._subscriptionsForType[eventType];}}]);return EventSubscriptionVendor;}();



module.exports=EventSubscriptionVendor;
});
__d('styleDiffer',function(global, require, module, exports) {  'use strict';












var deepDiffer=require('deepDiffer');

function styleDiffer(a,b){
return !styleEqual(a,b);}


function styleEqual(a,b){
if(!a){
return !b;}

if(!b){
return !a;}

if(typeof a!==typeof b){
return false;}

if(typeof a==='number'){
return a===b;}


if(Array.isArray(a)){
if(!Array.isArray(b)||a.length!==b.length){
return false;}

for(var i=0;i<a.length;++i){
if(!styleEqual(a[i],b[i])){
return false;}}


return true;}


for(var key in a){
if(deepDiffer(a[key],b[key])){
return false;}}



for(var key in b){
if(!a.hasOwnProperty(key)){
return false;}}



return true;}


module.exports=styleDiffer;
});
__d('ReactNativeAttributePayload',function(global, require, module, exports) {  'use strict';












var Platform=require('Platform');

var deepDiffer=require('deepDiffer');
var styleDiffer=require('styleDiffer');
var flattenStyle=require('flattenStyle');














function translateKey(propKey){
if(propKey==='transform'){




if(Platform.OS==='android'){
return 'decomposedMatrix';}else 
{
return 'transformMatrix';}}


return propKey;}


function defaultDiffer(prevProp,nextProp){
if(typeof nextProp!=='object'||nextProp===null){

return true;}else 
{

return deepDiffer(prevProp,nextProp);}}



function diffNestedProperty(
updatePayload,
prevProp,
nextProp,
validAttributes)
{





if(!styleDiffer(prevProp,nextProp)){
return updatePayload;}




var previousFlattenedStyle=flattenStyle(prevProp);
var nextFlattenedStyle=flattenStyle(nextProp);

if(!previousFlattenedStyle||!nextFlattenedStyle){
if(nextFlattenedStyle){
return addProperties(
updatePayload,
nextFlattenedStyle,
validAttributes);}


if(previousFlattenedStyle){
return clearProperties(
updatePayload,
previousFlattenedStyle,
validAttributes);}


return updatePayload;}



return diffProperties(
updatePayload,
previousFlattenedStyle,
nextFlattenedStyle,
validAttributes);}























function clearNestedProperty(
updatePayload,
prevProp,
validAttributes)
{

return diffNestedProperty(updatePayload,prevProp,{},validAttributes);}








function diffProperties(
updatePayload,
prevProps,
nextProps,
validAttributes)
{
var attributeConfig;
var nextProp;
var prevProp;

for(var propKey in nextProps){
attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


var altKey=translateKey(propKey);
if(!validAttributes[altKey]){

altKey=propKey;}


if(updatePayload&&updatePayload[altKey]!==undefined){


continue;}

prevProp=prevProps[propKey];
nextProp=nextProps[propKey];



if(typeof nextProp==='function'){
nextProp=true;


if(typeof prevProp==='function'){
prevProp=true;}}



if(prevProp===nextProp){
continue;}



if(typeof attributeConfig!=='object'){

if(defaultDiffer(prevProp,nextProp)){

(updatePayload||(updatePayload={}))[altKey]=nextProp;}}else 

if(typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){

var shouldUpdate=prevProp===undefined||(
typeof attributeConfig.diff==='function'?
attributeConfig.diff(prevProp,nextProp):
defaultDiffer(prevProp,nextProp));

if(shouldUpdate){
var nextValue=typeof attributeConfig.process==='function'?
attributeConfig.process(nextProp):
nextProp;
(updatePayload||(updatePayload={}))[altKey]=nextValue;}}else 

{

updatePayload=diffNestedProperty(
updatePayload,
prevProp,
nextProp,
attributeConfig);}}







for(var propKey in prevProps){
if(nextProps[propKey]!==undefined){
continue;}

attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


prevProp=prevProps[propKey];
if(prevProp===undefined){
continue;}


if(typeof attributeConfig!=='object'||
typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){



(updatePayload||(updatePayload={}))[translateKey(propKey)]=null;}else 
{



updatePayload=clearNestedProperty(
updatePayload,
prevProp,
attributeConfig);}}



return updatePayload;}





function addProperties(
updatePayload,
props,
validAttributes)
{
return diffProperties(updatePayload,{},props,validAttributes);}






function clearProperties(
updatePayload,
prevProps,
validAttributes)
{
return diffProperties(updatePayload,prevProps,{},validAttributes);}


var ReactNativeAttributePayload={

create:function(
props,
validAttributes)
{
return addProperties(
null,
props,
validAttributes);},



diff:function(
prevProps,
nextProps,
validAttributes)
{
return diffProperties(
null,
prevProps,
nextProps,
validAttributes);}};





module.exports=ReactNativeAttributePayload;
});
__d('ViewPagerAndroid',function(global, require, module, exports) {  'use strict';







var NativeMethodsMixin=require('NativeMethodsMixin');
var React=require('React');
var ReactElement=require('ReactElement');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');
var ReactPropTypes=require('ReactPropTypes');
var UIManager=require('UIManager');
var View=require('View');

var dismissKeyboard=require('dismissKeyboard');
var requireNativeComponent=require('requireNativeComponent');

var VIEWPAGER_REF='viewPager';















































var ViewPagerAndroid=React.createClass({displayName:'ViewPagerAndroid',

propTypes:babelHelpers.extends({},
View.propTypes,{




initialPage:ReactPropTypes.number,










onPageScroll:ReactPropTypes.func,









onPageScrollStateChanged:ReactPropTypes.func,







onPageSelected:ReactPropTypes.func,






keyboardDismissMode:ReactPropTypes.oneOf([
'none',
'on-drag'])}),



componentDidMount:function(){
if(this.props.initialPage){
this.setPageWithoutAnimation(this.props.initialPage);}},



getInnerViewNode:function(){
return this.refs[VIEWPAGER_REF].getInnerViewNode();},


_childrenWithOverridenStyle:function(){



return React.Children.map(this.props.children,function(child){
if(!child){
return null;}

var newProps=babelHelpers.extends({},
child.props,{
style:[child.props.style,{
position:'absolute',
left:0,
top:0,
right:0,
bottom:0,
width:undefined,
height:undefined}],

collapsable:false});

if(child.type&&
child.type.displayName&&
child.type.displayName!=='RCTView'&&
child.type.displayName!=='View'){
console.warn('Each ViewPager child must be a <View>. Was '+child.type.displayName);}

return ReactElement.createElement(child.type,newProps);});},



_onPageScroll:function(e){
if(this.props.onPageScroll){
this.props.onPageScroll(e);}

if(this.props.keyboardDismissMode==='on-drag'){
dismissKeyboard();}},



_onPageScrollStateChanged:function(e){
if(this.props.onPageScrollStateChanged){
this.props.onPageScrollStateChanged(e.nativeEvent.pageScrollState);}},



_onPageSelected:function(e){
if(this.props.onPageSelected){
this.props.onPageSelected(e);}},







setPage:function(selectedPage){
UIManager.dispatchViewManagerCommand(
React.findNodeHandle(this),
UIManager.AndroidViewPager.Commands.setPage,
[selectedPage]);},







setPageWithoutAnimation:function(selectedPage){
UIManager.dispatchViewManagerCommand(
React.findNodeHandle(this),
UIManager.AndroidViewPager.Commands.setPageWithoutAnimation,
[selectedPage]);},



render:function(){
return (
React.createElement(NativeAndroidViewPager,{
ref:VIEWPAGER_REF,
style:this.props.style,
onPageScroll:this._onPageScroll,
onPageScrollStateChanged:this._onPageScrollStateChanged,
onPageSelected:this._onPageSelected,
children:this._childrenWithOverridenStyle()}));}});





var NativeAndroidViewPager=requireNativeComponent('AndroidViewPager',ViewPagerAndroid);

module.exports=ViewPagerAndroid;
});
__d('createStrictShapeTypeChecker',function(global, require, module, exports) {  'use strict';












var ReactPropTypeLocationNames=require('ReactPropTypeLocationNames');

var invariant=require('fbjs/lib/invariant.js');
var merge=require('merge');

function createStrictShapeTypeChecker(
shapeTypes)
{
function checkType(isRequired,props,propName,componentName,location){
if(!props[propName]){
if(isRequired){
invariant(
false,
'Required object `'+propName+'` was not specified in '+('`'+
componentName+'`.'));}


return;}

var propValue=props[propName];
var propType=typeof propValue;
var locationName=
location&&ReactPropTypeLocationNames[location]||'(unknown)';
if(propType!=='object'){
invariant(
false,
'Invalid '+locationName+' `'+propName+'` of type `'+propType+'` '+('supplied to `'+
componentName+'`, expected `object`.'));}




var allKeys=merge(props[propName],shapeTypes);
for(var key in allKeys){
var checker=shapeTypes[key];
if(!checker){
invariant(
false,
'Invalid props.'+propName+' key `'+key+'` supplied to `'+componentName+'`.'+'\nBad object: '+
JSON.stringify(props[propName],null,'  ')+'\nValid keys: '+
JSON.stringify(Object.keys(shapeTypes),null,'  '));}


var error=checker(propValue,key,componentName,location);
if(error){
invariant(
false,
error.message+'\nBad object: '+
JSON.stringify(props[propName],null,'  '));}}}




function chainedCheckType(
props,
propName,
componentName,
location)
{
return checkType(false,props,propName,componentName,location);}

chainedCheckType.isRequired=checkType.bind(null,true);
return chainedCheckType;}


module.exports=createStrictShapeTypeChecker;
});
__d('fbjs/lib/warning.js',function(global, require, module, exports) {  'use strict';












var emptyFunction=require('fbjs/lib/emptyFunction.js');








var warning=emptyFunction;

if(process.env.NODE_ENV!=='production'){
warning=function(condition,format){
for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){
args[_key-2]=arguments[_key];}


if(format===undefined){
throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}


if(format.indexOf('Failed Composite propType: ')===0){
return;}


if(!condition){
var argIndex=0;
var message='Warning: '+format.replace(/%s/g,function(){
return args[argIndex++];});

if(typeof console!=='undefined'){
console.error(message);}

try{



throw new Error(message);}
catch(x){}}};}




module.exports=warning;
});
__d('ReactPropTypes',function(global, require, module, exports) {  'use strict';












var ReactElement=require('ReactElement');
var ReactPropTypeLocationNames=require('ReactPropTypeLocationNames');

var emptyFunction=require('fbjs/lib/emptyFunction.js');
var getIteratorFn=require('getIteratorFn');
















































var ANONYMOUS='<<anonymous>>';

var ReactPropTypes={
array:createPrimitiveTypeChecker('array'),
bool:createPrimitiveTypeChecker('boolean'),
func:createPrimitiveTypeChecker('function'),
number:createPrimitiveTypeChecker('number'),
object:createPrimitiveTypeChecker('object'),
string:createPrimitiveTypeChecker('string'),

any:createAnyTypeChecker(),
arrayOf:createArrayOfTypeChecker,
element:createElementTypeChecker(),
instanceOf:createInstanceTypeChecker,
node:createNodeChecker(),
objectOf:createObjectOfTypeChecker,
oneOf:createEnumTypeChecker,
oneOfType:createUnionTypeChecker,
shape:createShapeTypeChecker};


function createChainableTypeChecker(validate){
function checkType(isRequired,props,propName,componentName,location,propFullName){
componentName=componentName||ANONYMOUS;
propFullName=propFullName||propName;
if(props[propName]==null){
var locationName=ReactPropTypeLocationNames[location];
if(isRequired){
return new Error('Required '+locationName+' `'+propFullName+'` was not specified in '+('`'+componentName+'`.'));}

return null;}else 
{
return validate(props,propName,componentName,location,propFullName);}}



var chainedCheckType=checkType.bind(null,false);
chainedCheckType.isRequired=checkType.bind(null,true);

return chainedCheckType;}


function createPrimitiveTypeChecker(expectedType){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!==expectedType){
var locationName=ReactPropTypeLocationNames[location];



var preciseType=getPreciseType(propValue);

return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+preciseType+'` supplied to `'+componentName+'`, expected ')+('`'+expectedType+'`.'));}

return null;}

return createChainableTypeChecker(validate);}


function createAnyTypeChecker(){
return createChainableTypeChecker(emptyFunction.thatReturns(null));}


function createArrayOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
if(!Array.isArray(propValue)){
var locationName=ReactPropTypeLocationNames[location];
var propType=getPropType(propValue);
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an array.'));}

for(var i=0;i<propValue.length;i++){
var error=typeChecker(propValue,i,componentName,location,propFullName+'['+i+']');
if(error instanceof Error){
return error;}}


return null;}

return createChainableTypeChecker(validate);}


function createElementTypeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!ReactElement.isValidElement(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a single ReactElement.'));}

return null;}

return createChainableTypeChecker(validate);}


function createInstanceTypeChecker(expectedClass){
function validate(props,propName,componentName,location,propFullName){
if(!(props[propName] instanceof expectedClass)){
var locationName=ReactPropTypeLocationNames[location];
var expectedClassName=expectedClass.name||ANONYMOUS;
var actualClassName=getClassName(props[propName]);
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+actualClassName+'` supplied to `'+componentName+'`, expected ')+('instance of `'+expectedClassName+'`.'));}

return null;}

return createChainableTypeChecker(validate);}


function createEnumTypeChecker(expectedValues){
if(!Array.isArray(expectedValues)){
return createChainableTypeChecker(function(){
return new Error('Invalid argument supplied to oneOf, expected an instance of array.');});}



function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
for(var i=0;i<expectedValues.length;i++){
if(propValue===expectedValues[i]){
return null;}}



var locationName=ReactPropTypeLocationNames[location];
var valuesString=JSON.stringify(expectedValues);
return new Error('Invalid '+locationName+' `'+propFullName+'` of value `'+propValue+'` '+('supplied to `'+componentName+'`, expected one of '+valuesString+'.'));}

return createChainableTypeChecker(validate);}


function createObjectOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an object.'));}

for(var key in propValue){
if(propValue.hasOwnProperty(key)){
var error=typeChecker(propValue,key,componentName,location,propFullName+'.'+key);
if(error instanceof Error){
return error;}}}



return null;}

return createChainableTypeChecker(validate);}


function createUnionTypeChecker(arrayOfTypeCheckers){
if(!Array.isArray(arrayOfTypeCheckers)){
return createChainableTypeChecker(function(){
return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');});}



function validate(props,propName,componentName,location,propFullName){
for(var i=0;i<arrayOfTypeCheckers.length;i++){
var checker=arrayOfTypeCheckers[i];
if(checker(props,propName,componentName,location,propFullName)==null){
return null;}}



var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`.'));}

return createChainableTypeChecker(validate);}


function createNodeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!isNode(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a ReactNode.'));}

return null;}

return createChainableTypeChecker(validate);}


function createShapeTypeChecker(shapeTypes){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` of type `'+propType+'` '+('supplied to `'+componentName+'`, expected `object`.'));}

for(var key in shapeTypes){
var checker=shapeTypes[key];
if(!checker){
continue;}

var error=checker(propValue,key,componentName,location,propFullName+'.'+key);
if(error){
return error;}}


return null;}

return createChainableTypeChecker(validate);}


function isNode(propValue){
switch(typeof propValue){
case 'number':
case 'string':
case 'undefined':
return true;
case 'boolean':
return !propValue;
case 'object':
if(Array.isArray(propValue)){
return propValue.every(isNode);}

if(propValue===null||ReactElement.isValidElement(propValue)){
return true;}


var iteratorFn=getIteratorFn(propValue);
if(iteratorFn){
var iterator=iteratorFn.call(propValue);
var step;
if(iteratorFn!==propValue.entries){
while(!(step=iterator.next()).done){
if(!isNode(step.value)){
return false;}}}else 


{

while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
if(!isNode(entry[1])){
return false;}}}}}else 




{
return false;}


return true;
default:
return false;}}




function getPropType(propValue){
var propType=typeof propValue;
if(Array.isArray(propValue)){
return 'array';}

if(propValue instanceof RegExp){



return 'object';}

return propType;}




function getPreciseType(propValue){
var propType=getPropType(propValue);
if(propType==='object'){
if(propValue instanceof Date){
return 'date';}else 
if(propValue instanceof RegExp){
return 'regexp';}}


return propType;}



function getClassName(propValue){
if(!propValue.constructor||!propValue.constructor.name){
return '<<anonymous>>';}

return propValue.constructor.name;}


module.exports=ReactPropTypes;
});
__d('Image',function(global, require, module, exports) {  'use strict';












var NativeMethodsMixin=require('NativeMethodsMixin');
var NativeModules=require('NativeModules');
var ImageResizeMode=require('ImageResizeMode');
var ImageStylePropTypes=require('ImageStylePropTypes');
var PropTypes=require('ReactPropTypes');
var React=require('React');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');
var StyleSheet=require('StyleSheet');
var StyleSheetPropType=require('StyleSheetPropType');
var View=require('View');

var flattenStyle=require('flattenStyle');
var invariant=require('fbjs/lib/invariant.js');
var merge=require('merge');
var requireNativeComponent=require('requireNativeComponent');
var resolveAssetSource=require('resolveAssetSource');
























var ImageViewAttributes=merge(ReactNativeViewAttributes.UIView,{
src:true,
loadingIndicatorSrc:true,
resizeMode:true,
progressiveRenderingEnabled:true,
fadeDuration:true,
shouldNotifyLoadEvents:true});


var Image=React.createClass({displayName:'Image',
propTypes:babelHelpers.extends({},
View.propTypes,{
style:StyleSheetPropType(ImageStylePropTypes),





source:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),


PropTypes.number]),






loadingIndicatorSource:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),


PropTypes.number]),

progressiveRenderingEnabled:PropTypes.bool,
fadeDuration:PropTypes.number,



onLoadStart:PropTypes.func,



onLoad:PropTypes.func,



onLoadEnd:PropTypes.func,



testID:PropTypes.string}),


statics:{
resizeMode:ImageResizeMode},


mixins:[NativeMethodsMixin],






viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},


_updateViewConfig:function(props){
if(props.children){
this.viewConfig={
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView};}else 

{
this.viewConfig={
uiViewClassName:'RCTImageView',
validAttributes:ImageViewAttributes};}},




componentWillMount:function(){
this._updateViewConfig(this.props);},


componentWillReceiveProps:function(nextProps){
this._updateViewConfig(nextProps);},


contextTypes:{
isInAParentText:React.PropTypes.bool},


render:function(){
var source=resolveAssetSource(this.props.source);
var loadingIndicatorSource=resolveAssetSource(this.props.loadingIndicatorSource);




if(source&&source.uri===''){
console.warn('source.uri should not be an empty string');}


if(this.props.src){
console.warn('The <Image> component requires a `source` property rather than `src`.');}


if(source&&source.uri){var 
width=source.width;var height=source.height;
var style=flattenStyle([{width:width,height:height},styles.base,this.props.style]);var _props=
this.props;var onLoadStart=_props.onLoadStart;var onLoad=_props.onLoad;var onLoadEnd=_props.onLoadEnd;

var nativeProps=merge(this.props,{
style:style,
shouldNotifyLoadEvents:!!(onLoadStart||onLoad||onLoadEnd),
src:source.uri,
loadingIndicatorSrc:loadingIndicatorSource?loadingIndicatorSource.uri:null});


if(nativeProps.children){

var imageProps=merge(nativeProps,{
style:styles.absoluteImage,
children:undefined});

return (
React.createElement(View,{style:nativeProps.style},
React.createElement(RKImage,imageProps),
this.props.children));}else 


{
if(this.context.isInAParentText){
return React.createElement(RCTTextInlineImage,nativeProps);}else 
{
return React.createElement(RKImage,nativeProps);}}}



return null;}});



var styles=StyleSheet.create({
base:{
overflow:'hidden'},

absoluteImage:{
left:0,
right:0,
top:0,
bottom:0,
position:'absolute'}});



var cfg={
nativeOnly:{
src:true,
loadingIndicatorSrc:true,
defaultImageSrc:true,
imageTag:true,
progressHandlerRegistered:true,
shouldNotifyLoadEvents:true}};


var RKImage=requireNativeComponent('RCTImageView',Image,cfg);
var RCTTextInlineImage=requireNativeComponent('RCTTextInlineImage',Image,cfg);

module.exports=Image;
});
__d('ToolbarAndroid',function(global, require, module, exports) {  'use strict';












var Image=require('Image');
var NativeMethodsMixin=require('NativeMethodsMixin');
var React=require('React');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');
var ReactPropTypes=require('ReactPropTypes');
var UIManager=require('UIManager');
var View=require('View');
var ColorPropType=require('ColorPropType');

var requireNativeComponent=require('requireNativeComponent');
var resolveAssetSource=require('resolveAssetSource');

var optionalImageSource=ReactPropTypes.oneOfType([
Image.propTypes.source,


ReactPropTypes.oneOf([])]);





































var ToolbarAndroid=React.createClass({displayName:'ToolbarAndroid',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{













actions:ReactPropTypes.arrayOf(ReactPropTypes.shape({
title:ReactPropTypes.string.isRequired,
icon:optionalImageSource,
show:ReactPropTypes.oneOf(['always','ifRoom','never']),
showWithText:ReactPropTypes.bool})),




logo:optionalImageSource,



navIcon:optionalImageSource,




onActionSelected:ReactPropTypes.func,



onIconClicked:ReactPropTypes.func,



overflowIcon:optionalImageSource,



subtitle:ReactPropTypes.string,



subtitleColor:ColorPropType,



title:ReactPropTypes.string,



titleColor:ColorPropType,








contentInsetStart:ReactPropTypes.number,








contentInsetEnd:ReactPropTypes.number,










rtl:ReactPropTypes.bool,



testID:ReactPropTypes.string}),


render:function(){
var nativeProps=babelHelpers.extends({},
this.props);

if(this.props.logo){
nativeProps.logo=resolveAssetSource(this.props.logo);}

if(this.props.navIcon){
nativeProps.navIcon=resolveAssetSource(this.props.navIcon);}

if(this.props.overflowIcon){
nativeProps.overflowIcon=resolveAssetSource(this.props.overflowIcon);}

if(this.props.actions){
var nativeActions=[];
for(var i=0;i<this.props.actions.length;i++){
var action=babelHelpers.extends({},
this.props.actions[i]);

if(action.icon){
action.icon=resolveAssetSource(action.icon);}

if(action.show){
action.show=UIManager.ToolbarAndroid.Constants.ShowAsAction[action.show];}

nativeActions.push(action);}

nativeProps.nativeActions=nativeActions;}


return React.createElement(NativeToolbar,babelHelpers.extends({onSelect:this._onSelect},nativeProps));},


_onSelect:function(event){
var position=event.nativeEvent.position;
if(position===-1){
this.props.onIconClicked&&this.props.onIconClicked();}else 
{
this.props.onActionSelected&&this.props.onActionSelected(position);}}});




var toolbarAttributes=babelHelpers.extends({},
ReactNativeViewAttributes.UIView,{
actions:true,
logo:true,
navIcon:true,
overflowIcon:true,
rtl:true,
subtitle:true,
subtitleColor:true,
title:true,
titleColor:true});


var NativeToolbar=requireNativeComponent('ToolbarAndroid',ToolbarAndroid,{
nativeOnly:{
nativeActions:true}});



module.exports=ToolbarAndroid;
});
__d('ImageResizeMode',function(global, require, module, exports) {  'use strict';












var keyMirror=require('fbjs/lib/keyMirror.js');





var ImageResizeMode=keyMirror({




contain:null,




cover:null,





stretch:null});


module.exports=ImageResizeMode;
});
__d('mergeHelpers',function(global, require, module, exports) {  "use strict";


































var invariant=require('fbjs/lib/invariant.js');
var keyMirror=require('fbjs/lib/keyMirror.js');





var MAX_MERGE_DEPTH=36;







var isTerminal=function(o){
return typeof o!=='object'||o===null;};


var mergeHelpers={

MAX_MERGE_DEPTH:MAX_MERGE_DEPTH,

isTerminal:isTerminal,







normalizeMergeArg:function(arg){
return arg===undefined||arg===null?{}:arg;},










checkMergeArrayArgs:function(one,two){
invariant(
Array.isArray(one)&&Array.isArray(two),
'Tried to merge arrays, instead got %s and %s.',
one,
two);},







checkMergeObjectArgs:function(one,two){
mergeHelpers.checkMergeObjectArg(one);
mergeHelpers.checkMergeObjectArg(two);},





checkMergeObjectArg:function(arg){
invariant(
!isTerminal(arg)&&!Array.isArray(arg),
'Tried to merge an object, instead got %s.',
arg);},






checkMergeIntoObjectArg:function(arg){
invariant(
(!isTerminal(arg)||typeof arg==='function')&&!Array.isArray(arg),
'Tried to merge into an object, instead got %s.',
arg);},









checkMergeLevel:function(level){
invariant(
level<MAX_MERGE_DEPTH,
'Maximum deep merge depth exceeded. You may be attempting to merge '+
'circular structures in an unsupported way.');},








checkArrayStrategy:function(strategy){
invariant(
strategy===undefined||strategy in mergeHelpers.ArrayStrategies,
'You must provide an array strategy to deep merge functions to '+
'instruct the deep merge how to resolve merging two arrays.');},










ArrayStrategies:keyMirror({
Clobber:true,
IndexByIndex:true})};




module.exports=mergeHelpers;
});
__d('ImageStylePropTypes',function(global, require, module, exports) {  'use strict';












var ImageResizeMode=require('ImageResizeMode');
var LayoutPropTypes=require('LayoutPropTypes');
var ReactPropTypes=require('ReactPropTypes');
var ColorPropType=require('ColorPropType');
var ShadowPropTypesIOS=require('ShadowPropTypesIOS');
var TransformPropTypes=require('TransformPropTypes');

var ImageStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
resizeMode:ReactPropTypes.oneOf(Object.keys(ImageResizeMode)),
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderWidth:ReactPropTypes.number,
borderRadius:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),






tintColor:ColorPropType,
opacity:ReactPropTypes.number,

















overlayColor:ReactPropTypes.string});


module.exports=ImageStylePropTypes;
});
__d('ViewStylePropTypes',function(global, require, module, exports) {  'use strict';












var LayoutPropTypes=require('LayoutPropTypes');
var ReactPropTypes=require('ReactPropTypes');
var ColorPropType=require('ColorPropType');
var ShadowPropTypesIOS=require('ShadowPropTypesIOS');
var TransformPropTypes=require('TransformPropTypes');




var ViewStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderTopColor:ColorPropType,
borderRightColor:ColorPropType,
borderBottomColor:ColorPropType,
borderLeftColor:ColorPropType,
borderRadius:ReactPropTypes.number,
borderTopLeftRadius:ReactPropTypes.number,
borderTopRightRadius:ReactPropTypes.number,
borderBottomLeftRadius:ReactPropTypes.number,
borderBottomRightRadius:ReactPropTypes.number,
borderStyle:ReactPropTypes.oneOf(['solid','dotted','dashed']),
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,
opacity:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),







elevation:ReactPropTypes.number});


module.exports=ViewStylePropTypes;
});
__d('RecyclerViewBackedScrollView',function(global, require, module, exports) {  'use strict';






var NativeMethodsMixin=require('NativeMethodsMixin');
var React=require('React');
var ScrollResponder=require('ScrollResponder');
var ScrollView=require('ScrollView');
var View=require('View');
var StyleSheet=require('StyleSheet');

var requireNativeComponent=require('requireNativeComponent');

var INNERVIEW='InnerView';




































var RecyclerViewBackedScrollView=React.createClass({displayName:'RecyclerViewBackedScrollView',

propTypes:babelHelpers.extends({},
ScrollView.propTypes),


mixins:[ScrollResponder.Mixin],

getInitialState:function(){
return this.scrollResponderMixinGetInitialState();},


getScrollResponder:function(){
return this;},


setNativeProps:function(props){
this.refs[INNERVIEW].setNativeProps(props);},


_handleContentSizeChange:function(event){var _event$nativeEvent=
event.nativeEvent;var width=_event$nativeEvent.width;var height=_event$nativeEvent.height;
this.props.onContentSizeChange(width,height);},


render:function(){
var props=babelHelpers.extends({},
this.props,{
onTouchStart:this.scrollResponderHandleTouchStart,
onTouchMove:this.scrollResponderHandleTouchMove,
onTouchEnd:this.scrollResponderHandleTouchEnd,
onScrollBeginDrag:this.scrollResponderHandleScrollBeginDrag,
onScrollEndDrag:this.scrollResponderHandleScrollEndDrag,
onMomentumScrollBegin:this.scrollResponderHandleMomentumScrollBegin,
onMomentumScrollEnd:this.scrollResponderHandleMomentumScrollEnd,
onStartShouldSetResponder:this.scrollResponderHandleStartShouldSetResponder,
onStartShouldSetResponderCapture:this.scrollResponderHandleStartShouldSetResponderCapture,
onScrollShouldSetResponder:this.scrollResponderHandleScrollShouldSetResponder,
onResponderGrant:this.scrollResponderHandleResponderGrant,
onResponderRelease:this.scrollResponderHandleResponderRelease,
onResponderReject:this.scrollResponderHandleResponderReject,
onScroll:this.scrollResponderHandleScroll,
style:[{flex:1},this.props.style],
ref:INNERVIEW});


if(this.props.onContentSizeChange){
props.onContentSizeChange=this._handleContentSizeChange;}


var wrappedChildren=React.Children.map(this.props.children,function(child){
if(!child){
return null;}

return (
React.createElement(View,{
collapsable:false,
style:styles.absolute},
child));});




return (
React.createElement(NativeAndroidRecyclerView,props,
wrappedChildren));}});





var styles=StyleSheet.create({
absolute:{
position:'absolute',
top:0,
left:0,
right:0}});



var NativeAndroidRecyclerView=requireNativeComponent(
'AndroidRecyclerViewBackedScrollView',
RecyclerViewBackedScrollView);


module.exports=RecyclerViewBackedScrollView;
});
__d('ListView',function(global, require, module, exports) {  'use strict';



























var ListViewDataSource=require('ListViewDataSource');
var React=require('React');
var RCTScrollViewManager=require('NativeModules').ScrollViewManager;
var ScrollView=require('ScrollView');
var ScrollResponder=require('ScrollResponder');
var StaticRenderer=require('StaticRenderer');
var TimerMixin=require('react-timer-mixin/TimerMixin.js');

var isEmpty=require('isEmpty');
var merge=require('merge');

var PropTypes=React.PropTypes;

var DEFAULT_PAGE_SIZE=1;
var DEFAULT_INITIAL_ROWS=10;
var DEFAULT_SCROLL_RENDER_AHEAD=1000;
var DEFAULT_END_REACHED_THRESHOLD=1000;
var DEFAULT_SCROLL_CALLBACK_THROTTLE=50;
var SCROLLVIEW_REF='listviewscroll';


















































var ListView=React.createClass({displayName:'ListView',
mixins:[ScrollResponder.Mixin,TimerMixin],

statics:{
DataSource:ListViewDataSource},









propTypes:babelHelpers.extends({},
ScrollView.propTypes,{

dataSource:PropTypes.instanceOf(ListViewDataSource).isRequired,








renderSeparator:PropTypes.func,











renderRow:PropTypes.func.isRequired,





initialListSize:PropTypes.number,





onEndReached:PropTypes.func,



onEndReachedThreshold:PropTypes.number,







pageSize:PropTypes.number,








renderFooter:PropTypes.func,
renderHeader:PropTypes.func,









renderSectionHeader:PropTypes.func,






renderScrollComponent:React.PropTypes.func.isRequired,




scrollRenderAheadDistance:React.PropTypes.number,









onChangeVisibleRows:React.PropTypes.func,





removeClippedSubviews:React.PropTypes.bool,








stickyHeaderIndices:PropTypes.arrayOf(PropTypes.number)}),





getMetrics:function(){
return {
contentLength:this.scrollProperties.contentLength,
totalRows:this.props.dataSource.getRowCount(),
renderedRows:this.state.curRenderedRowsCount,
visibleRows:Object.keys(this._visibleRows).length};},








getScrollResponder:function(){
return this.refs[SCROLLVIEW_REF]&&
this.refs[SCROLLVIEW_REF].getScrollResponder&&
this.refs[SCROLLVIEW_REF].getScrollResponder();},


scrollTo:function(){var _refs$SCROLLVIEW_REF;
this.refs[SCROLLVIEW_REF]&&
this.refs[SCROLLVIEW_REF].scrollTo&&
(_refs$SCROLLVIEW_REF=this.refs[SCROLLVIEW_REF]).scrollTo.apply(_refs$SCROLLVIEW_REF,arguments);},


setNativeProps:function(props){
this.refs[SCROLLVIEW_REF]&&
this.refs[SCROLLVIEW_REF].setNativeProps(props);},






getDefaultProps:function(){
return {
initialListSize:DEFAULT_INITIAL_ROWS,
pageSize:DEFAULT_PAGE_SIZE,
renderScrollComponent:function(props){return React.createElement(ScrollView,props);},
scrollRenderAheadDistance:DEFAULT_SCROLL_RENDER_AHEAD,
onEndReachedThreshold:DEFAULT_END_REACHED_THRESHOLD,
stickyHeaderIndices:[]};},



getInitialState:function(){
return {
curRenderedRowsCount:this.props.initialListSize,
highlightedRow:{}};},



getInnerViewNode:function(){
return this.refs[SCROLLVIEW_REF].getInnerViewNode();},


componentWillMount:function(){

this.scrollProperties={
visibleLength:null,
contentLength:null,
offset:0};

this._childFrames=[];
this._visibleRows={};
this._prevRenderedRowsCount=0;
this._sentEndForContentLength=null;},


componentDidMount:function(){var _this=this;


this.requestAnimationFrame(function(){
_this._measureAndUpdateScrollProps();});},



componentWillReceiveProps:function(nextProps){var _this2=this;
if(this.props.dataSource!==nextProps.dataSource||
this.props.initialListSize!==nextProps.initialListSize){
this.setState(function(state,props){
_this2._prevRenderedRowsCount=0;
return {
curRenderedRowsCount:Math.min(
Math.max(
state.curRenderedRowsCount,
props.initialListSize),

props.dataSource.getRowCount())};},


function(){return _this2._renderMoreRowsIfNeeded();});}},



componentDidUpdate:function(){var _this3=this;
this.requestAnimationFrame(function(){
_this3._measureAndUpdateScrollProps();});},



onRowHighlighted:function(sectionID,rowID){
this.setState({highlightedRow:{sectionID:sectionID,rowID:rowID}});},


render:function(){
var bodyComponents=[];

var dataSource=this.props.dataSource;
var allRowIDs=dataSource.rowIdentities;
var rowCount=0;
var sectionHeaderIndices=[];

var header=this.props.renderHeader&&this.props.renderHeader();
var footer=this.props.renderFooter&&this.props.renderFooter();
var totalIndex=header?1:0;

for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var sectionID=dataSource.sectionIdentities[sectionIdx];
var rowIDs=allRowIDs[sectionIdx];
if(rowIDs.length===0){
continue;}


if(this.props.renderSectionHeader){
var shouldUpdateHeader=rowCount>=this._prevRenderedRowsCount&&
dataSource.sectionHeaderShouldUpdate(sectionIdx);
bodyComponents.push(
React.createElement(StaticRenderer,{
key:'s_'+sectionID,
shouldUpdate:!!shouldUpdateHeader,
render:this.props.renderSectionHeader.bind(
null,
dataSource.getSectionHeaderData(sectionIdx),
sectionID)}));



sectionHeaderIndices.push(totalIndex++);}


for(var rowIdx=0;rowIdx<rowIDs.length;rowIdx++){
var rowID=rowIDs[rowIdx];
var comboID=sectionID+'_'+rowID;
var shouldUpdateRow=rowCount>=this._prevRenderedRowsCount&&
dataSource.rowShouldUpdate(sectionIdx,rowIdx);
var row=
React.createElement(StaticRenderer,{
key:'r_'+comboID,
shouldUpdate:!!shouldUpdateRow,
render:this.props.renderRow.bind(
null,
dataSource.getRowData(sectionIdx,rowIdx),
sectionID,
rowID,
this.onRowHighlighted)});


bodyComponents.push(row);
totalIndex++;

if(this.props.renderSeparator&&(
rowIdx!==rowIDs.length-1||sectionIdx===allRowIDs.length-1)){
var adjacentRowHighlighted=
this.state.highlightedRow.sectionID===sectionID&&(
this.state.highlightedRow.rowID===rowID||
this.state.highlightedRow.rowID===rowIDs[rowIdx+1]);

var separator=this.props.renderSeparator(
sectionID,
rowID,
adjacentRowHighlighted);

if(separator){
bodyComponents.push(separator);
totalIndex++;}}


if(++rowCount===this.state.curRenderedRowsCount){
break;}}


if(rowCount>=this.state.curRenderedRowsCount){
break;}}var _props=






this.props;var renderScrollComponent=_props.renderScrollComponent;var props=babelHelpers.objectWithoutProperties(_props,['renderScrollComponent']);
if(!props.scrollEventThrottle){
props.scrollEventThrottle=DEFAULT_SCROLL_CALLBACK_THROTTLE;}

if(props.removeClippedSubviews===undefined){
props.removeClippedSubviews=true;}

babelHelpers.extends(props,{
onScroll:this._onScroll,
stickyHeaderIndices:this.props.stickyHeaderIndices.concat(sectionHeaderIndices),



onKeyboardWillShow:undefined,
onKeyboardWillHide:undefined,
onKeyboardDidShow:undefined,
onKeyboardDidHide:undefined});




return React.cloneElement(renderScrollComponent(props),{
ref:SCROLLVIEW_REF,
onContentSizeChange:this._onContentSizeChange,
onLayout:this._onLayout},
header,bodyComponents,footer);},






_measureAndUpdateScrollProps:function(){
var scrollComponent=this.getScrollResponder();
if(!scrollComponent||!scrollComponent.getInnerViewNode){
return;}




RCTScrollViewManager&&RCTScrollViewManager.calculateChildFrames&&
RCTScrollViewManager.calculateChildFrames(
React.findNodeHandle(scrollComponent),
this._updateVisibleRows);},



_onContentSizeChange:function(width,height){
var contentLength=!this.props.horizontal?height:width;
if(contentLength!==this.scrollProperties.contentLength){
this.scrollProperties.contentLength=contentLength;
this._updateVisibleRows();
this._renderMoreRowsIfNeeded();}

this.props.onContentSizeChange&&this.props.onContentSizeChange(width,height);},


_onLayout:function(event){var _event$nativeEvent$la=
event.nativeEvent.layout;var width=_event$nativeEvent$la.width;var height=_event$nativeEvent$la.height;
var visibleLength=!this.props.horizontal?height:width;
if(visibleLength!==this.scrollProperties.visibleLength){
this.scrollProperties.visibleLength=visibleLength;
this._updateVisibleRows();
this._renderMoreRowsIfNeeded();}

this.props.onLayout&&this.props.onLayout(event);},


_maybeCallOnEndReached:function(event){
if(this.props.onEndReached&&
this.scrollProperties.contentLength!==this._sentEndForContentLength&&
this._getDistanceFromEnd(this.scrollProperties)<this.props.onEndReachedThreshold&&
this.state.curRenderedRowsCount===this.props.dataSource.getRowCount()){
this._sentEndForContentLength=this.scrollProperties.contentLength;
this.props.onEndReached(event);
return true;}

return false;},


_renderMoreRowsIfNeeded:function(){
if(this.scrollProperties.contentLength===null||
this.scrollProperties.visibleLength===null||
this.state.curRenderedRowsCount===this.props.dataSource.getRowCount()){
this._maybeCallOnEndReached();
return;}


var distanceFromEnd=this._getDistanceFromEnd(this.scrollProperties);
if(distanceFromEnd<this.props.scrollRenderAheadDistance){
this._pageInNewRows();}},



_pageInNewRows:function(){var _this4=this;
this.setState(function(state,props){
var rowsToRender=Math.min(
state.curRenderedRowsCount+props.pageSize,
props.dataSource.getRowCount());

_this4._prevRenderedRowsCount=state.curRenderedRowsCount;
return {
curRenderedRowsCount:rowsToRender};},

function(){
_this4._measureAndUpdateScrollProps();
_this4._prevRenderedRowsCount=_this4.state.curRenderedRowsCount;});},



_getDistanceFromEnd:function(scrollProperties){
return scrollProperties.contentLength-scrollProperties.visibleLength-scrollProperties.offset;},


_updateVisibleRows:function(updatedFrames){var _this5=this;
if(!this.props.onChangeVisibleRows){
return;}

if(updatedFrames){
updatedFrames.forEach(function(newFrame){
_this5._childFrames[newFrame.index]=merge(newFrame);});}


var isVertical=!this.props.horizontal;
var dataSource=this.props.dataSource;
var visibleMin=this.scrollProperties.offset;
var visibleMax=visibleMin+this.scrollProperties.visibleLength;
var allRowIDs=dataSource.rowIdentities;

var header=this.props.renderHeader&&this.props.renderHeader();
var totalIndex=header?1:0;
var visibilityChanged=false;
var changedRows={};
for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var rowIDs=allRowIDs[sectionIdx];
if(rowIDs.length===0){
continue;}

var sectionID=dataSource.sectionIdentities[sectionIdx];
if(this.props.renderSectionHeader){
totalIndex++;}

var visibleSection=this._visibleRows[sectionID];
if(!visibleSection){
visibleSection={};}

for(var rowIdx=0;rowIdx<rowIDs.length;rowIdx++){
var rowID=rowIDs[rowIdx];
var frame=this._childFrames[totalIndex];
totalIndex++;
if(!frame){
break;}

var rowVisible=visibleSection[rowID];
var min=isVertical?frame.y:frame.x;
var max=min+(isVertical?frame.height:frame.width);
if(min>visibleMax||max<visibleMin){
if(rowVisible){
visibilityChanged=true;
delete visibleSection[rowID];
if(!changedRows[sectionID]){
changedRows[sectionID]={};}

changedRows[sectionID][rowID]=false;}}else 

if(!rowVisible){
visibilityChanged=true;
visibleSection[rowID]=true;
if(!changedRows[sectionID]){
changedRows[sectionID]={};}

changedRows[sectionID][rowID]=true;}}


if(!isEmpty(visibleSection)){
this._visibleRows[sectionID]=visibleSection;}else 
if(this._visibleRows[sectionID]){
delete this._visibleRows[sectionID];}}


visibilityChanged&&this.props.onChangeVisibleRows(this._visibleRows,changedRows);},


_onScroll:function(e){
var isVertical=!this.props.horizontal;
this.scrollProperties.visibleLength=e.nativeEvent.layoutMeasurement[
isVertical?'height':'width'];

this.scrollProperties.contentLength=e.nativeEvent.contentSize[
isVertical?'height':'width'];

this.scrollProperties.offset=e.nativeEvent.contentOffset[
isVertical?'y':'x'];

this._updateVisibleRows(e.nativeEvent.updatedChildFrames);
if(!this._maybeCallOnEndReached(e)){
this._renderMoreRowsIfNeeded();}


if(this.props.onEndReached&&
this._getDistanceFromEnd(this.scrollProperties)>this.props.onEndReachedThreshold){

this._sentEndForContentLength=null;}


this.props.onScroll&&this.props.onScroll(e);}});



module.exports=ListView;
});
__d('ListViewDataSource',function(global, require, module, exports) {  'use strict';





























var invariant=require('fbjs/lib/invariant.js');
var isEmpty=require('isEmpty');
var warning=require('fbjs/lib/warning.js');

function defaultGetRowData(
dataBlob,
sectionID,
rowID)
{
return dataBlob[sectionID][rowID];}


function defaultGetSectionHeaderData(
dataBlob,
sectionID)
{
return dataBlob[sectionID];}var 













































ListViewDataSource=function(){


























function ListViewDataSource(params){babelHelpers.classCallCheck(this,ListViewDataSource);
invariant(
params&&typeof params.rowHasChanged==='function',
'Must provide a rowHasChanged function.');

this._rowHasChanged=params.rowHasChanged;
this._getRowData=params.getRowData||defaultGetRowData;
this._sectionHeaderHasChanged=params.sectionHeaderHasChanged;
this._getSectionHeaderData=
params.getSectionHeaderData||defaultGetSectionHeaderData;

this._dataBlob=null;
this._dirtyRows=[];
this._dirtySections=[];
this._cachedRowCount=0;



this.rowIdentities=[];
this.sectionIdentities=[];}babelHelpers.createClass(ListViewDataSource,[{key:'cloneWithRows',value:function cloneWithRows(



















dataBlob,
rowIdentities)
{
var rowIds=rowIdentities?[rowIdentities]:null;
if(!this._sectionHeaderHasChanged){
this._sectionHeaderHasChanged=function(){return false;};}

return this.cloneWithRowsAndSections({s1:dataBlob},['s1'],rowIds);}},{key:'cloneWithRowsAndSections',value:function cloneWithRowsAndSections(














dataBlob,
sectionIdentities,
rowIdentities)
{
invariant(
typeof this._sectionHeaderHasChanged==='function',
'Must provide a sectionHeaderHasChanged function with section data.');

var newSource=new ListViewDataSource({
getRowData:this._getRowData,
getSectionHeaderData:this._getSectionHeaderData,
rowHasChanged:this._rowHasChanged,
sectionHeaderHasChanged:this._sectionHeaderHasChanged});

newSource._dataBlob=dataBlob;
if(sectionIdentities){
newSource.sectionIdentities=sectionIdentities;}else 
{
newSource.sectionIdentities=Object.keys(dataBlob);}

if(rowIdentities){
newSource.rowIdentities=rowIdentities;}else 
{
newSource.rowIdentities=[];
newSource.sectionIdentities.forEach(function(sectionID){
newSource.rowIdentities.push(Object.keys(dataBlob[sectionID]));});}


newSource._cachedRowCount=countRows(newSource.rowIdentities);

newSource._calculateDirtyArrays(
this._dataBlob,
this.sectionIdentities,
this.rowIdentities);


return newSource;}},{key:'getRowCount',value:function getRowCount()


{
return this._cachedRowCount;}},{key:'rowShouldUpdate',value:function rowShouldUpdate(





sectionIndex,rowIndex){
var needsUpdate=this._dirtyRows[sectionIndex][rowIndex];
warning(needsUpdate!==undefined,
'missing dirtyBit for section, row: '+sectionIndex+', '+rowIndex);
return needsUpdate;}},{key:'getRowData',value:function getRowData(





sectionIndex,rowIndex){
var sectionID=this.sectionIdentities[sectionIndex];
var rowID=this.rowIdentities[sectionIndex][rowIndex];
warning(
sectionID!==undefined&&rowID!==undefined,
'rendering invalid section, row: '+sectionIndex+', '+rowIndex);

return this._getRowData(this._dataBlob,sectionID,rowID);}},{key:'getRowIDForFlatIndex',value:function getRowIDForFlatIndex(






index){
var accessIndex=index;
for(var ii=0;ii<this.sectionIdentities.length;ii++){
if(accessIndex>=this.rowIdentities[ii].length){
accessIndex-=this.rowIdentities[ii].length;}else 
{
return this.rowIdentities[ii][accessIndex];}}


return null;}},{key:'getSectionIDForFlatIndex',value:function getSectionIDForFlatIndex(






index){
var accessIndex=index;
for(var ii=0;ii<this.sectionIdentities.length;ii++){
if(accessIndex>=this.rowIdentities[ii].length){
accessIndex-=this.rowIdentities[ii].length;}else 
{
return this.sectionIdentities[ii];}}


return null;}},{key:'getSectionLengths',value:function getSectionLengths()





{
var results=[];
for(var ii=0;ii<this.sectionIdentities.length;ii++){
results.push(this.rowIdentities[ii].length);}

return results;}},{key:'sectionHeaderShouldUpdate',value:function sectionHeaderShouldUpdate(





sectionIndex){
var needsUpdate=this._dirtySections[sectionIndex];
warning(needsUpdate!==undefined,
'missing dirtyBit for section: '+sectionIndex);
return needsUpdate;}},{key:'getSectionHeaderData',value:function getSectionHeaderData(





sectionIndex){
if(!this._getSectionHeaderData){
return null;}

var sectionID=this.sectionIdentities[sectionIndex];
warning(sectionID!==undefined,
'renderSection called on invalid section: '+sectionIndex);
return this._getSectionHeaderData(this._dataBlob,sectionID);}},{key:'_calculateDirtyArrays',value:function _calculateDirtyArrays(






















prevDataBlob,
prevSectionIDs,
prevRowIDs)
{

var prevSectionsHash=keyedDictionaryFromArray(prevSectionIDs);
var prevRowsHash={};
for(var ii=0;ii<prevRowIDs.length;ii++){
var sectionID=prevSectionIDs[ii];
warning(
!prevRowsHash[sectionID],
'SectionID appears more than once: '+sectionID);

prevRowsHash[sectionID]=keyedDictionaryFromArray(prevRowIDs[ii]);}



this._dirtySections=[];
this._dirtyRows=[];

var dirty;
for(var sIndex=0;sIndex<this.sectionIdentities.length;sIndex++){
var sectionID=this.sectionIdentities[sIndex];

dirty=!prevSectionsHash[sectionID];
var sectionHeaderHasChanged=this._sectionHeaderHasChanged;
if(!dirty&&sectionHeaderHasChanged){
dirty=sectionHeaderHasChanged(
this._getSectionHeaderData(prevDataBlob,sectionID),
this._getSectionHeaderData(this._dataBlob,sectionID));}


this._dirtySections.push(!!dirty);

this._dirtyRows[sIndex]=[];
for(var rIndex=0;rIndex<this.rowIdentities[sIndex].length;rIndex++){
var rowID=this.rowIdentities[sIndex][rIndex];

dirty=
!prevSectionsHash[sectionID]||
!prevRowsHash[sectionID][rowID]||
this._rowHasChanged(
this._getRowData(prevDataBlob,sectionID,rowID),
this._getRowData(this._dataBlob,sectionID,rowID));

this._dirtyRows[sIndex].push(!!dirty);}}}}]);return ListViewDataSource;}();





function countRows(allRowIDs){
var totalRows=0;
for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var rowIDs=allRowIDs[sectionIdx];
totalRows+=rowIDs.length;}

return totalRows;}


function keyedDictionaryFromArray(arr){
if(isEmpty(arr)){
return {};}

var result={};
for(var ii=0;ii<arr.length;ii++){
var key=arr[ii];
warning(!result[key],'Value appears more than once in array: '+key);
result[key]=true;}

return result;}



module.exports=ListViewDataSource;
});
__d('AppStateIOS',function(global, require, module, exports) {  'use strict';












var warning=require('fbjs/lib/warning.js');var 

AppStateIOS=function(){function AppStateIOS(){babelHelpers.classCallCheck(this,AppStateIOS);}babelHelpers.createClass(AppStateIOS,null,[{key:'addEventListener',value:function addEventListener(

type,handler){
warning(false,'Cannot listen to AppStateIOS events on Android.');}},{key:'removeEventListener',value:function removeEventListener(


type,handler){
warning(false,'Cannot remove AppStateIOS listener on Android.');}}]);return AppStateIOS;}();




AppStateIOS.currentState=null;

module.exports=AppStateIOS;
});
__d('ReactNativeTagHandles',function(global, require, module, exports) {  'use strict';












var invariant=require('fbjs/lib/invariant.js');
var warning=require('fbjs/lib/warning.js');














var INITIAL_TAG_COUNT=1;
var NATIVE_TOP_ROOT_ID_SEPARATOR='{TOP_LEVEL}';
var ReactNativeTagHandles={
tagsStartAt:INITIAL_TAG_COUNT,
tagCount:INITIAL_TAG_COUNT,

allocateTag:function(){

while(this.reactTagIsNativeTopRootID(ReactNativeTagHandles.tagCount)){
ReactNativeTagHandles.tagCount++;}

var tag=ReactNativeTagHandles.tagCount;
ReactNativeTagHandles.tagCount++;
return tag;},











associateRootNodeIDWithMountedNodeHandle:function(
rootNodeID,
tag)
{
warning(rootNodeID&&tag,'Root node or tag is null when associating');
if(rootNodeID&&tag){
ReactNativeTagHandles.tagToRootNodeID[tag]=rootNodeID;
ReactNativeTagHandles.rootNodeIDToTag[rootNodeID]=tag;}},



allocateRootNodeIDForTag:function(tag){
invariant(
this.reactTagIsNativeTopRootID(tag),
'Expect a native root tag, instead got ',tag);

return '.r['+tag+']'+NATIVE_TOP_ROOT_ID_SEPARATOR;},


reactTagIsNativeTopRootID:function(reactTag){

return reactTag%10===1;},


getNativeTopRootIDFromNodeID:function(nodeID){
if(!nodeID){
return null;}

var index=nodeID.indexOf(NATIVE_TOP_ROOT_ID_SEPARATOR);
if(index===-1){
return null;}

return nodeID.substr(0,index+NATIVE_TOP_ROOT_ID_SEPARATOR.length);},














mostRecentMountedNodeHandleForRootNodeID:function(
rootNodeID)
{
return ReactNativeTagHandles.rootNodeIDToTag[rootNodeID];},


tagToRootNodeID:[],

rootNodeIDToTag:{}};


module.exports=ReactNativeTagHandles;
});
__d('VibrationIOS',function(global, require, module, exports) {  'use strict';













var warning=require('fbjs/lib/warning.js');

var VibrationIOS={
vibrate:function(){
warning('VibrationIOS is not supported on this platform!');}};



module.exports=VibrationIOS;
});
__d('MapView',function(global, require, module, exports) {  'use strict';












var ColorPropType=require('ColorPropType');
var EdgeInsetsPropType=require('EdgeInsetsPropType');
var Image=require('Image');
var NativeMethodsMixin=require('NativeMethodsMixin');
var Platform=require('Platform');
var RCTMapConfig=require('UIManager').RCTMap;
var RCTMapConstants=RCTMapConfig&&RCTMapConfig.Constants;
var React=require('React');
var StyleSheet=require('StyleSheet');
var View=require('View');

var deprecatedPropType=require('deprecatedPropType');
var processColor=require('processColor');
var resolveAssetSource=require('resolveAssetSource');
var requireNativeComponent=require('requireNativeComponent');











var MapView=React.createClass({displayName:'MapView',

mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{




style:View.propTypes.style,








showsUserLocation:React.PropTypes.bool,







followUserLocation:React.PropTypes.bool,






showsPointsOfInterest:React.PropTypes.bool,






showsCompass:React.PropTypes.bool,





zoomEnabled:React.PropTypes.bool,








rotateEnabled:React.PropTypes.bool,








pitchEnabled:React.PropTypes.bool,





scrollEnabled:React.PropTypes.bool,










mapType:React.PropTypes.oneOf([
'standard',
'satellite',
'hybrid']),








region:React.PropTypes.shape({



latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired,





latitudeDelta:React.PropTypes.number,
longitudeDelta:React.PropTypes.number}),






annotations:React.PropTypes.arrayOf(React.PropTypes.shape({



latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired,




animateDrop:React.PropTypes.bool,




draggable:React.PropTypes.bool,




onDragStateChange:React.PropTypes.func,





onFocus:React.PropTypes.func,





onBlur:React.PropTypes.func,




title:React.PropTypes.string,
subtitle:React.PropTypes.string,




leftCalloutView:React.PropTypes.element,
rightCalloutView:React.PropTypes.element,
detailCalloutView:React.PropTypes.element,










tintColor:ColorPropType,




image:Image.propTypes.source,




view:React.PropTypes.element,




id:React.PropTypes.string,




hasLeftCallout:deprecatedPropType(
React.PropTypes.bool,
'Use `leftCalloutView` instead.'),

hasRightCallout:deprecatedPropType(
React.PropTypes.bool,
'Use `rightCalloutView` instead.'),

onLeftCalloutPress:deprecatedPropType(
React.PropTypes.func,
'Use `leftCalloutView` instead.'),

onRightCalloutPress:deprecatedPropType(
React.PropTypes.func,
'Use `rightCalloutView` instead.')})),







overlays:React.PropTypes.arrayOf(React.PropTypes.shape({



coordinates:React.PropTypes.arrayOf(React.PropTypes.shape({
latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired})),





lineWidth:React.PropTypes.number,
strokeColor:ColorPropType,
fillColor:ColorPropType,




id:React.PropTypes.string})),






maxDelta:React.PropTypes.number,





minDelta:React.PropTypes.number,






legalLabelInsets:EdgeInsetsPropType,




onRegionChange:React.PropTypes.func,




onRegionChangeComplete:React.PropTypes.func,




onAnnotationPress:React.PropTypes.func,




active:React.PropTypes.bool}),


render:function(){var _this=this;
var children=[];var _props=this.props;var annotations=_props.annotations;var overlays=_props.overlays;var followUserLocation=_props.followUserLocation;
annotations=annotations&&annotations.map(function(annotation){var 

id=






annotation.id;var image=annotation.image;var tintColor=annotation.tintColor;var view=annotation.view;var leftCalloutView=annotation.leftCalloutView;var rightCalloutView=annotation.rightCalloutView;var detailCalloutView=annotation.detailCalloutView;

if(!view&&image&&tintColor){
view=React.createElement(Image,{
style:{
tintColor:processColor(tintColor)},

source:image});

image=undefined;}

if(view){
if(image){
console.warn('`image` and `view` both set on annotation. Image will be ignored.');}

var viewIndex=children.length;
children.push(React.cloneElement(view,{
style:[styles.annotationView,view.props.style||{}]}));}


if(leftCalloutView){
var leftCalloutViewIndex=children.length;
children.push(React.cloneElement(leftCalloutView,{
style:[styles.calloutView,leftCalloutView.props.style||{}]}));}


if(rightCalloutView){
var rightCalloutViewIndex=children.length;
children.push(React.cloneElement(rightCalloutView,{
style:[styles.calloutView,rightCalloutView.props.style||{}]}));}


if(detailCalloutView){
var detailCalloutViewIndex=children.length;
children.push(React.cloneElement(detailCalloutView,{
style:[styles.calloutView,detailCalloutView.props.style||{}]}));}



var result=babelHelpers.extends({},
annotation,{
tintColor:tintColor&&processColor(tintColor),
image:image,
viewIndex:viewIndex,
leftCalloutViewIndex:leftCalloutViewIndex,
rightCalloutViewIndex:rightCalloutViewIndex,
detailCalloutViewIndex:detailCalloutViewIndex,
view:undefined,
leftCalloutView:undefined,
rightCalloutView:undefined,
detailCalloutView:undefined});

result.id=id||encodeURIComponent(JSON.stringify(result));
result.image=image&&resolveAssetSource(image);
return result;});

overlays=overlays&&overlays.map(function(overlay){var 
id=overlay.id;var fillColor=overlay.fillColor;var strokeColor=overlay.strokeColor;
var result=babelHelpers.extends({},
overlay,{
strokeColor:strokeColor&&processColor(strokeColor),
fillColor:fillColor&&processColor(fillColor)});

result.id=id||encodeURIComponent(JSON.stringify(result));
return result;});


var findByAnnotationId=function(annotationId){
if(!annotations){
return null;}

for(var i=0,l=annotations.length;i<l;i++){
if(annotations[i].id===annotationId){
return annotations[i];}}


return null;};



var onPress=void 0,onAnnotationDragStateChange=void 0,onAnnotationFocus=void 0,onAnnotationBlur=void 0;
if(annotations){
onPress=function(event){
if(event.nativeEvent.action==='annotation-click'){

_this.props.onAnnotationPress&&
_this.props.onAnnotationPress(event.nativeEvent.annotation);}else 
if(event.nativeEvent.action==='callout-click'){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation){

if(event.nativeEvent.side==='left'&&annotation.onLeftCalloutPress){
annotation.onLeftCalloutPress(event.nativeEvent);}else 
if(event.nativeEvent.side==='right'&&annotation.onRightCalloutPress){
annotation.onRightCalloutPress(event.nativeEvent);}}}};




onAnnotationDragStateChange=function(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation){

annotation.latitude=event.nativeEvent.latitude;
annotation.longitude=event.nativeEvent.longitude;

annotation.onDragStateChange&&
annotation.onDragStateChange(event.nativeEvent);}};


onAnnotationFocus=function(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation&&annotation.onFocus){
annotation.onFocus(event.nativeEvent);}};


onAnnotationBlur=function(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation&&annotation.onBlur){
annotation.onBlur(event.nativeEvent);}};}





if(this.props.onRegionChange||this.props.onRegionChangeComplete){
var onChange=function(event){
if(event.nativeEvent.continuous){
_this.props.onRegionChange&&
_this.props.onRegionChange(event.nativeEvent.region);}else 
{
_this.props.onRegionChangeComplete&&
_this.props.onRegionChangeComplete(event.nativeEvent.region);}};}





if(followUserLocation===undefined){
followUserLocation=this.props.showUserLocation;}


return (
React.createElement(RCTMap,babelHelpers.extends({},
this.props,{
annotations:annotations,
children:children,
followUserLocation:followUserLocation,
overlays:overlays,
onPress:onPress,
onChange:onChange,
onAnnotationDragStateChange:onAnnotationDragStateChange,
onAnnotationFocus:onAnnotationFocus,
onAnnotationBlur:onAnnotationBlur})));}});





var styles=StyleSheet.create({
annotationView:{
position:'absolute',
backgroundColor:'transparent'},

calloutView:{
position:'absolute',
backgroundColor:'white'}});










var PinColors=RCTMapConstants&&RCTMapConstants.PinColors;
MapView.PinColors=PinColors&&{
RED:PinColors.RED,
GREEN:PinColors.GREEN,
PURPLE:PinColors.PURPLE};


var RCTMap=requireNativeComponent('RCTMap',MapView,{
nativeOnly:{
onAnnotationDragStateChange:true,
onAnnotationFocus:true,
onAnnotationBlur:true,
onChange:true,
onPress:true}});



module.exports=MapView;
});
__d('TransformPropTypes',function(global, require, module, exports) {  'use strict';












var ReactPropTypes=require('ReactPropTypes');
var deprecatedPropType=require('deprecatedPropType');

var ArrayOfNumberPropType=ReactPropTypes.arrayOf(ReactPropTypes.number);

var TransformMatrixPropType=function(
props,
propName,
componentName)
{
if(props.transform&&props.transformMatrix){
return new Error(
'transformMatrix and transform styles cannot be used on the same '+
'component');}


return ArrayOfNumberPropType(props,propName,componentName);};


var TransformPropTypes={
transform:ReactPropTypes.arrayOf(
ReactPropTypes.oneOfType([
ReactPropTypes.shape({perspective:ReactPropTypes.number}),
ReactPropTypes.shape({rotate:ReactPropTypes.string}),
ReactPropTypes.shape({rotateX:ReactPropTypes.string}),
ReactPropTypes.shape({rotateY:ReactPropTypes.string}),
ReactPropTypes.shape({rotateZ:ReactPropTypes.string}),
ReactPropTypes.shape({scale:ReactPropTypes.number}),
ReactPropTypes.shape({scaleX:ReactPropTypes.number}),
ReactPropTypes.shape({scaleY:ReactPropTypes.number}),
ReactPropTypes.shape({translateX:ReactPropTypes.number}),
ReactPropTypes.shape({translateY:ReactPropTypes.number}),
ReactPropTypes.shape({skewX:ReactPropTypes.string}),
ReactPropTypes.shape({skewY:ReactPropTypes.string})])),


transformMatrix:TransformMatrixPropType,


scaleX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
scaleY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
rotation:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.')};


module.exports=TransformPropTypes;
});
__d('WebView',function(global, require, module, exports) {  'use strict';











var EdgeInsetsPropType=require('EdgeInsetsPropType');
var React=require('React');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');
var StyleSheet=require('StyleSheet');
var UIManager=require('UIManager');
var View=require('View');

var deprecatedPropType=require('deprecatedPropType');
var keyMirror=require('fbjs/lib/keyMirror.js');
var merge=require('merge');
var requireNativeComponent=require('requireNativeComponent');
var resolveAssetSource=require('resolveAssetSource');

var PropTypes=React.PropTypes;

var RCT_WEBVIEW_REF='webview';

var WebViewState=keyMirror({
IDLE:null,
LOADING:null,
ERROR:null});





var WebView=React.createClass({displayName:'WebView',

propTypes:babelHelpers.extends({},
View.propTypes,{
renderError:PropTypes.func,
renderLoading:PropTypes.func,
onLoad:PropTypes.func,
onLoadEnd:PropTypes.func,
onLoadStart:PropTypes.func,
onError:PropTypes.func,
automaticallyAdjustContentInsets:PropTypes.bool,
contentInset:EdgeInsetsPropType,
onNavigationStateChange:PropTypes.func,
startInLoadingState:PropTypes.bool,
style:View.propTypes.style,

html:deprecatedPropType(
PropTypes.string,
'Use the `source` prop instead.'),


url:deprecatedPropType(
PropTypes.string,
'Use the `source` prop instead.'),





source:PropTypes.oneOfType([
PropTypes.shape({



uri:PropTypes.string,




method:PropTypes.oneOf(['GET','POST']),




headers:PropTypes.object,






body:PropTypes.string}),

PropTypes.shape({



html:PropTypes.string,



baseUrl:PropTypes.string}),




PropTypes.number]),






javaScriptEnabled:PropTypes.bool,





domStorageEnabled:PropTypes.bool,




injectedJavaScript:PropTypes.string,




scalesPageToFit:PropTypes.bool,





userAgent:PropTypes.string,




testID:PropTypes.string}),


getInitialState:function(){
return {
viewState:WebViewState.IDLE,
lastErrorEvent:null,
startInLoadingState:true};},



getDefaultProps:function(){
return {
javaScriptEnabled:true,
scalesPageToFit:true};},



componentWillMount:function(){
if(this.props.startInLoadingState){
this.setState({viewState:WebViewState.LOADING});}},



render:function(){
var otherView=null;

if(this.state.viewState===WebViewState.LOADING){
otherView=this.props.renderLoading&&this.props.renderLoading();}else 
if(this.state.viewState===WebViewState.ERROR){
var errorEvent=this.state.lastErrorEvent;
otherView=this.props.renderError&&this.props.renderError(
errorEvent.domain,
errorEvent.code,
errorEvent.description);}else 
if(this.state.viewState!==WebViewState.IDLE){
console.error('RCTWebView invalid state encountered: '+this.state.loading);}


var webViewStyles=[styles.container,this.props.style];
if(this.state.viewState===WebViewState.LOADING||
this.state.viewState===WebViewState.ERROR){

webViewStyles.push(styles.hidden);}


var source=this.props.source||{};
if(this.props.html){
source.html=this.props.html;}else 
if(this.props.url){
source.uri=this.props.url;}


if(source.method==='POST'&&source.headers){
console.warn('WebView: `source.headers` is not supported when using POST.');}else 
if(source.method==='GET'&&source.body){
console.warn('WebView: `source.body` is not supported when using GET.');}


var webView=
React.createElement(RCTWebView,{
ref:RCT_WEBVIEW_REF,
key:'webViewKey',
style:webViewStyles,
source:resolveAssetSource(source),
scalesPageToFit:this.props.scalesPageToFit,
injectedJavaScript:this.props.injectedJavaScript,
userAgent:this.props.userAgent,
javaScriptEnabled:this.props.javaScriptEnabled,
domStorageEnabled:this.props.domStorageEnabled,
contentInset:this.props.contentInset,
automaticallyAdjustContentInsets:this.props.automaticallyAdjustContentInsets,
onLoadingStart:this.onLoadingStart,
onLoadingFinish:this.onLoadingFinish,
onLoadingError:this.onLoadingError,
testID:this.props.testID});


return (
React.createElement(View,{style:styles.container},
webView,
otherView));},




goForward:function(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.goForward,
null);},



goBack:function(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.goBack,
null);},



reload:function(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.reload,
null);},







updateNavigationState:function(event){
if(this.props.onNavigationStateChange){
this.props.onNavigationStateChange(event.nativeEvent);}},



getWebViewHandle:function(){
return React.findNodeHandle(this.refs[RCT_WEBVIEW_REF]);},


onLoadingStart:function(event){
var onLoadStart=this.props.onLoadStart;
onLoadStart&&onLoadStart(event);
this.updateNavigationState(event);},


onLoadingError:function(event){
event.persist();var _props=
this.props;var onError=_props.onError;var onLoadEnd=_props.onLoadEnd;
onError&&onError(event);
onLoadEnd&&onLoadEnd(event);
console.error('Encountered an error loading page',event.nativeEvent);

this.setState({
lastErrorEvent:event.nativeEvent,
viewState:WebViewState.ERROR});},



onLoadingFinish:function(event){var _props2=
this.props;var onLoad=_props2.onLoad;var onLoadEnd=_props2.onLoadEnd;
onLoad&&onLoad(event);
onLoadEnd&&onLoadEnd(event);
this.setState({
viewState:WebViewState.IDLE});

this.updateNavigationState(event);}});



var RCTWebView=requireNativeComponent('RCTWebView',WebView);

var styles=StyleSheet.create({
container:{
flex:1},

hidden:{
height:0,
flex:0}});



module.exports=WebView;
});
__d('resolveAssetSource',function(global, require, module, exports) {  'use strict';






















var AssetRegistry=require('AssetRegistry');
var PixelRatio=require('PixelRatio');
var Platform=require('Platform');
var SourceCode=require('NativeModules').SourceCode;
var assetPathUtils=require('react-native/local-cli/bundle/assetPathUtils.js');

var _serverURL,_offlinePath;

function getDevServerURL(){
if(_serverURL===undefined){
var scriptURL=SourceCode.scriptURL;
var match=scriptURL&&scriptURL.match(/^https?:\/\/.*?\//);
if(match){

_serverURL=match[0];}else 
{

_serverURL=null;}}



return _serverURL;}


function getOfflinePath(){
if(_offlinePath===undefined){
var scriptURL=SourceCode.scriptURL;
if(!scriptURL){

_offlinePath='';
return _offlinePath;}

if(scriptURL.startsWith('assets://')){

_offlinePath='';
return _offlinePath;}

if(scriptURL.startsWith('file://')){

_offlinePath=scriptURL.substring(7,scriptURL.lastIndexOf('/')+1);}else 
{
_offlinePath=scriptURL.substring(0,scriptURL.lastIndexOf('/')+1);}}



return _offlinePath;}





function getPathInArchive(asset){
var offlinePath=getOfflinePath();
if(Platform.OS==='android'){
if(offlinePath){

return 'file://'+offlinePath+getAssetPathInDrawableFolder(asset);}



return assetPathUtils.getAndroidResourceIdentifier(asset);}else 
{

return offlinePath+getScaledAssetPath(asset);}}







function getPathOnDevserver(devServerUrl,asset){
return devServerUrl+getScaledAssetPath(asset)+'?platform='+Platform.OS+
'&hash='+asset.hash;}





function getScaledAssetPath(asset){
var scale=pickScale(asset.scales,PixelRatio.get());
var scaleSuffix=scale===1?'':'@'+scale+'x';
var assetDir=assetPathUtils.getBasePath(asset);
return assetDir+'/'+asset.name+scaleSuffix+'.'+asset.type;}





function getAssetPathInDrawableFolder(asset){
var scale=pickScale(asset.scales,PixelRatio.get());
var drawbleFolder=assetPathUtils.getAndroidDrawableFolderName(asset,scale);


function pickScale(scales,deviceScale){


