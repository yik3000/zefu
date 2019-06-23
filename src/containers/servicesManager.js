import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { getMyService, addService, pickService } from "../actions/account";
import { getServices } from "../actions/services";
import { Page } from "../Page";
import CreatableSelect from 'react-select/lib/Creatable';
import { Grid, Typography } from '@material-ui/core';


function mapStateToProps(state){
	return {    
        myServices:state.account.services,
        services:state.services.services.map(x=>
            {
                return{
                    value: x.Id,
                    label: x.Name        
                }
            })        
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({getMyService,addService,getServices,pickService}), dispatch);
}

class ServiceManager extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state = {
            selection: {},
            isLoading:false,
        }
    }
    handleCreate(inputValue){
        this.setState({
            isLoading:true,
        })
        this.props.addService({Name:inputValue}, function(result){
            this.setState({
                isLoading:false
            })
        }.bind(this))        

    }
    handleChange(newValue, actionMeta){
        if(actionMeta.action == "select-option"){
            this.props.pickService({Id:newValue.value, Name:newValue.label});
        }
    }

    componentDidMount(){
        this.props.getMyService();
        this.props.getServices();
    }
    componentDidUpdate(prevProps,prevState,snapShot){
    }    
    renderProfile(){

    }
    onClickAdd(){
    }
    render(){
        return(
            <Page>
                <Typography variant="h3">
                    My service category
                </Typography>
                <Grid container spacing={24} style={{ paddingTop:30}}>
                    <Grid item xs={12} sm={6}>
                        <CreatableSelect
                            isClearable
                            isDisabled={this.state.isLoading}
                            isLoading={this.state.isLoading}

                            options={this.props.services}
                            value={this.state.selection}
                            onChange={this.handleChange.bind(this)}
                            onCreateOption={this.handleCreate.bind(this)}
                        />                             
                    </Grid>
                    <Grid item xs={12} sm={6}>
                            <ul>
                            {this.props.myServices.map(function(item,idx){
                                return(
                                    <li key={idx}>{item.Name}</li>
                                )
                            })}
                            </ul>                   
                    </Grid>
                </Grid>                           
            </Page>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ServiceManager)