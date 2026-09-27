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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { clearClientStorage } from "@/src/utils/storage/clearClientStorage";

const Delete = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  deleteConfirmationText,
  setDeleteConfirmationText,
  t,
}: {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
  deleteConfirmationText: string;
  setDeleteConfirmationText: (value: string) => void;
  t: (key: string) => string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const deleteAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        clearClientStorage();
        setIsDeleteDialogOpen(false);
        setDeleteConfirmationText("");
        toast.success("Account deleted successfully");
        router.push("/login");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(" SOMETHING_WENT_WRONG");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">{t("actions.deleteAccount")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600 dark:text-red-500">
            {t("deleteDialog.title")}
          </DialogTitle>
          <DialogDescription>{t("deleteDialog.description")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-xs text-slate-600 dark:text-stone-400">
            {t("deleteDialog.instruction")}
          </p>
          <Input
            placeholder={t("deleteDialog.inputPlaceholder")}
            value={deleteConfirmationText}
            onChange={(e) => setDeleteConfirmationText(e.target.value)}
            className="border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-900"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirmationText("")}
            >
              {t("deleteDialog.cancel")}
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteConfirmationText !== "Delete my account"}
            onClick={() => {
              deleteAccount();
              setIsDeleteDialogOpen(false);
              setDeleteConfirmationText("");
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
              </>
            ) : (
              t("deleteDialog.confirm")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
