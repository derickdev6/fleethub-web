<script setup lang="ts">
defineProps<{
  header: any;
}>();
</script>

<template>
  <th
    scope="col"
    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    :class="{
      'cursor-pointer select-none': header.column.getCanSort(),
    }"
    @click="header.column.getToggleSortingHandler()?.($event)"
  >
    <slot />
    {{ { asc: " ↑", desc: " ↓" }[header.column.getIsSorted()] }}
  </th>
</template>
