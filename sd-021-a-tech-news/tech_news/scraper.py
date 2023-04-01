import requests
import time
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    try:
        time.sleep(1)
        response = requests.get(
            url,
            headers={"user-agent": "Fake user-agent"},
            timeout=3
            )
        if (response.status_code == 200):
            return response.text
    except requests.Timeout:
        return None


# Requisito 2
def scrape_updates(html_content):
    selector = Selector(html_content)
    links = selector.css("h2.entry-title a::attr(href)").getall()
    return links


# Requisito 3
def scrape_next_page_link(html_content):
    selector = Selector(html_content)
    next_link = selector.css("a.next::attr(href)").get()
    return next_link


# Requisito 4
def scrape_news(html_content):
    selector = Selector(html_content)
    reading_time = selector.css("li.meta-reading-time::text").get().split()[0]
    return {
        "url": selector.css('link[rel="canonical"]::attr(href)').get(),
        "title": selector.css("h1.entry-title::text").get().strip(),
        "timestamp": selector.css("li.meta-date::text").get(),
        "writer": selector.css("span.author > a::text").get(),
        "reading_time": int(reading_time),
        "summary": "".join(
            selector.css(".entry-content > p:nth-of-type(1) *::text").getall()
            ).strip(),
        "category": selector.css("a > span.label::text").get(),
    }


# Requisito 5
def get_tech_news(amount):
    html = fetch("https://blog.betrybe.com")
    news_list = scrape_updates(html)

    while len(news_list) < amount:
        next_page = scrape_next_page_link(html)
        html = fetch(next_page)
        news_list += scrape_updates(html)
    data = [scrape_news(fetch(new)) for new in news_list[:amount]]

    create_news(data)
    return data
