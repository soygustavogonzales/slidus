//Inicializamos las variables necesarias.
var express = require('express')
	, fs = require('fs')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = 3000;
var host = "localhost";
server.listen(port);
io.set('log level',1); //Lo pongo a nivel uno para evitar demasiados logs ajenos a la aplicación.

app.configure(function(){

	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({secret: 'mi secreto'}));
	//No uso layout en las vistas
	var oneYear = 31557600000;


	//Indicamos el directorio de acceso publico
    app.use(express.static('public', { maxAge: oneYear }));

});
//Marco la ruta de acceso y la vista a mostrar
app.get('/', function(req, res){
	console.log('Nuevo host conectado');
    res.render('one3hill.jade', { 
    	pageTitle: 'Pizarra'
    	,pretty:true//para que no compirma el html, para poder visualizar el documento .html por el developer tools del navegador
    });
});
app.get('/aed2',function(req,res){
	res.sendfile(__dirname+"/views/prueba.html")
})
app.get('/admin',function(req,res){
	//res.render("loggin.jade");
		res.render('adminPresentation.jade');

})

app.get("/login",function(req,res){
	res.render('loggin.jade',{
		presentations:[
		'one3hill',
		'aed2',
		'admin'
		]
	})
})

app.post('/sendLoginData',function(req,res){
	var username = req.body.user,psw = req.body.psw, presentation = req.body.ptn;
	req.session.user = {
		name:username,
		password:psw,
		presentation:presentation
	}
	console.log(req.session.user);
	if(psw=="12345"){
			switch(true){
				case(username=="one3hill"):
					res.render("adminPresentation.jade")
					break;
				default:
					res.render("adminPresentation.jade")
					break;
			}
		}
	else{
		res.redirect('/login')
	}
})
io.sockets.on('connection',function(socket){
	//console.log(socket);
	socket.on('adelante',function(){
		io.sockets.emit('adelante',true);
	});

	socket.on('atras',function(){
		io.sockets.emit('atras',true);
	});

})