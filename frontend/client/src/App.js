import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { checkAuth } from './features/user';

import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth());
  }, [])

  return (
    <div className='container dark'>
      <div className='app'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<NotesListPage />} />
            <Route path='/note/:id' element={<NotePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
