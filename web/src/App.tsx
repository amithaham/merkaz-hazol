import './App.css';

const featuredCategories = [
  {
    name: 'בישום',
    description: 'מבחר בשמים אהובים במחירים מצוינים',
    image: 'https://merkazhazol.com/store/perfumes.jpeg',
  },
  {
    name: 'איפור',
    description: 'מוצרי איפור במגוון גוונים וסגנונות',
    image: 'https://merkazhazol.com/store/makeup.jpeg',
  },
  {
    name: 'חומרי ניקוי',
    description: 'מגוון חומרי ניקוי לבית נקי ורענן',
    image: 'https://merkazhazol.com/store/cleaning-products.jpeg',
  },
  {
    name: 'טיפוח וקוסמטיקה',
    description: 'מגוון מוצרי טיפוח וקוסמטיקה לפנים ולגוף',
    image: 'https://merkazhazol.com/store/face-care.jpeg',
  },
  {
    name: 'מוצרי שיער',
    description: 'מוצרים לטיפוח, חיזוק ושיקום השיער',
    image: 'https://merkazhazol.com/store/hair-products.jpeg',
  },
  {
    name: 'היגיינה',
    description: 'מגוון מוצרי היגיינה לנשים ולמבוגרים',
    image: 'https://merkazhazol.com/store/hygiene.jpeg',
  },
];

const moreCategories = [
  ['ניקיון ותחזוקה', 'פתרונות יעילים לניקיון ולתחזוקת הבית', 'https://merkazhazol.com/store/cleaning-display.jpg'],
  ['אביזרי שיער', 'כל האביזרים לשיער מעוצב', 'https://merkazhazol.com/store/hair-accessories.jpeg'],
  ['טיפוח הגוף', 'קרמים, דאודורנטים ומוצרי גילוח לשגרת טיפוח', 'https://merkazhazol.com/store/body-care.jpeg'],
  ['חד-פעמי', 'מגוון מוצרים חד-פעמיים', 'https://merkazhazol.com/store/disposables.jpeg'],
  ['כפכפי Havaianas', 'מגוון דגמי Havaianas לנשים ולגברים', 'https://merkazhazol.com/store/flipflops.jpg'],
  ['סבונים', 'מוצרי רחצה לניקיון ולרעננות', 'https://merkazhazol.com/store/soaps.jpeg'],
  ['צבעים לשיער', 'מבחר גוונים ומותגים', 'https://merkazhazol.com/store/hair-colors.jpeg'],
  ['מטאטאים ומגבים', 'מטאטאים, מגבים ואביזרי ניקיון לבית', 'https://merkazhazol.com/store/brooms-mops.jpeg'],
  ['לקים', 'הגוון המושלם לכל סגנון', 'https://merkazhazol.com/store/nail-polish.jpeg'],
  ['מטהרי אוויר', 'רעננות הבית והגנה מפני יתושים', 'https://merkazhazol.com/store/air-fresheners.jpeg'],
  ['לבנים וגרביים', 'לבנים, גרביים וגרביונים לנשים ולגברים', 'https://merkazhazol.com/store/underwear-hosiery.jpeg'],
  ['היגיינת הפה', 'שמירה על היגיינת הפה', 'https://merkazhazol.com/store/oral-care.jpeg'],
  ['נעלי בית וכובעים', 'פריטים נוחים ושימושיים לכל עונה', 'https://merkazhazol.com/store/slippers-hats.jpeg'],
  ['כפפות, מגבונים ושקיות', 'אביזרים לניקיון ולסדר', 'https://merkazhazol.com/store/gloves-wipes-bags.jpeg'],
  ['אביזרי רחצה וציפורניים', 'אביזרים להשלמת שגרת הטיפוח', 'https://merkazhazol.com/store/shower-caps-nails.jpeg'],
];

const openingHours = [
  ['ראשון', '09:00-19:00'],
  ['שני', '09:00-19:00'],
  ['שלישי', '09:00-14:00'],
  ['רביעי', '09:00-19:00'],
  ['חמישי', '09:00-19:00'],
  ['שישי', '09:00-14:00'],
];

function App() {
  return (
    <div className="site" dir="rtl">
      <div className="announcement">
        <span>משלוחים חינם לרמת השרון ולהרצליה</span>
        <a href="tel:035408995">להזמנות: 03-540-8995</a>
      </div>

      <header className="header">
        <a className="brand" href="#top" aria-label="מרכז הזול">
          <strong>מרכז הזול</strong>
          <span>סוקולוב 55, רמת השרון · משנת 1973</span>
        </a>

        <nav className="nav" aria-label="ניווט ראשי">
          <a href="#about">הסיפור שלנו</a>
          <a href="#products">מוצרים</a>
          <a href="#hours">שעות פתיחה</a>
          <a href="#contact">צור קשר</a>
        </nav>

        <a className="header-cta" href="tel:035408995">צור קשר</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">מרכז הזול</div>
            <h1>כל מה שצריך<br />במקום אחד</h1>
            <p>
              מרכז הזול היא חנות משפחתית הפועלת בלב רמת השרון משנת 1973.
              אצלנו תמצאו מגוון רחב של חומרי ניקוי, קוסמטיקה, בישום ומוצרי
              צריכה, לצד שירות אישי ומחירים מצוינים.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#products">המוצרים שלנו</a>
              <a className="button secondary" href="#hours">שעות פתיחה</a>
              <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=סוקולוב+55+רמת+השרון" target="_blank" rel="noreferrer">
                ניווט לחנות ←
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>משנת 1973</strong>
                <span>עסק משפחתי ותיק</span>
              </div>
              <div>
                <strong>הכול במקום אחד</strong>
                <span>מגוון מוצרים לבית ולטיפוח</span>
              </div>
              <div>
                <strong>משלוח חינם</strong>
                <span>לרמת השרון והרצליה</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="https://merkazhazol.com/store/storefront.jpg"
              alt="האחים ממשפחת חכם בכניסה לחנות מרכז הזול"
            />
            <div className="image-badge">
              <span>עסק משפחתי</span>
              <strong>משנת 1973</strong>
            </div>
          </div>
        </section>

        <section className="story section" id="about">
          <div className="section-heading">
            <span className="eyebrow">עסק משפחתי משנת 1973</span>
            <h2>הסיפור של <em>מרכז הזול</em></h2>
          </div>

          <blockquote>
            העסק הוקם בשנת 1973 על ידי אבינו, מאיר חכם ז״ל. כיום אנחנו גאים
            להמשיך את דרכו ולשמור על הערכים שליוו את החנות לאורך השנים -
            אדיבות, מקצועיות, יחס אישי ומחירים מצוינים.
          </blockquote>

          <div className="service-grid">
            <article>
              <div className="service-icon">♡</div>
              <h3>שירות אישי</h3>
              <p>שירות אדיב ומקצועי, עם נכונות לעזור בכל שאלה</p>
            </article>
            <article>
              <div className="service-icon">✓</div>
              <h3>מבחר רחב במחירים מצוינים</h3>
              <p>כל המוצרים שאתם צריכים, במקום אחד ובמחירים משתלמים</p>
            </article>
          </div>
        </section>

        <section className="products section" id="products">
          <div className="section-heading centered">
            <span className="eyebrow">המוצרים שלנו</span>
            <h2>כל מה שאתם מחפשים<br /><em>במקום אחד</em></h2>
            <p>
              אצלנו תמצאו מגוון רחב של מוצרי ניקיון, קוסמטיקה, בישום, שיער
              והיגיינה, ממותגים מוכרים ואהובים.
            </p>
          </div>

          <div className="product-grid">
            {featuredCategories.map((category) => (
              <article className="product-card" key={category.name}>
                <img src={category.image} alt={`${category.name} במרכז הזול`} />
                <div className="product-card-copy">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="more-products">
          <div className="section-heading centered">
            <span className="eyebrow">וזה רק חלק מהמבחר</span>
            <h2>מחכה לכם עוד הרבה<br /><em>בחנות</em></h2>
            <p>החליקו ימינה ושמאלה כדי לצפות במוצרים נוספים</p>
          </div>

          <div className="carousel" aria-label="קטגוריות מוצרים נוספות">
            {moreCategories.map(([name, description, image]) => (
              <article className="carousel-card" key={name}>
                <img src={image} alt={`${name} במרכז הזול`} />
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="category-line">
            בישום · פרפומריה · חומרי ניקוי · קוסמטיקה וטיפוח · מוצרי צריכה ·
            היגיינה · נעלי בית וכובעים · כפכפים · חד-פעמי · איפור · מוצרי
            ואביזרי שיער · גרביים וגרביונים · לבנים לנשים ולגברים · משקפי
            קריאה ועוד
          </p>
        </section>

        <section className="visit section" id="hours">
          <div className="visit-copy">
            <span className="eyebrow">מחכים לכם בחנות</span>
            <h2>סוקולוב 55<br /><em>רמת השרון</em></h2>
            <p className="delivery-note">משלוחים חינם לרמת השרון ולהרצליה</p>
            <div className="visit-actions">
              <a className="button primary" href="https://www.google.com/maps/search/?api=1&query=סוקולוב+55+רמת+השרון" target="_blank" rel="noreferrer">
                ניווט לחנות
              </a>
              <a className="phone" href="tel:035408995">03-540-8995</a>
            </div>
          </div>

          <div className="hours-card">
            <div>
              <span className="eyebrow">שעות פתיחה</span>
              <p>סוקולוב 55, רמת השרון</p>
            </div>

            <div className="hours-list">
              {openingHours.map(([day, hours]) => (
                <div className="hours-row" key={day}>
                  <strong>{day}</strong>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div>
            <span className="eyebrow">אנחנו כאן בשבילכם</span>
            <h2>03-540-8995</h2>
          </div>
          <div>
            <span className="eyebrow">כתובת</span>
            <h2>סוקולוב 55, רמת השרון</h2>
          </div>
          <a className="button secondary light" href="https://www.google.com/maps/search/?api=1&query=סוקולוב+55+רמת+השרון" target="_blank" rel="noreferrer">
            ניווט לחנות
          </a>
        </section>

        <section className="closing">
          <span>סוקולוב 55, רמת השרון</span>
          <h2>מחכים לכם במרכז הזול</h2>
          <a className="button primary" href="tel:035408995">צור קשר</a>
        </section>
      </main>

      <footer className="footer">
        <div className="brand footer-brand">
          <strong>מרכז הזול</strong>
          <span>שירות ואדיבות משנת 1973</span>
        </div>
        <nav>
          <a href="#about">הסיפור שלנו</a>
          <a href="#products">מוצרים</a>
          <a href="#hours">שעות פתיחה</a>
        </nav>
        <div className="footer-contact">
          <a href="https://www.google.com/maps/search/?api=1&query=סוקולוב+55+רמת+השרון" target="_blank" rel="noreferrer">סוקולוב 55, רמת השרון</a>
          <a href="tel:035408995">03-540-8995</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
