import ApplicationError from "./ApplicationError.js";


export default class EntityAlreadyExistError extends ApplicationError {
  constructor(message) {
    super(message || 'Entity already exists.', 400);
  }
}