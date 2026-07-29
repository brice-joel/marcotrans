import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils"; // Utilitaire cn standard de shadcn

interface SheetModalProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
> {
  children: React.ReactNode;
}

export function SheetModal({ children, ...props }: SheetModalProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

interface SheetModalContentProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  title: string;
  description?: string;
}

export const SheetModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetModalContentProps
>(({ className, children, title, description, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed  inset-0 z-50 bg-slate-900/40 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] gap-0 border border-slate-100 bg-white shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2 rounded-2xl h-[90vh] overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="sr-only">
        <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
        {description && (
          <DialogPrimitive.Description>
            {description}
          </DialogPrimitive.Description>
        )}
      </div>

      {children}

      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-xs opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-slate-500 cursor-pointer">
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetModalContent.displayName = "SheetModalContent";
