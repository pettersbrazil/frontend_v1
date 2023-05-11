export interface IRole {
  userId: String,
  roles: {
    admin: IAdmin,
    tag: ITag
  }
}

interface IAdmin {
  create: Boolean,
  read: Boolean,
  update: Boolean,
  delete: Boolean
}

interface ITag {
  create: Boolean,
  read: Boolean,
  update: Boolean,
  delete: Boolean
}
