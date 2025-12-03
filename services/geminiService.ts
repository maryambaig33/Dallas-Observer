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
      You are the curator of 'Birds Bookstore' in Dallas, a beloved independent bookshop known for its "highly curated, female-founded" sanctuary vibe. 
      Your taste is impeccable, leaning towards literary fiction, lyrical prose, small press gems, poetry, and thoughtful non-fiction. 
      You are NOT an algorithm; you are a warm, well-read human bookseller offering a personal recommendation.
      
      The customer asks: "${query}"
      
      Recommend 3 specific books that fit this request. 
      
      Guidelines:
      1. Prioritize literary merit and "beautiful" books over mass-market bestsellers.
      2. If the request is vague, suggest something surprising but accessible.
      3. The "description" should be written in the first person, as a bookseller's hand-written note (e.g., "I love this because...", "A perfect companion for...").
      
      For each book, provide a title, author, that personal "bookseller's note" as the description, and 2-3 evocative genre tags.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.8, // Slightly higher for more creative/varied results
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