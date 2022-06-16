import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input } from 'antd';
import 'antd/dist/antd.min.css';

import { EditableContext } from './UsersList';
import s from './UsersList.module.css';

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (err) {
      console.log('Не удалось сохранить:', err);
    }
  };
  
  let childNode = children;
    if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className={s.editableCellValueWrap} style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  
  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;

