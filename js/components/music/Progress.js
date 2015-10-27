var React = require('react-native');
var {
  StyleSheet,
  View
} = React;
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');


class Progress extends React.Component {
	constructor(props) {
		super(props);
		this.state = {progress: 20}
	}
	setTouch(e) {
	 	return true;
	}
	updateProgress(evt) {
		console.log("press");
		console.log(evt.nativeEvent);
		var x = evt.nativeEvent.locationX;

		this.setState({progress: Math.round(x/ (window.width - 10)*100)})
	}

	render() {
		this.styles = StyleSheet.create({
			progress: {
				marginLeft: 10,
				height: 40,
				width: window.width - 20,
				paddingTop: 18
			},
			backgroundBar: {
				position: "absolute",
				backgroundColor: "#616161",
				height: 2,
				marginTop: 2,
				width: window.width - 20

			},
			progressBar: {
				position: "absolute",
				backgroundColor: "#8BC34A",
				height: 6,
				width: (window.width - 20)*(this.state.progress/100)
			}
		});
		return (
			<View style={this.styles.progress}
				onStartShouldSetResponder={this.setTouch}
				onMoveShouldSetResponder={this.setTouch}
				onResponderRelease={(evt) => {this.updateProgress(evt)}} >
				<View style={this.styles.backgroundBar}></View>
				<View style={this.styles.progressBar}>
				</View>
			</View>
		);
	}
}

export default Progress;