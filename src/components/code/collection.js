import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { List, ListItem, ListItemText } from '@material-ui/core';

class CodeCollection extends Component {
    static propTypes = {
        data: PropTypes.array,
        onClick:PropTypes.func,
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
    render(){
        return(
            <List>
                {
                    this.props.data.map(function(item,index){
                        return(
                            <ListItem key={index} button onClick={this.props.onClick.bind(null,item)}>
                                <ListItemText primary={item.Title} />
                            </ListItem>
                        )
                    }.bind(this))
                }
            </List>
        )
    }
}


export default CodeCollection