import { useState } from "react";

// type
import { GenericData } from "@/pages/Dashbroad/Categories/type";

const useSelectedItem = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSlectedItem = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = <T extends GenericData>(
    event: React.ChangeEvent<HTMLInputElement>,
    data: T[]
  ) => {
    if (event.target.checked) {
      const newSelecteds = data.map((row) => row.id.toString());
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  return {
    selected,
    handleSlectedItem,
    handleSelectAllClick,
    setSelected,
  };
};

export default useSelectedItem;
