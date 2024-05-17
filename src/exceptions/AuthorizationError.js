import ApplicationError from "./ApplicationError.js";


export default class AuthorizationError extends ApplicationError {
  constructor(message) {
    super(message || 'Forbidden.', 403);
  }
}