import './App.css';
import Header from './components/Common/header';
import { useDispatch } from 'react-redux';
import { fetchAuthStatus } from './slices/authenticate';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchAuthStatus); }, [dispatch]);
  
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
