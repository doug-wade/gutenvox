import assert from "node:assert";
import { afterEach, describe, it , mock } from "node:test";

import esmock from 'esmock';

import gutendexPage from './fixtures/gutendex-page.json' assert { type: 'json' };

describe("get-unrecorded", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should return a set matching the response", async () => {
        const { default: getUnrecorded } = await esmock('../src/get-unrecorded', {}, {
            'node-fetch-cache': () => Promise.resolve(new Response(JSON.stringify(gutendexPage))),
            '../src/librivox-has': () => Promise.resolve(false)
        });
        const limit = 1;

        const unrecorded = await getUnrecorded({ 
            limit, 
            copyright: 'false', 
            languages: 'en', 
            sort: 'popular', 
            search: undefined, 
            topic: undefined 
        });

        assert.strictEqual(unrecorded.size, limit);
    });

    it("should return a set with fewer than the limit if there are fewer books", async () => {
        const { default: getUnrecorded } = await esmock('../src/get-unrecorded', {}, {
            'node-fetch-cache': () => Promise.resolve(new Response(JSON.stringify(gutendexPage))),
            '../src/librivox-has': () => Promise.resolve(false)
        });
        const limit = 100;

        const unrecorded = await getUnrecorded({ 
            limit,
            copyright: 'false', 
            languages: 'en', 
            sort: 'popular', 
            search: undefined, 
            topic: undefined 
        });

        assert.strictEqual(unrecorded.size, Math.min(limit, gutendexPage.results.length));
    });

    it("should pass a search parameter to the URL", async () => {
        const mockSearch = 'Jubilee';
        const fetchMock = mock.fn(() => Promise.resolve(new Response(JSON.stringify(gutendexPage))));
        const { default: getUnrecorded } = await esmock('../src/get-unrecorded', {}, {
            'node-fetch-cache': fetchMock,
            '../src/librivox-has': () => Promise.resolve(false)
        });
        const limit = 1;

        await getUnrecorded({ 
            limit,
            copyright: 'false', 
            languages: 'en', 
            sort: 'popular', 
            search: mockSearch, 
            topic: undefined 
        });

        assert.strictEqual(fetchMock.mock.calls.length, 1);
        assert.ok(!fetchMock.mock.calls[0].arguments[0].includes(`topic`));
        assert.ok(fetchMock.mock.calls[0].arguments[0].includes(`search=${mockSearch}`));
    });

    it("should pass a topic parameter to the URL", async () => {
        const mockTopic = 'Logan';
        const fetchMock = mock.fn(() => Promise.resolve(new Response(JSON.stringify(gutendexPage))));
        const { default: getUnrecorded } = await esmock('../src/get-unrecorded', {}, {
            'node-fetch-cache': fetchMock,
            '../src/librivox-has': () => Promise.resolve(false)
        });
        const limit = 1;

        await getUnrecorded({ 
            limit,
            copyright: 'false', 
            languages: 'en', 
            sort: 'popular', 
            search: undefined, 
            topic: mockTopic 
        });

        assert.strictEqual(fetchMock.mock.calls.length, 1);
        assert.ok(!fetchMock.mock.calls[0].arguments[0].includes(`search`));
        assert.ok(fetchMock.mock.calls[0].arguments[0].includes(`topic=${mockTopic}`));
    });
});
