import React from "react-native";

var {View, Image, Text, StyleSheet, TouchableWithoutFeedback} = React;
import Io from "../../io";

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: "center",
    	flexDirection: "column"
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
	}
	
	render() {
		let {album} = this.props;
		return (
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
		)
	}
	playAlbum() {
		console.log("play with ", this.props);
		let {album, player} = this.props;
		if (!player) return;
		Io.socket.emit("player:play:album", {
			player,
			album: {
				id: album.id
			}
		});
	}

}
AlbumItem.defaultProps = {
	album: {
		id: "",
		source: "";
	}
};
export default AlbumItem;