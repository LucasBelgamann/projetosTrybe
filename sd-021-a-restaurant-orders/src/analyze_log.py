import csv


def reader(path_to_file):
    with open(path_to_file) as file:
        file_response = csv.reader(file)
        data = [file_row for file_row in file_response]
    return data


def analyze_log(path_to_file):
    if not path_to_file.endswith('.csv'):
        raise FileNotFoundError(f"Extensão inválida: '{path_to_file}'")

    try:
        orders_data = reader(path_to_file)
        days = set(order[2] for order in orders_data)
        dishes = set(order[1] for order in orders_data)

        marias_dishes = [
            order[1] for order in orders_data if order[0] == 'maria'
        ]
        maria_m_r_dish = max(marias_dishes, key=marias_dishes.count)
        arnaldo_ask = len([
            order for order in orders_data if order[0] == "arnaldo"
            and order[1] == "hamburguer"
        ])
        joao_never_asked = dishes - (
            {order[1] for order in orders_data if order[0] == 'joao'}
        )
        joao_never_go = days - (
            {order[2] for order in orders_data if order[0] == 'joao'}
        )
        
        response = (
            f"{maria_m_r_dish}\n"
            f"{arnaldo_ask}\n"
            f"{joao_never_asked}\n"
            f"{joao_never_go}\n"
        )
        
        with open('data/mkt_campaign.txt', "w") as file:
            file.write(response)

    except FileNotFoundError:
        raise FileNotFoundError(f"Arquivo inexistente: '{path_to_file}'")
