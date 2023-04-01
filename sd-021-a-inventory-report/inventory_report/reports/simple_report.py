from collections import Counter


class SimpleReport:
    @staticmethod
    def generate(products):
        earliest_manufacturing_date = min(
            product["data_de_fabricacao"] for product in products
        )
        earliest_expiration_date = min(
            product["data_de_validade"] for product in products
        )
        company_with_more_products = Counter(
            product["nome_da_empresa"] for product in products
        ).most_common()[0][0]
        return (
            f"Data de fabricação mais antiga: {earliest_manufacturing_date}\n"
            f"Data de validade mais próxima: {earliest_expiration_date}\n"
            f"Empresa com mais produtos: {company_with_more_products}"
        )
