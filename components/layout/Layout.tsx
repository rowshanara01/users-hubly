"use client";
import React from "react";
import { AppProvider, DashboardLayout, type Navigation } from "@toolpad/core";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/context/ModalContext";
import { Toaster } from "react-hot-toast";

const NAVIGATION: Navigation = [
  {
    segment: "",
    title: "Users",
    icon: <PeopleAltOutlinedIcon />,
  },
];

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ModalProvider>
        <AppProvider navigation={NAVIGATION}>
          <DashboardLayout
            branding={{
              title: "UserHub",
              homeUrl: "/",
              logo: false,
            }}
          >
            {children}
          </DashboardLayout>
        </AppProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
};

export default Layout;
