import React from "react-native";
let {View, ListView, StyleSheet, ScrollView} = React;
var GridView = require('react-native-grid-view');
import MyArtistsStore from '../../stores/MyArtistsStore';
import MyArtistsActions from '../../actions/MyArtistsActionCreators';
import ArtistItem from "./artistItem";

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
	myArtistsList: {
		flex: 1
	},
	artistsGrid: {
    	height: (window.height - 75)
  	}
});

class MyArtists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artists: MyArtistsStore.getAll().artists
		};
	}
	_onChange(artists) {
		this.setState({artists: MyArtistsStore.getAll().artists});
	}

	componentDidMount() {
		MyArtistsStore.addChangeListener(this._onChange.bind(this));
		MyArtistsActions.getAll();
	}

  	componentWillUnmount() {
    	MyArtistsStore.removeChangeListener(this._onChange);
  	}

  	render() {
  		let {artists} = this.state;
  		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    	var dataSource =  ds.cloneWithRows(artists);

  		return (
			    <GridView
			   		style={styles.artistsGrid}
				    items={artists}
			        itemsPerRow={2}
			        renderItem={this.renderArtistItem}
			        scrollEnabled={true}
	        		onEndReached={this.onEndReached} />
		)
  	}

  	renderArtistItem(result) {
		return (
			<ArtistItem key={result._id} artist={result} playAlbum={this._playAlbum}/>
		);
  	}

  	onEndReached() {
  		console.log("end...");
  	}

}
MyArtists.defaultProps = {
	artists: []
};

export default MyArtists;