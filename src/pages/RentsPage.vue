<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-vue-next";

const mockRents = [
  {
    vehicle: "Yamaha Bwis",
    clientName: "John Doe",
    startDate: "2025-06-18",
    endDate: "2025-06-25",
    type: "touristic",
    paymentFrequency: "daily",
    payment: 115,
    paymentBonus: 0,
    totalPrice: 805,
    status: "active",
  },
  {
    vehicle: "Honda XR150",
    clientName: "Jane Smith",
    startDate: "2024-12-01",
    endDate: "2024-12-15",
    type: "touristic",
    paymentFrequency: "weekly",
    payment: 500,
    paymentBonus: 50,
    totalPrice: 950,
    status: "completed",
  },
  {
    vehicle: "Suzuki GN125",
    clientName: "Alice Johnson",
    startDate: "2023-08-22",
    endDate: "2023-09-05",
    type: "working",
    paymentFrequency: "monthly",
    payment: 1100,
    paymentBonus: 400,
    totalPrice: 6600,
    status: "active",
  },
  {
    vehicle: "KTM Duke 200",
    clientName: "Bob Brown",
    startDate: "2023-10-10",
    endDate: "2023-10-20",
    type: "touristic",
    paymentFrequency: "daily",
    payment: 150,
    paymentBonus: 0,
    totalPrice: 1500,
    status: "active",
  },
  {
    vehicle: "Kawasaki Ninja 250",
    clientName: "Charlie Green",
    startDate: "2023-11-05",
    endDate: "2023-11-12",
    type: "touristic",
    paymentFrequency: "weekly",
    payment: 600,
    paymentBonus: 50,
    totalPrice: 4100,
    status: "completed",
  },
  {
    vehicle: "TVS Apache 160",
    clientName: "David White",
    startDate: "2023-05-10",
    endDate: "2023-05-20",
    type: "working",
    paymentFrequency: "monthly",
    payment: 1200,
    paymentBonus: 300,
    totalPrice: 7200,
    status: "active",
  },
  {
    vehicle: "Yamaha Bws",
    clientName: "Eve Black",
    startDate: "2024-07-19",
    endDate: "2024-07-26",
    type: "touristic",
    paymentFrequency: "daily",
    payment: 115,
    paymentBonus: 0,
    totalPrice: 805,
    status: "active",
  },
  {
    vehicle: "AKT NKD 125",
    clientName: "Frank Blue",
    startDate: "2022-11-03",
    endDate: "2022-11-10",
    type: "working",
    paymentFrequency: "weekly",
    payment: 400,
    paymentBonus: 50,
    totalPrice: 2450,
    status: "completed",
  },
  {
    vehicle: "Hero Eco Deluxe",
    clientName: "Grace Yellow",
    startDate: "2021-03-25",
    endDate: "2021-04-01",
    type: "touristic",
    paymentFrequency: "daily",
    payment: 100,
    paymentBonus: 0,
    totalPrice: 700,
    status: "completed",
  },
  {
    vehicle: "Yamaha FZ-S",
    clientName: "Hank Purple",
    startDate: "2024-10-10",
    endDate: "2024-10-17",
    type: "working",
    paymentFrequency: "monthly",
    payment: 1300,
    paymentBonus: 400,
    totalPrice: 7800,
    status: "active",
  },
  {
    vehicle: "Honda CB190R",
    clientName: "Ivy Orange",
    startDate: "2023-09-15",
    endDate: "2023-09-22",
    type: "touristic",
    paymentFrequency: "weekly",
    payment: 550,
    paymentBonus: 50,
    totalPrice: 3600,
    status: "completed",
  },
  {
    vehicle: "Kawasaki Z400",
    clientName: "Jack Pink",
    startDate: "2023-06-30",
    endDate: "2023-07-07",
    type: "working",
    paymentFrequency: "daily",
    payment: 200,
    paymentBonus: 0,
    totalPrice: 1400,
    status: "completed",
  },
];
</script>

<template>
  <main class="flex flex-col items-center justify-center w-full">
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Payment Frequency</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Payment Bonus</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-for="rent in mockRents" :key="rent.vehicle">
              <TableRow class="hover:bg-gray-100">
                <TableCell>{{ rent.vehicle }}</TableCell>
                <TableCell>{{ rent.clientName }}</TableCell>
                <TableCell>{{ rent.startDate }}</TableCell>
                <TableCell>{{ rent.endDate }}</TableCell>
                <TableCell>{{ rent.type }}</TableCell>
                <TableCell>{{ rent.paymentFrequency }}</TableCell>
                <TableCell>{{ rent.payment }}</TableCell>
                <TableCell>{{ rent.paymentBonus }}</TableCell>
                <TableCell>{{ rent.totalPrice }}</TableCell>
                <TableCell>{{ rent.status }}</TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>
    </section>
  </main>
</template>
