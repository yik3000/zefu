import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import {About} from './Page.js';
import Login from './containers/login';
import Profile from './containers/profile';
import Register from './containers/register';
import ServiceManager from "./containers/servicesManager";
import Settings from './containers/settings';
import Listings from './containers/listings';
import Zefu from './containers/zefu';
import CodeQuery from "./containers/codeQuery";
import Home from "./containers/home";
class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/user/:userId" component={Zefu}/>
        <Route path="/listings/:categoryId" component={Listings}/>
        <Route path="/about" component={About}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/profile" component={Profile}/>        
        <Route path="/loginPage" component={Login}/>        
        <Route path="/register" component={Register}/>       
        <Route path="/addservice" component={ServiceManager}/> 
        <Route path="/code" component={CodeQuery}/> 
      </Router>
    );
  }
}

export default App;
