import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class TypeFormEvent extends Component{
 
  constructor(props){
    super(props)
      this.state = {
        startDate: moment()
      };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date){
    this.setState({
      startDate:date
    });
  }

    render(){
      const { handleSubmit } = this.props;
      const renderField = ({
        input,
        label,
        type,
        meta: { touched, error, warning }
      }) => (
        <div>
           <label>{label}</label>
            <input {...input} className="form-control" placeholder={label} type={type} />
            {touched &&
              ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
          </div>
      )
        return(
          <div className="container">
             <div className="row">
             <div className="col-md-12">
                <h2 className="mainHeader">Tipo Eventos</h2>
              </div>
              <div className="col-md-6 center">
              <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <Field name="nombre_evento" type="text" component={renderField} label="Nombre Evento"/>
                </div>
                <div className="custom-control custom-checkbox">
                  <Field name="numero_participante" type="checkbox" component={renderField} label="Numero Participante" />
                </div>
                <div className="custom-control custom-checkbox">
                  <Field name="activo" type="checkbox" component={renderField} label="Activo" /> 
                </div>
                 <p className="font-weight-bold text-mod">Modalidades:</p>
               <div className="form-group">
                  <Field name="nombre_modalidad" type="text" component={renderField} label="Nombre Modalidad"/>
               </div>
               <div className="row">
                <div className="col-md-4">
                  <div className="custom-control custom-checkbox">
                    <Field name="activo_modalidad" type="checkbox" component={renderField} label="Activo" />  
                  </div>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-light btn-add">
                      Agregar <i className="fa fa-plus-circle"/>
                    </button> 
                </div>
               </div>
              </form>    
             </div>
            </div>
          </div>
        )
    }   
}

TypeFormEvent = reduxForm({
    form: 'TypeFormEvent' // a unique name for this form
  })(TypeFormEvent);

export default TypeFormEvent;