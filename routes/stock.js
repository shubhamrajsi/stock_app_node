const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');

router.use(bodyParser.json())

router.all('*',(req,res,next)=>
{
    req.app.locals.layout='main';
    next();
})

router.get('/',(req,res)=>
{
    res.render('home/index');
})

router.post('/stock_post',(req,res)=>
{
    let chunk = '';
    let stock_name = req.body.stock;
    console.log(stock_name);
    axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock_name}&apikey=7T9JBZP80EIG0H5Q`).then((result)=>
    {
        
        var newData =  result.data.bestMatches;
        
        console.log(newData);
        res.render('home/stock_list',{newData});

    })

})

let timeSeriesDailyJson1 =[];

router.get('/stock/:name',(req,res)=>
{
    let name = req.params.name;
    console.log(name);
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${name}&apikey=7T9JBZP80EIG0H5Q`).then((result)=>
    {
        
        const newData1 = result.data;
        const timeSeriesDaily = newData1["Time Series (Daily)"];
        let timeSeriesDailyJson =[];
        
        let newArray =[];
        let count=0;
        for(let dateIndex in timeSeriesDaily)
        {

            count=count+1;
            let array = timeSeriesDaily[dateIndex];
            if(count%6==0)
            {
                timeSeriesDailyJson1.push(dateIndex)


            }

            
            
            timeSeriesDailyJson.push({
                date:dateIndex,
                value:[array]
    
            })
            

            
        //     // // console.log(array);
        //     // if(count==1)
        //     // {
                
        //     //     console.log(timeSeriesDailyJson);
        //     //     res.render('home/stock',{timeSeriesDailyJson});

        //     // }
        //     // else
        //     // {

        //     // }
            
            
            
        //     // let newArray = [];
        //     // for(index in array)
        //     // {
        //     //     newArray.push({
        //     //         index: index,
        //     //         value: array[index]

        //     //     })
        //     // }
            
            

            

        // }
        }
        // res.send(timeSeriesDailyJson);
        
        // console.log(timeSeriesDailyJson);
        // // // res.send({timeSeriesDailyJson});
        console.log({timeSeriesDailyJson1});
        let abc = 2;

        
        res.render('home/stock',{timeSeriesDailyJson,abc});
    })
})


router.get('/chart',(req,res)=>
{
    let timeSeriesDailyJson1 = [1,2,3,4,5,6];
    res.render('home/chart',{timeSeriesDailyJson1});

})
module.exports = router;