import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useState } from 'react'
import { Context } from '../index'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    const loginSubmit = () => {
      store.login(email, password)
      setEmail('')
      setPassword('')
    }

    const RegistrationSubmit = () => {
      store.registration(email, password)
      setEmail('')
      setPassword('')
    }

  return (
    <div className='login-form'>
      <div className='input-box'>
        <input 
              type='text' 
              placeholder='Email' 
              value={email}
              onChange={ e => setEmail(e.target.value)}
          />

          <input 
              type='text' 
              placeholder='Password' 
              value={password}
              onChange={ e => setPassword(e.target.value)}
          />
      </div>
      <div className='btn-box'>
        <button onClick={loginSubmit}>Login</button>
        <button onClick ={RegistrationSubmit}>Registration</button>
      </div>
        

    </div>
  )
}

export default observer(LoginForm)