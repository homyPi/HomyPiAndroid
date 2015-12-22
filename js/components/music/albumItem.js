import React from 'react-native';

var {View, Image, Text, StyleSheet, TouchableWithoutFeedback} = React;
import Io from '../../io';
import PlayerStore from '../../stores/PlayerStore';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: 'center',
    	flexDirection: 'column'
	},
	cover: {
		height: 125,
		width: (window.width/2-25)
	},
	coverContainer: {
		flex: 1
	},
	artistName: {
		flex: 0.20,
		width: 125,
		height: 50
	}
});

class AlbumItem extends React.Component {
	constructor(props) {
		super(props);
		this.pressStart = 0;

		this._onPlayerChange = () => {
			this.player = PlayerStore.getAll().selected;
		}
	}
	
	componentDidMount() {
		PlayerStore.addChangeListener(this._onPlayerChange);
		this.player = PlayerStore.getAll().selected;
	}
	componentWillUnmount() {
	    PlayerStore.removeChangeListener(this._onPlayerChange);
	}
	render() {
		let {album, playAlbum} = this.props;
		return (
			<TouchableWithoutFeedback
                onPressIn={()=>{this.handlePressIn()}} 
                onPressOut={()=>{this.handlePressOut()}}>
			<View style={styles.container}>
				<View style={styles.coverContainer}>
					{(album.images.length && album.images[0].url)?
						(<Image style={styles.cover} source={{uri: album.images[0].url}} />)
						:(<Image style={styles.cover}
						 source={{uri: "http://i2.wp.com/www.back2gaming.com/wp-content/gallery/tt-esports-shockspin/white_label.gif"}} />)
					}
				</View>
				<Text style={styles.artistName}>{album.name}</Text>
			</View>
			</TouchableWithoutFeedback>
		)
	}
	handlePressIn() {
		this.pressStart = Date.now();
	}
	handlePressOut() {
		if(Date.now() - this.pressStart > 1500) {
			this._playAlbum();
		}
	}
	_playAlbum () {
		if(!this.player) return;
		Io.socket.emit("player:play:album", {
			player: {name: this.player.name},
			id: this.props.album.id
		}); 
	}

}
AlbumItem.defaultProps = {
	album: {
		images: [{url: ""}],
		name: "untitled"
	}
};
export default AlbumItem;