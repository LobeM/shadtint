import { DynamicFontLoader } from "@/components/dynamic-font-loader";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beautiful themes for shadcn/ui — ShadTint | Theme Editor & Generator",
  description:
    "Customize theme for shadcn/ui with our interactive editor. Supports Tailwind CSS v4, Shadcn UI, and custom styles. Modify properties, preview changes, and get the code in real time.",
  authors: [{ name: "Lobe Musonda" }],
  openGraph: {
    title: "Beautiful themes for shadcn/ui — ShadTint | Theme Editor & Generator",
    description:
      "Customize theme for shadcn/ui with our interactive editor. Supports Tailwind CSS v4, Shadcn UI, and custom styles. Modify properties, preview changes, and get the code in real time.",
    url: "https://shadtint.com",
    siteName: "ShadTint",
    images: [
      {
        url: "https://tweakcn.com/og-image.v050725.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beautiful themes for shadcn/ui — ShadTint | Theme Editor & Generator",
    description:
      "Customize theme for shadcn/ui with our interactive editor. Supports Tailwind CSS v4, Shadcn UI, and custom styles. Modify properties, preview changes, and get the code in real time.",
    images: ["https://tweakcn.com/og-image.v050725.png"],
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <DynamicFontLoader />
      </head>
      <body>
        <NuqsAdapter>
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
