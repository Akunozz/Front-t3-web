"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  passos: Passo[];
  createdAt: string;
  updatedAt: string;
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
    <main className="space-y-6 p-6">
      <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Roadmaps Criados</h1>
      <Link href="/roadmaps/create" >
      <Button className="bg-blue-500 hover:bg-blue-600"> <CirclePlus /> Criar novo RoadMap</Button>
      </Link>
      </div>
      {roadmaps.map((rm) => (
        <Card key={rm._id}>
          <CardHeader>
            <CardTitle>{rm.titulo}</CardTitle>
            <CardDescription>{rm.descricao}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {rm.passos.map((passo) => (
              <div key={passo._id} className="flex items-start gap-3">
                <Checkbox checked={passo.concluido} disabled />
                <div>
                  <p className="font-semibold">{passo.titulo}</p>
                  <p className="text-sm text-muted-foreground">
                    {passo.descricao}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </main>
  );
}