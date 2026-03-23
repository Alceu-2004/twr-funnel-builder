import { useEffect } from "react";
import { useFunnelStore } from "@/store/funnelStore";
import { storageService } from "@/services/storageService";
import { generateMetrics } from "@/utils/generateMetrics";
import type { Funnel } from "@/types/Funnel";

export function useFunnel() {
  const { nodes, edges, setNodes, setEdges } = useFunnelStore();

  useEffect(() => {
    const saved = storageService.loadFunnel();
    if (saved) {
      setNodes(saved.nodes);
      setEdges(saved.edges);
    }
  }, [setNodes, setEdges]);

  function saveFunnel() {
    const funnel: Funnel = {
      id: "1",
      name: "My Funnel",
      nodes,
      edges,
      createdAt: new Date(),
    };

    storageService.saveFunnel(funnel);
  }

  function simulateMetrics() {
    const updatedNodes = nodes.map((node) => {
      const metrics = generateMetrics(1000);
      return { ...node, metrics };
    });

    setNodes(updatedNodes);
  }

  return {
    nodes,
    edges,
    saveFunnel,
    simulateMetrics,
  };
}