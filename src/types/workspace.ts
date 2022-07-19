import { Document, Model } from 'mongoose'
import { AdminWorkspaceDto } from 'shared/types/workspace'

import { IFormSchema } from './form'
import { IUserSchema } from './user'

type IWorkspace = {
  title: string
  admin: IUserSchema['_id']
  formIds: IFormSchema['_id'][]
  count: number
}

export interface IWorkspaceSchema extends IWorkspace, Document {
  created?: Date
  lastModified?: Date
}

export interface IWorkspaceModel extends Model<IWorkspaceSchema> {
  getWorkspaces(admin: IUserSchema['_id']): Promise<AdminWorkspaceDto[]>

  // TODO (hans): Add workspace methods here
}
