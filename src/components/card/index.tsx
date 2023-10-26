'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Lexend } from "next/font/google";
import Link from 'next/link';
import { GlobalContext } from '@/providers/GlobalContext';
import { useContext, useState } from 'react';
import { IAnnouncement } from '@/providers/interfaces';

const lexend = Lexend({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
})

interface IUserAnnouncement{
    id: string;
    email: string;
    name: string;
    cpf: string;
    phone: string;
    birth: string;
    description: string;
    password: string;
    type: string;
}
interface ImgAnnouncement{
    id: string;
	url: string;
    announcement_id: string;
}
export interface IAnnouncements{
    id: string;
	mark: string;
	model: string;
	year: number;
	fuel: string;
	km: number;
	color: string;
	price: number;
	fipe: number;
	description: string;
	user: IUserAnnouncement;
	image: ImgAnnouncement[];
}
interface IProps{
    announcement: IAnnouncements;
}

export default function Card({announcement}:IProps){
    const { user, advertiser, setModal, setUpdateAnnouncement } = useContext(GlobalContext);

    function handleUpdate() {
        console.log(announcement);
        setUpdateAnnouncement(announcement.mark);
        setModal(true);
    };

    return(
        <div className={styles.container}>
            <Link className={styles.divImg} href={`/product/${announcement.id}`}>
                {(announcement.image).length>0 ?
                    <Image 
                        src={`${announcement.image[0].url}`}
                        alt={`${announcement.model}`}  
                        height={500} 
                        width={500}    
                    />
                : null}
            </Link>
            <div className={styles.divTitle}>
                <p className={lexend.className}>{announcement.mark} - {announcement.model}</p>
            </div>
            <div className={styles.divDescription}>
                <p>
                    {
                        (announcement.description).length>80 ? 
                            `${(announcement.description).substring(0, 80)}...` 
                        : 
                            announcement.description
                    }
                </p>
            </div>
            <div className={styles.divUser}>
                <div className={styles.divCircle}>
                    <p>{(announcement.user.name[0]).toUpperCase()}</p>
                </div>
                <p>{announcement.user.name}</p>
            </div>
            <div className={styles.divDetail}>
                <div className={styles.divKmYear}>
                    <div>
                        <p>{announcement.km} KM</p>
                    </div>
                    <div>
                        <p>{announcement.year}</p>
                    </div>
                </div>
                <div className={styles.divPrice}>
                    <p className={lexend.className}>
                        {(announcement.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </p>
                </div>
            </div>
            {user?.id==announcement.user.id&&advertiser!=null ? 
                <div className={styles.owner}>
                    <button onClick={()=>handleUpdate()}>Editar</button>
                    <button>Ver detalhes</button>
                </div>
            :null}
        </div> 
    )
}