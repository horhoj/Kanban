import { stat } from 'fs';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupFormValues, TodoFormValues, TodoGroup, TodoItem } from './types';
import { getUUID } from '~/utils/getUUID';
import { RootState } from '~/store/types';

const SLICE_NAME = 'Kanban';

interface IS {
  todoList: TodoItem[];
  todoGroupList: TodoGroup[];
}

const initialState: IS = {
  todoGroupList: [
    { id: '1', title: 'group 1' },
    { id: '2', title: 'group 2' },
  ],
  todoList: [
    { id: '1', title: 'title 1', body: 'body 1', groupId: '1' },
    { id: '2', title: 'title 2', body: 'body 2', groupId: '1' },
    { id: '3', title: 'title 3', body: 'body 3', groupId: '1' },
    { id: '4', title: 'title 4', body: 'body 4', groupId: '2' },
    { id: '5', title: 'title 5', body: 'body 5', groupId: '2' },
    { id: '6', title: 'title 6', body: 'body 6', groupId: '2' },
  ],
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<GroupFormValues>) => {
      state.todoGroupList.push({ ...action.payload, id: getUUID() });
    },

    deleteGroup: (state, action: PayloadAction<string>) => {
      state.todoGroupList = state.todoGroupList.filter((el) => el.id !== action.payload);
      state.todoList = state.todoList.filter((el) => el.groupId !== action.payload);
    },
    patchGroup: (state, action: PayloadAction<{ id: string; body: GroupFormValues }>) => {
      state.todoGroupList = state.todoGroupList.map((group) =>
        group.id === action.payload.id ? { ...group, ...action.payload.body } : group,
      );
    },
    addTodo: (state, action: PayloadAction<{ parentId: string; body: TodoFormValues }>) => {
      state.todoList.push({ id: getUUID(), groupId: action.payload.parentId, ...action.payload.body });
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todoList = state.todoList.filter((el) => el.id !== action.payload.id);
    },
    patchTodo: (state, action: PayloadAction<{ id: string; body: TodoFormValues }>) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload.body } : todo,
      );
    },
  },
});

export const kanbanSlice = { actions, selectors, thunks: {} } as const;

export const kanbanReducer = reducer;

export const todoListGroupNormalizeSelector = createSelector(
  (state: RootState) => state.kanban.todoList,
  (state: RootState) => state.kanban.todoGroupList,
  (todoList, todoGroupList) => {
    const todoListGroupNormalize: Record<TodoGroup['id'], TodoItem[]> = {};

    todoGroupList.forEach((todoGroup) => {
      todoListGroupNormalize[todoGroup.id] = [];
    });

    todoList.forEach((todo) => {
      // if (todoListGroupNormalize[todo.groupId] === undefined) {
      //   todoListGroupNormalize[todo.groupId] = [];
      // }
      todoListGroupNormalize[todo.groupId].push(todo);
    });

    return todoListGroupNormalize;
  },
);
