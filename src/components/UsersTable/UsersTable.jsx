import React from 'react';
import { Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

class UsersTable extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { };
  }

  sort = (a, b) => {
    a = a || '';
    b = b || '';

    return a.localeCompare(b);
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
    },
    {
      title: 'ФИО',
      key: 'first_name',
      render: (user) => user.profile_link ? <a href={user.profile_link}>{this.getName(user)}</a> : this.getName(user),
      sorter: (a, b) => this.sort(this.getName(a), this.getName(b)),
    },
    {
      title: 'Email',
      key: 'email',      
      render: (data) => <a href={`mailto:${data.email}`}>{data.email}</a>,
      sorter: (a, b) => this.sort(a.email, b.email),
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
      <Table dataSource={this.props.data} columns={this.columns} bordered/>
    );
  }
}

export default UsersTable;