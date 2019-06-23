import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { getServices,getServiceCategories } from "../actions/services";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Page } from "../Page";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Button, Input, InputBase } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';


function mapStateToProps(state){
	return {
        services:state.services.services,
        categories: state.services.categories,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({getServices,getServiceCategories}), dispatch);
}


class Home extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    imageStyle = function(options){
        return{
            display: 'block',
            width: 'auto',
            height: 'auto',
        }
    }
    componentDidMount(){
        this.props.getServiceCategories();

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
        this.props.router.push('/listings/' + value.Id);
    }
    render(){
        return(
            <Page appBarPadding={false}>
                <Grid container spacing={8}>
                    <Grid item style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',                        
                                    minHeight:'500px',
                                    backgroundImage: 'url("bg.jpg")',
                        }} xs={12}>
                        <Paper style={{
                                    width:'400px',
                         }}>


                        <div style={{flex:'grow'}} />
                                <div style={{
                                    position:'relative',
                                    borderRadius:2,
                                    marginLeft:0,                                    
                                }}>
                                    <div style={{
                                        position:'absolute',
                                        height:'100%',
                                        width:'30px',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}>
                                        <SearchIcon style={{}} />
                                    </div>
                                    <InputBase placeholder="What can zefu help you with?" style={{
                                        width:'100%',
                                        paddingLeft:'30px',
                                    }} />
                                </div>
                        
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <GridList                         
                        //container 
                        style={{ transform: 'translateZ(0)' }}
                        direction="row"
                        //justify="center"
                        //alignItems="center"
                        cols={3} rows={1}
                        cellHeight={200}
                        spacing={1}>                            
                            {this.props.categories.map((value,index) =>{
                                return(
                                    <GridListTile 
                                        onClick={this.onClickItem.bind(this,value)}
                                        key={index} cols={1} rows={1}>                                
                                        <Button style={{width:"100%", height:"100%"}}>
                                        <img src={'./categoris/'+value.Name + '.jpg'} alt={value.Name}  style={this.imageStyle()} />
                                        <GridListTileBar 
                                            titlePosition="top"
                                            actionPosition="left"
                                            title={value.Name}>
                                        </GridListTileBar>
                                        </Button>
                                       
                                    </GridListTile>
                            )})}.bind(this)            
                        </GridList>                            
                    </Grid>
                </Grid>
                <Grid item style={{display:'flex', alignItems:'center', paddingTop:'10px', justifyContent:'center'}}>
                   
                        <Typography variant="h5">Copyright @2019</Typography>
                </Grid>
            </Page>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)