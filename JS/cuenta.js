const btn_direcciones=document.getElementById('c-direcciones'),
    btn_infor=document.getElementById('c-informacion'),
    btn_alertas=document.getElementById('c-alertas'),
    btn_pago=document.getElementById('c-pago'),
    btn_historial=document.getElementById('c-historial'),

    ventanaInfor=document.getElementById('contenedor-infor'),
    ventanaDir=document.getElementById('contenedor-direcciones'),
    ventanaPago=document.getElementById('contenedor-pago'),
    ventanaAlert=document.getElementById('contenedor-alertas'),
    ventanaHisto=document.getElementById('contenedor-histo');

const btnAbrirTarjeta = document.getElementById('agg-tarjeta'),
    abrirTarjeta = document.getElementById('overlayTarjeta'),
    btnCerrartarjeta = document.getElementById('.btn-close-tar'),
    tarjetaEnviada = document.getElementById('"enviar-tarjet');

const numTarjeta=document.getElementById('n-tarjeta'),
    mesExpira=document.getElementById('expiracion'),
    añoexpira=document.getElementById('añoExpira'),
    ccvTarjeta=document.getElementById('ccv-tarjet');
    
function leaveVentana(){
    ventanaAlert.classList.remove('active');
    ventanaInfor.classList.remove('active');
    ventanaPago.classList.remove('active');
    ventanaDir.classList.remove('active');
    ventanaHisto.classList.remove('active');
}
function leaveCategoria(){
    btn_direcciones.classList.remove('active');
    btn_historial.classList.remove('active');
    btn_pago.classList.remove('active');
    btn_infor.classList.remove('active');
    btn_alertas.classList.remove('active');
}


btn_direcciones.addEventListener('click', function(){
    leaveVentana();
    leaveCategoria();
    ventanaDir.classList.add('active');
    btn_direcciones.classList.add('active');
});


btn_infor.addEventListener('click', function(){
    leaveVentana();
    leaveCategoria();
    ventanaInfor.classList.add('active');
    btn_infor.classList.add('active');
});


btn_alertas.addEventListener('click', function(){
    leaveVentana();
    leaveCategoria();
    ventanaAlert.classList.add('active');
    btn_alertas.classList.add('active');
});


btn_pago.addEventListener('click', function(){
    leaveVentana();
    leaveCategoria();
    btn_pago.classList.add('active');
    ventanaPago.classList.add('active');
});


btn_historial.addEventListener('click', function(){
    leaveVentana();
    leaveCategoria();
    ventanaHisto.classList.add('active');
    btn_historial.classList.add('active');
});

    
btnAbrirTarjeta.addEventListener('click', function(){
    abrirTarjeta.classList.add('active');
});
btnCerrartarjeta.addEventListener('click', function(){
    abrirTarjeta.classList.remove('active');
});

rellenoTarjeta();
function rellenoTarjeta(){
    tarjetaEnviada.addEventListener('click', cerrarTarjeta);
}

function cerrarTarjeta(e){
    e.preventDefault();
    if(numTarjeta.value === ''||mesExpira.value ===''||añoexpira.value ===''){
        alert('Complete todos los datos de su Tarjeta');
    }else{
        abrirTarjeta.classList.remove('active');
    }
}




