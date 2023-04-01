from ting_file_management.file_management import txt_importer
import sys


def process(path_file, instance):
    """Aqui irá sua implementação"""
    try:
        for dict in instance.queue:
            if dict.get('nome_do_arquivo') == path_file:
                return None

        dict_result = {
            "nome_do_arquivo": path_file,
            "qtd_linhas": len(txt_importer(path_file)),
            "linhas_do_arquivo": txt_importer(path_file)
        }

        instance.enqueue(dict_result)
        print(dict_result)
    
    except Exception as e:
        print(f"Erro ao processar arquivo {path_file}: {str(e)}")
        return None


def remove(instance):
    """Aqui irá sua implementação"""
    length_inst = len(instance)
    if (length_inst == 0):
        return print("Não há elementos")
    
    removed_file = instance.dequeue()
    name_file = removed_file["nome_do_arquivo"]
    print(f"Arquivo {name_file} removido com sucesso", file=sys.stdout)


def file_metadata(instance, position):
    """Aqui irá sua implementação"""
    try:
        file_data = instance.search(position)
        print(file_data, file=sys.stdout)
    except IndexError:
        print("Posição inválida", file=sys.stderr)
