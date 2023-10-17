import Image from 'next/image';
import styles from './styles.module.scss';
import Logo from '@/img/Logo_white.svg';
import Home from '@/img/btnHome.svg';

export default function Footer(){
    return(
        <div className={styles.container}>
            <div className={styles.maxSize}>
                <div>
                    <a href="#topHome">
                        <Image src={Logo} alt='Logotipo'/>
                    </a>
                </div>
                <div>
                    <p>© 2022 - Todos os direitos reservados.</p>
                </div>
                <div>
                    <a href="#topHome">
                        <Image src={Home} alt='Home'/>
                    </a>
                </div>
            </div>
        </div>
    )
}