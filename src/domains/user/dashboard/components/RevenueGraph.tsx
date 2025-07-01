import {
    Bar,
    BarChart,
    CartesianGrid,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import useFormatCurrency from '@hooks/useFormatCurrency';
import { formatDate } from '@utils/formatDate';

const renderTooltip = (props: any, formatCurrency: (value?: number) => string) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
        return (
            <div className="bg-light p-4 rounded-2xl shadow-sm">
                <p className="text-tiny text-default-500">{formatDate(payload[0].payload.date)}</p>
                <div className="mt-2 flex items-center gap-2 text-medium">
                    <span className="font-semibold text-default-800">
                        {formatCurrency(payload[0].value)}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

const formatYAxisTick = (value: number) => {
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
};

export default function RevenueGraph({ chartData }: any) {
    const formatCurrency = useFormatCurrency();
    return (
        <ResponsiveContainer height="100%" width="100%">
            <BarChart
                data={chartData}
                height={300}
                margin={{
                    top: 15,
                    right: 10,
                    left: 0,
                    bottom: 5,
                }}
                width={500}
            >
                <defs>
                    <linearGradient id="colorUv2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#DDF0FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#CFE2FF" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="colorUv2Highlight" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#E8F3FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#66AEE6" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <CartesianGrid stroke="#ECE9F1" vertical={false} />
                <XAxis
                    axisLine={{ stroke: '#ECE9F1' }}
                    dataKey="name"
                    strokeWidth={1}
                    tick={{ fontSize: '10px' }}
                    tickLine={{ stroke: '#FFF' }}
                />
                <YAxis
                    axisLine={{ stroke: '#ECE9F1' }}
                    strokeWidth={1}
                    tick={{ fontSize: '10px' }}
                    tickFormatter={formatYAxisTick}
                    tickLine={{ stroke: '#FFF' }}
                />
                <Tooltip
                    content={props => renderTooltip(props, formatCurrency)}
                    cursor={{ stroke: 'none', strokeWidth: 1, strokeDasharray: '3', fill: 'none' }}
                />
                <Bar
                    activeBar={<Rectangle fill="url(#colorUv2Highlight)" radius={6} />}
                    barSize={20}
                    dataKey="pv"
                    fill="url(#colorUv2)"
                    fillOpacity={1}
                    radius={6}
                    type="linear"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
