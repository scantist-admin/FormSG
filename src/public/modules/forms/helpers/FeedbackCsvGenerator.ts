import moment from 'moment-timezone'

import { FormFeedbackDto } from '../../../../../shared/types/form/form_feedback'

import { CsvGenerator } from './CsvGenerator'

/**
 * Class to encapsulate the FeedbackCsv and its attributes
 */
export class FeedbackCsvGenerator extends CsvGenerator {
  constructor(expectedNumberOfRecords: number) {
    super(expectedNumberOfRecords, 0)
    this.setHeader(['Date', 'Comment', 'Rating'])
  }

  /**
   * Generate a string representing a form feedback CSV line record
   */
  addLineFromFeedback(feedback: FormFeedbackDto) {
    const createdAt = moment(feedback.created)
      .tz('Asia/Singapore')
      .format('DD MMM YYYY hh:mm:ss A')
    // wrap feedback comment in quotes
    this.addLine([
      createdAt,
      feedback.comment ? `'${feedback.comment}'` : '',
      feedback.rating,
    ])
  }
}
