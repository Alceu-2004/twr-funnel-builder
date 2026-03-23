export interface FunnelMetrics {
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
}

export function generateMetrics(sent: number): FunnelMetrics {
  const openedRaw = sent * randomBetween(0.4, 0.7);
  const clickedRaw = openedRaw * randomBetween(0.2, 0.5);
  const convertedRaw = clickedRaw * randomBetween(0.1, 0.3);

  return {
    sent,
    opened: Math.floor(openedRaw),
    clicked: Math.floor(clickedRaw),
    converted: Math.floor(convertedRaw),
  };
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}