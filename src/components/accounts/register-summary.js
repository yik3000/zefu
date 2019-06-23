import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



class RegisterSummary extends Component {
    static propTypes = {
        username: PropTypes.string,
        type:PropTypes.string,
        name:PropTypes.string,
        onPrev:PropTypes.func,
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return(

            <Grid container spacing={0} style={{textAlign:'center', paddingTop:'20px',}}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Account/Email
                    </Typography>
                    <Typography component="h3" variant="h5">
                        {this.props.username}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                         Name
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h3" variant="h5">
                        {this.props.name}
                    </Typography>
                </Grid>

                <Grid item xs={12}>                
                    <Button onClick={this.props.onPrev}  color="primary">Previous</Button>
                    <Button onClick={this.props.onSubmit}  color="primary">Register</Button>
                </Grid>                
            </Grid>
        )
    }
}


export default RegisterSummary