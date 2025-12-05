import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, GitBranch } from "lucide-react";

interface RepositoryInputProps {
  onSubmit: (repository: string) => void;
  isLoading: boolean;
}

export const RepositoryInput = ({ onSubmit, isLoading }: RepositoryInputProps) => {
  const [repository, setRepository] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repository.trim() && !isLoading) {
      onSubmit(repository.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass-card p-2 flex items-center gap-2">
        <div className="flex items-center gap-3 px-3 text-muted-foreground">
          <GitBranch className="w-5 h-5" />
        </div>
        <Input
          value={repository}
          onChange={(e) => setRepository(e.target.value)}
          placeholder="owner/repository"
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          variant="glow" 
          size="icon" 
          className="h-10 w-10 shrink-0"
          disabled={!repository.trim() || isLoading}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
