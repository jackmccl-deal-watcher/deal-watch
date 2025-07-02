import requests
from bs4 import BeautifulSoup

def getRecentlySold(keyword, max_pages):
    page_number = 1

    recentlySoldListingsData = []

    while page_number < max_pages:
        url = f'https://www.ebay.com/sch/i.html?_nkw={keyword}&_sacat=0&_from=R40&rt=nc&LH_Sold=1&LH_Complete=1&_pgn={page_number}'
        response = requests.get(url=url)
        html_content = response.text

        soup = BeautifulSoup(html_content, 'html.parser')

        next_page_btn = soup.find('a', class_='pagination__next', type='next')

        if not next_page_btn:
            break
        
        else:
            recentlySoldListings = soup.find_all('div', class_='s-item__info')
            # Skips ebay logo images
            for listing in recentlySoldListings[2:]:
                title = listing.find('div', class_='s-item__title').text
                sold_date = listing.find('span', class_='s-item__caption--signal').text
                sold_price = listing.find('span', class_='s-item__price').text
                listing_data = {
                    'title': title,
                    'sold_date': sold_date,
                    'sold_price': sold_price,
                }
                recentlySoldListingsData.append(listing_data)
        
        page_number += 1


    return recentlySoldListingsData