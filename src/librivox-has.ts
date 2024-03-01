import fetch from 'node-fetch-cache';

import type { GutendexBook } from './types.d.ts';

const extractId = (url: string) => {
    const split = url.split('/');
    const last = split[split.length - 1];

    return parseInt(last);
};

const librivoxHas = async (book: GutendexBook) => {
    const stringUrl = 'https://librivox.org/api/feed/audiobooks/';
    const url = new URL(stringUrl);
    const params = url.searchParams;

    // librivox's api only supports searching by one of: author, title, or genre
    // so we search by the most restrictive (title), and then check to see if any
    // of the search results link to our project gutenberg book
    params.append('title', book.title);
    params.append('format', 'json');

    const response = await fetch(url.href);
    const data = await response.json();

    if (data.error) {
        return false;
    }

    for (const result of data.books) {
        if (extractId(result.url_text_source) === book.id) {
            return true;
        }
    }

    return false;
};

export default librivoxHas;