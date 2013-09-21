//Inicializamos las variables necesarias.
var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(4530);
io.set('log level',1); //Lo pongo a nivel uno para evitar demasiados logs ajenos a la aplicación.

app.configure(function(){

	//No uso layout en las vistas
	app.set('view options', {
	  layout: false
	});

	//Indicamos el directorio de acceso publico
    app.use(express.static('public'));

});

//Marco la ruta de acceso y la vista a mostrar
app.get('/', function(req, res){
    res.render('index.jade', { 
    	pageTitle: 'Pizarra'
    });
});

io.sockets.on('connection',function(socket){
	console.log(socket);
	socket.on('adelante',function(){
		io.sockets.emit('adelante',true);
	});

	socket.on('atras',function(){
		io.sockets.emit('atras',true);
	});

})