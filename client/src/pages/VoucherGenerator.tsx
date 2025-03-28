import VoucherForm from "@/components/VoucherGenerator/VoucherForm";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

// VoucherGenerator page that renders the voucher generation form
const VoucherGenerator = () => {
  // Retrieve the selected firewall from the Redux store
  const selectedFirewall = useSelector((state: RootState) => state.firewall.selectedFirewall);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {/* Page title and description */}
        <h1 className="text-2xl font-bold tracking-tight">
          Generate Voucher {selectedFirewall?.FIREWALL && `for ${selectedFirewall?.FIREWALL}`}
        </h1>
        <p className="text-muted-foreground">Create a new WiFi voucher for a guest</p>
      </div>
      {/* Render the voucher form */}
      <VoucherForm />
    </div>
  );
};

export default VoucherGenerator;
