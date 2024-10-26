'use client';

import { useState, useEffect } from 'react';
import { UrlShortenerForm } from '@/components/UrlShortenerForm';

interface UrlMapping {
  _id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
}

export default function Home() {
  const [urls, setUrls] = useState<UrlMapping[]>([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/urls');
      if (response.ok) {
        const data = await response.json();
        setUrls(data);
      } else {
        console.error('Failed to fetch URLs');
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12 text-center">URL Shortener</h1>
        <div className="max-w-2xl mx-auto mb-16">
          <UrlShortenerForm onUrlShortened={fetchUrls} />
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-6">Your Shortened URLs</h2>
          {urls.length > 0 ? (
            <ul className="space-y-6">
              {urls.map((url) => (
                <li key={url._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <p className="mb-3"><strong>Original URL:</strong> <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">{url.originalUrl}</a></p>
                  <p className="mb-3"><strong>Short URL:</strong> <a href={`${window.location.origin}/${url.shortCode}`} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">{`${window.location.origin}/${url.shortCode}`}</a></p>
                  <p><strong>Created:</strong> {new Date(url.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center text-lg">No shortened URLs yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
