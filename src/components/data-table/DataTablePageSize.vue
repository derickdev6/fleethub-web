<script setup>
import { Button } from "@/components/ui/button";
const props = defineProps({ table: Object });
</script>

<template>
  <div class="flex items-center space-x-2">
    <p class="text-sm text-gray-500">Mostrar:</p>
    <Button
      @click="table.setPageSize(10)"
      :disabled="table.getState().pagination.pageSize === 10"
    >
      10
    </Button>
    <Button
      @click="table.setPageSize(20)"
      :disabled="table.getState().pagination.pageSize === 20"
    >
      20
    </Button>
  </div>
</template>
