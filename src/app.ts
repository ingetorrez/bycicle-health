import express from 'express'
import availability from './routes/availability'


const app = express()

app.use('/availability',availability)

app.use(express.json())

export default app