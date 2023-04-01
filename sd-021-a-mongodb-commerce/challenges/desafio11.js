db.produtos
  .find(
    { $and: [
        { nome: { $ne: "Big Mac" } },
        { nome: { $ne: "McChicken" } }] },
    { nome: 1, _id: 0, vendidos: 1, curtidas: 1 },
  );