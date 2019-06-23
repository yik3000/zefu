import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import CreatableSelect from 'react-select/lib/Creatable';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ServiceSettingEditor extends Component {
    static propTypes = {
        name:PropTypes.string,
        options:PropTypes.array,
        categories:PropTypes.array,
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
        var defaultObject = {
            Id:'',
            Name:'',
            CategoryId:'',
        };
        defaultObject[this.props.labelField] = ''

        this.state ={
            selection:defaultObject,        
            selectedCategory:{}
        }
    }
    onClickItem(item){
        var targetedItem = this.props.categories.filter(x=>x.Id === item.CategoryId)[0];
        this.setState({
            selection:item,
            selectedCategory: {value:targetedItem.Id, label:targetedItem.Name }
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
            var targetedItem = this.props.categories.filter(x=>x.Id === selected.CategoryId)[0];
            this.setState({
                selection:selected,
                selectedCategory: {value:targetedItem.Id, label:targetedItem.Name }
            })    
        }
    }
    onCategorySelectionChange(item){
        var selection = this.state.selection;
        selection.CategoryId = item.value;
        this.setState({
            selection:selection,
            selectedCategory: item
        })
    }
    onItemCreate(value){
        var data = {
            Id:'',
            Name:value,
            CategoryId:this.state.selectedCategory.value
        }
        this.props.onCreate(data);
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
                            value:x.Id,
                            label:x.Name
                        }))}
                        //value={this.state.selection}
                        onChange={this.onSelectionChange.bind(this)}          
                        onCreateOption={this.onItemCreate.bind(this)}
                    />         
                <ul>
                {this.props.options.map(function(item,idx){
                    return(
                        <li onClick={this.onClickItem.bind(this,item)} key={idx}>{item.Name}</li>
                    )
                }.bind(this))}
                </ul>

                <CreatableSelect
                        isClearable
                        isDisabled={this.state.isLoading}
                        isLoading={this.state.isLoading}
                        options={this.props.categories.map(x=>({
                            value:x.Id,
                            label:x.Name
                        }))}
                        value={this.state.selectedCategory}
                        onChange={this.onCategorySelectionChange.bind(this)}          
                    /> 
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


export default ServiceSettingEditor