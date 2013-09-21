!function($){

	var prev = $('a.left'),
	next = $('a.right'),
	btnNext = $('button.next'),
	btnPrev = $('button.prev'),
	socket = io.connect('/');

	function adelante(){
		prev.trigger('click');
	}
	function atras(){
		next.trigger('click');
	}

	socket.on('connect',function(){
		
		btnPrev.on("click",function(){
			socket.emit('atras',true);
			console.log(this);
		});

		btnNext.on("click",function(){
			socket.emit('adelante',true);
			console.log(this);
		});

		socket.on('adelante',function(){
			adelante();
		});

		socket.on('atras',function(){
			atras();
		});

	})//end sockets
}(window.jQuery)