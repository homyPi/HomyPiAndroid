import PlaylistActionCreators from '../actions/PlaylistActionCreators';

export default function(socket) {
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
		console.log(data);
		PlaylistActionCreators.updatePlayingId(data.idPlaying);
	});
	socket.on("playlist:track:progress", function(data) {
		PlaylistActionCreators.updateProgress(data.trackOffset_ms);
	});
}