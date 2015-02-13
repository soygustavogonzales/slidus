//console.log(window.api);
console.log(impressApiSlider)
    socket = io.connect('/');

    socket.on('connect',function(){

        socket.on('adelante',function(){
            impressApiSlider.next();
        });

        socket.on('atras',function(){
            impressApiSlider.prev();
        });

    })
