import { createRequire } from 'module'

import { database } from '../db.js'

const require = createRequire(import.meta.url)
const { userType } = require('../@types/user-type.cjs')

export const userModel = database.define('user', userType)
