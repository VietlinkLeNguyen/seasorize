import { useState } from 'react';
import { ListRecentDetected } from './RecentDetect';
import Summary from './Summary';

export default function Dashboard() {
  const data = [
    {
      amount: 12,
      title: 'Monitored URLs'
    },
    {
      amount: 5,
      title: 'Changes Detected'
    },
    {
      amount: 156,
      title: 'Total Analyses'
    }
  ]; // Example data array
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">現在の状況</h1>
      <Summary />
      <ListRecentDetected />
    </div>
  );
}
