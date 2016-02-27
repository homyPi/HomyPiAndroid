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
  BackAndroid,
  Image,
  Animated
} = React;
import {PLAYER_HEADER_HEIGHT} from "../Constants";

import FrontComponent from "./FrontComponent";

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

var App = React.createClass({
  getInitialState() {
    return {
      frontComponents: []
    }
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

            <AppRoutes route={this.props.route} 
              addFrontComponent={(component, zIndex)=> this.addFrontComponent(component, zIndex)}
              removeFrontComponent={(component)=> this.removeFrontComponent(component)} />
            
            <View style={{position: "absolute", top: 0, left: 0}}>
              {this.state.frontComponents.map(component => (component))}
            </View>
            <View style={this.styles.player}>
              <PlayerHeader />
            </View>
          </View>
        </Drawer>
      );
  },
  addFrontComponent: function(component, zIndex) {
    if (!component) return;
    var key = "xxxxxxxx-xxxx-4xxx".replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == "x" ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    var frontComponents = this.state.frontComponents;
    frontComponents.push(<FrontComponent key={key} component={component} zIndex={zIndex || 0} />);
    frontComponents.sort((a,b) => {
      if (a.props.zIndex > b.props.zIndex)
        return 1;
      if (a.props.zIndex < b.props.zIndex)
        return -1;
      return 0;
    });
    this.setState({frontComponents});
  },
  removeFrontComponent: function(component) {
    
    var index = this.state.frontComponents.find(fc => {
      return (fc.props.component == component)
    });
    if (index === -1) return;
    this.state.frontComponents.splice(index, 1);
    this.setState({frontComponents: this.state.frontComponents});
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
      height: PLAYER_HEADER_HEIGHT,
      backgroundColor: "#263238",
      marginLeft: 0,
      elevation: 16
    }
  }
});

module.exports = App;