import React from "react-native";
let {View, Text, StyleSheet, Image} = React;

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: 'center',
    	flexDirection: 'column',
	},
	cover: {
		height: 150,
		width: 175
	},
	coverContainer: {
		flex: 1,
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
		return (
			<View style={styles.container}>
				<View style={styles.coverContainer}>
					{(artist.images.length && artist.images[0].url)?
						(<Image style={styles.cover} source={{uri: artist.images[0].url}} />)
						:(<Image style={styles.cover}
						 source={{uri: "http://i2.wp.com/www.back2gaming.com/wp-content/gallery/tt-esports-shockspin/white_label.gif"}} />)
					}
				</View>
				<Text style={styles.artistName}>{artist.name}</Text>
			</View>
		);
	}
});
export default  ArtistItem;