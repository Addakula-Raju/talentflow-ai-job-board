import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import MobileSidebar from '@/components/common/MobileSidebar';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-surface-0 transition-colors duration-300">
      <Navbar />
      <MobileSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
