import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { DeleteTemplateProps } from "@/types/template.types"

function DeleteDialog({handleDeleteTemplate, template}: DeleteTemplateProps) {
  return (
    <>
      <AlertDialog>
          <AlertDialogTrigger asChild>
          <Button variant="ghost" className="-mr-3"><TrashIcon/></Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700">
          <AlertDialogHeader>
              <AlertDialogTitle className="text-black dark:text-white">Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-black dark:text-white">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
              <AlertDialogAction className="bg-red-500 text-white" onClick={() => handleDeleteTemplate(template._id)}>Delete</AlertDialogAction>
              <AlertDialogCancel className="text-black dark:text-white">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteDialog;