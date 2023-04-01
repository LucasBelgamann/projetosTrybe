class TrackOrders:
    def __init__(self):
        self._data = list()

    def __len__(self):
        length_data = len(self._data)
        return length_data

    def add_new_order(self, customer, order, day):
        lista = [customer, order, day]
        self._data.append(lista)
        return len(self._data)

    def get_most_ordered_dish_per_customer(self, customer):
        orders = [order[1] for order in self._data if order[0] == customer]
        if len(orders) > 0:
            return max(orders, key=orders.count)
        else:
            None

    def get_never_ordered_per_customer(self, customer):
        orders = set({order[1] for order in self._data})
        return orders - {
            order[1] for order in self._data if order[0] == customer
        }

    def get_days_never_visited_per_customer(self, customer):
        days = set({order[2] for order in self._data})
        return days - {
            order[2] for order in self._data if order[0] == customer
        }

    def get_busiest_day(self):
        busiest_day = [order[2] for order in self._data]
        return max(busiest_day, key=busiest_day.count)

    def get_least_busy_day(self):
        least_busy_day = [order[2] for order in self._data]
        return min(least_busy_day, key=least_busy_day.count)
