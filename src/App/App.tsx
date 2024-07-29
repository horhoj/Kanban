import styles from './App.module.scss';
import { Kanban } from '~/kanban/components/Kanban';

export function App() {
  return (
    <>
      <div className={styles.App}>
        <Kanban />
      </div>
    </>
  );
}
