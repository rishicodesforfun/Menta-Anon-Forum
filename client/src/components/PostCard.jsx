import { useState } from 'react';
import { Archive, Trash2, MessageCircle, Heart, MoreHorizontal, Shield } from 'lucide-react';

export default function PostCard({ post, isAdmin, onDelete, onLock }) {
    const [isHovered, setIsHovered] = useState(false);

    const tags = post.tags || [];

    return (
        <article
            className={`group relative flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1a202c] p-5 border transition-all duration-200 ${post.is_locked ? 'border-red-100 bg-red-50/10' : 'border-[#E9ECEF] dark:border-gray-700 hover:border-primary'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                        {post.author[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#111418] dark:text-white">{post.author}</span>
                        <span className="text-xs text-[#617589] dark:text-gray-400">
                            {new Date(post.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                {post.is_locked && (
                    <div className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
                        <Shield className="size-3" /> Locked
                    </div>
                )}
            </div>

            <div className="cursor-pointer">
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-primary-dark transition-colors">
                    {post.title}
                </h3>
                <p className="text-[#617589] dark:text-gray-300 text-sm leading-relaxed line-clamp-3 whitespace-pre-wrap">
                    {post.content}
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-y-3 pt-2">
                <div className="flex gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-medium text-[#617589] dark:text-gray-400 hover:text-primary transition-colors">
                        <MessageCircle className="size-4" />
                        Reply
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-[#617589] dark:text-gray-400 hover:text-pink-500 transition-colors">
                        <Heart className="size-4" />
                        Support
                    </button>
                </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Shield className="size-3" /> Admin
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onLock(post.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                        >
                            <Archive className="size-3" /> {post.is_locked ? 'Unlock' : 'Lock'}
                        </button>
                        <button
                            onClick={() => onDelete(post.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            <Trash2 className="size-3" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </article>
    );
}
