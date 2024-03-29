// import npm packages
import { runUpdateCron , runCreateCron} from './services/cronService.js'
import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import logger from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'


// import routers
import { router as indexRouter } from './routes/index.js'
import { router as userRouter } from './routes/user.route.js'
import { router as doctorRouter} from  './routes/doctor.route.js'
import { router as patientRouter } from './routes/patient.route.js'
import { router  as appointmentRouter } from './routes/appointment.route.js'
import { router as timeSlotRouter } from './routes/timeSlot.route.js'
import { router as tokenRouter } from './routes/token.route.js'
import { router as timestampRouter } from './routes/slotTimestemps.route.js'

// create the express app
const app = express()
// const csrfProtection = csurf({ cookie: true });


app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)

// mount imported routes
app.use('/', indexRouter)
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/doctor' , doctorRouter)
app.use('/api/v1/patient' , patientRouter)
app.use('/api/v1/appointment' , appointmentRouter)
app.use('/api/v1/slot' , timeSlotRouter)
app.use('/api/v1/token', tokenRouter)
app.use('/api/v1/timestemps' , timestampRouter)



// run cron job after every 24 hour about doctor appointments time resceduling 
runUpdateCron()
// run create doctor cron job
runCreateCron() 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(errorHandler)

export { app }
