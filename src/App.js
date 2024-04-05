import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import ComponentLogin from './components/ComponentLogin';
import ComponentCategories from './components/ComponentCategories';
/* import ComponentLabels from './components/ComponentLabels'; */
import ComponentTasks from './components/ComponentTasks';
import ComponentKanvan from './components/ComponentKanvan';
import ComponentRegister from './components/ComponentRegister';
import ComponentLogins from './components/ComponentLogins';
import ComponentRegisters from './components/ComponentRegisters'


function App() {
  return (
    <BrowserRouter>
    <Routes>
  
    <Route path='/' element={<ComponentLogins></ComponentLogins>}></Route>
    <Route path='/register' element={<ComponentRegister></ComponentRegister>}></Route>
  {/*   <Route path='/registers' element={<ComponentRegisters></ComponentRegisters>}></Route> */}
    <Route path='/login' element={<ComponentLogin></ComponentLogin>}></Route>
  <Route path='/tasks' element={<ComponentTasks></ComponentTasks>}></Route>
{/*   <Route path='/labels' element={<ComponentLabels></ComponentLabels>}></Route> */}
  <Route path='/categories' element={<ComponentCategories></ComponentCategories>}></Route> 
  <Route path='/kanvan' element={<ComponentKanvan></ComponentKanvan>}></Route>

  </Routes>
  </BrowserRouter>
    );
  }
  
  export default App;