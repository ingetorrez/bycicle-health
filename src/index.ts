import express from 'express'
import availability from './routes/availability'


const app = express()
const port = 3000

app.use('/availability',availability)

app.use(express.json())

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})