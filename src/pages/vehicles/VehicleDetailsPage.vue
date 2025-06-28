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
import { ChevronLeft } from "lucide-vue-next";

const mockVehicle = {
  brand: "AKT",
  model: "NKD 125",
  plate_number: "AAA111",
  status: "rented",
  acquired_date: "2022-11-03",
  fuel_type: "gasoline",
  cylinder_capacity: 124,
  tire_size: "18-18",
  image: null,
};
const mockVehicleRents = [
  {
    id: 1,
    client: "John Doe",
    start_date: "2025-05-01",
    end_date: "2025-05-05",
    status: "completed",
    total_price: 265,
  },
  {
    id: 2,
    client: "Jane Smith",
    start_date: "2025-05-10",
    end_date: "2025-05-14",
    status: "completed",
    total_price: 300,
  },
  {
    id: 3,
    client: "Alice Johnson",
    start_date: "2025-05-20",
    end_date: "2025-05-24",
    status: "completed",
    total_price: 280,
  },
  {
    id: 4,
    client: "Bob Brown",
    start_date: "2025-05-28",
    end_date: "2025-06-01",
    status: "completed",
    total_price: 320,
  },
  {
    id: 5,
    client: "Charlie Green",
    start_date: "2025-06-03",
    end_date: "2025-06-07",
    status: "completed",
    total_price: 290,
  },
  {
    id: 6,
    client: "Diana White",
    start_date: "2025-06-10",
    end_date: "2025-06-14",
    status: "active",
    total_price: 310,
  },
];

const vehicleRents = ref(
  mockVehicleRents.sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  )
);

const mockMaintenanceRecords = [
  {
    id: 1,
    type: "periodic",
    date: "2024-09-15",
    description: "Oil change and tire rotation",
    address: "123 Main St, City, Country",
    cost: 50,
  },
  {
    id: 2,
    type: "repair",
    date: "2024-10-01",
    description: "Brake pad replacement",
    address: "456 Elm St, City, Country",
    cost: 75,
  },
  {
    id: 3,
    type: "repair",
    date: "2024-10-10",
    description: "Chain replacement",
    address: "789 Oak St, City, Country",
    cost: 100,
  },
  {
    id: 4,
    type: "periodic",
    date: "2024-10-20",
    description: "Tire pressure check and adjustment",
    address: "101 Pine St, City, Country",
    cost: 30,
  },
  {
    id: 5,
    type: "repair",
    date: "2024-10-25",
    description: "Clutch adjustment",
    address: "102 Maple St, City, Country",
    cost: 40,
  },
];
const maintenanceRecords = ref(
  mockMaintenanceRecords.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
);

const mockOtherEvents = [
  {
    id: 1,
    name: "accident",
    date: "2024-10-05",
    description: "Minor accident with no injuries",
  },
  {
    id: 2,
    name: "theft",
    date: "2024-10-15",
    description: "Vehicle stolen from parking lot",
  },
  {
    id: 3,
    name: "crash",
    date: "2024-10-20",
    description: "Vehicle crashed into a wall",
  },
];
const otherEvents = ref(
  mockOtherEvents.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
);

const vehicleRentsColumns = ref([
  {
    header: "Client",
    accessorKey: "client",
    enableSorting: false,
  },
  {
    header: "Start Date",
    accessorKey: "start_date",
    sortingFn: "datetime",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    header: "End Date",
    accessorKey: "end_date",
    sortingFn: "datetime",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    header: "Status",
    accessorKey: "status",
    enableSorting: false,
  },
  {
    header: "Total Price",
    accessorKey: "total_price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  },
]);

const vehicleMaintenanceColumns = ref([
  {
    header: "Type",
    accessorKey: "type",
    enableSorting: false,
  },
  {
    header: "Date",
    accessorKey: "date",
    sortingFn: "datetime",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    header: "Description",
    accessorKey: "description",
    enableSorting: false,
    maxSize: 100,
  },
  {
    header: "Address",
    accessorKey: "address",
    enableSorting: false,
  },
  {
    header: "Cost",
    accessorKey: "cost",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  },
]);

const vehicleOtherEventsColumns = ref([
  {
    header: "Name",
    accessorKey: "name",
    enableSorting: false,
  },
  {
    header: "Date",
    accessorKey: "date",
    sortingFn: "datetime",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    header: "Description",
    accessorKey: "description",
    enableSorting: false,
  },
]);

const rentsTable = useVueTable({
  data: vehicleRents.value,
  columns: vehicleRentsColumns.value,
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

const maintenanceTable = useVueTable({
  data: maintenanceRecords.value,
  columns: vehicleMaintenanceColumns.value,
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

const otherEventsTable = useVueTable({
  data: otherEvents.value,
  columns: vehicleOtherEventsColumns.value,
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
  <main class="flex flex-col items-center w-full py-12">
    <section class="flex flex-wrap gap-4 w-[90%]">
      <div
        class="w-[30%] flex flex-col min-w-[300px] max-h-100 max-w-80 xl:sticky xl:top-6 mb-10"
      >
        <RouterLink to="/vehicles" class="self-start">
          <ChevronLeft class="w-8 h-8" />
        </RouterLink>
        <div class="flex">
          <img
            v-if="mockVehicle.image == null"
            src="/images/scooter.png"
            alt="Default Vehicle Image"
            class="w-32 h-32 rounded-xl"
          />
          <img
            v-else
            :src="mockVehicle.image"
            alt="Vehicle Image"
            class="w-32 h-32 rounded-xl"
          />
          <div class="flex flex-col mt-6 ml-4">
            <h1>{{ mockVehicle.brand }} {{ mockVehicle.model }}</h1>
            <p>Placa: {{ mockVehicle.plate_number }}</p>
            <div>
              <div :class="['status-indicator', mockVehicle.status]"></div>
              {{ mockVehicle.status }}
            </div>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-sm font-light text-gray-600">
            Acquired Date: {{ mockVehicle.acquired_date }}
          </p>
          <p class="text-sm font-light text-gray-600">
            Fuel Type: {{ mockVehicle.fuel_type }}
          </p>
          <p class="text-sm font-light text-gray-600">
            Cylinder Capacity: {{ mockVehicle.cylinder_capacity }} cc
          </p>
          <p class="text-sm font-light text-gray-600">
            Tire Size: {{ mockVehicle.tire_size }}
          </p>
        </div>
        <div class="flex gap-4 mt-4 flex-wrap">
          <div
            class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
          >
            <p class="text-lg font-semibold">84%</p>
            <span class="text-xs text-gray-500 font-light">Utilization</span>
          </div>
          <div
            class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
          >
            <p class="text-lg font-semibold">10%</p>
            <span class="text-xs text-gray-500 font-light">Maintenance</span>
          </div>
          <div
            class="flex flex-col justify-center items-center p-2 border rounded-lg bg-white flex-1"
          >
            <p class="text-lg font-semibold">6%</p>
            <span class="text-xs text-gray-500 font-light">Downtime</span>
          </div>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mt-8">
          <Button variant="outline" class="w-[48%]">Update</Button>
          <Button variant="outline" class="w-[48%]">Rent</Button>
          <Button variant="outline" class="w-[48%]">Maintenence</Button>
          <Button variant="outline" class="w-[48%]">Event</Button>
        </div>
      </div>
      <div class="flex flex-grow flex-col min-w-[300px]">
        <h2 class="text-lg font-semibold my-4">Vehicle Rents</h2>
        <DataTable>
          <DataTableHeader>
            <DataTableRow
              v-for="headerGroup in rentsTable.getHeaderGroups()"
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
            <template v-if="rentsTable.getRowModel().rows.length">
              <DataTableRow
                v-for="row in rentsTable.getRowModel().rows"
                :key="row.id"
                class="hover:bg-muted cursor-pointer"
              >
                <DataTableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  class="whitespace-nowrap max-w-[200px] truncate"
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
        <h2 class="text-lg font-semibold my-4">Maintenance Records</h2>
        <DataTable>
          <DataTableHeader>
            <DataTableRow
              v-for="headerGroup in maintenanceTable.getHeaderGroups()"
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
            <template v-if="maintenanceTable.getRowModel().rows.length">
              <DataTableRow
                v-for="row in maintenanceTable.getRowModel().rows"
                :key="row.id"
                class="hover:bg-muted cursor-pointer"
              >
                <DataTableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  class="whitespace-nowrap max-w-[200px] truncate"
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
        <h2 class="text-lg font-semibold my-4">Other Events</h2>
        <DataTable>
          <DataTableHeader>
            <DataTableRow
              v-for="headerGroup in otherEventsTable.getHeaderGroups()"
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
            <template v-if="otherEventsTable.getRowModel().rows.length">
              <DataTableRow
                v-for="row in otherEventsTable.getRowModel().rows"
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
<style scoped>
.status-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
}
.status-indicator.available {
  background-color: #4caf50; /* Green */
  box-shadow: 0 0 5px 1px #4caf5066; /* Green */
}
.status-indicator.rented {
  background-color: #2196f3; /* Blue */
  box-shadow: 0 0 5px 1px #2196f388; /* Blue */
}
.status-indicator.maintenance {
  background-color: #ff9800; /* Orange */
  box-shadow: 0 0 5px 1px #ff980066; /* Orange */
}
.status-indicator.unavailable {
  background-color: #f44336; /* Red */
  box-shadow: 0 0 5px 1px #f4433666; /* Red */
}
</style>
