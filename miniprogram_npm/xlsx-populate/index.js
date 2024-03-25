module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1711202881108, function(require, module, exports) {


const externals = require("./externals");
const Workbook = require("./Workbook");
const FormulaError = require("./FormulaError");
const dateConverter = require("./dateConverter");
const RichText = require("./RichText");

/**
 * xlsx-poulate namespace.
 * @namespace
 */
class XlsxPopulate {
    /**
     * Convert a date to a number for Excel.
     * @param {Date} date - The date.
     * @returns {number} The number.
     */
    static dateToNumber(date) {
        return dateConverter.dateToNumber(date);
    }

    /**
     * Create a new blank workbook.
     * @returns {Promise.<Workbook>} The workbook.
     */
    static fromBlankAsync() {
        return Workbook.fromBlankAsync();
    }

    /**
     * Loads a workbook from a data object. (Supports any supported [JSZip data types]{@link https://stuk.github.io/jszip/documentation/api_jszip/load_async.html}.)
     * @param {string|Array.<number>|ArrayBuffer|Uint8Array|Buffer|Blob|Promise.<*>} data - The data to load.
     * @param {{}} [opts] - Options
     * @param {string} [opts.password] - The password to decrypt the workbook.
     * @returns {Promise.<Workbook>} The workbook.
     */
    static fromDataAsync(data, opts) {
        return Workbook.fromDataAsync(data, opts);
    }

    /**
     * Loads a workbook from file.
     * @param {string} path - The path to the workbook.
     * @param {{}} [opts] - Options
     * @param {string} [opts.password] - The password to decrypt the workbook.
     * @returns {Promise.<Workbook>} The workbook.
     */
    static fromFileAsync(path, opts) {
        return Workbook.fromFileAsync(path, opts);
    }

    /**
     * Convert an Excel number to a date.
     * @param {number} number - The number.
     * @returns {Date} The date.
     */
    static numberToDate(number) {
        return dateConverter.numberToDate(number);
    }

    /**
     * The Promise library.
     * @type {Promise}
     */
    static get Promise() {
        return externals.Promise;
    }
    static set Promise(Promise) {
        externals.Promise = Promise;
    }
}

/**
 * The XLSX mime type.
 * @type {string}
 */
XlsxPopulate.MIME_TYPE = Workbook.MIME_TYPE;

/**
 * Formula error class.
 * @type {FormulaError}
 */
XlsxPopulate.FormulaError = FormulaError;

/**
 * RichTexts class
 * @type {RichText}
 */
XlsxPopulate.RichText = RichText;

module.exports = XlsxPopulate;

}, function(modId) {var map = {"./externals":1711202881109,"./Workbook":1711202881110,"./FormulaError":1711202881119,"./dateConverter":1711202881118,"./RichText":1711202881122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881109, function(require, module, exports) {


const JSZip = require("jszip");

/**
 * External modules.
 * @private
 */
module.exports = {
    /**
     * The Promise library.
     * @type {Promise}
     */
    get Promise() {
        return JSZip.external.Promise;
    },

    set Promise(Promise) {
        JSZip.external.Promise = Promise;
    }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881110, function(require, module, exports) {


const _ = require("lodash");
const fs = require("fs");
const JSZip = require('jszip');

const externals = require("./externals");
const regexify = require("./regexify");
const blank = require("./blank")();
const xmlq = require("./xmlq");
const Sheet = require("./Sheet");
const ContentTypes = require("./ContentTypes");
const AppProperties = require("./AppProperties");
const CoreProperties = require("./CoreProperties");
const Relationships = require("./Relationships");
const SharedStrings = require("./SharedStrings");
const StyleSheet = require("./StyleSheet");
const Encryptor = require("./Encryptor");
const XmlParser = require("./XmlParser");
const XmlBuilder = require("./XmlBuilder");
const ArgHandler = require("./ArgHandler");
const addressConverter = require("./addressConverter");

// Options for adding files to zip. Do not create folders and use a fixed time at epoch.
// The default JSZip behavior uses current time, which causes idential workbooks to be different each time.
const zipFileOpts = {
    date: new Date(0),
    createFolders: false
};

// Initialize the parser and builder.
const xmlParser = new XmlParser();
const xmlBuilder = new XmlBuilder();

// Initialize the encryptor if present (can be excluded in browser build).
const encryptor = typeof Encryptor === "function" && new Encryptor();

// Characters not allowed in sheet names.
const badSheetNameChars = ['\\', '/', '*', '[', ']', ':', '?'];

// Excel limits sheet names to 31 chars.
const maxSheetNameLength = 31;

// Order of the nodes as defined by the spec.
const nodeOrder = [
    "fileVersion", "fileSharing", "workbookPr", "workbookProtection", "bookViews", "sheets", "functionGroups",
    "externalReferences", "definedNames", "calcPr", "oleSize", "customWorkbookViews", "pivotCaches", "smartTagPr",
    "smartTagTypes", "webPublishing", "fileRecoveryPr", "webPublishObjects", "extLst"
];

/**
 * A workbook.
 */
class Workbook {
    /**
     * Create a new blank workbook.
     * @returns {Promise.<Workbook>} The workbook.
     * @ignore
     */
    static fromBlankAsync() {
        return Workbook.fromDataAsync(blank);
    }

    /**
     * Loads a workbook from a data object. (Supports any supported [JSZip data types]{@link https://stuk.github.io/jszip/documentation/api_jszip/load_async.html}.)
     * @param {string|Array.<number>|ArrayBuffer|Uint8Array|Buffer|Blob|Promise.<*>} data - The data to load.
     * @param {{}} [opts] - Options
     * @returns {Promise.<Workbook>} The workbook.
     * @ignore
     */
    static fromDataAsync(data, opts) {
        return new Workbook()._initAsync(data, opts);
    }

    /**
     * Loads a workbook from file.
     * @param {string} path - The path to the workbook.
     * @param {{}} [opts] - Options
     * @returns {Promise.<Workbook>} The workbook.
     * @ignore
     */
    static fromFileAsync(path, opts) {
        if (process.browser) throw new Error("Workbook.fromFileAsync is not supported in the browser");
        return new externals.Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        }).then(data => Workbook.fromDataAsync(data, opts));
    }

    /**
     * Get the active sheet in the workbook.
     * @returns {Sheet} The active sheet.
     *//**
     * Set the active sheet in the workbook.
     * @param {Sheet|string|number} sheet - The sheet or name of sheet or index of sheet to activate. The sheet must not be hidden.
     * @returns {Workbook} The workbook.
     */
    activeSheet() {
        return new ArgHandler('Workbook.activeSheet')
            .case(() => {
                return this._activeSheet;
            })
            .case('*', sheet => {
                // Get the sheet from name/index if needed.
                if (!(sheet instanceof Sheet)) sheet = this.sheet(sheet);

                // Check if the sheet is hidden.
                if (sheet.hidden()) throw new Error("You may not activate a hidden sheet.");

                // Deselect all sheets except the active one (mirroring ying Excel behavior).
                _.forEach(this._sheets, current => {
                    current.tabSelected(current === sheet);
                });

                this._activeSheet = sheet;

                return this;
            })
            .handle(arguments);
    }

    /**
     * Add a new sheet to the workbook.
     * @param {string} name - The name of the sheet. Must be unique, less than 31 characters, and may not contain the following characters: \ / * [ ] : ?
     * @param {number|string|Sheet} [indexOrBeforeSheet] The index to move the sheet to or the sheet (or name of sheet) to move this sheet before. Omit this argument to move to the end of the workbook.
     * @returns {Sheet} The new sheet.
     */
    addSheet(name, indexOrBeforeSheet) {
        return this._addSheet(name, indexOrBeforeSheet);
    }
    
    /**
     * Gets a defined name scoped to the workbook.
     * @param {string} name - The defined name.
     * @returns {undefined|string|Cell|Range|Row|Column} What the defined name refers to or undefined if not found. Will return the string formula if not a Row, Column, Cell, or Range.
     *//**
     * Set a defined name scoped to the workbook.
     * @param {string} name - The defined name.
     * @param {string|Cell|Range|Row|Column} refersTo - What the name refers to.
     * @returns {Workbook} The workbook.
     */
    definedName() {
        return new ArgHandler("Workbook.definedName")
            .case('string', name => {
                return this.scopedDefinedName(undefined, name);
            })
            .case(['string', '*'], (name, refersTo) => {
                this.scopedDefinedName(undefined, name, refersTo);
                return this;
            })
            .handle(arguments);
    }

    /**
     * Delete a sheet from the workbook.
     * @param {Sheet|string|number} sheet - The sheet or name of sheet or index of sheet to move.
     * @returns {Workbook} The workbook.
     */
    deleteSheet(sheet) {
        // Get the sheet to move.
        if (!(sheet instanceof Sheet)) {
            sheet = this.sheet(sheet);
            if (!sheet) throw new Error("Invalid move sheet reference.");
        }

        // Make sure we are not deleting the only visible sheet.
        const visibleSheets = _.filter(this._sheets, sheet => !sheet.hidden());
        if (visibleSheets.length === 1 && visibleSheets[0] === sheet) {
            throw new Error("This sheet may not be deleted as a workbook must contain at least one visible sheet.");
        }

        // Remove the sheet.
        let index = this._sheets.indexOf(sheet);
        this._sheets.splice(index, 1);

        // Set the new active sheet.
        if (sheet === this.activeSheet()) {
            if (index >= this._sheets.length) index--;
            this.activeSheet(index);
        }

        return this;
    }

    /**
     * Find the given pattern in the workbook and optionally replace it.
     * @param {string|RegExp} pattern - The pattern to look for. Providing a string will result in a case-insensitive substring search. Use a RegExp for more sophisticated searches.
     * @param {string|function} [replacement] - The text to replace or a String.replace callback function. If pattern is a string, all occurrences of the pattern in each cell will be replaced.
     * @returns {boolean} A flag indicating if the pattern was found.
     */
    find(pattern, replacement) {
        pattern = regexify(pattern);

        let matches = [];
        this._sheets.forEach(sheet => {
            matches = matches.concat(sheet.find(pattern, replacement));
        });

        return matches;
    }

    /**
     * Move a sheet to a new position.
     * @param {Sheet|string|number} sheet - The sheet or name of sheet or index of sheet to move.
     * @param {number|string|Sheet} [indexOrBeforeSheet] The index to move the sheet to or the sheet (or name of sheet) to move this sheet before. Omit this argument to move to the end of the workbook.
     * @returns {Workbook} The workbook.
     */
    moveSheet(sheet, indexOrBeforeSheet) {
        // Get the sheet to move.
        if (!(sheet instanceof Sheet)) {
            sheet = this.sheet(sheet);
            if (!sheet) throw new Error("Invalid move sheet reference.");
        }

        // Get the to/from indexes.
        const from = this._sheets.indexOf(sheet);
        let to;
        if (_.isNil(indexOrBeforeSheet)) {
            to = this._sheets.length - 1;
        } else if (_.isInteger(indexOrBeforeSheet)) {
            to = indexOrBeforeSheet;
        } else {
            if (!(indexOrBeforeSheet instanceof Sheet)) {
                indexOrBeforeSheet = this.sheet(indexOrBeforeSheet);
                if (!indexOrBeforeSheet) throw new Error("Invalid before sheet reference.");
            }

            to = this._sheets.indexOf(indexOrBeforeSheet);
        }

        // Insert the sheet at the appropriate place.
        this._sheets.splice(to, 0, this._sheets.splice(from, 1)[0]);

        return this;
    }

    /**
     * Generates the workbook output.
     * @param {string} [type] - The type of the data to return: base64, binarystring, uint8array, arraybuffer, blob, nodebuffer. Defaults to 'nodebuffer' in Node.js and 'blob' in browsers.
     * @returns {Promise<string|Uint8Array|ArrayBuffer|Blob|Buffer>} The data.
     *//**
     * Generates the workbook output.
     * @param {{}} [opts] Options
     * @param {string} [opts.type] - The type of the data to return: base64, binarystring, uint8array, arraybuffer, blob, nodebuffer. Defaults to 'nodebuffer' in Node.js and 'blob' in browsers.
     * @param {string} [opts.password] - The password to use to encrypt the workbook.
     * @returns {Promise<string|Uint8Array|ArrayBuffer|Blob|Buffer>} The data.
     */
    outputAsync(opts) {
        opts = opts || {};
        if (typeof opts === 'string') opts = { type: opts };

        this._setSheetRefs();

        let definedNamesNode = xmlq.findChild(this._node, "definedNames");

        this._sheets.forEach((sheet, i) => {
            if (!sheet._autoFilter) return;

            if (!definedNamesNode) {
                definedNamesNode = {
                    name: "definedNames",
                    attributes: {},
                    children: []
                };

                xmlq.insertInOrder(this._node, definedNamesNode, nodeOrder);
            }

            xmlq.appendChild(definedNamesNode, {
                name: "definedName",
                attributes: {
                    name: "_xlnm._FilterDatabase",
                    localSheetId: i,
                    hidden: "1"
                },
                children: [sheet._autoFilter.address({ includeSheetName: true, anchored: true })]
            });
        });

        this._sheetsNode.children = [];
        this._sheets.forEach((sheet, i) => {
            const sheetPath = `xl/worksheets/sheet${i + 1}.xml`;
            const sheetRelsPath = `xl/worksheets/_rels/sheet${i + 1}.xml.rels`;
            const sheetXmls = sheet.toXmls();
            const relationship = this._relationships.findById(sheetXmls.id.attributes['r:id']);
            relationship.attributes.Target = `worksheets/sheet${i + 1}.xml`;
            this._sheetsNode.children.push(sheetXmls.id);
            this._zip.file(sheetPath, xmlBuilder.build(sheetXmls.sheet), zipFileOpts);

            const relationshipsXml = xmlBuilder.build(sheetXmls.relationships);
            if (relationshipsXml) {
                this._zip.file(sheetRelsPath, relationshipsXml, zipFileOpts);
            } else {
                this._zip.remove(sheetRelsPath);
            }
        });

        // Set the app security to true if a password is set, false if not.
        // this._appProperties.isSecure(!!opts.password);

        // Convert the various components to XML strings and add them to the zip.
        this._zip.file("[Content_Types].xml", xmlBuilder.build(this._contentTypes), zipFileOpts);
        this._zip.file("docProps/app.xml", xmlBuilder.build(this._appProperties), zipFileOpts);
        this._zip.file("docProps/core.xml", xmlBuilder.build(this._coreProperties), zipFileOpts);
        this._zip.file("xl/_rels/workbook.xml.rels", xmlBuilder.build(this._relationships), zipFileOpts);
        this._zip.file("xl/sharedStrings.xml", xmlBuilder.build(this._sharedStrings), zipFileOpts);
        this._zip.file("xl/styles.xml", xmlBuilder.build(this._styleSheet), zipFileOpts);
        this._zip.file("xl/workbook.xml", xmlBuilder.build(this._node), zipFileOpts);

        // Generate the zip.
        return this._zip.generateAsync({
            type: "nodebuffer",
            compression: "DEFLATE"
        }).then(output => {
            // If a password is set, encrypt the workbook.
            if (opts.password) output = encryptor.encrypt(output, opts.password);

            // Convert and return
            return this._convertBufferToOutput(output, opts.type);
        });
    }

    /**
     * Gets the sheet with the provided name or index (0-based).
     * @param {string|number} sheetNameOrIndex - The sheet name or index.
     * @returns {Sheet|undefined} The sheet or undefined if not found.
     */
    sheet(sheetNameOrIndex) {
        if (_.isInteger(sheetNameOrIndex)) return this._sheets[sheetNameOrIndex];
        return _.find(this._sheets, sheet => sheet.name() === sheetNameOrIndex);
    }

    /**
     * Get an array of all the sheets in the workbook.
     * @returns {Array.<Sheet>} The sheets.
     */
    sheets() {
        return this._sheets.slice();
    }

    /**
     * Gets an individual property.
     * @param {string} name - The name of the property.
     * @returns {*} The property.
     *//**
     * Gets multiple properties.
     * @param {Array.<string>} names - The names of the properties.
     * @returns {object.<string, *>} Object whose keys are the property names and values are the properties.
     *//**
     * Sets an individual property.
     * @param {string} name - The name of the property.
     * @param {*} value - The value to set.
     * @returns {Workbook} The workbook.
     *//**
     * Sets multiple properties.
     * @param {object.<string, *>} properties - Object whose keys are the property names and values are the values to set.
     * @returns {Workbook} The workbook.
     */
    property() {
        return new ArgHandler("Workbook.property")
            .case('string', name => {
                // Get single value
                return this._coreProperties.get(name);
            })
            .case('array', names => {
                // Get list of values
                const values = {};
                names.forEach(name => {
                    values[name] = this._coreProperties.get(name);
                });

                return values;
            })
            .case(['string', '*'], (name, value) => {
                // Set a single value for all cells to a single value
                this._coreProperties.set(name, value);
                return this;
            })
            .case('object', nameValues => {
                // Object of key value pairs to set
                for (const name in nameValues) {
                    if (!nameValues.hasOwnProperty(name)) continue;
                    const value = nameValues[name];
                    this._coreProperties.set(name, value);
                }

                return this;
            })
            .handle(arguments);
    }

    /**
     * Get access to core properties object
     * @returns {CoreProperties} The core properties.
     */
    properties() {
        return this._coreProperties;
    }

    /**
     * Write the workbook to file. (Not supported in browsers.)
     * @param {string} path - The path of the file to write.
     * @param {{}} [opts] - Options
     * @param {string} [opts.password] - The password to encrypt the workbook.
     * @returns {Promise.<undefined>} A promise.
     */
    toFileAsync(path, opts) {
        if (process.browser) throw new Error("Workbook.toFileAsync is not supported in the browser.");
        return this.outputAsync(opts)
            .then(data => new externals.Promise((resolve, reject) => {
                fs.writeFile(path, data, err => {
                    if (err) return reject(err);
                    resolve();
                });
            }));
    }

    /**
     * Gets a scoped defined name.
     * @param {Sheet} sheetScope - The sheet the name is scoped to. Use undefined for workbook scope.
     * @param {string} name - The defined name.
     * @returns {undefined|Cell|Range|Row|Column} What the defined name refers to.
     * @ignore
     *//**
     * Sets a scoped defined name.
     * @param {Sheet} sheetScope - The sheet the name is scoped to. Use undefined for workbook scope.
     * @param {string} name - The defined name.
     * @param {undefined|Cell|Range|Row|Column} refersTo - What the defined name refers to.
     * @returns {Workbook} The workbook.
     * @ignore
     */
    scopedDefinedName(sheetScope, name, refersTo) {
        let definedNamesNode = xmlq.findChild(this._node, "definedNames");
        let definedNameNode = definedNamesNode && _.find(definedNamesNode.children, node => node.attributes.name === name && node.localSheet === sheetScope);

        return new ArgHandler('Workbook.scopedDefinedName')
            .case(['*', 'string'], () => {
                // Get the address from the definedNames node.
                const refersTo = definedNameNode && definedNameNode.children[0];
                if (!refersTo) return undefined;

                // Try to parse the address.
                const ref = addressConverter.fromAddress(refersTo);
                if (!ref) return refersTo;

                // Load the appropriate selection type.
                const sheet = this.sheet(ref.sheetName);
                if (ref.type === 'cell') return sheet.cell(ref.rowNumber, ref.columnNumber);
                if (ref.type === 'range') return sheet.range(ref.startRowNumber, ref.startColumnNumber, ref.endRowNumber, ref.endColumnNumber);
                if (ref.type === 'row') return sheet.row(ref.rowNumber);
                if (ref.type === 'column') return sheet.column(ref.columnNumber);
                return refersTo;
            })
            .case(['*', 'string', 'nil'], () => {
                if (definedNameNode) xmlq.removeChild(definedNamesNode, definedNameNode);
                if (definedNamesNode && !definedNamesNode.children.length) xmlq.removeChild(this._node, definedNamesNode);
                return this;
            })
            .case(['*', 'string', '*'], () => {
                if (typeof refersTo !== 'string') {
                    refersTo = refersTo.address({
                        includeSheetName: true,
                        anchored: true
                    });
                }

                if (!definedNamesNode) {
                    definedNamesNode = {
                        name: "definedNames",
                        attributes: {},
                        children: []
                    };

                    xmlq.insertInOrder(this._node, definedNamesNode, nodeOrder);
                }

                if (!definedNameNode) {
                    definedNameNode = {
                        name: "definedName",
                        attributes: { name },
                        children: [refersTo]
                    };

                    if (sheetScope) definedNameNode.localSheet = sheetScope;

                    xmlq.appendChild(definedNamesNode, definedNameNode);
                }

                definedNameNode.children = [refersTo];

                return this;
            })
            .handle(arguments);
    }

    /**
     * Get the shared strings table.
     * @returns {SharedStrings} The shared strings table.
     * @ignore
     */
    sharedStrings() {
        return this._sharedStrings;
    }

    /**
     * Get the style sheet.
     * @returns {StyleSheet} The style sheet.
     * @ignore
     */
    styleSheet() {
        return this._styleSheet;
    }

    /**
     * Add a new sheet to the workbook.
     * 
     * **WARN:** this function has limits:  if you clone a sheet with some images or other things link outside the Sheet object, these things in the cloned sheet will be locked when you open in MS Excel app.
     * @param {Sheet} from - The sheet to be cloned.
     * @param {string} name - The name of the new sheet. Must be unique, less than 31 characters, and may not contain the following characters: \ / * [ ] : ?
     * @param {number|string|Sheet} [indexOrBeforeSheet] The index to move the sheet to or the sheet (or name of sheet) to move this sheet before. Omit this argument to move to the end of the workbook.
     * @returns {Sheet} The new sheet.
     */
    cloneSheet(from, name, indexOrBeforeSheet) {
        if (!from || !(from instanceof Sheet)) throw new Error("Invalid clone from.");

        return this._addSheet(name, indexOrBeforeSheet, () => {
            const cloneXml = node => {
                // If the node has a toXml method, call it.
                if (node && _.isFunction(node.toXml)) node = node.toXml();
        
                if (typeof node === 'object') {
                    if (node.name) {
                        const result = {
                            name: node.name,
                            attributes: {},
                            children: []
                        };
                        
                        _.forOwn(node.attributes, (value, name) => {
                            result.attributes[name] = value;
                        }); 
                    
                        let chld;
                        if (node.children) { 
                            node.children.forEach(child => {
                                chld = cloneXml(child);
                                if (child !== null) {
                                    result.children.push(chld);
                                }
                            });
                        }
                        return result;
                    }
                } else if (node !== null) {
                    return node;
                } 
                return null;
            };

            // clone SheetNode & relationshipNode from source
            const fromXml = from.toXmls();
            const sheetNode = cloneXml(fromXml.sheet);
            const relationshipNode = cloneXml(fromXml.relationships);
            return { sheetNode, relationshipNode };
        });
    }

    /**
     * Add a new sheet to the workbook.
     * @param {string} name - The name of the sheet. Must be unique, less than 31 characters, and may not contain the following characters: \ / * [ ] : ?
     * @param {number|string|Sheet} [indexOrBeforeSheet] The index to move the sheet to or the sheet (or name of sheet) to move this sheet before. Omit this argument to move to the end of the workbook.
     * @param {callback} [getTemplateNodes] optional callback function for template nodes
     * @returns {Sheet} The new sheet.
     * @private
     */
    _addSheet(name, indexOrBeforeSheet, getTemplateNodes) {
        // Validate the sheet name.
        if (!name || typeof name !== "string") throw new Error("Invalid sheet name.");
        if (_.some(badSheetNameChars, char => name.indexOf(char) >= 0)) throw new Error(`Sheet name may not contain any of the following characters: ${badSheetNameChars.join(" ")}`);
        if (name.length > maxSheetNameLength) throw new Error(`Sheet name may not be greater than ${maxSheetNameLength} characters.`);
        if (this.sheet(name)) throw new Error(`Sheet with name "${name}" already exists.`);

        // Get the destination index of new sheet.
        let index;
        if (_.isNil(indexOrBeforeSheet)) {
            index = this._sheets.length;
        } else if (_.isInteger(indexOrBeforeSheet)) {
            index = indexOrBeforeSheet;
        } else {
            if (!(indexOrBeforeSheet instanceof Sheet)) {
                indexOrBeforeSheet = this.sheet(indexOrBeforeSheet);
                if (!indexOrBeforeSheet) throw new Error("Invalid before sheet reference.");
            }

            index = this._sheets.indexOf(indexOrBeforeSheet);
        }

        // Add a new relationship for the new sheet and create the new sheet ID node.
        const relationship = this._relationships.add("worksheet"); // Leave target blank as it will be filled later.
        const sheetIdNode = {
            name: "sheet",
            attributes: {
                name,
                sheetId: ++this._maxSheetId,
                'r:id': relationship.attributes.Id
            },
            children: []
        };

        // Create the new sheet.
        let sheet;
        if (getTemplateNodes) {
            const { sheetNode, relationshipNode } = getTemplateNodes();
            sheet = new Sheet(this, sheetIdNode, sheetNode, relationshipNode);
        } else {
            sheet = new Sheet(this, sheetIdNode);
        }

        // Insert the sheet at the appropriate index.
        this._sheets.splice(index, 0, sheet);

        return sheet;
    }

    /**
     * Initialize the workbook. (This is separated from the constructor to ease testing.)
     * @param {string|ArrayBuffer|Uint8Array|Buffer|Blob} data - The data to load.
     * @param {{}} [opts] - Options
     * @param {boolean} [opts.base64=false] - No used unless input is a string. True if the input string is base64 encoded, false for binary.
     * @returns {Promise.<Workbook>} The workbook.
     * @private
     */
    _initAsync(data, opts) {
        opts = opts || {};

        this._maxSheetId = 0;
        this._sheets = [];

        return externals.Promise.resolve()
            .then(() => {
                // Make sure the input is a Buffer
                return this._convertInputToBufferAsync(data, opts.base64)
                    .then(buffer => {
                        data = buffer;
                    });
            })
            .then(() => {
                if (!opts.password) return;
                return encryptor.decryptAsync(data, opts.password)
                    .then(decrypted => {
                        data = decrypted;
                    });
            })
            .then(() => JSZip.loadAsync(data))
            .then(zip => {
                this._zip = zip;
                return this._parseNodesAsync([
                    "[Content_Types].xml",
                    "docProps/app.xml",
                    "docProps/core.xml",
                    "xl/_rels/workbook.xml.rels",
                    "xl/sharedStrings.xml",
                    "xl/styles.xml",
                    "xl/workbook.xml"
                ]);
            })
            .then(nodes => {
                const contentTypesNode = nodes[0];
                const appPropertiesNode = nodes[1];
                const corePropertiesNode = nodes[2];
                const relationshipsNode = nodes[3];
                const sharedStringsNode = nodes[4];
                const styleSheetNode = nodes[5];
                const workbookNode = nodes[6];

                // Load the various components.
                this._contentTypes = new ContentTypes(contentTypesNode);
                this._appProperties = new AppProperties(appPropertiesNode);
                this._coreProperties = new CoreProperties(corePropertiesNode);
                this._relationships = new Relationships(relationshipsNode);
                this._sharedStrings = new SharedStrings(sharedStringsNode);
                this._styleSheet = new StyleSheet(styleSheetNode);
                this._node = workbookNode;

                // Add the shared strings relationship if it doesn't exist.
                if (!this._relationships.findByType("sharedStrings")) {
                    this._relationships.add("sharedStrings", "sharedStrings.xml");
                }

                // Add the shared string content type if it doesn't exist.
                if (!this._contentTypes.findByPartName("/xl/sharedStrings.xml")) {
                    this._contentTypes.add("/xl/sharedStrings.xml", "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml");
                }

                // Kill the calc chain. It's not required and the workbook will corrupt unless we keep it up to date.
                this._zip.remove("xl/calcChain.xml");

                // Load each sheet.
                this._sheetsNode = xmlq.findChild(this._node, "sheets");
                return externals.Promise.all(_.map(this._sheetsNode.children, (sheetIdNode, i) => {
                    if (sheetIdNode.attributes.sheetId > this._maxSheetId) this._maxSheetId = sheetIdNode.attributes.sheetId;

                    return this._parseNodesAsync([`xl/worksheets/sheet${i + 1}.xml`, `xl/worksheets/_rels/sheet${i + 1}.xml.rels`])
                        .then(nodes => {
                            const sheetNode = nodes[0];
                            const sheetRelationshipsNode = nodes[1];

                            // Insert at position i as the promises will resolve at different times.
                            this._sheets[i] = new Sheet(this, sheetIdNode, sheetNode, sheetRelationshipsNode);
                        });
                }));
            })
            .then(() => this._parseSheetRefs())
            .then(() => this);
    }

    /**
     * Parse files out of zip into XML node objects.
     * @param {Array.<string>} names - The file names to parse.
     * @returns {Promise.<Array.<{}>>} An array of the parsed objects.
     * @private
     */
    _parseNodesAsync(names) {
        return externals.Promise.all(_.map(names, name => this._zip.file(name)))
            .then(files => externals.Promise.all(_.map(files, file => file && file.async("string"))))
            .then(texts => externals.Promise.all(_.map(texts, text => text && xmlParser.parseAsync(text))));
    }

    /**
     * Parse the sheet references out so we can reorder freely.
     * @returns {undefined}
     * @private
     */
    _parseSheetRefs() {
        // Parse the active sheet.
        const bookViewsNode = xmlq.findChild(this._node, "bookViews");
        const workbookViewNode = bookViewsNode && xmlq.findChild(bookViewsNode, "workbookView");
        const activeTabId = workbookViewNode && workbookViewNode.attributes.activeTab || 0;
        this._activeSheet = this._sheets[activeTabId];

        // Set the location sheet on the defined name nodes. The defined name should point to the index of the sheet
        // but reordering sheets messes this up. So store it on the node and we'll update the index on XML build.
        const definedNamesNode = xmlq.findChild(this._node, "definedNames");
        if (definedNamesNode) {
            _.forEach(definedNamesNode.children, definedNameNode => {
                if (definedNameNode.attributes.hasOwnProperty("localSheetId")) {
                    definedNameNode.localSheet = this._sheets[definedNameNode.attributes.localSheetId];
                }
            });
        }
    }

    /**
     * Set the proper sheet references in the XML.
     * @returns {undefined}
     * @private
     */
    _setSheetRefs() {
        // Set the active sheet.
        let bookViewsNode = xmlq.findChild(this._node, "bookViews");
        if (!bookViewsNode) {
            bookViewsNode = { name: 'bookViews', attributes: {}, children: [] };
            xmlq.insertInOrder(this._node, bookViewsNode, nodeOrder);
        }

        let workbookViewNode = xmlq.findChild(bookViewsNode, "workbookView");
        if (!workbookViewNode) {
            workbookViewNode = { name: 'workbookView', attributes: {}, children: [] };
            xmlq.appendChild(bookViewsNode, workbookViewNode);
        }

        workbookViewNode.attributes.activeTab = this._sheets.indexOf(this._activeSheet);

        // Set the defined names local sheet indexes.
        const definedNamesNode = xmlq.findChild(this._node, "definedNames");
        if (definedNamesNode) {
            _.forEach(definedNamesNode.children, definedNameNode => {
                if (definedNameNode.localSheet) {
                    definedNameNode.attributes.localSheetId = this._sheets.indexOf(definedNameNode.localSheet);
                }
            });
        }
    }

    /**
     * Convert buffer to desired output format
     * @param {Buffer} buffer - The buffer
     * @param {string} type - The type to convert to: buffer/nodebuffer, blob, base64, binarystring, uint8array, arraybuffer
     * @returns {Buffer|Blob|string|Uint8Array|ArrayBuffer} The output
     * @private
     */
    _convertBufferToOutput(buffer, type) {
        if (!type) type = process.browser ? "blob" : "nodebuffer";

        if (type === "buffer" || type === "nodebuffer") return buffer;
        if (process.browser && type === "blob") return new Blob([buffer], { type: Workbook.MIME_TYPE });
        if (type === "base64") return buffer.toString("base64");
        if (type === "binarystring") return buffer.toString("utf8");
        if (type === "uint8array") return new Uint8Array(buffer);
        if (type === "arraybuffer") return new Uint8Array(buffer).buffer;

        throw new Error(`Output type '${type}' not supported.`);
    }

    /**
     * Convert input to buffer
     * @param {Buffer|Blob|string|Uint8Array|ArrayBuffer} input - The input
     * @param {boolean} [base64=false] - Only applies if input is a string. If true, the string is base64 encoded, false for binary
     * @returns {Promise.<Buffer>} The buffer.
     * @private
     */
    _convertInputToBufferAsync(input, base64) {
        return externals.Promise.resolve()
            .then(() => {
                if (Buffer.isBuffer(input)) return input;

                if (process.browser && input instanceof Blob) {
                    return new externals.Promise(resolve => {
                        const fileReader = new FileReader();
                        fileReader.onload = event => {
                            resolve(Buffer.from(event.target.result));
                        };
                        fileReader.readAsArrayBuffer(input);
                    });
                }

                if (typeof input === "string" && base64) return Buffer.from(input, "base64");
                if (typeof input === "string" && !base64) return Buffer.from(input, "utf8");
                if (input instanceof Uint8Array || input instanceof ArrayBuffer) return Buffer.from(input);

                throw new Error(`Input type unknown.`);
            });
    }
}

/**
 * The XLSX mime type.
 * @type {string}
 * @ignore
 */
Workbook.MIME_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

module.exports = Workbook;

/*
xl/workbook.xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x15" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main">
	<fileVersion appName="xl" lastEdited="7" lowestEdited="7" rupBuild="16925"/>
	<workbookPr defaultThemeVersion="164011"/>
	<mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">
		<mc:Choice Requires="x15">
			<x15ac:absPath url="\path\to\file" xmlns:x15ac="http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac"/>
		</mc:Choice>
	</mc:AlternateContent>
	<bookViews>
		<workbookView xWindow="3720" yWindow="0" windowWidth="27870" windowHeight="12795"/>
	</bookViews>
	<sheets>
		<sheet name="Sheet1" sheetId="1" r:id="rId1"/>
	</sheets>
	<calcPr calcId="171027"/>
	<extLst>
		<ext uri="{140A7094-0E35-4892-8432-C4D2E57EDEB5}" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main">
			<x15:workbookPr chartTrackingRefBase="1"/>
		</ext>
	</extLst>
</workbook>
// */

}, function(modId) { var map = {"./externals":1711202881109,"./regexify":1711202881111,"./blank":1711202881112,"./xmlq":1711202881113,"./Sheet":1711202881114,"./ContentTypes":1711202881129,"./AppProperties":1711202881130,"./CoreProperties":1711202881131,"./Relationships":1711202881127,"./SharedStrings":1711202881132,"./StyleSheet":1711202881133,"./Encryptor":1711202881134,"./XmlParser":1711202881135,"./XmlBuilder":1711202881136,"./ArgHandler":1711202881116,"./addressConverter":1711202881117}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881111, function(require, module, exports) {


const _ = require("lodash");

/**
 * Convert a pattern to a RegExp.
 * @param {RegExp|string} pattern - The pattern to convert.
 * @returns {RegExp} The regex.
 * @private
 */
module.exports = pattern => {
    if (typeof pattern === "string") {
        pattern = new RegExp(_.escapeRegExp(pattern), "igm");
    }

    pattern.lastIndex = 0;

    return pattern;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881112, function(require, module, exports) {


// Export as a function as proxyquireify has trouble with constant exports.
module.exports = () => Buffer.from("UEsDBBQAAAAIAAAAIQC1VTAj7AAAAEwCAAALAAAAX3JlbHMvLnJlbHONks1OwzAMgO9IvEPk++puSAihpbsgpN0QKg9gEvdHbeMoCdC9PeGAoNIYPcaxP3+2vD/M06jeOcRenIZtUYJiZ8T2rtXwUj9u7kDFRM7SKI41nDjCobq+2j/zSCkXxa73UWWKixq6lPw9YjQdTxQL8ezyTyNhopSfoUVPZqCWcVeWtxh+M6BaMNXRaghHewOqPnlew5am6Q0/iHmb2KUzLZDnxM6y3fiQ60Pq8zSqptBy0mDFPOVwRPK+yGjA80a79UZ/T4sTJ7KUCI0EvuzzlXFJaLte6P8VLTN+bOYRPyQMryLDtwsubqD6BFBLAwQUAAAACAAAACEA3kEW2XsBAAARAwAAEAAAAGRvY1Byb3BzL2FwcC54bWydkkFP4zAQhe9I/IfId+oElhWqHCNUQBwWbaUWOBtn0lg4tuUZopZfj5OqIV32xO3NzNPLlxmL621rsw4iGu9KVsxyloHTvjJuU7Kn9f3ZFcuQlKuU9Q5KtgNk1/L0RCyjDxDJAGYpwmHJGqIw5xx1A63CWRq7NKl9bBWlMm64r2uj4dbr9xYc8fM8/81hS+AqqM7CGMj2ifOOfhpaed3z4fN6F1KeFDchWKMVpb+Uj0ZHj76m7G6rwQo+HYoUtAL9Hg3tZC74tBQrrSwsUrCslUUQ/KshHkD1S1sqE1GKjuYdaPIxQ/OR1nbOsleF0OOUrFPRKEdsb9sXg7YBKcoXH9+wASAUfGwOcuqdavNLFoMhiWMjH0GSPkZcG7KAf+ulivQf4mJKPDCwCeOq5yu+8R2+9E/2wrdBubRAPqo/xr3hU1j7W0VwWOdxU6waFaFKFxjXPTbEQ+KKtvcvGuU2UB083wf98Z/3L1wWl7P8Is+Hmx96gn+9ZfkJUEsDBBQAAAAIAOehdkc+qGWw1QAAAG0BAAARAAAAZG9jUHJvcHMvY29yZS54bWxtkE1Lw0AQhu9C/0PYezKJBZGQpDdPCkIVvA67Y7qY/WBnNO2/7zZoFOxxeJ95mHm73dFNxRcltsH3qqlqVZDXwVg/9ur15aG8VwULeoNT8NSrE7HaDZubTsdWh0TPKURKYomLbPLc6tirg0hsAVgfyCFXmfA5fA/JoeQxjRBRf+BIcFvXd+BI0KAgXIRlXI3qW2n0qoyfaVoERgNN5MgLQ1M18MsKJcdXF5bkD+msnCJdRX/ClT6yXcF5nqt5u6D5/gbenh73y6ul9ZeuNKmhg38FDWdQSwMEFAAAAAAA2aF2RwAAAAAAAAAAAAAAAAkAAAB4bC9fcmVscy9QSwMEFAAAAAgAAAAhAI2H2nDaAAAALQIAABoAAAB4bC9fcmVscy93b3JrYm9vay54bWwucmVsc62R3YrCMBCF7xf2HcLcb9NWWGQx9UYWeiv1AUI6/cE2CZlZtW9vXMEfEPHCq+FMmO+cySyWh3EQOwzUO6sgS1IQaI2re9sq2FS/X3MQxNrWenAWFUxIsCw+PxZrHDTHIep6TyJSLCnomP2PlGQ6HDUlzqONL40Lo+YoQyu9NlvdoszT9FuGWwYUd0xR1gpCWc9AVJPHV9iuaXqDK2f+RrT8wEIST0NcQFQ6tMgKzjqJHJCP7fN32nOcxav7vzw3s2cZsndm2LuwpQ6RrzkurfhBp3IJI++OXBwBUEsDBBQAAAAIAAAAIQDeI/LTbgIAALEFAAANAAAAeGwvc3R5bGVzLnhtbKWUXWvbMBSG7wf7D0L3rmw3zpJguyxNDYVuDJrBbhVbTkT1YSSlSzb233tkO7FDxzbWK53z6ug5rz7s9OYgBXpmxnKtMhxdhRgxVeqKq22Gv66LYIaRdVRVVGjFMnxkFt/k79+l1h0Fe9wx5hAglM3wzrlmQYgtd0xSe6UbpmCm1kZSB6nZEtsYRivrF0lB4jCcEkm5wh1hIct/gUhqnvZNUGrZUMc3XHB3bFkYyXJxv1Xa0I0Aq4doQssTu01e4SUvjba6dleAI7quecleu5yTOQFSntZaOYtKvVcOzgrQHrp4Uvq7KvyUF7uqPLU/0DMVoESY5GmphTbIQVfmi0BRVLKu4pYKvjHcizWVXBw7OfZCa7Svkxy25kXSdWgHC4u4EGdXMe6EPIXTccyoAhLUx+tjA+0VXGSHaev+Ur019BjFyWhBO0DfjTYVPJzhPE5SngpWO1hg+HbnR6cb4iedg1PO04rTrVZUeORpRR8AtmRCPPrH9a2+YB9qpPaykO6+yjA8U7/7UwiG+rDDdInnj2kd+81YdKgv+Wd02+iCflaRv+8Mf/YPWQwItNlz4bj6jWFgVofBazvr/Mu+7AKMitV0L9z6PJnhIf7EKr6X8bnqC3/Wrq8a4gd/U9HU92AH92BdO6K94Rn+ebf8MF/dFXEwC5ezYHLNkmCeLFdBMrldrlbFPIzD21+jD+0Nn1n7O4BLiSYLK6DK9JvtzT8OWoZHSWe/PT+wPfY+j6fhxyQKg+I6jILJlM6C2fQ6CYokilfTyfIuKZKR9+T/vEchiaLBfLJwXDLBFbu0vx6rcEmQ/mET5HQTZPjX5i9QSwMEFAAAAAAA2aF2RwAAAAAAAAAAAAAAAAkAAAB4bC90aGVtZS9QSwMEFAAAAAgAAAAhAIuCblj1BQAAjhoAABMAAAB4bC90aGVtZS90aGVtZTEueG1s7VlPjxs1FL8j8R2suafzfyZZNVslk6SF7rZVd1vUozNxMm4842js7G5UVULtEQkJURAXJG4cEFCplbiUT7NQBEXqV8DjyR9P4tCFbqWCmkjJ+Pn3nn9+7/nZM3Px0klKwBHKGaZZ07AvWAZAWUwHOBs1jVuHvVrdAIzDbAAJzVDTmCFmXNp9/72LcIcnKEVA6GdsBzaNhPPJjmmyWIghu0AnKBN9Q5qnkItmPjIHOTwWdlNiOpYVmCnEmQEymAqz14dDHCNwWJg0dhfGu0T8ZJwVgpjkB7EcUdWQ2MHYLv7YjEUkB0eQNA0xzoAeH6ITbgACGRcdTcOSH8PcvWgulQjfoqvo9eRnrjdXGIwdqZeP+ktFz/O9oLW075T2N3HdsBt0g6U9CYBxLGZqb2D9dqPd8edYBVReamx3wo5rV/CKfXcD3/KLbwXvrvDeBr7Xi1Y+VEDlpa/xSehEXgXvr/DBBj60Wh0vrOAlKCE4G2+gLT9wo8Vsl5AhJVe08Ibv9UJnDl+hTCW7Sv2Mb8u1FN6leU8AZHAhxxngswkawljgIkhwP8dgD48SkXgTmFEmxJZj9SxX/BZfT15Jj8AdBBXtUhSzDVHBB7A4xxPeND4UVg0F8vLZ9y+fPQEvnz0+ffD09MFPpw8fnj74UaN4BWYjVfHFt5/9+fXH4I8n37x49IUez1T8rz988svPn+uBXAU+//Lxb08fP//q09+/e6SBt3LYV+GHOEUMXEPH4CZNxdw0A6B+/s80DhOIKxowEUgNsMuTCvDaDBIdro2qzrudiyKhA16e3q1wPUjyKcca4NUkrQD3KSVtmmunc7UYS53ONBvpB8+nKu4mhEe6saO10HanE5HtWGcySlCF5g0iog1HKEMcFH10jJBG7Q7GFb/u4zinjA45uINBG2KtSw5xn+uVruBUxGWmIyhCXfHN/m3QpkRnvoOOqkixICDRmUSk4sbLcMphqmUMU6Ii9yBPdCQPZnlccTjjItIjRCjoDhBjOp3r+axC96ooLvqw75NZWkXmHI91yD1IqYrs0HGUwHSi5YyzRMV+wMYiRSG4QbmWBK2ukKIt4gCzreG+jVEl3K9e1rdEXdUnSNEzzXVLAtHqepyRIUTSuLlWzVOcvbK0rxV1/11R1xf1Vo61S2u9lG/D/QcLeAdOsxtIrBkN9F39fle///f1e9taPv+qvSrUZqmonN3TrUf3ISbkgM8I2mOyxDMxvUFPCGVDKi3vFCaJuJwPV8GNciivQU75R5gnBwmciGFsOcKIzU2PGJhQJjYJY6vtooNM0306KKW2vbg5FQqQr+Rik1nIxZbES2kQru7CluZla8RUAr40enYSymBVEq6GROiejYRtnReLhoZF3f47FqYSFbH+ACyea/heyUjkGyRoUMSp1F9E99wjvc2Z1Wk7muk1vLM5+QyRrpBQ0q1KQknDBA7QuvicY91YhbRCz9HSCOtvItbmZm0gWbUFjsWac31hJoaTpjEUx0NxmU6EPVbUTUhGWdOI+dzR/6ayTHLGO5AlJUx2lfNPMUc5IDgVua6GgWQrbrYTWm8vuYb19nnOXA8yGg5RzLdIVk3RVxrR9r4muGjQqSB9kAyOQZ9M85tQOMoP7cKBA8z40psDnCvJvfLiWrmaL8XKQ7PVEoVkksD5jqIW8xIur5d0lHlIpuuzqrbnk+mPeuex675aqehQiuaWDSTcWsXe3CavsHL1rHxtrWvUl1L9LvH6G4JCra6n5uqpWVuoneOBQBku2OK35R5x3rvBetaayrlStjbeTtD+XZH5HXFcnRLOJFV0Iu4RosVz5bISSOmiupxwMM1x07hn+S0vcvyoZtX9bs1zPatW91tureX7rt31bavTdu4Lp/Aktf1y7J64nyGz+csXKd94AZMujtkXYpqaVJ6DTaksX8DYzvYXMAALz9wLnF7DbbSDWsNt9Wpep12vNaKgXesEUdjpdSK/3ujdN8CRBHstN/KCbr0W2FFU8wKroF9v1ELPcVpe2Kp3vdb9ua/FzBf/C/dKXrt/AVBLAwQUAAAACAAAACEAfDzuwy4CAACbBAAADwAAAHhsL3dvcmtib29rLnhtbK2UTY+bMBCG75X6H5DvhI9AN0Ehq81H1UjVarXN7l5yccwQ3Bib2qZJVPW/d4CSps1lK+0Fj8344Z13bCa3x1I430EbrmRKgoFPHJBMZVzuUvK0/uiOiGMslRkVSkJKTmDI7fT9u8lB6f1Wqb2DAGlSUlhbJZ5nWAElNQNVgcQ3udIltTjVO89UGmhmCgBbCi/0/Q9eSbkkHSHRr2GoPOcMForVJUjbQTQIalG+KXhlelrJXoMrqd7XlctUWSFiywW3pxZKnJIlq51Umm4Fln0M4p6M4RW65Ewro3I7QNRvkVf1Br4XBF3J00nOBTx3tju0qu5p2XxFEEdQY5cZt5ClBGUIdYC/FnRdzWoucBJEUegTb3puxYN2MshpLewaZfV4TIyHYRg2mVjUnbCgJbUwV9Kih2/kV8ueFwoLdx7hW801mM626QSflCV0ax6oLZxai5TMk82TQX2b7KsqpFFyM1cZbI7CHN1KVTV2FDaCbzcXrtNrif/hO2WNAd5ZZRf/68Z00hj5zOFg/vjaTJ3jC5eZOqRkPMQ7cupnGB/a8IVntkhJOPRvzmufgO8Kiw3wh12nvAt6K7AfHdkegC9NHOCNa8ZV02NseMIx0KssaAn9NkYFw4Y3Q5sYh3HQZsDRfja2HdFrnpIfQeTf3fjjyPWXw9iNRuPQHUXD0J1Hi3AZ3ywXy1n8822PN1KSi2PJCqrtWlO2x//KI+QzaqAprikIdXbPVrXX75r+AlBLAwQUAAAAAADZoXZHAAAAAAAAAAAAAAAADgAAAHhsL3dvcmtzaGVldHMvUEsDBBQAAAAIAAAAIQDmVajjXQEAAIQCAAAYAAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sjZJPawIxEMXvhX6HkLtGbW2ruEpBpB4Kpf/u2ezsbjDJLMlY9dt3dq1S8OJtXibz471JZou9d+IHYrIYMjnsD6SAYLCwocrk1+eq9yRFIh0K7TBAJg+Q5GJ+ezPbYdykGoAEE0LKZE3UTJVKpgavUx8bCNwpMXpNLGOlUhNBF92Qd2o0GDwor22QR8I0XsPAsrQGlmi2HgIdIRGcJvafatukE82ba3Bex8226Rn0DSNy6ywdOqgU3kzXVcCoc8e598N7bU7sTlzgvTURE5bUZ9yf0cvMEzVRTJrPCssJ2rWLCGUmn4dSzWfdxW8Lu/SvFqTzD3BgCAp+Iyna3eeIm7a55qNBO6ouZldd0LcoCij11tE77l7AVjUxZMxZ2hTT4rCEZHiXjOmPxmcTS02a60ZX8KpjZUMSDsru1qMU8YjpasKmqxiZIxH6k6o5OcRW3UlRItJJtG7P/2f+C1BLAwQUAAAACAAAACEApFPFz0EBAAAIBAAAEwAAAFtDb250ZW50X1R5cGVzXS54bWytk89OAjEQxu8mvkPTK9kWPBhjWDj456gc8AFqO8s2dNumUxDe3tmCHgiKBC/b7M583+/bdjqebjrH1pDQBl/zkRhyBl4HY/2i5m/z5+qOM8zKG+WCh5pvAfl0cn01nm8jICO1x5q3Ocd7KVG30CkUIYKnShNSpzK9poWMSi/VAuTNcHgrdfAZfK5y78En40do1Mpl9rShz7skCRxy9rBr7Fk1VzE6q1Wmulx7c0Cp9gRBytKDrY04oAYujxL6ys+Ave6VtiZZA2ymUn5RHXXJjZMfIS3fQ1iK302OpAxNYzWYoFcdSQTGBMpgC5A7J8oqOmX94DS/NKMsy+ifg3z7n8iR6bxh97w8QrE5AcS8dYAXow62vZj+RibhLIWINLkJzqd/jWavriIZQcr2j0SyPh948LvQT70Bc4Qtyz2efAJQSwECFAAUAAAACAAAACEAtVUwI+wAAABMAgAACwAAAAAAAAABAAAAAAAAAAAAX3JlbHMvLnJlbHNQSwECFAAUAAAACAAAACEA3kEW2XsBAAARAwAAEAAAAAAAAAABAAAAAAAVAQAAZG9jUHJvcHMvYXBwLnhtbFBLAQIUABQAAAAIAOehdkc+qGWw1QAAAG0BAAARAAAAAAAAAAEAIAAAAL4CAABkb2NQcm9wcy9jb3JlLnhtbFBLAQIUABQAAAAAANmhdkcAAAAAAAAAAAAAAAAJAAAAAAAAAAAAEAAAAMIDAAB4bC9fcmVscy9QSwECFAAUAAAACAAAACEAjYfacNoAAAAtAgAAGgAAAAAAAAABAAAAAADpAwAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHNQSwECFAAUAAAACAAAACEA3iPy024CAACxBQAADQAAAAAAAAABAAAAAAD7BAAAeGwvc3R5bGVzLnhtbFBLAQIUABQAAAAAANmhdkcAAAAAAAAAAAAAAAAJAAAAAAAAAAAAEAAAAJQHAAB4bC90aGVtZS9QSwECFAAUAAAACAAAACEAi4JuWPUFAACOGgAAEwAAAAAAAAABAAAAAAC7BwAAeGwvdGhlbWUvdGhlbWUxLnhtbFBLAQIUABQAAAAIAAAAIQB8PO7DLgIAAJsEAAAPAAAAAAAAAAEAAAAAAOENAAB4bC93b3JrYm9vay54bWxQSwECFAAUAAAAAADZoXZHAAAAAAAAAAAAAAAADgAAAAAAAAAAABAAAAA8EAAAeGwvd29ya3NoZWV0cy9QSwECFAAUAAAACAAAACEA5lWo410BAACEAgAAGAAAAAAAAAABAAAAAABoEAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sUEsBAhQAFAAAAAgAAAAhAKRTxc9BAQAACAQAABMAAAAAAAAAAQAAAAAA+xEAAFtDb250ZW50X1R5cGVzXS54bWxQSwUGAAAAAAwADADoAgAAbRMAAAAA", "base64");

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881113, function(require, module, exports) {


const _ = require("lodash");

/**
 * XML query methods.
 * @private
 */
module.exports = {
    /**
     * Append a child to the node.
     * @param {{}} node - The parent node.
     * @param {{}} child - The child node.
     * @returns {undefined}
     */
    appendChild(node, child) {
        if (!node.children) node.children = [];
        node.children.push(child);
    },

    /**
     * Append a child if one with the given name is not found.
     * @param {{}} node - The parent node.
     * @param {string} name - The child node name.
     * @returns {{}} The child.
     */
    appendChildIfNotFound(node, name) {
        let child = this.findChild(node, name);
        if (!child) {
            child = { name, attributes: {}, children: [] };
            this.appendChild(node, child);
        }

        return child;
    },

    /**
     * Find a child with the given name.
     * @param {{}} node - The parent node.
     * @param {string} name - The name to find.
     * @returns {undefined|{}} The child if found.
     */
    findChild(node, name) {
        return _.find(node.children, { name });
    },

    /**
     * Get an attribute from a child node.
     * @param {{}} node - The parent node.
     * @param {string} name - The name of the child node.
     * @param {string} attribute - The name of the attribute.
     * @returns {undefined|*} The value of the attribute if found.
     */
    getChildAttribute(node, name, attribute) {
        const child = this.findChild(node, name);
        if (child) return child.attributes && child.attributes[attribute];
    },

    /**
     * Returns a value indicating whether the node has a child with the given name.
     * @param {{}} node - The parent node.
     * @param {string} name - The name of the child node.
     * @returns {boolean} True if found, false otherwise.
     */
    hasChild(node, name) {
        return _.some(node.children, { name });
    },

    /**
     * Insert the child after the specified node.
     * @param {{}} node - The parent node.
     * @param {{}} child - The child node.
     * @param {{}} after - The node to insert after.
     * @returns {undefined}
     */
    insertAfter(node, child, after) {
        if (!node.children) node.children = [];
        const index = node.children.indexOf(after);
        node.children.splice(index + 1, 0, child);
    },

    /**
     * Insert the child before the specified node.
     * @param {{}} node - The parent node.
     * @param {{}} child - The child node.
     * @param {{}} before - The node to insert before.
     * @returns {undefined}
     */
    insertBefore(node, child, before) {
        if (!node.children) node.children = [];
        const index = node.children.indexOf(before);
        node.children.splice(index, 0, child);
    },

    /**
     * Insert a child node in the correct order.
     * @param {{}} node - The parent node.
     * @param {{}} child - The child node.
     * @param {Array.<string>} nodeOrder - The order of the node names.
     * @returns {undefined}
     */
    insertInOrder(node, child, nodeOrder) {
        const childIndex = nodeOrder.indexOf(child.name);
        if (node.children && childIndex >= 0) {
            for (let i = childIndex + 1; i < nodeOrder.length; i++) {
                const sibling = this.findChild(node, nodeOrder[i]);
                if (sibling) {
                    this.insertBefore(node, child, sibling);
                    return;
                }
            }
        }

        this.appendChild(node, child);
    },

    /**
     * Check if the node is empty (no attributes and no children).
     * @param {{}} node - The node.
     * @returns {boolean} True if empty, false otherwise.
     */
    isEmpty(node) {
        return _.isEmpty(node.children) && _.isEmpty(node.attributes);
    },

    /**
     * Remove a child node.
     * @param {{}} node - The parent node.
     * @param {string|{}} child - The child node or name of node.
     * @returns {undefined}
     */
    removeChild(node, child) {
        if (!node.children) return;
        if (typeof child === 'string') {
            _.remove(node.children, { name: child });
        } else {
            const index = node.children.indexOf(child);
            if (index >= 0) node.children.splice(index, 1);
        }
    },

    /**
     * Set/unset the attributes on the node.
     * @param {{}} node - The node.
     * @param {{}} attributes - The attributes to set.
     * @returns {undefined}
     */
    setAttributes(node, attributes) {
        _.forOwn(attributes, (value, attribute) => {
            if (_.isNil(value)) {
                if (node.attributes) delete node.attributes[attribute];
            } else {
                if (!node.attributes) node.attributes = {};
                node.attributes[attribute] = value;
            }
        });
    },

    /**
     * Set attributes on a child node, creating the child if necessary.
     * @param {{}} node - The parent node.
     * @param {string} name - The name of the child node.
     * @param {{}} attributes - The attributes to set.
     * @returns {{}} The child.
     */
    setChildAttributes(node, name, attributes) {
        let child = this.findChild(node, name);
        _.forOwn(attributes, (value, attribute) => {
            if (_.isNil(value)) {
                if (child && child.attributes) delete child.attributes[attribute];
            } else {
                if (!child) {
                    child = { name, attributes: {}, children: [] };
                    this.appendChild(node, child);
                }

                if (!child.attributes) child.attributes = {};
                child.attributes[attribute] = value;
            }
        });

        return child;
    },

    /**
     * Remove the child node if empty.
     * @param {{}} node - The parent node.
     * @param {string|{}} child - The child or name of child node.
     * @returns {undefined}
     */
    removeChildIfEmpty(node, child) {
        if (typeof child === 'string') child = this.findChild(node, child);
        if (child && this.isEmpty(child)) this.removeChild(node, child);
    }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881114, function(require, module, exports) {


const _ = require("lodash");
const Cell = require("./Cell");
const Row = require("./Row");
const Column = require("./Column");
const Range = require("./Range");
const Relationships = require("./Relationships");
const xmlq = require("./xmlq");
const regexify = require("./regexify");
const addressConverter = require("./addressConverter");
const ArgHandler = require("./ArgHandler");
const colorIndexes = require("./colorIndexes");
const PageBreaks = require("./PageBreaks");

// Order of the nodes as defined by the spec.
const nodeOrder = [
    "sheetPr", "dimension", "sheetViews", "sheetFormatPr", "cols", "sheetData",
    "sheetCalcPr", "sheetProtection", "autoFilter", "protectedRanges", "scenarios", "autoFilter",
    "sortState", "dataConsolidate", "customSheetViews", "mergeCells", "phoneticPr",
    "conditionalFormatting", "dataValidations", "hyperlinks", "printOptions",
    "pageMargins", "pageSetup", "headerFooter", "rowBreaks", "colBreaks",
    "customProperties", "cellWatches", "ignoredErrors", "smartTags", "drawing",
    "drawingHF", "legacyDrawing", "legacyDrawingHF", "picture", "oleObjects", "controls", "webPublishItems", "tableParts",
    "extLst"
];

/**
 * A worksheet.
 */
class Sheet {
    // /**
    //  * Creates a new instance of Sheet.
    //  * @param {Workbook} workbook - The parent workbook.
    //  * @param {{}} idNode - The sheet ID node (from the parent workbook).
    //  * @param {{}} node - The sheet node.
    //  * @param {{}} [relationshipsNode] - The optional sheet relationships node.
    //  */
    constructor(workbook, idNode, node, relationshipsNode) {
        this._init(workbook, idNode, node, relationshipsNode);
    }

    /* PUBLIC */

    /**
     * Gets a value indicating whether the sheet is the active sheet in the workbook.
     * @returns {boolean} True if active, false otherwise.
     *//**
     * Make the sheet the active sheet in the workkbok.
     * @param {boolean} active - Must be set to `true`. Deactivating directly is not supported. To deactivate, you should activate a different sheet instead.
     * @returns {Sheet} The sheet.
     */
    active() {
        return new ArgHandler('Sheet.active')
            .case(() => {
                return this.workbook().activeSheet() === this;
            })
            .case('boolean', active => {
                if (!active) throw new Error("Deactivating sheet directly not supported. Activate a different sheet instead.");
                this.workbook().activeSheet(this);
                return this;
            })
            .handle(arguments);
    }

    /**
     * Get the active cell in the sheet.
     * @returns {Cell} The active cell.
     *//**
     * Set the active cell in the workbook.
     * @param {string|Cell} cell - The cell or address of cell to activate.
     * @returns {Sheet} The sheet.
     *//**
     * Set the active cell in the workbook by row and column.
     * @param {number} rowNumber - The row number of the cell.
     * @param {string|number} columnNameOrNumber - The column name or number of the cell.
     * @returns {Sheet} The sheet.
     */
    activeCell() {
        const sheetViewNode = this._getOrCreateSheetViewNode();
        let selectionNode = xmlq.findChild(sheetViewNode, "selection");
        return new ArgHandler('Sheet.activeCell')
            .case(() => {
                const cellAddress = selectionNode ? selectionNode.attributes.activeCell : "A1";
                return this.cell(cellAddress);
            })
            .case(['number', '*'], (rowNumber, columnNameOrNumber) => {
                const cell = this.cell(rowNumber, columnNameOrNumber);
                return this.activeCell(cell);
            })
            .case('*', cell => {
                if (!selectionNode) {
                    selectionNode = {
                        name: "selection",
                        attributes: {},
                        children: []
                    };

                    xmlq.appendChild(sheetViewNode, selectionNode);
                }

                if (!(cell instanceof Cell)) cell = this.cell(cell);
                selectionNode.attributes.activeCell = selectionNode.attributes.sqref = cell.address();
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets the cell with the given address.
     * @param {string} address - The address of the cell.
     * @returns {Cell} The cell.
     *//**
     * Gets the cell with the given row and column numbers.
     * @param {number} rowNumber - The row number of the cell.
     * @param {string|number} columnNameOrNumber - The column name or number of the cell.
     * @returns {Cell} The cell.
     */
    cell() {
        return new ArgHandler('Sheet.cell')
            .case('string', address => {
                const ref = addressConverter.fromAddress(address);
                if (ref.type !== 'cell') throw new Error('Sheet.cell: Invalid address.');
                return this.row(ref.rowNumber).cell(ref.columnNumber);
            })
            .case(['number', '*'], (rowNumber, columnNameOrNumber) => {
                return this.row(rowNumber).cell(columnNameOrNumber);
            })
            .handle(arguments);
    }

    /**
     * Gets a column in the sheet.
     * @param {string|number} columnNameOrNumber - The name or number of the column.
     * @returns {Column} The column.
     */
    column(columnNameOrNumber) {
        const columnNumber = typeof columnNameOrNumber === "string" ? addressConverter.columnNameToNumber(columnNameOrNumber) : columnNameOrNumber;

        // If we're already created a column for this column number, return it.
        if (this._columns[columnNumber]) return this._columns[columnNumber];

        // We need to create a new column, which requires a backing col node. There may already exist a node whose min/max cover our column.
        // First, see if there is an existing col node.
        const existingColNode = this._colNodes[columnNumber];

        let colNode;
        if (existingColNode) {
            // If the existing node covered earlier columns than the new one, we need to have a col node to cover the min up to our new node.
            if (existingColNode.attributes.min < columnNumber) {
                // Clone the node and set the max to the column before our new col.
                const beforeColNode = _.cloneDeep(existingColNode);
                beforeColNode.attributes.max = columnNumber - 1;

                // Update the col nodes cache.
                for (let i = beforeColNode.attributes.min; i <= beforeColNode.attributes.max; i++) {
                    this._colNodes[i] = beforeColNode;
                }
            }

            // Make a clone for the new column. Set the min/max to the column number and cache it.
            colNode = _.cloneDeep(existingColNode);
            colNode.attributes.min = columnNumber;
            colNode.attributes.max = columnNumber;
            this._colNodes[columnNumber] = colNode;

            // If the max of the existing node is greater than the nre one, create a col node for that too.
            if (existingColNode.attributes.max > columnNumber) {
                const afterColNode = _.cloneDeep(existingColNode);
                afterColNode.attributes.min = columnNumber + 1;
                for (let i = afterColNode.attributes.min; i <= afterColNode.attributes.max; i++) {
                    this._colNodes[i] = afterColNode;
                }
            }
        } else {
            // The was no existing node so create a new one.
            colNode = {
                name: 'col',
                attributes: {
                    min: columnNumber,
                    max: columnNumber
                },
                children: []
            };

            this._colNodes[columnNumber] = colNode;
        }

        // Create the new column and cache it.
        const column = new Column(this, colNode);
        this._columns[columnNumber] = column;
        return column;
    }

    /**
     * Gets a defined name scoped to the sheet.
     * @param {string} name - The defined name.
     * @returns {undefined|string|Cell|Range|Row|Column} What the defined name refers to or undefined if not found. Will return the string formula if not a Row, Column, Cell, or Range.
     *//**
     * Set a defined name scoped to the sheet.
     * @param {string} name - The defined name.
     * @param {string|Cell|Range|Row|Column} refersTo - What the name refers to.
     * @returns {Workbook} The workbook.
     */
    definedName() {
        return new ArgHandler("Workbook.definedName")
            .case('string', name => {
                return this.workbook().scopedDefinedName(this, name);
            })
            .case(['string', '*'], (name, refersTo) => {
                this.workbook().scopedDefinedName(this, name, refersTo);
                return this;
            })
            .handle(arguments);
    }

    /**
     * Deletes the sheet and returns the parent workbook.
     * @returns {Workbook} The workbook.
     */
    delete() {
        this.workbook().deleteSheet(this);
        return this.workbook();
    }

    /**
     * Find the given pattern in the sheet and optionally replace it.
     * @param {string|RegExp} pattern - The pattern to look for. Providing a string will result in a case-insensitive substring search. Use a RegExp for more sophisticated searches.
     * @param {string|function} [replacement] - The text to replace or a String.replace callback function. If pattern is a string, all occurrences of the pattern in each cell will be replaced.
     * @returns {Array.<Cell>} The matching cells.
     */
    find(pattern, replacement) {
        pattern = regexify(pattern);

        let matches = [];
        this._rows.forEach(row => {
            if (!row) return;
            matches = matches.concat(row.find(pattern, replacement));
        });

        return matches;
    }

    /**
     * Gets a value indicating whether this sheet's grid lines are visible.
     * @returns {boolean} True if selected, false if not.
     *//**
     * Sets whether this sheet's grid lines are visible.
     * @param {boolean} selected - True to make visible, false to hide.
     * @returns {Sheet} The sheet.
     */
    gridLinesVisible() {
        const sheetViewNode = this._getOrCreateSheetViewNode();
        return new ArgHandler('Sheet.gridLinesVisible')
            .case(() => {
                return sheetViewNode.attributes.showGridLines === 1 || sheetViewNode.attributes.showGridLines === undefined;
            })
            .case('boolean', visible => {
                sheetViewNode.attributes.showGridLines = visible ? 1 : 0;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets a value indicating if the sheet is hidden or not.
     * @returns {boolean|string} True if hidden, false if visible, and 'very' if very hidden.
     *//**
     * Set whether the sheet is hidden or not.
     * @param {boolean|string} hidden - True to hide, false to show, and 'very' to make very hidden.
     * @returns {Sheet} The sheet.
     */
    hidden() {
        return new ArgHandler('Sheet.hidden')
            .case(() => {
                if (this._idNode.attributes.state === 'hidden') return true;
                if (this._idNode.attributes.state === 'veryHidden') return "very";
                return false;
            })
            .case('*', hidden => {
                if (hidden) {
                    const visibleSheets = _.filter(this.workbook().sheets(), sheet => !sheet.hidden());
                    if (visibleSheets.length === 1 && visibleSheets[0] === this) {
                        throw new Error("This sheet may not be hidden as a workbook must contain at least one visible sheet.");
                    }

                    // If activate, activate the first other visible sheet.
                    if (this.active()) {
                        const activeIndex = visibleSheets[0] === this ? 1 : 0;
                        visibleSheets[activeIndex].active(true);
                    }
                }

                if (hidden === 'very') this._idNode.attributes.state = 'veryHidden';
                else if (hidden) this._idNode.attributes.state = 'hidden';
                else delete this._idNode.attributes.state;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Move the sheet.
     * @param {number|string|Sheet} [indexOrBeforeSheet] The index to move the sheet to or the sheet (or name of sheet) to move this sheet before. Omit this argument to move to the end of the workbook.
     * @returns {Sheet} The sheet.
     */
    move(indexOrBeforeSheet) {
        this.workbook().moveSheet(this, indexOrBeforeSheet);
        return this;
    }

    /**
     * Get the name of the sheet.
     * @returns {string} The sheet name.
     *//**
     * Set the name of the sheet. *Note: this method does not rename references to the sheet so formulas, etc. can be broken. Use with caution!*
     * @param {string} name - The name to set to the sheet.
     * @returns {Sheet} The sheet.
     */
    name() {
        return new ArgHandler('Sheet.name')
            .case(() => {
                return `${this._idNode.attributes.name}`;
            })
            .case('string', name => {
                this._idNode.attributes.name = name;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets a range from the given range address.
     * @param {string} address - The range address (e.g. 'A1:B3').
     * @returns {Range} The range.
     *//**
     * Gets a range from the given cells or cell addresses.
     * @param {string|Cell} startCell - The starting cell or cell address (e.g. 'A1').
     * @param {string|Cell} endCell - The ending cell or cell address (e.g. 'B3').
     * @returns {Range} The range.
     *//**
     * Gets a range from the given row numbers and column names or numbers.
     * @param {number} startRowNumber - The starting cell row number.
     * @param {string|number} startColumnNameOrNumber - The starting cell column name or number.
     * @param {number} endRowNumber - The ending cell row number.
     * @param {string|number} endColumnNameOrNumber - The ending cell column name or number.
     * @returns {Range} The range.
     */
    range() {
        return new ArgHandler('Sheet.range')
            .case('string', address => {
                const ref = addressConverter.fromAddress(address);
                if (ref.type !== 'range') throw new Error('Sheet.range: Invalid address');
                return this.range(ref.startRowNumber, ref.startColumnNumber, ref.endRowNumber, ref.endColumnNumber);
            })
            .case(['*', '*'], (startCell, endCell) => {
                if (typeof startCell === "string") startCell = this.cell(startCell);
                if (typeof endCell === "string") endCell = this.cell(endCell);
                return new Range(startCell, endCell);
            })
            .case(['number', '*', 'number', '*'], (startRowNumber, startColumnNameOrNumber, endRowNumber, endColumnNameOrNumber) => {
                return this.range(this.cell(startRowNumber, startColumnNameOrNumber), this.cell(endRowNumber, endColumnNameOrNumber));
            })
            .handle(arguments);
    }

    /**
     * Unsets sheet autoFilter.
     * @returns {Sheet} This sheet.
     *//**
     * Sets sheet autoFilter to a Range.
     * @param {Range} range - The autoFilter range.
     * @returns {Sheet} This sheet.
     */
    autoFilter(range) {
        this._autoFilter = range;

        return this;
    }

    /**
     * Gets the row with the given number.
     * @param {number} rowNumber - The row number.
     * @returns {Row} The row with the given number.
     */
    row(rowNumber) {
        if (rowNumber < 1) throw new RangeError(`Invalid row number ${rowNumber}. Remember that spreadsheets use 1-based indexing.`);

        if (this._rows[rowNumber]) return this._rows[rowNumber];

        const rowNode = {
            name: 'row',
            attributes: {
                r: rowNumber
            },
            children: []
        };

        const row = new Row(this, rowNode);
        this._rows[rowNumber] = row;
        return row;
    }

    /**
     * Get the tab color. (See style [Color](#color).)
     * @returns {undefined|Color} The color or undefined if not set.
     *//**
     * Sets the tab color. (See style [Color](#color).)
     * @returns {Color|string|number} color - Color of the tab. If string, will set an RGB color. If number, will set a theme color.
     */
    tabColor() {
        return new ArgHandler("Sheet.tabColor")
            .case(() => {
                const tabColorNode = xmlq.findChild(this._sheetPrNode, "tabColor");
                if (!tabColorNode) return;

                const color = {};
                if (tabColorNode.attributes.hasOwnProperty('rgb')) color.rgb = tabColorNode.attributes.rgb;
                else if (tabColorNode.attributes.hasOwnProperty('theme')) color.theme = tabColorNode.attributes.theme;
                else if (tabColorNode.attributes.hasOwnProperty('indexed')) color.rgb = colorIndexes[tabColorNode.attributes.indexed];

                if (tabColorNode.attributes.hasOwnProperty('tint')) color.tint = tabColorNode.attributes.tint;

                return color;
            })
            .case("string", rgb => this.tabColor({ rgb }))
            .case("integer", theme => this.tabColor({ theme }))
            .case("nil", () => {
                xmlq.removeChild(this._sheetPrNode, "tabColor");
                return this;
            })
            .case("object", color => {
                const tabColorNode = xmlq.appendChildIfNotFound(this._sheetPrNode, "tabColor");
                xmlq.setAttributes(tabColorNode, {
                    rgb: color.rgb && color.rgb.toUpperCase(),
                    indexed: null,
                    theme: color.theme,
                    tint: color.tint
                });

                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets a value indicating whether this sheet is selected.
     * @returns {boolean} True if selected, false if not.
     *//**
     * Sets whether this sheet is selected.
     * @param {boolean} selected - True to select, false to deselected.
     * @returns {Sheet} The sheet.
     */
    tabSelected() {
        const sheetViewNode = this._getOrCreateSheetViewNode();
        return new ArgHandler('Sheet.tabSelected')
            .case(() => {
                return sheetViewNode.attributes.tabSelected === 1;
            })
            .case('boolean', selected => {
                if (selected) sheetViewNode.attributes.tabSelected = 1;
                else delete sheetViewNode.attributes.tabSelected;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets a value indicating whether this sheet is rtl (Right To Left).
     * @returns {boolean} True if rtl, false if ltr.
     *//**
     * Sets whether this sheet is rtl.
     * @param {boolean} rtl - True to rtl, false to ltr (Left To Right).
     * @returns {Sheet} The sheet.
     */
    rightToLeft() {
        const sheetViewNode = this._getOrCreateSheetViewNode();
        return new ArgHandler('Sheet.rightToLeft')
            .case(() => {
                return sheetViewNode.attributes.rightToLeft;
            })
            .case('boolean', rtl => {
                if (rtl) sheetViewNode.attributes.rightToLeft = true;
                else delete sheetViewNode.attributes.rightToLeft;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Get the range of cells in the sheet that have contained a value or style at any point. Useful for extracting the entire sheet contents.
     * @returns {Range|undefined} The used range or undefined if no cells in the sheet are used.
     */
    usedRange() {
        const minRowNumber = _.findIndex(this._rows);
        const maxRowNumber = this._rows.length - 1;

        let minColumnNumber = 0;
        let maxColumnNumber = 0;
        for (let i = 0; i < this._rows.length; i++) {
            const row = this._rows[i];
            if (!row) continue;

            const minUsedColumnNumber = row.minUsedColumnNumber();
            const maxUsedColumnNumber = row.maxUsedColumnNumber();
            if (minUsedColumnNumber > 0 && (!minColumnNumber || minUsedColumnNumber < minColumnNumber)) minColumnNumber = minUsedColumnNumber;
            if (maxUsedColumnNumber > 0 && (!maxColumnNumber || maxUsedColumnNumber > maxColumnNumber)) maxColumnNumber = maxUsedColumnNumber;
        }

        // Return undefined if nothing in the sheet is used.
        if (minRowNumber <= 0 || minColumnNumber <= 0 || maxRowNumber <= 0 || maxColumnNumber <= 0) return;

        return this.range(minRowNumber, minColumnNumber, maxRowNumber, maxColumnNumber);
    }

    /**
     * Gets the parent workbook.
     * @returns {Workbook} The parent workbook.
     */
    workbook() {
        return this._workbook;
    }

    /**
     * Gets all page breaks.
     * @returns {{}} the object holds both vertical and horizontal PageBreaks.
     */
    pageBreaks() {
        return this._pageBreaks;
    }

    /**
     * Gets the vertical page breaks.
     * @returns {PageBreaks} vertical PageBreaks.
     */
    verticalPageBreaks() {
        return this._pageBreaks.colBreaks;
    }

    /**
     * Gets the horizontal page breaks.
     * @returns {PageBreaks} horizontal PageBreaks.
     */
    horizontalPageBreaks() {
        return this._pageBreaks.rowBreaks;
    }

    /* INTERNAL */

    /**
     * Clear cells that are using a given shared formula ID.
     * @param {number} sharedFormulaId - The shared formula ID.
     * @returns {undefined}
     * @ignore
     */
    clearCellsUsingSharedFormula(sharedFormulaId) {
        this._rows.forEach(row => {
            if (!row) return;
            row.clearCellsUsingSharedFormula(sharedFormulaId);
        });
    }

    /**
     * Get an existing column style ID.
     * @param {number} columnNumber - The column number.
     * @returns {undefined|number} The style ID.
     * @ignore
     */
    existingColumnStyleId(columnNumber) {
        // This will work after setting Column.style because Column updates the attributes live.
        const colNode = this._colNodes[columnNumber];
        return colNode && colNode.attributes.style;
    }

    /**
     * Call a callback for each column number that has a node defined for it.
     * @param {Function} callback - The callback.
     * @returns {undefined}
     * @ignore
     */
    forEachExistingColumnNumber(callback) {
        _.forEach(this._colNodes, (node, columnNumber) => {
            if (!node) return;
            callback(columnNumber);
        });
    }

    /**
     * Call a callback for each existing row.
     * @param {Function} callback - The callback.
     * @returns {undefined}
     * @ignore
     */
    forEachExistingRow(callback) {
        _.forEach(this._rows, (row, rowNumber) => {
            if (row) callback(row, rowNumber);
        });

        return this;
    }

    /**
     * Get the hyperlink attached to the cell with the given address.
     * @param {string} address - The address of the hyperlinked cell.
     * @returns {string|undefined} The hyperlink or undefined if not set.
     *//**
     * Set the hyperlink on the cell with the given address.
     * @param {string} address - The address of the hyperlinked cell.
     * @param {string} hyperlink - The hyperlink to set or undefined to clear.
     * @param {boolean} [internal] - The flag to force hyperlink to be internal. If true, then autodetect is skipped.
     * @returns {Sheet} The sheet.
     *//**
     * Set the hyperlink on the cell with the given address. If opts is a Cell an internal hyperlink is added.
     * @param {string} address - The address of the hyperlinked cell.
     * @param {object|Cell} opts - Options.
     * @returns {Sheet} The sheet.
     * @ignore
     *//**
     * Set the hyperlink on the cell with the given address and options.
     * @param {string} address - The address of the hyperlinked cell.
     * @param {{}|Cell} opts - Options or Cell. If opts is a Cell then an internal hyperlink is added.
     * @param {string|Cell} [opts.hyperlink] - The hyperlink to set, can be a Cell or an internal/external string.
     * @param {string} [opts.tooltip] - Additional text to help the user understand more about the hyperlink.
     * @param {string} [opts.email] - Email address, ignored if opts.hyperlink is set.
     * @param {string} [opts.emailSubject] - Email subject, ignored if opts.hyperlink is set.
     * @returns {Sheet} The sheet.
     */
    hyperlink() {
        return new ArgHandler('Sheet.hyperlink')
            .case('string', address => {
                const hyperlinkNode = this._hyperlinks[address];
                if (!hyperlinkNode) return;
                const relationship = this._relationships.findById(hyperlinkNode.attributes['r:id']);
                return relationship && relationship.attributes.Target;
            })
            .case(['string', 'nil'], address => {
                // TODO: delete relationship
                delete this._hyperlinks[address];
                return this;
            })
            .case(['string', 'string'], (address, hyperlink) => {
                return this.hyperlink(address, hyperlink, false);
            })
            .case(['string', 'string', 'boolean'], (address, hyperlink, internal) => {
                const isHyperlinkInternalAddress = internal || addressConverter.fromAddress(hyperlink);
                let nodeAttributes;
                if (isHyperlinkInternalAddress) {
                    nodeAttributes = {
                        ref: address,
                        location: hyperlink,
                        display: hyperlink
                    };
                } else {
                    const relationship = this._relationships.add("hyperlink", hyperlink, "External");
                    nodeAttributes = {
                        ref: address,
                        'r:id': relationship.attributes.Id
                    };
                }
                this._hyperlinks[address] = {
                    name: 'hyperlink',
                    attributes: nodeAttributes,
                    children: []
                };
                return this;
            })
            .case(['string', 'object'], (address, opts) => {
                if (opts instanceof Cell) {
                    const cell = opts;
                    const hyperlink = cell.address({ includeSheetName: true });
                    this.hyperlink(address, hyperlink, true);
                } else if (opts.hyperlink) {
                    this.hyperlink(address, opts.hyperlink);
                } else if (opts.email) {
                    const email = opts.email;
                    const subject = opts.emailSubject || '';
                    this.hyperlink(address, encodeURI(`mailto:${email}?subject=${subject}`));
                }
                const hyperlinkNode = this._hyperlinks[address];
                if (hyperlinkNode) {
                    if (opts.tooltip) {
                        hyperlinkNode.attributes.tooltip = opts.tooltip;
                    }
                }
                return this;
            })
            .handle(arguments);
    }

    /**
     * Increment and return the max shared formula ID.
     * @returns {number} The new max shared formula ID.
     * @ignore
     */
    incrementMaxSharedFormulaId() {
        return ++this._maxSharedFormulaId;
    }

    /**
     * Get a value indicating whether the cells in the given address are merged.
     * @param {string} address - The address to check.
     * @returns {boolean} True if merged, false if not merged.
     * @ignore
     *//**
     * Merge/unmerge cells by adding/removing a mergeCell entry.
     * @param {string} address - The address to merge.
     * @param {boolean} merged - True to merge, false to unmerge.
     * @returns {Sheet} The sheet.
     * @ignore
     */
    merged() {
        return new ArgHandler('Sheet.merge')
            .case('string', address => {
                return this._mergeCells.hasOwnProperty(address);
            })
            .case(['string', '*'], (address, merge) => {
                if (merge) {
                    this._mergeCells[address] = {
                        name: 'mergeCell',
                        attributes: { ref: address },
                        children: []
                    };
                } else {
                    delete this._mergeCells[address];
                }

                return this;
            })
            .handle(arguments);
    }


    /**
     * Gets a Object or undefined of the cells in the given address.
     * @param {string} address - The address to check.
     * @returns {object|boolean} Object or false if not set
     * @ignore
     *//**
     * Removes dataValidation at the given address
     * @param {string} address - The address to remove.
     * @param {boolean} obj - false to delete.
     * @returns {boolean} true if removed.
     * @ignore
     *//**
     * Add dataValidation to cells at the given address if object or string
     * @param {string} address - The address to set.
     * @param {object|string} obj - Object or String to set
     * @returns {Sheet} The sheet.
     * @ignore
     */
    dataValidation() {
        return new ArgHandler('Sheet.dataValidation')
            .case('string', address => {
                if (this._dataValidations[address]) {
                    return {
                        type: this._dataValidations[address].attributes.type,
                        allowBlank: this._dataValidations[address].attributes.allowBlank,
                        showInputMessage: this._dataValidations[address].attributes.showInputMessage,
                        prompt: this._dataValidations[address].attributes.prompt,
                        promptTitle: this._dataValidations[address].attributes.promptTitle,
                        showErrorMessage: this._dataValidations[address].attributes.showErrorMessage,
                        error: this._dataValidations[address].attributes.error,
                        errorTitle: this._dataValidations[address].attributes.errorTitle,
                        operator: this._dataValidations[address].attributes.operator,
                        formula1: this._dataValidations[address].children[0].children[0],
                        formula2: this._dataValidations[address].children[1] ? this._dataValidations[address].children[1].children[0] : undefined
                    };
                } else {
                    return false;
                }
            })
            .case(['string', 'boolean'], (address, obj) => {
                if (this._dataValidations[address]) {
                    if (obj === false) return delete this._dataValidations[address];
                } else {
                    return false;
                }
            })
            .case(['string', '*'], (address, obj) => {
                if (typeof obj === 'string') {
                    this._dataValidations[address] = {
                        name: 'dataValidation',
                        attributes: {
                            type: 'list',
                            allowBlank: false,
                            showInputMessage: false,
                            prompt: '',
                            promptTitle: '',
                            showErrorMessage: false,
                            error: '',
                            errorTitle: '',
                            operator: '',
                            sqref: address
                        },
                        children: [
                            {
                                name: 'formula1',
                                atrributes: {},
                                children: [obj]
                            },
                            {
                                name: 'formula2',
                                atrributes: {},
                                children: ['']
                            }
                        ]
                    };
                } else if (typeof obj === 'object') {
                    this._dataValidations[address] = {
                        name: 'dataValidation',
                        attributes: {
                            type: obj.type ? obj.type : 'list',
                            allowBlank: obj.allowBlank,
                            showInputMessage: obj.showInputMessage,
                            prompt: obj.prompt,
                            promptTitle: obj.promptTitle,
                            showErrorMessage: obj.showErrorMessage,
                            error: obj.error,
                            errorTitle: obj.errorTitle,
                            operator: obj.operator,
                            sqref: address
                        },
                        children: [
                            {
                                name: 'formula1',
                                atrributes: {},
                                children: [
                                    obj.formula1
                                ]
                            },
                            {
                                name: 'formula2',
                                atrributes: {},
                                children: [
                                    obj.formula2
                                ]
                            }
                        ]
                    };
                }
                return this;
            })
            .handle(arguments);
    }

    /**
     * Convert the sheet to a collection of XML objects.
     * @returns {{}} The XML forms.
     * @ignore
     */
    toXmls() {
        // Shallow clone the node so we don't have to remove these children later if they don't belong.
        const node = _.clone(this._node);
        node.children = node.children.slice();

        // Add the columns if needed.
        this._colsNode.children = _.filter(this._colNodes, (colNode, i) => {
            // Columns should only be present if they have attributes other than min/max.
            return colNode && i === colNode.attributes.min && Object.keys(colNode.attributes).length > 2;
        });
        if (this._colsNode.children.length) {
            xmlq.insertInOrder(node, this._colsNode, nodeOrder);
        }

        // Add the hyperlinks if needed.
        this._hyperlinksNode.children = _.values(this._hyperlinks);
        if (this._hyperlinksNode.children.length) {
            xmlq.insertInOrder(node, this._hyperlinksNode, nodeOrder);
        }

        // Add the printOptions if needed.
        if (this._printOptionsNode) {
            if (Object.keys(this._printOptionsNode.attributes).length) {
                xmlq.insertInOrder(node, this._printOptionsNode, nodeOrder);
            }
        }

        // Add the pageMargins if needed.
        if (this._pageMarginsNode && this._pageMarginsPresetName) {
            // Clone to preserve the current state of this sheet.
            const childNode = _.clone(this._pageMarginsNode);
            if (Object.keys(this._pageMarginsNode.attributes).length) {
                // Fill in any missing attribute values with presets.
                childNode.attributes = _.assign(
                    this._pageMarginsPresets[this._pageMarginsPresetName],
                    this._pageMarginsNode.attributes);
            } else {
                // No need to fill in, all attributes is currently empty, simply replace.
                childNode.attributes = this._pageMarginsPresets[this._pageMarginsPresetName];
            }
            xmlq.insertInOrder(node, childNode, nodeOrder);
        }

        // Add the merge cells if needed.
        this._mergeCellsNode.children = _.values(this._mergeCells);
        if (this._mergeCellsNode.children.length) {
            xmlq.insertInOrder(node, this._mergeCellsNode, nodeOrder);
        }

        // Add the DataValidation cells if needed.
        this._dataValidationsNode.children = _.values(this._dataValidations);
        if (this._dataValidationsNode.children.length) {
            xmlq.insertInOrder(node, this._dataValidationsNode, nodeOrder);
        }

        if (this._autoFilter) {
            xmlq.insertInOrder(node, {
                name: "autoFilter",
                children: [],
                attributes: {
                    ref: this._autoFilter.address()
                }
            }, nodeOrder);
        }

        // Add the PageBreaks nodes if needed.
        ['colBreaks', 'rowBreaks'].forEach(name => {
            const breaks = this[`_${name}Node`];
            if (breaks.attributes.count) {
                xmlq.insertInOrder(node, breaks, nodeOrder);
            }
        });

        return {
            id: this._idNode,
            sheet: node,
            relationships: this._relationships
        };
    }

    /**
     * Update the max shared formula ID to the given value if greater than current.
     * @param {number} sharedFormulaId - The new shared formula ID.
     * @returns {undefined}
     * @ignore
     */
    updateMaxSharedFormulaId(sharedFormulaId) {
        if (sharedFormulaId > this._maxSharedFormulaId) {
            this._maxSharedFormulaId = sharedFormulaId;
        }
    }

    /**
     * Get the print option given a valid print option attribute.
     * @param {string} attributeName - Attribute name of the printOptions.
     *   gridLines - Used in conjunction with gridLinesSet. If both gridLines and gridlinesSet are true, then grid lines shall print. Otherwise, they shall not (i.e., one or both have false values).
     *   gridLinesSet - Used in conjunction with gridLines. If both gridLines and gridLinesSet are true, then grid lines shall print. Otherwise, they shall not (i.e., one or both have false values).
     *   headings - Print row and column headings.
     *   horizontalCentered - Center on page horizontally when printing.
     *   verticalCentered - Center on page vertically when printing.
     * @returns {boolean}
     *//**
     * Set the print option given a valid print option attribute and a value.
     * @param {string} attributeName - Attribute name of the printOptions. See get print option for list of valid attributes.
     * @param {undefined|boolean} attributeEnabled - If `undefined` or `false` then the attribute is removed, otherwise the print option is enabled.
     * @returns {Sheet} The sheet.
     */
    printOptions() {
        const supportedAttributeNames = [
            'gridLines', 'gridLinesSet', 'headings', 'horizontalCentered', 'verticalCentered'];
        const checkAttributeName = this._getCheckAttributeNameHelper('printOptions', supportedAttributeNames);
        return new ArgHandler('Sheet.printOptions')
            .case(['string'], attributeName => {
                checkAttributeName(attributeName);
                return this._printOptionsNode.attributes[attributeName] === 1;
            })
            .case(['string', 'nil'], attributeName => {
                checkAttributeName(attributeName);
                delete this._printOptionsNode.attributes[attributeName];
                return this;
            })
            .case(['string', 'boolean'], (attributeName, attributeEnabled) => {
                checkAttributeName(attributeName);
                if (attributeEnabled) {
                    this._printOptionsNode.attributes[attributeName] = 1;
                    return this;
                } else {
                    return this.printOptions(attributeName, undefined);
                }
            })
            .handle(arguments);
    }

    /**
     * Get the print option for the gridLines attribute value.
     * @returns {boolean}
     *//**
     * Set the print option for the gridLines attribute value.
     * @param {undefined|boolean} enabled - If `undefined` or `false` then attribute is removed, otherwise gridLines is enabled.
     * @returns {Sheet} The sheet.
     */
    printGridLines() {
        return new ArgHandler('Sheet.gridLines')
            .case(() => {
                return this.printOptions('gridLines') && this.printOptions('gridLinesSet');
            })
            .case(['nil'], () => {
                this.printOptions('gridLines', undefined);
                this.printOptions('gridLinesSet', undefined);
                return this;
            })
            .case(['boolean'], enabled => {
                this.printOptions('gridLines', enabled);
                this.printOptions('gridLinesSet', enabled);
                return this;
            })
            .handle(arguments);
    }

    /**
     * Get the page margin given a valid attribute name.
     * If the value is not yet defined, then it will return the current preset value.
     * @param {string} attributeName - Attribute name of the pageMargins.
     *     left - Left Page Margin in inches.
     *     right - Right page margin in inches.
     *     top - Top Page Margin in inches.
     *     buttom - Bottom Page Margin in inches.
     *     footer - Footer Page Margin in inches.
     *     header - Header Page Margin in inches.
     * @returns {number} the attribute value.
     *//**
     * Set the page margin (or override the preset) given an attribute name and a value.
     * @param {string} attributeName - Attribute name of the pageMargins. See get page margin for list of valid attributes.
     * @param {undefined|number|string} attributeStringValue - If `undefined` then set back to preset value, otherwise, set the given attribute value.
     * @returns {Sheet} The sheet.
     */
    pageMargins() {
        if (this.pageMarginsPreset() === undefined) {
            throw new Error('Sheet.pageMargins: preset is undefined.');
        }
        const supportedAttributeNames = [
            'left', 'right', 'top', 'bottom', 'header', 'footer'];
        const checkAttributeName = this._getCheckAttributeNameHelper('pageMargins', supportedAttributeNames);
        const checkRange = this._getCheckRangeHelper('pageMargins', 0, undefined);
        return new ArgHandler('Sheet.pageMargins')
            .case(['string'], attributeName => {
                checkAttributeName(attributeName);
                const attributeValue = this._pageMarginsNode.attributes[attributeName];
                if (attributeValue !== undefined) {
                    return parseFloat(attributeValue);
                } else if (this._pageMarginsPresetName) {
                    return parseFloat(this._pageMarginsPresets[this._pageMarginsPresetName][attributeName]);
                } else {
                    return undefined;
                }
            })
            .case(['string', 'nil'], attributeName => {
                checkAttributeName(attributeName);
                delete this._pageMarginsNode.attributes[attributeName];
                return this;
            })
            .case(['string', 'number'], (attributeName, attributeNumberValue) => {
                checkAttributeName(attributeName);
                checkRange(attributeNumberValue);
                this._pageMarginsNode.attributes[attributeName] = attributeNumberValue;
                return this;
            })
            .case(['string', 'string'], (attributeName, attributeStringValue) => {
                return this.pageMargins(attributeName, parseFloat(attributeStringValue));
            })
            .handle(arguments);
    }

    /**
     * Page margins preset is a set of page margins associated with a name.
     * The page margin preset acts as a fallback when not explicitly defined by `Sheet.pageMargins`.
     * If a sheet already contains page margins, it attempts to auto-detect, otherwise they are defined as the template preset.
     * If no page margins exist, then the preset is undefined and will not be included in the output of `Sheet.toXmls`.
     * Available presets include: normal, wide, narrow, template.
     *
     * Get the page margins preset name. The registered name of a predefined set of attributes.
     * @returns {string} The preset name.
     *//**
     * Set the page margins preset by name, clearing any existing/temporary attribute values.
     * @param {undefined|string} presetName - The preset name. If `undefined`, page margins will not be included in the output of `Sheet.toXmls`.
     * @returns {Sheet} The sheet.
     *//**
     * Set a new page margins preset by name and attributes object.
     * @param {string} presetName - The preset name.
     * @param {object} presetAttributes - The preset attributes.
     * @returns {Sheet} The sheet.
     */
    pageMarginsPreset() {
        return new ArgHandler('Sheet.pageMarginsPreset')
            .case(() => {
                return this._pageMarginsPresetName;
            })
            .case(['nil'], () => {
                // Remove all preset overrides and exclude from sheet
                this._pageMarginsPresetName = undefined;

                // Remove all preset overrides
                this._pageMarginsNode.attributes = {};
                return this;
            })
            .case(['string'], presetName => {
                const checkPresetName = this._getCheckAttributeNameHelper(
                    'pageMarginsPreset', Object.keys(this._pageMarginsPresets));
                checkPresetName(presetName);

                // Change to new preset
                this._pageMarginsPresetName = presetName;

                // Remove all preset overrides
                this._pageMarginsNode.attributes = {};
                return this;
            })
            .case(['string', 'object'], (presetName, presetAttributes) => {
                if (this._pageMarginsPresets.hasOwnProperty(presetName)) {
                    throw new Error(`Sheet.pageMarginsPreset: The preset ${presetName} already exists!`);
                }

                // Validate preset attribute keys.
                const pageMarginsAttributeNames = [
                    'left', 'right', 'top', 'bottom', 'header', 'footer'];
                const isValidPresetAttributeKeys = _.isEqual(
                    _.sortBy(pageMarginsAttributeNames),
                    _.sortBy(Object.keys(presetAttributes)));
                if (isValidPresetAttributeKeys === false) {
                    throw new Error(`Sheet.pageMarginsPreset: Invalid preset attributes for one or key(s)! - "${Object.keys(presetAttributes)}"`);
                }

                // Validate preset attribute values.
                _.forEach((attributeValue, attributeName) => {
                    const attributeNumberValue = parseFloat(attributeValue);
                    if (_.isNaN(attributeNumberValue) || _.isNumber(attributeNumberValue) === false) {
                        throw new Error(`Sheet.pageMarginsPreset: Invalid preset attribute value! - "${attributeValue}"`);
                    }
                });

                // Change to new preset
                this._pageMarginsPresetName = presetName;

                // Remove all preset overrides
                this._pageMarginsNode.attributes = {};

                // Register the preset
                this._pageMarginsPresets[presetName] = presetAttributes;
                return this;
            })
            .handle(arguments);
    }

    /**
     * https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.pane?view=openxml-2.8.1
     * @typedef {Object} PaneOptions
     * @property {string} activePane=bottomRight Active Pane. The pane that is active.
     * @property {string} state Split State. Indicates whether the pane has horizontal / vertical splits,
     * and whether those splits are frozen.
     * @property {string} topLeftCell Top Left Visible Cell. Location of the top left visible cell in the bottom
     * right pane (when in Left-To-Right mode).
     * @property {number} xSplit (Horizontal Split Position) Horizontal position of the split, in 1/20th of a point;
     * 0 (zero) if none. If the pane is frozen, this value indicates the number of columns visible in the top pane.
     * @property {number} ySplit (Vertical Split Position) Vertical position of the split, in 1/20th of a point; 0
     * (zero) if none. If the pane is frozen, this value indicates the number of rows visible in the left pane.
     *//**
     * Gets sheet view pane options
     * @return {PaneOptions} sheet view pane options
     *//**
     * Sets sheet view pane options
     * @param {PaneOptions|null|undefined} paneOptions sheet view pane options
     * @return {Sheet} The sheet
     */
    panes() {
        const supportedStates = ['split', 'frozen', 'frozenSplit'];
        const supportedActivePanes = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];
        const checkStateName = this._getCheckAttributeNameHelper('pane.state', supportedStates);
        const checkActivePane = this._getCheckAttributeNameHelper('pane.activePane', supportedActivePanes);
        const sheetViewNode = this._getOrCreateSheetViewNode();
        let paneNode = xmlq.findChild(sheetViewNode, 'pane');
        return new ArgHandler('Sheet.pane')
            .case(() => {
                if (paneNode) {
                    const result = _.cloneDeep(paneNode.attributes);
                    if (!result.state) result.state = 'split';
                    return result;
                }
            })
            .case(['nil'], () => {
                xmlq.removeChild(sheetViewNode, 'pane');
                return this;
            })
            .case(['object'], paneAttributes => {
                const attributes = _.assign({ activePane: 'bottomRight' }, paneAttributes);
                checkStateName(attributes.state);
                checkActivePane(attributes.activePane);
                if (paneNode) {
                    paneNode.attributes = attributes;
                } else {
                    paneNode = {
                        name: "pane",
                        attributes,
                        children: []
                    };
                    xmlq.appendChild(sheetViewNode, paneNode);
                }
                return this;
            })
            .handle(arguments);
    }

    /**
     * Freezes Panes for this sheet.
     * @param {number} xSplit the number of columns visible in the top pane. 0 (zero) if none.
     * @param {number} ySplit the number of rows visible in the left pane. 0 (zero) if none.
     * @return {Sheet} The sheet
     *//**
     * freezes Panes for this sheet.
     * @param {string} topLeftCell Top Left Visible Cell. Location of the top left visible cell in the bottom
     * right pane (when in Left-To-Right mode).
     * @return {Sheet} The sheet
     */
    freezePanes() {
        return new ArgHandler('Sheet.feezePanes')
            .case(['integer', 'integer'], (xSplit, ySplit) => {
                const topLeftCell = addressConverter.columnNumberToName(xSplit + 1) + (ySplit + 1);
                let activePane = xSplit === 0 ? 'bottomLeft' : 'bottomRight';
                activePane = ySplit === 0 ? 'topRight' : activePane;
                return this.panes({ state: 'frozen', topLeftCell, xSplit, ySplit, activePane });
            })
            .case(['string'], topLeftCell => {
                const ref = addressConverter.fromAddress(topLeftCell);
                const xSplit = ref.columnNumber - 1, ySplit = ref.rowNumber - 1;
                let activePane = xSplit === 0 ? 'bottomLeft' : 'bottomRight';
                activePane = ySplit === 0 ? 'topRight' : activePane;
                return this.panes({ state: 'frozen', topLeftCell, xSplit, ySplit, activePane });
            })
            .handle(arguments);
    }

    /**
     * Splits Panes for this sheet.
     * @param {number} xSplit (Horizontal Split Position) Horizontal position of the split,
     * in 1/20th of a point; 0 (zero) if none.
     * @param {number} ySplit (Vertical Split Position) VVertical position of the split,
     * in 1/20th of a point; 0 (zero) if none.
     * @return {Sheet} The sheet
     */
    splitPanes(xSplit, ySplit) {
        return this.panes({ state: 'split', xSplit, ySplit });
    }

    /**
     * resets to default sheet view panes.
     * @return {Sheet} The sheet
     */
    resetPanes() {
        return this.panes(null);
    }

    /* PRIVATE */

    /**
     * Get a helper function to check that the attribute name provided is supported.
     * @param {string} functionName - Name of the parent function.
     * @param {array} supportedAttributeNames - Array of supported attribute name strings.
     * @returns {function} The helper function, which takes an attribute name. If the array of supported attribute names does not contain the given attribute name, then an Error is thrown.
     * @ignore
     */
    _getCheckAttributeNameHelper(functionName, supportedAttributeNames) {
        return attributeName => {
            if (!_.includes(supportedAttributeNames, attributeName)) {
                throw new Error(`Sheet.${functionName}: "${attributeName}" is not supported.`);
            }
        };
    }

    /**
     * Get a helper function to check that the value is of the expected type.
     * @param {string} functionName - Name of the parent function.
     * @param {string} valueType - A string produced by typeof.
     * @returns {function} The helper function, which takes a value. If the value type is not expected, a TypeError is thrown.
     * @ignore
     */
    _getCheckTypeHelper(functionName, valueType) {
        return value => {
            if (typeof value !== valueType) {
                throw new TypeError(`Sheet.${functionName}: invalid type - value must be of type ${valueType}.`);
            }
        };
    }

    /**
     * Get a helper function to check that the value is within the expected range.
     * @param {string} functionName - Name of the parent function.
     * @param {undefined|number} valueMin - The minimum value of the range. This value is range-inclusive.
     * @param {undefined|number} valueMax - The maximum value of the range. This value is range-exclusive.
     * @returns {function} The helper function, which takes a value. If the value type is not 'number', a TypeError is thrown. If the value is not within the range, a RangeError is thrown.
     * @ignore
     */
    _getCheckRangeHelper(functionName, valueMin, valueMax) {
        const checkType = this._getCheckTypeHelper(functionName, 'number');
        return value => {
            checkType(value);
            if (valueMin !== undefined) {
                if (value < valueMin) {
                    throw new RangeError(`Sheet.${functionName}: value too small - value must be greater than or equal to ${valueMin}.`);
                }
            }
            if (valueMax !== undefined) {
                if (valueMax <= value) {
                    throw new RangeError(`Sheet.${functionName}: value too large - value must be less than ${valueMax}.`);
                }
            }
        };
    }

    /**
     * Get the sheet view node if it exists or create it if it doesn't.
     * @returns {{}} The sheet view node.
     * @private
     */
    _getOrCreateSheetViewNode() {
        let sheetViewsNode = xmlq.findChild(this._node, "sheetViews");
        if (!sheetViewsNode) {
            sheetViewsNode = {
                name: "sheetViews",
                attributes: {},
                children: [{
                    name: "sheetView",
                    attributes: {
                        workbookViewId: 0
                    },
                    children: []
                }]
            };

            xmlq.insertInOrder(this._node, sheetViewsNode, nodeOrder);
        }

        return xmlq.findChild(sheetViewsNode, "sheetView");
    }

    /**
     * Initializes the sheet.
     * @param {Workbook} workbook - The parent workbook.
     * @param {{}} idNode - The sheet ID node (from the parent workbook).
     * @param {{}} node - The sheet node.
     * @param {{}} [relationshipsNode] - The optional sheet relationships node.
     * @returns {undefined}
     * @private
     */
    _init(workbook, idNode, node, relationshipsNode) {
        if (!node) {
            node = {
                name: "worksheet",
                attributes: {
                    xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
                    'xmlns:r': "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
                    'xmlns:mc': "http://schemas.openxmlformats.org/markup-compatibility/2006",
                    'mc:Ignorable': "x14ac",
                    'xmlns:x14ac': "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
                },
                children: [{
                    name: "sheetData",
                    attributes: {},
                    children: []
                }]
            };
        }

        this._workbook = workbook;
        this._idNode = idNode;
        this._node = node;
        this._maxSharedFormulaId = -1;
        this._mergeCells = {};
        this._dataValidations = {};
        this._hyperlinks = {};
        this._autoFilter = null;

        // Create the relationships.
        this._relationships = new Relationships(relationshipsNode);

        // Delete the optional dimension node
        xmlq.removeChild(this._node, "dimension");

        // Create the rows.
        this._rows = [];
        this._sheetDataNode = xmlq.findChild(this._node, "sheetData");
        this._sheetDataNode.children.forEach(rowNode => {
            const row = new Row(this, rowNode);
            this._rows[row.rowNumber()] = row;
        });
        this._sheetDataNode.children = this._rows;

        // Create the columns node.
        this._columns = [];
        this._colsNode = xmlq.findChild(this._node, "cols");
        if (this._colsNode) {
            xmlq.removeChild(this._node, this._colsNode);
        } else {
            this._colsNode = { name: 'cols', attributes: {}, children: [] };
        }

        // Cache the col nodes.
        this._colNodes = [];
        _.forEach(this._colsNode.children, colNode => {
            const min = colNode.attributes.min;
            const max = colNode.attributes.max;
            for (let i = min; i <= max; i++) {
                this._colNodes[i] = colNode;
            }
        });

        // Create the sheet properties node.
        this._sheetPrNode = xmlq.findChild(this._node, "sheetPr");
        if (!this._sheetPrNode) {
            this._sheetPrNode = { name: 'sheetPr', attributes: {}, children: [] };
            xmlq.insertInOrder(this._node, this._sheetPrNode, nodeOrder);
        }

        // Create the merge cells.
        this._mergeCellsNode = xmlq.findChild(this._node, "mergeCells");
        if (this._mergeCellsNode) {
            xmlq.removeChild(this._node, this._mergeCellsNode);
        } else {
            this._mergeCellsNode = { name: 'mergeCells', attributes: {}, children: [] };
        }

        const mergeCellNodes = this._mergeCellsNode.children;
        this._mergeCellsNode.children = [];
        mergeCellNodes.forEach(mergeCellNode => {
            this._mergeCells[mergeCellNode.attributes.ref] = mergeCellNode;
        });


        // Create the DataValidations.
        this._dataValidationsNode = xmlq.findChild(this._node, "dataValidations");
        if (this._dataValidationsNode) {
            xmlq.removeChild(this._node, this._dataValidationsNode);
        } else {
            this._dataValidationsNode = { name: 'dataValidations', attributes: {}, children: [] };
        }

        const dataValidationNodes = this._dataValidationsNode.children;
        this._dataValidationsNode.children = [];
        dataValidationNodes.forEach(dataValidationNode => {
            this._dataValidations[dataValidationNode.attributes.sqref] = dataValidationNode;
        });


        // Create the hyperlinks.
        this._hyperlinksNode = xmlq.findChild(this._node, "hyperlinks");
        if (this._hyperlinksNode) {
            xmlq.removeChild(this._node, this._hyperlinksNode);
        } else {
            this._hyperlinksNode = { name: 'hyperlinks', attributes: {}, children: [] };
        }

        const hyperlinkNodes = this._hyperlinksNode.children;
        this._hyperlinksNode.children = [];
        hyperlinkNodes.forEach(hyperlinkNode => {
            this._hyperlinks[hyperlinkNode.attributes.ref] = hyperlinkNode;
        });


        // Create the printOptions.
        this._printOptionsNode = xmlq.findChild(this._node, "printOptions");
        if (this._printOptionsNode) {
            xmlq.removeChild(this._node, this._printOptionsNode);
        } else {
            this._printOptionsNode = { name: 'printOptions', attributes: {}, children: [] };
        }


        // Create the pageMargins.
        this._pageMarginsPresets = {
            normal: {
                left: 0.7,
                right: 0.7,
                top: 0.75,
                bottom: 0.75,
                header: 0.3,
                footer: 0.3
            },
            wide: {
                left: 1,
                right: 1,
                top: 1,
                bottom: 1,
                header: 0.5,
                footer: 0.5
            },
            narrow: {
                left: 0.25,
                right: 0.25,
                top: 0.75,
                bottom: 0.75,
                header: 0.3,
                footer: 0.3
            }
        };
        this._pageMarginsNode = xmlq.findChild(this._node, "pageMargins");
        if (this._pageMarginsNode) {
            // Sheet has page margins, assume preset is template.
            this._pageMarginsPresetName = 'template';

            // Search for a preset that matches existing attributes.
            for (const presetName in this._pageMarginsPresets) {
                if (_.isEqual(this._pageMarginsNode.attributes, this._pageMarginsPresets[presetName])) {
                    this._pageMarginsPresetName = presetName;
                    break;
                }
            }

            // If template preset, then register as template preset, and clear attributes.
            if (this._pageMarginsPresetName === 'template') {
                this._pageMarginsPresets.template = this._pageMarginsNode.attributes;
                this._pageMarginsNode.attributes = {};
            }

            xmlq.removeChild(this._node, this._pageMarginsNode);
        } else {
            // Sheet has no page margins, the preset assignment is therefore undefined.
            this._pageMarginsPresetName = undefined;
            this._pageMarginsNode = { name: 'pageMargins', attributes: {}, children: [] };
        }

        // Create the pageBreaks
        ['colBreaks', 'rowBreaks'].forEach(name => {
            this[`_${name}Node`] = xmlq.findChild(this._node, name);
            if (this[`_${name}Node`]) {
                xmlq.removeChild(this._node, this[`_${name}Node`]);
            } else {
                this[`_${name}Node`] = {
                    name,
                    children: [],
                    attributes: {
                        count: 0,
                        manualBreakCount: 0
                    }
                };
            }
        });
        this._pageBreaks = {
            colBreaks: new PageBreaks(this._colBreaksNode),
            rowBreaks: new PageBreaks(this._rowBreaksNode)
        };
    }
}

module.exports = Sheet;

/*
xl/workbook.xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet ...>
    ...

    <printOptions headings="1" gridLines="1" />
    <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />
    <pageSetup orientation="portrait" horizontalDpi="0" verticalDpi="0" />
</worksheet>
// */

}, function(modId) { var map = {"./Cell":1711202881115,"./Row":1711202881124,"./Column":1711202881125,"./Range":1711202881126,"./Relationships":1711202881127,"./xmlq":1711202881113,"./regexify":1711202881111,"./addressConverter":1711202881117,"./ArgHandler":1711202881116,"./colorIndexes":1711202881121,"./PageBreaks":1711202881128}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881115, function(require, module, exports) {


const _ = require("lodash");
const ArgHandler = require("./ArgHandler");
const addressConverter = require("./addressConverter");
const dateConverter = require("./dateConverter");
const regexify = require("./regexify");
const xmlq = require("./xmlq");
const FormulaError = require("./FormulaError");
const Style = require("./Style");
const RichText = require("./RichText");

/**
 * A cell
 */
class Cell {
    // /**
    //  * Creates a new instance of cell.
    //  * @param {Row} row - The parent row.
    //  * @param {{}} node - The cell node.
    //  */
    constructor(row, node, styleId) {
        this._row = row;
        this._init(node, styleId);
    }

    /* PUBLIC */

    /**
     * Gets a value indicating whether the cell is the active cell in the sheet.
     * @returns {boolean} True if active, false otherwise.
     *//**
     * Make the cell the active cell in the sheet.
     * @param {boolean} active - Must be set to `true`. Deactivating directly is not supported. To deactivate, you should activate a different cell instead.
     * @returns {Cell} The cell.
     */
    active() {
        return new ArgHandler('Cell.active')
            .case(() => {
                return this.sheet().activeCell() === this;
            })
            .case('boolean', active => {
                if (!active) throw new Error("Deactivating cell directly not supported. Activate a different cell instead.");
                this.sheet().activeCell(this);
                return this;
            })
            .handle(arguments);
    }

    /**
     * Get the address of the column.
     * @param {{}} [opts] - Options
     * @param {boolean} [opts.includeSheetName] - Include the sheet name in the address.
     * @param {boolean} [opts.rowAnchored] - Anchor the row.
     * @param {boolean} [opts.columnAnchored] - Anchor the column.
     * @param {boolean} [opts.anchored] - Anchor both the row and the column.
     * @returns {string} The address
     */
    address(opts) {
        return addressConverter.toAddress({
            type: 'cell',
            rowNumber: this.rowNumber(),
            columnNumber: this.columnNumber(),
            sheetName: opts && opts.includeSheetName && this.sheet().name(),
            rowAnchored: opts && (opts.rowAnchored || opts.anchored),
            columnAnchored: opts && (opts.columnAnchored || opts.anchored)
        });
    }

    /**
     * Gets the parent column of the cell.
     * @returns {Column} The parent column.
     */
    column() {
        return this.sheet().column(this.columnNumber());
    }

    /**
     * Clears the contents from the cell.
     * @returns {Cell} The cell.
     */
    clear() {
        const hostSharedFormulaId = this._formulaRef && this._sharedFormulaId;

        delete this._value;
        delete this._formulaType;
        delete this._formula;
        delete this._sharedFormulaId;
        delete this._formulaRef;

        // TODO in future version: Move shared formula to some other cell. This would require parsing the formula...
        if (!_.isNil(hostSharedFormulaId)) this.sheet().clearCellsUsingSharedFormula(hostSharedFormulaId);

        return this;
    }

    /**
     * Gets the column name of the cell.
     * @returns {string} The column name.
     */
    columnName() {
        return addressConverter.columnNumberToName(this.columnNumber());
    }

    /**
     * Gets the column number of the cell (1-based).
     * @returns {number} The column number.
     */
    columnNumber() {
        return this._columnNumber;
    }

    /**
     * Find the given pattern in the cell and optionally replace it.
     * @param {string|RegExp} pattern - The pattern to look for. Providing a string will result in a case-insensitive substring search. Use a RegExp for more sophisticated searches.
     * @param {string|function} [replacement] - The text to replace or a String.replace callback function. If pattern is a string, all occurrences of the pattern in the cell will be replaced.
     * @returns {boolean} A flag indicating if the pattern was found.
     */
    find(pattern, replacement) {
        pattern = regexify(pattern);

        const value = this.value();
        if (typeof value !== 'string') return false;

        if (_.isNil(replacement)) {
            return pattern.test(value);
        } else {
            const replaced = value.replace(pattern, replacement);
            if (replaced === value) return false;
            this.value(replaced);
            return true;
        }
    }

    /**
     * Gets the formula in the cell. Note that if a formula was set as part of a range, the getter will return 'SHARED'. This is a limitation that may be addressed in a future release.
     * @returns {string} The formula in the cell.
     *//**
     * Sets the formula in the cell.
     * @param {string} formula - The formula to set.
     * @returns {Cell} The cell.
     */
    formula() {
        return new ArgHandler('Cell.formula')
            .case(() => {
                // TODO in future: Return translated formula.
                if (this._formulaType === "shared" && !this._formulaRef) return "SHARED";
                return this._formula;
            })
            .case('nil', () => {
                this.clear();
                return this;
            })
            .case('string', formula => {
                this.clear();
                this._formulaType = "normal";
                this._formula = formula;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets the hyperlink attached to the cell.
     * @returns {string|undefined} The hyperlink or undefined if not set.
     *//**
     * Set or clear the hyperlink on the cell.
     * @param {string|Cell|undefined} hyperlink - The hyperlink to set or undefined to clear.
     * @returns {Cell} The cell.
     *//**
     * Set the hyperlink options on the cell.
     * @param {{}|Cell} opts - Options or Cell. If opts is a Cell then an internal hyperlink is added.
     * @param {string|Cell} [opts.hyperlink] - The hyperlink to set, can be a Cell or an internal/external string.
     * @param {string} [opts.tooltip] - Additional text to help the user understand more about the hyperlink.
     * @param {string} [opts.email] - Email address, ignored if opts.hyperlink is set.
     * @param {string} [opts.emailSubject] - Email subject, ignored if opts.hyperlink is set.
     * @returns {Cell} The cell.
     */
    hyperlink() {
        return new ArgHandler('Cell.hyperlink')
            .case(() => {
                return this.sheet().hyperlink(this.address());
            })
            .case('string', hyperlink => {
                this.sheet().hyperlink(this.address(), hyperlink);
                return this;
            })
            .case(['object'], opts => {
                this.sheet().hyperlink(this.address(), opts);
                return this;
            })
            .handle(arguments);
    }


    /**
     * Gets the data validation object attached to the cell.
     * @returns {object|undefined} The data validation or undefined if not set.
     *//**
     * Set or clear the data validation object of the cell.
     * @param {object|undefined} dataValidation - Object or null to clear.
     * @returns {Cell} The cell.
     */
    dataValidation() {
        return new ArgHandler('Cell.dataValidation')
            .case(() => {
                return this.sheet().dataValidation(this.address());
            })
            .case('boolean', obj => {
                return this.sheet().dataValidation(this.address(), obj);
            })
            .case('*', obj => {
                this.sheet().dataValidation(this.address(), obj);
                return this;
            })
            .handle(arguments);
    }

    /**
     * Callback used by tap.
     * @callback Cell~tapCallback
     * @param {Cell} cell - The cell
     * @returns {undefined}
     *//**
     * Invoke a callback on the cell and return the cell. Useful for method chaining.
     * @param {Cell~tapCallback} callback - The callback function.
     * @returns {Cell} The cell.
     */
    tap(callback) {
        callback(this);
        return this;
    }

    /**
     * Callback used by thru.
     * @callback Cell~thruCallback
     * @param {Cell} cell - The cell
     * @returns {*} The value to return from thru.
     *//**
     * Invoke a callback on the cell and return the value provided by the callback. Useful for method chaining.
     * @param {Cell~thruCallback} callback - The callback function.
     * @returns {*} The return value of the callback.
     */
    thru(callback) {
        return callback(this);
    }

    /**
     * Create a range from this cell and another.
     * @param {Cell|string} cell - The other cell or cell address to range to.
     * @returns {Range} The range.
     */
    rangeTo(cell) {
        return this.sheet().range(this, cell);
    }

    /**
     * Returns a cell with a relative position given the offsets provided.
     * @param {number} rowOffset - The row offset (0 for the current row).
     * @param {number} columnOffset - The column offset (0 for the current column).
     * @returns {Cell} The relative cell.
     */
    relativeCell(rowOffset, columnOffset) {
        const row = rowOffset + this.rowNumber();
        const column = columnOffset + this.columnNumber();
        return this.sheet().cell(row, column);
    }

    /**
     * Gets the parent row of the cell.
     * @returns {Row} The parent row.
     */
    row() {
        return this._row;
    }

    /**
     * Gets the row number of the cell (1-based).
     * @returns {number} The row number.
     */
    rowNumber() {
        return this.row().rowNumber();
    }

    /**
     * Gets the parent sheet.
     * @returns {Sheet} The parent sheet.
     */
    sheet() {
        return this.row().sheet();
    }

    /**
     * Gets an individual style.
     * @param {string} name - The name of the style.
     * @returns {*} The style.
     *//**
     * Gets multiple styles.
     * @param {Array.<string>} names - The names of the style.
     * @returns {object.<string, *>} Object whose keys are the style names and values are the styles.
     *//**
     * Sets an individual style.
     * @param {string} name - The name of the style.
     * @param {*} value - The value to set.
     * @returns {Cell} The cell.
     *//**
     * Sets the styles in the range starting with the cell.
     * @param {string} name - The name of the style.
     * @param {Array.<Array.<*>>} - 2D array of values to set.
     * @returns {Range} The range that was set.
     *//**
     * Sets multiple styles.
     * @param {object.<string, *>} styles - Object whose keys are the style names and values are the styles to set.
     * @returns {Cell} The cell.
     *//**
     * Sets to a specific style
     * @param {Style} style - Style object given from stylesheet.createStyle
     * @returns {Cell} The cell.
     */
    style() {
        if (!this._style && !(arguments[0] instanceof Style)) {
            this._style = this.workbook().styleSheet().createStyle(this._styleId);
        }

        return new ArgHandler("Cell.style")
            .case('string', name => {
                // Get single value
                return this._style.style(name);
            })
            .case('array', names => {
                // Get list of values
                const values = {};
                names.forEach(name => {
                    values[name] = this.style(name);
                });

                return values;
            })
            .case(["string", "array"], (name, values) => {
                const numRows = values.length;
                const numCols = values[0].length;
                const range = this.rangeTo(this.relativeCell(numRows - 1, numCols - 1));
                return range.style(name, values);
            })
            .case(['string', '*'], (name, value) => {
                // Set a single value for all cells to a single value
                this._style.style(name, value);
                return this;
            })
            .case('object', nameValues => {
                // Object of key value pairs to set
                for (const name in nameValues) {
                    if (!nameValues.hasOwnProperty(name)) continue;
                    const value = nameValues[name];
                    this.style(name, value);
                }

                return this;
            })
            .case('Style', style => {
                this._style = style;
                this._styleId = style.id();

                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets the value of the cell.
     * @returns {string|boolean|number|Date|RichText|undefined} The value of the cell.
     *//**
     * Sets the value of the cell.
     * @param {string|boolean|number|null|undefined|RichText} value - The value to set.
     * @returns {Cell} The cell.
     *//**
     * Sets the values in the range starting with the cell.
     * @param {Array.<Array.<string|boolean|number|null|undefined>>} - 2D array of values to set.
     * @returns {Range} The range that was set.
     */
    value() {
        return new ArgHandler('Cell.value')
            .case(() => {
                if (this._value instanceof RichText) {
                    return this._value.getInstanceWithCellRef(this);
                }
                return this._value;
            })
            .case("array", values => {
                const numRows = values.length;
                const numCols = values[0].length;
                const range = this.rangeTo(this.relativeCell(numRows - 1, numCols - 1));
                return range.value(values);
            })
            .case('*', value => {
                this.clear();
                if (value instanceof RichText) {
                    this._value = value.copy(this);
                } else {
                    this._value = value;
                }
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets the parent workbook.
     * @returns {Workbook} The parent workbook.
     */
    workbook() {
        return this.row().workbook();
    }

    /**
     * Append horizontal page break after the cell.
     * @returns {Cell} the cell.
     */
    addHorizontalPageBreak() {
        this.row().addPageBreak();
        return this;
    }

    /* INTERNAL */

    /**
     * Gets the formula if a shared formula ref cell.
     * @returns {string|undefined} The formula.
     * @ignore
     */
    getSharedRefFormula() {
        return this._formulaType === "shared" ? this._formulaRef && this._formula : undefined;
    }

    /**
     * Check if this cell uses a given shared a formula ID.
     * @param {number} id - The shared formula ID.
     * @returns {boolean} A flag indicating if shared.
     * @ignore
     */
    sharesFormula(id) {
        return this._formulaType === "shared" && this._sharedFormulaId === id;
    }

    /**
     * Set a shared formula on the cell.
     * @param {number} id - The shared formula index.
     * @param {string} [formula] - The formula (if the reference cell).
     * @param {string} [sharedRef] - The address of the shared range (if the reference cell).
     * @returns {undefined}
     * @ignore
     */
    setSharedFormula(id, formula, sharedRef) {
        this.clear();

        this._formulaType = "shared";
        this._sharedFormulaId = id;
        this._formula = formula;
        this._formulaRef = sharedRef;
    }

    /**
     * Convert the cell to an XML object.
     * @returns {{}} The XML form.
     * @ignore
     */
    toXml() {
        // Create a node.
        const node = {
            name: 'c',
            attributes: this._remainingAttributes || {}, // Start with any remaining attributes we don't current handle.
            children: []
        };

        // Set the address.
        node.attributes.r = this.address();

        if (!_.isNil(this._formulaType)) {
            // Add the formula.
            const fNode = {
                name: 'f',
                attributes: this._remainingFormulaAttributes || {}
            };

            if (this._formulaType !== "normal") fNode.attributes.t = this._formulaType;
            if (!_.isNil(this._formulaRef)) fNode.attributes.ref = this._formulaRef;
            if (!_.isNil(this._sharedFormulaId)) fNode.attributes.si = this._sharedFormulaId;
            if (!_.isNil(this._formula)) fNode.children = [this._formula];

            node.children.push(fNode);
        } else if (!_.isNil(this._value)) {
            // Add the value. Don't emit value if a formula is set as Excel will show this stale value.
            let type, text;
            if (typeof this._value === "string") {
                type = "s";
                text = this.workbook().sharedStrings().getIndexForString(this._value);
            } else if (typeof this._value === "boolean") {
                type = "b";
                text = this._value ? 1 : 0;
            } else if (typeof this._value === "number") {
                text = this._value;
            } else if (this._value instanceof Date) {
                text = dateConverter.dateToNumber(this._value);
            } else if (this._value instanceof RichText || typeof this._value === "object" && this._value.constructor.name === "RichText") { // Hack to make Jasmine test work
                type = "s";
                text = this.workbook().sharedStrings().getIndexForString(this._value.toXml());
            }

            if (type) node.attributes.t = type;
            const vNode = { name: 'v', children: [text] };
            node.children.push(vNode);
        }

        // If the style is set, set the style ID.
        if (!_.isNil(this._style)) {
            node.attributes.s = this._style.id();
        } else if (!_.isNil(this._styleId)) {
            node.attributes.s = this._styleId;
        }

        // Add any remaining children that we don't currently handle.
        if (this._remainingChildren) {
            node.children = node.children.concat(this._remainingChildren);
        }

        return node;
    }

    /* PRIVATE */

    /**
     * Initialize the cell node.
     * @param {{}|number} nodeOrColumnNumber - The existing node or the column number of a new cell.
     * @param {number} [styleId] - The style ID for the new cell.
     * @returns {undefined}
     * @private
     */
    _init(nodeOrColumnNumber, styleId) {
        if (_.isObject(nodeOrColumnNumber)) {
            // Parse the existing node.
            this._parseNode(nodeOrColumnNumber);
        } else {
            // This is a new cell.
            this._columnNumber = nodeOrColumnNumber;
            if (!_.isNil(styleId)) this._styleId = styleId;
        }
    }

    /**
     * Parse the existing node.
     * @param {{}} node - The existing node.
     * @returns {undefined}
     * @private
     */
    _parseNode(node) {
        // Parse the column numbr out of the address.
        const ref = addressConverter.fromAddress(node.attributes.r);
        this._columnNumber = ref.columnNumber;

        // Store the style ID if present.
        if (!_.isNil(node.attributes.s)) this._styleId = node.attributes.s;

        // Parse the formula if present..
        const fNode = xmlq.findChild(node, 'f');
        if (fNode) {
            this._formulaType = fNode.attributes.t || "normal";
            this._formulaRef = fNode.attributes.ref;
            this._formula = fNode.children[0];

            this._sharedFormulaId = fNode.attributes.si;
            if (!_.isNil(this._sharedFormulaId)) {
                // Update the sheet's max shared formula ID so we can set future IDs an index beyond this.
                this.sheet().updateMaxSharedFormulaId(this._sharedFormulaId);
            }

            // Delete the known attributes.
            delete fNode.attributes.t;
            delete fNode.attributes.ref;
            delete fNode.attributes.si;

            // If any unknown attributes are still present, store them for later output.
            if (!_.isEmpty(fNode.attributes)) this._remainingFormulaAttributes = fNode.attributes;
        }

        // Parse the value.
        const type = node.attributes.t;
        if (type === "s") {
            // String value.
            const vNode = xmlq.findChild(node, 'v');
            if (vNode) {
                const sharedIndex = vNode.children[0];
                this._value = this.workbook().sharedStrings().getStringByIndex(sharedIndex);

                // rich text
                if (_.isArray(this._value)) {
                    this._value = new RichText(this._value);
                }
            } else {
                this._value = '';
            }
        } else if (type === "str") {
            // Simple string value.
            const vNode = xmlq.findChild(node, 'v');
            this._value = vNode && vNode.children[0];
        } else if (type === "inlineStr") {
            // Inline string value: can be simple text or rich text.
            const isNode = xmlq.findChild(node, 'is');
            if (isNode.children[0].name === "t") {
                const tNode = isNode.children[0];
                this._value = tNode.children[0];
            } else {
                this._value = isNode.children;
            }
        } else if (type === "b") {
            // Boolean value.
            this._value = xmlq.findChild(node, 'v').children[0] === 1;
        } else if (type === "e") {
            // Error value.
            const error = xmlq.findChild(node, 'v').children[0];
            this._value = FormulaError.getError(error);
        } else {
            // Number value.
            const vNode = xmlq.findChild(node, 'v');
            this._value = vNode && Number(vNode.children[0]);
        }

        // Delete known attributes.
        delete node.attributes.r;
        delete node.attributes.s;
        delete node.attributes.t;

        // If any unknown attributes are still present, store them for later output.
        if (!_.isEmpty(node.attributes)) this._remainingAttributes = node.attributes;

        // Delete known children.
        xmlq.removeChild(node, 'f');
        xmlq.removeChild(node, 'v');
        xmlq.removeChild(node, 'is');

        // If any unknown children are still present, store them for later output.
        if (!_.isEmpty(node.children)) this._remainingChildren = node.children;
    }
}

module.exports = Cell;

/*
<c r="A6" s="1" t="s">
    <v>2</v>
</c>
*/


}, function(modId) { var map = {"./ArgHandler":1711202881116,"./addressConverter":1711202881117,"./dateConverter":1711202881118,"./regexify":1711202881111,"./xmlq":1711202881113,"./FormulaError":1711202881119,"./Style":1711202881120,"./RichText":1711202881122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881116, function(require, module, exports) {


const _ = require("lodash");

/**
 * Method argument handler. Used for overloading methods.
 * @private
 */
class ArgHandler {
    /**
     * Creates a new instance of ArgHandler.
     * @param {string} name - The method name to use in error messages.
     */
    constructor(name) {
        this._name = name;
        this._cases = [];
    }

    /**
     * Add a case.
     * @param {string|Array.<string>} [types] - The type or types of arguments to match this case.
     * @param {Function} handler - The function to call when this case is matched.
     * @returns {ArgHandler} The handler for chaining.
     */
    case(types, handler) {
        if (arguments.length === 1) {
            handler = types;
            types = [];
        }

        if (!Array.isArray(types)) types = [types];
        this._cases.push({ types, handler });
        return this;
    }

    /**
     * Handle the method arguments by checking each case in order until one matches and then call its handler.
     * @param {Arguments|Array.<*>} args - The method arguments.
     * @returns {*} The result of the handler.
     * @throws {Error} Throws if no case matches.
     */
    handle(args) {
        for (let i = 0; i < this._cases.length; i++) {
            const c = this._cases[i];
            if (this._argsMatchTypes(args, c.types)) {
                return c.handler.apply(null, args);
            }
        }

        throw new Error(`${this._name}: Invalid arguments.`);
    }

    /**
     * Check if the arguments match the given types.
     * @param {Arguments} args - The arguments.
     * @param {Array.<string>} types - The types.
     * @returns {boolean} True if matches, false otherwise.
     * @throws {Error} Throws if unknown type.
     * @private
     */
    _argsMatchTypes(args, types) {
        if (args.length !== types.length) return false;

        return _.every(args, (arg, i) => {
            const type = types[i];

            if (type === '*') return true;
            if (type === 'nil') return _.isNil(arg);
            if (type === 'string') return typeof arg === "string";
            if (type === 'boolean') return typeof arg === "boolean";
            if (type === 'number') return typeof arg === "number";
            if (type === 'integer') return typeof arg === "number" && _.isInteger(arg);
            if (type === 'function') return typeof arg === "function";
            if (type === 'array') return Array.isArray(arg);
            if (type === 'date') return arg && arg.constructor === Date;
            if (type === 'object') return arg && arg.constructor === Object;
            if (arg && arg.constructor && arg.constructor.name === type) return true;

            throw new Error(`Unknown type: ${type}`);
        });
    }
}

module.exports = ArgHandler;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881117, function(require, module, exports) {


// V8 doesn't support optimization for compound assignment of let variables.
// These methods get called a lot so disable the rule to allow V8 opmtimization.
/* eslint-disable operator-assignment */

const _ = require("lodash");
const ADDRESS_REGEX = /^(?:'?(.+?)'?!)?(?:(\$)?([A-Z]+)(\$)?(\d+)(?::(\$)?([A-Z]+)(\$)?(\d+))?|(\$)?([A-Z]+):(\$)?([A-Z]+)|(\$)?(\d+):(\$)?(\d+))$/;

/**
 * Address converter.
 * @private
 */
module.exports = {
    /**
     * Convert a column name to a number.
     * @param {string} name - The column name.
     * @returns {number} The number.
     */
    columnNameToNumber(name) {
        if (!name || typeof name !== "string") return;

        name = name.toUpperCase();
        let sum = 0;
        for (let i = 0; i < name.length; i++) {
            sum = sum * 26;
            sum = sum + (name[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1);
        }

        return sum;
    },

    /**
     * Convert a column number to a name.
     * @param {number} number - The column number.
     * @returns {string} The name.
     */
    columnNumberToName(number) {
        let dividend = number;
        let name = '';
        let modulo = 0;

        while (dividend > 0) {
            modulo = (dividend - 1) % 26;
            name = String.fromCharCode('A'.charCodeAt(0) + modulo) + name;
            dividend = Math.floor((dividend - modulo) / 26);
        }

        return name;
    },

    /**
     * Convert an address to a reference object.
     * @param {string} address - The address.
     * @returns {{}} The reference object.
     */
    fromAddress(address) {
        const match = address.match(ADDRESS_REGEX);
        if (!match) return;
        const ref = {};

        if (match[1]) ref.sheetName = match[1].replace(/''/g, "'");
        if (match[3] && match[7]) {
            ref.type = 'range';
            ref.startColumnAnchored = !!match[2];
            ref.startColumnName = match[3];
            ref.startColumnNumber = this.columnNameToNumber(ref.startColumnName);
            ref.startRowAnchored = !!match[4];
            ref.startRowNumber = parseInt(match[5]);
            ref.endColumnAnchored = !!match[6];
            ref.endColumnName = match[7];
            ref.endColumnNumber = this.columnNameToNumber(ref.endColumnName);
            ref.endRowAnchored = !!match[8];
            ref.endRowNumber = parseInt(match[9]);
        } else if (match[3]) {
            ref.type = 'cell';
            ref.columnAnchored = !!match[2];
            ref.columnName = match[3];
            ref.columnNumber = this.columnNameToNumber(ref.columnName);
            ref.rowAnchored = !!match[4];
            ref.rowNumber = parseInt(match[5]);
        } else if (match[11] && match[11] !== match[13]) {
            ref.type = 'columnRange';
            ref.startColumnAnchored = !!match[10];
            ref.startColumnName = match[11];
            ref.startColumnNumber = this.columnNameToNumber(ref.startColumnName);
            ref.endColumnAnchored = !!match[12];
            ref.endColumnName = match[13];
            ref.endColumnNumber = this.columnNameToNumber(ref.endColumnName);
        } else if (match[11]) {
            ref.type = 'column';
            ref.columnAnchored = !!match[10];
            ref.columnName = match[11];
            ref.columnNumber = this.columnNameToNumber(ref.columnName);
        } else if (match[15] && match[15] !== match[17]) {
            ref.type = 'rowRange';
            ref.startRowAnchored = !!match[14];
            ref.startRowNumber = parseInt(match[15]);
            ref.endRowAnchored = !!match[16];
            ref.endRowNumber = parseInt(match[17]);
        } else if (match[15]) {
            ref.type = 'row';
            ref.rowAnchored = !!match[14];
            ref.rowNumber = parseInt(match[15]);
        }

        return ref;
    },

    /**
     * Convert a reference object to an address.
     * @param {{}} ref - The reference object.
     * @returns {string} The address.
     */
    toAddress(ref) {
        let a, b;
        const sheetName = ref.sheetName;

        if (ref.type === 'cell') {
            a = {
                columnName: ref.columnName,
                columnNumber: ref.columnNumber,
                columnAnchored: ref.columnAnchored,
                rowNumber: ref.rowNumber,
                rowAnchored: ref.rowAnchored
            };
        } else if (ref.type === 'range') {
            a = {
                columnName: ref.startColumnName,
                columnNumber: ref.startColumnNumber,
                columnAnchored: ref.startColumnAnchored,
                rowNumber: ref.startRowNumber,
                rowAnchored: ref.startRowAnchored
            };
            b = {
                columnName: ref.endColumnName,
                columnNumber: ref.endColumnNumber,
                columnAnchored: ref.endColumnAnchored,
                rowNumber: ref.endRowNumber,
                rowAnchored: ref.endRowAnchored
            };
        } else if (ref.type === 'column') {
            a = b = {
                columnName: ref.columnName,
                columnNumber: ref.columnNumber,
                columnAnchored: ref.columnAnchored
            };
        } else if (ref.type === 'row') {
            a = b = {
                rowNumber: ref.rowNumber,
                rowAnchored: ref.rowAnchored
            };
        } else if (ref.type === 'columnRange') {
            a = {
                columnName: ref.startColumnName,
                columnNumber: ref.startColumnNumber,
                columnAnchored: ref.startColumnAnchored
            };
            b = {
                columnName: ref.endColumnName,
                columnNumber: ref.endColumnNumber,
                columnAnchored: ref.endColumnAnchored
            };
        } else if (ref.type === 'rowRange') {
            a = {
                rowNumber: ref.startRowNumber,
                rowAnchored: ref.startRowAnchored
            };
            b = {
                rowNumber: ref.endRowNumber,
                rowAnchored: ref.endRowAnchored
            };
        }

        let address = '';
        if (sheetName) address = `${address}'${sheetName.replace(/'/g, "''")}'!`;
        if (a.columnAnchored) address = `${address}$`;
        if (a.columnName) address = address + a.columnName;
        else if (a.columnNumber) address = address + this.columnNumberToName(a.columnNumber);
        if (a.rowAnchored) address = `${address}$`;
        if (a.rowNumber) address = address + a.rowNumber;

        if (b) {
            address = `${address}:`;
            if (b.columnAnchored) address = `${address}$`;
            if (b.columnName) address = address + b.columnName;
            else if (b.columnNumber) address = address + this.columnNumberToName(b.columnNumber);
            if (b.rowAnchored) address = `${address}$`;
            if (b.rowNumber) address = address + b.rowNumber;
        }

        return address;
    }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881118, function(require, module, exports) {


// The base date = 0.
const dateBase = new Date(1900, 0, 0);

// The date conversion has a bug that assumes 1900 was a leap year. So we need to add one for dates after this.
const incorrectLeapDate = new Date(1900, 1, 28);

// Number of milliseconds in a day.
const millisecondsInDay = 1000 * 60 * 60 * 24;

/**
 * Date converter.
 * @private
 */
module.exports = {
    /**
     * Convert a date to a number for Excel.
     * @param {Date} date - The date.
     * @returns {number} The number.
     */
    dateToNumber(date) {
        // Clone the date and strip the time off.
        const dateOnly = new Date(date.getTime());
        dateOnly.setHours(0, 0, 0, 0);

        // Set the number to be the number of days between the date and the base date.
        // We need to round as daylight savings will cause fractional days, which we don't want.
        let number = Math.round((dateOnly - dateBase) / millisecondsInDay);
        
        // Add the true fractional days from just the milliseconds left in the current day.
        number += (date - dateOnly) / millisecondsInDay;

        // Adjust for the "bug" in Excel that treats 1900 as a leap year.
        if (date > incorrectLeapDate) number += 1;

        return number;
    },

    /**
     * Convert a number to a date.
     * @param {number} number - The number.
     * @returns {Date} The date.
     */
    numberToDate(number) {
        // If the number is greater than the incorrect leap date, we should subtract one.
        if (number > this.dateToNumber(incorrectLeapDate)) number--;
        
        // Break the number of full days and the remaining milliseconds in the current day.
        const fullDays = Math.floor(number);
        const partialMilliseconds = Math.round((number - fullDays) * millisecondsInDay);

        // Create a new date from the base date plus the time in the current day.
        const date = new Date(dateBase.getTime() + partialMilliseconds);

        // Now add the number of full days. JS will properly handle the month/year changes.
        date.setDate(date.getDate() + fullDays);

        return date;
    }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881119, function(require, module, exports) {


const _ = require("lodash");

/**
 * A formula error (e.g. #DIV/0!).
 */
class FormulaError {
    // /**
    //  * Creates a new instance of Formula Error.
    //  * @param {string} error - The error code.
    //  */
    constructor(error) {
        this._error = error;
    }

    /**
     * Get the error code.
     * @returns {string} The error code.
     */
    error() {
        return this._error;
    }
}

/**
 * \#DIV/0! error.
 * @type {FormulaError}
 */
FormulaError.DIV0 = new FormulaError("#DIV/0!");

/**
 * \#N/A error.
 * @type {FormulaError}
 */
FormulaError.NA = new FormulaError("#N/A");

/**
 * \#NAME? error.
 * @type {FormulaError}
 */
FormulaError.NAME = new FormulaError("#NAME?");

/**
 * \#NULL! error.
 * @type {FormulaError}
 */
FormulaError.NULL = new FormulaError("#NULL!");

/**
 * \#NUM! error.
 * @type {FormulaError}
 */
FormulaError.NUM = new FormulaError("#NUM!");

/**
 * \#REF! error.
 * @type {FormulaError}
 */
FormulaError.REF = new FormulaError("#REF!");

/**
 * \#VALUE! error.
 * @type {FormulaError}
 */
FormulaError.VALUE = new FormulaError("#VALUE!");

/**
 * Get the matching FormulaError object.
 * @param {string} error - The error code.
 * @returns {FormulaError} The matching FormulaError or a new object if no match.
 * @ignore
 */
FormulaError.getError = error => {
    return _.find(FormulaError, value => {
        return value instanceof FormulaError && value.error() === error;
    }) || new FormulaError(error);
};

module.exports = FormulaError;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881120, function(require, module, exports) {


/* eslint camelcase:off */

const ArgHandler = require("./ArgHandler");
const _ = require("lodash");
const xmlq = require("./xmlq");
const colorIndexes = require("./colorIndexes");

/**
 * A style.
 * @ignore
 */
class Style {
    /**
     * Creates a new instance of _Style.
     * @constructor
     * @param {StyleSheet} styleSheet - The styleSheet.
     * @param {number} id - The style ID.
     * @param {{}} xfNode - The xf node.
     * @param {{}} fontNode - The font node.
     * @param {{}} fillNode - The fill node.
     * @param {{}} borderNode - The border node.
     */
    constructor(styleSheet, id, xfNode, fontNode, fillNode, borderNode) {
        this._styleSheet = styleSheet;
        this._id = id;
        this._xfNode = xfNode;
        this._fontNode = fontNode;
        this._fillNode = fillNode;
        this._borderNode = borderNode;
    }

    /**
     * Gets the style ID.
     * @returns {number} The ID.
     */
    id() {
        return this._id;
    }

    /**
     * Gets or sets a style.
     * @param {string} name - The style name.
     * @param {*} [value] - The value to set.
     * @returns {*|Style} The value if getting or the style if setting.
     */
    style() {
        return new ArgHandler("_Style.style")
            .case('string', name => {
                const getterName = `_get_${name}`;
                if (!this[getterName]) throw new Error(`_Style.style: '${name}' is not a valid style`);
                return this[getterName]();
            })
            .case(['string', '*'], (name, value) => {
                const setterName = `_set_${name}`;
                if (!this[setterName]) throw new Error(`_Style.style: '${name}' is not a valid style`);
                this[setterName](value);
                return this;
            })
            .handle(arguments);
    }

    _getColor(node, name) {
        const child = xmlq.findChild(node, name);
        if (!child || !child.attributes) return;

        const color = {};
        if (child.attributes.hasOwnProperty('rgb')) color.rgb = child.attributes.rgb;
        else if (child.attributes.hasOwnProperty('theme')) color.theme = child.attributes.theme;
        else if (child.attributes.hasOwnProperty('indexed')) color.rgb = colorIndexes[child.attributes.indexed];

        if (child.attributes.hasOwnProperty('tint')) color.tint = child.attributes.tint;

        if (_.isEmpty(color)) return;

        return color;
    }

    _setColor(node, name, color) {
        if (typeof color === "string") color = { rgb: color };
        else if (typeof color === "number") color = { theme: color };

        xmlq.setChildAttributes(node, name, {
            rgb: color && color.rgb && color.rgb.toUpperCase(),
            indexed: null,
            theme: color && color.theme,
            tint: color && color.tint
        });

        xmlq.removeChildIfEmpty(node, 'color');
    }

    _get_bold() {
        return xmlq.hasChild(this._fontNode, 'b');
    }

    _set_bold(bold) {
        if (bold) xmlq.appendChildIfNotFound(this._fontNode, "b");
        else xmlq.removeChild(this._fontNode, 'b');
    }

    _get_italic() {
        return xmlq.hasChild(this._fontNode, 'i');
    }

    _set_italic(italic) {
        if (italic) xmlq.appendChildIfNotFound(this._fontNode, "i");
        else xmlq.removeChild(this._fontNode, 'i');
    }

    _get_underline() {
        const uNode = xmlq.findChild(this._fontNode, 'u');
        return uNode ? uNode.attributes.val || true : false;
    }

    _set_underline(underline) {
        if (underline) {
            const uNode = xmlq.appendChildIfNotFound(this._fontNode, "u");
            const val = typeof underline === 'string' ? underline : null;
            xmlq.setAttributes(uNode, { val });
        } else {
            xmlq.removeChild(this._fontNode, 'u');
        }
    }

    _get_strikethrough() {
        return xmlq.hasChild(this._fontNode, 'strike');
    }

    _set_strikethrough(strikethrough) {
        if (strikethrough) xmlq.appendChildIfNotFound(this._fontNode, "strike");
        else xmlq.removeChild(this._fontNode, 'strike');
    }

    _getFontVerticalAlignment() {
        return xmlq.getChildAttribute(this._fontNode, 'vertAlign', "val");
    }

    _setFontVerticalAlignment(alignment) {
        xmlq.setChildAttributes(this._fontNode, 'vertAlign', { val: alignment });
        xmlq.removeChildIfEmpty(this._fontNode, 'vertAlign');
    }

    _get_subscript() {
        return this._getFontVerticalAlignment() === "subscript";
    }

    _set_subscript(subscript) {
        this._setFontVerticalAlignment(subscript ? "subscript" : null);
    }

    _get_superscript() {
        return this._getFontVerticalAlignment() === "superscript";
    }

    _set_superscript(superscript) {
        this._setFontVerticalAlignment(superscript ? "superscript" : null);
    }

    _get_fontSize() {
        return xmlq.getChildAttribute(this._fontNode, 'sz', "val");
    }

    _set_fontSize(size) {
        xmlq.setChildAttributes(this._fontNode, 'sz', { val: size });
        xmlq.removeChildIfEmpty(this._fontNode, 'sz');
    }

    _get_fontFamily() {
        return xmlq.getChildAttribute(this._fontNode, 'name', "val");
    }

    _set_fontFamily(family) {
        xmlq.setChildAttributes(this._fontNode, 'name', { val: family });
        xmlq.removeChildIfEmpty(this._fontNode, 'name');
    }

    _get_fontGenericFamily() {
        return xmlq.getChildAttribute(this._fontNode, 'family', "val");
    }

    _set_fontGenericFamily(genericFamily) {
        xmlq.setChildAttributes(this._fontNode, 'family', { val: genericFamily });
        xmlq.removeChildIfEmpty(this._fontNode, 'family');
    }

    _get_fontColor() {
        return this._getColor(this._fontNode, "color");
    }

    _set_fontColor(color) {
        this._setColor(this._fontNode, "color", color);
    }

    _get_fontScheme() {
        // can be 'minor', 'major', 'none'
        return xmlq.getChildAttribute(this._fontNode, 'scheme', "val");
    }

    _set_fontScheme(scheme) {
        xmlq.setChildAttributes(this._fontNode, 'scheme', { val: scheme });
        xmlq.removeChildIfEmpty(this._fontNode, 'scheme');
    }

    _get_horizontalAlignment() {
        return xmlq.getChildAttribute(this._xfNode, 'alignment', "horizontal");
    }

    _set_horizontalAlignment(alignment) {
        xmlq.setChildAttributes(this._xfNode, 'alignment', { horizontal: alignment });
        xmlq.removeChildIfEmpty(this._xfNode, 'alignment');
    }

    _get_justifyLastLine() {
        return xmlq.getChildAttribute(this._xfNode, 'alignment', "justifyLastLine") === 1;
    }

    _set_justifyLastLine(justifyLastLine) {
        xmlq.setChildAttributes(this._xfNode, 'alignment', { justifyLastLine: justifyLastLine ? 1 : null });
        xmlq.removeChildIfEmpty(this._xfNode, 'alignment');
    }

    _get_indent() {
        return xmlq.getChildAttribute(this._xfNode, 'alignment', "indent");
    }

    _set_indent(indent) {
        xmlq.setChildAttributes(this._xfNode, 'alignment', { indent });
        xmlq.removeChildIfEmpty(this._xfNode, 'alignment');
    }

    _get_verticalAlignment() {
        return xmlq.getChildAttribute(this._xfNode, 'alignment', "vertical");
    }

    _set_verticalAlignment(alignment) {
        xmlq.setChildAttributes(this._xfNode, 'alignment', { vertical: alignment });
        xmlq.removeChildIfEmpty(this._xfNode, 'alignment');
    }

    _get_wrapText() {
        return xmlq.getChildAttribute(this._xfNode, 'alignment', "wrapText") === 1;
    }

    _set_wrapText(wrapText) {
        xmlq.setChildAttributes(this._xfNode, 'alignment', { wrapText: wrapText ? 1 : null });
        xmlq.removeChildIfEmpty(this._xfNode, 'alignment');
    }

    _get_shrinkToFit() {
        return xmlq.getChildAttribute(this._xfNode, 'alignment', "shrinkToFit") === 1;
    }

    _set_shrinkToFit(shrinkToFit) {
        xmlq.setChildAttributes(this._xfNode, 'alignment', { shrinkToFit: shrinkToFit ? 1 : null });
        xmlq.removeChildIfEmpty(this._xfNode, 'alignment');
    }

    _get_textDirection() {
        const readingOrder = xmlq.getChildAttribute(this._xfNode, 'alignment', "readingOrder");
        if (readingOrder === 1) return "left-to-right";
        if (readingOrder === 2) return "right-to-left";
        return readingOrder;
    }

    _set_textDirection(textDirection) {
        let readingOrder;
        if (textDirection === "left-to-right") readingOrder = 1;
        else if (textDirection === "right-to-left") readingOrder = 2;
        xmlq.setChildAttributes(this._xfNode, 'alignment', { readingOrder });
        xmlq.removeChildIfEmpty(this._xfNode, 'alignment');
    }

    _getTextRotation() {
        return xmlq.getChildAttribute(this._xfNode, 'alignment', "textRotation");
    }

    _setTextRotation(textRotation) {
        xmlq.setChildAttributes(this._xfNode, 'alignment', { textRotation });
        xmlq.removeChildIfEmpty(this._xfNode, 'alignment');
    }

    _get_textRotation() {
        let textRotation = this._getTextRotation();

        // Negative angles in Excel correspond to values > 90 in OOXML.
        if (textRotation > 90) textRotation = 90 - textRotation;
        return textRotation;
    }

    _set_textRotation(textRotation) {
        // Negative angles in Excel correspond to values > 90 in OOXML.
        if (textRotation < 0) textRotation = 90 - textRotation;
        this._setTextRotation(textRotation);
    }

    _get_angleTextCounterclockwise() {
        return this._getTextRotation() === 45;
    }

    _set_angleTextCounterclockwise(value) {
        this._setTextRotation(value ? 45 : null);
    }

    _get_angleTextClockwise() {
        return this._getTextRotation() === 135;
    }

    _set_angleTextClockwise(value) {
        this._setTextRotation(value ? 135 : null);
    }

    _get_rotateTextUp() {
        return this._getTextRotation() === 90;
    }

    _set_rotateTextUp(value) {
        this._setTextRotation(value ? 90 : null);
    }

    _get_rotateTextDown() {
        return this._getTextRotation() === 180;
    }

    _set_rotateTextDown(value) {
        this._setTextRotation(value ? 180 : null);
    }

    _get_verticalText() {
        return this._getTextRotation() === 255;
    }

    _set_verticalText(value) {
        this._setTextRotation(value ? 255 : null);
    }

    _get_fill() {
        const patternFillNode = xmlq.findChild(this._fillNode, 'patternFill');// jq.get(this._fillNode, "patternFill[0]");
        const gradientFillNode = xmlq.findChild(this._fillNode, 'gradientFill');// jq.get(this._fillNode, "gradientFill[0]");
        const patternType = patternFillNode && patternFillNode.attributes.patternType;// jq.get(patternFillNode, "$.patternType");

        if (patternType === "solid") {
            return {
                type: "solid",
                color: this._getColor(patternFillNode, "fgColor")
            };
        }

        if (patternType) {
            return {
                type: "pattern",
                pattern: patternType,
                foreground: this._getColor(patternFillNode, "fgColor"),
                background: this._getColor(patternFillNode, "bgColor")
            };
        }

        if (gradientFillNode) {
            const gradientType = gradientFillNode.attributes.type || "linear";
            const fill = {
                type: "gradient",
                gradientType,
                stops: _.map(gradientFillNode.children, stop => ({
                    position: stop.attributes.position,
                    color: this._getColor(stop, "color")
                }))
            };

            if (gradientType === "linear") {
                fill.angle = gradientFillNode.attributes.degree;
            } else {
                fill.left = gradientFillNode.attributes.left;
                fill.right = gradientFillNode.attributes.right;
                fill.top = gradientFillNode.attributes.top;
                fill.bottom = gradientFillNode.attributes.bottom;
            }

            return fill;
        }
    }

    _set_fill(fill) {
        this._fillNode.children = [];

        // No fill
        if (_.isNil(fill)) return;

        // Pattern fill
        if (fill.type === "pattern") {
            const patternFill = {
                name: 'patternFill',
                attributes: { patternType: fill.pattern },
                children: []
            };
            this._fillNode.children.push(patternFill);
            this._setColor(patternFill, "fgColor", fill.foreground);
            this._setColor(patternFill, "bgColor", fill.background);
            return;
        }

        // Gradient fill
        if (fill.type === "gradient") {
            const gradientFill = { name: 'gradientFill', attributes: {}, children: [] };
            this._fillNode.children.push(gradientFill);
            xmlq.setAttributes(gradientFill, {
                type: fill.gradientType === "path" ? "path" : undefined,
                left: fill.left,
                right: fill.right,
                top: fill.top,
                bottom: fill.bottom,
                degree: fill.angle
            });

            _.forEach(fill.stops, (fillStop, i) => {
                const stop = {
                    name: 'stop',
                    attributes: { position: fillStop.position },
                    children: []
                };
                gradientFill.children.push(stop);
                this._setColor(stop, 'color', fillStop.color);
            });

            return;
        }

        // Solid fill (really a pattern fill with a solid pattern type).
        if (!_.isObject(fill)) fill = { type: "solid", color: fill };
        else if (fill.hasOwnProperty('rgb') || fill.hasOwnProperty("theme")) fill = { color: fill };

        const patternFill = {
            name: 'patternFill',
            attributes: { patternType: 'solid' }
        };
        this._fillNode.children.push(patternFill);
        this._setColor(patternFill, "fgColor", fill.color);
    }

    _getBorder() {
        const result = {};
        ["left", "right", "top", "bottom", "diagonal"].forEach(side => {
            const sideNode = xmlq.findChild(this._borderNode, side);
            const sideResult = {};

            const style = xmlq.getChildAttribute(this._borderNode, side, 'style');
            if (style) sideResult.style = style;
            const color = this._getColor(sideNode, 'color');
            if (color) sideResult.color = color;

            if (side === "diagonal") {
                const up = this._borderNode.attributes.diagonalUp;
                const down = this._borderNode.attributes.diagonalDown;
                let direction;
                if (up && down) direction = "both";
                else if (up) direction = "up";
                else if (down) direction = "down";
                if (direction) sideResult.direction = direction;
            }

            if (!_.isEmpty(sideResult)) result[side] = sideResult;
        });

        return result;
    }

    _setBorder(settings) {
        _.forOwn(settings, (setting, side) => {
            if (typeof setting === "boolean") {
                setting = { style: setting ? "thin" : null };
            } else if (typeof setting === "string") {
                setting = { style: setting };
            } else if (setting === null || setting === undefined) {
                setting = { style: null, color: null, direction: null };
            }

            if (setting.hasOwnProperty("style")) {
                xmlq.setChildAttributes(this._borderNode, side, { style: setting.style });
            }

            if (setting.hasOwnProperty("color")) {
                const sideNode = xmlq.findChild(this._borderNode, side);
                this._setColor(sideNode, "color", setting.color);
            }

            if (side === "diagonal") {
                xmlq.setAttributes(this._borderNode, {
                    diagonalUp: setting.direction === "up" || setting.direction === "both" ? 1 : null,
                    diagonalDown: setting.direction === "down" || setting.direction === "both" ? 1 : null
                });
            }
        });
    }

    _get_border() {
        return this._getBorder();
    }

    _set_border(settings) {
        if (_.isObject(settings) && !settings.hasOwnProperty("style") && !settings.hasOwnProperty("color")) {
            settings = _.defaults(settings, {
                left: null,
                right: null,
                top: null,
                bottom: null,
                diagonal: null
            });
            this._setBorder(settings);
        } else {
            this._setBorder({
                left: settings,
                right: settings,
                top: settings,
                bottom: settings
            });
        }
    }

    _get_borderColor() {
        return _.mapValues(this._getBorder(), value => value.color);
    }

    _set_borderColor(color) {
        if (_.isObject(color)) {
            this._setBorder(_.mapValues(color, color => ({ color })));
        } else {
            this._setBorder({
                left: { color },
                right: { color },
                top: { color },
                bottom: { color },
                diagonal: { color }
            });
        }
    }

    _get_borderStyle() {
        return _.mapValues(this._getBorder(), value => value.style);
    }

    _set_borderStyle(style) {
        if (_.isObject(style)) {
            this._setBorder(_.mapValues(style, style => ({ style })));
        } else {
            this._setBorder({
                left: { style },
                right: { style },
                top: { style },
                bottom: { style }
            });
        }
    }

    _get_diagonalBorderDirection() {
        const border = this._getBorder().diagonal;
        return border && border.direction;
    }

    _set_diagonalBorderDirection(direction) {
        this._setBorder({ diagonal: { direction } });
    }

    _get_numberFormat() {
        const numFmtId = this._xfNode.attributes.numFmtId || 0;
        return this._styleSheet.getNumberFormatCode(numFmtId);
    }

    _set_numberFormat(formatCode) {
        this._xfNode.attributes.numFmtId = this._styleSheet.getNumberFormatId(formatCode);
    }
}

["left", "right", "top", "bottom", "diagonal"].forEach(side => {
    Style.prototype[`_get_${side}Border`] = function () {
        return this._getBorder()[side];
    };

    Style.prototype[`_set_${side}Border`] = function (settings) {
        this._setBorder({ [side]: settings });
    };

    Style.prototype[`_get_${side}BorderColor`] = function () {
        const border = this._getBorder()[side];
        return border && border.color;
    };

    Style.prototype[`_set_${side}BorderColor`] = function (color) {
        this._setBorder({ [side]: { color } });
    };

    Style.prototype[`_get_${side}BorderStyle`] = function () {
        const border = this._getBorder()[side];
        return border && border.style;
    };

    Style.prototype[`_set_${side}BorderStyle`] = function (style) {
        this._setBorder({ [side]: { style } });
    };
});

// IE doesn't support function names so explicitly set it.
if (!Style.name) Style.name = "Style";

module.exports = Style;

}, function(modId) { var map = {"./ArgHandler":1711202881116,"./xmlq":1711202881113,"./colorIndexes":1711202881121}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881121, function(require, module, exports) {


/**
 * Legacy color indexes.
 * https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.indexedcolors(v=office.15).aspx
 */
module.exports = [
    "000000",
    "FFFFFF",
    "FF0000",
    "00FF00",
    "0000FF",
    "FFFF00",
    "FF00FF",
    "00FFFF",
    "000000",
    "FFFFFF",
    "FF0000",
    "00FF00",
    "0000FF",
    "FFFF00",
    "FF00FF",
    "00FFFF",
    "800000",
    "008000",
    "000080",
    "808000",
    "800080",
    "008080",
    "C0C0C0",
    "808080",
    "9999FF",
    "993366",
    "FFFFCC",
    "CCFFFF",
    "660066",
    "FF8080",
    "0066CC",
    "CCCCFF",
    "000080",
    "FF00FF",
    "FFFF00",
    "00FFFF",
    "800080",
    "800000",
    "008080",
    "0000FF",
    "00CCFF",
    "CCFFFF",
    "CCFFCC",
    "FFFF99",
    "99CCFF",
    "FF99CC",
    "CC99FF",
    "FFCC99",
    "3366FF",
    "33CCCC",
    "99CC00",
    "FFCC00",
    "FF9900",
    "FF6600",
    "666699",
    "969696",
    "003366",
    "339966",
    "003300",
    "333300",
    "993300",
    "993366",
    "333399",
    "333333",
    "System Foreground",
    "System Background"
];

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881122, function(require, module, exports) {


const _ = require("lodash");
const RichTextFragment = require("./RichTextFragment");

/**
 * A RichText class that contains many {@link RichTextFragment}.
 */
class RichText {
    /**
     * Creates a new instance of RichText. If you get the instance by calling `Cell.value()`,
     * adding a text contains line separator will trigger {@link Cell.style}('wrapText', true), which
     * will make MS Excel show the new line. i.e. In MS Excel, Tap "alt+Enter" in a cell, the cell
     * will set wrap text to true automatically.
     *
     * @param {undefined|null|Object} [node] - The node stored in the shared string
     */
    constructor(node) {
        this._node = [];
        this._cell = null;
        this._remainingNodes = [];
        if (node) {
            for (let i = 0; i < node.length; i++) {
                const fragment = node[i];
                if (fragment.name === 'r') {
                    this._node.push(new RichTextFragment(fragment, null, this));
                } else {
                    // special node, e.g. rPh, phoneticPr in Japanese language.
                    this._remainingNodes.push(fragment);
                }
            }
        }
    }

    /**
     * Gets which cell this {@link RichText} instance belongs to.
     * @return {Cell|undefined} The cell this instance belongs to.
     */
    get cell() {
        return this._cell;
    }

    /**
     * Gets the how many rich text fragment this {@link RichText} instance contains
     * @return {number} The number of fragments this {@link RichText} instance has.
     */
    get length() {
        return this._node.length;
    }

    /**
     * Gets concatenated text without styles.
     * @return {string} concatenated text
     */
    text() {
        let text = '';
        for (let i = 0; i < this._node.length; i++) {
            text += this.get(i).value();
        }
        return text;
    }

    /**
     * Gets the instance with cell reference defined.
     * @param {Cell} cell - Cell reference.
     * @return {RichText} The instance with cell reference defined.
     */
    getInstanceWithCellRef(cell) {
        this._cell = cell;
        return this;
    }

    /**
     * Returns a deep copy of this instance.
     * If cell reference is provided, it checks line separators and calls
     * `cell.style('wrapText', true)` when needed.
     * @param {Cell|undefined} [cell] - The cell reference.
     * @return {RichText} A deep copied instance
     */
    copy(cell) {
        const newRichText = new RichText(_.cloneDeep(this.toXml()));
        if (cell && _.includes(this.text(), '\n')) {
            cell.style('wrapText', true);
        }
        return newRichText;
    }

    /**
     * Gets the ith fragment of this {@link RichText} instance.
     * @param {number} index - The index
     * @return {RichTextFragment} A rich text fragment
     */
    get(index) {
        return this._node[index];
    }

    /**
     * Removes a rich text fragment. This instance will be mutated.
     * @param {number} index - the index of the fragment to remove
     * @return {RichText} the rich text instance
     */
    remove(index) {
        this._node.splice(index, 1);
        this.removeUnsupportedNodes();
        return this;
    }

    /**
     * Adds a rich text fragment to the last or after the given index. This instance will be mutated.
     * @param {string} text - the text
     * @param {{}} [styles] - the styles js object, i.e. {fontSize: 12}
     * @param {number|undefined|null} [index] - the index of the fragment to add
     * @return {RichText} the rich text instance
     */
    add(text, styles, index) {
        if (index === undefined || index === null) {
            this._node.push(new RichTextFragment(text, styles, this));
        } else {
            this._node.splice(index, 0, new RichTextFragment(text, styles, this));
        }
        this.removeUnsupportedNodes();
        return this;
    }

    /**
     * Clears this rich text
     * @return {RichText} the rich text instance
     */
    clear() {
        this._node = [];
        this._remainingNodes = [];
        this._cell = undefined;
        return this;
    }

    /**
     * Remove all unsupported nodes (phoneticPr, rPh for Japanese language).
     * @return {undefined}
     */
    removeUnsupportedNodes() {
        this._remainingNodes = [];
    }

    /**
     * Convert the rich text to an XML object.
     * @returns {Array.<{}>} The XML form.
     * @ignore
     */
    toXml() {
        const node = [];
        for (let i = 0; i < this._node.length; i++) {
            node.push(this._node[i].toXml());
        }
        return node.concat(this._remainingNodes);
    }
}

// IE doesn't support function names so explicitly set it.
if (!RichText.name) RichText.name = "RichText";

module.exports = RichText;

}, function(modId) { var map = {"./RichTextFragment":1711202881123}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881123, function(require, module, exports) {


/* eslint camelcase:off */

const ArgHandler = require("./ArgHandler");
const _ = require("lodash");
const xmlq = require("./xmlq");
const colorIndexes = require("./colorIndexes");

/**
 * A Rich text fragment.
 */
class RichTextFragment {
    /**
     * Creates a new instance of RichTextFragment.
     * @constructor
     * @param {string|Object} value - Text value or XML node
     * @param {object|undefined|null} [styles] - Multiple styles.
     * @param {RichText} richText - The rich text instance where this fragment belongs to.
     */
    constructor(value, styles, richText) {
        this._richText = richText;
        if (value.name === 'r') {
            this._node = value;
            this._fontNode = xmlq.findChild(this._node, 'rPr');
            if (!this._fontNode) {
                this._fontNode = { name: 'rPr', attributes: {}, children: [] };
                this._node.children.unshift(this._fontNode);
            }
            this._valueNode = xmlq.findChild(this._node, 't');
        } else {
            this._node = {
                name: 'r',
                attributes: {},
                children: [
                    { name: 'rPr', attributes: {}, children: [] },
                    { name: 't', attributes: {}, children: [] }
                ]
            };
            this._fontNode = xmlq.findChild(this._node, 'rPr');
            this._valueNode = xmlq.findChild(this._node, 't');
            this.value(value);
            if (styles) {
                this.style(styles);
            }
        }
    }

    /**
     * Gets the value of this part of rich text
     * @return {string} text
     *//**
     * Sets the value of this part of rich text
     * @param {string} text - the text to set
     * @return {RichTextFragment} - RichTextFragment
     */
    value() {
        return new ArgHandler("_RichText.value")
            .case(() => {
                return this._valueNode.children[0];
            })
            .case('string', value => {
                value = value.replace(/(?:\r\n|\r|\n)/g, '\r\n');
                const hasLineSeparator = value.indexOf('\r\n') !== -1;
                this._valueNode.children[0] = value;
                if (value.charAt(0) === ' ') xmlq.setAttributes(this._valueNode, { 'xml:space': 'preserve' });

                if (this._richText) this._richText.removeUnsupportedNodes();
                if (hasLineSeparator) {
                    // set wrapText = true if it contains line separator, excel will only display new lines if it sets.
                    if (this._richText.cell) {
                        this._richText.cell.style('wrapText', true);
                    }
                    xmlq.setAttributes(this._valueNode, { 'xml:space': 'preserve' });
                }
                return this;
            })
            .handle(arguments);
    }

    /**
     * Convert the rich text to an XML object.
     * @returns {{}} The XML form.
     * @ignore
     */
    toXml() {
        return this._node;
    }

    /**
     * Gets an individual style.
     * @param {string} name - The name of the style.
     * @returns {*} The style.
     *//**
     * Gets multiple styles.
     * @param {Array.<string>} names - The names of the style.
     * @returns {object.<string, *>} Object whose keys are the style names and values are the styles.
     *//**
     * Sets an individual style.
     * @param {string} name - The name of the style.
     * @param {*} value - The value to set.
     * @returns {RichTextFragment} This RichTextFragment.
     *//**
     * Sets multiple styles.
     * @param {object.<string, *>} styles - Object whose keys are the style names and values are the styles to set.
     * @returns {RichTextFragment} This RichTextFragment.
     */
    style() {
        return new ArgHandler("_RichText.style")
            .case('string', name => {
                // Get single value
                const getterName = `_get_${name}`;
                if (!this[getterName]) throw new Error(`_RichText.style: '${name}' is not a valid style`);
                return this[getterName]();
            })
            .case('array', names => {
                // Get list of values
                const values = {};
                names.forEach(name => {
                    values[name] = this.style(name);
                });
                return values;
            })
            .case(['string', '*'], (name, value) => {
                // Set a single value
                const setterName = `_set_${name}`;
                if (!this[setterName]) throw new Error(`_RichText.style: '${name}' is not a valid style`);
                return this[setterName](value);
            })
            .case('object', nameValues => {
                // Object of key value pairs to set
                for (const name in nameValues) {
                    if (!nameValues.hasOwnProperty(name)) continue;
                    const value = nameValues[name];
                    this.style(name, value);
                }
                return this;
            })
            .handle(arguments);
    }

    _getColor(node, name) {
        const child = xmlq.findChild(node, name);
        if (!child || !child.attributes) return;

        const color = {};
        if (child.attributes.hasOwnProperty('rgb')) color.rgb = child.attributes.rgb;
        else if (child.attributes.hasOwnProperty('theme')) color.theme = child.attributes.theme;
        else if (child.attributes.hasOwnProperty('indexed')) color.rgb = colorIndexes[child.attributes.indexed];

        if (child.attributes.hasOwnProperty('tint')) color.tint = child.attributes.tint;

        if (_.isEmpty(color)) return;

        return color;
    }

    _setColor(node, name, color) {
        if (typeof color === "string") color = { rgb: color };
        else if (typeof color === "number") color = { theme: color };

        xmlq.setChildAttributes(node, name, {
            rgb: color && color.rgb && color.rgb.toUpperCase(),
            indexed: null,
            theme: color && color.theme,
            tint: color && color.tint
        });

        xmlq.removeChildIfEmpty(node, 'color');
    }

    _get_bold() {
        return xmlq.hasChild(this._fontNode, 'b');
    }

    _set_bold(bold) {
        if (bold) xmlq.appendChildIfNotFound(this._fontNode, "b");
        else xmlq.removeChild(this._fontNode, 'b');
    }

    _get_italic() {
        return xmlq.hasChild(this._fontNode, 'i');
    }

    _set_italic(italic) {
        if (italic) xmlq.appendChildIfNotFound(this._fontNode, "i");
        else xmlq.removeChild(this._fontNode, 'i');
    }

    _get_underline() {
        const uNode = xmlq.findChild(this._fontNode, 'u');
        return uNode ? uNode.attributes.val || true : false;
    }

    _set_underline(underline) {
        if (underline) {
            const uNode = xmlq.appendChildIfNotFound(this._fontNode, "u");
            const val = typeof underline === 'string' ? underline : null;
            xmlq.setAttributes(uNode, { val });
        } else {
            xmlq.removeChild(this._fontNode, 'u');
        }
    }

    _get_strikethrough() {
        return xmlq.hasChild(this._fontNode, 'strike');
    }

    _set_strikethrough(strikethrough) {
        if (strikethrough) xmlq.appendChildIfNotFound(this._fontNode, "strike");
        else xmlq.removeChild(this._fontNode, 'strike');
    }

    _getFontVerticalAlignment() {
        return xmlq.getChildAttribute(this._fontNode, 'vertAlign', "val");
    }

    _setFontVerticalAlignment(alignment) {
        xmlq.setChildAttributes(this._fontNode, 'vertAlign', { val: alignment });
        xmlq.removeChildIfEmpty(this._fontNode, 'vertAlign');
    }

    _get_subscript() {
        return this._getFontVerticalAlignment() === "subscript";
    }

    _set_subscript(subscript) {
        this._setFontVerticalAlignment(subscript ? "subscript" : null);
    }

    _get_superscript() {
        return this._getFontVerticalAlignment() === "superscript";
    }

    _set_superscript(superscript) {
        this._setFontVerticalAlignment(superscript ? "superscript" : null);
    }

    _get_fontSize() {
        return xmlq.getChildAttribute(this._fontNode, 'sz', "val");
    }

    _set_fontSize(size) {
        xmlq.setChildAttributes(this._fontNode, 'sz', { val: size });
        xmlq.removeChildIfEmpty(this._fontNode, 'sz');
    }

    _get_fontFamily() {
        return xmlq.getChildAttribute(this._fontNode, 'rFont', "val");
    }

    _set_fontFamily(family) {
        xmlq.setChildAttributes(this._fontNode, 'rFont', { val: family });
        xmlq.removeChildIfEmpty(this._fontNode, 'rFont');
    }

    _get_fontGenericFamily() {
        return xmlq.getChildAttribute(this._fontNode, 'family', "val");
    }

    /**
     * @param {number} genericFamily - 1: Serif, 2: Sans Serif, 3: Monospace,
     * @private
     * @return {undefined}
     */
    _set_fontGenericFamily(genericFamily) {
        xmlq.setChildAttributes(this._fontNode, 'family', { val: genericFamily });
        xmlq.removeChildIfEmpty(this._fontNode, 'family');
    }

    _get_fontColor() {
        return this._getColor(this._fontNode, "color");
    }

    _set_fontColor(color) {
        this._setColor(this._fontNode, "color", color);
    }

    _get_fontScheme() {
        // can be 'minor', 'major', 'none'
        return xmlq.getChildAttribute(this._fontNode, 'scheme', "val");
    }

    /**
     * @param {string} scheme - 'minor'|'major'|'none'
     * @private
     * @return {undefined}
     */
    _set_fontScheme(scheme) {
        xmlq.setChildAttributes(this._fontNode, 'scheme', { val: scheme });
        xmlq.removeChildIfEmpty(this._fontNode, 'scheme');
    }
}

// IE doesn't support function names so explicitly set it.
if (!RichTextFragment.name) RichTextFragment.name = "RichTextFragment";

module.exports = RichTextFragment;

}, function(modId) { var map = {"./ArgHandler":1711202881116,"./xmlq":1711202881113,"./colorIndexes":1711202881121}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881124, function(require, module, exports) {


const _ = require("lodash");
const Cell = require("./Cell");
const regexify = require("./regexify");
const ArgHandler = require("./ArgHandler");
const addressConverter = require('./addressConverter');

/**
 * A row.
 */
class Row {
    // /**
    //  * Creates a new instance of Row.
    //  * @param {Sheet} sheet - The parent sheet.
    //  * @param {{}} node - The row node.
    //  */
    constructor(sheet, node) {
        this._sheet = sheet;
        this._init(node);
    }

    /* PUBLIC */

    /**
     * Get the address of the row.
     * @param {{}} [opts] - Options
     * @param {boolean} [opts.includeSheetName] - Include the sheet name in the address.
     * @param {boolean} [opts.anchored] - Anchor the address.
     * @returns {string} The address
     */
    address(opts) {
        return addressConverter.toAddress({
            type: 'row',
            rowNumber: this.rowNumber(),
            sheetName: opts && opts.includeSheetName && this.sheet().name(),
            rowAnchored: opts && opts.anchored
        });
    }

    /**
     * Get a cell in the row.
     * @param {string|number} columnNameOrNumber - The name or number of the column.
     * @returns {Cell} The cell.
     */
    cell(columnNameOrNumber) {
        let columnNumber = columnNameOrNumber;
        if (typeof columnNameOrNumber === 'string') {
            columnNumber = addressConverter.columnNameToNumber(columnNameOrNumber);
        }

        if (columnNumber < 1) throw new RangeError(`Invalid column number ${columnNumber}. Remember that spreadsheets use 1-based indexing.`);

        // Return an existing cell.
        if (this._cells[columnNumber]) return this._cells[columnNumber];

        // No cell exists for this.
        // Check if there is an existing row/column style for the new cell.
        let styleId;
        const rowStyleId = this._node.attributes.s;
        const columnStyleId = this.sheet().existingColumnStyleId(columnNumber);

        // Row style takes priority. If a cell has both row and column styles it should have created a cell entry with a cell-specific style.
        if (!_.isNil(rowStyleId)) styleId = rowStyleId;
        else if (!_.isNil(columnStyleId)) styleId = columnStyleId;

        // Create the new cell.
        const cell = new Cell(this, columnNumber, styleId);
        this._cells[columnNumber] = cell;
        return cell;
    }

    /**
     * Gets the row height.
     * @returns {undefined|number} The height (or undefined).
     *//**
     * Sets the row height.
     * @param {number} height - The height of the row.
     * @returns {Row} The row.
     */
    height() {
        return new ArgHandler('Row.height')
            .case(() => {
                return this._node.attributes.customHeight ? this._node.attributes.ht : undefined;
            })
            .case('number', height => {
                this._node.attributes.ht = height;
                this._node.attributes.customHeight = 1;
                return this;
            })
            .case('nil', () => {
                delete this._node.attributes.ht;
                delete this._node.attributes.customHeight;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets a value indicating whether the row is hidden.
     * @returns {boolean} A flag indicating whether the row is hidden.
     *//**
     * Sets whether the row is hidden.
     * @param {boolean} hidden - A flag indicating whether to hide the row.
     * @returns {Row} The row.
     */
    hidden() {
        return new ArgHandler("Row.hidden")
            .case(() => {
                return this._node.attributes.hidden === 1;
            })
            .case('boolean', hidden => {
                if (hidden) this._node.attributes.hidden = 1;
                else delete this._node.attributes.hidden;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets the row number.
     * @returns {number} The row number.
     */
    rowNumber() {
        return this._node.attributes.r;
    }

    /**
     * Gets the parent sheet of the row.
     * @returns {Sheet} The parent sheet.
     */
    sheet() {
        return this._sheet;
    }

    /**
     * Gets an individual style.
     * @param {string} name - The name of the style.
     * @returns {*} The style.
     *//**
     * Gets multiple styles.
     * @param {Array.<string>} names - The names of the style.
     * @returns {object.<string, *>} Object whose keys are the style names and values are the styles.
     *//**
     * Sets an individual style.
     * @param {string} name - The name of the style.
     * @param {*} value - The value to set.
     * @returns {Cell} The cell.
     *//**
	 * Sets multiple styles.
	 * @param {object.<string, *>} styles - Object whose keys are the style names and values are the styles to set.
	 * @returns {Cell} The cell.
     *//**
     * Sets to a specific style
     * @param {Style} style - Style object given from stylesheet.createStyle
     * @returns {Cell} The cell.
     */
    style() {
        return new ArgHandler("Row.style")
            .case('string', name => {
                // Get single value
                this._createStyleIfNeeded();
                return this._style.style(name);
            })
            .case('array', names => {
                // Get list of values
                const values = {};
                names.forEach(name => {
                    values[name] = this.style(name);
                });

                return values;
            })
            .case(['string', '*'], (name, value) => {
                this._createCellStylesIfNeeded();

                // Style each existing cell within this row. (Cells don't inherit ow/column styles.)
                _.forEach(this._cells, cell => {
                    if (cell) cell.style(name, value);
                });

                // Set the style on the row.
                this._createStyleIfNeeded();
                this._style.style(name, value);

                return this;
            })
            .case('object', nameValues => {
                // Object of key value pairs to set
                for (const name in nameValues) {
                    if (!nameValues.hasOwnProperty(name)) continue;
                    const value = nameValues[name];
                    this.style(name, value);
                }

                return this;
            })
            .case('Style', style => {
                this._createCellStylesIfNeeded();

                // Style each existing cell within this row. (Cells don't inherit ow/column styles.)
                _.forEach(this._cells, cell => {
                    if (cell) cell.style(style);
                });

                this._style = style;
                this._node.attributes.s = style.id();
                this._node.attributes.customFormat = 1;

                return this;
            })
            .handle(arguments);
    }

    /**
     * Get the parent workbook.
     * @returns {Workbook} The parent workbook.
     */
    workbook() {
        return this.sheet().workbook();
    }

    /**
     * Append horizontal page break after the row.
     * @returns {Row} the row.
     */
    addPageBreak() {
        this.sheet().horizontalPageBreaks().add(this.rowNumber());
        return this;
    }

    /* INTERNAL */

    /**
     * Clear cells that are using a given shared formula ID.
     * @param {number} sharedFormulaId - The shared formula ID.
     * @returns {undefined}
     * @ignore
     */
    clearCellsUsingSharedFormula(sharedFormulaId) {
        this._cells.forEach(cell => {
            if (!cell) return;
            if (cell.sharesFormula(sharedFormulaId)) cell.clear();
        });
    }

    /**
     * Find a pattern in the row and optionally replace it.
     * @param {string|RegExp} pattern - The search pattern.
     * @param {string} [replacement] - The replacement text.
     * @returns {Array.<Cell>} The matched cells.
     * @ignore
     */
    find(pattern, replacement) {
        pattern = regexify(pattern);

        const matches = [];
        this._cells.forEach(cell => {
            if (!cell) return;
            if (cell.find(pattern, replacement)) matches.push(cell);
        });

        return matches;
    }

    /**
     * Check if the row has a cell at the given column number.
     * @param {number} columnNumber - The column number.
     * @returns {boolean} True if a cell exists, false otherwise.
     * @ignore
     */
    hasCell(columnNumber) {
        if (columnNumber < 1) throw new RangeError(`Invalid column number ${columnNumber}. Remember that spreadsheets use 1-based indexing.`);
        return !!this._cells[columnNumber];
    }

    /**
     * Check if the column has a style defined.
     * @returns {boolean} True if a style exists, false otherwise.
     * @ignore
     */
    hasStyle() {
        return !_.isNil(this._node.attributes.s);
    }

    /**
     * Returns the nax used column number.
     * @returns {number} The max used column number.
     * @ignore
     */
    minUsedColumnNumber() {
        return _.findIndex(this._cells);
    }

    /**
     * Returns the nax used column number.
     * @returns {number} The max used column number.
     * @ignore
     */
    maxUsedColumnNumber() {
        return this._cells.length - 1;
    }

    /**
     * Convert the row to an object.
     * @returns {{}} The object form.
     * @ignore
     */
    toXml() {
        return this._node;
    }

    /* PRIVATE */

    /**
     * If a column node is already defined that intersects with this row and that column has a style set, we
     * need to make sure that a cell node exists at the intersection so we can style it appropriately.
     * Fetching the cell will force a new cell node to be created with a style matching the column.
     * @returns {undefined}
     * @private
     */
    _createCellStylesIfNeeded() {
        this.sheet().forEachExistingColumnNumber(columnNumber => {
            if (!_.isNil(this.sheet().existingColumnStyleId(columnNumber))) this.cell(columnNumber);
        });
    }

    /**
     * Create a style for this row if it doesn't already exist.
     * @returns {undefined}
     * @private
     */
    _createStyleIfNeeded() {
        if (!this._style) {
            const styleId = this._node.attributes.s;
            this._style = this.workbook().styleSheet().createStyle(styleId);
            this._node.attributes.s = this._style.id();
            this._node.attributes.customFormat = 1;
        }
    }

    /**
     * Initialize the row node.
     * @param {{}} node - The row node.
     * @returns {undefined}
     * @private
     */
    _init(node) {
        this._node = node;
        this._cells = [];
        this._node.children.forEach(cellNode => {
            const cell = new Cell(this, cellNode);
            this._cells[cell.columnNumber()] = cell;
        });
        this._node.children = this._cells;
    }
}

module.exports = Row;

/*
<row r="6" spans="1:9" x14ac:dyDescent="0.25">
    <c r="A6" s="1" t="s">
        <v>2</v>
    </c>
    <c r="B6" s="1"/>
    <c r="C6" s="1"/>
</row>
*/

}, function(modId) { var map = {"./Cell":1711202881115,"./regexify":1711202881111,"./ArgHandler":1711202881116,"./addressConverter":1711202881117}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881125, function(require, module, exports) {


const ArgHandler = require("./ArgHandler");
const addressConverter = require('./addressConverter');

// Default column width.
const defaultColumnWidth = 9.140625;

/**
 * A column.
 */
class Column {
    // /**
    //  * Creates a new Column.
    //  * @param {Sheet} sheet - The parent sheet.
    //  * @param {{}} node - The column node.
    //  * @constructor
    //  * @ignore
    //  * @private
    //  */
    constructor(sheet, node) {
        this._sheet = sheet;
        this._node = node;
    }

    /* PUBLIC */

    /**
     * Get the address of the column.
     * @param {{}} [opts] - Options
     * @param {boolean} [opts.includeSheetName] - Include the sheet name in the address.
     * @param {boolean} [opts.anchored] - Anchor the address.
     * @returns {string} The address
     */
    address(opts) {
        return addressConverter.toAddress({
            type: 'column',
            columnName: this.columnName(),
            sheetName: opts && opts.includeSheetName && this.sheet().name(),
            columnAnchored: opts && opts.anchored
        });
    }

    /**
     * Get a cell within the column.
     * @param {number} rowNumber - The row number.
     * @returns {Cell} The cell in the column with the given row number.
     */
    cell(rowNumber) {
        return this.sheet().cell(rowNumber, this.columnNumber());
    }

    /**
     * Get the name of the column.
     * @returns {string} The column name.
     */
    columnName() {
        return addressConverter.columnNumberToName(this.columnNumber());
    }

    /**
     * Get the number of the column.
     * @returns {number} The column number.
     */
    columnNumber() {
        return this._node.attributes.min;
    }

    /**
     * Gets a value indicating whether the column is hidden.
     * @returns {boolean} A flag indicating whether the column is hidden.
     *//**
     * Sets whether the column is hidden.
     * @param {boolean} hidden - A flag indicating whether to hide the column.
     * @returns {Column} The column.
     */
    hidden() {
        return new ArgHandler("Column.hidden")
            .case(() => {
                return this._node.attributes.hidden === 1;
            })
            .case('boolean', hidden => {
                if (hidden) this._node.attributes.hidden = 1;
                else delete this._node.attributes.hidden;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Get the parent sheet.
     * @returns {Sheet} The parent sheet.
     */
    sheet() {
        return this._sheet;
    }

    /**
     * Gets an individual style.
     * @param {string} name - The name of the style.
     * @returns {*} The style.
     *//**
     * Gets multiple styles.
     * @param {Array.<string>} names - The names of the style.
     * @returns {object.<string, *>} Object whose keys are the style names and values are the styles.
     *//**
     * Sets an individual style.
     * @param {string} name - The name of the style.
     * @param {*} value - The value to set.
     * @returns {Cell} The cell.
     *//**
     * Sets multiple styles.
     * @param {object.<string, *>} styles - Object whose keys are the style names and values are the styles to set.
     * @returns {Cell} The cell.
     *//**
	 * Sets to a specific style
	 * @param {Style} style - Style object given from stylesheet.createStyle
	 * @returns {Cell} The cell.
	 */
    style() {
        return new ArgHandler("Column.style")
            .case('string', name => {
                // Get single value
                this._createStyleIfNeeded();
                return this._style.style(name);
            })
            .case('array', names => {
                // Get list of values
                const values = {};
                names.forEach(name => {
                    values[name] = this.style(name);
                });

                return values;
            })
            .case(['string', '*'], (name, value) => {
                // If a row node is already defined that intersects with this column and that row has a style set, we
                // need to make sure that a cell node exists at the intersection so we can style it appropriately.
                // Fetching the cell will force a new cell node to be created with a style matching the column. So we
                // will fetch and style the cell at each row that intersects this column if it is already present or it
                // has a style defined.
                this.sheet().forEachExistingRow(row => {
                    if (row.hasStyle() || row.hasCell(this.columnNumber())) {
                        row.cell(this.columnNumber()).style(name, value);
                    }
                });

                // Set a single value for all cells to a single value
                this._createStyleIfNeeded();
                this._style.style(name, value);

                return this;
            })
            .case('object', nameValues => {
                // Object of key value pairs to set
                for (const name in nameValues) {
                    if (!nameValues.hasOwnProperty(name)) continue;
                    const value = nameValues[name];
                    this.style(name, value);
                }

                return this;
            })
            .case('Style', style => {
                // See Large Comment Above
                this.sheet().forEachExistingRow(row => {
                    if (row.hasStyle() || row.hasCell(this.columnNumber())) {
                        row.cell(this.columnNumber()).style(style);
                    }
                });

                this._style = style;
                this._node.attributes.style = style.id();

                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets the width.
     * @returns {undefined|number} The width (or undefined).
     *//**
     * Sets the width.
     * @param {number} width - The width of the column.
     * @returns {Column} The column.
     */
    width(width) {
        return new ArgHandler("Column.width")
            .case(() => {
                return this._node.attributes.customWidth ? this._node.attributes.width : undefined;
            })
            .case('number', width => {
                this._node.attributes.width = width;
                this._node.attributes.customWidth = 1;
                return this;
            })
            .case('nil', () => {
                delete this._node.attributes.width;
                delete this._node.attributes.customWidth;
                return this;
            })
            .handle(arguments);
    }

    /**
     * Get the parent workbook.
     * @returns {Workbook} The parent workbook.
     */
    workbook() {
        return this.sheet().workbook();
    }

    /**
     * Append vertical page break after the column.
     * @returns {Column} the column.
     */
    addPageBreak() {
        this.sheet().verticalPageBreaks().add(this.columnNumber());
        return this;
    }

    /* INTERNAL */

    /**
     * Convert the column to an XML object.
     * @returns {{}} The XML form.
     * @ignore
     */
    toXml() {
        return this._node;
    }

    /* PRIVATE */

    /**
     * Create a style for this column if it doesn't already exist.
     * @returns {undefined}
     * @private
     */
    _createStyleIfNeeded() {
        if (!this._style) {
            const styleId = this._node.attributes.style;
            this._style = this.workbook().styleSheet().createStyle(styleId);
            this._node.attributes.style = this._style.id();

            if (!this.width()) this.width(defaultColumnWidth);
        }
    }
}

module.exports = Column;

}, function(modId) { var map = {"./ArgHandler":1711202881116,"./addressConverter":1711202881117}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881126, function(require, module, exports) {


const ArgHandler = require("./ArgHandler");
const addressConverter = require("./addressConverter");

/**
 * A range of cells.
 */
class Range {
    // /**
    //  * Creates a new instance of Range.
    //  * @param {Cell} startCell - The start cell.
    //  * @param {Cell} endCell - The end cell.
    //  */
    constructor(startCell, endCell) {
        this._startCell = startCell;
        this._endCell = endCell;
        this._findRangeExtent(startCell, endCell);
    }

    /**
     * Get the address of the range.
     * @param {{}} [opts] - Options
     * @param {boolean} [opts.includeSheetName] - Include the sheet name in the address.
     * @param {boolean} [opts.startRowAnchored] - Anchor the start row.
     * @param {boolean} [opts.startColumnAnchored] - Anchor the start column.
     * @param {boolean} [opts.endRowAnchored] - Anchor the end row.
     * @param {boolean} [opts.endColumnAnchored] - Anchor the end column.
     * @param {boolean} [opts.anchored] - Anchor all row and columns.
     * @returns {string} The address.
     */
    address(opts) {
        return addressConverter.toAddress({
            type: 'range',
            startRowNumber: this.startCell().rowNumber(),
            startRowAnchored: opts && (opts.startRowAnchored || opts.anchored),
            startColumnName: this.startCell().columnName(),
            startColumnAnchored: opts && (opts.startColumnAnchored || opts.anchored),
            endRowNumber: this.endCell().rowNumber(),
            endRowAnchored: opts && (opts.endRowAnchored || opts.anchored),
            endColumnName: this.endCell().columnName(),
            endColumnAnchored: opts && (opts.endColumnAnchored || opts.anchored),
            sheetName: opts && opts.includeSheetName && this.sheet().name()
        });
    }

    /**
     * Gets a cell within the range.
     * @param {number} ri - Row index relative to the top-left corner of the range (0-based).
     * @param {number} ci - Column index relative to the top-left corner of the range (0-based).
     * @returns {Cell} The cell.
     */
    cell(ri, ci) {
        return this.sheet().cell(this._minRowNumber + ri, this._minColumnNumber + ci);
    }

    /**
     * Sets sheet autoFilter to this range.
     * @returns {Range} This range.
     */
    autoFilter() {
        this.sheet().autoFilter(this);

        return this;
    }

    /**
     * Get the cells in the range as a 2D array.
     * @returns {Array.<Array.<Cell>>} The cells.
     */
    cells() {
        return this.map(cell => cell);
    }

    /**
     * Clear the contents of all the cells in the range.
     * @returns {Range} The range.
     */
    clear() {
        return this.value(undefined);
    }

    /**
     * Get the end cell of the range.
     * @returns {Cell} The end cell.
     */
    endCell() {
        return this._endCell;
    }

    /**
     * Callback used by forEach.
     * @callback Range~forEachCallback
     * @param {Cell} cell - The cell.
     * @param {number} ri - The relative row index.
     * @param {number} ci - The relative column index.
     * @param {Range} range - The range.
     * @returns {undefined}
     */
    /**
     * Call a function for each cell in the range. Goes by row then column.
     * @param {Range~forEachCallback} callback - Function called for each cell in the range.
     * @returns {Range} The range.
     */
    forEach(callback) {
        for (let ri = 0; ri < this._numRows; ri++) {
            for (let ci = 0; ci < this._numColumns; ci++) {
                callback(this.cell(ri, ci), ri, ci, this);
            }
        }

        return this;
    }

    /**
     * Gets the shared formula in the start cell (assuming it's the source of the shared formula).
     * @returns {string|undefined} The shared formula.
     *//**
     * Sets the shared formula in the range. The formula will be translated for each cell.
     * @param {string} formula - The formula to set.
     * @returns {Range} The range.
     */
    formula() {
        return new ArgHandler("Range.formula")
            .case(() => {
                return this.startCell().getSharedRefFormula();
            })
            .case('string', formula => {
                const sharedFormulaId = this.sheet().incrementMaxSharedFormulaId();
                this.forEach((cell, ri, ci) => {
                    if (ri === 0 && ci === 0) {
                        cell.setSharedFormula(sharedFormulaId, formula, this.address());
                    } else {
                        cell.setSharedFormula(sharedFormulaId);
                    }
                });

                return this;
            })
            .handle(arguments);
    }

    /**
     * Callback used by map.
     * @callback Range~mapCallback
     * @param {Cell} cell - The cell.
     * @param {number} ri - The relative row index.
     * @param {number} ci - The relative column index.
     * @param {Range} range - The range.
     * @returns {*} The value to map to.
     */
    /**
     * Creates a 2D array of values by running each cell through a callback.
     * @param {Range~mapCallback} callback - Function called for each cell in the range.
     * @returns {Array.<Array.<*>>} The 2D array of return values.
     */
    map(callback) {
        const result = [];
        this.forEach((cell, ri, ci) => {
            if (!result[ri]) result[ri] = [];
            result[ri][ci] = callback(cell, ri, ci, this);
        });

        return result;
    }

    /**
     * Gets a value indicating whether the cells in the range are merged.
     * @returns {boolean} The value.
     *//**
     * Sets a value indicating whether the cells in the range should be merged.
     * @param {boolean} merged - True to merge, false to unmerge.
     * @returns {Range} The range.
     */
    merged(merged) {
        return new ArgHandler('Range.merged')
            .case(() => {
                return this.sheet().merged(this.address());
            })
            .case('*', merged => {
                this.sheet().merged(this.address(), merged);
                return this;
            })
            .handle(arguments);
    }

    /**
     * Gets the data validation object attached to the Range.
     * @returns {object|undefined} The data validation object or undefined if not set.
     *//**
     * Set or clear the data validation object of the entire range.
     * @param {object|undefined} dataValidation - Object or null to clear.
     * @returns {Range} The range.
     */
    dataValidation() {
        return new ArgHandler('Range.dataValidation')
            .case(() => {
                return this.sheet().dataValidation(this.address());
            })
            .case('boolean', obj => {
                return this.sheet().dataValidation(this.address(), obj);
            })
            .case('*', obj => {
                this.sheet().dataValidation(this.address(), obj);
                return this;
            })
            .handle(arguments);
    }

    /**
     * Callback used by reduce.
     * @callback Range~reduceCallback
     * @param {*} accumulator - The accumulated value.
     * @param {Cell} cell - The cell.
     * @param {number} ri - The relative row index.
     * @param {number} ci - The relative column index.
     * @param {Range} range - The range.
     * @returns {*} The value to map to.
     */
    /**
     * Reduces the range to a single value accumulated from the result of a function called for each cell.
     * @param {Range~reduceCallback} callback - Function called for each cell in the range.
     * @param {*} [initialValue] - The initial value.
     * @returns {*} The accumulated value.
     */
    reduce(callback, initialValue) {
        let accumulator = initialValue;
        this.forEach((cell, ri, ci) => {
            accumulator = callback(accumulator, cell, ri, ci, this);
        });

        return accumulator;
    }

    /**
     * Gets the parent sheet of the range.
     * @returns {Sheet} The parent sheet.
     */
    sheet() {
        return this.startCell().sheet();
    }

    /**
     * Gets the start cell of the range.
     * @returns {Cell} The start cell.
     */
    startCell() {
        return this._startCell;
    }

    /**
     * Gets a single style for each cell.
     * @param {string} name - The name of the style.
     * @returns {Array.<Array.<*>>} 2D array of style values.
     *//**
     * Gets multiple styles for each cell.
     * @param {Array.<string>} names - The names of the styles.
     * @returns {Object.<string, Array.<Array.<*>>>} Object whose keys are style names and values are 2D arrays of style values.
     *//**
     * Set the style in each cell to the result of a function called for each.
     * @param {string} name - The name of the style.
     * @param {Range~mapCallback} callback - The callback to provide value for the cell.
     * @returns {Range} The range.
     *//**
     * Sets the style in each cell to the corresponding value in the given 2D array of values.
     * @param {string} name - The name of the style.
     * @param {Array.<Array.<*>>} values - The style values to set.
     * @returns {Range} The range.
     *//**
     * Set the style of all cells in the range to a single style value.
     * @param {string} name - The name of the style.
     * @param {*} value - The value to set.
     * @returns {Range} The range.
     *//**
     * Set multiple styles for the cells in the range.
     * @param {object.<string,Range~mapCallback|Array.<Array.<*>>|*>} styles - Object whose keys are style names and values are either function callbacks, 2D arrays of style values, or a single value for all the cells.
     * @returns {Range} The range.
     *//**
	 * Sets to a specific style
	 * @param {Style} style - Style object given from stylesheet.createStyle
	 * @returns {Range} The range.
	 */
    style() {
        return new ArgHandler("Range.style")
            .case('string', name => {
                // Get single value
                return this.map(cell => cell.style(name));
            })
            .case('array', names => {
                // Get list of values
                const values = {};
                names.forEach(name => {
                    values[name] = this.style(name);
                });

                return values;
            })
            .case(['string', 'function'], (name, callback) => {
                // Set a single value for the cells to the result of a function
                return this.forEach((cell, ri, ci) => {
                    cell.style(name, callback(cell, ri, ci, this));
                });
            })
            .case(['string', 'array'], (name, values) => {
                // Set a single value for the cells using an array of matching dimension
                return this.forEach((cell, ri, ci) => {
                    if (values[ri] && values[ri][ci] !== undefined) {
                        cell.style(name, values[ri][ci]);
                    }
                });
            })
            .case(['string', '*'], (name, value) => {
                // Set a single value for all cells to a single value
                return this.forEach(cell => cell.style(name, value));
            })
            .case('object', nameValues => {
                // Object of key value pairs to set
                for (const name in nameValues) {
                    if (!nameValues.hasOwnProperty(name)) continue;
                    const value = nameValues[name];
                    this.style(name, value);
                }

                return this;
            })
            .case('Style', style => {
                this._style = style;
                return this.forEach(cell => cell.style(style));
            })
            .handle(arguments);
    }

    /**
     * Callback used by tap.
     * @callback Range~tapCallback
     * @param {Range} range - The range.
     * @returns {undefined}
     */
    /**
     * Invoke a callback on the range and return the range. Useful for method chaining.
     * @param {Range~tapCallback} callback - The callback function.
     * @returns {Range} The range.
     */
    tap(callback) {
        callback(this);
        return this;
    }

    /**
     * Callback used by thru.
     * @callback Range~thruCallback
     * @param {Range} range - The range.
     * @returns {*} The value to return from thru.
     */
    /**
     * Invoke a callback on the range and return the value provided by the callback. Useful for method chaining.
     * @param {Range~thruCallback} callback - The callback function.
     * @returns {*} The return value of the callback.
     */
    thru(callback) {
        return callback(this);
    }

    /**
     * Get the values of each cell in the range as a 2D array.
     * @returns {Array.<Array.<*>>} The values.
     *//**
     * Set the values in each cell to the result of a function called for each.
     * @param {Range~mapCallback} callback - The callback to provide value for the cell.
     * @returns {Range} The range.
     *//**
     * Sets the value in each cell to the corresponding value in the given 2D array of values.
     * @param {Array.<Array.<*>>} values - The values to set.
     * @returns {Range} The range.
     *//**
     * Set the value of all cells in the range to a single value.
     * @param {*} value - The value to set.
     * @returns {Range} The range.
     */
    value() {
        return new ArgHandler("Range.value")
            .case(() => {
                // Get values
                return this.map(cell => cell.value());
            })
            .case('function', callback => {
                // Set a value for the cells to the result of a function
                return this.forEach((cell, ri, ci) => {
                    cell.value(callback(cell, ri, ci, this));
                });
            })
            .case('array', values => {
                // Set value for the cells using an array of matching dimension
                return this.forEach((cell, ri, ci) => {
                    if (values[ri] && values[ri][ci] !== undefined) {
                        cell.value(values[ri][ci]);
                    }
                });
            })
            .case('*', value => {
                // Set the value for all cells to a single value
                return this.forEach(cell => cell.value(value));
            })
            .handle(arguments);
    }

    /**
     * Gets the parent workbook.
     * @returns {Workbook} The parent workbook.
     */
    workbook() {
        return this.sheet().workbook();
    }

    /**
     * Find the extent of the range.
     * @returns {undefined}
     * @private
     */
    _findRangeExtent() {
        this._minRowNumber = Math.min(this._startCell.rowNumber(), this._endCell.rowNumber());
        this._maxRowNumber = Math.max(this._startCell.rowNumber(), this._endCell.rowNumber());
        this._minColumnNumber = Math.min(this._startCell.columnNumber(), this._endCell.columnNumber());
        this._maxColumnNumber = Math.max(this._startCell.columnNumber(), this._endCell.columnNumber());
        this._numRows = this._maxRowNumber - this._minRowNumber + 1;
        this._numColumns = this._maxColumnNumber - this._minColumnNumber + 1;
    }
}

module.exports = Range;

}, function(modId) { var map = {"./ArgHandler":1711202881116,"./addressConverter":1711202881117}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881127, function(require, module, exports) {


const _ = require("lodash");

const RELATIONSHIP_SCHEMA_PREFIX = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/";

/**
 * A relationship collection.
 * @ignore
 */
class Relationships {
    /**
     * Creates a new instance of _Relationships.
     * @param {{}} node - The node.
     */
    constructor(node) {
        this._init(node);
        this._getStartingId();
    }

    /**
     * Add a new relationship.
     * @param {string} type - The type of relationship.
     * @param {string} target - The target of the relationship.
     * @param {string} [targetMode] - The target mode of the relationship.
     * @returns {{}} The new relationship.
     */
    add(type, target, targetMode) {
        const node = {
            name: "Relationship",
            attributes: {
                Id: `rId${this._nextId++}`,
                Type: `${RELATIONSHIP_SCHEMA_PREFIX}${type}`,
                Target: target
            }
        };

        if (targetMode) {
            node.attributes.TargetMode = targetMode;
        }

        this._node.children.push(node);
        return node;
    }

    /**
     * Find a relationship by ID.
     * @param {string} id - The relationship ID.
     * @returns {{}|undefined} The matching relationship or undefined if not found.
     */
    findById(id) {
        return _.find(this._node.children, node => node.attributes.Id === id);
    }

    /**
     * Find a relationship by type.
     * @param {string} type - The type to search for.
     * @returns {{}|undefined} The matching relationship or undefined if not found.
     */
    findByType(type) {
        return _.find(this._node.children, node => node.attributes.Type === `${RELATIONSHIP_SCHEMA_PREFIX}${type}`);
    }

    /**
     * Convert the collection to an XML object.
     * @returns {{}|undefined} The XML or undefined if empty.
     */
    toXml() {
        if (!this._node.children.length) return;
        return this._node;
    }

    /**
     * Get the starting relationship ID to use for new relationships.
     * @private
     * @returns {undefined}
     */
    _getStartingId() {
        this._nextId = 1;
        this._node.children.forEach(node => {
            const id = parseInt(node.attributes.Id.substr(3));
            if (id >= this._nextId) this._nextId = id + 1;
        });
    }

    /**
     * Initialize the node.
     * @param {{}} [node] - The relationships node.
     * @private
     * @returns {undefined}
     */
    _init(node) {
        if (!node) node = {
            name: "Relationships",
            attributes: {
                xmlns: "http://schemas.openxmlformats.org/package/2006/relationships"
            },
            children: []
        };

        this._node = node;
    }
}

module.exports = Relationships;

/*
xl/_rels/workbook.xml.rels

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
    <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/calcChain" Target="calcChain.xml"/>
    <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>
*/


}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881128, function(require, module, exports) {


/**
 * PageBreaks
 */
class PageBreaks {
    constructor(node) {
        this._node = node;
    }

    /**
     * add page-breaks by row/column id
     * @param {number} id - row/column id (rowNumber/colNumber)
     * @return {PageBreaks} the page-breaks
     */
    add(id) {
        this._node.children.push({
            name: "brk",
            children: [],
            attributes: {
                id,
                max: 16383,
                man: 1
            }
        });
        this._node.attributes.count++;
        this._node.attributes.manualBreakCount++;

        return this;
    }

    /**
     * remove page-breaks by index
     * @param {number} index - index of list
     * @return {PageBreaks} the page-breaks
     */
    remove(index) {
        const brk = this._node.children[index];
        if (brk) {
            this._node.children.splice(index, 1);
            this._node.attributes.count--;
            if (brk.man) {
                this._node.attributes.manualBreakCount--;
            }
        }

        return this;
    }

    /**
     * get count of the page-breaks
     * @return {number} the page-breaks' count
     */
    get count() {
        return this._node.attributes.count;
    }

    /**
     * get list of page-breaks
     * @return {Array} list of the page-breaks
     */
    get list() {
        return this._node.children.map(brk => ({
            id: brk.id,
            isManual: !!brk.man
        }));
    }
}

module.exports = PageBreaks;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881129, function(require, module, exports) {


const _ = require("lodash");

/**
 * A content type collection.
 * @ignore
 */
class ContentTypes {
    /**
     * Creates a new instance of ContentTypes
     * @param {{}} node - The node.
     */
    constructor(node) {
        this._node = node;
    }

    /**
     * Add a new content type.
     * @param {string} partName - The part name.
     * @param {string} contentType - The content type.
     * @returns {{}} The new content type.
     */
    add(partName, contentType) {
        const node = {
            name: "Override",
            attributes: {
                PartName: partName,
                ContentType: contentType
            }
        };

        this._node.children.push(node);
        return node;
    }

    /**
     * Find a content type by part name.
     * @param {string} partName - The part name.
     * @returns {{}|undefined} The matching content type or undefined if not found.
     */
    findByPartName(partName) {
        return _.find(this._node.children, node => node.attributes.PartName === partName);
    }

    /**
     * Convert the collection to an XML object.
     * @returns {{}} The XML.
     */
    toXml() {
        return this._node;
    }
}

module.exports = ContentTypes;

/*
[Content_Types].xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="bin" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings"/>
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
    <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
    <Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
    <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
    <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
    <Override PartName="/xl/calcChain.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml"/>
    <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
    <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
*/

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881130, function(require, module, exports) {


const _ = require("lodash");
const xmlq = require("./xmlq");
const ArgHandler = require("./ArgHandler");

/**
 * App properties
 * @ignore
 */
class AppProperties {
    /**
     * Creates a new instance of AppProperties
     * @param {{}} node - The node.
     */
    constructor(node) {
        this._node = node;
    }

    isSecure(value) {
        return new ArgHandler("Range.formula")
            .case(() => {
                const docSecurityNode = xmlq.findChild(this._node, "DocSecurity");
                if (!docSecurityNode) return false;
                return docSecurityNode.children[0] === 1;
            })
            .case('boolean', value => {
                const docSecurityNode = xmlq.appendChildIfNotFound(this._node, "DocSecurity");
                docSecurityNode.children = [value ? 1 : 0];
                return this;
            })
            .handle(arguments);
    }

    /**
     * Convert the collection to an XML object.
     * @returns {{}} The XML.
     */
    toXml() {
        return this._node;
    }
}

module.exports = AppProperties;

/*
docProps/app.xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
    <Application>Microsoft Excel</Application>
<DocSecurity>1</DocSecurity>
<ScaleCrop>false</ScaleCrop>
<HeadingPairs>
<vt:vector size="2" baseType="variant">
    <vt:variant>
<vt:lpstr>Worksheets</vt:lpstr>
</vt:variant>
<vt:variant>
<vt:i4>1</vt:i4>
</vt:variant>
</vt:vector>
</HeadingPairs>
<TitlesOfParts>
<vt:vector size="1" baseType="lpstr">
    <vt:lpstr>Sheet1</vt:lpstr>
</vt:vector>
</TitlesOfParts>
<Company/>
<LinksUpToDate>false</LinksUpToDate>
<SharedDoc>false</SharedDoc>
<HyperlinksChanged>false</HyperlinksChanged>
<AppVersion>16.0300</AppVersion>
</Properties>
 */

}, function(modId) { var map = {"./xmlq":1711202881113,"./ArgHandler":1711202881116}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881131, function(require, module, exports) {


const allowedProperties = {
    title: "dc:title",
    subject: "dc:subject",
    author: "dc:creator",
    creator: "dc:creator",
    description: "dc:description",
    keywords: "cp:keywords",
    category: "cp:category"
};

/**
 * Core properties
 * @ignore
 */
class CoreProperties {
    constructor(node) {
        this._node = node;
        this._properties = {};
    }

    /**
     * Sets a specific property.
     * @param {string} name - The name of the property.
     * @param {*} value - The value of the property.
     * @returns {CoreProperties} CoreProperties.
     */
    set(name, value) {
        const key = name.toLowerCase();

        if (typeof allowedProperties[key] === "undefined") {
            throw new Error(`Unknown property name: "${name}"`);
        }

        this._properties[key] = value;

        return this;
    }

    /**
     * Get a specific property.
     * @param {string} name - The name of the property.
     * @returns {*} The property value.
     */
    get(name) {
        const key = name.toLowerCase();

        if (typeof allowedProperties[key] === "undefined") {
            throw new Error(`Unknown property name: "${name}"`);
        }

        return this._properties[key];
    }

    /**
     * Convert the collection to an XML object.
     * @returns {{}} The XML.
     */
    toXml() {
        for (const key in this._properties) {
            if (!this._properties.hasOwnProperty(key)) continue;
            this._node.children.push({
                name: allowedProperties[key],
                children: [this._properties[key]]
            });
        }

        return this._node;
    }
}

module.exports = CoreProperties;

/*
docProps/core.xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>Title</dc:title>
<dc:subject>Subject</dc:subject>
<dc:creator>Creator</dc:creator>
<cp:keywords>Keywords</cp:keywords>
<dc:description>Description</dc:description>
<cp:category>Category</cp:category>
</cp:coreProperties>
 */

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881132, function(require, module, exports) {


const _ = require("lodash");

/**
 * The shared strings table.
 * @ignore
 */
class SharedStrings {
    /**
     * Constructs a new instance of _SharedStrings.
     * @param {{}} node - The node.
     */
    constructor(node) {
        this._stringArray = [];
        this._indexMap = {};

        this._init(node);
        this._cacheExistingSharedStrings();
    }

    /**
     * Gets the index for a string
     * @param {string|Array.<{}>} string - The string or rich text array.
     * @returns {number} The index
     */
    getIndexForString(string) {
        // If the string is found in the cache, return the index.
        const key = _.isArray(string) ? JSON.stringify(string) : string;
        let index = this._indexMap[key];
        if (index >= 0) return index;

        // Otherwise, add it to the caches.
        index = this._stringArray.length;
        this._stringArray.push(string);
        this._indexMap[key] = index;

        // Append a new si node.
        this._node.children.push({
            name: "si",
            children: _.isArray(string) ? string : [
                {
                    name: "t",
                    attributes: { 'xml:space': "preserve" },
                    children: [string]
                }
            ]
        });

        return index;
    }

    /**
     * Get the string for a given index
     * @param {number} index - The index
     * @returns {string} The string
     */
    getStringByIndex(index) {
        return this._stringArray[index];
    }

    /**
     * Convert the collection to an XML object.
     * @returns {{}} The XML object.
     */
    toXml() {
        return this._node;
    }

    /**
     * Store any existing values in the caches.
     * @private
     * @returns {undefined}
     */
    _cacheExistingSharedStrings() {
        this._node.children.forEach((node, i) => {
            const content = node.children[0];
            if (content.name === "t") {
                const string = content.children[0];
                this._stringArray.push(string);
                this._indexMap[string] = i;
            } else {
                // TODO: Properly support rich text nodes in the future. For now just store the object as a placeholder.
                this._stringArray.push(node.children);
                this._indexMap[JSON.stringify(node.children)] = i;
            }
        });
    }

    /**
     * Initialize the node.
     * @param {{}} [node] - The shared strings node.
     * @private
     * @returns {undefined}
     */
    _init(node) {
        if (!node) node = {
            name: "sst",
            attributes: {
                xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
            },
            children: []
        };

        this._node = node;

        delete this._node.attributes.count;
        delete this._node.attributes.uniqueCount;
    }
}

module.exports = SharedStrings;

/*
xl/sharedStrings.xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="13" uniqueCount="4">
	<si>
		<t>Foo</t>
	</si>
	<si>
		<t>Bar</t>
	</si>
	<si>
		<t>Goo</t>
	</si>
	<si>
		<r>
			<t>s</t>
		</r><r>
			<rPr>
				<b/>
				<sz val="11"/>
				<color theme="1"/>
				<rFont val="Calibri"/>
				<family val="2"/>
				<scheme val="minor"/>
			</rPr><t>d;</t>
		</r><r>
			<rPr>
				<sz val="11"/>
				<color theme="1"/>
				<rFont val="Calibri"/>
				<family val="2"/>
				<scheme val="minor"/>
			</rPr><t>lfk;l</t>
		</r>
	</si>
</sst>
*/

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881133, function(require, module, exports) {


const _ = require("lodash");
const xmlq = require("./xmlq");
const Style = require("./Style");

/**
 * Standard number format codes
 * Taken from http://polymathprogrammer.com/2011/02/15/built-in-styles-for-excel-open-xml/
 * @private
 */
const STANDARD_CODES = {
    0: 'General',
    1: '0',
    2: '0.00',
    3: '#,##0',
    4: '#,##0.00',
    9: '0%',
    10: '0.00%',
    11: '0.00E+00',
    12: '# ?/?',
    13: '# ??/??',
    14: 'mm-dd-yy',
    15: 'd-mmm-yy',
    16: 'd-mmm',
    17: 'mmm-yy',
    18: 'h:mm AM/PM',
    19: 'h:mm:ss AM/PM',
    20: 'h:mm',
    21: 'h:mm:ss',
    22: 'm/d/yy h:mm',
    37: '#,##0 ;(#,##0)',
    38: '#,##0 ;[Red](#,##0)',
    39: '#,##0.00;(#,##0.00)',
    40: '#,##0.00;[Red](#,##0.00)',
    45: 'mm:ss',
    46: '[h]:mm:ss',
    47: 'mmss.0',
    48: '##0.0E+0',
    49: '@'
};

/**
 * The starting ID for custom number formats. The first 163 indexes are reserved.
 * @private
 */
const STARTING_CUSTOM_NUMBER_FORMAT_ID = 164;

/**
 * A style sheet.
 * @ignore
 */
class StyleSheet {
    /**
     * Creates an instance of _StyleSheet.
     * @param {string} node - The style sheet node
     */
    constructor(node) {
        this._init(node);
        this._cacheNumberFormats();
    }

    /**
     * Create a style.
     * @param {number} [sourceId] - The source style ID to copy, if provided.
     * @returns {Style} The style.
     */
    createStyle(sourceId) {
        let fontNode, fillNode, borderNode, xfNode;
        if (sourceId >= 0) {
            const sourceXfNode = this._cellXfsNode.children[sourceId];
            xfNode = _.cloneDeep(sourceXfNode);

            if (sourceXfNode.attributes.applyFont) {
                const fontId = sourceXfNode.attributes.fontId;
                fontNode = _.cloneDeep(this._fontsNode.children[fontId]);
            }

            if (sourceXfNode.attributes.applyFill) {
                const fillId = sourceXfNode.attributes.fillId;
                fillNode = _.cloneDeep(this._fillsNode.children[fillId]);
            }

            if (sourceXfNode.attributes.applyBorder) {
                const borderId = sourceXfNode.attributes.borderId;
                borderNode = _.cloneDeep(this._bordersNode.children[borderId]);
            }
        }

        if (!fontNode) fontNode = { name: "font", attributes: {}, children: [] };
        this._fontsNode.children.push(fontNode);

        if (!fillNode) fillNode = { name: "fill", attributes: {}, children: [] };
        this._fillsNode.children.push(fillNode);

        // The border sides must be in order
        if (!borderNode) borderNode = { name: "border", attributes: {}, children: [] };
        borderNode.children = [
            xmlq.findChild(borderNode, "left") || { name: "left", attributes: {}, children: [] },
            xmlq.findChild(borderNode, "right") || { name: "right", attributes: {}, children: [] },
            xmlq.findChild(borderNode, "top") || { name: "top", attributes: {}, children: [] },
            xmlq.findChild(borderNode, "bottom") || { name: "bottom", attributes: {}, children: [] },
            xmlq.findChild(borderNode, "diagonal") || { name: "diagonal", attributes: {}, children: [] }
        ];
        this._bordersNode.children.push(borderNode);

        if (!xfNode) xfNode = { name: "xf", attributes: {}, children: [] };
        _.assign(xfNode.attributes, {
            fontId: this._fontsNode.children.length - 1,
            fillId: this._fillsNode.children.length - 1,
            borderId: this._bordersNode.children.length - 1,
            applyFont: 1,
            applyFill: 1,
            applyBorder: 1
        });

        this._cellXfsNode.children.push(xfNode);

        return new Style(this, this._cellXfsNode.children.length - 1, xfNode, fontNode, fillNode, borderNode);
    }

    /**
     * Get the number format code for a given ID.
     * @param {number} id - The number format ID.
     * @returns {string} The format code.
     */
    getNumberFormatCode(id) {
        return this._numberFormatCodesById[id];
    }

    /**
     * Get the nuumber format ID for a given code.
     * @param {string} code - The format code.
     * @returns {number} The number format ID.
     */
    getNumberFormatId(code) {
        let id = this._numberFormatIdsByCode[code];
        if (id === undefined) {
            id = this._nextNumFormatId++;
            this._numberFormatCodesById[id] = code;
            this._numberFormatIdsByCode[code] = id;

            this._numFmtsNode.children.push({
                name: 'numFmt',
                attributes: {
                    numFmtId: id,
                    formatCode: code
                }
            });
        }

        return id;
    }

    /**
     * Convert the style sheet to an XML object.
     * @returns {{}} The XML form.
     * @ignore
     */
    toXml() {
        return this._node;
    }

    /**
     * Cache the number format codes
     * @returns {undefined}
     * @private
     */
    _cacheNumberFormats() {
        // Load the standard number format codes into the caches.
        this._numberFormatCodesById = {};
        this._numberFormatIdsByCode = {};
        for (const id in STANDARD_CODES) {
            if (!STANDARD_CODES.hasOwnProperty(id)) continue;
            const code = STANDARD_CODES[id];
            this._numberFormatCodesById[id] = code;
            this._numberFormatIdsByCode[code] = parseInt(id);
        }

        // Set the next number format code.
        this._nextNumFormatId = STARTING_CUSTOM_NUMBER_FORMAT_ID;

        // If there are custom number formats, cache them all and update the next num as needed.
        this._numFmtsNode.children.forEach(node => {
            const id = node.attributes.numFmtId;
            const code = node.attributes.formatCode;
            this._numberFormatCodesById[id] = code;
            this._numberFormatIdsByCode[code] = id;
            if (id >= this._nextNumFormatId) this._nextNumFormatId = id + 1;
        });
    }

    /**
     * Initialize the style sheet node.
     * @param {{}} [node] - The node
     * @returns {undefined}
     * @private
     */
    _init(node) {
        this._node = node;

        // Cache the refs to the collections.
        this._numFmtsNode = xmlq.findChild(this._node, "numFmts");
        this._fontsNode = xmlq.findChild(this._node, "fonts");
        this._fillsNode = xmlq.findChild(this._node, "fills");
        this._bordersNode = xmlq.findChild(this._node, "borders");
        this._cellXfsNode = xmlq.findChild(this._node, "cellXfs");

        if (!this._numFmtsNode) {
            this._numFmtsNode = {
                name: "numFmts",
                attributes: {},
                children: []
            };

            // Number formats need to be before the others.
            xmlq.insertBefore(this._node, this._numFmtsNode, this._fontsNode);
        }

        // Remove the optional counts so we don't have to keep them up to date.
        delete this._numFmtsNode.attributes.count;
        delete this._fontsNode.attributes.count;
        delete this._fillsNode.attributes.count;
        delete this._bordersNode.attributes.count;
        delete this._cellXfsNode.attributes.count;
    }
}

module.exports = StyleSheet;

/*
xl/styles.xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac x16r2" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:x16r2="http://schemas.microsoft.com/office/spreadsheetml/2015/02/main">
    <numFmts count="1">
        <numFmt numFmtId="164" formatCode="#,##0_);[Red]\(#,##0\)\)"/>
    </numFmts>
    <fonts count="1" x14ac:knownFonts="1">
        <font>
            <sz val="11"/>
            <color theme="1"/>
            <name val="Calibri"/>
            <family val="2"/>
            <scheme val="minor"/>
        </font>
    </fonts>
    <fills count="11">
        <fill>
            <patternFill patternType="none"/>
        </fill>
        <fill>
            <patternFill patternType="gray125"/>
        </fill>
        <fill>
            <patternFill patternType="solid">
                <fgColor rgb="FFC00000"/>
                <bgColor indexed="64"/>
            </patternFill>
        </fill>
        <fill>
            <patternFill patternType="lightDown">
                <fgColor theme="4"/>
                <bgColor rgb="FFC00000"/>
            </patternFill>
        </fill>
        <fill>
            <gradientFill degree="90">
                <stop position="0">
                    <color theme="0"/>
                </stop>
                <stop position="1">
                    <color theme="4"/>
                </stop>
            </gradientFill>
        </fill>
        <fill>
            <gradientFill>
                <stop position="0">
                    <color theme="0"/>
                </stop>
                <stop position="1">
                    <color theme="4"/>
                </stop>
            </gradientFill>
        </fill>
        <fill>
            <gradientFill degree="45">
                <stop position="0">
                    <color theme="0"/>
                </stop>
                <stop position="1">
                    <color theme="4"/>
                </stop>
            </gradientFill>
        </fill>
        <fill>
            <gradientFill degree="135">
                <stop position="0">
                    <color theme="0"/>
                </stop>
                <stop position="1">
                    <color theme="4"/>
                </stop>
            </gradientFill>
        </fill>
        <fill>
            <gradientFill type="path">
                <stop position="0">
                    <color theme="0"/>
                </stop>
                <stop position="1">
                    <color theme="4"/>
                </stop>
            </gradientFill>
        </fill>
        <fill>
            <gradientFill type="path" left="0.5" right="0.5" top="0.5" bottom="0.5">
                <stop position="0">
                    <color theme="0"/>
                </stop>
                <stop position="1">
                    <color theme="4"/>
                </stop>
            </gradientFill>
        </fill>
        <fill>
            <gradientFill degree="270">
                <stop position="0">
                    <color theme="0"/>
                </stop>
                <stop position="1">
                    <color theme="4"/>
                </stop>
            </gradientFill>
        </fill>
    </fills>
    <borders count="10">
        <border>
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal/>
        </border>
        <border diagonalDown="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="hair">
                <color auto="1"/>
            </diagonal>
        </border>
        <border diagonalDown="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="dotted">
                <color auto="1"/>
            </diagonal>
        </border>
        <border diagonalDown="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="dashDotDot">
                <color auto="1"/>
            </diagonal>
        </border>
        <border diagonalDown="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="dashDot">
                <color auto="1"/>
            </diagonal>
        </border>
        <border diagonalDown="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="dashed">
                <color auto="1"/>
            </diagonal>
        </border>
        <border diagonalUp="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="mediumDashDotDot">
                <color auto="1"/>
            </diagonal>
        </border>
        <border diagonalUp="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="slantDashDot">
                <color auto="1"/>
            </diagonal>
        </border>
        <border diagonalUp="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="mediumDashDot">
                <color auto="1"/>
            </diagonal>
        </border>
        <border diagonalUp="1">
            <left/>
            <right/>
            <top/>
            <bottom/>
            <diagonal style="mediumDashed">
                <color auto="1"/>
            </diagonal>
        </border>
    </borders>
    <cellStyleXfs count="1">
        <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
    </cellStyleXfs>
    <cellXfs count="19">
        <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="2" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="3" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="4" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="5" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="6" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="7" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="8" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="0" borderId="9" xfId="0" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="2" borderId="0" xfId="0" applyFill="1" applyBorder="1"/>
        <xf numFmtId="0" fontId="0" fillId="3" borderId="0" xfId="0" applyFill="1"/>
        <xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1"/>
        <xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1"/>
        <xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1"/>
        <xf numFmtId="0" fontId="0" fillId="7" borderId="0" xfId="0" applyFill="1"/>
        <xf numFmtId="0" fontId="0" fillId="8" borderId="0" xfId="0" applyFill="1"/>
        <xf numFmtId="0" fontId="0" fillId="9" borderId="0" xfId="0" applyFill="1"/>
        <xf numFmtId="0" fontId="0" fillId="10" borderId="0" xfId="0" applyFill="1"/>
    </cellXfs>
    <cellStyles count="1">
        <cellStyle name="Normal" xfId="0" builtinId="0"/>
    </cellStyles>
    <dxfs count="0"/>
    <tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/>
    <extLst>
        <ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main">
            <x14:slicerStyles defaultSlicerStyle="SlicerStyleLight1"/>
        </ext>
        <ext uri="{9260A510-F301-46a8-8635-F512D64BE5F5}" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main">
            <x15:timelineStyles defaultTimelineStyle="TimeSlicerStyleLight1"/>
        </ext>
    </extLst>
</styleSheet>
*/

}, function(modId) { var map = {"./xmlq":1711202881113,"./Style":1711202881120}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881134, function(require, module, exports) {


/**
 * OOXML uses the CFB file format with Agile Encryption. The details of the encryption are here:
 * https://msdn.microsoft.com/en-us/library/dd950165(v=office.12).aspx
 *
 * Helpful guidance also take from this Github project:
 * https://github.com/nolze/ms-offcrypto-tool
 */

const _ = require("lodash");
const cfb = require("cfb");
const crypto = require("crypto");
const externals = require("./externals");
const XmlParser = require("./XmlParser");
const XmlBuilder = require("./XmlBuilder");
const xmlq = require("./xmlq");

const ENCRYPTION_INFO_PREFIX = Buffer.from([0x04, 0x00, 0x04, 0x00, 0x40, 0x00, 0x00, 0x00]); // First 4 bytes are the version number, second 4 bytes are reserved.
const PACKAGE_ENCRYPTION_CHUNK_SIZE = 4096;
const PACKAGE_OFFSET = 8; // First 8 bytes are the size of the stream

// Block keys used for encryption
const BLOCK_KEYS = {
    dataIntegrity: {
        hmacKey: Buffer.from([0x5f, 0xb2, 0xad, 0x01, 0x0c, 0xb9, 0xe1, 0xf6]),
        hmacValue: Buffer.from([0xa0, 0x67, 0x7f, 0x02, 0xb2, 0x2c, 0x84, 0x33])
    },
    key: Buffer.from([0x14, 0x6e, 0x0b, 0xe7, 0xab, 0xac, 0xd0, 0xd6]),
    verifierHash: {
        input: Buffer.from([0xfe, 0xa7, 0xd2, 0x76, 0x3b, 0x4b, 0x9e, 0x79]),
        value: Buffer.from([0xd7, 0xaa, 0x0f, 0x6d, 0x30, 0x61, 0x34, 0x4e])
    }
};

/**
 * Encrypts/decrypts XLSXs.
 * @private
 */
class Encryptor {
    /**
     * Encrypt the data with the password.
     * @param {Buffer} data - The data to encrypt
     * @param {string} password - The password
     * @returns {Buffer} The encrypted data
     */
    encrypt(data, password) {
        // Generate a random key to use to encrypt the document. Excel uses 32 bytes. We'll use the password to encrypt this key.
        // N.B. The number of bits needs to correspond to an algorithm available in crypto (e.g. aes-256-cbc).
        const packageKey = crypto.randomBytes(32);

        // Create the encryption info. We'll use this for all of the encryption operations and for building the encryption info XML entry
        const encryptionInfo = {
            package: { // Info on the encryption of the package.
                cipherAlgorithm: 'AES', // Cipher algorithm to use. Excel uses AES.
                cipherChaining: 'ChainingModeCBC', // Cipher chaining mode to use. Excel uses CBC.
                saltValue: crypto.randomBytes(16), // Random value to use as encryption salt. Excel uses 16 bytes.
                hashAlgorithm: 'SHA512', // Hash algorithm to use. Excel uses SHA512.
                hashSize: 64, // The size of the hash in bytes. SHA512 results in 64-byte hashes
                blockSize: 16, // The number of bytes used to encrypt one block of data. It MUST be at least 2, no greater than 4096, and a multiple of 2. Excel uses 16
                keyBits: packageKey.length * 8 // The number of bits in the package key.
            },
            key: { // Info on the encryption of the package key.
                cipherAlgorithm: 'AES', // Cipher algorithm to use. Excel uses AES.
                cipherChaining: 'ChainingModeCBC', // Cipher chaining mode to use. Excel uses CBC.
                saltValue: crypto.randomBytes(16), // Random value to use as encryption salt. Excel uses 16 bytes.
                hashAlgorithm: 'SHA512', // Hash algorithm to use. Excel uses SHA512.
                hashSize: 64, // The size of the hash in bytes. SHA512 results in 64-byte hashes
                blockSize: 16, // The number of bytes used to encrypt one block of data. It MUST be at least 2, no greater than 4096, and a multiple of 2. Excel uses 16
                spinCount: 100000, // The number of times to iterate on a hash of a password. It MUST NOT be greater than 10,000,000. Excel uses 100,000.
                keyBits: 256 // The length of the key to generate from the password. Must be a multiple of 8. Excel uses 256.
            }
        };

        /* Package Encryption */

        // Encrypt package using the package key.
        const encryptedPackage = this._cryptPackage(
            true,
            encryptionInfo.package.cipherAlgorithm,
            encryptionInfo.package.cipherChaining,
            encryptionInfo.package.hashAlgorithm,
            encryptionInfo.package.blockSize,
            encryptionInfo.package.saltValue,
            packageKey,
            data
        );

        /* Data Integrity */

        // Create the data integrity fields used by clients for integrity checks.
        // First generate a random array of bytes to use in HMAC. The docs say to use the same length as the key salt, but Excel seems to use 64.
        const hmacKey = crypto.randomBytes(64);

        // Then create an initialization vector using the package encryption info and the appropriate block key.
        const hmacKeyIV = this._createIV(
            encryptionInfo.package.hashAlgorithm,
            encryptionInfo.package.saltValue,
            encryptionInfo.package.blockSize,
            BLOCK_KEYS.dataIntegrity.hmacKey
        );

        // Use the package key and the IV to encrypt the HMAC key
        const encryptedHmacKey = this._crypt(
            true,
            encryptionInfo.package.cipherAlgorithm,
            encryptionInfo.package.cipherChaining,
            packageKey,
            hmacKeyIV,
            hmacKey);

        // Now create the HMAC
        const hmacValue = this._hmac(encryptionInfo.package.hashAlgorithm, hmacKey, encryptedPackage);

        // Next generate an initialization vector for encrypting the resulting HMAC value.
        const hmacValueIV = this._createIV(
            encryptionInfo.package.hashAlgorithm,
            encryptionInfo.package.saltValue,
            encryptionInfo.package.blockSize,
            BLOCK_KEYS.dataIntegrity.hmacValue
        );

        // Now encrypt the value
        const encryptedHmacValue = this._crypt(
            true,
            encryptionInfo.package.cipherAlgorithm,
            encryptionInfo.package.cipherChaining,
            packageKey,
            hmacValueIV,
            hmacValue
        );

        // Put the encrypted key and value on the encryption info
        encryptionInfo.dataIntegrity = {
            encryptedHmacKey,
            encryptedHmacValue
        };

        /* Key Encryption */

        // Convert the password to an encryption key
        const key = this._convertPasswordToKey(
            password,
            encryptionInfo.key.hashAlgorithm,
            encryptionInfo.key.saltValue,
            encryptionInfo.key.spinCount,
            encryptionInfo.key.keyBits,
            BLOCK_KEYS.key
        );

        // Encrypt the package key with the
        encryptionInfo.key.encryptedKeyValue = this._crypt(
            true,
            encryptionInfo.key.cipherAlgorithm,
            encryptionInfo.key.cipherChaining,
            key,
            encryptionInfo.key.saltValue,
            packageKey);

        /* Verifier hash */

        // Create a random byte array for hashing
        const verifierHashInput = crypto.randomBytes(16);

        // Create an encryption key from the password for the input
        const verifierHashInputKey = this._convertPasswordToKey(
            password,
            encryptionInfo.key.hashAlgorithm,
            encryptionInfo.key.saltValue,
            encryptionInfo.key.spinCount,
            encryptionInfo.key.keyBits,
            BLOCK_KEYS.verifierHash.input
        );

        // Use the key to encrypt the verifier input
        encryptionInfo.key.encryptedVerifierHashInput = this._crypt(
            true,
            encryptionInfo.key.cipherAlgorithm,
            encryptionInfo.key.cipherChaining,
            verifierHashInputKey,
            encryptionInfo.key.saltValue,
            verifierHashInput
        );

        // Create a hash of the input
        const verifierHashValue = this._hash(encryptionInfo.key.hashAlgorithm, verifierHashInput);

        // Create an encryption key from the password for the hash
        const verifierHashValueKey = this._convertPasswordToKey(
            password,
            encryptionInfo.key.hashAlgorithm,
            encryptionInfo.key.saltValue,
            encryptionInfo.key.spinCount,
            encryptionInfo.key.keyBits,
            BLOCK_KEYS.verifierHash.value
        );

        // Use the key to encrypt the hash value
        encryptionInfo.key.encryptedVerifierHashValue = this._crypt(
            true,
            encryptionInfo.key.cipherAlgorithm,
            encryptionInfo.key.cipherChaining,
            verifierHashValueKey,
            encryptionInfo.key.saltValue,
            verifierHashValue
        );

        // Build the encryption info buffer
        const encryptionInfoBuffer = this._buildEncryptionInfo(encryptionInfo);

        // Create a new CFB
        let output = cfb.utils.cfb_new();

        // Add the encryption info and encrypted package
        cfb.utils.cfb_add(output, "EncryptionInfo", encryptionInfoBuffer);
        cfb.utils.cfb_add(output, "EncryptedPackage", encryptedPackage);

        // Delete the SheetJS entry that is added at initialization
        cfb.utils.cfb_del(output, "\u0001Sh33tJ5");

        // Write to a buffer and return
        output = cfb.write(output);

        // The cfb library writes to a Uint8array in the browser. Convert to a Buffer.
        if (!Buffer.isBuffer(output)) output = Buffer.from(output);

        return output;
    }

    /**
     * Decrypt the data with the given password
     * @param {Buffer} data - The data to decrypt
     * @param {string} password - The password
     * @returns {Promise.<Buffer>} The decrypted data
     */
    decryptAsync(data, password) {
        // Parse the CFB input and pull out the encryption info and encrypted package entries.
        const parsed = cfb.parse(data);
        let encryptionInfoBuffer = _.find(parsed.FileIndex, { name: "EncryptionInfo" }).content;
        let encryptedPackageBuffer = _.find(parsed.FileIndex, { name: "EncryptedPackage" }).content;

        // In the browser the CFB content is an array. Convert to a Buffer.
        if (!Buffer.isBuffer(encryptionInfoBuffer)) encryptionInfoBuffer = Buffer.from(encryptionInfoBuffer);
        if (!Buffer.isBuffer(encryptedPackageBuffer)) encryptedPackageBuffer = Buffer.from(encryptedPackageBuffer);

        return externals.Promise.resolve()
            .then(() => this._parseEncryptionInfoAsync(encryptionInfoBuffer)) // Parse the encryption info XML into an object
            .then(encryptionInfo => {
                // Convert the password into an encryption key
                const key = this._convertPasswordToKey(
                    password,
                    encryptionInfo.key.hashAlgorithm,
                    encryptionInfo.key.saltValue,
                    encryptionInfo.key.spinCount,
                    encryptionInfo.key.keyBits,
                    BLOCK_KEYS.key
                );

                // Use the key to decrypt the package key
                const packageKey = this._crypt(
                    false,
                    encryptionInfo.key.cipherAlgorithm,
                    encryptionInfo.key.cipherChaining,
                    key,
                    encryptionInfo.key.saltValue,
                    encryptionInfo.key.encryptedKeyValue
                );

                // Use the package key to decrypt the package
                return this._cryptPackage(
                    false,
                    encryptionInfo.package.cipherAlgorithm,
                    encryptionInfo.package.cipherChaining,
                    encryptionInfo.package.hashAlgorithm,
                    encryptionInfo.package.blockSize,
                    encryptionInfo.package.saltValue,
                    packageKey,
                    encryptedPackageBuffer);
            });
    }

    /**
     * Build the encryption info XML/buffer
     * @param {{}} encryptionInfo - The encryption info object
     * @returns {Buffer} The buffer
     * @private
     */
    _buildEncryptionInfo(encryptionInfo) {
        // Map the object into the appropriate XML structure. Buffers are encoded in base 64.
        const encryptionInfoNode = {
            name: "encryption",
            attributes: {
                xmlns: "http://schemas.microsoft.com/office/2006/encryption",
                'xmlns:p': "http://schemas.microsoft.com/office/2006/keyEncryptor/password",
                'xmlns:c': "http://schemas.microsoft.com/office/2006/keyEncryptor/certificate"
            },
            children: [
                {
                    name: "keyData",
                    attributes: {
                        saltSize: encryptionInfo.package.saltValue.length,
                        blockSize: encryptionInfo.package.blockSize,
                        keyBits: encryptionInfo.package.keyBits,
                        hashSize: encryptionInfo.package.hashSize,
                        cipherAlgorithm: encryptionInfo.package.cipherAlgorithm,
                        cipherChaining: encryptionInfo.package.cipherChaining,
                        hashAlgorithm: encryptionInfo.package.hashAlgorithm,
                        saltValue: encryptionInfo.package.saltValue.toString("base64")
                    }
                },
                {
                    name: "dataIntegrity",
                    attributes: {
                        encryptedHmacKey: encryptionInfo.dataIntegrity.encryptedHmacKey.toString("base64"),
                        encryptedHmacValue: encryptionInfo.dataIntegrity.encryptedHmacValue.toString("base64")
                    }
                },
                {
                    name: "keyEncryptors",
                    children: [
                        {
                            name: "keyEncryptor",
                            attributes: {
                                uri: "http://schemas.microsoft.com/office/2006/keyEncryptor/password"
                            },
                            children: [
                                {
                                    name: "p:encryptedKey",
                                    attributes: {
                                        spinCount: encryptionInfo.key.spinCount,
                                        saltSize: encryptionInfo.key.saltValue.length,
                                        blockSize: encryptionInfo.key.blockSize,
                                        keyBits: encryptionInfo.key.keyBits,
                                        hashSize: encryptionInfo.key.hashSize,
                                        cipherAlgorithm: encryptionInfo.key.cipherAlgorithm,
                                        cipherChaining: encryptionInfo.key.cipherChaining,
                                        hashAlgorithm: encryptionInfo.key.hashAlgorithm,
                                        saltValue: encryptionInfo.key.saltValue.toString("base64"),
                                        encryptedVerifierHashInput: encryptionInfo.key.encryptedVerifierHashInput.toString("base64"),
                                        encryptedVerifierHashValue: encryptionInfo.key.encryptedVerifierHashValue.toString("base64"),
                                        encryptedKeyValue: encryptionInfo.key.encryptedKeyValue.toString("base64")
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        // Convert to an XML string
        const xmlBuilder = new XmlBuilder();
        const encryptionInfoXml = xmlBuilder.build(encryptionInfoNode);

        // Convert to a buffer and prefix with the appropriate bytes
        return Buffer.concat([ENCRYPTION_INFO_PREFIX, Buffer.from(encryptionInfoXml, "utf8")]);
    }

    /**
     * Parse the encryption info from the XML/buffer
     * @param {Buffer} buffer - The buffer
     * @returns {Promise.<{}>} The parsed encryption info object
     * @private
     */
    _parseEncryptionInfoAsync(buffer) {
        // Pull off the prefix and convert to string
        const xml = buffer.slice(ENCRYPTION_INFO_PREFIX.length).toString("utf8");

        // Parse the XML
        const xmlParser = new XmlParser();
        return xmlParser.parseAsync(xml)
            .then(doc => {
                // Pull out the relevant values for decryption and return
                const keyDataNode = xmlq.findChild(doc, "keyData");
                const keyEncryptorsNode = xmlq.findChild(doc, "keyEncryptors");
                const keyEncryptorNode = xmlq.findChild(keyEncryptorsNode, "keyEncryptor");
                const encryptedKeyNode = xmlq.findChild(keyEncryptorNode, "p:encryptedKey");

                return {
                    package: {
                        cipherAlgorithm: keyDataNode.attributes.cipherAlgorithm,
                        cipherChaining: keyDataNode.attributes.cipherChaining,
                        saltValue: Buffer.from(keyDataNode.attributes.saltValue, "base64"),
                        hashAlgorithm: keyDataNode.attributes.hashAlgorithm,
                        blockSize: keyDataNode.attributes.blockSize
                    },
                    key: {
                        encryptedKeyValue: Buffer.from(encryptedKeyNode.attributes.encryptedKeyValue, "base64"),
                        cipherAlgorithm: encryptedKeyNode.attributes.cipherAlgorithm,
                        cipherChaining: encryptedKeyNode.attributes.cipherChaining,
                        saltValue: Buffer.from(encryptedKeyNode.attributes.saltValue, "base64"),
                        hashAlgorithm: encryptedKeyNode.attributes.hashAlgorithm,
                        spinCount: encryptedKeyNode.attributes.spinCount,
                        keyBits: encryptedKeyNode.attributes.keyBits
                    }
                };
            });
    }

    /**
     * Calculate a hash of the concatenated buffers with the given algorithm.
     * @param {string} algorithm - The hash algorithm.
     * @param {Array.<Buffer>} buffers - The buffers to concat and hash
     * @returns {Buffer} The hash
     * @private
     */
    _hash(algorithm, ...buffers) {
        algorithm = algorithm.toLowerCase();
        const hashes = crypto.getHashes();
        if (hashes.indexOf(algorithm) < 0) throw new Error(`Hash algorithm '${algorithm}' not supported!`);

        const hash = crypto.createHash(algorithm);
        hash.update(Buffer.concat(buffers));
        return hash.digest();
    }

    /**
     * Calculate an HMAC of the concatenated buffers with the given algorithm and key
     * @param {string} algorithm - The algorithm.
     * @param {string} key - The key
     * @param {Array.<Buffer>} buffers - The buffer to concat and HMAC
     * @returns {Buffer} The HMAC
     * @private
     */
    _hmac(algorithm, key, ...buffers) {
        algorithm = algorithm.toLowerCase();
        const hashes = crypto.getHashes();
        if (hashes.indexOf(algorithm) < 0) throw new Error(`HMAC algorithm '${algorithm}' not supported!`);

        const hmac = crypto.createHmac(algorithm, key);
        hmac.update(Buffer.concat(buffers));
        return hmac.digest();
    }

    /**
     * Encrypt/decrypt input
     * @param {boolean} encrypt - True to encrypt, false to decrypt
     * @param {string} cipherAlgorithm - The cipher algorithm
     * @param {sring} cipherChaining - The cipher chaining mode
     * @param {Buffer} key - The encryption key
     * @param {Buffer} iv - The initialization vector
     * @param {Buffer} input - The input
     * @returns {Buffer} The output
     * @private
     */
    _crypt(encrypt, cipherAlgorithm, cipherChaining, key, iv, input) {
        let algorithm = `${cipherAlgorithm.toLowerCase()}-${key.length * 8}`;
        if (cipherChaining === 'ChainingModeCBC') algorithm += '-cbc';
        else throw new Error(`Unknown cipher chaining: ${cipherChaining}`);

        const cipher = crypto[encrypt ? 'createCipheriv' : 'createDecipheriv'](algorithm, key, iv);
        cipher.setAutoPadding(false);
        let output = cipher.update(input);
        output = Buffer.concat([output, cipher.final()]);
        return output;
    }

    /**
     * Encrypt/decrypt the package
     * @param {boolean} encrypt - True to encrypt, false to decrypt
     * @param {string} cipherAlgorithm - The cipher algorithm
     * @param {string} cipherChaining - The cipher chaining mode
     * @param {string} hashAlgorithm - The hash algorithm
     * @param {number} blockSize - The IV block size
     * @param {Buffer} saltValue - The salt
     * @param {Buffer} key - The encryption key
     * @param {Buffer} input - The package input
     * @returns {Buffer} The output
     * @private
     */
    _cryptPackage(encrypt, cipherAlgorithm, cipherChaining, hashAlgorithm, blockSize, saltValue, key, input) {
        // The first 8 bytes is supposed to be the length, but it seems like it is really the length - 4..
        const outputChunks = [];
        const offset = encrypt ? 0 : PACKAGE_OFFSET;

        // The package is encoded in chunks. Encrypt/decrypt each and concat.
        let i = 0, start = 0, end = 0;
        while (end < input.length) {
            start = end;
            end = start + PACKAGE_ENCRYPTION_CHUNK_SIZE;
            if (end > input.length) end = input.length;

            // Grab the next chunk
            let inputChunk = input.slice(start + offset, end + offset);

            // Pad the chunk if it is not an integer multiple of the block size
            const remainder = inputChunk.length % blockSize;
            if (remainder) inputChunk = Buffer.concat([inputChunk, Buffer.alloc(blockSize - remainder)]);

            // Create the initialization vector
            const iv = this._createIV(hashAlgorithm, saltValue, blockSize, i);

            // Encrypt/decrypt the chunk and add it to the array
            const outputChunk = this._crypt(encrypt, cipherAlgorithm, cipherChaining, key, iv, inputChunk);
            outputChunks.push(outputChunk);

            i++;
        }

        // Concat all of the output chunks.
        let output = Buffer.concat(outputChunks);

        if (encrypt) {
            // Put the length of the package in the first 8 bytes
            output = Buffer.concat([this._createUInt32LEBuffer(input.length, PACKAGE_OFFSET), output]);
        } else {
            // Truncate the buffer to the size in the prefix
            const length = input.readUInt32LE(0);
            output = output.slice(0, length);
        }

        return output;
    }

    /**
     * Create a buffer of an integer encoded as a uint32le
     * @param {number} value - The integer to encode
     * @param {number} [bufferSize=4] The output buffer size in bytes
     * @returns {Buffer} The buffer
     * @private
     */
    _createUInt32LEBuffer(value, bufferSize = 4) {
        const buffer = Buffer.alloc(bufferSize);
        buffer.writeUInt32LE(value, 0);
        return buffer;
    }

    /**
     * Convert a password into an encryption key
     * @param {string} password - The password
     * @param {string} hashAlgorithm - The hash algoritm
     * @param {Buffer} saltValue - The salt value
     * @param {number} spinCount - The spin count
     * @param {number} keyBits - The length of the key in bits
     * @param {Buffer} blockKey - The block key
     * @returns {Buffer} The encryption key
     * @private
     */
    _convertPasswordToKey(password, hashAlgorithm, saltValue, spinCount, keyBits, blockKey) {
        // Password must be in unicode buffer
        const passwordBuffer = Buffer.from(password, 'utf16le');

        // Generate the initial hash
        let key = this._hash(hashAlgorithm, saltValue, passwordBuffer);

        // Now regenerate until spin count
        for (let i = 0; i < spinCount; i++) {
            const iterator = this._createUInt32LEBuffer(i);
            key = this._hash(hashAlgorithm, iterator, key);
        }

        // Now generate the final hash
        key = this._hash(hashAlgorithm, key, blockKey);

        // Truncate or pad as needed to get to length of keyBits
        const keyBytes = keyBits / 8;
        if (key.length < keyBytes) {
            const tmp = Buffer.alloc(keyBytes, 0x36);
            key.copy(tmp);
            key = tmp;
        } else if (key.length > keyBytes) {
            key = key.slice(0, keyBytes);
        }

        return key;
    }

    /**
     * Create an initialization vector (IV)
     * @param {string} hashAlgorithm - The hash algorithm
     * @param {Buffer} saltValue - The salt value
     * @param {number} blockSize - The size of the IV
     * @param {Buffer|number} blockKey - The block key or an int to convert to a buffer
     * @returns {Buffer} The IV
     * @private
     */
    _createIV(hashAlgorithm, saltValue, blockSize, blockKey) {
        // Create the block key from the current index
        if (typeof blockKey === "number") blockKey = this._createUInt32LEBuffer(blockKey);

        // Create the initialization vector by hashing the salt with the block key.
        // Truncate or pad as needed to meet the block size.
        let iv = this._hash(hashAlgorithm, saltValue, blockKey);
        if (iv.length < blockSize) {
            const tmp = Buffer.alloc(blockSize, 0x36);
            iv.copy(tmp);
            iv = tmp;
        } else if (iv.length > blockSize) {
            iv = iv.slice(0, blockSize);
        }

        return iv;
    }
}

module.exports = Encryptor;

}, function(modId) { var map = {"./externals":1711202881109,"./XmlParser":1711202881135,"./XmlBuilder":1711202881136,"./xmlq":1711202881113}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881135, function(require, module, exports) {


const sax = require("sax");
const externals = require("./externals");

// Regex to check if string is all whitespace.
const allWhitespaceRegex = /^\s+$/;

/**
 * XML parser.
 * @private
 */
class XmlParser {
    /**
     * Parse the XML text into a JSON object.
     * @param {string} xmlText - The XML text.
     * @returns {{}} The JSON object.
     */
    parseAsync(xmlText) {
        return new externals.Promise((resolve, reject) => {
            // Create the SAX parser.
            const parser = sax.parser(true);

            // Parsed is the full parsed object. Current is the current node being parsed. Stack is the current stack of
            // nodes leading to the current one.
            let parsed, current;
            const stack = [];

            // On error: Reject the promise.
            parser.onerror = reject;

            // On text nodes: If it is all whitespace, do nothing. Otherwise, try to convert to a number and add as a child.
            parser.ontext = text => {
                if (allWhitespaceRegex.test(text)) {
                    if (current && current.attributes['xml:space'] === 'preserve') {
                        current.children.push(text);
                    }
                } else {
                    current.children.push(this._covertToNumberIfNumber(text));
                }
            };

            // On open tag start: Create a child element. If this is the root element, set it as parsed. Otherwise, add
            // it as a child to the current node.
            parser.onopentagstart = node => {
                const child = { name: node.name, attributes: {}, children: [] };
                if (current) {
                    current.children.push(child);
                } else {
                    parsed = child;
                }

                stack.push(child);
                current = child;
            };

            // On close tag: Pop the stack.
            parser.onclosetag = node => {
                stack.pop();
                current = stack[stack.length - 1];
            };

            // On attribute: Try to convert the value to a number and add to the current node.
            parser.onattribute = attribute => {
                current.attributes[attribute.name] = this._covertToNumberIfNumber(attribute.value);
            };

            // On end: Resolve the promise.
            parser.onend = () => resolve(parsed);

            // Start parsing the text.
            parser.write(xmlText).close();
        });
    }

    /**
     * Convert the string to a number if it looks like one.
     * @param {string} str - The string to convert.
     * @returns {string|number} The number if converted or the string if not.
     * @private
     */
    _covertToNumberIfNumber(str) {
        const num = Number(str);
        return num.toString() === str ? num : str;
    }
}

module.exports = XmlParser;

}, function(modId) { var map = {"./externals":1711202881109}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711202881136, function(require, module, exports) {


const _ = require("lodash");

const XML_DECLARATION = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`;

/**
 * XML document builder.
 * @private
 */
class XmlBuilder {
    /**
     * Build an XML string from the JSON object.
     * @param {{}} node - The node.
     * @returns {string} The XML text.
     */
    build(node) {
        this._i = 0;
        const xml = this._build(node, '');
        if (xml === '') return;
        return XML_DECLARATION + xml;
    }

    /**
     * Build the XML string. (This is the internal recursive method.)
     * @param {{}} node - The node.
     * @param {string} xml - The initial XML doc string.
     * @returns {string} The generated XML element.
     * @private
     */
    _build(node, xml) {
        // For CPU performance, JS engines don't truly concatenate strings; they create a tree of pointers to
        // the various concatenated strings. The downside of this is that it consumes a lot of memory, which
        // will cause problems with large workbooks. So periodically, we grab a character from the xml, which
        // causes the JS engine to flatten the tree into a single string. Do this too often and CPU takes a hit.
        // Too frequently and memory takes a hit. Every 100k nodes seems to be a good balance.
        if (this._i++ % 1000000 === 0) {
            this._c = xml[0];
        }

        // If the node has a toXml method, call it.
        if (node && _.isFunction(node.toXml)) node = node.toXml();

        if (_.isObject(node)) {
            // If the node is an object, then it maps to an element. Check if it has a name.
            if (!node.name) throw new Error(`XML node does not have name: ${JSON.stringify(node)}`);

            // Add the opening tag.
            xml += `<${node.name}`;

            // Add any node attributes
            _.forOwn(node.attributes, (value, name) => {
                xml += ` ${name}="${this._escapeString(value, true)}"`;
            });

            if (_.isEmpty(node.children)) {
                // Self-close the tag if no children.
                xml += "/>";
            } else {
                xml += ">";
                
                // Recursively add any children.
                _.forEach(node.children, child => {
                    // Add the children to the XML.
                    xml = this._build(child, xml);
                });

                // Close the tag.
                xml += `</${node.name}>`;
            }
        } else if (!_.isNil(node)) {
            // It not an object, this should be a text node. Just add it.
            xml += this._escapeString(node);
        }

        // Return the updated XML element.
        return xml;
    }

    /**
     * Escape a string for use in XML by replacing &, ", ', <, and >.
     * @param {*} value - The value to escape.
     * @param {boolean} [isAttribute] - A flag indicating if this is an attribute.
     * @returns {string} The escaped string.
     * @private
     */
    _escapeString(value, isAttribute) {
        if (_.isNil(value)) return value;
        value = value.toString()
            .replace(/&/g, "&amp;") // Escape '&' first as the other escapes add them.
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        if (isAttribute) {
            value = value.replace(/"/g, "&quot;");
        }

        return value;
    }
}

module.exports = XmlBuilder;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1711202881108);
})()
//miniprogram-npm-outsideDeps=["jszip","lodash","fs","cfb","crypto","sax"]
//# sourceMappingURL=index.js.map