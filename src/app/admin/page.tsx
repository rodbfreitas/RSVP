import { requireAdminOrRedirect } from "@/lib/supabase/server";
import { getStats, listGuests, getAllSports } from "./actions";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  await requireAdminOrRedirect();

  const [stats, guests, sports] = await Promise.all([
    getStats(),
    listGuests(),
    getAllSports(),
  ]);

  return (
    <main className="max-w-[1200px] mx-auto px-5 md:px-8 py-8 md:py-12">
      <AdminDashboard initialStats={stats} initialGuests={guests} allSports={sports} />
    </main>
  );
}
