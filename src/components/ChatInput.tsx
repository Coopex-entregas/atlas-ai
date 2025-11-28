import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isSending || disabled) return;

    setIsSending(true);
    try {
      await onSendMessage(message.trim());
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Erro ao enviar mensagem");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-card p-4">
      <div className="flex gap-2 items-end max-w-4xl mx-auto">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="flex-shrink-0"
          disabled={disabled || isSending}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem... (Shift+Enter para nova linha)"
          className="min-h-[60px] max-h-[200px] resize-none"
          disabled={disabled || isSending}
        />
        <Button
          type="submit"
          size="icon"
          className="flex-shrink-0 gradient-primary"
          disabled={!message.trim() || disabled || isSending}
        >
          {isSending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;