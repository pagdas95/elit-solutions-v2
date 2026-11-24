"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Chevron } from "./icons";
import { mainNav, serviceMenu } from "@/lib/site";

/**
 * Nav: logo, centred pill with a Services dropdown, CTA.
 * Adapts to the section underneath it: every section is tagged
 * data-nav="dark" | "light" and we sample the point just under the bar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      let isLight = false;
      const stack = document.elementsFromPoint(Math.round(window.innerWidth / 2), 40);
      for (const el of stack) {
        if (el.closest("header")) continue;
        const sec = el.closest("[data-nav]");
        if (sec) {
          isLight = sec.getAttribute("data-nav") === "light";
          break;
        }
      }
      setLight(isLight);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Mobile menu: lock scroll, close on Escape, manage focus.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const btn = menuBtn.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [menuOpen]);

  // Close the menu on route change (derived during render, no effect needed)
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const isHome = pathname === "/";
  const ctaHref = isHome ? "#contact" : "/contact";

  const t = light
    ? {
        pill: "bg-card",
        link: "text-ink2",
        cta: "bg-midnight text-ice",
        ctaHover: "var(--color-accent)",
        active: "bg-chip text-midnight",
        menuBtn: "bg-card text-midnight",
      }
    : {
        pill: "bg-high",
        link: "text-fg2",
        cta: "bg-accent text-midnight",
        ctaHover: "var(--color-ice)",
        active: "bg-line2 text-ice",
        menuBtn: "bg-high text-ice",
      };

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30">
        <div className="flex items-center justify-between gap-4 px-[clamp(16px,3vw,40px)] py-4">
          <Link
            href="/"
            aria-label="ElIT Solutions home"
            className={`pointer-events-auto flex min-h-11 items-center rounded-lg py-1.5 pr-3.5 pl-2.5 backdrop-blur-[14px] transition-colors duration-300 ${t.pill}`}
          >
            <Logo tone={light ? "onLight" : "onDark"} />
          </Link>

          <nav
            aria-label="Main"
            className={`pointer-events-auto absolute top-4 left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full p-[5px] text-[15px] backdrop-blur-[14px] transition-colors duration-300 md:flex ${t.pill}`}
          >
            <div className="el-dd">
              <Link
                href="/services"
                aria-haspopup="true"
                className={`el-navlink inline-flex items-center gap-1.5 rounded-full px-[18px] py-2.5 ${
                  isActive("/services") ? t.active : t.link
                }`}
              >
                Services <Chevron />
              </Link>
              <div className="el-ddmenu">
                <div className="rounded-xl border border-line bg-panel p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
                  {serviceMenu.map((s) => (
                    <Link key={s.key} href={s.href}>
                      {s.label}
                      <span className="mono text-[10.5px] text-mute2">{s.key}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {mainNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`el-navlink rounded-full px-[18px] py-2.5 ${
                  isActive(n.href) ? t.active : t.link
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              href={ctaHref}
              style={{ ["--cta-hover" as string]: t.ctaHover }}
              className={`el-cta hidden min-h-[46px] items-center rounded-lg px-5 text-[15px] font-semibold md:inline-flex ${t.cta}`}
            >
              Start a project
            </Link>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={`inline-flex min-h-[46px] cursor-pointer items-center justify-center rounded-lg px-[18px] text-[15px] font-semibold transition-colors duration-300 md:hidden ${t.menuBtn}`}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="el-fade fixed inset-0 z-40 flex flex-col gap-6 overflow-y-auto bg-midnight px-5 pt-4 pb-8 text-ice"
        >
          <div className="flex min-h-[62px] items-center justify-between">
            <Link href="/" onClick={() => setMenuOpen(false)} aria-label="ElIT Solutions home">
              <Logo showSymbol={false} />
            </Link>
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="min-h-[46px] cursor-pointer rounded-full border border-line2 px-[18px] text-[15px] font-semibold"
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col border-t border-line">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Lab", href: "/lab" },
              { label: "Contact", href: "/contact" },
            ].map((n) => {
              const on = n.href === "/" ? pathname === "/" : isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={on ? "page" : undefined}
                  className={`display border-b border-line py-4 text-[56px] leading-none tracking-normal ${
                    on ? "text-accent" : "text-ice"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href={ctaHref}
            onClick={() => setMenuOpen(false)}
            className="mt-auto flex min-h-14 items-center justify-center rounded-lg bg-accent text-base font-semibold text-midnight"
          >
            Start a project
          </Link>
        </div>
      )}
    </>
  );
}
