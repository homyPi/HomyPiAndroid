var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} = React;

var PlayerFull = React.createClass({
	render: function() {
		return (
			<View style={this.styles.container}>
				<View style={this.styles.viewActions}>
					<TouchableHighlight
					style={this.styles.viewActionsButtons}
		              onPress={this.props.navigator.pop} >
						<Image
				        style={this.styles.hidePlayer}
	              		resizeMode={Image.resizeMode.contain}
				        source={{uri: 'https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-512.png'}} />
					</ TouchableHighlight>
					
				</View>
				<Image
			        style={this.styles.cover}
              		resizeMode={Image.resizeMode.contain}
			        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
				<View style={this.styles.trackInfo}>
					<Text style={this.styles.trackName}>track name</Text>
					<Text style={this.styles.artists}>a1, a2</Text>
				</View>
				<View style={this.styles.playerActions}>
					<Image
				        style={this.styles.previous}
	              		resizeMode={Image.resizeMode.contain}
				        source={{uri: 'https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-512.png'}} />
					<Image
				        style={this.styles.playPause}
	              		resizeMode={Image.resizeMode.contain}
				        source={{uri: 'http://www.datavideo.us/wp-content/plugins/youtube-simplegallery/img/play.png'}} />
					<Image
				        style={this.styles.next}
	              		resizeMode={Image.resizeMode.contain}
				        source={{uri: 'https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-512.png'}} />
					
				</View>
			</View>
		);
	},
	styles: StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: "#263238"
		},
		viewActions: {
			flex: 0.1,
			flexDirection: "row"
		},
		viewActionsButtons: {
			flex: 0.5,
			alignSelf: 'flex-start',
			alignItems: 'flex-start'
		},
		hidePlayer: {
			height: 50,
			width: 75,
			justifyContent: "flex-start",
			transform: [{rotate: "-90deg"}],
		},
		cover: {
			flex: 0.6
		},
		trackInfo: {
			flex: 0.10,
			flexDirection: "column",
			alignSelf: "center",
			alignItems: "center"
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
		},
		playerActions: {
			flex: 0.2,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center"
		},
		playPause: {
			flex: 0.5,
			alignSelf: "center",
			justifyContent: "center",
			height: 75,
			color: "#ffffff"
		},
		previous: {
			flex: 0.25,
			alignSelf: "center",
			justifyContent: "center",
			height: 50,
			color: "#ffffff"
		},
		next: {
			flex: 0.25,
			alignSelf: "center",
			justifyContent: "center",
			height: 50,
			transform: [{rotate: "180deg"}],
			color: "#ffffff"
		}

	})
});




module.exports = PlayerFull;