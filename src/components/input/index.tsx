import styles from './styles.module.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })
//Faço as minhas componentizações através dos mixins quando componentes pequenos
//O input esta padronizado em: src/scss/abstracts/_mixin.scss 
//aqui apenas exemplifico o seu uso.
export default function InpExemplo(){
    return(
        <form className={styles.container}>
            <label htmlFor="inpDefault1">Label</label>
            <input className={styles.inpDefault1} type="text" id='inpDefault1' placeholder='Placeholder'/>
            <label htmlFor="inpDefault2">Label</label>
            <textarea className={`${styles.inpDefault2} ${inter.className}`} id="inpDefault2" placeholder='Placeholder'></textarea>
            <label htmlFor="inpDefault3">Label</label>
            <select id="inpDefault3" className={styles.inpDefault3}>
                <option value="valor1">Select an option</option>
                <option value="valor2">Valor 2</option>
            </select>
        </form>
    )
}