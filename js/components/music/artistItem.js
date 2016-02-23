import React from "react-native";
let {View, Text, StyleSheet, Image} = React;

const window = require("Dimensions").get("window");

const CONTAINER_WIDTH = (window.width/2- 20);

const styles = StyleSheet.create({
	container: {
    	alignItems: "center",
    	flexDirection: "column",
    	backgroundColor: "white",
    	elevation: 5,
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
		flex: 1
	},
	artistName: {
		flex: 0.20,
		width: 125,
		height: 50
	}
});

let ArtistItem = React.createClass({
	render: function() {
		let {artist} = this.props;
		var src = {};
		if (artist.images.length && artist.images[0].url) {
			src = {uri: artist.images[0].url};
		} else {
			src = {uri:  "http://i2.wp.com/www.back2gaming.com/wp-content/gallery/tt-esports-shockspin/white_label.gif"};
		}
		return (
			<View style={styles.container}>
				<View style={styles.coverContainer}>
					<Image style={styles.cover} source={src} resizeMode={Image.resizeMode.stretch}/>
				</View>
				<Text style={styles.artistName}>{artist.name}</Text>
			</View>
		);
	}
});
export default  ArtistItem;