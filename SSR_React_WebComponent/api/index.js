const express = require('express')
const app = express()
const port = 9000
const model = require('./model.json')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())

const sortOrder = order => order ? 1 : -1

const sortData = (data, type, order) => data.sort((a,b) => (a[type] > b[type]) ? sortOrder(order) : ((b[type] > a[type]) ? sortOrder(!order) : 0))

app.get('/:id', (req, res) => res.send(model.acntData.slice(0,req.params.id)));

app.post('/load', (req, res) => res.send({length: model.acntData.length, acntData: sortData(model.acntData,req.body.type,req.body.order).slice(req.body.startPoint,req.body.endPoint)}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
