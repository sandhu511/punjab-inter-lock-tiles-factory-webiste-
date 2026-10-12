import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, FloatingWhatsApp } from "@/components/site/Layout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          ਜੋ ਪੰਨਾ ਤੁਸੀਂ ਲੱਭ ਰਹੇ ਹੋ ਉਹ ਮੌਜੂਦ ਨਹੀਂ ਹੈ ਜਾਂ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਹੈ।
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn-shine inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 active:scale-[0.98]"
          >
            ਮੁੱਖ ਪੰਨੇ 'ਤੇ ਜਾਓ
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          ਇਹ ਪੰਨਾ ਲੋਡ ਨਹੀਂ ਹੋ ਸਕਿਆ
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          ਕੁਝ ਗੜਬੜ ਹੋ ਗਈ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਪੰਨਾ ਦੁਬਾਰਾ ਰੀਫ੍ਰੈਸ਼ ਕਰੋ ਜਾਂ ਮੁੱਖ ਪੰਨੇ 'ਤੇ ਜਾਓ।
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-shine inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 active:scale-[0.98] cursor-pointer"
          >
            ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-sm border-2 border-foreground bg-transparent px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-md active:translate-y-0 active:scale-[0.98]"
          >
            ਮੁੱਖ ਪੰਨਾ
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Punjab Interlock Tiles | Quality Interlock Tiles in Punjab" },
      { name: "description", content: "Quality interlock tiles from Gehri Buttar, Sangat Kalan, Punjab." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Hind:wght@400;500;600&family=Noto+Sans+Gurmukhi:wght@400;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pa">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster />
    </QueryClientProvider>
  );
}
