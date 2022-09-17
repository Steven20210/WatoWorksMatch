from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time


def scrape_for_postings(resume):

    program = resume['program']
    keywords = resume['skills']

    driver = webdriver.Chrome(
        r'C:\Users\Steven\Downloads\chromedriver_win32 (1)\chromedriver.exe')
    waterloo_works_url = "https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm"
    driver.implicitly_wait(10)
    driver.get(waterloo_works_url)
    posting_table = driver.find_element_by_id('postingsTable')
    postings = posting_table.find_elements_by_tag_name('tr')

    job_rank_arr = []

    for job in postings:
        link = job.find_element_by_tag_name('a')
        link.send_keys(Keys.ENTER)
        posting = link.send_keys(Keys.COMMAND + Keys.TAB)
        description = posting.find_element_by_class_name(
            'np-view-question--31')

        job_title = posting.find_element_by_class_name(
            'h3 dashboard-header__profile-information-name mobile--small-font color--font--white margin--b--s').getText()

        matches = 0
        for keyword in keywords:
            if keyword in description:
                matches += 1

        job_keyword_match = {job_title: matches}
        job_rank_arr.append(job_keyword_match)

    return job_rank_arr


job_rank_arr = scrape_for_postings(sys.argv[1])
