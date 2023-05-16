import { useState } from "react";
import { Input, Image } from "@tarojs/components";
import SearchIcon from "../assets/searchIcon.svg";
import clearIcon from "../assets/clear.svg";

const SearchInput = ({
  onSearch,
  onClear,
}: {
  onSearch: (data: string) => void;
  onClear: () => void;
}) => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="relative w-full">
      <Image src={SearchIcon} className="w-4 h-4 absolute left-2 top-2" />
      <Input
        value={searchKey}
        placeholder="搜索商品"
        confirmType="search"
        onInput={(e) => setSearchKey(e.detail.value)}
        onConfirm={() => onSearch(searchKey)}
        className=" h-8 bg-[#f5f5f5] rounded-full text-[#555] pl-8 pr-12 text-sm "
      />
      {searchKey && (
        <div
          className="absolute flex items-center justify-center right-4 top-1 w-7 h-6 "
          onClick={() => {
            setSearchKey("");
            onClear();
          }}
        >
          <Image src={clearIcon} className="w-4 h-4 " />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
