import { useState } from "react";
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { ResponseDisplay } from "@/components/ResponseDisplay";
import { useToast } from "@/hooks/use-toast";

const QUESTIONS = [
  {
    id: "analyze-repo",
    template: "Analise o repositório {value} e liste os principais arquivos",
    placeholder: "owner/repository",
    label: "Análise de Repositório",
  },
  {
    id: "list-issues",
    template: "Liste as issues abertas do repositório {value}",
    placeholder: "owner/repository",
    label: "Listar Issues",
  },
  {
    id: "check-commits",
    template: "Mostre os últimos commits do repositório {value}",
    placeholder: "owner/repository",
    label: "Verificar Commits",
  },
  {
    id: "readme-summary",
    template: "Resuma o README do repositório {value}",
    placeholder: "owner/repository",
    label: "Resumo do README",
  },
];

const Index = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (questionId: string, value: string) => {
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (!question) return;

    const fullQuery = question.template.replace("{value}", value);
    
    setIsLoading(true);
    setActiveQuestion(questionId);
    setResponse(null);

    try {
      // Simulação - substitua pela chamada real do endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setResponse(`📝 Consulta: ${fullQuery}

--- Resposta do Agente ---

📊 Repositório: ${value}

Análise concluída com sucesso.

[Resultado simulado - conectar ao endpoint real]`);

      toast({
        title: "Consulta enviada",
        description: "Resposta recebida com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível processar a consulta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12 md:py-20">
        <Header />

        <div className="space-y-4 mb-8">
          {QUESTIONS.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              label={question.label}
              template={question.template}
              placeholder={question.placeholder}
              onSubmit={handleSubmit}
              isLoading={isLoading && activeQuestion === question.id}
            />
          ))}
        </div>

        <ResponseDisplay
          response={response}
          isLoading={isLoading}
          repository={activeQuestion}
        />
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
