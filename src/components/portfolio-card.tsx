"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  description: string;
  date?: string;
  tech?: string[];
  liveLink?: string;
  githubLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
}

export function PortfolioCard({
  title,
  description,
  date,
  tech = [],
  liveLink,
  githubLink,
  imageSrc,
  imageAlt = "Project image",
  imageWidth = 640,
  imageHeight = 360,
  className,
}: PortfolioCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg hover:border-primary border-muted bg-background/70 hover:bg-background",
        "overflow-hidden border group rounded-none", // Removed rounded-2xl
        className
      )}
    >
      {imageSrc && (
        <div className="p-4 pb-0">
          <div className="relative w-full overflow-hidden">
            <Image
              priority
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="w-full object-cover h-auto transition-all duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      )}

      <div className="p-6 pt-4">
        <CardHeader className="p-0 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <div className="flex gap-2">
              {githubLink && (
                <Link
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
              )}
              {liveLink && (
                <Link href={liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
              )}
            </div>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4 flex flex-col gap-3">
          {date && <div className="text-xs text-muted-foreground">{date}</div>}
          {tech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tech.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs rounded-md"
                >
                  {item}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
