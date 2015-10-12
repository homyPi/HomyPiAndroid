var React = require('react-native');
var {
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator
} = React;
var PlayerFull = require("./playerFull");
var PlayerHeader = React.createClass({
	render: function() {
		return (
			<View style={this.styles.container}>
				<TouchableHighlight
				style={this.styles.coverContainer}
	              onPress={this._showPlayer} >
					<Image
				        style={this.styles.cover}
	              		resizeMode={Image.resizeMode.contain}
				        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />

				</TouchableHighlight>
					<View style={this.styles.trackInfo}>
						<Text style={this.styles.trackName}>track name</Text>
						<Text style={this.styles.artists}>a1, a2</Text>
					</View>
			</View>
		);
	},
	_showPlayer: function() {
		this.props.navigator.push({
            name: 'player',
            component: PlayerFull,
            animation: Navigator.SceneConfigs.FloatFromBottom
        });
	},
	styles: StyleSheet.create({
		container: {
			alignItems: "center",
			flex: 1,
			flexDirection: "row",
			backgroundColor: "#263238"
		},
		coverContainer: {
			flex: 0.15,
			height: 50
		},
		cover: {
			height: 50
		},
		trackInfo: {
			flex: 0.5,
			flexDirection: "column",
			alignSelf: "center"
		},
		trackName: {
			color: "#4CAF50",
			fontSize: 19,
			flex: 0.5
		},
		artists: {
			color: "#4CAF50",
			fontSize: 15,
			flex: 0.5
		}
	})
});




module.exports = PlayerHeader;