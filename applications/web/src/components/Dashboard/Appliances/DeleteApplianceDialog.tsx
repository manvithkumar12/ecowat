import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shadcn/ui/alert-dialog";
import { useUser } from "@/src/context/userContext";
import { Appliance, useApplianceDelete } from "@ecowat/shared";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface DeleteApplianceDialogProps {
  appliance: Appliance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: number) => void;
}

export function DeleteApplianceDialog({
  appliance,
  open,
  onOpenChange,
}: DeleteApplianceDialogProps) {
  const user = useUser();
  const t = useTranslations("Appliances.deleteDialog");
  const deletemutation = useApplianceDelete();

  if (!user?.id) {
    return null;
  }

  const handleDelete = () => {
    if (appliance?.id) {
      deletemutation.mutate(appliance.id, {
        onError: () => {
          toast.error("SOMETHING_WRONG");
        },
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px] bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-stone-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-900 dark:text-stone-100">
            {t("title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 dark:text-stone-400">
            {t("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-slate-100 dark:hover:bg-stone-900 border-slate-200 dark:border-stone-800">
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            {t("submit")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
