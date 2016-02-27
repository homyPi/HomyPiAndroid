import React from "react-native";
import { connect } from "react-redux";
import {subscribe, unsubscribe} from "../../onSelectedRaspberryChange";
import {fetchAll, setEnable, addAlarm, removeAlarm} from "../../actions/AlarmActions";

import {MKButton} from "react-native-material-kit";

var RefreshableListView = require("react-native-refreshable-listview")

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");


import Alarm from "./Alarm";


var {
	View,
	StyleSheet,
	Text,
	ListView,
	PullToRefreshViewAndroid,
	NativeModules
} = React;
var styles = {
	container: {
		flex: 1,
		height: (175),
    	backgroundColor: "#CCCCCC"
	}
};

const ColoredFab = MKButton.coloredFab()
  .withStyle({
		position: "absolute",
		right: 5,
		top: window.height - 180,
		bottom: 0
	})
  .build();

class AlarmList extends React.Component {
	constructor(props) {
		super(props);
		this.alarmsDs = new ListView.DataSource({
			rowHasChanged: function (r1, r2) {
				return true;
			}
		});
		this.enableAlarm = (alarm, value) => {
			let {user, dispatch} = this.props;
			dispatch(setEnable(user, alarm, value));
		}
		this.deleteAlarm = alarm => {
			let {user, dispatch} = this.props;
			dispatch(removeAlarm(user, alarm))
		}
		this._loadAlarms = (raspberry)  => {
			let {selectedRaspberry, dispatch, user, isFetching} = this.props;
			if ((raspberry || selectedRaspberry) && !isFetching) {
    			dispatch(fetchAll(user, (raspberry || selectedRaspberry)));
			}
		}
	}
	componentDidMount() {
		this._loadAlarms();
	}
	componentWillReceiveProps(nextProps) {
		
		if (nextProps.selectedRaspberry != this.props.selectedRaspberry) {
			this._loadAlarms(nextProps.selectedRaspberry);
		}
	}
	render() {
		let {selectedRaspberry, alarms, isFetching} = this.props;
		let alarmsDs = this.alarmsDs.cloneWithRows(alarms);
		return (
			
			<View style={styles.container}>
			    <PullToRefreshViewAndroid
			  	  style={styles.container}
			  	  refreshing={isFetching}
			  	  onRefresh={this._loadAlarms} >
					<ListView
					  dataSource={alarmsDs}
					  renderRow={(alarm) => <Alarm key={alarm._id} raspberry={selectedRaspberry} alarm={alarm} enableAlarm={this.enableAlarm} deleteAlarm={this.deleteAlarm}/>} />
				</PullToRefreshViewAndroid>
				<ColoredFab
  					onPress={() => {this._addAlarm()}}>
					<Text> + </Text>
				</ColoredFab>
			</View>
		);
	}
	_addAlarm() {
	    let {selectedRaspberry, dispatch, user} = this.props;
	    NativeModules.DateAndroid.showTimepicker(function() {}, function(hour, minute) {
			let alarm = {hours: hour, minutes: minute, enable: true, repeat: false};
	    	alarm.date = new Date();
			alarm.date.setHours(hour);
			alarm.date.setMinutes(minute);
	    	dispatch(addAlarm(user, selectedRaspberry, alarm));
		});
	}

}
function mapStateToProps(state) {
  const { alarms, selectedRaspberry, user } = state
  const { items } = alarms
  return {
  	user,
  	selectedRaspberry,
  	...alarms,
    alarms: items
  }
}

export default connect(mapStateToProps)(AlarmList)