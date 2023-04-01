from functools import lru_cache
from typing import List, Dict
import csv


@lru_cache
def read(path: str) -> List[Dict]:

    with open(path, 'r') as file:
        data = csv.DictReader(file)
        return list(data)
    raise NotImplementedError


def get_unique_job_types(path: str) -> List[str]:
    data = read(path)
    job_types = set()
    for job in data:
        job_types.add(job["job_type"])
    return job_types

    raise NotImplementedError


def filter_by_job_type(jobs: List[Dict], job_type: str) -> List[Dict]:
    return [job for job in jobs if job["job_type"] == job_type]
    raise NotImplementedError
