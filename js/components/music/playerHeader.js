var React = require("react-native");
var {
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator
} = React;

import { connect } from "react-redux";
import {subscribe, unsubscribe} from "../../onSelectedRaspberryChange";

import PlayPause from "./PlayPause";
import Io from "../../io";
var _navigator;



var PlayerHeader = React.createClass({
	getInitialState() {
		return {showPlayerPause: true}
	},
	componentDidMount() {
		
	},
	componentWillUnmount() {
	},
	render: function() {
		let {
			player,
			playing
		} = this.props;
		return (
					<View style={this.styles.container}>
						<TouchableHighlight
						  style={this.styles.coverContainer}
			              onPress={this._showPlayer} >
							<Image
						        style={this.styles.cover}
			              		resizeMode={Image.resizeMode.contain}
						        source={{uri: playing.album.images[0].url}} />

						</TouchableHighlight>
						<TouchableHighlight
						  style={this.styles.trackInfoHighlight}
			              onPress={this._showPlayer} >
							<View style={this.styles.trackInfo}>
								<Text numberOfLines={1} style={this.styles.trackName}>{playing.name}</Text>
								<Text numberOfLines={1} style={this.styles.artists}>{playing.artists.map(function(artist) { return (artist.name + "; ")})}</Text>
							</View>
						</TouchableHighlight>
						{(this.state.showPlayerPause)?<PlayPause dispatch={this.props.dispatch} player={player} style={{}} styleImg={{width:35, height:35}} />: null}
					</View>
		);
	},
	_showPlayer: function() {
		this.setState({showPlayerPause: false});
		this.props.navigator.push({
            name: "player",
            onClosing: this.playerClosed.bind(this)
        });
	},
	playerClosed() {
		this.setState({showPlayerPause: true});
	},
	styles: StyleSheet.create({
		container: {
			height: 50,
			alignItems: "center",
			flexDirection: "row",
			backgroundColor: "#263238",
			paddingLeft: 0
		},
		coverContainer: {
			flex: 0.15
		},
		cover: {
			height: 50,
			width: 50,
			justifyContent: "flex-start"
		},
		trackInfoHighlight: {
			flex: 0.5,
			alignSelf: "center"
		},
		trackInfo: {
			flexDirection: "column"
		},
		trackName: {
			color: "#4CAF50",
			fontSize: 14,
			flex: 0.5
		},
		artists: {
			color: "#4CAF50",
			fontSize: 15,
			flex: 0.5
		}
	})
});


function mapStateToProps(state) {
  const { player, playlist, user } = state
  return {
  	user,
  	player,
  	playing: playlist.playing
  }
}

export default connect(mapStateToProps)(PlayerHeader)