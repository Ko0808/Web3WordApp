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

export default async function TermDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const term = await getTerm(id);

    if (!term) notFound();

    return (
        // 背景色を一覧ページと合わせたオフホワイトに
        <div className="min-h-screen bg-[#fdfdfc] text-[#1a1a1a] antialiased">
            <div className="max-w-2xl mx-auto p-8 lg:p-12">

                {/* ナビゲーション */}
                <nav className="mb-12">
                    <Link href="/" className="group flex items-center text-sm text-gray-400 hover:text-black transition-colors">
                        <span className="mr-2 inline-block transition-transform group-hover:-translate-x-1">←</span>
                        <span>Index</span>
                    </Link>
                </nav>

                <article>
                    {/* ヘッダーエリア */}
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                                {term.category}
                            </span>
                        </div>
                        <h1 className="text-4xl font-serif font-bold mb-2 tracking-tight">
                            {term.main_term}
                        </h1>
                        <p className="text-lg text-gray-400 font-medium mb-8 italic">
                            {term.english_term}
                        </p>

                        <div className="py-6 border-y border-gray-100">
                            <p className="text-xl font-medium leading-relaxed italic text-gray-800">
                                「{term.summary}」
                            </p>
                        </div>
                    </header>

                    {/* コンテンツエリア */}
                    <div className="space-y-16">

                        {/* かみ砕いた意味 */}
                        <section>
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6 font-bold">Explanation</h3>
                            <div className="text-lg leading-[1.8] text-gray-800 font-medium">
                                {term.simple_meaning}
                            </div>
                        </section>

                        {/* 辞書的な意味 */}
                        <section className="pt-8 border-t border-gray-100">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6 font-bold">Detailed Definition</h3>
                            <p className="text-base leading-[1.7] text-gray-600">
                                {term.dictionary_meaning}
                            </p>
                        </section>

                        {/* 例文 */}
                        <section className="bg-[#f9f9f8] p-8 rounded-sm border-l-2 border-gray-200">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">Usage</h3>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed italic">
                                {term.example_sentence}
                            </p>
                        </section>

                        {/* 関連用語 */}
                        <section className="pt-8">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6 font-bold">Related Terms</h3>
                            <div className="flex flex-wrap gap-3">
                                {term.related_terms?.map((tag: string) => (
                                    <span key={tag} className="text-sm text-gray-500 hover:text-black cursor-default transition-colors border-b border-transparent hover:border-black">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                    </div>
                </article>

                {/* フッター的な余白 */}
                <footer className="mt-24 pb-12 border-t border-gray-100 pt-8 text-center">
                    <Link href="/" className="text-xs text-gray-300 hover:text-gray-600 transition-colors uppercase tracking-widest">
                        Back to top
                    </Link>
                </footer>
            </div>
        </div>
    );
}