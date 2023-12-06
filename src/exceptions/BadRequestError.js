import ApplicationError from "./ApplicationError.js";


export default class BadRequest extends ApplicationError {
  constructor(message) {
    super(message || 'Bad request.', 400);
  }
}