var React = require('react-native');
var {
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator
} = React;


var Io = require("../../io");
import PlayPause from './PlayPause';
import PlaylistStore from '../../stores/PlaylistStore';
import PlaylistActionCreators from '../../actions/PlaylistActionCreators';

var RaspberryActionCreators = require("../../actions/RaspberryActionCreators");
var RaspberryStore = require("../../stores/RaspberryStore");


var PlayerFull = require("./playerFull");
var PlayerHeader = React.createClass({

	_onRaspberryChange() {
	    this.setState({
	      selectedRaspberry : RaspberryStore.getAll().selectedRaspberry
	    });
	},
	_onPlaylistChange() {
		this.setState({
			playing: PlaylistStore.getAll().playing
		});
	},
	getInitialState() {
	   	RaspberryActionCreators.getAll();
	   	PlaylistActionCreators.loadPlaylist();
	    return {
	      raspberries: RaspberryStore.getAll().raspberries,
	      selectedRaspberry : RaspberryStore.getAll().selectedRaspberry,
	      playing: PlaylistStore.getAll().playing,
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
					<PlayPause raspberry={selectedRaspberry} style={{}} styleImg={{width:35, height:35}} />
			</View>
		);
	},
	_showPlayer: function() {
		this.props.navigator.push({
            name: 'player',
            component: PlayerFull,
            animation: Navigator.SceneConfigs.FloatFromBottom
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