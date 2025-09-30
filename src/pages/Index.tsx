import { useState } from "react";
import { FlaskConical, BarChart3, Table2 } from "lucide-react";
import DataUpload from "@/components/DataUpload";
import ClusterCard from "@/components/ClusterCard";
import ScatterPlot from "@/components/ScatterPlot";
import DataTable from "@/components/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  // Sample data for demonstration
  const sampleScatterData = [
    // Cluster 1 - Academic-Oriented
    ...Array.from({ length: 25 }, (_, i) => ({
      x: 7 + Math.random() * 3,
      y: 1 + Math.random() * 3,
      cluster: 1
    })),
    // Cluster 2 - Balanced
    ...Array.from({ length: 30 }, (_, i) => ({
      x: 5 + Math.random() * 3,
      y: 5 + Math.random() * 3,
      cluster: 2
    })),
    // Cluster 3 - Organization-Oriented
    ...Array.from({ length: 20 }, (_, i) => ({
      x: 1 + Math.random() * 3,
      y: 7 + Math.random() * 3,
      cluster: 3
    })),
    // Cluster 4 - Busy All-Rounder
    ...Array.from({ length: 25 }, (_, i) => ({
      x: 7 + Math.random() * 3,
      y: 7 + Math.random() * 3,
      cluster: 4
    })),
  ];

  const clusterInfo = [
    {
      number: 1,
      title: "Academic-Oriented",
      description: "Students who primarily focus on their studies with minimal participation in extracurricular activities and organizations.",
      count: 25,
      color: "hsl(210, 85%, 55%)"
    },
    {
      number: 2,
      title: "Balanced",
      description: "Students who maintain a healthy balance between academic responsibilities and non-academic activities.",
      count: 30,
      color: "hsl(150, 70%, 50%)"
    },
    {
      number: 3,
      title: "Organization-Oriented",
      description: "Students highly active in student organizations and extracurricular activities with less emphasis on academic pursuits.",
      count: 20,
      color: "hsl(280, 65%, 60%)"
    },
    {
      number: 4,
      title: "Busy All-Rounder",
      description: "Students who excel in both academic and organizational activities, maintaining high engagement across all areas.",
      count: 25,
      color: "hsl(30, 90%, 55%)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Academic Clustering Analysis
              </h1>
              <p className="text-sm text-muted-foreground">
                Discover student behavior patterns through data clustering
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Upload Section */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Step 1: Upload Your Dataset</h2>
            <p className="text-sm text-muted-foreground">
              Upload a CSV file containing your academic survey data for clustering analysis
            </p>
          </div>
          <DataUpload onDataUpload={setUploadedData} />
        </section>

        {/* Data Preview */}
        {uploadedData.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Data Preview</h2>
              <p className="text-sm text-muted-foreground">
                Review your uploaded dataset (showing first 10 rows)
              </p>
            </div>
            <DataTable data={uploadedData} />
          </section>
        )}

        {/* Clusters Overview */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Step 2: Cluster Analysis Results</h2>
            <p className="text-sm text-muted-foreground">
              Four distinct student behavior patterns identified from the survey data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clusterInfo.map((cluster) => (
              <ClusterCard
                key={cluster.number}
                clusterNumber={cluster.number}
                title={cluster.title}
                description={cluster.description}
                count={cluster.count}
                color={cluster.color}
              />
            ))}
          </div>
        </section>

        {/* Visualization */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Step 3: Data Visualization</h2>
            <p className="text-sm text-muted-foreground">
              Interactive scatter plot showing the distribution of clusters
            </p>
          </div>

          <Tabs defaultValue="scatter" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="scatter" className="space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Scatter Plot</span>
              </TabsTrigger>
              <TabsTrigger value="table" className="space-x-2">
                <Table2 className="w-4 h-4" />
                <span>Data Table</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scatter" className="mt-6">
              <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
                <ScatterPlot data={sampleScatterData} />
              </div>
            </TabsContent>
            
            <TabsContent value="table" className="mt-6">
              {uploadedData.length > 0 ? (
                <DataTable data={uploadedData} />
              ) : (
                <div className="bg-card rounded-lg p-12 text-center border border-dashed border-border">
                  <p className="text-muted-foreground">
                    Upload a dataset to view the data table
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Academic Clustering Analysis Tool • Built for data-driven insights</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
