import React, {Navigator, Component} from "react-native"
import {Router as RNRFRouter, Route, Schema, Animations} from "react-native-router-flux";

import {connect} from "react-redux";
const Router = (RNRFRouter);

import Home from "./music/searchMusic";

import SearchMusic from "./music/searchMusic";
import TrackSearch from "./music/TrackSearch";
import AlbumSearch from "./music/AlbumSearch";
import AlbumDetails from "./music/AlbumDetails";

import AlarmList from "./alarms/AlarmList";

class AppRoutes extends Component {
	render() {
		return (
			<Router name="appRouter" route={this.props.route} hideNavBar={true}
			  removeFrontComponent={this.props.removeFrontComponent}
			  addFrontComponent={this.props.addFrontComponent} >
				<Schema name="app" sceneConfig={Navigator.SceneConfigs.FloatFromLeft}/>
				<Schema name="details" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

				<Route name="home" schema="app" component={Home} title="Home"/>

				<Route name="searchMusic" schema="app" component={SearchMusic} title="Search music"/>
				<Route name="searchTrack" schema="app" component={TrackSearch} title="Search track"/>
				<Route name="searchAlbum" schema="app" component={AlbumSearch} title="Search album"/>
				<Route name="albumDetails" schema="details" component={AlbumDetails} title="Album"/>

				<Route name="alarms" schema="app" component={AlarmList} title="Alarms"/>
			</Router>
		);
	}

}

export default AppRoutes;