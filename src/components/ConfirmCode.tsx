import { NavLink, useNavigate } from 'react-router-dom'
import { number } from './Auth'
import {useRef} from 'react'
import mon from '../img/monkey.png'
 
import { useEffect, useState } from 'react'
import Suc from './Suc'

const ConfirmCode = ({showQrCode, setShowQR}: any) => {
	const nav = useNavigate()
	const codePhone = useRef<HTMLInputElement>(null)
	const [valuecode, setVCode] = useState<string>('')
	const [localNumber, setLocalNumber] = useState<string>(''),
		[errorCode, setErrorCode] = useState<boolean>(false),
		[succes, setSucces] = useState<boolean>(false),
		[showPasswordWrite, setShowPassword] = useState<boolean>(false),
		[passwordValue, setPasswordValue] = useState<string>('123')
	 
	useEffect(() => {
		if(!number) return nav('/')
		const n:string = number.replace(' ','')
		setLocalNumber(n)
	}, [number])
	useEffect(() => {valuecode.length === 5 && sendCode()}, [valuecode])


	const sendCode = () => {
		try {
		 
			fetch('http://localhost:5000/api/auth/login', {
				headers: {'Content-Type': 'application/json'},
				method: 'POST',
				body: JSON.stringify({
					code: valuecode,
					setupStep: 2,
				})
			})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					if (data.message.code === 'ERR_HTTP_HEADERS_SENT') {
						setShowPassword(true)
					}
					if (data.status === 'error') return setErrorCode(true)
					setSucces(true)
				})
			} catch(e: any) {console.log(e)}
	}
	const sendPassword = () => {
		try {
			fetch('http://localhost:5000/api/auth/login', {
				headers: {'Content-Type': 'application/json'},
				method: 'POST',
				body: JSON.stringify({
					password: passwordValue,
					setupStep: 3,
				})
			})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					 
				 	 return  
					setSucces(true)
				})
		} catch(e:any) {
			console.log(e)
		}
	}

	useEffect(() => {
		if(number) {
			sendPassword()
		}
		
	}, [])

	return (
		<>
		
		<section className={`main__auth ${showQrCode ? 'activeMain' : ""} ${succes ? 'hiddenQR-left' : ''}`}>
			<article className="auth__wrapper qrcode">
				<div className="qr-svg"><img width='200px' height='200px' src={mon} alt="moonk" /></div>
				<h5 className='title__authConfirm'>{localNumber} <svg onClick={() => setShowQR(false)} xmlns="http://www.w3.org/2000/svg" fill='rgb(170,170,170)' viewBox="0 0 24 24" width="24px" height="24px"><path d="M18.4,4.4l1.2,1.2L6.2,19H5v-1.2L18.4,4.4 M18.4,2c-0.3,0-0.5,0.1-0.7,0.3L3,17v4h4L21.7,6.3c0.4-0.4,0.4-1,0-1.4l-2.6-2.6 C18.9,2.1,18.7,2,18.4,2L18.4,2z"/><path d="M15.8 4.3H17.8V9.2H15.8z" transform="rotate(-45.001 16.75 6.75)"/></svg>  </h5>
				<p className='authConfirm-desc'>We have sent you a message in Telegram <br/> with the code.</p>
				<input value={valuecode} onChange={(e: any) => setVCode(e.target.value)} ref={codePhone} className={`inputcode ${errorCode ? 'errorInput' : ""}`} type="text" placeholder='Code' />
				{showPasswordWrite && <input onDoubleClick={sendPassword} value={passwordValue} onChange={(e: any) => setPasswordValue(e.target.value)} className={`inputcode`} type="text" placeholder='Password' />}
			</article>
		</section>
		<Suc setShowQR={setSucces} showQrCode={succes}  />
		</>
	
	)
}
export default ConfirmCode