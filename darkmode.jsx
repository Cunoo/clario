import React, { useEffect, useState, useRef } from 'react';
import interact from 'interactjs';

export default function App() {
  const [language, setLanguage] = useState('sk');
  const [chatbots, setChatbots] = useState([]);
  const [showAddButton, setShowAddButton] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const textToolsRef = useRef(null);
  const chatbotRefs = useRef({});

  useEffect(() => {
    const dragMoveListener = (event) => {
      const t = event.target;
      const x = (parseFloat(t.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(t.getAttribute('data-y')) || 0) + event.dy;
      t.style.transform = `translate(${x}px, ${y}px)`;
      t.setAttribute('data-x', x);
      t.setAttribute('data-y', y);
    };

    const resizeMoveListener = (event) => {
      let x = parseFloat(event.target.dataset.x) || 0;
      let y = parseFloat(event.target.dataset.y) || 0;
      const { width, height } = event.rect;
      event.target.style.width = width + 'px';
      event.target.style.height = height + 'px';
      x += event.deltaRect.left;
      y += event.deltaRect.top;
      event.target.style.transform = `translate(${x}px, ${y}px)`;
      event.target.dataset.x = x;
      event.target.dataset.y = y;
    };

    if (textToolsRef.current) {
      interact(textToolsRef.current)
        .draggable({ listeners: { move: dragMoveListener }, inertia: true })
        .resizable({ edges: { left: true, right: true, bottom: true, top: true }, modifiers: [interact.modifiers.restrictSize({ min: { width: 300, height: 300 }, max: { width: 1200, height: 1000 } })], listeners: { move: resizeMoveListener } });
    }

    chatbots.forEach(chatbot => {
      const ref = chatbotRefs.current[chatbot.id];
      if (ref) {
        interact(ref)
          .draggable({ listeners: { move: dragMoveListener }, inertia: true })
          .resizable({ edges: { left: true, right: true, bottom: true, top: true }, modifiers: [interact.modifiers.restrictSize({ min: { width: 300, height: 300 }, max: { width: 1200, height: 1000 } })], listeners: { move: resizeMoveListener } });
      }
    });
  }, [chatbots]);

  const addChatbot = () => {
    setChatbots(prev => [...prev, { id: Date.now() }]);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}> 
        <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md py-4 px-8 flex justify-between items-center`}> 
          <h1 className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-2xl font-extrabold`}>LinguoAI</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`py-2 px-4 rounded-lg transition ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {showAddButton && (
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
            <button onClick={addChatbot} className="bg-purple-600 text-white py-3 px-5 rounded-lg hover:bg-purple-700 transition">
              Pridať chatbot
            </button>
            <button onClick={() => setShowAddButton(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition text-sm">
              Schovať
            </button>
          </div>
        )}

        {!showAddButton && (
          <button onClick={() => setShowAddButton(true)} className="fixed right-6 top-1/2 -translate-y-1/2 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition z-50 text-sm">
            Zobraziť
          </button>
        )}

        <main className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Main text tool window and chatbots remain unchanged */}
        </main>

        <footer className={`text-center py-6 border-t mt-10 ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
          © 2025 LinguoAI – AI jazykový nástroj
        </footer>
      </div>
    </div>
  );
}