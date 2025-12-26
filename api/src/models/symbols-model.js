import { createRequire } from 'module'

import { database } from '../db.js'

const require = createRequire(import.meta.url)
const { symbolType } = require('../@types/symbol-type.cjs')

export const symbolsModel = database.define('symbols', symbolType)
