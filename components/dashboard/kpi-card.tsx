import { memo } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
}

function KpiCardBase({ title, value, change }: KpiCardProps) {
  const isPositive = change >= 0;
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        <Badge variant={isPositive ? "positive" : "negative"} className="gap-1">
          <Icon className="h-3.5 w-3.5" />
          {isPositive ? "+" : ""}
          {change}%
        </Badge>
      </CardContent>
    </Card>
  );
}

export const KpiCard = memo(KpiCardBase);
