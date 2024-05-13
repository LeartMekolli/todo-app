import {
  ADD_TODO,
  EMPTY_TODO,
  SET_TODOS,
} from "../actionTypes";

export const setTodos = (payload) => ({
  type: SET_TODOS,
  payload,
});

export const addTodo = (key, value) => ({
  type: ADD_TODO,
  key,
  value,
});

export const emptyTodo = () => ({
  type: EMPTY_TODO,
});
