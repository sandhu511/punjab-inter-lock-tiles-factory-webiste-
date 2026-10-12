import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  KeyRound,
  User,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Megaphone,
  Inbox,
  Boxes,
  Star,
  Settings,
  Phone,
  MessageCircle,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  ExternalLink,
  Save,
  RefreshCw,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  getAdminSession,
  setAdminSession,
  getAdminCredentials,
  saveAdminCredentials,
  getStoredAnnouncements,
  saveStoredAnnouncements,
  getStoredLeads,
  saveStoredLeads,
  addLead,
  getStoredProducts,
  saveStoredProducts,
  getStoredReviews,
  saveStoredReviews,
  type StoredAnnouncement,
  type StoredLead,
  type StoredProduct,
  type StoredReview,
} from "@/lib/admin-store";
import { BUSINESS, whatsappUrl } from "@/lib/business";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "ਐਡਮਿਨ ਪੈਨਲ | Punjab Interlock Tiles Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type AdminTab = "overview" | "leads" | "banners" | "products" | "reviews" | "settings";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // Auth form state
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Data states
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [banners, setBanners] = useState<StoredAnnouncement[]>([]);
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [reviews, setReviews] = useState<StoredReview[]>([]);

  // Search & Filters
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("all");

  // New Lead Form state
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadTile, setNewLeadTile] = useState("ਇੰਟਰਲਾਕ ਪੇਵਰ ਟਾਈਲਾਂ");
  const [newLeadQty, setNewLeadQty] = useState("");
  const [newLeadLoc, setNewLeadLoc] = useState("");
  const [newLeadMsg, setNewLeadMsg] = useState("");

  // New Banner Form state
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [newBannerBadge, setNewBannerBadge] = useState("ਵਿਸ਼ੇਸ਼ ਆਫਰ");
  const [newBannerText, setNewBannerText] = useState("");
  const [newBannerHighlight, setNewBannerHighlight] = useState("");
  const [newBannerActionLabel, setNewBannerActionLabel] = useState("ਸੰਪਰਕ ਕਰੋ");
  const [newBannerActionUrl, setNewBannerActionUrl] = useState("/contact");

  // Security Credentials form state
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load auth & data on mount
  useEffect(() => {
    const isAuth = getAdminSession();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadAllData();
    }
  }, []);

  function loadAllData() {
    setLeads(getStoredLeads());
    setBanners(getStoredAnnouncements());
    setProducts(getStoredProducts());
    setReviews(getStoredReviews());
    const creds = getAdminCredentials();
    setNewUsername(creds.username);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const creds = getAdminCredentials();

    if (usernameInput.trim() === creds.username && passwordInput === creds.password) {
      setAdminSession(true);
      setIsAuthenticated(true);
      toast.success("ਐਡਮਿਨ ਪੈਨਲ ਵਿੱਚ ਸਫਲਤਾਪੂਰਵਕ ਲੌਗਇਨ ਹੋ ਗਏ ਹੋ!");
      loadAllData();
    } else {
      setLoginError("ਗਲਤ ਯੂਜ਼ਰਨੇਮ ਜਾਂ ਪਾਸਵਰਡ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।");
      toast.error("ਲੌਗਇਨ ਅਸਫਲ ਰਿਹਾ। ਸਹੀ ਵੇਰਵੇ ਦਰਜ ਕਰੋ।");
    }
  }

  function handleLogout() {
    setAdminSession(false);
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
    toast.info("ਲੌਗਆਊਟ ਹੋ ਗਿਆ।");
  }

  // --- Lead Operations ---
  function updateLeadStatus(id: string, status: StoredLead["status"]) {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updated);
    saveStoredLeads(updated);
    toast.success("ਲੀਡ ਦੀ ਸਥਿਤੀ ਅੱਪਡੇਟ ਹੋ ਗਈ!");
  }

  function deleteLead(id: string) {
    if (!confirm("ਕੀ ਤੁਸੀਂ ਇਸ ਪੁੱਛਗਿੱਛ ਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?")) return;
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    saveStoredLeads(updated);
    toast.success("ਪੁੱਛਗਿੱਛ ਹਟਾ ਦਿੱਤੀ ਗਈ!");
  }

  function handleCreateLead(e: React.FormEvent) {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) {
      toast.error("ਨਾਮ ਅਤੇ ਫ਼ੋਨ ਨੰਬਰ ਲੋੜੀਂਦੇ ਹਨ!");
      return;
    }
    const created = addLead({
      name: newLeadName.trim(),
      phone: newLeadPhone.trim(),
      whatsapp: newLeadPhone.trim(),
      tile: newLeadTile,
      quantity: newLeadQty.trim() || "-",
      location: newLeadLoc.trim() || "-",
      message: newLeadMsg.trim(),
    });
    setLeads([created, ...leads]);
    setShowAddLeadModal(false);
    setNewLeadName("");
    setNewLeadPhone("");
    setNewLeadQty("");
    setNewLeadLoc("");
    setNewLeadMsg("");
    toast.success("ਨਵੀਂ ਲੀਡ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਹੋ ਗਈ!");
  }

  // --- Banner Operations ---
  function toggleBannerActive(id: string) {
    const updated = banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b));
    setBanners(updated);
    saveStoredAnnouncements(updated);
    toast.success("ਬੈਨਰ ਦੀ ਸਥਿਤੀ ਅੱਪਡੇਟ ਕੀਤੀ ਗਈ!");
  }

  function deleteBanner(id: string) {
    if (banners.length <= 1) {
      toast.error("ਘੱਟੋ-ਘੱਟ ਇੱਕ ਬੈਨਰ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ!");
      return;
    }
    if (!confirm("ਕੀ ਤੁਸੀਂ ਇਸ ਬੈਨਰ ਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?")) return;
    const updated = banners.filter((b) => b.id !== id);
    setBanners(updated);
    saveStoredAnnouncements(updated);
    toast.success("ਬੈਨਰ ਹਟਾ ਦਿੱਤਾ ਗਿਆ!");
  }

  function handleCreateBanner(e: React.FormEvent) {
    e.preventDefault();
    if (!newBannerText.trim()) {
      toast.error("ਬੈਨਰ ਸੁਨੇਹਾ ਦਰਜ ਕਰੋ!");
      return;
    }
    const newB: StoredAnnouncement = {
      id: `banner-${Date.now()}`,
      badge: newBannerBadge.trim(),
      text: newBannerText.trim(),
      highlightText: newBannerHighlight.trim() || undefined,
      actionLabel: newBannerActionLabel.trim() || undefined,
      actionUrl: newBannerActionUrl.trim() || undefined,
      isActive: true,
    };
    const updated = [...banners, newB];
    setBanners(updated);
    saveStoredAnnouncements(updated);
    setShowAddBannerModal(false);
    setNewBannerText("");
    setNewBannerHighlight("");
    toast.success("ਨਵਾਂ ਬੈਨਰ ਸ਼ਾਮਲ ਕਰ ਦਿੱਤਾ ਗਿਆ!");
  }

  // --- Product Operations ---
  function updateProduct(id: string, updates: Partial<StoredProduct>) {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(updated);
    saveStoredProducts(updated);
    toast.success("ਉਤਪਾਦ ਅੱਪਡੇਟ ਹੋ ਗਿਆ!");
  }

  // --- Credentials Change ---
  function handleUpdateCredentials(e: React.FormEvent) {
    e.preventDefault();
    if (!newUsername.trim() || newUsername.trim().length < 4) {
      toast.error("ਯੂਜ਼ਰਨੇਮ ਘੱਟੋ-ਘੱਟ 4 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ!");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      toast.error("ਪਾਸਵਰਡ ਘੱਟੋ-ਘੱਟ 8 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ!");
      return;
    }
    saveAdminCredentials({
      username: newUsername.trim(),
      password: newPassword,
    });
    setNewPassword("");
    setConfirmPassword("");
    toast.success("ਐਡਮਿਨ ਯੂਜ਼ਰਨੇਮ ਅਤੇ ਪਾਸਵਰਡ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲ ਦਿੱਤੇ ਗਏ ਹਨ!");
  }

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.location.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.tile.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = leadStatusFilter === "all" || l.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentCreds = getAdminCredentials();

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md">
          {/* Top Brand Box */}
          <div className="text-center">
            <span className="mx-auto mb-4 grid h-14 w-14 grid-cols-2 gap-1 bg-ink p-2 shadow-lg">
              <span className="bg-primary" />
              <span className="bg-ink-muted" />
              <span className="bg-ink-muted" />
              <span className="bg-primary" />
            </span>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground">
              {BUSINESS.name}
            </h1>
            <p className="font-pa text-base font-semibold text-primary">
              ਸੁਰੱਖਿਅਤ ਐਡਮਿਨ ਪੋਰਟਲ (Admin Portal)
            </p>
            <p className="mt-1 text-xs text-muted-foreground">ਸਿਰਫ਼ ਪ੍ਰਬੰਧਕ ਲਈ ਅਧਿਕਾਰਤ ਲੌਗਇਨ</p>
          </div>

          {/* Login Form Box */}
          <div className="mt-8 border bg-card p-6 shadow-xl sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="rounded-xs border border-destructive/50 bg-destructive/10 p-3 text-xs font-medium text-destructive">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                  ਯੂਜ਼ਰਨੇਮ (Username)
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="ਐਡਮਿਨ ਯੂਜ਼ਰਨੇਮ ਦਰਜ ਕਰੋ"
                    className="w-full rounded-xs border border-input bg-background py-2.5 pl-10 pr-3 text-sm font-medium outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                  ਪਾਸਵਰਡ (Password)
                </label>
                <div className="relative mt-2">
                  <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="ਸੁਰੱਖਿਅਤ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ"
                    className="w-full rounded-xs border border-input bg-background py-2.5 pl-10 pr-10 text-sm font-medium outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="ਪਾਸਵਰਡ ਦੇਖੋ"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-shine flex w-full items-center justify-center gap-2 rounded-xs bg-primary py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:bg-primary/95 hover:shadow-lg active:scale-[0.99] cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                <span>ਲੌਗਇਨ ਕਰੋ (Sign In)</span>
              </button>
            </form>

            {/* Configured Credentials Info Card for Owner */}
            <div className="mt-6 rounded-xs border border-primary/20 bg-primary/5 p-4 text-xs">
              <div className="flex items-center gap-2 font-display font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>ਸੁਰੱਖਿਅਤ ਐਕਸੈਸ ਕ੍ਰੈਡੈਂਸ਼ਿਅਲ (Default Credentials)</span>
              </div>
              <p className="mt-2 text-muted-foreground">
                ਤੁਹਾਡੇ ਲਈ ਸੈੱਟ ਕੀਤੇ ਗਏ ਸਟ੍ਰੌਂਗ ਕ੍ਰੈਡੈਂਸ਼ਿਅਲ ਹੇਠਾਂ ਦਿੱਤੇ ਹਨ (ਤੁਸੀਂ ਲੌਗਇਨ ਤੋਂ ਬਾਅਦ
                ਇਹਨਾਂ ਨੂੰ ਬਦਲ ਵੀ ਸਕਦੇ ਹੋ):
              </p>
              <div className="mt-3 space-y-1.5 font-mono text-[11px] bg-background/80 p-2.5 rounded-xs border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Username:</span>
                  <span className="font-bold text-foreground select-all">
                    {currentCreds.username}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Password:</span>
                  <span className="font-bold text-primary select-all">{currentCreds.password}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUsernameInput(currentCreds.username);
                  setPasswordInput(currentCreds.password);
                  toast.success("ਕ੍ਰੈਡੈਂਸ਼ਿਅਲ ਆਟੋ-ਫਿਲ ਕਰ ਦਿੱਤੇ ਗਏ!");
                }}
                className="mt-2.5 text-[11px] font-bold text-primary underline underline-offset-2 hover:text-foreground cursor-pointer"
              >
                ਇਹਨਾਂ ਨਾਲ ਆਪਣੇ ਆਪ ਭਰੋ (Auto-fill credentials) &rarr;
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"
            >
              &larr; ਮੁੱਖ ਵੈੱਬਸਾਈਟ 'ਤੇ ਵਾਪਸ ਜਾਓ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const activeBannersCount = banners.filter((b) => b.isActive).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 grid-cols-2 gap-0.5 bg-ink p-1" aria-hidden>
              <span className="bg-primary" />
              <span className="bg-ink-muted" />
              <span className="bg-ink-muted" />
              <span className="bg-primary" />
            </span>
            <div>
              <span className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                {BUSINESS.name}
              </span>
              <span className="hidden sm:inline-block ml-2 rounded-xs bg-primary/15 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-primary">
                ਐਡਮਿਨ ਪੋਰਟਲ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xs border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ਵੈੱਬਸਾਈਟ ਦੇਖੋ</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 border-l border-border pl-3 text-xs text-muted-foreground">
              <User className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono">{currentCreds.username}</span>
            </div>
            <button
              onClick={handleLogout}
              title="ਲੌਗਆਊਟ ਕਰੋ"
              className="inline-flex items-center gap-1.5 rounded-xs bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ਲੌਗਆਊਟ</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="border-t bg-card px-4 md:px-8">
          <nav className="mx-auto flex max-w-7xl space-x-1 overflow-x-auto py-2">
            {[
              {
                id: "overview",
                label: "ਡੈਸ਼ਬੋਰਡ",
                en: "Overview",
                icon: LayoutDashboard,
                badge: null,
              },
              {
                id: "leads",
                label: "ਪੁੱਛਗਿੱਛਾਂ / ਲੀਡਾਂ",
                en: "Inquiries",
                icon: Inbox,
                badge: newLeadsCount > 0 ? newLeadsCount : null,
              },
              {
                id: "banners",
                label: "ਬੈਨਰ ਅਤੇ ਆਫਰ",
                en: "Top Banners",
                icon: Megaphone,
                badge: activeBannersCount,
              },
              { id: "products", label: "ਟਾਈਲ ਕੈਟਾਲਾਗ", en: "Products", icon: Boxes, badge: null },
              { id: "reviews", label: "ਸਮੀਖਿਆਵਾਂ", en: "Reviews", icon: Star, badge: null },
              {
                id: "settings",
                label: "ਸੁਰੱਖਿਆ ਤੇ ਪਾਸਵਰਡ",
                en: "Security",
                icon: Settings,
                badge: null,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex shrink-0 items-center gap-2 rounded-xs px-3.5 py-2 font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== null && (
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isActive ? "bg-black/30 text-white" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="mx-auto max-w-7xl p-4 md:p-8">
        {/* -----------------------------------------------------------
            TAB 1: OVERVIEW / DASHBOARD
           ----------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Metrics Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    ਕੁੱਲ ਲੀਡਾਂ / ਪੁੱਛਗਿੱਛਾਂ
                  </span>
                  <Inbox className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-3 font-display text-4xl font-bold text-foreground">
                  {leads.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-bold text-primary">{newLeadsCount} ਨਵੀਆਂ ਲੀਡਾਂ</span>{" "}
                  ਜਿਨ੍ਹਾਂ 'ਤੇ ਸੰਪਰਕ ਕਰਨਾ ਬਾਕੀ ਹੈ
                </p>
              </div>

              <div className="border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    ਚਾਲੂ ਬੈਨਰ (Live Banners)
                  </span>
                  <Megaphone className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-3 font-display text-4xl font-bold text-foreground">
                  {activeBannersCount}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  ਵੈੱਬਸਾਈਟ ਦੇ ਸਿਖਰ 'ਤੇ ਸਰਗਰਮ ਘੋਸ਼ਣਾਵਾਂ
                </p>
              </div>

              <div className="border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    ਟਾਈਲ ਕਿਸਮਾਂ (Catalog)
                  </span>
                  <Boxes className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-3 font-display text-4xl font-bold text-foreground">
                  {products.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">ਕੈਟਾਲਾਗ ਵਿੱਚ ਉਪਲਬਧ ਉਤਪਾਦ</p>
              </div>

              <div className="border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    ਗੂਗਲ ਰੇਟਿੰਗ (Google Rating)
                  </span>
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                </div>
                <p className="mt-3 font-display text-4xl font-bold text-foreground">
                  {BUSINESS.rating} ★
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  ਸੰਤੁਸ਼ਟ ਗਾਹਕਾਂ ਦੇ ਸ਼ਾਨਦਾਰ ਰਿਵਿਊ
                </p>
              </div>
            </div>

            {/* Quick Actions & Live Top Banner Preview */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Live Banner Preview Card */}
              <div className="border bg-card p-6 shadow-xs lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                    ਵੈੱਬਸਾਈਟ ਬੈਨਰ ਦੀ ਮੌਜੂਦਾ ਦਿੱਖ (Live Preview)
                  </h2>
                  <button
                    onClick={() => setActiveTab("banners")}
                    className="text-xs font-bold uppercase tracking-wider text-primary hover:underline cursor-pointer"
                  >
                    ਸਾਰੇ ਬੈਨਰ ਪ੍ਰਬੰਧਿਤ ਕਰੋ &rarr;
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  ਤੁਹਾਡੀ ਵੈੱਬਸਾਈਟ ਦੇ ਉੱਪਰ ਚੱਲ ਰਹੇ ਸਰਗਰਮ ਬੈਨਰ:
                </p>

                <div className="mt-4 space-y-2.5">
                  {banners
                    .filter((b) => b.isActive)
                    .map((b) => (
                      <div
                        key={b.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xs border border-primary/20 bg-gradient-to-r from-ink via-[#271d1a] to-ink p-3 text-xs text-ink-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <span className="rounded-xs bg-primary/20 px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/40">
                            {b.badge}
                          </span>
                          <span className="font-pa font-medium text-ink-foreground">{b.text}</span>
                          {b.highlightText && (
                            <span className="rounded-xs bg-white/10 px-1.5 py-0.2 font-display text-[10px] font-semibold text-primary-foreground">
                              {b.highlightText}
                            </span>
                          )}
                        </div>
                        <span className="font-display text-[11px] font-bold uppercase text-primary underline">
                          {b.actionLabel || "ਦੇਖੋ"} &rarr;
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border bg-card p-6 shadow-xs">
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                  ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ (Quick Actions)
                </h2>
                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => {
                      setActiveTab("leads");
                      setShowAddLeadModal(true);
                    }}
                    className="flex w-full items-center justify-between rounded-xs border border-border p-3 text-left font-display text-xs font-bold uppercase tracking-wider transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-primary" />
                      ਨਵੀਂ ਲੀਡ / ਗਾਹਕ ਦਰਜ ਕਰੋ
                    </span>
                    <span>&rarr;</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("banners");
                      setShowAddBannerModal(true);
                    }}
                    className="flex w-full items-center justify-between rounded-xs border border-border p-3 text-left font-display text-xs font-bold uppercase tracking-wider transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Megaphone className="h-4 w-4 text-primary" />
                      ਨਵਾਂ ਬੈਨਰ ਸ਼ਾਮਲ ਕਰੋ
                    </span>
                    <span>&rarr;</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="flex w-full items-center justify-between rounded-xs border border-border p-3 text-left font-display text-xs font-bold uppercase tracking-wider transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <KeyRound className="h-4 w-4 text-primary" />
                      ਪਾਸਵਰਡ ਬਦਲੋ (Security)
                    </span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Latest Inquiries Preview */}
            <div className="border bg-card p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                    ਤਾਜ਼ਾ ਪੁੱਛਗਿੱਛਾਂ (Recent Leads)
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    ਵੈੱਬਸਾਈਟ ਤੋਂ ਆਏ ਤਾਜ਼ਾ ਕੋਟੇਸ਼ਨ ਬੇਨਤੀਆਂ
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="btn-shine rounded-xs bg-primary px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-xs cursor-pointer"
                >
                  ਸਾਰੀਆਂ {leads.length} ਲੀਡਾਂ ਦੇਖੋ
                </button>
              </div>

              <div className="mt-5 divide-y border">
                {leads.slice(0, 4).map((l) => (
                  <div
                    key={l.id}
                    className="flex flex-wrap items-center justify-between gap-4 p-4 hover:bg-accent/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-base font-bold text-foreground">
                          {l.name}
                        </span>
                        <span
                          className={`rounded-xs px-2 py-0.5 text-[10px] font-bold uppercase ${
                            l.status === "new"
                              ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                              : l.status === "deal_won"
                                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {l.status === "new"
                            ? "ਨਵੀਂ"
                            : l.status === "deal_won"
                              ? "ਆਰਡਰ ਪੱਕਾ"
                              : l.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{l.tile}</span> &bull;{" "}
                        {l.quantity} &bull; ਸਥਾਨ: {l.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${l.phone}`}
                        className="inline-flex items-center gap-1 rounded-xs border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-primary hover:text-primary"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>{l.phone}</span>
                      </a>
                      <a
                        href={whatsappUrl(
                          `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ${l.name} ਜੀ, ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ ਵੱਲੋਂ ਤੁਹਾਡੀ ਕੋਟੇਸ਼ਨ ਬੇਨਤੀ ਸੰਬੰਧੀ ਸੰਪਰਕ ਕਰ ਰਹੇ ਹਾਂ।`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-xs bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#20ba5a]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>ਵਟਸਐਪ</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------
            TAB 2: LEADS & INQUIRIES MANAGEMENT
           ----------------------------------------------------------- */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                  ਗਾਹਕ ਪੁੱਛਗਿੱਛਾਂ ਅਤੇ ਲੀਡਾਂ (Customer Inquiries)
                </h2>
                <p className="text-xs text-muted-foreground">
                  ਸਾਰੇ ਗਾਹਕਾਂ ਦੀਆਂ ਕੋਟੇਸ਼ਨ ਬੇਨਤੀਆਂ, ਰੇਟ ਪੁੱਛਗਿੱਛ ਅਤੇ ਫਾਲੋ-ਅੱਪ
                </p>
              </div>
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="btn-shine inline-flex items-center gap-2 rounded-xs bg-primary px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-xs hover:bg-primary/95 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>ਨਵੀਂ ਲੀਡ ਸ਼ਾਮਲ ਕਰੋ (Add Lead)</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-3 rounded-xs border bg-card p-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="ਨਾਮ, ਫ਼ੋਨ, ਸਥਾਨ ਜਾਂ ਟਾਈਲ ਦੁਆਰਾ ਖੋਜੋ..."
                  className="w-full rounded-xs border border-input bg-background py-2 pl-9 pr-3 text-xs outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="rounded-xs border border-input bg-background px-3 py-2 text-xs font-medium outline-none focus:border-primary"
                >
                  <option value="all">ਸਾਰੀਆਂ ਸਥਿਤੀਆਂ (All Status)</option>
                  <option value="new">ਨਵੀਂ (New)</option>
                  <option value="contacted">ਸੰਪਰਕ ਕੀਤਾ (Contacted)</option>
                  <option value="deal_won">ਆਰਡਰ ਪੱਕਾ (Deal Won)</option>
                  <option value="completed">ਸੰਪੂਰਨ (Completed)</option>
                  <option value="cancelled">ਰੱਦ (Cancelled)</option>
                </select>
              </div>
            </div>

            {/* Leads List */}
            {filteredLeads.length === 0 ? (
              <div className="border bg-card p-12 text-center text-muted-foreground">
                <Inbox className="mx-auto h-12 w-12 opacity-30" />
                <p className="mt-3 font-display text-lg uppercase font-bold">
                  ਕੋਈ ਪੁੱਛਗਿੱਛ ਨਹੀਂ ਮਿਲੀ
                </p>
                <p className="text-xs">ਖੋਜ ਫਿਲਟਰ ਬਦਲੋ ਜਾਂ ਨਵੀਂ ਲੀਡ ਦਰਜ ਕਰੋ।</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((l) => (
                  <div
                    key={l.id}
                    className="border bg-card p-5 shadow-xs transition hover:border-primary/50"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                            {l.name}
                          </h3>
                          <span
                            className={`rounded-xs px-2.5 py-0.5 text-[11px] font-bold uppercase ${
                              l.status === "new"
                                ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                                : l.status === "deal_won"
                                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                  : l.status === "contacted"
                                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                    : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {l.status === "new"
                              ? "ਨਵੀਂ ਲੀਡ"
                              : l.status === "contacted"
                                ? "ਸੰਪਰਕ ਕੀਤਾ ਗਿਆ"
                                : l.status === "deal_won"
                                  ? "ਆਰਡਰ ਪੱਕਾ"
                                  : l.status === "completed"
                                    ? "ਸੰਪੂਰਨ"
                                    : "ਰੱਦ"}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          ਮਿਤੀ:{" "}
                          {new Date(l.createdAt).toLocaleDateString("pa-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      {/* Status Dropdown & Delete */}
                      <div className="flex items-center gap-2">
                        <select
                          value={l.status}
                          onChange={(e) =>
                            updateLeadStatus(l.id, e.target.value as StoredLead["status"])
                          }
                          className="rounded-xs border border-input bg-background px-3 py-1.5 text-xs font-semibold uppercase outline-none focus:border-primary"
                        >
                          <option value="new">ਨਵੀਂ ਲੀਡ</option>
                          <option value="contacted">ਸੰਪਰਕ ਕੀਤਾ</option>
                          <option value="deal_won">ਆਰਡਰ ਪੱਕਾ</option>
                          <option value="completed">ਸੰਪੂਰਨ</option>
                          <option value="cancelled">ਰੱਦ</option>
                        </select>
                        <button
                          onClick={() => deleteLead(l.id)}
                          className="rounded-xs border border-border p-1.5 text-muted-foreground hover:border-destructive hover:text-destructive cursor-pointer"
                          title="ਲੀਡ ਹਟਾਓ"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Lead Details Grid */}
                    <div className="mt-4 grid gap-3 rounded-xs bg-muted/40 p-4 sm:grid-cols-3 text-xs">
                      <div>
                        <span className="font-bold text-muted-foreground uppercase tracking-wider block">
                          ਟਾਈਲ ਦੀ ਕਿਸਮ:
                        </span>
                        <span className="font-semibold text-foreground">{l.tile}</span>
                      </div>
                      <div>
                        <span className="font-bold text-muted-foreground uppercase tracking-wider block">
                          ਲੋੜੀਂਦੀ ਮਾਤਰਾ:
                        </span>
                        <span className="font-semibold text-foreground">{l.quantity}</span>
                      </div>
                      <div>
                        <span className="font-bold text-muted-foreground uppercase tracking-wider block">
                          ਪ੍ਰੋਜੈਕਟ ਸਥਾਨ:
                        </span>
                        <span className="font-semibold text-foreground">{l.location}</span>
                      </div>
                      {l.message && (
                        <div className="sm:col-span-3 pt-2 border-t border-border/50">
                          <span className="font-bold text-muted-foreground uppercase tracking-wider block">
                            ਗਾਹਕ ਦਾ ਸੁਨੇਹਾ:
                          </span>
                          <p className="mt-1 text-foreground/90 font-pa">{l.message}</p>
                        </div>
                      )}
                    </div>

                    {/* Quick Contact Actions */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <a
                        href={`tel:${l.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-card px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5 text-primary" />
                        <span>ਕਾਲ ਕਰੋ: {l.phone}</span>
                      </a>
                      <a
                        href={whatsappUrl(
                          `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ${l.name} ਜੀ, ਪੰਜਾਬ ਇੰਟਰਲਾਕ ਟਾਈਲਸ ਵੱਲੋਂ ਤੁਹਾਡੀ "${l.tile}" ਸੰਬੰਧੀ ਪੁੱਛਗਿੱਛ ਲਈ ਸੰਪਰਕ ਕਰ ਰਹੇ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਦੱਸੋ ਕਿੰਨੀ ਮਾਤਰਾ ਵਿੱਚ ਟਾਈਲਾਂ ਦੀ ਲੋੜ ਹੈ?`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-shine inline-flex items-center gap-1.5 rounded-xs bg-[#25D366] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#20ba5a] transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>ਵਟਸਐਪ 'ਤੇ ਜਵਾਬ ਦਿਓ</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -----------------------------------------------------------
            TAB 3: BANNERS & ANNOUNCEMENTS MANAGEMENT
           ----------------------------------------------------------- */}
        {activeTab === "banners" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                  ਟੌਪ ਬੈਨਰ ਅਤੇ ਆਫਰ ਪ੍ਰਬੰਧਨ (Top Banners Manager)
                </h2>
                <p className="text-xs text-muted-foreground">
                  ਵੈੱਬਸਾਈਟ ਦੇ ਸਭ ਤੋਂ ਉੱਪਰ ਚੱਲਣ ਵਾਲੇ ਬੈਨਰਾਂ ਨੂੰ ਸ਼ਾਮਲ, ਸੰਪਾਦਿਤ ਜਾਂ ਬੰਦ/ਚਾਲੂ ਕਰੋ
                </p>
              </div>
              <button
                onClick={() => setShowAddBannerModal(true)}
                className="btn-shine inline-flex items-center gap-2 rounded-xs bg-primary px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-xs hover:bg-primary/95 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>ਨਵਾਂ ਬੈਨਰ ਸ਼ਾਮਲ ਕਰੋ (Add Banner)</span>
              </button>
            </div>

            {/* Live Banner Preview */}
            <div className="rounded-xs border border-primary/30 bg-card p-5 shadow-xs">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-primary block mb-3">
                ਲਾਈਵ ਬੈਨਰ ਪੂਰਵਦਰਸ਼ਨ (Real-Time Live Preview):
              </span>
              <div className="space-y-2">
                {banners.map((b) => (
                  <div
                    key={b.id}
                    className={`flex flex-wrap items-center justify-between gap-3 rounded-xs border p-3 text-xs transition-opacity ${
                      b.isActive
                        ? "border-primary/30 bg-gradient-to-r from-ink via-[#271d1a] to-ink text-ink-foreground"
                        : "border-border bg-muted/40 text-muted-foreground opacity-60"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-xs bg-primary/20 px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/40">
                        {b.badge}
                      </span>
                      <span className="font-pa font-medium">{b.text}</span>
                      {b.highlightText && (
                        <span className="rounded-xs bg-white/10 px-1.5 py-0.2 font-display text-[10px] font-semibold text-primary-foreground">
                          {b.highlightText}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {b.actionLabel && (
                        <span className="font-display text-[11px] font-bold uppercase text-primary underline">
                          {b.actionLabel} &rarr;
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs ${b.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-muted text-muted-foreground"}`}
                      >
                        {b.isActive ? "ਸਰਗਰਮ (Live)" : "ਬੰਦ (Off)"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banner Cards List */}
            <div className="space-y-4">
              {banners.map((b, idx) => (
                <div key={b.id} className="border bg-card p-5 shadow-xs">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-xs bg-ink font-display text-xs font-bold text-ink-foreground">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base font-bold uppercase text-foreground">
                            {b.badge}
                          </span>
                          <span
                            className={`rounded-xs px-2 py-0.5 text-[10px] font-bold uppercase ${
                              b.isActive
                                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {b.isActive ? "ਵੈੱਬਸਾਈਟ 'ਤੇ ਚਾਲੂ" : "ਬੰਦ"}
                          </span>
                        </div>
                        <p className="mt-1 font-pa text-sm text-foreground/90">{b.text}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBannerActive(b.id)}
                        className={`rounded-xs px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          b.isActive
                            ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/30"
                        }`}
                      >
                        {b.isActive ? "ਬੈਨਰ ਬੰਦ ਕਰੋ (Disable)" : "ਬੈਨਰ ਚਾਲੂ ਕਰੋ (Enable)"}
                      </button>
                      <button
                        onClick={() => deleteBanner(b.id)}
                        className="rounded-xs border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive cursor-pointer"
                        title="ਬੈਨਰ ਹਟਾਓ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 border-t pt-3 text-xs text-muted-foreground">
                    {b.highlightText && (
                      <span>
                        ਹਾਈਲਾਈਟ: <strong className="text-foreground">{b.highlightText}</strong>
                      </span>
                    )}
                    {b.actionLabel && (
                      <span>
                        ਬਟਨ: <strong className="text-foreground">{b.actionLabel}</strong>
                      </span>
                    )}
                    {b.actionUrl && (
                      <span>
                        ਲਿੰਕ: <strong className="text-foreground">{b.actionUrl}</strong>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------
            TAB 4: PRODUCTS / TILES CATALOG
           ----------------------------------------------------------- */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                ਟਾਈਲ ਕੈਟਾਲਾਗ ਅਤੇ ਰੇਟ (Products & Pricing)
              </h2>
              <p className="text-xs text-muted-foreground">
                ਟਾਈਲਾਂ ਦੇ ਵੇਰਵੇ, ਮੋਟਾਈ (Thickness) ਅਤੇ ਅਨੁਮਾਨਿਤ ਰੇਟ ਪ੍ਰਬੰਧਿਤ ਕਰੋ
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {products.map((p) => (
                <div key={p.id} className="border bg-card p-6 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                        {p.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{p.nameEn}</p>
                    </div>
                    <button
                      onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                      className={`rounded-xs px-2.5 py-1 text-[11px] font-bold uppercase transition cursor-pointer ${
                        p.inStock
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {p.inStock ? "ਸਟਾਕ ਉਪਲਬਧ" : "ਆਊਟ ਆਫ ਸਟਾਕ"}
                    </button>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-xs">
                    <div>
                      <label className="font-bold text-muted-foreground uppercase tracking-wider block">
                        ਰੇਟ / ਵਰਗ ਫੁੱਟ:
                      </label>
                      <input
                        type="text"
                        value={p.pricePerSqFt || ""}
                        onChange={(e) => updateProduct(p.id, { pricePerSqFt: e.target.value })}
                        placeholder="₹40 - ₹50"
                        className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-1.5 font-bold outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-muted-foreground uppercase tracking-wider block">
                        ਮੋਟਾਈ (Thickness):
                      </label>
                      <input
                        type="text"
                        value={p.thickness || ""}
                        onChange={(e) => updateProduct(p.id, { thickness: e.target.value })}
                        placeholder="60mm / 80mm"
                        className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-1.5 font-bold outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------
            TAB 5: REVIEWS
           ----------------------------------------------------------- */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                ਗਾਹਕਾਂ ਦੀਆਂ ਸਮੀਖਿਆਵਾਂ (Customer Reviews)
              </h2>
              <p className="text-xs text-muted-foreground">
                ਗੂਗਲ ਅਤੇ ਸਿੱਧੇ ਗਾਹਕਾਂ ਦੇ 5.0 ਸਟਾਰ ਰਿਵਿਊ ਪ੍ਰਬੰਧਿਤ ਕਰੋ
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border bg-card p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-amber-500">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 font-pa text-lg font-semibold text-foreground">“{r.text}”</p>
                  </div>
                  <div className="mt-6 border-t pt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">{r.name}</span>
                    <span>{r.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------
            TAB 6: SECURITY & SETTINGS
           ----------------------------------------------------------- */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                ਐਡਮਿਨ ਸੁਰੱਖਿਆ ਅਤੇ ਪਾਸਵਰਡ ਸੈਟਿੰਗਾਂ (Security Settings)
              </h2>
              <p className="text-xs text-muted-foreground">ਆਪਣਾ ਲੌਗਇਨ ਯੂਜ਼ਰਨੇਮ ਅਤੇ ਪਾਸਵਰਡ ਬਦਲੋ</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Change Password Form */}
              <div className="border bg-card p-6 shadow-xs sm:p-8">
                <div className="flex items-center gap-2 font-display text-xl font-bold uppercase text-foreground">
                  <KeyRound className="h-5 w-5 text-primary" />
                  <span>ਕ੍ਰੈਡੈਂਸ਼ਿਅਲ ਅੱਪਡੇਟ ਕਰੋ (Update Credentials)</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  ਸੁਰੱਖਿਆ ਲਈ ਮਜ਼ਬੂਤ ਪਾਸਵਰਡ ਚੁਣੋ (ਅੱਖਰ, ਅੰਕ ਅਤੇ ਵਿਸ਼ੇਸ਼ ਚਿੰਨ੍ਹ ਸ਼ਾਮਲ ਕਰੋ)।
                </p>

                <form onSubmit={handleUpdateCredentials} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      ਨਵਾਂ ਯੂਜ਼ਰਨੇਮ (New Username)
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="mt-1.5 w-full rounded-xs border border-input bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      ਨਵਾਂ ਪਾਸਵਰਡ (New Password)
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="ਘੱਟੋ-ਘੱਟ 8 ਅੱਖਰਾਂ ਦਾ ਮਜ਼ਬੂਤ ਪਾਸਵਰਡ"
                      className="mt-1.5 w-full rounded-xs border border-input bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ (Confirm Password)
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="ਨਵਾਂ ਪਾਸਵਰਡ ਦੁਬਾਰਾ ਭਰੋ"
                      className="mt-1.5 w-full rounded-xs border border-input bg-background px-3.5 py-2.5 text-sm font-medium outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-shine flex w-full items-center justify-center gap-2 rounded-xs bg-primary py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-md hover:bg-primary/95 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>ਪਾਸਵਰਡ ਸੇਵ ਕਰੋ (Save Password)</span>
                  </button>
                </form>
              </div>

              {/* Current Credentials and Business Summary */}
              <div className="space-y-6">
                <div className="border bg-card p-6 shadow-xs">
                  <div className="flex items-center gap-2 font-display text-xl font-bold uppercase text-foreground">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    <span>ਮੌਜੂਦਾ ਸਰਗਰਮ ਕ੍ਰੈਡੈਂਸ਼ਿਅਲ (Current Credentials)</span>
                  </div>
                  <div className="mt-4 space-y-2 rounded-xs bg-muted/40 p-4 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Username:</span>
                      <span className="font-bold text-foreground">{currentCreds.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Password:</span>
                      <span className="font-bold text-primary">{currentCreds.password}</span>
                    </div>
                  </div>
                </div>

                <div className="border bg-card p-6 shadow-xs">
                  <h3 className="font-display text-xl font-bold uppercase text-foreground">
                    ਕਾਰੋਬਾਰ ਸੰਪਰਕ ਜਾਣਕਾਰੀ (Business Info)
                  </h3>
                  <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <p>
                      <strong className="text-foreground">ਫ਼ੋਨ:</strong> {BUSINESS.phone}
                    </p>
                    <p>
                      <strong className="text-foreground">ਵਟਸਐਪ:</strong> +{BUSINESS.whatsapp}
                    </p>
                    <p>
                      <strong className="text-foreground">ਪਤਾ:</strong> {BUSINESS.address}
                    </p>
                    <p>
                      <strong className="text-foreground">ਇੰਸਟਾਗ੍ਰਾਮ:</strong>{" "}
                      {BUSINESS.instagramHandle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* -----------------------------------------------------------
          MODAL: ADD NEW LEAD
         ----------------------------------------------------------- */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg border bg-card p-6 shadow-2xl sm:p-8">
            <h3 className="font-display text-2xl font-bold uppercase text-foreground">
              ਨਵੀਂ ਲੀਡ ਦਰਜ ਕਰੋ (Add Customer Inquiry)
            </h3>
            <p className="text-xs text-muted-foreground">
              ਫ਼ੋਨ ਜਾਂ ਸਾਈਟ ਵਿਜ਼ਿਟ 'ਤੇ ਆਏ ਗਾਹਕ ਦੀ ਜਾਣਕਾਰੀ ਸ਼ਾਮਲ ਕਰੋ
            </p>

            <form onSubmit={handleCreateLead} className="mt-5 space-y-3.5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block">
                  ਗਾਹਕ ਦਾ ਨਾਮ *
                </label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="ਜਿਵੇਂ ਕੁਲਦੀਪ ਸਿੰਘ"
                  className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block">
                  ਫ਼ੋਨ / ਵਟਸਐਪ ਨੰਬਰ *
                </label>
                <input
                  type="tel"
                  required
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block">
                    ਟਾਈਲ ਦੀ ਕਿਸਮ
                  </label>
                  <select
                    value={newLeadTile}
                    onChange={(e) => setNewLeadTile(e.target.value)}
                    className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block">
                    ਲੋੜੀਂਦੀ ਮਾਤਰਾ
                  </label>
                  <input
                    type="text"
                    value={newLeadQty}
                    onChange={(e) => setNewLeadQty(e.target.value)}
                    placeholder="2000 ਵਰਗ ਫੁੱਟ"
                    className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block">
                  ਪ੍ਰੋਜੈਕਟ ਸਥਾਨ
                </label>
                <input
                  type="text"
                  value={newLeadLoc}
                  onChange={(e) => setNewLeadLoc(e.target.value)}
                  placeholder="ਗਹਿਰੀ ਬੁੱਟਰ, ਬਠਿੰਡਾ"
                  className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block">
                  ਨੋਟਸ / ਸੁਨੇਹਾ
                </label>
                <textarea
                  rows={2}
                  value={newLeadMsg}
                  onChange={(e) => setNewLeadMsg(e.target.value)}
                  placeholder="ਕੋਈ ਵਿਸ਼ੇਸ਼ ਰੰਗ ਜਾਂ ਡਿਲੀਵਰੀ ਸੰਬੰਧੀ ਜਾਣਕਾਰੀ..."
                  className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="rounded-xs border border-border px-4 py-2 font-display text-xs font-bold uppercase cursor-pointer"
                >
                  ਰੱਦ ਕਰੋ
                </button>
                <button
                  type="submit"
                  className="btn-shine rounded-xs bg-primary px-5 py-2 font-display text-xs font-bold uppercase text-primary-foreground cursor-pointer"
                >
                  ਦਰਜ ਕਰੋ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------
          MODAL: ADD NEW BANNER
         ----------------------------------------------------------- */}
      {showAddBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg border bg-card p-6 shadow-2xl sm:p-8">
            <h3 className="font-display text-2xl font-bold uppercase text-foreground">
              ਨਵਾਂ ਬੈਨਰ ਸ਼ਾਮਲ ਕਰੋ (Add Top Banner)
            </h3>
            <p className="text-xs text-muted-foreground">ਇਹ ਬੈਨਰ ਵੈੱਬਸਾਈਟ ਦੇ ਸਭ ਤੋਂ ਉੱਪਰ ਚੱਲੇਗਾ</p>

            <form onSubmit={handleCreateBanner} className="mt-5 space-y-3.5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider block">
                  ਬੈਜ ਲੇਬਲ (Badge) *
                </label>
                <input
                  type="text"
                  required
                  value={newBannerBadge}
                  onChange={(e) => setNewBannerBadge(e.target.value)}
                  placeholder="ਜਿਵੇਂ ਧਮਾਕਾ ਆਫਰ, ਸੀਮਤ ਆਫਰ"
                  className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block">
                  ਬੈਨਰ ਸੁਨੇਹਾ (Punjabi Text) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newBannerText}
                  onChange={(e) => setNewBannerText(e.target.value)}
                  placeholder="ਜਿਵੇਂ: ਸਿੱਧਾ ਫੈਕਟਰੀ ਰੇਟ 'ਤੇ ਪ੍ਰੀਮੀਅਮ ਇੰਟਰਲਾਕ ਟਾਈਲਾਂ — ਹੁਣੇ ਕਾਲ ਕਰੋ!"
                  className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block">
                    ਹਾਈਲਾਈਟ ਸ਼ਬਦ (Optional)
                  </label>
                  <input
                    type="text"
                    value={newBannerHighlight}
                    onChange={(e) => setNewBannerHighlight(e.target.value)}
                    placeholder="ਜਿਵੇਂ ਵਿਸ਼ੇਸ਼ ਛੋਟ"
                    className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block">
                    ਬਟਨ ਲੇਬਲ (Button Text)
                  </label>
                  <input
                    type="text"
                    value={newBannerActionLabel}
                    onChange={(e) => setNewBannerActionLabel(e.target.value)}
                    placeholder="ਰੇਟ ਪੁੱਛੋ"
                    className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider block">
                  ਲਿੰਕ (Target URL)
                </label>
                <input
                  type="text"
                  value={newBannerActionUrl}
                  onChange={(e) => setNewBannerActionUrl(e.target.value)}
                  placeholder="/contact ਜਾਂ /products"
                  className="mt-1 w-full rounded-xs border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddBannerModal(false)}
                  className="rounded-xs border border-border px-4 py-2 font-display text-xs font-bold uppercase cursor-pointer"
                >
                  ਰੱਦ ਕਰੋ
                </button>
                <button
                  type="submit"
                  className="btn-shine rounded-xs bg-primary px-5 py-2 font-display text-xs font-bold uppercase text-primary-foreground cursor-pointer"
                >
                  ਬੈਨਰ ਬਣਾਓ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
