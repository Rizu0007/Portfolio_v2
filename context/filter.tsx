import React, { createContext, useContext, useState } from "react";

interface FilterInitialType {
  searchText: string;
  onSearch?: (val: string) => void;
}

export const filterContext = createContext<FilterInitialType>({
  searchText: "",
});

export const ProvideFilter = ({ children }: { children: React.ReactNode }) => {
  const value = useProvideFilter();
  return (
    <filterContext.Provider value={value}>{children}</filterContext.Provider>
  );
};

export const useFilter = () => useContext(filterContext);

const useProvideFilter = () => {
  const [searchText, setSearchText] = useState("");

  const onSearch = (val: string) => {
    setSearchText(val);
  };

  return {
    searchText,
    onSearch,
  };
};
