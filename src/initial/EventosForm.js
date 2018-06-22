import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import ReactTable from "react-table";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import URL from '../config/Config.js';
import spinner from '../assets/images/spinner.gif';
import PrecioForm from "./PrecioForm.js";
import InscripcionesForm from './InscripcionesForm.js';


class FormEvent extends Component {
   constructor(props){
      super(props);
      this.state = {
        startDate: moment(),
        isFormModal:true,
        isFormChannel:false,
        dataEvents:[],
        dataGroupEvent:[],
        dataPeriodEvent:[],
        dataCityEvent:[],
        dataDimensionTypeEvent:[],
        value:undefined,
        dataSaveEvent:[],
        Prices:[],
        list:[],
        value:''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleTipoEvento = this.handleTipoEvento.bind(this);
      this.handleClick= this.handleClick.bind(this);
      this.handClickConfig = this.handClickConfig.bind(this);
      this.handChannelConfig = this.handChannelConfig.bind(this);
      this.renderEditable = this.renderEditable.bind(this);
      this.getIdDimension = this.getIdDimension.bind(this);

      localStorage.setItem('isCheckedPrice', false);
   }

   handleChange(date){
    this.setState({
      startDate:date
    });
  }

  handleClick(){
    this.setState({
      isFormModal:false,
      isFormChannel:false
    })

    let elements = document.getElementsByClassName('id');
    if (elements.length > 0) {
      //console.log(elements[0].value);
    }
    //console.log(elements);
  }
  
  handClickConfig(){
    this.setState({
      isFormModal:true,
      isFormChannel:false
    })
  }

  handChannelConfig(){
    this.setState({
      isFormChannel:true
    })
  }

  handleTipoEvento(event){

    let txtopt = document.getElementById('tipoEvento');
    let selectedText = txtopt.options[txtopt.selectedIndex].text;
    
    this.setState({
      value:event.target.value
    });
  
    this.getDataDimensionByType(selectedText);
    
    //console.log(event.target.value);
    //console.log(selectTextItem)
  }

  renderEditable(cellInfo){
    
     let url = URL + 'dimensionevent/';
     let idEvent =  localStorage.getItem('idEvent');
     return(
       <div 
          style={{backgroundColor:"#fafafa"}}
          contentEditable
          suppressContentEditableWarning
          onBlur = {e => {
            const data = [...this.state.dataDimensionTypeEvent]
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({data})
            data.forEach(element => {
                let dataDimension = JSON.stringify( {
                  idEventType:element.idEventType,
                  name:element.dimension,
                  maxCapacity:element.maxCapacity,
                  idEvent:idEvent,
                  state:true
                });

                 fetch(url, {
                    method:'POST',
                    headers: {
                        'Authorization': 'Basic YWxlam86MTIz',
                        'Content-Type': 'application/json'
                    },
                    body:dataDimension
                  })
                  .then((resp) =>{
                    return resp.json();
                  })
                  .then(data =>{
                    //console.log(data);
                    localStorage.setItem('dataDimensionEvent', JSON.stringify(data));
                  })
                  .catch(function(error){
                    console.log('Error', error);
                  })

              });
          }}
       />
     ) 
  }
 
  getDataEventTypes(){
    let url = URL + 'eventtypes/';
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
          this.setState({dataEvents:data})
        })
        .catch(function(error){
           console.log('Error', error);
        });
  }

  getDataGroupEvent(){

    let url = URL + 'groupevent/';
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
          this.setState({dataGroupEvent:data})
        })
        .catch(function(error){
           console.log('Error', error);
        });
  }

  getPeriodEvent(){
    let url = URL + 'period/';
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
          this.setState({dataPeriodEvent:data})
          
        })
        .catch(function(error){
           console.log('Error', error);
        });
  
  }

  getCityEvent(){
    let url = URL + 'city/';
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
          this.setState({dataCityEvent:data})      
        })
        .catch(function(error){
           console.log('Error', error);
        });
  }

  getDataDimensionByType(eventType){
    let url = URL + 'eventtypes/'+eventType;
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
          let dataDimension = data.dimensionEventType 
          this.setState({dataDimensionTypeEvent:dataDimension})
           //console.log(dataDimension);
        })
        .catch(function(error){
           console.log('Error', error);
        });
  }


  getCanalbyGroup(){
    let url = URL + 'canal/xgroup/';
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

           data.forEach(element => {
               if (element.nombreGrupoEvento == 'MDI - Event') {
                 // console.log(element.nombreGrupo);
               }
           });
        })
        .catch(function(error){
           console.log('Error', error);
        });
  }

  getIdDimension(){
    let dataDimensionEvent = localStorage.getItem('dataDimensionEvent');
    let parseEvent = JSON.parse(dataDimensionEvent);
    localStorage.setItem('idDimension', parseEvent.id);
  }

   componentDidMount(){
    this.getDataEventTypes();
    this.getDataGroupEvent();
    this.getPeriodEvent();
    this.getCityEvent();
    this.getCanalbyGroup();
    this.getIdDimension();
  }
  
  handleBlur(event){
    localStorage.setItem('idEvent', event.target.value);
  }
 
   render() {
    const { handleSubmit } = this.props;
    const { dataEvents, 
            dataGroupEvent, 
            dataPeriodEvent, 
            dataCityEvent,
            dataDimensionTypeEvent,
            list} = this.state;

  const renderField = ({
      input,
      label,
      type,
      meta: { touched, error, warning }
    }) => (
        <div>
         <label>{label}</label>
          <input {...input} autoComplete="off" className="form-control"  placeholder={label} type={type} />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
    );

    let formatDate = (this.state.startDate).format('YYYY-MM-DDTHH:mm:SS.SSSZ');
    localStorage.setItem('fechaEvento', formatDate);


    let divStyle = {
      display:'none'
    }

    let divStyle2 = {
      display:'block'
    }

    let headerTitle = {
      config:'Configurar Inscripciones',
      tarifa:'Tarifas',
      canal: 'Canal'
    }

    const renderForm = this.state.isFormModal;
    const renderFormChannel =  this.state.isFormChannel;
  
    //data dimensiones
    const columns = [   
    {
      Header: 'Nombre',
      accessor: 'dimension',
      Cell: props => <span>{props.value}</span>
    }, 
    {
      Header: 'Cupo',
      accessor: 'maxCapacity',
      Cell:this.renderEditable
    },
    {
      Header:'Configurar Inscripciones',
      accessor:'confi',
      Cell: <a className="btn btn-secondary" data-toggle="modal" data-target="#lugarModal" onClick={this.handleClick}>Configurar</a>
    },
    {
      Header:'Tarifas',
      accessor:'tarifas',
      Cell: <a className="btn btn-secondary" data-toggle="modal" data-target="#lugarModal" onClick={this.handClickConfig}>Agregar tarifa</a>
    },
    {
      Header:'Activo',
      accessor:'activo',
      Cell: <input type="checkbox" />
     }];

    const dataCanales = [{
      canal:"Tanner linsley"
      },
      {
       canal:"Jason linsley"
    }];

   const columnsCanales = [{
      Header: 'Activo',
      accessor: 'activo',
      Cell: <input type="checkbox" />
    }, {
      Header: 'Canal',
      accessor: 'canal',
      Cell: props => <span>{props.value}</span>
    },
    {
      Header:'Lugares',
      accessor:'lugares',
      Cell: <a className="btn btn-secondary" data-toggle="modal" data-target="#lugarModal" onClick={this.handChannelConfig}>Editar Canal</a>
      }];

    //console.log(dataDimensionTypeEvent);

    dataDimensionTypeEvent.forEach(element => {
       let dataDimension = element.dimension;
       let datamaxCapacity = element.maxCapacity;
       localStorage.setItem('dimension', dataDimension);
       localStorage.setItem('maxCapacity', datamaxCapacity);
    });
       
    const PrecioForma = (datos) =>{

      let url = URL + 'dimensioneventprice/';
      let PriceDataForm = JSON.stringify({
        idDimensionEvent:localStorage.getItem('idDimension'),
        isAffiliated: datos.afiliado,
        affiliatePrice: datos.price_event,
        unaffiliatedPrice: datos.price_event,
        state:datos.activo_precio
      })

      let isCheckedPrice = localStorage.getItem('isCheckedPrice');

      let x = Math.random();
      let valorx = {
        id:x.toFixed(2),
        activo:isCheckedPrice,
        valueSelect:datos.price_event
      }
      this.setState((prevState) =>{
        return {
          list:prevState.list.concat(valorx)
        }
      })

      fetch(url,{
            method:'POST',
            headers:{
            'Authorization': 'Basic YWxlam86MTIz',
            'Content-Type': 'application/json'
           },
           body:PriceDataForm
      })
      .then((resp) =>{
         return resp.json()
      })
      .then(data =>{
        console.log(data);
        
      })
      .catch(function(error){
          console.log('Error',error);
      })

   }

   const configForm = (datos) =>{
     console.log(datos);
     let dataConfi = {
       idDimensionEvent:2,
       minAge:datos.edad_minima,
       maxAge:datos.edad_maxima,
       idEvent:'EVT01',
       confProducts : [
         {
           idConfInscripcion: "0",
           idProduct: "PR01",
           quantityProducts: 10
         }
       ]

     }
   }

    return (
     <div className="main-container">
      <div className="container">
       <div className="row">
        <div className="col-md-12">
          <h2 className="mainHeader">Evento</h2>
        </div>
         <div className="col-md-8 center">
           <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Field name="event_id" 
                    type="text"
                    className="form-control" 
                    component={renderField} label="ID" onBlur={this.handleBlur} />
           </div>
           <div className="form-group">
              <label>Tipo Evento</label>
              <Field name="tipo_evento" 
                    className="custom-select" 
                    component="select" label="Tipo Evento" 
                    value={this.state.value}
                    onChange={this.handleTipoEvento}
                    id="tipoEvento">
                 <option value="0"></option>
                 {dataEvents.map(evet => 
                   <option value={evet.id} key={evet.id}>{evet.name}</option>
                )}
              </Field>
             </div>
             <div className="form-group">
                <label>Grupo</label>
                <Field name="grupo_evento" 
                      className="custom-select" 
                      component="select" 
                      label="Grupo">
                   <option value="0"></option>
                   {dataGroupEvent.map(evet =>
                     <option value={evet.id} key={evet.id}>{evet.name}</option>
                  )}
                 </Field>
              </div>
              <div className="form-group">
                <label>Periodo</label>
                  <Field 
                    name="periodo_evento" 
                    className="custom-select" 
                    component="select" 
                    label="Periodo">
                    <option value="0"></option>
                    {dataPeriodEvent.map(evet =>
                      <option value={evet.id} key={evet.id}>{evet.name}</option>
                    )}
                 </Field>
               </div>
               <div className="form-group">
                <label>Ciudad</label>
                  <Field name="ciudad_evento" 
                         className="custom-select" 
                         component="select" label="Ciudad">
                    <option value="0"></option>
                    {dataCityEvent.map(evet =>
                      <option value={evet.id} key={evet.id}>{evet.name}</option>
                    )}
                 </Field>
              </div>
              <div className="form-group">
                <label>Fecha Evento</label>
                <DatePicker name="fecha_evento" className="form-control" selected={this.state.startDate} onChange={this.handleChange} />
              </div>
             <div className="form-group">
                <Field name="nombre_modalidad" type="text" component={renderField} label="Nombre Evento"/>
              </div>
              <div className="custom-control custom-checkbox">
                <Field name="activo_evento" type="checkbox" component={renderField} label="Activo" />
              </div>
              <div className="col-md-8 center-button center">
               <button className="btn btn-info" >Guardar</button>
             </div> 
              <div className="content-spinner">
               <img src={spinner} className="imgSpinner" /> 
              </div>
              <div style={dataDimensionTypeEvent.length === 0 ? divStyle :  divStyle2}>
                <p className="font-weight-bold">Dimensiones:</p>
                <div className="col-md-12" >
                <ReactTable
                    data={dataDimensionTypeEvent}
                    columns={columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                  />
                </div>
              </div>
                <br/>
               <p className="font-weight-bold">Canales de Venta:</p>
               <div className="col-md-12" >
               <ReactTable
                  data={dataCanales}
                  columns={columnsCanales}
                  defaultPageSize={5}
                  className="-striped -highlight"
                />
              </div>     
          </form>
         </div>
        </div>
       </div>
         {/*start modal*/}
         <div className="modal fade" id="lugarModal" tabIndex="-1" role="dialog" aria-labelledby="lugarModalLabel" aria-hidden="true">
           <div className="modal-dialog" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title" id="ModalLabel" style={renderFormChannel ? divStyle : divStyle2 }>{renderForm ? headerTitle.tarifa : headerTitle.config}</h5>
                 <h5 className="modal-title" id="ModalLabel" style={renderFormChannel ? divStyle2 : divStyle}>{renderFormChannel ? headerTitle.canal : ''}</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                  </button>
                </div>
               
                 <div className="modal-body" style={renderFormChannel ? divStyle : divStyle2 }>
                  {renderForm  ? (<PrecioForm onSubmit={PrecioForma} /> ):(<InscripcionesForm onSubmit={configForm} />)}
                  <table className="table table-striped tbl-price">
                    <thead>
                      <tr>
                        <th>Precio</th>
                        <th>Activo</th>
                      </tr>
                    </thead>
                   <tbody>
                    {list.map(li =>
                     <tr key={li.id}>
                       <td> {li.valueSelect}</td>
                       <td> {li.activo}</td>
                     </tr>)}
                    </tbody>
                  </table>
                 
                </div>
               {/* <div className="modal-body" style={renderFormChannel ? divStyle2 : divStyle}>
                  {renderFormChannel ? (<Canales />) : ('') }
              </div> */}
             <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal"></button> */}
               <button type="button" className="btn btn-primary" data-dismiss="modal">Salir</button>
           </div>
          </div>
        </div>
       </div>
     </div>
    )
  }

  
};

FormEvent = reduxForm({
  form: 'FormEvent' // a unique name for this form
})(FormEvent);


export default FormEvent;
