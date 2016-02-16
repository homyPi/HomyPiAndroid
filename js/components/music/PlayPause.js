import React from "react-native";
var {
	View,
  	Image,
  	TouchableHighlight
} = React;
import { setPlayer, status as setPlayerStatus } from "../../actions/PlayerActions";

import Io from "../../io";
class PlayPause extends React.Component {
	constructor(props) {
		super(props);

		this._playPause = () => {
			let {player} = this.props;
			console.log(Io, player);
			if (player && player.status === "PAUSED") {
				console.log("emit player:resume");
				try {
				Io.socket.emit("player:resume", {name: player.name});
			} catch(e) {console.log(e)}
			} else if (player && player.status === "PLAYING") {
				Io.socket.emit("player:pause", {name: player.name});
			}
		}
	}
	
	_pause() {
	}
	render() {
		let {player, style, styleImg} = this.props;
		var img = {url:"https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-512.png"};
		if (player && player.status === "PLAYING") {
			img = require("image!ic_pause_white_48dp");
		} else if (player && player.status === "PAUSED") {
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

};
module.exports = PlayPause;