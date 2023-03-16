import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import LoginForm from './LoginForm.jsx'
import Table from './Table.jsx';


import './App.css';

function App() {
  const {isLogged} = useSelector(state => state.login);
  useEffect(() => { 
  }, [isLogged])
  return (
    <div className="App">
      <header className="App-header">
        {isLogged ? <Table/> : <LoginForm/>}
      </header>
    </div>
  );
}

export default App;
