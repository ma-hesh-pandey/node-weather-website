const request= require('postman-request')

const geoCode =(address,callback)=>{

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFoZXNoMjY4IiwiYSI6ImNrYTlhY3lqNDA1Y2IyeHA3cDdwajNoMW0ifQ.HPMCXdamzRiX9lwvLA-5LQ&limit=1'
    // request({url:url,json:true},(error,response)=>{
        //applying shorthand notation sunce url variable is present
        // and applying destructing in response object
       

        request({url,json:true},(error,{body})=>{  
            console.log(body)
        if (error){
    //         console.log('Unable to connect with API')
                callback('Unable to connect with API',undefined)
               
        } else if(body.features.length==0) {
    //         console.log(response.body.message)
                callback('Unable to find location.Try another search!',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
    
            })
    //     const latitude=response.body.features[0].center[1]
    //     const longitude=response.body.features[0].center[0]
    //     console.log('The latitude is'+latitude+'. The longitude is '+longitude)
        }
    
    })
    
    }
    
    module.exports =geoCode