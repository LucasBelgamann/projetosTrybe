from inventory_report.reports.simple_report import SimpleReport
from collections import Counter


class CompleteReport():
    def qty_of_products_per_company(products):
        list_of_companies_str = ""
        list_of_companies = Counter(
            [product["nome_da_empresa"] for product in products])
        companies = dict(list_of_companies)
        for company in companies:
            list_of_companies_str += (
                f"- {company}: {companies[company]}\n")
        return list_of_companies_str

    @classmethod
    def generate(self, products):
        simple_report = SimpleReport.generate(products)
        qty_of_products = self.qty_of_products_per_company(products)
        return (
            f"{simple_report}\n"
            "Produtos estocados por empresa:\n"
            f"{qty_of_products}"
        )
