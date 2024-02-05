
import './App.css';
import { useEffect, useState } from "react";
import Header from './component/layout/Header/Header';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import WebFont from "webfontloader"
import React from "react"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from "axios";
import Payment from './component/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import ProductReviews from './component/Admin/ProductReviews';
import UpdateUser from './component/Admin/UpdateUser';



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }



  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })

    store.dispatch(loadUser());

    getStripeApiKey();
    },[]);
  
    
  return (
   
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
     
      <Routes>
     
      <Route exact path='/' Component={Home}/>
      <Route exact path='/product/:id' Component={ProductDetails}/>
      <Route exact path='/products' Component={Products}/>
      <Route path='/products/:keyword' Component={Products}/>
      <Route exact path='/search' Component={Search}/>

      <Route exact path='/account' Component={Profile}/>
      <Route exact path='/login' Component={LoginSignUp}/>
      
      <Route exact path='/me/update' Component={UpdateProfile} />

      <Route
          exact
          path="/password/update"
          Component={UpdatePassword}
        />

<Route
          exact
          path="/password/forgot"
          Component={ForgotPassword}
        />

<Route exact path="/password/reset/:token" Component={ResetPassword} />

<Route exact path="/Cart" Component={Cart} />

<Route exact path="/shipping" Component={Shipping} />





{stripeApiKey && (
          <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
        )}

<Route exact path="/success" Component={OrderSuccess} />

<Route exact path="/orders" Component={MyOrders} />

<Route exact path="/order/confirm" Component={ConfirmOrder} />

<Route exact path="/order/:id" Component={OrderDetails} />

<Route exact path="/admin/dashboard" Component={Dashboard} />

<Route
          exact
          path="/admin/products"
         
          Component={ProductList}
        />

<Route
          exact
          path="/admin/product"
        
          Component={NewProduct}
        />

<Route
          exact
          path="/admin/product/:id"
         
          Component={UpdateProduct}
        />

      

      <Route
          exact
          path="/admin/orders"
         
          Component={OrderList}
        />

<Route
          exact
          path="/admin/order/:id"
        
          Component={ProcessOrder}
        />

<Route
          exact
          path="/admin/users"
        
          Component={UsersList}
        />

<Route
          exact
          path="/admin/user/:id"
         
          Component={UpdateUser}
        />

<Route
          exact
          path="/admin/reviews"
         
          Component={ProductReviews}
        />
        </Routes>
      <Footer/>
    </Router>
   )
  
}

export default App;
