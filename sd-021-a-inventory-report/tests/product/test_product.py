from inventory_report.inventory.product import Product


def test_cria_produto():
    product = Product(
        id=1,
        nome_do_produto="Nicotine Polacrilex",
        nome_da_empresa="Target Corporation",
        data_de_fabricacao="2021-02-18",
        data_de_validade="2023-09-17",
        numero_de_serie=2515514467254944021,
        instrucoes_de_armazenamento="instrucao 1"
    )

    assert product.id == 1
    assert product.nome_do_produto == "Nicotine Polacrilex"
    assert product.nome_da_empresa == "Target Corporation"
    assert product.data_de_fabricacao == "2021-02-18"
    assert product.data_de_validade == "2023-09-17"
    assert product.numero_de_serie == 2515514467254944021
    assert product.instrucoes_de_armazenamento == "instrucao 1"
