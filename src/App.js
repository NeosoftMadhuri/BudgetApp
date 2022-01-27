import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';

import {BrowserRouter as Router,Routes,Link,Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import Register from './Components/Register';
import First from './Components/First';
import PageNoteFound from './Components/PageNoteFound';
function App() {
  return (
    <>
   {/* <Trial/> */}
     <Router>
       
       <Routes>
         
         <Route path="/login" exact element={<Login/>}/>
         <Route path="/" exact element={<First/>}/>
         <Route path="/dashboard" exact element={<Dashboard/>}/>
         <Route path="/register" exact element={<Register/>}/>
         <Route path="/*" exact element={<PageNoteFound/>}/>
       </Routes>
     </Router>
    </>
  );
}

export default App;
