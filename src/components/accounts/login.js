import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';


class LoginPanel extends Component {
    static propTypes = {
        username: PropTypes.string,
        password:PropTypes.string,
        onUserNameUpdate:PropTypes.func,
        onPasswordUpdate:PropTypes.func,
        onClear:PropTypes.func,
        onSubmit:PropTypes.func,
    }
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Paper style={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Avatar style={{
                  margin: 5,
                  backgroundColor: '#336699',
            }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <div style={{
                    width: '100%', // Fix IE 11 issue.
                    marginTop: 20,
            }}>
            <Grid container style={{textAlign:'center'}}>
                <Grid xs={12}>
                        <Input placeholder="Account/Email" value={this.props.username} onChange={this.props.onUserNameUpdate.bind(this)} autoComplete="email" autoFocus required />
                </Grid>
                <Grid xs={12}>
                    <Input placeholder="Password" onChange={this.props.onPasswordUpdate.bind(this)} value={this.props.password}  type="password"  autoComplete="current-password" />
                </Grid>
                <Grid container style={{textAlign:'center', paddingTop:30, paddingBottom:30}}>
                   <Grid item xs={4}>
                   <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.props.onSubmit.bind(this)}>
                            Login
                        </Button>
                   
                   </Grid>
                   <Grid item xs={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.props.onClear.bind(this)}>
                            Clear
                        </Button>
                        </Grid>
                    <Grid item xs={4}>
                        <Button
                                component={Link} to="/register" 
                                variant="outlined"
                                color="primary"
                                onClick={this.props.onClear.bind(this)}>
                                    Register
                    </Button>
                    </Grid>

                </Grid>
            </Grid>           
            </div>
         </Paper>
         
        )
    }
}


export default LoginPanel