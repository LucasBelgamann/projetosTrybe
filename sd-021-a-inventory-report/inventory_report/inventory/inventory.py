from inventory_report.importer.csv_importer import CsvImporter
from inventory_report.importer.json_importer import JsonImporter
from inventory_report.importer.xml_importer import XmlImporter
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class Inventory:
    @staticmethod
    def import_data(file_path, file_type):
        if "csv" in file_path:
            data = CsvImporter.import_data(file_path)

        if "json" in file_path:
            data = JsonImporter.import_data(file_path)

        if "xml" in file_path:
            data = XmlImporter.import_data(file_path)
            
        if file_type == "completo":
            return CompleteReport.generate(data)
        else:
            return SimpleReport.generate(data)