import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { LogOut, FileText, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/admin/login');
        return;
      }

      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="paragraph font-NeueMontreal text-secondry">Načítání...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full border-b border-[#21212155] bg-white">
        <div className="max-w-[1400px] mx-auto padding-x h-[80px] flex items-center justify-between">
          <Link href="/">
            <h1 className="text-[30px] font-FoundersGrotesk font-semibold text-secondry">
              VILA ADALBERT
            </h1>
          </Link>
          <div className="flex items-center gap-[20px]">
            <span className="paragraph font-NeueMontreal text-gray-600">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-[10px] paragraph font-NeueMontreal text-secondry hover:text-red-600 transition-colors">
              <LogOut size={18} />
              Odhlásit se
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto padding-x py-[60px]">
        <h2 className="sub-heading font-medium font-NeueMontreal text-secondry mb-[40px]">
          Administrace
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          <Link
            href="/admin/blogs"
            className="group bg-white border border-[#21212155] rounded-[20px] p-[40px] hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-[20px] mb-[20px]">
              <div className="w-[60px] h-[60px] rounded-full bg-[#145B52] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText size={28} color="white" />
              </div>
              <h3 className="sub-heading font-medium font-NeueMontreal text-secondry">
                Správa blogů
              </h3>
            </div>
            <p className="paragraph font-NeueMontreal text-gray-600">
              Přidávejte, upravujte a mazejte blogové příspěvky v českém a anglickém jazyce
            </p>
          </Link>

          <Link
            href="/admin/pricing"
            className="group bg-white border border-[#21212155] rounded-[20px] p-[40px] hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-[20px] mb-[20px]">
              <div className="w-[60px] h-[60px] rounded-full bg-[#145B52] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign size={28} color="white" />
              </div>
              <h3 className="sub-heading font-medium font-NeueMontreal text-secondry">
                Správa ceníku
              </h3>
            </div>
            <p className="paragraph font-NeueMontreal text-gray-600">
              Upravujte ceny, sezóny a dostupnost pro různé období v roce
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
