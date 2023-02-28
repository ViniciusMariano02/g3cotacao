const express = require('express')
const path = require('path');

const app =express()

const { resolve } = require('path')

app.use('/', 

    express.static(
        resolve(
            __dirname,
            './build'
        )       
    )
)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

app.listen(process.env.PORT || 3000, (err) => { 
    if (err) {return console.log(err)}

    console.log('Ok')
} )
