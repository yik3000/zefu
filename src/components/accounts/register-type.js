import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



class RegisterType extends Component {
    static propTypes = {
        username: PropTypes.string,
        password:PropTypes.string,
        type:PropTypes.string,
        name:PropTypes.string,

        onTypeUpdate:PropTypes.func,
        onNameUpdate:PropTypes.func,

        onNext:PropTypes.func,
   
    }
    constructor(props){
        super(props);
        this.state = {
            selectOpen:false,
        }
    }
    onSubmitClicked(){
        if(this.state.passwordConfirm === this.props.password){
            this.props.onSubmit();
        }
        else{
            this.props.onFailedValidation();
        }
    }
    render(){
        return(
            <Grid container style={{
                paddingTop:'20px',
                //textAlign: 'center',
            }}>
                <Grid style={{
                    textAlign: 'center'
                }} item xs={3}>
                    <Typography style={{marginTop:'10px'}} component="h1" variant="h5">
                    Type
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Grid item xs={12}>
                        <Select open={this.state.selectOpen}
                                onClose={x=>{this.setState({selectOpen:false})}}
                                onOpen={x=>{this.setState({selectOpen:true})}}
                                value={this.props.type}
                                onChange={x => {this.props.onTypeUpdate(x.target.value)}} >
                            <MenuItem value='customer'>Customer</MenuItem>
                            <MenuItem value="zefu">Zefu</MenuItem>
                        </Select>                                        
                    </Grid>
                    <Grid item xs={12}>
                        <Input value={this.props.name} onChange={this.props.onNameUpdate.bind(this)} 
                            placeholder="Name" type="text"  />                
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.props.onNext}>Next</Button>
                    </Grid>
                </Grid>

            </Grid>
        )
    }
}


export default RegisterType