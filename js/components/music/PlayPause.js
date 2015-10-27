import React from 'react-native';
var {
	View,
  	Image,
  	TouchableHighlight
} = React;

var Io = require("../../io");
var PlayPause = React.createClass({


	_playPause: function() {
		let {raspberry} = this.props;
		if (raspberry && raspberry.status === "PAUSED") {
			Io.socket.emit("player:resume");
		} else if (raspberry && raspberry.status === "PLAYING") {
			Io.socket.emit("player:pause");
		}
	},
	_pause: function() {
	},
	render: function() {
		let {raspberry, style, styleImg} = this.props;
		var img = {url:"https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-512.png"};
		if (raspberry && raspberry.status === "PLAYING") {
			img = require("image!ic_pause_white_48dp");
		} else if (raspberry && raspberry.status === "PAUSED") {
			img = require("image!ic_play_circle_outline_white_48dp");
		}
		return (
			<TouchableHighlight
				  style={style}
				  onPress={this._playPause} >
					<Image
		              style={styleImg}
					  resizeMode={Image.resizeMode.stretch}
					  source={img} />
				</ TouchableHighlight>
		);
	}

});
module.exports = PlayPause;