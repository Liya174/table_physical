import React from 'react';
import s from './App.module.css';
import UsersTable from './components/UsersTable/UsersTable';

import data from './data.json';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data
    } 
  }

  render() {
    const { data } = this.state;

    return (
      <div className={s.container}>
        <UsersTable data={data}/>
      </div>
    );
  }
}

export default App;
