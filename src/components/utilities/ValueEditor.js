import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import CreatableSelect from 'react-select/lib/Creatable';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ValueEditor extends Component {
    static propTypes = {
        name:PropTypes.string,
        options:PropTypes.array,
        onCreate:PropTypes.func,
        onUpdate:PropTypes.func,
        labelField:PropTypes.string,
    }
    static defaultProps = {
        labelField:'Name',
        valueField:'Id',
    }
    constructor(props){
        super(props);
        var defaultObject = {};
        defaultObject[this.props.labelField] = ''
        this.state ={
            isLoading:false,
            selection:defaultObject,        
        }
    }
    onClickItem(item){
        this.setState({
            selection:item
        })
    }
    handleChange(type,obj){
        var value = obj.target.value;
        switch(type){
            case "name":
                var selection = this.state.selection;
                selection[this.props.labelField] = value;
                this.setState({
                    ...this.state,
                    selection: selection
                })
                return;
        }
    }
    onClickUpdateService(){
        this.props.onUpdate(this.state.selection);
    }
    onSelectionChange(item){
        if(item != null){
            var selected = this.props.options.filter(x=>{
                if(x[this.props.valueField]==item.value){
                    return true;
                }
                else{
                    return false;}
            })[0]
            this.setState({
                selection:selected
            })    
        }
    }
    render(){
        return(
            <div>
                <h3>{this.props.name}</h3>
                 <CreatableSelect
                        isClearable
                        isDisabled={this.state.isLoading}
                        isLoading={this.state.isLoading}
                        options={this.props.options.map(x=>({
                            value:x[this.props.valueField],
                            label:x[this.props.labelField]
                        }))}
                        //value={this.state.selection}
                        onChange={this.onSelectionChange.bind(this)}          
                        onCreateOption={this.props.onCreate.bind(this)}
                    />         
                <ul>
                {this.props.options.map(function(item,idx){
                    return(
                        <li onClick={this.onClickItem.bind(this,item)} key={idx}>{item.Name}</li>
                    )
                }.bind(this))}
                </ul>

                <TextField
                    id="outlined-name"
                    label="Name"
                    value={this.state.selection[this.props.labelField]}
                    onChange={x=>{this.handleChange('name',x)}}
                    margin="normal"
                    //variant="outlined"
                />
                <Button variant="contained" onClick={this.onClickUpdateService.bind(this)}>
                    Update
                </Button>

            </div>
        )
    }
}


export default ValueEditor