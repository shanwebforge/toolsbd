'use client';
import { useState, useEffect, ChangeEvent } from 'react';

const FlyerGenerator = () => {
  const [title, setTitle] = useState("ফ্লায়ার শিরোনাম");
  const [subtitle, setSubtitle] = useState("সাব-হেডলাইন");
  const [body, setBody] = useState("এখানে ফ্লায়ার এর বিস্তারিত তথ্য থাকবে।");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("'SolaimanLipi', Arial, sans-serif");
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>("center");
  const [titleFontSize, setTitleFontSize] = useState(36);
  const [subtitleFontSize, setSubtitleFontSize] = useState(24);
  const [bodyFontSize, setBodyFontSize] = useState(18);
  const [borderRadius, setBorderRadius] = useState(12);
  const [margin, setMargin] = useState(20);
  const [imageAlign, setImageAlign] = useState<'left' | 'center' | 'right'>("center");
  const [image, setImage] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState("png");

  useEffect(() => {
    const html2canvasScript = document.createElement("script");
    html2canvasScript.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    document.body.appendChild(html2canvasScript);

    const jspdfScript = document.createElement("script");
    jspdfScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    document.body.appendChild(jspdfScript);

    return () => {
      document.body.removeChild(html2canvasScript);
      document.body.removeChild(jspdfScript);
    };
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadFlyer = async () => {
    const flyer = document.getElementById("flyer");
    const html2canvas = (window as any).html2canvas;
    const jspdf = (window as any).jspdf;

    if (!flyer || !html2canvas || !jspdf) {
      alert("Resources are still loading. Please wait a moment and try again.");
      return;
    }

    try {
      const canvas = await html2canvas(flyer);
      if (downloadFormat === "png") {
        const link = document.createElement("a");
        link.download = "flyer.png";
        link.href = canvas.toDataURL();
        link.click();
      } else {
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({
          unit: "px",
          format: [flyer.offsetWidth, flyer.offsetHeight],
        });
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, flyer.offsetWidth, flyer.offsetHeight);
        pdf.save("flyer.pdf");
      }
    } catch (error) {
      console.error("Error downloading flyer:", error);
      alert("Failed to download flyer. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-xl">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">📢 Digital Flyer Generator (Advanced)</h2>
        <div className="w-full h-1 bg-gray-200"></div>
        <p>• Create professional flyers with customizable templates</p>
        <p>• Add text, images, shapes, and icons with drag-and-drop</p>
        <p>• Choose from multiple layout options and design themes</p>
        <p>• Export in high-quality PNG, JPG, and PDF formats</p>
        <p>• Add QR codes and social media links to your flyers</p>
        <p>• Share directly to social media or download for printing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="ফ্লায়ার শিরোনাম লিখুন" className="p-2 border-2 border-gray-300 rounded-md" value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        <input type="text" placeholder="সাব-হেডলাইন (ঐচ্ছিক)" className="p-2 border-2 border-gray-300 rounded-md" value={subtitle} onChange={(e: ChangeEvent<HTMLInputElement>) => setSubtitle(e.target.value)} />
        <textarea rows={5} placeholder="বিস্তারিত তথ্য লিখুন" className="p-2 border-2 border-gray-300 rounded-md md:col-span-2" value={body} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}></textarea>
        
        <div className="flex items-center gap-2">
          <label className="font-semibold">Font Size (Title):</label>
          <input type="number" className="w-20 p-2 border-2 border-gray-300 rounded-md" value={titleFontSize} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleFontSize(parseInt(e.target.value))} />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Font Size (Subtitle):</label>
          <input type="number" className="w-20 p-2 border-2 border-gray-300 rounded-md" value={subtitleFontSize} onChange={(e: ChangeEvent<HTMLInputElement>) => setSubtitleFontSize(parseInt(e.target.value))} />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Font Size (Body):</label>
          <input type="number" className="w-20 p-2 border-2 border-gray-300 rounded-md" value={bodyFontSize} onChange={(e: ChangeEvent<HTMLInputElement>) => setBodyFontSize(parseInt(e.target.value))} />
        </div>

        <div className="flex items-center gap-2">
            <label className="font-semibold">Font Family:</label>
            <select className="p-2 border-2 border-gray-300 rounded-md" value={fontFamily} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFontFamily(e.target.value)}>
                <option value="'SolaimanLipi', Arial, sans-serif">SolaimanLipi</option>
                <option value="'Nikosh', Arial, sans-serif">Nikosh</option>
                <option value="'Kalpurush', Arial, sans-serif">Kalpurush</option>
                <option value="'Siyam Rupali', Arial, sans-serif">Siyam Rupali</option>
                <option value="'Bangla', Arial, sans-serif">Bangla</option>
                <option value="'Arial, sans-serif'">Arial (English)</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <label className="font-semibold">Text Align:</label>
            <select className="p-2 border-2 border-gray-300 rounded-md" value={textAlign} onChange={(e: ChangeEvent<HTMLSelectElement>) => setTextAlign(e.target.value as 'left' | 'center' | 'right')}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
            </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold block mb-2">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border-2 border-gray-300 rounded-md w-full"/>
        </div>

        <div className="flex items-center gap-2">
            <label className="font-semibold">Image Align:</label>
            <select className="p-2 border-2 border-gray-300 rounded-md" value={imageAlign} onChange={(e: ChangeEvent<HTMLSelectElement>) => setImageAlign(e.target.value as 'left' | 'center' | 'right')}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <label className="font-semibold">Background Color:</label>
            <input type="color" className="w-20 p-1 border-2 border-gray-300 rounded-md" value={bgColor} onChange={(e: ChangeEvent<HTMLInputElement>) => setBgColor(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
            <label className="font-semibold">Text Color:</label>
            <input type="color" className="w-20 p-1 border-2 border-gray-300 rounded-md" value={textColor} onChange={(e: ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
            <label className="font-semibold">Border Radius (px):</label>
            <input type="number" className="w-20 p-2 border-2 border-gray-300 rounded-,md" value={borderRadius} onChange={(e: ChangeEvent<HTMLInputElement>) => setBorderRadius(parseInt(e.target.value))} />
        </div>
        <div className="flex items-center gap-2">
            <label className="font-semibold">Margin (px):</label>
            <input type="number" className="w-20 p-2 border-2 border-gray-300 rounded-md" value={margin} onChange={(e: ChangeEvent<HTMLInputElement>) => setMargin(parseInt(e.target.value))} />
        </div>
        <div className="flex items-center gap-2">
            <label className="font-semibold">Download Format:</label>
            <select className="p-2 border-2 border-gray-300 rounded-md" value={downloadFormat} onChange={(e: ChangeEvent<HTMLSelectElement>) => setDownloadFormat(e.target.value)}>
                <option value="png">PNG</option>
                <option value="pdf">PDF</option>
            </select>
        </div>
      </div>

      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg" onClick={downloadFlyer}>
        ⬇️ Download Flyer
      </button>

      <div className="mt-8 mx-auto border-4 border-dashed border-gray-300 p-2">
        <div
          id="flyer"
          className="relative overflow-hidden"
          style={{
            width: "550px",
            height: "750px",
            backgroundColor: bgColor,
            color: textColor,
            borderRadius: `${borderRadius}px`,
            padding: `${margin}px`,
            fontFamily: fontFamily,
            textAlign: textAlign,
            display: 'flex',
            flexDirection: 'column',
            alignItems: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center',
          }}
        >
          {image && <img src={image} className="max-w-full h-auto max-h-64 object-cover rounded-lg mb-4" style={{ objectPosition: imageAlign }} alt="Flyer image"/>}
          <h2 style={{ fontSize: `${titleFontSize}px`, margin: '0' }}>{title}</h2>
          <h4 style={{ fontSize: `${subtitleFontSize}px`, margin: '0.5em 0' }}>{subtitle}</h4>
          <p style={{ fontSize: `${bodyFontSize}px`, whiteSpace: 'pre-wrap' }}>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default FlyerGenerator;
