def study_schedule(permanence_period, target_time):
    """Faça o código aqui."""
    counter = 0
    try:
        for entry, exxit in permanence_period:
            if entry <= target_time <= exxit:
                counter += 1
        return counter
    except TypeError:
        return None
