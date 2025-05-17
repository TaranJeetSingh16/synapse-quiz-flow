
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for the charts
const engagementData = [
  { date: 'Mon', users: 80, quizzes: 210, avgTime: 14 },
  { date: 'Tue', users: 95, quizzes: 250, avgTime: 15 },
  { date: 'Wed', users: 110, quizzes: 290, avgTime: 13 },
  { date: 'Thu', users: 100, quizzes: 280, avgTime: 16 },
  { date: 'Fri', users: 120, quizzes: 320, avgTime: 12 },
  { date: 'Sat', users: 150, quizzes: 380, avgTime: 10 },
  { date: 'Sun', users: 130, quizzes: 340, avgTime: 11 },
];

const categoryData = [
  { category: 'Science', value: 35, color: '#6E59A5' },
  { category: 'Programming', value: 25, color: '#F97316' },
  { category: 'Geography', value: 15, color: '#4CAF50' },
  { category: 'History', value: 15, color: '#2196F3' },
  { category: 'Art', value: 10, color: '#E91E63' },
];

const heatmapData = [
  { hour: '6 AM', value: 12 },
  { hour: '8 AM', value: 35 },
  { hour: '10 AM', value: 60 },
  { hour: '12 PM', value: 75 },
  { hour: '2 PM', value: 80 },
  { hour: '4 PM', value: 85 },
  { hour: '6 PM', value: 90 },
  { hour: '8 PM', value: 70 },
  { hour: '10 PM', value: 45 },
  { hour: '12 AM', value: 20 },
];

const EngagementInsights = () => {
  const [timeRange, setTimeRange] = React.useState('7days');
  
  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>User Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={engagementData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#6E59A5" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="quizzes" stroke="#F97316" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Daily Usage Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={heatmapData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="hour" />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value) => [`${value} users`, 'Active']}
                    labelFormatter={(hour) => `Time: ${hour}`}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#6E59A5" 
                    radius={[4, 4, 0, 0]}
                  >
                    {heatmapData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`rgba(110, 89, 165, ${entry.value / 100})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Completion Time by Difficulty Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { level: 'Level 1', time: 8 },
                  { level: 'Level 2', time: 12 },
                  { level: 'Level 3', time: 18 },
                  { level: 'Level 4', time: 25 },
                  { level: 'Level 5', time: 30 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="level" />
                <YAxis label={{ value: 'Avg. Time (seconds)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="time" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementInsights;
