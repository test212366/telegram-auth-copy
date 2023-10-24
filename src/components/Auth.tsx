import {useEffect, useRef, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { countries } from '../utils'
import ConfirmCode from './ConfirmCode'
import Qrcode from './Qrcode'


export let number:any = null
 

const Auth = () => {

	const navigate = useNavigate()

	const [keepSigned, setSigned] = useState<boolean>(true),
		[showCoutries, setShowC] = useState<boolean>(false),
		[currentCountry, setCurrentCoutry] = useState<string>(''),
		[changeLanguage, setChangeLang] = useState<boolean>(false),
		[loader, setLoader] = useState<boolean>(false),
		[wrongNum, setWrongNum] = useState<boolean>(false),
		[numberPhone, setNumPhone] = useState<string>(''),
		[currentV, setCurrentV] = useState<string>(''),
		[focus, setFocus] = useState<boolean>(false),
		[showQrCode, setShowQR] = useState<boolean>(false),
		[confirmCode, setConfirm] = useState<boolean>(false)

	const inputRef = useRef<HTMLInputElement>(null),
		phoneRef = useRef<HTMLInputElement>(null)


	const setNum = (e:any) => setNumPhone(e.target.value),
		setC = (e:any) => setCurrentV(e.target.value)
		

	const getApi = async () => {
		try {
			fetch('https://ipapi.co/json/').then(response => response.json())
			.then(data => 	data.country_name === 'Russia' ? setCurrent(countries[69].name, countries[69].num) : countries.forEach((coutnry, i:number) => coutnry.name === data.country_name && setCurrent(countries[i].name, countries[i].num)))
		} catch(e:any) {
			console.log(e)
		}
		 
	}


	useEffect(() => {getApi()}, [])


	const setSig = () => setSigned(!keepSigned),
		setCoutries = () => setShowC(!showCoutries),
		setChangeLan = () => setChangeLang(!changeLanguage),
		setLoad = () => setLoader(!loader),
		setCurrent = (name: string, num:string) => {
			setCurrentCoutry(name)
			inputRef.current && setCurrentV(name) 
			setShowC(false)
			phoneRef.current && setNumPhone(num)
		},
		auth = () => {
		 
			if(inputRef.current?.value && phoneRef.current && phoneRef.current?.value.length !== 17)  return setWrongNum(!wrongNum)
		
			number = phoneRef.current!.value
			setLoad() 
			try {
				fetch('http://localhost:5000/api/auth/login', {
					headers: {
						'Content-Type': 'application/json',
				 
					},
					method: 'POST',
					body: JSON.stringify({
						phoneNumber: phoneRef.current?.value.trim(),
						setupStep: 1
					})
				})
					.then(response => response.json())
					.then(data => {
						console.log(data)
						setLoad()
						setConfirm(true)
					 
					})
				 
				} catch(e: any) {console.log(e)}
		}
		useEffect(() => {
			if(numberPhone.length >= 6 && numberPhone.length < 7) setNumPhone(`${numberPhone}  `)
			 else if (numberPhone.length >= 11 && numberPhone.length < 12) setNumPhone(`${numberPhone}  `)	
			
		}, [numberPhone.length])
 
	return (
		<>
			{showCoutries && <div onClick={setCoutries} className='overlay'></div>}
			<section className={`main__auth main__tr-r ${!showQrCode && !confirmCode ? 'activeMain' : ''} `}>
			<div className="auth__wrapper">
				<svg className="auth__logo" xmlns="http://www.w3.org/2000/svg" fill="#8774E0" viewBox="0 0 50 50" width="150px" height="150px"><path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"/></svg>

					<div className="auth__titles">
						{changeLanguage ? <h2>Войти в Telegram</h2> : <h2>Sign in to Telegram</h2>}
						
						{changeLanguage ? <p>Проверьте страну и введите свой номер телефона.</p> : <p> Please confirm your country and <br/> enter your phone number.</p>}
						
					</div>
					<div className="auth__inputs">

						<div className="auth__input">
							<input ref={inputRef} value={currentV} onChange={(e:any) => setC(e)} className={`${showCoutries ? 'activeInp' : "" }`} onClick={setCoutries} type="text"   />
							<span className={`auth__placeholder ${showCoutries ? 'activeColor' : ""} ${currentCountry || currentV.length > 0 ? 'active' : ''}`}>{`${changeLanguage ? 'Страна' : 'Country'} `}</span>
								<svg className={showCoutries ? 'arrow activeSVG' : 'arrow'} onClick={setCoutries} xmlns="http://www.w3.org/2000/svg" width="24" fill={`${showCoutries ? '#8774E0' : '#ACACAC'} `} height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
							
							
							

							<div className={`auth__set-country ${showCoutries ? 'active' : ''}`}>
								{countries.map((countr, i) => <div onClick={() => setCurrent(countr.name, countr.num)} className='coutr-item' key={i}>
									<div>
										<img width='32px' height='32px' src={countr.img} alt="countImg" />
										<p className='coutr-p'>{countr.name}</p>
									</div>
									<p className='number'>{countr.num}</p>
									
								</div>)}
							</div>
						</div>

						<div className="auth__input">
							<input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} ref={phoneRef} value={numberPhone} onChange={(e:any) => setNum(e)} className={`${wrongNum ? 'wrongInput activej' : "activej"}`} type="text"    />
							
							<span className={`auth__placeholder ${wrongNum ? 'wrongColor' :""} ${focus ? 'activeColor' : ''}  ${ numberPhone.length > 0 ? 'active' : ''}`}>{`${changeLanguage ? 'Номер телефона' : 'Phone Number'} `}</span>
							
							 <div className={`auth__nums-n ${currentCountry ? 'activeNums' : ""}`}>	
								<div className='auth__length-num'>
																<div className='auth__length-num w-50'>
																 	{numberPhone.length < 4 && <div className='auth__lenght-item'></div>}
																	{numberPhone.length < 5 && <div className='auth__lenght-item'></div>}
																	{numberPhone.length < 6 && <div className='auth__lenght-item'></div>}
																 
																</div>
															
																<div className='auth__length-num w-50'>
																	{numberPhone.length < 9 && <div className='auth__lenght-item'></div>}
																	{numberPhone.length < 10 && <div className='auth__lenght-item'></div>}
																	{numberPhone.length < 11 && <div className='auth__lenght-item'></div>}
																</div>

																<div className='auth__length-num w-60'>
																	{numberPhone.length < 14 && <div className='auth__lenght-item'></div>}
																	{numberPhone.length < 15 && <div className='auth__lenght-item'></div>}
																	{numberPhone.length < 16 && <div className='auth__lenght-item'></div>}
																	{numberPhone.length < 17 && <div className='auth__lenght-item'></div>}
																	
																	 

																</div>
																
														</div>
							</div>
							
							
				 		</div>

						<div   className="auth__checkbox">
							<input type="checkbox" id="checkbox" />
							<label onClick={setSig} id="check" className={`${keepSigned ? 'active' : ''}`} htmlFor="checkbox">
								<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 30 30" width="15px" height="15px"><path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"/></svg>
							</label>
							<label onClick={setSig} id="text" htmlFor="checkbox">{changeLanguage ? 'Запомнить меня' : 'Keep me signed in'} </label>
						</div>
					</div>
					<button onClick={auth} className="auth__button-next auth__button">{changeLanguage && !loader ? 'ДАЛЕЕ' : !loader ? 'NEXT' : ''}
						{changeLanguage && loader ? 'ПОЖАЛУЙСТА ПОДОЖДИТЕ..' : loader ? 'PLEASE WAIT..' : ''} 
						{loader && <div className="lds-ring loader"><div></div><div></div><div></div><div></div></div>}
					</button>
				 
						<button onClick={() => setShowQR(true)} className="auth__button">{changeLanguage ? 'ВХОД ПО QR-КОДУ' : 'LOG IN BY QR CODE'} </button>
					
				 
					 {changeLanguage ? '' : <button className="auth__button" onClick={setChangeLan}>ПРОДОЛЖИТЬ НА РУССКОМ</button>
						}
					
					
					 


			</div>
			</section>
			<Qrcode setShowQR={setShowQR} showQrCode={showQrCode}  />
			<ConfirmCode setShowQR={setConfirm} showQrCode={confirmCode}/>
		</>
	
	)
}
export default Auth