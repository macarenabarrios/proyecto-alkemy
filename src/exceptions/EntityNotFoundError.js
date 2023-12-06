import ApplicationError from "./ApplicationError.js";


export default class EntityNotFound extends ApplicationError {
  constructor(message) {
    super(message || 'Entity not found.', 404);
  }
}