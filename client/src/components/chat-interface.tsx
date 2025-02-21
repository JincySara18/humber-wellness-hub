import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChatMessage } from "@shared/schema";
import { Send, Loader2 } from "lucide-react";

export default function ChatInterface() {
  const [message, setMessage] = useState("");

  const { data: chatHistory } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/history"],
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/chat", { message });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/history"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !chatMutation.isPending) {
      chatMutation.mutate(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4 border rounded-lg mb-4">
        <div className="space-y-4">
          {chatHistory?.map((chat) => (
            <div key={chat.id}>
              <div className="flex items-start mb-2">
                <div className="bg-accent rounded-lg p-3 ml-auto max-w-[80%]">
                  <p>{chat.message}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                  <p>{chat.response}</p>
                </div>
              </div>
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm text-muted-foreground">Thinking...</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" disabled={chatMutation.isPending}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
