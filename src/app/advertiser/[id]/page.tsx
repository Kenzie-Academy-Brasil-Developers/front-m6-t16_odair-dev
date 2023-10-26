'use client';
import Card, { IAnnouncements } from '@/components/card';
import styles from './styles.module.scss';
import { Lexend } from "next/font/google";
import { useContext, useEffect } from 'react';
import { GlobalContext } from '@/providers/GlobalContext';
import ModalAnnouncement from '@/components/modal/modalAnnouncement/register';
import { IAnnouncement } from '@/providers/interfaces';

const lexend = Lexend({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
})

interface IId{
    id: string;
}
interface IParams{
    params: IId;
}

export default function Advertiser({params}:IParams){
    const { advertiser, getAdvertiser, user, setModal, setTitleModal } = useContext(GlobalContext);

    useEffect(()=>{
        getAdvertiser(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function handleNewAnnouncement(){
        setModal(true);
    }

    return(
        <div className={styles.container}>
            <ModalAnnouncement />
            <div className={styles.divBlue}></div>
            <div className={styles.maxSize}>
                <div className={styles.description}>
                    <div className={styles.circle}>{advertiser? (advertiser[0].user.name[0]).toLocaleUpperCase() :null}</div>
                    <div className={styles.divName}>
                        <p className={`${lexend.className} ${styles.pName}`}>{advertiser? (advertiser[0].user.name) :null}</p>
                        <div className={styles.divAdvertiser}>Anunciante</div>
                    </div>
                    <div className={styles.divDescription}>
                        <p className={styles.pDescription}>{advertiser? (advertiser[0].user.description) :null}</p>
                    </div>
                    {user?.id==params.id ? 
                        <button onClick={()=>handleNewAnnouncement()} className={styles.btnNewAnnouncement}>Criar anuncio</button>
                    :null}
                </div>
                <div className={styles.divTitle}>
                    <p className={`${lexend.className} ${styles.pTitle}`}>Anúncios</p>
                </div>
                <div className={styles.divCards}>
                    { advertiser ? 
                        advertiser.map((announcement:IAnnouncements)=>(
                            <Card announcement={announcement} key={announcement.id}/> 
                        ))
                    : null }
                </div>
            </div>
        </div>
    )
}