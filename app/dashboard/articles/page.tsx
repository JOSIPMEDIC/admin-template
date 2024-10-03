import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { ArticleClient } from "@/components/tables/articles-tables/client";

const breadcrumbItems = [
  { title: "Početna", link: "/dashboard/tasks" },
  { title: "Skladište", link: "/dashboard/articles" },
];
export default function page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ArticleClient />
      </div>
    </PageContainer>
  );
}
