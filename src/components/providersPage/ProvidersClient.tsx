"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import ProviderCard from "./ProviderCard";


interface ProvidersClientProps {
  providers: any[];
  categories: { id: string; name: string }[];
}

export default function ProvidersClient({
  providers,
  categories,
}: ProvidersClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const perPage = 6;

  const filteredProviders = useMemo(() => {
    if (selectedCategory === "all") return providers;

    return providers.filter((p: any) => {
      if (!Array.isArray(p.meals)) return false;
      return p.meals.some((m: any) => m.categoryId === selectedCategory);
    });
  }, [selectedCategory, providers]);

  const totalPages = Math.ceil(filteredProviders.length / perPage);

  const paginatedProviders = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredProviders.slice(start, start + perPage);
  }, [filteredProviders, currentPage]);

  return (
    <div className="space-y-6">
      <Select
        value={selectedCategory}
        onValueChange={(value) => {
          setSelectedCategory(value);
          setCurrentPage(1);
        }}
      >
        <SelectTrigger className="w-60 mb-6">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProviders.length > 0 ? (
          paginatedProviders.map((provider: any) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No providers found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}