import React from "react-native";
var {
	ScrollView,
	View,
	TextInput,
	Text,
	Image,
	Animated,
	ListView,
	TouchableOpacity,
	InteractionManager
} = React;
import {Actions} from "react-native-router-flux";
import {MKTextField, MKColor, mdl}  from "react-native-material-kit";
import AlbumItemCover from "./AlbumItemCover";

import { connect } from "react-redux";
import { search } from "../../actions/MusicSearchActions";

import SocketConnection from "../../natives/SocketConnection";
let {publish} = SocketConnection;

const window = require("Dimensions").get("window");

import ArtistItem from "./artistItem";
import AlbumItem from "./albumItem";

import Track from "./trackItem";
var GridView = require("react-native-grid-view");

import {PLAYER_HEADER_HEIGHT, TOP_BAR_HEIGHT, palette} from "../../Constants";



const styles = {
	container: {
	},
	searchButton: {
		flex:0.15
	},
	searchButtonImg: {
		height: 40,
		alignSelf: "center"
	},
	form: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		marginRight: 10
	},
	input: {
		flex:1,
		width: 500
	},
	titleBar: {
		flexDirection: "row",
		width: window.width - 20,
		marginLeft: 10,
		marginRight: 10,
    	justifyContent: "space-between",
    	alignItems: "center"
	},
	title: {
		fontSize: 24,
		paddingBottom: 15,
		color: "#212121"
	},
  	moreButton: {
  		height: 30,
  		width : 55,
  		right: 0,
  		backgroundColor: palette.ACCENT_COLOR,
  		alignItems: "center",
  		justifyContent: "center",
  		borderRadius: 2,
  		elevation: 2
  	},
	tracks: {
		marginTop: 5,
		marginLeft: 5,
		backgroundColor: "white"
	},
	scrollView: {
		height: window.height - (PLAYER_HEADER_HEIGHT + TOP_BAR_HEIGHT + 50)
  	}
}
const SingleColorSpinner = mdl.Spinner.singleColorSpinner()
  .withStyle({
  	alignSelf: "center",
  	marginTop: 50
  })
  .build();



class SearchMusic extends React.Component {
	constructor(props) {
		super(props);
		this.initialized = false;
		this.state = {
			search: this.props.searchMusic.query
		};
	    this._handleSearch = (init = false) => {
	    	this.initialized = true;
	    	if (init && this.props.searchMusic.albums.items.length &&
	    		this.props.searchMusic.artists.items.length &&
	    		this.props.searchMusic.tracks.items.length)
	    		return;
			let query = this.state.search;
			this.props.dispatch(search(this.props.user, query, null, 4));
	    }
	    this._playTrack = track => {
			let {player} = this.props;
			if (!player) {
				console.log("Missing player!!", player);
			}
			console.log("play track on ", player, track);
			publish("raspberry:" + player.name, "player:play:track", {"source": "spotify", "track": {"uri": track.uri, "serviceId": track.serviceId}});
		}
		this.gotoDetails = (album, event) => {
			let annimatedCover = (<AlbumItemCover
				  album={album}
				  initialState={{
				  	x: event.px,
				  	y: event.py,
				  	width: event.width,
				  	height: event.height
				  }}
				  finalState={{
				  	x: 0,
				  	y: 0,
				  	width: (window.width),
				  	height:(3*window.height/5)
				  }}/>);
			this.props.addFrontComponent(annimatedCover);
  			Actions.albumDetails({
  				annimatedCover,
  				album,
  				source: "spotify"
  			});
		}
	}
	
  	componentDidMount() {
  		InteractionManager.runAfterInteractions(() => { 
    		if (this.props.searchMusic.query != "") {
	    		this._handleSearch(true);
	    	}
		});

  	}
  	componentWillUnmount() {
  	}
	render () {
		let {search} = this.state;
		let {isFetching} = this.props.searchMusic;
		return (
			<View style={styles.container}>
				<View style={styles.form}>
				  	<MKTextField
				  	  style={styles.input}
					  tintColor={MKColor.Blue}
					  textInputStyle={{color: MKColor.BlueGrey}}
					  placeholder={search || "Search"}
					  onChangeText={(search) => this.setState({search: search})} />
					<TouchableOpacity
						style={styles.searchButton}
						onPress={() => this._handleSearch()}>
						<Image style={styles.searchButtonImg} resizeMode={Image.resizeMode.contain} source={require("image!ic_search")} />
					</TouchableOpacity>
			  	</View>
			  	{(isFetching)? this.getLoadingView(): this.getResultsView()}
			</View>
		);
	}
	getResultsView() {
		let {artists, tracks, albums} = this.props.searchMusic;
		if (!this.initialized) return null;
		return (
			<View>

			  	<ScrollView
					automaticallyAdjustContentInsets={true}
					horizontal={false}
					style={[styles.scrollView]}>
							<View style={styles.titleBar}>
								<Text style={styles.title}>Tracks</Text>
								<TouchableOpacity
							  		style={styles.moreButton}
							  		onPress={()=>{this._showMore("tracks")}} >
							  		<Text>More</Text>
							  	</TouchableOpacity>
							</View>
						  	<View style={styles.tracks}>
						  		{
							  		tracks.items.slice(0,4).map(track => {
							  			return (<Track key={track._id} track={track} showCover={true} playTrack={this._playTrack} addTrack={this._addTrackInPlaylist}/>);
							  		})
							  	}
							  	
							</View>
							<View style={styles.titleBar}>
								<Text style={styles.title}>Albums</Text>
								<TouchableOpacity
									style={styles.moreButton}
									onPress={()=>{this._showMore("albums")}} >
								  		<Text>More</Text>
								</TouchableOpacity>
							</View>
							<GridView
							   		style={styles.albumsGrid}
									items={albums.items.slice(0,4)}
									itemsPerRow={2}
									renderItem={this.renderAlbumItem.bind(this)}
									scrollEnabled={false}
									onEndReached={this.onEndReached} />
						<View style={styles.titleBar}>
							<Text style={styles.title}>Artists</Text>
							<TouchableOpacity
								style={styles.moreButton}
								onPress={()=>{this._showMore("artists")}} >
							  		<Text>More</Text>
							</TouchableOpacity>
						</View>
						 	<GridView
							   		style={styles.artistsGrid}
									items={artists.items.slice(0,4)}
									itemsPerRow={2}
									renderItem={this.renderArtistItem}
									scrollEnabled={false}
									onEndReached={this.onEndReached} />
							<View style={{height: 50}}></View>
				</ScrollView>
			</View>
		)
	}
	
	getLoadingView() {
		return (<SingleColorSpinner/>);
	}
	
	renderArtistItem(result) {
		return (
			<ArtistItem key={result.id} artist={result} playAlbum={this._playAlbum}/>
		);
  	}

	renderAlbumItem(result) {
		return (
			<AlbumItem key={result._id} album={result} gotoDetails={this.gotoDetails} player={this.props.player}/>
		);
  	}
  	_showMore(type) {
  		var params = {
  			search: this.state.search
  		}
  		if (type == "tracks") {
  			Actions.searchTrack(params);
  		} else if (type == "albums") {
  			Actions.searchAlbum(params);
  		} else if (type == "artists") {
  			route.name = "searchArtists";
  		}
  	}
}

function mapStateToProps(state) {
	let {user, searchMusic, player} = state;
	return {
		user,
		searchMusic,
		player
	};
}

export default connect(mapStateToProps)(SearchMusic);