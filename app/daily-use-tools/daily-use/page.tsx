
import Link from 'next/link';

const DailyUsePage = () => {
  return (
    <section className="daily-section">
      <div className="main-section">
        <div className="cat-title">
          <p className="cat-title-name">Daily Use Tools</p>
          <Link href="/daily-use-tools/" className="cat-title-link">
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>

        <div className="none-slide-grid">
          <Link href="/daily-use-tools/speed-test/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              <span className="box-text">Internet Speed Test</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/typing-speed-test/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-keyboard"></i>
              </div>
              <span className="box-text">Typing Speed Test</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/bangla-calendar/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <span className="box-text">বাংলা ক্যালেন্ডার</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/pdf-tools/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-file-pdf"></i>
              </div>
              <span className="box-text">PDF Tools</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/bmi-calculator/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-weight"></i>
              </div>
              <span className="box-text">BMI ক্যালকুলেটর</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/date-calculator/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-calendar-plus"></i>
              </div>
              <span className="box-text">ডেট ক্যালকুলেটর</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/percentage-calculator/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-percent"></i>
              </div>
              <span className="box-text">পার্সেন্টিস ক্যালকুলেটর</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/notepad/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-sticky-note"></i>
              </div>
              <span className="box-text">নোট পেড</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/number-to-word/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-language"></i>
              </div>
              <span className="box-text">সংখা থেকে অক্ষর</span>
            </div>
          </Link>

          <Link href="/daily-use-tools/daily-habit-tracker/" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <span className="box-text">Daily Habit Tracker</span>
            </div>
          </Link>

          <Link href="#" className="box-link">
            <div className="clickable-box">
              <div className="box-icon">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
              <span className="box-text">কাজ চলতেছে...</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DailyUsePage;
