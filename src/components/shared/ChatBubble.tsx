import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: string;
  sender: 'bot' | 'human' | 'operator' | 'system';
  timestamp?: string;
  isTyping?: boolean;
  className?: string;
}

const senderConfig = {
  bot: {
    label: 'OyeChat AI',
    dot: 'bg-blue-400',
    bubble: 'chat-bubble-bot',
    align: 'items-start',
  },
  human: {
    label: 'Visitor',
    dot: 'bg-white/40',
    bubble: 'chat-bubble-human',
    align: 'items-end',
  },
  operator: {
    label: 'Sarah (Agent)',
    dot: 'bg-cyan-400',
    bubble: 'chat-bubble-operator',
    align: 'items-start',
  },
  system: {
    label: 'System',
    dot: 'bg-amber-400',
    bubble: 'bg-amber-500/10 border border-amber-500/20 rounded-2xl',
    align: 'items-center',
  },
};

export function ChatBubble({ message, sender, timestamp, isTyping, className }: ChatBubbleProps) {
  const config = senderConfig[sender];

  return (
    <div className={cn('flex flex-col gap-1', config.align, className)}>
      <div className="flex items-center gap-1.5">
        <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
        <span className="text-[11px] text-white/50 font-medium">{config.label}</span>
        {timestamp && <span className="text-[11px] text-white/40">{timestamp}</span>}
      </div>
      <div className={cn('max-w-[240px] px-3 py-2 text-xs text-white/80 leading-relaxed', config.bubble)}>
        {isTyping ? (
          <span className="flex gap-1 items-center py-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-white/40 animate-blink"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </span>
        ) : (
          message
        )}
      </div>
    </div>
  );
}
