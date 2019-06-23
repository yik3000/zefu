import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



class RegisterAccount extends Component {
    static propTypes = {
        username: PropTypes.string,
        password:PropTypes.string,
        confirm:PropTypes.string,
        onUserNameUpdate:PropTypes.func,
        onPasswordUpdate:PropTypes.func,
        onConfirmUpdate:PropTypes.func,
        
        onNext:PropTypes.func,
        onPrev:PropTypes.func,
    }
    constructor(props){
        super(props);
        this.state = {
            passwordConfirm:'',
        }
    }
    render(){
        return(

            <Grid container spacing={24} style={{paddingTop:'20px', textAlign:'center'}}>
                <Grid item xs={12}>
                    <Input value={this.props.username} onChange={this.props.onUserNameUpdate.bind(this)} 
                        placeholder="Email" type="text"  />                
                </Grid>
                <Grid item xs={12}>
                <Input value={this.props.password} type="password" onChange={this.props.onPasswordUpdate.bind(this)} 
                    placeholder="Password"  required />                
                </Grid>
                <Grid item xs={12}>
                    <Input value={this.props.confirm} type="password" onChange={this.props.onConfirmUpdate.bind(this)} 
                        placeholder="Retype Pwd"  required />                
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={this.props.onPrev}>Previous</Button>
                    <Button onClick={this.props.onNext}>Next</Button>
                </Grid>
            </Grid>
        )
    }
}


export default RegisterAccount