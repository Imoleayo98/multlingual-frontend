import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useState } from 'react';
import Login from '../src/user/login'
import Report from '../src/user/report'
import Reported from '../src/user/reported'
import Single from '../src/user/single'
import AdminLogin from '../src/admin/login'
import AdminReported from '../src/admin/incidents'
import AdminSingle from '../src/admin/singleincident'
import NotFound from './NotFound';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div className="App p-5 h-full" style={{background:"#C3EBF5",height:'1000px'}}>
        <Routes>
          <Route path='/' element={< Login />}></Route>
          <Route path='user/' element={< Login />}></Route>
          <Route path='/user/report' element={< Report />}></Route>
          <Route path='/user/reported' element={< Reported />}></Route>
          <Route path='/user/single' element={< Single />}></Route>

          <Route path='/admin' element={< AdminLogin />}></Route>
          <Route path='/admin/reported' element={< AdminReported />}></Route>
          <Route path='/admin/single' element={< AdminSingle />}></Route>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
