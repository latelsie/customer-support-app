import React, { useEffect, useState } from 'react';

export default function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await fetch('/api/faqs');
                if (!response.ok) {
                    throw new Error('Failed to fetch FAQs');
                }
                const data = await response.json();
                console.log('Fetched FAQs:', data);

                // Ensure `data` is an array before setting it
                if (Array.isArray(data)) {
                    setFaqs(data);
                } else {
                    setFaqs([]); // set an empty array if the data is not an array
                    console.error('Expected an array but got:', data);
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
                setError('Could not load FAQs. Please try again later.');
            }
        };

        fetchFAQs();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-4">
                {faqs.map((faq) => (
                    <div key={faq.faqId} className="p-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold">{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
