"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { category } from "@/services/category/category";
import { slot } from "@/services/slot/slot";
import { updateUserAction } from "@/actions/userUpdateAction";
import { toast } from "sonner";
import { useUser } from "@/providers/UserProvider";

const profileSchema = z
  .object({
    name: z.string(),
    bio: z.string().max(1000),
    hourlyRate: z.number(),
    experienceYear: z.number(),
    categoryId: z.string(),
    slotId: z.string(),
  })
  .refine((data) => Object.values(data).some(Boolean), {
    message: "At least one field must be updated",
  });

export function UpdateProfileModal() {
  const user = useUser();

  const form = useForm({
    defaultValues: {
      name: "",
      bio: "",
      hourlyRate: 0,
      experienceYear: 0,
      categoryId: "",
      slotId: "",
    },

    validators: {
      onSubmit: profileSchema,
    },

    onSubmit: async ({ value }) => {
      //   console.log("SUBMITTED DATA:", value);
      if (!user) {
        return;
      }

      const res = await updateUserAction(user?.id, value);

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    },
  });
  // if (!user) return;
  const [categories, setCategories] = useState([]);
  const [slots, setSlots] = useState([]);
  const isAdmin = user?.role === "ADMIN";
  const isStudent = user?.role === "STUDENT";

  useEffect(() => {
    (async () => {
      const c = await category.getAllCategory();
      const s = await slot.getAllSlot();
      setCategories(c?.data ?? []);
      setSlots(s?.data ?? []);
    })();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update Profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Tutor Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit} className="space-y-6">
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>
            {isAdmin && (
              <>
                <form.Field name="hourlyRate">
                  {(field) => (
                    <Field>
                      <FieldLabel>Hourly Rate</FieldLabel>
                      <Input
                        type="number"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                    </Field>
                  )}
                </form.Field>
                <form.Field name="experienceYear">
                  {(field) => (
                    <Field>
                      <FieldLabel>Experience</FieldLabel>
                      <Input
                        type="number"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="categoryId">
                  {(field) => (
                    <Field>
                      <FieldLabel>Category</FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c: { id: string; name: string }) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                </form.Field>

                <form.Field name="slotId">
                  {(field) => (
                    <Field>
                      <FieldLabel>Slot</FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {slots.map(
                            (s: {
                              id: string;
                              startTime: string;
                              endTime: string;
                            }) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.startTime} - {s.endTime}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                </form.Field>
              </>
            )}

            <form.Field name="bio">
              {(field) => (
                <Field className="md:col-span-2">
                  <FieldLabel>Bio</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            <Button type="submit" className="md:col-span-2 w-full">
              Save Changes
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
