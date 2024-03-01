import { parseArgs } from 'node:util';
import getUnrecorded from './get-unrecorded.js';
import printUnrecorded from './print-unrecorded.js';

const options = {
    copyright: { type: 'string' as const, default: 'false' },
    sort: { type: 'string' as const, default: 'popular' },
    languages: { type: 'string' as const, default: 'en' },
    limit: { type: 'string' as const, default: '10' },
    search: { type: 'string' as const },
    topic: { type: 'string' as const },
};
const {
    copyright,
    sort,
    languages,
    limit,
    search,
    topic
} = parseArgs({ options }).values;

(async () => {
    const unrecorded = await getUnrecorded({ 
        limit: parseInt(String(limit)), 
        search: search ? String(search) : undefined, 
        topic: topic ? String(topic) : undefined,
        languages: String(languages), 
        sort: String(sort), 
        copyright: String(copyright)
    });
    printUnrecorded(unrecorded);
})();
