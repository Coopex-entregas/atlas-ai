import { Plus, MessageSquare, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Conversation {
  id: string;
  title: string;
  updated_at: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  isAdmin?: boolean;
}

const ChatSidebar = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  isAdmin = false,
}: ChatSidebarProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso");
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  return (
    <div className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-4 border-b">
        <Button
          onClick={onNewConversation}
          className="w-full gradient-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Conversa
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant={currentConversationId === conversation.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectConversation(conversation.id)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="truncate">{conversation.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-2 space-y-1">
        {isAdmin && (
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/admin")}
          >
            <Shield className="mr-2 h-4 w-4" />
            Painel Admin
          </Button>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start"
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;