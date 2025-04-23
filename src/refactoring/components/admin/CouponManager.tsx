import { useState } from 'react';
import { Coupon } from '../../../types.ts';
import { SectionTitle } from '../layout/SectionTitle.tsx';
import { CardBox } from '../layout/CardBox.tsx';
import { Input } from '../shared/Input.tsx';

interface Props {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const CouponManager = ({ coupons, onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0,
    });
  };
  return (
    <div>
      <SectionTitle sectionTitle={'쿠폰 관리'} />
      <CardBox>
        <div className="space-y-2 mb-4">
          <Input
            id="coupon-name"
            type="text"
            placeholder="쿠폰 이름"
            value={newCoupon.name}
            onChange={e => setNewCoupon({ ...newCoupon, name: e.target.value })}
          />
          <Input
            id="coupon-code"
            type="text"
            placeholder="쿠폰 코드"
            value={newCoupon.code}
            onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value })}
          />
          <div className="flex gap-2">
            <select
              value={newCoupon.discountType}
              onChange={e =>
                setNewCoupon({
                  ...newCoupon,
                  discountType: e.target.value as 'amount' | 'percentage',
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="amount">금액(원)</option>
              <option value="percentage">할인율(%)</option>
            </select>
            <Input
              id="discount-value"
              type="number"
              placeholder="할인 값"
              value={newCoupon.discountValue}
              onChange={e =>
                setNewCoupon({
                  ...newCoupon,
                  discountValue: parseInt(e.target.value),
                })
              }
            />
          </div>
          <button
            onClick={handleAddCoupon}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            쿠폰 추가
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
          <div className="space-y-2">
            {coupons.map((coupon, index) => (
              <div
                key={index}
                data-testid={`coupon-${index + 1}`}
                className="bg-gray-100 p-2 rounded"
              >
                {coupon.name} ({coupon.code}):
                {coupon.discountType === 'amount'
                  ? `${coupon.discountValue}원`
                  : `${coupon.discountValue}%`}{' '}
                할인
              </div>
            ))}
          </div>
        </div>
      </CardBox>
    </div>
  );
};
