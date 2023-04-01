from inventory_report.importer.importer import Importer
import xmltodict


class XmlImporter(Importer):
    def import_data(file_path):
        try:
            with open(file_path) as file:
                return list(xmltodict.parse(file.read())['dataset']['record'])
        except Exception:
            raise ValueError("Arquivo inválido")