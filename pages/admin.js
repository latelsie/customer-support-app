import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [questionsList, setQuestionsList] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await fetch('/api/admin/questions');
            if (!res.ok) throw new Error('Failed to fetch questions');
            const data = await res.json();
            setQuestionsList(data.questions || []); // Ensure an array is always set
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswerChange = (qId, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [qId]: value,
        }));
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Question</th>
                        <th className="px-4 py-2 border">Answer</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questionsList.map((q) => (
                        <tr key={q.qId}>
                            <td className="px-4 py-2 border">{q.question || 'No question text'}</td>
                            <td className="px-4 py-2 border">
                                <input
                                    type="text"
                                    value={answers[q.qId] || ''}
                                    onChange={(e) => handleAnswerChange(q.qId, e.target.value)}
                                    placeholder="Write answer..."
                                    className="p-2 border rounded"
                                />
                            </td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => console.log('Answer submitted for', q.qId)}
                                    className="bg-green-500 text-white px-4 py-2 mt-2"
                                >
                                    Mark as Answered
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
