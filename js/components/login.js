var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} = React;
import { connect } from 'react-redux';
import Settings from "../settings";
import {MKTextField, MKButton} from "react-native-material-kit";
import {login as requestLogin} from "../actions/UserActions";

import Home from "./home";

var styles = {
  textfieldWithFloatingLabel: {
    height: 38,  // have to do it on iOS
    marginTop: 10,
  }
};

const Textfield = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Server Url')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();

const LoginButton = MKButton.coloredButton()
  .withText('Login')
  .build();

var Login = React.createClass({
  getInitialState() {
    var serverurl = Settings.getServerUrl()
    return {
      urlValid: Settings.isValidUrl(serverurl),
      url: serverurl
    }
  },
  componentDidMount() {
    Settings.loadStoredServerUrl((err, serverurl) => {
      this.setState({
        urlValid: Settings.isValidUrl(serverurl),
        url: serverurl
      });
    });
  },
  render: function() {
    let {user} = this.props;
    let status = "Idle";
    if (user.isFetching) {
      status = "Fetching";
    } else if(user.hasFailed) {
      status = user.error;
    } else if (user.token) {
      status = "got token: for " + " with" + user.token;
    }
    return (
          <View style={this.styles.container}>
          <Textfield 
          value={this.state.url}
          onChangeText={
            (text) => {
              console.log("valid? :", Settings.isValidUrl(text));
              this.setState({url: text, urlValid: Settings.isValidUrl(text)})
            }
          } />
            <TextInput
              onChangeText={(text) => this.setState({username: text})}
              value={this.state.username}/>

            <TextInput
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}/>
            {/*<TouchableHighlight
              style={this.styles.button}
              onPress={this._login} >
              <Text style={this.styles.buttonText}>Login {this.state.valid}</Text>
            </TouchableHighlight>*/}
            <LoginButton
              enabled={this.state.urlValid && (this.state.username != "") && (this.state.password != "")}
              onPress={this._login} />
            <Text>Status = {status}</Text>
          </View>
      );
  },
  _login: function() {
    Settings.setServerUrl(this.state.url);
    let {username, password} = this.state;
    this.props.dispatch(requestLogin(username, password, this.props.onLoggedIn));
  },
  styles: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    button: {
      alignItems: 'center',
      marginBottom: 7,
      backgroundColor: "blue",
      borderRadius: 2
    },
    buttonText: {
      fontSize: 24
    }
  })
});
function mapStateToProps(state) {
  let {user} = state;
  return {
    user
  }
}

export default connect(mapStateToProps)(Login)