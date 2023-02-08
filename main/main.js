// IMPORTANDO BIBLIOTECAS

const SerialPort = require('serialport')
const express = require('express') 
const socketIo = require('socket.io')
const http = require('http')

// CRIANDO SERVE

const app = express ()
const server = http.greateServer(app)

app.use(express.static('public'))//ADICIONA ARQUIVOS ESTATICOS

app.get('/',(req, res, next) =>{
    res.sendFile(__dirname + '/public/index.html')//DOU A MINHA PAGINA NA WEB

})

server.listen(9999, () => {
    console.log('porta 192.168.0.2:%d', server.address().port)
})

const io = socketIo.listen(server)

//CONFIGURACAO DA SERIAL
const readline = SerialPort.parsers.Readline
const parser = new readline({delimiter: '\r\n'}) // DECODIFICAR O HEXADECIMAL EM INTEIRO, STRING
const mySerial = new SerialPort("COM3", {
    baudRate: 9600,
})
mySerial.pipe(parser)

mySerial.on('open', function () {
    console.log('CONEXAO SERIAL INICIADA')   
    parser.on('data',function (data) {
        console.log(data)
        var dado = parseInt(((data*100)/1023))// TRANSFORMA EM %
        console.log(dado)
        io.emit('serial:data',{
            value: dado.toString()
        })

   })
})