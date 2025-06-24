<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { ChevronLeft } from "lucide-vue-next";

const route = useRoute();

const mockVehicle = {
  brand: "AKT",
  model: "NKD 125",
  plate_number: "AAA111",
  status: "rented",
  acquired_date: "2022-11-03",
  fuel_type: "gasoline",
  cylinder_capacity: 124,
  tire_size: "18-18",
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
onMounted(() => {
  const plate = route.params.plate as string;
});
</script>

<template>
  <main class="flex flex-col items-center justify-center w-full py-12">
    <RouterLink to="/vehicles" class="self-start ml-[5%]">
      <ChevronLeft class="w-8 h-8" />
    </RouterLink>
    <section class="flex flex-wrap gap-4 w-[90%]">
      <div class="w-[30%] flex flex-col min-w-[300px] overflow-hidden">
        <div class="flex">
          <img
            v-if="mockVehicle.image == null"
            src="/public/images/scooter.png"
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
        <h2 class="text-lg font-semibold mb-4">Vehicle Rents</h2>
        <Table class="overflow-x-hidden mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="rent in vehicleRents"
              :key="rent.id"
              :class="{ 'active-rent-background': rent.status === 'active' }"
            >
              <TableCell>{{ rent.client }}</TableCell>
              <TableCell>{{ rent.start_date }}</TableCell>
              <TableCell>{{ rent.end_date }}</TableCell>
              <TableCell>{{ rent.status }}</TableCell>
              <TableCell class="text-right">${{ rent.total_price }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h2 class="text-lg font-semibold mb-4">Maintenance Records</h2>
        <Table class="overflow-x-hidden mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Address</TableHead>
              <TableHead class="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="record in maintenanceRecords" :key="record.id">
              <TableCell>{{ record.type }}</TableCell>
              <TableCell>{{ record.date }}</TableCell>
              <TableCell>{{ record.description }}</TableCell>
              <TableCell>{{ record.address }}</TableCell>
              <TableCell class="text-right">${{ record.cost }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h2 class="text-lg font-semibold mb-4">Other Events</h2>
        <Table class="overflow-x-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="event in otherEvents" :key="event.id">
              <TableCell>{{ event.name }}</TableCell>
              <TableCell>{{ event.date }}</TableCell>
              <TableCell>{{ event.description }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
