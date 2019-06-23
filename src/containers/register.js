import React, { Component } from 'react';
import { register, sendNotification } from "../actions/account";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { Page } from "../Page";
import RegisterSummary from "../components/accounts/register-summary";
import { Stepper, Step, StepLabel, Button, Paper } from '@material-ui/core';
import RegisterType from '../components/accounts/register-type';
import RegisterAccount from '../components/accounts/register-account';

function mapStateToProps(state){
	return {		
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({register,sendNotification}), dispatch);
}


const steps = ['Account Type', 'Detail', 'Summary'];

class Register extends Component {
    static propTypes = {
        login: PropTypes.func
    }
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            confirm:'',
            name:'',
            type:'customer',

            dialogOpen: false,
            dialogContent:'',

            activeStep: 0,
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
        this.props.register(this.state.name, this.state.username,this.state.password,this.state.type);
        //console.log(this.state.username);
        this.props.sendNotification("Register Sucessful");
    }
    componentDidMount(){
        this.setState({
            dialogOpen: true
        })
    }
    handleClose(){
        this.setState({dialogOpen:false})
    }


    handleNext = () => {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      };
    
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      };



    getStepContent = (step) => {
        switch (step) {
          case 0:
            return <RegisterType name={this.state.name} type={this.state.type} 
                                onNext={this.handleNext}
                                onNameUpdate={x=>this.setState({name:x.currentTarget.value})} 
                                onTypeUpdate={x=>this.setState({type:x})}  />;
          case 1:
            return <RegisterAccount 
                        onNext={this.handleNext}
                        onPrev={this.handleBack}
                        username={this.state.username} password={this.state.password} 
                        onUserNameUpdate={x=>this.setState({username:x.currentTarget.value})}
                        onConfirmUpdate={x=>this.setState({confirm:x.currentTarget.value})} 
                        onPasswordUpdate={x=>this.setState({password:x.currentTarget.value})} />;
          case 2:
            return <RegisterSummary username={this.state.username}  
                                    name={this.state.name} 
                                    type={this.state.type} 
                                    onPrev={this.handleBack}
                                    onSubmit={this.onSubmit.bind(this)} />
          default:
            throw new Error('Unknown step');
        }
      }
      

    render(){
        const { activeStep } = this.state;
        //onFailedValidation={e=>this.setState({dialogOpen:true, dialogContent:'密码不相同'})}
        return(
                <Page style={{
                        width: 'auto',
                        display: 'block', // Fix IE 11 issue.
                        marginLeft: 3,
                        marginRight: 3,
                    }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map(label => (
                            <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Paper style={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}>
                        {this.getStepContent(activeStep)}
                    </Paper>                
                </Page>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Register)