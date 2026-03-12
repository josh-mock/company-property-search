import polars as pl
from polars import DataFrame
from consts import JURISDICTION_LOOKUP, COMPANY_TYPES_MAP


# Remove double spaces from the given columns
def remove_double_spaces(df: DataFrame, cols_to_clean: list[str]) -> DataFrame:
    return df.with_columns(
        [pl.col(cols_to_clean).str.strip_chars().str.replace(" ", " ")]
    )


# Normalize country type suffixes in the given colunn according to the mapping
def normalize_company_suffixes(df: DataFrame, column: str):
    for pattern, repl in COMPANY_TYPES_MAP.items():
        df = df.with_columns(pl.col(column).str.replace(pattern, repl))
    return df


# Remove . from a given column
def normalize_company_names(df: DataFrame, column: str) -> DataFrame:
    return df.with_columns(pl.col(column).str.replace_all(r"\.", ""))


# Standardize jurisdictions according to a lookup dictionary
def normalize_jurisdictions(df: DataFrame, column: str) -> DataFrame:
    return df.with_columns(
        pl.col(column)
        # Use the look up to standardise the value
        .replace(JURISDICTION_LOOKUP).alias(column)
    )


def clean(df: DataFrame) -> DataFrame:
    df = remove_double_spaces(
        df=df,
        cols_to_clean=[
            "title_number",
            "title_address",
            "company_name",
            "company_jurisdiction",
        ],
    )

    df = normalize_company_names(df=df, column="company_name")

    df = normalize_company_suffixes(df=df, column="company_name")

    df = normalize_jurisdictions(df=df, column="company_jurisdiction")

    return df
