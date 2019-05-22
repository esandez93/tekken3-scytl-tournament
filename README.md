### RUN

* If you're developing the frontend using mock DB, you will find further instructions in [front README](https://github.com/esandez93/tekken3-scytl-tournament/blob/master/front/README.md).

* If you're developing backend or want to use the real DB data, follow this instructions:
  1. First of all, you need to execute an `npm install` in the root, the `front` and the `back` folders.
  2. You need to install MongoDB
  3. Run MongoDB. In the root's `package.json` is a script pointing to a route. That route must be your local MongoDB server.
  4. Run API server. In the `back` folder execute `npm start`.
  5. Run Frontend. In the `front` folder execute `npm start`.