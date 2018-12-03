import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from '../Login/Login';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      confipassword:''
    }
  }
  handleClick(event){
    var apiBaseUrl = process.env.REACT_APP_API_URL;
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
    "name": this.state.first_name,
    "email":this.state.email,
    "password":this.state.password,
    "password_confirmation":this.state.confipassword
    }
    axios.post(apiBaseUrl+'auth/signup', payload)
   .then(function (response) {
     console.log(response);
     if(response.data != undefined){
      //  console.log("registration successfull");
       var loginscreen=[];
       loginscreen.push(<Login appContext={this}/>);
       var loginmessage = "Not Registered yet.Go to registration";
       self.props.appContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
        });
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
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
            <TextField
             type = "password"
             hintText="Confirm your Password"
             floatingLabelText="Password confirmation"
             onChange = {(event,newValue) => this.setState({confipassword:newValue})}
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
export default Register;