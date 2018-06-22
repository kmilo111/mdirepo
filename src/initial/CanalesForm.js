import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-table/react-table.css';

class CanalesForm extends Component {

    constructor(){
        super()
        this.state ={
           list:[]
        }
        this.addChild = this.addChild.bind(this);
      }
    
      addChild(){
        
        let x = Math.random();
    
        let valorx = {
          id:x,
          num:x*0.5
        }
    
        this.setState((prevState) =>{
          return {
            list:prevState.list.concat(valorx)
          }
        })
    
        //console.log(this.state.list);
      }
      

  render(){
    const {list} = this.state;
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
      <div>
        <p className="font-weight-bold text-mod">Canales de Venta:</p>
        <div className="row">
        <form onSubmit={handleSubmit}>
        <div className="col-md-4">
            <div className="form-group">
            <Field name="sede_evento" type="text" component={renderField} label="Sede"/>
            </div> 
            </div>
         <div className="col-md-4">
          <div className="form-group">
           <label>Canales disponibles</label> 
            <Field name="canal_evento" className="custom-select" component="select" label="Canales disponibles">
                <option value="0"></option>
                <option value="online">online</option>
                <option value="offline">offline</option>
            </Field>
          </div>
        </div>
        <div className="col-md-4">
          <a href="#" className="btnAddGroupEvent" onClick={this.addChild}>
           <i className="fa fa-plus-circle"/>
          </a>  
        </div>
        <ul>
        {list.map(li =>
            <li key={li.id}>{li.num}</li>
        )}
        </ul>
     </form>
     </div>
    </div>
      )
     }
  }


  CanalesForm = reduxForm({
    form: 'CanalesForm' // a unique name for this form
  })(CanalesForm);
  
  
  export default CanalesForm;