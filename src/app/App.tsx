import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import '../css/App.css';
import '../css/navbar.css';
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





    {/* <div>
      <nav>
        <ul>
          <li>
            <Link to="/restaurant">Restaurant</Link>
          </li>
          <li>
            <Link to="/community">Community</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/member-page">Member Page</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
          <li>
            <Link to="/">HomePage</Link>
          </li>
        </ul>
      </nav> */}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
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
    {/* </div> */}
  </Router>
);
}


export default App;


function Home() {
  return <h2>Home</h2>;
}