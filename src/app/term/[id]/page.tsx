import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getTerm(id: string) {
    const { data } = await supabase
        .from('vocabulary')
        .select('*')
        .eq('id', id)
        .single();
    return data;
}

// params を Promise として受け取るように型定義を修正
export default async function TermDetail({ params }: { params: Promise<{ id: string }> }) {
    // ここで await することで id を取得できる
    const { id } = await params;
    const term = await getTerm(id);

    if (!term) notFound();

    return (
        <div className="max-w-2xl mx-auto p-4 min-h-screen bg-gray-50">
            <Link href="/" className="text-blue-600 text-sm mb-4 inline-block font-bold">
                ← 戻る
            </Link>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                {/* ヘッダーエリア */}
                <div className="p-6 border-b border-gray-50 bg-gradient-to-br from-white to-blue-50/30">
                    <span className="text-xs font-bold px-3 py-1 bg-blue-600 text-white rounded-full inline-block mb-3">
                        {term.category}
                    </span>
                    <h1 className="text-3xl font-black mb-1">{term.main_term}</h1>
                    <p className="text-gray-400 font-medium mb-4">{term.english_term}</p>
                    <p className="text-blue-800 font-bold text-lg">{term.summary}</p>
                </div>

                {/* コンテンツエリア */}
                <div className="p-6 space-y-8">
                    <section>
                        {/* <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">かみ砕いた意味</h3> */}
                        <p className="text-gray-800 leading-relaxed font-medium">{term.simple_meaning}</p>
                    </section>

                    <section>
                        <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">辞書的な意味</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{term.dictionary_meaning}</p>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-2xl italic text-gray-700 border-l-4 border-gray-200">
                        <h3 className="not-italic font-bold text-xs mb-2 text-gray-400">例文</h3>
                        <p className="whitespace-pre-wrap text-sm">{term.example_sentence}</p>
                    </section>

                    <section>
                        <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">関連用語</h3>
                        <div className="flex flex-wrap gap-2">
                            {term.related_terms?.map((tag: string) => (
                                <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 font-medium shadow-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}