import Image from 'next/image';
import styles from './styles.module.scss';
import { Lexend } from "next/font/google";

const lexend = Lexend({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
})

interface ImgAnnouncement{
    id: string;
	url: string;
    announcement_id: string;
}
interface IAnnouncements{
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
	user_id: string;
	image: ImgAnnouncement[];
}
interface IProps{
    announcement: IAnnouncements;
}

export default function Card({announcement}:IProps){
    return(
        <div className={styles.container}>
            <div className={styles.divImg}>
                <Image 
                    src={`${announcement.image[0].url}`}
                    alt={`${announcement.model}`}  
                    height={500} 
                    width={500}    
                />
            </div>
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
                    <p>R</p>
                </div>
                <p>Anunciante</p>
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
        </div> 
    )
}