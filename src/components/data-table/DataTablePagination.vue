<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { DataTablePageSize } from ".";
const props = defineProps<{
  table: any;
}>();
</script>

<template>
  <div class="flex items-center justify-between mt-4 gap-2">
    <div class="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        @click="props.table.setPageIndex(0)"
        :disabled="!props.table.getCanPreviousPage()"
      >
        <ChevronFirst class="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        @click="props.table.previousPage()"
        :disabled="!props.table.getCanPreviousPage()"
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        @click="props.table.nextPage()"
        :disabled="!props.table.getCanNextPage()"
      >
        <ChevronRight class="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        @click="props.table.setPageIndex(props.table.getPageCount() - 1)"
        :disabled="!props.table.getCanNextPage()"
      >
        <ChevronLast class="h-4 w-4" />
      </Button>
      <p class="text-sm text-muted-foreground ml-2">
        Página {{ props.table.getState().pagination.pageIndex + 1 }} de
        {{ props.table.getPageCount() }}
      </p>
    </div>
    <DataTablePageSize :table="props.table" />
  </div>
</template>
