import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { getZefuByCategory} from "../actions/zefu";
import {getServices} from '../actions/services';
import { Page } from "../Page";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';


function mapStateToProps(state){
	return {
        zefus:state.zefus.zefus,
        services: state.services.services,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({getZefuByCategory,getServices}), dispatch);
}


class Listings extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        this.props.getZefuByCategory(this.props.params.categoryId);
        this.props.getServices(this.props.params.categoryId);
    }
    componentDidUpdate(prevProps,prevState,snapShot){
        
    }    
    onUsernameChange(e){
        this.setState({
        })
    }
    onPasswordChange(e){
        this.setState({
        })
    }
    onClickItem(value){
        this.props.router.push('/user/'  + value.Id);
    }
    render(){
        return(
            <Page>
                <Grid container>
                    <Grid xs={0} sm={2} item>
                    <List dense style={{paddingTop:'80px'}}>
                        {
                            this.props.services.map((value,index) => {
                                return(
                                    <ListItem 
                                        onClick={this.onClickItem.bind(this,value)}
                                        style={{height:'20px'}} key={index} button>
                                        <ListItemText primary={value.Name} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    </Grid>
                    <Grid xs={12} sm={10} item>
                        <List dense style={{paddingTop:'80px'}}>
                        {
                            this.props.zefus.map((value,index) => {
                                return(
                                    <ListItem 
                                        onClick={this.onClickItem.bind(this,value)}
                                        style={{height:'200px'}} key={index} button>
                                        <ListItemAvatar style={{height:'150px', width:'150px'}}>
                                            <Avatar src={'../avatars/' + value.Id + '.png'} alt={`Avatar n°${index + 1}`}  />
                                        </ListItemAvatar>
                                        <ListItemText primary={value.Name} />
                                    </ListItem>
                                )
                            })
                        }            
                        </List>                    
                    </Grid>


                </Grid>


            </Page>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Listings)