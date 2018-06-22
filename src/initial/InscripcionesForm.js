import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';

class InscripcionesForm extends Component  {

    constructor(props){
        super(props);

        this.state = {
            dataProducts:[]
        }
    }

    getProducts(){
        let url = URL + 'product/';
        fetch(url, {
                method:'GET',
                headers: {
                    'Authorization': 'Basic YWxlam86MTIz',
                    'Content-Type':'application/json'
                }
            })
            .then((resp) => {
              return resp.json();
            })
            .then(data => {
                //console.log(data);    
                this.setState({dataProducts:data})
            })
            .catch(function(error){
               console.log('Error', error);
            });
      }

     componentDidMount(){
        this.getProducts();
     }

    render(){
    const {handleSubmit} = this.props;
    const{dataProducts} =  this.state;
    const renderField = ({
        input,
        label,
        type,
        meta: { touched, error, warning }
      }) => (
          <div>
           <label>{label}</label>
            <input {...input} className="form-control"  placeholder={label} type={type} />
            {touched &&
              ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
          </div>
      );

      return(
          <div className="container">
           <div className="row">
            <div className="col-md-10 center">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                   <Field name="nombre_inscr" type="text" component={renderField} label="Nombre" />
                </div>
                <div className="form-group">
                   <Field name="edad_minima" type="text" component={renderField} label="Edad Minima" />
                </div>
                <div className="form-group">
                   <Field name="edad_maxima" type="text" component={renderField} label="Edad Maxima" />
                </div>
                <div className="row">
                 <div className="col-md-8">
                  <div className="form-group">
                   <label>Productos</label>
                    <Field name="producto" className="custom-select" component="select">  
                       <option value="0"></option>
                       {dataProducts.map(evt =>
                         <option value={evt.id} key={evt.id}>{evt.name}</option>
                        )}
                    </Field>
                  </div>  
                 </div>
                 <div className="col-md-4">
                   <button className="btn btn-light btn-add-config">
                     <i className="fa fa-plus-circle"></i>
                   </button>
                  </div>
                </div>
                <div className="col-md-8 center-button center">
                  <button className="btn btn-info">Guardar</button>
                </div>
              </form>
            </div>
           </div>
         </div>
     )
   }
}


export default reduxForm({
    form: 'InscripcionesForm' // a unique identifier for this form
  })(InscripcionesForm)