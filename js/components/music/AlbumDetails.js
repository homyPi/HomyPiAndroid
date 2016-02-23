import React from "react-native";

var {
	View,
	ScrollView,
	Animated,
	Image,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	InteractionManager
} = React;
import Io from "../../io";
import Track from "./trackItem";

import Settings from "../../settings";
import { connect } from "react-redux";

import SocketConnection from "../../natives/SocketConnection";
let {publishToPi} = SocketConnection;

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

const NO_DATA_ALBUM = {
	album:{}
}

class AlbumDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			album: {
				source: "spotify",
				images: [],
				artists: [],
				tracks: {items: []},
				...this.props.album
			},
			borderRadius: new Animated.Value(window.width),
			scale: new Animated.Value(0)
		};
	}
	componentWillMount() {
		this._animateOpacity();
		InteractionManager.runAfterInteractions(() => { 
			this.getAlbumData();
		});
	}

	getAlbumData() {
		let {serviceId, source} = this.state.album;
		fetch(Settings.getServerUrl() + "/api/modules/music/"+ source + "/albums/" + serviceId, {
	      headers: {
	            "Accept": "application/json",
	            "Content-Type": "application/json",
	            "Authorization": "Bearer " + this.props.user.token
	        }
	      })
	      .then(response => response.json())
	      .then(json => {
	        if (json.status === "error") {
	            console.log(json.error);
	        } else {
	           this.setState({album: json.data});
	        }
	      })
	}
	getImageUri(album) {
		if (album.images.length && album.images[0].url) {
			return album.images[0].url;
		}
		return "http://i2.wp.com/www.back2gaming.com/wp-content/gallery/tt-esports-shockspin/white_label.gif"
	}
	render() {
		let {album} = this.state;
		return (
			<ScrollView style={styles.container}>
				<View style={styles.coverContainer}>
					<Animated.Image ref="cover" style={[
							styles.cover,
							{
								borderRadius: this.state.borderRadius,
								transform: [{scaleX: this.state.scale}, {scaleY: this.state.scale}]
							}
          				]} 
					  source={{uri: this.getImageUri(album)}} />
				</View>
				<View style={styles.albumInfo} >
					<Text numberOfLines={1} style={styles.albumName}>{album.name}</Text>
					<Text numberOfLines={1} style={styles.artistName}>{album.artists.map(artist=> (artist.name + "; "))}</Text>
				</View>
				<View style={styles.trackList} >
					{
						album.tracks.items.map((track, key) => {
							return (<Track key={key} track={track} playTrack={(track) => this._playTrack(track)} addTrack={this._addTrackInPlaylist}/>);
						})
					}
				</View>
				<TouchableNativeFeedback 
				  onPress={()=>{this.playAlbum()}} 
				  style={styles.playContainer}> 
					<View style={styles.playContainer}> 
					<Text>Play</Text>
					</View>
				</TouchableNativeFeedback>
			</ScrollView>
		)
	}
	_animateOpacity() {
	    Animated.timing(       // Uses easing functions
            this.state.borderRadius, // The value to drive
            {
              toValue: 0,        // Target
              duration: 750,    // Configuration
            },
          ).start(); 
	    Animated.timing(       // Uses easing functions
            this.state.scale, // The value to drive
            {
              toValue: 1,        // Target
              duration: 750,    // Configuration
            },
          ).start(); 
	}
	playAlbum() {
		let {album} = this.state;
		publishToPi("player:play:track", {
			source: "spotify",
			album: {
				serviceId: album.serviceId,
				uri: album.uri
			}
		});
	}
	_playTrack(track) {
		let {album} = this.state;
		if (!album.serviceId || !album.uri || !track._id) {
			console.log("missing data", track, album);
			return;
		}
		publishToPi("player:play:track", {
			source: "spotify",
			album: {
				serviceId: album.serviceId,
				uri: album.uri
			},
			startAtTrack: track.serviceId
		});
	}

}
AlbumDetails.defaultProps = {
};
function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps)(AlbumDetails);