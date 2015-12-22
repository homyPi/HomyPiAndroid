var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} = React;
import UserAPI from "../apis/UserAPI";
import Settings from "../settings";
import UserStore from "../stores/UserStore";
import RouterActions from "../actions/RouterActionCreator";
import {MKTextField, MKButton} from "react-native-material-kit";

import Home from "./home";

var styles = new StyleSheet({
  textfieldWithFloatingLabel: {
    height: 38,  // have to do it on iOS
    marginTop: 10,
  }
})

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
      url: serverurl,
      username: "",
      password: "",
      res: ""
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
    return (
          <View style={this.styles.container}>
          <Textfield 
          value={this.state.url}
          onChangeText={
            (text) => {
              console.log("valid? :", Settings.isValidUrl(text));
              this.setState({url: text, urlValid: Settings.isValidUrl(text)})
            }
          }/>
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
            <Text>res = {this.state.res}</Text>
          </View>
      );
  },
  _login: function() {
    Settings.setServerUrl(this.state.url);
    this.setState({res: "sending req to " + this.state.url});
      try {
	    UserAPI.login(this.state.username, this.state.password).then(function(token) {
        
          console.log(this.props);
        if (token) {
          this.props.onLoggedIn();
        } else {
        }
	    }.bind(this)).catch(function(error) {
	      this.setState({res: JSON.stringify(error)});
	    });
    } catch (e) {console.log(e); this.setState({res: JSON.stringify(e)});}
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

module.exports = Login;