import React from "react-native";
let {
	Component,
	ListView,
	Text
} = React;

import { connect } from "react-redux";
import { search } from "../../actions/MusicSearchActions";

import ArtistItem from "./artistItem";
var GridView = require("react-native-grid-view");

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

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
	  	this.props.dispatch(search(this.props.user, this.props.search, "artist", 15));
	  }
	render() {
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
		let {isFetching, items} = this.props.searchTracks;
		let {dispatch, user} = this.props;
		if(!isFetching) {
			dispatch(search(user, this.props.search, "artist", 15, items.length));
		}
	}
}
AlbumSearch.defaultProps = {
	search: ""
}
function mapStateToProps(state) {
	let {user, searchArtists} = state;
	return {
		searchArtists,
		user
	};
}

export default connect(mapStateToProps)(AlbumSearch);