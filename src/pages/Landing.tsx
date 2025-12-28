import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Package, 
  Building2, 
  FileText, 
  Truck, 
  Users, 
  Shield, 
  Award,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import motoboyImage from "@/assets/motoboy-coopex.jpg";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const servicesOffice = [
    { icon: Building2, title: "Bancários", desc: "Serviços para instituições financeiras" },
    { icon: Package, title: "Coleta de Malotes", desc: "Coleta e entrega segura de documentos" },
    { icon: FileText, title: "Cartórios", desc: "Serviços para cartórios e registros" },
    { icon: Truck, title: "Interestaduais", desc: "Entregas para outros estados" },
    { icon: Building2, title: "Escritórios", desc: "Atendimento empresarial" },
    { icon: Truck, title: "Intermunicipais", desc: "Entregas entre cidades" },
  ];

  const servicesDelivery = [
    { icon: Package, title: "Pizzarias", desc: "Delivery rápido e seguro" },
    { icon: Package, title: "Distribuidoras", desc: "Logística eficiente" },
    { icon: Package, title: "Hamburguerias", desc: "Entrega expressa" },
    { icon: Shield, title: "Bancos de Sangue", desc: "Transporte especializado" },
    { icon: Package, title: "Restaurantes", desc: "Delivery de qualidade" },
    { icon: Package, title: "Mercados", desc: "Entregas residenciais" },
    { icon: Package, title: "Farmácias", desc: "Medicamentos com cuidado" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg lg:text-xl">C</span>
              </div>
              <span className="font-bold text-xl lg:text-2xl text-foreground">COOPEX</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors">Sobre</a>
              <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors">Serviços</a>
              <a href="#localizacao" className="text-muted-foreground hover:text-primary transition-colors">Localização</a>
              <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors">Contato</a>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <Button onClick={() => navigate("/dashboard")} className="gradient-primary">
                  Meus Pedidos
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate("/auth")}>
                    Entrar
                  </Button>
                  <Button onClick={() => navigate("/auth")} className="gradient-primary">
                    Solicitar Motoboy
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-b border-border animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#sobre" className="text-foreground py-2" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a href="#servicos" className="text-foreground py-2" onClick={() => setIsMenuOpen(false)}>Serviços</a>
              <a href="#localizacao" className="text-foreground py-2" onClick={() => setIsMenuOpen(false)}>Localização</a>
              <a href="#contato" className="text-foreground py-2" onClick={() => setIsMenuOpen(false)}>Contato</a>
              <div className="flex flex-col gap-2 pt-2">
                {user ? (
                  <Button onClick={() => navigate("/dashboard")} className="gradient-primary w-full">
                    Meus Pedidos
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => navigate("/auth")} className="w-full">
                      Entrar
                    </Button>
                    <Button onClick={() => navigate("/auth")} className="gradient-primary w-full">
                      Solicitar Motoboy
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                +20 anos de confiança
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Entregas Rápidas e <span className="text-gradient">Seguras</span> para Você
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-lg">
                Cooperativa de Motofretistas do Rio Grande do Norte. Agilidade, confiança e pontualidade em cada entrega.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gradient-primary text-lg px-8 shadow-glow"
                  onClick={() => navigate(user ? "/novo-pedido" : "/auth")}
                >
                  Solicitar Entrega
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8"
                  onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Serviços
                </Button>
              </div>
              
              <div className="flex items-center gap-8 mt-12">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">20+</p>
                  <p className="text-sm text-muted-foreground">Anos de experiência</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">1000+</p>
                  <p className="text-sm text-muted-foreground">Clientes satisfeitos</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">24h</p>
                  <p className="text-sm text-muted-foreground">Disponibilidade</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img 
                  src={motoboyImage} 
                  alt="Motoboy Coopex em Honda Fan 2025" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-lg border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Entrega Garantida</p>
                    <p className="text-sm text-muted-foreground">100% de segurança</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Nossa História
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Mais de 20 Anos de Tradição
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fundada em 2002, a <strong className="text-foreground">Cooperativa de Motofretistas</strong> nasceu com o propósito de oferecer soluções rápidas, seguras e confiáveis para entregas e serviços diversos.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Desde o início, nossa missão foi clara: <strong className="text-foreground">ser o elo que conecta pessoas e empresas com agilidade e confiança</strong>. Ao longo de mais de duas décadas, ampliamos nossa atuação para atender todo tipo de necessidade.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nosso diferencial está na união de profissionais comprometidos que, juntos, formam uma cooperativa sólida e respeitada. Cada entrega representa mais do que um simples deslocamento: é a confiança de quem nos escolhe.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-card border-0">
                <CardContent className="p-6 text-center">
                  <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-xl text-foreground mb-1">Empresas</h3>
                  <p className="text-sm text-muted-foreground">Clínicas, escritórios, restaurantes e farmácias</p>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardContent className="p-6 text-center">
                  <Package className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-xl text-foreground mb-1">Pessoas</h3>
                  <p className="text-sm text-muted-foreground">Documentos, encomendas e itens pessoais</p>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardContent className="p-6 text-center">
                  <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-xl text-foreground mb-1">Serviços</h3>
                  <p className="text-sm text-muted-foreground">Cartórios, correios e repartições públicas</p>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardContent className="p-6 text-center">
                  <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-xl text-foreground mb-1">Qualidade</h3>
                  <p className="text-sm text-muted-foreground">Pontualidade e segurança garantidas</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Nossos Serviços
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Soluções Completas para Você
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços de motofrete para atender todas as suas necessidades.
            </p>
          </div>

          {/* Office Services */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Building2 className="w-7 h-7 text-primary" />
              Serviço Office / Empresarial
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicesOffice.map((service, index) => (
                <Card key={index} className="shadow-card border-0 hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:gradient-primary transition-all">
                      <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Delivery Services */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Truck className="w-7 h-7 text-primary" />
              Serviço Delivery
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {servicesDelivery.map((service, index) => (
                <Card key={index} className="shadow-card border-0 hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:gradient-primary transition-all">
                      <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="gradient-primary text-lg px-8 shadow-glow"
              onClick={() => navigate(user ? "/novo-pedido" : "/auth")}
            >
              Solicitar Serviço Agora
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="localizacao" className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Localização
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Onde Estamos
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <Card className="shadow-card border-0 overflow-hidden">
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.0123456789!2d-35.2123456!3d-5.8234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+Jos%C3%A9+Freire+de+Souza%2C+22+-+Lagoa+Nova%2C+Natal+-+RN!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">Endereço</h3>
                      <p className="text-muted-foreground">
                        Rua José Freire de Souza, 22<br />
                        Lagoa Nova, Natal - RN<br />
                        CEP: 59075-140
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">Horário de Funcionamento</h3>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 07:00 - 19:00<br />
                        Sábado: 08:00 - 14:00<br />
                        Plantão 24h disponível
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card id="contato" className="shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">Contato</h3>
                      <p className="text-muted-foreground">
                        Telefone: (84) 3XXX-XXXX<br />
                        WhatsApp: (84) 9XXXX-XXXX<br />
                        Email: contato@coopex.com.br
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden gradient-hero p-8 lg:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNGMwIDItMiA0LTIgNHMtMi0yLTItNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Pronto para Solicitar seu Motoboy?
              </h2>
              <p className="text-lg lg:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Cadastre-se agora e faça seus pedidos de forma rápida e fácil. Acompanhe suas entregas em tempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 bg-card text-foreground hover:bg-card/90"
                  onClick={() => navigate("/auth")}
                >
                  {user ? "Fazer Novo Pedido" : "Criar Conta Grátis"}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => window.open('tel:+5584999999999', '_self')}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Ligar Agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">C</span>
                </div>
                <span className="font-bold text-xl text-foreground">COOPEX</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Cooperativa de Trabalhadores do Rio Grande do Norte. Entregas rápidas e seguras desde 2002.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#sobre" className="text-muted-foreground hover:text-primary">Sobre Nós</a></li>
                <li><a href="#servicos" className="text-muted-foreground hover:text-primary">Serviços</a></li>
                <li><a href="#localizacao" className="text-muted-foreground hover:text-primary">Localização</a></li>
                <li><a href="#contato" className="text-muted-foreground hover:text-primary">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-muted-foreground">Entregas Expressas</span></li>
                <li><span className="text-muted-foreground">Coleta de Malotes</span></li>
                <li><span className="text-muted-foreground">Delivery</span></li>
                <li><span className="text-muted-foreground">Intermunicipais</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Rua José Freire de Souza, 22</li>
                <li className="text-muted-foreground">Lagoa Nova, Natal - RN</li>
                <li className="text-muted-foreground">CEP: 59075-140</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} COOPEX - Cooperativa de Trabalhadores do Rio Grande do Norte. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;