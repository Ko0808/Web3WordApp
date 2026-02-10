'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link'; // Linkコンポーネントを追加

export default function Home() {
  const [terms, setTerms] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTerms = async () => {
      const { data } = await supabase.from('vocabulary').select('id, main_term, category, summary').order('id', { ascending: true });
      if (data) setTerms(data);
    };
    fetchTerms();
  }, []);

  const filtered = terms.filter(t =>
    t.main_term.includes(searchQuery) || t.summary.includes(searchQuery)
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">用語検索</h1>
      <input
        className="w-full p-3 border rounded-xl mb-6 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="用語を検索..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid gap-3">
        {filtered.map(term => (
          <Link key={term.id} href={`/term/${term.id}`}>
            <div className="p-4 border rounded-xl bg-white shadow-sm hover:bg-blue-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">{term.category}</span>
                <h2 className="text-lg font-bold group-hover:text-blue-700">{term.main_term}</h2>
              </div>
              <p className="text-gray-600 text-sm">{term.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}