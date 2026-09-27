"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Clock, Check } from "lucide-react";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const parseTime = (timeStr: string) => {
  const [hStr, mStr] = (timeStr || "00:00").split(":");
  let h = parseInt(hStr, 10);
  let m = parseInt(mStr, 10);
  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;
  return {
    hours24: h,
    hours12: h % 12 === 0 ? 12 : h % 12,
    minutes: m,
    period: h >= 12 ? ("PM" as const) : ("AM" as const),
  };
};

const formatTime = (hours12: number, minutes: number, period: "AM" | "PM") => {
  let h24 = hours12 % 12;
  if (period === "PM") h24 += 12;
  const hh = h24.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  return `${hh}:${mm}`;
};

const TimePicker = ({ value, onChange, disabled = false }: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"hours" | "minutes">("hours");

  const parsed = useMemo(() => parseTime(value), [value]);
  const [selectedHour, setSelectedHour] = useState(parsed.hours12);
  const [selectedMinute, setSelectedMinute] = useState(parsed.minutes);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">(
    parsed.period,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  // Sync internal state when external value changes
  useEffect(() => {
    const p = parseTime(value);
    setSelectedHour(p.hours12);
    setSelectedMinute(p.minutes);
    setSelectedPeriod(p.period);
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const commitTime = (h: number, m: number, p: "AM" | "PM") => {
    const newTime = formatTime(h, m, p);
    onChange(newTime);
  };

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour);
    commitTime(hour, selectedMinute, selectedPeriod);
    setMode("minutes");
  };

  const handleMinuteSelect = (min: number) => {
    setSelectedMinute(min);
    commitTime(selectedHour, min, selectedPeriod);
  };

  const handlePeriodChange = (p: "AM" | "PM") => {
    setSelectedPeriod(p);
    commitTime(selectedHour, selectedMinute, p);
  };

  // Clock Hand Angle calculation
  const handAngle = useMemo(() => {
    if (mode === "hours") {
      return (selectedHour % 12) * 30; // 360 / 12 = 30 deg
    } else {
      return selectedMinute * 6; // 360 / 60 = 6 deg
    }
  }, [mode, selectedHour, selectedMinute]);

  // Interactive dragging / clicking on clock dial
  const handleClockInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    let rad = Math.atan2(y, x);
    let deg = (rad * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;

    if (mode === "hours") {
      let hour = Math.round(deg / 30);
      if (hour === 0) hour = 12;
      handleHourSelect(hour);
    } else {
      let min = Math.round(deg / 6);
      if (min === 60) min = 0;
      handleMinuteSelect(min);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            setMode("hours");
          }
        }}
        className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2a2a2a] hover:border-emerald-500/50 focus:border-emerald-500 text-slate-800 dark:text-slate-100 text-xs font-mono font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
      >
        <span className="tracking-wide">{value || "00:00"}</span>
        <Clock className="h-3.5 w-3.5 text-emerald-500 shrink-0 opacity-80 group-hover:opacity-100" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#282828] shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-65 animate-in zoom-in-95 duration-150 select-none"
          >
            {/* Header Display */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222]">
              <div className="flex items-center text-lg font-bold font-mono">
                <button
                  type="button"
                  onClick={() => setMode("hours")}
                  className={`px-1.5 py-0.5 rounded-md transition-colors ${
                    mode === "hours"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  {selectedHour.toString().padStart(2, "0")}
                </button>
                <span className="text-slate-300 dark:text-slate-600">:</span>
                <button
                  type="button"
                  onClick={() => setMode("minutes")}
                  className={`px-1.5 py-0.5 rounded-md transition-colors ${
                    mode === "minutes"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  {selectedMinute.toString().padStart(2, "0")}
                </button>
              </div>

              {/* AM / PM Toggle */}
              <div className="flex rounded-lg bg-slate-100 dark:bg-[#202020] p-0.5 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => handlePeriodChange("AM")}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    selectedPeriod === "AM"
                      ? "bg-white dark:bg-[#303030] text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => handlePeriodChange("PM")}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    selectedPeriod === "PM"
                      ? "bg-white dark:bg-[#303030] text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center my-3">
              <div
                ref={clockRef}
                onClick={handleClockInteraction}
                className="relative w-44 h-44 rounded-full bg-slate-100/70 dark:bg-[#202020]/70 cursor-pointer shadow-inner"
              >
                <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-emerald-500 z-20 pointer-events-none" />

                <div
                  className="absolute top-1/2 left-1/2 origin-bottom pointer-events-none z-10 transition-transform duration-200 ease-out"
                  style={{
                    width: "2px",
                    height: "64px",
                    marginLeft: "-1px",
                    marginTop: "-64px",
                    transform: `rotate(${handAngle}deg)`,
                    backgroundColor: "#10b981",
                  }}
                >
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-emerald-500/25 dark:bg-emerald-500/30 border border-emerald-500 flex items-center justify-center shadow-xs" />
                </div>

                {mode === "hours"
                  ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      const radius = 64; // distance from center in px
                      const x = Math.round(radius * Math.sin(angle));
                      const y = Math.round(-radius * Math.cos(angle));
                      const isSelected = selectedHour === h;

                      return (
                        <div
                          key={h}
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                          }}
                          className={`absolute top-1/2 left-1/2 -ml-3 -mt-3 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold font-mono transition-colors pointer-events-none ${
                            isSelected
                              ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                              : "text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          {h}
                        </div>
                      );
                    })
                  : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
                      (m, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        const radius = 64;
                        const x = Math.round(radius * Math.sin(angle));
                        const y = Math.round(-radius * Math.cos(angle));
                        const isSelected = selectedMinute === m;

                        return (
                          <div
                            key={m}
                            style={{
                              transform: `translate(${x}px, ${y}px)`,
                            }}
                            className={`absolute top-1/2 left-1/2 -ml-3 -mt-3 w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-bold font-mono transition-colors pointer-events-none ${
                              isSelected
                                ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                                : "text-slate-600 dark:text-slate-300"
                            }`}
                          >
                            {m.toString().padStart(2, "0")}
                          </div>
                        );
                      },
                    )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-[#222]">
              <button
                type="button"
                onClick={() => setMode(mode === "hours" ? "minutes" : "hours")}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Select {mode === "hours" ? "Minute" : "Hour"}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Check className="h-3 w-3 stroke-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
