import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { groups, stores, lastUpdated, notes } from './data';
import './styles.css';

const won = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });

function dateLabel(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const updated = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const elapsedDays = Math.round((today - updated) / 86400000);
  if (elapsedDays === 0) return '오늘';
  if (elapsedDays === 1) return '어제';
  if (year === now.getFullYear() && month === now.getMonth() + 1 && elapsedDays > 1) return '이번 달';
  return year === now.getFullYear() ? `${month}/${day}` : `${year}.${month}.${day}`;
}

function getLowest(product) {
  return Math.min(...Object.values(product.prices).filter((price) => price !== null));
}

function App() {
  const [activeGroup, setActiveGroup] = useState(groups[0].id);
  const group = groups.find((item) => item.id === activeGroup) ?? groups[0];
  const dateTitle = `${lastUpdated.replaceAll('-', '.')} 업데이트`;
  const count = groups.reduce((total, item) => total + item.products.length, 0);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="가격 비교 홈"><span className="brand-mark">≋</span> 가격비교<span className="brand-dot">.</span></a>
        <span className="header-caption">APPLE PRICE GUIDE</span>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-inner">
            <div className="eyebrow"><span className="eyebrow-line" /> SMARTER SHOPPING, SIMPLIFIED</div>
            <h1 id="page-title">좋은 선택은<br /><em>비교</em>에서 시작됩니다.</h1>
            <p className="hero-copy">같은 제품, 다른 가격. Apple 공식 가격부터 교육 할인과 리셀러 가격까지 한눈에 살펴보세요.</p>
            <div className="hero-meta">
              <span className="update-pill" title={dateTitle} aria-label={dateTitle}><span className="status-dot" /> {dateLabel(lastUpdated)} 업데이트됨</span>
              <span className="meta-divider" />
              <span>{groups.length}개 제품군 · {count}개 모델</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true"><span className="art-ring ring-one" /><span className="art-ring ring-two" /><span className="art-core">₩</span></div>
        </section>

        <section className="comparison" aria-labelledby="compare-title">
          <div className="section-heading">
            <div><span className="section-kicker">EXPLORE THE DIFFERENCE</span><h2 id="compare-title">가격 비교</h2></div>
            <p>제품군을 선택해 모델별 가격을 비교하세요.</p>
          </div>

          <div className="group-tabs" role="tablist" aria-label="제품군 선택">
            {groups.map((item) => <button key={item.id} id={`tab-${item.id}`} className={`group-tab ${item.id === activeGroup ? 'active' : ''}`} role="tab" aria-selected={item.id === activeGroup} aria-controls="comparison-panel" onClick={() => setActiveGroup(item.id)}>{item.label}<span className="tab-count">{item.products.length}</span></button>)}
          </div>

          <div id="comparison-panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} className="comparison-panel" key={group.id}>
            <div className="panel-heading"><div><span className="category-label">{group.category} / PRICE COMPARISON</span><h3>{group.label}</h3><p>{group.description}</p></div><span className="model-count">{group.products.length} {group.products.length === 1 ? 'MODEL' : 'MODELS'}</span></div>
            <div className="table-scroll"><table className="price-table"><thead><tr><th scope="col" className="product-heading">모델</th>{stores.map((store) => <th scope="col" key={store.id}><span>{store.name}</span>{store.detail && <small>{store.detail}</small>}</th>)}</tr></thead><tbody>{group.products.map((product) => { const lowest = getLowest(product); return <tr key={product.id}><th scope="row"><strong>{product.name}</strong><small>{product.variant}</small></th>{stores.map((store) => { const price = product.prices[store.id]; const isLowest = price !== null && price === lowest; return <td key={store.id} className={isLowest ? 'best-price' : ''}>{price === null ? <span className="unavailable">매물 없음</span> : <><span className="price">{won.format(price)}</span>{isLowest && <span className="best-badge">최저가</span>}</>}</td>; })}</tr>; })}</tbody></table></div>
            <div className="panel-footer"><span className="legend-dot" /> 초록색은 해당 모델의 최저가를 뜻합니다.<span className="footer-note">표시 가격은 업데이트 시점 기준</span></div>
          </div>
        </section>

        <section className="notes" aria-labelledby="notes-title"><div className="notes-heading"><span className="section-kicker">BEFORE YOU DECIDE</span><h2 id="notes-title">알아두세요</h2></div><div className="notes-list">{notes.map((note, index) => <div className="note" key={note}><span className="note-index">0{index + 1}</span><p>{note}</p></div>)}</div></section>
      </main>
      <footer className="site-footer"><span>가격비교<span className="brand-dot">.</span></span><span>현명한 선택을 위한 간결한 비교.</span></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
