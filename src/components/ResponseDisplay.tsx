import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ResponseDisplayProps {
  response: string | null;
  isLoading: boolean;
  repository: string | null;
}

export const ResponseDisplay = ({ response, isLoading, repository }: ResponseDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (response) {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!repository && !response && !isLoading) {
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Terminal className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-lg mb-2">Nenhuma análise ainda</p>
        <p className="text-muted-foreground/60 text-sm">
          Digite o nome do repositório acima para começar
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm font-mono text-muted-foreground">
            {repository || "output"}
          </span>
        </div>
        {response && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 min-h-[250px] max-h-[500px] overflow-auto">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-mono text-sm">
              <span className="animate-pulse">▌</span>
              <span>Analisando repositório...</span>
            </div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-secondary/50 rounded animate-pulse"
                  style={{ 
                    width: `${Math.random() * 40 + 60}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <pre className="terminal-text text-foreground whitespace-pre-wrap break-words">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
};
