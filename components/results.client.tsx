"use client";

import type { ListBlobResult } from "@vercel/blob";
import {
  ImageIcon,
  ImageUpIcon,
  UploadIcon,
  FileIcon,
} from "lucide-react";
import { Preview } from "./preview";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "./ui/empty";
import { UploadButton } from "./upload-button";
import { useUploadedImages } from "./uploaded-images-provider";

type ResultsClientProps = {
  defaultData: ListBlobResult["blobs"];
};

const PRIORITY_COUNT = 12;

export const ResultsClient = ({ defaultData }: ResultsClientProps) => {
  const { images } = useUploadedImages();

  const hasImages = images.length || defaultData.length;

  return (
    <>
      {hasImages ? (
        <div className="gap-4 sm:columns-2 md:columns-3 lg:columns-2 xl:columns-3">
          {images.map((image, index) => (
            <Preview
              key={image.url}
              priority={index < PRIORITY_COUNT}
              url={image.url}
            />
          ))}
          {defaultData.map((blob, index) => (
            <Preview
              key={blob.url}
              priority={index < PRIORITY_COUNT}
              url={blob.downloadUrl}
            />
          ))}
        </div>
      ) : (
        <Empty className="h-full min-h-[50vh] rounded-lg border">
          <EmptyHeader className="max-w-none">
            <div className="relative isolate mb-8 flex">
              <div className="-rotate-12 translate-x-2 translate-y-2 rounded-full border bg-background p-3 shadow-xs">
                <ImageIcon className="size-5 text-muted-foreground" />
              </div>
              <div className="z-10 rounded-full border bg-background p-3 shadow-xs">
                <UploadIcon className="size-5 text-muted-foreground" />
              </div>
              <div className="-translate-x-2 translate-y-2 rotate-12 rounded-full border bg-background p-3 shadow-xs">
                <FileIcon className="size-5 text-muted-foreground" />
              </div>
            </div>
            <EmptyTitle>No images found</EmptyTitle>
            <EmptyDescription>
              Upload some images with the{" "}
              <ImageUpIcon className="inline size-4" /> button below to get
              started!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex w-full max-w-sm justify-center sm:max-w-lg lg:ml-[182px]">
        <UploadButton />
      </div>
    </>
  );
};
