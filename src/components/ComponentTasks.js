import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpdateIcon from '@mui/icons-material/Update'; 
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete'; 
/* import logo from '../img/logo.png'; */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import swal from 'sweetalert'; */




const ComponentTasks = () => {
    
    const url='http://localhost:3300/tasks';
    const [tasks,setTasks]= useState([]);
    const [id_tareas,setIdTareas]= useState('');
    const [tarea,setTarea]= useState('');
    const [descripcion,setDescripcion]= useState('');
    const [fecha_vencimiento,setFechaVencimiento]= useState('');
    const [prioridad,setPrioridad]= useState('');
    const [estado,setEstado]= useState(''); 
    const [operation,setOperation]= useState(1);
    const [title,setTitle]= useState('');

    useEffect( ()=>{
        getTasks ();
    },[]);
    const getTasks  = async () => {
        const respuesta = await axios.get(url);
        setTasks(respuesta.data);
        console.log(respuesta.data);
    }

    const openModal = (op, id_tareas, tarea, descripcion, fecha_vencimiento, prioridad, estado) =>{
   
        setIdTareas('');
        setTarea('');
        setDescripcion('');
        setFechaVencimiento(''); 
        setPrioridad('');
        setEstado('');
        setOperation(op);
        if(op === 1){
          setTitle('Crear Tarea');
      } else if(op === 2){
        setTitle('Editar Tarea')
        setIdTareas(id_tareas);
        setTarea(tarea);
        setDescripcion(descripcion);
        setFechaVencimiento(fecha_vencimiento); 
        setPrioridad(prioridad);
        setEstado(estado);
        
        ; }
     }

     const deletetasks= (id) =>{
 
        if (window.confirm("¿Desea borrar esta tarea?")) {
            setIdTareas(id);
                console.log(id);
                enviarSolicitud('DELETE',{id:id});
          }}

          const validar = () => {
            var parametros;
            var metodo;
            if(operation === 1){
              parametros= {id_tareas:id_tareas, tarea:tarea.trim(), descripcion:descripcion.trim(), fecha_vencimiento:fecha_vencimiento.trim(), prioridad: prioridad, estado: estado.trim()};
              metodo= 'POST';
          } 
          else if(operation === 2){
              parametros= {id_tareas:id_tareas, tarea:tarea.trim(), descripcion:descripcion.trim(), fecha_vencimiento:fecha_vencimiento.trim(), prioridad: prioridad, estado: estado.trim()};
              metodo= 'PUT';
          }
          enviarSolicitud(metodo,parametros);}
      
          const enviarSolicitud = async(metodo,parametros) => {
            await axios({ method:metodo, url: url, data:parametros}).then(function(respuesta){
                var tipo = respuesta.data[0];
                var msj = respuesta.data[1];
                //show_alerta(msj,tipo);
                if(tipo === 'success'){
                    document.getElementById('btnCerrar').click();
                    getTasks ();
                }
            })
            .catch(function(error){
               //show_alerta('Error en la solicitud','error'); 
                console.log(error)
            });
        }

        return (
    <div className='App'> 

    <ToastContainer />
    <div className="menu-principal">
<div class="logo" id="logo">
       {/*  <img src= {logo} alt="Logo"></img> */}
</div>
<div class="menu-barra" id="menuBarra">
        <i class="fas fa-angle-right" id="btnMenuClose"></i>
        <nav class="enlaces" id="enlaces">
        <ul>
   <li ><a href="./" className="Cabecera-a">Login</a></li> 
   <li ><a href="./categories" className="Cabecera-a">Categorias</a></li>  
  {/*  <li ><a href="./tasks" className="Cabecera-a">Tareas</a></li>  */}
   </ul>
        </nav>
        </div>  
        </div>
    <Button startIcon={<AddCircleIcon />} variant="contained" onClick={()=> openModal(1)} data-bs-toggle='modal' data-bs-target='#modaltasks'>Crear tareas</Button>
    <br></br>
    <br></br>

    <div class="modal" tabindex="-1" id='modaltasks'>
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='id_tareas' className='form-control' placeholder='Id_tareas' value={id_tareas}
                            onChange={(e)=> setIdTareas(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='tarea' className='form-control' placeholder='tareas' value={tarea}
                            onChange={(e)=> setTarea(e.target.value)}></input>
                        </div>         
      <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>

                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='fecha_vencimiento' className='form-control' placeholder='fecha_vencimiento' value={fecha_vencimiento}
                            onChange={(e)=> setFechaVencimiento(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='prioridad' className='form-control' placeholder='Prioridad' value={prioridad}
                            onChange={(e)=> setPrioridad(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='estado' className='form-control' placeholder='Estado' value={estado}
                            onChange={(e)=> setEstado(e.target.value)}></input>
                        </div>

                        
      </div> 
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnCerrar" >Close</button>
        <button onClick={() => validar()} className='btn btn-success'>
                   <i className='fa-solid fa-floppy-disk'></i> Guardar
        </button>
      </div>
    </div>
  </div>
</div>

    <table class="table">
    <thead class="thead-light">
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Tareas</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha Vencimiento</th>
            <th scope="col">Prioridad</th>
            <th scope="col">Estado</th>
            <th scope="col">Opciones</th>                
        </tr>
    </thead>
    <tbody>
       {tasks.map( (task, i)=>(
                                <tr scope="row" key={task.id_tareas}>
                                    <td>{task.id_tareas}</td>
                                    <td>{task.tarea}</td>         
                                    <td>{task.descripcion}</td>  
                                    <td>{task.fecha_vencimiento}</td>    
                                    <td>{task.prioridad}</td>   
                                    <td>{task.estado}</td>  
                                    <td><Button color="warning" variant="contained" onClick={()=>openModal(2, task.id_tareas, task.tarea, task.descripcion, dayjs(task.fecha_vencimiento).format("YYYY-MM-DD"), task.prioridad, task.estado)} data-bs-toggle='modal' data-bs-target='#modaltasks'><UpdateIcon fontSize="small" /></Button>
                                     &nbsp;<Button color="error" variant="contained" onClick={()=>deletetasks(task.id_tareas)}><DeleteIcon fontSize="small" /></Button> </td>        
                                </tr>
                            ))

                            }
    
</tbody>
    
</table></div>

    
  );
}

export default ComponentTasks
