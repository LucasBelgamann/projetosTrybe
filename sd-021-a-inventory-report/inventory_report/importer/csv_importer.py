from inventory_report.importer.importer import Importer
import csv


class CsvImporter(Importer):
    def import_data(file_path):
        with open(file_path) as file:
            if "csv" in file_path:
                data = csv.DictReader(file, delimiter=",", quotechar='"')
            else:
                raise ValueError("Arquivo inválido")

            return list(data)