import "./chunk-X6JV76XL.js";

// node_modules/@pqina/flip/tick/tick.core.module.js
var tick_core_module_default = typeof window !== "undefined" ? function() {
  if (!module) {
    var module = {};
  }
  "use strict";
  var ExtensionType = {
    FONT: "font",
    VIEW: "view",
    TRANSFORM: "transform",
    EASING_FUNCTION: "easing-function",
    TRANSITION: "transition"
  };
  var Extensions = {};
  Extensions[ExtensionType.FONT] = {};
  Extensions[ExtensionType.VIEW] = {};
  Extensions[ExtensionType.TRANSFORM] = {};
  Extensions[ExtensionType.EASING_FUNCTION] = {};
  Extensions[ExtensionType.TRANSITION] = {};
  var addExtensions = function addExtensions2(type2, extensions) {
    if (!Extensions[type2]) {
      return null;
    }
    for (var name in extensions) {
      if (!extensions.hasOwnProperty(name)) {
        continue;
      }
      if (Extensions[type2][name]) {
        return null;
      }
      Extensions[type2][name] = extensions[name];
    }
  };
  var addExtension = function addExtension2(type2, name, fn) {
    if (!Extensions[type2]) {
      throw `Can't add extension with type of "` + type2 + '", "' + type2 + '" is not a valid extension type. The following types are valid: ' + keysToList(Extensions);
    }
    if (!/^[-a-z]+$/.test(name)) {
      throw `Can't add extension with name "` + name + '", "' + name + '" is contains invalid characters. Only lowercase alphabetical characters and dashes are allowed.';
    }
    if (Extensions[type2][name]) {
      throw `Can't add extension with name "` + name + '", "' + name + '" is already added.';
    }
    Extensions[type2][name] = fn;
  };
  var getExtension = function getExtension2(type2, name) {
    if (!Extensions[type2]) {
      throw `Can't get extension with type of "` + type2 + '", "' + type2 + '" is not a valid extension type. The following types are available: ' + keysToList(Extensions);
    }
    if (!Extensions[type2][name]) {
      throw `Can't get extension with name "` + name + '", "' + name + '" is not available. The following extensions are available: ' + keysToList(Extensions[type2]);
    }
    return Extensions[type2][name];
  };
  var MILLISECOND = 1;
  var SECOND = 1e3;
  var MINUTE = 6e4;
  var HOUR = 36e5;
  var DAY = 864e5;
  var WEEK = 6048e5;
  var MONTH = 2628e6;
  var YEAR = 31536e6;
  var TimeUnit = {
    "Week": WEEK,
    "Day": DAY,
    "Hour": HOUR,
    "Minute": MINUTE,
    "Second": SECOND,
    "Millisecond": MILLISECOND,
    "Month": MONTH,
    "Year": YEAR
  };
  var Months = ["Januari", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  for (var key in TimeUnit) {
    if (!TimeUnit.hasOwnProperty(key)) {
      continue;
    }
    var val = TimeUnit[key];
    if (val === MILLISECOND) {
      TimeUnit["mi"] = val;
      TimeUnit["ms"] = val;
    } else if (val === MONTH) {
      TimeUnit["M"] = val;
    } else {
      TimeUnit[key.charAt(0).toLowerCase()] = val;
    }
    TimeUnit[key.toLowerCase()] = val;
    TimeUnit[key.toLowerCase() + "s"] = val;
  }
  var Days = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0
  };
  var MonthFactor = {
    "M": 1,
    "y": 12
  };
  var serverDate = function serverDate2(cb) {
    var xhr = new XMLHttpRequest();
    var now2 = Date.now();
    xhr.open("HEAD", window.location + "?noCache=" + now2);
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.onload = function() {
      var correction = (now2 - Date.now()) * 0.5;
      var responseDate = new Date(xhr.getResponseHeader("Date"));
      cb(new Date(responseDate.getTime() + correction));
    };
    xhr.send();
  };
  var isDate = function isDate2(date) {
    return date instanceof Date;
  };
  var setTime = function setTime2(date, time2) {
    date.setHours(time2[0] || 0, time2[1] || 0, time2[2] || 0, time2[3] || 0);
    return date;
  };
  var setDay = function setDay2(date, day) {
    var current = date.getDay();
    var dist = day - current;
    date.setDate(date.getDate() + dist);
    return date;
  };
  var setDayOfMonth = function setDayOfMonth2(date, day) {
    var totalDays = daysInMonth(date.getMonth() + 1, date.getFullYear());
    day = day === "last" ? totalDays : Math.max(1, Math.min(totalDays, day));
    date.setDate(day);
    return date;
  };
  var setMonth = function setMonth2(date, month) {
    date.setMonth(Months.map(function(m) {
      return m.toLowerCase();
    }).indexOf(month));
    return date;
  };
  var toTimezoneOffset = function toTimezoneOffset2(ISO8601Timezone) {
    var current = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4;
    if (ISO8601Timezone === "Z") {
      return current;
    }
    var parts = ISO8601Timezone.match(/\+|-|[\d]{2}|[\d]{2}/g);
    var multiplier = parts.shift() === "-" ? -1 : 1;
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    return multiplier * (hours * 36e5 + minutes * 6e4) + current;
  };
  var offsetDate = function offsetDate2(offset) {
    return new Date(Date.now() + offset);
  };
  var timezoneDate = function timezoneDate2(date, offset) {
    return new Date(date.getTime() + offset);
  };
  var sameDate = function sameDate2(a, b) {
    return a.toDateString() === b.toDateString();
  };
  var sameTime = function sameTime2(a, b) {
    return a.getTime() === b.getTime();
  };
  var daysInMonth = function daysInMonth2(month, year) {
    return new Date(year, month, 0).getDate();
  };
  var dateFromISO = function dateFromISO2(iso) {
    if (iso.match(/(Z)|([+\-][0-9]{2}:?[0-9]*$)/g)) {
      return new Date(iso);
    }
    iso += iso.indexOf("T") !== -1 ? "Z" : "";
    return dateToLocal(new Date(iso));
  };
  var dateToLocal = function dateToLocal2(date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 6e4);
  };
  var timeDuration = function timeDuration2(milliseconds, components) {
    return components.map(function(key2) {
      var requiredMilliseconds = TimeUnit[key2];
      var count = Math.max(0, Math.floor(milliseconds / requiredMilliseconds));
      milliseconds = milliseconds % requiredMilliseconds;
      return count;
    });
  };
  var dateDiff = function dateDiff2(a, b, components) {
    var diff = b - a;
    var swapped = false;
    if (diff < 0) {
      diff = a - b;
      var _ref = [b, a];
      a = _ref[0];
      b = _ref[1];
      swapped = true;
    }
    if (!components) {
      components = ["d", "h", "m"];
    }
    var mIndex = components.indexOf("m");
    if (mIndex >= 0 && (components[mIndex - 1] === "y" || components[mIndex + 1] === "d")) {
      components[mIndex].key = "M";
    }
    var anchor = void 0;
    var monthsRemaining = void 0;
    var months = void 0;
    var presentsYears = components.includes("y");
    var presentsMonths = components.includes("M");
    if (presentsMonths || presentsYears) {
      anchor = new Date(a.valueOf() + diff);
      monthsRemaining = diffInMonths(anchor, a);
      months = presentsMonths ? Math.floor(monthsRemaining) : Math.floor(monthsRemaining / 12) * 12;
      diff = anchor.valueOf() - addMonths(clone$1(a), months).valueOf();
    }
    var output = components.map(function(key2) {
      if (key2 === "y" || key2 === "M") {
        var _count = Math.max(0, Math.floor(monthsRemaining / MonthFactor[key2]));
        monthsRemaining -= _count * MonthFactor[key2];
        return _count;
      }
      var requiredMilliseconds = TimeUnit[key2];
      var count = Math.max(0, Math.floor(diff / requiredMilliseconds));
      diff = diff % requiredMilliseconds;
      return count;
    });
    return swapped ? output.map(function(v) {
      return v > 0 ? -v : v;
    }) : output;
  };
  var duration = function duration2() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[0] === "number" && typeof args[1] === "string") {
      if (!TimeUnit[args[1]]) {
        throw '"' + args[1] + '" is not a valid amount.';
      }
      return args[0] * TimeUnit[args[1]];
    }
    if (isDate(args[0])) {
      return dateDiff.apply(void 0, args);
    }
    if (typeof args[0] === "number" && Array.isArray(args[1])) {
      return timeDuration.apply(void 0, args);
    }
    return null;
  };
  var now$1 = function now2() {
    return /* @__PURE__ */ new Date();
  };
  var clone$1 = function clone2(date) {
    return new Date(date.valueOf());
  };
  var addMonths = function addMonths2(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  };
  var diffInMonths = function diffInMonths2(a, b) {
    var wholeMonthDiff = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
    var anchor = addMonths(clone$1(a), wholeMonthDiff);
    var anchor2 = void 0;
    var adjust = void 0;
    if (b - anchor < 0) {
      anchor2 = addMonths(clone$1(a), wholeMonthDiff - 1);
      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = addMonths(clone$1(a), wholeMonthDiff + 1);
      adjust = (b - anchor) / (anchor2 - anchor);
    }
    return -(wholeMonthDiff + adjust);
  };
  var destroyer = function(state) {
    return {
      destroy: function destroy2() {
        state.destroyed = true;
        if (state.frame) {
          cancelAnimationFrame(state.frame);
        }
        if (state.styleObserver) {
          state.styleObserver.disconnect();
        }
        if (state.didResizeWindow) {
          window.removeEventListener("resize", state.didResizeWindow);
        }
        if (state.root && state.root.parentNode) {
          state.root.parentNode.removeChild(state.root);
        }
      }
    };
  };
  var rooter = function(state) {
    var root = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document.createElement("span");
    var name = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    state.root = root;
    state.aligned = null;
    state.destroyed = false;
    if (root && name) {
      state.root.classList.add("tick-" + name);
      state.root.setAttribute("data-view", name);
    }
    if (root && root.dataset.layout) {
      state.align = (root.dataset.layout.match(/left|right|center/) || [])[0] || "left";
    }
    return {
      appendTo: function appendTo(element) {
        var location = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "last";
        if (!state.root || state.root && state.root.parentNode) {
          return;
        }
        if (location === "last") {
          if (element.childNodes.length && element.childNodes[element.childNodes.length - 1].nodeType === Node.TEXT_NODE) {
            element.insertBefore(state.root, element.childNodes[element.childNodes.length - 1]);
          } else {
            element.appendChild(state.root);
          }
          return;
        }
        if (location === "first") {
          if (element.childNodes.length === 0) {
            element.appendChild(state.root);
          } else if (element.children.length === 0 && element.childNodes.length) {
            element.insertBefore(state.root, element.childNodes[element.childNodes.length - 1]);
          } else {
            element.insertBefore(state.root, element.children[0]);
          }
        }
        if (typeof location !== "string") {
          element.insertBefore(state.root, location);
        }
      }
    };
  };
  var grouper = function(state, definition) {
    state.definition = definition;
    return {
      setDefinition: function setDefinition(definition2) {
        state.definition = definition2;
      }
    };
  };
  var drawer = function(state, _draw, drawViews2, present) {
    return {
      draw: function draw2() {
        if (!state.dirty) {
          if (drawViews2) {
            var redrawn = drawViews2(state);
            if (redrawn) {
              fit(state);
            }
          }
          return false;
        }
        _draw(state, present);
        fit(state);
        state.dirty = false;
        return true;
      }
    };
  };
  var fit = function fit2(state) {
    if (!state.fit) {
      if (!state.root || !(state.root.getAttribute("data-layout") || "").match(/fit/)) {
        state.fit = false;
        return;
      }
      var style = window.getComputedStyle(state.root, null);
      state.fit = true;
      state.fitInfo = {
        currentFontSize: parseInt(style.getPropertyValue("font-size"), 10)
      };
    }
    state.fitInfo.availableWidth = state.root.parentNode.clientWidth;
    state.fitInfo.currentWidth = state.root.scrollWidth;
    var newFontSize = Math.min(Math.max(4, state.fitInfo.availableWidth / state.fitInfo.currentWidth * state.fitInfo.currentFontSize), 1024);
    var dist = Math.abs(newFontSize - state.fitInfo.currentFontSize);
    if (dist <= 1)
      return;
    state.fitInfo.currentFontSize = newFontSize;
    state.root.style.fontSize = state.fitInfo.currentFontSize + "px";
    if (state.fitInfo.currentWidth / state.fitInfo.availableWidth < 0.5) {
      requestAnimationFrame(function() {
        return fit2(state);
      });
    }
  };
  var updater = function(state) {
    state.dirty = true;
    state.value = null;
    state.valueUpdateCount = 0;
    state.isInitialValue = function() {
      return state.valueUpdateCount <= 1;
    };
    return {
      reset: function reset() {
        state.dirty = true;
        state.value = null;
        state.valueUpdateCount = 0;
      },
      update: function update(value2) {
        if (equal(state.value, value2)) {
          return;
        }
        state.value = value2;
        state.valueUpdateCount++;
        state.dirty = true;
      }
    };
  };
  var resizer = function(state) {
    state.didResizeWindow = function() {
      state.dirty = true;
    };
    window.addEventListener("resize", state.didResizeWindow);
  };
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var asyncGenerator = function() {
    function AwaitValue(value2) {
      this.value = value2;
    }
    function AsyncGenerator(gen) {
      var front, back;
      function send(key2, arg) {
        return new Promise(function(resolve, reject) {
          var request2 = {
            key: key2,
            arg,
            resolve,
            reject,
            next: null
          };
          if (back) {
            back = back.next = request2;
          } else {
            front = back = request2;
            resume(key2, arg);
          }
        });
      }
      function resume(key2, arg) {
        try {
          var result = gen[key2](arg);
          var value2 = result.value;
          if (value2 instanceof AwaitValue) {
            Promise.resolve(value2.value).then(function(arg2) {
              resume("next", arg2);
            }, function(arg2) {
              resume("throw", arg2);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }
      function settle(type2, value2) {
        switch (type2) {
          case "return":
            front.resolve({
              value: value2,
              done: true
            });
            break;
          case "throw":
            front.reject(value2);
            break;
          default:
            front.resolve({
              value: value2,
              done: false
            });
            break;
        }
        front = front.next;
        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }
      this._invoke = send;
      if (typeof gen.return !== "function") {
        this.return = void 0;
      }
    }
    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
        return this;
      };
    }
    AsyncGenerator.prototype.next = function(arg) {
      return this._invoke("next", arg);
    };
    AsyncGenerator.prototype.throw = function(arg) {
      return this._invoke("throw", arg);
    };
    AsyncGenerator.prototype.return = function(arg) {
      return this._invoke("return", arg);
    };
    return {
      wrap: function(fn) {
        return function() {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function(value2) {
        return new AwaitValue(value2);
      }
    };
  }();
  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var createClass = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  var toConsumableArray = function(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  };
  var draw = function draw2(state, present) {
    var views = (state.definition || []).concat();
    if (state.align === "right") {
      views.reverse();
    }
    var value2 = Array.isArray(state.value) ? state.value.concat() : _typeof(state.value) === "object" ? clone(state.value) : state.value;
    views.forEach(function(view) {
      if (!view.presenter) {
        state.update = present(view);
        if (!view.presenter) {
          return;
        }
        view.presenter.appendTo(state.root);
      }
    });
    views.filter(function(view) {
      return view.presenter !== void 0;
    }).forEach(function(view) {
      if (Array.isArray(value2) && state.valueMapping) {
        state.update(view, state.valueMapping === "indexes" ? state.align === "right" ? value2.pop() : value2.shift() : value2);
      } else if (view.key && value2[view.key] !== void 0) {
        state.update(view, value2[view.key]);
      } else {
        state.update(view, value2);
      }
    });
    state.views = views;
    drawViews(state);
  };
  var drawViews = function drawViews2(state) {
    var redrawn = false;
    state.views.filter(function(view) {
      return view.presenter !== void 0;
    }).forEach(function(view) {
      if (view.presenter.draw()) {
        redrawn = true;
      }
    });
    return redrawn;
  };
  var createRoot = function(root, definition, present) {
    var state = {
      valueMapping: null
      // "none" or "indexes"
    };
    if (root && root.dataset.valueMapping) {
      var allowed = ["none", "indexes"];
      var mapping = root.dataset.valueMapping;
      state.valueMapping = allowed.indexOf(mapping) !== -1 ? mapping : null;
    }
    return Object.assign({}, rooter(state, root), resizer(state), updater(state), grouper(state, definition), drawer(state, draw, drawViews, present), destroyer(state));
  };
  var draw$1 = function draw2(state, present, ready) {
    var value2 = copyArray(Array.isArray(state.value) ? state.value : (state.value + "").split(""));
    if (state.align === "right") {
      value2.reverse();
    }
    if (state.definitions.length > value2.length) {
      while (state.definitions.length > value2.length) {
        var def = state.definitions.pop();
        def.presenter.destroy();
      }
    }
    value2.forEach(function(value3, index) {
      var def2 = state.definitions[index];
      if (!def2) {
        def2 = state.definitions[index] = cloneDefinition(state.definition);
        state.update = present(def2);
        def2.presenter.appendTo(state.root, state.align === "right" ? "first" : "last");
      }
    });
    value2.forEach(function(value3, index) {
      return state.update(state.definitions[index], value3);
    });
    state.views = value2;
    drawViews$1(state);
  };
  var drawViews$1 = function drawViews2(state) {
    var redrawn = false;
    state.views.forEach(function(view, index) {
      if (state.definitions[index].presenter.draw()) {
        redrawn = true;
      }
    });
    return redrawn;
  };
  var createRepeater = function(root, definition, present) {
    var state = {
      definitions: []
    };
    return Object.assign({}, rooter(state, root), updater(state), grouper(state, definition), drawer(state, draw$1, drawViews$1, present), destroyer(state));
  };
  var VENDOR_PREFIX = typeof document === "undefined" ? null : function() {
    var VENDORS = ["webkit", "Moz", "ms", "O"];
    var i = 0;
    var l = VENDORS.length;
    var transform2 = void 0;
    var elementStyle = document.createElement("div").style;
    for (; i < l; i++) {
      transform2 = VENDORS[i] + "Transform";
      if (transform2 in elementStyle) {
        return VENDORS[i];
      }
    }
    return null;
  }();
  var text = function text2(node, value2) {
    var textNode = node.childNodes[0];
    if (!textNode) {
      textNode = document.createTextNode(value2);
      node.appendChild(textNode);
    } else if (value2 !== textNode.nodeValue) {
      textNode.nodeValue = value2;
    }
  };
  var create$1 = function create2(name, className) {
    var el = document.createElement(name);
    if (className) {
      el.className = className;
    }
    return el;
  };
  var observeAttributes = function observeAttributes2(element, attributes2, cb) {
    var observer = new MutationObserver(function(mutations) {
      attributes2.forEach(function(attr) {
        if (mutations.filter(function(mutation) {
          return attributes2.includes(mutation.attributeName);
        }).length) {
          cb(element.getAttribute(attr));
        }
      });
    });
    observer.observe(element, { attributes: true });
    return observer;
  };
  var isHTMLElement = function isHTMLElement2(value2) {
    return value2 instanceof HTMLElement;
  };
  var setTransformOrigin = function setTransformOrigin2(element, value2) {
    element.style.transformOrigin = value2;
  };
  var setTransform = function setTransform2(element, name, value2) {
    var unit = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
    if (!element.transforms) {
      element.transforms = [];
    }
    var t = element.transforms.find(function(t2) {
      return t2.name === name;
    });
    if (t) {
      t.value = value2;
    } else {
      element.transforms.push({ name, value: value2, unit });
    }
    setTransformStyle(element, element.transforms);
  };
  var setTransformStyle = function setTransformStyle2(element, transforms) {
    element.style.transform = transforms.map(function(t) {
      return t.name + "(" + t.value + t.unit + ")";
    }).join(" ");
  };
  var isVisible = function isVisible2(element) {
    var elementRect = element.getBoundingClientRect();
    if (elementRect.bottom < 0) {
      return false;
    }
    if (elementRect.top > window.scrollY + window.innerHeight) {
      return false;
    }
    return true;
  };
  var toBoolean$1 = function toBoolean(value2) {
    return typeof value2 === "string" ? value2 === "true" : value2;
  };
  var capitalizeFirstLetter$1 = function capitalizeFirstLetter2(string2) {
    return string2.charAt(0).toUpperCase() + string2.slice(1);
  };
  var trim$1 = function trim2(string2) {
    return string2.trim();
  };
  var CACHE = {};
  var cache = function(value2, fn) {
    var fns = fn.toString();
    if (!CACHE[fns]) {
      CACHE[fns] = {};
    }
    if (!CACHE[fns][value2]) {
      CACHE[fns][value2] = fn(value2);
    }
    return CACHE[fns][value2];
  };
  var isInt = new RegExp("^[0-9]+$");
  var isBoolean$1 = new RegExp("^(true|false)$");
  var isFloat = new RegExp("^[0-9.]+$");
  var isColor = new RegExp("color");
  var isShadow = new RegExp("shadow");
  var isGradient = new RegExp("^(follow-gradient|horizontal-gradient|vertical-gradient)");
  var isDuration = new RegExp("^[.0-9]+(?:ms|s){1}$");
  var isTransition = new RegExp("^transition-?(?:in|out)?$");
  var isURL = new RegExp("^url\\(");
  var toDuration = function toDuration2(string2) {
    return string2 ? parseFloat(string2) * (/ms$/.test(string2) ? 1 : 1e3) : 0;
  };
  var toTransition = function toTransition2(string2) {
    return string2.match(/[a-z]+(?:\(.*?\))?\s?(?:origin\(.*?\))?\s?(?:[a-z]+\(.*?\))?[ .a-z-0-9]*/g).map(toTransitionPartial);
  };
  var toTransitionPartial = function toTransitionPartial2(string2) {
    var parts = string2.match(/([a-z]+(?:\(.*?\))?)\s?(?:origin\((.*?)\))?\s?([a-z]+(?:\(.*?\))?)?\s?(?:([.0-9ms]+)?\s?(?:(ease-[a-z-]+))?\s?([.0-9ms]+)?)?/);
    var fn = toFunctionOutline(parts[1]);
    var origin = void 0;
    var duration2 = void 0;
    var ease = void 0;
    var delay2 = void 0;
    var resolver = void 0;
    parts.slice(2).filter(function(part) {
      return typeof part !== "undefined";
    }).forEach(function(part) {
      if (isDuration.test(part)) {
        if (typeof duration2 === "undefined") {
          duration2 = toDuration(part);
        } else {
          delay2 = toDuration(part);
        }
      } else if (/ /.test(part)) {
        origin = part;
      } else if (/^ease-[a-z-]+$/.test(part)) {
        ease = part;
      } else if (/^[a-z]+/.test(part)) {
        resolver = toFunctionOutline(part);
      }
    });
    if (resolver) {
      duration2 = void 0;
      ease = void 0;
    }
    return {
      name: fn.name,
      parameters: fn.parameters,
      duration: duration2,
      ease,
      delay: delay2,
      origin,
      resolver
    };
  };
  var toGradient = function toGradient2(string2) {
    var type2 = string2.match(/follow-gradient|horizontal-gradient|vertical-gradient/)[0];
    var colors = string2.substring(type2.length).match(/(?:transparent|rgb\(.*?\)|hsl\(.*?\)|hsla\(.*?\)|rgba\(.*?\)|[a-z]+|#[abcdefABCDEF\d]+)\s?(?:[\d]{1,3}%?)?/g).map(toGradientColor);
    return {
      type: type2,
      colors
    };
  };
  var gradientOffsetRegex = /\s([\d]{1,3})%?$/;
  var toGradientColor = function toGradientColor2(string2) {
    var offset = string2.match(gradientOffsetRegex);
    return {
      offset: offset ? parseFloat(offset[1]) / 100 : null,
      value: toColor(string2.replace(gradientOffsetRegex, ""))
    };
  };
  var pipetteCache = [];
  var getPipette = function getPipette2(id, root) {
    if (!pipetteCache[id]) {
      return null;
    }
    return pipetteCache[id].find(function(p) {
      return p.node.parentNode === root;
    });
  };
  var setPipette = function setPipette2(id, pipette) {
    if (!pipetteCache[id]) {
      pipetteCache[id] = [];
    }
    pipetteCache[id].push(pipette);
  };
  var toPixels = typeof document === "undefined" ? function(value2) {
    return 0;
  } : function(value2) {
    var root = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document.body;
    var id = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (value2 == 0) {
      return 0;
    }
    if (id) {
      var _pipette = getPipette(id, root) || {};
      if (!_pipette.node) {
        _pipette.node = document.createElement("span");
        _pipette.node.style.cssText = "position:absolute;padding:0;visibility:hidden;";
        root.appendChild(_pipette.node);
      }
      _pipette.node.style.marginTop = value2;
      if (!_pipette.style) {
        _pipette.style = window.getComputedStyle(_pipette.node);
      }
      setPipette(id, _pipette);
      return parseInt(_pipette.style.marginTop, 10);
    }
    var pipette = document.createElement("span");
    pipette.style.cssText = "position:absolute;padding:0;visibility:hidden;margin-top:" + value2;
    root.appendChild(pipette);
    requestAnimationFrame(function() {
      pipette.parentNode.removeChild(pipette);
    });
    return parseInt(window.getComputedStyle(pipette).marginTop, 10);
  };
  var toColor = typeof document === "undefined" ? function(string2) {
    return string2;
  } : function(string2) {
    if (string2 === "transparent") {
      return "rgba(0,0,0,0)";
    }
    var pipette = document.createElement("span");
    pipette.style.cssText = "position:absolute;visibility:hidden;color:" + string2;
    document.body.appendChild(pipette);
    requestAnimationFrame(function() {
      pipette.parentNode.removeChild(pipette);
    });
    return window.getComputedStyle(pipette).getPropertyValue("color");
  };
  var toShadow = function toShadow2(style) {
    if (typeof style !== "string") {
      return style;
    }
    return style.match(/([-.\d]+(?:%|ms|s|deg|cm|em|ch|ex|q|in|mm|pc|pt|px|vh|vw|vmin|vmax)?)|[%#A-Za-z0-9,.()]+/g);
  };
  var toURL = function toURL2(style) {
    var urls = style.match(/url\((.*?)\)/g).map(function(url) {
      return url.substring(4, url.length - 1);
    });
    return urls.length === 1 ? urls[0] : urls;
  };
  var toStyleProperty = function toStyleProperty2(key2) {
    return key2.trim().split("-").map(function(key3, index) {
      return index > 0 ? capitalizeFirstLetter$1(key3) : key3;
    }).join("");
  };
  var toStyleValue = function toStyleValue2(value2, property) {
    if (isBoolean$1.test(value2)) {
      return toBoolean$1(value2);
    }
    if (isInt.test(value2)) {
      return parseInt(value2, 10);
    }
    if (isFloat.test(value2)) {
      return parseFloat(value2);
    }
    if (isURL.test(value2)) {
      return toURL(value2);
    }
    if (isColor.test(property)) {
      if (isGradient.test(value2)) {
        return cache(value2, toGradient);
      }
      return cache(value2, toColor);
    }
    if (isShadow.test(property)) {
      return cache(value2, toShadow);
    }
    if (isTransition.test(property)) {
      if (value2 === "none") {
        return value2;
      }
      return cache(value2, toTransition);
    }
    return value2;
  };
  var toStyle = function toStyle2(string2) {
    var parts = string2.split(":").map(trim$1);
    var property = toStyleProperty(parts[0]);
    var value2 = toStyleValue(parts[1], parts[0]);
    if (!property || value2 === null || typeof value2 === "undefined") {
      return null;
    }
    return {
      property,
      value: value2
    };
  };
  var toStyles = function toStyles2(string2) {
    return string2.split(";").filter(function(style) {
      return style.trim().length;
    }).map(toStyle).filter(function(style) {
      return style !== null;
    }).reduce(function(styles, style) {
      styles[style.property] = style.value;
      return styles;
    }, {});
  };
  var easeLinear = function easeLinear2(t) {
    return t;
  };
  var easeInSine = function easeInSine2(t) {
    return -1 * Math.cos(t * (Math.PI / 2)) + 1;
  };
  var easeOutSine = function easeOutSine2(t) {
    return Math.sin(t * (Math.PI / 2));
  };
  var easeInOutSine = function easeInOutSine2(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
  };
  var easeInQuad = function easeInQuad2(t) {
    return t * t;
  };
  var easeOutQuad = function easeOutQuad2(t) {
    return t * (2 - t);
  };
  var easeInOutQuad = function easeInOutQuad2(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };
  var easeInCubic = function easeInCubic2(t) {
    return t * t * t;
  };
  var easeOutCubic = function easeOutCubic2(t) {
    var t1 = t - 1;
    return t1 * t1 * t1 + 1;
  };
  var easeInOutCubic = function easeInOutCubic2(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  var easeInQuart = function easeInQuart2(t) {
    return t * t * t * t;
  };
  var easeOutQuart = function easeOutQuart2(t) {
    return 1 - --t * t * t * t;
  };
  var easeInOutQuart = function easeInOutQuart2(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  };
  var easeInExpo = function easeInExpo2(t) {
    if (t === 0) {
      return 0;
    }
    return Math.pow(2, 10 * (t - 1));
  };
  var easeOutExpo = function easeOutExpo2(t) {
    if (t === 1) {
      return 1;
    }
    return -Math.pow(2, -10 * t) + 1;
  };
  var easeInOutExpo = function easeInOutExpo2(t) {
    if (t === 0 || t === 1) {
      return t;
    }
    var scaledTime = t * 2;
    var scaledTime1 = scaledTime - 1;
    if (scaledTime < 1) {
      return 0.5 * Math.pow(2, 10 * scaledTime1);
    }
    return 0.5 * (-Math.pow(2, -10 * scaledTime1) + 2);
  };
  var easeInCirc = function easeInCirc2(t) {
    var scaledTime = t / 1;
    return -1 * (Math.sqrt(1 - scaledTime * t) - 1);
  };
  var easeOutCirc = function easeOutCirc2(t) {
    var t1 = t - 1;
    return Math.sqrt(1 - t1 * t1);
  };
  var easeInOutCirc = function easeInOutCirc2(t) {
    var scaledTime = t * 2;
    var scaledTime1 = scaledTime - 2;
    if (scaledTime < 1) {
      return -0.5 * (Math.sqrt(1 - scaledTime * scaledTime) - 1);
    }
    return 0.5 * (Math.sqrt(1 - scaledTime1 * scaledTime1) + 1);
  };
  var easeInBack = function easeInBack2(t) {
    var magnitude = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1.70158;
    var scaledTime = t / 1;
    return scaledTime * scaledTime * ((magnitude + 1) * scaledTime - magnitude);
  };
  var easeOutBack = function easeOutBack2(t) {
    var magnitude = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1.70158;
    var scaledTime = t / 1 - 1;
    return scaledTime * scaledTime * ((magnitude + 1) * scaledTime + magnitude) + 1;
  };
  var easeInOutBack = function easeInOutBack2(t) {
    var magnitude = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1.70158;
    var scaledTime = t * 2;
    var scaledTime2 = scaledTime - 2;
    var s = magnitude * 1.525;
    if (scaledTime < 1) {
      return 0.5 * scaledTime * scaledTime * ((s + 1) * scaledTime - s);
    }
    return 0.5 * (scaledTime2 * scaledTime2 * ((s + 1) * scaledTime2 + s) + 2);
  };
  var easeOutElastic = function easeOutElastic2(t) {
    var magnitude = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.7;
    var p = 1 - magnitude;
    var scaledTime = t * 2;
    if (t === 0 || t === 1) {
      return t;
    }
    var s = p / (2 * Math.PI) * Math.asin(1);
    return Math.pow(2, -10 * scaledTime) * Math.sin((scaledTime - s) * (2 * Math.PI) / p) + 1;
  };
  var easeOutBounce = function easeOutBounce2(t) {
    var scaledTime = t / 1;
    if (scaledTime < 1 / 2.75) {
      return 7.5625 * scaledTime * scaledTime;
    } else if (scaledTime < 2 / 2.75) {
      var scaledTime2 = scaledTime - 1.5 / 2.75;
      return 7.5625 * scaledTime2 * scaledTime2 + 0.75;
    } else if (scaledTime < 2.5 / 2.75) {
      var _scaledTime = scaledTime - 2.25 / 2.75;
      return 7.5625 * _scaledTime * _scaledTime + 0.9375;
    } else {
      var _scaledTime2 = scaledTime - 2.625 / 2.75;
      return 7.5625 * _scaledTime2 * _scaledTime2 + 0.984375;
    }
  };
  var EasingFunctions = {
    "ease-linear": easeLinear,
    "ease-in-sine": easeInSine,
    "ease-out-sine": easeOutSine,
    "ease-in-out-sine": easeInOutSine,
    "ease-in-cubic": easeInCubic,
    "ease-out-cubic": easeOutCubic,
    "ease-in-out-cubic": easeInOutCubic,
    "ease-in-circ": easeInCirc,
    "ease-out-circ": easeOutCirc,
    "ease-in-out-circ": easeInOutCirc,
    "ease-in-quad": easeInQuad,
    "ease-out-quad": easeOutQuad,
    "ease-in-out-quad": easeInOutQuad,
    "ease-in-quart": easeInQuart,
    "ease-out-quart": easeOutQuart,
    "ease-in-out-quart": easeInOutQuart,
    "ease-in-expo": easeInExpo,
    "ease-out-expo": easeOutExpo,
    "ease-in-out-expo": easeInOutExpo,
    "ease-in-back": easeInBack,
    "ease-out-back": easeOutBack,
    "ease-in-out-back": easeInOutBack,
    "ease-out-elastic": easeOutElastic,
    "ease-out-bounce": easeOutBounce
  };
  addExtensions(ExtensionType.EASING_FUNCTION, EasingFunctions);
  var animate = function animate2(cb, complete) {
    var duration2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 500;
    var ease = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : easeLinear;
    var delay2 = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
    return interpolate(function(t) {
      cb(ease(t));
    }, complete, duration2, delay2);
  };
  var interpolate = function interpolate2(update) {
    var complete = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var duration2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 500;
    var delay2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    if (!update) {
      return null;
    }
    var start = null;
    var t = void 0;
    var frame = null;
    var tick = function tick2(ts) {
      if (start === null) {
        start = ts;
      }
      t = ts - start - delay2;
      if (t < duration2) {
        update(t >= 0 ? t / duration2 : 0);
        frame = requestAnimationFrame(tick2);
        return null;
      }
      update(1);
      if (complete) {
        complete();
      }
    };
    tick(now());
    return function() {
      cancelAnimationFrame(frame);
    };
  };
  var translator = function translator2() {
    var fps = 24;
    var interval = 1e3 / fps;
    var frame = null;
    var state = {
      velocity: 0,
      origin: 0,
      position: 0,
      destination: 1
    };
    var cancel = function cancel2() {
      cancelAnimationFrame(frame);
    };
    var translate = function translate2(cb, from, to, update) {
      cancel();
      if (to === null) {
        state.destination = from;
      } else {
        state.position = from;
        state.destination = to;
        state.velocity = 0;
      }
      state.origin = state.position;
      var last = null;
      var tick = function tick2(ts) {
        frame = requestAnimationFrame(tick2);
        if (!last) {
          last = ts;
        }
        var delta = ts - last;
        if (delta <= interval) {
          return;
        }
        last = ts - delta % interval;
        update(state, cancel);
        cb(state.position);
      };
      tick(now());
    };
    return {
      getPosition: function getPosition() {
        return state.position;
      },
      cancel,
      translate
    };
  };
  var createTranslator = function createTranslator2(type2) {
    for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }
    var t = translator();
    var updater2 = {
      update: null,
      cancel: t.cancel,
      getPosition: t.getPosition
    };
    if (type2 === "arrive") {
      updater2.update = arrive.apply(void 0, [t.translate].concat(options));
    } else if (type2 === "spring") {
      updater2.update = spring.apply(void 0, [t.translate].concat(options));
    } else if (type2 === "step") {
      updater2.update = step.apply(void 0, [t.translate].concat(options));
    }
    return updater2;
  };
  var arrive = function arrive2(update) {
    var maxVelocity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var friction = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.01;
    return function(cb) {
      var from = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var to = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      update(cb, from, to, function(state, cancel) {
        var distance = state.destination - state.position;
        var halfway = state.origin + (state.destination - state.origin) * 0.5;
        state.velocity += (-(halfway - state.origin) + distance) * 2 * friction;
        state.position += state.velocity < 0 ? Math.max(state.velocity, -maxVelocity) : Math.min(state.velocity, maxVelocity);
        if (state.origin < state.destination && state.position >= state.destination || state.origin >= state.destination && state.position <= state.destination) {
          cancel();
          state.velocity = 0;
          state.position = state.destination;
        }
      });
    };
  };
  var step = function step2(update) {
    var velocity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.01;
    return function(cb) {
      var from = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var to = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      update(cb, from, to, function(state, cancel) {
        state.velocity = velocity;
        state.position += state.velocity;
        if (state.origin < state.destination && state.position >= state.destination || state.origin >= state.destination && state.position <= state.destination) {
          cancel();
          state.velocity = 0;
          state.position = state.destination;
        }
      });
    };
  };
  var spring = function spring2(update) {
    var stiffness = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.5;
    var damping = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.75;
    var mass = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 10;
    return function(cb) {
      var from = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      var to = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      update(cb, from, to, function(state, cancel) {
        var f = -(state.position - state.destination) * stiffness;
        state.velocity += f / mass;
        state.position += state.velocity;
        state.velocity *= damping;
        if (thereYet(state.position, state.destination, state.velocity)) {
          cancel();
          state.position = state.destination;
          state.velocity = 0;
        }
      });
    };
  };
  var thereYet = function thereYet2(position, destination, velocity) {
    var errorMargin = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1e-3;
    return Math.abs(position - destination) < errorMargin && Math.abs(velocity) < errorMargin;
  };
  var createTransitioner = function createTransitioner2(transitions) {
    var transitioners = transitions.map(function(t) {
      return createDurationTransitioner(createTransition(t.name, t.parameters, t.ease), t.origin, t.duration, t.delay);
    });
    return function(element, direction, complete) {
      if (!isHTMLElement(element)) {
        return false;
      }
      var count = transitioners.length;
      transitioners.forEach(function(transitioner) {
        transitioner(element, direction, function() {
          count--;
          if (!count && complete) {
            complete(element);
          }
        });
      });
    };
  };
  var createTransition = function createTransition2(name, parameters, ease) {
    var easing = ease ? getExtension(ExtensionType.EASING_FUNCTION, ease) : ease;
    var transition = getExtension(ExtensionType.TRANSITION, name);
    return function(element, direction, p) {
      transition.apply(void 0, [element, p, direction, easing].concat(toConsumableArray(parameters)));
    };
  };
  var createDurationTransitioner = function createDurationTransitioner2(transition) {
    var origin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "50% 50% 0";
    var duration2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 500;
    var delay2 = arguments[3];
    return function(element) {
      var direction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      var complete = arguments[2];
      setTransformOrigin(element, origin);
      interpolate(function(p) {
        transition(element, direction, p);
      }, complete, duration2, delay2);
    };
  };
  var getComposedTransitionActs = function getComposedTransitionActs2(transition) {
    return getExtension(ExtensionType.TRANSITION, transition.name).apply(void 0, toConsumableArray(transition.parameters || []));
  };
  var styler = function(state) {
    var base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    state.lastAppliedStyles = null;
    updateStyles(state, base, state.root.dataset.style);
    state.styleObserver = observeAttributes(state.root, ["data-style"], function(string2) {
      updateStyles(state, base, string2);
    });
    return {
      setStyle: function setStyle(css) {
        updateStyles(state, base, css);
      }
    };
  };
  var updateStyles = function updateStyles2(state, base, css) {
    if (state.lastAppliedStyles === css) {
      return;
    }
    state.lastAppliedStyles = css;
    state.style = css ? mergeObjects(base, toStyles(css)) : base;
    var intro = [];
    var outro = [];
    if (state.style.transitionIn && state.style.transitionIn.length) {
      intro = state.style.transitionIn;
      outro = state.style.transitionOut;
    } else if (state.style.transition && state.style.transition !== "none") {
      state.style.transition.forEach(function(transition) {
        var acts = getComposedTransitionActs(transition);
        intro = intro.concat(acts.intro);
        outro = outro.concat(acts.outro);
      });
    }
    if (intro && outro) {
      state.transitionIn = createTransitioner(intro);
      state.transitionOut = createTransitioner(outro);
      state.skipToTransitionInEnd = createTransitioner(intro.map(clearTiming));
      state.skipToTransitionOutEnd = createTransitioner(outro.map(clearTiming));
    }
    state.dirty = true;
  };
  var clearTiming = function clearTiming2(t) {
    var tn = clone(t);
    tn.duration = 0;
    tn.delay = 0;
    return tn;
  };
  var getBackingStoreRatio = function getBackingStoreRatio2(ctx) {
    return ctx[VENDOR_PREFIX + "BackingStorePixelRatio"] || ctx.backingStorePixelRatio || 1;
  };
  var getDevicePixelRatio = function getDevicePixelRatio2() {
    return window.devicePixelRatio || 1;
  };
  var clearCanvas = function clearCanvas2(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  var Views = {
    "text": function text$$1() {
      return function(root) {
        var state = {};
        var draw2 = function draw3(state2) {
          state2.root.setAttribute("data-value", state2.value);
          text(state2.root, state2.value);
        };
        return Object.assign({}, rooter(state, root, "text"), updater(state), drawer(state, draw2), destroyer(state));
      };
    }
  };
  addExtensions(ExtensionType.VIEW, Views);
  var API$2 = function API2() {
    return {
      Extension: {
        Type: ExtensionType,
        getExtension
      },
      Utils: {
        toPixels,
        toColor
      },
      Canvas: {
        clear: clearCanvas,
        getDevicePixelRatio,
        getBackingStoreRatio
      },
      DOM: {
        visible: isVisible,
        create: create$1,
        transform: setTransform
      },
      Animation: {
        animate
      },
      Data: {
        request
      },
      Date: {
        performance: now
      },
      View: {
        rooter,
        drawer,
        updater,
        styler,
        grouper,
        resizer,
        destroyer
      }
    };
  };
  var createPresenterRoot = function createPresenterRoot2(root, definition, presentDefinition) {
    return createRoot(root, definition, presentDefinition);
  };
  var createPresenterRepeater = function createPresenterRepeater2(root, definition, presentDefinition) {
    return createRepeater(root, definition, presentDefinition);
  };
  var createPresenterView = function createPresenterView2(name, root, style) {
    var view = getExtension(ExtensionType.VIEW, name);
    return view ? view(API$2())(root, style) : null;
  };
  var arrow = function arrow2(str, i) {
    return str[i] === "-" && str[i + 1] === ">";
  };
  var string = function string2(c) {
    return c === "'" || c === '"';
  };
  var comma = function comma2(c) {
    return c === ",";
  };
  var opener = function opener2(c) {
    return c === "(";
  };
  var closer = function closer2(c) {
    return c === ")";
  };
  var value = function value2(v) {
    return v.trim().length !== 0;
  };
  var add = function add2(r, v) {
    return r.push(v.trim());
  };
  var token = function token2(r, v) {
    if (value(v)) {
      add(r, v);
      return "";
    }
    return v;
  };
  var chain = function chain2(_chain, output) {
    if (_chain.length) {
      output.push(_chain.length > 1 ? _chain.concat() : _chain[0]);
    }
    return [];
  };
  var parse$1 = function parse2(i, str, result) {
    var v = "";
    var fns = [];
    var quote = null;
    var hitArrow = false;
    while (i < str.length) {
      var c = str[i];
      if (opener(c)) {
        hitArrow = false;
        var fn = [v.trim()];
        i = parse2(i + 1, str, fn);
        c = str[i];
        fns.push(fn);
        v = "";
      } else if (closer(c)) {
        if (hitArrow && v.trim().length) {
          fns.push([v.trim()]);
          v = "";
          hitArrow = false;
        }
        if (value(v)) {
          add(fns, v);
        }
        fns = chain(fns, result);
        return i + 1;
      } else {
        if (quote !== null && c !== quote) {
          v += c;
        } else if (c === quote) {
          fns.push(v);
          v = "";
          quote = null;
        } else if (string(c)) {
          v = "";
          quote = c;
        } else {
          if (arrow(str, i)) {
            hitArrow = true;
            if (v.trim().length) {
              fns.push([v.trim()]);
              v = "";
            }
            i += 2;
          } else if (comma(c)) {
            if (hitArrow && v.trim().length) {
              fns.push([v.trim()]);
              v = "";
              hitArrow = false;
            }
            fns = chain(fns, result);
            v = token(result, v);
          } else {
            v += c;
          }
        }
        i++;
      }
    }
    if (hitArrow && v.trim().length || !hitArrow && v.trim().length && !fns.length) {
      fns.push([v.trim()]);
      v = "";
    }
    chain(fns, result);
    token(result, v);
    return i;
  };
  var parseTransformChain = function parseTransformChain2(string2) {
    var result = [];
    parse$1(0, string2, result);
    return result;
  };
  var isRootDefinition = function isRootDefinition2(definition) {
    return definition.children && definition.children.length;
  };
  var cloneDefinition = function cloneDefinition2(definition) {
    var clone2 = {};
    for (var key2 in definition) {
      if (!definition.hasOwnProperty(key2)) {
        continue;
      }
      if (key2 === "root") {
        clone2[key2] = definition[key2].cloneNode();
        continue;
      }
      if (key2 === "children") {
        clone2[key2] = definition[key2] === null ? null : definition[key2].map(cloneDefinition2);
        continue;
      }
      if (key2 === "repeat") {
        clone2[key2] = definition[key2] === null ? null : cloneDefinition2(definition[key2]);
        continue;
      }
      clone2[key2] = definition[key2];
    }
    clone2.presenter = null;
    return clone2;
  };
  var definitionOutline = {
    root: null,
    key: null,
    view: null,
    overlay: null,
    presenter: null,
    transform: null,
    layout: null,
    style: null,
    repeat: null,
    children: null,
    className: null
  };
  var toPresenterDefinitionTree = function toPresenterDefinitionTree2(nodes) {
    return Array.from(nodes).map(function(node) {
      var definition = mergeObjects(definitionOutline, { root: node });
      for (var key2 in node.dataset) {
        if (!node.dataset.hasOwnProperty(key2)) {
          continue;
        }
        if (typeof definition[key2] === "undefined") {
          continue;
        }
        definition[key2] = node.dataset[key2];
      }
      if (definition.repeat) {
        definition.repeat = toPresenterDefinitionTree2(node.children).pop();
        Array.from(node.children).forEach(function(node2) {
          node2.parentNode.removeChild(node2);
        });
      } else if (node.children.length) {
        definition.children = toPresenterDefinitionTree2(node.children);
      }
      return definition;
    });
  };
  var createDOMTreeForDefinition = function createDOMTreeForDefinition2(definition) {
    return definition.map(function(def) {
      def = mergeObjects(definitionOutline, def);
      if (typeof def.root === "string") {
        def.root = document.createElement(def.root);
      } else {
        def.root = document.createElement("span");
      }
      if (def.transform) {
        def.root.dataset.transform = def.transform;
      }
      if (def.className) {
        def.root.className = def.className;
      }
      if (def.overlay) {
        def.root.dataset.overlay = def.overlay;
      }
      if (def.view) {
        def.root.dataset.view = def.view;
        if (def.style) {
          def.root.dataset.style = def.style;
        }
        def.repeat = null;
      } else {
        if (def.layout) {
          def.root.dataset.layout = def.layout;
        }
        if (def.repeat) {
          def.root.dataset.repeat = true;
          def.repeat = createDOMTreeForDefinition2(def.children).pop();
        } else if (def.children) {
          def.children = createDOMTreeForDefinition2(def.children);
          def.children.forEach(function(child) {
            def.root.appendChild(child.root);
          });
        }
      }
      return def;
    });
  };
  var createPresenterByDefinition = function createPresenterByDefinition2(definition, presentDefinition) {
    var presenter = void 0;
    if (definition.repeat) {
      presenter = createPresenterRepeater(definition.root, definition.repeat, presentDefinition);
    } else if (typeof definition.view === "string") {
      presenter = createPresenterView(definition.view, definition.root, definition.style);
    } else if (isRootDefinition(definition)) {
      presenter = createPresenterRoot(definition.root, definition.children, presentDefinition);
    }
    return presenter;
  };
  var presentTick = function presentTick2(instance) {
    var isDrawing = false;
    var update = function update2(definition, value2) {
      definition.transform(value2, function(output) {
        definition.presenter.update(output);
      }, instance);
      if (!isDrawing) {
        isDrawing = true;
        draw2();
      }
    };
    var draw2 = function draw3() {
      instance.baseDefinition.presenter.draw();
      requestAnimationFrame(draw3);
    };
    var presentDefinition = function presentDefinition2(definition) {
      definition.presenter = createPresenterByDefinition(definition, presentDefinition2);
      definition.transform = toTransformComposition(definition.transform, instance);
      return update;
    };
    return presentDefinition(instance.baseDefinition);
  };
  var composeAsync = function composeAsync2(instance) {
    for (var _len = arguments.length, funcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      funcs[_key - 1] = arguments[_key];
    }
    return function(initialValue, callback) {
      function compose2(i, value2) {
        if (funcs.length <= i) {
          callback(value2);
          return;
        }
        funcs[i](value2, partial(compose2, [i + 1]), instance);
      }
      compose2(0, initialValue);
    };
  };
  var partial = function partial2(fn) {
    var initialArgs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var ctx = arguments[2];
    return function() {
      var args = Array.from(initialArgs);
      Array.prototype.push.apply(args, arguments);
      return fn.apply(ctx, args);
    };
  };
  var toTransformComposition = function toTransformComposition2(string2, instance) {
    if (!string2) {
      return function(value2, cb) {
        return cb(value2);
      };
    }
    if (typeof string2 === "function") {
      return string2;
    }
    var result = parseTransformChain("transform(" + (/^[a-z]+$/.test(string2) ? string2 + "()" : string2) + ")");
    return compose(result, instance);
  };
  var compose = function compose2(chain2, instance) {
    var composition = chain2.map(function(item) {
      var name = item.shift();
      var func = getExtension(ExtensionType.TRANSFORM, name) || function(value2, cb, instance2) {
        cb(value2);
      };
      var params = item.map(function(parameter) {
        if (Array.isArray(parameter)) {
          if (typeof parameter[0] === "string") {
            return compose2([parameter], instance);
          }
          return compose2(parameter, instance);
        }
        return toParameter(parameter);
      });
      return func.apply(void 0, toConsumableArray(params));
    });
    return composeAsync.apply(void 0, [instance].concat(toConsumableArray(composition)));
  };
  var toFunctionOutline = function toFunctionOutline2(string2) {
    var name = string2.match(/[a-z]+/)[0];
    var parameters = toParameters(string2.substring(name.length));
    return {
      name,
      parameters
    };
  };
  var toParameters = function toParameters2(string2) {
    return (string2.match(/('.+?')|(".+?")|(\[.+?])|([.:\-\d\sa-zA-Z]+%?)/g) || []).map(trim).filter(function(str) {
      return str.length;
    }).map(toParameter);
  };
  var trimEdges = function trimEdges2(string2) {
    return string2.substring(1, string2.length - 1);
  };
  var isProbablyISODate = /^([\d]{4}-[\d]{1,2}-[\d]{1,2})/;
  var isBoolean = /^(true|false)$/;
  var isString = /^[\a-zA-Z]+$/;
  var isZeroString = /^0[\d]+/;
  var isQuotedString = /^('|")/;
  var isNumber = /^-?(?:\d+)?(?:\.|0\.)?[\d]+$/;
  var isArray = /^(\[)/;
  var toParameter = function toParameter2(string2) {
    if (isBoolean.test(string2)) {
      return string2 === "true";
    }
    if (isArray.test(string2)) {
      return toParameters(trimEdges(string2));
    }
    if (isProbablyISODate.test(string2)) {
      return dateFromISO(string2);
    }
    if (isQuotedString.test(string2)) {
      return trimEdges(string2);
    }
    if (isString.test(string2) || isZeroString.test(string2)) {
      return string2;
    }
    if (isNumber.test(string2)) {
      return parseFloat(string2);
    }
    return string2;
  };
  var toCSSValue = function toCSSValue2(value2) {
    var parts = (value2 + "").match(/(-?[.\d]+)(%|ms|s|deg|cm|em|ch|ex|q|in|mm|pc|pt|px|vh|vw|vmin|vmax)?/);
    return {
      value: parseFloat(parts[1]),
      units: parts[2]
    };
  };
  var mergeObjects = function mergeObjects2(a) {
    var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var key2 = void 0;
    var obj = {};
    for (key2 in a) {
      if (!a.hasOwnProperty(key2)) {
        continue;
      }
      obj[key2] = typeof b[key2] === "undefined" ? a[key2] : b[key2];
    }
    return obj;
  };
  var toFunctionReference = function toFunctionReference2(string2) {
    var ref = window;
    var levels = string2.split(".");
    levels.forEach(function(level, index) {
      if (!ref[levels[index]]) {
        return;
      }
      ref = ref[levels[index]];
    });
    return ref !== window ? ref : null;
  };
  var toValue = function toValue2(string2) {
    if (/^(?:[\w]+\s?:\s?[\w.]+,\s?)+(?:[\w]+\s?:\s?[\w.]+)$/g.test(string2)) {
      return string2.match(/(?:(\w+)\s?:\s?([\w.]+))/g).reduce(function(obj, current) {
        var parts = current.split(":");
        obj[parts[0]] = toParameter(parts[1]);
        return obj;
      }, {});
    }
    return toParameter(string2);
  };
  var toInt = function toInt2(value2) {
    return parseInt(value2, 10);
  };
  var trim = function trim2(string2) {
    return string2.trim();
  };
  var capitalizeFirstLetter = function capitalizeFirstLetter2(string2) {
    return string2.charAt(0).toUpperCase() + string2.slice(1);
  };
  var dashesToCamels = function dashesToCamels2(string2) {
    return string2.replace(/-./g, function(sub) {
      return sub.charAt(1).toUpperCase();
    });
  };
  var clone = function clone2(obj) {
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null) {
      return JSON.parse(JSON.stringify(obj));
    }
    return obj;
  };
  var copyArray = function copyArray2(arr) {
    return arr.slice();
  };
  var random = function random2() {
    var min = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    return min + Math.random() * (max - min);
  };
  var range = function range2(n) {
    var arr = [];
    var i = 0;
    for (; i < n; i++) {
      arr.push(i);
    }
    return arr;
  };
  var shuffle = function shuffle2(a) {
    for (var i = a.length; i; i--) {
      var j = Math.floor(Math.random() * i);
      var _ref = [a[j], a[i - 1]];
      a[i - 1] = _ref[0];
      a[j] = _ref[1];
    }
  };
  var now = function now2() {
    return window.performance.now();
  };
  var request = function request2(url, success, error, options) {
    var xhr = new XMLHttpRequest();
    if (options) {
      options(xhr);
    }
    xhr.open("GET", url, true);
    xhr.onload = function() {
      success(xhr.response);
    };
    if (error) {
      xhr.onerror = function() {
        error(xhr, xhr.status);
      };
    }
    xhr.send();
  };
  var equal = function equal2(a, b) {
    if (isObject(a)) {
      return equalObjects(a, b);
    }
    if (Array.isArray(a)) {
      return equalArrays(a, b);
    }
    return a === b;
  };
  var isObject = function isObject2(obj) {
    return obj === Object(obj);
  };
  var equalObjects = function equalObjects2(a, b) {
    for (var i in a) {
      if (!b.hasOwnProperty(i) || a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  };
  var equalArrays = function equalArrays2(a, b) {
    return a.length == b.length && a.every(function(v, i) {
      return v === b[i];
    });
  };
  var keysToList = function keysToList2(obj) {
    return Object.keys(obj).map(function(k) {
      return '"' + k + '"';
    }).join(", ");
  };
  var Tick = function() {
    function Tick2() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var element = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document.createElement("div");
      classCallCheck(this, Tick2);
      this._options = mergeObjects(Tick2.options(), options);
      this._element = element;
      this._value = null;
      this._observer = null;
      this._viewDefinition = null;
      this._constants = null;
      this._presets = null;
      this._updater = null;
      this._credits = null;
      this._didInit = null;
      this._didDestroy = null;
      this._willDestroy = null;
      this._didUpdate = null;
      this._init();
    }
    createClass(Tick2, [{
      key: "isRootElement",
      /**
       * Public API
       */
      value: function isRootElement(element) {
        return this._element === element;
      }
    }, {
      key: "setConstant",
      value: function setConstant$$1(key2, value2) {
        this._constants[key2] = value2;
      }
    }, {
      key: "getConstants",
      value: function getConstants$$1() {
        return this._constants;
      }
    }, {
      key: "getConstant",
      value: function getConstant(key2) {
        return this._constants[key2];
      }
    }, {
      key: "setPreset",
      value: function setPreset$$1(key2, fn) {
        this._presets[key2] = fn;
      }
    }, {
      key: "getPreset",
      value: function getPreset(key2) {
        return this._presets[key2];
      }
    }, {
      key: "destroy",
      value: function destroy$$1() {
        this._willDestroy(this);
        this._observer.disconnect();
        this.baseDefinition.presenter.destroy();
        this._didDestroy(this);
      }
    }, {
      key: "redraw",
      value: function redraw() {
        if (!this.baseDefinition || !this.baseDefinition.presenter)
          return;
        this.baseDefinition.presenter.reset();
        this.baseDefinition.presenter.draw();
        this._updater(this.baseDefinition, this._value);
      }
      /**
       * Private Methods
       */
    }, {
      key: "_init",
      value: function _init() {
        var _this = this;
        this._viewDefinition = this._options.view;
        this._willDestroy = this._options.willDestroy;
        this._didDestroy = this._options.didDestroy;
        this._didInit = this._options.didInit;
        this._didUpdate = this._options.didUpdate;
        this._value = this._options.value;
        this._presets = this._options.presets;
        this._constants = this._options.constants;
        this._credits = this._options.credits;
        if (!this._element.classList.contains("tick")) {
          this._element.classList.add("tick");
        }
        this._observer = observeAttributes(this._element, ["data-value"], function(value2) {
          _this.value = value2;
        });
        if (this._viewDefinition.root !== this._element) {
          Array.from(this._viewDefinition.root.children).forEach(function(node) {
            _this._element.appendChild(node);
          });
          this._viewDefinition.root = this._element;
        }
        if (!this._viewDefinition.view && !this._viewDefinition.children) {
          this._viewDefinition.view = "text";
        }
        this._updater = presentTick(this);
        if (this.value !== null) {
          this._update(this.value);
        }
        this._element.dataset.state = "initialised";
        this._didInit(this, this.value);
        if (this._credits) {
          var credits = document.createElement("a");
          credits.className = "tick-credits";
          credits.href = this._credits.url;
          credits.tabindex = -1;
          credits.target = "_blank";
          credits.rel = "noopener noreferrer nofollow";
          credits.textContent = this._credits.label;
          this._element.appendChild(credits);
        }
      }
    }, {
      key: "_update",
      value: function _update(value2) {
        this._updater(this.baseDefinition, value2);
        this._didUpdate(this, value2);
      }
    }, {
      key: "baseDefinition",
      /**
       * Public Properties
       */
      get: function get$$1() {
        return this._viewDefinition;
      }
    }, {
      key: "root",
      get: function get$$1() {
        return this._element;
      }
    }, {
      key: "value",
      get: function get$$1() {
        return this._value;
      },
      set: function set$$1(value2) {
        this._value = typeof value2 === "string" ? toValue(value2) : value2;
        this._update(value2);
      }
    }], [{
      key: "options",
      value: function options() {
        return {
          constants: getConstants(),
          presets: getPresets(),
          value: null,
          view: null,
          didInit: function didInit(tick) {
          },
          didUpdate: function didUpdate(tick, value2) {
          },
          willDestroy: function willDestroy(tick) {
          },
          didDestroy: function didDestroy(tick) {
          },
          credits: {
            label: "Powered by PQINA",
            url: "https://pqina.nl/?ref=credits"
          }
        };
      }
    }]);
    return Tick2;
  }();
  var transformDurationUnit = function transformDurationUnit2(value2, single, plural2, progress) {
    return {
      label: value2 === 1 ? single : plural2,
      progress: value2 / progress,
      value: value2
    };
  };
  var instances = [];
  var setConstant = function setConstant2(key2, value2) {
    constants[key2] = value2;
  };
  var setPreset = function setPreset2(key2, value2) {
    presets[key2] = value2;
  };
  var getConstants = function getConstants2() {
    return constants;
  };
  var getPresets = function getPresets2() {
    return presets;
  };
  var constants = {
    YEAR_PLURAL: "Years",
    YEAR_SINGULAR: "Year",
    MONTH_PLURAL: "Months",
    MONTH_SINGULAR: "Month",
    WEEK_PLURAL: "Weeks",
    WEEK_SINGULAR: "Week",
    DAY_PLURAL: "Days",
    DAY_SINGULAR: "Day",
    HOUR_PLURAL: "Hours",
    HOUR_SINGULAR: "Hour",
    MINUTE_PLURAL: "Minutes",
    MINUTE_SINGULAR: "Minute",
    SECOND_PLURAL: "Seconds",
    SECOND_SINGULAR: "Second",
    MILLISECOND_PLURAL: "Milliseconds",
    MILLISECOND_SINGULAR: "Millisecond"
  };
  var presets = {
    y: function y(value2, constants2) {
      return transformDurationUnit(value2, constants2.YEAR_SINGULAR, constants2.YEAR_PLURAL, 10);
    },
    M: function M(value2, constants2) {
      return transformDurationUnit(value2, constants2.MONTH_SINGULAR, constants2.MONTH_PLURAL, 12);
    },
    w: function w(value2, constants2) {
      return transformDurationUnit(value2, constants2.WEEK_SINGULAR, constants2.WEEK_PLURAL, 52);
    },
    d: function d(value2, constants2) {
      return transformDurationUnit(value2, constants2.DAY_SINGULAR, constants2.DAY_PLURAL, 365);
    },
    h: function h(value2, constants2) {
      return transformDurationUnit(value2, constants2.HOUR_SINGULAR, constants2.HOUR_PLURAL, 24);
    },
    m: function m(value2, constants2) {
      return transformDurationUnit(value2, constants2.MINUTE_SINGULAR, constants2.MINUTE_PLURAL, 60);
    },
    s: function s(value2, constants2) {
      return transformDurationUnit(value2, constants2.SECOND_SINGULAR, constants2.SECOND_PLURAL, 60);
    },
    mi: function mi(value2, constants2) {
      return transformDurationUnit(value2, constants2.MILLISECOND_SINGULAR, constants2.MILLISECOND_PLURAL, 1e3);
    }
  };
  var attributes = {
    "value": toValue,
    "didInit": toFunctionReference,
    "didUpdate": toFunctionReference,
    "didDestroy": toFunctionReference,
    "willDestroy": toFunctionReference
  };
  var getOptionsFromAttributes = function getOptionsFromAttributes2(element) {
    var transfomers = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var defaults$$1 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var dataset = element.dataset;
    var options = {
      meta: {}
    };
    for (var prop in dataset) {
      if (!dataset.hasOwnProperty(prop)) {
        continue;
      }
      var valueTransformer = transfomers[prop];
      var value2 = dataset[prop];
      if (valueTransformer) {
        value2 = valueTransformer(value2);
        value2 = value2 === null ? clone(defaults$$1[prop]) : value2;
        options[prop] = value2;
      }
    }
    if (dataset.credits === "false") {
      options.credits = false;
    }
    return options;
  };
  var indexOfElement = function indexOfElement2(instances2, element) {
    var i = 0;
    var l = instances2.length;
    for (; i < l; i++) {
      if (instances2[i].isRootElement(element)) {
        return i;
      }
    }
    return -1;
  };
  var parse = function parse2(context) {
    var elements = void 0;
    var element = void 0;
    var i = void 0;
    var instances2 = [];
    elements = context.querySelectorAll(".tick:not([data-state])");
    i = elements.length;
    while (i--) {
      element = elements[i];
      instances2.push(create(element));
    }
    return instances2;
  };
  var find = function find2(element) {
    var result = instances.filter(function(instance) {
      return instance.isRootElement(element);
    });
    return result ? result[0] : null;
  };
  var getDefaultOptions = function getDefaultOptions2() {
    return _extends({}, Tick.options(), { constants: _extends({}, constants), presets: _extends({}, presets) });
  };
  var create = function create2() {
    var element = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
    if (element && !isHTMLElement(element)) {
      options = element;
      element = void 0;
    }
    if (element && find(element)) {
      return;
    }
    if (options && options.view) {
      options.view = createDOMTreeForDefinition([options.view])[0];
    }
    if (!options && element) {
      options = getOptionsFromAttributes(element, attributes, getDefaultOptions());
    }
    if (element) {
      if (!options) {
        options = {};
      }
      if (!options.view) {
        options.view = toPresenterDefinitionTree([element])[0];
      }
    }
    var instance = new Tick(options, element);
    instances.push(instance);
    return instance;
  };
  var destroy = function destroy2(element) {
    var index = indexOfElement(instances, element);
    if (index < 0) {
      return false;
    }
    instances[index].destroy();
    instances.splice(index, 1);
    return true;
  };
  var time = function time2(fn) {
    return function() {
      setTimeout(fn, 0);
    };
  };
  var now$2 = function now$$1() {
    return Date.now();
  };
  var setTimer = function setTimer2(cb) {
    var interval = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var settings = mergeObjects({ autostart: true }, options);
    var tickExpectedTime = null;
    var tickStartTime = null;
    var sleepStartTime = null;
    var totalSleepTime = 0;
    var sleepIntervalOffset = null;
    var paused = false;
    var timer = null;
    var isPaused = function isPaused2() {
      return paused;
    };
    var isStarted = function isStarted2() {
      return tickStartTime !== null;
    };
    var isDocumentHidden = function isDocumentHidden2() {
      return document.hidden;
    };
    var tick = function tick2() {
      var currentTime = now$2();
      var timeoutErrorOffset = tickExpectedTime - currentTime;
      var timeout = interval + timeoutErrorOffset;
      tickExpectedTime = currentTime + timeout;
      var runtime = currentTime - tickStartTime - totalSleepTime + timeoutErrorOffset;
      cb(runtime);
      timer = setTimeout(tick2, timeout);
    };
    var start = function start2() {
      if (isPaused()) {
        resume();
        return;
      }
      if (isStarted()) {
        return;
      }
      tickStartTime = now$2();
      setTimeout(function() {
        cb(0);
      }, 0);
      tickExpectedTime = now$2() + interval;
      startListeningForVisibilityChanges();
      if (isDocumentHidden()) {
        didHideDocument();
        return;
      }
      timer = setTimeout(function() {
        tick();
      }, interval);
    };
    var stop = function stop2() {
      clearTimeout(timer);
      timer = null;
      tickStartTime = null;
      tickExpectedTime = null;
      sleepStartTime = null;
      totalSleepTime = 0;
      sleepIntervalOffset = null;
      paused = false;
      stopListeningForVisibilityChanges();
    };
    var reset = function reset2() {
      stop();
      start();
    };
    var pause = function pause2() {
      if (!isStarted() || isDocumentHidden()) {
        return;
      }
      paused = true;
      stopListeningForVisibilityChanges();
      sleep();
    };
    var resume = function resume2() {
      if (!isPaused() || !isStarted() || isDocumentHidden()) {
        return;
      }
      paused = false;
      startListeningForVisibilityChanges();
      wake();
    };
    var sleep = function sleep2() {
      clearTimeout(timer);
      sleepStartTime = now$2();
      sleepIntervalOffset = tickExpectedTime - sleepStartTime;
    };
    var wake = function wake2() {
      totalSleepTime += now$2() - sleepStartTime;
      sleepStartTime = null;
      tickExpectedTime = now$2() + sleepIntervalOffset;
      timer = setTimeout(function() {
        tick();
      }, sleepIntervalOffset);
    };
    var didHideDocument = function didHideDocument2() {
      sleep();
    };
    var didShowDocument = function didShowDocument2() {
      if (!isStarted())
        return;
      wake();
    };
    var stopListeningForVisibilityChanges = function stopListeningForVisibilityChanges2() {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    var startListeningForVisibilityChanges = function startListeningForVisibilityChanges2() {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    };
    var handleVisibilityChange = function handleVisibilityChange2() {
      if (isDocumentHidden()) {
        didHideDocument();
      } else {
        didShowDocument();
      }
    };
    if (settings.autostart) {
      start();
    }
    return {
      start,
      stop: time(stop),
      reset: time(reset),
      pause: time(pause),
      resume
    };
  };
  var toInterval = function toInterval2(string2) {
    if (!/^[\d]+/.test(string2)) {
      string2 = "1 " + string2;
    }
    var parts = string2.split(" ");
    return parseFloat(parts[0]) * TimeUnit[parts[1].toLowerCase()];
  };
  var toTime = function toTime2(date, time2) {
    return setTime(date, time2.split(":").map(toInt));
  };
  var toYearlyMoment = function toYearlyMoment2(date, string2) {
    var parts = string2.match(/januari|februari|march|april|may|june|july|august|september|october|november|december|[\d]+th|\dst|\dnd|first|last|at\s[\d]+(?::[\d]+)?(?::[\d]+)?/g);
    if (parts.length > 1) {
      var rest = "";
      parts.forEach(function(p) {
        rest = string2.split(p)[1] || "";
      });
      var wait = rest.trim().match(/wait\s[\d]+\s[a-z]+/);
      if (wait) {
        parts.push(wait[0]);
      }
    }
    var moment = parts.reduce(function(obj, part) {
      if (/([\d]+th|\dst|\dnd|first|last)/.test(part)) {
        obj.day = /^[\d]/.test(part) ? parseInt(part, 10) : part === "first" ? 1 : part;
      }
      if (/^at/.test(part)) {
        obj.time = toTime(clone$1(date), part.substring(3));
      } else if (/wait/.test(part)) {
        obj.idle = toInterval(part.substring(5));
      } else if (/^[\a-zA-Z]+$/.test(part)) {
        obj.month = part;
      }
      return obj;
    }, {
      idle: null,
      day: null,
      month: null,
      time: null,
      date: null,
      dist: null,
      wait: false
    });
    if (!moment.time) {
      moment.time = clone$1(date);
      moment.time.setDate(1);
      moment.time = setMonth(moment.time, moment.month);
      moment.time = setDayOfMonth(moment.time, moment.day);
      var hourlyMoment = toHourlyMoment(moment.time, string2);
      if (hourlyMoment.wait) {
        return moment;
      }
      moment.time = clone$1(sameDate(date, moment.time) && hourlyMoment.date ? hourlyMoment.date : hourlyMoment.from);
      var dist = moment.time - date;
      if (dist < 0) {
        moment.time = clone$1(hourlyMoment.from);
        moment.time.setFullYear(moment.time.getFullYear() + 1);
        dist = moment.time - date;
      }
      moment.dist = dist;
    } else {
      moment.time.setDate(1);
      moment.time = setMonth(moment.time, moment.month);
      moment.time = setDayOfMonth(moment.time, moment.day);
      var _dist = moment.time - date;
      var distOverflow = 0;
      if (_dist < 0) {
        distOverflow = _dist;
        moment.time.setFullYear(moment.time.getFullYear() + 1);
        _dist = moment.time - date;
      }
      if (moment.idle !== null && distOverflow + moment.idle > 0) {
        moment.wait = true;
        return moment;
      }
      moment.dist = _dist;
    }
    moment.date = clone$1(moment.time);
    return moment;
  };
  var toMonthlyMoment = function toMonthlyMoment2(date, string2) {
    var parts = string2.match(/[\d]+th|\dst|\dnd|first|last|at\s[\d]+(?::[\d]+)?(?::[\d]+)?/g);
    if (parts.length > 1) {
      var rest = "";
      parts.forEach(function(p) {
        rest = string2.split(p)[1] || "";
      });
      var wait = rest.trim().match(/wait\s[\d]+\s[a-z]+/);
      if (wait) {
        parts.push(wait[0]);
      }
    }
    var moment = parts.reduce(function(obj, part) {
      if (/([\d]+th|\dst|\dnd|first|last)/.test(part)) {
        obj.day = /^[\d]/.test(part) ? parseInt(part, 10) : part === "first" ? 1 : part;
      }
      if (/^at/.test(part)) {
        obj.time = toTime(clone$1(date), part.substring(3));
      } else if (/wait/.test(part)) {
        obj.idle = toInterval(part.substring(5));
      }
      return obj;
    }, {
      idle: null,
      day: null,
      time: null,
      date: null,
      dist: null,
      wait: false
    });
    if (!moment.time) {
      moment.time = setDayOfMonth(clone$1(date), moment.day);
      var hourlyMoment = toHourlyMoment(moment.time, string2);
      if (hourlyMoment.wait) {
        return moment;
      }
      moment.time = clone$1(sameDate(date, moment.time) && hourlyMoment.date ? hourlyMoment.date : hourlyMoment.from);
      var dist = moment.time - date;
      if (dist < 0) {
        moment.time = clone$1(hourlyMoment.from);
        moment.time.setDate(1);
        moment.time.setMonth(moment.time.getMonth() + 1);
        setDayOfMonth(moment.time, moment.day);
        dist = moment.time - date;
      }
      moment.dist = dist;
    } else {
      moment.time = setDayOfMonth(moment.time, moment.day);
      var _dist2 = moment.time - date;
      var distOverflow = 0;
      if (_dist2 < 0) {
        distOverflow = _dist2;
        moment.time.setDate(1);
        moment.time.setMonth(moment.time.getMonth() + 1);
        setDayOfMonth(moment.time, moment.day);
        _dist2 = moment.time - date;
      }
      if (moment.idle !== null && distOverflow + moment.idle > 0) {
        moment.wait = true;
        return moment;
      }
      moment.dist = _dist2;
    }
    moment.date = clone$1(moment.time);
    return moment;
  };
  var toWeeklyMoment = function toWeeklyMoment2(date, string2) {
    var parts = string2.match(/(?:mon|tues|wednes|thurs|fri|satur|sun)day|at\s[\d]+(?::[\d]+)?(?::[\d]+)?/g);
    if (parts.length > 1) {
      var rest = "";
      parts.forEach(function(p) {
        rest = string2.split(p)[1] || "";
      });
      var wait = rest.trim().match(/wait\s[\d]+\s[a-z]+/);
      if (wait) {
        parts.push(wait[0]);
      }
    }
    var moment = parts.reduce(function(obj, part) {
      if (/(?:mon|tues|wednes|thurs|fri|satur|sun)day/.test(part)) {
        obj.day = Days[capitalizeFirstLetter(part)];
      }
      if (/^at/.test(part)) {
        obj.time = toTime(clone$1(date), part.substring(3));
      } else if (/wait/.test(part)) {
        obj.idle = toInterval(part.substring(5));
      }
      return obj;
    }, {
      idle: null,
      day: null,
      time: null,
      date: null,
      dist: null,
      wait: false
    });
    if (!moment.time) {
      moment.time = setDay(clone$1(date), moment.day);
      var hourlyMoment = toHourlyMoment(moment.time, string2);
      if (hourlyMoment.wait) {
        return moment;
      }
      moment.time = clone$1(sameDate(date, moment.time) && hourlyMoment.date ? hourlyMoment.date : hourlyMoment.from);
      var dist = moment.time - date;
      if (dist < 0) {
        moment.time.setDate(moment.time.getDate() + 7);
      }
      moment.dist = dist;
    } else {
      moment.time = setDay(moment.time, moment.day);
      var _dist3 = moment.time - date;
      if (_dist3 < 0) {
        moment.time.setDate(moment.time.getDate() + 7);
        _dist3 = moment.time - date;
      }
      if (moment.idle !== null && _dist3 >= TimeUnit.Week - moment.idle) {
        moment.wait = true;
        return moment;
      }
      moment.dist = _dist3;
    }
    moment.date = clone$1(moment.time);
    return moment;
  };
  var toDailyMoment = function toDailyMoment2(date, string2) {
    var parts = string2.match(/([\d]+(?::[\d]+)?(?::[\d]+)?)|(wait\s[\d]+\s[a-z]+)/g);
    var moment = parts.reduce(function(obj, part) {
      if (/^[\d]/.test(part)) {
        obj.time = toTime(clone$1(date), part);
      } else if (/wait/.test(part)) {
        obj.idle = toInterval(part.substring(5));
      }
      return obj;
    }, {
      idle: null,
      time: null,
      date: null,
      wait: false,
      dist: null
    });
    var dist = moment.time - date;
    if (dist < 0) {
      moment.time.setDate(moment.time.getDate() + 1);
      dist = moment.time - date;
    }
    if (moment.idle !== null && dist >= TimeUnit.Day - moment.idle) {
      moment.wait = true;
      return moment;
    }
    moment.dist = dist;
    moment.date = clone$1(moment.time);
    return moment;
  };
  var toHourlyMoment = function toHourlyMoment2(date, string2) {
    var parts = string2.match(/((?:[\d]+\s)?(?:hours|hour|minutes|minute|seconds|second))|((?:from|till)\s[\d]+(?::[\d]+)?(?::[\d]+)?)|(wait\s[\d]+\s[a-z]+)/g);
    var moment = parts.reduce(function(obj, part) {
      if (/from/.test(part)) {
        obj.from = toTime(obj.from, part.split(" ")[1]);
      } else if (/till/.test(part)) {
        obj.till = toTime(obj.till, part.split(" ")[1]);
      } else if (/wait/.test(part)) {
        obj.idle = toInterval(part.substring(5));
      } else if (/hours|hour|minutes|minute|seconds|second/.test(part)) {
        obj.interval = toInterval(part);
      }
      return obj;
    }, {
      idle: null,
      interval: null,
      date: null,
      dist: null,
      wait: false,
      from: toTime(clone$1(date), "0"),
      till: toTime(clone$1(date), "23:59:59:999")
    });
    if (date < moment.from || date >= moment.till) {
      return moment;
    }
    if (moment.interval > moment.till - moment.from) {
      return moment;
    }
    var diff = date - moment.from;
    var dist = moment.interval - diff % moment.interval;
    if (moment.idle !== null && dist >= moment.interval - moment.idle) {
      moment.wait = true;
      return moment;
    }
    moment.dist = dist;
    moment.date = new Date(date.getTime() + moment.dist);
    return moment;
  };
  var toMoment = function toMoment2(date, string2) {
    if (/januari|februari|march|april|may|june|july|august|september|october|november|december/.test(string2)) {
      return toYearlyMoment(date, string2);
    }
    if (/month/.test(string2)) {
      return toMonthlyMoment(date, string2);
    }
    if (/(?:mon|tues|wednes|thurs|fri|satur|sun)day/.test(string2)) {
      return toWeeklyMoment(date, string2);
    }
    if (/day at/.test(string2) || /^at /.test(string2)) {
      return toDailyMoment(date, string2);
    }
    if (/hours|hour|minutes|minute|seconds|second/.test(string2)) {
      return toHourlyMoment(date, string2);
    }
    return null;
  };
  var getNextScheduledDate = function getNextScheduledDate2(date, schedule) {
    var moments = schedule.split(",").map(trim).map(function(s) {
      return toMoment(date, s);
    });
    var nearest = null;
    for (var i = 0; i < moments.length; i++) {
      var moment = moments[i];
      if (nearest === null && moment.wait) {
        return null;
      }
      if (nearest === null) {
        nearest = moment;
      } else if (nearest.dist === null && moment.dist !== null) {
        nearest = moment;
      } else if (moment.dist !== null && moment.dist < nearest.dist) {
        nearest = moment;
      }
    }
    return nearest.date;
  };
  var getServerOffset = function getServerOffset2(server, cb) {
    if (server === true) {
      serverDate(function(date) {
        cb(date.getTime() - now$1().getTime());
      });
      return;
    }
    if (typeof server === "string") {
      setTimeout(function() {
        cb(dateFromISO(server).getTime() - now$1().getTime());
      }, 0);
      return;
    }
    setTimeout(function() {
      cb(0);
    }, 0);
  };
  var DEFAULT_COUNTDOWN_OPTIONS = {
    format: ["d", "h", "m", "s"],
    cascade: true,
    server: null,
    // null (use client date) | true (use info in Date header) | ISO 8601 (fixed date)
    interval: 1e3
  };
  var createCounter = function createCounter2(props) {
    return _extends({
      // read only
      complete: false,
      offset: null,
      value: null,
      timer: null,
      // api
      onload: function onload() {
      },
      onupdate: function onupdate(value2) {
      }
    }, props);
  };
  var countdownAmount = function countdownAmount2(total) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (typeof total !== "number") {
      throw `Can't start counter, the "milliseconds" parameter is required`;
    }
    options = mergeObjects({ units: "seconds", target: 0, amount: 1e3, interval: 1e3 }, options);
    var target = options.target;
    var current = total;
    var counter = createCounter({
      target,
      onended: function onended() {
      }
    });
    setTimeout(function() {
      var count = function count2(runtime) {
        current = total - runtime / options.interval * options.amount;
        if (current <= target) {
          counter.value = options.target;
          counter.onupdate(counter.value / TimeUnit[options.units]);
          counter.timer.stop();
          counter.onended();
          return;
        }
        counter.value = current;
        counter.onupdate(counter.value / TimeUnit[options.units]);
      };
      counter.timer = setTimer(count, options.interval, { autostart: false });
      counter.complete = true;
      counter.onload();
      counter.timer.start();
    }, 0);
    return counter;
  };
  var countdownDuration = function countdownDuration2(due) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (typeof due === "undefined") {
      throw `Can't start counter, the "due" parameter is required`;
    }
    options = mergeObjects(DEFAULT_COUNTDOWN_OPTIONS, options);
    var target = isDate(due) ? due : dateFromISO(due);
    var counter = createCounter({
      due: clone$1(target),
      onended: function onended() {
      }
    });
    getServerOffset(options.server, function(offset) {
      counter.offset = offset;
      var count = function count2() {
        var now$$1 = offsetDate(offset);
        if (target - now$$1 <= 0) {
          counter.value = new Array(options.format.length).fill(0);
          counter.onupdate(counter.value);
          counter.timer.stop();
          counter.onended();
          return;
        }
        counter.value = dateDiff(now$$1, target, options.format, options.cascade);
        counter.onupdate(counter.value);
      };
      counter.timer = setTimer(count, options.interval, { autostart: false });
      counter.complete = true;
      counter.onload();
      counter.timer.start();
    });
    return counter;
  };
  var countUpDuration = function countUpDuration2(since) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (typeof since === "undefined") {
      throw `Can't start counter, the "since" parameter is required`;
    }
    options = mergeObjects(DEFAULT_COUNTDOWN_OPTIONS, options);
    var from = isDate(since) ? since : dateFromISO(since);
    var counter = createCounter({
      since: clone$1(from)
    });
    getServerOffset(options.server, function(offset) {
      counter.offset = offset;
      var count = function count2() {
        var now$$1 = offsetDate(offset);
        counter.value = dateDiff(from, now$$1, options.format, options.cascade);
        counter.onupdate(counter.value);
      };
      counter.timer = setTimer(count, options.interval, { autostart: false });
      counter.complete = true;
      counter.onload();
      counter.timer.start();
    });
    return counter;
  };
  var countScheduled = function countScheduled2(schedule) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (typeof schedule !== "string") {
      throw `Can't start scheduler, "schedule" is a required parameter`;
    }
    options = mergeObjects(_extends({}, DEFAULT_COUNTDOWN_OPTIONS, { timezone: null }), options);
    var timezone = options.timezone ? toTimezoneOffset(options.timezone) : null;
    var counter = createCounter({
      waiting: null,
      nextScheduledDate: null,
      previouslyScheduledDate: null,
      onrepeat: function onrepeat(nextDate2, lastDate2) {
      },
      onresume: function onresume(nextDate2) {
      },
      onwait: function onwait(sinceDate) {
      }
    });
    var lastDate = void 0;
    var nextDate = null;
    getServerOffset(options.server, function(offset) {
      counter.offset = offset;
      var count = function count2() {
        var now$$1 = offsetDate(offset);
        if (timezone !== null) {
          now$$1 = timezoneDate(now$$1, timezone);
        }
        nextDate = getNextScheduledDate(now$$1, schedule);
        counter.waiting = nextDate === null;
        if (counter.waiting) {
          if (lastDate === void 0) {
            lastDate = null;
          }
          counter.value = new Array(options.format.length).fill(0);
          if (counter.nextScheduledDate) {
            counter.previouslyScheduledDate = clone$1(counter.nextScheduledDate);
          }
          counter.nextScheduledDate = nextDate === null ? null : clone$1(nextDate);
          counter.onwait(counter.previouslyScheduledDate ? clone$1(counter.previouslyScheduledDate) : null);
          return;
        }
        counter.nextScheduledDate = clone$1(nextDate);
        if (lastDate === null) {
          counter.onresume(clone$1(nextDate));
        }
        if (lastDate === null || lastDate !== void 0 && !sameTime(lastDate, nextDate)) {
          counter.onrepeat(clone$1(nextDate), lastDate ? clone$1(lastDate) : null);
          if (lastDate) {
            counter.previouslyScheduledDate = clone$1(lastDate);
          }
        }
        lastDate = clone$1(nextDate);
        counter.value = dateDiff(now$$1, nextDate, options.format, options.cascade);
        counter.onupdate(counter.value);
      };
      counter.timer = setTimer(count, options.interval, { autostart: false });
      counter.complete = true;
      counter.onload();
      counter.timer.start();
    });
    return counter;
  };
  var support = function() {
    var w = window;
    if (typeof w === "undefined") {
      return false;
    }
    var canSupport = w.CSS && w.CSS.supports;
    var isIE11 = !!w.MSInputMethodContext && !!document.documentMode;
    var canTransform = canSupport && CSS.supports("transform", "translateX(0)");
    var features = ["MutationObserver", "requestAnimationFrame"];
    return isIE11 || canSupport && canTransform && !!features.filter(function(p) {
      return p in w;
    }).length;
  };
  var transform = function() {
    for (var _len = arguments.length, transforms = Array(_len), _key = 0; _key < _len; _key++) {
      transforms[_key] = arguments[_key];
    }
    return function(value2, cb) {
      var output = [];
      var input2 = value2;
      transforms.forEach(function(t, i) {
        t(input2, function(out) {
          output[i] = out;
          if (i === transforms.length - 1) {
            cb(output.length === 1 ? output[0] : output);
          }
        });
      });
    };
  };
  var pad = function() {
    var padding = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var side = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "left";
    return function(value2, cb) {
      return cb(padding.length > ("" + value2).length ? side === "left" ? ("" + padding + value2).slice(-padding.length) : ("" + value2 + padding).substring(0, padding.length) : value2);
    };
  };
  var ascii = function() {
    return function(value2, cb) {
      return cb((value2 + "").charCodeAt(0));
    };
  };
  var add$1 = function(amount) {
    return function(value2, cb) {
      return cb(value2 + amount);
    };
  };
  var abs = function() {
    return function(value2, cb) {
      return cb(Math.abs(value2));
    };
  };
  var value$1 = function(staticValue) {
    return function(value2, cb) {
      return cb(staticValue);
    };
  };
  var modulus = function(amount) {
    return function(value2, cb) {
      return cb(value2 % amount);
    };
  };
  var subtract = function(amount) {
    return function(value2, cb) {
      return cb(value2 - amount);
    };
  };
  var replace = function(needle, replacement) {
    return function(string2, cb) {
      return cb((string2 + "").replace(new RegExp(needle === "." ? "\\" + needle : needle, "g"), replacement));
    };
  };
  var round = function() {
    var decimals = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    return function(value2, cb) {
      return cb(decimals ? value2.toFixed(decimals) : Math.round(value2));
    };
  };
  var floor = function() {
    return function(value2, cb) {
      return cb(Math.floor(value2));
    };
  };
  var ceil = function() {
    return function(value2, cb) {
      return cb(Math.ceil(value2));
    };
  };
  var fraction = function() {
    var min = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
    return function(value2, cb) {
      return cb((parseFloat(value2) - min) / (max - min));
    };
  };
  var multiply = function(amount) {
    return function(value2, cb) {
      return cb(value2 * amount);
    };
  };
  var divide = function(amount) {
    return function(value2, cb) {
      return cb(value2 / amount);
    };
  };
  var format = function(template) {
    return function(value2, cb) {
      return cb(template.replace(/\$0/gi, value2));
    };
  };
  var split = function() {
    var character = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return function(string2, cb) {
      return cb((string2 + "").split(character));
    };
  };
  var plural = function(single, plural2) {
    return function(value2, cb) {
      return cb(value2 === 1 ? single : plural2);
    };
  };
  var limit = function() {
    var min = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    return function(value2, cb) {
      return cb(Math.min(Math.max(value2, min), max));
    };
  };
  var reverse = function() {
    return function(value2, cb) {
      return cb(Array.isArray(value2) ? value2.reverse() : (value2 + "").split("").reverse().join(""));
    };
  };
  var arrive$1 = function(maxVelocity, friction) {
    var resetToBegin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var catchUp = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
    var initial = null;
    var previous = null;
    var translator2 = null;
    return function(value2, cb) {
      value2 = parseFloat(value2);
      if (initial === null) {
        initial = value2;
        cb(value2);
        return;
      }
      if (resetToBegin && previous !== null && initial === value2) {
        translator2.cancel();
        translator2 = null;
      }
      if (catchUp && previous !== null && value2 - translator2.getPosition() > 1) {
        translator2.cancel();
        translator2 = null;
        previous = null;
        initial = value2;
        cb(value2);
        return;
      }
      if (!translator2) {
        translator2 = createTranslator("arrive", maxVelocity, friction);
        translator2.update(cb, initial, value2);
      } else {
        translator2.update(cb, value2);
      }
      previous = value2;
    };
  };
  var spring$1 = function(stiffness, damping, mass) {
    var current = null;
    var translator2 = null;
    return function(value2, cb) {
      value2 = parseFloat(value2);
      if (current === null) {
        current = value2;
        cb(value2);
        return;
      }
      if (!translator2) {
        translator2 = createTranslator("spring", stiffness, damping, mass);
        translator2.update(cb, current, value2);
      } else {
        translator2.update(cb, value2);
      }
    };
  };
  var delay = function() {
    var order = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "rtl";
    var min = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;
    var max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 50;
    var current = null;
    return function(value2, cb) {
      if (!current) {
        current = copyArray(value2);
        cb(copyArray(current));
        return;
      }
      current = order === "rtl" ? current.slice(current.length - value2.length, current.length) : current.slice(0, value2.length);
      var indexes = range(value2.length);
      if (order === "random") {
        shuffle(indexes);
      }
      if (order === "rtl") {
        indexes.reverse();
      }
      var update = function update2() {
        flip(indexes.shift(), current, value2, cb);
        if (indexes.length) {
          setTimeout(update2, random(min, max));
        }
      };
      update();
    };
  };
  var flip = function flip2(index, current, next, cb) {
    current[index] = next[index];
    cb(copyArray(current));
  };
  var number = function() {
    var decimalsSeparator = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ".";
    var thousandsSeparator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    var decimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 2;
    return function(value2, cb) {
      cb((value2 < 0 ? "-" : "") + parseFloat(Math.abs(value2)).toFixed(decimals).replace(/./g, function(c, i, a) {
        if (c === ".") {
          return decimalsSeparator;
        }
        return i && (a.length - i) % 3 === 0 ? thousandsSeparator + c : c;
      }));
    };
  };
  var percentage = function() {
    var min = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
    var f = fraction(min, max);
    return function(value2, cb) {
      f(value2, function(value3) {
        cb(value3 * 100);
      });
    };
  };
  var step$1 = function(velocity) {
    var initial = null;
    var previous = null;
    var translator2 = null;
    return function(value2, cb) {
      value2 = parseFloat(value2);
      if (initial === null) {
        initial = value2;
        cb(value2);
        return;
      }
      if (previous !== null && initial === value2) {
        translator2.cancel();
        translator2 = null;
      }
      if (!translator2) {
        translator2 = createTranslator("step", velocity);
        translator2.update(cb, initial, value2);
      } else {
        translator2.update(cb, value2);
      }
      previous = value2;
    };
  };
  var upper = function() {
    return function(value2, cb) {
      return cb((value2 + "").toUpperCase());
    };
  };
  var lower = function() {
    return function(value2, cb) {
      return cb((value2 + "").toLowerCase());
    };
  };
  var duration$1 = function() {
    for (var _len = arguments.length, format2 = Array(_len), _key = 0; _key < _len; _key++) {
      format2[_key] = arguments[_key];
    }
    return function(value2, cb) {
      return cb(timeDuration(value2, format2));
    };
  };
  var keys = function() {
    for (var _len = arguments.length, keys2 = Array(_len), _key = 0; _key < _len; _key++) {
      keys2[_key] = arguments[_key];
    }
    return function(value2, cb) {
      var output = {};
      value2.forEach(function(v, i) {
        output[keys2[i]] = v;
      });
      cb(output);
    };
  };
  var map = function(transform2) {
    return function(value2, cb) {
      var output = [];
      var input2 = value2;
      input2.forEach(function(v, vi) {
        transform2(v, function(out) {
          output[vi] = out;
          if (vi === input2.length - 1) {
            cb(output.concat());
          }
        });
      });
    };
  };
  var rotate = function() {
    for (var _len = arguments.length, transforms = Array(_len), _key = 0; _key < _len; _key++) {
      transforms[_key] = arguments[_key];
    }
    return function(value2, cb) {
      var input2 = Array.isArray(value2) ? value2 : [value2];
      var output = [];
      var totalTransforms = transforms.length;
      input2.forEach(function(v, i) {
        transforms[i % totalTransforms](v, function(out) {
          output[i] = out;
          if (i === input2.length - 1) {
            cb(output);
          }
        });
      });
    };
  };
  var input = function() {
    return function(value2, cb) {
      return cb(value2);
    };
  };
  var substring = function(from, to) {
    return function(value2, cb) {
      return cb((value2 + "").substring(from, to));
    };
  };
  var tween = function(duration2) {
    var ease = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "ease-linear";
    var delay2 = arguments[2];
    duration2 = toDuration(duration2);
    var easeFn = getExtension(ExtensionType.EASING_FUNCTION, ease);
    var cancel = null;
    var previous = null;
    return function(value2, cb) {
      value2 = parseFloat(value2);
      if (cancel) {
        cancel();
      }
      if (previous === null || value2 === previous) {
        previous = value2;
        cb(value2);
        return;
      }
      var to = value2;
      var from = previous;
      var dist = to - from;
      cancel = animate(function(p) {
        cb(from + p * dist);
      }, function() {
        cancel = null;
      }, duration2, easeFn, delay2);
      previous = value2;
    };
  };
  var preset = function() {
    for (var _len = arguments.length, presets2 = Array(_len), _key = 0; _key < _len; _key++) {
      presets2[_key] = arguments[_key];
    }
    return function(value2, cb, instance) {
      return cb(value2.map(function(v, index) {
        return instance.getPreset(presets2[index])(v, instance.getConstants(), instance);
      }));
    };
  };
  var char = function(filter) {
    var replacement = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var regex = filter ? new RegExp("[^" + filter + "]", "g") : null;
    return function(value2, cb) {
      var char2 = String.fromCharCode(value2);
      if (regex) {
        char2 = char2.replace(regex, replacement);
      }
      cb(char2);
    };
  };
  var Transforms = {
    ascii,
    char,
    tween,
    value: value$1,
    input,
    rotate,
    map,
    transform,
    upper,
    lower,
    abs,
    add: add$1,
    subtract,
    modulus,
    pad,
    number,
    replace,
    round,
    ceil,
    floor,
    fraction,
    percentage,
    multiply,
    divide,
    split,
    format,
    plural,
    limit,
    reverse,
    arrive: arrive$1,
    spring: spring$1,
    delay,
    step: step$1,
    keys,
    duration: duration$1,
    substring,
    preset
  };
  addExtensions(ExtensionType.TRANSFORM, Transforms);
  var crossfade = function() {
    var speed = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
    var delayIn = arguments[1];
    var delayOut = arguments[2];
    return {
      intro: [{ name: "fade", parameters: [0, 1], duration: 1e3 * speed, delay: toDuration(delayIn) }],
      outro: [{ name: "fade", parameters: [1, 0], duration: 1e3 * speed, delay: toDuration(delayOut) }]
    };
  };
  var swap = function() {
    var axis = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "y";
    var distance = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var speed = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var delayIn = arguments[3];
    var delayOut = arguments[4];
    return {
      intro: [{
        name: "move",
        parameters: ["" + -distance * 100, "0%", axis],
        duration: 1e3 * speed,
        delay: toDuration(delayIn)
      }],
      outro: [{
        name: "move",
        parameters: ["0%", "" + distance * 100, axis],
        duration: 1e3 * speed,
        delay: toDuration(delayOut)
      }]
    };
  };
  var revolve = function() {
    var axis = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "y";
    var distance = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var speed = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var delayIn = arguments[3];
    var delayOut = arguments[4];
    return {
      intro: [{
        name: "rotate",
        parameters: [-distance * 90 + "deg", "0deg", axis],
        duration: 1e3 * speed,
        delay: toDuration(delayIn)
      }],
      outro: [{
        name: "rotate",
        parameters: ["0deg", distance * 90 + "deg", axis],
        duration: 1e3 * speed,
        delay: toDuration(delayOut)
      }]
    };
  };
  var zoom = function() {
    var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    var speed = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var delayIn = arguments[2];
    var delayOut = arguments[3];
    return {
      intro: [{
        name: "scale",
        parameters: [offset, 1],
        duration: 1e3 * speed,
        delay: toDuration(delayIn)
      }],
      outro: [{
        name: "scale",
        parameters: [1, offset],
        duration: 1e3 * speed,
        delay: toDuration(delayOut)
      }]
    };
  };
  var Translation = {
    "x": "translateX",
    "y": "translateY",
    "z": "translateZ"
  };
  var Rotation = {
    "x": "rotateX",
    "y": "rotateY",
    "z": "rotateZ"
  };
  var Scalar = {
    "both": "scale",
    "x": "scaleX",
    "y": "scaleY"
  };
  var between = function between2(from, to, p) {
    return from + (to - from) * p;
  };
  var fade = function fade2(element, p, direction) {
    var ease = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : easeInOutQuad;
    var from = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
    var to = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1;
    if (direction < 0) {
      var _ref = [to, from];
      from = _ref[0];
      to = _ref[1];
    }
    element.style.opacity = between(from, to, ease(p));
  };
  var move = function move2(element, p, direction) {
    var ease = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : easeInOutQuad;
    var from = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "0";
    var to = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "100%";
    var axis = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : "y";
    if (direction < 0) {
      var _ref2 = [to, from];
      from = _ref2[0];
      to = _ref2[1];
    }
    var f = cache(from, toCSSValue);
    var t = cache(to, toCSSValue);
    setTransform(element, Translation[axis], between(f.value, t.value, ease(p)), f.units || t.units);
  };
  var rotate$1 = function rotate2(element, p, direction) {
    var ease = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : easeInOutQuad;
    var from = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "0";
    var to = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "90deg";
    var axis = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : "x";
    if (direction < 0) {
      var _ref3 = [to, from];
      from = _ref3[0];
      to = _ref3[1];
    }
    var f = cache(from, toCSSValue);
    var t = cache(to, toCSSValue);
    setTransform(element, Rotation[axis], between(f.value, t.value, ease(p)), f.units || t.units);
  };
  var scale = function scale2(element, p, direction) {
    var ease = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : easeInOutQuad;
    var from = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
    var to = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1;
    var axis = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : "both";
    if (direction < 0) {
      var _ref4 = [to, from];
      from = _ref4[0];
      to = _ref4[1];
    }
    setTransform(element, Scalar[axis], between(from, to, ease(p)));
  };
  var Transitions = {
    fade,
    move,
    rotate: rotate$1,
    scale,
    // composed transitions
    crossfade,
    swap,
    revolve,
    zoom
  };
  addExtensions(ExtensionType.TRANSITION, Transitions);
  var API = {
    /**
     * Quick way to detect if Tick is supported
     */
    supported: support(),
    // options
    options: {
      setConstant,
      setPreset
    },
    /**
     * Helper Methods
     */
    helper: {
      // Starts an interval and calls callback method on each tick
      interval: setTimer,
      // Returns current time or date object based on ISO
      date: function date(iso) {
        return iso ? dateFromISO(iso) : now$1();
      },
      // Returns duration in milliseconds or duration between two dates
      duration
    },
    /**
     * Data Access
     */
    data: {
      // Request data from a url
      request,
      // Poll a URL for data with a set interval
      poll: function poll(url, cb) {
        var interval = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 6e4;
        return setTimer(function() {
          request(url, cb);
        }, interval);
      }
    },
    /**
     * DOM Operations
     */
    DOM: {
      // Create a new ticker
      create,
      // Destroy an existing ticker
      destroy,
      // Parse a piece of the DOM for tickers
      parse,
      // Find a specific ticker by DOM node
      find
    },
    count: {
      down: function down() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (typeof args[0] === "number" && typeof args[1] === "string") {
          var value2 = args[0];
          var units = args[1].toLowerCase();
          args.shift();
          args[0] = duration(value2, units);
          args[1] = args[1] || {};
          args[1].units = units;
          return countdownAmount.apply(void 0, args);
        }
        if (typeof args[0] === "string" || isDate(args[0])) {
          return countdownDuration.apply(void 0, args);
        }
        return null;
      },
      up: countUpDuration,
      schedule: countScheduled
    },
    /**
     * Public method to extend Tick functionality
     */
    plugin: {
      add: function add2(type2, name, fn) {
        if (typeof type2 === "function") {
          var extension = type2;
          return addExtension(extension.identifier.type, extension.identifier.name, extension);
        }
        return addExtension(type2, name, fn);
      }
    }
  };
  var _loop = function _loop2(type2) {
    if (!ExtensionType.hasOwnProperty(type2)) {
      return "continue";
    }
    API.plugin[dashesToCamels("add-" + ExtensionType[type2])] = function(name, fn) {
      addExtension(ExtensionType[type2], name, fn);
    };
  };
  for (var type in ExtensionType) {
    var _ret = _loop(type);
    if (_ret === "continue")
      continue;
  }
  module.exports = API;
  return module.exports;
}() : null;

// node_modules/@pqina/flip/dist/tick.view.flip.module.js
var tick_view_flip_module_default = typeof window !== "undefined" ? function() {
  if (!module) {
    var module = {};
  }
  "use strict";
  var asyncGenerator = function() {
    function AwaitValue(value) {
      this.value = value;
    }
    function AsyncGenerator(gen) {
      var front, back;
      function send(key, arg) {
        return new Promise(function(resolve, reject) {
          var request = {
            key,
            arg,
            resolve,
            reject,
            next: null
          };
          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }
      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;
          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(function(arg2) {
              resume("next", arg2);
            }, function(arg2) {
              resume("throw", arg2);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }
      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value,
              done: true
            });
            break;
          case "throw":
            front.reject(value);
            break;
          default:
            front.resolve({
              value,
              done: false
            });
            break;
        }
        front = front.next;
        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }
      this._invoke = send;
      if (typeof gen.return !== "function") {
        this.return = void 0;
      }
    }
    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
        return this;
      };
    }
    AsyncGenerator.prototype.next = function(arg) {
      return this._invoke("next", arg);
    };
    AsyncGenerator.prototype.throw = function(arg) {
      return this._invoke("throw", arg);
    };
    AsyncGenerator.prototype.return = function(arg) {
      return this._invoke("return", arg);
    };
    return {
      wrap: function(fn) {
        return function() {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function(value) {
        return new AwaitValue(value);
      }
    };
  }();
  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var createClass = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var index = function(_ref) {
    var DOM = _ref.DOM, animate = _ref.Animation.animate, Extension = _ref.Extension, performance = _ref.Date.performance, _ref$View = _ref.View, rooter = _ref$View.rooter, destroyer = _ref$View.destroyer, drawer = _ref$View.drawer, updater = _ref$View.updater, styler = _ref$View.styler;
    var easeOutCubic = Extension.getExtension(Extension.Type.EASING_FUNCTION, "ease-out-cubic");
    var easeOutSine = Extension.getExtension(Extension.Type.EASING_FUNCTION, "ease-out-sine");
    var draw = function draw2(state) {
      if (state.isInitialValue()) {
        state.root.textContent = "";
        state.spacer = DOM.create("span", "tick-flip-spacer");
        state.root.appendChild(state.spacer);
        var shadowTop = DOM.create("span", "tick-flip-shadow-top tick-flip-shadow tick-flip-front");
        var shadowBottom = DOM.create("span", "tick-flip-shadow-bottom tick-flip-shadow tick-flip-back");
        state.root.appendChild(shadowTop);
        state.root.appendChild(shadowBottom);
        state.shadowCard = DOM.create("span", "tick-flip-card-shadow");
        state.root.appendChild(state.shadowCard);
      }
      state.spacer.textContent = state.value;
      if (!state.isInitialValue() && !DOM.visible(state.root)) {
        state.cards.forEach(function(card) {
          card.back = state.value;
          card.front = state.value;
        });
        return;
      }
      var turningCard = state.cards[state.cards.length - 1];
      if (turningCard) {
        turningCard.waiting = false;
        turningCard.offset = performance();
        turningCard.back = state.value;
      }
      if (state.isInitialValue()) {
        var initialBottomCard = new FlipCard();
        initialBottomCard.back = state.value;
        initialBottomCard.offset = null;
        initialBottomCard.progress = 1;
        state.root.insertBefore(initialBottomCard.root, state.root.firstChild);
        state.cards.push(initialBottomCard);
      }
      var topCard = new FlipCard();
      topCard.offset = null;
      topCard.progress = 0;
      topCard.visual_progress = 0;
      topCard.waiting = true;
      topCard.front = state.value;
      topCard.rotate(0);
      state.root.insertBefore(topCard.root, state.root.firstChild);
      state.cards.push(topCard);
      if (!state.animating) {
        state.animating = true;
        var ease = Extension.getExtension(Extension.Type.EASING_FUNCTION, state.style.flipEasing);
        var tick = function tick2() {
          var cardsToAnimate = state.cards.filter(function(card) {
            return !card.done && !card.waiting;
          });
          if (cardsToAnimate.length === 0) {
            state.animating = false;
            return;
          }
          cardsToAnimate.forEach(function(card) {
            if (card.offset !== null) {
              card.progress = (performance() - card.offset) / state.style.flipDuration;
            }
            if (card.progress >= 1) {
              card.progress = 1;
              card.done = true;
            }
            card.visual_progress = ease(card.progress);
          });
          var cardDistance = 0.01;
          cardsToAnimate.reverse().forEach(function(card, index2) {
            var previousCard = cardsToAnimate[index2 - 1];
            if (previousCard && card.visual_progress <= previousCard.visual_progress) {
              card.visual_progress = previousCard.visual_progress + cardDistance;
            }
          });
          cardsToAnimate.reverse();
          state.cards.forEach(function(card, index2) {
            var shadowFrontProgress = 1 - Math.abs(card.visual_progress - 0.5) * 2;
            var highlightBackProgress = 1 - (card.visual_progress - 0.5) / 0.5;
            card.shadowFront = shadowFrontProgress;
            card.highlightBack = highlightBackProgress;
            var cardAbove = state.cards[index2 + 1];
            if (cardAbove && card.visual_progress > 0.5 && card.visual_progress > 0) {
              card.shadowBack = easeOutCubic(cardAbove.visual_progress);
            }
          });
          cardsToAnimate.forEach(function(card, index2) {
            var p = card.visual_progress;
            if (p > 0.5 && !card.done) {
              card.root.style.zIndex = 10 + index2;
            } else {
              card.root.style.removeProperty("z-index");
            }
            card.rotate(p * -180);
          });
          var shadowProgress = 0;
          var dist = 1;
          cardsToAnimate.forEach(function(card) {
            var d = Math.abs(card.visual_progress - 0.5);
            if (d < dist) {
              dist = d;
              shadowProgress = card.visual_progress;
            }
          });
          var s = shadowProgress < 0.5 ? easeOutSine(shadowProgress / 0.5) : easeOutSine((1 - shadowProgress) / 0.5);
          state.shadowCard.style.opacity = s;
          DOM.transform(state.shadowCard, "scaleY", s);
          state.cards.filter(function(card) {
            return card.done;
          }).slice(0, -1).forEach(function(card) {
            state.cards = state.cards.filter(function(c) {
              return c !== card;
            });
            if (card.root.parentNode) {
              state.root.removeChild(card.root);
            }
          });
          requestAnimationFrame(tick2);
        };
        tick();
      }
    };
    var FlipCard = function() {
      function FlipCard2() {
        classCallCheck(this, FlipCard2);
        this._root = DOM.create("span", "tick-flip-card");
        var front = DOM.create("span", "tick-flip-panel-front tick-flip-front tick-flip-panel");
        var textFront = DOM.create("span", "tick-flip-panel-front-text");
        var textFrontWrapper = DOM.create("span", "tick-flip-panel-text-wrapper");
        textFront.appendChild(textFrontWrapper);
        var shadowFront = DOM.create("span", "tick-flip-panel-front-shadow");
        front.appendChild(textFront);
        front.appendChild(shadowFront);
        var back = DOM.create("span", "tick-flip-panel-back tick-flip-back tick-flip-panel");
        var textBack = DOM.create("span", "tick-flip-panel-back-text");
        var textBackWrapper = DOM.create("span", "tick-flip-panel-text-wrapper");
        textBack.appendChild(textBackWrapper);
        var highlightBack = DOM.create("span", "tick-flip-panel-back-highlight");
        var shadowBack = DOM.create("span", "tick-flip-panel-back-shadow");
        back.appendChild(textBack);
        back.appendChild(highlightBack);
        back.appendChild(shadowBack);
        this._root.appendChild(front);
        this._root.appendChild(back);
        this._front = front;
        this._back = back;
        this._shadowFront = shadowFront;
        this._shadowBack = shadowBack;
        this._highlightBack = highlightBack;
        this._textBack = textBackWrapper;
        this._textFront = textFrontWrapper;
        this._frontValue = null;
        this._backValue = null;
      }
      createClass(FlipCard2, [{
        key: "rotate",
        value: function rotate(degrees) {
          this._front.style.transform = "rotateX(" + degrees + "deg)";
          this._back.style.transform = "rotateX(" + (-180 + degrees) + "deg)";
        }
      }, {
        key: "root",
        get: function get$$1() {
          return this._root;
        }
      }, {
        key: "front",
        set: function set$$1(value) {
          this._frontValue = value;
          this._textFront.textContent = value;
        },
        get: function get$$1() {
          return this._frontValue;
        }
      }, {
        key: "back",
        set: function set$$1(value) {
          this._backValue = value;
          this._textBack.textContent = value;
        },
        get: function get$$1() {
          return this._backValue;
        }
      }, {
        key: "highlightBack",
        set: function set$$1(value) {
          this._highlightBack.style.opacity = value;
        }
      }, {
        key: "shadowBack",
        set: function set$$1(value) {
          this._shadowBack.style.opacity = value;
        }
      }, {
        key: "shadowFront",
        set: function set$$1(value) {
          this._shadowFront.style.opacity = value;
        }
      }]);
      return FlipCard2;
    }();
    return function(root) {
      var state = {
        cards: [],
        lastCard: null,
        initialCard: null,
        shadowAbove: null,
        shadowBelow: null,
        shadowCard: null,
        currentValue: null,
        lastValue: null,
        front: null,
        back: null
      };
      return Object.assign({}, rooter(state, root, "flip"), updater(state), styler(state, {
        flipDuration: 800,
        flipEasing: "ease-out-bounce"
      }), drawer(state, draw), destroyer(state));
    };
  };
  module.exports = index;
  module.exports.identifier = {
    name: "flip",
    type: "view"
  };
  return module.exports;
}() : null;

// node_modules/@pqina/flip/dist/flip.module.js
tick_core_module_default.plugin.add(tick_view_flip_module_default);
var flip_module_default = tick_core_module_default;
export {
  flip_module_default as default
};
//# sourceMappingURL=@pqina_flip.js.map
