import React from "react-native";
let {View, Text, StyleSheet, Image, TouchableOpacity} = React;

import Io from '../../io';
import PlayerStore from '../../stores/PlayerStore';

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: 'flex-start',
    	flexDirection: 'row',
    	height: 55
	},
	trackInfo: {
		flex: 1,
    	flexDirection: 'column'
	},
	cover: {
		width: 50,
    	height: 50,
    	marginRight: 10
	},
	title: {
		flex:1,
		fontSize: 16
	},
	trackData: {
		flex: 1,
    	flexDirection: 'row'
	},
	artistsNames: {
		flex: 1,
		fontSize: 12
	}
});

let TrackItem = React.createClass({
	_onPlayerChange() {
		this.player = PlayerStore.getAll().selected;
	},
	componentDidMount() {
		PlayerStore.addChangeListener(this._onPlayerChange);
		this.player = PlayerStore.getAll().selected;
	},
	componentWillUnmount() {
	    PlayerStore.removeChangeListener(this._onPlayerChange);
	},
	render: function() {
		let {track} = this.props;
		return (
			<View style={styles.container}>
				<Image style={styles.cover} source={{uri: track.album.images[0].url}} />
				<View style={styles.trackInfo}>
					<TouchableOpacity
							style={styles.trackInfo}
							onPress={this._playTrack}>
						
						<Text style={styles.title}>{track.name}</Text>
						<View style={styles.trackData}>
							<Text style={styles.artistsNames}>{
								track.artists.map(artist => {
									return artist.name + ";";
								})
							}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	},
	_playTrack: function() {
		if(!this.player) return;
		Io.socket.emit("player:play:track", {player: {name: this.player.name}, "track": {"source": "spotify", "uri": this.props.track.uri}});
	}
});
export default  TrackItem;