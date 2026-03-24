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
import { nodeFactory } from "@/factory/nodeFactory";
import type { NodeProps, Connection, Edge } from "reactflow";

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

  const addEdgeStore = useFunnelStore((state) => state.addEdge);
  const insertNodeBetween = useFunnelStore((s) => s.insertNodeBetween);

  const onNodesChange = (changes: any) => {
    setNodes(applyNodeChanges(changes, nodes));
  };

  const onEdgesChange = (changes: any) => {
    setEdges(applyEdgeChanges(changes, edges));
  };

  const onConnect = (connection: Connection) => {
    if (!connection.source || !connection.target) return;

    const alreadyExists = edges.some(
    (e) =>
      e.source === connection.source &&
      e.target === connection.target
  );

  if (alreadyExists) return;

  const alreadyHasOutgoing = edges.some(
    (e) => e.source === connection.source
  );

  if (alreadyHasOutgoing) return;

  const newEdge: Edge = {
    id: `${connection.source}-${connection.target}`,
    source: connection.source,
    target: connection.target,
    sourceHandle: connection.sourceHandle ?? null,
    targetHandle: connection.targetHandle ?? null,
    type: "default",
  };

    addEdgeStore(newEdge);
  };

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    if (!newConnection.source || !newConnection.target) return;

    const alreadyExists = edges.some(
    (e) =>
      e.source === newConnection.source &&
      e.target === newConnection.target
  );

  if (alreadyExists) return;

  const updatedEdge: Edge = {
    id: `${newConnection.source}-${newConnection.target}`,
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle ?? null,
    targetHandle: newConnection.targetHandle ?? null,
    type: "default",
  };

  const newEdges = edges.map((e) =>
    e.id === oldEdge.id ? updatedEdge : e
  );

  setEdges(newEdges);
  };

const deleteEdge = useFunnelStore((state) => state.deleteEdge);

const onEdgeClick = (_: any, edge: Edge) => {
  const action = prompt(
    "Digite:\n1 - Inserir node\n2 - Deletar conexão"
  );

  if (action === "1") {
    const type = prompt(
      "Tipo do node (start, email, sms, delay, condition, end):"
    ) as any;

    if (!type) return;

    const newNode = nodeFactory.createNode(type, {
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
    });

    insertNodeBetween(edge.id, newNode);
  }

  if (action === "2") {
    deleteEdge(edge.id);
  }
};

  return (
    <div className="w-full h-[600px] border rounded-lg bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeClick={onEdgeClick}
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