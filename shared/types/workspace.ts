import { Opaque } from 'type-fest'

export type WorkspaceId = Opaque<string, 'WorkspaceId'>

export type Workspace = {
  _id: WorkspaceId
  title: string
  numForms: number
}

export type AdminWorkspaceDto = Workspace
