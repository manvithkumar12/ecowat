import { ArrowUp, Plus, X } from "lucide-react";
import { RefObject } from "react";

interface Props {
  handleSendMessage: (text: string) => void;
  inputVal: string;
  setInputVal: (text: string) => void;
  isThinking: boolean;
  streamingMessageId: string | null;
  showPlusTooltip: boolean;
  setShowPlusTooltip: (showPlusTooltip: boolean) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

const InputBox = ({
  handleSendMessage,
  inputVal,
  setInputVal,
  isThinking,
  streamingMessageId,
  showPlusTooltip,
  setShowPlusTooltip,
  inputRef,
}: Props) => {
  return (
    <div
      style={{
        maskImage:
          "linear-gradient(to top, black 30%, rgba(0, 0, 0, 0.8) 60%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top, black 30%, rgba(0, 0, 0, 0.8) 60%, transparent 100%)",
      }}
      className="fixed bottom-0 left-0 lg:left-64 right-0 bg-linear-to-t from-white/70 via-white/20 to-transparent dark:from-[#0a0a0a]/80 dark:via-[#0a0a0a]/30 dark:to-transparent backdrop-blur-md pt-8 pb-4 px-4 sm:px-6 z-20 flex flex-col items-center gap-2"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputVal);
        }}
        className="w-full max-w-2xl mx-auto flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-full bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-emerald-500 shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(16,185,129,0.05)] dark:ring-2 dark:ring-emerald-500/20 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all animate-fade-in"
      >
        {/* Left Plus Icon */}
        <div className="relative flex items-center justify-center pl-1">
          <button
            type="button"
            onClick={() => setShowPlusTooltip(!showPlusTooltip)}
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-slate-100 dark:hover:bg-[#1a1a1a] text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-emerald-500" />
          </button>
          {showPlusTooltip && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowPlusTooltip(false)}
              />
              <div className="absolute left-0 bottom-full mb-3 w-48 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#151515] p-1.5 shadow-lg z-40 text-xs text-slate-600 dark:text-slate-400 animate-fade-in">
                <div className="px-2 py-1 border-b border-slate-100 dark:border-[#222222] font-semibold text-slate-400">
                  Ecky Bot Features
                </div>
                <div className="p-2 space-y-1">
                  <p>💬 Text messaging only</p>
                  <p>💡 Power optimization advice</p>
                  <p>⚡ Real-time grid tariff tips</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Input Bar */}
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Ecky..."
            disabled={isThinking || streamingMessageId !== null}
            className="w-full bg-transparent py-2.5 sm:py-3 pl-1 pr-10 sm:pl-2 sm:pr-10 text-xs sm:text-sm text-slate-800 dark:text-slate-100 outline-none placeholder-slate-400 dark:placeholder-slate-600 disabled:opacity-50"
          />
          <div className="absolute right-2.5 flex items-center gap-1 pointer-events-none">
            <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>/
            </kbd>
          </div>
        </div>

        {/* Right tools inside active state capsule */}
        <div className="flex items-center gap-1 sm:gap-2 pr-0.5 sm:pr-1">
          {/* Clear X button (revealed when typing) */}
          {inputVal && (
            <button
              type="button"
              onClick={() => setInputVal("")}
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1a1a] dark:hover:bg-[#252525] text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all duration-200 animate-in zoom-in-50 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Send Button (Always Send icon, disabled when empty) */}
          <button
            type="submit"
            disabled={
              !inputVal.trim() || isThinking || streamingMessageId !== null
            }
            className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center shadow-md transition-all shrink-0 ${
              inputVal.trim()
                ? "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer hover:shadow-emerald-500/25"
                : "bg-slate-100 dark:bg-[#161616] text-slate-300 dark:text-slate-700 cursor-not-allowed shadow-none"
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-3" />
          </button>
        </div>
      </form>
      <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 text-center px-4">
        Ecky is an AI assistant and may make mistakes. Double-check important
        information.
      </p>
    </div>
  );
};

export default InputBox;
