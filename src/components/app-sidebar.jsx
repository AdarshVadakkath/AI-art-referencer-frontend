import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  Settings2Icon,
  CommandIcon,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Generate",
      url: "#",
      icon: <ListIcon />,
    },
    {
      title: "History",
      url: "#",
      icon: <ChartBarIcon />,
    },
    {
      title: "Favourites",
      url: "#",
      icon: <FolderIcon />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="toon-sidebar-deco relative overflow-hidden"
      {...props}
    >
      <SidebarHeader className="border-b-3 border-toon-dark pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-transparent!"
            >
              <a href="#" className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-2xl bg-toon-dark text-toon-yellow shadow-toon-sm">
                  <CommandIcon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-extrabold text-toon-dark"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ART REF
                  </span>
                  <span className="text-[9px] font-bold text-toon-purple -mt-0.5">
                    Image Studio
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="border-t-3 border-toon-dark pt-2">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
