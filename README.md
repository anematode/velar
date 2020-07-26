# Velar

Velar is a graphing calculator for the web built using [Grapheme](https://github.com/anematode/grapheme).

## Development

```sh
npm install
npm start
```

This should automatically open http://localhost:3000/ in your browser.

You can make Standard scream at you if you use semicolons:

```sh
EXTEND_ESLINT=true npm start
```

(This doesn't work because it won't accept the Babel parser or something. Use [`npm install -g prettier-standard`](https://www.npmjs.com/package/prettier-standard) then `prettier-standard --format --lint` instead, maybe?)
