
import './App.css';

import { Route, Routes } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import CreateAuthorPage from './views/CreateAuthorPage';
import UpdateAuthorPage from './views/UpdateAuthorPage';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/authors" element={<DashboardPage/>}/>
        <Route path="/authors/new" element={<CreateAuthorPage/>} />
        <Route path="/authors/:id/edit" element={<UpdateAuthorPage/>} />
      </Routes>
    </div>
  );
}

export default App;
