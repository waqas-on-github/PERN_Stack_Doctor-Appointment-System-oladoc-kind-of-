import Joi from "joi";

const slotSchema = Joi.object({
  
doctorId               : Joi.number().required(), 
availabilitydays       : Joi.array().items(Joi.string().required()).required(),
startTime              : Joi.string().required(),
endTime                : Joi.string().required(),
duration               : Joi.number().required(),
appointmentDuration    : Joi.number().required() , 
recurring              : Joi.boolean().required(),

   

})


const updateSlotSchema = Joi.object({

 doctorId              : Joi.number(), 
 availabilitydays      : Joi.array().items(Joi.string()),
 startTime             : Joi.string(),
 endTime               : Joi.string(),
 duration              : Joi.number(),
 appointmentDuration   : Joi.number(), 
 recurring             : Joi.boolean(),
   

})

export {
    slotSchema
    ,updateSlotSchema
}