import { Button } from "@/shadcn/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { useUser } from "@/src/context/userContext";
import { useState } from "react";
import { toast } from "sonner";
import { validatePassword } from "@/src/components/login/utils/validatePassword";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";

interface ChangePasswordProps {
  isPasswordDialogOpen: boolean;
  setIsPasswordDialogOpen: (value: boolean) => void;
  confirmPassword?: string;
  setConfirmPassword?: (value: string) => void;
  t: (key: string) => string;
}

const ChangePassword = ({
  isPasswordDialogOpen,
  setIsPasswordDialogOpen,
  confirmPassword: externalConfirmPassword,
  setConfirmPassword: externalSetConfirmPassword,
  t,
}: ChangePasswordProps) => {
  const user = useUser();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [localConfirmPassword, setLocalConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmPassword = externalConfirmPassword ?? localConfirmPassword;
  const setConfirmPassword = (val: string) => {
    setLocalConfirmPassword(val);
    externalSetConfirmPassword?.(val);
  };

  const passErrors = validatePassword(newPassword);
  const passValid = passErrors.length === 0;
  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;
  const formValid = oldPassword.length > 0 && passValid && passwordsMatch;
  const bothSame = oldPassword === newPassword;

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPassTouched(false);
    setConfirmTouched(false);
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirm(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsPasswordDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("USER_NOT_FOUND");
      return;
    }
    if (!formValid) {
      return;
    }
    if (bothSame) {
      toast.error("PASSWORD_SAME");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok && data?.code === "PASSWORD_CHANGED") {
        toast.success(t("changePasswordDialog.success"));
        handleOpenChange(false);
      } else {
        toast.error(t("changePasswordDialog.error"));
      }
    } catch (err) {
      toast.error(t("changePasswordDialog.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isPasswordDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">{t("actions.changePassword")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("changePasswordDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("changePasswordDialog.description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Old Password */}
          <div className="space-y-1.5">
            <Label htmlFor="old-password">
              {t("changePasswordDialog.oldPassword")}
            </Label>
            <div className="relative">
              <Input
                id="old-password"
                type={showOldPassword ? "text" : "password"}
                placeholder={t("changePasswordDialog.oldPasswordPlaceholder")}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                aria-label={showOldPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none cursor-pointer"
              >
                {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="new-password">
              {t("changePasswordDialog.newPassword")}
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder={t("changePasswordDialog.newPasswordPlaceholder")}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => setPassTouched(true)}
                required
                className={`pr-10 ${
                  passTouched && passErrors.length > 0
                    ? "border-red-400 dark:border-red-500 focus-visible:ring-red-400/20"
                    : passTouched && passValid
                      ? "border-emerald-500 focus-visible:ring-emerald-500/20"
                      : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none cursor-pointer"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password rule errors */}
            {passTouched && passErrors.length > 0 && (
              <ul className="flex flex-col gap-1 mt-1">
                {passErrors.map((err) => (
                  <li
                    key={err}
                    className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400 shrink-0" />
                    {err}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">
              {t("changePasswordDialog.confirmPassword")}
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder={t(
                  "changePasswordDialog.confirmPasswordPlaceholder",
                )}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setConfirmTouched(true)}
                required
                className={`pr-10 ${
                  !confirmTouched
                    ? ""
                    : passwordsMatch
                      ? "border-emerald-500 focus-visible:ring-emerald-500/20"
                      : "border-red-400 dark:border-red-500 focus-visible:ring-red-400/20"
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

            {confirmTouched &&
              !passwordsMatch &&
              confirmPassword.length > 0 && (
                <p className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 mt-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400 shrink-0" />
                  Passwords do not match
                </p>
              )}
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t("changePasswordDialog.cancel")}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={loading || !formValid}
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                t("changePasswordDialog.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
