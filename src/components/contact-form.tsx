"use client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormEvent } from "react"
import Image from "next/image"

export function ContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast("Message Sent", {
      description: "Thanks for reaching out!",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo submission"),
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-0 shadow-2xl">
        <Card className="flex-1 bg-background border border-r-0 rounded-none p-8"> {/* Increased padding to p-8 */}
          <CardHeader className="pb-6"> {/* Added padding bottom */}
            <CardTitle className="text-4xl font-bold">Contact Me</CardTitle> {/* Increased text size */}
            <CardDescription className="text-base text-muted-foreground"> {/* Increased text size */}
              I&apos;d love to hear from you! Fill out the form below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              {/* Name Fields - aligned */}
              <div className="grid md:grid-cols-2 gap-6 items-end"> {/* Added items-end for alignment */}
                <div className="grid gap-2">
                  <Label htmlFor="firstName" className="font-semibold text-lg"> {/* Increased text size */}
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    required
                    className="h-14 text-lg rounded-none" 
                    
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName" className="font-semibold text-lg"> {/* Increased text size */}
                    Last Name 
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="h-14 text-lg rounded-none" 
                    
                  />
                </div>
              </div>

              
              <div className="grid md:grid-cols-2 gap-6 items-end"> {/* Added items-end for alignment */}
                <div className="grid gap-2">
                  <Label htmlFor="email" className="font-semibold text-lg"> {/* Increased text size */}
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="h-14 text-lg rounded-none"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="font-semibold text-lg"> {/* Increased text size */}
                    Phone Number 
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="h-14 text-lg rounded-none" 
                  />
                </div>
              </div>

              {/* Message */}
              <div className="grid gap-2">
                <Label htmlFor="message" className="font-semibold text-lg"> {/* Increased text size */}
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  rows={6}
                  required
                  className="resize-none text-lg rounded-none" 
                />
              </div>

              <Button type="submit" className="hover:bg-[#0f0] w-full h-14 text-lg"> {/* Increased height and text size */}
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Image Container */}
        <div className="flex-1 hidden md:block relative border border-l-0 rounded-none">
          <Image
            src="https://placehold.co/1280x720.png"
            alt="Contact illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}