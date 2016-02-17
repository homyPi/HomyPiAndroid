import React from "react-native";

var {
	View,
	ScrollView,
	Image,
	Text,
	StyleSheet,
	TouchableWithoutFeedback
} = React;
import Io from "../../io";
import Track from "./trackItem";

import {PLAYER_HEADER_HEIGHT} from "../../Constants";

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	flexDirection: "column"
	},
	coverContainer: {
		flex: 1,
    	alignItems: "center",
    	marginBottom: 40
	},
	cover: {
		width: (window.width),
		height: (3*window.height/5)
	},
	playContainer: {
		position: "absolute",
		width: 50,
		height: 50,
		backgroundColor: "red",
		top: (3*window.height/5)-25,
		left: (window.width-75)
	},
	albumInfo: {
		marginLeft: 15,
		marginRight: 10,
		marginBottom: 25
	},
	albumName: {
		fontSize: 30
	},
	artistName: {
		fontSize: 20,
		color: "grey"
	},
	trackList: {
		marginLeft: 15,
		marginRight: 10
	}
});

class AlbumItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			album: {
				images: [],
				name: "This is a very long album title but it should be okay!",
				artists: [{
					name: "duckTist"
				}],
				tracks: {
					items: [
						{
							_id: 0,
							name: "track 1 has a very stupidly long name which should overflow",
							artists: [{
								name: "duckTist"
							}]
						}, {
							_id: 1,
							name: "track 2",
							artists: [{
								name: "duckTist"
							}]
						}, {
							_id: 2,
							name: "track 3",
							artists: [{
								name: "duckTist"
							}]
						}, {
							_id: 3,
							name: "track 4",
							artists: [{
								name: "duckTist"
							}]
						}, {
							_id: 4,
							name: "track 5",
							artists: [{
								name: "duckTist"
							}]
						}, {
							_id: 5,
							name: "track 6",
							artists: [{
								name: "duckTist"
							}]
						}, {
							_id: 6,
							name: "track 7",
							artists: [{
								name: "duckTist"
							}]
						}
					]
				}
			}
		}
	}
	
	render() {
		let {album} = this.state;
		return (
			<ScrollView style={styles.container}>
				<View style={styles.coverContainer}>
					{(album.images.length && album.images[0].url)?
						(<Image style={styles.cover} source={{uri: album.images[0].url}} />)
						:(<Image style={styles.cover}
						 source={{uri: "http://i2.wp.com/www.back2gaming.com/wp-content/gallery/tt-esports-shockspin/white_label.gif"}} />)
					}
				</View>
				<View style={styles.albumInfo} >
					<Text numberOfLines={1} style={styles.albumName}>{album.name}</Text>
					<Text numberOfLines={1} style={styles.artistName}>{album.artists.map(artist=> (artist.name + "; "))}</Text>
				</View>
				<View style={styles.trackList} >
					{
						album.tracks.items.map(track => {
							return (<Track key={track._id} track={track} playTrack={this._playTrack} addTrack={this._addTrackInPlaylist}/>);
						})
					}
				</View>
				<View style={styles.playContainer}> 
					<Text >Play </Text>
				</View>
			</ScrollView>
		)
	}
	playAlbum() {
		console.log("play with ", this.props);
		let {album, player} = this.props;
		if (!player) return;
		Io.socket.emit("player:play:album", {
			player,
			album: {
				id: album.id
			}
		});
	}

}
AlbumItem.defaultProps = {
	album: {
		id: "",
		source: ""
	}
};
export default AlbumItem;