import { ADD_TODO, EMPTY_TODO, SET_TODOS } from "../actionTypes";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [],
  todo: {
    id: uuidv4(),
    title: null,
    description: null,
    done: false,
  },
};

export default (state = initialState, action) => {
  if (!state) {
    return initialState;
  }
  switch (action.type) {
    case SET_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case ADD_TODO: {
      return {
        ...state,
        todo: {
          ...state.todo,
          [action.key]: action.value,
        },
      };
    }
    case EMPTY_TODO: {
      return {
        ...state,
        todo: {
          id: uuidv4(),
          title: null,
          description: null,
          done: false,
        },
      };
    }
    default:
      return state;
  }
};
