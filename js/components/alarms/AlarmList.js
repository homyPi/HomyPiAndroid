import React from 'react-native';

var {
	View,
	StyleSheet
} = React;
import Alarm from "./Alarm";

var styles = new StyleSheet({
	container: {
		flex: 1
	}
});

class AlarmList extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Alarm alarm={{enable: true, date: "09:20"}}/>
			</View>
		);
	}

}

export default AlarmList;