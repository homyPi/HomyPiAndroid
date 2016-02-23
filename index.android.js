/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
"use strict";
var React = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackAndroid
} = React;
import { Provider } from "react-redux";
import IO from "./js/io";
import configureStore from "./js/configureStore"
const store = configureStore();
IO.setStore(store);

import {logout} from "./js/actions/UserActions";

import {subscribe} from "./js/natives/PlayerNotification";
subscribe(store);

import Routes from "./js/components/Routes";

import Login from "./js/components/login";
import App from "./js/components/app";
import Splash from "./js/components/splash";
//import UserAPI from "./js/apis/UserAPI";

import PlayerFull from "./js/components/music/playerFull";

import {Actions} from "react-native-router-flux";

BackAndroid.addEventListener("hardwareBackPress", () => {
  try {
    Actions.currentRouter.pop();
    return true;
  }
  catch(err)  {
    console.log("Cannot pop. Exiting the app...")
    return false;
  }
});

var HomyPiAndroid = React.createClass({
    render: function() {
      var initialRoute = {name: "splash", onLoggedIn: this.onLoggedIn};
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  },
  _logout: function() {
    store.dispatch(logout());
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FAFAFA",
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
    },
    instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5,
    },
  })
});

AppRegistry.registerComponent("HomyPiAndroid", () => HomyPiAndroid);
