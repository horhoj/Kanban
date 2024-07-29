import { useState } from 'react';
import { GroupForm } from '../GroupForm';
import { TodoCard } from '../TodoCard';
import { TodoForm } from '../TodoForm';
import styles from './GroupCard.module.scss';
import { kanbanSlice } from '~/kanban/KanbanSlice';
import { GroupFormValues, TodoFormValues, TodoGroup, TodoItem } from '~/kanban/types';
import { useAppDispatch } from '~/store/hooks';
import { Button } from '~/ui/Button';
import { Modal } from '~/ui/Modal';

interface GroupCardProps {
  group: TodoGroup;
  todoList: TodoItem[];
}
export function GroupCard({ group, todoList }: GroupCardProps) {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isAddTodo, setIsAddTodo] = useState(false);
  const handleDeleteGroup = (id: string) => {
    dispatch(kanbanSlice.actions.deleteGroup(id));
  };

  const { id, ...body } = group;

  const handleEditGroupSubmit = (values: GroupFormValues) => {
    dispatch(kanbanSlice.actions.patchGroup({ id, body: values }));
    setIsEdit(false);
  };

  const handleAddTodo = (values: TodoFormValues) => {
    dispatch(kanbanSlice.actions.addTodo({ parentId: group.id, body: values }));
    setIsAddTodo(false);
  };

  return (
    <>
      <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
        <GroupForm
          title={'edit group'}
          initialValues={body}
          onSubmit={handleEditGroupSubmit}
          onCancel={() => setIsEdit(false)}
        />
      </Modal>
      <Modal isOpen={isAddTodo} onClose={() => setIsAddTodo(false)}>
        <TodoForm
          title={'add todo'}
          initialValues={{ body: '', title: '' }}
          onCancel={() => setIsAddTodo(false)}
          onSubmit={handleAddTodo}
        />
      </Modal>
      <li key={group.id} className={styles.GroupCard}>
        <div className={styles.groupTitle}>
          <strong>{group.title}</strong>
          <Button onClick={() => setIsEdit(true)}>E</Button>
          <Button onClick={() => handleDeleteGroup(group.id)}>D</Button>
        </div>
        <div>
          <Button onClick={() => setIsAddTodo(true)}>Add todo</Button>
        </div>
        <ul className={styles.todoList}>
          {todoList.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </ul>
      </li>
    </>
  );
}
