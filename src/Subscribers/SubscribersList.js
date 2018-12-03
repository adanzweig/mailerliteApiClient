import React, { Component, } from 'react'
import axios from 'axios';
import { Table,Button } from 'react-bootstrap';
import SubscribersForm from './SubscribersForm'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Loginscreen from '../Auth/Login/Loginscreen'
class SubscribersList extends Component {
  constructor(props){
  super(props);
  
  this.state = {
    subscribers: [],
    subscribersList:[]
  }
  require('dotenv').config();
 }
  
componentDidMount() {
  var config = { headers: { Authorization: 'Bearer ' .concat(localStorage.getItem('access_token'))}};
  var apiBaseUrl = process.env.REACT_APP_API_URL;
    axios.get(apiBaseUrl+'subscribers',config)
      .then(res => {
        const subscribers = res.data.data;
        this.setState({ subscribers });
      })
  }
  handleLogout(event){
    localStorage.setItem('access_token','')
    var loginPage =[];
    loginPage.push(<Loginscreen appContext={this}/>);
    this.props.appContext.setState({
      loginPage:loginPage
        })
   }
  handleAdd(event)
  {
       var subscribersList=[];
       subscribersList.push(<SubscribersForm appContext={this.props}/>)
       this.props.appContext.setState({loginPage:[],subscribersList:subscribersList})
  }
  handleEdit(id,event){
         var subscribersList=[];

         subscribersList.push(<SubscribersForm appContext={this.props} subscriberSelected={id}/>)
        console.log(this.props);
         this.props.appContext.setState({loginPage:[],subscribersList:subscribersList})
   }
  handleDelete(id,index,event){
    let newList = this.state.subscribers.splice(index,1);
  
    this.setState(this.state.subscribers);
    var apiBaseUrl = process.env.REACT_APP_API_URL;
     var self = this;
    var config = { headers: { Authorization: 'Bearer ' .concat(localStorage.getItem('access_token'))}};
      axios.delete(apiBaseUrl+'subscribers?email='+id,config)
     .then(function (response) {
       if (response.data.success) {
         console.log("delete successful");
       }
     })
     .catch(function (error) {
//        alert(error);
     });
   }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Subscribers"
           />
          
        <Button bsStyle="primary" onClick={this.handleLogout.bind(this)}>Logout</Button>
            <Button bsStyle="primary" onClick={this.handleAdd.bind(this)}>Add</Button>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>State</th>
              <th>Fields</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.subscribers.map((subscriber,y) =>
               <tr key={y}>        
                  <td>{subscriber.id}</td>
                  <td>{subscriber.email}</td>
                  <td>{subscriber.name}</td>
                  <td>{subscriber.state}</td>
                  <td>
                    <pre>
                      {JSON.stringify(subscriber.fields)}
                    </pre>
                  </td>
                  <td>
                      <Button bsStyle="warning" onClick={this.handleEdit.bind(this,subscriber.email)}>Edit</Button>
                      <Button bsStyle="danger" onClick={this.handleDelete.bind(this,subscriber.email,y)}>Delete</Button>
                  </td>
                </tr>
               )}
          </tbody>
        </Table>
          </div>
            </MuiThemeProvider>
      </div>
    )
  }
}
const style = {
 margin: 15,
};
export default SubscribersList