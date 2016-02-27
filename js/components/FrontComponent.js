import React, {Component, Animated, View} from "react-native";

class FrontComponent extends Component {
	constructor(props) {
		super(props);
		/*this.state = {};
		this.animations = [];
		var {component, options} = this.props;
		var animState = {};
		if (!component.style) component.style = {};
	    for (var key in options) {
	    	animState[key] = new Animated.Value(options[key].from);
	    }
	    this.state = {...this.state, ...animState};
	    for (var key in options) {
	    	component.props.style[key] = this.state[key];
	        this.animations.push(Animated.timing(
	          this.state[key], {
	            toValue: options[key].to,
	            duration: 750,
	          },
	        ))
	    }
	    */
	}
	componentDidMount() {
		//this.animations.forEach(animation=> animation.start());
	}
	render() {
		return (
			<View>
				{this.props.component}
			</View>
		)
	}
}

export default FrontComponent;