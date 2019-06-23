import React, { Component } from 'react';
import { login,clear } from "../actions/account";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import  LoginPanel from "../components/accounts/login";
import { Page } from "../Page";
function mapStateToProps(state){
	return {
        account:state.account
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({login,clear}), dispatch);
}

class Login extends Component {
    static propTypes = {
        login: PropTypes.func,
        clear: PropTypes.func,
    }
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
        }
    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps,prevState,snapShot){
        if (this.props.account.token !== prevProps.account.token) {
            //console.log("changed")
            this.props.router.goBack();
        }
    }
    
    onUsernameChange(e){
        this.setState({
            username:e.currentTarget.value
        })
    }
    onPasswordChange(e){
        this.setState({
            password:e.currentTarget.value
        })
    }
    onSubmit(){
        this.props.login(this.state.username, this.state.password)
    }
    renderLogin(){
        return(
            <LoginPanel 
            onUserNameUpdate={x=>{this.setState({username:x.currentTarget.value})}}
            onPasswordUpdate={x=>{this.setState({password:x.currentTarget.value})}}
            onClear={x=>{this.props.clear()}}
            onSubmit={this.onSubmit.bind(this)}
            username={this.state.username} 
            password={this.state.password}></LoginPanel>                
        )        
    }
    render(){
        return(
            <Page width={'80%'}>                
                {
                    this.renderLogin()
                }                
            </Page>


        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)