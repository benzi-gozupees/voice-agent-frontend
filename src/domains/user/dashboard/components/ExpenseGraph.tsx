import { format } from 'date-fns';
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

import { ExpenseChart } from '@domains/user/expenses/types';
import useFormatCurrency from '@hooks/useFormatCurrency'; // Adjust the path as needed
import { formatDate } from '@utils/formatDate';

const renderTooltip = (props: any, formatCurrency: (value?: number) => string) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
        const date = formatDate(payload[0].payload.date);
        return (
            <div className="bg-light p-4 rounded-2xl shadow-sm">
                <p className="text-tiny text-default-500">{date}</p>
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

export default function ExpenseGraph({ data }: { data: ExpenseChart[] }) {
    const formatCurrency = useFormatCurrency();

    const chartData = data.map(item => ({
        name: format(item.date, 'd'),
        pv: item.total,
        date: item.date,
    }));

    const formatYAxisTick = (value: number) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toString();
    };

    return (
        <ResponsiveContainer height="100%" width="100%">
            <BarChart
                data={chartData}
                height={300}
                margin={{
                    top: 15,
                    right: 20,
                    left: 0,
                    bottom: 5,
                }}
                width={500}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#FAEEFF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ECE6FF" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="colorUvHighlight" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#F1CFFF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#DED3FF" stopOpacity={0.8} />
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
                    activeBar={<Rectangle fill="url(#colorUvHighlight)" radius={6} />}
                    barSize={20}
                    dataKey="pv"
                    fill="url(#colorUv)"
                    fillOpacity={1}
                    radius={6}
                    type="linear"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
