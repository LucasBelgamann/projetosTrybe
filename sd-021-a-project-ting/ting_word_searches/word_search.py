from ting_file_management.queue import Queue
import re


def exists_word(word,  instance: Queue):
    """E lá vamos nós"""
    occurrences_instance = [
        {
            "palavra": word,
            "arquivo": file["nome_do_arquivo"],
            "ocorrencias": [
                {"linha": i + 1}
                for i, text in enumerate(file["linhas_do_arquivo"])
                if re.search(word, text, re.I)
            ],
        }
        for file in instance.queue
    ]
   
    if len(occurrences_instance[0]["ocorrencias"]):
        return occurrences_instance
    else:
        return []


def search_by_word(word, instance):
    """Aqui irá sua implementação"""
