"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export default function DashboardBreadcrumb() {
  const pathName = usePathname();
  const paths = pathName.split("/").slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <Fragment key={`path-${path}`}>
            <BreadcrumbItem className="capitalize">{index < paths.length - 1 ? <BreadcrumbLink href={`/${paths.slice(0, index + 1).join("/")}`}>{path}</BreadcrumbLink> : <Breadcrumb>{path}</Breadcrumb>}</BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
