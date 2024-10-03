import Protected from "@/utils/Protected";


export default function DashboardLayout({ children }) {
    return (
        <Protected>
            {children}
            </Protected>
    );
  }