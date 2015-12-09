import React from 'react-native';

import AlarmActions from '../../actions/AlarmActionCreators';

var SwitchAndroid = require('SwitchAndroid');


var {
	View,
	Text,
	StyleSheet,
	NativeModules
} = React;
var styles = {
	container: {
		flex: 1,
		flexDirection: "row"
	},
	leftContainer: {
		flex:3
	},
	date: {
		fontSize: 40
	},
	rightContainer: {
		flex: 1,
  		"alignItems": "center",
  		"justifyContent": "center"
	}
};

var toString = function(hours, minutes) {
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return hours + ":" + minutes;
}

class Alarm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showBody: false,
			enabled: props.alarm.enable
		};		
	}
	toogleBody() {
	    this.setState({showBody: !this.state.showBody});
	}
	editAlarm() {
		let {raspberry, alarm} = this.props;
		NativeModules.DateAndroid.showTimepicker(function() {}, function(hour, minute) {
			alarm.date = new Date();
			alarm.date.setHours(hour);
			alarm.date.setMinutes(minute);
	      	AlarmActions.editAlarm(raspberry, alarm);
		});
	}
	componentDidMount() {
		if (!this.props.alarm._id) {
			this.editAlarm();
		}
	}
	enable(value) {
		let {enableAlarm, alarm} = this.props;
		enableAlarm(alarm, value);
		this.setState({enabled: value});
	}
	render() {
		let {alarm} = this.props;
		console.log(alarm);
		return (
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Text style={styles.date}>{toString(alarm.hours, alarm.minutes)}</Text>
				</View>
				<View style={styles.rightContainer}>
					<SwitchAndroid
			            onValueChange={(value) => {this.enable(value)}}
			            value={this.state.enabled} />
		        
				</View>
			</View>
		);
	}
	setAlarmState(enable) {
		this.setState({alarmEnabled: enable});
	}
}

export default Alarm;