"use client";

import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface OverviewProps {
    data: any[];
}

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active) {
        return (
            <div className="text-sm shadow-lg rounded-lg p-2 bg-primary-foreground">
                <p className="text-primary font-semibold">{label}</p>
                <p className="text-muted-foreground">
                    Total: ${payload?.[0].value}
                </p>
            </div>
        );
    }

    return null;
};

export const Overview: React.FC<OverviewProps> = ({ data }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
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
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
                {/* #3b82f6 */}
            </BarChart>
        </ResponsiveContainer>
    );
};
