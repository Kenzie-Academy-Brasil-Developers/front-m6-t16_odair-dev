'use client';
import Banner from "@/components/banner";
import Card, { IAnnouncements } from "@/components/card";
import Container from "@/components/container";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext, useEffect } from 'react';

export default function Home() {
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
