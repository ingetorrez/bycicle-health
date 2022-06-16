import { Router } from "express"
const router = Router()
import {
  AppointmentAvailability,
  AppointmentTypeId
  } from '../../services/availability/availavility'
import { Deps} from '../../services/availability'

import { Response } from '../../types' 

import { Validation } from './midleware'
import { availability } from "../../controllers/availabilityController"

router.get('/', Validation,availability)


export default router