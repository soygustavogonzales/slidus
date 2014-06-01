!function($){

	var prev = $('a.left'),
	next = $('a.right'),
	btnNext = $('button.next'),
	btnPrev = $('button.prev'),
	socket = io.connect('/');


	socket.on('connect',function(){
		
		btnPrev.on("click",function(){
			socket.emit('atras',true);
			console.log(this);
		});

		btnNext.on("click",function(){
			socket.emit('adelante',true);
			console.log(this);
		});

	})//end sockets
}(window.jQuery)