import React from "react";

export const onChangeSimpleValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  valueName: string | number,
  changeState: (state: any) => void
) => {
  let value = e.target.value;
  changeState((state: any) => ({
    ...state,
    [valueName]: value,
  }));
};
