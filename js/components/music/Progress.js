var React = require("react-native");
var {
  StyleSheet,
  View
} = React;
const Dimensions = require("Dimensions");
const window = Dimensions.get("window");


class Progress extends React.Component {
    constructor (props) {
        super(props);
        this.percentage = 100;
    }
	setTouch(e) {
	 	return true;
	}
	handleSeekTrack(e) {
        let { onSeekTrack} = this.props;
        const xPos = (e.nativeEvent.locationX - 10) / (window.width - 20);
        let value = Math.round(xPos * this.props.max);
        
        onSeekTrack && onSeekTrack.call(this, value, e);
    }

	render() {
        let { value, min, max } = this.props;

        if (value < min ) {
            value = min;
        }

        if (value > max) {
            value = max;
        }
        this.percentage = (value*100) / max;
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
				width: (window.width - 20)*(this.percentage/100)
			}
		});
		return (
			<View style={this.styles.progress}
				onStartShouldSetResponder={this.setTouch}
				onMoveShouldSetResponder={this.setTouch}
				onResponderRelease={(evt) => {this.handleSeekTrack(evt)}} >
				<View style={this.styles.backgroundBar}></View>
				<View style={this.styles.progressBar}>
				</View>
			</View>
		);
	}
}

Progress.defaultProps = {
    value: 0,
    min:0,
    max: 100
};

export default Progress;