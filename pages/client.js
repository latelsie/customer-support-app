// pages/client.js
import React, { useState, useEffect } from 'react';

export default function ClientDashboard() {
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    useEffect(() => {
        fetchAnsweredQuestions();
    }, []);

    const fetchAnsweredQuestions = async () => {
        const res = await fetch('/api/client/answered-questions');
        const data = await res.json();
        setAnsweredQuestions(data.questions);
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Client Dashboard</h1>

            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Question</th>
                        <th className="px-4 py-2 border">Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {answeredQuestions.map((q) => (
                        <tr key={q.qId}>
                            <td className="px-4 py-2 border">{q.question}</td>
                            <td className="px-4 py-2 border">{q.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
