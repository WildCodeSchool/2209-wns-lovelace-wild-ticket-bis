export const clickOnEye = (
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setState(!state);
};
