import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import '../css/App.css';
import '../css/navbar.css';
import '../css/footer.css';
import { RippleBadge } from './MaterialTheme/styled';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { RestaurantPage } from './screens/RestaurantPage';
import { CommunityPage } from './screens/CommunityPage';
import { OrdersPage } from './screens/OrdersPage';
import { MembersPage } from './screens/MemberPage';
import { HelpPage } from './screens/HelpPage';
import { LoginPage } from './screens/LoginPage';
import { HomePage } from './screens/Homepage';
import { NavbarHome } from './components/header';
import { NavbarRestaurant } from './components/header/restaurant';
import { NavbarOthers } from './components/header/others';
import { Footer } from './components/footer';
import AuthenticationModal from './components/auth';


function App() {
  const [path, setpath] = useState();
  const main_path = window.location.pathname;
  return (
    <Router>
    {main_path =="/" ? (
      <NavbarHome setpath={setpath}/>
    ) : main_path.includes("/restaurant") ? (
      <NavbarRestaurant setpath={setpath}/>
    ) : (<NavbarOthers setpath={setpath}/>
    )}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage/>
        </Route>
        <Route path="/community">
          <CommunityPage/>
        </Route>
        <Route path="/orders">
          <OrdersPage/>
        </Route>
        <Route path="/member-page">
          <MembersPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
           <Route path="/"> 
          <HomePage />
      
          
        </Route>
      </Switch>
      <Footer/>
      <AuthenticationModal/>
  </Router>
);
}

 export default App;