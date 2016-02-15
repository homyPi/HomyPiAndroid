import React from "react-native";
let {
	Component,
	ListView,
	Text
} = React;

import { connect } from 'react-redux';
import { search } from "../../actions/MusicSearchActions";


import AlbumItem from "./albumItem";
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
  
	}
	componentDidMount() {
	  	this.props.dispatch(search(this.props.search, "album", 15));
  	}
	render() {
		let {items} = this.props.searchAlbums;
		return (
			<GridView
				style={styles.albumsGrid}
				items={items}
				itemsPerRow={2}
				renderItem={this.renderAlbumItem}
				scrollEnabled={false}
				onEndReached={()=>{console.log("end"); this._loadMore()}} />
				
		);
	}

	renderAlbumItem(result) {
		return (
			<AlbumItem key={result._id} album={result} playAlbum={this._playAlbum}/>
		);
  	}
	_loadMore() {
		let {isFetching, items} = this.props.searchAlbums;
		console.log("load more?", (!isFetching));
		if(!isFetching) {
			this.props.dispatch(search(this.props.search, "album", 15, items.length));
		}
	}
}
AlbumSearch.defaultProps = {
	search: ""
}
function mapStateToProps(state) {
	return {
		searchAlbums: state.searchAlbums
	};
}

export default connect(mapStateToProps)(AlbumSearch);