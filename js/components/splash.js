var React = require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} = React;
import {connect} from "react-redux";
import Settings from "../settings";
import {loadToken} from "../actions/UserActions";

import {Actions} from "react-native-router-flux";

var SplashScreen = React.createClass({
  componentWillMount: function() {
    Settings.loadStoredServerUrl((err, url) => {
      if (url) {
        this.props.dispatch(
           loadToken()
        );
      } else {
        Actions.login();
      }
    });
  },
  render: function() {
    return (
          <View style={this.styles.container}>
            <Text>Hello</Text>
            <Text>Loading</Text>
          </View>
      );
  },
  styles: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
    },
    button: {
      alignItems: "center",
      marginBottom: 7,
      backgroundColor: "blue",
      borderRadius: 2
    },
    buttonText: {
      fontSize: 24
    }
  })
});
function map(state) {
  let {user} = state;
  return {
    user
  };
}
export default connect(map)(SplashScreen);