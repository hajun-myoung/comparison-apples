// 가격을 다시 조사할 때 이 날짜와 아래 가격을 함께 수정하세요.
export const lastUpdated = "2026-09-28";

export const stores = [
  { id: "apple", name: "Apple 기본" },
  { id: "education", name: "Apple 교육 할인" },
  { id: "coupang", name: "Coupang", detail: "공식 Apple 리셀러" },
];

const imageBase =
  "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/";
export const groups = [
  {
    id: "ipad-pro",
    label: "iPad Pro",
    category: "iPad",
    description: "최저 사양 · 256GB",
    image: `${imageBase}ipad-compare-header-pro-202405?wid=392&hei=398&fmt=png-alpha&.v=bk5Ha2llcUlIczRSRUt0WDVzK2I3aEpsdjhCN0cycWFLRklRalhsdmV1Y1k2Q3FubUg5cC93VlMzQkExanhMSzAzOVFHb3N0MkVmS01ZcFh0d1Y4R21yc3hpVFRmZnBDMzlsazg4c2M0Vk0`,
    products: [
      {
        id: "ipad-pro-13",
        name: "iPad Pro 13",
        variant: "13형",
        prices: { apple: 2499000, education: 2330000, coupang: 2302560 },
      },
      {
        id: "ipad-pro-11",
        name: "iPad Pro 11",
        variant: "11형",
        prices: { apple: 1999000, education: 1830000, coupang: 2184570 },
      },
    ],
  },
  {
    id: "ipad-air",
    label: "iPad Air",
    category: "iPad",
    description: "최저 사양 · 128GB",
    image: `${imageBase}ipad-compare-header-air-202405?wid=392&hei=398&fmt=png-alpha&.v=bk5Ha2llcUlIczRSRUt0WDVzK2I3aEp0T1lvbEU5VzVUeFMyYUl3ZjA1RVk2Q3FubUg5cC93VlMzQkExanhMSzAzOVFHb3N0MkVmS01ZcFh0d1Y4R2hvR0JUOE5DanRnclpMbkNkbll4VFE`,
    products: [
      {
        id: "ipad-air-13",
        name: "iPad Air 13",
        variant: "13형",
        prices: { apple: 1549000, education: 1470000, coupang: 1378610 },
      },
      {
        id: "ipad-air-11",
        name: "iPad Air 11",
        variant: "11형",
        prices: { apple: 1249000, education: 1170000, coupang: 1060440 },
      },
    ],
  },
  {
    id: "mac-mini",
    label: "Mac mini",
    category: "Mac",
    description: "M6 · 32GB 메모리 · 1TB 저장 공간 · 10GiB",
    image: `${imageBase}store-card-13-mac-nav-202603?wid=400&hei=260&fmt=png-alpha&.v=M1Q3OGxnb1lBaHhqNjZ2OVRXZmx4V2duSGVkdTVncGZYc0RnS1paU3IySCsrUlZaSVRoWVYzU0Qra0FoTmUwNng2bitObzZwQzk4cEorV1dZdzhIazAreDNWYWNLK1lESGRXY25VRzdWVTQ`,
    products: [
      {
        id: "mac-mini-m6",
        name: "Mac mini M6",
        variant: "32GB · 1TB · 10GiB",
        prices: { apple: 3199000, education: 2927000, coupang: null },
      },
    ],
  },
  {
    id: "airpods",
    label: "AirPods",
    category: "AirPods",
    description: "모델별 가격 비교",
    image: `${imageBase}store-card-13-airpods-nav-202509?wid=400&hei=260&fmt=png-alpha&.v=Q0Z1bWFqMUpRRnp3T0Y0VWJpdk1yMDhFUStvWHB3SDlDa3VrdUZORWRqeld1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VGZUMjJQZFhhT2thWmkxZjhra3FyZEk`,
    products: [
      {
        id: "airpods-5",
        name: "AirPods 5",
        variant: "5세대",
        prices: { apple: 199000, education: 199000, coupang: 194620 },
      },
      {
        id: "airpods-pro-3",
        name: "AirPods Pro 3",
        variant: "Pro 3세대",
        prices: { apple: 369000, education: 369000, coupang: 299000 },
      },
    ],
  },
  {
    id: "watch",
    label: "Apple Watch",
    category: "Watch",
    description: "알루미늄 · Wi-Fi",
    image: `${imageBase}store-card-13-watch-nav-202609_GEO_KR?wid=400&hei=260&fmt=png-alpha&.v=S0tSVzBtSkRkSFFhMm1zS1NmeWtkeE9WMkZMMjB1Njd1c1lXRUh5b1BXRHpDdEdXaWt6NjBMRStVQlhJWGNVNGM5THdmR1U4Nmp4b2NFbEg2N21UQ3dlUGMrVElneS8rRUJTWVNUYjQ2N3NwT1BKZjF3cWxxdVZWenJZa2tlelI`,
    products: [
      {
        id: "watch-12",
        name: "Apple Watch 12",
        variant: "42mm · 알루미늄 · Wi-Fi",
        prices: { apple: 599000, education: 540000, coupang: 585820 },
      },
      {
        id: "watch-se3",
        name: "Apple Watch SE3",
        variant: "40mm · 알루미늄 · Wi-Fi",
        prices: { apple: 369000, education: 339000, coupang: 360880 },
      },
    ],
  },
];

// 2026년 9월 28일 확인: https://www.inicis.com/apple/popup/retail.html
export const installmentGuide = {
  source: "https://www.inicis.com/apple/popup/retail.html",
  special: {
    period: "2026.04.20 – 2026.12.31",
    cards: ["하나카드", "신한카드", "현대카드", "KB국민카드", "삼성카드"],
    minimum: 400000,
    extendedMinimum: 1200000,
  },
  general: {
    period: "2026.09.01 – 2026.09.30",
    minimum: 50000,
    cards: [
      { name: "현대카드", months: "2–3개월" },
      { name: "롯데카드", months: "2–5개월" },
      { name: "KB국민카드", months: "2–3개월" },
      { name: "신한카드", months: "2–3개월" },
      { name: "삼성카드", months: "2–3개월" },
      { name: "BC카드", months: "2–6개월" },
      { name: "NH농협카드", months: "2–6개월" },
      { name: "우리카드", months: "2–6개월" },
      { name: "하나카드", months: "2–5개월" },
      { name: "광주은행카드", months: "2–6개월" },
    ],
  },
  partial: {
    period: "2026.09.01 – 2026.09.30",
    cards: [
      {
        name: "BC카드",
        plans: [
          ["6개월", "1–3회차", "4–6회차"],
          ["10개월", "1–4회차", "5–10회차"],
          ["12개월", "1–5회차", "6–12회차"],
        ],
      },
      {
        name: "NH농협카드",
        plans: [
          ["7개월", "1–3회차", "4–7회차"],
          ["8개월", "1–3회차", "4–8회차"],
          ["9개월", "1–3회차", "4–9회차"],
          ["10개월", "1–3회차", "4–10회차"],
          ["12개월", "1–4회차", "5–12회차"],
        ],
      },
      {
        name: "우리카드",
        plans: [
          ["10개월", "1–4회차", "5–10회차"],
          ["12개월", "1–5회차", "6–12회차"],
        ],
      },
    ],
  },
};
