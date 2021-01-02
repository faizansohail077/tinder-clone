import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

//App config 
const app = express()
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://tinder:tinder123@cluster0.348ki.mongodb.net/tinderDB?retryWrites=true&w=majority'


//Middleware
app.use(express.json());
app.use(Cors())


//Db config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
//Api endpoints
app.get('/', (req, res) => res.status(200).send('HELLO FAIZAN NODE JS'))


app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })

})
app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})
//Listner
app.listen(port, () => console.log(`listinig on local host ${port}`))