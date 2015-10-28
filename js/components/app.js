var React = require('react-native');
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
var Home = require("./music/searchMusic");
var PlayerHeader = require("./music/playerHeader");
var Drawer = require('react-native-drawer')
var Menu = require("./menu");
var TopMenu = require("./topMenu");
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
var Io = require("../io");
import Subscribable from "Subscribable";
var UserApi = require("../apis/UserAPI");

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
  } else if (route.name === 'player') {
    return (
      <PlayerFull navigator={navigationOperations} />
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
    //SocketConnection.addListenerOn = this.addListenerOn;
    //this.addListenerOn(RCTDeviceEventEmitter, "socketService:binded", function() {
      Io.connect(UserApi.getToken());
    //});

  },
  componentWillUnmount: function() {

  },

  render: function() {
    var initialRoute = {name: 'home'};
    
    let nav = null;
    var menu = <Menu pushRoute={this._push} closeMenu={this.closeMenu} />;
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
    _navigator.push({name: route});
    console.log("routes = ", this.refs.appNavigator.getCurrentRoutes());
  },
  _pop: function() {
    console.log("pop => ", _navigator.getCurrentRoutes());
    //_navigator.pop();
  },
  openSideMenu: function() {
    this.refs.sideMenu.open();
  },
  closeMenu: function() {
    this.refs.sideMenu.close()
  },
  styles: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAFAFA'
    },
    player: {
      height: 65
    }
  })
});

module.exports = App;