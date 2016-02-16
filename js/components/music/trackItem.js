import React from "react-native";
let {View, Text, StyleSheet, Image, TouchableOpacity} = React;


const styles = StyleSheet.create({
	container: {
		flex: 1,
    	alignItems: 'flex-start',
    	flexDirection: 'row',
    	height: 55
	},
	trackInfo: {
		flex: 1,
    	flexDirection: 'column'
	},
	cover: {
		width: 50,
    	height: 50,
    	marginRight: 10
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
	},
	dropDown: {
		position: "absolute",
		right: 0,
		top: 30,
		width: 100,
		height: 300,
		backgroundColor: "#e9e9e9",
		transform: [{'translate':[0,0,1]}] 
	}
});

class TrackItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false
		};

		this.showMenu = () => {
			this.setState({showMenu: true});
		}
	}
	renderMenu() {
		return null;
		if (this.state.showMenu) {
			return (
				<View style={styles.dropDown} >
					<Text>Hello</Text>
				</View>
			);
		}
		return null;
	}
	render() {
		let {track, playTrack} = this.props;
		return (
			<View style={styles.container}>
				<Image style={styles.cover} source={{uri: track.album.images[0].url}} />
				<View style={styles.trackInfo}>
					<TouchableOpacity
							style={styles.trackInfo}
							onPress={ () => playTrack(track) }>
						
						<Text style={styles.title}>{track.name}</Text>
						<View style={styles.trackData}>
							<Text style={styles.artistsNames}>{
								track.artists.map(artist => {
									return artist.name + ";";
								})
							}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={styles.menuButton}
					onPress={this.showMenu} >
					<Text>menu</Text>
				</TouchableOpacity>
				{this.renderMenu()}
			</View>
		);
	}
};

export default  TrackItem;