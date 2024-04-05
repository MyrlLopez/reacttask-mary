import React,{ useState, useEffect} from 'react';
import Axios  from 'axios';
import {  useNavigate } from 'react-router-dom';
 


const ComponentLogin = () => {
    const [correo_usuarioReg, setCorreoUsuarioReg] = useState("");
    const [passwordReg, setPasswordReg] = useState ("");
    const [nombre_usuarioReg, setNombreUsuarioReg] = useState ("");
    const [correo_usuario,setCorreoUsuario]= useState('');
    const [nombre_usuario,setNombreUsuario]= useState('');
    const [password,setPassword]= useState('');  
    const [mensagge, setMensagge] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    
     
    

    const navigate = useNavigate();
 


    Axios.defaults.withCredentials = true;
  const register = () => {
    Axios.post("http://localhost:3300/register", {
      nombre_usuario: nombre_usuarioReg,  
      correo_usuario: correo_usuarioReg,
      password: passwordReg      
    }).then((response) => {

      console.log(response);
    });
  };

  const login = () => {
    console.log('esta');
   /*  var parametros= {correo_usuario:correo_usuario.trim(),password: password.trim()}
    await Axios({ method:'POST', url: 'http://localhost:3300/login', data:parametros}).then(function(response){  
     console.log(response);
    if (!response.data.auth) {
        setLoginStatus( false);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token)
        setLoginStatus (true);
      }      
  }); */
    Axios.post("http://localhost:3300/login", {
      correo_usuario: correo_usuario,
      password: password,
    }).then((response) => {
      console.log(response);
      if (!response.data.auth) {
        setLoginStatus( false);
        setMensagge(response.data.message)
        console.log(mensagge);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token)
        setLoginStatus (true);
        navigate('/tasks', { replace: true });
      }
    });
  }  ;

  const userAuthenticeted = () => {
    Axios.get("http://localhost:3300/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const userLogOut = () => {
  localStorage.clear(); 
  setLoginStatus( false);
  }
  return (
    <div className='App'>
           <div className="menu-principal">
{/* <div class="logo" id="logo">
            <img src= {logo} alt="Logo"></img>
</div> */}
<div class="menu-barra" id="menuBarra">
            <i class="fas fa-angle-right" id="btnMenuClose"></i>
            <nav class="enlaces" id="enlaces">
            <ul>
       <li ><a href="./logins" className="Cabecera-a">logins</a></li>   
       <li ><a href="./tasks" className="Cabecera-a">Tareas</a></li>  
       <li ><a href="./categories" className="Cabecera-a">Categorias</a></li>
       <li ><a href="./labels" className="Cabecera-a">Etiquetas</a></li>    
       
       </ul>
            </nav>
            </div>  
            </div>
        <div className="registration">
        <h1>Registro</h1>

        <label>Usename</label>
        <input 
          type="text"
          onChange={(e) =>{
            setNombreUsuarioReg(e.target.value);
          }} 
          />
        <br/>
        <br/>

        <label>Correo</label>
        <input 
          type="text" 
          onChange={(e) => {
            setCorreoUsuarioReg(e.target.value);
          }} 
        />
        <br/>
        <br/>

        <label>Password</label>
        <input 
          type="text"
          onChange={(e) =>{
            setPasswordReg(e.target.value);
          }} 
        /> 
        <br/>
        <br/>

    
        <button onClick={()=>register()}> Registrar</button>
      </div>
     {/*  <div className="login">
        <h1>Login</h1>
        <input 
          type="text" 
          placeholder="Correo Usuario..." 
          onChange = { (e) => {
            setCorreoUsuario (e.target.value);
          }}
        />
         <br/>
         <br/>
        <input 
          type="password" 
          placeholder="Password..."
          onChange = { (e) => {
            setPassword (e.target.value);
          }}
        />
         <br/>
         <br/>
        <button onClick={()=>login()}>Login</button>
      </div>

      {loginStatus && (
        <button onClick={userAuthenticeted}>Check if authenticated</button>
      )}
     
     {!loginStatus && (
        <div>{mensagge}</div>
      )}

    {loginStatus && (
        <button onClick={userLogOut}>Cerrar Sesión</button>
        )} */}
      
    </div>
  )
}

export default ComponentLogin