"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase, BlogPost } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function AdminBlogs() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
    slug: '',
    title_cs: '',
    title_en: '',
    excerpt_cs: '',
    excerpt_en: '',
    content_cs: '',
    content_en: '',
    category: 'turistika',
    image_url: '',
    published: false,
  });

  useEffect(() => {
    checkUser();
    fetchBlogs();
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

  async function fetchBlogs() {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    setBlogs(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingBlog) {
        const { error } = await supabase
          .from('blog_posts')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingBlog.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{ ...formData, author_id: user.id }]);

        if (error) throw error;
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Chyba při ukládání blogu');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Opravdu chcete smazat tento blog?')) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Chyba při mazání blogu');
      return;
    }

    fetchBlogs();
  }

  async function togglePublished(blog: BlogPost) {
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: !blog.published })
      .eq('id', blog.id);

    if (!error) fetchBlogs();
  }

  function resetForm() {
    setFormData({
      slug: '',
      title_cs: '',
      title_en: '',
      excerpt_cs: '',
      excerpt_en: '',
      content_cs: '',
      content_en: '',
      category: 'turistika',
      image_url: '',
      published: false,
    });
    setEditingBlog(null);
    setShowForm(false);
  }

  function editBlog(blog: BlogPost) {
    setFormData({
      slug: blog.slug,
      title_cs: blog.title_cs,
      title_en: blog.title_en,
      excerpt_cs: blog.excerpt_cs,
      excerpt_en: blog.excerpt_en,
      content_cs: blog.content_cs,
      content_en: blog.content_en,
      category: blog.category,
      image_url: blog.image_url || '',
      published: blog.published,
    });
    setEditingBlog(blog);
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
              Správa blogů
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-[10px] bg-secondry text-white px-[25px] py-[12px] rounded-[50px] paragraph font-NeueMontreal uppercase hover:bg-[#0F1F1C] transition-colors">
            <Plus size={18} />
            Nový blog
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-[20px] p-[40px] mb-[40px] border border-[#21212155]">
            <h3 className="paragraph font-medium font-NeueMontreal text-secondry mb-[30px]">
              {editingBlog ? 'Upravit blog' : 'Nový blog'}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
              <div>
                <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                  Slug (URL identifikátor)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  required
                  placeholder="napr: nejlepsi-vylety-v-jesenikach"
                  className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                />
              </div>
              <div className="grid grid-cols-2 gap-[20px]">
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Nadpis (CZ)
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
                    Nadpis (EN)
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
                    Perex (CZ)
                  </label>
                  <textarea
                    value={formData.excerpt_cs}
                    onChange={(e) => setFormData({...formData, excerpt_cs: e.target.value})}
                    required
                    rows={3}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Perex (EN)
                  </label>
                  <textarea
                    value={formData.excerpt_en}
                    onChange={(e) => setFormData({...formData, excerpt_en: e.target.value})}
                    required
                    rows={3}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[20px]">
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Obsah (CZ)
                  </label>
                  <textarea
                    value={formData.content_cs}
                    onChange={(e) => setFormData({...formData, content_cs: e.target.value})}
                    required
                    rows={8}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Obsah (EN)
                  </label>
                  <textarea
                    value={formData.content_en}
                    onChange={(e) => setFormData({...formData, content_en: e.target.value})}
                    required
                    rows={8}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-[20px]">
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    Kategorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal">
                    <option value="turistika">Turistika</option>
                    <option value="relaxace">Relaxace</option>
                    <option value="kultura">Kultura</option>
                    <option value="zima">Zima</option>
                    <option value="obecné">Obecné</option>
                  </select>
                </div>
                <div>
                  <label className="small-text font-NeueMontreal text-gray-600 mb-[5px] block">
                    URL obrázku
                  </label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full border border-[#21212155] rounded-[10px] px-[15px] py-[10px] paragraph font-NeueMontreal"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-[10px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({...formData, published: e.target.checked})}
                      className="w-[20px] h-[20px]"
                    />
                    <span className="paragraph font-NeueMontreal text-secondry">Publikovat</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-[15px] pt-[20px]">
                <button
                  type="submit"
                  className="bg-secondry text-white px-[30px] py-[12px] rounded-[50px] paragraph font-NeueMontreal uppercase hover:bg-[#0F1F1C] transition-colors">
                  {editingBlog ? 'Uložit změny' : 'Vytvořit blog'}
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

        <div className="grid grid-cols-1 gap-[20px]">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-[20px] p-[30px] border border-[#21212155] hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-[10px] mb-[10px]">
                    <span className={`small-text font-NeueMontreal px-[12px] py-[4px] rounded-full ${blog.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {blog.published ? 'Publikováno' : 'Koncept'}
                    </span>
                    <span className="small-text font-NeueMontreal text-gray-500">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="paragraph font-medium font-NeueMontreal text-secondry mb-[10px]">
                    {blog.title_cs}
                  </h3>
                  <p className="small-text font-NeueMontreal text-gray-600">
                    {blog.excerpt_cs}
                  </p>
                </div>
                <div className="flex gap-[10px] ml-[20px]">
                  <button
                    onClick={() => togglePublished(blog)}
                    className="p-[10px] hover:bg-gray-100 rounded-lg transition-colors"
                    title={blog.published ? 'Skrýt' : 'Publikovat'}>
                    {blog.published ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    onClick={() => editBlog(blog)}
                    className="p-[10px] hover:bg-gray-100 rounded-lg transition-colors"
                    title="Upravit">
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-[10px] hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    title="Smazat">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-[80px]">
            <p className="paragraph font-NeueMontreal text-gray-500">
              Zatím nebyly vytvořeny žádné blogy
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
