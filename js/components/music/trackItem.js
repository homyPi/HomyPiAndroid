import React from "react-native";
let {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Picker
} = React;


const {
  Select,
  Option,
  OptionList,
  updatePosition
} = require("react-native-dropdown");

const parseMs = function(ms) {
    var min = (ms/1000/60) << 0;
    var sec = Math.floor((ms/1000) % 60);
	return min + ":" + sec;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
    	alignItems: "center",
    	flexDirection: "row",
    	justifyContent: "center",
    	backgroundColor: "white",
    	height: 55
	},
	trackInfo: {
		flex: 1,
    	flexDirection: "column"
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
    	flexDirection: "row"
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
		transform: [{"translate":[0,0,1]}] 
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

		this.menuCallback = () => {
			
		}
	}
	renderMenu() {
		return (
			<Picker
			  selectedValue={"js"}
			  onValueChange={(lang) => this.setState({language: lang})}
			  style={{width: 100, height: 100}} >
			  <Picker.Item label="Javall" value="java" />
			  <Picker.Item label="JavaScript" value="js" />
			</Picker>
            )
	}
	render() {
		let {track, playTrack, showCover} = this.props;
		return (
			<View style={styles.container}>
				{(showCover)?<Image style={styles.cover} source={{uri: track.album.images[0].url}} />:null}
				<View style={styles.trackInfo}>
					<TouchableOpacity
							style={styles.trackInfo}
							onPress={ () => playTrack(track) }>
						
						<Text numberOfLines={1} style={styles.title}>{track.name}</Text>
						<View style={styles.trackData}>
							<Text style={styles.artistsNames}>{
								track.artists.map(artist => {
									return artist.name + ";";
								})
							}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<Text style={styles.duration}>{parseMs(track.duration_ms)}</Text>
				{/*<TouchableOpacity
					style={styles.menuButton}
					onPress={this.showMenu} >
					<Text>menu</Text>
				</TouchableOpacity>*/}
				{/*this.renderMenu()*/}
			</View>
		);
	}
};

export default  TrackItem;