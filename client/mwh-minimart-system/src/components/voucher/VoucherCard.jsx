import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import PropTypes from 'prop-types';
import { useState } from 'react';
import VoucherDetailsDialog from './VoucherDetailsDialog';

const formatDateTime = (dateString) => {
    return dateString;
};

const VoucherCard = ({ voucher }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
        <Card className="h-full">
            <CardHeader className="space-y-4">
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-semibold text-indigo-700">
                {voucher.code}
                </CardTitle>
                <Badge 
                variant="secondary" 
                className={`${
                    voucher.status === "unclaimed"
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
                >
                {voucher.status}
                </Badge>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    <span>Created</span>
                </div>
                <span className="text-sm font-medium pl-6 text-gray-500">
                    {formatDateTime(voucher.createdAt)}
                </span>
            </div>
            </CardHeader>
            <CardContent>
            <Button
                variant="outline"
                className="w-full border-indigo-200 hover:bg-indigo-50"
                onClick={() => setShowDetails(true)}
            >
                View Details
            </Button>
            </CardContent>
        </Card>

        <VoucherDetailsDialog 
            open={showDetails} 
            onOpenChange={setShowDetails}
            voucher={voucher}
        />
        </>
    );
};

VoucherCard.propTypes = {
    voucher: PropTypes.shape({
        code: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        productId: PropTypes.arrayOf(PropTypes.object).isRequired,
        points_cost: PropTypes.number.isRequired,
        purchaseQuantity: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
    }).isRequired,
};

export default VoucherCard;