var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} = React;

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

var Io = require("../../io");
import Progress from './Progress';
import PlayPause from './PlayPause';
import PlaylistStore from '../../stores/PlaylistStore';
import PlaylistActionCreators from '../../actions/PlaylistActionCreators';

var RaspberryActionCreators = require("../../actions/RaspberryActionCreators");
var RaspberryStore = require("../../stores/RaspberryStore");

var PlayerFull = React.createClass({

	_onRaspberryChange() {
	    this.setState({
	    	raspberries: RaspberryStore.getAll().raspberries,
			selectedRaspberry : RaspberryStore.getAll().selectedRaspberry
	    });
	    this.setGetTrackProgressInterval();
	},
	_onPlaylistChange() {
		this.setState({
			playing: PlaylistStore.getAll().playing,
			progress: PlaylistStore.getAll().progress
		});
		this.setGetTrackProgressInterval();
	},
	getInitialState() {
	   	RaspberryActionCreators.getAll();
	   	PlaylistActionCreators.loadPlaylist();
	    return {
	      raspberries: RaspberryStore.getAll().raspberries,
	      selectedRaspberry : RaspberryStore.getAll().selectedRaspberry,
	      playing: PlaylistStore.getAll().playing,
	      progress: PlaylistStore.getAll().progress,
	      extended: false
	    };
	},
	componentDidMount() {
	    RaspberryStore.addChangeListener(this._onRaspberryChange);
	    PlaylistStore.addChangeListener(this._onPlaylistChange);
	    
		//this.setGetTrackProgressInterval();
	},
	componentWillUnmount() {
	    RaspberryStore.removeChangeListener(this._onRaspberryChange);
	    PlaylistStore.removeChangeListener(this._onPlaylistChange);
	    if (this.getProgressInterval) {
			//clearInterval(this.getProgressInterval);				this.getProgressInterval = null;
		}
		if (this.autoUpdateProgress) {
			//clearInterval(this.autoUpdateProgress)
			//this.autoUpdateProgress = null;
		}
	},
	render: function() {
		let {selectedRaspberry, playing} = this.state;
		var raspberry = selectedRaspberry;
		let statusAction = null;
		
		return (
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
				<Progress />
				{
					(raspberry)? (
				<View style={this.styles.playerActions}>
					<TouchableHighlight
						style={this.styles.skip}
						onPress={this._pause} >
						<Image
					        style={this.styles.skipImg}
		              		resizeMode={Image.resizeMode.cover}
					        source={require("image!ic_skip_previous_white_48dp")} />
					</ TouchableHighlight>
					<PlayPause raspberry={raspberry} style={this.styles.playPause} styleImg={this.styles.playPauseImg} />
					<TouchableHighlight
						style={this.styles.skip}
						onPress={this._pause} >
						<Image
					        style={this.styles.skipImg}
		              		resizeMode={Image.resizeMode.contain}
					        source={require("image!ic_skip_next_white_48dp")} />
					</ TouchableHighlight>
				</View>
				): (<View style={this.styles.playerActions}></View>)
				}
			</View>
		);
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