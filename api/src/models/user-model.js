import { database } from '../db.js'
import { getType } from './model-base.js'

const { userType } = getType('../@types/user-type.cjs')

export const userModel = database.define('user', userType)
