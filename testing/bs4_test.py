from html.parser import HTMLParser
from bs4 import BeautifulSoup
import requests
import json

headers = {'User-Agent': """ insert user agent """}

# returns a dictionary of vegware product categories as keys and
#   their href urls as values
def list_fill_vegware_categories():
  result = requests.get("https://www.vegwareus.com/us/catalogue/", headers=headers)
  doc = BeautifulSoup(result.text, "html.parser")
  urls = {}

  # grabbing all the category tags
  cats = doc.find_all(class_="catBox")

  for cat_box in cats:
    cat_name = cat_box.find(class_="catBox__title").text
    # Categories we don't want to include
    if cat_name == "Home essentials" or cat_name == "Delivery":
      continue

    cat_url = "https://www.vegwareus.com" + cat_box["href"]
    urls[cat_name] = cat_url

  return urls


# going through each category
def proc_vegware_categories(cat_name, cat_url, json_dict):
  result = requests.get(cat_url, headers=headers)
  page = BeautifulSoup(result.text, "html.parser")

  json_dict[cat_name] = {} # assigning the category an empty dict
  cat_dict = json_dict.get(cat_name) # grabbing the category dict so its easier to use/refer to

  # going through sub categories
  for sub_cat in page.find_all(class_="subCat"):
 
    sub_cat_name = sub_cat.find(class_="subCat__header-title").text
    cat_dict[sub_cat_name] = {}
    sub_cat_dict = cat_dict.get(sub_cat_name) # again grabbing the subcat dict so its easier to use/refer to

    # going through each product in each sub category
    for prod in sub_cat.find_all(class_="product"):
      prod_header = prod.find(class_="product__title").find("a")

      # adding prod to the dict & grabbing the prod dict
      prod_name = prod_header.text
      sub_cat_dict[prod_name] = {}
      prod_dict = sub_cat_dict.get(prod_name)

      # adding prod URL to the dict
      prod_url = "https://www.vegwareus.com" + prod_header["href"]
      prod_dict["url"] = prod_url

      # adding prod stock to the dict
      prod_stock_status = prod.find(class_="product__stock-message")
      if prod_stock_status.find("span") is None:
        # out of stock
        prod_stock_status = "Out of stock"
      
      else:
        prod_stock_status = (prod_stock_status.find("span").text)[1:] # removing the extra space

      prod_dict["stock_status"] = prod_stock_status

      # adding prod image url to the dict for the dashboard cards
      prod_image = prod.find("img")
      prod_dict["image_url"] = prod_image["src"]

      # adding empty list for prod price breakdowns
      prod_dict["price_breakdowns"] = []
      prod_breakdowns = prod_dict.get("price_breakdowns")

      # going through each pricing option/breakdown
      for price in prod.find_all(class_="pricing__single"):
        dollar_amount = price.find(class_="pricing__price").text
        breakdown = price.find(class_="pricing__type").text

        prod_breakdowns.append(dollar_amount + breakdown)


def main():
  # Dict -> prod cat : URL
  #  can probably eventually get rid of this work and just call proc_vegware_categories directly
  urls = list_fill_vegware_categories()

  json_dict = {}

  for name, url in urls.items():
    proc_vegware_categories(name, url, json_dict)

  print("done scraping, pushing to json file")
  with open('vegware.json', 'w', encoding="utf-8") as vw:
    # print("opened")
    json.dump(json_dict, vw, ensure_ascii=False, indent=2)

# Source -> Category -> Subcategory -> Prod -> price breakdowns (as an array)
#                                           -> stock status?
#                                           -> URL
# {
#   "Categories": {
#     "Subcategories": {
#       "prods": {
#         "price_breakdowns": [],
#         "Stock status": "In Stock",
#         "url": "vegware.us/soiejfs"
#       }
#     }
#   }
# }

main()