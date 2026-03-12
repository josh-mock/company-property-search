from download import download
from merge import merge
from clean import clean
from split import split
from tempfile import TemporaryDirectory
from pathlib import Path
import argparse


def main(output_path: Path):
    with TemporaryDirectory() as d:
        temp_path = Path(d)
        print("Downloading files...")
        download(temp_path=temp_path)
        print("Merging files...")
        df = merge(temp_path=temp_path)
        print("Cleaning...")
        df = clean(df=df)
        print("Splitting into tables...")
        split(df=df, output_path=output_path)


parser = argparse.ArgumentParser()
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()
main(output_path=args.output)