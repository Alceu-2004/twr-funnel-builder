import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFunnelStore } from "@/store/funnelStore";
import { FunnelNode } from "./FunnelNode";
import type { NodeProps } from "reactflow";

const nodeTypes = {
  default: (props: NodeProps) => (
    <FunnelNode node={props as any} />
  ),
};

export function FunnelCanvas() {
  const nodes = useFunnelStore((state) => state.nodes);
  const edges = useFunnelStore((state) => state.edges);
  const setNodes = useFunnelStore((state) => state.setNodes);
  const setEdges = useFunnelStore((state) => state.setEdges);

  const onNodesChange = (changes: any) => {
    setNodes(applyNodeChanges(changes, nodes));
  };

  const onEdgesChange = (changes: any) => {
    setEdges(applyEdgeChanges(changes, edges));
  };

  return (
    <div className="w-full h-[600px] border rounded-lg bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        defaultEdgeOptions={{
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
        }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}