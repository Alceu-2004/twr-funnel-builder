import { Card, CardContent } from "@/components/ui/card";
import { Handle, Position } from "reactflow";
import type { FunnelNode as FunnelNodeType } from "@/types/Funnel";

interface Props {
  node: FunnelNodeType;
}

export function FunnelNode({ node }: Props) {
  const isStart = node.data.type === "start";
  const isEnd = node.data.type === "end";

  return (
    <div className="relative">
      {!isStart && (
        <Handle
          type="target"
          position={Position.Left}
        />
      )}

      <Card className="w-40 shadow-md">
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm">{node.data.label}</h3>

          <div className="text-xs mt-2 space-y-1">
            <p>Sent: {node.data.metrics?.sent ?? 0}</p>
            <p>Opened: {node.data.metrics?.opened ?? 0}</p>
            <p>Clicked: {node.data.metrics?.clicked ?? 0}</p>
            <p>Converted: {node.data.metrics?.converted ?? 0}</p>
          </div>
        </CardContent>
      </Card>

      {!isEnd && (
        <Handle
          type="source"
          position={Position.Right}
        />
      )}
    </div>
  );
}