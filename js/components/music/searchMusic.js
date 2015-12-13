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

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import MusicSearchStore from '../../stores/MusicSearchStore';
import MusicSearchActions from '../../actions/MusicSearchActionCreators';

import PlayerStore from "../../stores/PlayerStore"

import ArtistItem from "./artistItem";
import AlbumItem from "./albumItem";

import Track from "./trackItem";
var GridView = require('react-native-grid-view');


const styles = {
	container: {
		paddingLeft: 10,
		paddingRight: 10
	},
	searchButton: {
		flex:0.15
	},
	searchButtonImg: {
		width: 40
	},
	form: {
		flex: 1,
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
		height: (window.height - 200)
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
			artists: MusicSearchStore.getAll().artists,
			tracks: MusicSearchStore.getAll().tracks,
			albums: MusicSearchStore.getAll().albums,
			loading: false,
			search: this.props.search || "gorillaz"
		};
		this._onChange = () => {
			this.setState({
			  artists: MusicSearchStore.getAll().artists,
			  tracks: MusicSearchStore.getAll().tracks,
			  albums: MusicSearchStore.getAll().albums,
			  loading: MusicSearchStore.getAll().loading
			});
		}
		this._onPlayerChange = () => {
	    	this.setState({player: PlayerStore.getAll().selected});
	    }

	    this._handleSearch = () => {
			let search =this.state.search;
			this.setState({loading: true});
			console.log("search ", search);
			MusicSearchActions.search(this.state.search, null, 4);
	    }
	}
	
  	componentDidMount() {
	  	MusicSearchStore.addChangeListener(this._onChange);
	  	PlayerStore.addChangeListener(this._onPlayerChange);
    	if (this.state.search != "") {
	    	this._handleSearch();
	    }
  	}
  	componentWillUnmount() {
    	MusicSearchStore.removeChangeListener(this._onChange);
	  	PlayerStore.removeChangeListener(this._onPlayerChange);
  	}
	render () {
		let {search, loading} = this.state;
		console.log(this.state);
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
						onPress={this.handleSearch}>
						<Image style={styles.searchButtonImg} resizeMode={Image.resizeMode.contain} source={require('image!ic_search')} />
					</TouchableOpacity>
			  	</View>
			  	{(loading)? this.getLoadingView(): this.getResultsView()}
			</View>
		);
	}
	getResultsView() {
		let {artists, tracks, albums} = this.state;
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
							  		onPress={()=>{this._showMore('tracks')}} >
							  		<Text>More</Text>
							  	</TouchableOpacity>
							</View>
							<Text style={styles.title}>Albums</Text>
							<GridView
							   		style={styles.albumsGrid}
									items={albums.items.slice(0,4)}
									itemsPerRow={2}
									renderItem={this.renderAlbumItem}
									scrollEnabled={false}
									onEndReached={this.onEndReached} />
							<TouchableOpacity
								style={styles.moreButton}
								onPress={()=>{this._showMore('albums')}} >
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
								onPress={()=>{this._showMore('artists')}} >
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
			<AlbumItem key={result.id} album={result} playAlbum={this._playAlbum}/>
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

export default SearchMusic;