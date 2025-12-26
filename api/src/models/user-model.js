import { createRequire } from 'module'

import { database } from '../db.js'

const require = createRequire(import.meta.url)
const { userType } = require('../@types/userType.cjs')

export const userModel = database.define('user', userType)
