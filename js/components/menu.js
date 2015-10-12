var React = require('react-native');

const Dimensions = require('Dimensions');
const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  TouchableHighlight
} = React;

import MyArtists from "./music/myArtists";
var SearchMusic = require("./music/searchMusic");

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends Component {
  render() {
    return (
      <ScrollView style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>Your name</Text>
        </View>

        <TouchableHighlight
              onPress={this.gotoSearchMusic.bind(this)} >
            <Text style={styles.item}>Music</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
              onPress={this.gotoMyArtists.bind(this)} >
          <Text style={styles.item}>My artists</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
  gotoMyArtists() {
    this.props.pushRoute({
      name:"my artists",
      component: MyArtists
    });
    this.context.menuActions.toggle();
  }
  gotoSearchMusic() {
    this.props.pushRoute({
      name:"search music",
      component: SearchMusic
    });
    this.context.menuActions.toggle();
  }
}
Menu.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

module.exports = Menu;