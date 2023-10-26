'use client';
import Banner from "@/components/banner";
import Card, { IAnnouncements } from "@/components/card";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modal";
import { GlobalContext } from "@/providers/GlobalContext";
import { api } from "@/services/api";
import { useContext, useEffect } from 'react';

export default function Home() {
  // const { data } = await api.get("/announcements");
  const { getAnnouncements, announcements, setAadvertiser } = useContext(GlobalContext);

  useEffect(()=>{
    if(!announcements){
      getAnnouncements();
    }
    setAadvertiser(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <main>
      <Banner />
      <Container>
        { announcements ? 
            announcements.map((announcement:IAnnouncements)=>(
              <Card announcement={announcement} key={announcement.id}/> 
            ))
        : null }
      </Container>
    </main>
  )
}
