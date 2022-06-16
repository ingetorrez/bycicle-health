import {
    AppointmentTypeId
    } from '../../services/availability/availavility'

export const Appointments = [
    {
        providerId:"provider-1",
        appointments:[
            {
              appointmentId: 'appointment-1',
              appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
              start: new Date('2020-07-01T15:00:00.000Z'),
            },
          ]
    },
    {
        providerId:"provider-2",
        appointments:[
            {
              appointmentId: 'appointment-2',
              appointmentTypeId: AppointmentTypeId.FOLLOWUP_30,
              start: new Date('2020-07-02T11:00:00.000Z'),
            },
            {
                appointmentId: 'appointment-3',
                appointmentTypeId: AppointmentTypeId.FOLLOWUP_15,
                start: new Date('2020-07-02T13:00:00.000Z'),
              },
          ]
    },
    {
        providerId:"provider-3",
        appointments:[
            {
              appointmentId: 'appointment-4',
              appointmentTypeId: AppointmentTypeId.FOLLOWUP_30,
              start: new Date('2020-07-03T15:00:00.000Z'),
            },
            {
                appointmentId: 'appointment-5',
                appointmentTypeId: AppointmentTypeId.FOLLOWUP_15,
                start: new Date('2020-07-03T14:00:00.000Z'),
              },
          ]
    },
    {
      providerId:"provider-4",
      appointments:[]
  },
]

