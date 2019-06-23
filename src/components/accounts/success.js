import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

class SuccessLoginPanel extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Grid container xs={12}>
                <Grid>
                <Typography component="h2" variant="h1" gutterBottom>
                    成功登入
                </Typography>
                </Grid>
            </Grid>
        )
    }
}


export default SuccessLoginPanel