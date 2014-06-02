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
	
	var oneYear = 31557600000;//miliseconds in one year
 app.use(express.static('public', { maxAge: oneYear }));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({secret: 'mi secreto'}));

});

//Marco la ruta de acceso y la vista a mostrar
app.get('/', function(req, res){
	console.log('Nuevo host conectado');
    res.render('one3hill.jade', { 
    	pageTitle: 'Pizarra'
    	,pretty:true//para que no compirma el html, para poder visualizar el documento .html por el developer tools del navegador
    });
});
app.get('/sliders/:slider',function(req,res,next){
	var slider = req.params.slider
	if(slider!=null||slider!=""||slider!=" "||slider!="uu"){
		res.render("sliders/"+slider+".jade",{title:"Ing.Administrativa"})
	}
	else{
		var err = new Error("slider not exists")
		err.status = 404
		next(err)
	}
})

app.get('/admin',function(req,res){
	if(req.session.user.loginState == true)
		res.render('adminPresentation.jade');
	else
		res.redirect('/login')
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
	console.log(req.body);
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
					req.session.user.loginState = true;
					res.redirect('/admin')
					break;
				default:
					res.redirect('/admin')
					req.session.user.loginState = true;
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