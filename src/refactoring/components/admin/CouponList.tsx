import { Coupon } from '../../types';
import { formatDiscountValue } from '../../utils/coupon';

interface Props {
  coupons: Coupon[];
}

export const CouponList = ({ coupons }: Props) => {
  if (coupons.length === 0) {
    return <p className="text-sm text-gray-500">등록된 쿠폰이 없습니다.</p>;
  }

  return (
    <div className="space-y-2">
      {coupons.map((coupon, index) => (
        <div
          key={index}
          data-testid={`coupon-${index + 1}`}
          className="bg-gray-100 p-2 rounded"
        >
          {coupon.name} ({coupon.code}):
          {formatDiscountValue(coupon.discountType, coupon.discountValue)} 할인
        </div>
      ))}
    </div>
  );
};
