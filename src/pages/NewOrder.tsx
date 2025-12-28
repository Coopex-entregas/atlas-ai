import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, MapPin, Package, ArrowLeft } from "lucide-react";

interface Stop {
  address: string;
  neighborhood: string;
  number: string;
  contact_name: string;
  contact_phone: string;
  notes: string;
}

const NewOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [serviceType, setServiceType] = useState("");
  const [pickup, setPickup] = useState({ address: "", neighborhood: "", number: "", contact_name: "", contact_phone: "" });
  const [delivery, setDelivery] = useState({ address: "", neighborhood: "", number: "", contact_name: "", contact_phone: "" });
  const [stops, setStops] = useState<Stop[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });
  }, [navigate]);

  const addStop = () => setStops([...stops, { address: "", neighborhood: "", number: "", contact_name: "", contact_phone: "", notes: "" }]);
  
  const removeStop = (index: number) => setStops(stops.filter((_, i) => i !== index));
  
  const updateStop = (index: number, field: keyof Stop, value: string) => {
    const newStops = [...stops];
    newStops[index][field] = value;
    setStops(newStops);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (!serviceType || !pickup.address || !pickup.neighborhood || !pickup.number || !pickup.contact_name || 
        !delivery.address || !delivery.neighborhood || !delivery.number || !delivery.contact_name) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const { data: order, error: orderError } = await supabase.from("orders").insert({
        user_id: user.id,
        service_type: serviceType,
        pickup_address: pickup.address,
        pickup_neighborhood: pickup.neighborhood,
        pickup_number: pickup.number,
        pickup_contact_name: pickup.contact_name,
        pickup_contact_phone: pickup.contact_phone,
        delivery_address: delivery.address,
        delivery_neighborhood: delivery.neighborhood,
        delivery_number: delivery.number,
        delivery_contact_name: delivery.contact_name,
        delivery_contact_phone: delivery.contact_phone,
        notes,
        status: "pending"
      }).select().single();

      if (orderError) throw orderError;

      if (stops.length > 0 && order) {
        const stopsData = stops.map((stop, index) => ({
          order_id: order.id,
          stop_order: index + 1,
          address: stop.address,
          neighborhood: stop.neighborhood,
          number: stop.number,
          contact_name: stop.contact_name,
          contact_phone: stop.contact_phone,
          notes: stop.notes
        }));
        await supabase.from("order_stops").insert(stopsData);
      }

      toast.success("Pedido criado com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-8">Novo Pedido</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Package className="w-5 h-5" /> Tipo de Serviço</CardTitle></CardHeader>
            <CardContent>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger><SelectValue placeholder="Selecione o serviço" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="express">Entrega Expressa</SelectItem>
                  <SelectItem value="malote">Coleta de Malotes</SelectItem>
                  <SelectItem value="document">Documentos</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="intermunicipal">Intermunicipal</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-success"><MapPin className="w-5 h-5" /> Coleta</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div><Label>Endereço *</Label><Input value={pickup.address} onChange={e => setPickup({...pickup, address: e.target.value})} /></div>
              <div><Label>Bairro *</Label><Input value={pickup.neighborhood} onChange={e => setPickup({...pickup, neighborhood: e.target.value})} /></div>
              <div><Label>Número *</Label><Input value={pickup.number} onChange={e => setPickup({...pickup, number: e.target.value})} /></div>
              <div><Label>Nome do Responsável *</Label><Input value={pickup.contact_name} onChange={e => setPickup({...pickup, contact_name: e.target.value})} /></div>
              <div className="sm:col-span-2"><Label>Telefone</Label><Input value={pickup.contact_phone} onChange={e => setPickup({...pickup, contact_phone: e.target.value})} /></div>
            </CardContent>
          </Card>

          {stops.map((stop, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-warning"><MapPin className="w-5 h-5" /> Parada {index + 1}</CardTitle>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeStop(index)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div><Label>Endereço</Label><Input value={stop.address} onChange={e => updateStop(index, 'address', e.target.value)} /></div>
                <div><Label>Bairro</Label><Input value={stop.neighborhood} onChange={e => updateStop(index, 'neighborhood', e.target.value)} /></div>
                <div><Label>Número</Label><Input value={stop.number} onChange={e => updateStop(index, 'number', e.target.value)} /></div>
                <div><Label>Contato</Label><Input value={stop.contact_name} onChange={e => updateStop(index, 'contact_name', e.target.value)} /></div>
              </CardContent>
            </Card>
          ))}

          <Button type="button" variant="outline" onClick={addStop} className="w-full"><Plus className="w-4 h-4 mr-2" /> Adicionar Parada</Button>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><MapPin className="w-5 h-5" /> Entrega</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div><Label>Endereço *</Label><Input value={delivery.address} onChange={e => setDelivery({...delivery, address: e.target.value})} /></div>
              <div><Label>Bairro *</Label><Input value={delivery.neighborhood} onChange={e => setDelivery({...delivery, neighborhood: e.target.value})} /></div>
              <div><Label>Número *</Label><Input value={delivery.number} onChange={e => setDelivery({...delivery, number: e.target.value})} /></div>
              <div><Label>Entregar para *</Label><Input value={delivery.contact_name} onChange={e => setDelivery({...delivery, contact_name: e.target.value})} /></div>
              <div className="sm:col-span-2"><Label>Telefone</Label><Input value={delivery.contact_phone} onChange={e => setDelivery({...delivery, contact_phone: e.target.value})} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6"><Label>Observações</Label><Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Instruções adicionais..." /></CardContent>
          </Card>

          <Button type="submit" disabled={loading} className="w-full gradient-primary text-lg py-6">{loading ? "Enviando..." : "Confirmar Pedido"}</Button>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;