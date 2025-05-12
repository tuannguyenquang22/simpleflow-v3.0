import { SignedIn, UserButton, UserProfile } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { BookIcon } from "lucide-react";

export default function Header() {
  return (
    <header
      className="w-full h-20 top-0 py-4 px-4 bg-black/70 flex items-center justify-end gap-4"
    >
      <Button size="icon" variant="ghost">
        <BookIcon />
      </Button>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}