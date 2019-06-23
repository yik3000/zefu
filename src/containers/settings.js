import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    updateService, removeService, getServices, addService,
    getServiceCategories,addServiceCategory,updateServiceCategory
} from "../actions/services";

import { getCodeCollections, addCodeCollection, updateCodeCollection, addCode, updateCode, getCode
} from "../actions/code";
import { getCity } from "../actions/geo";

import CodeCollection from '../components/code/collection'

//import { getServices } from "../actions/services";
import { Page } from "../Page";
import ValueEditor from "../components/utilities/ValueEditor";
import ServiceSettingEditor from "../components/service/serviceSettingEditor";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Button, Input } from '@material-ui/core';
import CitySelector from '../components/geo/citySelector';
import CodeCollectionEditor from "../components/code/collectionEditor";
import CodeEditor from "../components/code/codeEditor";

function mapStateToProps(state){
	return {    
        services:state.services.services,
        categories: state.services.categories,

        collections:state.codes.collections,
        codes:state.codes.codes,
        selectedCode:state.codes.activeCode,
        cities:state.geo.cities,

    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({updateService,removeService, getServices,addService, 
        getServiceCategories,addServiceCategory,updateServiceCategory, getCity, getCodeCollections,addCodeCollection, updateCodeCollection, 
        addCode, updateCode, getCode}), dispatch);
}

class Settings extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state = {
            selectedCity:{},
            selectedCollection:{
                Title:'',
                OrdinanceNo:'',
            },
            selectedCode:{
                Title:'',
                SectionText:'',
                Text:'',
                CollectionId:'',
            }
        }
    }
    handleCreate(obj){
        this.setState({
            isLoading:true,
        })
        this.props.addService(obj, function(result){
            this.setState({
                isLoading:false
            })
        }.bind(this))        
    }
    handleCreateCategory(inputValue){
        this.props.addServiceCategory({name:inputValue}, function(result){
        }.bind(this))        
    }
    componentDidMount(){
        this.props.getServices();
        this.props.getServiceCategories();
    }
    componentDidUpdate(prevProps,prevState,snapShot){
    }    
    renderProfile(){

    }
    onClickAdd(){
    }
    onClickServiceItem(item,e){
        this.setState({selection:item});
    }
    handleChange(type,obj){
        var value = obj.target.value;
        switch(type){
            case "name":
                var selection = this.state.selection;
                this.setState({
                    ...this.state,
                    selection: {Id:selection.id, Name:value}
                })
                return;
        }
    }
    onClickUpdateService(item){
        this.props.updateService(item);
    }
    onClickUpdateCategory(item){
        this.props.updateServiceCategory(item)
    }

    handleCityInput(e){
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



    onClickAddCollection(e){
        var object = this.state.selectedCollection;
        object.CityCode = this.state.selectedCity.Name
        this.props.addCodeCollection(object);
    }
    onClickUpdateCollection(e){
        var object = this.state.selectedCollection;
        object.CityCode = this.state.selectedCity.Name
        this.props.updateCodeCollection(object);
    }


    onClickAddCode(e){
        var object = this.state.selectedCode;
        object.CollectionId = this.state.selectedCollection.Id;
        this.props.addCode(object);
    }
    onClickUpdateCode(e){
        var object = this.state.selectedCode;
        this.props.updateCode(object);
    }



    render(){
        return(
            <Page>   
                <Grid container spacing={24} >
                    <Grid item xs={12} sm={6} md={3}>
                     
                    <Card>
                            <CardContent>
                        <ValueEditor
                            name="Serice Categories"
                            options={this.props.categories}
                            onCreate={this.handleCreateCategory.bind(this)}
                            onUpdate={this.onClickUpdateCategory.bind(this)}                    
                        />     
                            </CardContent>
                        </Card>             
                    </Grid>


                    <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <ServiceSettingEditor
                                name="Service Details"
                                categories={this.props.categories}
                                options={this.props.services}
                                onCreate={this.handleCreate.bind(this)}
                                onUpdate={this.onClickUpdateService.bind(this)}                    
                            />      
                        </CardContent>
                    </Card>        
                    </Grid>     
  
                    <Grid item xs={12} sm={12} md={6}>
                        <Card style={{minHeight:'300px'}}>
                            <CardContent>
                            <CitySelector
                                    options={this.props.cities}
                                    value={this.state.selectedCity}
                                    onRequest={this.handleCityInput.bind(this)}
                                    onSelect={this.handleSelection.bind(this)}
                                />
                            </CardContent>
                            
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                        <CodeCollection onClick={x=>{
                                            var city = this.props.cities.filter(y=>{ return y.Name === x.CityCode})[0];
                                            //console.log(city);
                                            this.setState({
                                                selectedCollection:x,
                                                selectedCity: city
                                            })
                                            this.props.getCode(x.Id);
                                        }} data={this.props.collections}>
                                        </CodeCollection>                                
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CodeCollectionEditor data={this.state.selectedCollection} onUpdate={(type,content)=>{ 
                                        if(type=="Title"){
                                            this.setState({
                                                selectedCollection:{
                                                    ...this.state.selectedCollection,
                                                    Title:content.currentTarget.value,
                                                }
                                            })
                                        }
                                        if(type=="Ordinance"){
                                            this.setState({
                                                selectedCollection:{
                                                    ...this.state.selectedCollection,
                                                    OrdinanceNo:content.currentTarget.value,
                                                }
                                            })
                                        }
                                    }} 
                                    
                                    />
                                        <Button onClick={this.onClickAddCollection.bind(this)}>Add Collect</Button>
                                        <Button onClick={this.onClickUpdateCollection.bind(this)}>Update</Button>
                                </Grid>
                            </Grid>

                            <Grid container>
                                    <Grid item xs={12} sm={6}>
                                      <CodeCollection onClick={x=>{
                                          this.setState({
                                              selectedCode:x
                                          })
                                        }} data={this.props.codes}>
                                        </CodeCollection>   
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <CodeEditor data={this.state.selectedCode} onUpdate={(type,content)=>{ 
                                        if(type=="Title"){
                                            this.setState({
                                                selectedCode:{
                                                    ...this.state.selectedCode,
                                                    Title:content.currentTarget.value,
                                                }
                                            })
                                        }
                                        else if(type=="SectionText"){
                                            this.setState({
                                                selectedCode:{
                                                    ...this.state.selectedCode,
                                                    SectionText:content.currentTarget.value,
                                                }
                                            })
                                        }
                                        else if(type=="Text"){
                                            this.setState({
                                                selectedCode:{
                                                    ...this.state.selectedCode,
                                                    Text:content.currentTarget.value,
                                                }
                                            })
                                        }

                                    }} 
                                    
                                    />
                                        <Button onClick={this.onClickAddCode.bind(this)}>Add</Button>
                                        <Button onClick={this.onClickUpdateCode.bind(this)}>Update</Button>
                                </Grid>
                            </Grid>
                        </Card>    
                    </Grid>     
 
                </Grid>



            </Page>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Settings)