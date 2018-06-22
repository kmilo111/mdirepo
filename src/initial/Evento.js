import React, {Component}  from 'react';
//import axios from 'axios';
import FormEvent  from './EventosForm.js';
import URL from '../config/Config.js';

class Evento extends Component{
    
     render(){
               
        let localgetItem = localStorage.getItem('fechaEvento');
        let url = URL + 'event/'
        const functionForma = (datos) =>{

        //let maxCapacity =  localStorage.getItem('maxCapacity');
        let dimension = localStorage.getItem('dimension');
                    
        let sendEvent = JSON.stringify({
            id: datos.event_id,
            idEventType:datos.tipo_evento,
            idGroupEvent:datos.grupo_evento,
            idPeriodo:datos.periodo_evento,
            idCity:datos.ciudad_evento,
            name:datos.nombre_modalidad,
            state:datos.activo_evento,
            eventDate: localgetItem,
            dimensionEvents:
              [{
                 idEventType:datos.tipo_evento,
                 name:dimension,
                 maxCapacity:0,
                 idEvent:null,
                 state:1
               }]
         });
                       
           fetch(url, {
                method:'POST',
                headers: {
                    'Authorization': 'Basic YWxlam86MTIz',
                    'Content-Type': 'application/json'
                },
                body: sendEvent
            })
            .then((resp) =>{
                if((resp.status === 409)) alert('El evento ya encuentra registrado'); 
                if((resp.status === 201)) alert('Evento registrado'); 
                return resp.json();
            })
            .then(data =>{
                console.log(data);
                localStorage.setItem('dataEvent', JSON.stringify(data));
            })
            .catch(function(error){
                console.log('Error',error);
            })
       }
        
       return(
            <div className="container">
             <FormEvent onSubmit={functionForma} />
            </div>
         )
     }
}

// const Evento = (props) =>{
//     const functionForma = (datos) =>{
//         alert(datos);
//     }  
//     return (
//         <div>
//             <FormEvent onSubmit={functionForma} />
//         </div>
//     )
// }

export default Evento;