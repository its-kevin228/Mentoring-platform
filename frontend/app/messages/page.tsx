"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    Send,
    Search,
    MoreVertical,
    Paperclip,
    Smile,
    User,
    Clock,
    Check,
    CheckCheck,
    Loader2,
    Inbox,
    MessageSquare
} from 'lucide-react';

interface Conversation {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        role: string;
    };
    lastMessage: {
        content: string;
        createdAt: string;
        senderId: string;
        isRead: boolean;
    };
}

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    isRead: boolean;
}

export default function MessagesPage() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeChat, setActiveChat] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const data = await apiRequest<Conversation[]>('/messages/conversations');
            setConversations(data);
        } catch (error) {
            console.error('Erreur conversations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMessages = async (otherUserId: string) => {
        try {
            const data = await apiRequest<Message[]>(`/messages/${otherUserId}`);
            setMessages(data);
        } catch (error) {
            console.error('Erreur messages:', error);
        }
    };

    useEffect(() => {
        fetchConversations();
        // Polling simple pour les nouveaux messages (Alternative à WebSocket pour MVP)
        const interval = setInterval(() => {
            fetchConversations();
            if (activeChat) {
                fetchMessages(activeChat.user.id);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [activeChat]);

    const handleSelectChat = (conv: Conversation) => {
        setActiveChat(conv);
        fetchMessages(conv.user.id);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat || isSending) return;

        setIsSending(true);
        try {
            const data = await apiRequest<Message>('/messages', {
                method: 'POST',
                body: JSON.stringify({
                    receiverId: activeChat.user.id,
                    content: newMessage,
                }),
            });
            setMessages([...messages, data]);
            setNewMessage('');
            fetchConversations(); // Update side bar
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSending(false);
        }
    };

    if (!user) return null;

    return (
        <div className="flex flex-col h-screen bg-base-200">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-8 py-6 flex overflow-hidden lg:h-[calc(100vh-120px)]">
                <div className="flex w-full bg-base-100 rounded-[2.5rem] shadow-2xl shadow-base-300/20 border border-base-200 overflow-hidden">

                    {/* Sidebar: Conversations */}
                    <div className={`w-full lg:w-1/3 border-r border-base-100 flex flex-col ${activeChat ? 'hidden lg:flex' : 'flex'}`}>
                        <div className="p-8 border-b border-base-100">
                            <h2 className="text-2xl font-black text-neutral italic mb-6">Messages</h2>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un chat..."
                                    className="input input-bordered w-full pl-11 rounded-2xl bg-base-50 border-none focus:ring-2 ring-primary/20 transition-all font-medium text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {isLoading ? (
                                <div className="flex flex-col items-center py-10 opacity-20">
                                    <Loader2 className="animate-spin mb-2" />
                                    <p className="text-xs font-bold uppercase tracking-widest">Chargement...</p>
                                </div>
                            ) : conversations.length > 0 ? (
                                conversations.map((conv) => (
                                    <div
                                        key={conv.user.id}
                                        onClick={() => handleSelectChat(conv)}
                                        className={`flex items-center gap-4 p-4 rounded-[1.5rem] cursor-pointer transition-all ${activeChat?.user.id === conv.user.id
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'hover:bg-base-50'
                                            }`}
                                    >
                                        <div className="avatar placeholder">
                                            <div className={`w-12 h-12 rounded-xl border-2 ${activeChat?.user.id === conv.user.id ? 'border-white/20 bg-white/10' : 'border-primary/10 bg-primary/5 text-primary'} flex items-center justify-center font-black`}>
                                                {conv.user.firstName[0]}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-bold truncate text-sm">{conv.user.firstName} {conv.user.lastName}</h4>
                                                <span className={`text-[9px] font-black uppercase opacity-40 ${activeChat?.user.id === conv.user.id ? 'text-white' : ''}`}>
                                                    {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <p className={`text-xs truncate font-medium ${activeChat?.user.id === conv.user.id ? 'text-white/80' : 'text-base-content/50'}`}>
                                                {conv.lastMessage.senderId === user.id ? 'Vous: ' : ''}{conv.lastMessage.content}
                                            </p>
                                        </div>
                                        {!conv.lastMessage.isRead && conv.lastMessage.senderId !== user.id && (
                                            <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 px-6 opacity-30">
                                    <Inbox size={40} className="mx-auto mb-4" />
                                    <p className="text-sm font-bold">Aucune conversation pour le moment.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className={`flex-1 flex flex-col bg-base-100 ${!activeChat ? 'hidden lg:flex items-center justify-center' : 'flex'}`}>
                        {activeChat ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-6 border-b border-base-100 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setActiveChat(null)} className="lg:hidden btn btn-ghost btn-sm btn-circle">
                                            <Paperclip />
                                        </button>
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                                            {activeChat.user.firstName[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-neutral leading-tight text-sm">{activeChat.user.firstName} {activeChat.user.lastName}</h3>
                                            <div className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                                                <p className="text-[10px] font-black uppercase text-success tracking-widest leading-none">En ligne</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="btn btn-ghost btn-sm btn-circle"><Paperclip size={18} /></button>
                                        <button className="btn btn-ghost btn-sm btn-circle"><MoreVertical size={18} /></button>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-base-50/30">
                                    {messages.map((msg, idx) => {
                                        const isMe = msg.senderId === user.id;
                                        const showDate = idx === 0 || new Date(messages[idx - 1].createdAt).toDateString() !== new Date(msg.createdAt).toDateString();

                                        return (
                                            <React.Fragment key={msg.id}>
                                                {showDate && (
                                                    <div className="flex justify-center my-8">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-base-200 px-4 py-1 rounded-full text-base-content/40">
                                                            {new Date(msg.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[70%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                                                        <div className={`p-4 rounded-[1.5rem] text-sm font-medium shadow-sm transition-all ${isMe
                                                            ? 'bg-primary text-white rounded-tr-none shadow-primary/10'
                                                            : 'bg-white text-neutral rounded-tl-none border border-base-200'
                                                            }`}>
                                                            {msg.content}
                                                        </div>
                                                        <div className="px-2 flex items-center gap-2">
                                                            <span className="text-[9px] font-black uppercase opacity-30">
                                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                            {isMe && (
                                                                msg.isRead ? <CheckCheck size={12} className="text-secondary" /> : <Check size={12} className="opacity-30" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-6 bg-white border-t border-base-100 items-end">
                                    <form onSubmit={handleSendMessage} className="flex gap-3 bg-base-50 rounded-[2rem] p-2 pr-3 border border-base-200 focus-within:border-primary/30 transition-all">
                                        <button type="button" className="btn btn-ghost btn-circle btn-sm my-1 ml-1">
                                            <Smile size={20} className="text-base-content/30" />
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Écrire un message..."
                                            className="input w-full border-none bg-transparent focus:outline-none font-medium h-auto py-3"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim() || isSending}
                                            className="btn btn-primary btn-circle shadow-lg shadow-primary/20 text-white"
                                        >
                                            {isSending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="w-24 h-24 bg-primary/5 text-primary/20 mx-auto rounded-[2.5rem] flex items-center justify-center">
                                    <MessageSquare size={48} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-neutral italic">Votre centre de messagerie</h3>
                                    <p className="text-sm font-medium text-base-content/40">Sélectionnez une conversation pour commencer à échanger.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
