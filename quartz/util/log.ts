import { Spinner } from "cli-spinner"

export class QuartzLogger {
  verbose: boolean
  spinner: Spinner | undefined
  constructor(verbose: boolean) {
    this.verbose = verbose
  }

  start(text: string) {
    if (this.verbose) {
      console.log(text)
    } else {
      this.spinner = new Spinner(`%s ${text}`)
      this.spinner.setSpinnerString(18)
      this.spinner.start()
    }
  }

  end(text?: string) {
    if (!this.verbose) {
      this.spinner!.stop(true)
    }
    if (text) {
      console.log(text)
    }
  }
}
