"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { HOMINID_STAGES } from "@/lib/hominids";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogOut, Plus, Edit, Trash2 } from "lucide-react";
import type { HominidStage } from "@/lib/hominids";

interface HominidWithId extends HominidStage {
  id: string;
}

export default function AdminPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [hominids, setHominids] = useState<HominidWithId[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHominid, setEditingHominid] = useState<HominidWithId | null>(
    null
  );
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<HominidStage>({
    name: "",
    years: "",
    imagePlaceholderId: "",
    facialFeatures: "",
    craniumFeatures: "",
    model3dId: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Cargar desde localStorage o usar datos por defecto
    const saved = localStorage.getItem("hominids_data");
    if (saved) {
      setHominids(JSON.parse(saved));
    } else {
      const defaultData = HOMINID_STAGES.map((h, index) => ({
        ...h,
        id: `hominid-${index}`,
      }));
      setHominids(defaultData);
      localStorage.setItem("hominids_data", JSON.stringify(defaultData));
    }
  }, []);

  const saveToLocalStorage = (data: HominidWithId[]) => {
    localStorage.setItem("hominids_data", JSON.stringify(data));
    setHominids(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (editingHominid) {
      const updated = hominids.map((h) =>
        h.id === editingHominid.id ? { ...formData, id: editingHominid.id } : h
      );
      saveToLocalStorage(updated);
      setSuccess("Homínido actualizado correctamente");
    } else {
      const newHominid = {
        ...formData,
        id: `hominid-${Date.now()}`,
      };
      saveToLocalStorage([...hominids, newHominid]);
      setSuccess("Homínido agregado correctamente");
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleEdit = (hominid: HominidWithId) => {
    setEditingHominid(hominid);
    setFormData({
      name: hominid.name,
      years: hominid.years,
      imagePlaceholderId: hominid.imagePlaceholderId,
      facialFeatures: hominid.facialFeatures,
      craniumFeatures: hominid.craniumFeatures,
      model3dId: hominid.model3dId || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este homínido?")) {
      return;
    }

    const updated = hominids.filter((h) => h.id !== id);
    saveToLocalStorage(updated);
    setSuccess("Homínido eliminado correctamente");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      years: "",
      imagePlaceholderId: "",
      facialFeatures: "",
      craniumFeatures: "",
      model3dId: "",
    });
    setEditingHominid(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestión de Homínidos</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>

        {success && (
          <Alert className="mb-4">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Homínidos</CardTitle>
                <CardDescription>
                  Total: {hominids.length} homínidos registrados
                </CardDescription>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingHominid
                        ? "Editar Homínido"
                        : "Agregar Nuevo Homínido"}
                    </DialogTitle>
                    <DialogDescription>
                      Completa la información del homínido
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Australopithecus Afarensis"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="years">Años *</Label>
                      <Input
                        id="years"
                        value={formData.years}
                        onChange={(e) =>
                          setFormData({ ...formData, years: e.target.value })
                        }
                        placeholder="Hace 3.9 – 2.9 millones de años"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="imagePlaceholderId">ID de Imagen *</Label>
                      <Input
                        id="imagePlaceholderId"
                        value={formData.imagePlaceholderId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            imagePlaceholderId: e.target.value,
                          })
                        }
                        placeholder="evoluface-australopithecus"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facialFeatures">
                        Características Faciales *
                      </Label>
                      <Textarea
                        id="facialFeatures"
                        value={formData.facialFeatures}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            facialFeatures: e.target.value,
                          })
                        }
                        placeholder="Descripción de las características faciales..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="craniumFeatures">
                        Características del Cráneo *
                      </Label>
                      <Textarea
                        id="craniumFeatures"
                        value={formData.craniumFeatures}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            craniumFeatures: e.target.value,
                          })
                        }
                        placeholder="Descripción de las características del cráneo..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model3dId">
                        ID de Modelo 3D (opcional)
                      </Label>
                      <Input
                        id="model3dId"
                        value={formData.model3dId || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            model3dId: e.target.value,
                          })
                        }
                        placeholder="australopithecus-cranium"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setDialogOpen(false);
                          resetForm();
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">
                        {editingHominid ? "Actualizar" : "Agregar"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Imagen ID</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hominids.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No hay homínidos registrados. Haz clic en "Agregar
                      Homínido" para comenzar.
                    </TableCell>
                  </TableRow>
                ) : (
                  hominids.map((hominid) => (
                    <TableRow key={hominid.id}>
                      <TableCell className="font-medium">
                        {hominid.name}
                      </TableCell>
                      <TableCell>{hominid.years}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {hominid.imagePlaceholderId}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(hominid)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(hominid.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
