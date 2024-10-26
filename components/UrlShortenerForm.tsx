import React, { useState } from 'react';

export function UrlShortenerForm({ onUrlShortened }: { onUrlShortened: () => void }) {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: longUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(`${window.location.origin}/${data.shortCode}`);
        onUrlShortened();
      } else {
        setError('Failed to shorten URL');
      }
    } catch (error) {
      setError('An error occurred while shortening the URL');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter a long URL"
          required
          className="w-full p-3 border rounded-lg text-black bg-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition duration-300"
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {shortUrl && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="font-semibold mb-3 text-lg">Shortened URL:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-grow p-3 border rounded-lg bg-gray-700 text-white"
            />
            <button
              onClick={copyToClipboard}
              className={`p-3 rounded-lg transition duration-300 ${
                copied ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
