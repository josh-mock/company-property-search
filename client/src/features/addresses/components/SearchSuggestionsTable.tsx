import { DataTable } from "@/components/ui/data-table";
import type { GetAddressesResponse } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";

export const SearchSuggestionsTable = ({
  addresses,
  setSelectedTitleNumber,
}: {
  addresses: GetAddressesResponse["addresses"];
  setSelectedTitleNumber: (titleNumber: string) => void;
}) => {
  const columns: ColumnDef<(typeof addresses)[number]>[] = [
    {
      accessorKey: "titleAddress",
      header: "Address",
      cell: ({ row }) => (
        <button
          className="text-left hover:underline hover:cursor-pointer"
          onClick={() => setSelectedTitleNumber(row.original.titleNumber)}
        >
          {row.original.titleAddress}
        </button>
      ),
    },
  ];

  return <DataTable columns={columns} data={addresses} noFilter noPagination />;
};
