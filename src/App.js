import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Container from './components/Container';
import Navbar from './components/Navbar';
import { authSlice } from './redux-store/auth-slice';
import { decode, isAlive } from './utils/jwt-utils';

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth);



   const token = sessionStorage.getItem("token");

   if (!authStatus.isLoggedIn && token && isAlive(token)) {
     const userInfo = decode(token);
     dispatch(authSlice.actions.login({ userInfo, token }));
   }
 

  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Container />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
