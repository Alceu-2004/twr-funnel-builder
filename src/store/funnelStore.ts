import { create } from "zustand";
import type { FunnelNode, FunnelEdge } from "@/types/Funnel";

interface FunnelState {
  nodes: FunnelNode[];
  edges: FunnelEdge[];
  
  addNode: (node: FunnelNode) => void;
  updateNode: (nodeId: string, data: Partial<FunnelNode["data"]>) => void;
  deleteNode: (nodeId: string) => void;
  
  addEdge: (edge: FunnelEdge) => void;
  deleteEdge: (edgeId: string) => void;

  setNodes: (nodes: FunnelNode[]) => void;
  setEdges: (edges: FunnelEdge[]) => void;
}

export const useFunnelStore = create<FunnelState>((set) => ({
  nodes: [],
  edges: [],

  addNode: (node) =>
    set((state) => {
      const lastNode = state.nodes[state.nodes.length - 1];

      const newEdges = lastNode
        ? [
            ...state.edges,
            {
              id: `${lastNode.id}-${node.id}`,
              source: lastNode.id,
              target: node.id,
              type: "default",
            },
          ]
        : state.edges;

      return {
        nodes: [...state.nodes, node],
        edges: newEdges,
      };
    }),

  updateNode: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            }
          : node
      ),
    })),

  deleteNode: (nodeId) =>
    set((state) => {
      const incomingEdges = state.edges.filter(
        (edge) => edge.target === nodeId
      );

      const outgoingEdges = state.edges.filter(
        (edge) => edge.source === nodeId
      );

      const reconnectEdges: FunnelEdge[] = incomingEdges.flatMap((inEdge) =>
        outgoingEdges.map((outEdge) => ({
          id: `${inEdge.source}-${outEdge.target}`,
          source: inEdge.source,
          target: outEdge.target,
          type: "default",
        }))
      );

      return {
        nodes: state.nodes.filter((node) => node.id !== nodeId),

        edges: [
          ...state.edges.filter(
            (edge) =>
              edge.source !== nodeId && edge.target !== nodeId
          ),

          ...reconnectEdges,
        ],
      };
    }),

  addEdge: (edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
    })),

  deleteEdge: (edgeId) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    })),

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}));