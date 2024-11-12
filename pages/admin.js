// pages/admin.js
import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [questionsList, setQuestionsList] = useState([]);
    const [faq, setFaq] = useState({ question: '', answer: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const res = await fetch('/api/admin/questions');
        const data = await res.json();
        setQuestionsList(data.questions);
    };

    const handleAnswerSubmit = async (qId, answer) => {
        const res = await fetch(`/api/admin/questions/${qId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer }),
        });
        if (res.ok) {
            fetchQuestions();
        }
    };

    const handleFaqSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/admin/faqs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(faq),
        });
        const data = await res.json();
        setMessage(data.message);
        if (data.success) {
            setFaq({ question: '', answer: '' });
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            <h2 className="text-2xl font-bold mt-8 mb-4">Answer Questions</h2>
            <ul className="w-full max-w-md">
                {questionsList.map((q) => (
                    <li key={q.qId} className="p-4 border-b border-gray-300">
                        <p>{q.question}</p>
                        <input
                            type="text"
                            placeholder="Write answer..."
                            onBlur={(e) => handleAnswerSubmit(q.qId, e.target.value)}
                            className="p-2 mt-2 border border-gray-300 rounded"
                        />
                       
                    </li>
                ))}
                     <button type="submit">Submit</button>

            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Add FAQ</h2>
            <form onSubmit={handleFaqSubmit} className="flex flex-col gap-4 w-80">
                <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => setFaq({ ...faq, question: e.target.value })}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add FAQ</button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
}
