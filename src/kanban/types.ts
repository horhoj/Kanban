export interface TodoItem {
  id: string;
  title: string;
  body: string;
  groupId: string;
}

export interface TodoGroup {
  id: string;
  title: string;
}

export type GroupFormValues = Omit<TodoGroup, 'id'>;

export type TodoFormValues = Omit<TodoItem, 'id' | 'groupId'>;
