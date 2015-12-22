var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback
} = React;

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import Io from "../../io";
import PlaylistStore from '../../stores/PlaylistStore';
import MusicStore from '../../stores/MusicStore';
import PlaylistActionCreators from '../../actions/PlaylistActionCreators';
import MusicActionCreators from '../../actions/MusicActionCreators';

import PlayerActionCreators from '../../actions/PlayerActionCreators';
import PlayerStore from '../../stores/PlayerStore';

import Progress from './Progress';
import PlayPause from './PlayPause';
import Volume from "./Volume";

var PlayerFull = React.createClass({
	getProgressInterval: null,
	autoUpdateProgress: null,
	_onPlaylistChange() {
		this.setState({
			playing: PlaylistStore.getAll().playing,
			tracks: PlaylistStore.getAll().tracks,
			progress: PlaylistStore.getAll().progress
		});
		this.setGetTrackProgressInterval();
	},
	_onMusicChange() {
		var sources = MusicStore.getAll().sources;
		var musicSource, playlistSource;
		if(sources.music.length) {
			musicSource = sources.music[0];
		}
		if(sources.playlist.length) {
			playlistSource = sources.playlist[0];
		}
		this.setState({
			sources: sources,
			musicSource: musicSource,
			playlistSource: playlistSource,
			volume: MusicStore.getAll().volume
		});
		
	},
	getPlaylist(pl) {
		if (!pl) {
			let {player} = this.state;
		} else {
			let player = pl;
		}
		if (!player) return;
	   	PlaylistActionCreators.loadPlaylist(player);

	},
	getInitialState() {
	   	MusicActionCreators.getSources();
	   	var pl = PlayerStore.getAll().selected;
		if (pl) {
	   		this.getPlaylist(pl);
		}
	    return {
	     	player: pl,
	      	playing: PlaylistStore.getAll().playing,
	      	tracks: PlaylistStore.getAll().tracks,
	      	progress: PlaylistStore.getAll().progress,
	      	sources: MusicStore.getAll().sources,
	      	extended: false,
	      	showVolumeBar: false
	    };
	},
	_onPlayerChange() {
		var player = PlayerStore.getAll().selected;
		if (!player) {
			this.setState({player : player});
			return;
		}
		this.setState({
	      	player : player,
			tracks: PlaylistStore.getAll().tracks
	    });
	    this.setGetTrackProgressInterval();
	    this.getPlaylist();
	},
	componentDidMount() {
		PlayerStore.addChangeListener(this._onPlayerChange);
	    PlaylistStore.addChangeListener(this._onPlaylistChange);
	    MusicStore.addChangeListener(this._onMusicChange);
	    PlayerActionCreators.getAll();

		this.setGetTrackProgressInterval();
	},
	hideVolumeBar() {
		this.setState({showVolumeBar: false});
	},
	componentWillUnmount() {
	    PlayerStore.removeChangeListener(this._onPlayerChange);
	    PlaylistStore.removeChangeListener(this._onPlaylistChange);
	    MusicStore.removeChangeListener(this._onMusicChange);
	    if (this.getProgressInterval) {
			clearInterval(this.getProgressInterval);				
			this.getProgressInterval = null;
		}
		if (this.autoUpdateProgress) {
			clearInterval(this.autoUpdateProgress)
			this.autoUpdateProgress = null;
		}
	},
	render: function() {
		let {selectedRaspberry, playing, progress, showVolumeBar} = this.state;
		var raspberry = selectedRaspberry;
		let statusAction = null;
		return (
			<TouchableWithoutFeedback
				onPress={() => this.hideVolumeBar()}>
			<View style={this.styles.container}>
				<View style={this.styles.viewActions}>
					<TouchableHighlight
					style={this.styles.viewActionsButtons}
		              onPress={this.props.navigator.pop} >
						<Image
				        style={this.styles.hidePlayer}
	              		resizeMode={Image.resizeMode.contain}
				        source={require("image!ic_close_white_48dp")} />
					</ TouchableHighlight>
					
				</View>
				<Image
			        style={this.styles.cover}
              		resizeMode={Image.resizeMode.cover}
			        source={{uri: playing.album.images[0].url}} />
				<View style={this.styles.trackInfo}>
					<Text style={this.styles.trackName}>{playing.name}</Text>
					<Text style={this.styles.artists}>{playing.artists.map(function(artist) { return (artist.name + "; ")})}</Text>
				</View>
				<Progress value={progress.progressMs} min={0}  max={playing.durationMs} onSeekTrack={this._seek}/>
				<View style={this.styles.playerActions}>
					<TouchableHighlight
						style={this.styles.skip}
						onPress={() => this._previous()} >
						<Image
					        style={this.styles.skipImg}
		              		resizeMode={Image.resizeMode.cover}
					        source={require("image!ic_skip_previous_white_48dp")} />
					</ TouchableHighlight>
					<PlayPause player={player} style={this.styles.playPause} styleImg={this.styles.playPauseImg} />
					<TouchableHighlight
						style={this.styles.skip}
						onPress={() => {this._next()}} >
						<Image
					        style={this.styles.skipImg}
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
	},
	_previous() {
		var player = PlayerStore.getAll().selected;
		if (!player) return;
		Io.socket.emit("player:previous", {name: player.name});
	},
	_next() {
		let {player} = this.state;
		if (!player) return;
		Io.socket.emit("player:next", {name: player.name});
	},
	setGetTrackProgressInterval() {
		if (this.state.player && this.state.player.status === "PLAYING") {
			if (!this.getProgressInterval) {
				Io.socket.emit("playlist:track:progress:get");
				this.getProgressInterval = setInterval(function(){
					Io.socket.emit("playlist:track:progress:get");
				}, 5000);
			}
			if (!this.autoUpdateProgress) {
				this.autoUpdateProgress = setInterval(function() {
					var ms = this.state.progress.progressMs + 1000;
					PlaylistActionCreators.updateProgress(ms);
				}.bind(this), 1000)
			}
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
	},
	_setVolume(value) {
		this.setState({volume: value});
		let {player} = this.state;
		console.log("player:volume:set", {player: {name: player.name}, volume: value});
		Io.socket.emit("player:volume:set", {player: {name: player.name}, volume: value});
		PlayerActionCreators.setVolume(player.name, value);
	},
	_seek(value, event) {
		let {player} = this.state;
		Io.socket.emit("player:seek", {player: {name: player.name}, progress_ms: value});
		PlaylistActionCreators.updateProgress(value);
	},
	styles: StyleSheet.create({
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
			alignSelf: 'flex-start',
			alignItems: 'flex-start'
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
	})
});




module.exports = PlayerFull;