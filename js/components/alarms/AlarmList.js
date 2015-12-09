import React from 'react-native';
import {MKButton} from 'react-native-material-kit';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import RaspberryStore from '../../stores/RaspberryStore';
import AlarmStore from '../../stores/AlarmStore';
import AlarmActions from '../../actions/AlarmActionCreators';

import Alarm from "./Alarm";


var {
	View,
	StyleSheet,
	Text
} = React;
var styles = new StyleSheet({
	container: {
		flex: 1,
		height: (window.height - 75)
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
		this.state = {
			raspberry: RaspberryStore.getAll().selectedRaspberry,
			alarms: AlarmStore.getAll().alarms
		};

		this._onAlarmsChanged = () => {
			this.setState({alarms: AlarmStore.getAll().alarms});
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
			}
		}
		this._loadAlarms();
	}
	componentDidMount() {
		AlarmStore.addChangeListener(this._onAlarmsChanged)
		RaspberryStore.addChangeListener(this._raspberryChanged);
	}
	componentWillUnmount() {
		AlarmStore.removeChangeListener(this._onAlarmsChanged)
		RaspberryStore.removeChangeListener(this._raspberryChanged);
	}
	render() {
		let {raspberry, alarms} = this.state;
		return (
			<View style={styles.container}>
				{alarms.map((alarm) => {
					return (<Alarm key={alarm._id} raspberry={raspberry} alarm={alarm} enableAlarm={this.enableAlarm}/>);
				})}
				<ColoredFab
  					onPress={() => {this._addAlarm()}}>
					<Text> + </Text>
				</ColoredFab>
			</View>
		);
	}
	_addAlarm() {
	    let {raspberry} = this.state;
	    AlarmActions.addAlarm(raspberry, {hours: 8, minutes:0});
	}

}

export default AlarmList;