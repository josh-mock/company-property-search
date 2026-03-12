import os
from polars import DataFrame
from pathlib import Path




def create_titles_df(df: DataFrame) -> DataFrame:
    return (
        df.select(["title_number", "title_address"])
        .unique("title_number")
        .with_row_index("title_id", 1)
    )


def create_companies_df(df: DataFrame) -> DataFrame:
    return (
        df.select(["company_name", "company_jurisdiction"])
        .unique()
        .with_row_index("company_id", 1)
    )


def create_titles_companies_df(df: DataFrame, titles: DataFrame, companies: DataFrame) -> DataFrame:
    return (
        titles.join(df, on="title_number")
        .join(companies, on="company_name")
        .select(["title_id", "company_id"])
    )


def split(df: DataFrame, output_path: Path) -> None:
    os.makedirs(output_path, exist_ok=True)

    titles = create_titles_df(df)
    companies = create_companies_df(df)
    titles_companies = create_titles_companies_df(df, titles, companies)

    titles.write_csv(output_path / "titles.csv")
    companies.write_csv(output_path / "companies.csv")
    titles_companies.write_csv(output_path / "titles_companies.csv")