from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time


def scrape_for_postings(keywords):

    # First identify the program
    program = keywords[program]
    driver = webdriver.Chrome(
        r'C:\Users\Steven\Downloads\chromedriver_win32 (1)\chromedriver.exe')
    waterloo_works_url = "https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm"
    driver.implicitly_wait(10)
    driver.get(waterloo_works_url)
    posting_table = driver.find_element_by_id('postingsTable')
    postings = posting_table.find_elements_by_tag_name('tr')

    for job in postings:
        link = job.find_element_by_tag_name('a')
        link.send_keys(Keys.ENTER)
        link.send_keys(Keys.)
