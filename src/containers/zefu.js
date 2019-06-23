import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { getZefuById} from "../actions/zefu";
import { Page } from "../Page";

function mapStateToProps(state){
	return {
        zefu:state.zefus.zefu,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({getZefuById}), dispatch);
}


class Zefu extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        this.props.getZefuById(this.props.params.userId);

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
        console.log(value);
    }
    render(){
        console.log(this.props)
        return(
            <Page>
                <h1>师傅名称</h1>
                <h1>{this.props.zefu.Name}</h1>
                <div>服务范畴</div>
                <ul>
                    {this.props.zefu.UserServices.map(function(value,index){
                        return(
                            <li key={index}>{value.Service.Name}</li>
                        )
                    })}
                </ul>
            </Page>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Zefu)