import { v4 as uuidv4 } from "uuid";
import type { FunnelNode, NodeType } from "@/types/Funnel";

export const nodeFactory = {
  createNode: (
    type: NodeType,
    position: { x: number; y: number }
  ): FunnelNode => {
    const baseNode: FunnelNode = {
      id: uuidv4(),
      type: "default", 
      position,
      data: {
        label: "",
        type,
        config: {},
        metrics: {
          sent: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
        },
      },
    };

    switch (type) {
      case "start":
        return { ...baseNode, data: { ...baseNode.data, label: "Start" } };
      case "email":
        return { ...baseNode, data: { ...baseNode.data, label: "Email" } };
      case "sms":
        return { ...baseNode, data: { ...baseNode.data, label: "SMS" } };
      case "delay":
        return { ...baseNode, data: { ...baseNode.data, label: "Delay" } };
      case "condition":
        return { ...baseNode, data: { ...baseNode.data, label: "Condition" } };
      case "end":
        return { ...baseNode, data: { ...baseNode.data, label: "End" } };
      default:
        return baseNode;
    }
  },
};