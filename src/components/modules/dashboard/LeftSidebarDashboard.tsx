"use client";
import { HelpCircle, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  //   SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TCategory } from "@/types/category";
import { useRouter, useSearchParams } from "next/navigation";

type NavItem = {
  url?: string;
  label?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  logo: {
    src?: string;
    alt: string;
    title: string;
    description: string;
  };
  navGroups: NavGroup[];
  footerGroup: NavGroup;
};

const SidebarLogo = ({ logo }: { logo: SidebarData["logo"] }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium text-3xl">{logo.title}</span>
            <span className="text-xs text-muted-foreground">
              {logo.description}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const sidebarData: SidebarData = {
    logo: {
      alt: "Shadcnblocks",
      title: "Filter By",
      description: "",
    },
    navGroups: [
      {
        title: "Categories",
        items: [
          {
            label: "All Bookings",
            url: "/dashboard/admin/bookings",
          },
        ],
      },
      {
        title: "Instructor",
        items: props.tutors?.filter(
          (item) => item.label && item.label.trim() !== "",
        ),
      },
      {
        title: "Hourly Rate",
        items: [
          { key: "hourlyRate", label: "All" },
          { key: "hourlyRate", label: "300-600" },
          { key: "hourlyRate", label: "700-1000" },
        ],
      },
      {
        title: "Verified",
        items: [
          { key: "verified", label: "Verified" },
          { key: "verified", label: "Not Verified" },
        ],
      },
      {
        title: "Experiences(Year)",
        items: [
          { key: "experiences", label: "2-3" },
          { key: "experiences", label: "3-5" },
        ],
      },
    ],
    footerGroup: {
      title: "Support",
      items: [
        { label: "Help Center", icon: HelpCircle, href: "#" },
        { label: "Settings", icon: Settings, href: "#" },
      ],
    },
  };
  return (
    <Sidebar {...props} className="h-auto min-h-0 relative">
      <SidebarHeader>
        <SidebarLogo logo={sidebarData.logo} />
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <SidebarGroup className="text-2xl" key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items?.map((item, index) => {
                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <span>{item.label}</span>
                        </label>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarData.footerGroup.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.footerGroup.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>{item.label}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export { AppSidebar };

interface LeftSideBarDashboardProps {
  className?: string;
  children: React.ReactNode;
  categories: TCategory[];
  tutors: { key: string; label: string }[];
}

const LeftSideBarDashboard = ({
  className,
  children,
  categories,
  tutors,
}: LeftSideBarDashboardProps) => {
  return (
    <SidebarProvider className={cn(className)}>
      <AppSidebar categories={categories || []} tutors={tutors} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export { LeftSideBarDashboard };
