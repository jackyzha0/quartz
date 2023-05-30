import chalk from 'chalk'
import pretty from 'pretty-time'

export class PerfTimer {
  evts: { [key: string]: [number, number] }

  constructor() {
    this.evts = {}
    this.addEvent('start')
  }

  addEvent(evtName: string) {
    this.evts[evtName] = process.hrtime()
  }

  timeSince(evtName?: string): string {
    return chalk.yellow(pretty(process.hrtime(this.evts[evtName ?? 'start'])))
  }
}
