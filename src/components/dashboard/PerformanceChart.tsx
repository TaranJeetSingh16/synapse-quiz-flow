
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample performance data
const performanceData = [
  { name: 'Mon', score: 65, attention: 75 },
  { name: 'Tue', score: 72, attention: 68 },
  { name: 'Wed', score: 80, attention: 82 },
  { name: 'Thu', score: 76, attention: 70 },
  { name: 'Fri', score: 85, attention: 78 },
  { name: 'Sat', score: 90, attention: 85 },
  { name: 'Sun', score: 78, attention: 72 },
];

const PerformanceChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Weekly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar 
                name="Quiz Score (%)" 
                dataKey="score" 
                fill="#6E59A5" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                name="Attention Level (%)" 
                dataKey="attention" 
                fill="#F97316" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
