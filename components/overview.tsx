'use client';

import {
      Line,
      LineChart,
      ResponsiveContainer,
      XAxis,
      YAxis,
      Legend,
      Tooltip,
} from 'recharts';

interface OverviewProps {
      data: any[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
      return (
            <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data}>
                        <XAxis
                              dataKey="name"
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                        />

                        <YAxis
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              tickFormatter={(value) => `$${value}`}
                        />

                        <Tooltip />
                        <Legend />

                        <Line
                              dataKey="total"
                              stroke="#00eeee"
                              type="monotone"
                              activeDot={{ r: 8 }}
                        />
                  </LineChart>
            </ResponsiveContainer>
      );
};
