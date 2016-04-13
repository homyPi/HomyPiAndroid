var React = require("react-native");
var {
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  View
} = React;

import {Actions} from "react-native-router-flux";

import { connect } from "react-redux";
import {subscribe, unsubscribe} from "../../onSelectedRaspberryChange";

import {PLAYER_HEADER_HEIGHT, palette} from "../../Constants";

import PlayPause from "./PlayPause";
import Io from "../../io";



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
	              {(playing.album && playing.album.images && playing.album.images.length)? (
					<Image
				        style={this.styles.cover}
	              		resizeMode={Image.resizeMode.contain}
				        source={{uri: playing.album.images[0].url}} />
				    ):null}
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
		Actions.player();
	},
	styles: StyleSheet.create({
		container: {
			height: PLAYER_HEADER_HEIGHT,
			alignItems: "center",
			flexDirection: "row",
			backgroundColor: palette.PLAYER_BACKGROUND,
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
			alignSelf: "center",
            backgroundColor: "white"
		},
		trackInfo: {
			flexDirection: "column"
		},
		trackName: {
			color: palette.PRIMARY_TEXT_COLOR,
			fontFamily: "RobotoCondensed-Bold",
			fontSize: 14,
			flex: 0.5
		},
		artists: {
			color: palette.PRIMARY_TEXT_COLOR,
			fontFamily: "Roboto-Thin",
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
