import { useEffect, useState } from "react";
import "./App.css";
import AdminPage from "./AdminPage";
import { getStoreProducts, type ApiProduct } from "./api";


const products = [
  { image: "https://merkazhazol.com/store/perfumes.jpeg", title: "בישום", note: "מבחר בשמים אהובים במחירים מצוינים" },
  { image: "https://merkazhazol.com/store/makeup.jpeg", title: "איפור", note: "מוצרי איפור במגוון גוונים וסגנונות" },
  { image: "https://merkazhazol.com/store/cleaning-products.jpeg", title: "חומרי ניקוי", note: "מגוון חומרי ניקוי לבית נקי ורענן" },
  { image: "https://merkazhazol.com/store/face-care.jpeg", title: "טיפוח וקוסמטיקה", note: "מגוון מוצרי טיפוח וקוסמטיקה לפנים ולגוף" },
  { image: "https://merkazhazol.com/store/hair-products.jpeg", title: "מוצרי שיער", note: "מוצרים לטיפוח, חיזוק ושיקום השיער" },
  { image: "https://merkazhazol.com/store/hygiene.jpeg", title: "היגיינה", note: "מגוון מוצרי היגיינה לנשים ולמבוגרים" },
  { image: "https://merkazhazol.com/store/cleaning-display.jpg", title: "ניקיון ותחזוקה", note: "פתרונות יעילים לניקיון ולתחזוקת הבית" },
  { image: "https://merkazhazol.com/store/hair-accessories.jpeg", title: "אביזרי שיער", note: "כל האביזרים לשיער מעוצב" },
  { image: "https://merkazhazol.com/store/body-care.jpeg", title: "טיפוח הגוף", note: "קרמים, דאודורנטים ומוצרי גילוח לשגרת טיפוח" },
  { image: "https://merkazhazol.com/store/disposables.jpeg", title: "חד-פעמי", note: "מגוון מוצרים חד-פעמיים" },
  { image: "https://merkazhazol.com/store/flipflops.jpg", title: "כפכפי Havaianas", note: "מגוון דגמי Havaianas לנשים ולגברים" },
  { image: "https://merkazhazol.com/store/soaps.jpeg", title: "סבונים", note: "מוצרי רחצה לניקיון ולרעננות" },
  { image: "https://merkazhazol.com/store/hair-colors.jpeg", title: "צבעים לשיער", note: "מבחר גוונים ומותגים" },
  { image: "https://merkazhazol.com/store/brooms-mops.jpeg", title: "מטאטאים ומגבים", note: "מטאטאים, מגבים ואביזרי ניקיון לבית" },
  { image: "https://merkazhazol.com/store/nail-polish.jpeg", title: "לקים", note: "הגוון המושלם לכל סגנון" },
  { image: "https://merkazhazol.com/store/air-fresheners.jpeg", title: "מטהרי אוויר", note: "רעננות הבית והגנה מפני יתושים" },
  { image: "https://merkazhazol.com/store/underwear-hosiery.jpeg", title: "לבנים וגרביים", note: "לבנים, גרביים וגרביונים לנשים ולגברים" },
  { image: "https://merkazhazol.com/store/oral-care.jpeg", title: "היגיינת הפה", note: "שמירה על היגיינת הפה" },
  { image: "https://merkazhazol.com/store/slippers-hats.jpeg", title: "נעלי בית וכובעים", note: "פריטים נוחים ושימושיים לכל עונה" },
  { image: "https://merkazhazol.com/store/gloves-wipes-bags.jpeg", title: "כפפות, מגבונים ושקיות", note: "אביזרים לניקיון ולסדר" },
  { image: "https://merkazhazol.com/store/shower-caps-nails.jpeg", title: "אביזרי רחצה וציפורניים", note: "אביזרים להשלמת שגרת הטיפוח" },
];

const categories = [
  "בישום", "פרפומריה", "חומרי ניקוי", "קוסמטיקה וטיפוח", "מוצרי צריכה",
  "היגיינה", "נעלי בית וכובעים", "כפכפים", "חד-פעמי", "איפור",
  "מוצרי ואביזרי שיער", "גרביים וגרביונים", "לבנים לנשים ולגברים", "משקפי קריאה",
];

const openingHours = [
  ["ראשון", "09:00-19:00"], ["שני", "09:00-19:00"],
  ["שלישי", "09:00-14:00"], ["רביעי", "09:00-19:00"],
  ["חמישי", "09:00-19:00"], ["שישי", "09:00-14:00"],
];

// Non-breaking hyphens keep the phone number on one line on narrow Android screens.
const phoneDisplay = "03‑540‑8995";
const phoneHref = "tel:+97235408995";
const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=%D7%A1%D7%95%D7%A7%D7%95%D7%9C%D7%95%D7%91+55+%D7%A8%D7%9E%D7%AA+%D7%94%D7%A9%D7%A8%D7%95%D7%9F";
const mapsEmbedHref =
  "https://www.google.com/maps?q=%D7%A1%D7%95%D7%A7%D7%95%D7%9C%D7%95%D7%91+55%2C+%D7%A8%D7%9E%D7%AA+%D7%94%D7%A9%D7%A8%D7%95%D7%9F&hl=he&z=16&output=embed";

function StorefrontApp() {
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const result = await getStoreProducts();
        if (!cancelled) {
          setApiProducts(result);
        }
      } catch (error) {
        console.error("Failed to load products from API", error);
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "מרכז הזול רמת השרון",
    description: "מרכז הזול סוקולוב 55 רמת השרון. החנות המובילה לחומרי ניקוי, חיטוי, בישום, תכשירי שיער, קוסמטיקה, כלים חד״פ, היגיינה, גרביים, נעלי בית ועוד.",
    url: "https://merkazhazol.com",
    telephone: "+972-3-540-8995",
    address: {
      "@type": "PostalAddress",
      streetAddress: "סוקולוב 55",
      addressLocality: "רמת השרון",
      addressCountry: "IL",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "Monday", "Wednesday", "Thursday"], opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Friday"], opens: "09:00", closes: "14:00" },
    ],
  };

  const featuredProducts =
    apiProducts.length > 0
      ? apiProducts
          .filter((product) => product.featured)
          .map((product) => ({
            image: product.imageUrl,
            title: product.name,
            note: product.description,
          }))
      : products.slice(0, 6);

  const moreProducts =
    apiProducts.length > 0
      ? apiProducts
          .filter((product) => !product.featured)
          .map((product) => ({
            image: product.imageUrl,
            title: product.name,
            note: product.description,
          }))
      : products.slice(6);

  return (
    <main id="top" dir="rtl">
      <InteractiveEffects />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }} />

      <div className="announcement-bar">
        <p>משלוחים חינם לרמת השרון ולהרצליה</p>
        <a href={phoneHref}>
          <span>להזמנות:</span>
          <bdi className="announcement-phone" dir="ltr">{phoneDisplay}</bdi>
        </a>
      </div>

      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#home" aria-label="מרכז הזול - דף הבית">
            <span className="brand-name">מרכז הזול</span>
            <span className="brand-detail">סוקולוב 55, רמת השרון · משנת 1973</span>
          </a>
          <nav className="desktop-nav" aria-label="ניווט ראשי">
            <a href="#story">הסיפור שלנו</a>
            <a href="#products">מוצרים</a>
            <a href="#opening-hours">שעות פתיחה</a>
          </nav>
          <a className="header-action contact-desktop" href="#visit">צור קשר</a>
          <a className="header-action contact-mobile" href={phoneHref}>צור קשר</a>
        </div>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-content">
          <h1 id="hero-title">מרכז הזול</h1>
          <p className="hero-tagline">כל מה שצריך במקום אחד</p>
          <p className="hero-description">
            מרכז הזול היא חנות משפחתית הפועלת בלב רמת השרון משנת 1973. אצלנו תמצאו מגוון רחב של חומרי ניקוי, קוסמטיקה, בישום ומוצרי צריכה, לצד שירות אישי ומחירים מצוינים.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#products">המוצרים שלנו</a>
            <a className="secondary-button" href="#opening-hours">שעות פתיחה</a>
            <a className="quiet-link contact-desktop" href="#visit">צור קשר</a>
            <a className="quiet-link contact-mobile" href={phoneHref}>צור קשר</a>
            <a className="quiet-link" href={mapsHref} target="_blank" rel="noreferrer">ניווט לחנות</a>
          </div>
          <div className="hero-proof" aria-label="יתרונות החנות">
            <div><strong>משנת 1973</strong><span>עסק משפחתי ותיק</span></div>
            <div><strong>הכול במקום אחד</strong><span>מגוון מוצרים לבית ולטיפוח</span></div>
            <div><strong>משלוח חינם</strong><span>לרמת השרון והרצליה</span></div>
          </div>
        </div>
      </section>

      <section className="family-canvas" aria-label="האחים ממשפחת חכם בכניסה לחנות מרכז הזול" data-reveal>
        <img src="https://merkazhazol.com/store/storefront.jpg" alt="האחים ממשפחת חכם בכניסה לחנות מרכז הזול" fetchPriority="high" />
        <span className="family-canvas-wash" aria-hidden="true" />
      </section>

      <section className="story-section" id="story" aria-labelledby="story-title">
        <div className="story-intro" data-reveal>
          <p className="kicker">עסק משפחתי משנת 1973</p>
          <h2 id="story-title">הסיפור של<br />מרכז הזול</h2>
        </div>
        <div className="story-panel" data-reveal>
          <blockquote>העסק הוקם בשנת 1973 על ידי אבינו, מאיר חכם ז״ל. כיום אנחנו גאים להמשיך את דרכו ולשמור על הערכים שליוו את החנות לאורך השנים - אדיבות, מקצועיות, יחס אישי ומחירים מצוינים.</blockquote>
        </div>
      </section>

      <section className="service-section" aria-labelledby="service-title">
        <h2 id="service-title" data-reveal>השירות שלנו</h2>
        <div className="service-strip">
          <div data-reveal><strong>שירות אישי</strong><p>שירות אדיב ומקצועי, עם נכונות לעזור בכל שאלה</p></div>
          <div data-reveal><strong>מבחר רחב במחירים מצוינים</strong><p>כל המוצרים שאתם צריכים, במקום אחד ובמחירים משתלמים</p></div>
        </div>
      </section>

      <section className="featured-section" id="products" aria-labelledby="products-title">
        <div className="section-heading" data-reveal>
          <p className="kicker">המוצרים שלנו</p>
          <h2 id="products-title">כל מה שאתם מחפשים<br /><em>במקום אחד</em></h2>
          <p className="section-description">אצלנו תמצאו מגוון רחב של מוצרי ניקיון, קוסמטיקה, בישום, שיער והיגיינה, ממותגים מוכרים ואהובים.</p>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <article className="featured-card" key={product.title}>
              <div className="featured-image"><img src={product.image} alt={`${product.title} במרכז הזול`} loading="lazy" /></div>
              <div className="featured-copy"><h3>{product.title}</h3><p>{product.note}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="collection-section" aria-labelledby="collection-title">
        <div className="collection-heading" data-reveal>
          <div><p className="kicker light">וזה רק חלק מהמבחר</p><h2 id="collection-title">מחכה לכם עוד הרבה<br />בחנות</h2></div>
          <div className="collection-guide">
            <p>החליקו שמאלה וימינה כדי לצפות בכל המוצרים</p>
            <div className="collection-controls" aria-label="גלילה בין המוצרים">
              <button type="button" data-collection-direction="right" aria-label="גלילה ימינה">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l7 7-7 7" /></svg>
                <span>ימינה</span>
              </button>
              <button type="button" data-collection-direction="left" aria-label="גלילה שמאלה">
                <span>שמאלה</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5l-7 7 7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="collection-scroll" data-collection-scroll>
          {moreProducts.map((product) => (
            <article className="collection-card" key={product.title}>
              <img src={product.image} alt={`${product.title} במרכז הזול`} loading="lazy" />
              <div><h3>{product.title}</h3><p>{product.note}</p></div>
            </article>
          ))}
        </div>
        <div className="category-list" aria-label="קטגוריות נוספות">
          {categories.map((category) => <span key={category}>{category}</span>)}
          <span>ועוד</span>
        </div>
      </section>

      <section className="visit-section" id="visit" aria-labelledby="visit-title">
        <div className="visit-copy" data-reveal>
          <p className="kicker">מחכים לכם בחנות</p>
          <h2 id="visit-title">סוקולוב 55<br />רמת השרון</h2>
          <p>משלוחים חינם לרמת השרון ולהרצליה</p>
          <div className="visit-actions">
            <a className="primary-button" href={mapsHref} target="_blank" rel="noreferrer">ניווט לחנות</a>
            <a className="phone-link" href={phoneHref}>{phoneDisplay}</a>
          </div>
          <div className="visit-image"><img src="https://merkazhazol.com/store/cleaning-display.jpg" alt="מדפי חומרי הניקוי במרכז הזול" loading="lazy" /></div>
        </div>

        <div className="hours-card" id="opening-hours" data-reveal>
          <div className="hours-title"><span>שעות פתיחה</span><small>סוקולוב 55, רמת השרון</small></div>
          <div className="hours-list">
            {openingHours.map(([day, hours]) => (
              <div key={day}><span>{day}</span><i aria-hidden="true" /><strong>{hours}</strong></div>
            ))}
          </div>
          <a className="hours-contact" href={phoneHref}><span>אנחנו כאן בשבילכם</span><strong>{phoneDisplay}</strong></a>
        </div>
      </section>

      <section className="map-section" aria-labelledby="map-title">
        <div className="map-heading" data-reveal>
          <div>
            <p className="kicker">כתובת</p>
            <h2 id="map-title">סוקולוב 55, רמת השרון</h2>
          </div>
          <a className="primary-button" href={mapsHref} target="_blank" rel="noreferrer">ניווט לחנות</a>
        </div>
        <div className="map-frame" data-reveal>
          <iframe
            src={mapsEmbedHref}
            title="מפת הגעה למרכז הזול, סוקולוב 55 רמת השרון"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="closing-section" aria-label="יצירת קשר" data-reveal>
        <p>סוקולוב 55, רמת השרון</p>
        <h2>מחכים לכם במרכז הזול</h2>
        <a className="contact-desktop" href="#visit">צור קשר</a>
        <a className="contact-mobile" href={phoneHref}>צור קשר</a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#home"><span className="brand-name">מרכז הזול</span><span className="brand-detail">שירות ואדיבות משנת 1973</span></a>
        <div className="footer-links"><a href="#story">הסיפור שלנו</a><a href="#products">מוצרים</a><a href="#opening-hours">שעות פתיחה</a></div>
        <div className="footer-contact"><a href={mapsHref} target="_blank" rel="noreferrer">סוקולוב 55, רמת השרון</a><a href={phoneHref}>{phoneDisplay}</a></div>
      </footer>

      <a className="back-to-top" href="#top" data-back-to-top aria-label="חזרה לראש העמוד">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19V6M6.5 11.5 12 6l5.5 5.5" />
        </svg>
      </a>

      <div className="mobile-actions" aria-label="פעולות מהירות">
        <a href={phoneHref}>צור קשר</a>
        <a href="#opening-hours">שעות פתיחה</a>
      </div>
    </main>
  );
}


export default function App() {
  return window.location.pathname.startsWith("/admin") ? (
    <AdminPage />
  ) : (
    <StorefrontApp />
  );
}

function InteractiveEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const collection = document.querySelector<HTMLElement>("[data-collection-scroll]");
    const collectionButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-collection-direction]"));
    const backToTop = document.querySelector<HTMLAnchorElement>("[data-back-to-top]");
    const scrollCollection = (event: Event) => {
      if (!collection) return;
      const button = event.currentTarget as HTMLButtonElement;
      const direction = button.dataset.collectionDirection === "left" ? -1 : 1;
      collection.scrollBy({ left: direction * 306, behavior: reducedMotion ? "auto" : "smooth" });
    };
    const updateBackToTop = () => {
      backToTop?.classList.toggle("is-visible", window.scrollY > Math.max(420, window.innerHeight * 0.7));
    };
    collectionButtons.forEach((button) => button.addEventListener("click", scrollCollection));
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });

    if (reducedMotion) {
      return () => {
        window.removeEventListener("scroll", updateBackToTop);
        collectionButtons.forEach((button) => button.removeEventListener("click", scrollCollection));
      };
    }

    const body = document.body;
    body.classList.add("motion-ready", "intro-playing");
    const introTimer = window.setTimeout(() => body.classList.remove("intro-playing"), 2300);
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => {
      window.clearTimeout(introTimer);
      body.classList.remove("intro-playing");
      observer.disconnect();
      window.removeEventListener("scroll", updateBackToTop);
      collectionButtons.forEach((button) => button.removeEventListener("click", scrollCollection));
    };
  }, []);

  return <div className="brand-intro" aria-hidden="true"><span>מרכז הזול</span></div>;
}