const compra= new Bolsa();
const listaCompra = document.querySelector('#lista-productos tbody');
const bolsaPagar = document.getElementById('carrito');
const irPagarBTN = document.getElementById('procesar-compra');
const nameCliente = document.getElementById('cliente'),
    correoCliente = document.getElementById('correo'),
    telefonoCliente = document.getElementById('n-telefono'),
    cedulaCLiente = document.getElementById('cedula');


cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerLScompra());

    bolsaPagar.addEventListener('click', (e) => {compra.eliminarProducto(e)});

    compra.calcularValores();

    irPagarBTN.addEventListener('click', procesarCompra);

    bolsaPagar.addEventListener('change', (e) => { compra.modificarCantidad(e) });
    bolsaPagar.addEventListener('keyup', (e) => { compra.modificarCantidad(e) });

}

function procesarCompra(e){
    e.preventDefault();

    if(compra.obtenerProductosLocalStorage().length===0){
        alert('Error, al parecer eliminaste tus productos. Te redireccionaremos al Inicio.');
        window.location = 'home.html';
    }
    else if(nameCliente.value === '' || correoCliente.value === ''|| cedulaCLiente.value === ''|| telefonoCliente===''){
        alert('Inserta todos tus datos para realizar la compra');
    }else{
        const espere= document.querySelector('#gif-carga');     
        espere.classList.add('active');           
        setTimeout(()=>{
            espere.classList.remove('active'); 
            setTimeout(()=>{
                compra.vaciarLS();
                window.location='home.html';
            },);
        },4000);
        
    }
}