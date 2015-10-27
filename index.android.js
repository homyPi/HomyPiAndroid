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
  Navigator
} = React;

import Login from "./js/components/login";
import App from "./js/components/app";
import Splash from "./js/components/splash";
import UserAPI from "./js/apis/UserAPI";

var HomyPiAndroid = React.createClass({
  componentWillMount: function() {
    UserAPI.loadStoredToken(function(err, token) {
      this.onLoaded(token);
    }.bind(this));
  },
  render: function() {
    var initialRoute = {name: "splash", component: Splash};
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={(route, navigator) => {
            if (route.component) {
              return React.createElement(route.component, { navigator });
            } else {
              return (<Text> {JSON.stringify(route)}</Text>);
            }
          }  
        } 
      ref="navigator" />
    );
  },
  onLoaded: function(token) {
    console.log("loaded", UserAPI);
    let newRoute;
    
    if (token) {
      newRoute = {name: 'app', component: App, index: 1};
    } else {
      newRoute = {name: 'Login', component: Login,  index: 0};
    }
   if (newRoute) {
      this.refs.navigator.replace(newRoute);
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
