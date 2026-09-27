import { Sparkles, X } from "lucide-react";

interface EcoBotProps {
  onClose: () => void;
}

const EcoNavbar = ({ onClose }: EcoBotProps) => {
  return (
    <div className="h-16 border-b border-border/40 px-6 flex items-center justify-between shrink-0 bg-background/50 backdrop-blur-md z-10">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-sm font-bold text-foreground">
          EcoWatt Assistant
        </span>
      </div>
      <button
        onClick={() => onClose()}
        className="h-8 w-8 rounded-full border border-border/40 bg-card hover:bg-muted/60 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
        aria-label="Close assistant"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default EcoNavbar;
