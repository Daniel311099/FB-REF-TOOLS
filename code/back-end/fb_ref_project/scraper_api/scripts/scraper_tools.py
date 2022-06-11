from bs4 import BeautifulSoup as bs
import requests

if __name__ == "main":
    pass

def get_url(year, comp, frame_type, subject):
    if year == 2022: return 'https://fbref.com/en/comps/Big5/stats/players/Big-5-European-Leagues-Stats'
    url = f'https://fbref.com/en/comps/Big5/{year-1}-{year}/stats/players/{year-1}-{year}-Big-5-European-Leagues-Stats'
    return url

def get_page(url):
    page = requests.get(url)
    soup = bs(page.content, 'html.parser')
    return soup

def parse(request):
    parsed = []
    for table in request:
        temp = table.copy()
        temp['year'] = int(table['year'])
        parsed.append(temp)
    return parsed
    # return [{year: , comp: , frame_type: , subject: }]

def get_loc(frame_type, year):
    loc = 'stats_standard'
    return {'id': loc}

def row_map(row):
    data = {}
    out = {}
    for td in row:
        col = td.get('data-stat')
        val = td.text
        try:
            val = int(val)
        except ValueError:
            try:
                val = float(val)
            except ValueError:
                if col == 'minutes':
                    val = int(''.join(val.split(',')))
                elif not val:
                    val = 0.0
        if col == 'player':
            id = td.get('data-append-csv')
            out['id'] = id
            out['name'] = val
            continue
        data[col] = val
    out['data'] = data
    return out

# split body into {id: , name: , data: }
def get_frame(locator, doc): 
    table = doc.find('table', attrs=locator)
    if table is None: return 'error'
    body_tag = table.find('tbody').find_all('tr')
    body_head = table.find('tbody').find_all('tr', attrs = {'class': 'thead'})
    body_tag = list(filter(lambda x: x not in body_head, body_tag))
    body = list(map(row_map, body_tag))
    return body