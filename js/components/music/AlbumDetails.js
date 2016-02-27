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

import {PLAYER_HEADER_HEIGHT, palette} from "../../Constants";

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
    	marginBottom: 40,
		width: (window.width),
		height: (3*window.height/5)
	},
	cover: {
		width: (window.width),
		height: (3*window.height/5)
	},
	playContainer: {
		position: "absolute",
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: palette.ACCENT_COLOR,
		top: (3*window.height/5)-30,
		left: (window.width-75)
	},
	playbutton: {
		width: 65,
		height: 65
	},
	playButtonImg: {
		width: 60,
		height: 60
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
			showCover: false,
			playButtonScale: new Animated.Value(0)
		};
	}
	componentWillMount() {
		let {annimatedCover, removeFrontComponent} = this.props;
		console.log("get album data");
		this.getAlbumData((albumData) => {
			console.log("got data");
			InteractionManager.runAfterInteractions(() => { 
				console.log("remove animated cover");
				if (annimatedCover)
					removeFrontComponent(annimatedCover);
				this._animatePlayButton();
				this.setState({showCover: true, "album": albumData});
				
			});
		});
		if (annimatedCover) {
			requestAnimationFrame(() => {
				console.log("add animated cover");
				this.props.addFrontComponent(annimatedCover);
			});
		}
		
		
	}
	componentDidMount() {
	}

	getAlbumData(callback) {
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
	            
	        } else {
	        	callback(json.data);
	        }
	      })
	}
	getImageSource(album) {
		console.log("get source");
		if (album.images.length && album.images[0].url) {
			return {uri: album.images[0].url};
		}
		return require("image!default_cover");
	}
	render() {
		let {album} = this.state;
		return (
			<ScrollView showsVerticalScrollIndicator={this.state.showCover} style={styles.container}>
				<View style={styles.coverContainer}>
					{ this.state.showCover && 
					  	<Animated.Image ref="cover" style={styles.cover}
						  source={this.getImageSource(album)} />
					}
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
				{this.state.showCover &&
					<Animated.View style={[
					   styles.playContainer,
					   {transform: [{scale: this.state.playButtonScale}]}
					  ]}>
						<TouchableNativeFeedback 
						  onPress={()=>{this.playAlbum()}} 
						  style={styles.playButton}> 
							<View style={styles.playButton}> 
								<Animated.Image style={[
								   styles.playButtonImg,
								   {transform: [{scale: this.state.playButtonScale}]}
								  ]} 
								  resizeMode={Image.resizeMode.stretch}
								  source={require("image!ic_play_circle_outline_black_36dp")} />
							</View>
						</TouchableNativeFeedback>
					</Animated.View>
				}
			</ScrollView>
		)
	}
	_animatePlayButton() {
	    Animated.timing(       // Uses easing functions
            this.state.playButtonScale, // The value to drive
            {
              toValue: 1,        // Target
              duration: 750,    // Configuration
            },
          ).start();
	}
	playAlbum() {
		this.state.playButtonScale.setValue(1.1);
	    Animated.spring(
	      this.state.playButtonScale,
	      {
	        toValue: 1,
	        friction: 5,
	      }
	    ).start(() => {
			let {album} = this.state;
			publishToPi("player:play:track", {
				source: "spotify",
				album: {
					serviceId: album.serviceId,
					uri: album.uri
				}
			});
		});
	}
	_playTrack(track) {
		let {album} = this.state;
		if (!album.serviceId || !album.uri || !track._id) {
			
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