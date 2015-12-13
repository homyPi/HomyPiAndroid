import React from 'react-native';
import {MKButton} from 'react-native-material-kit';

var RefreshableListView = require('react-native-refreshable-listview')

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import RaspberryStore from '../../stores/RaspberryStore';
import AlarmStore from '../../stores/AlarmStore';
import AlarmActions from '../../actions/AlarmActionCreators';

import Alarm from "./Alarm";


var {
	View,
	StyleSheet,
	Text,
	ListView,
	PullToRefreshViewAndroid,
	NativeModules
} = React;
var styles = new StyleSheet({
	container: {
		flex: 1,
		height: (175),
    	backgroundColor: '#CCCCCC'
	}
});

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
		let ds = new ListView.DataSource({
			rowHasChanged: function (r1, r2) {
				return true;
			}
		});
		let alarms = AlarmStore.getAll().alarms;
		this.state = {
			raspberry: RaspberryStore.getAll().selectedRaspberry,
			alarms: alarms,
			alarmsDs: ds.cloneWithRows(alarms),
			refreshing: false
		};

		this._onAlarmsChanged = () => {
			let alarms = AlarmStore.getAll().alarms;
			this.setState({
				alarms: alarms,
				alarmsDs: this.state.alarmsDs.cloneWithRows(alarms),
				isRefreshing: false
			});
		}
		this._raspberryChanged = () => {
			this.setState({raspberry: RaspberryStore.getAll().selectedRaspberry});
			this._loadAlarms();
		}
		this.enableAlarm = (alarm, value) => {
			AlarmActions.enableAlarm(alarm, value);
		}
		this._loadAlarms = ()  => {
			let {raspberry} = this.state;
			if (raspberry) {
    			AlarmActions.loadAlarms(raspberry);
    			this.setState({isRefreshing: true});
			}
		}
	}
	componentDidMount() {
		AlarmStore.addChangeListener(this._onAlarmsChanged)
		RaspberryStore.addChangeListener(this._raspberryChanged);
		this._loadAlarms();
	}
	componentWillUnmount() {
		AlarmStore.removeChangeListener(this._onAlarmsChanged)
		RaspberryStore.removeChangeListener(this._raspberryChanged);
	}
	render() {
		let {raspberry, alarms, alarmsDs} = this.state;
		return (
			
			<View style={styles.container}>
			    <PullToRefreshViewAndroid
			  	  style={styles.container}
			  	  refreshing={this.state.isRefreshing}
			  	  onRefresh={this._loadAlarms} >
					<ListView
					  dataSource={alarmsDs}
					  renderRow={(alarm) => <Alarm key={alarm._id} raspberry={raspberry} alarm={alarm} enableAlarm={this.enableAlarm}/>}/>
				</PullToRefreshViewAndroid>
				<ColoredFab
  					onPress={() => {this._addAlarm()}}>
					<Text> + </Text>
				</ColoredFab>
			</View>
		);
	}
	_addAlarm() {
	    let {raspberry} = this.state;
	    NativeModules.DateAndroid.showTimepicker(function() {}, function(hour, minute) {
			let alarm = {hours: hour, minutes: minute, enable: true, repeat: false};
	    	alarm.date = new Date();
			alarm.date.setHours(hour);
			alarm.date.setMinutes(minute);
	    	AlarmActions.addAlarm(raspberry, alarm);
		});
	}

}

export default AlarmList;