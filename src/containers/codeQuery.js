import React, { Component } from 'react';
import { login,clear } from "../actions/account";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { Page } from "../Page";
import Select from 'react-select';
import { getCity } from "../actions/geo";
import {getCode, getCodeCollections} from '../actions/code';
import { FormControlLabel, Paper, Typography, Grid, GridListTile, Card, CardHeader, CardContent } from '@material-ui/core';
import CitySelector from '../components/geo/citySelector';
import CodeCollection from '../components/code/collection'

function mapStateToProps(state){
	return {
        collections:state.codes.collections,
        codes: state.codes.codes,
        cities:state.geo.cities,
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({getCity,getCode,getCodeCollections}), dispatch);
}


class CodeQuery extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state = {
            selectedCity:{},
            selectedCollection:{},
            selectedCode:{}
        }
    }
    componentDidMount(){
    }
    componentDidUpdate(prevProps,prevState,snapShot){

    }
    handleInput(e){
        if(e.length>2){
            this.props.getCity("California", e);
        }
    }
    handleSelection(e){
        this.setState({
            selectedCity: e
        })
        this.props.getCodeCollections(e.Name);
    }
    render(){
        return(
            <Page>

                <Grid style={{paddingTop:20, paddingLeft:10, paddingRight:10}} container spacing={24}>
                    <Grid item xs={3}>
                        <Typography component="h4" variant="h5">
                            City
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <CitySelector
                                options={this.props.cities}
                                value={this.state.selectedCity}
                                onRequest={this.handleInput.bind(this)}
                                onSelect={this.handleSelection.bind(this)}
                        />                                        
                    </Grid>

                    <Grid item xs={12} sm={6} style={{paddingTop:10}}>
                        <Paper>
                            <Typography variant="h5">Ordinance</Typography>
                            <CodeCollection onClick={x=>{
                                                        this.setState({
                                                            selectedCollection:x,
                                                        })                                            
                                                        this.props.getCode(x.Id);
                                                    }} data={this.props.collections}>
                            </CodeCollection>  
                        </Paper>
                                            
                    </Grid>


                    <Grid item xs={12} sm={6} style={{paddingTop:10}}>
                    <Paper>
                        <Typography variant="h5">Codes</Typography>
                        <CodeCollection onClick={x=>{
                            this.setState({
                                selectedCode: x
                            })
                        }} data={this.props.codes}>
                        </CodeCollection>                                          
                    </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5">Detail</Typography>
                        <Card>
                            <CardHeader
                                title={this.state.selectedCode.Title} 
                                subheader={this.state.selectedCode.SectionText}
                                />
                            <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                {this.state.selectedCode.Text}
                            </Typography>
                            </CardContent>
                        </Card>
                    </Grid>


                </Grid>
            </Page>

        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CodeQuery)