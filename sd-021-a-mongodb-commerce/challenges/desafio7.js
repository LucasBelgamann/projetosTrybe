db.produtos
  .find(
    { $and: [
        { curtidas: { $ne: 50 } },
        { tags: { $exists: false } }] },
    { nome: 1, _id: 0, vendidos: 1 },
  );