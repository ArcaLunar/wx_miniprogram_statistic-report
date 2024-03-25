module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1711103528393, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__version = exports.tensorflow = exports.dateRange = exports.merge = exports.concat = exports.getDummies = exports.OneHotEncoder = exports.LabelEncoder = exports.StandardScaler = exports.MinMaxScaler = exports.toExcel = exports.readExcel = exports.toJSON = exports.readJSON = exports.toCSV = exports.streamCSV = exports.readCSV = exports.DataFrame = exports.Series = exports.toDateTime = exports.Dt = exports.Str = exports.Utils = exports.Config = exports.NDframe = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var danfojs_base_1 = require("../../danfojs-base");
Object.defineProperty(exports, "NDframe", { enumerable: true, get: function () { return danfojs_base_1.NDframe; } });
Object.defineProperty(exports, "Config", { enumerable: true, get: function () { return danfojs_base_1.Config; } });
Object.defineProperty(exports, "Utils", { enumerable: true, get: function () { return danfojs_base_1.Utils; } });
Object.defineProperty(exports, "Str", { enumerable: true, get: function () { return danfojs_base_1.Str; } });
Object.defineProperty(exports, "Dt", { enumerable: true, get: function () { return danfojs_base_1.Dt; } });
Object.defineProperty(exports, "MinMaxScaler", { enumerable: true, get: function () { return danfojs_base_1.MinMaxScaler; } });
Object.defineProperty(exports, "StandardScaler", { enumerable: true, get: function () { return danfojs_base_1.StandardScaler; } });
Object.defineProperty(exports, "LabelEncoder", { enumerable: true, get: function () { return danfojs_base_1.LabelEncoder; } });
Object.defineProperty(exports, "OneHotEncoder", { enumerable: true, get: function () { return danfojs_base_1.OneHotEncoder; } });
Object.defineProperty(exports, "getDummies", { enumerable: true, get: function () { return danfojs_base_1.getDummies; } });
Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return danfojs_base_1.concat; } });
Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return danfojs_base_1.merge; } });
Object.defineProperty(exports, "toDateTime", { enumerable: true, get: function () { return danfojs_base_1.toDateTime; } });
Object.defineProperty(exports, "dateRange", { enumerable: true, get: function () { return danfojs_base_1.dateRange; } });
Object.defineProperty(exports, "tensorflow", { enumerable: true, get: function () { return danfojs_base_1.tensorflow; } });
Object.defineProperty(exports, "__version", { enumerable: true, get: function () { return danfojs_base_1.__version; } });
var browser_1 = require("../../danfojs-base/io/browser");
Object.defineProperty(exports, "readCSV", { enumerable: true, get: function () { return browser_1.readCSVBrowser; } });
Object.defineProperty(exports, "streamCSV", { enumerable: true, get: function () { return browser_1.streamCSVBrowser; } });
Object.defineProperty(exports, "toCSV", { enumerable: true, get: function () { return browser_1.toCSVBrowser; } });
Object.defineProperty(exports, "readJSON", { enumerable: true, get: function () { return browser_1.readJSONBrowser; } });
Object.defineProperty(exports, "toJSON", { enumerable: true, get: function () { return browser_1.toJSONBrowser; } });
Object.defineProperty(exports, "readExcel", { enumerable: true, get: function () { return browser_1.readExcelBrowser; } });
Object.defineProperty(exports, "toExcel", { enumerable: true, get: function () { return browser_1.toExcelBrowser; } });
var frame_1 = __importDefault(require("./core/frame"));
exports.DataFrame = frame_1.default;
var series_1 = __importDefault(require("./core/series"));
exports.Series = series_1.default;

}, function(modId) {var map = {"../../danfojs-base":1711103528394,"../../danfojs-base/io/browser":1711103528427,"./core/frame":1711103528430,"./core/series":1711103528431}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528394, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__version = exports.tensorflow = exports.dateRange = exports.merge = exports.concat = exports.getDummies = exports.OneHotEncoder = exports.LabelEncoder = exports.StandardScaler = exports.MinMaxScaler = exports.DataFrame = exports.Series = exports.toDateTime = exports.Dt = exports.Str = exports.Utils = exports.Config = exports.NDframe = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var generic_1 = __importDefault(require("./core/generic"));
exports.NDframe = generic_1.default;
var config_1 = __importDefault(require("./shared/config"));
exports.Config = config_1.default;
var utils_1 = __importDefault(require("./shared/utils"));
exports.Utils = utils_1.default;
var series_1 = __importDefault(require("./core/series"));
exports.Series = series_1.default;
var frame_1 = __importDefault(require("./core/frame"));
exports.DataFrame = frame_1.default;
var strings_1 = __importDefault(require("./core/strings"));
exports.Str = strings_1.default;
var datetime_1 = __importStar(require("./core/datetime"));
exports.Dt = datetime_1.default;
Object.defineProperty(exports, "toDateTime", { enumerable: true, get: function () { return datetime_1.toDateTime; } });
var min_max_scaler_1 = __importDefault(require("./transformers/scalers/min.max.scaler"));
exports.MinMaxScaler = min_max_scaler_1.default;
var standard_scaler_1 = __importDefault(require("./transformers/scalers/standard.scaler"));
exports.StandardScaler = standard_scaler_1.default;
var label_encoder_1 = __importDefault(require("./transformers/encoders/label.encoder"));
exports.LabelEncoder = label_encoder_1.default;
var one_hot_encoder_1 = __importDefault(require("./transformers/encoders/one.hot.encoder"));
exports.OneHotEncoder = one_hot_encoder_1.default;
var dummy_encoder_1 = __importDefault(require("./transformers/encoders/dummy.encoder"));
exports.getDummies = dummy_encoder_1.default;
var concat_1 = __importDefault(require("./transformers/concat"));
exports.concat = concat_1.default;
var merge_1 = __importDefault(require("./transformers/merge"));
exports.merge = merge_1.default;
var daterange_1 = __importDefault(require("./core/daterange"));
exports.dateRange = daterange_1.default;
var tensorflowlib_1 = __importDefault(require("./shared/tensorflowlib"));
exports.tensorflow = tensorflowlib_1.default;
var __version = "1.1.2";
exports.__version = __version;

}, function(modId) { var map = {"./core/generic":1711103528395,"./shared/config":1711103528398,"./shared/utils":1711103528396,"./core/series":1711103528401,"./core/frame":1711103528403,"./core/strings":1711103528419,"./core/datetime":1711103528420,"./transformers/scalers/min.max.scaler":1711103528421,"./transformers/scalers/standard.scaler":1711103528422,"./transformers/encoders/label.encoder":1711103528423,"./transformers/encoders/one.hot.encoder":1711103528424,"./transformers/encoders/dummy.encoder":1711103528402,"./transformers/concat":1711103528405,"./transformers/merge":1711103528425,"./core/daterange":1711103528426,"./shared/tensorflowlib":1711103528400}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528395, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("../shared/utils"));
var config_1 = __importDefault(require("../shared/config"));
var errors_1 = __importDefault(require("../shared/errors"));
var defaults_1 = require("../shared/defaults");
var tensorflowlib_1 = __importDefault(require("../shared/tensorflowlib"));
var utils = new utils_1.default();
/**
 * N-Dimension data structure. Stores multi-dimensional
 * data in a size-mutable, labeled data structure. Analogous to the Python Pandas DataFrame.
 *
 * @param  Object
 *
 *  data:  1D or 2D Array, JSON, Tensor, Block of data.
 *
 *  index: Array of numeric or string names for subseting array. If not specified, indexes are auto generated.
 *
 *  columns: Array of column names. If not specified, column names are auto generated.
 *
 *  dtypes: Array of data types for each the column. If not specified, dtypes inferred.
 *
 *  config: General configuration object for NDframe
 *
 * @returns NDframe
 */
var NDframe = /** @class */ (function () {
    function NDframe(_a) {
        var data = _a.data, index = _a.index, columns = _a.columns, dtypes = _a.dtypes, config = _a.config, isSeries = _a.isSeries;
        this.$dataIncolumnFormat = [];
        this.$index = [];
        this.$columns = [];
        this.$dtypes = [];
        this.$isSeries = isSeries;
        if (config) {
            this.$config = new config_1.default(__assign(__assign({}, defaults_1.BASE_CONFIG), config));
        }
        else {
            this.$config = new config_1.default(defaults_1.BASE_CONFIG);
        }
        if (data instanceof tensorflowlib_1.default.Tensor) {
            data = data.arraySync();
        }
        if (data === undefined || (Array.isArray(data) && data.length === 0)) {
            if (columns === undefined)
                columns = [];
            if (dtypes === undefined)
                dtypes = [];
            if (columns.length === 0 && dtypes.length !== 0)
                errors_1.default.throwDtypeWithoutColumnError();
            this.loadArrayIntoNdframe({ data: [], index: [], columns: columns, dtypes: dtypes });
        }
        else if (utils.is1DArray(data)) {
            this.loadArrayIntoNdframe({ data: data, index: index, columns: columns, dtypes: dtypes });
        }
        else {
            if (Array.isArray(data) && utils.isObject(data[0])) {
                this.loadObjectIntoNdframe({ data: data, type: 1, index: index, columns: columns, dtypes: dtypes });
            }
            else if (utils.isObject(data)) {
                this.loadObjectIntoNdframe({ data: data, type: 2, index: index, columns: columns, dtypes: dtypes });
            }
            else if (Array.isArray((data)[0]) ||
                utils.isNumber((data)[0]) ||
                utils.isString((data)[0])) {
                this.loadArrayIntoNdframe({ data: data, index: index, columns: columns, dtypes: dtypes });
            }
            else if (Array.isArray(data) && data.length > 0 && utils.isDate(data[0])) {
                this.loadArrayIntoNdframe({ data: data, index: index, columns: columns, dtypes: dtypes });
            }
            else {
                throw new Error("File format not supported!");
            }
        }
    }
    /**
     * Internal function to load array of data into NDFrame
     * @param data The array of data to load into NDFrame
     * @param index Array of numeric or string names for subsetting array.
     * @param columns Array of column names.
     * @param dtypes Array of data types for each the column.
    */
    NDframe.prototype.loadArrayIntoNdframe = function (_a) {
        var data = _a.data, index = _a.index, columns = _a.columns, dtypes = _a.dtypes;
        // this.$data = utils.replaceUndefinedWithNaN(data, this.$isSeries);
        this.$data = data;
        if (!this.$config.isLowMemoryMode) {
            //In NOT low memory mode, we transpose the array and save in column format.
            //This makes column data retrieval run in constant time
            this.$dataIncolumnFormat = utils.transposeArray(data);
        }
        this.$setIndex(index);
        this.$setDtypes(dtypes);
        this.$setColumnNames(columns);
    };
    /**
     * Internal function to format and load a Javascript object or object of arrays into NDFrame.
     * @param data Object or object of arrays.
     * @param type The type of the object. There are two recognized types:
     *
     * - type 1 object are in JSON format `[{a: 1, b: 2}, {a: 30, b: 20}]`.
     *
     * - type 2 object are of the form `{a: [1,2,3,4], b: [30,20, 30, 20}]}`
     * @param index Array of numeric or string names for subsetting array.
     * @param columns Array of column names.
     * @param dtypes Array of data types for each the column.
    */
    NDframe.prototype.loadObjectIntoNdframe = function (_a) {
        var data = _a.data, type = _a.type, index = _a.index, columns = _a.columns, dtypes = _a.dtypes;
        if (type === 1 && Array.isArray(data)) {
            var _data = (data).map(function (item) {
                return Object.values(item);
            });
            var _columnNames = void 0;
            if (columns) {
                _columnNames = columns;
            }
            else {
                _columnNames = Object.keys((data)[0]);
            }
            this.loadArrayIntoNdframe({ data: _data, index: index, columns: _columnNames, dtypes: dtypes });
        }
        else {
            var _b = utils.getRowAndColValues(data), _data = _b[0], _colNames = _b[1];
            var _columnNames = void 0;
            if (columns) {
                _columnNames = columns;
            }
            else {
                _columnNames = _colNames;
            }
            this.loadArrayIntoNdframe({ data: _data, index: index, columns: _columnNames, dtypes: dtypes });
        }
    };
    Object.defineProperty(NDframe.prototype, "tensor", {
        /**
         * Converts and returns the data in the NDframe as a Tensorflow.js Tensor.
        */
        get: function () {
            if (this.$isSeries) {
                return tensorflowlib_1.default.tensor1d(this.$data, this.$dtypes[0]);
            }
            else {
                return tensorflowlib_1.default.tensor2d(this.$data, this.shape, "float32");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NDframe.prototype, "dtypes", {
        /**
         * Returns the dtypes of the columns
        */
        get: function () {
            return this.$dtypes;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Internal function to set the Dtypes of the NDFrame from an array. This function
     * performs the necessary checks.
    */
    NDframe.prototype.$setDtypes = function (dtypes) {
        if (this.$isSeries) {
            if (dtypes) {
                if (this.$data.length != 0 && dtypes.length != 1) {
                    errors_1.default.throwDtypesLengthError(this, dtypes);
                }
                if (!(defaults_1.DATA_TYPES.includes("" + dtypes[0]))) {
                    errors_1.default.throwDtypeNotSupportedError(dtypes[0]);
                }
                this.$dtypes = dtypes;
            }
            else {
                this.$dtypes = utils.inferDtype(this.$data);
            }
        }
        else {
            if (dtypes) {
                if (this.$data.length != 0 && dtypes.length != this.shape[1]) {
                    errors_1.default.throwDtypesLengthError(this, dtypes);
                }
                if (this.$data.length == 0 && dtypes.length == 0) {
                    this.$dtypes = dtypes;
                }
                else {
                    dtypes.forEach(function (dtype) {
                        if (!(defaults_1.DATA_TYPES.includes(dtype))) {
                            errors_1.default.throwDtypeNotSupportedError(dtype);
                        }
                    });
                    this.$dtypes = dtypes;
                }
            }
            else {
                this.$dtypes = utils.inferDtype(this.$data);
            }
        }
    };
    Object.defineProperty(NDframe.prototype, "ndim", {
        /**
         * Returns the dimension of the data. Series have a dimension of 1,
         * while DataFrames have a dimension of 2.
        */
        get: function () {
            if (this.$isSeries) {
                return 1;
            }
            else {
                return 2;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NDframe.prototype, "axis", {
        /**
         * Returns the axis labels of the NDFrame.
        */
        get: function () {
            return {
                index: this.$index,
                columns: this.$columns
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NDframe.prototype, "config", {
        /**
         * Returns the configuration object of the NDFrame.
        */
        get: function () {
            return this.$config;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Internal function to set the configuration of the ndframe
    */
    NDframe.prototype.$setConfig = function (config) {
        this.$config = config;
    };
    Object.defineProperty(NDframe.prototype, "index", {
        /**
         * Returns the indices of the NDFrame
        */
        get: function () {
            return this.$index;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Internal function to set the index of the NDFrame with the specified
     * array of indices. Performs all necessary checks to ensure that the
     * index is valid.
    */
    NDframe.prototype.$setIndex = function (index) {
        if (index) {
            if (this.$data.length != 0 && index.length != this.shape[0]) {
                errors_1.default.throwIndexLengthError(this, index);
            }
            if (Array.from(new Set(index)).length !== this.shape[0]) {
                errors_1.default.throwIndexDuplicateError();
            }
            this.$index = index;
        }
        else {
            this.$index = utils.range(0, this.shape[0] - 1); //generate index
        }
    };
    /**
     * Internal function to reset the index of the NDFrame using a range of indices.
    */
    NDframe.prototype.$resetIndex = function () {
        this.$index = utils.range(0, this.shape[0] - 1);
    };
    Object.defineProperty(NDframe.prototype, "columns", {
        /**
         * Returns the column names of the NDFrame
        */
        get: function () {
            return this.$columns;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Internal function to set the column names for the NDFrame. This function
     * performs a check to ensure that the column names are unique, and same length as the
     * number of columns in the data.
    */
    NDframe.prototype.$setColumnNames = function (columns) {
        // console.log(columns);
        if (this.$isSeries) {
            if (columns) {
                if (this.$data.length != 0 && columns.length != 1 && typeof columns != 'string') {
                    errors_1.default.throwColumnNamesLengthError(this, columns);
                }
                this.$columns = columns;
            }
            else {
                this.$columns = ["0"];
            }
        }
        else {
            if (columns) {
                if (this.$data.length != 0 && columns.length != this.shape[1]) {
                    errors_1.default.throwColumnNamesLengthError(this, columns);
                }
                if (Array.from(new Set(columns)).length !== columns.length) {
                    errors_1.default.throwColumnDuplicateError();
                }
                this.$columns = columns;
            }
            else {
                this.$columns = (utils.range(0, this.shape[1] - 1)).map(function (val) { return "" + val; }); //generate columns
            }
        }
    };
    Object.defineProperty(NDframe.prototype, "shape", {
        /**
         * Returns the shape of the NDFrame. Shape is determined by [row length, column length]
        */
        get: function () {
            if (this.$data.length === 0) {
                if (this.$columns.length === 0)
                    return [0, 0];
                else
                    return [0, this.$columns.length];
            }
            if (this.$isSeries) {
                return [this.$data.length, 1];
            }
            else {
                var rowLen = (this.$data).length;
                var colLen = this.$data[0].length;
                return [rowLen, colLen];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NDframe.prototype, "values", {
        /**
         * Returns the underlying data in Array format.
        */
        get: function () {
            return this.$data;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates the internal $data property to the specified value
     * @param values An array of values to set
     * @param checkLength Whether to check the length of the new values and the existing row length
     * @param checkColumnLength Whether to check the length of the new values and the existing column length
     * */
    NDframe.prototype.$setValues = function (values, checkLength, checkColumnLength) {
        var _this = this;
        if (checkLength === void 0) { checkLength = true; }
        if (checkColumnLength === void 0) { checkColumnLength = true; }
        if (this.$isSeries) {
            if (checkLength && values.length != this.shape[0]) {
                errors_1.default.throwRowLengthError(this, values.length);
            }
            this.$data = values;
            this.$dtypes = utils.inferDtype(values); //Dtype may change depeneding on the value set
            if (!this.$config.isLowMemoryMode) {
                this.$dataIncolumnFormat = values;
            }
        }
        else {
            if (checkLength && values.length != this.shape[0]) {
                errors_1.default.throwRowLengthError(this, values.length);
            }
            if (checkColumnLength) {
                values.forEach(function (value) {
                    if (value.length != _this.shape[1]) {
                        errors_1.default.throwColumnLengthError(_this, values.length);
                    }
                });
            }
            this.$data = values;
            this.$dtypes = utils.inferDtype(values);
            if (!this.$config.isLowMemoryMode) {
                this.$dataIncolumnFormat = utils.transposeArray(values);
            }
        }
    };
    Object.defineProperty(NDframe.prototype, "getColumnData", {
        /**
          * Returns the underlying data in Array column format.
          * Similar to this.values, but in column format.
        */
        get: function () {
            if (this.config.isLowMemoryMode) {
                return utils.transposeArray(this.values);
            }
            else {
                return this.$dataIncolumnFormat;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NDframe.prototype, "size", {
        /**
         * Returns the size of the NDFrame object
         *
        */
        get: function () {
            return this.shape[0] * this.shape[1];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Converts a DataFrame or Series to CSV.
     * @deprecated Use `toCSV` function directly instead.
    * @example
    * ```
    * import * as dfd from "danfojs"
    * const df = new dfd.DataFrame([[1, 2, 3], [4, 5, 6]])
    * const csv = dfd.toCSV(df)
    * ```
    * @example
    * ```
    * import { toCSV } from "danfojs-node"
    * const df = new DataFrame([[1, 2, 3], [4, 5, 6]])
    * toCSV(df, {
    *     filePath: "./data/sample.csv",
    *     header: true,
    *     sep: "+"
    *   })
     */
    NDframe.prototype.toCSV = function (options) {
        throw new Error("`toCSV` function is deprecated. Use `toCSV` function directly instead. e.g. `dfd.toCSV(df)`");
    };
    /**
     * Converts a DataFrame or Series to JSON.
     * @deprecated Use `toJSON` function directly instead.
    * @example
    * ```
    * import * as dfd from "danfojs-node"
    * const df = new dfd.DataFrame([[1, 2, 3], [4, 5, 6]])
    * const json = dfd.toJSON(df)
    * ```
    * @example
    * ```
    * import { toJSON } from "danfojs-node"
    * const df = new DataFrame([[1, 2, 3], [4, 5, 6]])
    * toJSON(df, {
    *     filePath: "./data/sample.json",
    *     format: "row"
    *   })
    * ```
    */
    NDframe.prototype.toJSON = function (options) {
        throw new Error("`toJSON` function is deprecated. Use `toJSON` function directly instead. e.g. `dfd.toJSON(df, { format: 'row' })`");
    };
    /**
     * Converts a DataFrame or Series to Excel.
     * @deprecated Use `toExcel` function directly instead.
     * @example
     * ```
     * import * as dfd from "danfojs"
     * const df = new dfd.DataFrame([[1, 2, 3], [4, 5, 6]])
     * dfd.toExcel(df, {
     *     filePath: "./data/sample.xlsx",
     *     sheetName: "MySheet",
     *   })
     * ```
     *
     * @example
     * ```
     * import { toExcel } from "danfojs-node"
     * const df = new DataFrame([[1, 2, 3], [4, 5, 6]])
     * toExcel(df, {
     *     filePath: "./data/sample.xlsx",
     *     sheetName: "MySheet",
     *   })
     * ```
     */
    NDframe.prototype.toExcel = function (options) {
        throw new Error("Deprecated. Use `toExcel` function directly instead. e.g. `dfd.toExcel(df, {filePath: 'path/to/file.xlsx'})`");
    };
    /**
     * Pretty prints a DataFrame or Series to the console
     */
    NDframe.prototype.print = function () {
        console.log(this + "");
    };
    return NDframe;
}());
exports.default = NDframe;

}, function(modId) { var map = {"../shared/utils":1711103528396,"../shared/config":1711103528398,"../shared/errors":1711103528399,"../shared/defaults":1711103528397,"../shared/tensorflowlib":1711103528400}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528396, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaults_1 = require("./defaults");
var config_1 = __importDefault(require("./config"));
var __1 = require("../");
var __2 = require("../");
var errors_1 = __importDefault(require("../shared/errors"));
var config = new config_1.default(defaults_1.BASE_CONFIG);
/**
 * General Utility class
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Removes an element from a 1D array
     *
     * ```js
     *
     * ```
     * @param arr The array to filter.
     * @param index The index to filter by.
     */
    Utils.prototype.removeElementFromArray = function (arr, index) {
        var newArr = arr.filter(function (_, i) { return i != index; });
        return newArr;
    };
    /**
     * Check if value is a string.
     * @param value The value to check.
     * @returns
     */
    Utils.prototype.isString = function (value) {
        return typeof value === "string";
    };
    /**
     * Checks if value is a number.
     * @param value The value to check.
     * @returns
     */
    Utils.prototype.isNumber = function (value) {
        return typeof value === "number" && isFinite(value);
    };
    /**
     * Checks if value is an object.
     * @param value The value to check.
     * @returns
     */
    Utils.prototype.isObject = function (value) {
        return value && typeof value === "object" && value.constructor && value.constructor.name === "Object";
    };
    /**
     * Checks if a value is null
     * @param value The value to check.
     * @returns
     */
    Utils.prototype.isNull = function (value) {
        return value === null;
    };
    /**
     * Checks if a value is undefined
     * @param value The value to check.
     * @returns
     */
    Utils.prototype.isUndefined = function (value) {
        return typeof value === "undefined";
    };
    /**
     * Checks if a value is empty. Empty means it's either null, undefined or NaN
     * @param value The value to check.
     * @returns
     */
    Utils.prototype.isEmpty = function (value) {
        return value === undefined || value === null || (isNaN(value) && typeof value !== "string");
    };
    /**
     * Checks if a value is a date object
     * @param value A date object
     * @returns boolean
     */
    Utils.prototype.isDate = function (value) {
        return value instanceof Date;
    };
    /**
     * Generates an array of integers between specified range
     * @param start The starting number.
     * @param end The ending number.
     */
    Utils.prototype.range = function (start, end) {
        if (end < start) {
            throw new Error("ParamError: end must be greater than start");
        }
        if (start === end) {
            return [start];
        }
        var arr = [];
        for (var i = start; i <= end; i++) {
            arr.push(i);
        }
        return arr;
    };
    /**
     * Checks if object has the specified key
     * @param obj The object to check.
     * @param key The key to find.
     */
    Utils.prototype.keyInObject = function (obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };
    /**
     * Transposes an array of array
     * @param obj The object to check.
     * @param key The key to find.
     */
    Utils.prototype.transposeArray = function (arr) {
        if (arr.length === 0)
            return arr;
        var rowLen = arr.length;
        if (Array.isArray(arr[0])) {
            var colLen = arr[0].length;
            var newArr = [];
            for (var i = 0; i <= colLen - 1; i++) {
                var temp = [];
                for (var j = 0; j < rowLen; j++) {
                    var _elem = arr[j][i];
                    temp.push(_elem);
                }
                newArr.push(temp);
            }
            return newArr;
        }
        else {
            return arr;
        }
    };
    /**
     * Retrieve row array and column names from an object of the form {a: [1,2,3,4], b: [30,20, 30, 20]}
     * @param obj The object to retrieve rows and column names from.
     */
    Utils.prototype.getRowAndColValues = function (obj) {
        var colNames = Object.keys(obj);
        var colData = Object.values(obj);
        var firstColLen = colData[0].length;
        colData.forEach(function (cdata) {
            if (cdata.length != firstColLen) {
                throw Error("Length Error: Length of columns must be the same!");
            }
        });
        var rowsArr = this.transposeArray(colData);
        return [rowsArr, colNames];
    };
    /**
     * Converts a 2D array of array to 1D array for Series Class
     * @param arr The array to convert.
     */
    Utils.prototype.convert2DArrayToSeriesArray = function (arr) {
        var _this = this;
        var newArr = arr.map(function (val) {
            if (_this.isObject(val)) {
                return JSON.stringify(val);
            }
            else {
                return "" + val;
            }
        });
        return newArr;
    };
    /**
     * Replaces all missing values with NaN. Missing values are undefined, Null and Infinity
     * @param arr The array
     * @param isSeries Whether the arr is a series or not
     */
    Utils.prototype.replaceUndefinedWithNaN = function (arr, isSeries) {
        if (arr.length === 0)
            return arr;
        if (isSeries && Array.isArray(arr)) {
            var newArr = arr.map(function (ele) {
                if (typeof ele === "undefined") {
                    return NaN;
                }
                if (typeof ele === "number" && (isNaN(ele) || ele == Infinity)) {
                    return NaN;
                }
                if (ele == null) {
                    return NaN;
                }
                return ele;
            });
            return newArr;
        }
        else {
            var newArr = [];
            if (Array.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    var innerArr = arr[i];
                    var temp = innerArr.map(function (ele) {
                        if (typeof ele === "undefined") {
                            return NaN;
                        }
                        if (typeof ele === "number" && (isNaN(ele) || ele == Infinity)) {
                            return NaN;
                        }
                        if (ele == null) {
                            return NaN;
                        }
                        return ele;
                    });
                    newArr.push(temp);
                }
            }
            return newArr;
        }
    };
    /**
     * Infer data type from an array or array of arrays
     * @param arr An array or array of arrays
    */
    Utils.prototype.inferDtype = function (arr) {
        var self = this;
        if (this.is1DArray(arr)) {
            return [this.$typeChecker(arr)];
        }
        else {
            var arrSlice = this.transposeArray(arr.slice(0, config.getDtypeTestLim));
            var dtypes = arrSlice.map(function (innerArr) {
                return self.$typeChecker(innerArr);
            });
            return dtypes;
        }
    };
    /**
     * Private type checker used by inferDtype function
     * @param arr The array
     */
    Utils.prototype.$typeChecker = function (arr) {
        var dtypes;
        var lim;
        var intTracker = [];
        var floatTracker = [];
        var stringTracker = [];
        var boolTracker = [];
        var dateTracker = [];
        if (arr.length < config.getDtypeTestLim) {
            lim = arr.length;
        }
        else {
            lim = config.getDtypeTestLim;
        }
        var arrSlice = arr.slice(0, lim);
        for (var i = 0; i < lim; i++) {
            var ele = arrSlice[i];
            if (typeof ele == "boolean") {
                floatTracker.push(false);
                intTracker.push(false);
                stringTracker.push(false);
                boolTracker.push(true);
                dateTracker.push(false);
            }
            else if (this.isEmpty(ele)) {
                floatTracker.push(true);
                intTracker.push(false);
                stringTracker.push(false);
                boolTracker.push(false);
                dateTracker.push(false);
            }
            else if (this.isDate(ele)) {
                floatTracker.push(false);
                intTracker.push(false);
                stringTracker.push(false);
                boolTracker.push(false);
                dateTracker.push(true);
            }
            else if (!isNaN(Number(ele))) {
                if (ele.toString().includes(".")) {
                    floatTracker.push(true);
                    intTracker.push(false);
                    stringTracker.push(false);
                    boolTracker.push(false);
                    dateTracker.push(false);
                }
                else {
                    floatTracker.push(false);
                    intTracker.push(true);
                    stringTracker.push(false);
                    boolTracker.push(false);
                    dateTracker.push(false);
                }
            }
            else {
                floatTracker.push(false);
                intTracker.push(false);
                stringTracker.push(true);
                boolTracker.push(false);
                dateTracker.push(false);
            }
        }
        var even = function (ele) { return ele == true; };
        if (stringTracker.some(even)) {
            dtypes = "string";
        }
        else if (floatTracker.some(even)) {
            dtypes = "float32";
        }
        else if (intTracker.some(even)) {
            dtypes = "int32";
        }
        else if (boolTracker.some(even)) {
            dtypes = "boolean";
        }
        else if (dateTracker.some(even)) {
            dtypes = "datetime";
        }
        else {
            dtypes = "undefined";
        }
        return dtypes;
    };
    /**
     * Returns the unique values in an 1D array
     * @param arr The array
    */
    Utils.prototype.unique = function (arr) {
        var uniqueArr = new Set(arr);
        return Array.from(uniqueArr);
    };
    /**
     * Checks if array is 1D
     * @param arr The array
    */
    Utils.prototype.is1DArray = function (arr) {
        if (typeof arr[0] == "number" ||
            typeof arr[0] == "string" ||
            typeof arr[0] == "boolean" ||
            arr[0] === null) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Converts an array to an object using array index as object keys
     * @param arr The array
    */
    Utils.prototype.convertArrayToObject = function (arr) {
        var arrObj = {};
        for (var i = 0; i < arr.length; i++) {
            arrObj[i] = arr[i];
        }
        return arrObj;
    };
    /**
     * Count the NaN and non-NaN values present in an array
     * @param  arr Array object
     * @param val whether to return the value count instead of the null count
     * @param isSeries Whether the array is of type series or not
     */
    Utils.prototype.countNaNs = function (arr, returnVal, isSeries) {
        if (returnVal === void 0) { returnVal = true; }
        if (isSeries) {
            var nullCount = 0;
            var valCount = 0;
            for (var i = 0; i < arr.length; i++) {
                var ele = arr[i];
                if (Number.isNaN(ele)) {
                    nullCount = nullCount + 1;
                }
                else {
                    valCount = valCount + 1;
                }
            }
            if (returnVal) {
                return valCount;
            }
            else {
                return nullCount;
            }
        }
        else {
            var resultArr = [];
            for (var i = 0; i < arr.length; i++) {
                var innerArr = arr[i];
                var nullCount = 0;
                var valCount = 0;
                for (var i_1 = 0; i_1 < innerArr.length; i_1++) {
                    var ele = innerArr[i_1];
                    if (Number.isNaN(ele)) {
                        nullCount = nullCount + 1;
                    }
                    else {
                        valCount = valCount + 1;
                    }
                }
                if (returnVal) {
                    resultArr.push(valCount);
                }
                else {
                    resultArr.push(nullCount);
                }
            }
            return resultArr;
        }
    };
    /**
     * Round elements of an array or array of arrays to specified dp
     * @param arr The Array to round
     * @param dp The number of dp to round to
     * @param isSeries Whether the array is of type Series or not
     */
    Utils.prototype.round = function (arr, dp, isSeries) {
        if (dp === void 0) { dp = 1; }
        if (dp < 0) {
            dp = 1;
        }
        if (isSeries) {
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                var ele = arr[i];
                if (typeof ele == "number" && !isNaN(ele) && ele !== undefined && ele !== null) {
                    newArr.push(Number((ele).toFixed(dp)));
                }
                else {
                    newArr.push(ele);
                }
            }
            return newArr;
        }
        else {
            var resultArr = [];
            for (var i = 0; i < arr.length; i++) {
                var innerVal = arr[i];
                var newArr = [];
                if (Array.isArray(innerVal)) {
                    for (var i_2 = 0; i_2 < innerVal.length; i_2++) {
                        var ele = innerVal[i_2];
                        if (typeof ele == "number" && !isNaN(ele) && ele !== undefined && ele !== null) {
                            newArr.push(Number((ele).toFixed(dp)));
                        }
                        else {
                            newArr.push(ele);
                        }
                    }
                    resultArr.push(newArr);
                }
                else {
                    if (typeof innerVal == "number" && !isNaN(innerVal) && innerVal !== undefined && innerVal !== null) {
                        newArr.push(Number((innerVal).toFixed(dp)));
                    }
                    else {
                        newArr.push(innerVal);
                    }
                }
            }
            return resultArr;
        }
    };
    /**
     * Checks if a func is a function
     * @param func
     */
    Utils.prototype.isFunction = function (func) {
        return typeof func == "function";
    };
    /**
     * Generates n random numbers between start and end.
     * @param start
     * @param end
     * @param size
     */
    Utils.prototype.randNumberGenerator = function (start, end, size) {
        var genNum = [];
        function randi(a, b) {
            return Math.floor(Math.random() * (b - a) + a);
        }
        function recursive(val, arr) {
            if (!arr.includes(val)) {
                return val;
            }
            val = randi(start, end);
            recursive(val, arr);
        }
        for (var i = 0; i < size; i++) {
            var genVal = randi(start, end);
            var recursiveVal = recursive(genVal, genNum);
            genNum.push(recursiveVal);
        }
        return genNum;
    };
    /**
     * Throws error when a required parameter is missing.
     * @param paramsObject The parameters passed to the function
     * @param paramsNeeded The required parameters in the function
     */
    Utils.prototype.throwErrorOnWrongParams = function (paramsObject, paramsNeeded) {
        var keys = Object.keys(paramsObject);
        var bool = [];
        for (var i = 0; i < keys.length; i++) {
            if (paramsNeeded.includes(keys[i])) {
                bool.push(true);
            }
            else {
                bool.push(false);
            }
        }
        var truthy = function (element) { return element == false; };
        if (bool.some(truthy)) {
            throw Error("Params Error: Required parameter not found. Your params must include the following [" + paramsNeeded + "]");
        }
    };
    /**
     * Maps integer values (0, 1) to boolean (false, true)
     * @param arr The array of integers
     * @param dim The dimension of the array
     */
    Utils.prototype.mapIntegersToBooleans = function (arr, dim) {
        if (dim == 2) {
            var newArr_1 = [];
            arr.map(function (innerArr) {
                var temp = [];
                innerArr.map(function (val) { return temp.push(val == 1); });
                newArr_1.push(temp);
            });
            return newArr_1;
        }
        else {
            var newArr_2 = [];
            arr.map(function (val) { return newArr_2.push(val == 1); });
            return newArr_2;
        }
    };
    /**
     * Maps boolean values (false, true) to integer equivalent (0, 1)
     * @param arr The array of booleans
     * @param dim The dimension of the array
     */
    Utils.prototype.mapBooleansToIntegers = function (arr, dim) {
        if (dim == 2) {
            var newArr_3 = [];
            arr.map(function (innerArr) {
                var temp = [];
                innerArr.map(function (val) { return temp.push(val ? 1 : 0); });
                newArr_3.push(temp);
            });
            return newArr_3;
        }
        else {
            var newArr_4 = [];
            arr.map(function (val) { return newArr_4.push(val ? 1 : 0); });
            return newArr_4;
        }
    };
    /**
     * Generates an array of dim (row x column) with inner values set to zero
     * @param row
     * @param column
     */
    Utils.prototype.zeros = function (row, column) {
        var zeroData = [];
        for (var i = 0; i < row; i++) {
            var colData = Array(column);
            for (var j = 0; j < column; j++) {
                colData[j] = 0;
            }
            zeroData.push(colData);
        }
        return zeroData;
    };
    /**
     * Shuffles and returns a random slice of an array
     * @param num
     * @param array
     */
    Utils.prototype.shuffle = function (array, num) {
        var i = array.length;
        var j = 0;
        var temp;
        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array.slice(0, num);
    };
    /**
     * Sorts an array in specified order
     * @param arr
     * @param ascending
     * @returns
     */
    Utils.prototype.sort = function (arr, ascending) {
        if (ascending === void 0) { ascending = true; }
        var sorted = __spreadArray([], arr, true);
        return sorted.sort(function (a, b) {
            if (ascending) {
                if (typeof a === "string" && typeof b === "string") {
                    return a.charCodeAt(0) - b.charCodeAt(0);
                }
                else {
                    return a - b;
                }
            }
            else {
                if (typeof a === "string" && typeof b === "string") {
                    return b.charCodeAt(0) - a.charCodeAt(0);
                }
                else {
                    return b - a;
                }
            }
        });
    };
    /**
     * Checks if current environment is Browser
     */
    Utils.prototype.isBrowserEnv = function () {
        var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
        return isBrowser();
    };
    /**
     * Checks if current environment is Node
     */
    Utils.prototype.isNodeEnv = function () {
        var isNode = new Function("try {return this===global;}catch(e){return false;}");
        return isNode();
    };
    /**
     * Remove NaN values from 1D array
     * @param arr
     */
    Utils.prototype.removeMissingValuesFromArray = function (arr) {
        var _this = this;
        var values = arr.filter(function (val) {
            return !(_this.isEmpty(val));
        });
        return values;
    };
    /**
     * Replace NaN with null before tensor operations
     * @param arr
     */
    Utils.prototype.replaceNanWithNull = function (arr) {
        var values = arr.map(function (val) {
            if (isNaN(val)) {
                return null;
            }
            else {
                return val;
            }
        });
        return values;
    };
    /**
     * Get duplicate values in a array
     * @param arr
     */
    Utils.prototype.getDuplicate = function (arr) {
        var tempObj = {};
        var resultObj = {};
        for (var i = 0; i < arr.length; i++) {
            var val = arr[i];
            if (this.keyInObject(tempObj, val)) {
                tempObj[val]["count"] += 1;
                tempObj[val]["index"].push(i);
            }
            else {
                tempObj[val] = {};
                tempObj[val]["count"] = 1;
                tempObj[val]["index"] = [i];
            }
        }
        for (var key in tempObj) {
            if (tempObj[key]["count"] >= 2) {
                resultObj[key] = {};
                resultObj[key]["count"] = tempObj[key]["count"];
                resultObj[key]["index"] = tempObj[key]["index"];
            }
        }
        return resultObj;
    };
    /**
     * Returns the index of a sorted array
     * @param arr1 The first array
     * @param arr2 The second array
     * @param dtype The data type of the arrays
     *
     * @returns sorted index
     */
    Utils.prototype.sortArrayByIndex = function (arr1, arr2, dtype) {
        var sortedIdx = arr1.map(function (item, index) {
            return [arr2[index], item];
        });
        if (dtype == "string") {
            sortedIdx.sort();
        }
        else {
            sortedIdx.sort(function (_a, _b) {
                var arg1 = _a[0];
                var arg2 = _b[0];
                return arg2 - arg1;
            });
        }
        return sortedIdx.map(function (_a) {
            var item = _a[1];
            return item;
        });
    };
    /**
     * Returns a new series with properties of the old series
     *
     * @param series The series to copy
    */
    Utils.prototype.createNdframeFromNewDataWithOldProps = function (_a) {
        var ndFrame = _a.ndFrame, newData = _a.newData, isSeries = _a.isSeries;
        if (isSeries) {
            return new __1.Series(newData, {
                index: __spreadArray([], ndFrame.index, true),
                columns: __spreadArray([], ndFrame.columns, true),
                dtypes: __spreadArray([], ndFrame.dtypes, true),
                config: __assign({}, ndFrame.config)
            });
        }
        else {
            return new __2.DataFrame(newData, {
                index: __spreadArray([], ndFrame.index, true),
                columns: __spreadArray([], ndFrame.columns, true),
                dtypes: __spreadArray([], ndFrame.dtypes, true),
                config: __assign({}, ndFrame.config)
            });
        }
    };
    /**
    * Checks if two series are compatible for a mathematical operation
    * @param object
    *
    *   firstSeries ==>  First Series object
    *
    *   secondSeries ==> Second Series object to comapre with
    *
    *   operation ==> The mathematical operation
    */
    Utils.prototype.checkSeriesOpCompactibility = function (_a) {
        var firstSeries = _a.firstSeries, secondSeries = _a.secondSeries, operation = _a.operation;
        if (firstSeries.shape[0] != secondSeries.shape[0]) {
            errors_1.default.throwSeriesMathOpLengthError(firstSeries, secondSeries);
        }
        if (firstSeries.dtypes[0] == 'string' || secondSeries.dtypes[0] == 'string') {
            errors_1.default.throwStringDtypeOperationError(operation);
        }
    };
    /**
    * Custom sort for an array of index and values
    * @param arr The array of objects to sort
    * @param ascending Whether to sort in ascending order or not
    */
    Utils.prototype.sortObj = function (arr, ascending) {
        var sortedValues = arr.sort(function (obj1, obj2) {
            var a = obj2.value;
            var b = obj1.value;
            if (!ascending) {
                if (typeof a === "string" && typeof b === "string") {
                    a = a.toUpperCase();
                    b = b.toUpperCase();
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                }
                else {
                    return Number(a) - Number(b);
                }
            }
            else {
                if (typeof a === "string" && typeof b === "string") {
                    a = a.toUpperCase();
                    b = b.toUpperCase();
                    if (a > b) {
                        return -1;
                    }
                    if (a < b) {
                        return 1;
                    }
                    return 0;
                }
                else {
                    return Number(b) - Number(a);
                    ;
                }
            }
        });
        return sortedValues;
    };
    return Utils;
}());
exports.default = Utils;

}, function(modId) { var map = {"./defaults":1711103528397,"./config":1711103528398,"../":1711103528394,"../shared/errors":1711103528399}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528397, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_TYPES = exports.BASE_CONFIG = void 0;
/**
 * Default config object
 */
exports.BASE_CONFIG = {
    tableMaxRow: 10,
    tableMaxColInConsole: 10,
    dtypeTestLim: 20,
    lowMemoryMode: false,
};
exports.DATA_TYPES = ["float32", "int32", "string", "boolean", "datetime", 'undefined'];

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528398, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Package wide configuration class
 */
var Configs = /** @class */ (function () {
    function Configs(options) {
        var _a = __assign({ tableDisplayConfig: {}, tableMaxRow: 10, tableMaxColInConsole: 10, dtypeTestLim: 500, lowMemoryMode: false }, options), tableDisplayConfig = _a.tableDisplayConfig, tableMaxRow = _a.tableMaxRow, tableMaxColInConsole = _a.tableMaxColInConsole, dtypeTestLim = _a.dtypeTestLim, lowMemoryMode = _a.lowMemoryMode;
        this.tableDisplayConfig = tableDisplayConfig;
        this.tableMaxRow = tableMaxRow; // The maximum number of rows to display in console
        this.tableMaxColInConsole = tableMaxColInConsole; // The maximum number of columns to display in console
        this.dtypeTestLim = dtypeTestLim; // The number of rows to use when inferring data type
        this.lowMemoryMode = lowMemoryMode; // Whether to use minimal memory or not.
    }
    Configs.prototype.setTableDisplayConfig = function (config) {
        this.tableDisplayConfig = config;
    };
    Object.defineProperty(Configs.prototype, "getTableDisplayConfig", {
        get: function () {
            return this.tableDisplayConfig;
        },
        enumerable: false,
        configurable: true
    });
    Configs.prototype.setTableMaxColInConsole = function (val) {
        this.tableMaxColInConsole = val;
    };
    Object.defineProperty(Configs.prototype, "getTableMaxColInConsole", {
        get: function () {
            return this.tableMaxColInConsole;
        },
        enumerable: false,
        configurable: true
    });
    Configs.prototype.setMaxRow = function (val) {
        this.tableMaxRow = val;
    };
    Object.defineProperty(Configs.prototype, "getMaxRow", {
        get: function () {
            return this.tableMaxRow;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configs.prototype, "getDtypeTestLim", {
        get: function () {
            return this.dtypeTestLim;
        },
        enumerable: false,
        configurable: true
    });
    Configs.prototype.setDtypeTestLim = function (val) {
        this.dtypeTestLim = val;
    };
    Object.defineProperty(Configs.prototype, "isLowMemoryMode", {
        get: function () {
            return this.lowMemoryMode;
        },
        enumerable: false,
        configurable: true
    });
    Configs.prototype.setIsLowMemoryMode = function (val) {
        this.lowMemoryMode = val;
    };
    return Configs;
}());
exports.default = Configs;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528399, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var defaults_1 = require("./defaults");
/**
 * Package wide error throwing class
 */
var ErrorThrower = /** @class */ (function () {
    function ErrorThrower() {
        this.throwColumnNamesLengthError = function (ndframe, columns) {
            var msg = "ParamError: Column names length mismatch. You provided a column of length " + columns.length + " but Ndframe columns has length of " + ndframe.shape[1];
            throw new Error(msg);
        };
        this.throwIndexLengthError = function (ndframe, index) {
            var msg = "IndexError: You provided an index of length " + index.length + " but Ndframe rows has length of " + ndframe.shape[0];
            throw new Error(msg);
        };
        this.throwIndexDuplicateError = function () {
            var msg = "IndexError: Row index must contain unique values";
            throw new Error(msg);
        };
        this.throwColumnDuplicateError = function () {
            var msg = "ColumnIndexError: Column index must contain unique values";
            throw new Error(msg);
        };
        this.throwDtypesLengthError = function (ndframe, dtypes) {
            var msg = "DtypeError: You provided a dtype array of length " + dtypes.length + " but Ndframe columns has length of " + ndframe.shape[1];
            throw new Error(msg);
        };
        this.throwDtypeNotSupportedError = function (dtype) {
            var msg = "DtypeError: Dtype \"" + dtype + "\" not supported. dtype must be one of \"" + defaults_1.DATA_TYPES + "\"";
            throw new Error(msg);
        };
        this.throwDtypeWithoutColumnError = function () {
            var msg = "DtypeError: columns parameter must be provided when dtypes parameter is provided";
            throw new Error(msg);
        };
        this.throwColumnLengthError = function (ndframe, arrLen) {
            var msg = "ParamError: Column data length mismatch. You provided data with length " + arrLen + " but Ndframe has column of length " + ndframe.shape[0];
            throw new Error(msg);
        };
        this.throwRowLengthError = function (ndframe, arrLen) {
            var msg = "ParamError: Row data length mismatch. You provided data with length " + arrLen + " but Ndframe has row of length " + ndframe.shape[0];
            throw new Error(msg);
        };
        this.throwColumnNotFoundError = function (ndframe) {
            var msg = "ParamError: Column not found!. Column name must be one of " + ndframe.columns;
            throw new Error(msg);
        };
        this.throwNotImplementedError = function () {
            var msg = "Method not implemented";
            throw new Error(msg);
        };
        this.throwIlocRowIndexError = function () {
            var msg = "ParamError: rows parameter must be a Array. For example: rows: [1,2] or rows: [\"0:10\"]";
            throw new Error(msg);
        };
        this.throwIlocColumnsIndexError = function () {
            var msg = "ParamError: columns parameter must be a Array. For example: columns: [1,2] or columns: [\"0:10\"]";
            throw new Error(msg);
        };
        this.throwStringDtypeOperationError = function (operation) {
            var msg = "DtypeError: String data type does not support " + operation + " operation";
            throw new Error(msg);
        };
        this.throwSeriesMathOpLengthError = function (ndframe, other) {
            var msg = "ParamError: Row length mismatch. Length of other (" + other.shape[0] + "), must be the same as Ndframe (" + ndframe.shape[0] + ")";
            throw new Error(msg);
        };
    }
    return ErrorThrower;
}());
exports.default = new ErrorThrower();

}, function(modId) { var map = {"./defaults":1711103528397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528400, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
// This file is auto-generated by prebuild.js. Do not edit!
var tf = require("@tensorflow/tfjs");
exports.default = tf;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528401, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var dummy_encoder_1 = __importDefault(require("../transformers/encoders/dummy.encoder"));
var mathjs_1 = require("mathjs");
var tensorflowlib_1 = __importDefault(require("../shared/tensorflowlib"));
var defaults_1 = require("../shared/defaults");
var math_ops_1 = require("./math.ops");
var errors_1 = __importDefault(require("../shared/errors"));
var indexing_1 = require("./indexing");
var utils_1 = __importDefault(require("../shared/utils"));
var generic_1 = __importDefault(require("./generic"));
var table_1 = require("table");
var strings_1 = __importDefault(require("./strings"));
var datetime_1 = __importDefault(require("./datetime"));
var plotting_1 = require("../../danfojs-base/plotting");
var utils = new utils_1.default();
/**
 * One-dimensional ndarray with axis labels.
 * The object supports both integer- and label-based indexing and provides a host of methods for performing operations involving the index.
 * Operations between Series (+, -, /, , *) align values based on their associated index values – they need not be the same length.
 * @param data 1D Array, JSON, Tensor, Block of data.
 * @param options.index Array of numeric or string index for subseting array. If not specified, indices are auto generated.
 * @param options.columns Column name. This is like the name of the Series. If not specified, column name is set to 0.
 * @param options.dtypes Data types of the Series data. If not specified, dtypes is inferred.
 * @param options.config General configuration object for extending or setting Series behavior.
 */
var Series = /** @class */ (function (_super) {
    __extends(Series, _super);
    function Series(data, options) {
        if (data === void 0) { data = []; }
        if (options === void 0) { options = {}; }
        var _this = this;
        var index = options.index, columns = options.columns, dtypes = options.dtypes, config = options.config;
        if (Array.isArray(data[0]) || utils.isObject(data[0])) {
            data = utils.convert2DArrayToSeriesArray(data);
            _this = _super.call(this, {
                data: data,
                index: index,
                columns: columns,
                dtypes: dtypes,
                config: config,
                isSeries: true
            }) || this;
        }
        else {
            _this = _super.call(this, {
                data: data,
                index: index,
                columns: columns,
                dtypes: dtypes,
                config: config,
                isSeries: true
            }) || this;
        }
        return _this;
    }
    /**
    * Purely integer-location based indexing for selection by position.
    * ``.iloc`` is primarily integer position based (from ``0`` to
    * ``length-1`` of the axis), but may also be used with a boolean array.
    *
    * @param rows Array of row indexes
    *
    * Allowed inputs are in rows and columns params are:
    *
    * - An array of single integer, e.g. ``[5]``.
    * - A list or array of integers, e.g. ``[4, 3, 0]``.
    * - A slice array string with ints, e.g. ``["1:7"]``.
    * - A boolean array.
    * - A ``callable`` function with one argument (the calling Series or
    * DataFrame) and that returns valid output for indexing (one of the above).
    * This is useful in method chains, when you don't have a reference to the
    * calling object, but would like to base your selection on some value.
    *
    * ``.iloc`` will raise ``IndexError`` if a requested indexer is
    * out-of-bounds.
    *
    * @example
    * ```
    * const sf = new Series([1, 2, 3, 4, 5, 6], { index: ['a', 'b', 'c', 'd', 'e', 'f'] });
    * const sf2 = sf.iloc([0, 2, 4]);
    * sf2.print();
    * ```
    */
    Series.prototype.iloc = function (rows) {
        return (0, indexing_1._iloc)({ ndFrame: this, rows: rows });
    };
    /**
     * Access a group of rows by label(s) or a boolean array.
     * ``loc`` is primarily label based, but may also be used with a boolean array.
     *
     * @param rows Array of row indexes
     *
     * Allowed inputs are:
     *
     * - A single label, e.g. ``["5"]`` or ``['a']``, (note that ``5`` is interpreted as a
     *   *label* of the index, and **never** as an integer position along the index).
     *
     * - A list or array of labels, e.g. ``['a', 'b', 'c']``.
     *
     * - A slice object with labels, e.g. ``["a:f"]``. Note that start and the stop are included
     *
     * - A boolean array of the same length as the axis being sliced,
     * e.g. ``[True, False, True]``.
     *
     * - A ``callable`` function with one argument (the calling Series or
     * DataFrame) and that returns valid output for indexing (one of the above)
     *
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, 5, 6], { index: ['a', 'b', 'c', 'd', 'e', 'f'] });
     * const sf2 = sf.loc(['a', 'c', 'e']);
     * sf2.print();
     * ```
     *
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, 5, 6], { index: ['a', 'b', 'c', 'd', 'e', 'f'] });
     * const sf2 = sf.loc(sf.gt(2));
     * sf2.print();
     * ```
    */
    Series.prototype.loc = function (rows) {
        return (0, indexing_1._loc)({ ndFrame: this, rows: rows });
    };
    /**
      * Returns the first n values in a Series
      * @param rows The number of rows to return
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6], { index: ['a', 'b', 'c', 'd', 'e', 'f'] });
      * const sf2 = sf.head(3);
      * sf2.print();
      * ```
    */
    Series.prototype.head = function (rows) {
        if (rows === void 0) { rows = 5; }
        if (rows <= 0) {
            throw new Error("ParamError: Number of rows cannot be less than 1");
        }
        if (this.shape[0] <= rows) {
            return this.copy();
        }
        if (this.shape[0] - rows < 0) {
            throw new Error("ParamError: Number of rows cannot be greater than available rows in data");
        }
        return this.iloc(["0:" + rows]);
    };
    /**
      * Returns the last n values in a Series
      * @param rows The number of rows to return
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6], { index: ['a', 'b', 'c', 'd', 'e', 'f'] });
      * const sf2 = sf.tail(3);
      * sf2.print();
      * ```
    */
    Series.prototype.tail = function (rows) {
        if (rows === void 0) { rows = 5; }
        if (rows <= 0) {
            throw new Error("ParamError: Number of rows cannot be less than 1");
        }
        if (this.shape[0] <= rows) {
            return this.copy();
        }
        if (this.shape[0] - rows < 0) {
            throw new Error("ParamError: Number of rows cannot be greater than available rows in data");
        }
        var startIdx = this.shape[0] - rows;
        return this.iloc([startIdx + ":"]);
    };
    /**
     * Returns specified number of random rows in a Series
     * @param num The number of rows to return
     * @param options.seed An integer specifying the random seed that will be used to create the distribution.
     * @example
     * ```
     * const df = new Series([1, 2, 3, 4])
     * const df2 = await df.sample(2)
     * df2.print()
     * ```
     * @example
     * ```
     * const df = new Series([1, 2, 3, 4])
     * const df2 = await df.sample(1, { seed: 1 })
     * df2.print()
     * ```
    */
    Series.prototype.sample = function (num, options) {
        if (num === void 0) { num = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var seed, shuffledIndex, sf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed = __assign({ seed: 1 }, options).seed;
                        if (num > this.shape[0]) {
                            throw new Error("Sample size n cannot be bigger than size of dataset");
                        }
                        if (num < -1 || num == 0) {
                            throw new Error("Sample size cannot be less than -1 or be equal to 0");
                        }
                        num = num === -1 ? this.shape[0] : num;
                        return [4 /*yield*/, tensorflowlib_1.default.data.array(this.index).shuffle(num, "" + seed).take(num).toArray()];
                    case 1:
                        shuffledIndex = _a.sent();
                        sf = this.iloc(shuffledIndex);
                        return [2 /*return*/, sf];
                }
            });
        });
    };
    Series.prototype.add = function (other, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("add");
        var newData = (0, math_ops_1._genericMathOp)({ ndFrame: this, other: other, operation: "add" });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return utils.createNdframeFromNewDataWithOldProps({ ndFrame: this, newData: newData, isSeries: true });
        }
    };
    Series.prototype.sub = function (other, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("sub");
        var newData = (0, math_ops_1._genericMathOp)({ ndFrame: this, other: other, operation: "sub" });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return utils.createNdframeFromNewDataWithOldProps({ ndFrame: this, newData: newData, isSeries: true });
        }
    };
    Series.prototype.mul = function (other, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("mul");
        var newData = (0, math_ops_1._genericMathOp)({ ndFrame: this, other: other, operation: "mul" });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return utils.createNdframeFromNewDataWithOldProps({ ndFrame: this, newData: newData, isSeries: true });
        }
    };
    Series.prototype.div = function (other, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("div");
        var newData = (0, math_ops_1._genericMathOp)({ ndFrame: this, other: other, operation: "div" });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return utils.createNdframeFromNewDataWithOldProps({ ndFrame: this, newData: newData, isSeries: true });
        }
    };
    Series.prototype.pow = function (other, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("pow");
        var newData = (0, math_ops_1._genericMathOp)({ ndFrame: this, other: other, operation: "pow" });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return utils.createNdframeFromNewDataWithOldProps({ ndFrame: this, newData: newData, isSeries: true });
        }
    };
    Series.prototype.mod = function (other, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("mod");
        var newData = (0, math_ops_1._genericMathOp)({ ndFrame: this, other: other, operation: "mod" });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return utils.createNdframeFromNewDataWithOldProps({ ndFrame: this, newData: newData, isSeries: true });
        }
    };
    /**
     * Checks if the array value passed has a compatible dtype, removes NaN values, and if
     * boolean values are present, converts them to integer values.
    */
    Series.prototype.$checkAndCleanValues = function (values, operation) {
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError(operation);
        values = utils.removeMissingValuesFromArray(values);
        if (this.dtypes[0] == "boolean") {
            values = utils.mapBooleansToIntegers(values, 1);
        }
        return values;
    };
    /**
     * Returns the mean of elements in Series.
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, 5, 6]);
     * console.log(sf.mean());
     * //output 3.5
     * ```
    */
    Series.prototype.mean = function () {
        var values = this.$checkAndCleanValues(this.values, "mean");
        return (values.reduce(function (a, b) { return a + b; }) / values.length);
    };
    /**
      * Returns the median of elements in Series
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * console.log(sf.median());
      * //output 3.5
      * ```
    */
    Series.prototype.median = function () {
        var values = this.$checkAndCleanValues(this.values, "median");
        return (0, mathjs_1.median)(values);
    };
    /**
      * Returns the modal value of elements in Series
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 4, 5, 6]);
      * console.log(sf.mode());
      * //output [ 4 ]
      * ```
      *
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 4, 5, 5, 6]);
      * console.log(sf.mode());
      * //output [ 4, 5 ]
      * ```
      *
    */
    Series.prototype.mode = function () {
        var values = this.$checkAndCleanValues(this.values, "mode");
        return (0, mathjs_1.mode)(values);
    };
    /**
      * Returns the minimum value in a Series
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * console.log(sf.min());
      * //output 1
      * ```
      *
    */
    Series.prototype.min = function () {
        var values = this.$checkAndCleanValues(this.values, "min");
        var smallestValue = values[0];
        for (var i = 0; i < values.length; i++) {
            smallestValue = smallestValue < values[i] ? smallestValue : values[i];
        }
        return smallestValue;
    };
    /**
      * Returns the maximum value in a Series
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * console.log(sf.max());
      * //output 6
      * ```
    */
    Series.prototype.max = function () {
        var values = this.$checkAndCleanValues(this.values, "max");
        var biggestValue = values[0];
        for (var i = 0; i < values.length; i++) {
            biggestValue = biggestValue > values[i] ? biggestValue : values[i];
        }
        return biggestValue;
    };
    /**
      * Return the sum of the values in a series.
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * console.log(sf.sum());
      * //output 21
      * ```
    */
    Series.prototype.sum = function () {
        var values = this.$checkAndCleanValues(this.values, "sum");
        return values.reduce(function (sum, value) { return sum + value; }, 0);
    };
    /**
       * Return number of non-null elements in a Series
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * console.log(sf.count());
       * //output 6
       * ```
       *
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6, NaN]);
       * console.log(sf.count());
       * //output 6
       * ```
    */
    Series.prototype.count = function () {
        var values = utils.removeMissingValuesFromArray(this.values);
        return values.length;
    };
    /**
      * Return maximum of series and other.
      * @param other Series, number or Array of numbers to check against
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * const sf2 = sf.maximum(3);
      * console.log(sf2.values);
      * //output [ 3, 3, 3, 4, 5, 6 ]
      * ```
      *
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * const sf2 = new Series([4, 1, 3, 40, 5, 3]);
      * const sf3 = sf.maximum(sf2);
      * console.log(sf3.values);
      * //output [ 4, 2, 3, 40, 5, 6 ]
      * ```
    */
    Series.prototype.maximum = function (other) {
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("maximum");
        var newData = (0, math_ops_1._genericMathOp)({ ndFrame: this, other: other, operation: "maximum" });
        return new Series(newData, {
            columns: this.columns,
            index: this.index
        });
    };
    /**
      * Return minimum of series and other.
      * @param other Series, number of Array of numbers to check against
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * const sf2 = sf.minimum(3);
      * console.log(sf2.values);
      * //output [ 1, 2, 3, 3, 3, 3 ]
      * ```
      *
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * const sf2 = new Series([4, 1, 3, 40, 5, 3]);
      * const sf3 = sf.minimum(sf2);
      * console.log(sf3.values);
      * //output [ 1, 1, 3, 4, 5, 3 ]
      * ```
      *
    */
    Series.prototype.minimum = function (other) {
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("maximum");
        var newData = (0, math_ops_1._genericMathOp)({ ndFrame: this, other: other, operation: "minimum" });
        return new Series(newData, {
            columns: this.columns,
            index: this.index
        });
    };
    Series.prototype.round = function (dp, options) {
        if (dp === void 0) { dp = 1; }
        var inplace = __assign({ inplace: false }, options).inplace;
        if (dp === undefined)
            dp = 1;
        var newValues = utils.round(this.values, dp, true);
        if (inplace) {
            this.$setValues(newValues);
        }
        else {
            return utils.createNdframeFromNewDataWithOldProps({
                ndFrame: this,
                newData: newValues,
                isSeries: true
            });
        }
    };
    /**
      * Return sample standard deviation of elements in Series
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * console.log(sf.std());
      * //output 1.8708286933869707
      * ```
    */
    Series.prototype.std = function () {
        var values = this.$checkAndCleanValues(this.values, "max");
        return (0, mathjs_1.std)(values);
    };
    /**
      *  Return unbiased variance of elements in a Series.
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * console.log(sf.var());
      * //output 3.5
      * ```
    */
    Series.prototype.var = function () {
        var values = this.$checkAndCleanValues(this.values, "max");
        return (0, mathjs_1.variance)(values);
    };
    /**
     * Return a boolean same-sized object indicating where elements are NaN.
     * NaN and undefined values gets mapped to true, and everything else gets mapped to false.
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, NaN, 6]);
     * console.log(sf.isNaN());
     * //output [ false, false, false, false, true, false ]
     * ```
     *
    */
    Series.prototype.isNa = function () {
        var newData = this.values.map(function (value) {
            if (utils.isEmpty(value)) {
                return true;
            }
            else {
                return false;
            }
        });
        var sf = new Series(newData, {
            index: this.index,
            dtypes: ["boolean"],
            config: this.config
        });
        return sf;
    };
    Series.prototype.fillNa = function (value, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (!value && typeof value !== "boolean" && typeof value !== "number") {
            throw Error('ParamError: value must be specified');
        }
        var newValues = [];
        this.values.forEach(function (val) {
            if (utils.isEmpty(val)) {
                newValues.push(value);
            }
            else {
                newValues.push(val);
            }
        });
        if (inplace) {
            this.$setValues(newValues);
        }
        else {
            return utils.createNdframeFromNewDataWithOldProps({
                ndFrame: this,
                newData: newValues,
                isSeries: true
            });
        }
    };
    Series.prototype.sortValues = function (options) {
        var _a = __assign({ ascending: true, inplace: false }, options), ascending = _a.ascending, inplace = _a.inplace;
        var sortedValues = [];
        var sortedIndex = [];
        var rangeIdx = utils.range(0, this.index.length - 1);
        var sortedIdx = utils.sortArrayByIndex(rangeIdx, this.values, this.dtypes[0]);
        for (var _i = 0, sortedIdx_1 = sortedIdx; _i < sortedIdx_1.length; _i++) {
            var indx = sortedIdx_1[_i];
            sortedValues.push(this.values[indx]);
            sortedIndex.push(this.index[indx]);
        }
        if (ascending) {
            sortedValues = sortedValues.reverse();
            sortedIndex = sortedIndex.reverse();
        }
        if (inplace) {
            this.$setValues(sortedValues);
            this.$setIndex(sortedIndex);
        }
        else {
            var sf = new Series(sortedValues, {
                index: sortedIndex,
                dtypes: this.dtypes,
                config: this.config
            });
            return sf;
        }
    };
    /**
      * Makes a deep copy of a Series
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * const sf2 = sf.copy();
      * ```
      *
    */
    Series.prototype.copy = function () {
        var sf = new Series(__spreadArray([], this.values, true), {
            columns: __spreadArray([], this.columns, true),
            index: __spreadArray([], this.index, true),
            dtypes: __spreadArray([], this.dtypes, true),
            config: __assign({}, this.config)
        });
        return sf;
    };
    /**
      * Generate descriptive statistics.
      * Descriptive statistics include those that summarize the central tendency,
      * dispersion and shape of a dataset’s distribution, excluding NaN values.
      * @example
      * ```
      * const sf = new Series([1, 2, 3, 4, 5, 6]);
      * const sf2 = sf.describe();
      * sf2.print();
      * ```
    */
    Series.prototype.describe = function () {
        if (this.dtypes[0] == "string") {
            throw new Error("DType Error: Cannot generate descriptive statistics for Series with string dtype");
        }
        else {
            var index = ['count', 'mean', 'std', 'min', 'median', 'max', 'variance'];
            var count = this.count();
            var mean = this.mean();
            var std_1 = this.std();
            var min = this.min();
            var median_1 = this.median();
            var max = this.max();
            var variance_1 = this.var();
            var data = [count, mean, std_1, min, median_1, max, variance_1];
            var sf = new Series(data, { index: index });
            return sf;
        }
    };
    Series.prototype.resetIndex = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (inplace) {
            this.$resetIndex();
        }
        else {
            var sf = this.copy();
            sf.$resetIndex();
            return sf;
        }
    };
    Series.prototype.setIndex = function (index, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (!index) {
            throw Error('Param Error: Must specify index array');
        }
        if (inplace) {
            this.$setIndex(index);
        }
        else {
            var sf = this.copy();
            sf.$setIndex(index);
            return sf;
        }
    };
    Series.prototype.map = function (callable, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var isCallable = utils.isFunction(callable);
        var data = this.values.map(function (val, i) {
            if (isCallable) {
                return callable(val, i);
            }
            else if (utils.isObject(callable)) {
                if (val in callable) {
                    //@ts-ignore
                    return callable[val];
                }
                else {
                    return val;
                }
            }
            else {
                throw new Error("Param Error: callable must either be a function or an object");
            }
        });
        if (inplace) {
            this.$setValues(data);
        }
        else {
            var sf = this.copy();
            sf.$setValues(data);
            return sf;
        }
    };
    Series.prototype.apply = function (callable, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var isCallable = utils.isFunction(callable);
        if (!isCallable) {
            throw new Error("Param Error: callable must be a function");
        }
        var data = this.values.map(function (val) {
            return callable(val);
        });
        if (inplace) {
            this.$setValues(data);
        }
        else {
            var sf = this.copy();
            sf.$setValues(data);
            return sf;
        }
    };
    /**
     * Returns a Series with only the unique value(s) in the original Series
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
     * const sf2 = sf.unique();
     * console.log(sf2.values);
     * //output [ 1, 2, 3, 4, 5, 6 ]
     * ```
    */
    Series.prototype.unique = function () {
        var newValues = new Set(this.values);
        var series = new Series(Array.from(newValues));
        return series;
    };
    /**
     * Return the number of unique elements in a Series
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
     * console.log(sf.nUnique());
     * //output 6
     * ```
     *
    */
    Series.prototype.nUnique = function () {
        return (new Set(this.values)).size;
    };
    /**
     * Returns unique values and their counts in a Series
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
     * const sf2 = sf.valueCounts();
     * sf2.print();
     * ```
    */
    Series.prototype.valueCounts = function () {
        var sData = this.values;
        var dataDict = {};
        for (var i = 0; i < sData.length; i++) {
            var val = sData[i];
            if ("" + val in dataDict) {
                dataDict["" + val] = dataDict["" + val] + 1;
            }
            else {
                dataDict["" + val] = 1;
            }
        }
        var index = Object.keys(dataDict).map(function (x) {
            return parseInt(x) ? parseInt(x) : x;
        });
        var data = Object.values(dataDict);
        var series = new Series(data, { index: index });
        return series;
    };
    Series.prototype.abs = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError("abs");
        var newValues;
        newValues = this.values.map(function (val) { return Math.abs(val); });
        if (inplace) {
            this.$setValues(newValues);
        }
        else {
            var sf = this.copy();
            sf.$setValues(newValues);
            return sf;
        }
    };
    Series.prototype.cumSum = function (options) {
        var ops = __assign({ inplace: false }, options);
        return this.cumOps("sum", ops);
    };
    Series.prototype.cumMin = function (options) {
        var ops = __assign({ inplace: false }, options);
        return this.cumOps("min", ops);
    };
    Series.prototype.cumMax = function (options) {
        var ops = __assign({ inplace: false }, options);
        return this.cumOps("max", ops);
    };
    Series.prototype.cumProd = function (options) {
        var ops = __assign({ inplace: false }, options);
        return this.cumOps("prod", ops);
    };
    /**
     * Internal helper function to calculate cumulative operations on series data
    */
    Series.prototype.cumOps = function (ops, options) {
        if (this.dtypes[0] == "string")
            errors_1.default.throwStringDtypeOperationError(ops);
        var inplace = options.inplace;
        var sData = this.values;
        var tempval = sData[0];
        var data = [tempval];
        for (var i = 1; i < sData.length; i++) {
            var currVal = sData[i];
            switch (ops) {
                case "max":
                    if (currVal > tempval) {
                        data.push(currVal);
                        tempval = currVal;
                    }
                    else {
                        data.push(tempval);
                    }
                    break;
                case "min":
                    if (currVal < tempval) {
                        data.push(currVal);
                        tempval = currVal;
                    }
                    else {
                        data.push(tempval);
                    }
                    break;
                case "sum":
                    tempval = tempval + currVal;
                    data.push(tempval);
                    break;
                case "prod":
                    tempval = tempval * currVal;
                    data.push(tempval);
                    break;
            }
        }
        if (inplace) {
            this.$setValues(data);
        }
        else {
            return new Series(data, {
                index: this.index,
                config: __assign({}, this.config)
            });
        }
    };
    /**
       * Returns less than of series and other. Supports element wise operations
       * @param other Series, number, or Array of numbers to compare against
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.lt(3);
       * console.log(sf2.values);
       * //output [ true, true, false, false, false, false ]
       * ```
       *
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.lt([3, 4, 5, 6, 7, 8]);
       * console.log(sf2.values);
       * //output [ true, true, false, false, false, false ]
       * ```
    */
    Series.prototype.lt = function (other) {
        return this.boolOps(other, "lt");
    };
    /**
       * Returns Greater than of series and other. Supports element wise operations
       * @param other Series, number or Array of numbers to compare against
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.gt(3);
       * console.log(sf2.values);
       * //output [ false, false, true, true, true, true ]
       * ```
       *
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.gt([3, 4, 5, 6, 7, 8]);
       * console.log(sf2.values);
       * //output [ false, false, true, true, true, true ]
       * ```
    */
    Series.prototype.gt = function (other) {
        return this.boolOps(other, "gt");
    };
    /**
       * Returns Less than or Equal to of series and other. Supports element wise operations
       * @param other Series, number or Array of numbers to compare against
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.le(3);
       * console.log(sf2.values);
       * //output [ true, true, true, true, false, false ]
       * ```
       *
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.le([3, 4, 5, 6, 7, 8]);
       * console.log(sf2.values);
       * //output [ true, true, true, true, false, false ]
       * ```
       *
    */
    Series.prototype.le = function (other) {
        return this.boolOps(other, "le");
    };
    /**
       * Returns Greater than or Equal to of series and other. Supports element wise operations
       * @param other Series, number or Array of numbers to compare against
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.ge(3);
       * console.log(sf2.values);
       * //output [ false, false, true, true, true, true ]
       * ```
       *
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.ge([3, 4, 5, 6, 7, 8]);
       * console.log(sf2.values);
       * //output [ false, false, true, true, true, true ]
       * ```
       */
    Series.prototype.ge = function (other) {
        return this.boolOps(other, "ge");
    };
    /**
        * Returns Not Equal to of series and other. Supports element wise operations
        * @param other Series, number or Array of numbers to compare against
        * @example
        * ```
        * const sf = new Series([1, 2, 3, 4, 5, 6]);
        * const sf2 = sf.ne(3);
        * console.log(sf2.values);
        * //output [ true, true, false, true, true, true ]
        * ```
        *
        * @example
        * ```
        * const sf = new Series([1, 2, 3, 4, 5, 6]);
        * const sf2 = sf.ne([3, 2, 5, 6, 7, 8]);
        * console.log(sf2.values);
        * //output [ true, false, true, true, true, true ]
        * ```
        *
    */
    Series.prototype.ne = function (other) {
        return this.boolOps(other, "ne");
    };
    /**
       * Returns Equal to of series and other. Supports element wise operations
       * @param other Series, number or Array of numbers to compare against
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.eq(3);
       * console.log(sf2.values);
       * //output [ false, false, true, false, false, false ]
       * ```
       *
       * @example
       * ```
       * const sf = new Series([1, 2, 3, 4, 5, 6]);
       * const sf2 = sf.eq(new Series([3, 2, 5, 6, 7, 8]));
       * console.log(sf2.values);
       * //output [ false, true, false, false, false, false ]
       * ```
       */
    Series.prototype.eq = function (other) {
        return this.boolOps(other, "eq");
    };
    /**
     * Internal function to perform boolean operations
     * @param other Other Series or number to compare with
     * @param bOps Name of operation to perform [ne, ge, le, gt, lt, eq]
     */
    Series.prototype.boolOps = function (other, bOps) {
        var data = [];
        var lSeries = this.values;
        var rSeries;
        if (typeof other == "number") {
            rSeries = Array(this.values.length).fill(other); //create array of repeated value for broadcasting
        }
        else if (typeof other == "string" && ["eq", "ne"].includes(bOps)) {
            rSeries = Array(this.values.length).fill(other);
        }
        else if (other instanceof Series) {
            rSeries = other.values;
        }
        else if (Array.isArray(other)) {
            rSeries = other;
        }
        else {
            throw new Error("ParamError: value for other not supported. It must be either a scalar, Array or Series");
        }
        if (!(lSeries.length === rSeries.length)) {
            throw new Error("LengthError: length of other must be equal to length of Series");
        }
        for (var i = 0; i < lSeries.length; i++) {
            var lVal = lSeries[i];
            var rVal = rSeries[i];
            var bool = null;
            switch (bOps) {
                case "lt":
                    bool = lVal < rVal ? true : false;
                    data.push(bool);
                    break;
                case "gt":
                    bool = lVal > rVal ? true : false;
                    data.push(bool);
                    break;
                case "le":
                    bool = lVal <= rVal ? true : false;
                    data.push(bool);
                    break;
                case "ge":
                    bool = lVal >= rVal ? true : false;
                    data.push(bool);
                    break;
                case "ne":
                    bool = lVal !== rVal ? true : false;
                    data.push(bool);
                    break;
                case "eq":
                    bool = lVal === rVal ? true : false;
                    data.push(bool);
                    break;
            }
        }
        return new Series(data, {
            index: this.index,
            config: __assign({}, this.config)
        });
    };
    Series.prototype.replace = function (oldValue, newValue, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (!oldValue && typeof oldValue !== 'boolean') {
            throw Error("Params Error: Must specify param 'oldValue' to replace");
        }
        if (!newValue && typeof newValue !== 'boolean') {
            throw Error("Params Error: Must specify param 'newValue' to replace with");
        }
        var newArr = __spreadArray([], this.values, true).map(function (val) {
            if (val === oldValue) {
                return newValue;
            }
            else {
                return val;
            }
        });
        if (inplace) {
            this.$setValues(newArr);
        }
        else {
            var sf = this.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Series.prototype.dropNa = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var oldValues = this.values;
        var oldIndex = this.index;
        var newValues = [];
        var newIndex = [];
        var isNaVals = this.isNa().values;
        isNaVals.forEach(function (val, i) {
            if (!val) {
                newValues.push(oldValues[i]);
                newIndex.push(oldIndex[i]);
            }
        });
        if (inplace) {
            this.$setValues(newValues, false);
            this.$setIndex(newIndex);
        }
        else {
            var sf = this.copy();
            sf.$setValues(newValues, false);
            sf.$setIndex(newIndex);
            return sf;
        }
    };
    /**
     * Returns the integer indices that would sort the Series.
     * @param ascending Boolean indicating whether to sort in ascending order or not. Defaults to true
     * @example
     * ```
     * const sf = new Series([3, 1, 2]);
     * const sf2 = sf.argSort();
     * console.log(sf2.values);
     * //output [ 1, 2, 0 ]
     * ```
     *
     * @example
     * ```
     * const sf = new Series([3, 1, 2]);
     * const sf2 = sf.argSort({ascending: false});
     * console.log(sf2.values);
     * //output [ 0, 2, 1 ]
     *
     */
    Series.prototype.argSort = function (options) {
        var ascending = __assign({ ascending: true }, options).ascending;
        var sortedIndex = this.sortValues({ ascending: ascending });
        var sf = new Series(sortedIndex.index);
        return sf;
    };
    /**
       * Returns integer position of the largest value in the Series.
       * @example
       * ```
       * const sf = new Series([3, 1, 2]);
       * const sf2 = sf.argMax();
       * console.log(sf2);
       * //output 0
       * ```
       *
    */
    Series.prototype.argMax = function () {
        return this.tensor.argMax().arraySync();
    };
    /**
       * Returns integer position of the smallest value in the Series.
       * @example
       * ```
       * const sf = new Series([3, 1, 2]);
       * const sf2 = sf.argMin();
       * console.log(sf2);
       * //output 1
       * ```
       *
    */
    Series.prototype.argMin = function () {
        return this.tensor.argMin().arraySync();
    };
    Series.prototype.dropDuplicates = function (options) {
        var _a = __assign({ keep: "first", inplace: false }, options), keep = _a.keep, inplace = _a.inplace;
        if (!(["first", "last"].includes(keep))) {
            throw Error("Params Error: Keep must be one of 'first' or 'last'");
        }
        var dataArr;
        var newArr = [];
        var oldIndex;
        var newIndex = [];
        if (keep === "last") {
            dataArr = this.values.reverse();
            oldIndex = this.index.reverse();
        }
        else {
            dataArr = this.values;
            oldIndex = this.index;
        }
        dataArr.forEach(function (val, i) {
            if (!newArr.includes(val)) {
                newIndex.push(oldIndex[i]);
                newArr.push(val);
            }
        });
        if (keep === "last") {
            //re-reversed the array and index to its true order
            newArr = newArr.reverse();
            newIndex = newIndex.reverse();
        }
        if (inplace) {
            this.$setValues(newArr, false);
            this.$setIndex(newIndex);
        }
        else {
            var sf = this.copy();
            sf.$setValues(newArr, false);
            sf.$setIndex(newIndex);
            return sf;
        }
    };
    Series.prototype.asType = function (dtype, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (!dtype) {
            throw Error("Param Error: Please specify dtype to cast to");
        }
        if (!(defaults_1.DATA_TYPES.includes(dtype))) {
            throw Error("dtype " + dtype + " not supported. dtype must be one of " + defaults_1.DATA_TYPES);
        }
        var oldValues = __spreadArray([], this.values, true);
        var newValues = [];
        switch (dtype) {
            case "float32":
                oldValues.forEach(function (val) {
                    newValues.push(Number(val));
                });
                break;
            case "int32":
                oldValues.forEach(function (val) {
                    newValues.push(parseInt(val));
                });
                break;
            case "string":
                oldValues.forEach(function (val) {
                    newValues.push(String(val));
                });
                break;
            case "boolean":
                oldValues.forEach(function (val) {
                    newValues.push(Boolean(val));
                });
                break;
            case "undefined":
                oldValues.forEach(function (_) {
                    newValues.push(NaN);
                });
                break;
            default:
                break;
        }
        if (inplace) {
            this.$setValues(newValues, false);
            this.$setDtypes([dtype]);
        }
        else {
            var sf = this.copy();
            sf.$setValues(newValues, false);
            sf.$setDtypes([dtype]);
            return sf;
        }
    };
    Series.prototype.append = function (newValue, index, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (!newValue && typeof newValue !== "boolean" && typeof newValue !== "number") {
            throw Error("Param Error: newValue cannot be null or undefined");
        }
        if (!index) {
            throw Error("Param Error: index cannot be null or undefined");
        }
        var newData = __spreadArray([], this.values, true);
        var newIndx = __spreadArray([], this.index, true);
        if (Array.isArray(newValue) && Array.isArray(index)) {
            if (newValue.length !== index.length) {
                throw Error("Param Error: Length of new values and index must be the same");
            }
            newValue.forEach(function (el, i) {
                newData.push(el);
                newIndx.push(index[i]);
            });
        }
        else if (newValue instanceof Series) {
            var _value = newValue.values;
            if (!Array.isArray(index)) {
                throw Error("Param Error: index must be an array");
            }
            if (index.length !== _value.length) {
                throw Error("Param Error: Length of new values and index must be the same");
            }
            _value.forEach(function (el, i) {
                newData.push(el);
                newIndx.push(index[i]);
            });
        }
        else {
            newData.push(newValue);
            newIndx.push(index);
        }
        if (inplace) {
            this.$setValues(newData, false);
            this.$setIndex(newIndx);
        }
        else {
            var sf = new Series(newData, {
                index: newIndx,
                columns: this.columns,
                dtypes: this.dtypes,
                config: this.config
            });
            return sf;
        }
    };
    Object.defineProperty(Series.prototype, "dtype", {
        /**
         * Returns dtype of Series
         * @example
         * ```
         * const sf = new Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
         * console.log(sf.dtype);
         * //output "int32"
         * ```
        */
        get: function () {
            return this.dtypes[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Series.prototype, "str", {
        /**
         * Exposes numerous string methods to manipulate Series of string dtype
         * @example
         * ```
         * const sf = new Series(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
         * const sfs = sf.str.join("HelloWorld", "");
         * console.log(sfs.values);
         * //output ["aHelloWorld", "bHelloWorld", "cHelloWorld", "dHelloWorld", "eHelloWorld", "fHelloWorld", "gHelloWorld", "hHelloWorld", "iHelloWorld", "jHelloWorld"]
         * ```
        */
        get: function () {
            if (this.dtypes[0] == "string") {
                return new strings_1.default(this);
            }
            else {
                throw new Error("Cannot call accessor str on non-string type");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Series.prototype, "dt", {
        /**
          * Returns time class that exposes different date time method
          * @example
          * ```
          * const sf = new Series([
          *  "2020-01-01",
          *  "2020-01-02",
          *  "2020-01-03",
          *  "2020-01-04",
          *  "2020-01-05",
          * ]);
          * const sfd = sf.dt.dayOfWeekName();
          * console.log(sfd.values);
          * //output [ 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
          * ```
        */
        get: function () {
            if (["string", "datetime"].includes(this.dtypes[0])) {
                return new datetime_1.default(this);
            }
            else {
                throw new Error("Cannot call accessor dt on non-string type");
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Overrides default toString implementation. This essentially makes `print()` works.
    */
    Series.prototype.toString = function () {
        var maxRow = this.$config.getMaxRow;
        var indx;
        var values = [];
        if (this.shape[0] > maxRow) {
            //slice rows to show [max_rows] rows
            var sfSlice = this.iloc(["0:" + maxRow]);
            indx = sfSlice.index;
            values = sfSlice.values;
        }
        else {
            indx = this.index;
            values = this.values;
        }
        var tabledata = values.map(function (x, i) { return [indx[i], x]; });
        return (0, table_1.table)(tabledata);
    };
    /**
     * Returns the logical AND between Series and other. Supports element wise operations and broadcasting.
     * @param other Series, Scalar, Array of Scalars
     * @example
     * ```
     * const sf = new Series([true, true, false, false, true]);
     * const sf2 = new Series([true, false, true, false, true]);
     * const sf3 = sf.and(sf2);
     * console.log(sf3.values);
     * //output [ true, false, false, false, false ]
     * ```
    */
    Series.prototype.and = function (other) {
        if (other === undefined) {
            throw new Error("Param Error: other cannot be undefined");
        }
        var newValues = [];
        if (other instanceof Series) {
            if (this.dtypes[0] !== other.dtypes[0]) {
                throw new Error("Param Error: Series must be of same dtype");
            }
            if (this.shape[0] !== other.shape[0]) {
                throw new Error("Param Error: Series must be of same shape");
            }
            this.values.forEach(function (val, i) {
                newValues.push(Boolean(val) && Boolean(other.values[i]));
            });
        }
        else if (typeof other === "boolean") {
            this.values.forEach(function (val) {
                newValues.push(Boolean(val) && Boolean(other));
            });
        }
        else if (Array.isArray(other)) {
            this.values.forEach(function (val, i) {
                newValues.push(Boolean(val) && Boolean(other[i]));
            });
        }
        else {
            throw new Error("Param Error: other must be a Series, Scalar, or Array of Scalars");
        }
        return new Series(newValues, {
            index: this.index,
            config: __assign({}, this.config)
        });
    };
    /**
     * Returns the logical OR between Series and other. Supports element wise operations and broadcasting.
     * @param other Series, Scalar, Array of Scalars
     * @example
     * ```
     * const sf = new Series([true, true, false, false, true]);
     * const sf2 = new Series([true, false, true, false, true]);
     * const sf3 = sf.or(sf2);
     * console.log(sf3.values);
     * //output [ true, true, true, false, true ]
     * ```
     *
    */
    Series.prototype.or = function (other) {
        if (other === undefined) {
            throw new Error("Param Error: other cannot be undefined");
        }
        var newValues = [];
        if (other instanceof Series) {
            if (this.dtypes[0] !== other.dtypes[0]) {
                throw new Error("Param Error: Series must be of same dtype");
            }
            if (this.shape[0] !== other.shape[0]) {
                throw new Error("Param Error: Series must be of same shape");
            }
            this.values.forEach(function (val, i) {
                newValues.push(Boolean(val) || Boolean(other.values[i]));
            });
        }
        else if (typeof other === "boolean") {
            this.values.forEach(function (val) {
                newValues.push(Boolean(val) || Boolean(other));
            });
        }
        else if (Array.isArray(other)) {
            this.values.forEach(function (val, i) {
                newValues.push(Boolean(val) || Boolean(other[i]));
            });
        }
        else {
            throw new Error("Param Error: other must be a Series, Scalar, or Array of Scalars");
        }
        return new Series(newValues, {
            index: this.index,
            config: __assign({}, this.config)
        });
    };
    /**
     * One-hot encode values in the Series.
     * @param options Options for the operation. The following options are available:
     * - `prefix`: Prefix to add to the new column. Defaults to unique labels.
     * - `prefixSeparator`: Separator to use for the prefix. Defaults to '_'.
     * @example
     * ```
     * const sf = new Series(["a", "b", "c", "a"]);
     * const sf2 = sf.getDummies({ prefix: "category" });
     * console.log(sf2.values);
     * //output [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ], [ 1, 0, 0 ] ]
     * ```
     *
     * @example
     * ```
     * const sf = new Series(["a", "b", "c", "a"]);
     * const sf2 = sf.getDummies({ prefix: "category", prefixSeparator: "-" });
     * console.log(sf2.values);
     * //output [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ], [ 1, 0, 0 ] ]
     * ```
     */
    Series.prototype.getDummies = function (options) {
        return (0, dummy_encoder_1.default)(this, options);
    };
    /**
     * Access a single value for a row index.
     * Similar to iloc, in that both provide index-based lookups.
     * Use iat if you only need to get or set a single value in a Series.
     * @param row Row index of the value to access.
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, 5])
     * sf.iat(0) //returns 1
     * sf.iat(1) //returns 2
     * sf.iat(2) //returns 3
     * ```
    */
    Series.prototype.iat = function (row) {
        if (typeof row === 'string') {
            throw new Error('ParamError: row index must be an integer. Use .at to get a row by label.');
        }
        return this.values[row];
    };
    /**
     * Access a single value for a row label.
     * Similar to loc, in that both provide label-based lookups.
     * Use at if you only need to get or set a single value in a Series.
     * @param row Row label of the value to access.
     * @example
     * ```
     * const sf = new Series([1, 2, 3, 4, 5, 6], { index: ['A', 'B', 'C', 'D', 'E', 'F'] })
     * sf.at('A') //returns 1
     * sf.at('B') //returns 2
     * sf.at('C') //returns 3
     * ```
    */
    Series.prototype.at = function (row) {
        if (typeof row !== 'string') {
            throw new Error('ParamError: row index must be a string. Use .iat to get a row by index.');
        }
        return this.values[this.index.indexOf(row)];
    };
    /**
     * Exposes functions for creating charts from a DataFrame.
     * Charts are created using the Plotly.js library, so all Plotly's configuration parameters are available.
     * @param divId name of the HTML Div to render the chart in.
    */
    Series.prototype.plot = function (divId) {
        //TODO: Add support for check plot library to use. So we can support other plot library like d3, vega, etc
        if (utils.isBrowserEnv()) {
            var plt = new plotting_1.PlotlyLib(this, divId);
            return plt;
        }
        else {
            throw new Error("Not supported in NodeJS");
        }
    };
    return Series;
}(generic_1.default));
exports.default = Series;

}, function(modId) { var map = {"../transformers/encoders/dummy.encoder":1711103528402,"../shared/tensorflowlib":1711103528400,"../shared/defaults":1711103528397,"./math.ops":1711103528418,"../shared/errors":1711103528399,"./indexing":1711103528406,"../shared/utils":1711103528396,"./generic":1711103528395,"./strings":1711103528419,"./datetime":1711103528420,"../../danfojs-base/plotting":1711103528407}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528402, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var frame_1 = __importDefault(require("../../core/frame"));
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = __importDefault(require("../../shared/utils"));
var utils = new utils_1.default();
/**
 * Generate one-hot encoding for categorical columns in an Array, Series or Dataframe.
 * @param data Series or Dataframe
 * @param columns Columns to encode
 * @param prefix Prefix for the new columns
 * @param prefixSeparator Separator for the prefix and the column name
 * @returns Encoded Dataframe
 * @example
 * import { DataFrame, DummyEncoder }from 'danfojs';
 * const df = new DataFrame([[1,2,3], [4,5,6]], { columns: ['a', 'b', 'c'] });
 * const df2 = new DummyEncoder({data: df, columns: ['a', 'b'], prefix: 'enc', prefixSeparator: '#'}).encode();
 * df2.print();
 */
function dummyEncode(data, options) {
    var _a = __assign({ columns: null, prefix: null, prefixSeparator: "_" }, options), columns = _a.columns, prefix = _a.prefix, prefixSeparator = _a.prefixSeparator;
    if (!data) {
        throw new Error('ParamError: data must be one of Array, Series or DataFrame');
    }
    if (data instanceof series_1.default || data instanceof frame_1.default) {
        if (!columns) {
            var colsWithStringDtype_1 = [];
            data.dtypes.forEach(function (dtype, index) {
                if (dtype === "string") {
                    colsWithStringDtype_1.push(data.columns[index]);
                }
            });
            columns = colsWithStringDtype_1;
        }
    }
    else {
        throw new Error('ParamError: data must be one of Array, Series or DataFrame');
    }
    if (typeof columns === "string") {
        columns = [columns];
        if (Array.isArray(prefix) && prefix.length === 1) {
            prefix = prefix;
        }
        else if (typeof prefix === "string") {
            prefix = [prefix];
        }
        else {
            throw new Error('ParamError: prefix must be a string, or an array of same length as columns');
        }
        if (Array.isArray(prefixSeparator) && prefixSeparator.length === 1) {
            prefixSeparator = prefixSeparator;
        }
        else if (typeof prefixSeparator === "string") {
            prefixSeparator = [prefixSeparator];
        }
        else {
            throw new Error('ParamError: prefix must be a string, or an array of same length as columns');
        }
    }
    else if (Array.isArray(columns)) {
        if (prefix) {
            if (Array.isArray(prefix) && prefix.length !== columns.length) {
                throw new Error("ParamError: prefix and data array must be of the same length. If you need to use the same prefix, then pass a string param instead. e.g {prefix: \"" + prefix + "\"}");
            }
            if (typeof prefix === "string") {
                prefix = columns.map(function (_) { return prefix; });
            }
        }
        if (prefixSeparator) {
            if (Array.isArray(prefixSeparator) && prefixSeparator.length !== columns.length) {
                throw new Error("ParamError: prefixSeparator and data array must be of the same length. If you need to use the same prefix separator, then pass a string param instead. e.g {prefixSeparator: \"" + prefixSeparator + "\"}");
            }
            if (typeof prefixSeparator === "string") {
                prefixSeparator = columns.map(function (_) { return prefixSeparator; });
            }
        }
    }
    else {
        throw new Error('ParamError: columns must be a string or an array of strings');
    }
    if (data instanceof series_1.default) {
        var colData = data.values;
        var newColumnNames = [];
        var uniqueValues = Array.from(new Set(colData));
        var oneHotArr = utils.zeros(colData.length, uniqueValues.length);
        for (var i = 0; i < colData.length; i++) {
            var index = uniqueValues.indexOf(colData[i]);
            oneHotArr[i][index] = 1;
        }
        for (var i = 0; i < uniqueValues.length; i++) {
            var prefixToAdd = prefix ? prefix[0] : i;
            newColumnNames.push("" + prefixToAdd + prefixSeparator[0] + uniqueValues[i]);
        }
        return new frame_1.default(oneHotArr, { columns: newColumnNames });
    }
    else {
        var dfWithSelectedColumnsDropped = data.drop({ columns: columns });
        var newData = dfWithSelectedColumnsDropped === null || dfWithSelectedColumnsDropped === void 0 ? void 0 : dfWithSelectedColumnsDropped.values;
        var newColumnNames = dfWithSelectedColumnsDropped === null || dfWithSelectedColumnsDropped === void 0 ? void 0 : dfWithSelectedColumnsDropped.columns;
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            var colData = data.column(column).values;
            var uniqueValues = Array.from(new Set(colData));
            var oneHotArr = utils.zeros(colData.length, uniqueValues.length);
            for (var j = 0; j < colData.length; j++) {
                var index = uniqueValues.indexOf(colData[j]);
                oneHotArr[j][index] = 1;
                var prefixToAdd = prefix ? prefix[i] : column;
                var newColName = "" + prefixToAdd + prefixSeparator[i] + colData[j];
                if (!newColumnNames.includes(newColName)) {
                    newColumnNames.push(newColName);
                }
            }
            for (var k = 0; k < newData.length; k++) {
                newData[k] = __spreadArray(__spreadArray([], newData[k], true), oneHotArr[k], true);
            }
        }
        return new frame_1.default(newData, { columns: newColumnNames });
    }
}
exports.default = dummyEncode;

}, function(modId) { var map = {"../../core/frame":1711103528403,"../../core/series":1711103528401,"../../shared/utils":1711103528396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528403, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var dummy_encoder_1 = __importDefault(require("../transformers/encoders/dummy.encoder"));
var mathjs_1 = require("mathjs");
var tensorflowlib_1 = __importDefault(require("../shared/tensorflowlib"));
var defaults_1 = require("../shared/defaults");
var groupby_1 = __importDefault(require("../aggregators/groupby"));
var errors_1 = __importDefault(require("../shared/errors"));
var indexing_1 = require("./indexing");
var utils_1 = __importDefault(require("../shared/utils"));
var generic_1 = __importDefault(require("./generic"));
var table_1 = require("table");
var series_1 = __importDefault(require("./series"));
var plotting_1 = require("../../danfojs-base/plotting");
var utils = new utils_1.default();
/**
 * Two-dimensional ndarray with axis labels.
 * The object supports both integer- and label-based indexing and provides a host of methods for performing operations involving the index.
 * Operations between DataFrame (+, -, /, , *) align values based on their associated index values– they need not be the same length.
 * @param data 2D Array, JSON, Tensor, Block of data.
 * @param options.index Array of numeric or string names for subseting array. If not specified, indexes are auto generated.
 * @param options.columns Array of column names. If not specified, column names are auto generated.
 * @param options.dtypes Array of data types for each the column. If not specified, dtypes are/is inferred.
 * @param options.config General configuration object for extending or setting NDframe behavior.
 */
var DataFrame = /** @class */ (function (_super) {
    __extends(DataFrame, _super);
    function DataFrame(data, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var index = options.index, columns = options.columns, dtypes = options.dtypes, config = options.config;
        _this = _super.call(this, { data: data, index: index, columns: columns, dtypes: dtypes, config: config, isSeries: false }) || this;
        _this.$setInternalColumnDataProperty();
        return _this;
    }
    /**
     * Maps all column names to their corresponding data, and return them as Series objects.
     * This makes column subsetting works. E.g this can work ==> `df["col1"]`
     * @param column Optional, a single column name to map
     */
    DataFrame.prototype.$setInternalColumnDataProperty = function (column) {
        var self = this;
        if (column && typeof column === "string") {
            Object.defineProperty(self, column, {
                get: function () {
                    return self.$getColumnData(column);
                },
                set: function (arr) {
                    self.$setColumnData(column, arr);
                }
            });
        }
        else {
            var columns = this.columns;
            var _loop_1 = function (i) {
                var column_1 = columns[i];
                Object.defineProperty(this_1, column_1, {
                    get: function () {
                        return self.$getColumnData(column_1);
                    },
                    set: function (arr) {
                        self.$setColumnData(column_1, arr);
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < columns.length; i++) {
                _loop_1(i);
            }
        }
    };
    /**
     * Returns the column data from the DataFrame by column name.
     * @param column column name to get the column data
     * @param returnSeries Whether to return the data in series format or not. Defaults to true
     */
    DataFrame.prototype.$getColumnData = function (column, returnSeries) {
        if (returnSeries === void 0) { returnSeries = true; }
        var columnIndex = this.columns.indexOf(column);
        if (columnIndex == -1) {
            errors_1.default.throwColumnNotFoundError(this);
        }
        var dtypes = [this.$dtypes[columnIndex]];
        var index = __spreadArray([], this.$index, true);
        var columns = [column];
        var config = __assign({}, this.$config);
        if (this.$config.isLowMemoryMode) {
            var data = [];
            for (var i = 0; i < this.values.length; i++) {
                var row = this.values[i];
                data.push(row[columnIndex]);
            }
            if (returnSeries) {
                return new series_1.default(data, {
                    dtypes: dtypes,
                    index: index,
                    columns: columns,
                    config: config
                });
            }
            else {
                return data;
            }
        }
        else {
            var data = this.$dataIncolumnFormat[columnIndex];
            if (returnSeries) {
                return new series_1.default(data, {
                    dtypes: dtypes,
                    index: index,
                    columns: columns,
                    config: config
                });
            }
            else {
                return data;
            }
        }
    };
    /**
     * Updates the internal column data via column name.
     * @param column The name of the column to update.
     * @param arr The new column data
     */
    DataFrame.prototype.$setColumnData = function (column, arr) {
        var columnIndex = this.$columns.indexOf(column);
        if (columnIndex == -1) {
            throw new Error("ParamError: column " + column + " not found in " + this.$columns + ". If you need to add a new column, use the df.addColumn method. ");
        }
        var colunmValuesToAdd;
        if (arr instanceof series_1.default) {
            colunmValuesToAdd = arr.values;
        }
        else if (Array.isArray(arr)) {
            colunmValuesToAdd = arr;
        }
        else {
            throw new Error("ParamError: specified value not supported. It must either be an Array or a Series of the same length");
        }
        if (colunmValuesToAdd.length !== this.shape[0]) {
            errors_1.default.throwColumnLengthError(this, colunmValuesToAdd.length);
        }
        if (this.$config.isLowMemoryMode) {
            //Update row ($data) array
            for (var i = 0; i < this.$data.length; i++) {
                this.$data[i][columnIndex] = colunmValuesToAdd[i];
            }
            //Update the dtypes
            this.$dtypes[columnIndex] = utils.inferDtype(colunmValuesToAdd)[0];
        }
        else {
            //Update row ($data) array
            for (var i = 0; i < this.values.length; i++) {
                this.$data[i][columnIndex] = colunmValuesToAdd[i];
            }
            //Update column ($dataIncolumnFormat) array since it's available in object
            this.$dataIncolumnFormat[columnIndex] = arr;
            //Update the dtypes
            this.$dtypes[columnIndex] = utils.inferDtype(colunmValuesToAdd)[0];
        }
    };
    /**
     * Return data with missing values removed from a specified axis
     * @param axis 0 or 1. If 0, column-wise, if 1, row-wise
    */
    DataFrame.prototype.$getDataByAxisWithMissingValuesRemoved = function (axis) {
        var oldValues = this.$getDataArraysByAxis(axis);
        var cleanValues = [];
        for (var i = 0; i < oldValues.length; i++) {
            var values = oldValues[i];
            cleanValues.push(utils.removeMissingValuesFromArray(values));
        }
        return cleanValues;
    };
    /**
     * Return data aligned to the specified axis. Transposes the array if needed.
     * @param axis 0 or 1. If 0, column-wise, if 1, row-wise
    */
    DataFrame.prototype.$getDataArraysByAxis = function (axis) {
        if (axis === 1) {
            return this.values;
        }
        else {
            var dfValues = void 0;
            if (this.config.isLowMemoryMode) {
                dfValues = utils.transposeArray(this.values);
            }
            else {
                dfValues = this.$dataIncolumnFormat;
            }
            return dfValues;
        }
    };
    /*
    * checks if DataFrame is compactible for arithmetic operation
    * compatible Dataframe must have only numerical dtypes
    **/
    DataFrame.prototype.$frameIsNotCompactibleForArithmeticOperation = function () {
        var dtypes = this.dtypes;
        var str = function (element) { return element == "string"; };
        return dtypes.some(str);
    };
    /**
     * Return Tensors in the right axis for math operations.
     * @param other DataFrame or Series or number or array
     * @param axis 0 or 1. If 0, column-wise, if 1, row-wise
     * */
    DataFrame.prototype.$getTensorsForArithmeticOperationByAxis = function (other, axis) {
        if (typeof other === "number") {
            return [this.tensor, tensorflowlib_1.default.scalar(other)];
        }
        else if (other instanceof DataFrame) {
            return [this.tensor, other.tensor];
        }
        else if (other instanceof series_1.default) {
            if (axis === 0) {
                return [this.tensor, tensorflowlib_1.default.tensor2d(other.values, [other.shape[0], 1])];
            }
            else {
                return [this.tensor, tensorflowlib_1.default.tensor2d(other.values, [other.shape[0], 1]).transpose()];
            }
        }
        else if (Array.isArray(other)) {
            if (axis === 0) {
                return [this.tensor, tensorflowlib_1.default.tensor2d(other, [other.length, 1])];
            }
            else {
                return [this.tensor, tensorflowlib_1.default.tensor2d(other, [other.length, 1]).transpose()];
            }
        }
        else {
            throw new Error("ParamError: Invalid type for other parameter. other must be one of Series, DataFrame or number.");
        }
    };
    /**
     * Returns the dtype for a given column name
     * @param column
     */
    DataFrame.prototype.$getColumnDtype = function (column) {
        var columnIndex = this.columns.indexOf(column);
        if (columnIndex === -1) {
            throw Error("ColumnNameError: Column \"" + column + "\" does not exist");
        }
        return this.dtypes[columnIndex];
    };
    DataFrame.prototype.$logicalOps = function (tensors, operation) {
        var newValues = [];
        switch (operation) {
            case 'gt':
                newValues = tensors[0].greater(tensors[1]).arraySync();
                break;
            case 'lt':
                newValues = tensors[0].less(tensors[1]).arraySync();
                break;
            case 'ge':
                newValues = tensors[0].greaterEqual(tensors[1]).arraySync();
                break;
            case 'le':
                newValues = tensors[0].lessEqual(tensors[1]).arraySync();
                break;
            case 'eq':
                newValues = tensors[0].equal(tensors[1]).arraySync();
                break;
            case 'ne':
                newValues = tensors[0].notEqual(tensors[1]).arraySync();
                break;
        }
        var newData = utils.mapIntegersToBooleans(newValues, 2);
        return new DataFrame(newData, {
            index: __spreadArray([], this.index, true),
            columns: __spreadArray([], this.columns, true),
            dtypes: __spreadArray([], this.dtypes, true),
            config: __assign({}, this.config)
        });
    };
    DataFrame.prototype.$MathOps = function (tensors, operation, inplace) {
        var tensorResult;
        switch (operation) {
            case 'add':
                tensorResult = tensors[0].add(tensors[1]);
                break;
            case 'sub':
                tensorResult = tensors[0].sub(tensors[1]);
                break;
            case 'pow':
                tensorResult = tensors[0].pow(tensors[1]);
                break;
            case 'div':
                tensorResult = tensors[0].div(tensors[1]);
                break;
            case 'divNoNan':
                tensorResult = tensors[0].divNoNan(tensors[1]);
                break;
            case 'mul':
                tensorResult = tensors[0].mul(tensors[1]);
                break;
            case 'mod':
                tensorResult = tensors[0].mod(tensors[1]);
                break;
        }
        if (inplace) {
            var newData = tensorResult === null || tensorResult === void 0 ? void 0 : tensorResult.arraySync();
            this.$setValues(newData);
        }
        else {
            return new DataFrame(tensorResult, {
                index: __spreadArray([], this.index, true),
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
        }
    };
    /**
    * Purely integer-location based indexing for selection by position.
    * ``.iloc`` is primarily integer position based (from ``0`` to
    * ``length-1`` of the axis), but may also be used with a boolean array.
    *
    * @param rows Array of row indexes
    * @param columns Array of column indexes
    *
    * Allowed inputs are in rows and columns params are:
    *
    * - An array of single integer, e.g. ``[5]``.
    * - A list or array of integers, e.g. ``[4, 3, 0]``.
    * - A slice array string with ints, e.g. ``["1:7"]``.
    * - A boolean array.
    * - A ``callable`` function with one argument (the calling Series or
    * DataFrame) and that returns valid output for indexing (one of the above).
    * This is useful in method chains, when you don't have a reference to the
    * calling object, but would like to base your selection on some value.
    *
    * ``.iloc`` will raise ``IndexError`` if a requested indexer is
    * out-of-bounds.
    *
    * @example
    * ```
    * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B'] })
    * const df2 = df.iloc({ rows: [1], columns: ["A"] })
    * ```
    */
    DataFrame.prototype.iloc = function (_a) {
        var rows = _a.rows, columns = _a.columns;
        return (0, indexing_1._iloc)({ ndFrame: this, rows: rows, columns: columns });
    };
    /**
     * Access a group of rows and columns by label(s) or a boolean array.
     * ``loc`` is primarily label based, but may also be used with a boolean array.
     *
     * @param rows Array of row indexes
     * @param columns Array of column indexes
     *
     * Allowed inputs are:
     *
     * - A single label, e.g. ``["5"]`` or ``['a']``, (note that ``5`` is interpreted as a
     *   *label* of the index, and **never** as an integer position along the index).
     *
     * - A list or array of labels, e.g. ``['a', 'b', 'c']``.
     *
     * - A slice object with labels, e.g. ``["a:f"]``. Note that start and the stop are included
     *
     * - A boolean array of the same length as the axis being sliced,
     * e.g. ``[True, False, True]``.
     *
     * - A ``callable`` function with one argument (the calling Series or
     * DataFrame) and that returns valid output for indexing (one of the above)
    * @example
    * ```
    * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B'] })
    * const df2 = df.loc({ rows: [1], columns: ["A"] })
    * ```
    */
    DataFrame.prototype.loc = function (_a) {
        var rows = _a.rows, columns = _a.columns;
        return (0, indexing_1._loc)({ ndFrame: this, rows: rows, columns: columns });
    };
    /**
     * Prints DataFrame to console as a formatted grid of row and columns.
    */
    DataFrame.prototype.toString = function () {
        var maxRow = this.config.getMaxRow;
        var maxColToDisplayInConsole = this.config.getTableMaxColInConsole;
        // let data;
        var dataArr = [];
        var colLen = this.columns.length;
        var header = [];
        if (colLen > maxColToDisplayInConsole) {
            //truncate displayed columns to fit in the console
            var firstFourcolNames = this.columns.slice(0, 4);
            var lastThreecolNames = this.columns.slice(colLen - 3);
            //join columns with truncate ellipse in the middle
            header = __spreadArray(__spreadArray(__spreadArray([""], firstFourcolNames, true), ["..."], false), lastThreecolNames, true);
            var subIdx = void 0;
            var firstHalfValues = void 0;
            var lastHalfValueS = void 0;
            if (this.values.length > maxRow) {
                //slice Object to show [max_rows]
                var dfSubset1 = this.iloc({
                    rows: ["0:" + maxRow],
                    columns: ["0:4"]
                });
                var dfSubset2 = this.iloc({
                    rows: ["0:" + maxRow],
                    columns: [colLen - 3 + ":"]
                });
                subIdx = this.index.slice(0, maxRow);
                firstHalfValues = dfSubset1.values;
                lastHalfValueS = dfSubset2.values;
            }
            else {
                var dfSubset1 = this.iloc({ columns: ["0:4"] });
                var dfSubset2 = this.iloc({ columns: [colLen - 3 + ":"] });
                subIdx = this.index.slice(0, maxRow);
                firstHalfValues = dfSubset1.values;
                lastHalfValueS = dfSubset2.values;
            }
            // merge subset 
            for (var i = 0; i < subIdx.length; i++) {
                var idx = subIdx[i];
                var row = __spreadArray(__spreadArray(__spreadArray([idx], firstHalfValues[i], true), ["..."], false), lastHalfValueS[i], true);
                dataArr.push(row);
            }
        }
        else {
            //display all columns
            header = __spreadArray([""], this.columns, true);
            var subIdx = void 0;
            var values = void 0;
            if (this.values.length > maxRow) {
                //slice Object to show a max of [max_rows]
                var data = this.iloc({ rows: ["0:" + maxRow] });
                subIdx = data.index;
                values = data.values;
            }
            else {
                values = this.values;
                subIdx = this.index;
            }
            // merge subset 
            for (var i = 0; i < subIdx.length; i++) {
                var idx = subIdx[i];
                var row = __spreadArray([idx], values[i], true);
                dataArr.push(row);
            }
        }
        var columnsConfig = {};
        columnsConfig[0] = { width: 10 }; //set column width for index column
        for (var index = 1; index < header.length; index++) {
            columnsConfig[index] = { width: 17, truncate: 16 };
        }
        var tableData = __spreadArray([header], dataArr, true); //Adds the column names to values before printing
        return (0, table_1.table)(tableData, __assign({ columns: columnsConfig }, this.config.getTableDisplayConfig));
    };
    /**
      * Returns the first n values in a DataFrame
      * @param rows The number of rows to return
      * @example
      * ```
      * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
      * const df2 = df.head(1)
      * ```
    */
    DataFrame.prototype.head = function (rows) {
        if (rows === void 0) { rows = 5; }
        if (rows <= 0) {
            throw new Error("ParamError: Number of rows cannot be less than 1");
        }
        if (this.shape[0] <= rows) {
            return this.copy();
        }
        if (this.shape[0] - rows < 0) {
            throw new Error("ParamError: Number of rows cannot be greater than available rows in data");
        }
        return this.iloc({ rows: ["0:" + rows] });
    };
    /**
      * Returns the last n values in a DataFrame
      * @param rows The number of rows to return
      * @example
      * ```
      * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
      * const df2 = df.tail(1)
      * ```
    */
    DataFrame.prototype.tail = function (rows) {
        if (rows === void 0) { rows = 5; }
        if (rows <= 0) {
            throw new Error("ParamError: Number of rows cannot be less than 1");
        }
        if (this.shape[0] <= rows) {
            return this.copy();
        }
        if (this.shape[0] - rows < 0) {
            throw new Error("ParamError: Number of rows cannot be greater than available rows in data");
        }
        rows = this.shape[0] - rows;
        return this.iloc({ rows: [rows + ":"] });
    };
    /**
     * Gets n number of random rows in a dataframe. Sample is reproducible if seed is provided.
     * @param num The number of rows to return. Default to 5.
     * @param options.seed An integer specifying the random seed that will be used to create the distribution.
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B'] })
     * const df2 = await df.sample(1)
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B'] })
     * const df2 = await df.sample(1, { seed: 1 })
     * ```
    */
    DataFrame.prototype.sample = function (num, options) {
        if (num === void 0) { num = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var seed, shuffledIndex, df;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed = __assign({ seed: 1 }, options).seed;
                        if (num > this.shape[0]) {
                            throw new Error("ParamError: Sample size cannot be bigger than number of rows");
                        }
                        if (num <= 0) {
                            throw new Error("ParamError: Sample size cannot be less than 1");
                        }
                        return [4 /*yield*/, tensorflowlib_1.default.data.array(this.index).shuffle(num, "" + seed).take(num).toArray()];
                    case 1:
                        shuffledIndex = _a.sent();
                        df = this.iloc({ rows: shuffledIndex });
                        return [2 /*return*/, df];
                }
            });
        });
    };
    DataFrame.prototype.add = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: add operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$MathOps(tensors, "add", inplace);
    };
    DataFrame.prototype.sub = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: sub operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$MathOps(tensors, "sub", inplace);
    };
    DataFrame.prototype.mul = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: mul operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$MathOps(tensors, "mul", inplace);
    };
    DataFrame.prototype.div = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: div operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$MathOps(tensors, "div", inplace);
    };
    DataFrame.prototype.divNoNan = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: div operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$MathOps(tensors, "divNoNan", inplace);
    };
    DataFrame.prototype.pow = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: pow operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$MathOps(tensors, "pow", inplace);
    };
    DataFrame.prototype.mod = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: mod operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$MathOps(tensors, "mod", inplace);
    };
    /**
     * Return mean of DataFrame across specified axis.
     * @param options.axis 0 or 1. If 0, compute the mean column-wise, if 1, row-wise. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B'] })
     * df.mean().print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B'] })
     * df.mean({ axis: 0 }).print()
     * ```
    */
    DataFrame.prototype.mean = function (options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: mean operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newData = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var resultArr = newData.map(function (arr) { return arr.reduce(function (a, b) { return a + b; }, 0) / arr.length; });
        if (axis === 0) {
            return new series_1.default(resultArr, { index: this.columns });
        }
        else {
            return new series_1.default(resultArr, { index: this.index });
        }
    };
    /**
     * Return median of DataFrame across specified axis.
     * @param options.axis 0 or 1. If 0, compute the median column-wise, if 1, row-wise. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2, 4], [3, 4, 5], [6, 7, 8]], { columns: ['A', 'B', 'C'] });
     * df.median().print()
     * ```
    */
    DataFrame.prototype.median = function (options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: median operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newData = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var resultArr = newData.map(function (arr) { return (0, mathjs_1.median)(arr); });
        if (axis === 0) {
            return new series_1.default(resultArr, { index: this.columns });
        }
        else {
            return new series_1.default(resultArr, { index: this.index });
        }
    };
    /**
     * Return mode of DataFrame across specified axis.
     * @param options.axis 0 or 1. If 0, compute the mode column-wise, if 1, row-wise. Defaults to 1
     * @param options.keep If there are more than one modes, returns the mode at position [keep]. Defaults to 0
     * @example
     * ```
     * const df = new DataFrame([[1, 2, 4], [3, 4, 5], [6, 7, 8]], { columns: ['A', 'B', 'C'] });
     * df.mode().print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2, 4], [3, 4, 5], [6, 7, 8]], { columns: ['A', 'B', 'C'] });
     * df.mode({ keep: 1 }).print()
     * ```
    */
    DataFrame.prototype.mode = function (options) {
        var _a = __assign({ axis: 1, keep: 0 }, options), axis = _a.axis, keep = _a.keep;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: mode operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newData = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var resultArr = newData.map(function (arr) {
            var tempMode = (0, mathjs_1.mode)(arr);
            if (tempMode.length === 1) {
                return tempMode[0];
            }
            else {
                return tempMode[keep];
            }
        });
        if (axis === 0) {
            return new series_1.default(resultArr, { index: this.columns });
        }
        else {
            return new series_1.default(resultArr, { index: this.index });
        }
    };
    /**
     * Return minimum of values in a DataFrame across specified axis.
     * @param options.axis 0 or 1. If 0, compute the minimum value column-wise, if 1, row-wise. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.min().print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.min({ axis: 0 }).print()
     * ```
    */
    DataFrame.prototype.min = function (options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: min operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newData = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var resultArr = newData.map(function (arr) {
            var smallestValue = arr[0];
            for (var i = 0; i < arr.length; i++) {
                smallestValue = smallestValue < arr[i] ? smallestValue : arr[i];
            }
            return smallestValue;
        });
        if (axis === 0) {
            return new series_1.default(resultArr, { index: this.columns });
        }
        else {
            return new series_1.default(resultArr, { index: this.index });
        }
    };
    /**
     * Return maximum of values in a DataFrame across specified axis.
     * @param options.axis 0 or 1. If 0, compute the maximum column-wise, if 1, row-wise. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.max().print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.max({ axis: 0 }).print()
     * ```
    */
    DataFrame.prototype.max = function (options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: max operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newData = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var resultArr = newData.map(function (arr) {
            var biggestValue = arr[0];
            for (var i = 0; i < arr.length; i++) {
                biggestValue = biggestValue > arr[i] ? biggestValue : arr[i];
            }
            return biggestValue;
        });
        if (axis === 0) {
            return new series_1.default(resultArr, { index: this.columns });
        }
        else {
            return new series_1.default(resultArr, { index: this.index });
        }
    };
    /**
     * Return standard deviation of values in a DataFrame across specified axis.
     * @param options.axis 0 or 1. If 0, compute the standard deviation column-wise, if 1, row-wise. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.std().print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.std({ axis: 0 }).print()
     * ```
    */
    DataFrame.prototype.std = function (options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: std operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newData = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var resultArr = newData.map(function (arr) { return (0, mathjs_1.std)(arr); });
        if (axis === 0) {
            return new series_1.default(resultArr, { index: this.columns });
        }
        else {
            return new series_1.default(resultArr, { index: this.index });
        }
    };
    /**
     * Return variance of values in a DataFrame across specified axis.
     * @param options.axis 0 or 1. If 0, compute the variance column-wise, if 1, add row-wise. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.var().print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.var({ axis: 0 }).print()
     * ```
    */
    DataFrame.prototype.var = function (options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: var operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newData = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var resultArr = newData.map(function (arr) { return (0, mathjs_1.variance)(arr); });
        if (axis === 0) {
            return new series_1.default(resultArr, { index: this.columns });
        }
        else {
            return new series_1.default(resultArr, { index: this.index });
        }
    };
    /**
     * Get Less than of dataframe and other, element-wise (binary operator lt).
     * @param other DataFrame, Series, Array or Scalar number to compare with
     * @param options.axis 0 or 1. If 0, add column-wise, if 1, add row-wise
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.lt(2).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.lt([2, 3], { axis: 0 }).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const sf = new Series([2, 3])
     * df.lt(sf, { axis: 1 }).print()
     * ```
    */
    DataFrame.prototype.lt = function (other, options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: lt operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$logicalOps(tensors, "lt");
    };
    /**
     * Returns "greater than" of dataframe and other.
     * @param other DataFrame, Series, Array or Scalar number to compare with
     * @param options.axis 0 or 1. If 0, add column-wise, if 1, add row-wise
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.gt(2).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.gt([2, 3], { axis: 0 }).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const sf = new Series([2, 3])
     * df.gt(sf, { axis: 1 }).print()
     * ```
    */
    DataFrame.prototype.gt = function (other, options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: gt operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$logicalOps(tensors, "gt");
    };
    /**
     * Returns "equals to" of dataframe and other.
     * @param other DataFrame, Series, Array or Scalar number to compare with
     * @param options.axis 0 or 1. If 0, add column-wise, if 1, add row-wise
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.eq(2).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.eq([2, 3], { axis: 0 }).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const sf = new Series([2, 3])
     * df.eq(sf, { axis: 1 }).print()
     * ```
    */
    DataFrame.prototype.eq = function (other, options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: eq operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$logicalOps(tensors, "eq");
    };
    /**
     * Returns "not equal to" of dataframe and other.
     * @param other DataFrame, Series, Array or Scalar number to compare with
     * @param options.axis 0 or 1. If 0, add column-wise, if 1, add row-wise
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.ne(2).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.ne([2, 3], { axis: 0 }).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const sf = new Series([2, 3])
     * df.ne(sf, { axis: 1 }).print()
     * ```
    */
    DataFrame.prototype.ne = function (other, options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: ne operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$logicalOps(tensors, "ne");
    };
    /**
    * Returns "less than or equal to" of dataframe and other.
    * @param other DataFrame, Series, Array or Scalar number to compare with
    * @param options.axis 0 or 1. If 0, add column-wise, if 1, add row-wise
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.le(2).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.le([2, 3], { axis: 0 }).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const sf = new Series([2, 3])
     * df.le(sf, { axis: 1 }).print()
     * ```
    */
    DataFrame.prototype.le = function (other, options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: le operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$logicalOps(tensors, "le");
    };
    /**
    * Returns "greater than or equal to" between dataframe and other.
    * @param other DataFrame, Series, Array or Scalar number to compare with
    * @param options.axis 0 or 1. If 0, add column-wise, if 1, add row-wise
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.ge(2).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.ge([2, 3], { axis: 0 }).print()
     * ```
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const sf = new Series([2, 3])
     * df.ge(sf, { axis: 1 }).print()
     * ```
    */
    DataFrame.prototype.ge = function (other, options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: ge operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
        return this.$logicalOps(tensors, "ge");
    };
    /**
     * Return number of non-null elements in a Series
     * @param options.axis 0 or 1. If 0, count column-wise, if 1, add row-wise. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.count().print()
     * ```
     *
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.count({ axis: 0 }).print()
     * ```
    */
    DataFrame.prototype.count = function (options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newData = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var resultArr = newData.map(function (arr) { return arr.length; });
        if (axis === 0) {
            return new series_1.default(resultArr, { index: this.columns });
        }
        else {
            return new series_1.default(resultArr, { index: this.index });
        }
    };
    /**
     * Return the sum of values across an axis.
     * @param options.axis 0 or 1. If 0, count column-wise, if 1, add row-wise. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.sum().print()
     * ```
     *
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.sum({ axis: 0 }).print()
     * ```
    */
    DataFrame.prototype.sum = function (options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var result = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var sumArr = result.map(function (innerArr) {
            return innerArr.reduce(function (a, b) { return Number(a) + Number(b); }, 0);
        });
        if (axis === 0) {
            return new series_1.default(sumArr, {
                index: __spreadArray([], this.columns, true)
            });
        }
        else {
            return new series_1.default(sumArr, {
                index: __spreadArray([], this.index, true)
            });
        }
    };
    DataFrame.prototype.pctChange = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: pctChange operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        if (other === 0) {
            return this;
        }
        if (typeof other === "number") {
            var origDF = this.copy();
            if (axis === 0) {
                origDF = origDF.T;
            }
            var originalTensor = origDF.tensor.clone();
            var unit = new Array(originalTensor.shape[originalTensor.rank - 1]).fill(NaN);
            var pctArray = originalTensor.arraySync();
            if (other > 0) {
                for (var i = 0; i < other; i++) {
                    pctArray.unshift(unit);
                    pctArray.pop();
                }
            }
            else if (other < 0) {
                for (var i = 0; i > other; i--) {
                    pctArray.push(unit);
                    pctArray.shift();
                }
            }
            var pctTensor = tensorflowlib_1.default.tensor2d(pctArray, originalTensor.shape);
            var pctDF = this.$MathOps([originalTensor, pctTensor], "divNoNan", inplace).sub(1);
            if (axis === 0) {
                return pctDF.T;
            }
            return pctDF;
        }
        if (other instanceof DataFrame || other instanceof series_1.default) {
            var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
            var pctDF = this.$MathOps(tensors, "divNoNan", inplace).sub(1);
            return pctDF;
        }
    };
    DataFrame.prototype.diff = function (other, options) {
        var _a = __assign({ inplace: false, axis: 1 }, options), inplace = _a.inplace, axis = _a.axis;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: diff operation is not supported for string dtypes");
        }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        if (other === 0) {
            return this;
        }
        if (typeof other === "number") {
            var origDF = this.copy();
            if (axis === 0) {
                origDF = origDF.T;
            }
            var originalTensor = origDF.tensor.clone();
            var unit = new Array(originalTensor.shape[originalTensor.rank - 1]).fill(NaN);
            var diffArray = originalTensor.arraySync();
            if (other > 0) {
                for (var i = 0; i < other; i++) {
                    diffArray.unshift(unit);
                    diffArray.pop();
                }
            }
            else if (other < 0) {
                for (var i = 0; i > other; i--) {
                    diffArray.push(unit);
                    diffArray.shift();
                }
            }
            var diffTensor = tensorflowlib_1.default.tensor2d(diffArray, originalTensor.shape);
            var diffDF = this.$MathOps([originalTensor, diffTensor], "sub", inplace);
            if (axis === 0) {
                return diffDF.T;
            }
            return diffDF;
        }
        if (other instanceof DataFrame || other instanceof series_1.default) {
            var tensors = this.$getTensorsForArithmeticOperationByAxis(other, axis);
            return this.$MathOps(tensors, "sub", inplace);
        }
    };
    DataFrame.prototype.abs = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var newData = this.values.map(function (arr) { return arr.map(function (val) { return Math.abs(val); }); });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return new DataFrame(newData, {
                index: __spreadArray([], this.index, true),
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
        }
    };
    DataFrame.prototype.round = function (dp, options) {
        if (dp === void 0) { dp = 1; }
        var inplace = __assign({ inplace: false }, options).inplace;
        if (this.$frameIsNotCompactibleForArithmeticOperation()) {
            throw Error("TypeError: round operation is not supported for string dtypes");
        }
        if (typeof dp !== "number") {
            throw Error("ParamError: dp must be a number");
        }
        var newData = utils.round(this.values, dp, false);
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return new DataFrame(newData, {
                index: __spreadArray([], this.index, true),
                columns: __spreadArray([], this.columns, true),
                config: __assign({}, this.config)
            });
        }
    };
    DataFrame.prototype.cumProd = function (options) {
        var _a = __assign({ axis: 1, inplace: false }, options), axis = _a.axis, inplace = _a.inplace;
        return this.cumOps("prod", axis, inplace);
    };
    DataFrame.prototype.cumSum = function (options) {
        var _a = __assign({ axis: 1, inplace: false }, options), axis = _a.axis, inplace = _a.inplace;
        return this.cumOps("sum", axis, inplace);
    };
    DataFrame.prototype.cumMin = function (options) {
        var _a = __assign({ axis: 1, inplace: false }, options), axis = _a.axis, inplace = _a.inplace;
        return this.cumOps("min", axis, inplace);
    };
    DataFrame.prototype.cumMax = function (options) {
        var _a = __assign({ axis: 1, inplace: false }, options), axis = _a.axis, inplace = _a.inplace;
        return this.cumOps("max", axis, inplace);
    };
    DataFrame.prototype.cumOps = function (ops, axis, inplace) {
        if (this.dtypes.includes("string"))
            errors_1.default.throwStringDtypeOperationError(ops);
        var result = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var newData = result.map(function (sData) {
            var tempval = sData[0];
            var data = [tempval];
            for (var i = 1; i < sData.length; i++) {
                var currVal = sData[i];
                switch (ops) {
                    case "max":
                        if (currVal > tempval) {
                            data.push(currVal);
                            tempval = currVal;
                        }
                        else {
                            data.push(tempval);
                        }
                        break;
                    case "min":
                        if (currVal < tempval) {
                            data.push(currVal);
                            tempval = currVal;
                        }
                        else {
                            data.push(tempval);
                        }
                        break;
                    case "sum":
                        tempval = tempval + currVal;
                        data.push(tempval);
                        break;
                    case "prod":
                        tempval = tempval * currVal;
                        data.push(tempval);
                        break;
                }
            }
            return data;
        });
        if (axis === 0) {
            newData = utils.transposeArray(newData);
        }
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return new DataFrame(newData, {
                index: __spreadArray([], this.index, true),
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
        }
    };
    /**
     * Generate descriptive statistics for all numeric columns.
     * Descriptive statistics include those that summarize the central tendency,
     * dispersion and shape of a dataset’s distribution, excluding NaN values.
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.describe().print()
     * ```
     */
    DataFrame.prototype.describe = function () {
        var _this = this;
        var numericColumnNames = this.columns.filter(function (name) { return _this.$getColumnDtype(name) !== "string"; });
        var index = ["count", "mean", "std", "min", "median", "max", "variance"];
        var statsObject = {};
        for (var i = 0; i < numericColumnNames.length; i++) {
            var colName = numericColumnNames[i];
            var $count = this.$getColumnData(colName).count();
            var $mean = (0, mathjs_1.mean)(this.$getColumnData(colName, false));
            var $std = (0, mathjs_1.std)(this.$getColumnData(colName, false));
            var $min = this.$getColumnData(colName).min();
            var $median = (0, mathjs_1.median)(this.$getColumnData(colName, false));
            var $max = this.$getColumnData(colName).max();
            var $variance = (0, mathjs_1.variance)(this.$getColumnData(colName, false));
            var stats = [$count, $mean, $std, $min, $median, $max, $variance];
            statsObject[colName] = stats;
        }
        var df = new DataFrame(statsObject, { index: index });
        return df;
    };
    DataFrame.prototype.dropNa = function (options) {
        var _a = __assign({ axis: 1, inplace: false }, options), axis = _a.axis, inplace = _a.inplace;
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: Axis must be 0 or 1");
        }
        var newIndex = [];
        if (axis == 1) {
            var newData = [];
            var dfValues = this.values;
            for (var i = 0; i < dfValues.length; i++) {
                var values = dfValues[i];
                //@ts-ignore
                if (!values.includes(NaN) && !values.includes(undefined) && !values.includes(null)) {
                    newData.push(values);
                    newIndex.push(this.index[i]);
                }
            }
            if (inplace) {
                this.$setValues(newData, false);
                this.$setIndex(newIndex);
            }
            else {
                return new DataFrame(newData, {
                    index: newIndex,
                    columns: __spreadArray([], this.columns, true),
                    dtypes: __spreadArray([], this.dtypes, true),
                    config: __assign({}, this.config)
                });
            }
        }
        else {
            var newColumnNames = [];
            var newDtypes = [];
            var dfValues = [];
            if (this.config.isLowMemoryMode) {
                dfValues = utils.transposeArray(this.values);
            }
            else {
                dfValues = this.$dataIncolumnFormat;
            }
            var tempColArr = [];
            for (var i = 0; i < dfValues.length; i++) {
                var values = dfValues[i];
                if (!values.includes(NaN)) {
                    tempColArr.push(values);
                    newColumnNames.push(this.columns[i]);
                    newDtypes.push(this.dtypes[i]);
                }
            }
            var newData = utils.transposeArray(tempColArr);
            if (inplace) {
                this.$setValues(newData, false, false);
                this.$setColumnNames(newColumnNames);
                this.$setDtypes(newDtypes);
            }
            else {
                return new DataFrame(newData, {
                    index: __spreadArray([], this.index, true),
                    columns: newColumnNames,
                    dtypes: newDtypes,
                    config: __assign({}, this.config)
                });
            }
        }
    };
    DataFrame.prototype.addColumn = function (column, values, options) {
        var _a = __assign({ inplace: false, atIndex: this.columns.length }, options), inplace = _a.inplace, atIndex = _a.atIndex;
        if (typeof atIndex === "string") {
            if (!(this.columns.includes(atIndex))) {
                throw new Error(atIndex + " not a column");
            }
            atIndex = this.columns.indexOf(atIndex);
        }
        if (!column) {
            throw new Error("ParamError: column must be specified");
        }
        if (!values) {
            throw new Error("ParamError: values must be specified");
        }
        var columnIndex = this.$columns.indexOf(column);
        if (columnIndex === -1) {
            var colunmValuesToAdd = void 0;
            if (values instanceof series_1.default) {
                colunmValuesToAdd = values.values;
            }
            else if (Array.isArray(values)) {
                colunmValuesToAdd = values;
            }
            else {
                throw new Error("ParamError: specified value not supported. It must either be an Array or a Series of the same length");
            }
            if (colunmValuesToAdd.length !== this.shape[0]) {
                errors_1.default.throwColumnLengthError(this, colunmValuesToAdd.length);
            }
            var newData = [];
            var oldValues = this.$data;
            for (var i = 0; i < oldValues.length; i++) {
                var innerArr = __spreadArray([], oldValues[i], true);
                innerArr.splice(atIndex, 0, colunmValuesToAdd[i]);
                newData.push(innerArr);
            }
            if (inplace) {
                this.$setValues(newData, true, false);
                var columns = __spreadArray([], this.columns, true);
                columns.splice(atIndex, 0, column);
                this.$setColumnNames(columns);
                this.$setInternalColumnDataProperty(column);
            }
            else {
                var columns = __spreadArray([], this.columns, true);
                columns.splice(atIndex, 0, column);
                var df = new DataFrame(newData, {
                    index: __spreadArray([], this.index, true),
                    columns: columns,
                    dtypes: __spreadArray(__spreadArray([], this.dtypes, true), [utils.inferDtype(colunmValuesToAdd)[0]], false),
                    config: __assign({}, this.$config)
                });
                return df;
            }
        }
        else {
            this.$setColumnData(column, values);
        }
    };
    /**
     * Makes a deep copy of a DataFrame.
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const df2 = df.copy()
     * df2.print()
     * ```
     */
    DataFrame.prototype.copy = function () {
        var df = new DataFrame(__spreadArray([], this.$data, true), {
            columns: __spreadArray([], this.columns, true),
            index: __spreadArray([], this.index, true),
            dtypes: __spreadArray([], this.dtypes, true),
            config: __assign({}, this.$config)
        });
        return df;
    };
    /**
     * Return a boolean, same-sized object indicating where elements are empty (NaN, undefined, null).
     * NaN, undefined and null values gets mapped to true, and everything else gets mapped to false.
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.isNa().print()
     * ```
    */
    DataFrame.prototype.isNa = function () {
        var newData = [];
        for (var i = 0; i < this.values.length; i++) {
            var valueArr = this.values[i];
            var tempData = valueArr.map(function (value) {
                if (utils.isEmpty(value)) {
                    return true;
                }
                else {
                    return false;
                }
            });
            newData.push(tempData);
        }
        var df = new DataFrame(newData, {
            index: __spreadArray([], this.index, true),
            columns: __spreadArray([], this.columns, true),
            config: __assign({}, this.config)
        });
        return df;
    };
    DataFrame.prototype.fillNa = function (values, options) {
        var _this = this;
        var _a = __assign({ inplace: false }, options), columns = _a.columns, inplace = _a.inplace;
        if (!values && typeof values !== "boolean" && typeof values !== "number" && typeof values !== "string") {
            throw Error('ParamError: value must be specified');
        }
        if (Array.isArray(values)) {
            if (!Array.isArray(columns)) {
                throw Error('ParamError: value is an array, hence columns must also be an array of same length');
            }
            if (values.length !== columns.length) {
                throw Error('ParamError: specified column and values must have the same length');
            }
            columns.forEach(function (col) {
                if (!_this.columns.includes(col)) {
                    throw Error("ValueError: Specified column \"" + col + "\" must be one of " + _this.columns);
                }
            });
        }
        var newData = [];
        var oldValues = __spreadArray([], this.values, true);
        if (!columns) {
            var _loop_2 = function (i) {
                var valueArr = __spreadArray([], oldValues[i], true);
                var tempArr = valueArr.map(function (innerVal) {
                    if (utils.isEmpty(innerVal)) {
                        var replaceWith = Array.isArray(values) ? values[i] : values;
                        return replaceWith;
                    }
                    else {
                        return innerVal;
                    }
                });
                newData.push(tempArr);
            };
            //Fill all columns
            for (var i = 0; i < oldValues.length; i++) {
                _loop_2(i);
            }
        }
        else {
            //Fill specific columns
            var tempData = __spreadArray([], this.values, true);
            for (var i = 0; i < tempData.length; i++) {
                var valueArr = tempData[i];
                for (var i_1 = 0; i_1 < columns.length; i_1++) { //B
                    var columnIndex = this.columns.indexOf(columns[i_1]);
                    var replaceWith = Array.isArray(values) ? values[i_1] : values;
                    valueArr[columnIndex] = utils.isEmpty(valueArr[columnIndex]) ? replaceWith : valueArr[columnIndex];
                }
                newData.push(valueArr);
            }
        }
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            var df = new DataFrame(newData, {
                index: __spreadArray([], this.index, true),
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
            return df;
        }
    };
    DataFrame.prototype.drop = function (options) {
        var _a = __assign({ inplace: false }, options), columns = _a.columns, index = _a.index, inplace = _a.inplace;
        if (!columns && !index) {
            throw Error('ParamError: Must specify one of columns or index');
        }
        if (columns && index) {
            throw Error('ParamError: Can only specify one of columns or index');
        }
        if (columns) {
            var columnIndices = [];
            if (typeof columns === "string") {
                columnIndices.push(this.columns.indexOf(columns));
            }
            else if (Array.isArray(columns)) {
                for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                    var column = columns_1[_i];
                    if (this.columns.indexOf(column) === -1) {
                        throw Error("ParamError: specified column \"" + column + "\" not found in columns");
                    }
                    columnIndices.push(this.columns.indexOf(column));
                }
            }
            else {
                throw Error('ParamError: columns must be an array of column names or a string of column name');
            }
            var newRowData = [];
            var newColumnNames = [];
            var newDtypes = [];
            for (var i = 0; i < this.values.length; i++) {
                var tempInnerArr = [];
                var innerArr = this.values[i];
                for (var j = 0; j < innerArr.length; j++) {
                    if (!(columnIndices.includes(j))) {
                        tempInnerArr.push(innerArr[j]);
                    }
                }
                newRowData.push(tempInnerArr);
            }
            for (var i = 0; i < this.columns.length; i++) {
                var element = this.columns[i];
                if (!(columns.includes(element))) {
                    newColumnNames.push(element);
                    newDtypes.push(this.dtypes[i]);
                }
            }
            if (inplace) {
                this.$setValues(newRowData, true, false);
                this.$setColumnNames(newColumnNames);
            }
            else {
                var df = new DataFrame(newRowData, {
                    index: __spreadArray([], this.index, true),
                    columns: newColumnNames,
                    dtypes: newDtypes,
                    config: __assign({}, this.config)
                });
                return df;
            }
        }
        if (index) {
            var rowIndices = [];
            if (typeof index === "string" || typeof index === "number" || typeof index === "boolean") {
                rowIndices.push(this.index.indexOf(index));
            }
            else if (Array.isArray(index)) {
                for (var _b = 0, index_1 = index; _b < index_1.length; _b++) {
                    var indx = index_1[_b];
                    if (this.index.indexOf(indx) === -1) {
                        throw Error("ParamError: specified index \"" + indx + "\" not found in indices");
                    }
                    rowIndices.push(this.index.indexOf(indx));
                }
            }
            else {
                throw Error('ParamError: index must be an array of indices or a scalar index');
            }
            var newRowData = [];
            var newIndex = [];
            for (var i = 0; i < this.values.length; i++) {
                var innerArr = this.values[i];
                if (!(rowIndices.includes(i))) {
                    newRowData.push(innerArr);
                }
            }
            for (var i = 0; i < this.index.length; i++) {
                var indx = this.index[i];
                if (!(index.includes(indx))) {
                    newIndex.push(indx);
                }
            }
            if (inplace) {
                this.$setValues(newRowData, false);
                this.$setIndex(newIndex);
            }
            else {
                var df = new DataFrame(newRowData, {
                    index: newIndex,
                    columns: __spreadArray([], this.columns, true),
                    dtypes: __spreadArray([], this.dtypes, true),
                    config: __assign({}, this.config)
                });
                return df;
            }
        }
    };
    DataFrame.prototype.sortValues = function (column, options) {
        var _a = __assign({ ascending: true, inplace: false }, options), ascending = _a.ascending, inplace = _a.inplace;
        if (!column) {
            throw Error("ParamError: must specify a column to sort by");
        }
        if (this.columns.indexOf(column) === -1) {
            throw Error("ParamError: specified column \"" + column + "\" not found in columns");
        }
        var columnValues = this.$getColumnData(column, false);
        var index = __spreadArray([], this.index, true);
        var objToSort = columnValues.map(function (value, i) {
            return { index: index[i], value: value };
        });
        var sortedObjectArr = utils.sortObj(objToSort, ascending);
        var sortedIndex = sortedObjectArr.map(function (obj) { return obj.index; });
        var newDf = (0, indexing_1._loc)({ ndFrame: this, rows: sortedIndex });
        if (inplace) {
            this.$setValues(newDf.values);
            this.$setIndex(newDf.index);
        }
        else {
            return newDf;
        }
    };
    DataFrame.prototype.setIndex = function (options) {
        var _a = __assign({ drop: false, inplace: false }, options), index = _a.index, column = _a.column, drop = _a.drop, inplace = _a.inplace;
        if (!index && !column) {
            throw new Error("ParamError: must specify either index or column");
        }
        var newIndex = [];
        if (index) {
            if (!Array.isArray(index)) {
                throw Error("ParamError: index must be an array");
            }
            if (index.length !== this.values.length) {
                throw Error("ParamError: index must be the same length as the number of rows");
            }
            newIndex = index;
        }
        if (column) {
            if (this.columns.indexOf(column) === -1) {
                throw Error("ParamError: column not found in column names");
            }
            newIndex = this.$getColumnData(column, false);
        }
        if (drop) {
            var dfDropped = this.drop({ columns: [column] });
            var newData = dfDropped === null || dfDropped === void 0 ? void 0 : dfDropped.values;
            var newColumns = dfDropped === null || dfDropped === void 0 ? void 0 : dfDropped.columns;
            var newDtypes = dfDropped === null || dfDropped === void 0 ? void 0 : dfDropped.dtypes;
            if (inplace) {
                this.$setValues(newData, true, false);
                this.$setIndex(newIndex);
                this.$setColumnNames(newColumns);
            }
            else {
                var df = new DataFrame(newData, {
                    index: newIndex,
                    columns: newColumns,
                    dtypes: newDtypes,
                    config: __assign({}, this.config)
                });
                return df;
            }
        }
        else {
            if (inplace) {
                this.$setIndex(newIndex);
            }
            else {
                var df = new DataFrame(this.values, {
                    index: newIndex,
                    columns: __spreadArray([], this.columns, true),
                    dtypes: __spreadArray([], this.dtypes, true),
                    config: __assign({}, this.config)
                });
                return df;
            }
        }
    };
    DataFrame.prototype.resetIndex = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (inplace) {
            this.$resetIndex();
        }
        else {
            var df = new DataFrame(this.values, {
                index: this.index.map(function (_, i) { return i; }),
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
            return df;
        }
    };
    /**
     * Apply a function along an axis of the DataFrame. To apply a function element-wise, use `applyMap`.
     * Objects passed to the function are Series values whose
     * index is either the DataFrame’s index (axis=0) or the DataFrame’s columns (axis=1)
     * @param callable Function to apply to each column or row.
     * @param options.axis 0 or 1. If 0, apply "callable" column-wise, else apply row-wise
     *
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const df2 = df.apply(Math.sqrt, { axis: 0 })
     * df2.print()
     * ```
    */
    DataFrame.prototype.apply = function (callable, options) {
        var axis = __assign({ axis: 1 }, options).axis;
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: axis must be 0 or 1");
        }
        var valuesForFunc = this.$getDataByAxisWithMissingValuesRemoved(axis);
        var result = valuesForFunc.map(function (row) {
            return callable(row);
        });
        if (axis === 0) {
            if (utils.is1DArray(result)) {
                return new series_1.default(result, {
                    index: __spreadArray([], this.columns, true)
                });
            }
            else {
                return new DataFrame(result, {
                    index: __spreadArray([], this.columns, true),
                    columns: __spreadArray([], this.columns, true),
                    dtypes: __spreadArray([], this.dtypes, true),
                    config: __assign({}, this.config)
                });
            }
        }
        else {
            if (utils.is1DArray(result)) {
                return new series_1.default(result, {
                    index: __spreadArray([], this.index, true)
                });
            }
            else {
                return new DataFrame(result, {
                    index: __spreadArray([], this.index, true),
                    columns: __spreadArray([], this.columns, true),
                    dtypes: __spreadArray([], this.dtypes, true),
                    config: __assign({}, this.config)
                });
            }
        }
    };
    DataFrame.prototype.applyMap = function (callable, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var newData = this.values.map(function (row) {
            var tempData = row.map(function (val) {
                return callable(val);
            });
            return tempData;
        });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return new DataFrame(newData, {
                index: __spreadArray([], this.index, true),
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
        }
    };
    /**
     * Returns the specified column data as a Series object.
     * @param column The name of the column to return
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * const sf = df.column('A')
     * sf.print()
     * ```
     *
    */
    DataFrame.prototype.column = function (column) {
        return this.$getColumnData(column);
    };
    /**
     * Return a subset of the DataFrame based on the column dtypes.
     * @param include An array of dtypes or strings to be included.
     * @example
     * ```
     * const df = new DataFrame([[1, 2.1, "Dog"], [3, 4.3, "Cat"]], { columns: ['A', 'B', 'C']})
     * const df2 = df.selectDtypes(['float32'])
     * df2.print()
     * ```
     *
     * @example
     * ```
     * const df = new DataFrame([[1, 2.1, "Dog"], [3, 4.3, "Cat"]], { columns: ['A', 'B', 'C']})
     * const df2 = df.selectDtypes(['float32', 'int32'])
     * df2.print()
     * ```
     *
    */
    DataFrame.prototype.selectDtypes = function (include) {
        var supportedDtypes = ["float32", "int32", "string", "boolean", 'undefined'];
        if (Array.isArray(include) === false) {
            throw Error("ParamError: include must be an array");
        }
        include.forEach(function (dtype) {
            if (supportedDtypes.indexOf(dtype) === -1) {
                throw Error("ParamError: include must be an array of valid dtypes");
            }
        });
        var newColumnNames = [];
        for (var i = 0; i < this.dtypes.length; i++) {
            if (include.includes(this.dtypes[i])) {
                newColumnNames.push(this.columns[i]);
            }
        }
        return this.loc({ columns: newColumnNames });
    };
    DataFrame.prototype.transpose = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var newData = utils.transposeArray(this.values);
        var newColNames = __spreadArray([], this.index.map(function (i) { return i.toString(); }), true);
        if (inplace) {
            this.$setValues(newData, false, false);
            this.$setIndex(__spreadArray([], this.columns, true));
            this.$setColumnNames(newColNames);
        }
        else {
            return new DataFrame(newData, {
                index: __spreadArray([], this.columns, true),
                columns: newColNames,
                config: __assign({}, this.config)
            });
        }
    };
    Object.defineProperty(DataFrame.prototype, "T", {
        /**
         * Returns the Transpose of the DataFrame. Similar to `transpose`.
         * @example
         * ```
         * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
         * const df2 = df.T()
         * df2.print()
         * ```
        **/
        get: function () {
            var newData = utils.transposeArray(this.values);
            return new DataFrame(newData, {
                index: __spreadArray([], this.columns, true),
                columns: __spreadArray([], this.index.map(function (i) { return i.toString(); }), true),
                config: __assign({}, this.config)
            });
        },
        enumerable: false,
        configurable: true
    });
    DataFrame.prototype.replace = function (oldValue, newValue, options) {
        var _this = this;
        var _a = __assign({ inplace: false }, options), columns = _a.columns, inplace = _a.inplace;
        if (!oldValue && typeof oldValue !== 'boolean') {
            throw Error("Params Error: Must specify param 'oldValue' to replace");
        }
        if (!newValue && typeof newValue !== 'boolean') {
            throw Error("Params Error: Must specify param 'newValue' to replace with");
        }
        var newData = [];
        if (columns) {
            if (!Array.isArray(columns)) {
                throw Error("Params Error: column must be an array of column(s)");
            }
            var columnIndex_1 = [];
            columns.forEach(function (column) {
                var _indx = _this.columns.indexOf(column);
                if (_indx === -1) {
                    throw Error("Params Error: column not found in columns");
                }
                columnIndex_1.push(_indx);
            });
            newData = this.values.map(function (_a) {
                var row = _a.slice(0);
                for (var _i = 0, columnIndex_2 = columnIndex_1; _i < columnIndex_2.length; _i++) {
                    var colIndx = columnIndex_2[_i];
                    if (row[colIndx] === oldValue) {
                        row[colIndx] = newValue;
                    }
                }
                return row;
            });
        }
        else {
            newData = this.values.map(function (_a) {
                var row = _a.slice(0);
                return row.map((function (cell) {
                    if (cell === oldValue) {
                        return newValue;
                    }
                    else {
                        return cell;
                    }
                }));
            });
        }
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            return new DataFrame(newData, {
                index: __spreadArray([], this.index, true),
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
        }
    };
    DataFrame.prototype.asType = function (column, dtype, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var columnIndex = this.columns.indexOf(column);
        if (columnIndex === -1) {
            throw Error("Params Error: column not found in columns");
        }
        if (!(defaults_1.DATA_TYPES.includes(dtype))) {
            throw Error("dtype " + dtype + " not supported. dtype must be one of " + defaults_1.DATA_TYPES);
        }
        var data = this.values;
        var newData = data.map(function (row) {
            if (dtype === "float32") {
                row[columnIndex] = Number(row[columnIndex]);
                return row;
            }
            else if (dtype === "int32") {
                row[columnIndex] = parseInt(row[columnIndex]);
                return row;
            }
            else if (dtype === "string") {
                row[columnIndex] = row[columnIndex].toString();
                return row;
            }
            else if (dtype === "boolean") {
                row[columnIndex] = Boolean(row[columnIndex]);
                return row;
            }
        });
        if (inplace) {
            this.$setValues(newData);
        }
        else {
            var newDtypes = __spreadArray([], this.dtypes, true);
            newDtypes[columnIndex] = dtype;
            return new DataFrame(newData, {
                index: __spreadArray([], this.index, true),
                columns: __spreadArray([], this.columns, true),
                dtypes: newDtypes,
                config: __assign({}, this.config)
            });
        }
    };
    /**
     * Return the number of unique elements in a column, across the specified axis.
     * To get the values use `.unique()` instead.
     * @param axis The axis to count unique elements across. Defaults to 1
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4], [1, 2], [5, 6]], { columns: ['A', 'B'] })
     * df.nunique().print()
     * ```
     *
    */
    DataFrame.prototype.nUnique = function (axis) {
        if (axis === void 0) { axis = 1; }
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: axis must be 0 or 1");
        }
        var data = this.$getDataArraysByAxis(axis);
        var newData = data.map(function (row) { return new Set(row).size; });
        if (axis === 0) {
            return new series_1.default(newData, {
                index: __spreadArray([], this.columns, true),
                dtypes: ["int32"]
            });
        }
        else {
            return new series_1.default(newData, {
                index: __spreadArray([], this.index, true),
                dtypes: ["int32"]
            });
        }
    };
    DataFrame.prototype.rename = function (mapper, options) {
        var _a = __assign({ axis: 1, inplace: false }, options), axis = _a.axis, inplace = _a.inplace;
        if ([0, 1].indexOf(axis) === -1) {
            throw Error("ParamError: axis must be 0 or 1");
        }
        if (axis === 1) {
            var colsAdded_2 = [];
            var newColumns = this.columns.map(function (col) {
                if (mapper[col] !== undefined) {
                    var newCol = "" + mapper[col];
                    colsAdded_2.push(newCol);
                    return newCol;
                }
                else {
                    return col;
                }
            });
            if (inplace) {
                this.$setColumnNames(newColumns);
                for (var _i = 0, colsAdded_1 = colsAdded_2; _i < colsAdded_1.length; _i++) {
                    var col = colsAdded_1[_i];
                    this.$setInternalColumnDataProperty(col);
                }
            }
            else {
                return new DataFrame(__spreadArray([], this.values, true), {
                    index: __spreadArray([], this.index, true),
                    columns: newColumns,
                    dtypes: __spreadArray([], this.dtypes, true),
                    config: __assign({}, this.config)
                });
            }
        }
        else {
            var newIndex = this.index.map(function (col) {
                if (mapper[col] !== undefined) {
                    return mapper[col];
                }
                else {
                    return col;
                }
            });
            if (inplace) {
                this.$setIndex(newIndex);
            }
            else {
                return new DataFrame(__spreadArray([], this.values, true), {
                    index: newIndex,
                    columns: __spreadArray([], this.columns, true),
                    dtypes: __spreadArray([], this.dtypes, true),
                    config: __assign({}, this.config)
                });
            }
        }
    };
    DataFrame.prototype.sortIndex = function (options) {
        var _this = this;
        var _a = __assign({ ascending: true, inplace: false }, options), ascending = _a.ascending, inplace = _a.inplace;
        var indexPosition = utils.range(0, this.index.length - 1);
        var index = __spreadArray([], this.index, true);
        var objToSort = index.map(function (idx, i) {
            return { index: indexPosition[i], value: idx };
        });
        var sortedObjectArr = utils.sortObj(objToSort, ascending);
        var sortedIndex = sortedObjectArr.map(function (obj) { return obj.index; });
        var newData = sortedIndex.map(function (i) { return _this.values[i]; });
        sortedIndex = sortedIndex.map(function (i) { return index[i]; });
        if (inplace) {
            this.$setValues(newData);
            this.$setIndex(sortedIndex);
        }
        else {
            return new DataFrame(newData, {
                index: sortedIndex,
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
        }
    };
    DataFrame.prototype.append = function (newValues, index, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (!newValues) {
            throw Error("ParamError: newValues must be a Series, DataFrame or Array");
        }
        if (!index) {
            throw Error("ParamError: index must be specified");
        }
        var rowsToAdd = [];
        if (newValues instanceof series_1.default) {
            if (newValues.values.length !== this.shape[1]) {
                throw Error("ValueError: length of newValues must be the same as the number of columns.");
            }
            rowsToAdd = [newValues.values];
        }
        else if (newValues instanceof DataFrame) {
            if (newValues.shape[1] !== this.shape[1]) {
                throw Error("ValueError: length of newValues must be the same as the number of columns.");
            }
            rowsToAdd = newValues.values;
        }
        else if (Array.isArray(newValues)) {
            if (utils.is1DArray(newValues)) {
                rowsToAdd = [newValues];
            }
            else {
                rowsToAdd = newValues;
            }
            if (rowsToAdd[0].length !== this.shape[1]) {
                throw Error("ValueError: length of newValues must be the same as the number of columns.");
            }
        }
        else {
            throw Error("ValueError: newValues must be a Series, DataFrame or Array");
        }
        var indexInArrFormat = [];
        if (!Array.isArray(index)) {
            indexInArrFormat = [index];
        }
        else {
            indexInArrFormat = index;
        }
        if (rowsToAdd.length !== indexInArrFormat.length) {
            throw Error("ParamError: index must contain the same number of values as newValues");
        }
        var newData = __spreadArray([], this.values, true);
        var newIndex = __spreadArray([], this.index, true);
        rowsToAdd.forEach(function (row, i) {
            newData.push(row);
            newIndex.push(indexInArrFormat[i]);
        });
        if (inplace) {
            this.$setValues(newData);
            this.$setIndex(newIndex);
        }
        else {
            return new DataFrame(newData, {
                index: newIndex,
                columns: __spreadArray([], this.columns, true),
                dtypes: __spreadArray([], this.dtypes, true),
                config: __assign({}, this.config)
            });
        }
    };
    DataFrame.prototype.query = function (condition, options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        if (!condition) {
            throw new Error("ParamError: condition must be specified");
        }
        var result = (0, indexing_1._iloc)({
            ndFrame: this,
            rows: condition,
        });
        if (inplace) {
            this.$setValues(result.values, false, false);
            this.$setIndex(result.index);
        }
        else {
            return result;
        }
    };
    Object.defineProperty(DataFrame.prototype, "ctypes", {
        /**
         * Returns the data types for each column as a Series.
         * @example
         * ```
         * const df = new DataFrame([[1, 2.1, "Dog"], [3, 4.3, "Cat"]], { columns: ['A', 'B', 'C'] })
         * df.ctypes().print()
         * ```
         */
        get: function () {
            return new series_1.default(this.dtypes, { index: this.columns });
        },
        enumerable: false,
        configurable: true
    });
    DataFrame.prototype.getDummies = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var encodedDF = (0, dummy_encoder_1.default)(this, options);
        if (inplace) {
            this.$setValues(encodedDF.values, false, false);
            this.$setColumnNames(encodedDF.columns);
        }
        else {
            return encodedDF;
        }
    };
    /**
     * Groupby
     * @params col a list of column
     * @returns Groupby
     * @example
     * let data = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 20, 30, 40 ], [ 39, 89, 78 ] ];
     * let cols = [ "A", "B", "C" ];
     * let df = new dfd.DataFrame(data, { columns: cols });
     * let groupDf = df.groupby([ "A" ]);
     */
    DataFrame.prototype.groupby = function (col) {
        var columns = this.columns;
        var colIndex = col.map(function (val) { return columns.indexOf(val); });
        var colDtype = this.dtypes;
        return new groupby_1.default(col, this.values, columns, colDtype, colIndex).group();
    };
    /**
     * Access a single value for a row/column pair by integer position.
     * Similar to {@link iloc}, in that both provide integer-based lookups.
     * Use iat if you only need to get or set a single value in a DataFrame.
     * @param row Row index of the value to access.
     * @param column Column index of the value to access.
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.iat(0, 0) // 1
     * df.iat(0, 1) // 2
     * df.iat(1, 0) // 3
     * ```
    */
    DataFrame.prototype.iat = function (row, column) {
        if (typeof row === 'string' || typeof column === 'string') {
            throw new Error('ParamError: row and column index must be an integer. Use .at to get a row or column by label.');
        }
        return this.values[row][column];
    };
    /**
     * Access a single value for a row/column label pair.
     * Similar to {@link loc}, in that both provide label-based lookups.
     * Use at if you only need to get or set a single value in a DataFrame.
     * @param row Row index of the value to access.
     * @param column Column label of the value to access.
     * @example
     * ```
     * const df = new DataFrame([[1, 2], [3, 4]], { columns: ['A', 'B']})
     * df.at(0,'A') // 1
     * df.at(1, 'A') // 3
     * df.at(1, 'B') // 4
     * ```
    */
    DataFrame.prototype.at = function (row, column) {
        if (typeof column !== 'string') {
            throw new Error('ParamError: column index must be a string. Use .iat to get a row or column by index.');
        }
        return this.values[this.index.indexOf(row)][this.columns.indexOf(column)];
    };
    /**
     * Exposes functions for creating charts from a DataFrame.
     * Charts are created using the Plotly.js library, so all Plotly's configuration parameters are available.
     * @param divId name of the HTML Div to render the chart in.
    */
    DataFrame.prototype.plot = function (divId) {
        //TODO: Add support for check plot library to use. So we can support other plot library like d3, vega, etc
        if (utils.isBrowserEnv()) {
            var plt = new plotting_1.PlotlyLib(this, divId);
            return plt;
        }
        else {
            throw new Error("Not supported in NodeJS");
        }
    };
    return DataFrame;
}(generic_1.default));
exports.default = DataFrame;

}, function(modId) { var map = {"../transformers/encoders/dummy.encoder":1711103528402,"../shared/tensorflowlib":1711103528400,"../shared/defaults":1711103528397,"../aggregators/groupby":1711103528404,"../shared/errors":1711103528399,"./indexing":1711103528406,"../shared/utils":1711103528396,"./generic":1711103528395,"./series":1711103528401,"../../danfojs-base/plotting":1711103528407}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528404, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var frame_1 = __importDefault(require("../core/frame"));
var mathjs_1 = require("mathjs");
var concat_1 = __importDefault(require("../transformers/concat"));
var series_1 = __importDefault(require("../core/series"));
/**
 * The class performs all groupby operation on a dataframe
 * involving all aggregate funciton
 * @param {colDict} colDict Object of unique keys in the group by column
 * @param {keyCol} keyCol Array contains the column names
 * @param {data} Array the dataframe data
 * @param {columnName} Array of all column name in the dataframe.
 * @param {colDtype} Array columns dtype
 */
var Groupby = /** @class */ (function () {
    function Groupby(keyCol, data, columnName, colDtype, colIndex) {
        this.colDict = {};
        this.keyToValue = {};
        this.keyCol = keyCol;
        this.data = data;
        this.columnName = columnName;
        //this.dataTensors = {}; //store the tensor version of the groupby data
        this.colDtype = colDtype;
        this.colIndex = colIndex;
    }
    /**
     * Generate group object data needed for group operations
     * let data = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 20, 30, 40 ], [ 39, 89, 78 ] ];
     * let cols = [ "A", "B", "C" ];
     * let df = new dfd.DataFrame(data, { columns: cols });
     * let groupDf = df.groupby([ "A" ]);
     * The following internal object is generated and save to this.colDict
     * {
     *  '1': { A: [ 1 ], B: [ 2 ], C: [ 3 ] },
     *  '4': { A: [ 4 ], B: [ 5 ], C: [ 6 ] },
     *  '20': { A: [ 20 ], B: [ 30 ], C: [ 40 ] },
     *  '39': { A: [ 39 ], B: [ 89 ], C: [ 78 ] }
     * }
     * Since for groupby using more than one columns is index via '-'
     * e.g for df.groupby(['A','B'])
     * the result will look like this
     * {
     *  '1-2': {A: [ 1 ], B: [ 2 ], C: [ 3 ]},
     *  '4-5': {A: [ 4 ], B: [ 5 ], C: [ 6 ]}
     * }
     * but in doing analysis on a specific column like this
     * df.groupby(['A','B']).col(['C'])
     * will have the following set of internal result
     * {
     *  '1-2': { C: [ 3 ]},
     *  '4-5': {C: [ 6 ]}
     * }
     * In building our multindex type of DataFrame for this data,
     * we've somehow loose track of value for column A and B.
     * This could actually be generated by using split('-') on the object keys
     * e.g '1-2'.split('-') will give us the value for A and B.
     * But we might have weird case scenerio where A and B value has '-`
     * e.g
     * {
     *  '1--2-': { C: [ 3 ]},
     *  '4--5-': {C: [ 6 ]}
     * }
     * using `.split('-') might not work well
     * Hence we create a key-value `keyToValue` object to store index and their
     * associated value
     * NOTE: In the previous implementation we made use of Graph representation
     * for the group by data and Depth First search (DFS). But we decided to use key-value
     * object in javascript as an hashmap to reduce search time compared to using Grpah and DFS
     */
    Groupby.prototype.group = function () {
        var _a;
        var self = this;
        var keyToValue = {};
        var group = (_a = this.data) === null || _a === void 0 ? void 0 : _a.reduce(function (prev, current) {
            var indexes = [];
            for (var i in self.colIndex) {
                var index_1 = self.colIndex[i];
                indexes.push(current[index_1]);
            }
            var index = indexes.join('-');
            if (!keyToValue[index]) {
                keyToValue[index] = indexes;
            }
            if (prev[index]) {
                var data = prev[index];
                for (var i in self.columnName) {
                    var colName = self.columnName[i];
                    data[colName].push(current[i]);
                }
            }
            else {
                prev[index] = {};
                for (var i in self.columnName) {
                    var colName = self.columnName[i];
                    prev[index][colName] = [current[i]];
                }
            }
            return prev;
        }, {});
        this.colDict = group;
        this.keyToValue = keyToValue;
        return this;
    };
    /**
     * Generate new internal groupby data
     * group = df.groupby(['A', 'B']).col('C')
     * This filter the colDict property as generated by `.group()`
     * it filter each group to contain only column `C` in their internal object
     * e.g
     * {
     *  '1-2': {A: [ 1 ], B: [ 2 ], C: [ 3 ]},
     *  '4-5': {A: [ 4 ], B: [ 5 ], C: [ 6 ]}
     * }
     * to
     * {
     *  '1-2': { C: [ 3 ]},
     *  '4-5': {C: [ 6 ]}
     * }
     * @param colNames column names
     * @return Groupby
     */
    Groupby.prototype.col = function (colNames) {
        var _this = this;
        if (typeof colNames === "undefined") {
            colNames = this.columnName.filter(function (_, index) {
                return !_this.colIndex.includes(index);
            });
        }
        var self = this;
        colNames.forEach(function (val) {
            if (!self.columnName.includes(val))
                throw new Error("Column " + val + " does not exist in groups");
        });
        var colDict = __assign({}, this.colDict);
        for (var _i = 0, _a = Object.entries(colDict); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], values = _b[1];
            var c = {};
            var keyVal = __assign({}, values);
            for (var colKey in colNames) {
                var colName = colNames[colKey];
                c[colName] = keyVal[colName];
            }
            colDict[key] = c;
        }
        var gp = new Groupby(this.keyCol, null, this.columnName, this.colDtype, this.colIndex);
        gp.colDict = colDict;
        gp.groupColNames = colNames;
        gp.keyToValue = this.keyToValue;
        return gp;
    };
    /**
     * Perform all groupby arithmetic operations
     * In the previous implementation all groups data are
     * stord as DataFrame, which involve lot of memory usage
     * Hence each groups are just pure javascrit object
     * and all arithmetic operation is done directly on javascript
     * arrays.
     * e.g
     * using this internal data
     * {
     *  '1-2': {A: [ 1,3 ], B: [ 2,5 ], C: [ 3, 5 ]},
     *  '4-5': {A: [ 4,1 ], B: [ 5,0 ], C: [ 6, 12 ]}
     * }
     * 1) using groupby(['A', 'B']).arithmetic("mean")
     * result: * {
     *  '1-2': {A_mean: [ 2 ], B_mean: [ 3.5 ], C_mean: [ 4 ]},
     *  '4-5': {A_mean: [ 2.5 ], B: [ 2.5 ], C_mean: [ 9 ]}
     * }
     * 2) .arithmetic({
     *    A: 'mean',
     *    B: 'sum',
     *    C: 'min'
     * })
     * result:
     * {
     *  '1-2': {A_mean: [ 2 ], B_sum: [ 7 ], C_min: [ 3 ]},
     *  '4-5': {A_mean: [ 2.5 ], B_sum: [ 5 ], C_min: [ 6 ]}
     * }
     * 3) .arithmetic({
     *    A: 'mean',
     *    B: 'sum',
     *    C: ['min', 'max']
     * })
     * result:
     * {
     *  '1-2': {A_mean: [ 2 ], B_sum: [ 7 ], C_min: [ 3 ], C_max: [5]},
     *  '4-5': {A_mean: [ 2.5 ], B_sum: [ 5 ], C_min: [ 6 ], C_max: [12]}
     * }
     * @param operation
     */
    Groupby.prototype.arithemetic = function (operation) {
        var opsName = ["mean", "sum", "count", "mode", "std", "var", "cumsum", "cumprod",
            "cummax", "cummin", "median", "min", "max"];
        if (typeof operation === "string") {
            if (!opsName.includes(operation)) {
                throw new Error("group operation: " + operation + " is not valid");
            }
        }
        else {
            Object.keys(operation).forEach(function (key) {
                var ops = operation[key];
                if (Array.isArray(ops)) {
                    for (var _i = 0, ops_1 = ops; _i < ops_1.length; _i++) {
                        var op = ops_1[_i];
                        if (!opsName.includes(op)) {
                            throw new Error("group operation: " + op + " for column " + key + " is not valid");
                        }
                    }
                }
                else {
                    if (!opsName.includes(ops)) {
                        throw new Error("group operation: " + ops + " for column " + key + " is not valid");
                    }
                }
            });
        }
        var colDict = __assign({}, this.colDict);
        for (var _i = 0, _a = Object.entries(colDict); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], values = _b[1];
            var colVal = {};
            var keyVal = __assign({}, values);
            var groupColNames = this.groupColNames;
            for (var colKey = 0; colKey < groupColNames.length; colKey++) {
                var colName = groupColNames[colKey];
                var colIndex = this.columnName.indexOf(colName);
                var colDtype = this.colDtype[colIndex];
                var operationVal = (typeof operation === "string") ? operation : operation[colName];
                if (colDtype === "string" && operationVal !== "count")
                    throw new Error("Can't perform math operation on column " + colName);
                if (typeof operation === "string") {
                    var colName2 = colName + "_" + operation;
                    colVal[colName2] = this.groupMathLog(keyVal[colName], operation);
                }
                else {
                    if (Array.isArray(operation[colName])) {
                        for (var _c = 0, _d = operation[colName]; _c < _d.length; _c++) {
                            var ops = _d[_c];
                            var colName2 = colName + "_" + ops;
                            colVal[colName2] = this.groupMathLog(keyVal[colName], ops);
                        }
                    }
                    else {
                        var ops = operation[colName];
                        var colName2 = colName + "_" + ops;
                        colVal[colName2] = this.groupMathLog(keyVal[colName], ops);
                    }
                }
            }
            colDict[key] = colVal;
        }
        return colDict;
    };
    /**
     * Peform all arithmetic logic
     * @param colVal
     * @param ops
     */
    Groupby.prototype.groupMathLog = function (colVal, ops) {
        var data = [];
        switch (ops) {
            case "max":
                var max = colVal.reduce(function (prev, curr) {
                    if (prev > curr) {
                        return prev;
                    }
                    return curr;
                });
                data.push(max);
                break;
            case "min":
                var min = colVal.reduce(function (prev, curr) {
                    if (prev < curr) {
                        return prev;
                    }
                    return curr;
                });
                data.push(min);
                break;
            case "sum":
                var sum = colVal.reduce(function (prev, curr) {
                    return prev + curr;
                });
                data.push(sum);
                break;
            case "count":
                data.push(colVal.length);
                break;
            case "mean":
                var sumMean = colVal.reduce(function (prev, curr) {
                    return prev + curr;
                });
                data.push(sumMean / colVal.length);
                break;
            case "std":
                data.push((0, mathjs_1.std)(colVal));
                break;
            case "var":
                data.push((0, mathjs_1.variance)(colVal));
                break;
            case "median":
                data.push((0, mathjs_1.median)(colVal));
                break;
            case "mode":
                data.push((0, mathjs_1.mode)(colVal));
                break;
            case "cumsum":
                colVal.reduce(function (prev, curr) {
                    var sum = prev + curr;
                    data.push(sum);
                    return sum;
                }, 0);
                break;
            case "cummin":
                data = [colVal[0]];
                colVal.slice(1).reduce(function (prev, curr) {
                    if (prev < curr) {
                        data.push(prev);
                        return prev;
                    }
                    data.push(curr);
                    return curr;
                }, data[0]);
                break;
            case "cummax":
                data = [colVal[0]];
                colVal.slice(1).reduce(function (prev, curr) {
                    if (prev > curr) {
                        data.push(prev);
                        return prev;
                    }
                    data.push(curr);
                    return curr;
                }, data[0]);
                break;
            case "cumprod":
                colVal.reduce(function (prev, curr) {
                    var sum = prev * curr;
                    data.push(sum);
                    return sum;
                }, 1);
                break;
        }
        return data;
    };
    /**
     * Takes in internal groupby internal data and convert
     * them to a single data frame.
     * @param colDict
     */
    Groupby.prototype.toDataFrame = function (colDict) {
        var data = {};
        for (var _i = 0, _a = this.colKeyDict(colDict); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = colDict[key];
            var keyDict = {};
            var oneValue = Object.values(value)[0];
            var valueLen = oneValue.length;
            for (var key1 in this.keyCol) {
                var keyName = this.keyCol[key1];
                var keyValue = this.keyToValue[key][key1];
                keyDict[keyName] = Array(valueLen).fill(keyValue);
            }
            var combine = __assign(__assign({}, keyDict), value);
            if (Object.keys(data).length < 1) {
                data = combine;
            }
            else {
                for (var _b = 0, _c = Object.keys(data); _b < _c.length; _b++) {
                    var dataKey = _c[_b];
                    var dataValue = combine[dataKey];
                    data[dataKey] = __spreadArray(__spreadArray([], data[dataKey], true), dataValue, true);
                }
            }
        }
        return new frame_1.default(data);
    };
    Groupby.prototype.operations = function (ops) {
        if (!this.groupColNames) {
            var colGroup = this.col(undefined);
            var colDict_1 = colGroup.arithemetic(ops);
            var df_1 = colGroup.toDataFrame(colDict_1);
            return df_1;
        }
        var colDict = this.arithemetic(ops);
        var df = this.toDataFrame(colDict);
        return df;
    };
    /**
     * Obtain the count for each group
     * @returns DataFrame
     *
     */
    Groupby.prototype.count = function () {
        return this.operations("count");
    };
    /**
     * Obtain the sum of columns for each group
     * @returns DataFrame
     *
     */
    Groupby.prototype.sum = function () {
        return this.operations("sum");
    };
    /**
     * Obtain the standard deviation of columns for each group
     * @returns DataFrame
     */
    Groupby.prototype.std = function () {
        return this.operations("std");
    };
    /**
     * Obtain the variance of columns for each group
     * @returns DataFrame
     */
    Groupby.prototype.var = function () {
        return this.operations("var");
    };
    /**
     * Obtain the mean of columns for each group
     * @returns DataFrame
     */
    Groupby.prototype.mean = function () {
        return this.operations("mean");
    };
    /**
     * Obtain the cumsum of columns for each group
     * @returns DataFrame
     *
     */
    Groupby.prototype.cumSum = function () {
        return this.operations("cumsum");
    };
    /**
     * Obtain the cummax of columns for each group
     * @returns DataFrame
     */
    Groupby.prototype.cumMax = function () {
        return this.operations("cummax");
    };
    /**
     * Obtain the cumprod of columns for each group
     * @returns DataFrame
     */
    Groupby.prototype.cumProd = function () {
        return this.operations("cumprod");
    };
    /**
     * Obtain the cummin of columns for each group
     * @returns DataFrame
     */
    Groupby.prototype.cumMin = function () {
        return this.operations("cummin");
    };
    /**
     * Obtain the max value of columns for each group
     * @returns DataFrame
     *
     */
    Groupby.prototype.max = function () {
        return this.operations("max");
    };
    /**
     * Obtain the min of columns for each group
     * @returns DataFrame
     */
    Groupby.prototype.min = function () {
        return this.operations("min");
    };
    /**
     * Obtain a specific group
     * @param keys Array<string | number>
     * @returns DataFrame
     */
    Groupby.prototype.getGroup = function (keys) {
        var dictKey = keys.join("-");
        var colDict = {};
        colDict[dictKey] = __assign({}, this.colDict[dictKey]);
        return this.toDataFrame(colDict);
    };
    /**
     * Perform aggregation on all groups
     * @param ops
     * @returns DataFrame
     */
    Groupby.prototype.agg = function (ops) {
        var columns = Object.keys(ops);
        var col_gp = this.col(columns);
        var data = col_gp.arithemetic(ops);
        var df = col_gp.toDataFrame(data);
        return df;
    };
    /**
     * Apply custom aggregator function
     * to each group
     * @param callable
     * @returns DataFrame
     * @example
     * let grp = df.groupby(['A'])
     * grp.apply((x) => x.count())
     */
    Groupby.prototype.apply = function (callable) {
        var colDict = {};
        for (var _i = 0, _a = this.colKeyDict(this.colDict); _i < _a.length; _i++) {
            var key = _a[_i];
            var valDataframe = new frame_1.default(this.colDict[key]);
            colDict[key] = callable(valDataframe);
        }
        return this.concatGroups(colDict);
    };
    Groupby.prototype.concatGroups = function (colDict) {
        var data = [];
        for (var _i = 0, _a = Object.entries(colDict); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], values = _b[1];
            var copyDf = void 0;
            if (values instanceof frame_1.default) {
                copyDf = values.copy();
            }
            else {
                var columns = values.index;
                columns = columns.length > 1 ? columns : ['applyOps'];
                copyDf = new frame_1.default([values.values], { columns: columns });
            }
            var len = copyDf.shape[0];
            var key1 = void 0;
            for (key1 in this.keyCol) {
                var keyName = this.keyCol[key1];
                var keyValue = this.keyToValue[key][key1];
                var dfValue = Array(len).fill(keyValue);
                var atIndex = parseInt(key1);
                if (this.groupColNames) {
                    copyDf.addColumn(keyName, dfValue, { inplace: true, atIndex: atIndex });
                }
                else {
                    copyDf.addColumn(keyName + "_Group", dfValue, { inplace: true, atIndex: atIndex });
                }
            }
            data.push(copyDf);
        }
        return (0, concat_1.default)({ dfList: data, axis: 0 });
    };
    Object.defineProperty(Groupby.prototype, "ngroups", {
        /**
         * obtain the total number of groups
         * @returns number
         */
        get: function () {
            var keys = Object.keys(this.colDict);
            return keys.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Groupby.prototype, "groups", {
        /**
         * obtaind the internal group data
         * @returns  {[keys: string]: {}}
         */
        get: function () {
            return this.colDict;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Obtain the first row of each group
     * @returns DataFrame
     */
    Groupby.prototype.first = function () {
        return this.apply(function (x) {
            return x.head(1);
        });
    };
    /**
     * Obtain the last row of each group
     * @returns DataFrame
     */
    Groupby.prototype.last = function () {
        return this.apply(function (x) {
            return x.tail(1);
        });
    };
    /**
     * Obtains the dataframe se of each groups
     * @returns DataFrame
     */
    Groupby.prototype.size = function () {
        return this.apply(function (x) {
            return new series_1.default([x.shape[0]]);
        });
    };
    Groupby.prototype.colKeyDict = function (colDict) {
        var keyDict = {};
        for (var _i = 0, _a = Object.keys(colDict); _i < _a.length; _i++) {
            var key = _a[_i];
            var firstKey = key.split("-")[0];
            if (firstKey in keyDict) {
                keyDict[firstKey].push(key);
            }
            else {
                keyDict[firstKey] = [key];
            }
        }
        var keys = [];
        for (var _b = 0, _c = Object.keys(keyDict); _b < _c.length; _b++) {
            var key = _c[_b];
            keys.push.apply(keys, keyDict[key]);
        }
        return keys;
    };
    return Groupby;
}());
exports.default = Groupby;

}, function(modId) { var map = {"../core/frame":1711103528403,"../transformers/concat":1711103528405,"../core/series":1711103528401}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528405, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var series_1 = __importDefault(require("../core/series"));
var frame_1 = __importDefault(require("../core/frame"));
/**
 *
 * @param dfList Array<DataFrame | Series>
 * @param axis number
 * @returns DataFrame
 */
function processColumn(dfList, axis) {
    var allDf = {};
    var dublicateColumns = {};
    var maxLen = 0;
    for (var i = 0; i < dfList.length; i++) {
        var df = dfList[i];
        var columnData = void 0;
        if (df instanceof frame_1.default) {
            columnData = df.getColumnData;
        }
        else {
            columnData = [df.values];
        }
        var columns = df.columns;
        for (var j = 0; j < columns.length; j++) {
            var column = columns[j];
            var colData = columnData[j];
            if (colData.length > maxLen) {
                maxLen = colData.length;
            }
            if (!(column in allDf)) {
                allDf[column] = colData;
                dublicateColumns[column] = 0;
            }
            else {
                dublicateColumns[column] += 1;
                column += dublicateColumns[column];
                allDf[column] = colData;
            }
        }
    }
    Object.keys(allDf).forEach(function (value) {
        var _a;
        var colLength = allDf[value].length;
        if (colLength < maxLen) {
            var residualLen = maxLen - colLength;
            var nanList = new Array(residualLen).fill(NaN);
            (_a = allDf[value]).push.apply(_a, nanList);
        }
    });
    return new frame_1.default(allDf);
}
/**
 * Concat data along rows
 * @param dfList Array<DataFrame | Series>
 * @param axis  Array<DataFrame | Series>
 * @returns DataFrame
 */
function processRow(dfList, axis) {
    var allDf = {};
    var maxLen = 0;
    var _loop_1 = function (i) {
        var _a, _b;
        var df = dfList[i];
        var columns = df.columns;
        var columnData = void 0;
        if (df instanceof frame_1.default) {
            columnData = df.getColumnData;
        }
        else {
            columnData = [df.values];
        }
        if (i === 0) {
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j];
                var colData = columnData[j];
                allDf[column] = colData;
            }
        }
        else {
            var nonColumn = Object.keys(allDf).filter(function (key) {
                return !columns.includes(key);
            });
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j];
                var colData = columnData[j];
                if (Object.keys(allDf).includes(column)) {
                    (_a = allDf[column]).push.apply(_a, colData);
                }
                else {
                    var residualArray = new Array(maxLen).fill(NaN);
                    residualArray.push.apply(residualArray, colData);
                    allDf[column] = residualArray;
                }
            }
            if (nonColumn.length > 0) {
                var currentDfLen = columnData[0].length;
                for (var j = 0; j < nonColumn.length; j++) {
                    var column = nonColumn[j];
                    var residualArray = new Array(currentDfLen).fill(NaN);
                    (_b = allDf[column]).push.apply(_b, residualArray);
                }
            }
        }
        maxLen += columnData[0].length;
    };
    for (var i = 0; i < dfList.length; i++) {
        _loop_1(i);
    }
    if (Object.keys(allDf).length === 1) {
        return new series_1.default(Object.values(allDf)[0]);
    }
    return new frame_1.default(allDf);
}
/**
* Concatenate pandas objects along a particular axis.
* @param object
* dfList: Array of DataFrame or Series
* axis: axis of concatenation 1 or 0
* @returns {DataFrame}
* @example
* concat({dfList: [df1, df2, df3], axis: 1})
*/
function concat(_a) {
    var dfList = _a.dfList, axis = _a.axis;
    if (axis === 1) {
        return processColumn(dfList, axis);
    }
    return processRow(dfList, 0);
}
exports.default = concat;

}, function(modId) { var map = {"../core/series":1711103528401,"../core/frame":1711103528403}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528406, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._loc = exports._iloc = void 0;
var series_1 = __importDefault(require("./series"));
var utils_1 = __importDefault(require("../shared/utils"));
var frame_1 = __importDefault(require("./frame"));
var utils = new utils_1.default();
/**
* Internal function to slice a Series/DataFrame by index based labels
* @param Object
*/
function _iloc(_a) {
    var ndFrame = _a.ndFrame, rows = _a.rows, columns = _a.columns;
    var _rowIndexes;
    var _columnIndexes;
    var _data = ndFrame.values;
    var _index = ndFrame.index;
    if (rows instanceof series_1.default) {
        rows = rows.values;
    }
    if (rows !== undefined && !Array.isArray(rows)) {
        throw new Error("rows parameter must be an Array. For example: rows: [1,2] or rows: [\"0:10\"]");
    }
    if (columns !== undefined && !Array.isArray(columns)) {
        throw new Error("columns parameter must be an Array. For example: columns: [1,2] or columns: [\"0:10\"]");
    }
    if (!rows) {
        _rowIndexes = utils.range(0, ndFrame.shape[0] - 1);
    }
    else if (rows.length == 1 && typeof rows[0] == "string") {
        var rowSplit = rows[0].split(":");
        if (rowSplit.length != 2) {
            throw new Error("Invalid row split parameter: If using row split string, it must be of the form; rows: [\"start:end\"]");
        }
        if (isNaN(parseInt(rowSplit[0])) && rowSplit[0] != "") {
            throw new Error("Invalid row split parameter. Split parameter must be a number");
        }
        if (isNaN(parseInt(rowSplit[1])) && rowSplit[1] != "") {
            throw new Error("Invalid row split parameter. Split parameter must be a number");
        }
        var start = rowSplit[0] == "" ? 0 : parseInt(rowSplit[0]);
        var end = rowSplit[1] == "" ? ndFrame.shape[0] : parseInt(rowSplit[1]);
        if (start < 0) {
            throw new Error("row slice [start] index cannot be less than 0");
        }
        if (end > ndFrame.shape[0]) {
            throw new Error("row slice [end] index cannot be bigger than " + ndFrame.shape[0]);
        }
        _rowIndexes = utils.range(start, end - 1);
    }
    else {
        var _formatedRows = [];
        for (var i = 0; i < rows.length; i++) {
            var _indexToUse = rows[i];
            if (_indexToUse > ndFrame.shape[0]) {
                throw new Error("Invalid row parameter: Specified index " + _indexToUse + " cannot be bigger than index length " + ndFrame.shape[0]);
            }
            if (typeof _indexToUse !== "number" && typeof _indexToUse !== "boolean") {
                throw new Error("Invalid row parameter: row index " + _indexToUse + " must be a number or boolean");
            }
            if (typeof _indexToUse === "boolean" && _indexToUse === true) {
                _formatedRows.push(_index[i]);
            }
            if (typeof _indexToUse === "number") {
                _formatedRows.push(_indexToUse);
            }
        }
        _rowIndexes = _formatedRows;
    }
    if (!columns) {
        _columnIndexes = utils.range(0, ndFrame.shape[1] - 1);
    }
    else if (columns.length == 1 && typeof columns[0] == "string") {
        var columnSplit = columns[0].split(":");
        if (columnSplit.length != 2) {
            throw new Error("Invalid column split parameter: If using column split string, it must be of the form; columns: [\"start:end\"]");
        }
        if (isNaN(parseInt(columnSplit[0])) && columnSplit[0] != "") {
            throw new Error("Invalid column split parameter. Split parameter must be a number");
        }
        if (isNaN(parseInt(columnSplit[1])) && columnSplit[1] != "") {
            throw new Error("Invalid column split parameter. Split parameter must be a number");
        }
        var start = columnSplit[0] == "" ? 0 : parseInt(columnSplit[0]);
        var end = columnSplit[1] == "" ? ndFrame.shape[1] : parseInt(columnSplit[1]);
        if (start < 0) {
            throw new Error("column slice [start] index cannot be less than 0");
        }
        if (end > ndFrame.shape[1]) {
            throw new Error("column slice [end] index cannot be bigger than " + ndFrame.shape[1]);
        }
        _columnIndexes = utils.range(start, end - 1);
    }
    else {
        for (var i = 0; i < columns.length; i++) {
            var _indexToUse = columns[i];
            if (_indexToUse > ndFrame.shape[1]) {
                throw new Error("Invalid column parameter: Specified index " + _indexToUse + " cannot be bigger than index length " + ndFrame.shape[1]);
            }
            if (typeof _indexToUse != "number") {
                throw new Error("Invalid column parameter: column index " + _indexToUse + " must be a number");
            }
        }
        _columnIndexes = columns;
    }
    if (ndFrame instanceof series_1.default) {
        var newData = [];
        var newIndex = [];
        for (var i = 0; i < _rowIndexes.length; i++) {
            var rowIndx = _rowIndexes[i];
            newData.push(_data[rowIndx]);
            newIndex.push(_index[rowIndx]);
        }
        var sf = new series_1.default(newData, {
            index: newIndex,
            columns: ndFrame.columns,
            dtypes: ndFrame.dtypes,
            config: ndFrame.config
        });
        return sf;
    }
    else {
        var newData = [];
        var newIndex = [];
        var newColumnNames = [];
        var newDtypes = [];
        for (var i = 0; i < _rowIndexes.length; i++) {
            var rowIndx = _rowIndexes[i];
            var rowData = _data[rowIndx];
            var newRowDataWithRequiredCols = [];
            for (var j = 0; j < _columnIndexes.length; j++) {
                var colIndx = _columnIndexes[j];
                newRowDataWithRequiredCols.push(rowData[colIndx]);
            }
            newData.push(newRowDataWithRequiredCols);
            newIndex.push(_index[rowIndx]);
        }
        for (var i = 0; i < _columnIndexes.length; i++) {
            var colIndx = _columnIndexes[i];
            newColumnNames.push(ndFrame.columns[colIndx]);
            newDtypes.push(ndFrame.dtypes[colIndx]);
        }
        var df = new frame_1.default(newData, {
            index: newIndex,
            columns: newColumnNames,
            dtypes: newDtypes,
            config: ndFrame.config
        });
        return df;
    }
}
exports._iloc = _iloc;
/**
* Internal function to slice a Series/DataFrame by specified string location based labels
* @param Object
*/
function _loc(_a) {
    var ndFrame = _a.ndFrame, rows = _a.rows, columns = _a.columns;
    var _rowIndexes;
    var _columnIndexes;
    var _data = ndFrame.values;
    var _index = ndFrame.index;
    if (rows instanceof series_1.default) {
        rows = rows.values;
    }
    if (rows !== undefined && !Array.isArray(rows)) {
        throw new Error("rows parameter must be an Array. For example: rows: [1,2] or rows: [\"0:10\"]");
    }
    if (columns !== undefined && !Array.isArray(columns)) {
        throw new Error("columns parameter must be an Array. For example: columns: [\"a\",\"b\"] or columns: [\"a:c\"]");
    }
    if (!rows) {
        _rowIndexes = _index.map(function (indexValue) { return _index.indexOf(indexValue); }); // Return all row index
    }
    else if (rows.length == 1 && typeof rows[0] == "string") {
        if (rows[0].indexOf(":") === -1) { // Input type ==> ["1"] or [`"1"`]
            var temp = void 0;
            if (rows[0].startsWith("\"") || rows[0].startsWith("'") || rows[0].startsWith("`")) {
                temp = _index.indexOf(rows[0].replace(/['"`]/g, ''));
            }
            else {
                temp = _index.indexOf(Number(rows[0]));
            }
            if (temp === -1) {
                throw new Error("IndexError: Specified index (" + rows[0] + ") not found");
            }
            _rowIndexes = [temp];
        }
        else {
            // Input type ==> ["1:2"] or [`"1":"4"`]
            var rowSplit = rows[0].split(":");
            if (rowSplit.length != 2) {
                throw new Error("Invalid row split parameter: If using row split string, it must be of the form; rows: [\"start:end\"]");
            }
            var start = void 0;
            var end = void 0;
            if (rowSplit[0] === "") {
                start = _index.indexOf(_index[0]);
            }
            else {
                if (rowSplit[0].startsWith("\"") || rowSplit[0].startsWith("'") || rowSplit[0].startsWith("`")) {
                    start = _index.indexOf(rowSplit[0].replace(/['"`]/g, ''));
                }
                else {
                    start = _index.indexOf(Number(rowSplit[0]));
                }
            }
            if (rowSplit[1] === "") {
                end = _index.indexOf(_index[_index.length - 1]) + 1;
            }
            else {
                if (rowSplit[0].startsWith("\"") || rowSplit[0].startsWith("'") || rowSplit[0].startsWith("`")) {
                    end = _index.indexOf(rowSplit[1].replace(/['"`]/g, ''));
                }
                else {
                    end = _index.indexOf(Number(rowSplit[1]));
                }
            }
            if (start === -1) {
                throw new Error("IndexError: Specified start index not found");
            }
            if (end === -1) {
                throw new Error("IndexError: Specified end index not found");
            }
            _rowIndexes = _index.slice(start, end).map(function (indexValue) { return _index.indexOf(indexValue); });
        }
    }
    else {
        // Input type ==> ["1", "2"] or [1, 5] or [true, false]
        var rowsIndexToUse = [];
        for (var i = 0; i < rows.length; i++) {
            var isBoolean = typeof rows[i] === "boolean";
            if (isBoolean && rows[i]) {
                rowsIndexToUse.push(_index.indexOf(_index[i]));
            }
            if (!isBoolean) {
                var rowIndex = _index.indexOf(rows[i]);
                if (rowIndex === -1) {
                    throw new Error("IndexError: Specified index (" + rows[i] + ") not found");
                }
                rowsIndexToUse.push(rowIndex);
            }
        }
        _rowIndexes = rowsIndexToUse;
    }
    var _columnNames = ndFrame.columns;
    if (!columns) {
        _columnIndexes = _columnNames.map(function (columnName) { return _columnNames.indexOf(columnName); }); // Return all column index
    }
    else if (columns.length == 1) {
        if (typeof columns[0] !== "string") {
            throw new Error("ColumnIndexError: columns parameter must be an array of a string name. For example: columns: [\"b\"]");
        }
        if (columns[0].indexOf(":") == -1) { // Input type ==> ["A"] 
            _columnIndexes = [_columnNames.indexOf(columns[0])];
        }
        else { // Input type ==> ["a:b"] or [`"col1":"col5"`]
            var columnSplit = columns[0].split(":");
            if (columnSplit.length != 2) {
                throw new Error("ColumnIndexError: Invalid row split parameter. If using row split string, it must be of the form; rows: [\"start:end\"]");
            }
            var start = columnSplit[0] == "" ? _columnNames.indexOf(_columnNames[0]) : _columnNames.indexOf(columnSplit[0]);
            var end = columnSplit[1] == "" ? _columnNames.indexOf(_columnNames[_columnNames.length - 1]) : _columnNames.indexOf(columnSplit[1]);
            if (start === -1) {
                throw new Error("ColumnIndexError: Specified start index not found");
            }
            if (end === -1) {
                throw new Error("ColumnIndexError: Specified end index not found");
            }
            _columnIndexes = _columnNames.slice(start, end + 1).map(function (columnName) { return _columnNames.indexOf(columnName); });
            _columnIndexes.pop(); //Remove the last element
        }
    }
    else { // Input type ==> ["A", "B"] or ["col1", "col2"]
        for (var i = 0; i < columns.length; i++) {
            if (_columnNames.indexOf(columns[i]) === -1) {
                throw new Error("ColumnIndexError: Specified column (" + columns[i] + ") not found");
            }
        }
        _columnIndexes = columns.map(function (columnName) { return _columnNames.indexOf(columnName); });
    }
    if (ndFrame instanceof series_1.default) {
        var newData = [];
        var newIndex = [];
        for (var i = 0; i < _rowIndexes.length; i++) {
            var rowIndx = _rowIndexes[i];
            newData.push(_data[rowIndx]);
            newIndex.push(_index[rowIndx]);
        }
        var sf = new series_1.default(newData, {
            index: newIndex,
            columns: ndFrame.columns,
            dtypes: ndFrame.dtypes,
            config: ndFrame.config
        });
        return sf;
    }
    else {
        var newData = [];
        var newIndex = [];
        var newColumnNames = [];
        var newDtypes = [];
        for (var i = 0; i < _rowIndexes.length; i++) {
            var rowIndx = _rowIndexes[i];
            var rowData = _data[rowIndx];
            var newRowDataWithRequiredCols = [];
            for (var j = 0; j < _columnIndexes.length; j++) {
                var colIndx = _columnIndexes[j];
                newRowDataWithRequiredCols.push(rowData[colIndx]);
            }
            newData.push(newRowDataWithRequiredCols);
            newIndex.push(_index[rowIndx]);
        }
        for (var i = 0; i < _columnIndexes.length; i++) {
            var colIndx = _columnIndexes[i];
            newColumnNames.push(ndFrame.columns[colIndx]);
            newDtypes.push(ndFrame.dtypes[colIndx]);
        }
        var df = new frame_1.default(newData, {
            index: newIndex,
            columns: newColumnNames,
            dtypes: newDtypes,
            config: ndFrame.config
        });
        return df;
    }
}
exports._loc = _loc;

}, function(modId) { var map = {"./series":1711103528401,"../shared/utils":1711103528396,"./frame":1711103528403}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528407, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotlyLib = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var index_1 = require("./plotly/index");
var Plotly;
if (typeof window !== "undefined") {
    //check if in browser environment and require "plotly.js-dist-min" module
    Plotly = require("plotly.js-dist-min");
}
var PlotlyLib = /** @class */ (function () {
    function PlotlyLib(ndframe, divId) {
        this.ndframe = ndframe;
        this.divId = divId;
    }
    PlotlyLib.prototype.getPlotConfig = function (plotConfig) {
        var _plotConfig = {
            config: plotConfig && plotConfig.config ? plotConfig.config : {},
            layout: plotConfig && plotConfig.layout ? plotConfig.layout : {}
        };
        return _plotConfig;
    };
    /**
     * Plot Series or DataFrame as lines.
     * Uses Plotly library as backend, so supports Plotly's configuration parameters
     * @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
    */
    PlotlyLib.prototype.line = function (plotConfig) {
        var _plotConfig = this.getPlotConfig(plotConfig);
        (0, index_1.linePlot)(this.ndframe, this.divId, _plotConfig, Plotly);
    };
    /**
     * Plot Series or DataFrame as bars.
     * Uses Plotly library as backend, so supports Plotly's configuration parameters
     * @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
    */
    PlotlyLib.prototype.bar = function (plotConfig) {
        var _plotConfig = this.getPlotConfig(plotConfig);
        (0, index_1.barPlot)(this.ndframe, this.divId, _plotConfig, Plotly);
    };
    /**
     * Plot Series or DataFrame as scatter.
     * Uses Plotly library as backend, so supports Plotly's configuration parameters
     * @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
    */
    PlotlyLib.prototype.scatter = function (plotConfig) {
        var _plotConfig = this.getPlotConfig(plotConfig);
        (0, index_1.scatterPlot)(this.ndframe, this.divId, _plotConfig, Plotly);
    };
    /**
     * Plot Series or DataFrame as histogram.
     * Uses Plotly library as backend, so supports Plotly's configuration parameters
     * @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
    */
    PlotlyLib.prototype.hist = function (plotConfig) {
        var _plotConfig = this.getPlotConfig(plotConfig);
        (0, index_1.histPlot)(this.ndframe, this.divId, _plotConfig, Plotly);
    };
    /**
     * Plot Series or DataFrame as pie.
     * Uses Plotly library as backend, so supports Plotly's configuration parameters
     * @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
    */
    PlotlyLib.prototype.pie = function (plotConfig) {
        var _plotConfig = this.getPlotConfig(plotConfig);
        (0, index_1.piePlot)(this.ndframe, this.divId, _plotConfig, Plotly);
    };
    /**
     * Plot Series or DataFrame as boxplot.
     * Uses Plotly library as backend, so supports Plotly's configuration parameters
     * @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
    */
    PlotlyLib.prototype.box = function (plotConfig) {
        var _plotConfig = this.getPlotConfig(plotConfig);
        (0, index_1.boxPlot)(this.ndframe, this.divId, _plotConfig, Plotly);
    };
    /**
     * Plot Series or DataFrame as violinplot.
     * Uses Plotly library as backend, so supports Plotly's configuration parameters
     * @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
     */
    PlotlyLib.prototype.violin = function (plotConfig) {
        var _plotConfig = this.getPlotConfig(plotConfig);
        (0, index_1.violinPlot)(this.ndframe, this.divId, _plotConfig, Plotly);
    };
    /**
     * Plot Series or DataFrame as table.
     * Uses Plotly library as backend, so supports Plotly's configuration parameters
     * @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
     */
    PlotlyLib.prototype.table = function (plotConfig) {
        var _plotConfig = this.getPlotConfig(plotConfig);
        (0, index_1.tablePlot)(this.ndframe, this.divId, _plotConfig, Plotly);
    };
    return PlotlyLib;
}());
exports.PlotlyLib = PlotlyLib;

}, function(modId) { var map = {"./plotly/index":1711103528408}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528408, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablePlot = exports.violinPlot = exports.boxPlot = exports.piePlot = exports.histPlot = exports.scatterPlot = exports.barPlot = exports.linePlot = void 0;
var line_1 = require("./line");
Object.defineProperty(exports, "linePlot", { enumerable: true, get: function () { return line_1.linePlot; } });
var bar_1 = require("./bar");
Object.defineProperty(exports, "barPlot", { enumerable: true, get: function () { return bar_1.barPlot; } });
var scatter_1 = require("./scatter");
Object.defineProperty(exports, "scatterPlot", { enumerable: true, get: function () { return scatter_1.scatterPlot; } });
var hist_1 = require("./hist");
Object.defineProperty(exports, "histPlot", { enumerable: true, get: function () { return hist_1.histPlot; } });
var pie_1 = require("./pie");
Object.defineProperty(exports, "piePlot", { enumerable: true, get: function () { return pie_1.piePlot; } });
var box_1 = require("./box");
Object.defineProperty(exports, "boxPlot", { enumerable: true, get: function () { return box_1.boxPlot; } });
var violin_1 = require("./violin");
Object.defineProperty(exports, "violinPlot", { enumerable: true, get: function () { return violin_1.violinPlot; } });
var table_1 = require("./table");
Object.defineProperty(exports, "tablePlot", { enumerable: true, get: function () { return table_1.tablePlot; } });

}, function(modId) { var map = {"./line":1711103528409,"./bar":1711103528411,"./scatter":1711103528412,"./hist":1711103528413,"./pie":1711103528414,"./box":1711103528415,"./violin":1711103528416,"./table":1711103528417}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528409, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linePlot = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = require("./utils");
/**
* Plot Series or DataFrame as lines.
* Uses the Plotly as backend, so supoorts Plotly's configuration parameters,
* Line plot supports different types of parameters, and the behavior will depend on data specified.
* The precedence of columns to plot is: (x and y => x => y => columns).
* @param ndframe Series or DataFrame to plot
* @param divId HTML div id to plot in.
* @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
* @param Plotly Plotly package passed from the class.
*/
var linePlot = function (ndframe, divId, plotConfig, Plotly) {
    var config = plotConfig["config"];
    var layout = plotConfig["layout"];
    if (ndframe instanceof series_1.default) {
        var y = ndframe.values;
        var trace = {
            x: ndframe.index,
            y: y,
            type: 'scatter',
            mode: 'lines',
        };
        Plotly.newPlot(divId, [trace], layout, config);
    }
    else {
        if (config["x"] && config["y"]) {
            //Plotting two columns against each other, when user specifies x and y column names in configuration
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["x"]);
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["y"]);
            var x = ndframe[config.x].values;
            var y = ndframe[config.y].values;
            var trace = { x: x, y: y };
            var _layout = __assign({ xaxis: {
                    title: config.x,
                }, yaxis: {
                    title: config.y,
                } }, layout);
            Plotly.newPlot(divId, [trace], _layout, config);
        }
        else if (config["x"] || config["y"]) {
            //plot single column specified in either of param [x | y] against index
            if (config["x"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.x);
                var x = ndframe[config.x].values;
                var y = ndframe.index;
                var trace = { x: x, y: y };
                var _layout = __assign({ xaxis: {
                        title: config.x,
                    }, yaxis: {
                        title: "Index",
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
            if (config["y"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.y);
                var x = ndframe.index;
                var y = ndframe[config.y].values;
                var trace = { x: x, y: y };
                var _layout = __assign({ xaxis: {
                        title: "Index",
                    }, yaxis: {
                        title: config.y,
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
        }
        else {
            //plot specified columns in config param against index
            // if columns is not specified in config, then plot all columns
            var cols = config["columns"] ? (0, utils_1.checkIfColsExist)(ndframe, config['columns']) : ndframe.columns;
            var traces_1 = [];
            cols.forEach(function (col) {
                var x = ndframe.index;
                var y = ndframe[col].values;
                var trace = { x: x, y: y, name: col };
                traces_1.push(trace);
            });
            Plotly.newPlot(divId, traces_1, layout, config);
        }
    }
};
exports.linePlot = linePlot;

}, function(modId) { var map = {"../../core/series":1711103528401,"./utils":1711103528410}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528410, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErrorOnWrongColName = exports.checkIfColsExist = void 0;
var checkIfColsExist = function (ndframe, cols) {
    cols.forEach(function (col) {
        if (!ndframe.columns.includes(col)) {
            throw Error("Column Error: " + col + " not found in columns. Columns should be one of [ " + ndframe.columns + " ]");
        }
    });
    return cols;
};
exports.checkIfColsExist = checkIfColsExist;
var throwErrorOnWrongColName = function (ndframe, colName) {
    if (!ndframe.columns.includes(colName)) {
        throw Error("ParamError: specified column " + colName + " not found in columns");
    }
};
exports.throwErrorOnWrongColName = throwErrorOnWrongColName;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528411, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.barPlot = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = require("./utils");
/**
* Plot Series or DataFrame as bar.
* Uses the Plotly as backend, so supoorts Plotly's configuration parameters,
* Line plot supports different types of parameters, and the behavior will depend on data specified.
* The precedence of columns to plot is: (x and y => x => y => columns).
* @param ndframe Series or DataFrame to plot
* @param divId HTML div id to plot in.
* @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
*/
var barPlot = function (ndframe, divId, plotConfig, Plotly) {
    var config = plotConfig["config"];
    var layout = plotConfig["layout"];
    if (ndframe instanceof series_1.default) {
        var trace = {
            x: ndframe.index,
            y: ndframe.values,
            type: 'bar',
        };
        Plotly.newPlot(divId, [trace], layout, config);
    }
    else {
        if (config["x"] && config["y"]) {
            //Plotting two columns against each other, when user specifies x and y column names in configuration
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["x"]);
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["y"]);
            var x = ndframe[config.x].values;
            var y = ndframe[config.y].values;
            var trace = {
                x: x,
                y: y,
                type: 'bar',
            };
            var _layout = __assign({ xaxis: {
                    title: config.x,
                }, yaxis: {
                    title: config.y,
                } }, layout);
            Plotly.newPlot(divId, [trace], _layout, config);
        }
        else if (config["x"] || config["y"]) {
            //plot single column specified in either of param [x | y] against index
            if (config["x"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.x);
                var x = ndframe[config.x].values;
                var y = ndframe.index;
                var trace = {
                    x: x,
                    y: y,
                    type: 'bar',
                };
                var _layout = __assign({ xaxis: {
                        title: config.x,
                    }, yaxis: {
                        title: "Index",
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
            if (config["y"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.y);
                var x = ndframe.index;
                var y = ndframe[config.y].values;
                var trace = {
                    x: x,
                    y: y,
                    type: 'bar',
                };
                var _layout = __assign({ xaxis: {
                        title: "Index",
                    }, yaxis: {
                        title: config.y,
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
        }
        else {
            //plot specified columns in config param against index
            // if columns is not specified in config, then plot all columns
            var cols = config["columns"] ? (0, utils_1.checkIfColsExist)(ndframe, config['columns']) : ndframe.columns;
            var traces_1 = [];
            cols.forEach(function (col) {
                var x = ndframe.index;
                var y = ndframe[col].values;
                var trace = { x: x, y: y, name: col, type: 'bar' };
                traces_1.push(trace);
            });
            Plotly.newPlot(divId, traces_1, layout, config);
        }
    }
};
exports.barPlot = barPlot;

}, function(modId) { var map = {"../../core/series":1711103528401,"./utils":1711103528410}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528412, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scatterPlot = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = require("./utils");
/**
* Plot Series or DataFrame as scatter points.
* Uses the Plotly as backend, so supoorts Plotly's configuration parameters,
* Line plot supports different types of parameters, and the behavior will depend on data specified.
* The precedence of columns to plot is: (x and y => x => y => columns).
* @param ndframe Series or DataFrame to plot
* @param divId HTML div id to plot in.
* @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
*/
var scatterPlot = function (ndframe, divId, plotConfig, Plotly) {
    var config = plotConfig["config"];
    var layout = plotConfig["layout"];
    if (ndframe instanceof series_1.default) {
        var y = ndframe.values;
        var trace = {
            x: ndframe.index,
            y: y,
            type: 'scatter',
            mode: 'markers',
        };
        Plotly.newPlot(divId, [trace], layout, config);
    }
    else {
        if (config["x"] && config["y"]) {
            //Plotting two columns against each other, when user specifies x and y column names in configuration
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["x"]);
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["y"]);
            var x = ndframe[config.x].values;
            var y = ndframe[config.y].values;
            var trace = {
                x: x,
                y: y,
                type: 'scatter',
                mode: 'markers',
            };
            var _layout = __assign({ xaxis: {
                    title: config.x,
                }, yaxis: {
                    title: config.y,
                } }, layout);
            Plotly.newPlot(divId, [trace], _layout, config);
        }
        else if (config["x"] || config["y"]) {
            //plot single column specified in either of param [x | y] against index
            if (config["x"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.x);
                var x = ndframe[config.x].values;
                var y = ndframe.index;
                var trace = {
                    x: x,
                    y: y,
                    type: 'scatter',
                    mode: 'markers',
                };
                var _layout = __assign({ xaxis: {
                        title: config.x,
                    }, yaxis: {
                        title: "Index",
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
            if (config["y"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.y);
                var x = ndframe.index;
                var y = ndframe[config.y].values;
                var trace = {
                    x: x,
                    y: y,
                    type: 'scatter',
                    mode: 'markers',
                };
                var _layout = __assign({ xaxis: {
                        title: "Index",
                    }, yaxis: {
                        title: config.y,
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
        }
        else {
            //plot specified columns in config param against index
            // if columns is not specified in config, then plot all columns
            var cols = config["columns"] ? (0, utils_1.checkIfColsExist)(ndframe, config['columns']) : ndframe.columns;
            var traces_1 = [];
            cols.forEach(function (col) {
                var y = ndframe.index;
                var x = ndframe[col].values;
                var trace = {
                    x: x,
                    y: y,
                    name: col,
                    type: 'scatter',
                    mode: 'markers',
                };
                traces_1.push(trace);
            });
            Plotly.newPlot(divId, traces_1, layout, config);
        }
    }
};
exports.scatterPlot = scatterPlot;

}, function(modId) { var map = {"../../core/series":1711103528401,"./utils":1711103528410}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528413, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.histPlot = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = require("./utils");
/**
* Plot Series or DataFrame as histogram.
* Uses the Plotly as backend, so supoorts Plotly's configuration parameters,
* Line plot supports different types of parameters, and the behavior will depend on data specified.
* The precedence of columns to plot is: (x and y => x => y => columns).
* @param ndframe Series or DataFrame to plot
* @param divId HTML div id to plot in.
* @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
*/
var histPlot = function (ndframe, divId, plotConfig, Plotly) {
    var config = plotConfig["config"];
    var layout = plotConfig["layout"];
    if (ndframe instanceof series_1.default) {
        var trace = {
            x: ndframe.values,
            type: 'histogram',
        };
        Plotly.newPlot(divId, [trace], layout, config);
    }
    else {
        if (config["x"] || config["y"]) {
            //plot single column specified in either of param [x | y] against index
            if (config["x"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.x);
                var x = ndframe[config.x].values;
                var trace = {
                    x: x,
                    type: 'histogram',
                };
                var _layout = __assign({ xaxis: {
                        title: config.x,
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
            if (config["y"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.y);
                var y = ndframe[config.y].values;
                var trace = {
                    y: y,
                    type: 'histogram',
                };
                var _layout = __assign({ yaxis: {
                        title: config.y,
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
        }
        else {
            //plot specified columns in config param against index
            // if columns is not specified in config, then plot all columns
            var cols = config["columns"] ? (0, utils_1.checkIfColsExist)(ndframe, config['columns']) : ndframe.columns;
            var traces_1 = [];
            cols.forEach(function (col) {
                var y = ndframe.index;
                var x = ndframe[col].values;
                var trace = { x: x, y: y, name: col, type: 'histogram' };
                traces_1.push(trace);
            });
            Plotly.newPlot(divId, traces_1, layout, config);
        }
    }
};
exports.histPlot = histPlot;

}, function(modId) { var map = {"../../core/series":1711103528401,"./utils":1711103528410}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528414, function(require, module, exports) {

// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.piePlot = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = require("./utils");
/**
* Plot Series or DataFrame as pie chart.
* Uses the Plotly as backend, so supoorts Plotly's configuration parameters,
* Line plot supports different types of parameters, and the behavior will depend on data specified.
* @param ndframe Series or DataFrame to plot
* @param divId HTML div id to plot in.
* @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
*/
var piePlot = function (ndframe, divId, plotConfig, Plotly) {
    var config = plotConfig["config"];
    var layout = plotConfig["layout"];
    if (ndframe instanceof series_1.default) {
        var trace = {
            values: ndframe.values,
            labels: config["labels"] || ndframe.index,
            type: 'pie',
            name: config.labels,
            hoverinfo: 'label+percent+name',
            automargin: true
        };
        Plotly.newPlot(divId, [trace], layout, config);
    }
    else {
        if (config["labels"]) {
            if (!ndframe.columns.includes(config['labels'])) {
                throw Error("Column Error: " + config['labels'] + " not found in columns. Param \"labels\" name must be one of [ " + ndframe.columns + "]");
            }
            if (config["values"]) {
                if (!ndframe.columns.includes(config['values'])) {
                    throw Error("Column Error: " + config['values'] + " not found in columns. Param \"values\" name must be one of [ " + ndframe.columns + "]");
                }
                var trace = {
                    values: ndframe[config['values']].values,
                    labels: ndframe[config["labels"]].values,
                    type: 'pie',
                    name: config.labels,
                    hoverinfo: 'label+percent+name',
                    automargin: true
                };
                Plotly.newPlot(divId, [trace], layout, config);
            }
            else {
                // if columns is not specified in config, then plot all columns
                var cols = config["columns"] ? (0, utils_1.checkIfColsExist)(ndframe, config['columns']) : ndframe.columns;
                if (config['rowPositions']) {
                    if (config['rowPositions'].length != cols.length) {
                        throw Error("length of rowPositions array must be equal to number of columns. Got " + config['rowPositions'].length + ", expected " + (cols.length - 1));
                    }
                }
                else {
                    var tempArr = [];
                    for (var i = 0; i < cols.length - 1; i++) {
                        tempArr.push(0);
                    }
                    config['rowPositions'] = tempArr;
                }
                if (config['columnPositions']) {
                    if (config['columnPositions'].length != cols.length) {
                        throw Error("length of columnPositions array must be equal to number of columns. Got " + config['columnPositions'].length + ", expected " + (cols.length - 1));
                    }
                }
                else {
                    var tempArr = [];
                    for (var i = 0; i < cols.length - 1; i++) {
                        tempArr.push(i);
                    }
                    config['columnPositions'] = tempArr;
                }
                var traces_1 = [];
                cols.forEach(function (col, i) {
                    var labels = ndframe[config["labels"]].values;
                    var values = ndframe[col].values;
                    var trace = {
                        labels: labels,
                        values: values,
                        name: col,
                        type: 'pie',
                        domain: {
                            row: config['rowPositions'][i],
                            column: config['columnPositions'][i]
                        },
                        hoverinfo: 'label+percent+name',
                        automargin: true,
                        textposition: 'outside'
                    };
                    traces_1.push(trace);
                });
                var _layout = __assign({}, layout);
                if (!config["grid"]) {
                    //set default grid
                    var size = Number((ndframe.shape[1] / 2).toFixed()) + 1;
                    _layout["grid"] = { rows: size, columns: size };
                }
                else {
                    _layout["grid"] = config["grid"];
                }
                Plotly.newPlot(divId, traces_1, _layout, config);
            }
        }
        else {
            throw new Error("Param Error: Please provide a column name for \"labels\" param");
        }
    }
};
exports.piePlot = piePlot;

}, function(modId) { var map = {"../../core/series":1711103528401,"./utils":1711103528410}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528415, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boxPlot = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = require("./utils");
/**
* Plot Series or DataFrame as box chart.
* Uses the Plotly as backend, so supoorts Plotly's configuration parameters,
* Line plot supports different types of parameters, and the behavior will depend on data specified.
* The precedence of columns to plot is: (x and y => x => y => columns).
* @param ndframe Series or DataFrame to plot
* @param divId HTML div id to plot in.
* @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
*/
var boxPlot = function (ndframe, divId, plotConfig, Plotly) {
    var config = plotConfig["config"];
    var layout = plotConfig["layout"];
    if (ndframe instanceof series_1.default) {
        var trace = {
            y: ndframe.values,
            type: 'box',
        };
        Plotly.newPlot(divId, [trace], layout, config);
    }
    else {
        if (config["x"] && config["y"]) {
            //Plotting two columns against each other, when user specifies x and y column names in configuration
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["x"]);
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["y"]);
            var x = ndframe[config.x].values;
            var y = ndframe[config.y].values;
            var trace = {
                x: x,
                y: y,
                type: 'box',
            };
            var _layout = __assign({ xaxis: {
                    title: config.x,
                }, yaxis: {
                    title: config.y,
                } }, layout);
            Plotly.newPlot(divId, [trace], _layout, config);
        }
        else if (config["x"] || config["y"]) {
            //plot single column specified in either of param [x | y] against index
            if (config["x"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.x);
                var x = ndframe[config.x].values;
                var y = ndframe.index;
                var trace = {
                    x: x,
                    y: y,
                    type: 'box',
                };
                var _layout = __assign({ xaxis: {
                        title: config.x,
                    }, yaxis: {
                        title: "Index",
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
            if (config["y"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.y);
                var x = ndframe.index;
                var y = ndframe[config.y].values;
                var trace = {
                    x: x,
                    y: y,
                    type: 'box',
                };
                var _layout = __assign({ xaxis: {
                        title: "Index",
                    }, yaxis: {
                        title: config.y,
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
        }
        else {
            //plot specified columns in config param against index
            // if columns is not specified in config, then plot all columns
            var cols = config["columns"] ? (0, utils_1.checkIfColsExist)(ndframe, config['columns']) : ndframe.columns;
            var traces_1 = [];
            cols.forEach(function (col) {
                var y = ndframe[col].values;
                var trace = {
                    y: y,
                    name: col,
                    type: 'box',
                };
                traces_1.push(trace);
            });
            Plotly.newPlot(divId, traces_1, layout, config);
        }
    }
};
exports.boxPlot = boxPlot;

}, function(modId) { var map = {"../../core/series":1711103528401,"./utils":1711103528410}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528416, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.violinPlot = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = require("./utils");
/**
* Plot Series or DataFrame as violin chart.
* Uses the Plotly as backend, so supoorts Plotly's configuration parameters,
* Line plot supports different types of parameters, and the behavior will depend on data specified.
* The precedence of columns to plot is: (x and y => x => y => columns).
* @param ndframe Series or DataFrame to plot
* @param divId HTML div id to plot in.
* @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
*/
var violinPlot = function (ndframe, divId, plotConfig, Plotly) {
    var config = plotConfig["config"];
    var layout = plotConfig["layout"];
    if (ndframe instanceof series_1.default) {
        var trace = {
            y: ndframe.values,
            type: 'violin',
        };
        Plotly.newPlot(divId, [trace], layout, config);
    }
    else {
        if (config["x"] && config["y"]) {
            //Plotting two columns against each other, when user specifies x and y column names in configuration
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["x"]);
            (0, utils_1.throwErrorOnWrongColName)(ndframe, config["y"]);
            var x = ndframe[config.x].values;
            var y = ndframe[config.y].values;
            var trace = {
                x: x,
                y: y,
                type: 'violin',
            };
            var _layout = __assign({ xaxis: {
                    title: config.x,
                }, yaxis: {
                    title: config.y,
                } }, layout);
            Plotly.newPlot(divId, [trace], _layout, config);
        }
        else if (config["x"] || config["y"]) {
            //plot single column specified in either of param [x | y] against index
            if (config["x"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.x);
                var x = ndframe[config.x].values;
                var y = ndframe.index;
                var trace = {
                    x: x,
                    y: y,
                    type: 'violin',
                };
                var _layout = __assign({ xaxis: {
                        title: config.x,
                    }, yaxis: {
                        title: "Index",
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
            if (config["y"]) {
                (0, utils_1.throwErrorOnWrongColName)(ndframe, config.y);
                var x = ndframe.index;
                var y = ndframe[config.y].values;
                var trace = {
                    x: x,
                    y: y,
                    type: 'violin',
                };
                var _layout = __assign({ xaxis: {
                        title: "Index",
                    }, yaxis: {
                        title: config.y,
                    } }, layout);
                Plotly.newPlot(divId, [trace], _layout, config);
            }
        }
        else {
            //plot specified columns in config param against index
            // if columns is not specified in config, then plot all columns
            var cols = config["columns"] ? (0, utils_1.checkIfColsExist)(ndframe, config['columns']) : ndframe.columns;
            var traces_1 = [];
            cols.forEach(function (col) {
                var y = ndframe[col].values;
                var trace = {
                    y: y,
                    name: col,
                    type: 'violin',
                };
                traces_1.push(trace);
            });
            Plotly.newPlot(divId, traces_1, layout, config);
        }
    }
};
exports.violinPlot = violinPlot;

}, function(modId) { var map = {"../../core/series":1711103528401,"./utils":1711103528410}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528417, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.tablePlot = void 0;
/**
* Display Series or DataFrame as table.
* Uses the Plotly as backend, so supoorts Plotly's configuration parameters,
* @param ndframe Series or DataFrame to plot
* @param divId HTML div id to plot in.
* @param plotConfig configuration options for making Plots, supports Plotly.js Config and Layout parameters.
*/
var tablePlot = function (ndframe, divId, plotConfig, Plotly) {
    var config = plotConfig["config"];
    var layout = plotConfig["layout"];
    var header = {};
    var cells = {};
    var colsData = [];
    var cols2Show = [];
    if (config['columns']) {
        config['columns'].forEach(function (cname) {
            if (!ndframe.columns.includes(cname)) {
                throw Error("Column Error: " + cname + " not found in columns. Columns should be one of [ " + ndframe.columns + " ]");
            }
            var idx = ndframe.columns.indexOf(cname);
            colsData.push(ndframe.getColumnData[idx]);
        });
        cols2Show = config['columns'];
    }
    else {
        cols2Show = ndframe.columns;
        colsData = ndframe.getColumnData;
    }
    header['values'] = cols2Show.map(function (col) { return [col]; });
    cells['values'] = colsData;
    if (config['tableHeaderStyle']) {
        Object.keys(config['tableHeaderStyle']).forEach(function (param) {
            header[param] = config['tableHeaderStyle'][param];
        });
    }
    if (config['tableCellStyle']) {
        Object.keys(config['tableCellStyle']).forEach(function (param) {
            cells[param] = config['tableCellStyle'][param];
        });
    }
    var trace = {
        type: 'table',
        header: header,
        cells: cells
    };
    /* @ts-ignore */
    Plotly.newPlot(divId, [trace], layout, config);
};
exports.tablePlot = tablePlot;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528418, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._genericMathOp = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("./series"));
var utils_1 = __importDefault(require("../shared/utils"));
var utils = new utils_1.default();
/**
 * Generic function for performing math operations on a series
 * @param object
 *
 * ndframe ==> The current Series
 *
 * other ==> The Series or number to perform math operation with
 *
 * operation ==> The type of operation to perform
*/
function _genericMathOp(_a) {
    var ndFrame = _a.ndFrame, other = _a.other, operation = _a.operation;
    if (typeof other === 'number') {
        //broadcast operation
        var newData = void 0;
        switch (operation) {
            case 'add':
                newData = ndFrame.values.map((function (ele) { return ele + other; }));
                return newData;
            case 'sub':
                newData = ndFrame.values.map((function (ele) { return ele - other; }));
                return newData;
            case 'mul':
                newData = ndFrame.values.map((function (ele) { return ele * other; }));
                return newData;
            case 'div':
                newData = ndFrame.values.map((function (ele) { return ele / other; }));
                return newData;
            case 'mod':
                newData = ndFrame.values.map((function (ele) { return ele % other; }));
                return newData;
            case 'pow':
                newData = ndFrame.values.map((function (ele) { return Math.pow(ele, other); }));
                return newData;
            case 'minimum':
                newData = ndFrame.values.map((function (ele) { return Math.min(ele, other); }));
                return newData;
            case 'maximum':
                newData = ndFrame.values.map((function (ele) { return Math.max(ele, other); }));
                return newData;
            default:
                throw new Error(operation + " is not implemented");
        }
    }
    else if (other instanceof series_1.default) {
        utils.checkSeriesOpCompactibility({ firstSeries: ndFrame, secondSeries: other, operation: operation });
        var newData = void 0;
        switch (operation) {
            case 'add':
                newData = ndFrame.values.map(function (ele, index) { return ele + other.values[index]; });
                return newData;
            case 'sub':
                newData = ndFrame.values.map(function (ele, index) { return ele - other.values[index]; });
                return newData;
            case 'mul':
                newData = ndFrame.values.map(function (ele, index) { return ele * other.values[index]; });
                return newData;
            case 'div':
                newData = ndFrame.values.map(function (ele, index) { return ele / other.values[index]; });
                return newData;
            case 'mod':
                newData = ndFrame.values.map(function (ele, index) { return ele % other.values[index]; });
                return newData;
            case 'pow':
                newData = ndFrame.values.map(function (ele, index) { return Math.pow(ele, other.values[index]); });
                return newData;
            case 'minimum':
                newData = ndFrame.values.map(function (ele, index) { return Math.min(ele, other.values[index]); });
                return newData;
            case 'maximum':
                newData = ndFrame.values.map(function (ele, index) { return Math.max(ele, other.values[index]); });
                return newData;
            default:
                throw new Error(operation + " is not implemented");
        }
    }
    else if (Array.isArray(other)) {
        if (other.length !== ndFrame.values.length) {
            throw new Error("ParamError: Length of array must be equal to length of Series");
        }
        var newData = void 0;
        switch (operation) {
            case 'add':
                newData = ndFrame.values.map(function (ele, index) { return ele + other[index]; });
                return newData;
            case 'sub':
                newData = ndFrame.values.map(function (ele, index) { return ele - other[index]; });
                return newData;
            case 'mul':
                newData = ndFrame.values.map(function (ele, index) { return ele * other[index]; });
                return newData;
            case 'div':
                newData = ndFrame.values.map(function (ele, index) { return ele / other[index]; });
                return newData;
            case 'mod':
                newData = ndFrame.values.map(function (ele, index) { return ele % other[index]; });
                return newData;
            case 'pow':
                newData = ndFrame.values.map(function (ele, index) { return Math.pow(ele, other[index]); });
                return newData;
            case 'minimum':
                newData = ndFrame.values.map(function (ele, index) { return Math.min(ele, other[index]); });
                return newData;
            case 'maximum':
                newData = ndFrame.values.map(function (ele, index) { return Math.max(ele, other[index]); });
                return newData;
        }
    }
    else {
        throw new Error("ParamError: value for other not supported. It must be either a scalar, Array or Series");
    }
}
exports._genericMathOp = _genericMathOp;

}, function(modId) { var map = {"./series":1711103528401,"../shared/utils":1711103528396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528419, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("../shared/utils"));
var utils = new utils_1.default();
/**
 * Exposes numerous String methods. All methods are applied Element-wise
 */
var Str = /** @class */ (function () {
    function Str(series) {
        this.series = series;
        this.values = series.values;
    }
    Str.prototype.toLowerCase = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).toLowerCase());
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.toUpperCase = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).toUpperCase());
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.capitalize = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                var firstChar = ("" + val).slice(0, 1);
                var leftChar = ("" + val).slice(1);
                var newStr = "" + firstChar.toUpperCase() + leftChar.toLowerCase();
                newArr.push(newStr);
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.charAt = function (index, options) {
        if (index === void 0) { index = 0; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).charAt(index));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.concat = function (other, position, options) {
        if (position === void 0) { position = 1; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        if (Array.isArray(other)) {
            for (var i = 0; i < other.length; i++) {
                var leftStr = "" + this.values[i];
                var rightStr = "" + other[i];
                if (position == 1) {
                    newArr.push(leftStr.concat(rightStr));
                }
                else {
                    newArr.push(rightStr.concat(leftStr));
                }
            }
        }
        else {
            this.values.map(function (val) {
                if (position == 1) {
                    if (utils.isEmpty(val)) {
                        newArr.push(NaN);
                    }
                    else {
                        newArr.push(("" + val).concat("" + other));
                    }
                }
                else {
                    if (utils.isEmpty(val)) {
                        newArr.push(NaN);
                    }
                    else {
                        newArr.push(other.concat("" + val));
                    }
                }
            });
        }
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.startsWith = function (str, options) {
        if (str === void 0) { str = ""; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.forEach(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).startsWith(str));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.endsWith = function (str, options) {
        if (str === void 0) { str = ""; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).endsWith(str));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.includes = function (str, options) {
        if (str === void 0) { str = ""; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).includes(str));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.indexOf = function (str, options) {
        if (str === void 0) { str = ""; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).indexOf(str));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.lastIndexOf = function (str, options) {
        if (str === void 0) { str = ""; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).lastIndexOf(str));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.replace = function (searchValue, replaceValue, options) {
        if (searchValue === void 0) { searchValue = ""; }
        if (replaceValue === void 0) { replaceValue = ""; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).replace(searchValue, replaceValue));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.repeat = function (num, options) {
        if (num === void 0) { num = 1; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).repeat(num));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.search = function (str, options) {
        if (str === void 0) { str = ""; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).search(str));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.slice = function (startIndex, endIndex, options) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = 1; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).slice(startIndex, endIndex));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.split = function (splitVal, options) {
        if (splitVal === void 0) { splitVal = " "; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push("" + String(val).split(splitVal));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.substr = function (startIndex, num, options) {
        if (startIndex === void 0) { startIndex = 0; }
        if (num === void 0) { num = 1; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push("" + String(val).substr(startIndex, num));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.substring = function (startIndex, endIndex, options) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = 1; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push("" + String(val).substring(startIndex, endIndex));
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.trim = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).trim());
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.join = function (valToJoin, joinChar, options) {
        if (valToJoin === void 0) { valToJoin = ""; }
        if (joinChar === void 0) { joinChar = " "; }
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                var leftChar = val;
                var rightChar = valToJoin;
                var new_char = "" + leftChar + joinChar + rightChar;
                newArr.push(new_char);
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    Str.prototype.len = function (options) {
        var inplace = __assign({ inplace: false }, options).inplace;
        var newArr = [];
        this.values.map(function (val) {
            if (utils.isEmpty(val)) {
                newArr.push(NaN);
            }
            else {
                newArr.push(("" + val).length);
            }
        });
        if (inplace) {
            this.series.$setValues(newArr);
            this.series.print();
        }
        else {
            var sf = this.series.copy();
            sf.$setValues(newArr);
            return sf;
        }
    };
    return Str;
}());
exports.default = Str;

}, function(modId) { var map = {"../shared/utils":1711103528396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528420, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDateTime = void 0;
var series_1 = __importDefault(require("./series"));
var WEEK_NAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var MONTH_NAME = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/**
 * Format and handle all datetime operations on Series or Array of date strings
 * @param data Series or Array of date strings
 */
var TimeSeries = /** @class */ (function () {
    function TimeSeries(data) {
        if (data instanceof series_1.default) {
            this.$dateObjectArray = this.processData(data.values);
        }
        else {
            this.$dateObjectArray = this.processData(data);
        }
    }
    /**
     * Processed the data values into internal structure for easy access
     * @param dateArray An array of date strings
    */
    TimeSeries.prototype.processData = function (dateArray) {
        var values = dateArray.map(function (dateString) { return new Date("" + dateString); });
        return values;
    };
    /**
     *  Returns the month, in local time.
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-01",
     * "2019-03-01",
     * "2019-04-01",
     * ]
     * const df = new Series(data)
     * const dfNew = df.dt.month()
     * console.log(dfNew.values)
     * // [1, 2, 3, 4]
     * ```
    */
    TimeSeries.prototype.month = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return date.getMonth(); });
        return new series_1.default(newValues);
    };
    /**
     * Returns the day of the week, in local time
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-01",
     * "2019-03-01",
     * "2019-04-01",
     * ]
     * const df = new Series(data)
     * const dayOfWeek = df.dt.dayOfWeek()
     * console.log(dayOfWeek.values)
     * ```
    */
    TimeSeries.prototype.dayOfWeek = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return date.getDay(); });
        return new series_1.default(newValues);
    };
    /**
     * Returns the year, in local time
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-01",
     * "2021-03-01",
     * "2020-04-01",
     * ]
     * const df = new Series(data)
     * const year = df.dt.year()
     * console.log(year.values)
     * // [2019, 2019, 2021, 2020]
     * ```
    */
    TimeSeries.prototype.year = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return date.getFullYear(); });
        return new series_1.default(newValues);
    };
    /**
     *  Returns the name of the month, in local time
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-01",
     * "2021-03-01",
     * "2020-04-01",
     * ]
     * const df = new Series(data)
     * const monthName = df.dt.monthName().values
     * console.log(monthName)
     * // ["January", "February", "March", "April"]
     * ```
    */
    TimeSeries.prototype.monthName = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return MONTH_NAME[date.getMonth()]; });
        return new series_1.default(newValues);
    };
    /**
     * Returns the name of the day, of the week, in local time
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-01",
     * "2021-03-01",
     * "2020-04-01",
     * ]
     * const df = new Series(data)
     * const dayOfWeekName = df.dt.dayOfWeekName().values
     * console.log(dayOfWeekName)
     * ```
    */
    TimeSeries.prototype.dayOfWeekName = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return WEEK_NAME[date.getDay()]; });
        return new series_1.default(newValues);
    };
    /**
     * Returns the day of the month, in local time
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-05",
     * "2021-03-02",
     * "2020-04-01",
     * ]
     * const df = new Series(data)
     * const dayOfMonth = df.dt.dayOfMonth().values
     * console.log(dayOfMonth)
     * // [1, 5, 2, 1]
     * ```
    */
    TimeSeries.prototype.dayOfMonth = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return date.getDate(); });
        return new series_1.default(newValues);
    };
    /**
     * Returns the hour of the day, in local time
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-05",
     * "2021-03-02",
     * "2020-04-01",
     * ]
     * const df = new Series(data)
     * const hour = df.dt.hour().values
     * console.log(hour)
     * // [0, 0, 0, 0]
     * ```
    */
    TimeSeries.prototype.hours = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return date.getHours(); });
        return new series_1.default(newValues);
    };
    /**
     * Returns the second of the day, in local time
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-05",
     * "2021-03-02",
     * "2020-04-01",
     * ]
     * const df = new Series(data)
     * const second = df.dt.second().values
     * console.log(second)
     * ```
    */
    TimeSeries.prototype.seconds = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return date.getSeconds(); });
        return new series_1.default(newValues);
    };
    /**
     * Returns the minute of the day, in local time
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-05",
     * "2021-03-02",
     * "2020-04-01",
     * ]
     * const df = new Series(data)
     * const minute = df.dt.minute().values
     * console.log(minute)
     * ```
    */
    TimeSeries.prototype.minutes = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return date.getMinutes(); });
        return new series_1.default(newValues);
    };
    /**
     * Returns the Date as JavaScript standard Date object
     * @example
     * ```
     * import { Series } from "danfojs-node"
     * const data = [
     * "2019-01-01",
     * "2019-02-05",
     * "2021-03-02",
     * "2020-04-01",
     * ]
     *
     * const df = new Series(data)
     * const date = df.dt.toDate().values
     * console.log(date)
     * ```
    */
    TimeSeries.prototype.date = function () {
        var newValues = this.$dateObjectArray.map(function (date) { return date.toLocaleString(); });
        return new series_1.default(newValues);
    };
    return TimeSeries;
}());
exports.default = TimeSeries;
var toDateTime = function (data) {
    return new TimeSeries(data);
};
exports.toDateTime = toDateTime;

}, function(modId) { var map = {"./series":1711103528401}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528421, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var series_1 = __importDefault(require("../../core/series"));
var frame_1 = __importDefault(require("../../core/frame"));
var utils_1 = __importDefault(require("../../shared/utils"));
var tensorflowlib_1 = __importDefault(require("../../shared/tensorflowlib"));
var utils = new utils_1.default();
/**
 * Transform features by scaling each feature to a given range.
 * This estimator scales and translates each feature individually such
 * that it is in the given range on the training set, e.g. between the maximum and minimum value.
*/
var MinMaxScaler = /** @class */ (function () {
    function MinMaxScaler() {
        this.$max = tensorflowlib_1.default.tensor1d([]);
        this.$min = tensorflowlib_1.default.tensor1d([]);
    }
    MinMaxScaler.prototype.$getTensor = function (data) {
        var $tensorArray;
        if (data instanceof Array) {
            if (utils.is1DArray(data)) {
                $tensorArray = tensorflowlib_1.default.tensor1d(data);
            }
            else {
                $tensorArray = tensorflowlib_1.default.tensor2d(data);
            }
        }
        else if (data instanceof frame_1.default || data instanceof series_1.default) {
            $tensorArray = data.tensor;
        }
        else if (data instanceof tensorflowlib_1.default.Tensor) {
            $tensorArray = data;
        }
        else {
            throw new Error("ParamError: data must be one of Array, Tensor, DataFrame or Series");
        }
        return $tensorArray;
    };
    /**
     * Fits a MinMaxScaler to the data
     * @param data Array, Tensor, DataFrame or Series object
     * @returns MinMaxScaler
     * @example
     * const scaler = new MinMaxScaler()
     * scaler.fit([1, 2, 3, 4, 5])
     * // MinMaxScaler {
     * //   $max: [5],
     * //   $min: [1]
     * // }
     *
     */
    MinMaxScaler.prototype.fit = function (data) {
        var tensorArray = this.$getTensor(data);
        this.$max = tensorArray.max(0);
        this.$min = tensorArray.min(0);
        return this;
    };
    /**
     * Transform the data using the fitted scaler
     * @param data Array, Tensor, DataFrame or Series object
     * @returns Array, Tensor, DataFrame or Series object
     * @example
     * const scaler = new MinMaxScaler()
     * scaler.fit([1, 2, 3, 4, 5])
     * scaler.transform([1, 2, 3, 4, 5])
     * // [0, 0.25, 0.5, 0.75, 1]
     * */
    MinMaxScaler.prototype.transform = function (data) {
        var tensorArray = this.$getTensor(data);
        var outputData = tensorArray
            .sub(this.$min)
            .div(this.$max.sub(this.$min));
        if (Array.isArray(data)) {
            return outputData.arraySync();
        }
        else if (data instanceof series_1.default) {
            return new series_1.default(outputData, {
                index: data.index,
            });
        }
        else if (data instanceof frame_1.default) {
            return new frame_1.default(outputData, {
                index: data.index,
                columns: data.columns,
                config: __assign({}, data.config),
            });
        }
        else {
            return outputData;
        }
    };
    /**
     * Fit the data and transform it
     * @param data Array, Tensor, DataFrame or Series object
     * @returns Array, Tensor, DataFrame or Series object
     * @example
     * const scaler = new MinMaxScaler()
     * scaler.fitTransform([1, 2, 3, 4, 5])
     * // [0, 0.25, 0.5, 0.75, 1]
     * */
    MinMaxScaler.prototype.fitTransform = function (data) {
        this.fit(data);
        return this.transform(data);
    };
    /**
     * Inverse transform the data using the fitted scaler
     * @param data Array, Tensor, DataFrame or Series object
     * @returns Array, Tensor, DataFrame or Series object
     * @example
     * const scaler = new MinMaxScaler()
     * scaler.fit([1, 2, 3, 4, 5])
     * scaler.inverseTransform([0, 0.25, 0.5, 0.75, 1])
     * // [1, 2, 3, 4, 5]
     * */
    MinMaxScaler.prototype.inverseTransform = function (data) {
        var tensorArray = this.$getTensor(data);
        var outputData = tensorArray
            .mul(this.$max.sub(this.$min))
            .add(this.$min);
        if (Array.isArray(data)) {
            return outputData.arraySync();
        }
        else if (data instanceof series_1.default) {
            return new series_1.default(outputData, {
                index: data.index,
            });
        }
        else if (data instanceof frame_1.default) {
            return new frame_1.default(outputData, {
                index: data.index,
                columns: data.columns,
                config: __assign({}, data.config),
            });
        }
        else {
            return outputData;
        }
    };
    return MinMaxScaler;
}());
exports.default = MinMaxScaler;

}, function(modId) { var map = {"../../core/series":1711103528401,"../../core/frame":1711103528403,"../../shared/utils":1711103528396,"../../shared/tensorflowlib":1711103528400}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528422, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tensorflowlib_1 = __importDefault(require("../../shared/tensorflowlib"));
var series_1 = __importDefault(require("../../core/series"));
var frame_1 = __importDefault(require("../../core/frame"));
var utils_1 = __importDefault(require("../../shared/utils"));
var utils = new utils_1.default();
/**
 * Standardize features by removing the mean and scaling to unit variance.
 * The standard score of a sample x is calculated as: `z = (x - u) / s`,
 * where `u` is the mean of the training samples, and `s` is the standard deviation of the training samples.
 */
var StandardScaler = /** @class */ (function () {
    function StandardScaler() {
        this.$std = tensorflowlib_1.default.tensor1d([]);
        this.$mean = tensorflowlib_1.default.tensor1d([]);
    }
    StandardScaler.prototype.$getTensor = function (data) {
        var $tensorArray;
        if (data instanceof Array) {
            if (utils.is1DArray(data)) {
                $tensorArray = tensorflowlib_1.default.tensor1d(data);
            }
            else {
                $tensorArray = tensorflowlib_1.default.tensor2d(data);
            }
        }
        else if (data instanceof frame_1.default || data instanceof series_1.default) {
            $tensorArray = data.tensor;
        }
        else if (data instanceof tensorflowlib_1.default.Tensor) {
            $tensorArray = data;
        }
        else {
            throw new Error("ParamError: data must be one of Array, DataFrame or Series");
        }
        return $tensorArray;
    };
    /**
     * Fit a StandardScaler to the data.
     * @param data Array, Tensor, DataFrame or Series object
     * @returns StandardScaler
     * @example
     * const scaler = new StandardScaler()
     * scaler.fit([1, 2, 3, 4, 5])
     */
    StandardScaler.prototype.fit = function (data) {
        var tensorArray = this.$getTensor(data);
        this.$std = tensorflowlib_1.default.moments(tensorArray, 0).variance.sqrt();
        this.$mean = tensorArray.mean(0);
        return this;
    };
    /**
     * Transform the data using the fitted scaler
     * @param data Array, Tensor, DataFrame or Series object
     * @returns Array, Tensor, DataFrame or Series object
     * @example
     * const scaler = new StandardScaler()
     * scaler.fit([1, 2, 3, 4, 5])
     * scaler.transform([1, 2, 3, 4, 5])
     * // [0.0, 0.0, 0.0, 0.0, 0.0]
     * */
    StandardScaler.prototype.transform = function (data) {
        var tensorArray = this.$getTensor(data);
        var outputData = tensorArray.sub(this.$mean).div(this.$std);
        if (Array.isArray(data)) {
            return outputData.arraySync();
        }
        else if (data instanceof series_1.default) {
            return new series_1.default(outputData, {
                index: data.index,
            });
        }
        else if (data instanceof frame_1.default) {
            return new frame_1.default(outputData, {
                index: data.index,
                columns: data.columns,
                config: __assign({}, data.config),
            });
        }
        else {
            return outputData;
        }
    };
    /**
     * Fit and transform the data using the fitted scaler
     * @param data Array, Tensor, DataFrame or Series object
     * @returns Array, Tensor, DataFrame or Series object
     * @example
     * const scaler = new StandardScaler()
     * scaler.fit([1, 2, 3, 4, 5])
     * scaler.fitTransform([1, 2, 3, 4, 5])
     * // [0.0, 0.0, 0.0, 0.0, 0.0]
     * */
    StandardScaler.prototype.fitTransform = function (data) {
        this.fit(data);
        return this.transform(data);
    };
    /**
     * Inverse transform the data using the fitted scaler
     * @param data Array, Tensor, DataFrame or Series object
     * @returns Array, Tensor, DataFrame or Series object
     * @example
     * const scaler = new StandardScaler()
     * scaler.fit([1, 2, 3, 4, 5])
     * scaler.transform([1, 2, 3, 4, 5])
     * // [0.0, 0.0, 0.0, 0.0, 0.0]
     * scaler.inverseTransform([0.0, 0.0, 0.0, 0.0, 0.0])
     * // [1, 2, 3, 4, 5]
     * */
    StandardScaler.prototype.inverseTransform = function (data) {
        var tensorArray = this.$getTensor(data);
        var outputData = tensorArray.mul(this.$std).add(this.$mean);
        if (Array.isArray(data)) {
            return outputData.arraySync();
        }
        else if (data instanceof series_1.default) {
            return new series_1.default(outputData, {
                index: data.index,
            });
        }
        else if (data instanceof frame_1.default) {
            return new frame_1.default(outputData, {
                index: data.index,
                columns: data.columns,
                config: __assign({}, data.config),
            });
        }
        else {
            return outputData;
        }
    };
    return StandardScaler;
}());
exports.default = StandardScaler;

}, function(modId) { var map = {"../../shared/tensorflowlib":1711103528400,"../../core/series":1711103528401,"../../core/frame":1711103528403,"../../shared/utils":1711103528396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528423, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tensorflowlib_1 = __importDefault(require("../../shared/tensorflowlib"));
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = __importDefault(require("../../shared/utils"));
var utils = new utils_1.default();
/**
 * Encode target labels with value between 0 and n_classes-1.
 */
var LabelEncoder = /** @class */ (function () {
    function LabelEncoder() {
        this.$labels = {};
    }
    LabelEncoder.prototype.$getData = function (data) {
        var $data;
        if (data instanceof Array) {
            if (utils.is1DArray(data)) {
                $data = data;
            }
            else {
                throw new Error("ValueError: data must be a 1D array.");
            }
        }
        else if (data instanceof series_1.default) {
            $data = data.values;
        }
        else if (data instanceof tensorflowlib_1.default.Tensor) {
            $data = data.arraySync();
        }
        else {
            throw new Error("ParamError: data must be one of Array, 1d Tensor or Series.");
        }
        return $data;
    };
    /**
     * Maps values to unique integer labels between 0 and n_classes-1.
     * @param data 1d array of labels, Tensor, or  Series to fit.
     * @example
     * ```
     * const encoder = new LabelEncoder()
     * encoder.fit(["a", "b", "c", "d"])
     * ```
    */
    LabelEncoder.prototype.fit = function (data) {
        var $data = this.$getData(data);
        var dataSet = Array.from(new Set($data));
        var tempObj = {};
        dataSet.forEach(function (value, index) {
            tempObj[value] = index;
        });
        this.$labels = tempObj;
        return this;
    };
    /**
     * Encode labels with value between 0 and n_classes-1.
     * @param data 1d array of labels, Tensor, or  Series to be encoded.
     * @example
     * ```
     * const encoder = new LabelEncoder()
     * encoder.fit(["a", "b", "c", "d"])
     * console.log(encoder.transform(["a", "b", "c", "d"]))
     * // [0, 1, 2, 3]
     * ```
    */
    LabelEncoder.prototype.transform = function (data) {
        var _this = this;
        var $data = this.$getData(data);
        var encodedData = $data.map(function (value) {
            var label = _this.$labels[value] !== undefined ? _this.$labels[value] : -1;
            return label;
        });
        if (data instanceof Array) {
            return encodedData;
        }
        else if (data instanceof series_1.default) {
            return new series_1.default(encodedData);
        }
        else {
            return tensorflowlib_1.default.tensor1d(encodedData);
        }
    };
    /**
     * Fit and transform data in one step.
     * @param data 1d array of labels, Tensor, or  Series to be encoded.
     * @example
     * ```
     * const encoder = new LabelEncoder()
     * encoder.fitTransform(["a", "b", "c", "d"])
     * // [0, 1, 2, 3]
     * ```
     */
    LabelEncoder.prototype.fitTransform = function (data) {
        this.fit(data);
        return this.transform(data);
    };
    /**
     * Inverse transform values back to original values.
     * @param data 1d array of labels, Tensor, or  Series to be decoded.
     * @example
     * ```
     * const encoder = new LabelEncoder()
     * encoder.fit(["a", "b", "c", "d"])
     * console.log(encoder.inverseTransform([0, 1, 2, 3]))
     * // ["a", "b", "c", "d"]
     * ```
    */
    LabelEncoder.prototype.inverseTransform = function (data) {
        var _this = this;
        var $data = this.$getData(data);
        var tempData = $data.map(function (value) {
            return Object.keys(_this.$labels).find(function (key) { return _this.$labels[key] === value; });
        });
        var decodedData = tempData.map(function (value) {
            if (isNaN(parseInt(value))) {
                return value;
            }
            else {
                return Number(value);
            }
        });
        if (data instanceof Array) {
            return decodedData;
        }
        else if (data instanceof series_1.default) {
            return new series_1.default(decodedData);
        }
        else {
            return tensorflowlib_1.default.tensor1d(decodedData);
        }
    };
    Object.defineProperty(LabelEncoder.prototype, "nClasses", {
        /**
         * Get the number of classes.
         * @returns number of classes.
         * @example
         * ```
         * const encoder = new LabelEncoder()
         * encoder.fit(["a", "b", "c", "d"])
         * console.log(encoder.nClasses)
         * // 4
         * ```
         */
        get: function () {
            return Object.keys(this.$labels).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelEncoder.prototype, "classes", {
        /**
         * Get the mapping of classes to integers.
         * @returns mapping of classes to integers.
         * @example
         * ```
         * const encoder = new LabelEncoder()
         * encoder.fit(["a", "b", "c", "d"])
         * console.log(encoder.classes)
         * // {a: 0, b: 1, c: 2, d: 3}
         * ```
        */
        get: function () {
            return this.$labels;
        },
        enumerable: false,
        configurable: true
    });
    return LabelEncoder;
}());
exports.default = LabelEncoder;

}, function(modId) { var map = {"../../shared/tensorflowlib":1711103528400,"../../core/series":1711103528401,"../../shared/utils":1711103528396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528424, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = __importDefault(require("../../core/frame"));
var tensorflowlib_1 = __importDefault(require("../../shared/tensorflowlib"));
var series_1 = __importDefault(require("../../core/series"));
var utils_1 = __importDefault(require("../../shared/utils"));
var utils = new utils_1.default();
/**
 * Fits a OneHotEncoder to the data.
 * @example
 * ```js
 * const encoder = new OneHotEncoder()
 * encoder.fit(["a", "b", "c"])
 * ```
*/
var OneHotEncoder = /** @class */ (function () {
    function OneHotEncoder() {
        this.$labels = [];
    }
    OneHotEncoder.prototype.$getData = function (data) {
        var $data;
        if (data instanceof Array) {
            if (utils.is1DArray(data)) {
                $data = data;
            }
            else {
                throw new Error("ValueError: data must be a 1D array.");
            }
        }
        else if (data instanceof series_1.default) {
            $data = data.values;
        }
        else if (data instanceof tensorflowlib_1.default.Tensor) {
            $data = data.arraySync();
        }
        else {
            throw new Error("ParamError: data must be one of Array, 1d Tensor or Series.");
        }
        return $data;
    };
    /**
     * Fits a OneHotEncoder to the data.
     * @param data 1d array of labels, Tensor, or  Series to be encoded.
     * @returns OneHotEncoder
     * @example
     * ```js
     * const encoder = new OneHotEncoder()
     * encoder.fit(["a", "b", "c"])
     * ```
    */
    OneHotEncoder.prototype.fit = function (data) {
        var $data = this.$getData(data);
        var dataSet = Array.from(new Set($data));
        this.$labels = dataSet;
        return this;
    };
    /**
     * Encodes the data using the fitted OneHotEncoder.
     * @param data 1d array of labels, Tensor, or  Series to be encoded.
     * @example
     * ```js
     * const encoder = new OneHotEncoder()
     * encoder.fit(["a", "b", "c"])
     * encoder.transform(["a", "b", "c"])
     * ```
     */
    OneHotEncoder.prototype.transform = function (data) {
        var $data = this.$getData(data);
        var oneHotArr = utils.zeros($data.length, this.$labels.length);
        for (var i = 0; i < $data.length; i++) {
            var index = this.$labels.indexOf($data[i]);
            oneHotArr[i][index] = 1;
        }
        if (data instanceof Array) {
            return oneHotArr;
        }
        else if (data instanceof series_1.default) {
            return new frame_1.default(oneHotArr, {
                index: data.index,
            });
        }
        else {
            return tensorflowlib_1.default.tensor1d(oneHotArr);
        }
    };
    /**
     * Fit and transform the data using the fitted OneHotEncoder.
     * @param data 1d array of labels, Tensor, or  Series to be encoded.
     * @example
     * ```js
     * const encoder = new OneHotEncoder()
     * encoder.fitTransform(["a", "b", "c"])
     * ```
     */
    OneHotEncoder.prototype.fitTransform = function (data) {
        this.fit(data);
        return this.transform(data);
    };
    return OneHotEncoder;
}());
exports.default = OneHotEncoder;

}, function(modId) { var map = {"../../core/frame":1711103528403,"../../shared/tensorflowlib":1711103528400,"../../core/series":1711103528401,"../../shared/utils":1711103528396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528425, function(require, module, exports) {

/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = __importDefault(require("../core/frame"));
var utils_1 = __importDefault(require("../shared/utils"));
var utils = new utils_1.default();
var Merge = /** @class */ (function () {
    function Merge(_a) {
        var left = _a.left, right = _a.right, on = _a.on, how = _a.how;
        this.leftColIndex = [];
        this.rightColIndex = [];
        this.left = left;
        this.right = right;
        this.on = on;
        this.how = how;
        //Obtain the column index of the column will
        //want to merge on for both left and right dataframe
        for (var i = 0; i < this.on.length; i++) {
            var key = this.on[i];
            if (this.left.columns.includes(key) && this.right.columns.includes(key)) {
                var leftIndex = this.left.columns.indexOf(key);
                var rightIndex = this.right.columns.indexOf(key);
                this.leftColIndex.push(leftIndex);
                this.rightColIndex.push(rightIndex);
            }
        }
    }
    /**
     * Generate key combination base on the columns we want to merge on
     * e.g  df = {
     *  key1: ["KO", "K0", "K3", "K4"],
     *  Key2: ["K1", "K1", "K3", "K5"],
     *  A: [1,2,3,4]
     *  B: [3,4,5,6]
     * }
     * keycomb = generateKeyCombination(df.values, [0,1])
     * This should output
     * {
     *  'k0_k1': {
     *      filters: [[1,3], [2,4]], # the value of other columns in thesame row with the combination keys
     *      combValues: ["KO", "k1"] # the combination key from column Key1 (index 2) and key2 (index 1)
     *  },
     *  'K3_K3 : {
     *      filters: [[3,5]],
     *      combValues: ['K3', 'k3']
     *  },
     *  'k4_k5' : {
     *      filters: [[4,6]]
     *      combValues: ['K4', 'K5']
     *  }
     * }
     * This key combination will be generated for both left and right dataframe
     * @param values
     * @param colIndex
     */
    Merge.prototype.generateKeyCombination = function (values, colIndex) {
        var colKeyComb = {};
        for (var i = 0; i < values.length; i++) {
            var rowValues = values[i];
            var rowKeyCombValues = [];
            for (var j = 0; j < colIndex.length; j++) {
                var index = colIndex[j];
                rowKeyCombValues.push(rowValues[index]);
            }
            var rowKeyComb = rowKeyCombValues.join('_');
            var otherValues = rowValues.filter(function (val, index) {
                return !colIndex.includes(index);
            });
            if (utils.keyInObject(colKeyComb, rowKeyComb)) {
                colKeyComb[rowKeyComb].filters.push(otherValues);
            }
            else {
                colKeyComb[rowKeyComb] = {
                    filters: [otherValues],
                    combValues: rowKeyCombValues
                };
            }
        }
        return colKeyComb;
    };
    /**
     * Generate columns for the newly generated merged DataFrame
     * e.g df = {
     *  key1: ["KO", "K0", "K3", "K4"],
     *  Key2: ["K1", "K1", "K3", "K5"],
     *  A: [1,2,3,4]
     *  B: [3,4,5,6]
     * }
     * df2 = {
     *  key1: ["KO", "K0", "K3", "K4"],
     *  Key2: ["K1", "K1", "K3", "K5"],
     *  A: [1,2,3,4]
     *  c: [3,4,5,6]
     * }
     * And both dataframe are to be merged on `key1` and `key2`
     * the newly generated column will be of the form
     * columns = ['key1', 'Key2', 'A', 'A_1', 'B', 'C']
     * Notice 'A_1' , this because both DataFrame as column A and 1 is the
     * number of duplicate of that column
     */
    Merge.prototype.createColumns = function () {
        var self = this;
        this.leftCol = self.left.columns.filter(function (_, index) {
            return !self.leftColIndex.includes(index);
        });
        this.rightCol = self.right.columns.filter(function (_, index) {
            return !self.rightColIndex.includes(index);
        });
        this.columns = __spreadArray([], this.on, true);
        var duplicateColumn = {};
        var tempColumn = __spreadArray([], this.leftCol, true);
        tempColumn.push.apply(tempColumn, this.rightCol);
        for (var i = 0; i < tempColumn.length; i++) {
            var col = tempColumn[i];
            if (utils.keyInObject(duplicateColumn, col)) {
                var columnName = col + "_" + duplicateColumn[col];
                this.columns.push(columnName);
                duplicateColumn[col] += 1;
            }
            else {
                this.columns.push(col);
                duplicateColumn[col] = 1;
            }
        }
    };
    /**
     * The basic methos perform the underneath operation of generating
     * the merge dataframe; using the combination keys generated from
     * bothe left and right DataFrame
     * e.g df = {
     *  key1: ["KO", "K0", "K3", "K4"],
     *  Key2: ["K1", "K1", "K3", "K5"],
     *  A: [1,2,3,4]
     *  B: [3,4,5,6]
     * }
     * df2 = {
     *  key1: ["KO", "K0", "K3", "K4"],
     *  Key2: ["K1", "K2", "K4", "K5"],
     *  A: [3,6,8,9]
     *  c: [2,4,6,8]
     * }
     * Running generatekeyCombination on both left and right data frame
     * we should have
     * leftKeyDict = {
     *  'k0_k1': {
     *      filters: [[1,3], [2,4]],
     *      combValues: ["KO", "k1"]
     *  },
     *  'K3_K3' : {
     *      filters: [[3,5]],
     *      combValues: ['K3', 'k3']
     *  },
     *  'k4_k5' : {
     *      filters: [[4,6]]
     *      combValues: ['K4', 'K5']
     *  }
     * }
     * rightKeyDict = {
     *  'k0_k1': {
     *      filters: [[3,2]],
     *      combValues: ["KO", "k1"]
     *  },
     *  'K0_K2': {
     *      filters: [[6,4]],
     *      combValues: ['K0', 'K2']
     *  },
     *  'K3_K4' : {
     *      filters: [[8,9]],
     *      combValues: ['K3', 'k4']
     *  },
     *  'k4_k5' : {
     *      filters: [[9,8]]
     *      combValues: ['K4', 'K5']
     *  }
     * }
     * The `keys` is generated base on the type of merge operation we want to
     * perform. If we assume we are performing `outer` merge (which is a set of the
     * key combination from both leftKeyDict and rightKeyDict) then Keys should be
     * this
     * keys = ['K0_K1', 'K3_K3', 'k4_k5', 'K0_K2', 'k3_k4']
     * The Keys, leftKeyDict and rightKeyDict are used to generated DataFrame data,
     * by looping through the Keys and checking if leftKeyDict and rightKeyDict as the
     * key if one of them does not the column in that row will be NaN
     * e.g Data for each row base on keys
     * COLUMNS = ['key1', 'Key2', 'A', 'B', 'A_1', 'C']
     * 'K0_K1':  ['K0',   'K1',   1,    3 ,   3,   2 ]
     * 'K0_K1':  ['K0',   'K1',   2,    4,   NaN, NaN]
     * 'K3_K3':  ['k3',   'K3',   3,    5,  NaN,  NaN]
     * 'K4_K5':  ['K4',   'K5',   4,    6,  9,    8]
     * 'k0_K2':  ['k0',   'K2'    NaN,  NaN, 6,   4]
     * 'k3_k4':  ['K3',   'K4',   NaN,  NaN, 8, 6]
     *
     * @param keys
     * @param leftKeyDict
     * @param rightKeyDict
     */
    Merge.prototype.basic = function (keys, leftKeyDict, rightKeyDict) {
        var _a, _b;
        var data = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (utils.keyInObject(leftKeyDict, key)) {
                var leftRows = leftKeyDict[key].filters;
                var leftCombValues = leftKeyDict[key].combValues;
                for (var lIndex = 0; lIndex < leftRows.length; lIndex++) {
                    var leftRow = leftRows[lIndex];
                    if (utils.keyInObject(rightKeyDict, key)) {
                        var rightRows = rightKeyDict[key].filters;
                        for (var rIndex = 0; rIndex < rightRows.length; rIndex++) {
                            var rightRow = rightRows[rIndex];
                            var combineData = leftCombValues.slice(0);
                            combineData.push.apply(combineData, leftRow);
                            combineData.push.apply(combineData, rightRow);
                            data.push(combineData);
                        }
                    }
                    else {
                        var nanArray = Array((_a = this.rightCol) === null || _a === void 0 ? void 0 : _a.length).fill(NaN);
                        var combineData = leftCombValues.slice(0);
                        combineData.push.apply(combineData, leftRow);
                        combineData.push.apply(combineData, nanArray);
                        data.push(combineData);
                    }
                }
            }
            else {
                var rightRows = rightKeyDict[key].filters;
                var rightCombValues = rightKeyDict[key].combValues;
                for (var i_1 = 0; i_1 < rightRows.length; i_1++) {
                    var rightRow = rightRows[i_1];
                    var nanArray = Array((_b = this.leftCol) === null || _b === void 0 ? void 0 : _b.length).fill(NaN);
                    var combineData = rightCombValues.slice(0);
                    combineData.push.apply(combineData, nanArray);
                    combineData.push.apply(combineData, rightRow);
                    data.push(combineData);
                }
            }
        }
        return data;
    };
    /**
     * Generate outer key from leftKeyDict and rightKeyDict
     * The Key pass into basic method is the union of
     * leftKeyDict and rightKeyDict
     * @param leftKeyDict
     * @param rightKeyDict
     */
    Merge.prototype.outer = function (leftKeyDict, rightKeyDict) {
        var keys = Object.keys(leftKeyDict);
        keys.push.apply(keys, Object.keys(rightKeyDict));
        var UniqueKeys = Array.from(new Set(keys));
        var data = this.basic(UniqueKeys, leftKeyDict, rightKeyDict);
        return data;
    };
    /**
     * Generate Key for basic method,
     * the key geneerated is the intersection of
     * leftKeyDict and rightKeyDict
     * @param leftKeyDict
     * @param rightKeyDict
     */
    Merge.prototype.inner = function (leftKeyDict, rightKeyDict) {
        var leftKey = Object.keys(leftKeyDict);
        var rightKey = Object.keys(rightKeyDict);
        var keys = leftKey.filter(function (val) { return rightKey.includes(val); });
        var data = this.basic(keys, leftKeyDict, rightKeyDict);
        return data;
    };
    /**
     * The key is the leftKeyDict
     * @param leftKeyDict
     * @param rightKeyDict
     */
    Merge.prototype.leftMerge = function (leftKeyDict, rightKeyDict) {
        var keys = Object.keys(leftKeyDict);
        var data = this.basic(keys, leftKeyDict, rightKeyDict);
        return data;
    };
    /**
     * The key is the rightKeyDict
     * @param leftKeyDict
     * @param rightKeyDict
     */
    Merge.prototype.rightMerge = function (leftKeyDict, rightKeyDict) {
        var keys = Object.keys(rightKeyDict);
        var data = this.basic(keys, leftKeyDict, rightKeyDict);
        return data;
    };
    /**
     * Perform the merge operation
     * 1) Obtain both left and right dataframe values
     * 2) Generate the leftkeyDict and rightKeyDict
     * 3) Generate new merge columns
     * 4) check how merge is to be done and apply the
     * right methods
     */
    Merge.prototype.operation = function () {
        var leftValues = this.left.values;
        var rightValues = this.right.values;
        var leftKeyDict = this.generateKeyCombination(leftValues, this.leftColIndex);
        var rightKeyDict = this.generateKeyCombination(rightValues, this.rightColIndex);
        this.createColumns();
        var data = [];
        switch (this.how) {
            case "outer":
                data = this.outer(leftKeyDict, rightKeyDict);
                break;
            case "inner":
                data = this.inner(leftKeyDict, rightKeyDict);
                break;
            case "left":
                data = this.leftMerge(leftKeyDict, rightKeyDict);
                break;
            case "right":
                data = this.rightMerge(leftKeyDict, rightKeyDict);
                break;
        }
        var columns = this.columns;
        return new frame_1.default(data, { columns: __spreadArray([], columns, true) });
    };
    return Merge;
}());
/**
 * Perform merge operation between two DataFrame
 * @param params : {
 * left: DataFrame
 * right: DataFrame
 * on: Array<string>
 * how: "outer" | "inner" | "left" | "right"
 * }
 */
function merge(params) {
    var mergeClass = new Merge(params);
    return mergeClass.operation();
}
exports.default = merge;

}, function(modId) { var map = {"../core/frame":1711103528403,"../shared/utils":1711103528396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528426, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var utils_1 = __importDefault(require("../shared/utils"));
var utils = new utils_1.default();
var DateRange = /** @class */ (function () {
    function DateRange(_a) {
        var start = _a.start, end = _a.end, offset = _a.offset, freq = _a.freq, period = _a.period;
        this.start = start;
        this.end = end;
        this.offset = offset;
        this.freq = freq ? freq : "D";
        this.period = period;
        this.freqList = ["M", "D", "s", "H", "m", "Y"];
        if (this.freq.length == 1) {
            if (!this.freqList.includes(this.freq)) {
                throw new Error("invalid freq " + this.freq);
            }
        }
        else {
            this.offset = parseInt(this.freq.slice(0, -1));
            if (!Number.isFinite(this.offset)) {
                throw new Error("invalid freq offset " + this.freq.slice(0, -1));
            }
            this.freq = this.freq.slice(-1);
            if (!this.freqList.includes(this.freq)) {
                throw new Error("invalid freq " + this.freq);
            }
        }
    }
    DateRange.prototype.range = function () {
        var _this = this;
        var start = this.start;
        var period = this.period;
        var end = this.end;
        var offset = this.offset;
        var startDate;
        var endDate;
        var startRange;
        var endRange;
        if (start && end) {
            startDate = new Date(start);
            startRange = this.freqType(startDate, this.freq);
            endDate = new Date(end);
            endRange = this.freqType(endDate, this.freq);
            var startYear = startDate.getFullYear();
            var endYear = endDate.getFullYear();
            if ((startYear <= endYear) && (startDate.getMonth() !== endDate.getMonth())) {
                if (this.freq == "M") {
                    endRange = this.monthEnd(startDate, endDate);
                }
                else if (this.freq === "D") {
                    endRange = this.dayEnd(startDate, endDate) - startRange;
                }
            }
            var rangeArray_1 = utils.range(startRange, endRange);
            if (offset) {
                rangeArray_1 = this.offsetCount(rangeArray_1, offset);
            }
            var dateRange_1 = rangeArray_1.map(function (x) {
                return _this.setDateProps(startDate, _this.freq, x);
            });
            dateRange_1[dateRange_1.length - 1] = endDate;
            var dateString_1 = this.toLocalString(dateRange_1);
            return dateString_1;
        }
        else if (start && !(end)) {
            startDate = new Date(start);
            startRange = this.freqType(startDate, this.freq);
            period = period;
            endRange = offset ? ((period * offset) - 1) : period - 1;
            if (startRange > endRange) {
                endRange = endRange + startRange;
            }
            var rangeArray_2 = utils.range(startRange, endRange);
            if (offset) {
                rangeArray_2 = this.offsetCount(rangeArray_2, offset);
            }
            var dateRange_2 = rangeArray_2.map(function (x) {
                return _this.setDateProps(startDate, _this.freq, x);
            });
            var dateString_2 = this.toLocalString(dateRange_2);
            return dateString_2;
        }
        // if end and not start given
        endDate = new Date(end);
        endRange = this.freqType(endDate, this.freq);
        period = period;
        startRange = (endRange - period) + 1;
        var rangeArray = utils.range(startRange, endRange);
        if (offset) {
            rangeArray = this.offsetCount(rangeArray, offset);
        }
        var dateRange = rangeArray.map(function (x) {
            return _this.setDateProps(endDate, _this.freq, x);
        });
        var dateString = this.toLocalString(dateRange);
        return dateString;
    };
    /**
     * @param date Date
     * @param ftype string:  frequency type, month, Year, day etc
     * @param number
     */
    DateRange.prototype.freqType = function (date, ftype) {
        var rslt = 0;
        switch (ftype) {
            case "M":
                rslt = date.getMonth();
                break;
            case "Y":
                rslt = date.getFullYear();
                break;
            case "s":
                rslt = date.getSeconds();
                break;
            case "D":
                rslt = date.getDate();
                break;
            case "H":
                rslt = date.getHours();
                break;
            case "m":
                rslt = date.getMinutes();
                break;
        }
        return rslt;
    };
    DateRange.prototype.offsetCount = function (dArray, offset) {
        var rArray = [];
        for (var i = 0; i < dArray.length; i += offset) {
            rArray.push(dArray[i]);
        }
        return rArray;
    };
    DateRange.prototype.setDateProps = function (date, ftype, val) {
        var newDate = new Date(date.valueOf());
        switch (ftype) {
            case "M":
                if (Array.isArray(val)) {
                    newDate.setFullYear(newDate.getFullYear() + val[0]);
                    newDate.setMonth(val[1]);
                }
                else {
                    newDate.setMonth(val);
                }
                break;
            case "Y":
                newDate.setFullYear(val);
                break;
            case "s":
                newDate.setSeconds(val);
                break;
            case "D":
                newDate.setDate(val);
                break;
            case "H":
                newDate.setHours(val);
                break;
            case "m":
                newDate.setMinutes(val);
                break;
        }
        return newDate;
    };
    DateRange.prototype.toLocalString = function (dArray) {
        var r_array = dArray.map(function (x) {
            return x.toLocaleString();
        });
        return r_array;
    };
    DateRange.prototype.monthEnd = function (startDate, endDate) {
        var endMonth = endDate.getMonth();
        var diffYear = endDate.getFullYear() - startDate.getFullYear();
        var endRange = (12 * diffYear) + endMonth;
        return endRange;
    };
    DateRange.prototype.monthRange = function (range) {
        var minus;
        var yVal = 0;
        var dateRange = range.map(function (x) {
            if (x > 11) {
                if (x % 12 == 0) {
                    minus = x;
                    yVal = x / 12;
                    return [yVal, (x - minus)];
                }
                else {
                    return [yVal, (x - minus)];
                }
            }
            return [yVal, x];
        });
        return dateRange;
    };
    DateRange.prototype.dayEnd = function (startDate, endDate) {
        var monthEnd = this.monthEnd(startDate, endDate);
        var range = utils.range(startDate.getMonth(), monthEnd);
        var mRange = this.monthRange(range);
        var sum = 0;
        for (var i = 0; i < mRange.length; i++) {
            var val = mRange[i];
            var dDate = void 0;
            if (i === mRange.length - 1) {
                dDate = new Date(startDate.getUTCFullYear() + val[0], val[1], endDate.getDate()).getDate();
            }
            else {
                dDate = new Date(startDate.getUTCFullYear() + val[0], val[1], 0).getDate();
            }
            sum += dDate;
        }
        return sum;
    };
    return DateRange;
}());
/**
 * Generate sequence of Dates
 * @param start : signify the date to start with
 * @param end : signify the date to end with
 * @param period :  the total number of date to generate
 * @param offset : set the date range offset
 * @param freq: set the date range frequency and offset
 * @return string[]
 */
function dateRange(param) {
    var dateRange = new DateRange(param);
    return dateRange.range();
}
exports.default = dateRange;

}, function(modId) { var map = {"../shared/utils":1711103528396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528427, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.toExcelBrowser = exports.readExcelBrowser = exports.toJSONBrowser = exports.readJSONBrowser = exports.toCSVBrowser = exports.streamCSVBrowser = exports.readCSVBrowser = void 0;
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var io_csv_1 = require("./io.csv");
Object.defineProperty(exports, "readCSVBrowser", { enumerable: true, get: function () { return io_csv_1.$readCSV; } });
Object.defineProperty(exports, "streamCSVBrowser", { enumerable: true, get: function () { return io_csv_1.$streamCSV; } });
Object.defineProperty(exports, "toCSVBrowser", { enumerable: true, get: function () { return io_csv_1.$toCSV; } });
var io_json_1 = require("./io.json");
Object.defineProperty(exports, "readJSONBrowser", { enumerable: true, get: function () { return io_json_1.$readJSON; } });
Object.defineProperty(exports, "toJSONBrowser", { enumerable: true, get: function () { return io_json_1.$toJSON; } });
var io_excel_1 = require("./io.excel");
Object.defineProperty(exports, "readExcelBrowser", { enumerable: true, get: function () { return io_excel_1.$readExcel; } });
Object.defineProperty(exports, "toExcelBrowser", { enumerable: true, get: function () { return io_excel_1.$toExcel; } });

}, function(modId) { var map = {"./io.csv":1711103528428,"./io.excel":1711103528429}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528428, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toCSV = exports.$streamCSV = exports.$readCSV = void 0;
var __1 = require("../../");
var papaparse_1 = __importDefault(require("papaparse"));
/**
 * Reads a CSV file from local or remote location into a DataFrame.
 * @param filePath URL or local file path to CSV file. `readCSV` uses PapaParse to parse the CSV file,
 * hence all PapaParse options are supported.
 * @param options Configuration object. Supports all Papaparse parse config options.
 * @returns DataFrame containing the parsed CSV file.
 * @example
 * ```
 * import { readCSV } from "danfojs-node"
 * const df = await readCSV("https://raw.githubusercontent.com/test.csv")
 * ```
 * @example
 * ```
 * import { readCSV } from "danfojs-node"
 * const df = await readCSV("https://raw.githubusercontent.com/test.csv", {
 *    delimiter: ",",
 *    headers: {
 *      Accept: "text/csv",
 *      Authorization: "Bearer YWRtaW46YWRtaW4="
 *    }
 * })
 * ```
 * @example
 * ```
 * import { readCSV } from "danfojs-node"
 * const df = await readCSV("./data/sample.csv")
 * ```
 */
var $readCSV = function (file, options) { return __awaiter(void 0, void 0, void 0, function () {
    var frameConfig;
    return __generator(this, function (_a) {
        frameConfig = (options === null || options === void 0 ? void 0 : options.frameConfig) || {};
        return [2 /*return*/, new Promise(function (resolve) {
                papaparse_1.default.parse(file, __assign(__assign({ header: true, dynamicTyping: true, skipEmptyLines: 'greedy' }, options), { download: true, complete: function (results) {
                        var df = new __1.DataFrame(results.data, frameConfig);
                        resolve(df);
                    } }));
            })];
    });
}); };
exports.$readCSV = $readCSV;
/**
 * Streams a CSV file from local or remote location in chunks. Intermediate chunks is passed as a DataFrame to the callback function.
 * @param filePath URL or local file path to CSV file. `readCSV` uses PapaParse to parse the CSV file,
 * hence all PapaParse options are supported.
 * @param options Configuration object. Supports all Papaparse parse config options.
 * @param callback Callback function to be called once the specifed rows are parsed into DataFrame.
 * @example
 * ```
 * import { streamCSV } from "danfojs-node"
 * streamCSV("https://raw.githubusercontent.com/test.csv", (dfRow) => {
 *     const dfModified = dfRow["Names"].map((name) => name.split(",")[0])
 *     return dfModified
 * })
 * ```
 */
var $streamCSV = function (file, callback, options) { return __awaiter(void 0, void 0, void 0, function () {
    var frameConfig;
    return __generator(this, function (_a) {
        frameConfig = (options === null || options === void 0 ? void 0 : options.frameConfig) || {};
        return [2 /*return*/, new Promise(function (resolve) {
                var count = 0;
                papaparse_1.default.parse(file, __assign(__assign({}, options), { dynamicTyping: true, header: true, download: true, step: function (results) {
                        var df = new __1.DataFrame([results.data], __assign(__assign({}, frameConfig), { index: [count++] }));
                        callback(df);
                    }, complete: function () { return resolve(null); } }));
            })];
    });
}); };
exports.$streamCSV = $streamCSV;
/**
 * Converts a DataFrame or Series to CSV.
 * @param df DataFrame or Series to be converted to CSV.
 * @param options Configuration object. Supports the following options:
 * - `filePath`: Local file path to write the CSV file. If not specified, the CSV will be returned as a string.
 * - `header`: Boolean indicating whether to include a header row in the CSV file.
 * - `sep`: Character to be used as a separator in the CSV file.
 * @example
 * ```
 * import { toCSV } from "danfojs-node"
 * const df = new DataFrame([[1, 2, 3], [4, 5, 6]])
 * const csv = toCSV(df)
 * ```
 * @example
 * ```
 * import { toCSV } from "danfojs-node"
 * const df = new DataFrame([[1, 2, 3], [4, 5, 6]])
 * toCSV(df, {
 *     filePath: "./data/sample.csv",
 *     header: true,
 *     sep: "+"
 *   })
 * ```
 */
var $toCSV = function (df, options) {
    var _a = __assign({ fileName: "output.csv", sep: ",", header: true, download: false }, options), fileName = _a.fileName, download = _a.download, sep = _a.sep, header = _a.header;
    if (df.$isSeries) {
        var csv = df.values.join(sep);
        if (download) {
            if (!(fileName.endsWith(".csv"))) {
                fileName = fileName + ".csv";
            }
            $downloadFileInBrowser(csv, fileName);
        }
        else {
            return csv;
        }
    }
    else {
        var rows = df.values;
        var csvStr = header === true ? df.columns.join(sep) + "\n" : "";
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i].join(sep) + "\n";
            csvStr += row;
        }
        if (download) {
            if (!(fileName.endsWith(".csv"))) {
                fileName = fileName + ".csv";
            }
            $downloadFileInBrowser(csvStr, fileName);
        }
        else {
            return csvStr;
        }
    }
};
exports.$toCSV = $toCSV;
/**
 * Internal function to download a CSV file in the browser.
 * @param content A string of CSV file contents
 * @param fileName  The name of the file to be downloaded
 */
var $downloadFileInBrowser = function (content, fileName) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(content);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
};

}, function(modId) { var map = {"../../":1711103528394}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528429, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toExcel = exports.$readExcel = void 0;
var __1 = require("../../");
var xlsx_1 = require("xlsx");
/**
 * Reads a JSON file from local or remote location into a DataFrame.
 * @param file URL or local file path to JSON file.
 * @param options Configuration object. Supported options:
 * - `method`: The HTTP method to use. Defaults to `'GET'`.
 * - `headers`: Additional headers to send with the request. Supports the `node-fetch` [HeadersInit]
 * @example
 * ```
 * import { readExcel } from "danfojs-node"
 * const df = await readExcel("https://raw.githubusercontent.com/test.xlsx")
 * ```
 * @example
 * ```
 * import { readExcel } from "danfojs-node"
 * const df = await readExcel("https://raw.githubusercontent.com/test.xlsx", {
 *    method: "GET",
 *    headers: {
 *      Accept: "text/csv",
 *      Authorization: "Bearer YWRtaW46YWRtaW4="
 *    }
 * })
 * ```
 */
var $readExcel = function (file, options) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sheet, method, headers, frameConfig, parsingOptions, arrBuf, arrBufInt8, workbook, worksheet, data, df;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = __assign({ sheet: 0, method: "GET", headers: {}, frameConfig: {}, parsingOptions: {} }, options), sheet = _a.sheet, method = _a.method, headers = _a.headers, frameConfig = _a.frameConfig, parsingOptions = _a.parsingOptions;
                if (!(typeof file === "string" && file.startsWith("http"))) return [3 /*break*/, 1];
                return [2 /*return*/, new Promise(function (resolve) {
                        fetch(file, { method: method, headers: headers }).then(function (response) {
                            if (response.status !== 200) {
                                throw new Error("Failed to load " + file);
                            }
                            response.arrayBuffer().then(function (arrBuf) {
                                var arrBufInt8 = new Uint8Array(arrBuf);
                                var workbook = (0, xlsx_1.read)(arrBufInt8, __assign({ type: "array" }, parsingOptions));
                                var worksheet = workbook.Sheets[workbook.SheetNames[sheet]];
                                var data = xlsx_1.utils.sheet_to_json(worksheet);
                                var df = new __1.DataFrame(data, frameConfig);
                                resolve(df);
                            });
                        }).catch(function (err) {
                            throw new Error(err);
                        });
                    })];
            case 1:
                if (!(file instanceof File)) return [3 /*break*/, 3];
                return [4 /*yield*/, file.arrayBuffer()];
            case 2:
                arrBuf = _b.sent();
                arrBufInt8 = new Uint8Array(arrBuf);
                workbook = (0, xlsx_1.read)(arrBufInt8, __assign({ type: "array" }, parsingOptions));
                worksheet = workbook.Sheets[workbook.SheetNames[sheet]];
                data = xlsx_1.utils.sheet_to_json(worksheet);
                df = new __1.DataFrame(data, frameConfig);
                return [2 /*return*/, df];
            case 3: throw new Error("ParamError: File not supported. file must be a url or an input File object");
        }
    });
}); };
exports.$readExcel = $readExcel;
/**
 * Converts a DataFrame or Series to Excel Sheet.
 * @param df DataFrame or Series to be converted to JSON.
 * @param options Configuration object. Supported options:
 * - `sheetName`: The sheet name to be written to. Defaults to `'Sheet1'`.
 * - `fileName`: The file to be written to. Defaults to `'./output.xlsx'`.
 * @example
 * ```
 * import { toExcel } from "danfojs-node"
 * const df = new DataFrame([[1, 2, 3], [4, 5, 6]])
 * toExcel(df, {
 *     fileName: "./data/sample.xlsx",
 *     sheetName: "MySheet",
 *   })
 * ```
 */
var $toExcel = function (df, options) {
    var _a = __assign({ fileName: "./output.xlsx", sheetName: "Sheet1" }, options), fileName = _a.fileName, sheetName = _a.sheetName, writingOptions = _a.writingOptions;
    if (!(fileName.endsWith(".xlsx"))) {
        fileName = fileName + ".xlsx";
    }
    var data;
    if (df.$isSeries) {
        var row = df.values;
        var col = df.columns;
        data = __spreadArray([col], (row.map(function (x) { return [x]; })), true);
    }
    else {
        var row = df.values;
        var cols = df.columns;
        data = __spreadArray([cols], row, true);
    }
    var worksheet = xlsx_1.utils.aoa_to_sheet(data);
    var wb = xlsx_1.utils.book_new();
    xlsx_1.utils.book_append_sheet(wb, worksheet, sheetName);
    (0, xlsx_1.writeFile)(wb, "" + fileName, writingOptions);
};
exports.$toExcel = $toExcel;

}, function(modId) { var map = {"../../":1711103528394}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528430, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var frame_1 = __importDefault(require("../../../danfojs-base/core/frame"));
/**
 * Two-dimensional ndarray with axis labels.
 * The object supports both integer- and label-based indexing and provides a host of methods for performing operations involving the index.
 * Operations between DataFrame (+, -, /, , *) align values based on their associated index values– they need not be the same length.
 * @param data 2D Array, JSON, Tensor, Block of data.
 * @param options.index Array of numeric or string names for subseting array. If not specified, indexes are auto generated.
 * @param options.columns Array of column names. If not specified, column names are auto generated.
 * @param options.dtypes Array of data types for each the column. If not specified, dtypes are/is inferred.
 * @param options.config General configuration object for extending or setting NDframe behavior.
 */
var DataFrame = /** @class */ (function (_super) {
    __extends(DataFrame, _super);
    function DataFrame(data, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, data, options) || this;
    }
    return DataFrame;
}(frame_1.default));
exports.default = DataFrame;

}, function(modId) { var map = {"../../../danfojs-base/core/frame":1711103528403}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1711103528431, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
*  @license
* Copyright 2022 JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
var series_1 = __importDefault(require("../../../danfojs-base/core/series"));
/**
 * One-dimensional ndarray with axis labels.
 * The object supports both integer- and label-based indexing and provides a host of methods for performing operations involving the index.
 * Operations between Series (+, -, /, , *) align values based on their associated index values – they need not be the same length.
 * @param data 1D Array, JSON, Tensor, Block of data.
 * @param options.index Array of numeric or string index for subseting array. If not specified, indices are auto generated.
 * @param options.columns Column name. This is like the name of the Series. If not specified, column name is set to 0.
 * @param options.dtypes Data types of the Series data. If not specified, dtypes is inferred.
 * @param options.config General configuration object for extending or setting Series behavior.
 */
var Series = /** @class */ (function (_super) {
    __extends(Series, _super);
    function Series(data, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, data, options) || this;
    }
    return Series;
}(series_1.default));
exports.default = Series;

}, function(modId) { var map = {"../../../danfojs-base/core/series":1711103528401}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1711103528393);
})()
//miniprogram-npm-outsideDeps=["@tensorflow/tfjs","mathjs","table","plotly.js-dist-min","./io.json","papaparse","xlsx"]
//# sourceMappingURL=index.js.map