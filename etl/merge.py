import polars as pl
from polars import DataFrame
from pathlib import Path
from consts import CCOD_COLUMNS, OCOD_COLUMNS
import os


def load_ccod(temp_path: Path) -> DataFrame:
    ccod = pl.read_csv(os.path.join(temp_path, "ccod.csv"), columns=CCOD_COLUMNS)

    # Add country incorporated column to CCOD
    ccod_with_countries = ccod.with_columns(
        [
            pl.lit("UNITED KINGDOM").alias(f"Country Incorporated ({i})")
            for i in range(1, 5)
        ]
    )

    # Reorder the columns to match OCOD
    return ccod_with_countries.select(OCOD_COLUMNS)


# company dictionaries used in company column
company_structs = [
    pl.struct(
        [
            pl.col(f"Proprietor Name ({i})").alias("company_name"),
            pl.col(f"Country Incorporated ({i})").alias("company_jurisdiction"),
        ]
    )
    for i in range(1, 5)
]


# Filter rows where company_name is empty
def remove_empty_rows(df: DataFrame) -> DataFrame:
    return df.filter(
        pl.col("company_name").is_not_null() & (pl.col("company_name") != "")
    )


# Remove original columns and keep exploded/unnested
def select_columns(df: DataFrame) -> DataFrame:
    return df.select(
        [
            pl.col("Title Number").alias("title_number"),
            pl.col("Property Address").alias("title_address"),
            pl.col("company_name"),
            pl.col("company_jurisdiction"),
        ]
    )


def merge(temp_path: Path) -> DataFrame:
    # Load OCOD into df
    ocod_df = pl.read_csv(os.path.join(temp_path, "ocod.csv"), columns=OCOD_COLUMNS)

    # Load CCOD
    ccod_df = load_ccod(temp_path=temp_path)

    # combine the datasets
    df = pl.concat([ocod_df, ccod_df])

    # combine proprietors into a list of dictionaries
    df = df.with_columns(pl.concat_list(company_structs).alias("companies"))

    # Explode the list into rows.
    # Explode creates a row per company
    # Unnest separates company_name from jurisdiction
    df = df.explode("companies").unnest("companies")

    # Filter rows where company_name is empty
    df = remove_empty_rows(df)

    # Remove original columns and keep exploded/unnested
    df = select_columns(df)

    return df
