import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/hooks/useRole";
import {
  LayoutDashboard, BookOpen, Calendar, Briefcase,
  MessageSquare, Bell, Users, LogOut, ChevronLeft, ChevronRight,
  Shield, FileText, User,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const studentNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Notes", path: "/dashboard/notes" },
  { icon: Calendar, label: "Events", path: "/dashboard/events" },
  { icon: Briefcase, label: "Internships", path: "/dashboard/internships" },
  { icon: MessageSquare, label: "Complaints", path: "/dashboard/complaints" },
  { icon: Bell, label: "Announcements", path: "/dashboard/announcements" },
  { icon: Users, label: "Clubs", path: "/dashboard/clubs" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
];

const adminNavItems = [
  { icon: Shield, label: "Admin Overview", path: "/dashboard/admin" },
  { icon: FileText, label: "Notes", path: "/dashboard/admin/notes" },
  { icon: Briefcase, label: "Internships", path: "/dashboard/admin/internships" },
  { icon: Calendar, label: "Events", path: "/dashboard/admin/events" },
  { icon: MessageSquare, label: "Complaints", path: "/dashboard/admin/complaints" },
  { icon: Bell, label: "Announcements", path: "/dashboard/admin/announcements" },
  { icon: Users, label: "Clubs", path: "/dashboard/admin/clubs" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { role, isAdmin } = useRole();

  const isAdminView = location.pathname.startsWith("/dashboard/admin");
  const navItems = isAdmin ? (isAdminView ? adminNavItems : studentNavItems) : studentNavItems;

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.2 }}
      className="sticky top-0 flex h-screen flex-col border-r border-border bg-sidebar"
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">C1</span>
            </div>
            <span className="text-base font-semibold text-foreground">Campus One</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">C1</span>
          </div>
        )}
      </div>

      {/* Role toggle for admin */}
      {isAdmin && !collapsed && (
        <div className="px-3 pb-2">
          <div className="flex rounded-lg overflow-hidden border border-border">
            <Link to="/dashboard"
              className={cn("flex-1 py-1.5 text-center text-xs font-medium transition-colors",
                !isAdminView ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-sidebar-accent")}>
              Student
            </Link>
            <Link to="/dashboard/admin"
              className={cn("flex-1 py-1.5 text-center text-xs font-medium transition-colors",
                isAdminView ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-sidebar-accent")}>
              Admin
            </Link>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
        {navItems.map((item) => {
          const active = item.path === "/dashboard"
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg p-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>

      <div className="border-t border-border p-2">
        <button
          onClick={async () => { await signOut(); navigate('/login'); }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent"
        >
          <LogOut size={18} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
