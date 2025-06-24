<script setup lang="ts">
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ref } from "vue";
import { RouterLink } from "vue-router";

const mockVehicles = [
  {
    brand: "Yamaha",
    model: "Bwis",
    plate_number: "AAA111",
    status: "available",
    acquired_date: "2025-06-18",
    fuel_type: "gasoline",
    cylinder_capacity: 155,
    tire_size: "15-15",
    image: "https://picsum.photos/id/200/800",
  },
  {
    brand: "Honda",
    model: "XR150",
    plate_number: "BBB222",
    status: "maintenance",
    acquired_date: "2024-12-01",
    fuel_type: "gasoline",
    cylinder_capacity: 149,
    tire_size: "19-17",
    image: "https://picsum.photos/id/201/800",
  },
  {
    brand: "Suzuki",
    model: "GN125",
    plate_number: "CCC333",
    status: "available",
    acquired_date: "2023-08-22",
    fuel_type: "gasoline",
    cylinder_capacity: 125,
    tire_size: "18-16",
    image: "https://picsum.photos/id/202/800",
  },
  {
    brand: "KTM",
    model: "Duke 200",
    plate_number: "DDD444",
    status: "rented",
    acquired_date: "2025-01-15",
    fuel_type: "gasoline",
    cylinder_capacity: 199,
    tire_size: "17-17",
  },
  {
    brand: "TVS",
    model: "Apache 160",
    plate_number: "EEE555",
    status: "available",
    acquired_date: "2023-05-10",
    fuel_type: "gasoline",
    cylinder_capacity: 160,
    tire_size: "17-17",
  },
  {
    brand: "Yamaha",
    model: "Bws",
    plate_number: "FFF666",
    status: "available",
    acquired_date: "2024-07-19",
    fuel_type: "gasoline",
    cylinder_capacity: 155,
    tire_size: "15-15",
  },
  {
    brand: "AKT",
    model: "NKD 125",
    plate_number: "GGG777",
    status: "rented",
    acquired_date: "2022-11-03",
    fuel_type: "gasoline",
    cylinder_capacity: 124,
    tire_size: "18-18",
  },
  {
    brand: "Hero",
    model: "Eco Deluxe",
    plate_number: "HHH888",
    status: "rented",
    acquired_date: "2021-03-25",
    fuel_type: "gasoline",
    cylinder_capacity: 97,
    tire_size: "18-18",
  },
  {
    brand: "Yamaha",
    model: "FZ-S",
    plate_number: "III999",
    status: "available",
    acquired_date: "2024-10-10",
    fuel_type: "gasoline",
    cylinder_capacity: 149,
    tire_size: "17-17",
  },
  {
    brand: "Honda",
    model: "CB190R",
    plate_number: "JJJ000",
    status: "maintenance",
    acquired_date: "2025-02-28",
    fuel_type: "gasoline",
    cylinder_capacity: 184,
    tire_size: "17-17",
  },
];
const vehicles = ref(
  mockVehicles.sort((a, b) => {
    return a.brand.localeCompare(b.brand);
  })
);

const selectedVehicle = ref(
  typeof mockVehicles[0] === "object" ? mockVehicles[0] : null
);
const selectVehicle = (vehicle: (typeof mockVehicles)[0]) => {
  selectedVehicle.value = vehicle;
  console.log("Selected Vehicle:", vehicle);
};
</script>
<template>
  <main class="flex flex-col items-center justify-center w-full">
    <h1 class="text-2xl font-bold mb-12 self-start ml-[5%]">Vehicles</h1>
    <section class="flex flex-wrap gap-4 w-[90%]">
      <!-- <div class="col-span-2 row-span-5 bg-red-50"></div> -->
      <div class="flex-grow">
        <Table class="overflow-x-hidden min-w-[400px]">
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Plate Number</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="vehicle in vehicles"
              :key="vehicle.plate_number"
              @click="selectVehicle(vehicle)"
              class="cursor-pointer transition-colors"
              :class="{
                'active-background text-black':
                  selectedVehicle?.plate_number === vehicle.plate_number,
                'hover:bg-muted':
                  selectedVehicle?.plate_number !== vehicle.plate_number,
              }"
            >
              <TableCell>{{ vehicle.brand }}</TableCell>
              <TableCell>{{ vehicle.model }}</TableCell>
              <TableCell>{{ vehicle.plate_number }}</TableCell>
              <TableCell>
                <div :class="['status-indicator', vehicle.status]"></div>
                {{ vehicle.status }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class="w-[30%]">
        <Card
          v-if="selectedVehicle"
          class="w-full h-full details-card min-w-[300px]"
          :class="[selectedVehicle.status]"
        >
          <CardHeader>
            <div class="flex items-center justify-center mb-4">
              <div class="rounded-xl flex-grow">
                <CardTitle>
                  {{ selectedVehicle.brand }}
                  {{ selectedVehicle.model }}
                </CardTitle>
                <CardDescription>
                  Placa: {{ selectedVehicle.plate_number }}
                </CardDescription>
              </div>
              <img
                v-if="selectedVehicle.image == null"
                src="/public/images/scooter.png"
                alt="Default Vehicle Image"
                class="w-24 h-24 mx-auto rounded-xl"
              />
              <img
                v-else
                :src="selectedVehicle.image"
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
            <Button variant="outline" class="w-[48%]"> Rent </Button>
            <Button variant="outline" class="w-[48%]"> Maintenance </Button>
            <Button variant="outline" class="w-[48%]"> Event </Button>
          </CardFooter>
        </Card>
        <p v-else class="text-muted-foreground text-center mt-10">
          Selecciona un vehículo para ver los detalles
        </p>
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
  margin-right: 8px;
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
.details-card {
  box-shadow: 0 0 10px #22222266;
}
.details-card.available {
  box-shadow: 0 0 10px #4caf5066; /* Green */
}
.details-card.rented {
  box-shadow: 0 0 10px #2196f366; /* Blue */
}
.details-card.maintenance {
  box-shadow: 0 0 10px #ff980066; /* Orange */
}
</style>
