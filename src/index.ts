import express from 'express'
import {
        AppointmentAvailability,
        AppointmentAvailabilityDeps,
        AppointmentTypeId,
        TimeRange,
        } from './main'

const app = express()
const port = 3000

app.get('/availability', async (req, res) => {
  const deps: AppointmentAvailabilityDeps = {
    getCalendarEvents: async (providerId: string, start: Date, end: Date) => {
      return [
        {
          calenderEventId: 'calendar-1',
          start: new Date('2020-07-01T13:45:00.000Z'),
          end: new Date('2020-07-01T14:15:00.000Z'),
        },
      ];
    },
    getBookedAppointments: async (
      providerId: string,
      start: Date,
      end: Date,
    ) => {
      return [
        {
          appointmentId: 'appointment-1',
          appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
          start: new Date('2020-07-01T15:00:00.000Z'),
        },
      ];
    },
  };
  const appointmentAvailability = new AppointmentAvailability(deps);
  const provider1Id = 'provider-1';
  const start = new Date('2020-07-01T13:00:00.000Z');
  const end = new Date('2020-07-01T17:00:00.000Z');

  const result = await appointmentAvailability.getAvailableTimeRanges(
    provider1Id,
    AppointmentTypeId.FOLLOWUP_30,
    start,
    end,
  );

  res.send(result)
})

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})