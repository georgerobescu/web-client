const express = require("express");
const nextI18NextMiddleware = require("next-i18next/middleware");
const nextI18next = require("shared/i18n");
const { parse } = require("url");

module.exports = async app => {
  const handle = app.getRequestHandler();
  await app.prepare();

  const server = express();
  const port = process.env.PORT || 3000;
  server.use(nextI18NextMiddleware(nextI18next));
  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pathname.length > 1 && pathname.slice(-1) === "/") {
      app.render(req, res, pathname.slice(0, -1), query);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};
