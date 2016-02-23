var React = require("react-native");
let {  
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback
} = React;

import {Actions} from "react-native-router-flux";

import {palette} from "../../Constants";

import SocketConnection from "../../natives/SocketConnection";
let {publish} = SocketConnection;

import { connect } from "react-redux";
import { getPlayer, setPlayer } from "../../actions/PlayerActions";

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: palette.PLAYER_BACKGROUND
		},
		viewActions: {
			//flex: 0.1,
			flexDirection: "row",
			alignItems: "flex-start"
		},
		viewActionsButtons: {
			flex: 0.5,
			alignSelf: "flex-start",
			alignItems: "flex-start"
		},
		hidePlayer: {
			height: 50,
			width: 50,
			justifyContent: "flex-start"
		},
		cover: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			height: (window.height),
			width: window.width
		},
		controls: {
			position: "absolute",
			bottom: 0,
			backgroundColor: "white",
			width: window.width,
			opacity: 0.8
		},
		trackInfo: {
			flex: 0.10,
			flexDirection: "column",
			alignSelf: "center",
			alignItems: "center"
		},
		trackName: {
			color: palette.PRIMARY_TEXT_COLOR,
			fontFamily: "RobotoCondensed-Bold",
			fontSize: 19,
			flex: 0.5
		},
		artists: {
			color: palette.PRIMARY_TEXT_COLOR,
			fontFamily: "Roboto-Thin",
			fontSize: 15,
			flex: 0.5
		},
		playerActions: {
			marginLeft: 45,
			marginRight: 45,
			flex: 0.2,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center"
		},
		playPause: {
			flex: 0.5,
			alignItems: "center",
			alignSelf: "center",
			justifyContent: "center"
		},
		playPauseImg: {
			width: 90,
			height: 90
		},
		skip: {
			flex: 0.25,
			alignSelf: "center",
			justifyContent: "center"
		},
		skipImg: {
			width: 50,
			height: 50
		}
	});

import Io from "../../io";

import Progress from "./Progress";
import PlayPause from "./PlayPause";
import Volume from "./Volume";

class PlayerFull extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	      	showVolumeBar: false,
	      	progress: 0,
	      	volumeBarBottom: {x: 0, y: 0}
	    };
		this.getProgressInterval = null;
		this.autoUpdateProgress = null;

		this.onProgress = data => {
			console.log(data);
			this.setState({progress: data.trackOffset_ms});
		}
		this.hidePlayer = () => {
			props.onClosing()
			Actions.pop();
		}
	}
	componentDidMount() {
		Io.socket.on("playlist:track:progress", this.onProgress);
		this.setGetTrackProgressInterval();
	}
	componentWillUnmount() {
		Io.socket.off("playlist:track:progress", this.onProgress);
		/*
		if (this.getProgressInterval) {
			clearInterval(this.getProgressInterval);				
			this.getProgressInterval = null;
		}*/
		if (this.autoUpdateProgress) {
			clearInterval(this.autoUpdateProgress)
			this.autoUpdateProgress = null;
		}
	}
	hideVolumeBar() {
		this.setState({showVolumeBar: false});
	}
	render() {
		let { showVolumeBar } = this.state;
		let {player, playing} = this.props;
		let statusAction = null;
		return (
			<TouchableWithoutFeedback
				onPress={() => this.hideVolumeBar()}>
				<View style={styles.container}>
					<Image
				        style={styles.cover}
	              		resizeMode={Image.resizeMode.cover}
				        source={{uri: playing.album.images[0].url}} />
					<View style={styles.viewActions}>
						<TouchableHighlight
						style={styles.viewActionsButtons}
			              onPress={Actions.pop} >
							<Image
					        style={styles.hidePlayer}
		              		resizeMode={Image.resizeMode.contain}
					        source={require("image!ic_close_black_48dp")} />
						</ TouchableHighlight>
						
					</View>
					<View style={styles.controls}>
						<View style={styles.trackInfo}>
							<Text style={styles.trackName}>{playing.name}</Text>
							<Text style={styles.artists}>{playing.artists.map(function(artist) { return (artist.name + "; ")})}</Text>
						</View>
						<Progress value={this.state.progress} min={0}  max={playing.duration_ms} onSeekTrack={this._seek}/>
						<View style={styles.playerActions}>
							<TouchableHighlight
								style={styles.skip}
								onPress={() => this._previous()} >
								<Image
							        style={styles.skipImg}
				              		resizeMode={Image.resizeMode.cover}
							        source={require("image!ic_skip_previous_black_48dp")} />
							</ TouchableHighlight>
							<PlayPause dispatch={this.props.dispatch} player={player} style={styles.playPause} styleImg={styles.playPauseImg} />
							<TouchableHighlight
								style={styles.skip}
								onPress={() => {this._next()}} >
								<Image
							        style={styles.skipImg}
				              		resizeMode={Image.resizeMode.contain}
							        source={require("image!ic_skip_next_black_48dp")} />
							</ TouchableHighlight>
							<TouchableHighlight style={{"height": 25, "width": 25}} 
							  ref="volumeButton"
							  onPress={(event)=>{this.toogleVolumeBar(event)}}>
                    			<Text>vol</Text>
                			</TouchableHighlight>
							
						</View>
					</View>
					<Volume 
					  bottom={this.state.volumeBarBottom}
					  value={player.volume || 0}
					  setVolume={(value)=>this._setVolume(value)}
					  showVolumeBar={showVolumeBar} />
				</View>
			</TouchableWithoutFeedback>
		);
		
	}
	toogleVolumeBar(event) {
		this.refs.volumeButton.measure((fx, fy, width, height, px, py) => {
			this.setState({
				showVolumeBar: !this.state.showVolumeBar,
				volumeBarBottom: {x: px, y:py}
			});
			console.log("===> ", {volumeBarBottom: {x: px, y:py}});
        });
	}
	_previous() {
		let {player} = this.props;
		if (!player) return;
		publish("raspberry:" + player.name, "player:previous");
	}
	_next() {
		let {player} = this.props;
		if (!player) return;
		publish("raspberry:" + player.name, "player:next");
	}

	setProgressInterval() {
		return;
		if (!this.getProgressInterval) {
			//publish("playlist:track:progress:get");
			this.getProgressInterval = setInterval(function(){
				//Io.socket.emit("playlist:track:progress:get");
			}, 5000);
		}
	}

	setAutoUpdateProgress() {
		return;
		if (!this.autoUpdateProgress) {
			this.autoUpdateProgress = setInterval(function() {
				var ms = this.state.progress + 1000;
				this.setState({progress: ms});
			}.bind(this), 1000)
		}
	}

	setGetTrackProgressInterval() {
		let {player} = this.props;
		if (player && player.status === "PLAYING") {
			console.log("set it");
			this.setProgressInterval();
			this.setAutoUpdateProgress();
		} else {
			if (this.getProgressInterval) {
				clearInterval(this.getProgressInterval);
				this.getProgressInterval = null;
			}
			if (this.autoUpdateProgress) {
				clearInterval(this.autoUpdateProgress)
				this.autoUpdateProgress = null;
			}
		}
	}
	_setVolume(value) {
		this.setState({volume: value});
		let {player} = this.props;
		console.log("player:volume:set", {player: {name: player.name}, volume: value});
        publish("raspberry:" + player.name, "player:volume:set", {volume: value});
		this.props.dispatch(setPlayer({volume: value}))

	}
	_seek(value, event) {
		let {player} = this.props;
		Io.socket.emit("player:seek", {player: {name: player.name}, progress_ms: value});
		PlaylistActionCreators.updateProgress(value);
	}
	
};

function mapStateToProps(state) {
  const { player, playlist, user } = state
  return {
  	user,
  	player,
  	playing: playlist.playing
  }
}
export default connect(mapStateToProps)(PlayerFull)