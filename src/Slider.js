
import React, {Component} from 'react';
import logo from './logo.svg';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';



class Slider extends Component{
    static propTypes = {
        open:PropTypes.bool,
        onToggle:PropTypes.func,
    }
    static defaultProps = {
        open:false
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    toggleDrawer = (open) => () => {
        this.props.onToggle(open);
    };
    

    sideList = (
            <div>
              <List>
                {[{name:'Home',path:'/'},{name:'Me',path:'/profile'}].map((item, index) => (
                  <ListItem button key={item.name} component={Link} to={item.path}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {[{name:'Settings',path:'/settings'}].map((item, index) => (
                  <ListItem button key={item.name} component={Link} to={item.path}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </div>
          );    
    render(){
        return(
            <SwipeableDrawer
            open={this.props.open}
            onClose={this.toggleDrawer(false)}
            onOpen={this.toggleDrawer(true)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}>
                {this.sideList}
                </div>
          </SwipeableDrawer>
        )
    }
}

export default Slider