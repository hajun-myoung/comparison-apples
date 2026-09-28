// Update this date whenever the prices below are refreshed. Use local calendar dates.
export const lastUpdated = '2026-09-28';

export const stores = [
  { id: 'apple', name: 'Apple 기본', shortName: 'Apple 기본' },
  { id: 'education', name: 'Apple 교육 할인', shortName: '교육 할인' },
  { id: 'coupang', name: 'Coupang', shortName: 'Coupang', detail: '공식 Apple 리셀러' },
];

// null means that no listing was available in the source at the time of update.
export const groups = [
  {
    id: 'ipad-pro', label: 'iPad Pro', category: 'iPad', description: '최저 사양 · 256GB',
    products: [
      { id: 'ipad-pro-13', name: 'iPad Pro 13', variant: '13형', prices: { apple: 2499000, education: 2330000, coupang: 2302560 } },
      { id: 'ipad-pro-11', name: 'iPad Pro 11', variant: '11형', prices: { apple: 1999000, education: 1830000, coupang: 2184570 } },
    ],
  },
  {
    id: 'ipad-air', label: 'iPad Air', category: 'iPad', description: '최저 사양 · 128GB',
    products: [
      { id: 'ipad-air-13', name: 'iPad Air 13', variant: '13형', prices: { apple: 1549000, education: 1170000, coupang: 1378610 } },
      { id: 'ipad-air-11', name: 'iPad Air 11', variant: '11형', prices: { apple: 1249000, education: 1470000, coupang: 1060440 } },
    ],
  },
  {
    id: 'mac-mini', label: 'Mac mini', category: 'Mac', description: 'M6 · 32GB 메모리 · 1TB 저장 공간 · 10GiB',
    products: [
      { id: 'mac-mini-m6', name: 'Mac mini M6', variant: '32GB · 1TB · 10GiB', prices: { apple: 3199000, education: 2927000, coupang: null } },
    ],
  },
  {
    id: 'airpods', label: 'AirPods', category: 'AirPods', description: '모델별 가격 비교',
    products: [
      { id: 'airpods-5', name: 'AirPods 5', variant: '5세대', prices: { apple: 199000, education: 199000, coupang: 194620 } },
      { id: 'airpods-pro-3', name: 'AirPods Pro 3', variant: 'Pro 3세대', prices: { apple: 369000, education: 369000, coupang: 299000 } },
    ],
  },
  {
    id: 'watch', label: 'Apple Watch', category: 'Watch', description: '알루미늄 · Wi-Fi',
    products: [
      { id: 'watch-12', name: 'Apple Watch 12', variant: '42mm · 알루미늄 · Wi-Fi', prices: { apple: 599000, education: 540000, coupang: 585820 } },
      { id: 'watch-se3', name: 'Apple Watch SE3', variant: '40mm · 알루미늄 · Wi-Fi', prices: { apple: 369000, education: 339000, coupang: 360880 } },
    ],
  },
];

export const notes = [
  'Apple 기본: 40만 원 이상 12개월, 120만 원 이상 18개월 무이자 할부 가능',
  'Apple 교육 할인 및 Coupang: 카드사별 상이, 3–6개월 무이자 할부 가능',
  'iPad 가격은 최저 사양 기준입니다. Pro는 256GB, Air는 128GB입니다.',
];
