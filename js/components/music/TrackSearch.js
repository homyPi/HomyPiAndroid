import React from "react-native";
let {
	Component,
	ListView,
	Text,
	View,
	TouchableOpacity,
	Image
} = React;

import { connect } from "react-redux";
import { search } from "../../actions/MusicSearchActions";

import {MKTextField, MKColor, MKButton}  from "react-native-material-kit";

import Track from "./trackItem";

const Dimensions = require("Dimensions");
const window = Dimensions.get("window");

const styles = {
	container: {
    	flex: 1
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
		flex:1
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
			search: props.search || ""
		}
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		
		this._handleSearch = () => {
	  		this.props.dispatch(search(this.props.user, this.props.search, "track", 15));
	    }
	}
	componentDidMount() {
	  	if (this.state.search) {
	  		this._handleSearch();
	  	}
  	}
	render() {
		let {search} = this.state;
		let {items} = this.props.searchTracks;
		this.ds = this.ds.cloneWithRows(items);
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
					  onPress={() => this._handleSearch() }>
						<Image style={styles.searchButtonImg} resizeMode={Image.resizeMode.contain} source={require("image!ic_search")} />
					</TouchableOpacity>
				</View>
				<ListView
					style={styles.scrollView}
	      			dataSource={this.ds}
	      			horizontal={false}
	      			renderRow={(track)=> <Track track={track} key={track.id} /> }
	      			onEndReached={()=>{this._loadMore()}} />
			</View>	
		);
	}

	_loadMore() {
		let {isFetching, items} = this.props.searchTracks;
		let {dispatch, user} = this.props;
		if(!isFetching) {
			dispatch(search(user, this.props.search, "track", 15, items.length));
		}
	}
}
TrackSearch.defaultProps = {
	search: ""
}
function mapStateToProps(state) {
	let {user, searchTracks} = state;
	return {
		searchTracks,
		user
	};
}

export default connect(mapStateToProps)(TrackSearch);