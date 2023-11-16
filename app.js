const express = require('express')
const app = express()

const path = require('path')

const message = require('./routes/message')


app.use(express.urlencoded({extended:false}))

app.use('/login', (req, res) => {

    const fileName = 'login.html'
    const options = {
        root: path.join(__dirname)
    };

    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        }

    })
}
)
app.use('/' ,message)

app.listen(4000)