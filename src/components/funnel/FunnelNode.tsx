import { Card, CardContent } from "@/components/ui/card";
import type { FunnelNode as FunnelNodeType } from "@/types/Funnel";

interface Props {
  node: FunnelNodeType;
}

export function FunnelNode({ node }: Props) {
  return (
    <Card className="w-40 shadow-md">
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm">{node.label}</h3>

        <div className="text-xs mt-2 space-y-1">
          <p>Sent: {node.metrics?.sent ?? 0}</p>
          <p>Opened: {node.metrics?.opened ?? 0}</p>
          <p>Clicked: {node.metrics?.clicked ?? 0}</p>
          <p>Converted: {node.metrics?.converted ?? 0}</p>
        </div>
      </CardContent>
    </Card>
  );
}