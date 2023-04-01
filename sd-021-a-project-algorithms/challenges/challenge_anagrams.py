def is_anagram(first_string, second_string):
    """Faça o código aqui."""
    first_ordered = sort(first_string.lower())
    second_ordered = sort(second_string.lower())

    if first_ordered == '':
        return (first_ordered, second_ordered, False)
    if second_ordered == '':
        return (first_ordered, second_ordered, False)
    if first_ordered == second_ordered:
        return (first_ordered, second_ordered, True)
    return (first_ordered, second_ordered, False)


def sort(string: str):
    stringLen = len(string)

    if stringLen <= 1:
        return string

    left_side = sort(string[:stringLen // 2])
    rigth_side = sort(string[stringLen // 2:])

    return merge(left_side, rigth_side)


def merge(left_side: str, rigth_side: str):
    final_result = ''

    while len(left_side) > 0 and len(rigth_side) > 0:
        if left_side[0] < rigth_side[0]:
            final_result += left_side[0]
            left_side = left_side[1:]
        else:
            final_result += rigth_side[0]
            rigth_side = rigth_side[1:]

    final_result += rigth_side
    final_result += left_side

    return final_result
