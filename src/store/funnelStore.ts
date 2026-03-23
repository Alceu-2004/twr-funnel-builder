import { create } from "zustand";
import type { FunnelNode, FunnelEdge } from "@/types/Funnel";

interface FunnelState {
  nodes: FunnelNode[];
  edges: FunnelEdge[];
  
  addNode: (node: FunnelNode) => void;
  updateNode: (nodeId: string, data: Partial<FunnelNode>) => void;
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
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  updateNode: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...data } : node
      ),
    })),

  deleteNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    })),

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