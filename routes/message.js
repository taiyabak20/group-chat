const fs = require('fs')
const path = require('path')

const express = require('express')
const { setDefaultHighWaterMark } = require('stream')
const router = express.Router()
const fileName = path.join(__dirname) + '\\messages.txt'

const options = {
    root: path.join(__dirname)
};

router.get('/',(req,res)=>{
    if(!fs.existsSync(fileName)){
        let code = '<html><head><title>Group chat app</title></head>'+
          '<body>' +'<form action="/message" method="post">'+
            '<label for="message">Enter message</label>'+
            '<input type="text" id="message"  name="message" required>'+
            '<input type="submit" value="submit">'+
        '</form>'+
        '</body>'+
        '<script>'+
        'if(localStorage.getItem("username") === null){window.location ="/login";console.log("demo")}'+
        'document.getElementById("message").name=localStorage.getItem("username")</script>'+
        '</html>'
        return res.send(code)
    }
    return fs.readFile(fileName ,'utf-8' ,(err,data)=>{
        if(err)
        {
            // console.log(err)
            res.send('<h2>some issues</h2>')
        }
        let code = '<html><head><title>Group chat </title></head>'+
          '<body>' +data +'<form action="/message" method="post">'+
            '<label for="message">Enter message</label>'+
            '<input type="text" id="message"  name="message" required>'+
            '<input type="submit" value="submit">'+
        '</form>'+
        '</body>'+
        '<script>'+
        'if(localStorage.getItem("username") === null){window.location ="/login"}'+
        'document.getElementById("message").name=localStorage.getItem("username")</script>'+
        '</html>'
        res.send(code)
    })
})

router.post('/message' ,(req,res)=>{
    let redirect_value ='/';
    Object.keys(req.body).forEach(key => {
        if(key == "null")
         redirect_value = '/login'
         else{   
        let data =  key + " : " + req.body[key] +" "
        fs.appendFile(fileName , data,(err)=>{
            if(err){
                console.log(err)
                res.status(500).send('<h2>Internal server error')
            }
        } )
    }
        
    })
    res.redirect(redirect_value)
}
)

module.exports = router