"use strict";

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var args = [require.resolve("babel-cli/bin/babel.js")].concat(_toConsumableArray(process.argv.slice(2)), [`--presets=${require.resolve("babel-preset-babili")}`, "--no-babelrc"]);

var opts = {
  stdio: "inherit",
  env: process.env
};

_child_process2.default.spawn(process.execPath, args, opts);