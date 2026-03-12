-- RESET
DROP TABLE IF EXISTS titles;

DROP TABLE IF EXISTS companies;

DROP TABLE IF EXISTS titles_companies;

-- SCHEMA
CREATE TABLE
    IF NOT EXISTS titles (
        title_id INTEGER PRIMARY KEY,
        title_number TEXT NOT NULL,
        title_address TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS companies (
        company_id INTEGER PRIMARY KEY,
        company_name TEXT NOT NULL,
        company_jurisdiction TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS titles_companies (
        title_id INTEGER NOT NULL,
        company_id INTEGER NOT NULL,
        FOREIGN KEY (title_id) REFERENCES titles (title_id),
        FOREIGN KEY (company_id) REFERENCES companies (company_id)
    );

-- INDEXES
CREATE INDEX idx_titles_title_number ON titles (title_number);

CREATE INDEX idx_companies_company_name ON companies (company_name);

CREATE INDEX idx_titles_companies_company_id ON titles_companies (company_id);

CREATE INDEX idx_titles_companies_title_id ON titles_companies (title_id);