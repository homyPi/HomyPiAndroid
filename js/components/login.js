var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} = React;
var UserAPI = require("../apis/UserAPI");
var UserStore = require("../stores/UserStore");
var RouterActions = require("../actions/RouterActionCreator");

var Home = require("./home");

var Login = React.createClass({
  getInitialState() {
    return {
      username: "",
      password: "",
      res: ""
    }
  },
  render: function() {
    return (
          <View style={this.styles.container}>
            <TextInput
              onChangeText={(text) => this.setState({username: text})}
              value={this.state.username}/>

            <TextInput
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}/>
            <TouchableHighlight
              style={this.styles.button}
              onPress={this._login} >
              <Text style={this.styles.buttonText}>Login</Text>
            </TouchableHighlight>
            <Text>res = {this.state.res}</Text>
          </View>
      );
  },
  _login: function() {
    this.setState({res: "sending req"});
      try {
	    UserAPI.login(this.state.username, this.state.password).then(function(token) {
        this.setState({res: token});
        if (token) {
          this.props.navigator.push({
            name: 'home',
            component: Home
        });
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