
import React from 'react';
import Link from 'next/link';


export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Welcome to FAQ App</h1>
            <p className="mt-4">An application for managing FAQs and user questions.
                <Link href="/faq" className="mt-4 text-blue-500">
                    Learn more about FAQs
                </Link>
            </p>
        </div>
    );
}
