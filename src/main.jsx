import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { groups, stores, lastUpdated, installmentGuide } from "./data";
import "./styles.css";

const won = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});
function dateLabel(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const updated = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const elapsedDays = Math.round((today - updated) / 86400000);
  if (elapsedDays === 0) return "오늘";
  if (elapsedDays === 1) return "어제";
  if (
    year === now.getFullYear() &&
    month === now.getMonth() + 1 &&
    elapsedDays > 1
  )
    return "이번 달";
  return year === now.getFullYear()
    ? `${month}/${day}`
    : `${year}.${month}.${day}`;
}
function installmentMonths(storeId, price) {
  if (storeId === "apple")
    return price >= 400000 ? (price >= 1200000 ? [12, 18] : [12]) : [3, 6];
  return [3, 6];
}
function Installments({ storeId, price }) {
  if (price === null) return null;
  return (
    <div className="monthly-payments">
      {installmentMonths(storeId, price).map((months) => (
        <span key={months}>
          {months}개월 시 월 약 {won.format(Math.ceil(price / months))}
        </span>
      ))}
    </div>
  );
}
function PriceTable({ products }) {
  return (
    <div className="table-scroll">
      <table className="price-table">
        <thead>
          <tr>
            <th scope="col">제품</th>
            {stores.map((store) => (
              <th scope="col" key={store.id}>
                {store.name}
                {store.detail && <small>{store.detail}</small>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const lowest = Math.min(
              ...Object.values(product.prices).filter(
                (price) => price !== null,
              ),
            );
            return (
              <tr key={product.id}>
                <th scope="row">
                  <strong>{product.name}</strong>
                  <small>{product.variant}</small>
                </th>
                {stores.map((store) => {
                  const price = product.prices[store.id];
                  return (
                    <td
                      key={store.id}
                      className={price === lowest ? "best-price" : ""}
                    >
                      {price === null ? (
                        <span className="unavailable">매물 없음</span>
                      ) : (
                        <>
                          <div className="price-line">
                            <span className="price">{won.format(price)}</span>
                            {price === lowest && (
                              <span className="best-badge">최저가</span>
                            )}
                          </div>
                          <Installments storeId={store.id} price={price} />
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
function ComparisonPanel({ group }) {
  if (!group)
    return (
      <div className="all-groups">
        {groups.map((item) => (
          <section className="all-group" key={item.id}>
            <div className="all-group-heading">
              <h3>{item.label}</h3>
              <span>{item.description}</span>
            </div>
            <PriceTable products={item.products} />
          </section>
        ))}
      </div>
    );
  return (
    <div className="comparison-panel">
      <div className="panel-heading">
        <div>
          <h3>{group.label}</h3>
          <p>{group.description}</p>
        </div>
        <span>{group.products.length}개 모델</span>
      </div>
      <PriceTable products={group.products} />
    </div>
  );
}
function GuideCard({ title, period, children, className = "" }) {
  return (
    <article className={`guide-card ${className}`}>
      <div className="guide-card-title">
        <h3>{title}</h3>
        <span>{period}</span>
      </div>
      {children}
    </article>
  );
}
function InstallmentGuide() {
  const { special, general, partial, source } = installmentGuide;
  return (
    <section
      className="installment-section"
      aria-labelledby="installment-title"
    >
      <div className="section-intro">
        <div>
          <h2 id="installment-title">할부 안내.</h2>
          <p>
            Apple Store 온라인 및 매장 기준 카드사별 할부 조건을 정리했어요.
          </p>
        </div>
        <a href={source} target="_blank" rel="noreferrer">
          안내 원문 보기 ↗
        </a>
      </div>
      <div className="guide-grid">
        <GuideCard
          title="특별 무이자 할부"
          period={special.period}
          className="special-card"
        >
          <p className="education-exclusion">Apple 교육 스토어 결제 미적용</p>
          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead>
                <tr>
                  <th>카드사</th>
                  <th>대상</th>
                  <th>할부 적용 금액</th>
                  <th>할부 개월</th>
                </tr>
              </thead>
              <tbody>
                {special.cards.map((card) => (
                  <React.Fragment key={card}>
                    <tr>
                      <th rowSpan="2">{card}</th>
                      <td rowSpan="2">전 제품</td>
                      <td>40만 원 이상</td>
                      <td>6 / 12개월</td>
                    </tr>
                    <tr>
                      <td>120만 원 이상</td>
                      <td>18개월</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </GuideCard>
        <GuideCard title="일반 무이자 할부" period={general.period}>
          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead>
                <tr>
                  <th>카드사</th>
                  <th>할부 적용 금액</th>
                  <th>할부 개월</th>
                </tr>
              </thead>
              <tbody>
                {general.cards.map((card) => (
                  <tr key={card.name}>
                    <th>{card.name}</th>
                    <td>5만 원 이상</td>
                    <td>{card.months}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GuideCard>
        <GuideCard title="부분 무이자 할부" period={partial.period}>
          <div className="guide-table-wrap">
            <table className="guide-table">
              <thead>
                <tr>
                  <th>카드사</th>
                  <th>할부 개월</th>
                  <th>고객 부담</th>
                  <th>면제</th>
                </tr>
              </thead>
              <tbody>
                {partial.cards.flatMap((card) =>
                  card.plans.map(([months, customer, waived], index) => (
                    <tr key={`${card.name}-${months}`}>
                      {index === 0 && (
                        <th rowSpan={card.plans.length}>{card.name}</th>
                      )}
                      <td>{months}</td>
                      <td>{customer}</td>
                      <td>{waived}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </GuideCard>
      </div>
      <div className="guide-notes">
        <p>
          무이자 할부는 5만 원 이상 거래에 적용되며, 직불·체크카드와 법인카드는
          이용할 수 없습니다. 광주은행은 BC카드 회원사입니다.
        </p>
        <p>
          월 납부액은 표시 가격을 개월 수로 나눈 예시이며, 원 단위 올림값입니다.
          실제 카드 청구액, 행사 적용 여부와 Coupang 무이자 조건은 결제 화면에서
          확인해 주세요.
        </p>
      </div>
    </section>
  );
}
function App() {
  const [activeGroup, setActiveGroup] = useState("all");
  const selectedGroup = groups.find((group) => group.id === activeGroup);
  const count = groups.reduce(
    (total, group) => total + group.products.length,
    0,
  );
  const dateTitle = `${lastUpdated.replaceAll("-", ".")} 업데이트`;
  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#top" className="brand">
          앱등이 띵의 가격비교
        </a>
        <span className="header-caption">직접 조사한 Apple 제품 가격</span>
      </header>
      <main id="top">
        <div className="page-content">
          <section className="intro">
            <div>
              <h1>
                가격 비교
                <span className="muted">한눈에 보고 고르세요</span>
              </h1>
              <p>Apple 제품 {count}개의 가격을 직접 비교해 정리했습니다.</p>
            </div>
            <span
              className="update-label"
              title={dateTitle}
              aria-label={dateTitle}
            >
              {dateLabel(lastUpdated)} 업데이트됨
            </span>
          </section>
          <nav className="product-nav" aria-label="비교할 제품 선택">
            <button
              className={`product-nav-item all-item ${activeGroup === "all" ? "selected" : ""}`}
              onClick={() => setActiveGroup("all")}
              aria-pressed={activeGroup === "all"}
            >
              <span className="all-icon" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>전체 제품 보기</span>
            </button>
            {groups.map((group) => (
              <button
                key={group.id}
                className={`product-nav-item ${activeGroup === group.id ? "selected" : ""}`}
                onClick={() => setActiveGroup(group.id)}
                aria-pressed={activeGroup === group.id}
              >
                <span className="nav-image">
                  <img src={group.image} alt="" loading="lazy" />
                </span>
                <span>{group.label}</span>
              </button>
            ))}
          </nav>
          <section className="comparison" aria-label="제품 가격 비교">
            <div className="section-intro">
              <div>
                <h2>{selectedGroup ? selectedGroup.label : "전체 제품."}</h2>
                <p>
                  {selectedGroup
                    ? "같은 제품군의 모델과 판매처별 가격을 나란히 비교해 보세요."
                    : "조사한 모든 제품의 가격을 제품군별로 모았습니다."}
                </p>
              </div>
              <span className="table-legend">
                <i /> 각 모델의 최저가
              </span>
            </div>
            <ComparisonPanel group={selectedGroup} />
            <p className="comparison-caption">
              표시 가격은 {lastUpdated.replaceAll("-", ".")} 조사 기준입니다.
              할부 금액은 조건에 따른 예상치이며 실제 결제 전 확인이 필요합니다.
            </p>
          </section>
          <InstallmentGuide />
          <footer className="site-footer">
            <strong>앱등이 띵의 가격비교</strong>
            <span>개인이 조사한 가격 정보 · 판매처와 무관한 비교 자료</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
