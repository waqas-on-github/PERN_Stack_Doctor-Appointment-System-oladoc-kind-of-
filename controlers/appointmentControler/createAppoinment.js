import asyncHandler from '../../utils/asyncHandler.js'
import CustomError from '../../utils/CustomError.js'
import Prisma from '../../prisma.js'
import { appointmentSchema } from '../../validationSchema/appointment.schema.js'
import {sanitizeData} from '../userControler/createAccount.js'


const createAppoinmet = asyncHandler(async(req, res) => {

    // validate inputs 
    const {error} = appointmentSchema.validate(req.body) 
    if(error) throw new CustomError(error.message , error.code || 401 , error.stack)

    // senatize data 
    const sanitizedData  = sanitizeData(req.body) 

    // todo check appointments within time + next 20 minuts (or doctor avaliable time /20min) when this user wanna get appointment 

    // like doctor appoinment capacity 
    // check day like if weekends and doctor avaliblity 
    // check doctor is avaliable like that day like tommorow 11:30pm 
    // all above will be done after crud implementation 

    
    const createdAppoinmet = await Prisma.appointment.create({
        data : sanitizedData
    })

    if(!createdAppoinmet)  throw new CustomError("failed to create appointment " , 401 , "line 29 createappointment")

    res.status(201).json({
        success : true , 
        appointment : createdAppoinmet
    })

})







export{
    createAppoinmet
}