import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import {clearNotification  } from "../actions/account";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



function mapStateToProps(state){
	return {
        notifier:state.system.notifier
 	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({clearNotification}), dispatch);
}


class Notifier extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state = {
            dialogOpen:false,
            message:'',
        }
    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps,prevState,snapShot){
        if (this.props.notifier !== prevProps.notifier &&  this.props.notifier != '') {
            this.setState({
                dialogOpen:true,
                message:this.props.notifier
            })
        }
    }    
    handleClose(){
        this.setState({
            dialogOpen:false,            
        })
        this.props.clearNotification();
    }
    render(){
        return(
            
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.dialogOpen}
        autoHideDuration={3000}
        onClose={this.handleClose.bind(this)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.handleClose.bind(this)}>
            关闭
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose.bind(this)}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />

        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Notifier)