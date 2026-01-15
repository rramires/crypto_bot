import { database } from '../db.js'
import { getType } from './model-base.js'

const { symbolType } = getType('../@types/symbol-type.cjs')

export const symbolModel = database.define('symbols', symbolType)
