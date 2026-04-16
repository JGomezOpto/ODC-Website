"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Container } from "@/components/layout/Container";
import { mainNavigation, type NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { SearchDialog, useSearchShortcut } from "@/components/common/SearchDialog";

function MegaMenuPanel({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border shadow-2xl"
    >
      <Container className="py-8">
        <div className="grid grid-cols-3 gap-8">
          {item.children?.map((child) => (
            <div key={child.href}>
              <Link
                href={child.href}
                onClick={onClose}
                className="group flex items-start gap-4 rounded-lg p-3 -m-3 hover:bg-accent/50 transition-colors"
              >
                {child.image && (
                  <div className="relative w-20 h-14 rounded-md overflow-hidden shrink-0 border border-border">
                    <Image
                      src={child.image}
                      alt={child.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                    {child.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  {child.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {child.description}
                    </p>
                  )}
                </div>
              </Link>
              {child.children && (
                <div className="mt-3 ml-3 space-y-1">
                  {child.children.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onClose}
                      className="group/sub block text-sm py-1.5 px-2 -mx-2 rounded-md hover:bg-primary/10 transition-colors"
                    >
                      <span className="font-medium text-foreground/80 group-hover/sub:text-primary transition-colors">
                        {sub.label}
                      </span>
                      {sub.description && (
                        <span className="ml-2 text-xs text-muted-foreground group-hover/sub:text-primary/70 transition-colors">
                          {sub.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}

function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="flex items-center justify-between py-4 border-b border-border/50 text-[15px] font-medium text-foreground hover:text-primary transition-colors group"
      >
        {item.label}
        <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
      </Link>
    );
  }

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between py-4 text-[15px] font-medium text-foreground hover:text-primary transition-colors"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground/70 transition-transform shrink-0",
            expanded && "rotate-180 text-primary"
          )}
        />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="pb-3 space-y-0.5">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40 group-hover:bg-primary transition-colors shrink-0" />
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useSearchShortcut(() => setSearchOpen(true));
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((label: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setActiveMenu(label);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setActiveMenu(null);
  }, []);

  const activeItem = mainNavigation.find((item) => item.label === activeMenu);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Header bar */}
      <div className="bg-background/80 backdrop-blur-xl border-b border-border/50">
        <Container className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="relative shrink-0">
            <Image
              src="/images/branding/logo-white.png"
              alt="Opto Diode Corporation"
              width={180}
              height={40}
              className="h-8 lg:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <div
                key={item.href}
                onMouseEnter={() =>
                  item.children ? openMenu(item.label) : scheduleClose()
                }
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md inline-flex items-center gap-1",
                    "text-muted-foreground hover:text-foreground",
                    activeMenu === item.label && "text-foreground"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform",
                        activeMenu === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium h-8 px-3 transition-colors"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="/images/branding/logo-white.png"
                    alt="Opto Diode"
                    width={140}
                    height={32}
                    className="h-7 w-auto"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <nav className="border-t border-border/50">
                  {mainNavigation.map((item) => (
                    <MobileNavItem
                      key={item.href}
                      item={item}
                      onClose={() => setMobileOpen(false)}
                    />
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    href="/request-quote"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium h-9 px-4 transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </div>

      {/* Mega-menu dropdown — rendered outside the nav bar, full width */}
      <AnimatePresence>
        {activeItem?.children && (
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <MegaMenuPanel item={activeItem} onClose={closeMenu} />
          </div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
