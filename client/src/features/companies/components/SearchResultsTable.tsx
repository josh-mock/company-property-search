import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { GetCompanyTitlesResponse } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const SearchResultsTable = ({
  titles,
}: {
  titles: GetCompanyTitlesResponse["titles"];
}) => {
  const noPagination = titles.length <= 10;

  const columns: ColumnDef<(typeof titles)[number]>[] = [
    {
      accessorKey: "titleNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    { accessorKey: "titleAddress", header: "Address" },
  ];

  return (
    <DataTable columns={columns} data={titles} noPagination={noPagination} />
  );
};
