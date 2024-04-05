import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Home.css';
/* import logo from '../img/logo.png'; */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ComponentCategories = () => {

    const url='http://localhost:3300/categories';
    const [categorias,setCategorias]= useState([]);
    const [id_categorias,setIdCategorias]= useState('');
    const [categoria,setCategoria]= useState('');
    const [etiquetas,setEtiquetas]= useState('');
    const [operation,setOperation]= useState(1);
    const [title,setTitle]= useState('');

    

    useEffect( ()=>{
        getCategorias();
    },[]);
    const getCategorias = async () => {
        const respuesta = await axios.get(url);
        setCategorias(respuesta.data);
        console.log(respuesta.data);
    }

    const openModal = (op, id_categorias,categoria, etiquetas) =>{
   
        setIdCategorias('');
        setCategoria('');
        setEtiquetas('');
        setOperation(op);
        if(op === 1){
          setTitle('Crear Categorias');
      } else if(op === 2){
        setTitle('Editar Categorias')
        setIdCategorias(id_categorias);      
        setCategoria(categoria);
        setEtiquetas(etiquetas);
        
        ; }
     }

     const deleteCategoria= (id) =>{
 
        if (window.confirm("¿Desea borrar esta categoria?")) {
            setIdCategorias(id);
                console.log(id);
                enviarSolicitud('DELETE',{id:id});
          }}

          const validar = () => {
            var parametros;
            var metodo;
            if(operation === 1){
              parametros= {id_categorias:id_categorias, categoria:categoria.trim(), etiquetas:etiquetas.trim()};
              metodo= 'POST';
          } 
          else if(operation === 2){
              parametros= {id_categorias:id_categorias, categoria: categoria.trim(), etiquetas:etiquetas.trim()};
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
                    getCategorias();
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
{/* <div class="logo" id="logo">
            <img src= {logo} alt="Logo"></img>
</div> */}
<div class="menu-barra" id="menuBarra">
            <i class="fas fa-angle-right" id="btnMenuClose"></i>
            <nav class="enlaces" id="enlaces">
            <ul>
       <li ><a href="./" className="Cabecera-a">Login</a></li> 
       <li ><a href="./register" className="Cabecera-a">Login</a></li>  
       <li ><a href="./tasks" className="Cabecera-a">Tareas</a></li>  
    
   
       </ul>
            </nav>
            </div>  
            </div>
        <Button startIcon={<AddCircleIcon />} variant="contained" onClick={()=> openModal(1)} data-bs-toggle='modal' data-bs-target='#modalCategorias'>Crear Categorias</Button>
        <br></br>
        <br></br>
    
        <div class="modal" tabindex="-1" id='modalCategorias'>
        <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='id_categorias' className='form-control' placeholder='Id_categorias' value={id_categorias}
                                onChange={(e)=> setIdCategorias(e.target.value)}></input>
                            </div>
                                    
          <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='categoria' className='form-control' placeholder='Categoria' value={categoria}
                                onChange={(e)=> setCategoria(e.target.value)}></input>
                            </div>
                          
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='etiquetas' className='form-control' placeholder='etiquetas' value={etiquetas}
                                onChange={(e)=> setEtiquetas(e.target.value)}></input>
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
                <th scope="col">Categoria</th>
                <th scope="col">etiquetas</th>
                <th scope="col">Opciones</th>                
            </tr>
        </thead>
        <tbody>
           {categorias.map( (categoria, i)=>(
                                    <tr scope="row" key={categoria.id_categoria}>
                                        <td>{categoria.id_categorias}</td>
                                        <td>{categoria.categoria}</td> 
                                        <td>{categoria.etiquetas}</td>        
                                        <td><Button color="warning" variant="contained" onClick={()=>openModal(2, categoria.id_categorias, categoria.categoria, categoria.id_tareas, categoria.etiquetas)} data-bs-toggle='modal' data-bs-target='#modalCategorias'><UpdateIcon fontSize="small" /></Button>
                                         &nbsp;<Button color="error" variant="contained" onClick={()=>deleteCategoria(categoria.id_categorias)}><DeleteIcon fontSize="small" /></Button> </td>        
                                    </tr>
                                ))

                                }
        
    </tbody>
        
    </table></div>

)
           
}




export default ComponentCategories;