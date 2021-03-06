// Generated by Haxe 3.4.2
if (process.version < "v4.0.0") console.warn("Module " + (typeof(module) == "undefined" ? "" : module.filename) + " requires node.js version 4.0.0 or higher");
(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw new js__$Boot_HaxeError("EReg::matched");
		}
	}
	,__class__: EReg
};
var HaxeLowDisk = function() { };
$hxClasses["HaxeLowDisk"] = HaxeLowDisk;
HaxeLowDisk.__name__ = ["HaxeLowDisk"];
HaxeLowDisk.prototype = {
	readFileSync: null
	,writeFile: null
	,__class__: HaxeLowDisk
};
var NodeJsDisk = function() {
	this.steno = require("steno");
	try {
		this.fs = require("graceful-fs");
	} catch( e ) {
		this.fs = require("steno/node_modules/graceful-fs");
	}
	if(this.steno == null) {
		throw new js__$Boot_HaxeError("Node.js error: package 'steno' not found. Please install with 'npm install --save steno'");
	}
};
$hxClasses["NodeJsDisk"] = NodeJsDisk;
NodeJsDisk.__name__ = ["NodeJsDisk"];
NodeJsDisk.__interfaces__ = [HaxeLowDisk];
NodeJsDisk.prototype = {
	steno: null
	,fs: null
	,readFileSync: function(file) {
		if(this.fs.existsSync(file)) {
			return this.fs.readFileSync(file,{ encoding : "utf8"});
		} else {
			return null;
		}
	}
	,writeFile: function(file,data) {
		this.steno.writeFile(file,data,function(err) {
			if(err) {
				throw new js__$Boot_HaxeError(err);
			}
		});
	}
	,__class__: NodeJsDisk
};
var HaxeLow = function(file,disk) {
	this.file = file;
	this.disk = disk;
	this.db = { };
	if(disk == null && file != null) {
		this.disk = new NodeJsDisk();
	}
	if(this.file != null) {
		if(this.disk == null) {
			throw new js__$Boot_HaxeError("HaxeLow: no disk storage set.");
		}
		this.checksum = this.disk.readFileSync(this.file);
		if(this.checksum != null) {
			this.restore(this.checksum);
		}
	}
};
$hxClasses["HaxeLow"] = HaxeLow;
HaxeLow.__name__ = ["HaxeLow"];
HaxeLow.prototype = {
	file: null
	,db: null
	,checksum: null
	,disk: null
	,backup: function(file) {
		var backup = tjson_TJSON.encode(this.db,"fancy");
		if(file != null) {
			this.disk.writeFile(file,backup);
		}
		return backup;
	}
	,restore: function(s) {
		try {
			this.db = tjson_TJSON.parse(s);
			this.checksum = null;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			throw new js__$Boot_HaxeError("HaxeLow: JSON parsing failed: file \"" + this.file + "\" is corrupt. " + Std.string(e));
		}
		return this;
	}
	,save: function() {
		if(this.file == null) {
			return this;
		}
		var data = this.backup();
		if(data == this.checksum) {
			return this;
		}
		this.checksum = data;
		this.disk.writeFile(this.file,data);
		return this;
	}
	,col: function(cls) {
		var name = Type.getClassName(cls);
		if(!Object.prototype.hasOwnProperty.call(this.db,name)) {
			this.db[name] = [];
			this.save();
		}
		return Reflect.field(this.db,name);
	}
	,__class__: HaxeLow
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() { };
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListNode = function() { };
$hxClasses["_List.ListNode"] = _$List_ListNode;
_$List_ListNode.__name__ = ["_List","ListNode"];
_$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: _$List_ListNode
};
var _$List_ListIterator = function(head) {
	this.head = head;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	head: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
	,__class__: _$List_ListIterator
};
var Main = function() {
	console.log("Node.js Haxelow Example");
	var db = new HaxeLow("db.json");
	var persons = db.col(Person);
	persons.push(new Person("Test",50));
	db.save();
	console.log("open /bin/db.json");
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	__class__: Main
};
var Person = function(name,age) {
	this.name = name;
	this.age = age;
};
$hxClasses["Person"] = Person;
Person.__name__ = ["Person"];
Person.prototype = {
	name: null
	,age: null
	,__class__: Person
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return HxOverrides.substr(s,0,start.length) == start;
	} else {
		return false;
	}
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) {
		return null;
	}
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) {
		return null;
	}
	return cl;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum(e);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	get: null
	,keys: null
	,__class__: haxe_IMap
};
var haxe_Utf8 = function(size) {
	this.__b = "";
};
$hxClasses["haxe.Utf8"] = haxe_Utf8;
haxe_Utf8.__name__ = ["haxe","Utf8"];
haxe_Utf8.prototype = {
	__b: null
	,__class__: haxe_Utf8
};
var haxe_ds_StringMap = function() { };
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,rh: null
	,get: function(key) {
		if(__map_reserved[key] != null) {
			return this.getReserved(key);
		}
		return this.h[key];
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,keys: function() {
		return HxOverrides.iter(this.arrayKeys());
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function() { };
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.prototype = {
	b: null
	,__class__: haxe_io_Bytes
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		if((o instanceof Array)) {
			return o.__enum__ == null;
		} else {
			return false;
		}
		break;
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return true;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return (o|0) === o;
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					return true;
				}
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_node_buffer_Buffer = require("buffer").Buffer;
var tjson_TJSON = function() { };
$hxClasses["tjson.TJSON"] = tjson_TJSON;
tjson_TJSON.__name__ = ["tjson","TJSON"];
tjson_TJSON.parse = function(json,fileName,stringProcessor) {
	if(fileName == null) {
		fileName = "JSON Data";
	}
	var t = new tjson_TJSONParser(json,fileName,stringProcessor);
	return t.doParse();
};
tjson_TJSON.encode = function(obj,style,useCache) {
	if(useCache == null) {
		useCache = true;
	}
	var t = new tjson_TJSONEncoder(useCache);
	return t.doEncode(obj,style);
};
var tjson_TJSONParser = function(vjson,vfileName,stringProcessor) {
	if(vfileName == null) {
		vfileName = "JSON Data";
	}
	this.json = vjson;
	this.fileName = vfileName;
	this.currentLine = 1;
	this.lastSymbolQuoted = false;
	this.pos = 0;
	this.floatRegex = new EReg("^-?[0-9]*\\.[0-9]+$","");
	this.intRegex = new EReg("^-?[0-9]+$","");
	this.strProcessor = stringProcessor == null ? $bind(this,this.defaultStringProcessor) : stringProcessor;
	this.cache = [];
};
$hxClasses["tjson.TJSONParser"] = tjson_TJSONParser;
tjson_TJSONParser.__name__ = ["tjson","TJSONParser"];
tjson_TJSONParser.prototype = {
	pos: null
	,json: null
	,lastSymbolQuoted: null
	,fileName: null
	,currentLine: null
	,cache: null
	,floatRegex: null
	,intRegex: null
	,strProcessor: null
	,doParse: function() {
		try {
			var _g = this.getNextSymbol();
			switch(_g) {
			case "[":
				return this.doArray();
			case "{":
				return this.doObject();
			default:
				var s = _g;
				return this.convertSymbolToProperType(s);
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,String) ) {
				throw new js__$Boot_HaxeError(this.fileName + " on line " + this.currentLine + ": " + e);
			} else throw(e);
		}
	}
	,doObject: function() {
		var o = { };
		var val = "";
		var key;
		var isClassOb = false;
		this.cache.push(o);
		while(this.pos < this.json.length) {
			key = this.getNextSymbol();
			if(key == "," && !this.lastSymbolQuoted) {
				continue;
			}
			if(key == "}" && !this.lastSymbolQuoted) {
				if(isClassOb && o.TJ_unserialize != null) {
					o.TJ_unserialize();
				}
				return o;
			}
			var seperator = this.getNextSymbol();
			if(seperator != ":") {
				throw new js__$Boot_HaxeError("Expected ':' but got '" + seperator + "' instead.");
			}
			var v = this.getNextSymbol();
			if(key == "_hxcls") {
				var cls = Type.resolveClass(v);
				if(cls == null) {
					throw new js__$Boot_HaxeError("Invalid class name - " + v);
				}
				o = Type.createEmptyInstance(cls);
				this.cache.pop();
				this.cache.push(o);
				isClassOb = true;
				continue;
			}
			if(v == "{" && !this.lastSymbolQuoted) {
				val = this.doObject();
			} else if(v == "[" && !this.lastSymbolQuoted) {
				val = this.doArray();
			} else {
				val = this.convertSymbolToProperType(v);
			}
			o[key] = val;
		}
		throw new js__$Boot_HaxeError("Unexpected end of file. Expected '}'");
	}
	,doArray: function() {
		var a = [];
		var val;
		while(this.pos < this.json.length) {
			val = this.getNextSymbol();
			if(val == "," && !this.lastSymbolQuoted) {
				continue;
			} else if(val == "]" && !this.lastSymbolQuoted) {
				return a;
			} else if(val == "{" && !this.lastSymbolQuoted) {
				val = this.doObject();
			} else if(val == "[" && !this.lastSymbolQuoted) {
				val = this.doArray();
			} else {
				val = this.convertSymbolToProperType(val);
			}
			a.push(val);
		}
		throw new js__$Boot_HaxeError("Unexpected end of file. Expected ']'");
	}
	,convertSymbolToProperType: function(symbol) {
		if(this.lastSymbolQuoted) {
			if(StringTools.startsWith(symbol,tjson_TJSON.OBJECT_REFERENCE_PREFIX)) {
				var idx = Std.parseInt(HxOverrides.substr(symbol,tjson_TJSON.OBJECT_REFERENCE_PREFIX.length,null));
				return this.cache[idx];
			}
			return symbol;
		}
		if(this.looksLikeFloat(symbol)) {
			return parseFloat(symbol);
		}
		if(this.looksLikeInt(symbol)) {
			return Std.parseInt(symbol);
		}
		if(symbol.toLowerCase() == "true") {
			return true;
		}
		if(symbol.toLowerCase() == "false") {
			return false;
		}
		if(symbol.toLowerCase() == "null") {
			return null;
		}
		return symbol;
	}
	,looksLikeFloat: function(s) {
		if(!this.floatRegex.match(s)) {
			if(this.intRegex.match(s)) {
				var intStr = this.intRegex.matched(0);
				if(HxOverrides.cca(intStr,0) == 45) {
					return intStr > "-2147483648";
				} else {
					return intStr > "2147483647";
				}
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	,looksLikeInt: function(s) {
		return this.intRegex.match(s);
	}
	,getNextSymbol: function() {
		this.lastSymbolQuoted = false;
		var c = "";
		var inQuote = false;
		var quoteType = "";
		var symbol = "";
		var inEscape = false;
		var inSymbol = false;
		var inLineComment = false;
		var inBlockComment = false;
		while(this.pos < this.json.length) {
			c = this.json.charAt(this.pos++);
			if(c == "\n" && !inSymbol) {
				this.currentLine++;
			}
			if(inLineComment) {
				if(c == "\n" || c == "\r") {
					inLineComment = false;
					this.pos++;
				}
				continue;
			}
			if(inBlockComment) {
				if(c == "*" && this.json.charAt(this.pos) == "/") {
					inBlockComment = false;
					this.pos++;
				}
				continue;
			}
			if(inQuote) {
				if(inEscape) {
					inEscape = false;
					if(c == "'" || c == "\"") {
						symbol += c;
						continue;
					}
					if(c == "t") {
						symbol += "\t";
						continue;
					}
					if(c == "n") {
						symbol += "\n";
						continue;
					}
					if(c == "\\") {
						symbol += "\\";
						continue;
					}
					if(c == "r") {
						symbol += "\r";
						continue;
					}
					if(c == "/") {
						symbol += "/";
						continue;
					}
					if(c == "u") {
						var hexValue = 0;
						var _g = 0;
						while(_g < 4) {
							var i = _g++;
							if(this.pos >= this.json.length) {
								throw new js__$Boot_HaxeError("Unfinished UTF8 character");
							}
							var nc = HxOverrides.cca(this.json,this.pos++);
							hexValue <<= 4;
							if(nc >= 48 && nc <= 57) {
								hexValue += nc - 48;
							} else if(nc >= 65 && nc <= 70) {
								hexValue += 10 + nc - 65;
							} else if(nc >= 97 && nc <= 102) {
								hexValue += 10 + nc - 95;
							} else {
								throw new js__$Boot_HaxeError("Not a hex digit");
							}
						}
						var utf = new haxe_Utf8();
						utf.__b += String.fromCharCode(hexValue);
						symbol += utf.__b;
						continue;
					}
					throw new js__$Boot_HaxeError("Invalid escape sequence '\\" + c + "'");
				} else {
					if(c == "\\") {
						inEscape = true;
						continue;
					}
					if(c == quoteType) {
						return symbol;
					}
					symbol += c;
					continue;
				}
			} else if(c == "/") {
				var c2 = this.json.charAt(this.pos);
				if(c2 == "/") {
					inLineComment = true;
					this.pos++;
					continue;
				} else if(c2 == "*") {
					inBlockComment = true;
					this.pos++;
					continue;
				}
			}
			if(inSymbol) {
				if(c == " " || c == "\n" || c == "\r" || c == "\t" || c == "," || c == ":" || c == "}" || c == "]") {
					this.pos--;
					return symbol;
				} else {
					symbol += c;
					continue;
				}
			} else {
				if(c == " " || c == "\t" || c == "\n" || c == "\r") {
					continue;
				}
				if(c == "{" || c == "}" || c == "[" || c == "]" || c == "," || c == ":") {
					return c;
				}
				if(c == "'" || c == "\"") {
					inQuote = true;
					quoteType = c;
					this.lastSymbolQuoted = true;
					continue;
				} else {
					inSymbol = true;
					symbol = c;
					continue;
				}
			}
		}
		if(inQuote) {
			throw new js__$Boot_HaxeError("Unexpected end of data. Expected ( " + quoteType + " )");
		}
		return symbol;
	}
	,defaultStringProcessor: function(str) {
		return str;
	}
	,__class__: tjson_TJSONParser
};
var tjson_TJSONEncoder = function(useCache) {
	if(useCache == null) {
		useCache = true;
	}
	this.uCache = useCache;
	if(this.uCache) {
		this.cache = [];
	}
};
$hxClasses["tjson.TJSONEncoder"] = tjson_TJSONEncoder;
tjson_TJSONEncoder.__name__ = ["tjson","TJSONEncoder"];
tjson_TJSONEncoder.prototype = {
	cache: null
	,uCache: null
	,doEncode: function(obj,style) {
		if(!Reflect.isObject(obj)) {
			throw new js__$Boot_HaxeError("Provided object is not an object.");
		}
		var st;
		if(js_Boot.__instanceof(style,tjson_EncodeStyle)) {
			st = style;
		} else if(style == "fancy") {
			st = new tjson_FancyStyle();
		} else {
			st = new tjson_SimpleStyle();
		}
		var buffer_b = "";
		if((obj instanceof Array) && obj.__enum__ == null || js_Boot.__instanceof(obj,List)) {
			buffer_b += Std.string(this.encodeIterable(obj,st,0));
		} else if(js_Boot.__instanceof(obj,haxe_ds_StringMap)) {
			buffer_b += Std.string(this.encodeMap(obj,st,0));
		} else {
			this.cacheEncode(obj);
			buffer_b += Std.string(this.encodeObject(obj,st,0));
		}
		return buffer_b;
	}
	,encodeObject: function(obj,style,depth) {
		var buffer_b = "";
		buffer_b += Std.string(style.beginObject(depth));
		var fieldCount = 0;
		var fields;
		var dontEncodeFields = null;
		var o = obj;
		var cls = o == null ? null : js_Boot.getClass(o);
		if(cls != null) {
			fields = Type.getInstanceFields(cls);
		} else {
			fields = Reflect.fields(obj);
		}
		var _g = Type["typeof"](obj);
		if(_g[1] == 6) {
			var c = _g[2];
			if(fieldCount++ > 0) {
				buffer_b += Std.string(style.entrySeperator(depth));
			} else {
				buffer_b += Std.string(style.firstEntry(depth));
			}
			buffer_b += Std.string("\"_hxcls\"" + style.keyValueSeperator(depth));
			buffer_b += Std.string(this.encodeValue(Type.getClassName(c),style,depth));
			if(obj.TJ_noEncode != null) {
				dontEncodeFields = obj.TJ_noEncode();
			}
		}
		var _g1 = 0;
		while(_g1 < fields.length) {
			var field = fields[_g1];
			++_g1;
			if(dontEncodeFields != null && dontEncodeFields.indexOf(field) >= 0) {
				continue;
			}
			var value = Reflect.field(obj,field);
			var vStr = this.encodeValue(value,style,depth);
			if(vStr != null) {
				if(fieldCount++ > 0) {
					buffer_b += Std.string(style.entrySeperator(depth));
				} else {
					buffer_b += Std.string(style.firstEntry(depth));
				}
				buffer_b += Std.string("\"" + field + "\"" + style.keyValueSeperator(depth) + (vStr == null ? "null" : "" + vStr));
			}
		}
		buffer_b += Std.string(style.endObject(depth));
		return buffer_b;
	}
	,encodeMap: function(obj,style,depth) {
		var buffer_b = "";
		buffer_b += Std.string(style.beginObject(depth));
		var fieldCount = 0;
		var field = obj.keys();
		while(field.hasNext()) {
			var field1 = field.next();
			if(fieldCount++ > 0) {
				buffer_b += Std.string(style.entrySeperator(depth));
			} else {
				buffer_b += Std.string(style.firstEntry(depth));
			}
			var value = obj.get(field1);
			buffer_b += Std.string("\"" + field1 + "\"" + style.keyValueSeperator(depth));
			buffer_b += Std.string(this.encodeValue(value,style,depth));
		}
		buffer_b += Std.string(style.endObject(depth));
		return buffer_b;
	}
	,encodeIterable: function(obj,style,depth) {
		var buffer_b = "";
		buffer_b += Std.string(style.beginArray(depth));
		var fieldCount = 0;
		var value = $iterator(obj)();
		while(value.hasNext()) {
			var value1 = value.next();
			if(fieldCount++ > 0) {
				buffer_b += Std.string(style.entrySeperator(depth));
			} else {
				buffer_b += Std.string(style.firstEntry(depth));
			}
			buffer_b += Std.string(this.encodeValue(value1,style,depth));
		}
		buffer_b += Std.string(style.endArray(depth));
		return buffer_b;
	}
	,cacheEncode: function(value) {
		if(!this.uCache) {
			return null;
		}
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var c = _g1++;
			if(this.cache[c] == value) {
				return "\"" + tjson_TJSON.OBJECT_REFERENCE_PREFIX + c + "\"";
			}
		}
		this.cache.push(value);
		return null;
	}
	,encodeValue: function(value,style,depth) {
		if(typeof(value) == "number" && ((value | 0) === value) || typeof(value) == "number") {
			return value;
		} else if((value instanceof Array) && value.__enum__ == null || js_Boot.__instanceof(value,List)) {
			var v = value;
			return this.encodeIterable(v,style,depth + 1);
		} else if(js_Boot.__instanceof(value,List)) {
			var v1 = value;
			return this.encodeIterable(v1,style,depth + 1);
		} else if(js_Boot.__instanceof(value,haxe_ds_StringMap)) {
			return this.encodeMap(value,style,depth + 1);
		} else if(typeof(value) == "string") {
			return "\"" + StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(Std.string(value),"\\","\\\\"),"\n","\\n"),"\r","\\r"),"\"","\\\"") + "\"";
		} else if(typeof(value) == "boolean") {
			return value;
		} else if(Reflect.isObject(value)) {
			var ret = this.cacheEncode(value);
			if(ret != null) {
				return ret;
			}
			return this.encodeObject(value,style,depth + 1);
		} else if(value == null) {
			return "null";
		} else {
			return null;
		}
	}
	,__class__: tjson_TJSONEncoder
};
var tjson_EncodeStyle = function() { };
$hxClasses["tjson.EncodeStyle"] = tjson_EncodeStyle;
tjson_EncodeStyle.__name__ = ["tjson","EncodeStyle"];
tjson_EncodeStyle.prototype = {
	beginObject: null
	,endObject: null
	,beginArray: null
	,endArray: null
	,firstEntry: null
	,entrySeperator: null
	,keyValueSeperator: null
	,__class__: tjson_EncodeStyle
};
var tjson_SimpleStyle = function() {
};
$hxClasses["tjson.SimpleStyle"] = tjson_SimpleStyle;
tjson_SimpleStyle.__name__ = ["tjson","SimpleStyle"];
tjson_SimpleStyle.__interfaces__ = [tjson_EncodeStyle];
tjson_SimpleStyle.prototype = {
	beginObject: function(depth) {
		return "{";
	}
	,endObject: function(depth) {
		return "}";
	}
	,beginArray: function(depth) {
		return "[";
	}
	,endArray: function(depth) {
		return "]";
	}
	,firstEntry: function(depth) {
		return "";
	}
	,entrySeperator: function(depth) {
		return ",";
	}
	,keyValueSeperator: function(depth) {
		return ":";
	}
	,__class__: tjson_SimpleStyle
};
var tjson_FancyStyle = function(tab) {
	if(tab == null) {
		tab = "    ";
	}
	this.tab = tab;
	this.charTimesNCache = [""];
};
$hxClasses["tjson.FancyStyle"] = tjson_FancyStyle;
tjson_FancyStyle.__name__ = ["tjson","FancyStyle"];
tjson_FancyStyle.__interfaces__ = [tjson_EncodeStyle];
tjson_FancyStyle.prototype = {
	tab: null
	,beginObject: function(depth) {
		return "{\n";
	}
	,endObject: function(depth) {
		return "\n" + this.charTimesN(depth) + "}";
	}
	,beginArray: function(depth) {
		return "[\n";
	}
	,endArray: function(depth) {
		return "\n" + this.charTimesN(depth) + "]";
	}
	,firstEntry: function(depth) {
		return this.charTimesN(depth + 1) + " ";
	}
	,entrySeperator: function(depth) {
		return "\n" + this.charTimesN(depth + 1) + ",";
	}
	,keyValueSeperator: function(depth) {
		return " : ";
	}
	,charTimesNCache: null
	,charTimesN: function(n) {
		if(n < this.charTimesNCache.length) {
			return this.charTimesNCache[n];
		} else {
			var tmp = this.charTimesN(n - 1);
			return this.charTimesNCache[n] = tmp + this.tab;
		}
	}
	,__class__: tjson_FancyStyle
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hxClasses["Math"] = Math;
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = ["String"];
$hxClasses["Array"] = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
var Float = $hxClasses["Float"] = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
js_Boot.__toStr = ({ }).toString;
tjson_TJSON.OBJECT_REFERENCE_PREFIX = "@~obRef#";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
