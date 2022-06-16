import { ValProvider, ValAppointmentType } from '../../services/availability'
import { Response, AError } from '../../types' 
import moment from 'moment'

const ValNotNullNotEmpty=(param:string,name:string, msg:string):AError=>{
    const result = {
        param:name,
        value:"",
        message:""
      }
      
    if(param == null  || param==undefined) {
        result.message=`${msg} is required`
    }else if(param == ''){
        result.value=param
        result.message=`${msg} couldn't be empty`
    }

    return result
}

export const Validation=(req, res, next) => {
    let {providerId, appointmentTypeId, start, end} = req.query
    //Validate providerId not null, not empty
    const errors:AError[] = []
    const valProvider = ValNotNullNotEmpty(providerId,'providerId',"Provider")
    if(valProvider.message!=""){
        errors.push(valProvider)
    }else if(!ValProvider(providerId)){
      errors.push({
        param:"providerId",
        value:providerId.toString(),
        message:"Provider No found"
      })
    }

    //Validate AppointmentID
    const valAppointment = ValNotNullNotEmpty(appointmentTypeId,'appointmentTypeId',"Appointment type")
    
    if(valAppointment.message!=""){
        errors.push(valAppointment)
    }else if(!ValAppointmentType(appointmentTypeId)){
      errors.push({
        param:"appointmentTypeId",
        value:appointmentTypeId.toString(),
        message:"Appointment type No found"
      })
    }

    //Validate range (start, end)
    const valStart = ValNotNullNotEmpty(start,'start',"Start date")
    
    if(valStart.message!=""){
        errors.push(valStart)
    }else if(isNaN(Date.parse(start))){
        errors.push({
          param:"start",
          value:start.toString(),
          message:"Start date is invalid"
        })
      }
    
    
    const valEnd = ValNotNullNotEmpty(end,'end',"End date")
    
    if(valEnd.message!=""){
        errors.push(valEnd)
    }else if(isNaN(Date.parse(end))){
        errors.push({
          param:"end",
          value:end.toString(),
          message:"End date is invalid"
        })
    }

    //Validate end date greater than start
    if(valStart.message=="" && valEnd.message=="" && !isNaN(Date.parse(start)) && !isNaN(Date.parse(end))){
      var sDate = moment(start);
      var eDate = moment(end);
      var duration = moment.duration(eDate.diff(sDate));
      var miliseconds = duration.asMinutes();

      if(miliseconds<=0){
        errors.push({
          param:"start and end",
          value:`Start date ${start.toString()} | End date ${end.toString()}`,
          message:"End should be greater than Start"
        })
      }
    }

  
    if(errors.length>0){
      const response:Response={
        success:false,
        status:400,
        errors
      }
      res.status(400).json(response)
    }else{
      next()
    }
    
    
  }