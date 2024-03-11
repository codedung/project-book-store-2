import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category[]>([]);
  const setActive = () => {
    const params = new URLSearchParams(location.search);

    if (params.get("category_id")) {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive:
              item.idx === Number(params.get("category_id")) ? true : false
          };
        });
      });
    } else {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: false
          };
        });
      });
    }
  };
  useEffect(() => {
    fetchCategory().then((category) => {
      const categoryData = category;
      if (!categoryData) return;

      const categoryWithAll = [
        {
          idx: null,
          category_en: "All",
          category_ko: "전체"
        },
        ...categoryData
      ];

      setCategory(categoryWithAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { category };
};
