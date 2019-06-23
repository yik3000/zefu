import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { getMe,clear } from "../actions/account";
import { Page } from "../Page";
import Button from '@material-ui/core/Button';

import { Link } from 'react-router';
import { CssBaseline, Toolbar, Typography, Paper, Grid } from '@material-ui/core';


function mapStateToProps(state){
	return {
        account:state.account
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({getMe,clear}), dispatch);
}


class Profile extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        this.props.getMe();
    }
    componentDidUpdate(prevProps,prevState,snapShot){
        if(this.props.account.token == null || this.props.account.token == ''){
            this.props.router.push("/loginPage");
        }        
    }    
    renderProfile(){

    }
    onClickLogOut(){
        this.props.clear();
    }
    render(){
        return(
            <Page> 
                <CssBaseline />
                <div>
                    <Paper>
                        <Grid container>
                            <Grid item md={6}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                Hello！{this.props.account.name}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                This is your task console
                            </Typography>
                            </Grid>
                        </Grid>

                    </Paper>


                </div>
                <div>
                <Button component={Link} to="/addservice">
                    My Service
                </Button>
                <Button component={Link} to="/code">
                    Construction Codes
                </Button>
                <Button onClick={this.onClickLogOut.bind(this)}>Logout</Button>
                </div>
            </Page>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile)