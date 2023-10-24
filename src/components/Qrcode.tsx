import { useState } from "react"
import { NavLink } from "react-router-dom"
import qr from '../img/qr-code.png'

const Qrcode = ({showQrCode, setShowQR}: any) => {
	const [changeLanguage, setChangeLang] = useState<boolean>(false)

	const setChangeLan = () => setChangeLang(!changeLanguage)
	return (
		<section className={`main__auth ${showQrCode ? 'activeMain' : ""}`}>
				<div className="auth__wrapper qrcode">
					<div className="qr-svg">
						 <img className="qr-code-img" src="http://qrcoder.ru/code/?http%3A%2F%2Flocalhost%3A3000%2F&10&0" width="330" height="330" title="QR код" />
						
								 
 
					</div>
					<p className="title-qr">{`${changeLanguage ? 'Быстрый вход по QR-коду' : 'Log in to Telegram by QR Code' }`}</p>
					<p className="des"> {`${changeLanguage ? '1. Откройте Telegram с телефона' : '1. Open Telegram on your phone' }`}</p>
					<p className="des">  {`${changeLanguage ? '2. Перейдите в Настройки → Устройства → Подключить устройство' : '2. Go to Settings → Devices → Link Desktop Device' }`}</p>
					<p className="des">   {`${changeLanguage ? '3. Для подтверждения направьте камеру телефона на этот экран.' : '3. Point your phone at this screen to confirm login' }`}</p>

			 
					
						<button onClick={() => setShowQR(false)} className="auth__button w-100">{changeLanguage ? 'ВХОД ПО НОМЕРУ ТЕЛЕФОНА' : 'LOG IN BY PHONE NUMBER'} </button>
					
					
					 {changeLanguage ? '' : <button onClick={setChangeLan} className="auth__button">ПРОДОЛЖИТЬ НА РУССКОМ</button>
}
						 
					
				</div>

		</section>
	)
}
export default Qrcode