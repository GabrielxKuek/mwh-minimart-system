import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailableTasks from "../components/task/AvailableTasks";
import YourTasks from "../components/task/YourTasks";

const Tasks = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <Tabs defaultValue="your" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="your">Your Tasks</TabsTrigger>
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="your" className="space-y-4">
            <YourTasks 
              title="Your Tasks"
            />
          </TabsContent>
          
          <TabsContent value="available" className="space-y-4">
            <AvailableTasks 
              title="Available Tasks"
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Tasks;