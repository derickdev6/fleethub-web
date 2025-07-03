// RentsPage.vue
<script setup lang="ts">
import { h } from "vue";
import { MapPinPlus } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHeader,
  DataTableHeaderCell,
  DataTablePagination,
  DataTableRow,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-vue-next";
import { ref } from "vue";
import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  FlexRender,
  type ColumnDef,
  type CellContext,
} from "@tanstack/vue-table";
import rents from "@/store/mock/rents.json";

interface Rent {
  id: number;
  vehicle: string;
  plateNumber: string;
  clientName: string;
  startDate: string;
  endDate: string;
  type: string;
  paymentFrequency: string;
  payment: number;
  paymentBonus: number;
  totalPrice: number;
  status: string;
}

const mockRents = ref<Rent[]>(rents);

const columns: ColumnDef<Rent, any>[] = [
  {
    header: "ID",
    accessorKey: "id",
    enableSorting: false,
    size: 0, // pixels
    minSize: 60,
    maxSize: 100,
    cell: (info: CellContext<Rent, number>) =>
      h(
        RouterLink,
        {
          to: `/rents/${info.getValue()}`,
          class: "text-gray-800 font-bold py-2 pr-6",
        },
        { default: () => info.getValue().toString() }
      ),
  },
  {
    header: "Plate",
    accessorKey: "plateNumber",
    enableSorting: false,
    size: 100,
  },
  {
    header: "Customer",
    accessorKey: "clientName",
    enableSorting: false,
    size: 180,
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
    size: 140,
    sortingFn: (a, b, id) =>
      new Date(a.getValue(id)).getTime() - new Date(b.getValue(id)).getTime(),
    cell: (info: CellContext<Rent, string>) =>
      new Date(info.getValue()).toLocaleDateString(),
  },
  {
    header: "End Date",
    accessorKey: "endDate",
    size: 140,
    sortingFn: (a, b, id) =>
      new Date(a.getValue(id)).getTime() - new Date(b.getValue(id)).getTime(),
    cell: (info: CellContext<Rent, string>) =>
      new Date(info.getValue()).toLocaleDateString(),
  },
  {
    header: "Frequency",
    accessorKey: "paymentFrequency",
    size: 100,
  },
  {
    header: "Payment",
    accessorKey: "payment",
    size: 100,
    cell: (info: CellContext<Rent, number>) => `$${info.getValue()}`,
  },
  {
    header: "Bonus",
    accessorKey: "paymentBonus",
    size: 100,
    cell: (info: CellContext<Rent, number>) => `$${info.getValue()}`,
  },
  {
    header: "Total",
    accessorKey: "totalPrice",
    size: 100,
    cell: (info: CellContext<Rent, number>) => `$${info.getValue()}`,
  },
  {
    header: "Status",
    accessorKey: "status",
    size: 120,
    cell: (info: CellContext<Rent, string>) =>
      getStatusIndicator(info.getValue()),
  },
];

const table = useVueTable({
  data: mockRents.value,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  initialState: {
    pagination: { pageSize: 10 },
    columnSizing: {
      id: 0,
      plateNumber: 120,
      clientName: 180,
      startDate: 140,
      endDate: 140,
      paymentFrequency: 100,
      payment: 100,
      paymentBonus: 100,
      totalPrice: 100,
      status: 120,
    },
  },
  columnResizeMode: "onChange",
});

function getStatusIndicator(status: string) {
  const colorMap: Record<string, string> = {
    active: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    upcoming: "bg-yellow-500",
  };

  const dotClass = `w-2 h-2 rounded-full ${colorMap[status] ?? "bg-gray-400"}`;

  return h("div", { class: "flex items-center gap-2 ml-4" }, [
    h("span", { class: dotClass }),
  ]);
}
</script>

<template>
  <main class="flex flex-col items-center w-full">
    <div class="flex justify-between items-center w-[90%] mb-4">
      <div class="flex items-center gap-4">
        <div class="border-2 border-black rounded-full p-2">
          <MapPinPlus class="h-8 w-8" />
        </div>
        <div>
          <h1 class="text-2xl font-bold">Rents</h1>
          <p class="text-sm font-light text-gray-600">
            Manage rents and bookings
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <Button variant="secondary"><Download />Export</Button>
        <Button variant="outline"><Plus />New rent</Button>
      </div>
    </div>

    <div class="flex gap-4 flex-wrap self-start ml-[5%]">
      <div
        class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
      >
        <p class="text-lg font-semibold text-blue-500">3</p>
        <span class="text-xs text-gray-500 font-light">Active</span>
      </div>
      <div
        class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
      >
        <p class="text-lg font-semibold text-green-500">22</p>
        <span class="text-xs text-gray-500 font-light">Completed</span>
      </div>
      <div
        class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
      >
        <p class="text-lg font-semibold text-red-500">5</p>
        <span class="text-xs text-gray-500 font-light">Cancelled</span>
      </div>
    </div>

    <section class="w-[90%]">
      <DataTablePagination :table="table" class="mb-4" />
      <div class="overflow-y-scroll max-h-[90vh] shadow-lg rounded-xl">
        <DataTable>
          <DataTableHeader>
            <DataTableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
              class="sticky top-0 z-10 bg-white"
            >
              <DataTableHeaderCell
                v-for="header in headerGroup.headers"
                :style="{ width: `${header.getSize()}px` }"
                :key="header.id"
                :header="header"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </DataTableHeaderCell>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>
            <template v-if="table.getRowModel().rows.length">
              <DataTableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                class="hover:bg-[var(--cream)]"
              >
                <DataTableCell
                  v-for="cell in row.getVisibleCells()"
                  :style="{ width: `${cell.column.getSize()}px` }"
                  :key="cell.id"
                  class="whitespace-nowrap"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </DataTableCell>
              </DataTableRow>
            </template>
            <template v-else>
              <DataTableRow>
                <DataTableCell
                  class="text-center text-muted-foreground"
                  :colspan="table.getAllColumns().length"
                >
                  No results.
                </DataTableCell>
              </DataTableRow>
            </template>
          </DataTableBody>
        </DataTable>
      </div>
    </section>
  </main>
</template>
