import json
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


# Download
LAND_REG_API_KEY = os.getenv("LAND_REG_API_KEY")
LAND_REG_BASE_URI = "https://use-land-property-data.service.gov.uk/api/v1"
LAND_REG_HEADERS = {
    "Authorization": LAND_REG_API_KEY,
    "Accept": "application/json",
}
DOWNLOAD_CHUNK_SIZE = 10 * 1024
DATASETS = ["ccod", "ocod"]


# Merge
OCOD_COLUMNS = [
    "Title Number",
    "Property Address",
    "Proprietor Name (1)",
    "Country Incorporated (1)",
    "Proprietor Name (2)",
    "Country Incorporated (2)",
    "Proprietor Name (3)",
    "Country Incorporated (3)",
    "Proprietor Name (4)",
    "Country Incorporated (4)",
]
CCOD_COLUMNS = [
    "Title Number",
    "Property Address",
    "Proprietor Name (1)",
    "Proprietor Name (2)",
    "Proprietor Name (3)",
    "Proprietor Name (4)",
]


# Clean
_JURISDICTIONS_FILE = Path(__file__).parent / "data" / "jurisdictions.json"
with open(_JURISDICTIONS_FILE, encoding="utf-8") as f:
    _JURISDICTIONS = json.load(f)

JURISDICTION_LOOKUP = {
    term: entry["official_term"]
    for entry in _JURISDICTIONS.get("jurisdictions", [])
    for term in [entry["official_term"]] + entry.get("variations", [])
}

COMPANY_TYPES_MAP = {
    r"\bLIMITED$": "LTD",
    r"\bINCORPORATED$": "INC",
    r"\bAKTIENGESELLSCHAFT$": "AG",
    r"\bLIMITED LIABILITY COMPANY$": "LLC",
    r"\bPUBLIC LIMITED COMPANY$": "PLC",
    r"\bLIMITED PARTNERSHIP$": "LP",
    r"\bCOMMUNITY INTEREST COMPANY$": "CIC",
    r"\bSENDIRIAN BERHAD$": "SDN BHD",
    r"\bBERHAD$": "BHD",
    r"\bSOCIEDAD ANONIMA$": "SA",
    r"\bSOCIETE ANONYME$": "SA",
    r"\bLIMITADA$": "LDA",
}


# Split
CSV_WRITE_CHUNK_SIZE = 100_000