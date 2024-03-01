export type GutendexBook = {
    id: number;
    title: string;
    authors: { name: string, birth_year: number | null, death_year: number | null  }[];
    languages: string[];
    subjects: string[];
    translators: { name: string, birth_year: number | null, death_year: number | null }[];
    bookshelves: string[];
    copyright: boolean,
    media_type: string,
    formats: JSONObject,
    download_count: number
}
