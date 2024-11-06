// Action Types

const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';

// Reducer Function

function counterReducer(state = {count: 0}, action) {
    switch (action.type) {
        case ADD:
            return {count: state.count + 1};
        case SUBTRACT:
            return {count: state.count - 1};
        case RESET:
            return {count:0};
        
        default:
            return state;
    }
}

// CreateStore function to setup the store

function createStore(reducer) {
    let state;
    let listeners = [];

    //getState: Returns the current state
    function getState() {
        return state;
    }

    //dispatch: Updates state based on action type and notifies listeners
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    // subscribe: Adds a listener that runs when the state updates

    function subscribe(listener) {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => 1 !== listener);
        };
    }

    dispatch({}); 

    return {getState, dispatch, subscribe };
}

// Initialize Store
const store = createStore(counterReducer);

// Subscribe to store and log state on every update
store.subscribe(() => {
    console.log("State:", store.getState());
});

// Test Scenarios


// Scenario 1: Initial State Verification
console.log("Initial State:", store.getState());

//Scenario 2: Incrementing the Counter
store.dispatch({ type: ADD });
store.dispatch({ type: ADD });

// Scenario 3: Decrementing the Counter
store.dispatch({ type: SUBTRACT }); 

// Scenario 4: Resetting the Counter
store.dispatch({ type: RESET});
