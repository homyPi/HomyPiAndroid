import React from "react-native";
let {
	Component,
	ListView,
	Text
} = React;

import MusicSearchStore from '../../stores/MusicSearchStore';
import MusicSearchActions from '../../actions/MusicSearchActionCreators';

import Track from "./trackItem";

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = {
	scrollView: {
    	flex: 1
  	}
};
var load = false;
class TrackSearch extends Component {
	constructor(props) {
		super(props);
  
		this.state = {
			results: {items: []},
			ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		}
	}
	_onChange() {
		this.setState({
			results: MusicSearchStore.getAll().tracks,
			ds: this.state.ds.cloneWithRows(MusicSearchStore.getAll().tracks.items)
		});
		load = false;
	}
	componentDidMount() {
	  	MusicSearchStore.addChangeListener(()=>{this._onChange()});
	  	MusicSearchActions.searchMore(this.props.search, "track", 15)
  	}
  	componentWillUnmount() {
		MusicSearchStore.removeChangeListener(()=>{this._onChange()});
  	}
	render() {
		let {results, ds} = this.state;
		return (
			<ListView
				style={styles.scrollView}
      			dataSource={ds}
      			horizontal={false}
      			renderRow={(track)=> <Track key={track.id} track={track} playTrack={this._playTrack} addTrack={this._addTrackInPlaylist}/> }
      			onEndReached={()=>{this._loadMore()}} />
				
		);
	}

	_loadMore() {
		if(!load) {
			MusicSearchActions.searchMore(this.props.search, "track", 15, this.state.results.items.length);
			load = true;
		}
	}
}
TrackSearch.defaultProps = {
	search: ""
}

export default TrackSearch;