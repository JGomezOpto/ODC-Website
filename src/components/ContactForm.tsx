"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

const countries = [
  "United States",
  "Canada",
  "Mexico",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Ireland",
  "Austria",
  "Poland",
  "Czech Republic",
  "Hungary",
  "Portugal",
  "Israel",
  "Japan",
  "South Korea",
  "China",
  "Taiwan",
  "Singapore",
  "India",
  "Australia",
  "New Zealand",
  "Brazil",
  "Argentina",
  "Chile",
  "Colombia",
  "South Africa",
  "Other",
];

const inquiryPurposes = [
  "Sales",
  "Technical",
  "Marketing",
  "Compliance and Certification",
  "Other",
];

const targetMarkets = [
  "Semiconductor",
  "Aerospace & Defense",
  "Industrial & Environmental & Safety",
  "Biomedical",
];

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Contact number is required"),
  country: z.string().min(1, "Country is required"),
  inquiryPurpose: z.string().min(1, "Inquiry purpose is required"),
  targetMarket: z.string().min(1, "Target market is required"),
  partNumber: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const selectClasses =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:hover:bg-input/50 text-foreground [&>option]:bg-card [&>option]:text-foreground appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_8px_center] bg-no-repeat pr-8";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // In production, this would send to an API endpoint
    console.log("Form submitted:", data);
    await new Promise((r) => setTimeout(r, 1000));
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Thank You!
        </h3>
        <p className="text-muted-foreground">
          We&apos;ve received your inquiry and will respond within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Row 1: First Name / Last Name */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className="mt-1.5"
            placeholder="Your First Name Here..."
          />
          {errors.firstName && (
            <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className="mt-1.5"
            placeholder="Your Last Name Here..."
          />
          {errors.lastName && (
            <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email / Contact Number */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1.5"
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Contact Number *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className="mt-1.5"
            placeholder="Contact Number"
          />
          {errors.phone && (
            <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Row 3: Country */}
      <div>
        <Label htmlFor="country">Country *</Label>
        <select
          id="country"
          {...register("country")}
          className={`mt-1.5 ${selectClasses}`}
          defaultValue=""
        >
          <option value="" disabled>
            --Please choose an option--
          </option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-xs text-destructive mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Row 4: Inquiry Purpose */}
      <div>
        <Label htmlFor="inquiryPurpose">Inquiry Purpose *</Label>
        <select
          id="inquiryPurpose"
          {...register("inquiryPurpose")}
          className={`mt-1.5 ${selectClasses}`}
          defaultValue=""
        >
          <option value="" disabled>
            --Please choose an option--
          </option>
          {inquiryPurposes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.inquiryPurpose && (
          <p className="text-xs text-destructive mt-1">{errors.inquiryPurpose.message}</p>
        )}
      </div>

      {/* Row 5: Target Market */}
      <div>
        <Label htmlFor="targetMarket">Target Market *</Label>
        <select
          id="targetMarket"
          {...register("targetMarket")}
          className={`mt-1.5 ${selectClasses}`}
          defaultValue=""
        >
          <option value="" disabled>
            --Please choose an option--
          </option>
          {targetMarkets.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        {errors.targetMarket && (
          <p className="text-xs text-destructive mt-1">{errors.targetMarket.message}</p>
        )}
      </div>

      {/* Row 6: Part Number / Quantity */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="partNumber">Part Number</Label>
          <Input
            id="partNumber"
            {...register("partNumber")}
            className="mt-1.5"
            placeholder="SXUV100"
          />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            {...register("quantity")}
            className="mt-1.5"
            placeholder="123"
          />
        </div>
      </div>

      {/* Row 7: Message */}
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-1.5"
          placeholder="Your message here..."
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </form>
  );
}
