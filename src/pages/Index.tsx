import { useState } from "react";
import { Header } from "@/components/Header";
import { RepositoryInput } from "@/components/RepositoryInput";
import { ResponseDisplay } from "@/components/ResponseDisplay";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [currentRepo, setCurrentRepo] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (repository: string) => {
    setIsLoading(true);
    setCurrentRepo(repository);
    setResponse(null);

    try {
      // Simulação - substitua pela chamada real do endpoint
      // const res = await fetch('/api/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ repository })
      // });
      // const data = await res.json();
      // setResponse(data.result);

      // Simulação de resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResponse(`Análise do repositório: ${repository}

📊 Estatísticas:
├── Commits: 1,234
├── Contributors: 45
├── Stars: 2.5k
└── Forks: 312

📁 Estrutura do Projeto:
├── src/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── tests/
└── docs/

🔍 Observações do Agente:
O repositório apresenta uma estrutura bem organizada com separação clara de responsabilidades. O código segue boas práticas de desenvolvimento e possui cobertura de testes adequada.

✅ Status: Análise concluída com sucesso`);

      toast({
        title: "Análise concluída",
        description: `Repositório ${repository} analisado com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar o repositório. Tente novamente.",
        variant: "destructive",
      });
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12 md:py-20">
        <Header />
        
        <div className="space-y-6">
          <RepositoryInput onSubmit={handleSubmit} isLoading={isLoading} />
          <ResponseDisplay 
            response={response} 
            isLoading={isLoading} 
            repository={currentRepo}
          />
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-muted-foreground/50 text-sm font-mono">
          Powered by AI Agent
        </p>
      </footer>
    </div>
  );
};

export default Index;
