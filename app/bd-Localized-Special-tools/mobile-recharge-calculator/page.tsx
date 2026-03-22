'use client';

import { useState, ReactNode } from 'react';

export default function RechargeCalculatorPage() {
    const [operator, setOperator] = useState('Grameenphone');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState<ReactNode>(null);

    const calculate = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setResult('Please enter a valid recharge amount.');
            return;
        }

        const sd = numAmount * 0.15;
        const subtotal = numAmount + sd;
        const vat = subtotal * 0.15;
        const sc = numAmount * 0.01;
        const totalDeductions = sd + vat + sc;
        const finalBalance = numAmount - totalDeductions;

        setResult(
            <div className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Operator:</strong> {operator}</p>
                <p><strong>Recharge Amount:</strong> ৳{numAmount.toFixed(2)}</p>
                <p><strong>SD (15%):</strong> ৳{sd.toFixed(2)}</p>
                <p><strong>VAT (15% on amount + SD):</strong> ৳{vat.toFixed(2)}</p>
                <p><strong>SC (1%):</strong> ৳{sc.toFixed(2)}</p>
                <hr className="my-2 border-gray-300 dark:border-gray-600" />
                <p><strong>Total Deduction:</strong> ৳{totalDeductions.toFixed(2)}</p>
                <p className="font-bold text-lg"><strong>Balance After Recharge:</strong> ৳{finalBalance.toFixed(2)}</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    BD SIM Recharge Calculator
                </h2>
                
                <div className="space-y-4">
                    <select 
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Grameenphone</option>
                        <option>Robi</option>
                        <option>Banglalink</option>
                        <option>Airtel</option>
                        <option>Teletalk</option>
                    </select>

                    <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter recharge amount"
                        className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />

                    <button 
                        onClick={calculate}
                        className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                    >
                        Calculate
                    </button>
                </div>

                {result && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {typeof result === 'string' ? <p className="text-red-500 text-center">{result}</p> : result}
                    </div>
                )}
            </div>
        </div>
    );
}
