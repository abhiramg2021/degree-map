import requests
from bs4 import BeautifulSoup
from html.parser import HTMLParser

def read(crn):
    semester = 202108
    URL = "https://oscar.gatech.edu/pls/bprod/bwckschd.p_disp_detail_sched?term_in=%s&crn_in=%s" % (
        semester, crn)
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, features="html.parser")

    table = soup.find_all("table", class_ = "datadisplaytable")[0].text
    req_index = table.index("Prerequisites") + len("Prerequisites") + 1
    reqs = table[req_index:].strip()
    reqs = reqs.split("\n")
 
    print(reqs)



if (__name__ == "__main__"):
    read(83165)