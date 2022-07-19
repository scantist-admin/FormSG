import { ApplicationError } from '../core/core.errors'

export class WorkspaceNotFoundError extends ApplicationError {
  constructor(message = 'Workspace belonging to user is not found') {
    super(message)
  }
}
