import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './TodoForm.module.scss';
import { TodoFormValues } from '~/kanban/types';
import { getFormikFieldData } from '~/utils/getFormikFieldData';
import { Input } from '~/ui/Input';
import { Button } from '~/ui/Button';

interface TodoFormProps {
  initialValues: TodoFormValues;
  title: string;
  onSubmit: (values: TodoFormValues) => void;
  onCancel: () => void;
}

const VALIDATION_IS_EMPTY_MSG = 'не заполнено';
const VALIDATION_IS_NOT_STRING = 'не строка';

const validationSchema: yup.ObjectSchema<TodoFormValues> = yup.object({
  title: yup.string().typeError(VALIDATION_IS_NOT_STRING).required(VALIDATION_IS_EMPTY_MSG),
  body: yup.string().typeError(VALIDATION_IS_NOT_STRING).required(VALIDATION_IS_EMPTY_MSG),
});

export function TodoForm({ initialValues, onCancel, onSubmit, title }: TodoFormProps) {
  const formik = useFormik<TodoFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  const titleFieldData = getFormikFieldData(formik, 'title');
  const bodyFieldData = getFormikFieldData(formik, 'body');

  return (
    <div className={styles.TodoForm}>
      <div>
        <strong>{title}</strong>
      </div>
      <form action="" noValidate className={styles.form} onSubmit={formik.handleSubmit}>
        <div>
          <div>title</div>
          <div>
            <Input {...titleFieldData.fieldProps} autoFocus />
          </div>
          <div>{titleFieldData.isError && <span className={styles.error}>{titleFieldData.errorText}</span>}</div>
        </div>
        <div>
          <div>body</div>
          <div>
            <Input {...bodyFieldData.fieldProps} />
          </div>
          <div>{bodyFieldData.isError && <span className={styles.error}>{bodyFieldData.errorText}</span>}</div>
        </div>
        <div className={styles.formButtons}>
          <Button type={'submit'}>Submit</Button>
          <Button type={'button'} onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
