import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import Select from 'react-select';

class CitySelector extends Component {
    static propTypes = {
        options:PropTypes.array,
        value:PropTypes.object,
        onRequest:PropTypes.func,    
        onSelect:PropTypes.func,   
    }
    static defaultProps ={
        valueField:'Name',
        labelField:'Name'
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
    handleInput(e){
        if(e.length>2){
            this.props.onRequest(e);
        }
    }
    handleSelection(e){
        this.props.onSelect(
            this.props.options.filter(x=>x[this.props.valueField] === e.value)[0]
        )    
    }
    render(){
        return(
                  <Select
                        options={this.props.options.map(e=>({label:e[this.props.labelField], value:e[this.props.valueField]}))}
                        value={{label:this.props.value[this.props.labelField], value:this.props.value[this.props.labelField]}}
                        onInputChange={this.handleInput.bind(this)}
                        onChange={this.handleSelection.bind(this)}
                        placeholder="输入城市"
                        />
        )
    }
}


export default CitySelector