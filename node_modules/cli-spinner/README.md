# node-spinner

A simple spinner for node cli.

[![NPM](https://nodei.co/npm/cli-spinner.png?downloads=true&downloadRank=true)](https://nodei.co/npm/cli-spinner/) [![NPM](https://nodei.co/npm-dl/cli-spinner.png?months=6&height=3)](https://nodei.co/npm/cli-spinner/)

---

## Installation

This package is available on [npm](http://npmjs.com) as `cli-spinner`.

``` sh
npm install cli-spinner
```

## Example usage

````javascript
var Spinner = require('cli-spinner').Spinner;

var spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');
spinner.start();
````

## APIs

```
var obj = new Spinner('processing.. %s')

var obj = new Spinner({
    text: 'processing.. %s',
    stream: process.stderr,
    onTick: function(msg){
        this.clearLine(this.stream);
        this.stream.write(msg);
    }
})
```

Create a new spinner object. The advanced options can be used in any combination, none of them are required.


**`obj.start()`**

Starts the spinner.


**`obj.stop(clean)`**

Stops the spinner. Accepts a Boolean parameter to clean the console.


**`obj.isSpinning()`**

Returns true/false depending on whether the spinner is currently spinning.


**`obj.setSpinnerString(spinnerString)`**

Sets the spinner string. Accepts either a String or an Integer index to reference the [built-in spinners](#demo).


**`obj.setSpinnerDelay(spinnerDelay)`**

Sets the spinner animation speed.


**`obj.setSpinnerTitle(spinnerTitle)`**

Sets the spinner title. Use printf-style strings to position the spinner.


**`Spinner.setDefaultSpinnerString(spinnerString)`**

Sets the default spinner string for all newly created instances. Accepts either a String or an Integer index to reference the [built-in spinners](#demo).


**`Spinner.setDefaultSpinnerDelay(spinnerDelay)`**

Sets the default spinner delay for all newly created instances.

## Demo

To see a demonstration of the built-in spinners, point your console at the `example` folder and run:

````
node spinner.js
````

![preview](img/spinner.gif "Spinner")
