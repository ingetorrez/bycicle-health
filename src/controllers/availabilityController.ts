import { Deps } from "../services/availability";
import { AppointmentAvailability, AppointmentTypeId } from "../services/availability/availavility";
import { Response } from '../types/index' 
const availability=async (req, res) => {
        const appointmentAvailability = new AppointmentAvailability(Deps);
        let {providerId, appointmentTypeId, start, end} = req.query
        const startDate = new Date(start.toString());
        const endDate = new Date(end.toString());
      
        const result = await appointmentAvailability.getAvailableTimeRanges(
          providerId.toString(),
          AppointmentTypeId[appointmentTypeId.toString()],
          startDate,
          endDate,
        );
      
        const response:Response = {
          success:true,
          status:200,
          data: result    
        }
        res.send(response)
}

export {
    availability
}