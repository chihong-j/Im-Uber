import express from 'express'
import cors from 'cors'

const app = express()
// init middleware
app.use(cors())
// define routes
// app.use('/api/guess', guessRoute)
// define server
const port = process.env.PORT || 4000 
app.listen(port, () => {
	console.log(`Server is up on port ${port}.`) 
})

app.get('/', function(req, res) {
  res.send('hello world');
});