import React from "react-native";
var {ScrollView, View, TextInput, Text, Image, ListView, TouchableOpacity} = React;

import {MKTextField, MKColor, mdl}  from "react-native-material-kit";

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

import MusicSearchStore from '../../stores/MusicSearchStore';
import MusicSearchActions from '../../actions/MusicSearchActionCreators';
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
  	}
}
const SingleColorSpinner = mdl.Spinner.singleColorSpinner()
  .build();
class SearchMusic extends React.Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			artists: MusicSearchStore.getAll().artists,
			tracks: MusicSearchStore.getAll().tracks,
			albums: MusicSearchStore.getAll().albums,
			loading: false,
			search: "gorillaz"
		};
	}
	_onChange() {
		this.setState({
		  artists: MusicSearchStore.getAll().artists,
		  tracks: MusicSearchStore.getAll().tracks,
		  albums: MusicSearchStore.getAll().albums,
		  loading: false
		});
	}
  	componentDidMount() {
	  	MusicSearchStore.addChangeListener(this._onChange.bind(this));
		if (this.state.search != "") {
			this.handleSearch();
		}
  	}
  	componentWillUnmount() {
		MusicSearchStore.removeChangeListener(this._onChange.bind(this));
  	}
	render () {
		let {search, loading} = this.state;
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
						onPress={this.handleSearch.bind(this)}>
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
							  		tracks.items.map(track => {
							  			return (<Track key={track.id} track={track} playTrack={this._playTrack} addTrack={this._addTrackInPlaylist}/>);
							  		})
							  	}
							</View>
							<Text style={styles.title}>Albums</Text>
							<GridView
							   		style={styles.albumsGrid}
									items={albums.items}
									itemsPerRow={2}
									renderItem={this.renderAlbumItem}
									scrollEnabled={false}
									onEndReached={this.onEndReached} />
						<Text style={styles.title}>Artists</Text>
						 	<GridView
							   		style={styles.artistsGrid}
									items={artists.items}
									itemsPerRow={2}
									renderItem={this.renderArtistItem}
									scrollEnabled={false}
									onEndReached={this.onEndReached} />
				</ScrollView>
			</View>
		)
	}

	getLoadingView() {
		return (<SingleColorSpinner/>);
	}
	
	renderArtistItem(result) {
		return (
			<ArtistItem key={result._id} artist={result} playAlbum={this._playAlbum}/>
		);
  	}

	renderAlbumItem(result) {
		return (
			<AlbumItem key={result._id} album={result} playAlbum={this._playAlbum}/>
		);
  	}

	handleSearch() {
		let search =this.state.search;
		this.setState({loading: true});
		MusicSearchActions.search(this.state.search, null, 4);
	}
}

export default SearchMusic;