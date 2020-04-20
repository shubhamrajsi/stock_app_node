const express = require('express');
const exphb = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:false }));

//path and static files
const path = require('path');
app.use(express.static(path.join(__dirname+'/public')));

//handlebars
app.engine('handlebars',exphb());
app.set('view engine','handlebars');


//load routes
var stock = require('./routes/stock');

app.use('/',stock);

// app.get('/',(req,res)=>
// {
//     res.send('started');
// })

app.listen(7890);