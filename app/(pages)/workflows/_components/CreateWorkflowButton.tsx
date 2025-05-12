"use client"


import CustomDialogHeader from '@/components/common/custom-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateWorkflowSchamaType, CreateWorkflowSchema } from '@/schemas/workflow.schema'
import { PlusIcon, ZapIcon } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '@/actions/createWorkflow'
import { toast } from 'sonner'

function CreateWorkflowButton() {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateWorkflowSchamaType>({
    resolver: zodResolver(CreateWorkflowSchema),
    defaultValues: {
      name: '',
      description: '',
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success('Workflow created successfully', { id: "create-workflow" })
    },
    onError: () => {
      toast.error("Failed to create workflow", { id: "create-workflow" })
    },
  })

  const onSubmit = useCallback((values: CreateWorkflowSchamaType) => {
    toast.loading("Creating workflow...", { id: "create-workflow" });
    mutate({
      name: values.name,
      description: values.description,
    });
  }, [mutate]);

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
    if (!open) {
      form.reset();
    }
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CustomDialogHeader title="New Workflow" icon={ZapIcon} />
        <div className="p-6">
          <Form {...form}>
            <form className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
                disabled={isPending}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Name
                      <p className='text-sm text-muted-foreground'>
                        (required)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a name for your workflow. It should be unique and descriptive.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isPending}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Description
                      <p className='text-sm text-muted-foreground'>
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                      Describe your workflow. This will help you identify it later.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='w-full' disabled={isPending}>
                {isPending ? 'Creating...' : 'Create'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowButton