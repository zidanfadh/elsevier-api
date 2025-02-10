import { NextResponse } from "next/server";

interface Article {
    title: string;
    author: string;
    journal: string;
    doi: string;
    url: string;
}

export async function GET(req: Request) {
    const apiKey = process.env.ELSEVIER_API_KEY;
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "heart disease"; // Default query

    const url = `https://api.elsevier.com/content/search/scopus?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                "X-ELS-APIKey": apiKey || "8c5a43f3692a3dcb5072f30f5a231e43",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const articles = data["search-results"]["entry"] || [];

        const results: Article[] = articles.map((article: any) => ({
            title: article["dc:title"] || "No Title",
            author: article["dc:creator"] || "Unknown Author",
            journal: article["prism:publicationName"] || "Unknown Journal",
            doi: article["prism:doi"] || "No DOI",
            url: article["prism:url"] || "#",
        }));

        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
