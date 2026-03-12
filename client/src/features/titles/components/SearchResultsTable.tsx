import { DataTable } from "@/components/ui/data-table";
import type { GetTitleCompaniesResponse } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";

export const SearchResultsTable = ({
  companies,
}: {
  companies: GetTitleCompaniesResponse["companies"];
}) => {
  const columns: ColumnDef<(typeof companies)[number]>[] = [
    {
      accessorKey: "companyName",
      header: "Company",
    },
    { accessorKey: "companyJurisdiction", header: "Address" },
  ];

  return <DataTable columns={columns} data={companies} noPagination noFilter />;
};
