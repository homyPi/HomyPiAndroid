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
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: '300'
  }
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
          style={styles.clickable}
          onPress={this.gotoSearchMusic.bind(this)} >
            <Text style={styles.item}>Music</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
              onPress={this.gotoMyArtists} >
          <Text style={styles.item}>My artists</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
  gotoMyArtists() {
    console.log(this, "push route");
    this.props.pushRoute({
      name:"my artists",
      component: MyArtists
    });
    this.props.closeMenu();
  }
  gotoSearchMusic() {
    console.log(this, "push route");
    this.props.pushRoute({
      name:"search music",
      component: SearchMusic
    });
    this.props.closeMenu();
  }
}

module.exports = Menu;