import React from "react-native";
var {
	ScrollView,
	View,
	TextInput,
	Text,
	Image,
	ListView,
	TouchableOpacity
} = React;
import {MKTextField, MKColor, mdl}  from "react-native-material-kit";

import { connect } from "react-redux";
import { search } from "../../actions/MusicSearchActions";

import Io from "../../io";

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

import ArtistItem from "./artistItem";
import AlbumItem from "./albumItem";

import Track from "./trackItem";
var GridView = require("react-native-grid-view");


const styles = {
	container: {
		paddingLeft: 10,
		paddingRight: 10
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
		alignItems: "center"
	},
	input: {
		flex:1,
		width: 500
	},
	title: {
		fontSize: 24,
		paddingBottom: 15
	},
	scrollView: {
		height: (window.height - 150)
  	},
  	moreButton: {
  		height: 75,
  		width : window.width
  	}
}
const SingleColorSpinner = mdl.Spinner.singleColorSpinner()
  .build();

class SearchMusic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: this.props.searchMusic.query || "gorillaz"
		};
	    this._handleSearch = (init = false) => {
	    	if (init && this.props.searchMusic.albums.items.length &&
	    		this.props.searchMusic.artists.items.length &&
	    		this.props.searchMusic.tracks.items.length)
	    		return;
			let query = this.props.searchMusic.query;
			this.props.dispatch(search(this.props.user, query, null, 4));
	    }
	    this._playTrack = track => {
			let {player} = this.props;
			if (!player) {
				console.log("Missing player!!", player);
			}
			console.log("play track on ", player);
			Io.socket.emit("player:play:track", {player: {name: player.name}, "track": {"source": "spotify", "uri": track.uri}});
		}
	}
	
  	componentDidMount() {
    	if (this.props.searchMusic.query != "") {
	    	this._handleSearch(true);
	    }
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
						onPress={this._handleSearch}>
						<Image style={styles.searchButtonImg} resizeMode={Image.resizeMode.contain} source={require("image!ic_search")} />
					</TouchableOpacity>
			  	</View>
			  	{(isFetching)? this.getLoadingView(): this.getResultsView()}
			</View>
		);
	}
	getResultsView() {
		let {artists, tracks, albums} = this.props.searchMusic;
		return (
			<View>

			  	<ScrollView
					automaticallyAdjustContentInsets={true}
					horizontal={false}
					style={[styles.scrollView]}>
							
							<Text style={styles.title}>Tracks</Text>
						  	<View>
						  		{
							  		tracks.items.slice(0,4).map(track => {
							  			return (<Track key={track._id} track={track} playTrack={this._playTrack} addTrack={this._addTrackInPlaylist}/>);
							  		})
							  	}
							  	<TouchableOpacity
							  		style={styles.moreButton}
							  		onPress={()=>{this._showMore("tracks")}} >
							  		<Text>More</Text>
							  	</TouchableOpacity>
							</View>
							<Text style={styles.title}>Albums</Text>
							<GridView
							   		style={styles.albumsGrid}
									items={albums.items.slice(0,4)}
									itemsPerRow={2}
									renderItem={this.renderAlbumItem.bind(this)}
									scrollEnabled={false}
									onEndReached={this.onEndReached} />
							<TouchableOpacity
								style={styles.moreButton}
								onPress={()=>{this._showMore("albums")}} >
							  		<Text>More</Text>
							</TouchableOpacity>
						<Text style={styles.title}>Artists</Text>
						 	<GridView
							   		style={styles.artistsGrid}
									items={artists.items.slice(0,4)}
									itemsPerRow={2}
									renderItem={this.renderArtistItem}
									scrollEnabled={false}
									onEndReached={this.onEndReached} />
							<TouchableOpacity
								style={styles.moreButton}
								onPress={()=>{this._showMore("artists")}} >
							  		<Text>More</Text>
							</TouchableOpacity>
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
			<AlbumItem key={result.id} album={result} player={this.props.player}/>
		);
  	}
  	_showMore(type) {
  		route = {
  			search: this.state.search
  		}
  		if (type == "tracks") {
  			route.name = "searchTracks";
  		} else if (type == "albums") {
  			route.name = "searchAlbums";
  		} else if (type == "artists") {
  			route.name = "searchArtists";
  		}
  		this.props.navigator.push(route);
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