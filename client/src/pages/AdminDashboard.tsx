import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [showProductForm, setShowProductForm] = useState(false);

  // Redirect if not admin
  if (user?.role !== "admin") {
    setLocation("/");
    return null;
  }

  const { data: products, isLoading } = trpc.shop.products.list.useQuery();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button onClick={() => setShowProductForm(true)} className="gap-2">
            <Plus size={20} />
            Novo Produto
          </Button>
        </div>

        {/* Products Section */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Produtos</h2>
          
          {isLoading ? (
            <div className="text-center py-8">Carregando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Nome</th>
                    <th className="text-left py-2">Categoria</th>
                    <th className="text-left py-2">Preço</th>
                    <th className="text-left py-2">Estoque</th>
                    <th className="text-left py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted">
                      <td className="py-2">{product.name}</td>
                      <td className="py-2">{product.category}</td>
                      <td className="py-2">R${product.price}</td>
                      <td className="py-2">{product.stock}</td>
                      <td className="py-2 flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
