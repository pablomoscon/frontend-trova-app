import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { DashboardChartSectionProps } from '../../../Interfaces/DashboardInterface';

const ChartSection: React.FC<DashboardChartSectionProps> = ({
  title,
  data,
  dataKey,
}) => {
  const [expanded, setExpanded] = useState(false);

  const sortedData = [...data].sort((a, b) => b.visits - a.visits);
  const visibleData = expanded ? sortedData : sortedData.slice(0, 10);

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-xl font-semibold text-gray-800'>{title}</h3>
        {data.length > 10 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className='text-sm text-blue-600 hover:underline'
          >
            {expanded ? 'Mostrar menos' : 'Mostrar más'}
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <p className='text-gray-500'>No visits recorded yet.</p>
      ) : (
        <div className='overflow-x-auto'>
          <ResponsiveContainer
            width='100%'
            height={Math.max(300, visibleData.length * 40)}
          >
            <BarChart
              layout='vertical'
              data={visibleData}
              margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' />
              <YAxis
                dataKey={dataKey}
                type='category'
                width={120}
                tick={{ fontSize: 12, fill: '#4B5563' }}
                tickFormatter={(value: string) =>
                  value.length > 20 ? value.slice(0, 20) + '…' : value
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  fontSize: '13px',
                  color: '#111827',
                }}
                wrapperStyle={{ outline: 'none' }}
                cursor={{ fill: '#f9fafb' }}
              />
              <Bar dataKey='visits' fill='#3B82F6' radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartSection;
