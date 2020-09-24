import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# ls -1 */*.html
pages = [
    "01_Introduction/01-01-altair-intro.html",
    "01_Introduction/index.html",
    "02_What/02-01-pandas.html",
    "02_What/02-03-flask-demo.html",
    "02_What/index.html",
    "03_Why/index.html",
    "04_How/index.html",
    "05_Rules_of_thumb/index.html",
    "06_Tabular/index.html",
    "07_Time/index.html",
    "08_Networks_and_Color/index.html",
    "09_Trees_and_Geo/index.html",
    "09_Trees_and_Geo/spatial_data.html",
    "10_Manipulate_Views/index.html",
    "11_Faceting/index.html",
    "12_Evaluation/index.html",
    "13_Reducing/index.html",
    "14_Advanced/index.html"
]

chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--start-maximized')
driver = webdriver.Chrome(chrome_options=chrome_options)

for page in pages:
    uri = 'http://0.0.0.0:8080/' + page
    driver.get(uri)
    driver.save_screenshot("screenshots/"+page.replace('/','_').replace('html','png'))