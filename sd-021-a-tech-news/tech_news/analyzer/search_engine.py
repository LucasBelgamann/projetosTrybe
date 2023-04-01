from tech_news.database import search_news
from datetime import datetime


# Requisito 7
def search_by_title(title):
    news = search_news({"title": {"$regex": title, "$options": "i"}})

    news_list = [(element["title"], element["url"]) for element in news]

    return news_list


# Requisito 8
def search_by_date(date):
    try:
        news = []
        date = datetime.fromisoformat(date).strftime("%d/%m/%Y")

        for new in search_news({"timestamp": date}):
            news.append((new["title"], new["url"]))
            
        return news
    except ValueError:
        raise ValueError("Data inválida")


# Requisito 9
def search_by_category(category):
    news = search_news({"category": {"$regex": category, "$options": "i"}})
    news_list = [(new["title"], new["url"]) for new in news]
    return news_list
