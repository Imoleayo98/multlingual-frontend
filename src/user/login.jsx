import React, { useState } from 'react'
import { CContainer, CForm, CFormInput, CFormLabel, CFormText, CFormCheck, CButton } from '@coreui/react'

function UserLogin() {

    const [loginCred, setLoginCred] = useState({})
    const [to, setTo] = useState()
    const setCred = (e,field) => {
        setLoginCred({...loginCred, [field] : e.target.value})
    }

    const setTheLang = (e) => {
        setTo(e.target.value)
    }

    const Login = (e) => {
        e.preventDefault()
        sessionStorage.setItem('from','en')
        sessionStorage.setItem('to',to ? to: 'en')
        if(loginCred.email != 'useremail@gmail.com' || loginCred.password != '12345678'){
            alert('Invalid credentials')
            return
        }else{
            window.location.href='/user/reported'
        }
    }
  return (
    <>
    <div className='' style={{fontSize:"30px"}}><b>LOGIN</b></div>
    <CContainer className='border rounded bg-white mt-5 p-3'>
        <CForm className='text-start' onSubmit={Login}>
            <div className="mb-3">
                <CFormLabel htmlFor="exampleInputEmail1">Email address</CFormLabel>
                <CFormInput onChange={(e) => setCred(e,'email')} type="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <CFormLabel htmlFor="exampleInputPassword1">Email Password</CFormLabel>
                <CFormInput onChange={(e) => setCred(e,'password')} type="password" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <select onChange={(e) => setTheLang(e)} class="form-select" aria-label="Default select example">
                    <option value="en">English</option>
                    <option value="ig">Igbo</option>
                    <option value="yo">Yoruba</option>
                    <option value="ha">Hausa</option>
                </select>
            </div>
            <CButton type="submit" color="primary" style={{background:"#184B8D"}}>
               Login
            </CButton>
        </CForm>
    </CContainer>
    </>
  )
}

export default UserLogin