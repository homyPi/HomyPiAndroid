var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Navigator
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



var App = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState() {
    return {}
  },
  componentWillMount: function() {
    //SocketConnection.addListenerOn = this.addListenerOn;
    //this.addListenerOn(RCTDeviceEventEmitter, "socketService:binded", function() {
      Io.connect(UserApi.getToken());
    //});
  },
  render: function() {
    var initialRoute = {name: 'home', component: Home, index: 1};
    
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
              renderScene={(route, navigator) => {
                  nav = navigator;
                  if (route.component) {
                    return React.createElement(route.component, { navigator });
                  } else {
                    return (<Text> {JSON.stringify(route)}</Text>);
                  }
                }  
              } 
            ref="appNavigator" />

            <View style={this.styles.player}>
              <PlayerHeader navigator = {this.props.navigator} />
            </View>
          </View>
        </Drawer>
      );
  },
  _push: function(route) {
    this.refs.appNavigator.push(route);
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