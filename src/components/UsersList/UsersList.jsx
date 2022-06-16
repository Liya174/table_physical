import React, { useState } from 'react';

import { Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';

import s from './UsersList.module.css';

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

    list.forEach(user => {
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


  const columns = [
    {
      title: 'Пользователь',
      key: 'username',
      render: (user) => user.profile_link ? <a href={user.profile_link}>{user.username}</a> : user.username,
      editable: true,
      sorter: (a, b) => sort(a.username, b.username),
      filters: getFilters('username'),
      filterSearch: true,
      onFilter: (value, user) => filter(value, user.username),
    },
    {
      title: 'Имя',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a, b) => sort(a.first_name, b.first_name),
      filters: getFilters('first_name'),
      filterSearch: true,
      onFilter: (value, user) => filter(value, user.first_name),
    },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a, b) => sort(a.last_name, b.last_name),
      filters: getFilters('last_name'),
      filterSearch: true,
      onFilter: (value, user) => filter(value, user.last_name),
    },
    {
      title: 'Email',
      key: 'email',      
      render: (data) => <a href={`mailto:${data.email}`}>{data.email}</a>,
      sorter: (a, b) => sort(a.email, b.email),
      filters: getFilters('email'),
      filterSearch: true,
      onFilter: (value, user) => filter(value, user.email),
    },
    {
      title: 'Оплачено',
      dataIndex: 'pay_status',
      key: 'pay_status',
      render: (isPaid) => isPaid ? <CheckOutlined style={{color: 'green'}} /> : <CloseOutlined style={{color: 'red'}} />,
      sorter: (a, b) => sort(a.pay_status, b.pay_status),
    },
  ];
  
  return (
    <Table 
      className={s.container}
      dataSource={users} 
      columns={columns}
      bordered
    />
  );
}

export default UsersList;