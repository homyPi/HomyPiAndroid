import React from 'react-native';

var {View, Image, Text, StyleSheet} = React

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

class AlbumItem extends React.Component {
	
	render() {
		let {album, playAlbum} = this.props;
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

}
AlbumItem.defaultProps = {
	album: {
		images: [{url: ""}],
		name: "untitled"
	}
};
export default AlbumItem;