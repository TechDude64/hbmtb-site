import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const ChatPage = () => {
  const [user, setUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isUsernameSet) return;

    // Fetch initial messages
    const getInitialMessages = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching initial messages:', error);
      } else {
        setMessages(data || []);
      }
    };

    getInitialMessages();

    // Set up the real-time subscription
    const subscription = supabase
      .channel('public:chats')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chats' },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [isUsernameSet]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (user.trim()) {
      setIsUsernameSet(true);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const { error } = await supabase
        .from('chats')
        .insert([{ user_name: user, content: newMessage }]);

      if (error) {
        console.error('Error sending message:', error);
      } else {
        setNewMessage('');
      }
    }
  };

  if (!isUsernameSet) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-hb-gray/50 p-8 rounded-2xl border border-hb-gray-light shadow-lg text-center"
        >
          <h1 className="text-3xl font-bold text-hb-light mb-6 font-heading">Join the Chat</h1>
          <form onSubmit={handleUsernameSubmit} className="space-y-6">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter your name..."
              required
              className="w-full bg-hb-dark border border-hb-gray-light rounded-lg px-4 py-3 text-hb-light focus:ring-2 focus:ring-hb-blue focus:border-hb-blue transition"
            />
            <button
              type="submit"
              className="w-full btn bg-hb-blue hover:bg-hb-blue-dark text-white font-bold py-3 rounded-lg transition"
            >
              Start Chatting
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex flex-col bg-hb-gray/30 rounded-2xl border border-hb-gray-light overflow-hidden shadow-lg"
      >
        <div className="p-4 border-b border-hb-gray-light">
          <h1 className="text-xl font-bold text-hb-light text-center font-heading">Fan Chat</h1>
        </div>

        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end gap-3 ${msg.user_name === user ? 'justify-end' : 'justify-start'}`}>
              
              {msg.user_name !== user && (
                <div className="w-8 h-8 rounded-full bg-hb-blue flex items-center justify-center font-bold text-white flex-shrink-0">
                  {msg.user_name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl ${
                msg.user_name === user
                  ? 'bg-hb-blue text-white rounded-br-none'
                  : 'bg-hb-gray-light text-hb-light rounded-bl-none'
              }`}>
                {msg.user_name !== user && (
                  <p className="text-sm font-bold text-hb-blue-light mb-1">{msg.user_name}</p>
                )}
                <p className="text-base break-words">{msg.content}</p>
                <p className="text-xs text-right mt-2 opacity-60">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-hb-gray-light bg-hb-darker/50">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow bg-hb-dark border border-hb-gray-light rounded-lg px-4 py-2 text-hb-light focus:ring-2 focus:ring-hb-blue focus:border-hb-blue transition"
            />
            <button
              type="submit"
              className="btn bg-hb-blue hover:bg-hb-blue-dark text-white font-bold px-6 py-2 rounded-lg transition disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPage;
