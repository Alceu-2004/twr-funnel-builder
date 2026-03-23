export type NodeType = "start" | "email" | "sms" | "delay" | "condition" | "end";

export interface FunnelNode {
  id: string;
  type: NodeType;
  label: string;
  config?: Record<string, any>;
  position: {
    x: number;
    y: number;
  };
  metrics?: {
    sent?: number;
    opened?: number;
    clicked?: number;
    converted?: number;
  };
}

export interface FunnelEdge {
  id: string;
  source: string;
  target: string;
}

export interface Funnel {
  id: string;
  name: string;
  nodes: FunnelNode[];
  edges: FunnelEdge[];
  createdAt: Date;
}