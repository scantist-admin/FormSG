import { ApplicationError } from '../core/core.errors'

export class WorkspaceNotFoundError extends ApplicationError {
  constructor(message = 'Workspace not found') {
    super(message)
  }
}
