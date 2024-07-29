import { useState } from 'react';
import { TodoForm } from '../TodoForm';
import styles from './TodoCard.module.scss';
import { Button } from '~/ui/Button';
import { TodoFormValues, TodoItem } from '~/kanban/types';
import { useAppDispatch } from '~/store/hooks';
import { kanbanSlice } from '~/kanban/KanbanSlice';
import { Modal } from '~/ui/Modal';

interface TodoCardProps {
  todo: TodoItem;
}
export function TodoCard({ todo }: TodoCardProps) {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, groupId, ...body } = todo;

  const handleDelete = () => {
    dispatch(kanbanSlice.actions.deleteTodo({ id: todo.id }));
  };

  const handleEditTodoSubmit = (values: TodoFormValues) => {
    dispatch(kanbanSlice.actions.patchTodo({ id, body: values }));
    setIsEdit(false);
  };

  return (
    <>
      <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
        <TodoForm
          title={'edit todo'}
          initialValues={body}
          onCancel={() => setIsEdit(false)}
          onSubmit={handleEditTodoSubmit}
        />
      </Modal>
      <li key={todo.id} className={styles.TodoCard}>
        <div>
          <strong>title</strong>: {todo.title}
        </div>
        <div>
          <strong>body</strong>: {todo.body}
        </div>
        <div className={styles.todoItemButtons}>
          <Button onClick={() => setIsEdit(true)}>E</Button>
          <Button onClick={handleDelete}>D</Button>
        </div>
      </li>
    </>
  );
}
