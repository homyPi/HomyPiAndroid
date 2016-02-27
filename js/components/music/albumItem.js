import React from "react-native";

var {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableNativeFeedback
} = React;
import SocketConnection from "../../natives/SocketConnection";
let {publish} = SocketConnection;
import Io from "../../io";

const window = require("Dimensions").get("window");

const CONTAINER_WIDTH = (window.width/2- 20);

const styles = StyleSheet.create({
	container: {
    	alignItems: "center",
    	flexDirection: "column",
    	backgroundColor: "white",
    	elevation: 2,
		width: CONTAINER_WIDTH,
		marginTop: 5,
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5

	},
	cover: {
		height: 125,
		width: CONTAINER_WIDTH
	},
	coverContainer: {
		flex: 1,

	},
	info: {
		height: 50,
		alignItems: "flex-start",
		alignSelf: "flex-start",
		marginLeft: 5,
		marginRight: 5
	},
	albumName: {
		flex: 0.20,
		fontFamily: "RobotoCondensed-Bold"
	},
	artistName: {
		flex: 0.20
	}
});

class AlbumItem extends React.Component {
	constructor(props) {
		super(props);
		this.pressStart = 0;
		this.coverDimensions = {px: 0, py: 0, width: 0, height: 0};

	}
	componentDidUpdate() {
		this.refs.cover.measure( (fx, fy, width, height, px, py) => {
			
			this.coverDimensions = {px, py, width, height};
        });
	}
	getImageSource(album) {
		if (album.images.length && album.images[0].url) {
			return {uri: album.images[0].url};
		}
		return require("image!default_cover");
	}
	render() {
		let {album} = this.props;
		return (
			<TouchableNativeFeedback
			  delayLongPress={3000}
              onPress={()=>{this.handlePress()}} 
              onLongPress={()=>{this.handleLongPress()}}
        	  background={TouchableNativeFeedback.SelectableBackground()} >
				<View style={styles.container}>
					<View  style={styles.coverContainer}>
						<Image ref="cover" style={styles.cover} source={this.getImageSource(album)} />
					</View>
					<View style={styles.info}>
						<Text style={styles.albumName} numberOfLines={2} >{album.name}</Text>

					</View>
				</View>
			</TouchableNativeFeedback>
		)
	}
	handlePress() {	
		this.props.gotoDetails(this.props.album, this.coverDimensions);
	}
	handleLongPress() {
		
		this.playAlbum();
	}
	playAlbum() {
		
		let {album, player} = this.props;
		if (!player) return;
		publish("raspberry:" + player.name, "player:play:track", {
			source: "spotify",
			album: {
				serviceId: album.serviceId,
				uri: album.uri
			}
		});
	}

}
AlbumItem.defaultProps = {
	album: {
		images: [{url: ""}],
		name: "untitled"
	},
	gotoDetails: function() {}
};
export default AlbumItem;