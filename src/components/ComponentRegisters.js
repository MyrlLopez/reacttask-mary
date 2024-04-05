import React,{ useState} from 'react';
import Axios  from 'axios';
import '../css/logins.css'
import {  useNavigate } from 'react-router-dom';
 import tareas from '../img/tareas.jpg';
 


const ComponentRegisters = () => {
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
      navigate('/tasks', { replace: true });
      
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
       <li ><a href="./" className="Cabecera-a">Home</a></li>   
       <li ><a href="./tasks" className="Cabecera-a">Tareas</a></li>  
       <li ><a href="./login" className="Cabecera-a">Categorias</a></li>
       <li ><a href="./labels" className="Cabecera-a">Etiquetas</a></li>    
       
       </ul>
            </nav>
            </div>  
            </div>
            
            <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-80">
      <div className="col-md-4 col-lg-3 col-xl-5">
      <img src= {tareas} alt="Logo"></img>    
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
         {/*  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>
            <button type="button" class="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div> */}

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Registro</p>
          </div>
          {/* <-- Registro input --> */}
          <div className="form-outline mb-4">
            <input type="text" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" onChange={(e) =>{
                setNombreUsuarioReg(e.target.value);
              }}/>
            <label className="form-label" for="form3Example3">Username</label>
          </div>

          {/* <-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" onChange = { (e) => {
                setCorreoUsuario (e.target.value);
              }}/>
            <label className="form-label" for="form3Example3">Email</label>
          </div>

         {/*  <-- Password input --> */}
          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password"    onChange = { (e) => {
                setPassword (e.target.value);
              }}  />
            <label className="form-label" for="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
           {/*  <-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button onClick={()=>register()} type="button" className="btn btn-primary btn-lg"
              >Register</button>
            {/* <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="./register"
                className="link-danger">Registrar</a></p> */}
          </div>
          {loginStatus && (
        <button onClick={userAuthenticeted}>Check if authenticated</button>
      )}
     
     {!loginStatus && (
        <div>{mensagge}</div>
      )}

    {loginStatus && (
        <button onClick={userLogOut}>Cerrar Sesión</button>
        )}

        </form>
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
  {/*   <-- Copyright --> */}
    <div className="text-white mb-3 mb-md-0">
    
    </div>
 

 
    <div>
      <a href="#!" class="text-white me-4">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>

  </div>
</section>   
   
    </div>
  )
}

export default ComponentRegisters