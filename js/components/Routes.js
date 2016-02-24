import React, {Navigator, Component} from "react-native"
import {Router, Route, Schema, Animations} from "react-native-router-flux";


import Login from "./login";
import App from "./app";
import Splash from "./splash";
import PlayerFull from "./music/playerFull";


class Routes extends Component {
	render() {
		return (
			<Router hideNavBar={true}>
				<Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

				<Route name="splash" schema="modal" component={Splash} title="Splash"/>
				<Route name="login" type="replace" schema="modal" component={Login} title="Login"/>
				<Route name="app" type="replace" schema="modal" component={App} logout={this.props.logout} title="App"/>
				<Route name="player" schema="modal" component={PlayerFull} title="Player"/>
			</Router>
		);
	}

}

export default Routes;