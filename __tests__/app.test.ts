import request  from 'supertest'
import app from '../src/app'
import {
    AppointmentTypeId,
  } from '../src/services/availability/availavility';

const providerId = 'provider-1';
const appointmentTypeId = AppointmentTypeId.FOLLOWUP_15
const start = '2020-07-01T13:00:00.000Z';
const end = '2020-07-01T17:00:00.000Z';



describe('GET /availability', () => {
     
    describe('When the provider id is missing or empty', () => {
        test('When the provider id is missing', async () => { 
            const response = await request(app).get("/availability").query({
                appointmentTypeId,
                start,
                end
            })
    
            const expectedResult = {
                param: "providerId",
                value: "",
                message: "Provider is required"
            }
    
            expect(response.body.errors[0]).toEqual(expectedResult)
        });

        test('When the provider id is empty', async () => { 
            const response = await request(app).get("/availability").query({
                providerId:'',
                appointmentTypeId,
                start,
                end
            })
    
            const expectedResult = {
                param: "providerId",
                value: "",
                message: "Provider couldn't be empty"
            }
    
            expect(response.body.errors[0]).toEqual(expectedResult)
        });
    });
    describe('When the appointment id is missing or empty or incorerct', () => {
        test('When the appointment type id is empty', async () => { 
            const response = await request(app).get("/availability").query({
                providerId,
                appointmentTypeId:'',
                start,
                end
            })
    
            const expectedResult =  {
                param: "appointmentTypeId",
                value: "",
                message: "Appointment type couldn't be empty"
            }
    
            expect(response.body.errors[0]).toEqual(expectedResult)
        });

        test('When the appointment type id is incorrect', async () => { 
            const response = await request(app).get("/availability").query({
                providerId,
                appointmentTypeId:'FOLLOWUP',
                start,
                end
            })
    
            const expectedResult =  {
                param: "appointmentTypeId",
                value: "FOLLOWUP",
                message: "Appointment type No found"
            }
    
            expect(response.body.errors[0]).toEqual(expectedResult)
        });
    });

    describe('When the start or end date are invalid or start greater than end', () => {
        test('When the start date is invalid', async () => {
            const response = await request(app).get("/availability").query({
                providerId,
                appointmentTypeId,
                start:'abc',
                end
            })
    
            const expectedResult =  {
                param: "start",
                value: "abc",
                message: "Start date is invalid"
            }
    
            expect(response.body.errors[0]).toEqual(expectedResult)
        });
    
        test('When the end date is invalid', async () => {
            const response = await request(app).get("/availability").query({
                providerId,
                appointmentTypeId,
                start,
                end:'abc'
            })
    
            const expectedResult =  {
                param: "end",
                value: "abc",
                message: "End date is invalid"
            }
    
            expect(response.body.errors[0]).toEqual(expectedResult)
        });
    
        test('When the start date is greter than end', async () => {
            const response = await request(app).get("/availability").query({
                providerId,
                appointmentTypeId,
                start:'2020-07-01T17:15:00.000Z',
                end
            })
    
            const expectedResult =  {
                param: "start and end",
                value: "Start date 2020-07-01T17:15:00.000Z | End date 2020-07-01T17:00:00.000Z",
                message: "End should be greater than Start"
            }
    
            expect(response.body.errors[0]).toEqual(expectedResult)
        });
    });

   
  
  });