import React from "react-native";

import {MKButton, MKColor} from "react-native-material-kit";

var SwitchAndroid = require("SwitchAndroid");

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

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
	alarmBody: {
		height: 100
	},
	deleteButton: {
		width: 50,
		height: 30
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
	},
	separator: {
		width: window.width,
		height: 1,
		backgroundColor: "#e9e9e9"
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
const ColoredRaisedButton = MKButton.coloredButton()
  .withText("Delete")
  .withOnPress(() => {})
  .build();


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
		let {alarm, deleteAlarm} = this.props;
		console.log(this.props);
		return (
			<View style={styles.alarmBody} >
				{/*<MKButton
				  backgroundColor={MKColor.Teal}
				  shadowRadius={2}
				  shadowOffset={{width:0, height:2}}
				  shadowOpacity={.7}
				  shadowColor="black"
				  onPress={() => {
				    deleteAlarm(alarm)
				  }}
				  style={styles.deleteButton}
				  >
				  <Text pointerEvents="none"
				        style={{color: "white", fontWeight: "bold"}}>
				    Delete
				  </Text>
				</MKButton>*/}
				<ColoredRaisedButton onPress={() => {
				    deleteAlarm(alarm)
				  }} />
			</View>
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
				<View style={styles.separator}></View>
			</View>
		);
	}
	setAlarmState(enable) {
		this.setState({alarmEnabled: enable});
	}
}

export default Alarm;