<template>
  <tr
    data-slot="table-row"
    class="border-b transition-colors hover:bg-white data-[state=selected]:bg-muted"
  >
    <slot />
  </tr>
</template>
