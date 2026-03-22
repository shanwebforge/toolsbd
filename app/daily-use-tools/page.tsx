import Link from 'next/link';

const tools = [
  { name: 'Age Calculator', href: '/daily-use-tools/age-calculator', description: 'Calculate your age from your date of birth.' },
  { name: 'Bangla Calendar', href: '/daily-use-tools/bangla-calendar', description: 'Convert Gregorian date to Bangla date.' },
  { name: 'BMI Calculator', href: '/daily-use-tools/bmi-calculator', description: 'Calculate your Body Mass Index.' },
  { name: 'Daily Habit Tracker', href: '/daily-use-tools/daily-habit-tracker', description: 'Track your daily habits and build routines.' },
  { name: 'Date Calculator', href: '/daily-use-tools/date-calculator', description: 'Calculate the duration between two dates.' },
  { name: 'Notepad', href: '/daily-use-tools/notepad', description: 'A simple notepad to jot down your thoughts.' },
];

export default function DailyUseTools() {
  return (
    <main className="container mx-auto px-4">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold">Daily Use Tools</h1>
        <p className="text-lg text-gray-600">A collection of tools for daily use.</p>
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
