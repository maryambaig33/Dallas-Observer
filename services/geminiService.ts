import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Book } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const bookSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    author: { type: Type.STRING },
    description: { type: Type.STRING },
    tags: { 
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["title", "author", "description", "tags"],
};

const recommendationSchema: Schema = {
  type: Type.ARRAY,
  items: bookSchema,
};

export const getBookRecommendations = async (query: string): Promise<Book[]> => {
  try {
    const prompt = `
      You are the owner of 'Birds Bookstore', a high-end, independent literature shop in Dallas known for curated, literary, and artistic selections. 
      You are not a generic algorithm; you are a tasteful bookseller.
      
      The customer asks: "${query}"
      
      Recommend 3 specific books that fit this request. 
      Focus on literary fiction, poetry, essays, or high-quality non-fiction. Avoid mass-market thrillers unless they are exceptionally written.
      For each book, provide a title, author, a short "bookseller's note" as the description (why it fits), and 2-3 genre tags.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.7, 
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Book[];
      return data.map(book => ({
        ...book,
        // Add a placeholder image since the API doesn't return real covers
        coverUrl: `https://picsum.photos/seed/${book.title.replace(/\s/g, '')}/300/450`
      }));
    }
    return [];
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
};