<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const rentId = route.params.id;

// You can fetch rent data based on rentId here
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold">Rent #{{ rentId }}</h1>
    <p class="text-gray-600 mt-2">Details for this rent will appear here.</p>
  </div>
</template>
