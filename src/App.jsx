import Headers from './component/Headers';
import Home from './component/Home';
import CartDetails from './component/CartDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import Success from './component/Success';
import Cancel from './component/Cancel';

function App() {
  return (
    <>
     <Headers />
     <Routes>
      <Route  path='/' element={<Home />}/>
      <Route  path='/cart' element={<CartDetails />}/>
      <Route  path='/success' element={<Success />}/>
      <Route  path='/cancel' element={<Cancel />}/>

     </Routes>
     <Toaster />
    </>
  );
}

export default App;