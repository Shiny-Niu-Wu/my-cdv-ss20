# at the top of the page, import the time module
import time

#import the library
from requests_html import HTMLSession

from pprint import pprint

# create a new session
session = HTMLSession()

# open a website
r = session.get("https://www.tdcj.texas.gov/death_row/dr_executed_offenders.html")

print(r) # returns if it was able to open the page or not

orderedLists = r.html.find("tr")
# this is an array
# print(orderedLists)

allData = []

for item in orderedLists:
    object = {}
    # time.sleep(0.05)
    info = item.find("td")
    print("---")
    # this is also an array
    # print(info)
    # infoLink = item.find("a", first=True)
    # statementLink = item.find("a")[-1]
    links = item.absolute_links
    print(links)
    # print(statementLink)
#content_right > div.overflow > table > tbody > tr:nth-child(2) > td:nth-child(2) > a
#content_right > div.overflow > table > tbody > tr:nth-child(2) > td:nth-child(3) > a
    infoArray = []
    for detail in info:
        # print(detail)
        # print(detail.text)
        infoArray.append(detail.text)
    object["info"] = infoArray


    allData.append(object)

# pprint(allData)

import json

with open('death.json', 'w') as fp:
    json.dump(allData, fp, indent=2)
