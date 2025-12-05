import { GitBranch } from "lucide-react";

export const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 animate-pulse-glow">
        <GitBranch className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-gradient">Repo</span>{" "}
        <span className="text-foreground">Analyzer</span>
      </h1>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Insira o nome do repositório para análise pelo agente
      </p>
    </header>
  );
};
