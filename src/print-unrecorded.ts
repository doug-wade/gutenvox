const printUnrecorded = (unrecorded: Set<any>) => {
    console.log("Unrecorded books:");

    for (const book of unrecorded.values()) {
        console.log(` - ${book.title} by ${book.authors[0].name} (${book.formats['text/html']})`);
    }
}

export default printUnrecorded;
