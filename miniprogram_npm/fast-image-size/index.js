module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1711103528719, function(require, module, exports) {
//
// fast-image-size - Simple stand alone module to just extract the image size from image file without using special image libraries.
//
// Please refer to README.md for this module's documentations.
//
// NOTE:
// - Before changing this code please refer to the 'hacking the code section' on README.md.
//
// Copyright (c) 2013 Ziv Barber;
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// 'Software'), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

var fast_image_size_info = require('./package.json');
var fs = require('fs');

module.exports = exports = function ( file_path, callback ) {
	// Internal options:
	if ( file_path == '@version@' ) {
		return fast_image_size_info.version;
	} // Endif.

	function getJpgSize( buffer_data, retInfo ) {
	  // Skip 5 chars, they are for signature
	  buffer_data = buffer_data.slice( 4 );

	  var i, next;
	  while (buffer_data.length) {
	    // read length of the next block
	    i = buffer_data.readUInt16BE( 0 );

	    // 0xFFC0 is baseline(SOF)
	    // 0xFFC2 is progressive(SOF2)
	    next = buffer_data[ i + 1 ];
	    if (next === 0xC0 || next === 0xC2) {
	      return {
	        'height' : buffer_data.readUInt16BE( i + 5 ),
	        'width' : buffer_data.readUInt16BE( i + 7 )
	      };
	    }

	    // move to the next block
	    buffer_data = buffer_data.slice( i + 2 );
	  }
	}

	function parseHeaderData ( buffer_data, callback_data ) {
		var retInfo = {};

		// Detect GIF:
		if ( buffer_data[0] == 0x47 && buffer_data[1] == 0x49 && buffer_data[2] == 0x46 ) {
			retInfo.type = 'gif';
			retInfo.width = (buffer_data[7] * 256) + buffer_data[6];
			retInfo.height = (buffer_data[9] * 256) + buffer_data[8];

		// Detect JPEG:
		} else if ( buffer_data[0] == 0xFF && buffer_data[1] == 0xD8 && buffer_data[2] == 0xFF && buffer_data[3] == 0xE0 ) {
		  retInfo.type = 'jpeg';
		  var size = getJpgSize( buffer_data, retInfo );
		  retInfo.width = size.width;
		  retInfo.height = size.height;

		// Detect PNG:
		} else if ( buffer_data[0] == 137 && buffer_data[1] == 80 && buffer_data[2] == 78 && buffer_data[3] == 71 && buffer_data[4] == 13 && buffer_data[5] == 10 && buffer_data[6] == 26 && buffer_data[7] == 10 ) {
			retInfo.type = 'png';

			if ( buffer_data[12] == 0x49 && buffer_data[13] == 0x48 && buffer_data[14] == 0x44 && buffer_data[15] == 0x52 ) {
				retInfo.width = (buffer_data[16] * 256 * 256 * 256) + (buffer_data[17] * 256 * 256) + (buffer_data[18] * 256) + buffer_data[19];
				retInfo.height = (buffer_data[20] * 256 * 256 * 256) + (buffer_data[21] * 256 * 256) + (buffer_data[22] * 256) + buffer_data[23];
			} // Endif.

		// Detect BMP:
		} else if ( buffer_data[0] == 0x42 && buffer_data[1] == 0x4D ) {
			retInfo.type = 'bmp';
			retInfo.width = (buffer_data[21] * 256 * 256 * 256) + (buffer_data[20] * 256 * 256) + (buffer_data[19] * 256) + buffer_data[18];
			retInfo.height = (buffer_data[25] * 256 * 256 * 256) + (buffer_data[24] * 256 * 256) + (buffer_data[23] * 256) + buffer_data[22];
		} // Endif.

		retInfo.image = file_path;
		if ( !retInfo.type ) {
			retInfo.type = 'unknown';
		} // Endif.

		if ( callback_data ) {
			callback_data ( retInfo );
		} // Endif.

		return retInfo;
	};

	// Async mode:
	if ( callback ) {
	  fs.exists ( file_path, function( exists ) {
	    if ( exists ) {
	      fs.open ( file_path, "r", function ( error, fd ) {
	        var bufferSize = fs.fstatSync( fd ).size;
	        var buffer = new Buffer( bufferSize );
	        fs.read ( fd, buffer, 0, bufferSize, null, function ( error, bytesRead, buffer ) {
	          fs.close ( fd );
	          parseHeaderData ( buffer, callback );
	        });
	      });
			} else {
				throw 'Error: Invalid file name.';
			} // Endif.
		});

	// Sync mode:
	} else {
		var fd = fs.openSync ( file_path, "r" );
		var bufferSize = fs.fstatSync( fd ).size;
		var buffer = new Buffer( bufferSize );
		var bytesRead = fs.readSync ( fd, buffer, 0, bufferSize, 0 );
		fs.closeSync ( fd );
		return parseHeaderData ( buffer, null );
	} // Endif.
};


}, function(modId) {var map = {"./package.json":1711103528720}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528720, function(require, module, exports) {
module.exports = {
	"name": "fast-image-size",
	"description": "Simple stand alone module to just extract the image size from image file without using special image libraries.",
	"version": "0.1.3",
	"url": "https://github.com/Ziv-Barber/fast-image-size",
	"keywords": [
		"get image size",
		"image size",
		"stand alone",
		"pure java script",
		"gif",
		"png",
		"bmp",
		"jpg",
		"jpeg"
	],
	"repository": {
		"type": "git",
		"url": "git://github.com/Ziv-Barber/fast-image-size.git"
	},
	"bugs": {
		"url": "https://github.com/Ziv-Barber/fast-image-size/issues"
	},
	"main": "./index.js",
	"directories": {
		"examples": "examples"
	},
    "author": {
        "name": "Ziv Barber",
        "url": "http://code.zivbarber.com/"
    },
    "license": "MIT"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1711103528719);
})()
//miniprogram-npm-outsideDeps=["fs"]
//# sourceMappingURL=index.js.map