import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Electronics from './pages/Electronics';
import Clothes from './pages/Clothes';
import Shoes from './pages/Shoes';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SignIn from './components/SignIn';
import AdminDashboard from './pages/AdminDashboard';
import './styles/app.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/electronics" component={Electronics} />
        <Route path="/clothes" component={Clothes} />
        <Route path="/shoes" component={Shoes} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/signin" component={SignIn} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </Router>
  );
};

export default App;