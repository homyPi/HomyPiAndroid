var React = require('react-native');
import { connect } from 'react-redux';
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Navigator,
  BackAndroid
} = React;



import Home from "./alarms/AlarmList";
import PlayerHeader from "./music/playerHeader";
import TrackSearch from "./music/TrackSearch";
import AlbumSearch from "./music/AlbumSearch";
import AlarmList from "./alarms/AlarmList";

import Drawer from 'react-native-drawer';
import Menu from "./menu";
import TopMenu from "./topMenu";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Subscribable from "Subscribable";
import UserApi from "../apis/UserAPI";

var SocketConnection = require("../natives/SocketConnection");

import MyArtists from "./music/myArtists";
import SearchMusic from "./music/searchMusic";

var _navigator;

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'home') {
    return (
      <Home navigator={navigationOperations} />
    );
  } else if (route.name === 'myArtists') {
    return (
      <MyArtists navigator={navigationOperations} />
    );
  } else if (route.name === 'searchMusic') {
    return (
      <SearchMusic navigator={navigationOperations} />
    );
  } else if (route.name === 'searchTracks') {
    return (
      <TrackSearch search={route.search} navigator={navigationOperations} />
    );
  } else if (route.name === 'searchAlbums') {
    return (
      <AlbumSearch search={route.search} navigator={navigationOperations} />
    );
  } else if (route.name === 'searchArtists') {
    return (
      <AlbumSearch search={route.search} navigator={navigationOperations} />
    );
  } else if (route.name === "alarms") {
    return (
      <AlarmList navigator={navigationOperations} />
    );
  }
}
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
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
    var initialRoute = {name: 'searchMusic'};
    
    let nav = null;
    var menu = <Menu pushRoute={this._push} closeMenu={this.closeMenu} logout={() => this._logout()}/>;
    return (
        <Drawer 
          content={menu}
          ref="sideMenu"
          tweenHandler={Drawer.tweenPresets.parallax}
          openDrawerOffset={100}>
          <TopMenu openMenu={this.openSideMenu} />
          <View style={this.styles.container}> 
             <Navigator
              initialRoute={initialRoute}
              configureScene={() => Navigator.SceneConfigs.FadeAndroid}
              renderScene={RouteMapper}
              ref="appNavigator" />

            <View style={this.styles.player}>
              <PlayerHeader navigator={this.props.navigator} />
            </View>
          </View>
        </Drawer>
      );
  },
  _push: function(route) {
    _navigator.push(route);
  },
  _pop: function() {
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
      marginLeft: 0 
    }
  }
});

module.exports = App;