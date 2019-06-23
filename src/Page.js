
import React, {Component} from 'react';
import logo from './logo.svg';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import Slider from './Slider';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Grid from '@material-ui/core/Grid';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const stickToBottom = {
        width: '100%',
        position: 'fixed',
        bottom: 0,
}
const pageStyle = {
  
}

class Page extends Component{    
    static propTypes = {
        title: PropTypes.string,
        children: PropTypes.node,
        appBarContent: PropTypes.object,
        width:PropTypes.string,
        appBarPadding: PropTypes.bool,
    }
    static defaultProps ={
      width:'100%',
      title:"Zefu",
      appBarPadding: true,
    }
    constructor(props){
      super(props);
      this.state = {
        menuOpen:false
      }
  }
    containerStyle = function(options){
      return{
        paddingTop: this.props.appBarPadding == true ? '70px' : '0px',
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        width: this.props.width,
        marignTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }
    }

    grow = function() {
       return{
         flexGrow: '1',
      }
    }
    componentDidMount(){
      if(isMobile){
        console.log('this is mobile')
      }
      else{
        console.log('not mobile')
      }
    }

    openMenu(){
      this.setState({menuOpen:true})
    }
    render(){
        return (
          <div>
           <BrowserView>
              <Slider open={this.state.menuOpen} onToggle={x=> (this.setState({menuOpen:x}))} />
              <AppBar style={{color:'',                
                              backgroundColor: 'rgb(1, 1, 1)',
                              /* RGBa with 0.6 opacity */
                              backgroundColor: 'rgba(1, 1, 1, 0.5)',
                              /* For IE 5.5 - 7*/
                              filter:'progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)',
                              /* For IE 8*/
                              msFilter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)',
                              boxShadow: 'none'}} position="absolute">
              <Toolbar>
                <IconButton onClick={this.openMenu.bind(this)} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography style={{opacity:'1'}} variant="h5" color="inherit">
                  {this.props.title}
                </Typography>
                <div style={this.grow()}></div>
                {this.props.appBarContent}
              </Toolbar>
              </AppBar>
            </BrowserView>

              <div style={this.containerStyle()}>
              {this.props.children}
              </div>

        <MobileView>
            <BottomNavigation
            style={stickToBottom}
            variant="fullWidth">
            <BottomNavigationAction icon={<PhoneIcon />} label="Contact" component={Link} to='/' />
            <BottomNavigationAction icon={<FavoriteIcon />} label="Favorite" />
            <BottomNavigationAction icon={<PersonPinIcon />} label="Nearby" component={Link} to='/profile' />
          </BottomNavigation>

        </MobileView>
        

            </div>


        )
    }
}

  const About = (props) => (
    <Page title="About"/>
  );
  
  export {About, Page}