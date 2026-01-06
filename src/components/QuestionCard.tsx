import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface QuestionCardProps {
  id: string;
  label: string;
  template: string;
  placeholder: string;
  onSubmit: (questionId: string, value: string) => void;
  isLoading: boolean;
}

export const QuestionCard = ({
  id,
  label,
  template,
  placeholder,
  onSubmit,
  isLoading,
}: QuestionCardProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(id, value.trim());
    }
  };

  // Split template into parts around {value}
  const parts = template.split("{value}");

  return (
    <form onSubmit={handleSubmit}>
      <div className="glass-card p-4">
        <span className="text-xs font-medium text-primary mb-2 block">
          {label}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-foreground/80">{parts[0]}</span>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-48 border-0 border-b border-primary/30 rounded-none bg-transparent 
                       focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary
                       px-1 h-8 text-primary font-mono"
            disabled={isLoading}
          />
          <span className="text-foreground/80">{parts[1]}</span>
          <Button
            type="submit"
            variant="glow"
            size="icon"
            className="h-8 w-8 ml-auto shrink-0"
            disabled={!value.trim() || isLoading}
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </form>
  );
};
