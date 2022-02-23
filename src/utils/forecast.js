const request= require('postman-request')

const forecast =(latitude,longitude,callback)=>{
    
    const url='http://api.weatherstack.com/current?access_key=c89db848d4f8ab1e2edcecf38e381bc5&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{

        if (error){
            //         console.log('Unable to connect weather service!')
            callback('Unable to connect weather service!',undefined)
                }else if (body.error){
            
                callback(body.error.info,undefined)
                    
            //             console.log(response.body.error.info)
                    }else{
                        callback(undefined, 
                     body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degree out. And it feels like a '+body.current.feelslike+' degree.'+
                     'The humidity is '+body.current.humidity+'%.')
                
                    }
           
                
    })
}

module.exports=forecast