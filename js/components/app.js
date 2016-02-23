var React = require("react-native");
import { connect } from "react-redux";
import {Actions} from "react-native-router-flux";
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  BackAndroid
} = React;



import Home from "./alarms/AlarmList";
import PlayerHeader from "./music/playerHeader";
import TrackSearch from "./music/TrackSearch";
import AlbumSearch from "./music/AlbumSearch";
import AlbumDetails from "./music/AlbumDetails";

import AlarmList from "./alarms/AlarmList";

import Drawer from "react-native-drawer";
import Menu from "./menu";
import TopMenu from "./topMenu";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter"
import Subscribable from "Subscribable";
import UserApi from "../apis/UserAPI";

var SocketConnection = require("../natives/SocketConnection");

import MyArtists from "./music/myArtists";
import SearchMusic from "./music/searchMusic";

import AppRoutes from "./AppRoutes";

BackAndroid.addEventListener("hardwareBackPress", () => {
  try {
    return true;
  }
  catch(err)  {
    console.log("Cannot pop. Exiting the app...")
    return false;
  }
});

var App = React.createClass({
  getInitialState() {
    return {}
  },
  componentWillMount: function() {
  },
  componentWillUnmount: function() {

  },

  render: function() {
    var initialRoute = {name: "searchMusic"};
    
    let nav = null;
    var menu = <Menu pushRoute={this._push} closeMenu={this.closeMenu} logout={() => this._logout()}/>;
    return (
        <Drawer 
          content={menu}
          ref="sideMenu"
          openDrawerThreshold={0.35}
          type="overlay"
          styles={{
            drawer: {shadowColor: "#000000", elevation: 16, shadowOpacity: 0.8, shadowRadius: 3}
          }}
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          openDrawerOffset={100}>
          <TopMenu openMenu={this.openSideMenu} />
          <View style={this.styles.container}> 

              <AppRoutes route={this.props.route}/>

            <View style={this.styles.player}>
              <PlayerHeader navigator={this.props.navigator} />
            </View>
          </View>
        </Drawer>
      );
  },
  _logout: function() {
    this.props.logout();
  },
  openSideMenu: function() {
    this.refs.sideMenu.open();
  },
  closeMenu: function() {
    this.refs.sideMenu.close()
  },
  styles: {
    container: {
      flex: 1,
      backgroundColor: "#FAFAFA"
    },
    player: {
      height: 75,
      backgroundColor: "#263238",
      marginLeft: 0,
      elevation: 16
    }
  }
});

module.exports = App;