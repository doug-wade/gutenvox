# gutenvox

A command-line tool for finding the n most popular public domain project gutenberg books that have no librivox recording matching a search query.

## Usage

Use with npx

```shell
npx gutenvox --search=flynn
```

## Options

`gutenvox` takes the following options:

- copyright
- languages
- limit
- search
- sort
- topic

### copyright

Defaults to `false`. Set this to true to return copyrighted projects.

```shell
npx gutenvox --search=grishom --copyright=true
```

### languages

Defaults to `en`. Use this to configure which language of books to search

```shell
npx gutenvox --languages=fr,en --search=beckett
```

### limit

Defaults to `10`. Use this to determine how many books to return.

```shell
npx gutenvox --limit=1 --topic=horror
```

### search

A search term.

```shell
npx gutenvox --search=great%20expectations
```

### sort

Defaults to `popular`. Can be one of: `ascending`, `descending`, or `popular`

```shell
npx gutenvox --sort=ascending --topic=science%20fiction
```

### topic

Search for a case-insensitive key-phrase in books' bookshelves or subjects.

```shell
npx gutenvox --search=horror
```
