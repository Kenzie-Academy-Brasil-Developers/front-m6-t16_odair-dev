import styles from './styles.module.scss';
import { Lexend } from "next/font/google";

const lexend = Lexend({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
})

export default function Modal(){
    return(
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.description}>
                    <p className={lexend.className}>Imagem do veículo</p>
                    <div className={styles.btnClose}>X</div>
                </div>
                <div className={styles.divImg}></div>
            </div>
        </div>
    )
}