import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase, Pricing as PricingType } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function AdminPricing() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [pricingList, setPricingList] = useState<PricingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPricing, setEditingPricing] = useState<PricingType | null>(null);

  const [formData, setFormData] = useState({
    season: '',
    title_cs: '',
    title_en: '',
    description_cs: '',
    description_en: '',
    price_per_night: 0,
    min_nights: 2,
    max_guests: 10,
    active: true,
    sort_order: 0,
  });

  useEffect(() => {
    checkUser();
    fetchPricing();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin/login');
      return;
    }
    setUser(user);
    setLoading(false);
  }

  async function fetchPricing() {
    const { data } = await supabase
      .from('pricing')
      .select('*')
      .order('sort_order', { ascending: true });
    setPricingList(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingPricing) {
        const { error } = await supabase
          .from('pricing')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingPricing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pricing')
          .insert([formData]);

        if (error) throw error;
      }

      resetForm();
      fetchPricing();
    } catch (error) {
      console.error('Error saving pricing:', error);
      alert('Chyba při ukládání ceníku');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Opravdu chcete smazat tento ceník?')) return;

    const { error } = await supabase
      .from('pricing')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Chyba při mazání ceníku');
      return;
    }

    fetchPricing();
  }

  async function toggleActive(pricing: PricingType) {
    const { error } = await supabase
      .from('pricing')
      .update({ active: !pricing.active })
      .eq('id', pricing.id);

    if (!error) fetchPricing();
  }

  function resetForm() {
    setFormData({
      season: '',
      title_cs: '',
      title_en: '',
      description_cs: '',
      description_en: '',
      price_per_night: 0,
      min_nights: 2,
      max_guests: 10,
      active: true,
      sort_order: 0,
    });
    setEditingPricing(null);
    setShowForm(false);
  }

  function editPricing(pricing: PricingType) {
    setFormData({
      season: pricing.season,
      title_cs: pricing.title_cs,
      title_en: pricing.title_en,
      description_cs: pricing.description_cs || '',
      description_en: pricing.description_en || '',
      price_per_night: pricing.price_per_night,
      min_nights: pricing.min_nights,
      max_guests: pricing.max_guests,
      active: pricing.active,
      sort_order: pricing.sort_order,
    });
    setEditingPricing(pricing);
    setShowForm(true);
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <p>Načítání...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto padding-x py-[40px]">
        <div className="flex items-center justify-between mb-[40px]">
          <div className="flex items-center gap-[20px]">
            <Link href="/admin/dashboard" className="paragraph font-NeueMontreal text-secondry hover:text-[#145B52]">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="sub-heading font-medium font-NeueMontreal text-secondry">
              Správa ceníku
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-[10px] bg-secondry text-white px-[25px] py-[12px] rounded-[50px] paragraph font-NeueMontreal uppercase hover:bg-[#0F1F1C] transition-colors">
            <Plus size={18} />
            Nový ceník
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-[20px] p-[40px] mb-[40px] border border-[#21212155]">
            <h3 className="paragraph font-medium font-NeueMontreal text-secondry mb-[30px]">
              {editingPricing ? 'Upravit ceník' : 'Nový ceník'}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-3 gap-[20px]">
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Sezóna (klíč)
                  </label>
                  <input
                    type="text"
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    required
                    placeholder="high, low, holiday"
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Cena za noc (Kč)
                  </label>
                  <input
                    type="number"
                    value={formData.price_per_night}
                    onChange={(e) => setFormData({...formData, price_per_night: parseInt(e.target.value)})}
                    required
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Pořadí
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[20px]">
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Název (CZ)
                  </label>
                  <input
                    type="text"
                    value={formData.title_cs}
                    onChange={(e) => setFormData({...formData, title_cs: e.target.value})}
                    required
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Název (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({...formData, title_en: e.target.value})}
                    required
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[20px]">
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Popis (CZ)
                  </label>
                  <textarea
                    value={formData.description_cs}
                    onChange={(e) => setFormData({...formData, description_cs: e.target.value})}
                    rows={3}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Popis (EN)
                  </label>
                  <textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData({...formData, description_en: e.target.value})}
                    rows={3}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-[20px]">
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Min. počet nocí
                  </label>
                  <input
                    type="number"
                    value={formData.min_nights}
                    onChange={(e) => setFormData({...formData, min_nights: parseInt(e.target.value)})}
                    required
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Max. počet hostů
                  </label>
                  <input
                    type="number"
                    value={formData.max_guests}
                    onChange={(e) => setFormData({...formData, max_guests: parseInt(e.target.value)})}
                    required
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-[10px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({...formData, active: e.target.checked})}
                      className="w-[20px] h-[20px]"
                    />
                    <span className="paragraph font-NeueMontreal text-secondry">Aktivní</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-[15px] pt-[20px]">
                <button
                  type="submit"
                  className="bg-secondry text-white px-[30px] py-[12px] rounded-[50px] paragraph font-NeueMontreal uppercase hover:bg-[#0F1F1C] transition-colors">
                  {editingPricing ? 'Uložit změny' : 'Vytvořit ceník'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-[#21212155] px-[30px] py-[12px] rounded-[50px] paragraph font-NeueMontreal uppercase hover:bg-gray-50 transition-colors">
                  Zrušit
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {pricingList.map((pricing) => (
            <div
              key={pricing.id}
              className="bg-white rounded-[20px] p-[30px] border border-[#21212155] hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-[15px]">
                <span className={`small-text font-NeueMontreal px-[12px] py-[4px] rounded-full ${pricing.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {pricing.active ? 'Aktivní' : 'Neaktivní'}
                </span>
                <div className="flex gap-[8px]">
                  <button
                    onClick={() => toggleActive(pricing)}
                    className="p-[8px] hover:bg-gray-100 rounded-lg transition-colors"
                    title={pricing.active ? 'Deaktivovat' : 'Aktivovat'}>
                    {pricing.active ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => editPricing(pricing)}
                    className="p-[8px] hover:bg-gray-100 rounded-lg transition-colors"
                    title="Upravit">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(pricing.id)}
                    className="p-[8px] hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    title="Smazat">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="paragraph font-medium font-NeueMontreal text-secondry mb-[5px]">
                {pricing.title_cs}
              </h3>
              <p className="small-text font-NeueMontreal text-gray-600 mb-[15px]">
                {pricing.description_cs}
              </p>

              <div className="border-t border-[#21212155] pt-[15px]">
                <div className="text-[32px] font-semibold font-NeueMontreal text-secondry mb-[10px]">
                  {pricing.price_per_night.toLocaleString('cs-CZ')} Kč
                  <span className="text-[16px] font-normal text-gray-600"> / noc</span>
                </div>
                <div className="flex flex-col gap-[5px] small-text font-NeueMontreal text-gray-600">
                  <div>Min. {pricing.min_nights} noci</div>
                  <div>Max. {pricing.max_guests} hostů</div>
                  <div className="text-gray-400">Pořadí: {pricing.sort_order}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pricingList.length === 0 && (
          <div className="text-center py-[80px]">
            <p className="paragraph font-NeueMontreal text-gray-500">
              Zatím nebyly vytvořeny žádné ceníky
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
