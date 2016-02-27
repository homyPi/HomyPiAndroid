import React, {Component, Animated, View} from "react-native";

class AlbumItemCover extends Component {
	constructor(props) {
		super(props);
		let {initialState} = props;
		this.state = {
			style: {
				width: new Animated.Value(initialState.width),
				height: new Animated.Value(initialState.height),
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
		        this.state.style.height, {
		    	    toValue: finalState.height,
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
		var {album} = this.props;
		var {style} = this.state;
		return (
			<Animated.Image
				style={{
				  position: "absolute",
				  width: style.width,
				  height: style.height,
				  transform: style.position.getTranslateTransform()
				}}
				source={this.getImageSource(album)} />
		);
	}
}

export default AlbumItemCover;