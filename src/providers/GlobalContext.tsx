'use client';
import { api } from "@/services/api";
import React, { createContext, useState, useEffect } from "react";
import { IAnnouncements } from "@/components/card";
import { IAnnouncement, IRegister, IUserAnnouncement } from "./interfaces";
import jwt from "jsonwebtoken";
import { parseCookies, setCookie } from "nookies";

type signInData = {
    email: string;
    password: string;
}

interface IGlobalProviderProps{
    children: React.ReactNode;
}

export interface IUserLoginState {
    id: string;
    email: string;
    name: string;
    cpf: string;
	  phone: string;
	  birth: string;
    description: string;
    type: string;
}

interface IGlobalContext {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    titleModal: string | null;
    setTitleModal: React.Dispatch<React.SetStateAction<string | null>>;
    imgModal: string | null;
    setImgModal: React.Dispatch<React.SetStateAction<string | null>>;
    userLogin: IUserLoginState | null;
    setUserLogin: React.Dispatch<React.SetStateAction<IUserLoginState | null>>;
    getAnnouncement: (id: string) => Promise<void>;
    getAnnouncements: () => Promise<void>;
    announcement: IAnnouncement | null;
    announcements: IAnnouncements[] | null;
    signIn: ({ email, password }: signInData) => Promise<void>;
    user: IUserAnnouncement | null;
    setUser: React.Dispatch<React.SetStateAction<IUserAnnouncement | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    advertiser: IAnnouncements[] | null;
    setAadvertiser: React.Dispatch<React.SetStateAction<IAnnouncements[] | null>>;
    getAdvertiser: (id: string) => Promise<void>;
    registerUser: (data: IRegister) => Promise<void>;
    registerAnnouncement: (data: any) => Promise<void>;
    registerComment: (data: any) => Promise<void>;
    updateAnnouncement: string | null;
    setUpdateAnnouncement: React.Dispatch<React.SetStateAction<string | null>>;
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }:IGlobalProviderProps){
    const [modal, setModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string|null>(null);
    const [imgModal, setImgModal] = useState<string|null>(null);
    const [userLogin, setUserLogin] = useState<IUserLoginState | null>(null);
    const [announcements, setAnnouncements] = useState<IAnnouncements[] | null>(null);
    const [announcement, setAnnouncement] = useState<IAnnouncement | null>(null);
    const [updateAnnouncement, setUpdateAnnouncement] = useState<string | null>(null);
    const [advertiser, setAadvertiser] = useState<IAnnouncements[] | null>(null);
    const [token, setToken] = useState<string|null>(null);
    const [user, setUser] = useState<IUserAnnouncement | null>(null);

    async function verifySigin() {
        const { 'motors.token': recoveredToken } = parseCookies();
        if(recoveredToken){
          setToken(recoveredToken);
          api.defaults.headers.common.Authorization = `Bearer ${recoveredToken}`;
          const decoded = jwt.decode(recoveredToken);
          if(decoded!=null){
            const id = decoded.sub;
            try {
                const response = await api.get(`/users/${id}`);
                setUser(response.data);    
            } catch (error) {
                console.log("Falha ao buscar dados do usuário, faça o login novamente \n", error);
            }
          }
        }
    }

    useEffect(()=>{
        verifySigin();
    },[])

    async function getAnnouncements() {
        try {
          const { data } = await api.get("/announcements");
          setAnnouncements(data);
        } catch (error) {
          console.error(error);
          throw new Error('Failed');
        }
    }

    async function getAdvertiser(id: string) {
      try {
        const { data } = await api.get(`/announcements/advertiser/${id}`);
        setAadvertiser(data);
      } catch (error) {
        console.error(error);
        throw new Error('Failed');
      }
    }

    async function getAnnouncement(id:string) {
        try {
          const { data } = await api.get(`/announcements/${id}`);
          setAnnouncement(data);
        } catch (error) {
          console.error(error);
          throw new Error('Failed');
        }
    }

    async function signIn({ email, password }: signInData){
        try {
          const response = await api.post('/login', {
            email,
            password,
          })    
          const tokenReceived = response.data.token;
          setToken(tokenReceived);
          if(tokenReceived){
            api.defaults.headers.common.Authorization = `Bearer ${tokenReceived}`;
            setCookie(undefined, 'motors.token', tokenReceived, {
                maxAge: 60*60*1, //1 hour
            });
            const decoded = jwt.decode(tokenReceived);
            if(decoded!=null){
                const id = decoded.sub;
                try {
                    const response = await api.get(`/users/${id}`);
                    setUser(response.data);    
                } catch (error) {
                    console.log("Falha ao buscar dados do usuário, faça o login novamente \n", error);
                }
            }
          }
        } catch (error) {
          console.log("Não foi possível realizar o login. \n", error);
        }
    }

    async function registerUser(data: IRegister){
      try {
        const response = await api.post('/users', {
          email: data.email,
          name: data.name,
          cpf: data.cpf,
          phone: data.phone,
          birth: data.birth,
          description: data.description,
          password: data.password,
          type: data.type,
          Address: {
            cep: data.Address.cep,
            state: data.Address.state,
            city: data.Address.city,
            street: data.Address.street,
            number: Number(data.Address.number),
            complement: data.Address.complement,
          }
        })
      } catch (error) {
        console.log("Algo deu errado: \n", error);
      }
    }

    async function registerAnnouncement(data: any){
      const { 'motors.token': recoveredToken } = parseCookies();
      api.defaults.headers.common.Authorization = `Bearer ${recoveredToken}`;
      try {
        const response = await api.post('/announcements', {
          ...data,
        })
        if(user){
          getAdvertiser(user.id);
        }
        getAnnouncements();
      } catch (error) {
        console.log("Algo deu errado: \n", error);
      }
    }

    async function registerComment(data: any){
      const { 'motors.token': recoveredToken } = parseCookies();
      api.defaults.headers.common.Authorization = `Bearer ${recoveredToken}`;
      try {
        const response = await api.post('/comments', {
          ...data,
        })
        getAnnouncement(data.announcement_id);
      } catch (error) {
        console.log("Algo deu errado: \n", error);
      }
    }

    return(
        <GlobalContext.Provider value={{ 
            announcement, 
            announcements,
            getAnnouncement, 
            getAnnouncements,
            getAdvertiser,
            modal, 
            setModal, 
            titleModal, 
            setTitleModal, 
            imgModal, 
            setImgModal, 
            userLogin, 
            setUserLogin,
            signIn,
            user, 
            setUser,
            token,
            setToken,
            advertiser, 
            setAadvertiser,
            registerUser,
            registerAnnouncement,
            registerComment,
            updateAnnouncement,
            setUpdateAnnouncement,
        }}>
            {children}
        </GlobalContext.Provider>
    );
}