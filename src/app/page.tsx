import { Header } from '@/components/Header';
import { Map } from '@/components/Map';
import { Sidebar } from '@/components/Sidebar';
import { LocationPanel } from '@/components/LocationPanel';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex pt-16">
        <div className="flex-1 relative">
          <Map />
          <LocationPanel />
        </div>
        <Sidebar />
      </main>
    </div>
  );
}
