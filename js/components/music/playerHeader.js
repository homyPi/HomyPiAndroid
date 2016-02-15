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
import { getPlayer, clear, playing } from "../../actions/PlayerActions";

import PlayPause from "./PlayPause";
import Io from "../../io";
var _navigator;



var PlayerHeader = React.createClass({
	_getPlayer(raspberry) {
		if (raspberry) {
			let {user, dispatch} = this.props;
			dispatch(getPlayer(user, raspberry));
		}
	},
	componentDidMount() {
		let {dispatch} = this.props;
		subscribe(this._getPlayer);
		Io.socket.on("playlist:playing:id", data => {
			if (data.raspberry === this.props.player.name)
				dispatch(playing(data.track))

		});
		Io.socket.on("playlist:track:clear", data => {
			if (data.raspberry === this.props.player.name)
			    dispatch(clear(data));
		});
		
	},
	componentWillUnmount() {
		unsubscribe(this._getPlayer);

		Io.off("playlist:playing:id");
		Io.off("playlist:track:clear");
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
            name: "player",
        });
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