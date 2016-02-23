import React from "react-native";
let {
	Component,
	ListView,
	Text,
	InteractionManager
} = React;

import { connect } from "react-redux";
import { search } from "../../actions/MusicSearchActions";


import AlbumItem from "./albumItem";
var GridView = require("react-native-grid-view");

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

const styles = {
	albumsGrid: {
    	flex: 1,
    	height: window.height - 500
  	}
};
var load = false;
class AlbumSearch extends Component {
	constructor(props) {
		super(props);

  		this._playAlbum = album => {
  			console.log("play ", album);
  		}
	}
	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			if (this.props.search)
				this.props.dispatch(search(this.props.user, this.props.search, "album", 30));
		}); 	
  	}
	render() {
		let {items} = this.props.searchAlbums;
		return (
			<GridView
				style={styles.albumsGrid}
				items={items}
				itemsPerRow={2}
				renderItem={this.renderAlbumItem}
				onEndReached={()=>{this._loadMore()}} />
				
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
			this.props.dispatch(search(this.props.user, this.props.search, "album", 15, items.length));
		}
	}
}
AlbumSearch.defaultProps = {
	search: ""
}
function mapStateToProps(state) {
	let {user, searchAlbums} = state;
	return {
		user,
		searchAlbums
	};
}

export default connect(mapStateToProps)(AlbumSearch);