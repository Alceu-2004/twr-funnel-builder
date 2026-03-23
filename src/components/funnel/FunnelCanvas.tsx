import { useFunnelStore } from "@/store/funnelStore";
import { FunnelNode } from "./FunnelNode";

export function FunnelCanvas() {
  const nodes = useFunnelStore((state) => state.nodes);

  return (
    <div className="w-full h-[600px] border rounded-lg p-4 bg-gray-50">
      <div className="flex gap-4 flex-wrap">
        {nodes.map((node) => (
          <FunnelNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}