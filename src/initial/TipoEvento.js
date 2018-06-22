import React, {Component}  from 'react';
//import axios from 'axios';
import TypeFormEvent from './TipoEventoForm';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import URL from '../config/Config.js';


class TipoEvento extends Component {

    constructor(props){
        super(props);
        this.state = {
            events:[],
            list:[]
        }
     }
   
    getData(){
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
                console.log(data)
            })
            .catch(function(error){
                console.log('Error',error);
            })
     }

    componentDidMount(){
       //this.getData();
    }

    render(){

     const {name, id} = this.state;

     let divStyle = {
         display:'none'
     }

     let divStyle2 = {
         display:'block'
     }

     const functionForma = (datos) => {
       
       const main = this; 
       let url =  URL + 'eventtypes/';  
       let buildTable = JSON.stringify({
             name: datos.nombre_evento,
             runnerNumberRequired: datos.numero_participante != true ? false : datos.numero_participante,
             state:datos.activo != true ? false : datos.activo,
             dimensionEventType:[{
                dimesion:datos.nombre_modalidad,
                state:datos.activo_modalidad != true ? false : datos.activo_modalidad
             }]
          });

          fetch(url, {
                method:'POST',
                headers: {
                    'Authorization': 'Basic YWxlam86MTIz',
                    'Content-Type': 'application/json'
                },
                body: buildTable
            })
            .then((resp) => {
               if(resp.status === 201) alert('El evento registrado'); 
               if(resp.status === 409) alert('El evento ya se encuentra registrado'); 
              return resp.json();
            })
            .then(data => {
              console.log(data);
              let x = Math.random();
              let valorx = {
                id:x,
                name:'value'
            }
             this.setState((prevState) =>{
                return {
                   list:prevState.list.concat(valorx)
                }
            });

            console.log(this.state.list);

             main.setState({
                 id:data.id,
                 name:data.name
              });
            })
            .catch(function(error){
              console.log('Error',error);
            })
       }

       const RenderTable = () =>{
        
           const dataEvento = [{
               id:id,
               modalidad:name,
               edit: name == null ? '' : <a className="btn btn-secondary" datatype={id}>Editar</a>
           }];

           const columnsEvents = [{
               Header: 'Modalidad',
               accessor:'modalidad',
               Cell: props => <span>{props.value}</span>
           },
          {
              Header: 'Editar',
              accessor:'edit',
              Cell: props => <span>{props.value}</span>
          }];

           //console.log(name);

           return(  
              <div className="container">
               <div className="row">
               <div className="col-md-8 center" style={name == null ? divStyle : divStyle2 }>
                <ReactTable
                    data={dataEvento}
                    columns={columnsEvents}
                    defaultPageSize={5}
                    className="-striped -highlight" />
               </div>
             </div>
           </div>
           );
       }

        return(
            <div className="container">
              <div className="row">
                 <TypeFormEvent onSubmit={functionForma} />
                 <div className="col-md-8 center">
                    <RenderTable />
                 </div>
              </div>
            </div>
        )
    }
}

// const TipoEvento = (props) =>{
//     const functionForma = (datos) =>{
       
//         //console.log(datos.nombre_evento); 
//         let url = 'http://192.168.1.174:8080/dmierp/api/eventtypes/';

//         fetch(url,{
//             method:'GET',
//             headers: {
//                 'Authorization': 'Basic YWxlam86MTIz',
//                 'Content-Type':'application/json'
//             }
//         })
//         .then((resp) => resp.json())
//         .then(function(data){
//             let dataEvents = data;
//             dataEvents.forEach(element => {
//                 //console.log(element.name);
//                 statusX = element.name;
//             });
//             console.log(dataEvents);
//         })
//         .catch(function(error){
//             console.log('Error',error);
//         })

//        }

//     return (
//         <div className="container">
//          <div className="row">
//          <TypeFormEvent onSubmit={functionForma} />
//            <div className="col-md-8">
//               {statusX} <Table />
//            </div>
//         </div>
//        </div>
//     )
      
   
// }

export default TipoEvento;