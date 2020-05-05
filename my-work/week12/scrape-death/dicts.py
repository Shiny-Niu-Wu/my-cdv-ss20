# at the top of the page, import the time module
import time

#import the library
from requests_html import HTMLSession

# create a new session
session = HTMLSession()

# open a website
r = session.get("https://www.tdcj.texas.gov/death_row/dr_executed_offenders.html")

print(r) # returns if it was able to open the page or not

orderedLists = r.html.find("tr")
# this is an array
# print(orderedLists)

for item in orderedLists:
    # time.sleep(0.05)
    info = item.find("td")
    print("---")
    # this is also an array
    # print(info)
    links = item.find("a")
    print(links)
    for detail in info:
        # print(detail)
        print(detail.text)
