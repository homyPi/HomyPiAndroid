import { setPlayer, status as setPlayerStatus } from "../actions/PlayerActions";
import { getPlayer, clear, playing } from "../actions/PlayerActions";



export default function(socket, store) {
	socket.on("player:status:updated", function(data) {
		if (store.getState().player && (store.getState().player.name === data.name))
			store.dispatch(setPlayerStatus(data.status));
	});
	socket.on("playlist:playing:id", data => {
		if (data.raspberry === store.getState().player.name)
			store.dispatch(playing(data.track))

	});
	socket.on("playlist:track:clear", data => {
		if (data.raspberry === store.getState().player.name)
		    store.dispatch(clear(data));
	});
    /*
    socket.on("playlist:track:added", function(data) {
    	if (data.track) {
			PlaylistActionCreators.addTrack(data.track);
    	} else if (data.trackset) {
    		PlaylistActionCreators.addTrackset(data.trackset);
    	}
	});
	socket.on("playlist:track:removed", function(data) {
		PlaylistActionCreators.removeTrack(data._id);
	});
	socket.on("playlist:track:clear", function(track) {
		PlaylistActionCreators.clear();
	});
	socket.on("playlist:playing:id", function(data) {
		PlaylistActionCreators.updatePlayingId(data.idPlaying);
	});
	socket.on("playlist:track:progress", function(data) {
		PlaylistActionCreators.updateProgress(data.trackOffset_ms);
	});
	socket.on("modules:new:player", function(data) {
		PlayerActionCreators.addPlayer(data.raspberry.name, data.module);
		let {selectedRaspberry} = Link.getRaspberries();
		if (selectedRaspberry && selectedRaspberry.name
				&& selectedRaspberry.name === data.raspberry.name) {
			PlayerActionCreators.setSelected(data.selected.name);
			PlaylistActionCreators.loadPlaylist(data.selected);
		}
	});
	socket.on("modules:remove:player", function(data) {
		PlayerActionCreators.removePlayer(data.raspberry.name, data.module);
	});
	socket.on("player:volume:isSet", function(data) {
		PlayerActionCreators.setVolume(data.player.name, data.volume);
	});
	*/
}