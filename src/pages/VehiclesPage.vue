<script setup lang="ts">
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import vehicles from "@/store/mock/vehicles.json";

import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  FlexRender,
  type CellContext,
} from "@tanstack/vue-table";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Vehicle {
  brand: string;
  model: string;
  plate_number: string;
  status: string;
  image?: string | null;
  acquired_date: string;
  fuel_type: string;
  cylinder_capacity: number;
  tire_size: string;
}

const mockVehicles = ref<Vehicle[]>(vehicles);
const selectedVehicle = ref<Vehicle | null>(mockVehicles.value[0] ?? null);

const selectVehicle = (vehicle: Vehicle) => {
  selectedVehicle.value =
    selectedVehicle.value?.plate_number === vehicle.plate_number
      ? null
      : vehicle;
};

function getStatusIndicator(status: string) {
  const colorMap: Record<string, string> = {
    rented: "bg-blue-500",
    available: "bg-green-500",
    maintenence: "bg-orange-500",
  };

  const dotClass = `w-2 h-2 rounded-full ${colorMap[status] ?? "bg-gray-400"}`;
  return h("div", { class: "flex items-center gap-2 ml-4" }, [
    h("span", { class: dotClass }),
  ]);
}

const columns = ref([
  { header: "Brand", accessorKey: "brand" },
  { header: "Model", accessorKey: "model" },
  {
    header: "Plate Number",
    accessorKey: "plate_number",
    enableSorting: false,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info: CellContext<Vehicle, any>) =>
      getStatusIndicator(info.getValue()),
    enableSorting: false,
  },
]);

const table = useVueTable({
  data: mockVehicles.value,
  columns: columns.value,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  initialState: { pagination: { pageSize: 10 } },
});
</script>

<template>
  <main class="flex flex-col items-center w-full">
    <div class="flex justify-between items-center w-[90%] mb-4">
      <div>
        <h1 class="text-2xl font-bold">Vehicles</h1>
        <p class="text-sm font-light text-gray-600">
          Manage your vehicle fleet
        </p>
      </div>
      <div class="flex gap-2">
        <Button variant="secondary" class="cursor-pointer">
          <Download /> Export
        </Button>
        <Button variant="outline" class="cursor-pointer">
          <Plus /> New vehicle
        </Button>
      </div>
    </div>

    <div class="flex gap-4 flex-wrap self-start ml-[5%]">
      <div
        class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
      >
        <p class="text-lg font-semibold text-blue-500">3</p>
        <span class="text-xs text-gray-500 font-light">Rented</span>
      </div>
      <div
        class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
      >
        <p class="text-lg font-semibold text-green-500">5</p>
        <span class="text-xs text-gray-500 font-light">Available</span>
      </div>
      <div
        class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
      >
        <p class="text-lg font-semibold text-orange-500">2</p>
        <span class="text-xs text-gray-500 font-light">Maintenence</span>
      </div>
    </div>

    <section class="flex flex-wrap gap-4 w-[90%]">
      <div class="flex-grow">
        <DataTablePagination :table="table" class="mb-4" />
        <DataTable>
          <DataTableHeader>
            <DataTableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
              class="sticky top-0 z-10 bg-white"
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
                class="hover:bg-[var(--cream)]"
                :class="{
                  'active-background':
                    selectedVehicle?.plate_number === row.original.plate_number,
                }"
                @click="selectVehicle(row.original)"
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

      <div class="w-[30%]" v-if="selectedVehicle">
        <Card
          class="w-full details-card min-w-[300px] max-h-100 max-w-80 sticky top-6"
          :class="[selectedVehicle.status]"
        >
          <CardHeader>
            <div class="flex items-center justify-center mb-4">
              <div class="rounded-xl flex-grow">
                <CardTitle
                  >{{ selectedVehicle.brand }}
                  {{ selectedVehicle.model }}</CardTitle
                >
                <CardDescription
                  >Placa: {{ selectedVehicle.plate_number }}</CardDescription
                >
              </div>
              <img
                :src="selectedVehicle.image || '/images/scooter.png'"
                alt="Vehicle Image"
                class="w-24 h-24 mx-auto rounded-xl"
              />
            </div>
          </CardHeader>

          <CardContent class="space-y-1 text-sm flex-grow flex flex-col">
            <p><strong>Estado:</strong> {{ selectedVehicle.status }}</p>
            <p>
              <strong>Adquirido:</strong> {{ selectedVehicle.acquired_date }}
            </p>
            <p><strong>Combustible:</strong> {{ selectedVehicle.fuel_type }}</p>
            <p>
              <strong>Cilindraje:</strong>
              {{ selectedVehicle.cylinder_capacity }} cc
            </p>
            <p><strong>Llantas:</strong> {{ selectedVehicle.tire_size }}</p>
          </CardContent>

          <CardFooter class="flex flex-wrap justify-center gap-2">
            <RouterLink
              :to="{
                name: 'vehicle-details',
                params: { plate: selectedVehicle.plate_number },
              }"
              class="w-[48%]"
            >
              <Button variant="outline" class="w-full cursor-pointer"
                >Details</Button
              >
            </RouterLink>
            <Button variant="outline" class="w-[48%]">Rent</Button>
            <Button variant="outline" class="w-[48%]">Maintenance</Button>
            <Button variant="outline" class="w-[48%]">Event</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  </main>
</template>

<style scoped>
.details-card {
  box-shadow: 0 0 10px #22222266;
}
.details-card.available {
  box-shadow: 0 0 10px #4caf5066;
}
.details-card.rented {
  box-shadow: 0 0 10px #2196f366;
}
.details-card.maintenance {
  box-shadow: 0 0 10px #ff980066;
}
</style>
