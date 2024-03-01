import assert from "node:assert";
import { describe, it } from "node:test";

import esmock from "esmock";

import librivoxResponse from './fixtures/librivox-response.json' assert { type: 'json' };
import gutendexPage from './fixtures/gutendex-page.json' assert { type: 'json' };

describe("librivox-has", () => {
    it("should return true if the book is in LibriVox", async () => {
        const { default: librivoxHas } = await esmock('../src/librivox-has', {}, {
            'node-fetch-cache': () => Promise.resolve(new Response(JSON.stringify(librivoxResponse)))
        });

        const actual = await librivoxHas(gutendexPage.results[0]);

        assert.ok(actual);
    });

    it("should return false if the book is not in LibriVox", async () => {
        const { default: librivoxHas } = await esmock('../src/librivox-has', {}, {
            'node-fetch-cache': () => Promise.resolve(new Response('{"books":[]}', { status: 200 }))
        });

        const actual = await librivoxHas(gutendexPage.results[0]);

        assert.ok(!actual);
    });
});
