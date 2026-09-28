// 가격을 다시 조사할 때 이 날짜와 아래 가격을 함께 수정하세요.
export const lastUpdated = "2026-09-28";

export const stores = [
  { id: "apple", name: "Apple 기본" },
  { id: "education", name: "Apple 교육 할인" },
  { id: "coupang", name: "Coupang", detail: "공식 Apple 리셀러" },
];

// Watch 가격은 Apple의 판매 페이지에 표시된 시작가와 크기·연결성 차액을 기준으로 계산합니다.
// 스테인리스 스틸은 밀레니즈 루프(+70,000원)를 대표 구성으로 사용합니다.
// Coupang은 동일한 옵션의 판매가를 확인한 경우에만 표시합니다.
export const watchSources = {
  apple: {
    series: "https://www.apple.com/kr/shop/buy-watch/apple-watch",
    se: "https://www.apple.com/kr/shop/buy-watch/apple-watch-se",
  },
  education: {
    series: "https://www.apple.com/kr-edu/shop/buy-watch/apple-watch",
    se: "https://www.apple.com/kr-edu/shop/buy-watch/apple-watch-se",
  },
};

const watchBasePrices = {
  series: {
    aluminum: {
      small: { gps: { apple: 599000, education: 540000 }, cellular: { apple: 749000, education: 670000 } },
      large: { gps: { apple: 669000, education: 610000 }, cellular: { apple: 819000, education: 740000 } },
    },
    titanium: {
      small: { cellular: { apple: 999000, education: 890000 } },
      large: { cellular: { apple: 1069000, education: 960000 } },
    },
    ceramic: {
      small: { cellular: { apple: 1399000, education: 1260000 } },
      large: { cellular: { apple: 1469000, education: 1330000 } },
    },
  },
  se: {
    aluminum: {
      small: { gps: { apple: 369000, education: 339000 }, cellular: { apple: 439000, education: 409000 } },
      large: { gps: { apple: 409000, education: 379000 }, cellular: { apple: 479000, education: 449000 } },
    },
  },
};

export function watchProducts({ size, connectivity, casing, band }) {
  return [
    { id: "watch-12", model: "series", name: "Apple Watch Series 12", mm: size === "small" ? 42 : 46 },
    { id: "watch-se3", model: "se", name: "Apple Watch SE 3", mm: size === "small" ? 40 : 44 },
  ].map(({ id, model, name, mm }) => {
    const base = watchBasePrices[model]?.[casing]?.[size]?.[connectivity];
    const premium = band === "premium" ? 70000 : 0;
    const originalCoupang = size === "small" && connectivity === "gps" && casing === "aluminum" && band === "basic";
    return {
      id,
      name,
      variant: `${mm}mm · ${{ aluminum: "알루미늄", titanium: "티타늄", ceramic: "세라믹" }[casing]} · ${connectivity === "gps" ? "GPS" : "GPS + Cellular"} · ${band === "basic" ? "기본 밴드" : "밀레니즈 루프"}`,
      prices: {
        apple: base ? base.apple + premium : null,
        education: base ? base.education + premium : null,
        coupang: originalCoupang ? (model === "series" ? 585820 : 360880) : null,
      },
      estimatedPrices: premium > 0 || size === "large" || connectivity === "cellular",
      missingLabels: casing !== "aluminum" && model === "se"
        ? { apple: "판매하지 않는 구성", education: "판매하지 않는 구성", coupang: "판매하지 않는 구성" }
        : { coupang: "동일 구성 가격 미확인" },
    };
  });
}

// iPad 추가 구성은 같은 판매처에서 기기와 호환 액세서리를 각각 살 때의 합계입니다.
// Apple Pencil Pro를 기준으로 하며, Coupang 액세서리 가격은 현재 검증되지 않았습니다.
export const ipadAccessories = {
  pencil: {
    name: "Apple Pencil Pro",
    prices: { apple: 195000, education: 180000, coupang: 177200 },
    sources: {
      apple:
        "https://www.apple.com/kr/shop/accessories/all/content-creation/apple-pencil-apple",
      education:
        "https://www.apple.com/kr-edu/shop/product/mx2d3kh/a/apple-pencil-pro",
    },
  },
  keyboards: {
    "ipad-pro-13": { apple: 519000, education: 490000, coupang: 462430 },
    "ipad-pro-11": { apple: 449000, education: 420000, coupang: 440020 },
    "ipad-air-13": { apple: 449000, education: 420000, coupang: 422510 },
    "ipad-air-11": { apple: 419000, education: 390000, coupang: 394050 },
  },
  keyboardSources: {
    apple: "https://www.apple.com/kr/shop/accessories/all/mice-keyboards",
    education:
      "https://www.apple.com/kr-edu/shop/accessories/all/college-essentials/apple",
  },
};

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
    description: "M6 · 메모리와 저장 장치별 구성",
    image: `${imageBase}mac-mini-chip-unselect-202608-gallery-1?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=d1pXNGRPZVVoYmlPOFhNR3g4R2wxRXR2WVdiVFJadS9sN05uYmNBWEpHZVFmZjd5T2R4eGRzZEl3a0hpNytPUUxNckZKekhaNGVhZVQvMTRuMXRSYTJ1Y0hhYzFCK0tzV3gwSFNTUHQzNHVlUEJLVHg0QTN1WURBNjBpaE0wOTM&traceId=1`,
    products: [
      {
        id: "mac-mini-m6-base",
        name: "Mac mini M6",
        variant: "16GB · 256GB · 2.5Gb 이더넷",
        prices: { apple: 1499000, education: 1329000, coupang: 1499000 },
      },
      {
        id: "mac-mini-m6-mid",
        name: "Mac mini M6",
        variant: "24GB · 512GB · 2.5Gb 이더넷",
        prices: { apple: 2179000, education: 2009000, coupang: 2990000 },
      },
      {
        id: "mac-mini-m6-high",
        name: "Mac mini M6",
        variant: "32GB · 1TB · 10Gb 이더넷",
        prices: { apple: 3199000, education: 2927000, coupang: null },
      },
    ],
    sources: {
      apple: "https://www.apple.com/kr/shop/buy-mac/mac-mini",
      education: "https://www.apple.com/kr-edu/shop/buy-mac/mac-mini",
    },
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
