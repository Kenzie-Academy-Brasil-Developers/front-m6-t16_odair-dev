'use client';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { Lexend } from "next/font/google";
import { useContext, useState } from 'react';
import { GlobalContext } from '@/providers/GlobalContext';
import { useRouter } from "next/navigation";

const lexend = Lexend({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
})

type Inputs = {
    email: string;
	name: string;
	cpf: string;
	phone: string;
	birth: string;
	description: string;
	password: string;
	type: string;
	Address: {
	    cep: string;
  	    state: string;
		city: string;
  	    street: string;
  	    number: number;
  	    complement: string;
	}
}

export default function Register(){
    const  { registerUser } = useContext(GlobalContext);
    const [type, setType] = useState<string>("COMPRADOR"); 
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    async function onSubmit(data:any){
        await registerUser({...data, type: type});
        reset({ 
            email: "",
            name: "",
            cpf: "",
            phone: "",
            birth: "",
            description: "",
            password: "",
            type: "",
            Address: {
                cep: "",
  	            state: "",
		        city: "",
  	            street: "",
  	            number: 0,
  	            complement: "",
            } 
        });
        // router.push('/');
    }

    function changeToCOMPRADOR(){
        if(type=="ANUNCIANTE"){
            setType("COMPRADOR");
        }
    }

    function changeToANUNCIANTE(){
        if(type=="COMPRADOR"){
            setType("ANUNCIANTE");
        }
    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className={`${lexend.className} ${styles.pRegister}`}>Cadastro</p>
                <p className={styles.pInfo}>Informações pessoais</p>
                <label htmlFor="inpName" className={styles.lblRegister}>Nome</label>
                <input 
                    type="text" 
                    id="inpName" 
                    required
                    className={styles.inpRegister} 
                    placeholder='Ex. Samuel Leão'
                    {...register('name')}
                />
                <label htmlFor="inpEmail" className={styles.lblRegister}>Email</label>
                <input 
                    type="email" 
                    id="inpEmail" 
                    required
                    className={styles.inpRegister} 
                    placeholder='Ex. samuel@kenzie.com.br'
                    {...register('email')}
                />
                <label htmlFor="inpCpf" className={styles.lblRegister}>CPF</label>
                <input 
                    type="text" 
                    id="inpCpf" 
                    required
                    className={styles.inpRegister} 
                    placeholder='000.000.000-00'
                    {...register('cpf')}
                />
                <label htmlFor="inpPhone" className={styles.lblRegister}>Celular</label>
                <input 
                    type="text" 
                    id="inpPhone" 
                    required
                    className={styles.inpRegister} 
                    placeholder='(DDD) 90000-0000'
                    {...register('phone')}
                />
                <label htmlFor="inpBirth" className={styles.lblRegister}>Data de nascimento</label>
                <input 
                    type="date" 
                    id="inpBirth" 
                    required
                    className={styles.inpRegister} 
                    placeholder='00/00/0000'
                    {...register('birth')}
                />
                <label htmlFor="inpDescription" className={styles.lblRegister}>Descrição</label>
                <textarea 
                    id="inpDescription" 
                    required
                    className={styles.inpDescription} 
                    placeholder='Digitar descrição'
                    {...register('description')}
                ></textarea>
                <p className={styles.pInfo}>Informações de endereço</p>
                <label htmlFor="inpCep" className={styles.lblRegister}>CEP</label>
                <input 
                    type="text" 
                    id="inpCep" 
                    required
                    className={styles.inpRegister} 
                    placeholder='00000-000'
                    {...register('Address.cep')}
                />
                <div className={styles.divGroup}>
                    <div className={styles.divSide}>
                        <label htmlFor="inpState" className={styles.lblRegister}>Estado</label>
                        <input 
                            type="text" 
                            id="inpState" 
                            required
                            className={styles.inpRegister} 
                            placeholder='Digitar Estado'
                            {...register('Address.state')}
                        />
                    </div>
                    <div className={styles.divSide}>
                        <label htmlFor="inpCity" className={styles.lblRegister}>Cidade</label>
                        <input 
                            type="text" 
                            id="inpCity" 
                            required
                            className={styles.inpRegister} 
                            placeholder='Digitar cidade'
                            {...register('Address.city')}
                        />
                    </div>
                </div>
                <label htmlFor="inpStreet" className={styles.lblRegister}>Rua</label>
                <input 
                    type="text" 
                    id="inpStreet" 
                    required
                    className={styles.inpRegister} 
                    placeholder='Digitar rua'
                    {...register('Address.street')}
                />
                <div className={styles.divGroup}>
                    <div className={styles.divSide}>
                        <label htmlFor="inpNumber" className={styles.lblRegister}>Número</label>
                        <input 
                            type="number" 
                            id="inpNumber" 
                            required
                            className={styles.inpRegister} 
                            placeholder='Digitar número'
                            {...register('Address.number')}
                        />
                    </div>
                    <div className={styles.divSide}>
                        <label htmlFor="inpComplement" className={styles.lblRegister}>Complemento</label>
                        <input 
                            type="text" 
                            id="inpComplement" 
                            required
                            className={styles.inpRegister} 
                            placeholder='Ex: apart 307'
                            {...register('Address.complement')}
                        />
                    </div>
                </div>
                <p className={styles.pInfo}>Tipo de conta</p>  
                <div className={styles.divGroup}>
                    <div onClick={()=>changeToCOMPRADOR()} className={type=="COMPRADOR" ? styles.onButton : styles.offButton}>Comptador</div>
                    <div onClick={()=>changeToANUNCIANTE()} className={type=="COMPRADOR" ?  styles.offButton : styles.onButton}>Anunciante</div>
                </div>
                <label htmlFor="inpPassword" className={styles.lblRegister}>Senha</label>
                <input 
                    type="password" 
                    id="inpPassword" 
                    required
                    className={styles.inpRegister} 
                    placeholder='Digitar senha'
                    {...register('password')}
                />
                <label htmlFor="inpConfirmPassword" className={styles.lblRegister}>Confirmar Senha</label>
                <input 
                    type="password" 
                    id="inpConfirmPassword" 
                    required
                    className={styles.inpRegister} 
                    placeholder='Digitar senha'
                />
                <button>Finalizar cadastro</button>
            </form>
        </div>
    )
}