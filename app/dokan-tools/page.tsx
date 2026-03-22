
import Link from 'next/link';

const DokanToolsPage = () => {
  const tools = [
    { name: 'বিক্রয় ও লেনদেন', href: '/dokan-tools/bikroy-lenden' },
    { name: 'কাস্টমার রিসিট প্রিন্ট', href: '/dokan-tools/customer-receipt-print' },
    { name: 'ডিসকাউন্ট ক্যালকুলেটর', href: '/dokan-tools/discount-calculator' },
    { name: 'দৈনিক খরচের হিসাব', href: '/dokan-tools/expense-tracker' },
    { name: 'গ্রোসারি শপিং লিস্ট', href: '/dokan-tools/grocery-shopping' },
    { name: 'ইনভয়েস উইথ ভ্যাট', href: '/dokan-tools/invoice-with-vat' },
    { name: 'মালের স্টক', href: '/dokan-tools/maal-stock' },
    { name: 'QR কোড জেনারেটর', href: '/dokan-tools/qr-code-product' },
  ];

  return (
    <main className="file-section">
      <div className="file-container">
        <div className="file-header">
          <div className="file-title">
            <h2>দোকান টুলস</h2>
            <div className="title-underline"></div>
          </div>
          <div className="file-content-text">
            <p>আপনার দোকানের হিসাব-নিকাশ সহজ করার জন্য কিছু টুলস।</p>
          </div>
        </div>
        <div className="file-footer">
          <div className="tool-list">
            {tools.map(tool => (
              <Link key={tool.href} href={tool.href} className="tool-card">
                <h3>{tool.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DokanToolsPage;
