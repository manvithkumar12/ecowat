"use client";
import { ArrowRight, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import ForgotPass from "../Popup/ForgotPass";
import { validatePassword } from "@/src/utils/validation/validatePassword";
import { toast } from "sonner";
import { loginAPi } from "@ecowat/shared";

import { clearClientStorage } from "@/src/utils/storage/clearClientStorage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordErrors(validatePassword(password));
  };
  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    passwordErrors.length === 0;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordTouched) {
      setPasswordErrors(validatePassword(e.target.value));
    }
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginAPi(email, password);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.code);
        return;
      }
      clearClientStorage();
      toast.success(data.code);
      window.location.href = "/en/profile";
    } catch (error: any) {
      toast.error(error.code || "SOMETHING_WRONG");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col gap-4 mb-5" onSubmit={handleLogin}>
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-xs font-semibold text-slate-600 dark:text-slate-300"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            Password
          </label>
          <ForgotPass />
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            name="password"
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            autoComplete="current-password"
            className={`block w-full h-10 px-3 pr-10 rounded-lg border bg-white dark:bg-[#1a1a1a] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-2 transition-all ${
              passwordErrors.length > 0 && passwordTouched
                ? "border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/10"
                : "border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/10"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none cursor-pointer"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full h-10 flex mt-3 items-center
           justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white
            text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all cursor-pointer mb-5 ${loading || !isFormValid ? "cursor-not-allowed bg-gray-500 opacity-30" : ""}`}
        >
          {loading ? <Loader className="animate-spin" size={16} /> : "Sign in"}
          {!loading && <ArrowRight size={16} className="shrink-0" />}
        </button>

        {/* Validation errors */}
        {passwordTouched && passwordErrors.length > 0 && (
          <ul className="flex flex-col gap-1 mt-0.5">
            {passwordErrors.map((err) => (
              <li
                key={err}
                className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400 shrink-0" />
                {err}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
