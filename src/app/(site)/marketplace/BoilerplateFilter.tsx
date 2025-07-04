'use client';

import { useState } from 'react';
import { CustomDropdown } from "@/components/ui/CustomDropdown";

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Boilerplates' },
  { value: 'next', label: 'Next.js' },
  { value: 'saas', label: 'SaaS' },
  { value: 'fullstack', label: 'Full-Stack' },
  { value: 'starter', label: 'Starter Kits' },
  { value: 'ai', label: 'AI-Powered' },
];

interface BoilerplateFilterProps {
  onFilterChange: (filter: string) => void;
}

export default function BoilerplateFilter({ onFilterChange }: BoilerplateFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="flex justify-center mb-8">
      <CustomDropdown
        options={FILTER_OPTIONS}
        value={selectedFilter}
        onChange={handleFilterChange}
        className="w-64"
      />
    </div>
  );
}
