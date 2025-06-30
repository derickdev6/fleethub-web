<script setup lang="ts">
import { Button } from "@/components/ui/button";
const props = defineProps<{
  table: any;
}>();
</script>

<template>
  <div class="flex items-center space-x-2">
    <p class="text-sm text-gray-500">Page Size:</p>
    <Button
      class="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      @click="props.table.setPageSize(10)"
      :disabled="props.table.getState().pagination.pageSize === 10"
    >
      10
    </Button>
    <Button
      class="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      @click="props.table.setPageSize(20)"
      :disabled="props.table.getState().pagination.pageSize === 20"
    >
      20
    </Button>
  </div>
</template>
