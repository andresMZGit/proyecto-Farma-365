class Bolsa{

    //añadir
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('btn-comprar')){
            const producto=e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);             
        }
    }

    //adquiere la informacion del producto para pasarlo a la caja de la bolsa
    leerDatosProducto(producto){
        const infoProduct = {
            imagen : producto.querySelector('.box-producto img').src,
            titulo : producto.querySelector('.descr-product a').textContent,
            precio : producto.querySelector('.precio span').textContent,
            id : producto.querySelector('.descr-product a').getAttribute('data-id'),
            cantidad : 1
        }        
        this.insertarCarrito(infoProduct);
        
    }
    //inserta los productos con la informacion adquirida
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `        
            <td><img src="${producto.imagen}" width="50px" max-height="50px"></td>
            <td class="titulo-product">${producto.titulo}</td>
            <td>$ ${producto.precio}</td>            
            <td><a href="#" class="borrar-producto eliminar-btn" data-id="${producto.id}">Eliminar</a></td>
         `;
        listaProductos.appendChild(row);
        this.guardarProductoLocalStorage(producto);
    }

    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove(); 
            producto=e.target.parentElement.parentElement ;
            productoID=producto.querySelector('a').getAttribute('data-id');  
            console.log('eliminado');
        }
        this.eliminarProductoLS(productoID);
        this.calcularValores();
    }


    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLS();
        return false;
    }

    guardarProductoLocalStorage(producto){
        let productos;
        productos=this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    
    
    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos')===null){
            productoLS = [];
        }else{
            productoLS=JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }


    eliminarProductoLS(productoID){
        let productosLS;
        productosLS=this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    leerDatosLS(){
        let productosLS;
        productosLS=this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `        
                <td><img src="${producto.imagen}" width="50px"></td>
                <td class="titulo-product">${producto.titulo}</td>
                <td>$   ${producto.precio}</td>            
                <td>
                    <a href="#" class="borrar-producto eliminar-btn" data-id="${producto.id}">Eliminar</a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }
    vaciarLS(){
        localStorage.clear();
    }

    realizarCompra(){
        location.href='/Users/Andres%20MZ/Documents/UNIVERSIDAD/PROYECTO-HCI/FARMA-365/registrado/pagarPedido.html#';
    }

    

    //COMPRA
    leerLScompra(){
        let productosLS;
        productosLS=this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row=document.createElement('tr');
            row.innerHTML = `        
                <td><img src="${producto.imagen}" width="70px"></td>
                <td class="titulo-product">${producto.titulo}</td>
                <td>$   ${producto.precio}</td>            
                <td>
                    <input type="number" id="l1-5" class="cant-producto cantidad" min="1" value="${producto.cantidad}" style="padding:3px;width: 40px;"></input>
                </td>            
                <td id="subtotales">$   ${producto.precio*producto.cantidad}</td>

                <td>
                    <a href="#" class="borrar-producto eliminar-btn" data-id="${producto.id}">Eliminar</a>
                </td>                
           `;
            listaCompra.appendChild(row);
        });
    }   
        
    leerLSPaginas(){
        let productosLS;
        productosLS=this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row=document.createElement('tr');
            row.innerHTML = `        
                <td><img src="${producto.imagen}" width="50px"></td>
                <td class="titulo-product">${producto.titulo}</td>
                <td>$   ${producto.precio}</td>            
                <td>
                    <a href="#" class="borrar-producto eliminar-btn" data-id="${producto.id}">Eliminar</a>
                </td>               
           `;
           listaProductosAgg.appendChild(row);
        });
    }


    calcularValores(){
        let productoLS;
        let total=0, subtotal=0,iva=0, domicilo=3.00;
        productoLS=this.obtenerProductosLocalStorage();
        for(let i=0; i<productoLS.length; i++){
            let element=Number(productoLS[i].precio*productoLS[i].cantidad);
            subtotal=subtotal+element;
        }
        iva=parseFloat(subtotal*0.12);
        total=parseFloat(subtotal+iva+domicilo);

        document.getElementById('subtotal').innerHTML='$'+subtotal.toFixed(2);
        document.getElementById('iva').innerHTML='$'+iva.toFixed(2);
        document.getElementById('recargo').innerHTML='$'+domicilo.toFixed(2);
        document.getElementById('total').innerHTML='$'+total.toFixed(2);
    }

    //mostrar el total a pagar hasta el momento
    calcularValorNeto(){
        let productoLS;
        let total=0, subtotal=0,iva=0;
        productoLS=this.obtenerProductosLocalStorage();
        for(let i=0; i<productoLS.length; i++){
            let element=Number(productoLS[i].precio*productoLS[i].cantidad);
            subtotal=subtotal+element;
        }
        iva=parseFloat(subtotal*0.12);
        total=parseFloat(subtotal+iva);

        document.getElementById('total-bolsa').innerHTML= '$'+total.toFixed(2);
        document.getElementById('total-bolsaNeto').innerHTML=total.toFixed(2);
    }


    modificarCantidad(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio).toFixed(2);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            alert('Cantidad no modificada, intenta mas tarde.');
        }
    }
}