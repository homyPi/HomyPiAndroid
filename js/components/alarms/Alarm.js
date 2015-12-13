import React from 'react-native';

import AlarmActions from '../../actions/AlarmActionCreators';

var SwitchAndroid = require('SwitchAndroid');


var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	NativeModules
} = React;
var styles = {
	container: {
		flex: 1,
		flexDirection: "column"
	},
	header: {
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
			showBody: false
		};		
	}
	toogleBody() {
	    this.setState({showBody: !this.state.showBody});
	}
	editAlarm() {
		let {raspberry, alarm} = this.props;
		
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
	getBody() {
		let {alarm} = this.props;
		return (
			<Text>Body!!</Text>
		)
	}
	render() {
		let {alarm} = this.props;
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={()=>{this.toogleBody()}} >
					<View style={styles.header}>
						<View style={styles.leftContainer}>
							<Text style={styles.date}>{toString(alarm.hours, alarm.minutes)}</Text>
						</View>
						<View style={styles.rightContainer}>
							<SwitchAndroid
					            onValueChange={(value) => {this.enable(value)}}
					            value={alarm.enable} />
						</View>
					</View>
				</TouchableOpacity>
				<View>
					{(this.state.showBody)? this.getBody():null}
				</View>
			</View>
		);
	}
	setAlarmState(enable) {
		this.setState({alarmEnabled: enable});
	}
}

export default Alarm;