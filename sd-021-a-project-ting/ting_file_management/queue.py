from ting_file_management.abstract_queue import AbstractQueue


class Queue(AbstractQueue):
    def __init__(self):
        """Inicialize sua estrutura aqui"""
        self.queue = list()

    def __len__(self):
        """Aqui irá sua implementação"""
        length = len(self.queue)
        return length

    def enqueue(self, value):
        """Aqui irá sua implementação"""
        self.queue.append(value)

    def dequeue(self):
        """Aqui irá sua implementação"""
        if len(self.queue) == 0:
            return None
        else:
            return self.queue.pop(0)

    def search(self, index):
        """Aqui irá sua implementação"""
        length = len(self.queue)
        if (0 <= index < length):
            return self.queue[index]
        raise IndexError("Not a valid index")
