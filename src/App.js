import React from 'react';
import s from './App.module.css';
import UsersList from './components/UsersList/UsersList';

import data from './data.json';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: data
    } 
  }

  render() {
    const { usersList } = this.state;

    return (
      <div className={s.container}>
        <UsersList list={usersList}/>
      </div>
    );
  }
}

export default App;
