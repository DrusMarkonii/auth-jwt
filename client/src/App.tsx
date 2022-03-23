import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import './App.css';
import LoginForm from './component/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  },[])

  async function getUsers() {
    try {
     const response = await UserService.fetchUsers();
     setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if(store.isLoading) {
    return <div>Loading...</div>
  }

  if(!store.isAuth) {
    return (<>
      <LoginForm />
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    </>
    )
  }
  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}`: 'Авторизуйтесь'}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте': "ПОДТВЕРДИТЕ АККАУНТ"}</h1>
      <button onClick={() => store.logout() }>Exit</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map(user => <div key={user.id}>{user.email}</div>)}
    </div>
  );
}

export default observer(App);
