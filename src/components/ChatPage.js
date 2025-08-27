import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import Auth from './Auth';

const ChatPage = () => {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => authSubscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;

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
    const chatSubscription = supabase
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
      supabase.removeChannel(chatSubscription);
    };
  }, [session]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && session) {
      const { error } = await supabase.from('chats').insert([
        {
          content: newMessage,
          user_name: session.user.user_metadata?.full_name || session.user.email,
          user_id: session.user.id,
        },
      ]);

      if (error) {
        console.error('Error sending message:', error);
      } else {
        setNewMessage('');
      }
    }
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="w-full h-full flex flex-col p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex flex-col bg-hb-gray/30 rounded-2xl border border-hb-gray-light overflow-hidden shadow-lg"
      >
                <div className="p-4 border-b border-hb-gray-light flex justify-between items-center">
          <h1 className="text-xl font-bold text-hb-light text-center font-heading">Fan Chat</h1>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="btn bg-hb-gray-light hover:bg-hb-gray-lighter text-hb-light font-bold px-4 py-2 rounded-lg transition text-sm"
          >
            Sign Out
          </button>
        </div>

        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-end gap-3 ${msg.user_id === session.user.id ? 'justify-end' : 'justify-start'}`}>
              
              {msg.user_id !== session.user.id && (
                <div className="w-8 h-8 rounded-full bg-hb-blue flex items-center justify-center font-bold text-white flex-shrink-0">
                  {msg.user_name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl ${
                msg.user_id === session.user.id
                  ? 'bg-hb-blue text-white rounded-br-none'
                  : 'bg-hb-gray-light text-hb-light rounded-bl-none'
              }`}>
                {msg.user_id !== session.user.id && (
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
