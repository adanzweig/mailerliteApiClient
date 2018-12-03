import React, { Component, } from 'react'
import { FormGroup,FormControl,Button,ControlLabel,HelpBlock,Panel } from 'react-bootstrap';
import axios from 'axios';
import SubscribersList from './SubscribersList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
class SubscribersForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title:"Add Subscriber",
      email:'',
      name:'',
      status : '',
      subscribersList:[],
      subscriberSelected:[]
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    if(props.subscriberSelected != undefined){
      console.log(props.subscriberSelected);
      this.state.email = props.subscriberSelected;
    }
  }
  componentDidMount() {
  var config = { headers: { Authorization: 'Bearer ' .concat(localStorage.getItem('access_token'))}};
  var apiBaseUrl = process.env.REACT_APP_API_URL;
    var self = this;
    axios.get(apiBaseUrl+'subscribers/'+this.state.email,config)
      .then(res => {
        const subscribers = res.data.data;
        self.setState({name:subscribers.name,status:subscribers.state});
      });
    console.log(this.state);
  }
  handleSave(event){
    var apiBaseUrl = process.env.REACT_APP_API_URL;
     var self = this;
     var payload={
       "email":this.state.email,
       "name":this.state.name,
       "state":this.state.status
     }
    var config = { headers: { Authorization: 'Bearer ' .concat(localStorage.getItem('access_token'))}};
    if(this.props.subscriberSelected == undefined){
      axios.post(apiBaseUrl+'subscribers', payload,config)
     .then(function (response) {
       if (response.data.success) {
         console.log("Save successful");
         var subscribersList=[];
         subscribersList.push(<SubscribersList appContext={self.props.appContext.appContext}/>);
         console.log(self.props);
//          self.props.appContext.setState({loginPage:[],subscribersList:subscribersList});
         self.props.appContext.appContext.setState({loginPage:[],subscribersList:subscribersList});
       } else {
         alert(response.data.data)
       }
     })
     .catch(function (error) {
       alert(error);
     });
    }else{
      axios.put(apiBaseUrl+'subscribers', payload,config)
     .then(function (response) {
       if (response.data.success) {
         console.log("Save successful");
         var subscribersList=[];
         subscribersList.push(<SubscribersList appContext={self.props.appContext.appContext}/>);
         console.log(self.props);
//          self.props.appContext.setState({loginPage:[],subscribersList:subscribersList});
         self.props.appContext.appContext.setState({loginPage:[],subscribersList:subscribersList});
       } else {
         alert(response.data.data)
       }
     })
     .catch(function (error) {
       alert(error);
     });
    }
     
  }
  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangeState(e) {
    this.setState({ status: e.target.value });
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title={this.state.title}
           />
        <Panel>
          <Panel.Body>
          <form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Name</ControlLabel>
              <FormControl 
                  type="text"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={this.handleChangeName}
                />
            </FormGroup>
            
            <FormGroup controlId="formControlsEmail">
              <ControlLabel>Email</ControlLabel>
              <FormControl 
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
            </FormGroup>
          
            
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" placeholder="select" 
                onChange={this.handleChangeState} value={this.state.status}>
                <option value="unsubscribed">unsubscribed</option>
                <option value="active">active</option>
              </FormControl>
            </FormGroup>
            <Button bsStyle="primary" onClick={this.handleSave.bind(this)}>Save</Button>
          </form>
          </Panel.Body>
          </Panel>
          </div>
            </MuiThemeProvider>
      </div>
    )
  }
}

export default SubscribersForm