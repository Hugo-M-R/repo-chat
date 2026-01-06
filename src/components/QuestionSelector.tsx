import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Question {
  id: string;
  template: string;
  placeholder: string;
  label: string;
}

interface QuestionSelectorProps {
  questions: Question[];
  onSubmit: (questionId: string, value: string) => void;
  isLoading: boolean;
  activeQuestion: string | null;
}

export const QuestionSelector = ({
  questions,
  onSubmit,
  isLoading,
  activeQuestion,
}: QuestionSelectorProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [value, setValue] = useState("");

  const selectedQuestion = questions.find((q) => q.id === selectedId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId && value.trim() && !isLoading) {
      onSubmit(selectedId, value.trim());
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Chips de seleção */}
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => {
              setSelectedId(question.id);
              setValue("");
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                selectedId === question.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "glass-card hover:border-primary/50"
              }`}
          >
            {question.label}
          </button>
        ))}
      </div>

      {/* Input para valor quando uma opção está selecionada */}
      {selectedQuestion && (
        <form onSubmit={handleSubmit}>
          <div className="glass-card p-4 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-3">
              {selectedQuestion.template.replace("{value}", "___")}
            </p>
            <div className="flex gap-2">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={selectedQuestion.placeholder}
                className="flex-1 border-primary/30 bg-transparent focus-visible:ring-primary/50"
                disabled={isLoading && activeQuestion === selectedId}
                autoFocus
              />
              <Button
                type="submit"
                variant="glow"
                size="icon"
                className="shrink-0"
                disabled={!value.trim() || (isLoading && activeQuestion === selectedId)}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
