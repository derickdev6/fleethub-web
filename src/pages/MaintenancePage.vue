<script setup lang="ts">
import { h, ref } from "vue";
// import { RouterLink } from "vue-router";
import services from "@/store/mock/services.json";
import { Wrench } from "lucide-vue-next";

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
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Service {
  id: number;
  type: string;
  description: string;
  vehiclePlate: string;
  date: string;
  price: number;
  address: string;
  status: string;
}

const mockServices = ref<Service[]>(services);
const selectedService = ref<Service | null>(null);

const selectService = (service: Service) => {
  selectedService.value =
    selectedService.value?.id === service.id ? null : service;
};

function getStatusIndicator(status: string) {
  const colorMap: Record<string, string> = {
    active: "bg-blue-500",
    completed: "bg-green-500",
    upcoming: "bg-yellow-500",
    cancelled: "bg-orange-500",
  };

  const dotClass = `w-2 h-2 rounded-full ${colorMap[status] ?? "bg-gray-400"}`;
  return h("div", { class: "flex items-center gap-2 ml-4" }, [
    h("span", { class: dotClass }),
  ]);
}

const columns = ref([
  // {
  //   accessorKey: "description",
  //   header: "Description",
  //   cell: (info: CellContext<Service, string>) => info.getValue(),
  // },
  {
    accessorKey: "vehiclePlate",
    header: "Vehicle Plate",
    cell: (info: CellContext<Service, string>) => info.getValue(),
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info: CellContext<Service, string>) => info.getValue(),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (info: CellContext<Service, string>) => info.getValue(),
    enableSorting: false,
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: (info: CellContext<Service, number>) => `$${info.getValue()}`,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: (info: CellContext<Service, string>) => info.getValue(),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info: CellContext<Service, string>) =>
      getStatusIndicator(info.getValue()),
    enableSorting: false,
  },
]);

const table = useVueTable({
  data: mockServices.value,
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
      <div class="flex items-center gap-4">
        <div class="border-2 border-black rounded-full p-2">
          <Wrench class="h-8 w-8" />
        </div>
        <div>
          <h1 class="text-2xl font-bold">Maintenence</h1>
          <p class="text-sm font-light text-gray-600">
            Manage your fleet services and maintenance
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <Button variant="secondary" class="cursor-pointer">
          <Download /> Export
        </Button>
        <Button variant="outline" class="cursor-pointer">
          <Plus /> New service
        </Button>
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
        <p class="text-lg font-semibold text-yellow-500">5</p>
        <span class="text-xs text-gray-500 font-light">Upcoming</span>
      </div>
      <div
        class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
      >
        <p class="text-lg font-semibold text-red-500">2</p>
        <span class="text-xs text-gray-500 font-light">Cancelled</span>
      </div>
    </div>

    <section class="flex flex-wrap gap-4 w-[90%] items-center">
      <div class="flex-grow">
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
                      selectedService?.id === row.original.id,
                  }"
                  @click="selectService(row.original)"
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
      </div>

      <div class="w-[30%]" v-if="selectedService">
        <Card
          class="w-full details-card min-w-[300px] max-h-100 max-w-80 sticky top-6"
          :class="[selectedService.status]"
        >
          <CardHeader>
            <div class="flex items-center justify-center mb-4">
              <div class="rounded-xl flex-grow">
                <CardTitle
                  >{{ selectedService.id }} -
                  {{ selectedService.vehiclePlate }}</CardTitle
                >
                <CardDescription
                  >Tipo: {{ selectedService.type }}</CardDescription
                >
              </div>
              <!-- <img
                :src="selectedService.image || '/images/scooter.png'"
                alt="Vehicle Image"
                class="w-24 h-24 mx-auto rounded-xl"
              /> -->
            </div>
          </CardHeader>

          <CardContent class="space-y-1 text-sm flex-grow flex flex-col">
            <p><strong>Estado:</strong> {{ selectedService.status }}</p>
            <p><strong>Fecha:</strong> {{ selectedService.date }}</p>
            <p><strong>Precio:</strong> {{ selectedService.price }}</p>
            <p>
              <strong>Descripcion:</strong> {{ selectedService.description }}
            </p>
          </CardContent>

          <!-- <CardFooter class="flex flex-wrap justify-center gap-2">
            <RouterLink
              :to="{
                name: 'vehicle-details',
                params: { plate: selectedService.plate_number },
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
          </CardFooter> -->
        </Card>
      </div>
    </section>
  </main>
</template>

<style scoped>
.details-card {
  box-shadow: 0 0 10px #22222266;
}
.details-card.completed {
  box-shadow: 0 0 10px #4caf5066;
}
.details-card.active {
  box-shadow: 0 0 10px #2196f366;
}
.details-card.upcoming {
  box-shadow: 0 0 10px #ff980066;
}
.details-card.cancelled {
  box-shadow: 0 0 10px #f4433666;
}
</style>
