/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} = React;
import { Provider } from "react-redux"
import configureStore from './js/configureStore'
const store = configureStore();



import {setStore} from "./js/onSelectedRaspberryChange";
setStore(store);
import {subscribe} from "./js/natives/PlayerNotification";
subscribe(store);

import Login from "./js/components/login";
import App from "./js/components/app";
import Splash from "./js/components/splash";
//import UserAPI from "./js/apis/UserAPI";

var _navigator;
import PlayerFull from "./js/components/music/playerFull";

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.jumpBack();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === "splash") {
    return (
      <Splash navigator={navigationOperations} onLoggedIn={route.onLoggedIn} />
    );
  } else if (route.name === 'app') {
    return (
      <App navigator={navigationOperations} logout={route.logout}/>
    );
  } else if (route.name === 'login') {
    return (
      <Login navigator={navigationOperations} onLoggedIn={route.onLoggedIn}/>
    );
  } else if (route.name === 'player') {
    return (
      <PlayerFull navigator={navigationOperations} />
    );
  }
}

var HomyPiAndroid = React.createClass({
    render: function() {
      var initialRoute = {name: "splash", onLoggedIn: this.onLoggedIn};
    return (

      <Provider store={store}>
        <Navigator
          initialRoute={initialRoute}
          configureScene={() => Navigator.SceneConfigs.FloatFromBottomAndroid}
          renderScene={RouteMapper}
        ref="navigator" />
      </Provider>
    );
  },
  _logout: function() {
    UserAPI.logout();
    _navigator.replace({
      name: "login",
      onLoggedIn: () => this.onLoggedIn()
    });
  },
  onLoggedIn: function() {
    try {
    _navigator.replace({
      name: "app", logout: () => this._logout()
    });
  }catch(e) {console.log(e);console.log(e.stack)}
  },
  onLoaded: function(token) {
    let newRoute;
    console.log(token);
    if (token) {
      this.onLoggedIn();
    } else {
      _navigator.replace({name: "login", 
        onLoggedIn: () => this.onLoggedIn()
      });
    }
  },
  styles: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  })
});

AppRegistry.registerComponent('HomyPiAndroid', () => HomyPiAndroid);
