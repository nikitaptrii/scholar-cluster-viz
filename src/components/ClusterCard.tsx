import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface ClusterCardProps {
  clusterNumber: number;
  title: string;
  description: string;
  count: number;
  color: string;
}

const ClusterCard = ({ clusterNumber, title, description, count, color }: ClusterCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge 
            className="mb-2"
            style={{ backgroundColor: color, color: 'white' }}
          >
            Cluster {clusterNumber}
          </Badge>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">{count}</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Sample size</span>
          <span className="font-semibold text-foreground">{count} students</span>
        </div>
      </div>
    </Card>
  );
};

export default ClusterCard;
