"use client";

import { Category } from "@prisma/client";
import {
  FcMultipleDevices,
  FcMusic,
  FcGlobe,
  FcDatabase,
  FcPlus,
  FcScatterPlot

} from "react-icons/fc";
import {BsMusicPlayer} from "react-icons/bs";

import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "music": FcMusic,
  "machine learning":FcScatterPlot,
  "Data Science":FcDatabase,
  "Health":FcPlus,
  "Digital Marketing":FcGlobe,
  "Computer Science": FcMultipleDevices,
  
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}