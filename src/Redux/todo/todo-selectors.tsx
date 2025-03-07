import { RootState } from '../store';

export const getTodoLoading = (state: RootState) => state.todo.loading;
export const getTodoError = (state: RootState) => state.todo.error;
export const getTodoMessage = (state: RootState) => state.todo.message;
export const getTasksList = (state: RootState) => state.todo.todoList;
export const getArrayTodosWeek = (state: RootState) =>
  state.todo.arrayTodosWeek;
export const getArrayTodosSearch = (state: RootState) =>
  state.todo.arrayTodosSearch;
export const getStopResetMessage = (state: RootState) =>
  state.todo.stopResetMessage;
export const getEditTodoStore = (state: RootState) => state.todo.editTodo;
