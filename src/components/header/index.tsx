'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import Logo from '@/img/Logo.svg';
import Menu from '@/img/Hamburguer.svg';
import Xis from '@/img/xis.svg';
import { useContext, useState } from 'react';
import { GlobalContext } from '@/providers/GlobalContext';

export default function Header(){
    const { userLogin } = useContext(GlobalContext);
    const [ openMenu, setOpenMenu ] = useState(false);

    function handleMenu(){
        if(openMenu){
            setOpenMenu(false);
        }else{
            setOpenMenu(true);
        }
    }

    return(
        <div className={!openMenu ? styles.container : `${styles.container} ${styles.container2}`}>
            <div className={styles.maxSize}>
                <div className={styles.logo}>
                    <Image src={Logo} alt='Logotipo' />
                </div>
                <Image className={styles.hamburguer} src={!openMenu ? Menu : Xis} alt='Menu' onClick={()=>handleMenu()}/>
                {!userLogin ? 
                    <div className={styles.menu}>
                        <button className={styles.btnLogin}>Fazer Login</button>
                        <button className={styles.btnRegister}>Cadastrar</button>
                    </div>
                :
                    <div className={styles.menu} onClick={()=>handleMenu()}>
                        <div className={styles.circle}>SL</div>
                        <p>Samuel Leão</p>
                    </div>
                }
                {openMenu && userLogin ? 
                    <ul>
                        <li>Editar Perfil</li>
                        <li>Editar Endereço</li>
                        <li>Meus Anúncios</li>
                        <li onClick={()=>handleMenu()}>Sair</li>
                    </ul>
                : openMenu && !userLogin ? 
                    <div className={styles.divBtns}>
                        <button className={styles.btnLogin}>Fazer Login</button>
                        <button className={styles.btnRegister}>Cadastrar</button>
                    </div>
                :
                null 
                }
            </div>
        </div>
    )
}