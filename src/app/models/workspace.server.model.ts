import { Mongoose, Schema } from 'mongoose'
import { WorkspaceDto } from 'shared/types/workspace'

import { FormStatus } from '../../../shared/types/form'
import { IUserSchema, IWorkspaceModel, IWorkspaceSchema } from '../../types'

import getFormModel from './form.server.model'
import getUserModel from './user.server.model'

export const WORKSPACE_SCHEMA_ID = 'Workspace'

const compileWorkspaceModel = (db: Mongoose): IWorkspaceModel => {
  const Form = getFormModel(db)
  const User = getUserModel(db)

  const WorkspaceSchema = new Schema<IWorkspaceSchema, IWorkspaceModel>(
    {
      title: {
        type: String,
        validate: [
          /^[a-zA-Z0-9_\-./() &`;'"]*$/,
          'Workspace title cannot contain special characters',
        ],
        required: 'Workspace title cannot be blank',
        minlength: [4, 'Workspace title must be at least 4 characters'],
        maxlength: [
          200,
          'Workspace title can have a maximum of 200 characters',
        ],
        trim: true,
      },
      admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Workspace must have an Admin',
      },
      formIds: {
        type: [Schema.Types.ObjectId],
        validate: {
          async validator(this: IWorkspaceSchema) {
            const user = await User.findById(this.admin)
            if (!user) return false

            for (const formId of this.formIds) {
              const form = await Form.findById(formId)
              if (!form) return false

              const isUserFormAdmin = form.admin.equals(this.admin)
              const isUserFormCollaborator =
                form?.permissionList?.find(
                  (permission) => permission.email === user.email,
                ) != undefined

              const doesUserHaveFormAccess =
                isUserFormAdmin || isUserFormCollaborator
              const isFormIdUnique = this.formIds.includes(formId)
              const isFormIdValid = doesUserHaveFormAccess && isFormIdUnique

              if (!isFormIdValid) return false
            }

            return true
          },
        },
        message: "Failed to update workspace document's formIds",
      },
    },
    {
      timestamps: {
        createdAt: 'created',
        updatedAt: 'lastModified',
      },
    },
  )

  WorkspaceSchema.index({
    admin: 1,
  })

  WorkspaceSchema.virtual('count').get(function (this: IWorkspaceSchema) {
    return this.formIds.length
  })

  WorkspaceSchema.statics.getWorkspaces = async function (
    admin: IUserSchema['_id'],
  ): Promise<WorkspaceDto[]> {
    return this.find({ admin: admin }).sort('title').exec()
  }

  WorkspaceSchema.statics.createWorkspace = async function (
    title: string,
    admin: IUserSchema['_id'],
  ): Promise<WorkspaceDto> {
    return this.create({ title, admin, formIds: [] })
  }

  WorkspaceSchema.statics.updateWorkspaceTitle = async function (
    title: string,
    workspaceId: IWorkspaceSchema['_id'],
    admin: IUserSchema['_id'],
  ): Promise<WorkspaceDto | null> {
    await this.updateOne(
      { _id: workspaceId, admin: admin },
      { title: title },
    ).exec()
    return this.findOne({ _id: workspaceId, admin: admin }).exec()
  }

  WorkspaceSchema.statics.deleteWorkspace = async function (
    workspaceId: IWorkspaceSchema['_id'],
    admin: IUserSchema['_id'],
  ): Promise<number> {
    const workspaceToDelete = await this.findOne({
      _id: workspaceId,
      admin: admin,
    })
    const session = await this.startSession()

    session.startTransaction()
    const deleted = await this.deleteOne({
      _id: workspaceId,
      admin: admin,
    })
    await Form.updateMany(
      { _id: { $in: workspaceToDelete?.formIds } },
      { $set: { status: FormStatus.Archived } },
    )
    await session.commitTransaction()
    session.endSession()

    return deleted.deletedCount ?? 0
  }

  return db.model<IWorkspaceSchema, IWorkspaceModel>(
    WORKSPACE_SCHEMA_ID,
    WorkspaceSchema,
  )
}

export const getWorkspaceModel = (db: Mongoose): IWorkspaceModel => {
  try {
    return db.model(WORKSPACE_SCHEMA_ID) as IWorkspaceModel
  } catch {
    return compileWorkspaceModel(db)
  }
}