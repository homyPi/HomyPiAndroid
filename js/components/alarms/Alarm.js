import React from 'react-native';

var SwitchAndroid = require('SwitchAndroid');

var {
	View,
	Text,
	StyleSheet
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
		flex: 1
	}
};

class Alarm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alarmEnabled: this.props.alarm.enable
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Text style={styles.date}>{this.props.alarm.date}</Text>
				</View>
				<View style={styles.rightContainer}>
					<SwitchAndroid
			            onValueChange={(value) => this.setAlarmState(value)}
			            value={this.state.alarmEnabled} />
		        
				</View>
			</View>
		);
	}
	setAlarmState(enable) {
		this.setState({alarmEnabled: enable});
	}
}
Alarm.defaultProps = {
	alarm: {enable: false}
}

export default Alarm;