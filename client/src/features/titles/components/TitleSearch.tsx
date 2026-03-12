import { AxiosError } from "axios";
import { useState } from "react";
import { useGetTitleOwners } from "../hooks/useGetTitleOwners";
import { SearchBar } from "./SearchBar";
import { SearchResult } from "./SearchResult";

export const TitleSearch = () => {
  const [titleNumber, setTitleNumber] = useState<string>("");

  const { data, isLoading, error } = useGetTitleOwners(titleNumber);

  const reset = () => {
    setTitleNumber("");
  };

  const isNotFound = (error as AxiosError)?.response?.status === 404;

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-bold text-3xl">Title Search</h1>

      <SearchBar onSearch={setTitleNumber} reset={reset} />

      {titleNumber && isLoading && null}

      {titleNumber && data && <SearchResult result={data} />}

      {titleNumber && isNotFound && <p>No result</p>}
    </div>
  );
};
