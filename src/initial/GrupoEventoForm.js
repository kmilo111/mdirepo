import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class GrupoEventoForm  extends Component {

  constructor(){
    super()
    this.state ={
       list:[],
       value:'',
       selectValue:''
    }
    this.addChild = this.addChild.bind(this);
    this.handleCanalesDisp = this.handleCanalesDisp.bind(this);
  }

  handleCanalesDisp(event){
      this.setState({
        selectValue:event.target.value
      });

      localStorage.setItem('canalDisp', event.target.value);
     //console.log(event.target.value);
  }

  changeCheck(event){
     let isChecked = event.target.checked;
     console.log(isChecked);
    //console.log(event.target.value);
  }
  
  addChild(){

    const value = this.state.value;
    const canalDisp = localStorage.getItem('canalDisp');
    
    const parseInfoGroup = JSON.parse(localStorage.getItem('grupoEvento'));
    const id = parseInfoGroup.id;

    let txtopt = document.getElementById('canal_evento');
    let selectedText = txtopt.options[txtopt.selectedIndex].text;
    
    let x = Math.random();
    let valorx = {
      id:x.toFixed(2),
      name:value,
      valueSelect:selectedText
    }
    this.setState((prevState) =>{
      return {
        list:prevState.list.concat(valorx)
      }
    })

    let groupEventData = JSON.stringify({
      idGroupEvent:id,
      name: value,
      state:1,
      typeSale:Number(canalDisp),
      idEvent:null,
      salePlace:[{ }]
    })

    let url = URL + 'canal/';

    fetch(url, {
      method:'POST',
      headers: {
          'Authorization': 'Basic YWxlam86MTIz',
          'Content-Type': 'application/json'
      },
      body:groupEventData
    })
    .then((resp) =>{
      return resp.json();
    })
    .then(data =>{
      //console.log(data);
    })
    .catch(function(error){
      console.log('Error', error);
    })

    //console.log(this.state.list);
    //console.log(value);
  }

  render(){
    const { handleSubmit } = this.props;
    const {list} = this.state;

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
    )


    return(<div className="container">
           <div className="row">
            <div className="col-md-12">
              <h2 className="mainHeader">Grupo de Eventos</h2>
            </div>
           <div className="col-md-8 center">
            <form onSubmit={handleSubmit}>
             <div className="form-group">
               <Field name="nombre_evento" type="text" component={renderField} label="Nombre"/>
             </div>
             <div className="custom-control custom-checkbox">
               <Field name="activo_evento" type="checkbox" component={renderField} label="Activo" />  
             </div>
             <div className="col-md-11 center-button center">
               <button className="btn btn-info">Guardar</button>
             </div> 
             <p className="font-weight-bold text-mod">Canales de Venta:</p>
             <div className="row">
              <div className="col-md-4">
               <div className="form-group">
                 <Field name="sede_evento" 
                        type="text" 
                       component={renderField}  
                       onBlur={event => this.setState({ value: event.target.value })} 
                       label="Sede" />
                </div> 
               </div>
              <div className="col-md-4">
               <div className="form-group">
                  <label>Canales disponibles</label> 
                  <Field name="canal_evento" 
                        className="custom-select" 
                        component="select" 
                        label="Canales disponibles"
                        onChange={this.handleCanalesDisp}
                        id="canal_evento">
                      <option value="-0"></option>
                      <option value="0">online</option>
                      <option value="1">offline</option>
                  </Field>
                </div>
              </div>
              <div className="col-md-4">
              <a href="javascript:void(0)" className="btnAddGroupEvent" onClick={this.addChild}>
                <i className="fa fa-plus-circle"/>
              </a>  
              </div>
              <table className="table table-striped tbl-canales">
                <thead>
                  <tr>
                    <th>Activo</th> 
                    <th>Nombre</th>
                    <th>Tipo</th>
                  </tr>  
                </thead>  
                <tbody>
                  {
                    list.map(i=>
                    <tr key={i.id}>
                      <td>
                         <input 
                            type="checkbox" 
                            name="activo_canal" 
                            value={i.id}
                            onChange={this.changeCheck} />
                      </td>
                      <td>{i.name}</td>
                      <td>{i.valueSelect}</td>
                   </tr>)
                  }
                </tbody>
              </table>
            </div>
           </form>
           </div>
          </div>
         </div>)
  }

}


GrupoEventoForm = reduxForm({
  form: 'GrupoEventoForm' // a unique name for this form
})(GrupoEventoForm);


export default GrupoEventoForm;