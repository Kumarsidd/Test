"use client";

import * as z from "zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/useStoreModalHook";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const StoreModal = () => {
  const storemodal = useStoreModal();

  const [loading, setLoading] = useState(false);

  // minimum input size
  const formSchema = z.object({
    name: z.string().min(5),
  });

  // using useForm from react-hook-form and zodResolver to define typeof input for the form and initial value
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // on submit action which uses axios to post the value from the form input
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
    } catch (error) {
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create a new store"
      description="Add a new store to manage your products and categories"
      isOpen={storemodal.isOpen}
      onClose={storemodal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Comet Store"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={storemodal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
