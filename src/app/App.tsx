import React, { useEffect, useState } from 'react';
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
import { Member } from '../types/user';
import { serverApi } from '../lib/config';
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from '../lib/sweetAlert';
import { Definer } from '../lib/Definer';
import MemberApiService from './apiService/memberApiService';


function App() {
  //** INITIZALIZATIONS**/
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(null);
  const [path, setpath] = useState();
  const main_path = window.location.pathname;
  
  const [signUpOpen, setSignUpOpen] = useState(false); 
  const [loginOpen, setLoginOpen] = useState(false);

//** Logout Initializations**/
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const handleLogoutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
}
const handleCloseLogout = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
}
  

useEffect(() => {
     console.log("===UseEffect: APP====");
     const memberDataJson: any = localStorage.getItem("member_data") 
     ? localStorage.getItem ("member_data") 
     : null;
     const member_data = memberDataJson 
     ? JSON.parse(memberDataJson) 
     : null; 
     if (member_data) {
      member_data.mb_image = member_data.mb_image 
      ? `${serverApi}/${member_data.mb_image}` 
      : "/auth/default_user.svg";
      setVerifiedMemberData(member_data);
     }
  },[signUpOpen, loginOpen, handleLogoutClick]);

  
  //** HANDLERS**/
  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };
  const handleLoginOpen = () => {
    setLoginOpen(true);
  };
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

const handleLogOutRequest = async() => {
  try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true)
  } catch (err:any){
   console.log(err);
   sweetFailureProvider(Definer.general_err1);
  }
}

  return (
    <Router>
    {main_path =="/" ? (
      <NavbarHome 
      setpath={setpath}
      handleSignUpOpen={handleSignUpOpen}
      handleLoginOpen={handleLoginOpen}
      verifiedMemberData={verifiedMemberData}
      anchorEl={anchorEl}
      open={open}
      handleLogoutClick={handleLogoutClick}
      handleCloseLogout={handleCloseLogout}
      handleLogOutRequest={handleLogOutRequest}
       />
    ) : main_path.includes("/restaurant") ? (
      <NavbarRestaurant 
      setpath={setpath}
      handleSignUpOpen={handleSignUpOpen}
      handleLoginOpen={handleLoginOpen}
      verifiedMemberData={verifiedMemberData}
      anchorEl={anchorEl}
      open={open}
      handleLogoutClick={handleLogoutClick}
      handleCloseLogout={handleCloseLogout}
      handleLogOutRequest={handleLogOutRequest}


      />
    ) : (<NavbarOthers 
      setpath={setpath}
      handleSignUpOpen={handleSignUpOpen}
      handleLoginOpen={handleLoginOpen}
      verifiedMemberData={verifiedMemberData}
      anchorEl={anchorEl}
      open={open}
      handleLogoutClick={handleLogoutClick}
      handleCloseLogout={handleCloseLogout}
      handleLogOutRequest={handleLogOutRequest}


      />
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
      <AuthenticationModal
     
      signUpOpen={signUpOpen}
      handleSignUpOpen={handleSignUpOpen}
      handleSignUpClose={handleSignUpClose}
     
      loginOpen={loginOpen}
      handleLoginOpen={handleLoginOpen}
      handleLoginClose={handleLoginClose}
      />
  </Router>
);
}

 export default App;