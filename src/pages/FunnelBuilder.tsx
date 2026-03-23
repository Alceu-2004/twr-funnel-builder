import { FunnelCanvas } from "@/components/funnel/FunnelCanvas";
import { NodeToolbar } from "@/components/funnel/NodeToolbar";
import { Button } from "@/components/ui/button";
import { useFunnel } from "@/hooks/useFunnel";

export function FunnelBuilder() {
  const { saveFunnel, simulateMetrics } = useFunnel();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Funnel Builder</h1>

      <NodeToolbar />

      <div className="flex gap-2 mb-4">
        <Button onClick={saveFunnel}>Save Funnel</Button>
        <Button onClick={simulateMetrics}>Simulate Performance</Button>
      </div>

      <FunnelCanvas />
    </div>
  );
}