import React from 'react';
import { Input, Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

class UsersTable extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { 
      searchQuery: '',
      users: this.props.data
    };
  }

  changeSearchQuery = (e) => {
    this.searchQuery = e.currentTarget.value;
  };

  sort = (a, b) => {
    a = a || '';
    b = b || '';

    return a.localeCompare(b);
  };

  filter = (value, field) => {
    if (typeof value !== 'string') {
      return false;
    }

    return Array.isArray(field) ? field.includes(value) : value === field;
  };

  getFilters = (field) => {
    const filtersSet = new Set();

    this.props.data.forEach(user => {
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
      filters: this.getFilters(['first_name', 'last_name']),
      filterSearch: true,
      onFilter: (value, user) => this.filter(value, this.getName(user)),
      
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
      key: 'payment_status',
      render: (isPaid) => isPaid ? <CheckOutlined style={{color: 'green'}} /> : <CloseOutlined style={{color: 'red'}} />
    },
  ];
  
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input allowClear placeholder="Поиск пользователей" onChange={this.changeSearchQuery} style={{ marginBottom: 15 }} />
        <Table dataSource={this.state.users} columns={this.columns} bordered/>
      </div>
    );
  }
}

export default UsersTable;