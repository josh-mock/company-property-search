from consts import LAND_REG_HEADERS, LAND_REG_BASE_URI, DATASETS, DOWNLOAD_CHUNK_SIZE
import requests
import zipfile
import os
from pathlib import Path


# Return the path of the most recently published datasets
def get_file_path(dataset: str) -> str:

    # Build the url using base URI and the name of the dataset
    url = f"{LAND_REG_BASE_URI}/datasets/{dataset}"

    # Send request to server
    response = requests.get(url, headers=LAND_REG_HEADERS)
    result = response.json()
    
    # Return the file path according to the api documentation
    return result["result"]["resources"][1]["file_name"]


# Download the dataset
def download_datasets(file_path: str, dataset: str, zip_path: str) -> None:
    # Url to download the zip file
    url = f"{LAND_REG_BASE_URI}/datasets/{dataset}/{file_path}"

    # Send request to the server to get download link
    response = requests.get(url, headers=LAND_REG_HEADERS)
    data = response.json()

    # Get download url from response
    download_url = data["result"]["download_url"]

    # Download file
    response = requests.get(download_url, stream=True)

    # Write file to folder in chunks
    with open(zip_path, mode="wb") as file:
        for chunk in response.iter_content(chunk_size=DOWNLOAD_CHUNK_SIZE):
            file.write(chunk)


# Extract csv file
def extract_csv(downloaded_file_path: str, temp_file: Path) -> None:
    with zipfile.ZipFile(downloaded_file_path, "r") as zip_ref:
        zip_ref.extractall(path=temp_file)


def download(temp_path: Path) -> None:
    for dataset in DATASETS:
        # File to download from the server
        target_file_path = get_file_path(dataset=dataset)

        # What to call the zip folder when it is downloaded
        zip_path = os.path.join(temp_path, f"{dataset}.zip")

        # File name of the file that is extracted from the zip
        # Remove .zip
        base_name = os.path.splitext(target_file_path)[0]
        csv_file_path = os.path.join(temp_path, f"{base_name}.csv")

        # Name of the csv file after it has been renamed
        renamed_csv_path = os.path.join(temp_path, f"{dataset}.csv")

        # Download the zip folder from the server
        download_datasets(
            file_path=target_file_path, dataset=dataset, zip_path=zip_path
        )

        # Extract the csv from the zip folder
        extract_csv(downloaded_file_path=zip_path, temp_file=temp_path)

        # Rename the csv file
        os.rename(csv_file_path, renamed_csv_path)
