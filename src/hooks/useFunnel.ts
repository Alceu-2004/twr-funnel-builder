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
    let updatedNodes = [...nodes];

    const startNodes = nodes.filter(
      (node) => node.data.type === "start"
    );

    startNodes.forEach((startNode) => {
      let currentId = startNode.id;
      let currentValue = 1000;

      while (true) {
        const node = updatedNodes.find((n) => n.id === currentId);
        if (!node) break;

        const metrics = generateMetrics(currentValue);

        updatedNodes = updatedNodes.map((n) =>
          n.id === currentId
            ? {
                ...n,
                data: {
                  ...n.data,
                  metrics,
                },
              }
            : n
        );

        const nextEdges = edges.filter((e) => e.source === currentId);

        if (nextEdges.length === 0) break;

        const nextEdge = nextEdges[0];
        currentId = nextEdge.target;

        currentValue = Math.max(
          Math.floor(currentValue * (0.6 + Math.random() * 0.25)),
          10
        );
      }
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