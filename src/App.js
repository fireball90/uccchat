
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router,Route, Routes, Outlet} from 'react-router-dom';
import Admin from '../src/pages/admin/Admin';
import Chat from '../src/pages/chat/Chat';

function App() {
  return (
    <div>     
      <Router>
          <Navbar></Navbar>        
            <Routes>
                <Route index element={<Chat />} />
                <Route path="admin" element={<Admin />} />
            </Routes>
      </Router>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
