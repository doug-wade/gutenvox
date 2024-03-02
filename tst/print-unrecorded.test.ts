import assert from "node:assert";
import { describe, it, mock } from "node:test";

import printUnrecorded from "../src/print-unrecorded";
import { GutendexBook } from "../src/types";

const getMockGutendexBook = (overrides = {}): GutendexBook => {
    const mockGutendexBook: GutendexBook = {
        id: 1,
        title: "Title",
        languages: ["en"],
        subjects: ["Subject"],
        authors: [{ name: "Author", birth_year: 1991, death_year: 2021 }],
        translators: [{ name: "Translator", birth_year: 1991, death_year: 2021 }],
        formats: { "text/html": "http://www.gutenberg.org/ebooks/1" },
        bookshelves: [], 
        copyright: false, 
        media_type: "ebook", 
        download_count: 123
    };

    return { ...mockGutendexBook, ...overrides };
}

describe("print-unrecorded", () => {
    it("should call console.log", () => {
        const unrecorded = new Set(Array.from({ length: 3 }, () => getMockGutendexBook()));
        const consoleMock = console.log = mock.fn();

        printUnrecorded(unrecorded);

        assert.strictEqual(unrecorded.size + 1, consoleMock.mock.calls.length);
    });

    it("should handle books with no authors", () => {
        const unrecorded = new Set(Array.from({ length: 3 }, () => getMockGutendexBook({ authors: [] })));
        const consoleMock = console.log = mock.fn();

        printUnrecorded(unrecorded);

        assert.strictEqual(unrecorded.size + 1, consoleMock.mock.calls.length);
    });
});
