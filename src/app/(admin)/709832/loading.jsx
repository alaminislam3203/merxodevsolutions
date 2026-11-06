import AdminLoader from "@/components/AdminLoader";

export default function AdminRouteLoading() {
  return (
    <AdminLoader
      title="Loading Workspace Module"
      label="Fetching real-time database records"
    />
  );
}
