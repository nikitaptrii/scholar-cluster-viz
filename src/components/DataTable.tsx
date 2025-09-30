import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DataTableProps {
  data: any[];
}

const CLUSTER_COLORS = [
  'hsl(210, 85%, 55%)',
  'hsl(150, 70%, 50%)',
  'hsl(280, 65%, 60%)',
  'hsl(30, 90%, 55%)',
];

const DataTable = ({ data }: DataTableProps) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);
  const displayData = data.slice(0, 10); // Show first 10 rows

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {headers.map((header) => (
                <TableHead key={header} className="font-semibold">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                {headers.map((header) => (
                  <TableCell key={`${idx}-${header}`}>
                    {header.toLowerCase().includes('cluster') ? (
                      <Badge 
                        style={{ 
                          backgroundColor: CLUSTER_COLORS[parseInt(row[header]) - 1],
                          color: 'white' 
                        }}
                      >
                        {row[header]}
                      </Badge>
                    ) : (
                      <span className="text-sm">{row[header]}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {data.length > 10 && (
        <div className="px-4 py-3 bg-muted/30 text-center text-sm text-muted-foreground">
          Showing 10 of {data.length} rows
        </div>
      )}
    </Card>
  );
};

export default DataTable;
