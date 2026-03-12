import { DataTable } from "@/components/ui/data-table";
import type { GetCompaniesResponse } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";

export const SearchSuggestionsTable = ({
  companies,
  setSelectedCompanyId,
}: {
  companies: GetCompaniesResponse["companies"];
  setSelectedCompanyId: (companyId: number) => void;
}) => {
  const columns: ColumnDef<(typeof companies)[number]>[] = [
    {
      accessorKey: "companyName",
      header: "Name",
      cell: ({ row }) => (
        <button
          className="text-left hover:underline hover:cursor-pointer"
          onClick={() => setSelectedCompanyId(row.original.companyId)}
        >
          {row.original.companyName}
        </button>
      ),
    },
    { accessorKey: "companyJurisdiction", header: "Jurisdiction" },
  ];

  return <DataTable columns={columns} data={companies} noFilter noPagination />;
};
