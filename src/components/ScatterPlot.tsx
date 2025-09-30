import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface DataPoint {
  x: number;
  y: number;
  cluster: number;
  name?: string;
}

interface ScatterPlotProps {
  data: DataPoint[];
}

const CLUSTER_COLORS = [
  'hsl(210, 85%, 55%)',  // Cluster 1 - Blue
  'hsl(150, 70%, 50%)',  // Cluster 2 - Green
  'hsl(280, 65%, 60%)',  // Cluster 3 - Purple
  'hsl(30, 90%, 55%)',   // Cluster 4 - Orange
];

const ScatterPlot = ({ data }: ScatterPlotProps) => {
  // Group data by cluster
  const clusterData = [1, 2, 3, 4].map(clusterId => ({
    clusterId,
    data: data.filter(d => d.cluster === clusterId),
    color: CLUSTER_COLORS[clusterId - 1]
  }));

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          type="number" 
          dataKey="x" 
          name="Academic Activity"
          label={{ value: 'Academic Activity Score', position: 'bottom', offset: 40 }}
          stroke="hsl(var(--foreground))"
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name="Organization Activity"
          label={{ value: 'Organization Activity Score', angle: -90, position: 'left', offset: 40 }}
          stroke="hsl(var(--foreground))"
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
        <Legend 
          verticalAlign="top" 
          height={36}
          formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
        />
        
        {clusterData.map(({ clusterId, data: clusterPoints, color }) => (
          <Scatter
            key={clusterId}
            name={`Cluster ${clusterId}`}
            data={clusterPoints}
            fill={color}
            shape="circle"
          >
            {clusterPoints.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Scatter>
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
