import React from "react-native";
let {View, Text, StyleSheet, Image} = React;

const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: 'flex-start',
    	flexDirection: 'column',
    	paddingBottom: 20
	},
	title: {
		flex:1,
		fontSize: 16
	},
	trackData: {
		flex: 1,
    	flexDirection: 'row'
	},
	artistsNames: {
		flex: 1,
		fontSize: 12
	}
});

let ArtistItem = React.createClass({
	render: function() {
		let {track} = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{track.name}</Text>
				<View style={styles.trackData}>
					<Text style={styles.artistsNames}>{
						track.artists.map(artist => {
							return artist.name + ";";
						})
					}</Text>
				</View>
			</View>
		);
	}
});
export default  ArtistItem;