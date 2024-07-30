import { useState } from 'react';
import { GroupForm } from '../GroupForm';
import { GroupCard } from '../GroupCard';
import styles from './Kanban.module.scss';
import { Button } from '~/ui/Button';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Modal } from '~/ui/Modal';
import { GroupFormValues } from '~/kanban/types';
import { kanbanSlice, todoListGroupNormalizeSelector } from '~/kanban/KanbanSlice';

export function Kanban() {
  const dispatch = useAppDispatch();
  const todoGroupList = useAppSelector((state) => state.kanban.todoGroupList);
  const [isAddGroup, setIsAddGroup] = useState(false);

  const todoListGroupNormalize = useAppSelector(todoListGroupNormalizeSelector);

  const handleAddGroup = () => {
    setIsAddGroup(true);
  };

  const handleAddGroupSubmit = (values: GroupFormValues) => {
    dispatch(kanbanSlice.actions.addGroup(values));
    setIsAddGroup(false);
  };

  return (
    <>
      <Modal isOpen={isAddGroup} onClose={() => setIsAddGroup(false)}>
        <GroupForm
          title={'add group'}
          initialValues={{ title: '' }}
          onSubmit={handleAddGroupSubmit}
          onCancel={() => setIsAddGroup(false)}
        />
      </Modal>

      <div className={styles.container}>
        <div>
          <Button onClick={handleAddGroup}>AddGroup</Button>
        </div>
        <ul className={styles.Kanban}>
          {todoGroupList.map((group) => {
            return <GroupCard key={group.id} todoList={todoListGroupNormalize[group.id]} group={group} />;
          })}
        </ul>
      </div>
    </>
  );
}
