var React = require("react-native");
import { connect } from "react-redux";

const Dimensions = require("Dimensions");
const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  TouchableOpacity
} = React;

import {Actions} from "react-native-router-flux";
import {palette} from "../Constants";
import {fetchAll as fetchAllRaspberries, selectedRaspberry} from "../actions/RaspberryActions";

const window = Dimensions.get("window");
const uri = "http://pickaface.net/includes/themes/clean/img/slide2.png";

const styles = {
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "white"
  },
  raspSelector: {
    height: 125,
    marginBottom: 20
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 125
  },
  avatarContainer: {
    marginLeft: 10,
    marginTop: 70,
  },
  avatar: {
    width: 48,
    height: 48,
    flex: 1,
    borderRadius: 24,
    backgroundColor: palette.ACCENT_COLOR,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarIcon: {
    fontSize: 48,
    color: "white"
  },
  name: {
    position: "absolute",
    color: "black",
    left: 70,
    top: 10,
    fontSize: 20
  },
  item: {
    paddingTop: 10,
    paddingBottom: 7,
    fontSize: 18,
    fontWeight: "300",
    fontFamily: "Roboto-Regular",
    color: "black"
  },
  raspberriesList: {
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd"

  },
  raspItemContainer: {
    height: 30
  },
  raspItem: {
    fontSize: 18
  },
  raspItemDown: {
    color: "#e9e9e9"
  },
  menuList: {
    marginLeft: 20
  }
};

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRaspberriesList: false
    }
  }
  componentDidMount() {
     const { dispatch, user } = this.props
    dispatch(fetchAllRaspberries(user))
  }
  renderRaspberriesList() {
    let {showRaspberriesList} = this.state;
    let {raspberries} = this.props;
    if (showRaspberriesList) {
      let raspItems = raspberries.map((rasp) => {
          console.log("===>", styles);
          let style = {...styles.raspItem};
          if (rasp.state === "DOWN")
            style = {...style, ...styles.raspItemDown};
          return (
            <TouchableOpacity
              key={rasp.name}
              onPress={() => {this._selectedPi(rasp)}} >
                <View style={styles.raspItemContainer}><Text style={style}>{rasp.name}</Text></View>
            </TouchableOpacity>
          );
        });
      return (
        <View style={styles.raspberriesList}>
          { raspItems }
        </View>
        );
    } else {
      return;
    }
  }
  render() {
    let {selectedRaspberry, raspberries} = this.props;

    return (
      <ScrollView style={styles.menu}>
        <View style={styles.raspSelector} >
          <Image style={styles.background} source={require("image!menu_background")} />
          <TouchableOpacity
            onPress={this.toogleRaspberriesList.bind(this)} >
            <View style={styles.avatarContainer}>
              <View
                style={styles.avatar} >
                <Text style={styles.avatarIcon}>J</Text>
              </View>
              <Text style={styles.name}>{(selectedRaspberry)?selectedRaspberry.name: "None"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.renderRaspberriesList()}
        <View style={styles.menuList} >
          <TouchableOpacity
            style={styles.clickable}
            onPress={this.gotoAlarms.bind(this)} >
              <Text style={styles.item}>Alarms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clickable}
            onPress={this.gotoSearchMusic.bind(this)} >
              <Text style={styles.item}>Music</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
                onPress={() => {this.gotoMyArtists() }} >
            <Text style={styles.item}>My artists</Text>
          </TouchableOpacity>
          <TouchableOpacity
                onPress={this.props.logout} >
            <Text style={styles.item}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  gotoMyArtists() {
    return;
    this.props.closeMenu();
  }
  gotoSearchMusic() {
    Actions.searchMusic();
    this.props.closeMenu();
  }
  gotoAlarms() {
    Actions.alarms();
    this.props.closeMenu();
  }
  _selectedPi(pi) {
    this.props.dispatch(selectedRaspberry(pi))
  }
  toogleRaspberriesList() {
    let {showRaspberriesList} = this.state;
    this.setState({showRaspberriesList: !showRaspberriesList});
  }
}
Menu.defaultProps = {pushRoute:function(){}};

function mapStateToProps(state) {
  const { raspberries, selectedRaspberry, user } = state
  const { items } = raspberries;
  return {
    selectedRaspberry,
    user,
    raspberries: items
  }
}

export default connect(mapStateToProps)(Menu)