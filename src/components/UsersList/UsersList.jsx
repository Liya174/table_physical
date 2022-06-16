import React, { useState } from 'react';

import { Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';

import EditableCell from './EditableCell';
import EditableRow from './EditableRow';
import s from './UsersList.module.css';

export const EditableContext = React.createContext(null);

const UsersList = ({ list }) => {  
  const [users, setUsers] = useState(list);

  const sort = (a, b) => {
    if (typeof a !== typeof b) {
      return false;
    }

    if (typeof a === 'string') return a.localeCompare(b);
    if (typeof a === 'boolean') return (a === b) ? 0 : a ? -1 : 1;

    return false;
  };

  const filter = (value, field) => {
    if (typeof value !== 'string') {
      return false;
    }

    return Array.isArray(field) ? field.includes(value) : value === field;
  };

  const getFilters = (field) => {
    const filtersSet = new Set();

    users.forEach(user => {
      const value = user[field];

      if (Array.isArray(value)) {
        value.forEach(v => {
          filtersSet.add(v);
        });
      } else if (value && typeof value === 'string') {
        filtersSet.add(value);
      }
    });

    return [...filtersSet.keys()].map(key => {
      return {
        text: key,
        value: key,
      };
    });
  };

  const defaultColumns = [
    {
      title: 'Пользователь',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => sort(a.username, b.username),
      filters: getFilters('username'),
      filterSearch: true,
      onFilter: (value, user) => filter(value, user.username),
      editable: true
    },
    {
      title: 'Имя',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a, b) => sort(a.first_name, b.first_name),
      filters: getFilters('first_name'),
      filterSearch: true,
      onFilter: (value, user) => filter(value, user.first_name),
      editable: true
    },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a, b) => sort(a.last_name, b.last_name),
      filters: getFilters('last_name'),
      filterSearch: true,
      onFilter: (value, user) => filter(value, user.last_name),
      editable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',      
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
      sorter: (a, b) => sort(a.email, b.email),
      filters: getFilters('email'),
      filterSearch: true,
      onFilter: (value, user) => filter(value, user.email),
      editable: true
    },
    {
      title: 'Оплачено',
      dataIndex: 'pay_status',
      key: 'pay_status',
      render: (isPaid) => isPaid ? <CheckOutlined style={{color: 'green'}} /> : <CloseOutlined style={{color: 'red'}} />,
      sorter: (a, b) => sort(a.pay_status, b.pay_status),
      width: '10%',
    },
    {
      dataIndex: 'profile_link',
      key: 'profile_link',
      render: (link) => link ? <a href={link}>Профиль</a> : '',
      editable: true,
    },
  ];

  const handleSave = (row) => {
    const newData = [...users];

    const index = newData.findIndex((item) => {
      return row.id === item.id
    });
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setUsers(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  
  return (
    <Table 
      className={s.table}
      rowClassName={() => s.editableRow}
      dataSource={users} 
      columns={columns}
      components={components}
      bordered
    />
  );
}

export default UsersList;