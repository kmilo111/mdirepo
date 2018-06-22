import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class ProductForm extends Component{

    constructor(){
        super();
        this.state = {
            value:'',
            isCheckDimension:false,
            isCheckActive:false,
            list:[]
        }

        this.getProductName = this.getProductName.bind(this);
        this.changeDimensionSku = this.changeDimensionSku.bind(this);
        this.changeActiveAttr = this.changeActiveAttr.bind(this);
    }

    changeDimensionSku(event){ 
       this.setState({
          isCheckDimension:event.target.checked
        })
     }

    changeActiveAttr(event){
       this.setState({
          isCheckActive:event.target.checked
       })   
    }

    getProductName(){
       this.state.value;
    }
 
    render(){

        const {handleSubmit} = this.props;
        const {isCheckDimension, value, isCheckActive, list} = this.state;
        
        const renderField = ({
            input,
            label,
            type,
            meta: { touched, error, warning }
          }) => (
            <div>
               <label>{label}</label>
                <input {...input} autoComplete="off" className="form-control" placeholder={label} type={type} />
                {touched &&
                  ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
              </div>
         );

         const getAttr = () =>{

             let url = URL + 'skuconfattr/'; 
             let localPro = JSON.parse(localStorage.getItem('dataProduct'));

             let objPro = JSON.stringify({
                   idProduct:localPro.id,
                   name:value,
                   skuDimension:isCheckDimension,
                   state:isCheckActive
             })

             fetch(url, {
                method:'POST',
                headers: {
                    'Authorization': 'Basic YWxlam86MTIz',
                    'Content-Type': 'application/json'
                },
                body: objPro
              })
             .then((resp) =>{
                 return resp.json();
             })
             .then(data =>{
                 //let x = Math.random();
                 let valorx = {
                    id:data.id,
                    name:value,
                    dimension:isCheckDimension,
                    activo:isCheckActive
                }
                 this.setState((prevState) =>{
                    return {
                       list:prevState.list.concat(valorx)
                    }
                });
    
             })
             .catch(function(error){
                console.log('Error',error);
             })
         }

        return(
           <div className="container">
            <div className="row">
             <div className="col-md-12">
               <h2 className="mainHeader">Registrar Productos</h2>
              </div>
              <div className="col-md-8 center">
               <form onSubmit={handleSubmit}>
                 <div className="form-group">
                   <Field type="text" name="id_producto" component={renderField} label="Id" />
                 </div>
                 <div className="form-group">
                   <Field name="nombre_producto" type="text" component={renderField} label="Nombre"/>
                 </div>
                 <div className="custom-control custom-checkbox">
                  <Field name="activo_producto" type="checkbox" component={renderField} label="Activo" /> 
                 </div>
                 <div className="col-md-8 center-button center">
                    <button className="btn btn-info">Guardar</button>
                 </div>
                 <p className="font-weight-bold text-mod">Atributos:</p>
                 <div className="row">
                  <div className="col-md-4">
                   <div className="form-group">
                     <Field name="nombre_atributo" 
                            type="text" component={renderField} 
                            label="Nombre"
                            onBlur={event => this.setState({ value: event.target.value })} /> 
                   </div>
                  <div className="custom-control custom-checkbox chkbox-product">
                    <Field name="dimension_sku" 
                            type="checkbox" 
                            component={renderField} 
                            label="Dimensión SKU"
                            onChange={this.changeDimensionSku} /> 
                  </div>
                 <div className="custom-control custom-checkbox chkbox-product">
                   <Field name="activo_atributo"
                          type="checkbox"
                          component={renderField} 
                          label="Activo"
                          onChange={this.changeActiveAttr} /> 
                </div>     
               </div>
               <div className="col-md-4">
                  <a href="javascript:void(0)" className="btnAddGroupEvent" onClick={getAttr}>
                    <i className="fa fa-plus-circle"></i>
                  </a>
               </div>
              </div>
             </form>
              <table className="table table-striped tbl-productos">
                <thead>
                 <tr>
                   <th>Activo</th>
                   <th>Nombre</th>
                   <th></th>
                 </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <input 
                            type="checkbox" 
                            name="activo_producto" 
                            value='1'
                            onChange={this.changeCheck} />
                        </td>
                        <td>Fit drift</td>
                        <td>
                        <a className="btn btn-secondary" 
                          data-toggle="modal" 
                          data-target="#editModal">Editar</a>  
                        </td>
                    </tr>
                    {/*list.map(i=>
                    <tr key={i.id}>
                     <td>
                        <input 
                            type="checkbox" 
                            name="activo_producto" 
                            value={i.id}
                            onChange={this.changeCheck} />
                        </td>
                     <td>{i.name}</td>
                     <td>
                       <a className="btn btn-secondary" 
                          data-toggle="modal" 
                          data-target="#editModal">Editar</a>  
                     </td>    
                    </tr>)*/}
                </tbody>
              </table>
              </div>
             </div>
            {/*start modal*/}
            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
             <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                   <h5 className="modal-title" id="ModalLabel">Editar Atributo</h5>
                   <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                   </button>
                  </div>
                  <div className="modal-body" >
                  <p className="font-weight-bold text-mod">Atributos:</p>
                 <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                        <Field name="nombre_atributo" 
                                type="text" component={renderField} 
                                label="Nombre"
                                onBlur={event => this.setState({ value: event.target.value })} /> 
                    </div>
                    <div className="custom-control custom-checkbox chkbox-product">
                        <Field name="dimension_sku" 
                                type="checkbox" 
                                component={renderField} 
                                label="Dimensión SKU"
                                onChange={this.changeDimensionSku} /> 
                    </div>
                    <div className="custom-control custom-checkbox chkbox-product">
                    <Field name="activo_atributo"
                            type="checkbox"
                            component={renderField} 
                            label="Activo"
                            onChange={this.changeActiveAttr} /> 
                    </div>     
                </div>
               </div>    
             </div>     
              <div className="modal-footer"> 
                <button type="button" className="btn btn-primary" data-dismiss="modal">Cancelar</button>
              </div>
           </div>
          </div>
        </div>
      </div>
     )
    }
}

export default reduxForm({
  form: 'ProductForm' // a unique identifier for this form
})(ProductForm)