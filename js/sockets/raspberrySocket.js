import {stateChanged, selectedDefaultRaspberry} from "../actions/RaspberryActions";

export default function(socket, store) {
	
	socket.on("raspberry:new", function(data) {
		if (!data.raspberry) return;
    	store.dispatch(stateChanged(data.raspberry.name, "UP"));
    	let {selectedRaspberry} = store.getState();
    	if (!selectedRaspberry)
    		store.dispatch(selectedDefaultRaspberry());
    });

    socket.on("raspberry:remove", function(data) {
    	let {selectedRaspberry} = store.getState();
    	store.dispatch(stateChanged(data.name, "DOWN"));
    	if (selectedRaspberry && selectedRaspberry.name === data.name)
    		store.dispatch(selectedDefaultRaspberry());
    });
};