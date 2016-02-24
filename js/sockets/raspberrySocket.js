import {stateChanged, selectedDefaultRaspberry} from "../actions/RaspberryActions";
import {getPlayer, removePlayer, clear} from "../actions/PlayerActions";
export default function(socket, store) {
	socket.on("raspberry:state:up", function(data) {
        if (!data.raspberry) return;
    	store.dispatch(stateChanged(data.raspberry.name, "UP"));
    	let {selectedRaspberry} = store.getState();
    	if (!selectedRaspberry)
    		store.dispatch(selectedDefaultRaspberry());
    });

    socket.on("raspberry:state:down", function(data) {
    	let {selectedRaspberry} = store.getState();
    	store.dispatch(stateChanged(data.name, "DOWN"));
    	if (selectedRaspberry && selectedRaspberry.name === data.name) {
    		store.dispatch(selectedDefaultRaspberry());
            store.dispatch(removePlayer());
            store.dispatch(clear())
        }
    });
    socket.on("modules:new:player", function(data) {
        let {selectedRaspberry, user} = store.getState();
        if (selectedRaspberry && selectedRaspberry.name) {
            store.dispatch(getPlayer(user, selectedRaspberry));
        }
    })
};