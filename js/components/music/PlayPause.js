import React from "react-native";
var {
	View,
  	Image,
  	TouchableHighlight
} = React;
import { setPlayer, status as setPlayerStatus } from "../../actions/PlayerActions";
import SocketConnection from "../../natives/SocketConnection";
let {publish} = SocketConnection;


class PlayPause extends React.Component {
	constructor(props) {
		super(props);

		this._playPause = () => {
			let {player} = this.props;
			if (player && player.status === "PAUSED") {
				
				try {
				publish("raspberry:" + player.name, "player:resume");
			} catch(e) {}
			} else if (player && player.status === "PLAYING") {
				publish("raspberry:" + player.name, "player:pause");
			}
		}
	}
	
	_pause() {
	}
	render() {
		let {player, style, styleImg} = this.props;
		var img = {url:"https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-512.png"};
		if (player && player.status === "PLAYING") {
			img = require("image!ic_pause_black_48dp");
		} else if (player && player.status === "PAUSED") {
			img = require("image!ic_play_circle_outline_black_48dp");
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