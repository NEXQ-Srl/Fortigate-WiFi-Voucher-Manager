import VoucherListArea from "@/components/VoucherList/VoucherListArea";

// VoucherList page that displays a list of generated vouchers
const VoucherList = () => {

  //const selectedFirewall = useSelector((state: RootState) => state.firewall.selectedFirewall);
  
    return (
      <div className="flex flex-col gap-4">
        <div>
          {/* Page title and description */}
          <h1 className="text-2xl font-bold tracking-tight">Voucher List {/*selectedFirewall?.FIREWALL && `for ${selectedFirewall?.FIREWALL}`*/}</h1>
          <p className="text-muted-foreground">View and manage all guest WiFi vouchers</p>
        </div>
        {/* Render the voucher list area */}
        <VoucherListArea />
      </div>
    );
  };
  
  export default VoucherList;
