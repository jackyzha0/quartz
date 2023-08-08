var Spinner = require('../').Spinner;
var numSpinners = Spinner.spinners.length;
var spinner = null;
var index = 0;
var delay = 5000;

function nextSpinner(d) {
  d = (d === 0) ? d : delay;

  setTimeout(function() {
    if (spinner !== null) {
      spinner.stop();
      process.stdout.write('\n');
    }

    spinner = new Spinner('Spinner ' + (index + 1) + ' of ' + numSpinners);
    spinner.setSpinnerString(index);
    spinner.start();

    if (index < numSpinners) {
      index++;
      nextSpinner();
    } else {
      spinner.stop();
      process.stdout.write('\n');
      spinner = new Spinner('Spinner at custom position %s <--');
      spinner.start();

      setTimeout(function() {
        spinner.stop();
        process.stdout.write('\n');
        spinner = new Spinner('Custom spinner with custom speed');
        spinner.setSpinnerString('slow');
        spinner.setSpinnerDelay(500);
        spinner.start();
      }, delay);
    }
  }, d);
}

nextSpinner(0);
