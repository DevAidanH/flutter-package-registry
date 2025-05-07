# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

#Firebase Imports
import firebase_functions
from firebase_admin import initialize_app
import functions_framework
from google.cloud import firestore

#Scraper Imports
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import parsedatetime
from dateutil.relativedelta import relativedelta
import time

initialize_app()

#Settings
BASE_URL = "https://pub.dev"
DOWNLOAD_THRESHOLD = 100_000 
MAX_PAGES = 100

#Utility Functions
def parse_downloads(download_text):
    #Convert text like '123k' or '2M' to integer.
    if 'M' in download_text:
        return int(float(download_text.replace('M', '')) * 1_000_000)
    elif 'k' in download_text:
        return int(float(download_text.replace('k', '')) * 1_000)
    else:
        return int(download_text.replace(',', ''))

def parse_date(date_text):
    cal = parsedatetime.Calendar()
    time_struct, _ = cal.parse(date_text)
    result_time = datetime(*time_struct[:6])
    return result_time

def is_old(date):
    #Is older than 12 months (since last update)
    six_months_ago = datetime.now() - relativedelta(months=12)
    return date < six_months_ago

#Find and pull GitHub Data
def pull_github_link(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching the page: {e}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')

    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        parent = a_tag.find_parent()
        if href.startswith("https://github.com/") and parent and 'Repository' in parent.get_text():
            return href

    print("GitHub repository link not found.")
    return None

def pull_github_issues(url):
    issues = "0"
    try:
        response = requests.get(pull_github_link(url))
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching the page: {e}")
        return issues

    soup = BeautifulSoup(response.text, 'html.parser')

    spans = soup.find(id="issues-repo-tab-count")
    if spans:
        issues = spans.get_text(strip=True)
    
    return issues

#Check each card pulled and add to Firestore if conditions met
def check_card(card):
    try:
        name = card.select_one(".packages-title > a").text.strip()
        package_url = BASE_URL + card.select_one(".packages-title > a")["href"]

        stats = card.select(".packages-score-value-number")
        downloads_text = stats[2].text.strip()
        downloads = parse_downloads(downloads_text)

        lastupdate = card.select(".-x-ago")
        date = parse_date("".join(lastupdate[0]))

        if downloads > DOWNLOAD_THRESHOLD and is_old(date):
            issues = pull_github_issues(package_url)
            return {
                "name": name,
                "url": package_url,
                "issues": issues,
                "last_scraped": datetime.now().isoformat()
            }

    except Exception as e:
        print(f"Error parsing a package: {e}")

#Scraper
def scrape_pub():
    package_list = []
    for page in range(1, MAX_PAGES + 1):
        url = f"{BASE_URL}/packages?sort=downloads&page={page}"
        print(f"Scraping {url}...")
        resp = requests.get(url)
        if resp.status_code != 200:
            print(f"Failed to fetch {url}")
            continue

        soup = BeautifulSoup(resp.text, "html.parser")
        package_cards = soup.select(".packages-item")

        for card in package_cards:
            data = check_card(card)
            if data:
                package_list.append(data)

        time.sleep(1)
    return package_list

@functions_framework.http
def run_pub_scraper(request):
    db = firestore.Client()
    packages = scrape_pub()

    for package in packages:
        doc_ref = db.collection("packages").document(package["name"])
        doc_ref.set(package)
    
    return f"Saved {len(packages)} packages to Firestore", 200
