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
var Home = require("./home");
var PlayerHeader = require("./music/playerHeader");
var SideMenu = require('react-native-side-menu');
var Menu = require("./menu");
var TopMenu = require("./topMenu");

var App = React.createClass({
  getInitialState() {
    return {}
  },
  render: function() {
    var initialRoute = {name: 'home', component: Home, index: 1};
    
    let nav = null;
    var menu = <Menu pushRoute={this._push.bind(this)} />;
    return (
        <SideMenu menu={menu} ref="sideMenu">
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
        </SideMenu>
      );
  },
  _push: function(route) {
    this.refs.appNavigator.push(route);
  },
  openSideMenu: function() {
    console.log(this.refs.sideMenu);
  },
  styles: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    player: {
      height: 65
    }
  })
});

module.exports = App;