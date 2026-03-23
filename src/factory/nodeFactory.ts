import { v4 as uuidv4 } from "uuid";
import type { FunnelNode, NodeType } from "@/types/Funnel";

export const nodeFactory = {
  createNode: (type: NodeType, position: { x: number; y: number }): FunnelNode => {
    const baseNode: FunnelNode = {
      id: uuidv4(),
      type,
      label: "",
      position,
      config: {},
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
      },
    };

    switch (type) {
      case "start":
        return { ...baseNode, label: "Start" };
      case "email":
        return { ...baseNode, label: "Email" };
      case "sms":
        return { ...baseNode, label: "SMS" };
      case "delay":
        return { ...baseNode, label: "Delay" };
      case "condition":
        return { ...baseNode, label: "Condition" };
      case "end":
        return { ...baseNode, label: "End" };
      default:
        return baseNode;
    }
  },
};