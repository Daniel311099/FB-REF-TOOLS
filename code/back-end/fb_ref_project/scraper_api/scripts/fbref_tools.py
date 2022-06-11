# from gettext import install
from bs4 import BeautifulSoup as bs
# import pandas as pd
import requests
# from sklearn.cluster import KMeans
# import numpy as np
# from sklearn.linear_model import LinearRegression
# from matplotlib.pyplot import scatter
# from sklearn.metrics import mean_squared_error
# import re

if __name__ == "__main__":
    print(1)
    pass

# url_22 = 'https://fbref.com/en/comps/Big5/stats/players/Big-5-European-Leagues-Stats'

def parse(req):
    # model that prdeicts re input value for table name, columns and url return as object
    for li in req:
        pass
    # loop()
        # function_of(req[i]) => location key
        # different function_of(req[i]) => url
    # return list(locator, url pairs)
    return [['standard stats big 5', get_url(2022)]]

def get_loc(loc_ref):
    locations = {'standard stats big 5': {'id': "stats_standard"}}
    return locations[loc_ref]

def to_csv(tables):
    pass

def request(req, **csv):
    parsed = parse(req)
    loc_pages = list(map(lambda pair: (get_loc(pair[0]), get_page(pair[1])), parsed))
    tables = [get_table(*loc_page) for loc_page in loc_pages]
    if csv: return [to_csv(table) for table in tables]
    frames = [get_frame(*table) for table in tables]
    return frames

def get_url(year, **params):
    # params = competition, type_pt, stat, player_team
    if year == 2022: return 'https://fbref.com/en/comps/Big5/stats/players/Big-5-European-Leagues-Stats'
    url = f'https://fbref.com/en/comps/Big5/{year-1}-{year}/stats/players/{year-1}-{year}-Big-5-European-Leagues-Stats'
    return url

def get_page(url):
    page = requests.get(url)
    soup = bs(page.content, 'html.parser')
    return soup

def col_map(head, body):
    mapping = {h:b for (h, b) in (head, body)}
    return mapping

def row_map(row):
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
        # if td.get('data-stat') == 'player':
        #     id = td.get('data-append-csv')
        #     out['id'] = id
        out[col] = val
    return out

def get_dict(locator, doc):
    table = doc.find('table', attrs=locator)
    if table is None: return 'error'
    body_tag = table.find('tbody').find_all('tr')
    body_head = table.find('tbody').find_all('tr', attrs = {'class': 'thead'})
    body_tag = list(filter(lambda x: x not in body_head, body_tag))
    body = list(map(row_map, body_tag))
    return body

def get_table(locator, doc):
    table = doc.find('table', attrs=locator)
    if table is None: return 'error'
    body_tag = table.find('tbody').find_all('tr')
    body_head = table.find('tbody').find_all('tr', attrs = {'class': 'thead'})
    body_tag = list(filter(lambda x: x not in body_head, body_tag))
    head = [li.get('data-stat') for li in body_tag[0]] 
    body = list(map(lambda x: [t.text for t in x], body_tag))
    names = [row.find('td', attrs={'data-stat': "player"}) for row in body_tag]
    player_ids = [name.get('data-append-csv') for name in names]
    return [head, body, player_ids]

def get_frame(head, body, player_ids):
    df = pd.DataFrame({th: [row[i] for row in body] for i, th in enumerate(head)})
    df['player_id'] = player_ids
    num_df = df.apply(pd.to_numeric, errors='ignore')
    cols = num_df.columns.tolist()
    new_order = ['player_id', *cols[:-1]]
    num_df = num_df[new_order]
    return num_df

def filtered(df, **col):
    filtered_df = df.copy()
    for c,v in col.items():
        if v[0] == 0:
            filtered_df = filtered_df[filtered_df[c] > v[1]]
        elif v[0] == 1:
            filtered_df = filtered_df[filtered_df[c].isin(v[1])]
    return filtered_df

def get_npMatrix(x_df, y_df, conditions, x_col, y_col):

    x_filtered = filtered(x_df, **conditions)
    x_goals = x_filtered[['player_id', x_col]]
    x_goals.rename(columns={x_col: 'x'}, inplace=True)
    y_filtered = filtered(y_df, **conditions)
    y_goals = y_filtered[['player_id', y_col]]
    y_goals.rename(columns={y_col: 'y'}, inplace=True)
    joined = pd.merge(x_goals, y_goals, on='player_id', how='inner')
    npMatrix = np.matrix(joined[['x', 'y']])
    return npMatrix

def train(npMatrix):
    X, Y = npMatrix[:,0], npMatrix[:,1]
    mdl = LinearRegression()
    mdl.fit(X,Y)
    return mdl

def get_error(mdl, matrix):
    test = matrix[:,0]
    predict = mdl.predict(test)
    real = matrix[:,1]
    mse = mean_squared_error(real, predict)
    return mse

def plot(mdl, matrix):
    X, Y = matrix[:,0], matrix[:,1]
    m = mdl.coef_[0]
    b = mdl.intercept_
    print(f'line is: y = {m[0]}x + {b[0]}')
    x_cords = [x[0] for x in X]
    y_cords = [y[0] for y in Y]
    scatter(x_cords, y_cords, color='blue')

# dataframes = request('standard stats big 5')
# print(dataframes[0])