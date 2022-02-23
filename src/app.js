const path=require('path')            //node.js built in module
const express= require('express')    //express is a function
const hbs=require('hbs')             // for using partials
console.log(__dirname)  //coming from wrapper function 
console.log(path.join(__dirname,'../public'))

const request=require('postman-request')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express()   // express() dont take any arguments, we are configuring an appp

const port= process.env.PORT||3000 // if port exist , if not exists 3000

//imagine we own app.com, so we want to show something or web pages , and all of theses routes will run in single server
//multiple routes will run in single server


//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')  
const viewsPath =path.join(__dirname,'../templates/views') //node sarch views inside files inside this folder
const partialsPath=path.join(__dirname,'../templates/partials')


//set up handlebars engine and view location
app.set('view engine', 'hbs') // it expects all views in root of folder with folder name views
app.set('views',viewsPath)    //since we want to serve html from templates folder, we need to do this set
hbs.registerPartials(partialsPath)   //it search in path

//set up static directoruy to serve
app.use(express.static(publicDirectoryPath))// server the folder. And while we request in loca host index page is served automatically
//insted of using below code




    //route  function or handler
// app.get('',    (req,res)=>{
//     res.send('<h1>Hello express!') // send something back if route matches


// })  //this specify what server should do when we try to access server


// app.get('/help', (req,res)=>{ 
//     // res.send('<b> Your help is register! </b>')

//     res.send({'name':'mahesh',
//     'age':22
//     }) // express change object to json while serving

// })



// app.get('/about',(req,res)=>{
//     res.send('About Page')
// })


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather ',
        name:'Mahesh Pandey'
    })   //it goes into views, and html file gets to client
})



app.get('/about',(req,res)=>{
    //res.render('about')    //127.0.0.1/about
    res.render('about',{
        title:'Weather ',
        name:'Mahesh Pandey'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Weather ',
        name:'Mahesh Pandey'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({ 
           error:'You must provide address parameter'
        })
    }
    address=req.query.address

    geoCode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }

        forecast(latitude,longitude,(error,foreCastData)=>{
            if (error){
                return res.send({
                    error:error
                })
            }
            res.send({
                foreCastData,
                location,
                address
            })
        })
})


    // res.send({
    //     address,
    //     forecast:'Sunny',
    //     location:'Nepal'
    // })
})


app.get('/products',(req,res)=>{
    console.log(req .query)

    if(!req.query.search){
        // use return to stop processing down below
       return res.send({           
            error:'You must provide a search term'
        })
    }

    res.send(
        {
        products:[]
    }
    )
})



app.get('/help/*',(req,res)=>{
    res.render('404_page.hbs',{
        'title':'404',
        'name':'Mahesh Pandey',
        'errorMessage':'Help article  not found!'
    })
   
})

app.get('*',(req,res)=>{
    res.render('404_page.hbs',{
        'title':'404',
        'name':'Mahesh Pandey',
        'errorMessage':'Page not found!'
    })
})  // wildcard * matches everything if defined url not match



// app.listen(3000,()=>{
//     console.log('Server is running on port 3000')
// })  //listen to request from 3000 port

app.listen(port,()=>{
    console.log('Server is running on port '+port)
})  //listen to request from 3000 port
