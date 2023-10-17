import BtnExemplo from "@/components/button";
import Card from "@/components/card";
import Comment from "@/components/comment";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import InpExemplo from "@/components/input";
import Modal from "@/components/modal";

const announcement = {
  "id": "85320c06-cc76-4ac3-ad78-9cfd0cac4fcd",
  "mark": "Chevrolet",
  "model": "C10",
  "year": 1975,
  "fuel": "GASOLINA",
  "km": 107826.97,
  "color": "Amarela",
  "price": 35000.55,
  "fipe": 9157.77,
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
  "user_id": "87c8734e-3850-47c0-9d1d-13dd22df0f1d",
  "image": [
    {
      "id": "2ed4a4c8-9c05-4aef-af5d-4f8b46034610",
      "url": "https://www.picellileiloes.com.br/arquivos/leiloes/lotes/imagens/064b83f8f719af.jpg",
      "announcement_id": "85320c06-cc76-4ac3-ad78-9cfd0cac4fcd"
    }
  ]
}

export default function Home() {
  return (
    <main>
      <Header/>
      <Modal />
      <Container>
        <Card announcement={announcement}/>
        <Card announcement={announcement}/>
        <Card announcement={announcement}/>
        <Card announcement={announcement}/>
        <Card announcement={announcement}/>
        <Card announcement={announcement}/>
        <Card announcement={announcement}/>
        <Card announcement={announcement}/> 
      </Container>
      <Comment/>
      <BtnExemplo />
      <InpExemplo />
      <Footer />
    </main>
  )
}
