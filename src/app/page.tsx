import Header from "@/components/Header";
import Banner from '@/components/Banner';
import Why from '@/components/Why';
import How from '@/components/How';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <div>
    <Header />
    <Banner />
    <How/>
    <Why/>
    <Events/>
    <Footer />
    </div>
  );
}
