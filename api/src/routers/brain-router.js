import express from 'express'
export const brainRouter = express.Router()

import { getBrain, getBrainMemory, updateBrainMemory } from '../controllers/brain-controller.js'

brainRouter.get('/', getBrain)
brainRouter.get('/memory', getBrainMemory)
brainRouter.patch('/memory/:index', updateBrainMemory)
