
# coding: utf-8

import time  # at the top of the page, import the time module
from requests_html import HTMLSession  #import the library
import json

# create a new session
session = HTMLSession()

# open a website
r = session.get("https://www.tdcj.texas.gov/death_row/dr_executed_offenders.html")

web_url = "https://www.tdcj.texas.gov/death_row/"

first_web_table_cell = r.html.find("td")

statement_error_dict = []
offender_error_dict = []
allData = []
object_dict = {}
info_dict = {}
for cell in first_web_table_cell:

    if first_web_table_cell.index(cell) % 10 == 0:  # Execution_Number
        object_dict['Execution_Number'] = cell.text
        print(cell.text)

    elif first_web_table_cell.index(cell) % 10 == 1: # Offender Information
        offender_url = web_url + cell.find("a", first = True).attrs['href']
        session = HTMLSession()
        offender_web = session.get(offender_url)
        try:
            for i in range(2, 9):
                if i < 8:
                    cell_dict = offender_web.html.xpath('//table/tr[' + str(i) + ']/td')
                    info_dict[cell_dict[0].text] = cell_dict[1].text
                    #print(offender_web.html.xpath('//table/tr[' + str(i)+ ']/td')[1].text)
                else:
                    cell_dict = offender_web.html.xpath('//table/tr[' + str(i) + ']/td')
                    info_dict[cell_dict[1].text] = cell_dict[2].text
                    #print(offender_web.html.xpath('//table/tr[' + str(i)+ ']/td')[2].text)
        except:
            offender_error_dict.append(object_dict['Execution_Number'])
        #print(offender_url)

    elif first_web_table_cell.index(cell) % 10 == 2: # Last Statement
        statement_url = web_url + cell.find("a", first = True).attrs['href']
        session = HTMLSession()
        statement_web = session.get(statement_url)
        try:
            object_dict[statement_web.html.find('p')[4].text] = statement_web.html.find('p')[5].text
        except:
            statement_error_dict.append(object_dict['Execution_Number'])
        #print(statement_url)

    elif first_web_table_cell.index(cell) % 10 == 5:  # TDCJ Number
        info_dict['TDCJ_Number'] = cell.text
        #print(cell.text)

    elif first_web_table_cell.index(cell) % 10 == 6:  # Age
        info_dict['Age'] = cell.text
        #print(cell.text)

    elif first_web_table_cell.index(cell) % 10 == 7:  # Date Executed
        info_dict['Date_Executed'] = cell.text
        #print(cell.text)


    elif first_web_table_cell.index(cell) % 10 == 8:   #這欄位沒有要用到，此區塊做reset
        object_dict['info'] = info_dict
        allData.append(object_dict)  #每一次跑完10個td(也就是一列)，就加一筆資料
        object_dict = {}
        info_dict = {}

#print(error_dict)
#print(allData)
allData.append(offender_error_dict)
allData.append(statement_error_dict)

with open('last-words.json', 'w') as fp:
    json.dump(allData, fp, indent=2)
