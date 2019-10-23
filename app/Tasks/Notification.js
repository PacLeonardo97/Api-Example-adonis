'use strict'

const Task = use('Task')

class Notification extends Task {
  static get schedule() {
     // Time
    return '0 */1 * * * *'
  }

  async handle() {
    // Action
    this.info('Task Notification handle')
  }
}

module.exports = Notification
