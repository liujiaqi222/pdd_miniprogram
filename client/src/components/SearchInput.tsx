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
    <div className="flex items-center gap-2 relative w-full ">
      <Image
        src={SearchIcon}
        className="w-4 h-4 absolute left-2 top-2"
        onClick={() => onSearch(searchKey)}
      />
      <Input
        value={searchKey}
        placeholder="搜索商品"
        confirmType="search"
        onInput={(e) => setSearchKey(e.detail.value)}
        onConfirm={() => onSearch(searchKey)}
        className="flex-1 h-8 bg-[#f5f5f5] rounded-full text-[#555] pl-8 pr-12 text-sm "
      />
      {searchKey && (
        <div
          className="absolute flex items-center justify-center right-16 top-1 w-7 h-6 "
          onClick={() => {
            setSearchKey("");
            onClear();
          }}
        >
          <Image src={clearIcon} className="w-4 h-4 " />
        </div>
      )}
      <div
        className="border border-gray py-1 px-2 rounded-lg shadow"
        onClick={() => onSearch(searchKey)}
      >
        搜索
      </div>
    </div>
  );
};

export default SearchInput;
