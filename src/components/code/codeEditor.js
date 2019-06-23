import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { Paper, TextField, Grid } from '@material-ui/core';

class CodeEditor extends Component {
    static propTypes = {
        data: PropTypes.object,
        onUpdate: PropTypes.func,
    }
    static defaultProps ={
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
    }
    componentDidUpdate(prevProps,prevState,snapShot){
    }
    render(){
        return(
            <Paper>
                <Grid container spacing={16}>
                    <Grid item xs={12} >
                        <TextField fullWidth onChange={this.props.onUpdate.bind(this,"Title")} value={this.props.data.Title} label="Title" />                
                    </Grid>
                    <Grid item xs={12} >
                        <TextField fullWidth onChange={this.props.onUpdate.bind(this,"SectionText")} value={this.props.data.SectionText} label="Section" />                
                    </Grid>
                    <Grid item xs={12} >
                        <TextField fullWidth onChange={this.props.onUpdate.bind(this,"Text")} value={this.props.data.Text} label="Text" />                
                    </Grid>
                </Grid>
            </Paper>

        )
    }
}


export default CodeEditor