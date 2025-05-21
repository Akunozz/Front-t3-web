"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

interface Passo {
  _id: string;
  titulo: string;
  descricao: string;
  concluido: boolean;
}

interface Roadmap {
  _id: string;
  titulo: string;
  descricao: string;
  autor: string; 
  createdAt: string;
  updatedAt: string;
  passos: Passo[];
}

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const res = await fetch(
          "https://project3-2025a-breno-pedro.onrender.com/roadmaps"
        );
        if (!res.ok) throw new Error("Falha ao carregar roadmaps");
        const data: Roadmap[] = await res.json();
        setRoadmaps(data);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmaps();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Carregando roadmaps...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <main className="space-y-10 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Roadmaps Criados</h1>
        <Link href="/roadmaps/create">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <CirclePlus className="mr-2" /> Criar novo RoadMap
          </Button>
        </Link>
      </div>

      {roadmaps.map((rm) => (
        <Card key={rm._id} className="p-6 overflow-hidden">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl">{rm.titulo}</CardTitle>
            <CardDescription className="text-base">{rm.descricao}</CardDescription>
            <p className="text-sm text-muted-foreground mt-1">
              Criado por: {rm.autor}
            </p>
          </CardHeader>

          <div className="mt-8 relative">
            {/* Linha de conexão vertical */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-blue-200 rounded-full" />

            {/* Passos do roadmap */}
            <div className="space-y-16">
              {rm.passos.map((passo, index) => (
                <div key={passo._id} className="relative">
                  {/* Linha horizontal de conexão */}
                  <div className="absolute left-6 top-6 w-10 h-1 bg-blue-200" />

                  {/* Nó do passo */}
                  <div className="flex items-start ml-16">
                    <div className="p-4 rounded-lg border border-blue-100 bg-white w-full">
                      <h3 className="font-semibold text-lg">{passo.titulo}</h3>
                      <p className="text-gray-600 mt-1">{passo.descricao}</p>

                      {/* Número do passo */}
                      <div className="absolute right-4 top-4 bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </main>
  );
}
