<script setup lang="ts">
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
import rents from "@/store/mock/rents.json";
import { ref } from "vue";
import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  FlexRender,
} from "@tanstack/vue-table";

const mockRents = ref(rents);
const columns = ref([
  { header: () => "Vehicle", accessorKey: "vehicle", enableSorting: false },
  {
    header: () => "Vehicle ID",
    accessorKey: "vehicleId",
    enableSorting: false,
  },
  { header: "Customer", accessorKey: "clientName", enableSorting: false },
  {
    header: () => "Start Date",
    accessorKey: "startDate",
    sortingFn: "datetime",
  },
  { header: () => "End Date", accessorKey: "endDate", sortingFn: "datetime" },
  { header: "Type", accessorKey: "type", enableSorting: false },
  {
    header: "Frequency",
    accessorKey: "paymentFrequency",
    enableSorting: false,
  },
  { header: "Payment", accessorKey: "payment" },
  { header: "Bonus", accessorKey: "paymentBonus" },
  { header: "Total", accessorKey: "totalPrice" },
  { header: "Status", accessorKey: "status", enableSorting: false },
]);

const table = useVueTable({
  data: mockRents.value,
  columns: columns.value,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  initialState: {
    pagination: {
      pageSize: 10,
    },
  },
});
</script>

<template>
  <main class="flex flex-col items-center w-full">
    <div class="flex justify-between items-center w-[90%]">
      <div class="">
        <h1 class="text-2xl font-bold">Rents</h1>
        <p class="text-md font-light text-gray-600">
          Manage rents and bookings
        </p>
      </div>

      <div class="flex gap-2">
        <Button variant="secondary" class="cursor-pointer"
          ><Download></Download>Export</Button
        >
        <Button variant="outline" class="cursor-pointer"
          ><Plus></Plus> New rent</Button
        >
      </div>
    </div>
    <div class="flex gap-4 mt-4 flex-wrap self-start ml-[5%]">
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
    <section class="flex flex-wrap gap-4 w-[90%]">
      <div class="flex-grow">
        <DataTablePagination :table="table" class="mt-4" />

        <DataTable>
          <DataTableHeader>
            <DataTableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <DataTableHeaderCell
                v-for="header in headerGroup.headers"
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
                class="hover:bg-muted cursor-pointer"
              >
                <DataTableCell
                  v-for="cell in row.getVisibleCells()"
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
                  :colspan="columns.length"
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
