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

import Login from "./js/components/login";
import App from "./js/components/app";
import Splash from "./js/components/splash";
import UserAPI from "./js/apis/UserAPI";
import Settings from "./js/settings";

var _navigator;
var PlayerFull = require("./js/components/music/playerFull");

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
      <Splash navigator={navigationOperations} />
    );
  } else if (route.name === 'app') {
    console.log("return app:", (
      <App navigator={navigationOperations} logout={route.logout}/>
    ))
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
  componentWillMount: function() {
    Settings.loadStoredServerUrl(function(err, url) {
      if (url) {
        UserAPI.loadStoredToken(function(err, token) {
          this.onLoaded(token);
        }.bind(this));
      } else {
        _navigator.replace({name: "login"});
      }
    }.bind(this));
  },
  render: function() {
    var initialRoute = {name: "splash"};
    return (
      <Navigator
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FloatFromBottomAndroid}
        renderScene={RouteMapper}
      ref="navigator" />
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

var Player = React.createClass({
  render: function() {
    return (
          <View style={this.styles.container}>
            <Text style={this.styles.play}>play</Text>
            <View style={this.styles.trackData}>
              <Text style={this.styles.trackName}>track name</Text>
              <Text style={this.styles.artists}>artist 1, arist 2</Text>
            </View>
          </View>
      );
  },
  styles: StyleSheet.create({
    container: {
      backgroundColor: "#aa0000",
      position: "absolute",
      bottom: 0,
      height: 60,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center"
    },
    play: {
      flex: 1,
    },
    trackData: {
      flex:4,
      flexDirection: "column"
    },
    trackName: {
      flex:1
    },
    artists: {
      flex:1
    }


  })
});


AppRegistry.registerComponent('HomyPiAndroid', () => HomyPiAndroid);
