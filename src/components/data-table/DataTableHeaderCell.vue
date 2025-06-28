<script setup lang="ts">
import type { Header } from "@tanstack/vue-table";

const props = defineProps<{
  header: Header<any, unknown>;
}>();

const sortingIndicator = () => {
  const sorted = props.header.column.getIsSorted();
  if (sorted === "asc") return " ↑";
  if (sorted === "desc") return " ↓";
  return "";
};
</script>

<template>
  <th
    scope="col"
    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    :class="{ 'cursor-pointer select-none': header.column.getCanSort() }"
    @click="header.column.getToggleSortingHandler()?.($event)"
  >
    <slot />
    <span>{{ sortingIndicator() }}</span>
  </th>
</template>
