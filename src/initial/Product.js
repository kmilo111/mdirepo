import React, {Component} from 'react';
import ProductForm  from './ProductForm.js'

class Product extends Component{
    render(){

     const datosForma = (datos) =>{
          
       let url = URL + 'product/';
       let datosForm = JSON.stringify({
            id:datos.id_producto,
            name:datos.nombre_producto,
            state:datos.activo_producto,
            skuConfAttrs:[]
        })

       fetch(url, {
             method:'POST',
             headers: {
                 'Authorization': 'Basic YWxlam86MTIz',
                 'Content-Type': 'application/json'
             },
             body: datosForm
           })
          .then((resp) =>{
              if(resp.status === 201) alert('Producto Creado');
              return resp.json();
          })
          .then(data =>{
              console.log(data);
              localStorage.setItem('dataProduct', JSON.stringify(data));
          })
          .catch(function(error){
              console.log('Error',error);
          })
    }

      return(
         <div>
            <ProductForm onSubmit={datosForma} />
        </div>
      )
    }
}

export default Product