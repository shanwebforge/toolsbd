
import Link from 'next/link';

const tools = [
    { name: 'CSS Gradient Generator', href: '/dev-designer-tools/gradiant-mixer', description: 'Generate CSS gradients.' },
    { name: 'Password Generator', href: '/dev-designer-tools/password-generator', description: 'Generate a strong password.' },
    { name: 'Color Similarity', href: '/dev-designer-tools/color-similarity', description: 'Find similar colors.' },
    { name: 'Color Picker & Palette', href: '/dev-designer-tools/color-picker', description: 'Pick a color and create a palette.' },
    { name: 'HTML, CSS, JS Formatter & Beautifier', href: '/dev-designer-tools/Formatter', description: 'Format and beautify your code.' },
    { name: 'Responsive Design Checker', href: '/dev-designer-tools/responsive-design-checker', description: 'Check the responsiveness of your website.' },
    { name: 'Lorem Ipsum Generator', href: '/dev-designer-tools/lorem-ipsum', description: 'Generate Lorem Ipsum text.' },
    { name: 'Regex Tester', href: '/dev-designer-tools/regex-tester', description: 'Test your regular expressions.' },
    { name: 'Base64 Encoder / Decoder', href: '/dev-designer-tools/base64-encoder', description: 'Encode and decode Base64 strings.' },
    { name: 'JSON Formatter & Validator', href: '/dev-designer-tools/json-formatter-validator', description: 'Format and validate your JSON data.' },
    { name: 'Logo Generator', href: '/dev-designer-tools/logo-generator', description: 'Generate a logo for your brand.' },
    { name: 'Font Preview', href: '/dev-designer-tools/font-preview', description: 'Preview different fonts.' },
    { name: 'Facebook DP', href: '/dev-designer-tools/facebook-dp', description: 'Create a Facebook display picture.' },
];

export default function DevDesignerTools() {
  return (
    <main className="container mx-auto px-4">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold">Developer & Designer Tools</h1>
        <p className="text-lg text-gray-600">A collection of tools for developers and designers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-white rounded-lg shadow-md p-6">
            <Link href={tool.href}>
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <p className='text-gray-600'>{tool.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
