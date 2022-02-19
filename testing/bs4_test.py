from html.parser import HTMLParser
from bs4 import BeautifulSoup
import requests

url = "https://www.vegwareus.com/us/catalogue/soup_containers/"
headers = {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36'}
result = requests.get(url, headers=headers)
doc = BeautifulSoup(result.text, "html.parser")

prices = doc.find_all(class_="subCat")

# going through all sub categories
for i in range(len(prices)):
  print("-----------------")
  curr = prices[i]
  print(curr.find(class_="subCat__header-title").string)
  curr_prods = curr.find_all(class_="product")

  # going through each prod in each sub category
  for j in range(len(curr_prods)):
    curr_prod = curr_prods[j]
    curr_prod_name = curr_prod.find(class_="product__title").find("a").string
    curr_prod_stock = curr_prod.find(class_="product__stock-message")

    if curr_prod_stock.find("span") is None:
      curr_prod_stock = 'Out of stock'

    else:
      curr_prod_stock = (curr_prod_stock.find("span").text)[1:]

    print("  " + curr_prod_name + " - (" + curr_prod_stock + ")")
    curr_prod_prices = curr_prod.find_all(class_="pricing__single")

    # going through all price options & breakdowns for each prod
    for k in range(len(curr_prod_prices)):
      single_pricing = curr_prod_prices[k].find(class_="pricing__price").string + curr_prod_prices[k].find(class_="pricing__type").string
      print("    " + single_pricing)