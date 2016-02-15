let store;
let unsubscribe;
let currentState;
let listeners = [];

export function setStore(newStore) {
	if (unsubscribe) unsubscribe();
	store = newStore;
	currentState = store.getState().raspberries;
	store.subscribe(() => {
    	let nextState = store.getState().raspberries;
    	if (currentState.selectedRaspberry !== nextState.selectedRaspberry) {
    		currentState = nextState;
    		listeners.forEach(fn => fn(nextState.selectedRaspberry));
    	}
    	currentState = nextState;
	});
}
export function subscribe(listener) {
	if (typeof listener === "function" && listeners.indexOf(listener) === -1)
		listeners.push(listener);


}
export function unsubscribe(listener) {
	let pos;
	if ((pos = listeners.indexOf(listener)) !== -1)
	listeners.splice(pos, 1)
}