import { BrowserRouter, Routes ,Route} from 'react-router-dom';

import { NavigationBar } from './Component/Navigationbar.js';
import { Register } from "./Component/Registration.js";
import { Registers } from './Component/Registrations.js';
import { Home, Property } from './Component/Home.js';


function App() {
  return (
    <BrowserRouter>
         <NavigationBar />
        <Routes>
           <Route path='/' element={<Property />}></Route>
          <Route path='/register' element={<Register />} />
          <Route path='/signup' element={<Registers />} />
        
        </Routes>
      </BrowserRouter>
  );
}

export default App;
