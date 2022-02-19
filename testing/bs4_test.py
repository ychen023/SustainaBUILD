from html.parser import HTMLParser
from bs4 import BeautifulSoup
import requests

headers = {'User-Agent': """ input user agent here """}

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
def proc_vegware_categories(cat_name, cat_url):
  result = requests.get(cat_url, headers=headers)
  page = BeautifulSoup(result.text, "html.parser")

  print("------- \n")
  print(cat_name)

  # going through sub categories
  for sub_cat in page.find_all(class_="subCat"):
    print()
    sub_cat_name = sub_cat.find(class_="subCat__header-title").text
    print(" ", sub_cat_name, ":")

    # going through each product in each sub category
    for prod in sub_cat.find_all(class_="product"):
      prod_header = prod.find(class_="product__title").find("a")
      prod_name = prod_header.text
      prod_url = "https://www.vegwareus.com" + prod_header["href"]

      prod_stock_status = prod.find(class_="product__stock-message")
      if prod_stock_status.find("span") is None:
        # out of stock
        prod_stock_status = "Out of stock"
      
      else:
        prod_stock_status = (prod_stock_status.find("span").text)[1:] # removing the extra space

      print("    " + prod_name + " (" + prod_stock_status + ") -> " + prod_url)

      # going through each pricing option/breakdown
      for price in prod.find_all(class_="pricing__single"):
        dollar_amount = price.find(class_="pricing__price").text
        breakdown = price.find(class_="pricing__type").text

        print("     ", dollar_amount, breakdown)


#
def main():
  urls = list_fill_vegware_categories()

  for name, url in urls.items():
    proc_vegware_categories(name, url)
    print()

main()