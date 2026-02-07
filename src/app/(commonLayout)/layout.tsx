import { Navbar1 } from "@/components/layouts/navbar1";
import { Navbar2 } from "@/components/layouts/navbar2";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar1 />
      <Navbar2 />
      <div className="w-[90%] mx-auto">{children}</div>
    </div>
  );
}
