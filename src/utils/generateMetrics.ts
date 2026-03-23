export interface FunnelMetrics {
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
}

export function generateMetrics(sent: number): FunnelMetrics {
  const opened = Math.floor(sent * randomBetween(0.4, 0.7));
  const clicked = Math.floor(opened * randomBetween(0.2, 0.5));
  const converted = Math.floor(clicked * randomBetween(0.1, 0.3));

  return {
    sent,
    opened,
    clicked,
    converted,
  };
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}