module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1711103528440, function(require, module, exports) {
var fs   = require('fs'),
  Path   = require('path'),
  util   = require('util'),
  EE     = require('events').EventEmitter;

function fsExists(file, cb) {
  if (!fs.access) return fs.exists(file, cb);
  fs.access(file, function(err) {
    cb(err ? false : true);
  });
}

function fsExistsSync(file) {
  if (!fs.accessSync) return fs.existsSync(file);
  try {
    fs.accessSync(file);
  } catch(err) {
    return false;
  }
  return true;
}

module.exports = function(dir, iterator, options, callback){
  return FindUp(dir, iterator, options, callback);
};

function FindUp(dir, iterator, options, callback){
  if (!(this instanceof FindUp)) {
    return new FindUp(dir, iterator, options, callback);
  }
  if(typeof options === 'function'){
    callback = options;
    options = {};
  }
  options = options || {};

  EE.call(this);
  this.found = false;
  this.stopPlease = false;
  var self = this;

  if(typeof iterator === 'string'){
    var file = iterator;
    iterator = function(dir, cb){
      return fsExists(Path.join(dir, file), cb);
    };
  }

  if(callback) {
    this.on('found', function(dir){
      if(options.verbose) console.log(('found '+ dir ));
      callback(null, dir);
      self.stop();
    });

    this.on('end', function(){
      if(options.verbose) console.log('end');
      if(!self.found) callback(new Error('not found'));
    });

    this.on('error', function(err){
      if(options.verbose) console.log('error', err);
      callback(err);
    });
  }

  this._find(dir, iterator, options, callback);
}
util.inherits(FindUp, EE);

FindUp.prototype._find = function(dir, iterator, options, callback, currentDepth){
  var self = this;
  if (typeof currentDepth !== 'number') currentDepth = 0;

  iterator(dir, function(exists){
    if(options.verbose) console.log(('traverse '+ dir));
    if (typeof options.maxdepth === 'number' && options.maxdepth >= 0 && currentDepth > options.maxdepth) {
      return self.emit('end');
    }
    currentDepth++;
    if(exists) {
      self.found = true;
      self.emit('found', dir);
    }

    var parentDir = Path.join(dir, '..');
    if (self.stopPlease) return self.emit('end');
    if (dir === parentDir) return self.emit('end');
    if(dir.indexOf('../../') !== -1 ) return self.emit('error', new Error(dir + ' is not correct.'));
    self._find(parentDir, iterator, options, callback, currentDepth);
  });
};

FindUp.prototype.stop = function(){
  this.stopPlease = true;
};

module.exports.FindUp = FindUp;

module.exports.sync = function(dir, iteratorSync, options){
  if(typeof iteratorSync === 'string'){
    var file = iteratorSync;
    iteratorSync = function(dir){
      return fsExistsSync(Path.join(dir, file));
    };
  }
  options = options || {};
  var initialDir = dir;
  var currentDepth = 0;
  while(dir !== Path.join(dir, '..')){
    if (typeof options.maxdepth === 'number' && options.maxdepth >= 0 && currentDepth > options.maxdepth) {
      break;
    }
    currentDepth++;
    if(dir.indexOf('../../') !== -1 ) throw new Error(initialDir + ' is not correct.');
    if(iteratorSync(dir)) return dir;
    dir = Path.join(dir, '..');
  }
  throw new Error('not found');
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1711103528440);
})()
//miniprogram-npm-outsideDeps=["fs","path","util","events"]
//# sourceMappingURL=index.js.map