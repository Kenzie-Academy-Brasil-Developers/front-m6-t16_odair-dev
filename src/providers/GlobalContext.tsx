'use client';
import React, { createContext, useState } from "react";

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
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }:IGlobalProviderProps){
    const [modal, setModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string|null>(null);
    const [imgModal, setImgModal] = useState<string|null>(null);
    const [userLogin, setUserLogin] = useState<IUserLoginState | null>(null);

    return(
        <GlobalContext.Provider value={{ modal, setModal, titleModal, setTitleModal, imgModal, setImgModal, userLogin, setUserLogin }}>
            {children}
        </GlobalContext.Provider>
    );
}