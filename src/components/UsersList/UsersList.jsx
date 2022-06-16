import React from 'react';
import Fuse from 'fuse.js';

import { Input, Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';

import s from './UsersList.module.css';

class UsersList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { 
      searchQuery: '',
      users: this.props.list,
    };
  }

  getFilteredUsers(data) {
    const { searchQuery, users } = this.state;

    if (!searchQuery.trim().length) return users;
    
    const searchOptions = {
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ['first_name', 'last_name'],
    };

    const fuse = new Fuse(users, searchOptions);
    return fuse.search(searchQuery).map(result => result.item);
  }

  changeSearchQuery = (e) => {
    this.setState({
      searchQuery: e.currentTarget.value
    });
  };

  sort = (a, b) => {
    if (typeof a !== typeof b) {
      return false;
    }

    if (typeof a === 'string') return a.localeCompare(b);
    if (typeof a === 'boolean') return (a === b) ? 0 : a ? -1 : 1;

    return false;
  };

  filter = (value, field) => {
    if (typeof value !== 'string') {
      return false;
    }

    return Array.isArray(field) ? field.includes(value) : value === field;
  };

  getFilters = (field) => {
    const filtersSet = new Set();

    this.props.list.forEach(user => {
      const value = user[field];

      if (Array.isArray(value)) {
        value.forEach(v => {
          filtersSet.add(v);
        });
      } else if (typeof value === 'string') {
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


  getName = (user) => {
    return `${user.first_name} ${user.last_name}`;
  }

  columns = [
    {
      title: 'Пользователь',
      dataIndex: 'username',
      key: 'username',
      editable: true,
      sorter: (a, b) => this.sort(a.username, b.username),
      filters: this.getFilters('username'),
      filterSearch: true,
      onFilter: (value, user) => this.filter(value, user.username),
    },
    {
      title: 'ФИО',
      key: 'name',
      render: (user) => user.profile_link ? <a href={user.profile_link}>{this.getName(user)}</a> : this.getName(user),
      sorter: (a, b) => this.sort(this.getName(a), this.getName(b)), 
    },
    {
      title: 'Email',
      key: 'email',      
      render: (data) => <a href={`mailto:${data.email}`}>{data.email}</a>,
      sorter: (a, b) => this.sort(a.email, b.email),
      filters: this.getFilters('email'),
      filterSearch: true,
      onFilter: (value, user) => this.filter(value, user.email),
    },
    {
      title: 'Оплачено',
      dataIndex: 'pay_status',
      key: 'pay_status',
      render: (isPaid) => isPaid ? <CheckOutlined style={{color: 'green'}} /> : <CloseOutlined style={{color: 'red'}} />,
      sorter: (a, b) => this.sort(a.pay_status, b.pay_status),
    },
  ];
  
  render() {
    return (
      <div className={s.container}>
        <Input className={s.search} allowClear placeholder="Поиск по ФИО" onChange={this.changeSearchQuery} />
        <Table dataSource={this.getFilteredUsers(this.state.users)} columns={this.columns} bordered/>
      </div>
    );
  }
}

export default UsersList;