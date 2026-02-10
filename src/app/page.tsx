'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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
    // 背景をオフホワイトに設定し、フォントを明朝体系に近い設定にする（任意）
    <div className="min-h-screen bg-[#fdfdfc] text-[#1a1a1a] antialiased">
      <div className="max-w-2xl mx-auto p-8 lg:p-12">

        {/* ヘッダー：シンプルに中央寄せ */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-serif font-semibold tracking-tight mb-2">Web3 Glossary</h1>
          <p className="text-sm text-gray-500">専門用語を噛み砕き、本のように引く</p>
        </header>

        {/* 検索窓：枠線を消し、下線のみの洗練されたスタイル */}
        <div className="relative mb-16">
          <input
            type="text"
            placeholder="用語を検索する..."
            className="w-full bg-transparent border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-300"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* リスト表示：カード形式をやめ、行形式のリストへ */}
        <div className="space-y-12">
          {filtered.map(term => (
            <Link key={term.id} href={`/term/${term.id}`} className="block group">
              <article className="border-l-0 group-hover:border-l-2 group-hover:border-black pl-0 group-hover:pl-6 transition-all duration-300">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    {term.category}
                  </span>
                  <h2 className="text-xl font-bold group-hover:underline underline-offset-4 decoration-1">
                    {term.main_term}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {term.summary}
                </p>
              </article>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 mt-20">該当する単語が見つかりません</p>
          )}
        </div>
      </div>
    </div>
  );
}