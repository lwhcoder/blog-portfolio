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

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
  readingTime?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
}

export function BlogCard({
  title,
  description,
  date,
  slug,
  tags = [],
  readingTime,
  imageSrc,
  imageAlt = "Blog image",
  imageWidth = 640,
  imageHeight = 360,
  className,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <Card
        className={cn(
          "transition-all duration-300 hover:shadow-lg hover:border-primary border-muted bg-background/70 hover:bg-background",
          "overflow-hidden border rounded-none",
          className
        )}
      >
        {imageSrc && (
          <div className="p-4 pb-0">
            <div className="relative w-full overflow-hidden">
              <Image
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
            <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{date}</span>
              {readingTime && <span>{readingTime}</span>}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs rounded-md"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
