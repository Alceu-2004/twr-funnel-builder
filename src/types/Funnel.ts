import type { Node, Edge } from "reactflow";

export type NodeType =
  | "start"
  | "email"
  | "sms"
  | "delay"
  | "condition"
  | "end";

export interface FunnelNodeData {
  label: string;
  type: NodeType;
  config?: Record<string, any>;
  metrics?: {
    sent?: number;
    opened?: number;
    clicked?: number;
    converted?: number;
  };
}

export type FunnelNode = Node<FunnelNodeData>;

export type FunnelEdge = Edge;

export interface Funnel {
  id: string;
  name: string;
  nodes: FunnelNode[];
  edges: FunnelEdge[];
  createdAt: Date;
}