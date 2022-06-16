import {
    AppointmentAvailabilityDeps,
    appointmentTypes
    } from './availavility'
    
import  { CalendarEvents } from '../../data/availability/events'
import { Appointments } from '../../data/availability/appointments'

export const ValProvider=(providerId)=>{
  const providerWithEventsLen = CalendarEvents.filter(item => item.providerId === providerId).length
  const providerWithAptsLen = Appointments.filter(item => item.providerId === providerId).length

  return (providerWithEventsLen>0 || providerWithAptsLen>0)
}

export const ValAppointmentType=(appointmentType)=>{
  const aptsLen = appointmentTypes.filter(type=>type.appointmentTypeId===appointmentType).length
  
  return (aptsLen>0)
}

export const Deps: AppointmentAvailabilityDeps = {
    getCalendarEvents: async (providerId: string, start: Date, end: Date) => {
      const providerWithEvents = CalendarEvents.filter(item => item.providerId === providerId)[0]
      const events = providerWithEvents.events.filter(event => event.end >= start && event.start <= end)
      
      return events
    },
    getBookedAppointments: async (
      providerId: string,
      start: Date,
      end: Date,
    ) => {
      const providerWithApts = Appointments.filter(item => item.providerId === providerId)[0]
      const apts = providerWithApts.appointments.filter(apt => 
        {
          const minutes = appointmentTypes.filter(type=>type.appointmentTypeId===apt.appointmentTypeId)[0].durationMins

          let endDate = new Date(apt.start)
          endDate =  new Date(endDate.setMinutes(endDate.getMinutes() + minutes))
    
          return (apt.start >= start && endDate <= end)
        })
      return apts
    },
  };
