"use client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export function TokenCreator({
  form,
  onSubmit,
}: {
  form: any;
  onSubmit: (values: any) => void;
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center p-8"
      >
        <div className="w-2/4 max-w-xl space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NAME</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name of your coin"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TICKER</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add a ticker"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DESCRIPTION</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a short description"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tokenImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token Image</FormLabel>
                <FormControl>
                  <div
                    className={`rounded-lg bg-gray-300 border border-neutral-700 p-8 flex flex-col items-center justify-center text-center cursor-pointer`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) field.onChange(file);
                    }}
                  >
                    {field.value ? (
                      <img
                        src={URL.createObjectURL(field.value)}
                        alt="Preview"
                        className="max-h-48 rounded-md"
                      />
                    ) : (
                      <>
                        <p className="text-black">Select image to upload</p>
                        <p className="text-sm text-gray-600">
                          or drag and drop here
                        </p>
                        <label className="mt-4 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) field.onChange(file);
                            }}
                          />
                          <div className="bg-white text-black px-4 py-2 rounded">
                            Select Image
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telegramLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TELEGRAM URL (OPTIONAL)</FormLabel>
                <FormControl>
                  <Input placeholder="https://t.me/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TWITTER URL (OPTIONAL)</FormLabel>
                <FormControl>
                  <Input placeholder="https://twitter.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WEBSITE (OPTIONAL)</FormLabel>
                <FormControl>
                  <Input placeholder="https://your-site.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discordLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DISCORD (OPTIONAL)</FormLabel>
                <FormControl>
                  <Input placeholder="https://discord.gg/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            CREATE COIN
          </Button>
        </div>
      </form>
    </Form>
  );
}
