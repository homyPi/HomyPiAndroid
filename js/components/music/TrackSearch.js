import React from "react-native";
let {
	Component,
	ListView,
	Text,
	View,
	TouchableOpacity,
	Image
} = React;

import {MKTextField, MKColor, MKButton}  from "react-native-material-kit";

import MusicSearchStore from '../../stores/MusicSearchStore';
import MusicSearchActions from '../../actions/MusicSearchActionCreators';

import Track from "./trackItem";

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = {
	container: {
    	flex: 1
  	},
  	searchForm: {
  		flexDirection: "row",
  		height: 40
  	},
	input: {
		flex:1
	},
	searchButton: {
		flex: .25
	},
	scrollView: {
  	},
	searchButtonImg: {
		width: 40
	}
};
var load = false;
class TrackSearch extends Component {
	constructor(props) {
		super(props);
  		this.state = {
			search: props.search || "",
			results: MusicSearchStore.getAll().tracks || {items: []},
			ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		}

		this._handleSearch = () => {
			let search =this.state.search;
			this.setState({loading: true});
			MusicSearchActions.search(this.props.search, "track", 15)
	    }
		this._onChange = () => {
			this.setState({
				results: MusicSearchStore.getAll().tracks,
				ds: this.state.ds.cloneWithRows(MusicSearchStore.getAll().tracks.items)
			});
			load = false;
		}
	}
	componentDidMount() {
	  	MusicSearchStore.addChangeListener(this._onChange);
	  	if (this.state.search) {
	  		this._handleSearch();
	  	}
  	}
  	componentWillUnmount() {
		MusicSearchStore.removeChangeListener(this._onChange);
  	}
	render() {
		let {results, ds, search} = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.searchForm}>
					<MKTextField
						style={styles.input}
						tintColor={MKColor.Blue}
						textInputStyle={{color: MKColor.BlueGrey}}
						placeholder={search || "Search"}
						onChangeText={(search) => this.setState({search: search})} />
					<TouchableOpacity
						style={styles.searchButton}
					  onPress={() => this.handleSearch() }>
						<Image style={styles.searchButtonImg} resizeMode={Image.resizeMode.contain} source={require('image!ic_search')} />
					</TouchableOpacity>
				</View>
				<ListView
					style={styles.scrollView}
	      			dataSource={ds}
	      			horizontal={false}
	      			renderRow={(track)=> <Track key={track.id} /> }
	      			onEndReached={()=>{this._loadMore()}} />
			</View>	
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