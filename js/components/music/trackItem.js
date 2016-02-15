import React from "react-native";
let {View, Text, StyleSheet, Image, TouchableOpacity} = React;

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
	render: function() {
		let {track, playTrack} = this.props;
		return (
			<View style={styles.container}>
				<Image style={styles.cover} source={{uri: track.album.images[0].url}} />
				<View style={styles.trackInfo}>
					<TouchableOpacity
							style={styles.trackInfo}
							onPress={ () => playTrack(track) }>
						
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
	}
});
export default  TrackItem;