import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { ArrowUpDown, RefreshCw } from "lucide-react"

import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { type Voucher } from "@/types/Voucher"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useAuthToken } from "@/hooks/useAuthToken"
import { useMsal } from "@azure/msal-react"

const VoucherListArea = () => {
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'id', desc: true } // Ordina la colonna 'id' in ordine decrescente
    ]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [vouchers, setVouchers] = useState<Voucher[]>([]);

    useMsal();
    const { getAccessToken } = useAuthToken();
    const selectedFirewall = useSelector((state: RootState) => state.firewall.selectedFirewall);


    const API_URL = import.meta.env.VITE_API_GETVOUCHER_URL;

    const fetchVouchers = async () => {
        try {
            const token = await getAccessToken();
            setLoading(true);
            //console.log(token);
            if (!selectedFirewall) {
                setError("Please select firewall.");
                setVouchers([]);
                return;
            }else{
                setError("");
            }
            const response = await fetch(`${API_URL}?firewallName=${encodeURIComponent(selectedFirewall.FIREWALL)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                //console.log(data);
                setVouchers(data);
            } else {
                setError("Errore nella richiesta");
            }
        } catch (error) {
            setError("Errore nel recupero dei dati: "+error);
            setVouchers([]);
        } finally {
            setLoading(false);
        }
    };

    // Carica i dati iniziali quando il componente viene montato
    useEffect(() => {
        fetchVouchers();
    }, [selectedFirewall]);

    const columns: ColumnDef<Voucher>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
        },
        {
            accessorKey: "user-id",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        User ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        E-Mail
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "mobile-phone",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Phone
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "company",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Company
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "sponsor",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Sponsor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "expiration",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Expiration
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
    ];

    const table = useReactTable({
        data: vouchers,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div className="space-y-4">
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <span className="text-gray-500">Caricamento in corso...</span>
                </div>
            ) : error ? (
                <div className="flex flex-col justify-center items-center h-32 text-gray-700 font-semibold text-2xl">
                    <span className="text-4xl">😞</span>
                    <span className="p-2">{error}</span>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        {/*<div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Filter by name..."
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                                className="max-w-sm"
                            />
                        </div>*/}
                        <div className="flex items-center gap-2 ml-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={fetchVouchers} // Aggiungi il click per aggiornare
                                disabled={loading} // Disabilita il pulsante se i dati sono in fase di caricamento
                            >
                                {loading ? (
                                    <RefreshCw className="animate-spin h-5 w-5 text-black" />
                                ) : (
                                    <RefreshCw className="h-5 w-5 text-black" />
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                    {/* Aggiungi il campo di ricerca per ogni colonna */}
                                                    <div className="mt-2 mb-2">
                                                        <Input
                                                            placeholder={`Filter by ${header.column.id}...`}
                                                            value={header.column.getFilterValue() as string}
                                                            onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                            className="max-w-sm"
                                                        />
                                                    </div>
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-sm text-muted-foreground">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};


export default VoucherListArea;