import fetch from 'node-fetch-cache';
import librivoxHas from "./librivox-has.js";

const getUnrecorded = async ({ copyright, limit, search, topic, languages, sort }: { copyright: string, limit: number, search: string | undefined, topic: string | undefined, languages: string, sort: string }) => {
    const unrecorded = new Set();
    let page = 0;

    while (unrecorded.size < limit) {
        const stringUrl = `https://gutendex.com/books/?page=${++page}&languages=${languages}&sort=${sort}&copyright=${copyright}`;
        const url = new URL(stringUrl);
        const params = url.searchParams;

        if (search) {
            params.append("search", search);
        }

        if (topic) {
            params.append("topic", topic);
        }

        const response = await fetch(url.href);
        const data = await response.json();

        if (data.detail === "Invalid page." || data.results.length === 0) {
            console.log("No more books to check");
            break;
        }

        for (const book of data.results) {
            if (unrecorded.size >= limit) {
                break;
            }

            if (!(await librivoxHas(book))) {
                unrecorded.add(book);
            }
        }

        if (data.next === null) {
            console.log("No more books to check");
            break;
        }
    }

    return unrecorded;
};

export default getUnrecorded;