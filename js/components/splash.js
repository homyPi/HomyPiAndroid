var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} = React;
var SplashScreen = React.createClass({
  render: function() {
    return (
          <View style={this.styles.container}>
            <Text>Hello</Text>
            <Text>Loading</Text>
          </View>
      );
  },
  goToMusic: function() {
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

module.exports = SplashScreen;