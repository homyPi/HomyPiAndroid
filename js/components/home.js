var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} = React;
var Home = React.createClass({
  render: function() {
    return (
          <View style={this.styles.container}>
            <View style={this.styles.status}>
              <Text style={this.styles.status}>Raspberry status: </Text><Text style={[this.styles.statusOk, this.styles.status]}>GREEN</Text>
            </View>
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
      backgroundColor: '#FAFAFA',
    },
    status: {
      flexDirection: 'row'
    },
    statusOk: {
      color: "green"
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

module.exports = Home;