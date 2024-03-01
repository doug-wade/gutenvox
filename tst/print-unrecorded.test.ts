import assert from "node:assert";
import { describe, it, mock } from "node:test";

import printUnrecorded from "../src/print-unrecorded";
import { GutendexBook } from "../src/types";

describe("print-unrecorded", () => {
    it("should call console.log", () => {
        const unrecorded = new Set([{} as GutendexBook, {} as GutendexBook]);
        const consoleMock = console.log = mock.fn();

        printUnrecorded(unrecorded);

        assert.strictEqual(unrecorded.size + 1, consoleMock.mock.calls.length);
    });
});
