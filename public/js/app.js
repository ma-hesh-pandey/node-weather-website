console.log('hello client')

// fetch api works only on client api, fetch data from url , then is promises 

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    }) 
})

// fetch('http://localhost:3000/weather?address=?').then((response)=>{
//     response.json().then((data)=>{

//         if (data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.foreCastData)

//         }

//     })
// })

const weatherForm=document.querySelector('form')  // it selects the form
const searchElement =document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

// messageOne.textContent='From JavaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()  // prevents from refreshing browser after submitting form
    
    const location =searchElement.value
    messageOne.textContent='Loading ..'
    messageTwo.textContent=''

   
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{

        if (data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent= data.location
            messageTwo.textContent=data.foreCastData
            // console.log(data.location)
            // console.log(data.foreCastData)

        }

    })
})

    console.log('testing!')
})





