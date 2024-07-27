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
import { Footer } from './components/footer'
import AuthenticationModal from './components/auth';
import { Member } from '../types/user';
import { serverApi } from '../lib/config';
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from '../lib/sweetAlert';
import { Definer } from '../lib/Definer';
import MemberApiService from './apiService/memberApiService';
import "../app/apiService/verify";
import { CartItem } from '../types/others';
import { Product } from '../types/product';


function App() {
  //** INITIZALIZATIONS**/
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(null);
  const [path, setpath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false); 
  const [loginOpen, setLoginOpen] = useState(false);
  const [orderRebuild, setorderRebuild] = useState<Date>(new Date());

  //** Basket**/
  const cartJson: any = localStorage.getItem("cart_data");
  const currentCart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems,setCartItems] = useState<CartItem[]>(currentCart);

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
  },[signUpOpen, loginOpen]);

  
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

  const onAdd = (product:Product) => {  
    const exist: any = cartItems.find((item:CartItem) => 
    item._id === product._id);
    if(exist) {
      const cart_updated = cartItems.map((item: CartItem) => 
        item._id === product._id 
        ? {...exist,quantity: exist.quantity + 1 } 
        : item 
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }else { 
    const new_item: CartItem = {
      _id: product._id,
      quantity: 1,
      name: product.product_name,
      price: product.product_price,
      image: product.product_images[0],
    };
    const cart_updated = [...cartItems,{...new_item }];
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };

  const onRemove = (data:CartItem) => { 
    const item_data : any = cartItems.find(
      (ele:CartItem) => ele._id === data._id
    );
    if(item_data.quantity === 1) {
       const cart_updated = cartItems.filter((ele:CartItem) => 
       ele._id !== data._id);
       setCartItems(cart_updated);
       localStorage.setItem("cart_data", JSON.stringify(cart_updated)); 
       
    } else {
     const cart_updated = cartItems.map((item:CartItem) => 
     item._id === data._id 
     ? {...item_data, quantity: item_data.quantity -1}
     : item
     );
     setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated)); 
    }
   };

  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele:CartItem) => ele._id !== item._id);
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated)); 
    
   }
  const onDeleteAll = () => { 
    setCartItems([]);
    localStorage.removeItem("cart_data");
   };

const handleLogOutRequest = async(): Promise<void> => {
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
      cartItems={cartItems}
      onAdd={onAdd}
      onRemove={onRemove}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
      setorderRebuild={setorderRebuild}

      
       />
    ) : main_path.includes("/dealers") ? (
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
      cartItems={cartItems}
      onAdd={onAdd}
      onRemove={onRemove}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
      setorderRebuild={setorderRebuild}


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
      cartItems={cartItems}
      onAdd={onAdd}
      onRemove={onRemove}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
      setorderRebuild={setorderRebuild}


      />
    )}

      <Switch>
        <Route path="/dealer">
          <RestaurantPage onAdd={onAdd}/>
        </Route>
        <Route path="/community">
          <CommunityPage/>
        </Route>
        <Route path="/orders">
          <OrdersPage 
          orderRebuild={orderRebuild}
          setorderRebuild={setorderRebuild}
          verifiedMemberData={verifiedMemberData}
          />
        </Route>
        <Route path="/member-page">
          <MembersPage/>
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