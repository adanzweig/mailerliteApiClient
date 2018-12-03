import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SubscribersList from '../../Subscribers/SubscribersList'
class Login extends Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:'',
    access_token : ''
  }
  require('dotenv').config();
 }
  handleClick(event){
    console.log(process.env.REACT_APP_API_URL);
   var apiBaseUrl = process.env.REACT_APP_API_URL;
   var self = this;
   var payload={
     "email":this.state.username,
     "password":this.state.password
   }
   var accessToken = "";
   axios.post(apiBaseUrl+'auth/login', payload)
   .then(function (response) {
     if (response.data.access_token != undefined) {
       var subscribersList=[];
       subscribersList.push(<SubscribersList appContext={self.props.appContext}/>)
       console.log(self.props);
       self.props.appContext.setState({loginPage:[],subscribersList:subscribersList,access_token:response.data.accessToken})
       localStorage.setItem('access_token', response.data.access_token);
     } else if(response.data.code == 204){
       console.log("Username password do not match");
       alert("username password do not match")
     } else {
       console.log("Username does not exists");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
   console.log(error);
   });
 }
render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;