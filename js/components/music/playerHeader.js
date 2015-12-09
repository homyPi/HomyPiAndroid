var React = require('react-native');
var {
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator
} = React;


import PlayPause from './PlayPause';
var Io = require("../../io");
var _navigator;

import PlaylistStore from '../../stores/PlaylistStore';
import MusicStore from '../../stores/MusicStore';
import PlaylistActionCreators from '../../actions/PlaylistActionCreators';
import MusicActionCreators from '../../actions/MusicActionCreators';

import PlayerActionCreators from '../../actions/PlayerActionCreators';
import PlayerStore from '../../stores/PlayerStore';


var PlayerHeader = React.createClass({

	getProgressInterval: null,
	autoUpdateProgress: null,
	_onPlaylistChange() {
		this.setState({
			playing: PlaylistStore.getAll().playing,
			tracks: PlaylistStore.getAll().tracks,
			progress: PlaylistStore.getAll().progress
		});
		//this.setGetTrackProgressInterval();
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
	getPlaylist() {
		let {player} = this.state;
		if (!player) return;
	   	PlaylistActionCreators.loadPlaylist(player);

	},
	getInitialState() {
	   	MusicActionCreators.getSources();
	   	var pl = PlayerStore.getAll().selected;
		if (pl) {
	   		this.getPlaylist();
		}
	    return {
	     	player: pl,
	      	playing: PlaylistStore.getAll().playing,
	      	tracks: PlaylistStore.getAll().tracks,
	      	progress: PlaylistStore.getAll().progress,
	      	sources: MusicStore.getAll().sources,
	      	extended: false
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
	    //this.setGetTrackProgressInterval();
	    this.getPlaylist();
	},
	componentWillMount() {
		PlayerStore.addChangeListener(this._onPlayerChange);
	    PlaylistStore.addChangeListener(this._onPlaylistChange);
	    MusicStore.addChangeListener(this._onMusicChange);
	    PlayerActionCreators.getAll();

		//this.setGetTrackProgressInterval();
	},
	componentDidMount() {
		
	},
	componentWillUnmount() {
	    PlaylistStore.removeChangeListener(this._onPlaylistChange);
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
		let {
			player,
			playing,
			tracks,
			progress,
			sources
		} = this.state;
		let playerClassName  = "player";
		if(this.state.extended) {
			playerClassName += " extended";
		}
		let musicSourceMenu = sources.music.map(function(name) {
			return { payload: name, text: name }
		});
		let playlistSourceMenu = sources.playlist.map(function(name) {
			return { payload: name, text: name }
		});
		console.log("render playing = ", playing);
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
						<View style={this.styles.trackInfo}>
							<Text numberOfLines={1} style={this.styles.trackName}>{playing.name}</Text>
							<Text numberOfLines={1} style={this.styles.artists}>{playing.artists.map(function(artist) { return (artist.name + "; ")})}</Text>
						</View>
						<PlayPause player={player} style={{}} styleImg={{width:35, height:35}} />
					</View>
		);
	},
	_showPlayer: function() {
		this.props.navigator.push({
            name: 'player',
        });
	},
	styles: StyleSheet.create({
		container: {
			alignItems: "center",
			flex: 1,
			flexDirection: "row",
			backgroundColor: "#263238"
		},
		coverContainer: {
			flex: 0.15,
			height: 50
		},
		cover: {
			height: 50
		},
		trackInfo: {
			flex: 0.5,
			flexDirection: "column",
			alignSelf: "center"
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




module.exports = PlayerHeader;