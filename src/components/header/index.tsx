'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import Logo from '@/img/Logo.svg';
import Menu from '@/img/Hamburguer.svg';
import Xis from '@/img/xis.svg';
import { useContext, useState } from 'react';
import { GlobalContext } from '@/providers/GlobalContext';
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

export default function Header(){
    const { userLogin, user, setToken, setUser } = useContext(GlobalContext);
    const [ openMenu, setOpenMenu ] = useState(false);
    const router = useRouter();

    function handleMenu(){
        if(openMenu){
            setOpenMenu(false);
        }else{
            setOpenMenu(true);
        }
    }

    function handleLogin(){
        router.push('/login');
        if(openMenu){
            setOpenMenu(false);
        }
    }

    function handleRegister(){
        router.push('/register');
        if(openMenu){
            setOpenMenu(false);
        }
    }

    function handleLogout(){
        destroyCookie(null, 'motors.token');
        setUser(null);
        setToken(null);
        handleMenu();
        router.push('/');
    }

    function goBack(){
        router.push('/');
    }

    function goAdvertiser(){
        handleMenu();
        if(user){
            router.push(`/advertiser/${user.id}`);
        }
    }

    return(
        <div className={!openMenu ? styles.container : `${styles.container} ${styles.container2}`}>
            <div className={styles.maxSize}>
                <div className={styles.logo}>
                    <Image src={Logo} alt='Logotipo' onClick={()=>goBack()}/>
                </div>
                <Image className={styles.hamburguer} src={!openMenu ? Menu : Xis} alt='Menu' onClick={()=>handleMenu()}/>
                {!user ? 
                    <div className={styles.menu}>
                        <button className={styles.btnLogin} onClick={()=>handleLogin()}>Fazer Login</button>
                        <button className={styles.btnRegister} onClick={()=>handleRegister()}>Cadastrar</button>
                    </div>
                :
                    <div className={styles.menu} onClick={()=>handleMenu()}>
                        <div className={styles.circle}>{(user.name[0]).toLocaleUpperCase()}</div>
                        <p>{user.name}</p>
                    </div>
                }
                {openMenu && user ? 
                    <ul>
                        <li>Editar Perfil</li>
                        <li>Editar Endereço</li>
                        <li onClick={()=>goAdvertiser()}>Meus Anúncios</li>
                        <li onClick={()=>handleLogout()}>Sair</li>
                    </ul>
                : openMenu && !user ? 
                    <div className={styles.divBtns}>
                        <button className={styles.btnLogin} onClick={()=>handleLogin()}>Fazer Login</button>
                        <button className={styles.btnRegister} onClick={()=>handleRegister()}>Cadastrar</button>
                    </div>
                :
                null 
                }
            </div>
        </div>
    )
}