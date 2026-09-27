"use client";
import { Check, Eye, EyeOff, ArrowRight, Loader } from "lucide-react";
import { useState } from "react";
import { validatePassword } from "@/src/components/login/utils/validatePassword";
import { toast } from "sonner";
import Verification from "@/src/components/register/popups/Verification";
import { registerApi } from "@ecowat/shared";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [verificationOpen, SetVerificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const passErrors = validatePassword(password);
  const passValid = passErrors.length === 0;
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const formValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    passValid &&
    passwordsMatch;

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerApi(email, password, name, "");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.code);
      }
      SetVerificationOpen(true);
      toast.success(data.code);
    } catch (e: any) {
      toast.error(e.message || "SOMETHING_WRONG");
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const inputBase =
    "block w-full h-10 px-3 rounded-lg border bg-white dark:bg-[#1a1a1a] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-2 transition-all";
  return (
    <>
      <form className="flex flex-col gap-4 mb-5" onSubmit={handleRegister}>
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-name"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            Full name
          </label>
          <input
            id="reg-name"
            type="text"
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={`${inputBase} border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/10`}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-email"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            Email address
          </label>
          <input
            id="reg-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={`${inputBase} border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/10`}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-password"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={password}
              onChange={handlePassChange}
              onBlur={() => setPassTouched(true)}
              autoComplete="new-password"
              className={`${inputBase} pr-10 ${
                passTouched && passErrors.length > 0
                  ? "border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/10"
                  : passTouched && passValid
                    ? "border-emerald-400 dark:border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10"
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

          {/* Password rule errors */}
          {passTouched && passErrors.length > 0 && (
            <ul className="flex flex-col gap-1 mt-0.5">
              {passErrors.map((err) => (
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-confirm"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="reg-confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={handleConfirmChange}
              onBlur={() => setConfirmTouched(true)}
              autoComplete="new-password"
              className={`${inputBase} pr-10 ${
                !confirmTouched
                  ? "border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/10"
                  : passwordsMatch
                    ? "border-emerald-500 ring-2 ring-emerald-500/10"
                    : "border-red-400 dark:border-red-500 ring-2 ring-red-400/10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className={`absolute inset-y-0 right-0 flex items-center px-3 transition-colors focus:outline-none cursor-pointer ${
                passwordsMatch
                  ? "text-emerald-500"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              {passwordsMatch ? (
                <Check size={16} />
              ) : showConfirm ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
          {confirmTouched && !passwordsMatch && confirmPassword.length > 0 && (
            <p className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 mt-0.5">
              <span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400 shrink-0" />
              Passwords do not match
            </p>
          )}
        </div>

        {formValid ? (
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-10 flex items-center justify-center gap-2 rounded-lg ${loading ? "opacity-30 bg-gray-500" : "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700"} text-white text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all cursor-pointer mt-1`}
          >
            {loading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              <>
                Create account
                <ArrowRight size={16} className="shrink-0" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            disabled={true}
            className="w-full h-10 flex items-center justify-center gap-2 rounded-lg opacity-30 bg-gray-500 text-white text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all cursor-not-allowed mt-1"
          >
            Create account
            <ArrowRight size={16} className="shrink-0" />
          </button>
        )}
      </form>

      <Verification
        email={email}
        open={verificationOpen}
        onClose={() => SetVerificationOpen(false)}
      />
    </>
  );
};

export default RegisterForm;
