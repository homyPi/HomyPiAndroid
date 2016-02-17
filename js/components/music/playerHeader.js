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

import {PLAYER_HEADER_HEIGHT} from "../../Constants";

import PlayPause from "./PlayPause";
import Io from "../../io";
var _navigator;



var PlayerHeader = React.createClass({
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
						<PlayPause dispatch={this.props.dispatch} player={player} style={{}} styleImg={{width:35, height:35}} />
					</View>
		);
	},
	_showPlayer: function() {
		this.props.navigator.push({
            name: "player"
        });
	},
	styles: StyleSheet.create({
		container: {
			height: PLAYER_HEADER_HEIGHT,
			alignItems: "center",
			flexDirection: "row",
			backgroundColor: "#263238",
			paddingLeft: 0
		},
		coverContainer: {
			flex: 0.15
		},
		cover: {
			height: PLAYER_HEADER_HEIGHT,
			width: PLAYER_HEADER_HEIGHT,
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