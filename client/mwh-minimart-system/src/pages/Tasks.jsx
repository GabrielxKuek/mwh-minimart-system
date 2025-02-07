import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import AvailableTasks from "../components/task/AvailableTasks";
import SuggestedTasks from "../components/task/SuggestedTasks";
import YourTasks from "../components/task/YourTasks";

const Tasks = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto space-y-8">
        <Tabs defaultValue="your" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="your">Your Tasks</TabsTrigger>
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="your" className="space-y-4">
            <YourTasks title="Your Tasks" />
          </TabsContent>
          
          <TabsContent value="available" className="space-y-4">
            <AvailableTasks title="Available Tasks" />
          </TabsContent>
        </Tabs>

        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">
            Suggested Tasks
          </h1>
          <Separator className="my-4" />
          <SuggestedTasks />
        </div>
      </div>
    </main>
  );
};

export default Tasks;