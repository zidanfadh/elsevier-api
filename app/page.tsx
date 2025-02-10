"use client";
 
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";

interface Article {
  title: string;
  author: string;
  journal: string;
  doi: string;
  url: string;
}

export default function Home() {

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const [query, setQuery] = useState<string>("heart disease");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/scopus?q=${encodeURIComponent(query)}`);
      const data: Article[] = await response.json();
      setResults(data);
    } catch (err) {
      setError("Failed to fetch data");
    }

    setLoading(false);
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center min-h-screen p-6 sm:p-10 font-sans">
     
     <div className="w-full max-w-4xl flex flex-col justify-center items-center px-4">
      <h2 className="mb-6 sm:mb-10 text-lg text-center sm:text-4xl dark:text-white text-black">
      Cari Artikel Scopus
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setQuery(e.target.value)}
        onSubmit={fetchResults}
      />
    </div>

      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 overflow-x-auto">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Author</th>
                    <th className="border p-2">Journal</th>
                    <th className="border p-2">DOI</th>
                </tr>
            </thead>
            <tbody>
                {results.map((article, index) => (
                    <tr key={index} className="border">
                        <td className="border p-2 break-words max-w-xs">{article.title}</td>
                        <td className="border p-2 break-words max-w-xs">{article.author}</td>
                        <td className="border p-2 break-words max-w-xs">{article.journal}</td>
                        <td className="border p-2 break-words max-w-xs">
                            <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                {article.doi}
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
