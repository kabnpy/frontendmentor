import LogoDark from '@/components/icons/logo-dark.svg';
import PlusIcon from '@/components/icons/icon-add-task-mobile.svg';
import VerticalEllipsisIcon from '@/components/icons/icon-vertical-ellipsis.svg';
import IconBoard from '@/components/icons/icon-board.svg';
import IconChevronDown from '@/components/icons/icon-chevron-down.svg';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function SiteHeader() {
  return (
    <>
      <header className="bg-background sticky top-0 z-50 flex w-full items-center">
        <div className="flex w-full items-center">
          <div className="border-r border-b p-6">
            <LogoDark />
          </div>
          <div className="flex w-full justify-between border-b">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Platform Launch</h1>
              <IconChevronDown />
            </div>
            <div>
              <Button>
                <PlusIcon /> Add New Task
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" aria-label="board options" variant="ghost">
                    <VerticalEllipsisIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit Board</DropdownMenuItem>
                  <DropdownMenuItem>Delete Board</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
