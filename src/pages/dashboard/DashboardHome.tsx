import { motion } from "framer-motion";
import { BookOpen, Calendar, Briefcase, Bell, ArrowRight, Loader2, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/hooks/useRole";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const DashboardHome = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("full_name").eq("id", user!.id).single();
      return data;
    },
  });

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements_home"],
    queryFn: async () => {
      const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(3);
      return data ?? [];
    },
  });

  const { data: events = [] } = useQuery({
    queryKey: ["events_home"],
    queryFn: async () => {
      const { data } = await supabase.from("events").select("*").eq("status", "active").order("event_date", { ascending: true }).limit(3);
      return data ?? [];
    },
  });

  const { data: internships = [] } = useQuery({
    queryKey: ["internships_home"],
    queryFn: async () => {
      const { data } = await supabase.from("internships").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(2);
      return data ?? [];
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["dashboard_stats"],
    queryFn: async () => {
      const [ann, evts, interns, notes] = await Promise.all([
        supabase.from("announcements").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("internships").select("id", { count: "exact", head: true }).eq("status", "approved"),
        supabase.from("notes").select("id", { count: "exact", head: true }).eq("status", "approved"),
      ]);
      return {
        announcements: ann.count ?? 0,
        events: evts.count ?? 0,
        internships: interns.count ?? 0,
        notes: notes.count ?? 0,
      };
    },
  });

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const typeColors: Record<string, string> = {
    Hackathon: "bg-primary/10 text-primary",
    Workshop: "bg-accent text-accent-foreground",
    Festival: "bg-primary/10 text-primary",
    Event: "bg-accent text-accent-foreground",
    Competition: "bg-primary/10 text-primary",
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-foreground">
          {greeting()}, {profile?.full_name?.split(" ")[0] ?? "Student"} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">Here's what's happening on campus today.</p>
        {role && role !== "student" && (
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
            {role} account
          </div>
        )}
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { icon: Bell, label: "Announcements", value: stats?.announcements ?? "—" },
          { icon: Calendar, label: "Active Events", value: stats?.events ?? "—" },
          { icon: Briefcase, label: "Open Internships", value: stats?.internships ?? "—" },
          { icon: BookOpen, label: "Approved Notes", value: stats?.notes ?? "—" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <s.icon size={18} className="text-primary" />
            <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Announcements */}
      <motion.div variants={item}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Latest Announcements</h2>
          <Link to="/dashboard/announcements" className="flex items-center gap-1 text-xs text-primary hover:underline">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        {announcements.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">No announcements yet.</p>
        ) : (
          <div className="space-y-2">
            {announcements.map((a) => (
              <div key={a.id} className="flex items-start justify-between rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  {a.urgent && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  <span className="text-sm text-foreground">{a.title}</span>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{formatDistanceToNow(new Date(a.created_at), { addSuffix: true })}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Events */}
      <motion.div variants={item}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
          <Link to="/dashboard/events" className="flex items-center gap-1 text-xs text-primary hover:underline">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        {events.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">No upcoming events.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {events.map((e) => (
              <motion.div key={e.id} whileHover={{ y: -2 }}
                className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[e.type] ?? "bg-accent text-accent-foreground"}`}>
                  {e.type}
                </span>
                <h3 className="mt-3 font-medium text-foreground">{e.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{e.location}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Internships */}
      <motion.div variants={item}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Latest Internships</h2>
          <Link to="/dashboard/internships" className="flex items-center gap-1 text-xs text-primary hover:underline">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        {internships.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">No open internships yet.</p>
        ) : (
          <div className="space-y-2">
            {internships.map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div>
                  <p className="font-medium text-foreground">{i.role}</p>
                  <p className="text-xs text-muted-foreground">{i.company} · {i.location}</p>
                </div>
                <span className="text-sm font-medium text-foreground">{i.stipend}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DashboardHome;
