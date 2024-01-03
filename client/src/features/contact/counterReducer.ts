//types for dispatcher
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: "YARC (yet another redux counter)",
};

export const increment = (amount = 1) => ({
  type: INCREMENT_COUNTER,
  payload: amount,
});

export const decrement = (amount = 1) => ({
  type: DECREMENT_COUNTER,
  payload: amount,
});

interface ActionCounter {
    type: string;
    payload: number;
}

export default function counterReducer(
  state = initialState,
  action: ActionCounter
) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        //no mutation -> spread operator will create a new state and hold its current value
        ...state,
        data: state.data + action.payload,
      };
    case DECREMENT_COUNTER:
      return {
        //no mutation -> spread operator will create a new state and hold its current value
        ...state,
        data: state.data - action.payload,
      };
    default:
      return state;
  }
}
