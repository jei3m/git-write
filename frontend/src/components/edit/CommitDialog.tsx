import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '../ui/alert-dialog'
import { GithubIcon, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { CommitDialogProps } from '@/types/component.types';

function CommitDialog({
  isCommitDisabled,
  isCommit,
  setCommit,
  commit,
  handleCommit
}: CommitDialogProps) {
  return (
    <AlertDialog>
      {!isCommitDisabled ? (
        <AlertDialogTrigger>
          <Button 
            className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white' 
            disabled={isCommitDisabled}
          >
            <GithubIcon/>Commit
          </Button>
        </AlertDialogTrigger>                      
      ):(
        <Button 
          className='h-[36px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-neutral-700 text-black dark:text-white' 
          disabled={isCommitDisabled}
        >
          {!isCommit ? (
            <><GithubIcon/>Commit</>
          ):(
            <><Loader2 className='animate-spin'/> Committing...</>
          )}
        </Button>
      )}
      <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-300 dark:border-neutral-700 text-black dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black dark:text-white flex justify-between">
            Commit Changes
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Separator className='bg-gray-300 dark:bg-neutral-700 -mt-2'/>
        <AlertDialogDescription className="text-black dark:text-white space-y-6">
          <div className='space-y-3'>
            <Label>
              Commit Message
            </Label>
            <Input
              type="text" 
              placeholder="docs: update README.md"
              onChange={(e) => {
                setCommit({
                  ...commit,
                  message: e.target.value,
                })
              }}
              className='border-gray-300 dark:border-neutral-700'
            />                          
          </div>
          <div className='space-y-3'>
            <Label>
              Extended Description
            </Label>
            <Textarea
              placeholder="Description..."
              onChange={(e) => {
                setCommit({
                  ...commit,
                  description: e.target.value,
                })
              }}
              className='border-gray-300 dark:border-neutral-700'
            />                          
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="w-full flex justify-between">
          <AlertDialogCancel
            className="text-black dark:text-white border-gray-300 dark:border-neutral-700"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-500 text-white border border-gray-400"
            onClick={handleCommit}
          >
            Commit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>	
  )
};

export default CommitDialog;
