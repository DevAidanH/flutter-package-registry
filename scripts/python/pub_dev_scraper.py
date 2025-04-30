import requests
from bs4 import BeautifulSoup
from datetime import datetime
import parsedatetime
from dateutil.relativedelta import relativedelta
import json


BASE_URL = "https://pub.dev"

# Settings
DOWNLOAD_THRESHOLD = 100_000  # Packages with more than 100000 downloads
MAX_PAGES = 100 
package_urls = []

def parse_downloads(download_text):
    """Convert text like '123k' or '2M' to integer."""
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
    """
    Is older than 12 months (since last update)
    """
    six_months_ago = datetime.now() - relativedelta(months=12)
    return date < six_months_ago

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
        return None

    soup = BeautifulSoup(response.text, 'html.parser')

    spans = soup.find(id="issues-repo-tab-count")
    if spans:
        issues = spans.get_text(strip=True)
    
    return issues

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
            package_urls.append({
                "name": name,
                "url": package_url,
                "issues": pull_github_issues(package_url) 
            })

    except Exception as e:
        print(f"Error parsing a package: {e}")

def scrape_pub():

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
            check_card(card)

def save_to_json(filename="./public/package_urls.json"):
    """Save the package_urls dictionary to a JSON file."""
    with open(filename, mode='w', encoding='utf-8') as json_file:
        json.dump(package_urls, json_file, indent=4, ensure_ascii=False)

# Main Script
scrape_pub()  # Fill global var with scraped packages

print(f"\nFound {len(package_urls)} package URLs.\nSaving to JSON file...")
save_to_json()
print("Saved to package_urls.csv successfully!")