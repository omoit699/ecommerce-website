import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import Cart from './components/Cart';

const App = () => {
    return (
        <Router>
            <Header />
            <Cart />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/product/:id" component={Product} />
                <Route path="/checkout" component={Checkout} />
            </Switch>
        </Router>
    );
};

export default App;