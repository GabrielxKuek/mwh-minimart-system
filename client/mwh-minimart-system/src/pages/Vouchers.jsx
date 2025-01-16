import { useState, useEffect, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import VoucherCard from "../components/voucher/VoucherCard";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVouchers = useCallback(async () => {
    try {
      const dummyVouchers = [
        {
          code: "OEO2H",
          createdAt: "January 16, 2025 at 3:51:18 AM UTC+8",
          points_cost: 10,
          productId: [{ zZplkwEvX17jr7Vp8R5c: 1 }],
          purchaseQuantity: 1,
          status: "unclaimed"
        },
      ];
      setVouchers(dummyVouchers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Vouchers
      </h1>
      <Separator className="my-4" />
      
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vouchers.map((voucher) => (
            <VoucherCard
              key={voucher.code}
              voucher={voucher}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Vouchers;