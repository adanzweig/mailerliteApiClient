import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import Loginscreen from './Auth/Login/Loginscreen'
import SubscribersList from './Subscribers/SubscribersList'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      subscribersList:[],
      access_token:""
    }
    require('dotenv').config();
  }
  componentWillMount(){
    if(localStorage.getItem('access_token') == ""){
        var loginPage =[];
    loginPage.push(<Loginscreen appContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
    }else{
       var subscribersList =[];
      subscribersList.push(<SubscribersList appContext={this}/>);
      this.setState({
                  subscribersList:subscribersList
                    })
    }
    
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.subscribersList}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;