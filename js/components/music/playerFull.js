var React = require("react-native");
let {  
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback
} = React;

import { connect } from "react-redux";
import { getPlayer, setPlayer } from "../../actions/PlayerActions";

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: "#263238"
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
			flex: 0.5,
			height: (window.height/2),
			width: window.width
		},
		trackInfo: {
			flex: 0.10,
			flexDirection: "column",
			alignSelf: "center",
			alignItems: "center"
		},
		trackName: {
			color: "#4CAF50",
			fontSize: 19,
			flex: 0.5
		},
		artists: {
			color: "#4CAF50",
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
	      	progress: 0
	    };
		this.getProgressInterval = null;
		this.autoUpdateProgress = null;

		this.onProgress = data => {
			console.log(data);
			this.setState({progress: data.trackOffset_ms});
		}
		this.hidePlayer = () => {
			props.onClosing()
			props.navigator.pop();
		}
	}
	componentDidMount() {
		Io.socket.on("playlist:track:progress", this.onProgress);
		this.setGetTrackProgressInterval();
	}
	componentWillUnmount() {
		Io.socket.off("playlist:track:progress", this.onProgress);
		if (this.getProgressInterval) {
			clearInterval(this.getProgressInterval);				
			this.getProgressInterval = null;
		}
		if (this.autoUpdateProgress) {
			clearInterval(this.autoUpdateProgress)
			this.autoUpdateProgress = null;
		}
	}
	/*
	componentDidMount() {
		PlayerStore.addChangeListener(this._onPlayerChange);
	    PlaylistStore.addChangeListener(this._onPlaylistChange);
	    MusicStore.addChangeListener(this._onMusicChange);
	    PlayerActionCreators.getAll();

	},
	componentWillUnmount() {
	    PlayerStore.removeChangeListener(this._onPlayerChange);
	    PlaylistStore.removeChangeListener(this._onPlaylistChange);
	    MusicStore.removeChangeListener(this._onMusicChange);
	    
	},
	*/
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
				<View style={styles.viewActions}>
					<TouchableHighlight
					style={styles.viewActionsButtons}
		              onPress={this.props.navigator.pop} >
						<Image
				        style={styles.hidePlayer}
	              		resizeMode={Image.resizeMode.contain}
				        source={require("image!ic_close_white_48dp")} />
					</ TouchableHighlight>
					
				</View>
				<Image
			        style={styles.cover}
              		resizeMode={Image.resizeMode.cover}
			        source={{uri: playing.album.images[0].url}} />
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
					        source={require("image!ic_skip_previous_white_48dp")} />
					</ TouchableHighlight>
					<PlayPause dispatch={this.props.dispatch} player={player} style={styles.playPause} styleImg={styles.playPauseImg} />
					<TouchableHighlight
						style={styles.skip}
						onPress={() => {this._next()}} >
						<Image
					        style={styles.skipImg}
		              		resizeMode={Image.resizeMode.contain}
					        source={require("image!ic_skip_next_white_48dp")} />
					</ TouchableHighlight>
					<Volume 
						value={player.volume || 0}
						setVolume={(value)=>this._setVolume(value)}
						showVolumeBar={showVolumeBar}
						toogleVolumeBar={()=>{this.setState({showVolumeBar: !showVolumeBar})}} />
				</View>
			</View>
			</TouchableWithoutFeedback>
		);
		
	}
	_previous() {
		let {player} = this.props;
		if (!player) return;
		Io.socket.emit("player:previous", {name: player.name});
	}
	_next() {
		let {player} = this.props;
		if (!player) return;
		Io.socket.emit("player:next", {name: player.name});
	}

	setProgressInterval() {
		if (!this.getProgressInterval) {
			Io.socket.emit("playlist:track:progress:get");
			this.getProgressInterval = setInterval(function(){
				Io.socket.emit("playlist:track:progress:get");
			}, 5000);
		}
	}

	setAutoUpdateProgress() {
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
		Io.socket.emit("player:volume:set", {player: {name: player.name}, volume: value});
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