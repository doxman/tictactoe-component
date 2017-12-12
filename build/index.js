module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(13);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(12);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(10);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _shortid = __webpack_require__(2);

var shortid = _interopRequireWildcard(_shortid);

__webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Square(props) {
  return _react2.default.createElement(
    'button',
    { className: "tictactoe-square tictactoe-no-outline tictactoe-no-select " + (props.highlighted ? "tictactoe-highlighted" : ""),
      onClick: props.onClick },
    props.value
  );
}

var Board = function (_Component) {
  _inherits(Board, _Component);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: 'renderSquare',
    value: function renderSquare(i, isHighlightedSquare) {
      var squareID = shortid.generate();

      return _react2.default.createElement(Square, {
        key: squareID,
        id: squareID,
        value: this.props.squares[i],
        onClick: this.props.onClick.bind(this, i),
        highlighted: isHighlightedSquare
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var boardSize = this.props.boardSize;
      var winningSquares = this.props.winningSquares;
      var lineNumbers = Array.from(Array(boardSize).keys());

      // For boardSize N, render N rows of N squares
      return _react2.default.createElement(
        'div',
        { className: 'tictactoe-board tictactoe-centered tictactoe-flex-container tictactoe-bottom-gap-normal' },
        lineNumbers.map(function (i) {
          var rowID = shortid.generate();

          return _react2.default.createElement(
            'div',
            { key: rowID, className: 'tictactoe-flex-container' },
            lineNumbers.map(function (j) {
              var squareNumber = i * boardSize + j;
              var isHighlightedSquare = winningSquares ? winningSquares.includes(squareNumber) : false; // Highlight winning lines

              return _this2.renderSquare(squareNumber, isHighlightedSquare);
            })
          );
        })
      );
    }
  }]);

  return Board;
}(_react.Component);

var TicTacToe = function (_Component2) {
  _inherits(TicTacToe, _Component2);

  function TicTacToe(props) {
    _classCallCheck(this, TicTacToe);

    var _this3 = _possibleConstructorReturn(this, (TicTacToe.__proto__ || Object.getPrototypeOf(TicTacToe)).call(this, props));

    _this3.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      boardSize: 3
    };
    return _this3;
  }

  _createClass(TicTacToe, [{
    key: '_checkIfBoardIsFull',
    value: function _checkIfBoardIsFull(squares) {
      for (var i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          // Square is empty
          return false;
        }
      }
      return true;
    }
  }, {
    key: '_calculateWinner',
    value: function _calculateWinner(squares) {
      var lines = [];
      var boardSize = this.state.boardSize;
      var lineNumbers = Array.from(Array(boardSize).keys());

      var winner = null;
      var winningSquares = [];

      // Push rows and cols

      var _loop = function _loop(i) {
        lines.push(lineNumbers.map(function (val) {
          return val + boardSize * i;
        }));
        lines.push(lineNumbers.map(function (val) {
          return val * boardSize + i;
        }));
      };

      for (var i = 0; i < boardSize; i++) {
        _loop(i);
      }

      // The diagonals have convenient formulas
      lines.push(lineNumbers.map(function (val) {
        return val * (boardSize + 1);
      })); // Push first diagonal
      lines.push(lineNumbers.map(function (val) {
        return (val + 1) * (boardSize - 1);
      })); // Push second diagonal


      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var squareController = squares[line[0]];
        if (!squareController || winner != null && squareController !== winner) {
          continue; // Skip if first square not taken, or if it doesn't match some other winning line
        }

        // This is a winning line if all the other squares are controlled by the same player as the first
        var isWinningLine = true;
        for (var j = 1; j < line.length; j++) {
          if (squares[line[j]] !== squareController) {
            isWinningLine = false;
            break;
          }
        }
        if (isWinningLine) {
          winner = squareController;
          winningSquares = winningSquares.concat(line);
        }
      }

      if (!winner) {
        return null;
      }

      winningSquares = [].concat(_toConsumableArray(new Set(winningSquares))); // Easy way to remove duplicates

      return winner != null ? { winner: winner, winningSquares: winningSquares } : null;
    }
  }, {
    key: '_jumpTo',
    value: function _jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0
      });
    }
  }, {
    key: 'handleBoardClick',
    value: function handleBoardClick(i) {
      var history = this.state.history;
      var stepNumber = this.state.stepNumber;
      var boardSize = this.state.boardSize;

      var currentSquares = history[stepNumber].squares.slice();

      // Ignore the click if the game was already won or the square was already taken
      if (this._calculateWinner(currentSquares) || currentSquares[i]) {
        return;
      }
      currentSquares[i] = this.state.xIsNext ? 'X' : 'O';

      if (history.length <= stepNumber + 1 || history[stepNumber + 1].squares[i] !== currentSquares[i]) {
        // If this click is a new step, concat it to all previous steps
        // Else, this step will overwrite any previous history after this point
        // However, if the step was the same as the history, we don't overwrite
        this.setState({
          history: history.slice(0, stepNumber + 1).concat([{
            squares: currentSquares,
            col: i % boardSize,
            row: Math.floor(i / boardSize)
          }])
        });
      }

      // Jump to the appropriate state
      this._jumpTo(stepNumber + 1);
    }
  }, {
    key: 'handleBoardSizeChange',
    value: function handleBoardSizeChange(event) {
      var newSize = event.target.value;

      if (isNaN(newSize) || newSize.length !== 1) {
        // Validation
        return;
      }

      newSize = parseInt(newSize, 10);

      // Validation part 2
      if (newSize < 3) {
        newSize = 3;
      } else if (newSize > 9) {
        newSize = 9;
      }

      var boardSize = this.state.boardSize;
      if (boardSize !== newSize) {
        this.setState({
          history: [{
            squares: Array(newSize * newSize).fill(null)
          }],
          stepNumber: 0,
          xIsNext: true,
          boardSize: newSize
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var history = this.state.history;
      var stepNumber = this.state.stepNumber;
      var boardSize = this.state.boardSize;

      var currentSquares = history[stepNumber].squares;

      var isFirstMove = stepNumber === 0;
      var isLastMove = stepNumber === history.length - 1;

      var winner = this._calculateWinner(currentSquares);
      var boardIsFull = this._checkIfBoardIsFull(currentSquares);

      // UI for all moves except the first, for which there is a separate UI element
      var moves = history.slice(1).reduce(function (acc, val, ind, arr) {
        if (ind % 2 === 0) {
          acc.push(arr.slice(ind, ind + 2));
        }
        return acc;
      }, []).map(function (stepPair, idx) {
        var firstMove = idx * 2 + 1;
        var secondMove = firstMove + 1;

        var movePairID = shortid.generate();

        return _react2.default.createElement(
          'li',
          { key: movePairID, className: "tictactoe-move-pair tictactoe-flex-container tictactoe-bottom-gap-small " + (idx < 9 ? "tictactoe-single-digit-pair" : "") },
          _react2.default.createElement(
            'div',
            { className: 'left-indented-btn' },
            _react2.default.createElement(
              'button',
              { className: firstMove === stepNumber ? "tictactoe-current-step" : "",
                onClick: function onClick() {
                  return _this4._jumpTo(firstMove);
                } },
              '(' + stepPair[0].col + ', ' + stepPair[0].row + ')'
            )
          ),
          stepPair.length > 1 && _react2.default.createElement(
            'div',
            { className: 'tictactoe-left-indented-btn tictactoe-right-move-column' },
            _react2.default.createElement(
              'button',
              { className: secondMove === stepNumber ? "tictactoe-current-step" : "",
                onClick: function onClick() {
                  return _this4._jumpTo(secondMove);
                } },
              '(' + stepPair[1].col + ', ' + stepPair[1].row + ')'
            )
          )
        );
      });

      var status = {};
      if (winner) {
        status.txt = 'Winner: ' + winner.winner;
        status.bg = 'win';
      } else if (boardIsFull) {
        status.txt = 'Tie game';
        status.bg = 'tie';
      } else {
        status.txt = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'tictactoe-centered tictactoe-bottom-gap-large' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'tictactoe-board-size', className: 'tictactoe-text-component tictactoe-centered tictactoe-bottom-gap-small tictactoe-no-select' },
            'Board size'
          ),
          _react2.default.createElement('input', { className: 'tictactoe-text-component tictactoe-centered tictactoe-rounded-input tictactoe-no-outline', type: 'number', name: 'tictactoe-board-size',
            min: '3', max: '9', value: boardSize,
            onChange: this.handleBoardSizeChange.bind(this)
          })
        ),
        _react2.default.createElement(Board, {
          squares: currentSquares,
          boardSize: boardSize,
          winningSquares: winner ? winner.winningSquares : null,
          onClick: this.handleBoardClick.bind(this)
        }),
        _react2.default.createElement(
          'div',
          { className: "tictactoe-game-status tictactoe-centered tictactoe-text-component tictactoe-bottom-gap-normal tictactoe-no-select " + (status.bg != null ? 'tictactoe-' + status.bg + '-status' : "") },
          status.txt
        ),
        _react2.default.createElement(
          'div',
          { className: 'tictactoe-centered tictactoe-bottom-gap-large' },
          _react2.default.createElement('button', { className: 'tictactoe-move-shift-btn tictactoe-left-indented-btn tictactoe-rounded-input tictactoe-no-outline tictactoe-prev',
            disabled: isFirstMove,
            onClick: function onClick() {
              return _this4._jumpTo(stepNumber - 1);
            }
          }),
          _react2.default.createElement('button', { className: 'tictactoe-move-shift-btn tictactoe-left-indented-btn tictactoe-rounded-input tictactoe-no-outline tictactoe-next',
            disabled: isLastMove,
            onClick: function onClick() {
              return _this4._jumpTo(stepNumber + 1);
            }
          })
        ),
        moves.length > 0 && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { className: "tictactoe-centered tictactoe-text-component tictactoe-bottom-gap-normal tictactoe-no-select " + (0 === stepNumber ? "tictactoe-current-step" : ""),
              onClick: function onClick() {
                return _this4._jumpTo(0);
              } },
            'Start'
          ),
          _react2.default.createElement(
            'ol',
            { className: 'tictactoe-game-moves tictactoe-centered tictactoe-text-component tictactoe-no-select' },
            moves
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'tictactoe-footer-text tictactoe-centered tictactoe-no-select' },
          'Button icons made by ',
          _react2.default.createElement(
            'a',
            { href: 'https://www.flaticon.com/authors/lyolya' },
            'Lyolya'
          ),
          ' from ',
          _react2.default.createElement(
            'a',
            { href: 'https://www.flaticon.com' },
            'www.flaticon.com'
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'tictactoe-footer-text tictactoe-centered tictactoe-no-select' },
          'Web app tested in latest Chrome and FireFox for Linux Mint 18.2'
        )
      );
    }
  }]);

  return TicTacToe;
}(_react.Component);

exports.default = TicTacToe;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, ".tictactoe-centered {\n  margin-left: auto;\n  margin-right: auto;\n  display: table;\n}\n\n.tictactoe-text-component {\n  font: 16px Verdana, Arial, sans-serif;\n}\n\n.tictactoe-flex-container {\n  display: flex;\n}\n\n.tictactoe-bottom-gap-normal {\n  margin-bottom: 10px;\n}\n\n.tictactoe-bottom-gap-large {\n  margin-bottom: 20px;\n}\n\n.tictactoe-bottom-gap-small {\n  margin-bottom: 5px;\n}\n\n.tictactoe-left-indented-btn {\n  margin-left: 10px;\n}\n\n.tictactoe-move-shift-btn, .tictactoe-single-digit-pair::before {\n  margin-right: 10px;\n}\n\n.tictactoe-rounded-input {\n  border-radius: 8px;\n}\n\n.tictactoe-move-shift-btn {\n  width: 35px;\n  height: 25px;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n.tictactoe-move-shift-btn:disabled {\n  opacity: 0.5;\n}\n\n.tictactoe-move-shift-btn:hover {\n  background-color: rgb(214, 214, 214);\n}\n\n.tictactoe-no-outline:focus {\n  outline: none;\n}\n\n.tictactoe-no-outline::-moz-focus-inner {\n  border: none;\n}\n\n[name=\"tictactoe-board-size\"] {\n  padding-left: 5px;\n  padding-right: 5px;\n  width: 28px;\n}\n\n.tictactoe-board {\n  flex-direction: column;\n  align-items: center;\n}\n\n.tictactoe-square {\n  background: #fff;\n  border: 1px solid #999;\n  font-size: 24px;\n  font-weight: bold;\n  line-height: 34px;\n  height: 34px;\n  margin-right: -1px;\n  margin-top: -1px;\n  padding: 0;\n  text-align: center;\n  width: 34px;\n}\n\n.tictactoe-square.tictactoe-highlighted {\n  background: yellow;\n}\n\n.tictactoe-game-status {\n  padding: 10px;\n  border-radius: 15px;\n}\n\n.tictactoe-win-status {\n  background: limegreen;\n}\n\n.tictactoe-tie-status {\n  background: aqua;\n}\n\n.tictactoe-next {\n  background-image: url(" + __webpack_require__(17) + ");\n}\n\n.tictactoe-prev {\n  background-image: url(" + __webpack_require__(18) + ");\n}\n\n.tictactoe-game-moves {\n  counter-reset: moves;\n  border: 2px solid green;\n  border-radius: 5px;\n  padding: 5px;\n  overflow-y: auto;\n  max-height: 184px;\n  max-width: 192px;\n  display: block;\n}\n\n.tictactoe-move-pair::before {\n  counter-increment: moves;\n  content: counter(moves) \".\";\n  margin-top: 2px;\n}\n\n.tictactoe-right-move-column {\n  margin-right: 36px;\n}\n\n.tictactoe-current-step {\n  font-weight: bold;\n}\n\n.tictactoe-footer-text {\n  font: 12px \"Times New Roman\", serif;\n}\n\n.tictactoe-no-select {\n  user-select: none;\n}\n\n@-moz-document url-prefix() {\n  .tictactoe-game-moves {\n    max-width: 252px;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(1);
var alphabet = __webpack_require__(0);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(0);
var encode = __webpack_require__(1);
var decode = __webpack_require__(9);
var build = __webpack_require__(8);
var isValid = __webpack_require__(11);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(14) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(16);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml,%3C?xml version='1.0' encoding='iso-8859-1'?%3E %3C!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E %3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 31.49 31.49' style='enable-background:new 0 0 31.49 31.49;' xml:space='preserve'%3E %3Cpath style='fill:%231E201D;' d='M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z'/%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml,%3C?xml version='1.0' encoding='iso-8859-1'?%3E %3C!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E %3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 31.494 31.494' style='enable-background:new 0 0 31.494 31.494;' xml:space='preserve'%3E %3Cpath style='fill:%231E201D;' d='M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554 c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587 c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z'/%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3C/svg%3E\""

/***/ })
/******/ ]);