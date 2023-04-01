from inventory_report.importer.importer import Importer
import json


class JsonImporter(Importer):
    def import_data(file_path):
        try:
            with open(file_path, encoding="utf-8") as file:
                return json.loads(file.read())
        except json.JSONDecodeError:
            raise ValueError("Arquivo inválido")