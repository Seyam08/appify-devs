"use client";

import { memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrdersPoint, RevenuePoint, TrafficPoint, UserDistributionPoint } from "@/types/dashboard";

const PIE_COLORS = ["#2563eb", "#16a34a", "#7c3aed"];
const TRAFFIC_COLORS = ["#06b6d4", "#f59e0b", "#8b5cf6", "#ef4444"];

export const RevenueChart = memo(function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

export const OrdersChart = memo(function OrdersChart({ data }: { data: OrdersPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Per Month</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#7c3aed" animationDuration={900} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

export const UsersPieChart = memo(function UsersPieChart({ data }: { data: UserDistributionPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={95} label>
              {data.map((entry, index) => (
                <Cell key={`users-${entry.name}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

export const TrafficSourceChart = memo(function TrafficSourceChart({ data }: { data: TrafficPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Source</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="source" innerRadius={50} outerRadius={95}>
              {data.map((entry, index) => (
                <Cell key={`traffic-${entry.source}`} fill={TRAFFIC_COLORS[index % TRAFFIC_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});
