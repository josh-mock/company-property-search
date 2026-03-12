import { CompanySearch } from "@/features/companies/components/CompanySearch";
import { TitleSearch } from "@/features/titles/components/TitleSearch";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

export const Search = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <Tabs defaultValue="company" className="w-full max-w-4xl">
        <TabsList className="w-full">
          <TabsTrigger value="company" className="flex-1">
            Company Search
          </TabsTrigger>
          <TabsTrigger value="title" className="flex-1">
            Title Search
          </TabsTrigger>
        </TabsList>
        <TabsContent value="company" className="mt-8">
          <CompanySearch />
        </TabsContent>
        <TabsContent value="title" className="mt-8">
          <TitleSearch />
        </TabsContent>
      </Tabs>
    </div>
  );
};
