import React, {Component, Animated, View} from "react-native";

class AlbumItemCover extends Component {
	constructor(props) {
		super(props);
		let {initialState} = props;
		this.state = {
			style: {
				width: new Animated.Value(initialState.width),
				position: new Animated.ValueXY({x: initialState.x, y: initialState.y})
			}
		}

	}
	componentDidMount() {
		let {finalState} = this.props;
		Animated.parallel([
			Animated.timing(
		        this.state.style.width, {
		    	    toValue: finalState.width,
		            duration: 750,
		        },
		    ),
		    Animated.timing(
		        this.state.style.position, {
		    	    toValue: {x: finalState.x, y: finalState.y},
		            duration: 750,
		        },
		    )
	    ]).start();
	}
	getImageSource(album) {
		if (album.images.length && album.images[0].url) {
			return {uri: album.images[0].url};
		}
		return require("image!default_cover");
	}
	render() {
		var {album, initialState, finalState} = this.props;
		var {style} = this.state;
		return (
			<Animated.Image
				style={{
				  position: "absolute",
				  width: style.width,
				  height: style.width.interpolate({
				  	inputRange: [initialState.width, finalState.width],
				  	outputRange: [initialState.height, finalState.height]
				  }),
				  transform: style.position.getTranslateTransform()
				}}
				source={this.getImageSource(album)} />
		);
	}
}

export default AlbumItemCover;