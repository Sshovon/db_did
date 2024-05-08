var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/reflect-metadata/Reflect.js
var Reflect2;
(function(Reflect3) {
  (function(factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect3);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect3;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter);
    function makeExporter(target, previous) {
      return function(key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, { configurable: true, writable: true, value });
        }
        if (previous)
          previous(key, value);
      };
    }
  })(function(exporter) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function";
    var supportsProto = { __proto__: [] } instanceof Array;
    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate ? function() {
        return MakeDictionary(/* @__PURE__ */ Object.create(null));
      } : supportsProto ? function() {
        return MakeDictionary({ __proto__: null });
      } : function() {
        return MakeDictionary({});
      },
      has: downLevel ? function(map, key) {
        return hasOwn.call(map, key);
      } : function(map, key) {
        return key in map;
      },
      get: downLevel ? function(map, key) {
        return hasOwn.call(map, key) ? map[key] : void 0;
      } : function(map, key) {
        return map[key];
      }
    };
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process["env"] && process["env"]["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var Metadata = new _WeakMap();
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsObject(target))
          throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
          throw new TypeError();
        if (IsNull(attributes))
          attributes = void 0;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators))
          throw new TypeError();
        if (!IsConstructor(target))
          throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }
    exporter("decorate", decorate);
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
          throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      return decorator;
    }
    exporter("metadata", metadata);
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    exporter("defineMetadata", defineMetadata);
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target))
        throw new TypeError();
      if (!IsUndefined(propertyKey))
        propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(
        target,
        propertyKey,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return false;
      if (!metadataMap.delete(metadataKey))
        return false;
      if (metadataMap.size > 0)
        return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0)
        return true;
      Metadata.delete(target);
      return true;
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated))
            throw new TypeError();
          target = decorated;
        }
      }
      return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated))
            throw new TypeError();
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);
      if (IsUndefined(targetMetadata)) {
        if (!Create)
          return void 0;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }
      var metadataMap = targetMetadata.get(P);
      if (IsUndefined(metadataMap)) {
        if (!Create)
          return void 0;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }
      return metadataMap;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn2)
        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent))
        return OrdinaryGetMetadata(MetadataKey, parent, P);
      return void 0;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return void 0;
      return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        true
      );
      metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O, P) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null)
        return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0)
        return ownKeys;
      if (ownKeys.length <= 0)
        return parentKeys;
      var set = new _Set();
      var keys = [];
      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      return keys;
    }
    function OrdinaryOwnMetadataKeys(O, P) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P,
        /*Create*/
        false
      );
      if (IsUndefined(metadataMap))
        return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;
      while (true) {
        var next = IteratorStep(iterator);
        if (!next) {
          keys.length = k;
          return keys;
        }
        var nextValue = IteratorValue(next);
        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }
        k++;
      }
    }
    function Type(x) {
      if (x === null)
        return 1;
      switch (typeof x) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return x === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function IsUndefined(x) {
      return x === void 0;
    }
    function IsNull(x) {
      return x === null;
    }
    function IsSymbol(x) {
      return typeof x === "symbol";
    }
    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0:
          return input;
        case 1:
          return input;
        case 2:
          return input;
        case 3:
          return input;
        case 4:
          return input;
        case 5:
          return input;
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== void 0) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result))
          throw new TypeError();
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result))
            return result;
        }
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
      } else {
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result))
            return result;
        }
        var toString_2 = O.toString;
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result))
            return result;
        }
      }
      throw new TypeError();
    }
    function ToBoolean(argument) {
      return !!argument;
    }
    function ToString(argument) {
      return "" + argument;
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(
        argument,
        3
        /* String */
      );
      if (IsSymbol(key))
        return key;
      return ToString(key);
    }
    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    }
    function IsCallable(argument) {
      return typeof argument === "function";
    }
    function IsConstructor(argument) {
      return typeof argument === "function";
    }
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    }
    function GetMethod(V, P) {
      var func = V[P];
      if (func === void 0 || func === null)
        return void 0;
      if (!IsCallable(func))
        throw new TypeError();
      return func;
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method))
        throw new TypeError();
      var iterator = method.call(obj);
      if (!IsObject(iterator))
        throw new TypeError();
      return iterator;
    }
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    }
    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f)
        f.call(iterator);
    }
    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype)
        return proto;
      if (proto !== functionPrototype)
        return proto;
      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype)
        return proto;
      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function")
        return proto;
      if (constructor === O)
        return proto;
      return constructor;
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];
      var MapIterator = (
        /** @class */
        function() {
          function MapIterator2(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return { value: result, done: false };
            }
            return { value: void 0, done: true };
          };
          MapIterator2.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return { value, done: true };
          };
          return MapIterator2;
        }()
      );
      return (
        /** @class */
        function() {
          function Map2() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map2.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map2.prototype.has = function(key) {
            return this._find(
              key,
              /*insert*/
              false
            ) >= 0;
          };
          Map2.prototype.get = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            return index >= 0 ? this._values[index] : void 0;
          };
          Map2.prototype.set = function(key, value) {
            var index = this._find(
              key,
              /*insert*/
              true
            );
            this._values[index] = value;
            return this;
          };
          Map2.prototype.delete = function(key) {
            var index = this._find(
              key,
              /*insert*/
              false
            );
            if (index >= 0) {
              var size = this._keys.length;
              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }
              this._keys.length--;
              this._values.length--;
              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map2.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map2.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map2.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map2.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map2.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map2.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map2.prototype._find = function(key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(void 0);
            }
            return this._cacheIndex;
          };
          return Map2;
        }()
      );
      function getKey(key, _) {
        return key;
      }
      function getValue(_, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    function CreateSetPolyfill() {
      return (
        /** @class */
        function() {
          function Set2() {
            this._map = new _Map();
          }
          Object.defineProperty(Set2.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set2.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set2.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set2.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set2.prototype.clear = function() {
            this._map.clear();
          };
          Set2.prototype.keys = function() {
            return this._map.keys();
          };
          Set2.prototype.values = function() {
            return this._map.values();
          };
          Set2.prototype.entries = function() {
            return this._map.entries();
          };
          Set2.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set2.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set2;
        }()
      );
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (
        /** @class */
        function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? HashMap.get(table, this._key) : void 0;
          };
          WeakMap2.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              true
            );
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            );
            return table !== void 0 ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }()
      );
      function CreateUniqueKey() {
        var key;
        do
          key = "@@WeakMap@@" + CreateUUID();
        while (HashMap.has(keys, key));
        keys[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create)
            return void 0;
          Object.defineProperty(target, rootKey, { value: HashMap.create() });
        }
        return target[rootKey];
      }
      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i)
          buffer[i] = Math.random() * 255 | 0;
        return buffer;
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined")
            return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined")
            return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }
        return FillRandomBytes(new Array(size), size);
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE);
        data[6] = data[6] & 79 | 64;
        data[8] = data[8] & 191 | 128;
        var result = "";
        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8)
            result += "-";
          if (byte < 16)
            result += "0";
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    function MakeDictionary(obj) {
      obj.__ = void 0;
      delete obj.__;
      return obj;
    }
  });
})(Reflect2 || (Reflect2 = {}));

// src/ledger/model/schema.ts
import mongoose from "mongoose";
var DbSchema = new mongoose.Schema({
  issuerId: { type: String, required: true },
  name: { type: String, required: true },
  version: { type: String, required: true },
  attrNames: { type: [String], required: true },
  schemaId: { type: String, required: true }
});
var DbSchemaModel = mongoose.model("DbSchema", DbSchema);

// src/ledger/controller/schema.ts
import { utils } from "@aries-framework/core";

// src/ledger/controller/db.ts
import mongoose2 from "mongoose";
var connect = async (databaseUrl) => {
  try {
    await mongoose2.connect(databaseUrl ?? "mongodb://localhost:27017/ledger");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
var disconnect = async () => {
  try {
    await mongoose2.disconnect();
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
};

// src/ledger/controller/schema.ts
async function storeSchema(options) {
  try {
    await connect();
    const schema = options.schema;
    const schemaResourceId = utils.uuid();
    const schemaId = `${schema.issuerId}/resources/schema/${schemaResourceId}`;
    const newSchema = new DbSchemaModel({
      schemaId,
      issuerId: schema.issuerId,
      name: schema.name,
      version: schema.version,
      attrNames: schema.attrNames
    });
    await newSchema.save();
    await disconnect();
    return {
      schemaId,
      issuerId: schema.issuerId,
      name: schema.name,
      version: schema.version,
      attrNames: schema.attrNames
    };
  } catch (e) {
    await disconnect();
    throw new Error(e.message);
  }
}
async function retrieveSchema(options) {
  try {
    await connect();
    const schema = await DbSchemaModel.findOne({ schemaId: options.schemaId });
    if (!schema) {
      throw new Error("Schema not found");
    }
    await disconnect();
    return {
      schemaId: schema.schemaId,
      issuerId: schema.issuerId,
      name: schema.name,
      version: schema.version,
      attrNames: schema.attrNames
    };
  } catch (e) {
    await disconnect();
    throw new Error(e.message);
  }
}

// src/ledger/controller/credentialDefintion.ts
import { utils as utils2 } from "@aries-framework/core";

// src/ledger/model/credentialDefinition.ts
import mongoose3 from "mongoose";
var CredentialDefinitionSchema = new mongoose3.Schema({
  issuerId: { type: String, required: true },
  schemaId: { type: String, required: true },
  credentialDefinitionId: { type: String, required: true },
  value: { type: Object, required: true },
  tag: { type: String, required: true },
  type: { type: String, required: true }
});
var DbCredentialDefinitionModel = mongoose3.model("DbCredentialDefinition", CredentialDefinitionSchema);

// src/ledger/controller/credentialDefintion.ts
async function storeCredentialDefinition(options) {
  try {
    await connect();
    const credDef = options.credDef;
    const credDefResourceId = utils2.uuid();
    const credentialDefinitionId = `${credDef.issuerId}/resources/credential-definition/${credDefResourceId}`;
    const newCredDef = new DbCredentialDefinitionModel({
      credentialDefinitionId,
      issuerId: credDef.issuerId,
      schemaId: credDef.schemaId,
      tag: credDef.tag,
      value: credDef.value,
      type: "CL"
    });
    await newCredDef.save();
    await disconnect();
    return {
      credentialDefinitionId,
      issuerId: credDef.issuerId,
      schemaId: credDef.schemaId,
      tag: credDef.tag,
      value: credDef.value,
      type: credDef.type
    };
  } catch (e) {
    throw new Error(e.message);
  }
}
async function retrieveCredentialDefinition(options) {
  try {
    await connect();
    const credDef = await DbCredentialDefinitionModel.findOne({ credentialDefinitionId: options.credentialDefinitionId });
    if (!credDef) {
      throw new Error("Credential Definition not found");
    }
    await disconnect();
    return {
      credentialDefinitionId: credDef.credentialDefinitionId,
      issuerId: credDef.issuerId,
      schemaId: credDef.schemaId,
      tag: credDef.tag,
      value: credDef.value,
      type: credDef.type
    };
  } catch (e) {
    await disconnect();
    throw new Error(e.message);
  }
}

// src/anoncreds/services/DbAnonCredsRegistry.ts
var DbAnonCredsRegistry = class {
  async getSchema(agentContext, schemaId) {
    try {
      const schema = await retrieveSchema({ schemaId });
      return {
        schema: {
          issuerId: schema.issuerId,
          name: schema.name,
          version: schema.version,
          attrNames: schema.attrNames
        },
        schemaMetadata: {},
        schemaId: schema.schemaId,
        resolutionMetadata: {}
      };
    } catch (e) {
      return {
        schemaId,
        resolutionMetadata: {
          error: e.message || "notFound"
        },
        schemaMetadata: {}
      };
    }
  }
  async registerSchema(agentContext, options) {
    try {
      const schema = options.schema;
      const result = await storeSchema({ schema });
      return {
        schemaState: {
          state: "finished",
          schema,
          schemaId: result.schemaId
        },
        registrationMetadata: {},
        schemaMetadata: {}
      };
    } catch (error) {
      agentContext.config.logger.debug(`Error registering schema for did '${options.schema.issuerId}'`, {
        error,
        did: options.schema.issuerId,
        schema: options
      });
      return {
        schemaMetadata: {},
        registrationMetadata: {},
        schemaState: {
          state: "failed",
          schema: options.schema,
          reason: `unknownError: ${error.message}`
        }
      };
    }
  }
  async getCredentialDefinition(agentContext, credentialDefinitionId) {
    try {
      const credentialDefinition = await retrieveCredentialDefinition({ credentialDefinitionId });
      return {
        credentialDefinitionId: credentialDefinition.credentialDefinitionId,
        credentialDefinition: {
          issuerId: credentialDefinition.issuerId,
          schemaId: credentialDefinition.schemaId,
          tag: credentialDefinition.tag,
          value: credentialDefinition.value,
          type: "CL"
        },
        credentialDefinitionMetadata: {},
        resolutionMetadata: {}
      };
    } catch (e) {
      return {
        credentialDefinitionId,
        credentialDefinitionMetadata: {},
        resolutionMetadata: {
          error: e.message || "notFound",
          message: `unable to resolve credential definition: ${e.message}`
        }
      };
    }
  }
  async registerCredentialDefinition(agentContext, options) {
    try {
      const result = await storeCredentialDefinition({ credDef: options.credentialDefinition });
      return {
        credentialDefinitionMetadata: {},
        registrationMetadata: {},
        credentialDefinitionState: {
          credentialDefinition: options.credentialDefinition,
          credentialDefinitionId: result.credentialDefinitionId,
          state: "finished"
        }
      };
    } catch (e) {
      return {
        credentialDefinitionMetadata: {},
        registrationMetadata: {},
        credentialDefinitionState: {
          credentialDefinition: options.credentialDefinition,
          state: "failed",
          reason: `unknownError`
        }
      };
    }
  }
  getRevocationRegistryDefinition(agentContext, revocationRegistryDefinitionId) {
    throw new Error("Method not implemented.");
  }
  getRevocationStatusList(agentContext, revocationRegistryId, timestamp) {
    throw new Error("Method not implemented.");
  }
  methodName = "db";
  supportedIdentifier = /^did:db:[_a-z0-9.%A-]*/;
};

// src/DbModule.ts
import { AgentConfig, injectable } from "@aries-framework/core";
var DbModule = class {
  constructor() {
  }
  register(dependencyManager) {
    dependencyManager.resolve(AgentConfig);
  }
  async initialize(agentContext) {
  }
};
DbModule = __decorateClass([
  injectable()
], DbModule);

// src/dids/DbDidRegistrar.ts
import {
  DidDocumentRole,
  DidRecord,
  DidRepository
} from "@aries-framework/core";

// src/dids/DidKey.ts
import { Key as Key2, parseDid } from "@aries-framework/core";

// src/dids/keyDidDocument.ts
import {
  Key,
  KeyType,
  AriesFrameworkError,
  SECURITY_CONTEXT_BBS_URL,
  SECURITY_JWS_CONTEXT_URL,
  SECURITY_X25519_CONTEXT_URL,
  DidDocumentBuilder,
  getBls12381g1g2VerificationMethod,
  convertPublicKeyToX25519,
  getBls12381G1Key2020,
  getBls12381G2Key2020,
  getEd25519VerificationKey2018,
  getJsonWebKey2020,
  getX25519KeyAgreementKey2019
} from "@aries-framework/core";
var didDocumentKeyTypeMapping = {
  [KeyType.Ed25519]: getEd25519DidDoc,
  [KeyType.X25519]: getX25519DidDoc,
  [KeyType.Bls12381g1]: getBls12381g1DidDoc,
  [KeyType.Bls12381g2]: getBls12381g2DidDoc,
  [KeyType.Bls12381g1g2]: getBls12381g1g2DidDoc,
  [KeyType.P256]: getJsonWebKey2020DidDocument,
  [KeyType.P384]: getJsonWebKey2020DidDocument,
  [KeyType.P521]: getJsonWebKey2020DidDocument
};
function getDidDocumentForKey(did, key) {
  const getDidDocument = didDocumentKeyTypeMapping[key.keyType];
  return getDidDocument(did, key);
}
function getBls12381g1DidDoc(did, key) {
  const verificationMethod = getBls12381G1Key2020({ id: `${did}#${key.fingerprint}`, key, controller: did });
  return getSignatureKeyBase({
    did,
    key,
    verificationMethod
  }).addContext(SECURITY_CONTEXT_BBS_URL).build();
}
function getBls12381g1g2DidDoc(did, key) {
  const verificationMethods = getBls12381g1g2VerificationMethod(did, key);
  const didDocumentBuilder = new DidDocumentBuilder(did);
  for (const verificationMethod of verificationMethods) {
    didDocumentBuilder.addVerificationMethod(verificationMethod).addAuthentication(verificationMethod.id).addAssertionMethod(verificationMethod.id).addCapabilityDelegation(verificationMethod.id).addCapabilityInvocation(verificationMethod.id);
  }
  return didDocumentBuilder.addContext(SECURITY_CONTEXT_BBS_URL).build();
}
function getJsonWebKey2020DidDocument(did, key) {
  const verificationMethod = getJsonWebKey2020({ did, key });
  const didDocumentBuilder = new DidDocumentBuilder(did);
  didDocumentBuilder.addContext(SECURITY_JWS_CONTEXT_URL).addVerificationMethod(verificationMethod);
  if (!key.supportsEncrypting && !key.supportsSigning) {
    throw new AriesFrameworkError("Key must support at least signing or encrypting");
  }
  if (key.supportsSigning) {
    didDocumentBuilder.addAuthentication(verificationMethod.id).addAssertionMethod(verificationMethod.id).addCapabilityDelegation(verificationMethod.id).addCapabilityInvocation(verificationMethod.id);
  }
  if (key.supportsEncrypting) {
    didDocumentBuilder.addKeyAgreement(verificationMethod.id);
  }
  return didDocumentBuilder.build();
}
function getEd25519DidDoc(did, key) {
  const verificationMethod = getEd25519VerificationKey2018({ id: `${did}#${key.fingerprint}`, key, controller: did });
  const publicKeyX25519 = convertPublicKeyToX25519(key.publicKey);
  const didKeyX25519 = Key.fromPublicKey(publicKeyX25519, KeyType.X25519);
  const x25519VerificationMethod = getX25519KeyAgreementKey2019({
    id: `${did}#${didKeyX25519.fingerprint}`,
    key: didKeyX25519,
    controller: did
  });
  const didDocBuilder = getSignatureKeyBase({ did, key, verificationMethod });
  didDocBuilder.addContext(SECURITY_X25519_CONTEXT_URL).addKeyAgreement(x25519VerificationMethod);
  return didDocBuilder.build();
}
function getX25519DidDoc(did, key) {
  const verificationMethod = getX25519KeyAgreementKey2019({ id: `${did}#${key.fingerprint}`, key, controller: did });
  const document = new DidDocumentBuilder(did).addKeyAgreement(verificationMethod).addContext(SECURITY_X25519_CONTEXT_URL).build();
  return document;
}
function getBls12381g2DidDoc(did, key) {
  const verificationMethod = getBls12381G2Key2020({ id: `${did}#${key.fingerprint}`, key, controller: did });
  return getSignatureKeyBase({
    did,
    key,
    verificationMethod
  }).addContext(SECURITY_CONTEXT_BBS_URL).build();
}
function getSignatureKeyBase({
  did,
  key,
  verificationMethod
}) {
  const keyId = `${did}#${key.fingerprint}`;
  return new DidDocumentBuilder(did).addVerificationMethod(verificationMethod).addAuthentication(keyId).addAssertionMethod(keyId).addCapabilityDelegation(keyId).addCapabilityInvocation(keyId);
}

// src/dids/DidKey.ts
var DidKey = class _DidKey {
  key;
  constructor(key) {
    this.key = key;
  }
  static fromDid(did) {
    const parsed = parseDid(did);
    const key = Key2.fromFingerprint(parsed.id);
    return new _DidKey(key);
  }
  get did() {
    return `did:db:${this.key.fingerprint}`;
  }
  get didDocument() {
    return getDidDocumentForKey(this.did, this.key);
  }
};

// src/dids/DbDidRegistrar.ts
var DbDidRegistrar = class {
  supportedMethods = ["db"];
  async create(agentContext, options) {
    const keyType = options.options.keyType;
    const seed = options.secret?.seed;
    const privateKey = options.secret?.privateKey;
    if (!keyType) {
      return {
        didDocumentMetadata: {},
        didRegistrationMetadata: {},
        didState: {
          state: "failed",
          reason: "Missing key type"
        }
      };
    }
    try {
      const key = await agentContext.wallet.createKey({
        keyType,
        seed,
        privateKey
      });
      const didKey = new DidKey(key);
      const didRecord = new DidRecord({
        did: didKey.did,
        role: DidDocumentRole.Created
      });
      const didRepository = agentContext.dependencyManager.resolve(DidRepository);
      await didRepository.save(agentContext, didRecord);
      return {
        didDocumentMetadata: {},
        didRegistrationMetadata: {},
        didState: {
          state: "finished",
          did: didKey.did,
          didDocument: didKey.didDocument,
          secret: {
            // FIXME: the uni-registrar creates the seed in the registrar method
            // if it doesn't exist so the seed can always be returned. Currently
            // we can only return it if the seed was passed in by the user. Once
            // we have a secure method for generating seeds we should use the same
            // approach
            seed: options.secret?.seed,
            privateKey: options.secret?.privateKey
          }
        }
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          didDocumentMetadata: {},
          didRegistrationMetadata: {},
          didState: {
            state: "failed",
            reason: `unknownError: ${error.message}`
          }
        };
      }
      return {
        didDocumentMetadata: {},
        didRegistrationMetadata: {},
        didState: {
          state: "failed",
          reason: `unknownError: ${error}`
        }
      };
    }
  }
  async update() {
    return {
      didDocumentMetadata: {},
      didRegistrationMetadata: {},
      didState: {
        state: "failed",
        reason: `notSupported: cannot update did:key did`
      }
    };
  }
  async deactivate() {
    return {
      didDocumentMetadata: {},
      didRegistrationMetadata: {},
      didState: {
        state: "failed",
        reason: `notSupported: cannot deactivate did:key did`
      }
    };
  }
};

// src/dids/DbDidResolver.ts
import { DidKey as DidKey2 } from "@aries-framework/core";
var DbDidResolver = class {
  supportedMethods = ["db"];
  async resolve(agentContext, did) {
    const didDocumentMetadata = {};
    try {
      const didDocument = DidKey2.fromDid(did).didDocument;
      return {
        didDocument,
        didDocumentMetadata,
        didResolutionMetadata: { contentType: "application/did+ld+json" }
      };
    } catch (error) {
      return {
        didDocument: null,
        didDocumentMetadata,
        didResolutionMetadata: {
          error: "notFound",
          message: `resolver_error: Unable to resolve did '${did}': ${error}`
        }
      };
    }
  }
};
export {
  DbAnonCredsRegistry,
  DbDidRegistrar,
  DbDidResolver,
  DbModule
};
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
//# sourceMappingURL=index.mjs.map