
import React, { useState, useEffect } from 'react';

export default function ClientDashboard() {
    const [question, setQuestion] = useState('');
    const [questionsList, setQuestionsList] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const res = await fetch('/api/client/questions');
        const data = await res.json();
        setQuestionsList(data.questions);
    };

    const handleQuestionSubmit = async (e) => {
       e.preventdefault();
        const res = await fetch('/api/client/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });
        const data = await res.json();
        setMessage(data.message);
        if (data.success) {
            setQuestion('');
            fetchQuestions(); // Refresh questions list
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Client Dashboard</h1>

            <form onSubmit={handleQuestionSubmit} className="flex flex-col gap-4 w-80">
                <input
                    type="text"
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit Question</button>
            </form>

            {message && <p className="mt-4 text-red-500">{message}</p>}

            <h2 className="text-2xl font-bold mt-8 mb-4">Your Questions</h2>
            <ul className="w-full max-w-md">
                {questionsList.map((q) => (
                    <li key={q.qId} className="p-4 border-b border-gray-300">
                        <p>{q.question}</p>
                        <p className="text-sm text-gray-500">
                            {q.answer ? `Answer: ${q.answer}` : 'Not answered yet'}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
