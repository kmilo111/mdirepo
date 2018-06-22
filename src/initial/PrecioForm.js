import React from 'react';
import {Field, reduxForm} from 'redux-form';
//import CurrencyInput from 'react-currency-input';

const PrecioForm = props => {

    const changeCheck = (event) =>{
      let isChecked = event.target.checked;
      localStorage.setItem('isCheckedPrice', isChecked);
      //console.log(isChecked);
    }
  
    const {handleSubmit} = props;
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
          <div className="col-md-12 center">
          <form onSubmit={handleSubmit}>
           <div className="form-group">
            <Field name="price_event" type="text"  component={renderField} label="Precio" />
           </div>
           <label>
             <Field name="afiliado" component="input" type="radio" value="true" /> Afiliado
           </label><br/>
           <label>
             <Field name="afiliado" component="input" type="radio" value="false" /> No Afiliado
           </label>
           <div className="row">
             <div className="col-md-4">
               <div className="custom-control custom-checkbox size-chk">
                 <Field name="activo_precio" 
                       type="checkbox" 
                       onChange={changeCheck} 
                       component={renderField} 
                       label="Activo" />
               </div>
             </div>
             <div className="col-md-4">
                <button className="btn btn-light btn-add-price">
                    <i className="fa fa-plus-circle"/>
                 </button> 
             </div>
           </div>
           </form>
          </div>
         </div>
       </div>) 
}

export default reduxForm({
    form: 'PrecioForm' // a unique identifier for this form
  })(PrecioForm)