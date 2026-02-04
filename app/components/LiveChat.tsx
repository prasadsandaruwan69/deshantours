"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export default function LiveChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! 👋 Welcome to Deshan Tours. How can we help you plan your Sri Lankan adventure today?",
            sender: "bot",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");

    const quickReplies = [
        "Tour packages",
        "Best time to visit",
        "Pricing info",
        "Custom tour"
    ];

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "user",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputMessage("");

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: "Thank you for your message! Our travel experts will respond shortly. In the meantime, you can explore our tour packages or contact us at +94 77 123 4567.",
                sender: "bot",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    const handleQuickReply = (reply: string) => {
        const newMessage = {
            id: messages.length + 1,
            text: reply,
            sender: "user",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);

        // Simulate bot response based on quick reply
        setTimeout(() => {
            let botText = "";
            switch (reply) {
                case "Tour packages":
                    botText = "We offer 6 amazing tour categories: Cultural Tours, Safari Tours, Beach Tours, Hill Country Tours, Adventure Tours, and Custom Tours. Which interests you most?";
                    break;
                case "Best time to visit":
                    botText = "The best time depends on your destination! December-March is ideal for west/south coasts. May-September is perfect for the east coast. Would you like detailed seasonal information?";
                    break;
                case "Pricing info":
                    botText = "Our tours start from $100/day per person. Prices include accommodation, transport, guide, and activities. Use our Price Calculator for a custom quote!";
                    break;
                case "Custom tour":
                    botText = "We'd love to create a personalized itinerary for you! Please share your interests, preferred duration, and travel dates, and we'll design your perfect Sri Lankan adventure.";
                    break;
                default:
                    botText = "Let me connect you with our travel expert for detailed information.";
            }

            const botResponse = {
                id: messages.length + 2,
                text: botText,
                sender: "bot",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="text-white" size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle className="text-white" size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notification Badge */}
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">1</span>
                    </div>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-slate-900 border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
                                    <MessageCircle size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">Deshan Tours</h3>
                                    <div className="flex items-center gap-2 text-sm text-blue-100">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <span>Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                        <div
                                            className={`rounded-2xl p-4 ${message.sender === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-slate-800 text-slate-200'
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                        </div>
                                        <div className={`text-xs text-slate-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {message.time}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quick Replies */}
                            {messages.length === 1 && (
                                <div className="space-y-2">
                                    <p className="text-slate-400 text-sm">Quick questions:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {quickReplies.map((reply) => (
                                            <button
                                                key={reply}
                                                onClick={() => handleQuickReply(reply)}
                                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-sm font-semibold transition-colors border border-white/10"
                                            >
                                                {reply}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-slate-900 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:ring-2 ring-blue-500 transition-all"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center justify-center transition-colors"
                                >
                                    <Send className="text-white" size={20} />
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-center">
                                Typically replies within minutes
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
