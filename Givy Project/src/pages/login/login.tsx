import { useState } from 'react'
import InputGivy from '../../components/inputGivy/inputGivy'


function Login() {

  return (
    <>
      <InputGivy label="Email" type="email" placeholder="Enter your email" />
      <InputGivy label="Password" type="password" placeholder="Enter your password" />
    </>
  )
}

export default Login