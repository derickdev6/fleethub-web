<template>
  <tbody
    data-slot="table-body"
    class="[&_tr:last-child]:border-0 [&_td]:px-4 [&_td]:py-3 align-middle"
  >
    <slot />
  </tbody>
</template>
