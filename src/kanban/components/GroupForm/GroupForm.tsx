import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './GroupForm.module.scss';
import { Input } from '~/ui/Input';

import { getFormikFieldData } from '~/utils/getFormikFieldData';
import { Button } from '~/ui/Button';
import { GroupFormValues } from '~/kanban/types';

interface GroupFormProps {
  initialValues: GroupFormValues;
  title: string;
  onSubmit: (values: GroupFormValues) => void;
  onCancel: () => void;
}

const VALIDATION_IS_EMPTY_MSG = 'не заполнено';
const VALIDATION_IS_NOT_STRING = 'не строка';

const validationSchema: yup.ObjectSchema<GroupFormValues> = yup.object({
  title: yup.string().typeError(VALIDATION_IS_NOT_STRING).required(VALIDATION_IS_EMPTY_MSG),
});

export function GroupForm({ title, initialValues, onSubmit, onCancel }: GroupFormProps) {
  const formik = useFormik<GroupFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  const titleFieldData = getFormikFieldData(formik, 'title');

  return (
    <div className={styles.GroupForm}>
      <div>{title}</div>
      <form action="" noValidate className={styles.form} onSubmit={formik.handleSubmit}>
        <div>
          <div>
            <Input {...titleFieldData.fieldProps} autoFocus />
          </div>
          <div>{titleFieldData.isError && <span className={styles.error}>{titleFieldData.errorText}</span>}</div>
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
