<script setup lang="ts">
import {
  ClipboardPlus,
  Home,
  MapPinPlus,
  Settings,
  Users,
  Wrench,
  Boxes,
  Warehouse,
} from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { RouterLink } from "vue-router";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Vehicles",
    url: "/vehicles",
    icon: Warehouse,
  },
  {
    title: "Rents",
    url: "/rents",
    icon: MapPinPlus,
  },
  {
    title: "Maintenance",
    url: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Events",
    url: "/events",
    icon: ClipboardPlus,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Boxes,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Account",
    url: "/account",
    icon: Settings,
  },
];
</script>

<template>
  <Sidebar variant="sidebar" class="shadow-xl">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <RouterLink
                  :to="item.url"
                  :class="{
                    'text-primary font-semibold active-background':
                      $route.path.includes(item.url),
                    'text-muted-foreground': $route.path !== item.url,
                  }"
                >
                  <component :is="item.icon" />
                  <span>{{ item.title }} </span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <p class="text-xs text-muted-foreground">&copy; Fleethub</p>
    </SidebarFooter>
  </Sidebar>
</template>
