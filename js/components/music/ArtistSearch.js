import React from "react-native";
let {
	Component,
	ListView,
	Text
} = React;

import MusicSearchStore from '../../stores/MusicSearchStore';
import MusicSearchActions from '../../actions/MusicSearchActionCreators';

import ArtistItem from "./artistItem";
var GridView = require('react-native-grid-view');

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = {
	scrollView: {
    	flex: 1
  	}
};
var load = false;
class AlbumSearch extends Component {
	constructor(props) {
		super(props);
  
		this.state = {
			artists: {items: []}
		}
	}
	_onChange() {
		this.setState({
			artists: MusicSearchStore.getAll().artists
		});
		load = false;
	}
	componentDidMount() {
	  	MusicSearchStore.addChangeListener(()=>{this._onChange()});
	  	MusicSearchActions.searchMore(this.props.search, "album", 15)
  	}
  	componentWillUnmount() {
		MusicSearchStore.removeChangeListener(()=>{this._onChange()});
  	}
	render() {
		let {artists, ds} = this.state;
		return (
			<GridView
				style={styles.artistsGrid}
				items={artists.items}
				itemsPerRow={2}
				renderItem={this.renderAlbumItem}
				scrollEnabled={false}
				onEndReached={()=>{this._loadMore()}} />
				
		);
	}

	renderAlbumItem(result) {
		return (
			<ArtistItem key={result._id} artist={result} playAlbum={this._playAlbum}/>
		);
  	}
	_loadMore() {
		if(!load) {
			MusicSearchActions.searchMore(this.props.search, "artist", 15, this.state.artists.items.length);
			load = true;
		}
	}
}
AlbumSearch.defaultProps = {
	search: ""
}

export default AlbumSearch;