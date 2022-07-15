import { Opaque } from 'type-fest'
import { FormId } from './form'
import { UserId } from './user'

export type WorkspaceId = Opaque<string, 'WorkspaceId'>

export type Workspace = {
  title: string
  formIds: FormId[]
  admin: UserId
  numForms: number
}

export type AdminWorkspaceDto = Workspace
