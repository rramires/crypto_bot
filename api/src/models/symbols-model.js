import { createRequire } from 'module'

import { database } from '../db.js'

const require = createRequire(import.meta.url)
const { symbolsType } = require('../@types/symbols-type.cjs')

export const symbolModel = database.define('user', symbolsType)
