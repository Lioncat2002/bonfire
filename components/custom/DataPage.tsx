
import { PriceTable } from "@/components/custom/PriceTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function DataPage(){
    return <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new">NEW</TabsTrigger>
          <TabsTrigger value="trending">TRENDING</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <PriceTable />
        </TabsContent>
        <TabsContent value="trending">Change your password here.</TabsContent>
      </Tabs>
}