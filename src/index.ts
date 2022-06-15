import express from 'express'
import {AppointmentAvailability} from './main'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  const Appointment = new AppointmentAvailability()
  res.send('Hello World!')
})

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})