import { useState } from 'react';
import { marked } from 'marked';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) {
      setResponse('<p class="text-red-500">Please enter a message.</p>');
      return;
    }

    setLoading(true);
    setResponse('<p class="text-gray-500">Loading...</p>');

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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', // 🔑 Add your API key here
          'HTTP-Referer': 'https://www.webstylepress.com',
          'X-Title': 'WebStylePress',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await res.json();
      const markdownText =
        data.choices?.[0]?.message?.content || 'No response received.';
      setResponse(marked.parse(markdownText));
    } catch (error) {
      setResponse(`<p class="text-red-500">Error: ${error.message}</p>`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-xl shadow-lg bg-white space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">SS Chatbot</h2>
      <input
        type="text"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        placeholder="Enter your question"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        Ask!
      </button>
      <div
        id="response"
        className="prose prose-sm max-w-full"
        dangerouslySetInnerHTML={{ __html: response }}
      />
    </div>
  );
};

export default ChatBot;
