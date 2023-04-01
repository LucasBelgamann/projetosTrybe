db.produtos
  .find(
    { $and: [
        { curtidas: { $gt: 10 } },
        { curtidas: { $lt: 100 } }] },
    { nome: 1, _id: 0, curtidas: 1 },
  );