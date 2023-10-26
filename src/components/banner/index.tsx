import Image from 'next/image';
import styles from './styles.module.scss';
import bmw from '@/img/bmw.png';
import { Lexend } from "next/font/google";

const lexend = Lexend({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
})

export default function Banner(){
    return(
        <div className={styles.container}>
            <Image src={bmw} alt='bmw'/>
            <div className={styles.mask}>
                <p className={`${lexend.className} ${styles.pTitle}`}>Motors Shop</p>
                <p className={`${lexend.className} ${styles.pSlogan}`}>A melhor plataforma de anúncios de carros do país</p>
            </div>
        </div>
    )
}