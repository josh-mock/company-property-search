import { Search } from "@/components/Search";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "../Layout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
