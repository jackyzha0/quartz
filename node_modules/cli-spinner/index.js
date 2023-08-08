var readline = require('readline');

var defaultSpinnerString = 0;
var defaultSpinnerDelay = 60;

function defaultOnTick(msg) {
  this.clearLine(this.stream);
  this.stream.write(msg);
};

var Spinner = function(options){
  if(!(this instanceof Spinner)) return new Spinner(options)

  if(typeof options === "string"){
    options = { text: options };
  } else if(!options){
    options = {};
  }

  this.text = options.text || '';
  this.setSpinnerString(defaultSpinnerString);
  this.setSpinnerDelay(defaultSpinnerDelay);
  this.onTick = options.onTick || defaultOnTick;
  this.stream = options.stream || process.stdout;
};

Spinner.spinners = require('./spinners.json');

Spinner.setDefaultSpinnerString = function(value) {
  defaultSpinnerString = value;

  return this;
};

Spinner.setDefaultSpinnerDelay = function(value) {
  defaultSpinnerDelay = value;

  return this;
};

Spinner.prototype.start = function() {
  if(this.stream === process.stdout && this.stream.isTTY !== true) {
    return this;
  }

  var current = 0;
  var self = this;

  var iteration = function() {
    var msg = self.text.indexOf('%s') > -1
      ? self.text.replace('%s', self.chars[current])
      : self.chars[current] + ' ' + self.text;

    self.onTick(msg);

    current = ++current % self.chars.length;
  };

  iteration();
  this.id = setInterval(iteration, this.delay);

  return this;
};

Spinner.prototype.isSpinning = function() {
  return this.id !== undefined;
}

Spinner.prototype.setSpinnerDelay = function(n) {
  this.delay = n;

  return this;
};

Spinner.prototype.setSpinnerString = function(str) {
  const map = mapToSpinner(str, this.spinners);
  this.chars = Array.isArray(map) ? map : map.split('');

  return this;
};

Spinner.prototype.setSpinnerTitle = function(str) {
  this.text = str;

  return this;
}

Spinner.prototype.stop = function(clear) {
  if(this.isSpinning === false) {
    return this;
  }

  clearInterval(this.id);
  this.id = undefined;

  if (clear) {
    this.clearLine(this.stream);
  }

  return this;
};

Spinner.prototype.clearLine = function(stream) {
  readline.clearLine(stream, 0);
  readline.cursorTo(stream, 0);

  return this;
}

// Helpers

function isInt(value) {
  return (typeof value==='number' && (value%1)===0);
}

function mapToSpinner(value, spinners) {
  // Not an integer, return as strng
  if (!isInt(value)) {
    return value + '';
  }

  var length = Spinner.spinners.length;

  // Check if index is within bounds
  value = (value >= length) ? 0 : value;
  // If negative, count from the end
  value = (value < 0) ? length + value : value;

  return Spinner.spinners[value];
}

exports.Spinner = Spinner;
