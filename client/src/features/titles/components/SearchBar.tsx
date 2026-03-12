import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useState } from "react";

export const SearchBar = ({
  onSearch,
  reset,
}: {
  onSearch: (titleNumber: string) => void;
  reset: () => void;
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => onSearch(input);

  return (
    <div className="flex items-center gap-2">
      <InputGroup className="w-xs">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search title number..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </InputGroup>
      <Button onClick={handleSubmit}>Search</Button>
      <Button
        variant="outline"
        onClick={() => {
          reset();
          setInput("");
        }}
      >
        Reset
      </Button>
    </div>
  );
};
