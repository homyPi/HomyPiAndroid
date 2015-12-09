import RaspberryActionCreators from "../actions/RaspberryActionCreators";

export default function(socket) {
	socket.on("raspberry:new", function(data) {
    	RaspberryActionCreators.newRaspberry(data.raspberry);
    });
    socket.on("raspberry:remove", function(data) {
    	RaspberryActionCreators.removeRaspberry(data.socketId);
    });
};