const events = require('events')


// class Saludo extends events.EventEmitter() {}
function saludar(){
    const emisor = new events.EventEmitter()
    setTimeout(()=>{emisor.emit('saluda','juan')},2000)
    setTimeout(()=>{emisor.emit('saluda','juan')},4000)
    setTimeout(()=>{emisor.emit('saluda','juan')},6000)
    return emisor
}

let sal = saludar()

sal.on('saluda',(nombre)=>{
    console.log('hola '+nombre)
})
