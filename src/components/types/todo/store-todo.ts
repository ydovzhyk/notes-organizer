import { ITodoCreate, ITodoServer } from "./todo";
import { ITodoIdResponse } from "./axios-todo";

export interface ITodoState {
  loading: boolean,
  error: string,
  message: string,
  todoList: ITodoServer[],
  arrayTodosWeek: ITodoServer[],
  arrayTodosSearch: ITodoServer[],
  stopResetMessage: boolean,
  editTodo: ITodoServer | {},
}