import { ObjectId } from 'bson-ext'
import { omit } from 'lodash'
import mongoose from 'mongoose'

import { getWorkspaceModel } from 'src/app/models/workspace.server.model'
import { IUserSchema } from 'src/types'

import dbHandler from 'tests/unit/backend/helpers/jest-db'

const Workspace = getWorkspaceModel(mongoose)

const MOCK_USER_ID = new ObjectId()
const MOCK_FORM_ID = new ObjectId()
const MOCK_WORKSPACE_ID = new ObjectId()
const MOCK_WORKSPACE_FIELDS = {
  _id: MOCK_WORKSPACE_ID,
  title: 'Workspace1',
  admin: MOCK_USER_ID,
  formIds: [],
}

describe('Workspace Model', () => {
  let FORM_COLLAB_READ_ONLY_USER: IUserSchema
  let FORM_COLLAB_READ_AND_WRITE_USER: IUserSchema
  let FORM_ADMIN_USER: IUserSchema

  beforeAll(async () => await dbHandler.connect())
  beforeEach(async () => {
    const { form, user: adminUser } = await dbHandler.insertEncryptForm({
      formId: MOCK_FORM_ID,
      userId: MOCK_USER_ID,
    })
    const { user: collabReadOnlyUser } =
      await dbHandler.insertFormCollectionReqs({
        userId: new ObjectId(),
        mailName: 'readOnly',
      })
    const { user: collabReadAndWriteUser } =
      await dbHandler.insertFormCollectionReqs({
        userId: new ObjectId(),
        mailName: 'readAndWrite',
      })
    await form.updateFormCollaborators([
      {
        email: collabReadOnlyUser.email,
        write: false,
      },
      {
        email: collabReadAndWriteUser.email,
        write: true,
      },
    ])

    await Workspace.create(MOCK_WORKSPACE_FIELDS)
    FORM_ADMIN_USER = adminUser
    FORM_COLLAB_READ_AND_WRITE_USER = collabReadAndWriteUser
    FORM_COLLAB_READ_ONLY_USER = collabReadOnlyUser
  })
  afterEach(async () => await dbHandler.clearDatabase())
  afterAll(async () => await dbHandler.closeDatabase())

  describe('Schema', () => {
    it('should create and save successfully', async () => {
      const { user: existentUser } = await dbHandler.insertFormCollectionReqs({
        userId: new ObjectId(),
        mailName: 'userThatExists',
      })
      const expectedWorkspaceObject = {
        title: 'Workspace2',
        admin: existentUser._id,
        formIds: [],
      }
      const validWorkspace = new Workspace(expectedWorkspaceObject)
      const saved = await validWorkspace.save()
      const actualSavedObject = omit(saved.toObject(), [
        '_id',
        'created',
        'lastModified',
        '__v',
      ])

      expect(saved._id).toBeDefined()
      expect(saved.created).toBeInstanceOf(Date)
      expect(saved.lastModified).toBeInstanceOf(Date)
      expect(actualSavedObject).toEqual(expectedWorkspaceObject)
    })

    it("should update workspace's formIds successfully because user is the form admin", async () => {
      const expectedWorkspaceObject = {
        title: 'Workspace2',
        admin: FORM_ADMIN_USER._id,
        formIds: [MOCK_FORM_ID],
      }
      const validWorkspace = new Workspace(expectedWorkspaceObject)
      const saved = await validWorkspace.save()
      const actualSavedObject = omit(saved.toObject(), [
        '_id',
        'created',
        'lastModified',
        '__v',
      ])

      expect(actualSavedObject).toEqual(expectedWorkspaceObject)
    })

    it("should create and save successfully because user has read and write access in the form's permissionList", async () => {
      const expectedWorkspaceObject = {
        title: 'Workspace2',
        admin: FORM_COLLAB_READ_AND_WRITE_USER._id,
        formIds: [MOCK_FORM_ID],
      }
      const validWorkspace = new Workspace(expectedWorkspaceObject)
      const saved = await validWorkspace.save()
      const actualSavedObject = omit(saved.toObject(), [
        '_id',
        'created',
        'lastModified',
        '__v',
      ])

      expect(actualSavedObject).toEqual(expectedWorkspaceObject)
    })

    it("should create and save successfully because user has read access in the form's permissionList", async () => {
      const expectedWorkspaceObject = {
        title: 'Workspace2',
        admin: FORM_COLLAB_READ_ONLY_USER._id,
        formIds: [MOCK_FORM_ID],
      }
      const validWorkspace = new Workspace(expectedWorkspaceObject)
      const saved = await validWorkspace.save()
      const actualSavedObject = omit(saved.toObject(), [
        '_id',
        'created',
        'lastModified',
        '__v',
      ])

      expect(actualSavedObject).toEqual(expectedWorkspaceObject)
    })

    it('should fail because userId does not exist', async () => {
      const workspaceObject = {
        title: 'Workspace2',
        admin: new ObjectId(),
        formIds: [MOCK_FORM_ID],
      }
      const invalidWorkspace = new Workspace(workspaceObject)
      await expect(invalidWorkspace.save()).rejects.toThrowError(
        mongoose.Error.ValidationError,
      )
    })

    it('should fail because user has no access to form', async () => {
      const { user: existentUser } = await dbHandler.insertFormCollectionReqs({
        userId: new ObjectId(),
        mailName: 'userThatExists',
      })

      const workspaceObject = {
        title: 'Workspace2',
        admin: existentUser,
        formIds: [MOCK_FORM_ID],
      }
      const invalidWorkspace = new Workspace(workspaceObject)
      await expect(invalidWorkspace.save()).rejects.toThrowError(
        mongoose.Error.ValidationError,
      )
    })

    it('should fail because formId does not exist', async () => {
      const workspaceObject = {
        title: 'Workspace2',
        admin: FORM_ADMIN_USER,
        formIds: [new ObjectId()],
      }
      const invalidWorkspace = new Workspace(workspaceObject)
      await expect(invalidWorkspace.save()).rejects.toThrowError(
        mongoose.Error.ValidationError,
      )
    })

    it('should fail because formId is not unique', async () => {
      const duplicateFormId = new ObjectId()
      const workspaceObject = {
        title: 'Workspace2',
        admin: FORM_ADMIN_USER,
        formIds: [duplicateFormId, duplicateFormId],
      }
      const invalidWorkspace = new Workspace(workspaceObject)
      await expect(invalidWorkspace.save()).rejects.toThrowError(
        mongoose.Error.ValidationError,
      )
    })

    describe('getWorkspaces', () => {
      it('should return empty array when user has no workspaces', async () => {
        const mockUserId = new ObjectId()
        const actual = await Workspace.getWorkspaces(mockUserId)

        expect(actual).toEqual([])
      })

      it('should return array of workspaces belonging to user', async () => {
        const mockUserId = FORM_ADMIN_USER._id
        const actual = await Workspace.getWorkspaces(mockUserId)

        expect(actual.length).toEqual(1)
      })
    })

    describe('createWorkspace', () => {
      it('should return created workspace upon successful workspace creation', async () => {
        const mockUserId = FORM_ADMIN_USER._id
        const mockWorkspaceTitle = 'Workspace'

        const actual = await Workspace.createWorkspace(
          mockWorkspaceTitle,
          mockUserId,
        )

        expect(actual.title).toEqual(mockWorkspaceTitle)
        expect(actual.formIds.length).toEqual(0)
        expect(actual.admin).toEqual(mockUserId)
      })
    })

    describe('updateWorkspaceTitle', () => {
      it('should return updated workspace upon successful workspace title update', async () => {
        const newWorkspaceTitle = 'Workspace'

        const actual = await Workspace.updateWorkspaceTitle(
          newWorkspaceTitle,
          MOCK_WORKSPACE_ID,
          MOCK_USER_ID,
        )

        expect(actual).toBeObject()
        expect(actual?.title).toEqual(newWorkspaceTitle)
      })

      it('should return null upon unsuccessful update due to invalid workspace id', async () => {
        const newWorkspaceTitle = 'Workspace'
        const invalidWorkspaceId = new ObjectId()

        const actual = await Workspace.updateWorkspaceTitle(
          newWorkspaceTitle,
          invalidWorkspaceId,
          MOCK_USER_ID,
        )

        expect(actual).toBeNull()
      })

      it('should return null upon unsuccessful update due to admin not owning workspace', async () => {
        const newWorkspaceTitle = 'Workspace'
        const invalidUserId = new ObjectId()

        const actual = await Workspace.updateWorkspaceTitle(
          newWorkspaceTitle,
          MOCK_WORKSPACE_ID,
          invalidUserId,
        )

        expect(actual).toBeNull()
      })
    })
  })
})